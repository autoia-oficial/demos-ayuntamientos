#!/usr/bin/env bash
# Endurecimiento del sistema. Cada bloque pide confirmación por separado,
# así puedes aceptar unos y rechazar otros.
#
# Uso:   ./scripts/03-endurecer.sh
#        DRY_RUN=1 ./scripts/03-endurecer.sh   # sólo mostrar
#        SI_A_TODO=1 ./scripts/03-endurecer.sh # sin preguntar (con cuidado)

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib-comun.sh"

SI_A_TODO="${SI_A_TODO:-0}"
quiere() { [[ "$SI_A_TODO" == "1" ]] || confirmar "$1"; }

exigir_no_root
detectar_sistema
exigir_sudo

info "Sistema: $DISTRO_NOMBRE (familia $DISTRO_FAMILIA)"

# Copia de seguridad de todo lo que toquemos
RESPALDO="$HOME/.respaldo-endurecimiento-$(date +%Y%m%d-%H%M%S)"
[[ "$DRY_RUN" != "1" ]] && mkdir -p "$RESPALDO"
respaldar() {
  [[ "$DRY_RUN" == "1" || ! -e "$1" ]] && return 0
  sudo cp -a "$1" "$RESPALDO/$(basename "$1").bak" 2>/dev/null || true
}
info "Los ficheros originales se copian en: $RESPALDO"

# ══════════════════════════════════════════════════ 1. actualizar el sistema
titulo "1/8 · Actualizaciones pendientes"
if quiere "¿Instalar todas las actualizaciones ahora? (lo más importante de todo)"; then
  actualizar_indices
  case "$PKG" in
    dnf|yum) sudo_ejecuta "$PKG" upgrade -y ;;
    apt)     sudo_ejecuta apt-get upgrade -y ;;
    pacman)  sudo_ejecuta pacman -Syu --noconfirm ;;
  esac
  ok "Sistema actualizado"
fi

# ══════════════════════════════════════════ 2. actualizaciones automáticas
titulo "2/8 · Actualizaciones de seguridad automáticas"
echo "  La mayoría de intrusiones usan fallos ya parcheados. Esto los cierra solo."
if quiere "¿Activar actualizaciones de seguridad automáticas?"; then
  case "$DISTRO_FAMILIA" in
    rhel)
      instalar dnf-automatic
      if [[ "$DRY_RUN" != "1" ]]; then
        respaldar /etc/dnf/automatic.conf
        sudo sed -i 's/^upgrade_type.*/upgrade_type = security/'       /etc/dnf/automatic.conf
        sudo sed -i 's/^apply_updates.*/apply_updates = yes/'          /etc/dnf/automatic.conf
        sudo sed -i 's/^download_updates.*/download_updates = yes/'    /etc/dnf/automatic.conf
      fi
      activar_servicio dnf-automatic.timer
      ;;
    debian)
      instalar unattended-upgrades apt-listchanges
      [[ "$DRY_RUN" != "1" ]] && sudo dpkg-reconfigure -f noninteractive unattended-upgrades
      activar_servicio unattended-upgrades
      ;;
    arch)
      aviso "Arch es rolling release: no hay parches de seguridad separados."
      aviso "Actualiza a mano con regularidad:  sudo pacman -Syu"
      ;;
  esac
  ok "Actualizaciones automáticas configuradas"
fi

# ══════════════════════════════════════════════════════════ 3. cortafuegos
titulo "3/8 · Cortafuegos"
echo "  Política: se bloquea TODO lo entrante, se permite todo lo saliente."
aviso "Si administras este equipo por SSH DESDE OTRO SITIO, di que NO aquí:"
aviso "bloquear el puerto 22 te dejaría fuera."

if quiere "¿Activar el cortafuegos con política de denegar entrante?"; then
  case "$FIREWALL" in
    firewalld)
      instalar firewalld
      activar_servicio firewalld
      sudo_ejecuta firewall-cmd --set-default-zone=public
      # 'public' ya deniega lo no declarado. Quitamos servicios abiertos por defecto.
      for servicio in ssh dhcpv6-client cockpit; do
        if sudo firewall-cmd --zone=public --query-service="$servicio" >/dev/null 2>&1; then
          if quiere "  → ¿Cerrar el servicio '$servicio' en el cortafuegos?"; then
            sudo_ejecuta firewall-cmd --permanent --zone=public --remove-service="$servicio"
          fi
        fi
      done
      sudo_ejecuta firewall-cmd --reload
      ok "firewalld activo. Ver estado: sudo firewall-cmd --list-all"
      ;;
    ufw)
      instalar ufw
      sudo_ejecuta ufw --force reset
      sudo_ejecuta ufw default deny incoming
      sudo_ejecuta ufw default allow outgoing
      sudo_ejecuta ufw --force enable
      ok "ufw activo. Ver estado: sudo ufw status verbose"
      ;;
  esac
fi

# ══════════════════════════════════════════════ 4. parámetros del kernel
titulo "4/8 · Endurecimiento del kernel (sysctl)"
echo "  Desactiva funciones de red antiguas que hoy sólo sirven para atacar."
if quiere "¿Aplicar los parámetros de red endurecidos?"; then
  if [[ "$DRY_RUN" != "1" ]]; then
    sudo tee /etc/sysctl.d/99-endurecimiento.conf >/dev/null <<'CONF'
# ───────────────────────────── Red ─────────────────────────────
# No reenviar paquetes: este equipo no es un router
net.ipv4.ip_forward = 0
net.ipv6.conf.all.forwarding = 0

# Ignorar redirecciones ICMP (se usan para desviar tu tráfico)
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Rechazar paquetes con ruta prefijada por el emisor
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Filtro de ruta inversa: descarta IP de origen falsificada
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Protección contra inundación SYN
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 4096

# Registrar paquetes con direcciones imposibles
net.ipv4.conf.all.log_martians = 1

# No responder a pings de difusión (evita ser amplificador de ataques)
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1

# No aceptar anuncios de router por IPv6 (este equipo no es router)
net.ipv6.conf.all.accept_ra = 0
net.ipv6.conf.default.accept_ra = 0

# ──────────────────────────── Kernel ───────────────────────────
# Oculta direcciones de memoria del kernel a usuarios sin privilegios
kernel.kptr_restrict = 2
# Restringe el acceso al registro del kernel
kernel.dmesg_restrict = 1
# Impide que un proceso inspeccione a otro que no sea hijo suyo
kernel.yama.ptrace_scope = 1
# Sin volcados de memoria de binarios con setuid (pueden contener secretos)
fs.suid_dumpable = 0
# Enlaces simbólicos y duros protegidos (evita ataques en /tmp)
fs.protected_symlinks = 1
fs.protected_hardlinks = 1
fs.protected_fifos = 2
fs.protected_regular = 2
# Bloquea la carga de módulos del kernel tras el arranque
# (descomenta sólo si no instalas drivers a menudo; requiere reinicio para revertir)
# kernel.modules_disabled = 1
CONF
    sudo sysctl --system >/dev/null
  fi
  ok "Parámetros aplicados (/etc/sysctl.d/99-endurecimiento.conf)"
fi

# ══════════════════════════════════════════════════ 5. SELinux / AppArmor
titulo "5/8 · Control de acceso obligatorio"
if hay getenforce; then
  estado="$(getenforce)"
  if [[ "$estado" == "Enforcing" ]]; then
    ok "SELinux ya está en Enforcing — no toco nada"
  else
    aviso "SELinux está en '$estado'. En Enforcing, un programa comprometido queda encerrado."
    if quiere "¿Poner SELinux en Enforcing?"; then
      respaldar /etc/selinux/config
      sudo_ejecuta setenforce 1 || aviso "No se pudo cambiar en caliente"
      [[ "$DRY_RUN" != "1" ]] && sudo sed -i 's/^SELINUX=.*/SELINUX=enforcing/' /etc/selinux/config
      ok "SELinux en Enforcing (permanente tras reiniciar)"
    fi
  fi
elif hay aa-status; then
  ok "AppArmor presente"
  activar_servicio apparmor
else
  aviso "Sin SELinux ni AppArmor en este sistema"
fi

# ══════════════════════════════════════════════ 6. SSH entrante y fail2ban
titulo "6/8 · Servidor SSH"
SSH_ACTIVO=0
# 'if' explícito: con 'set -e', la forma 'cmd && var=1' es frágil
if systemctl is-active sshd >/dev/null 2>&1 || systemctl is-active ssh >/dev/null 2>&1; then
  SSH_ACTIVO=1
fi

if [[ $SSH_ACTIVO -eq 0 ]]; then
  ok "No hay servidor SSH activo: nada que endurecer, y menos superficie de ataque."
else
  aviso "Tu equipo ACEPTA conexiones SSH entrantes."
  echo "  Si es un portátil de escritorio, lo más seguro es apagarlo del todo."
  if quiere "¿Desactivar el servidor SSH entrante?"; then
    sudo_ejecuta systemctl disable --now sshd 2>/dev/null || sudo_ejecuta systemctl disable --now ssh
    ok "Servidor SSH desactivado"
  elif quiere "¿Endurecer la configuración de SSH (sin contraseñas, sin root)?"; then
    respaldar /etc/ssh/sshd_config
    if [[ "$DRY_RUN" != "1" ]]; then
      sudo mkdir -p /etc/ssh/sshd_config.d
      sudo tee /etc/ssh/sshd_config.d/99-endurecimiento.conf >/dev/null <<'CONF'
# Sólo clave pública: las contraseñas se adivinan por fuerza bruta
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitEmptyPasswords no
# Nunca entrar directamente como root
PermitRootLogin no
# Protocolos y cifrados modernos únicamente
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512
# Menos margen para ataques
MaxAuthTries 3
MaxSessions 4
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
# Sin reenvíos innecesarios
AllowAgentForwarding no
X11Forwarding no
AllowTcpForwarding no
PermitTunnel no
CONF
      if sudo sshd -t; then
        sudo systemctl reload sshd 2>/dev/null || sudo systemctl reload ssh
        ok "SSH endurecido"
      else
        error "La configuración de SSH tiene errores; revirtiendo."
        sudo rm -f /etc/ssh/sshd_config.d/99-endurecimiento.conf
      fi
    fi
  fi

  titulo "  fail2ban"
  if quiere "  → ¿Instalar fail2ban (bloquea IPs que intentan adivinar contraseñas)?"; then
    instalar fail2ban
    if [[ "$DRY_RUN" != "1" ]]; then
      sudo tee /etc/fail2ban/jail.d/99-ssh.conf >/dev/null <<'CONF'
[sshd]
enabled  = true
maxretry = 3
findtime = 10m
bantime  = 1h
# Cada reincidencia multiplica el tiempo de bloqueo
bantime.increment = true
bantime.factor    = 2
CONF
    fi
    activar_servicio fail2ban
    ok "fail2ban activo. Ver bloqueos: sudo fail2ban-client status sshd"
  fi
fi

# ══════════════════════════════════════════════════════ 7. servicios extra
titulo "7/8 · Servicios que escuchan en la red"
info "Puertos abiertos ahora mismo:"
if hay ss; then
  # '|| true': 'head' cierra la tubería y eso con pipefail abortaría el script
  ss -tulnp 2>/dev/null | awk 'NR==1 || /LISTEN|UNCONN/' | head -25 || true
else
  aviso "'ss' no disponible (paquete iproute/iproute2)"
fi
echo
echo "  Revisa la lista: todo lo que escuche en 0.0.0.0 o [::] está expuesto a la red."
echo "  Lo que escuche en 127.0.0.1 sólo es accesible desde este equipo (eso está bien)."
echo "  Para apagar algo que no uses:  sudo systemctl disable --now <servicio>"

# ══════════════════════════════════════════════════════ 8. comprobaciones
titulo "8/8 · Comprobaciones que no puedo automatizar"

cat <<'FIN'

  ┌─ CIFRADO DE DISCO ────────────────────────────────────────────────┐
  │ Compruébalo con:   lsblk -o NAME,TYPE,MOUNTPOINT                  │
  │ Si no aparece ningún dispositivo de tipo "crypt", tu disco está   │
  │ SIN CIFRAR: cualquiera que se lleve el equipo lee todos tus datos │
  │ arrancando desde un USB, sin saber tu contraseña.                 │
  │                                                                    │
  │ No se puede cifrar un sistema ya instalado sin riesgo de pérdida. │
  │ Si el disco está sin cifrar, lo correcto es: copia de seguridad + │
  │ reinstalar marcando "Cifrar el disco" (LUKS) en el instalador.    │
  └────────────────────────────────────────────────────────────────────┘

  ┌─ CONTRASEÑA DE LA BIOS/UEFI ──────────────────────────────────────┐
  │ Sin ella, cualquiera arranca desde un USB y salta tu login.       │
  │ Ponla en el menú de arranque (F2/Supr al encender) y activa       │
  │ Secure Boot si tu distribución lo soporta.                        │
  └────────────────────────────────────────────────────────────────────┘

  ┌─ GESTOR DE CONTRASEÑAS ───────────────────────────────────────────┐
  │ Reutilizar contraseñas es la causa nº1 de cuentas robadas.        │
  │   sudo dnf install keepassxc      (o apt/pacman)                  │
  │ Alternativa con sincronización: Bitwarden (cifrado extremo).      │
  │ Una contraseña maestra larga + 2FA, y nunca la reutilices.        │
  └────────────────────────────────────────────────────────────────────┘

  ┌─ COPIAS DE SEGURIDAD ─────────────────────────────────────────────┐
  │ Regla 3-2-1: 3 copias, 2 soportes distintos, 1 fuera de casa.     │
  │ Un ransomware sin copia de seguridad es pérdida total.            │
  │   sudo dnf install borgbackup     → cifradas y deduplicadas       │
  │ Lo montamos cuando hagamos tu servidor de datos.                  │
  └────────────────────────────────────────────────────────────────────┘

FIN

titulo "Hecho"
echo "  Copias de los ficheros originales en: $RESPALDO"
echo "  Vuelve a pasar el diagnóstico para ver cómo ha quedado:"
echo "      ./scripts/00-diagnostico.sh"
echo
aviso "Reinicia para que se apliquen todos los cambios del kernel y SELinux."
echo
