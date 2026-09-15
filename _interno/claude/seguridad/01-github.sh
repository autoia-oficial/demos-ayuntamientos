#!/usr/bin/env bash
# Configura GitHub en tu Linux de forma segura:
#   · git + GitHub CLI
#   · clave SSH ed25519 protegida con contraseña (para empujar código)
#   · clave de FIRMA de commits (para que GitHub marque tus commits como "Verified")
#   · valores por defecto de git endurecidos
#
# Uso:   ./scripts/01-github.sh
#        DRY_RUN=1 ./scripts/01-github.sh    # ver qué haría, sin tocar nada

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib-comun.sh"

exigir_no_root
detectar_sistema
info "Detectado: $DISTRO_NOMBRE (familia $DISTRO_FAMILIA, gestor $PKG)"
exigir_sudo

# ═══════════════════════════════════════════════════ 1. instalar herramientas
titulo "1/6 · Instalando git y dependencias"
actualizar_indices

case "$DISTRO_FAMILIA" in
  rhel)   instalar git openssh-clients curl ca-certificates ;;
  debian) instalar git openssh-client  curl ca-certificates ;;
  arch)   instalar git openssh         curl ca-certificates ;;
esac

# ───────────────────────────────────────────────────── GitHub CLI (gh) ──────
titulo "2/6 · Instalando GitHub CLI"
if hay gh; then
  ok "gh ya instalado ($(gh --version | head -1))"
else
  case "$DISTRO_FAMILIA" in
    rhel)
      info "Añadiendo el repositorio oficial de GitHub CLI…"
      instalar dnf-plugins-core
      if sudo dnf config-manager --help 2>&1 | grep -q -- '--add-repo'; then
        sudo_ejecuta dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
      else
        # dnf5 cambió la sintaxis
        sudo_ejecuta dnf config-manager addrepo --from-repofile=https://cli.github.com/packages/rpm/gh-cli.repo
      fi
      instalar gh
      ;;
    debian)
      info "Añadiendo el repositorio oficial de GitHub CLI (con verificación de clave)…"
      ejecuta sudo mkdir -p -m 755 /etc/apt/keyrings
      if [[ "$DRY_RUN" != "1" ]]; then
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
          | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null
        sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
          | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
      fi
      actualizar_indices
      instalar gh
      ;;
    arch)
      instalar github-cli
      ;;
  esac
fi

# ═══════════════════════════════════════════════════ 3. identidad de git
titulo "3/6 · Identidad de git"

nombre_actual="$(git config --global user.name  2>/dev/null || true)"
correo_actual="$(git config --global user.email 2>/dev/null || true)"

if [[ -z "$nombre_actual" ]]; then
  read -r -p "  Tu nombre (aparecerá en cada commit): " nombre_actual
  ejecuta git config --global user.name "$nombre_actual"
else
  ok "user.name ya configurado: $nombre_actual"
fi

if [[ -z "$correo_actual" ]]; then
  echo
  aviso "Consejo de privacidad: usa el correo 'noreply' de GitHub para no publicar tu correo real."
  echo "  Lo encuentras en: github.com/settings/emails → 'Keep my email address private'"
  echo "  Tiene la forma:   12345678+usuario@users.noreply.github.com"
  echo
  read -r -p "  Tu correo para los commits: " correo_actual
  ejecuta git config --global user.email "$correo_actual"
else
  ok "user.email ya configurado: $correo_actual"
fi

# ═══════════════════════════════════════════════════ 4. claves SSH
titulo "4/6 · Claves SSH"

ejecuta mkdir -p "$HOME/.ssh"
ejecuta chmod 700 "$HOME/.ssh"

CLAVE_AUTH="$HOME/.ssh/id_ed25519_github"
CLAVE_FIRMA="$HOME/.ssh/id_ed25519_github_firma"

# Detecta si hay una llave física FIDO2 (YubiKey, Nitrokey, SoloKey...)
TIPO_CLAVE="ed25519"
if hay ssh-keygen && ls /dev/hidraw* >/dev/null 2>&1; then
  echo
  info "Si tienes una llave física de seguridad (YubiKey, Nitrokey, SoloKey) conectada,"
  info "puedo crear la clave dentro de ella: es el método más seguro que existe,"
  info "porque la clave privada nunca sale del dispositivo."
  if confirmar "¿Usar una llave física de seguridad?"; then
    TIPO_CLAVE="ed25519-sk"
  fi
fi

crear_clave() {
  local ruta="$1" comentario="$2"
  if [[ -f "$ruta" ]]; then
    ok "Ya existe: $ruta"
    return 0
  fi
  info "Creando clave $TIPO_CLAVE en $ruta"
  if [[ "$TIPO_CLAVE" == "ed25519-sk" ]]; then
    aviso "Toca la llave física cuando parpadee."
    ejecuta ssh-keygen -t ed25519-sk -O resident -O verify-required \
                       -C "$comentario" -f "$ruta"
  else
    aviso "Te pedirá una CONTRASEÑA. Ponla: es lo que protege la clave si te roban el equipo."
    ejecuta ssh-keygen -t ed25519 -a 100 -C "$comentario" -f "$ruta"
  fi
  ejecuta chmod 600 "$ruta"
  ejecuta chmod 644 "$ruta.pub"
}

crear_clave "$CLAVE_AUTH"  "github-auth-$(hostname)-$(date +%Y%m%d)"
echo
info "Ahora una SEGUNDA clave, sólo para firmar commits."
info "Separar 'entrar' de 'firmar' significa que si una se ve comprometida, la otra sigue siendo de fiar."
crear_clave "$CLAVE_FIRMA" "github-firma-$(hostname)-$(date +%Y%m%d)"

# ───────────────────────────────────────────── configuración de ssh client ──
info "Escribiendo configuración de cliente SSH para github.com"
CONF_SSH="$HOME/.ssh/config"
if [[ "$DRY_RUN" != "1" ]]; then
  touch "$CONF_SSH"; chmod 600 "$CONF_SSH"
  if ! grep -q "^Host github.com$" "$CONF_SSH" 2>/dev/null; then
    cat >> "$CONF_SSH" <<CONF

# --- añadido por scripts/01-github.sh ---
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
    # Sólo algoritmos modernos; descarta los débiles
    HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512,rsa-sha2-256
    PubkeyAcceptedAlgorithms ssh-ed25519,sk-ssh-ed25519@openssh.com,rsa-sha2-512
    # No reenvíes el agente ni X11 a un servidor remoto
    ForwardAgent no
    ForwardX11 no
CONF
    ok "Bloque añadido a ~/.ssh/config"
  else
    ok "~/.ssh/config ya tiene un bloque para github.com"
  fi
fi

# ─────────────────────────────────────────────────────────── ssh-agent ──────
if [[ -z "${SSH_AUTH_SOCK:-}" ]]; then
  aviso "No hay ssh-agent corriendo. Para no teclear la contraseña en cada push, añade a tu ~/.bashrc:"
  echo '    eval "$(ssh-agent -s)" >/dev/null'
else
  info "Añadiendo la clave al ssh-agent (te pedirá la contraseña una vez)"
  ejecuta ssh-add "$CLAVE_AUTH" || aviso "No se pudo añadir al agente; no es crítico."
fi

# ═══════════════════════════════════════════════════ 5. firma de commits
titulo "5/6 · Firma de commits"

info "Configurando git para firmar cada commit con tu clave SSH de firma."
ejecuta git config --global gpg.format ssh
ejecuta git config --global user.signingkey "$CLAVE_FIRMA.pub"
ejecuta git config --global commit.gpgsign true
ejecuta git config --global tag.gpgsign true

# allowed_signers: permite que 'git log --show-signature' verifique en local
FIRMANTES="$HOME/.ssh/allowed_signers"
if [[ "$DRY_RUN" != "1" && -f "$CLAVE_FIRMA.pub" ]]; then
  linea="$correo_actual $(cat "$CLAVE_FIRMA.pub")"
  touch "$FIRMANTES"
  grep -qxF "$linea" "$FIRMANTES" 2>/dev/null || echo "$linea" >> "$FIRMANTES"
  chmod 600 "$FIRMANTES"
fi
ejecuta git config --global gpg.ssh.allowedSignersFile "$FIRMANTES"
ok "Firma activada: tus commits saldrán como 'Verified' en GitHub."

# ═══════════════════════════════════════════════════ 6. ajustes de git
titulo "6/6 · Ajustes de git recomendados"

ejecuta git config --global init.defaultBranch main
ejecuta git config --global pull.rebase true          # historial limpio, sin merges de ruido
ejecuta git config --global push.default simple
ejecuta git config --global push.autoSetupRemote true
ejecuta git config --global fetch.prune true
ejecuta git config --global core.fsmonitor true
ejecuta git config --global diff.colorMoved zebra
ejecuta git config --global rerere.enabled true

# --- seguridad ---
ejecuta git config --global transfer.fsckObjects true  # rechaza objetos corruptos/maliciosos
ejecuta git config --global fetch.fsckObjects true
ejecuta git config --global receive.fsckObjects true
ejecuta git config --global protocol.version 2
# Nunca guardar credenciales en texto plano
ejecuta git config --global credential.helper cache
ok "Ajustes aplicados (incluye verificación de integridad de objetos)"

# ═══════════════════════════════════════════════════ final
titulo "Lo que falta, y lo tienes que hacer tú"

cat <<FIN

  1) CREAR LA CUENTA (si aún no la tienes)
     → https://github.com/signup
     Usa un correo que controles y una contraseña LARGA y única.

  2) ACTIVAR 2FA — esto es obligatorio, no opcional
     → https://github.com/settings/security
     Orden de preferencia:
       a. Llave física (YubiKey/Nitrokey) — inmune al phishing
       b. App TOTP (Aegis en Android, Ente Auth en iOS)
       c. SMS — evítalo, es el más débil (SIM swapping)
     GUARDA los códigos de recuperación en papel, fuera del ordenador.

  3) AUTENTICARTE DESDE ESTE EQUIPO
     Ejecuta:   gh auth login
     Elige:  GitHub.com → SSH → la clave $CLAVE_AUTH → autenticar en el navegador

  4) SUBIR LA CLAVE DE FIRMA (gh sólo sube la de autenticación)
     gh ssh-key add "$CLAVE_FIRMA.pub" --type signing --title "Firma \$(hostname)"

  5) COMPROBAR QUE FUNCIONA
     ssh -T git@github.com          → debe saludarte por tu nombre de usuario
     gh auth status

  6) BLINDAR LA CUENTA
     → https://github.com/settings/security
       · Activa "Vigilant mode": marca como no verificado cualquier commit sin firmar
       · Revisa las sesiones activas y revoca las que no reconozcas
     → https://github.com/settings/applications
       · Revoca las apps OAuth que ya no uses

  Tu clave pública de autenticación (esta SÍ se puede compartir):
FIN

if [[ -f "$CLAVE_AUTH.pub" ]]; then
  echo
  cat "$CLAVE_AUTH.pub"
  echo
fi

aviso "Nunca compartas los ficheros SIN .pub — ésos son las claves privadas."
echo
echo "  Siguiente paso:  ./scripts/02-vpn.sh"
echo
