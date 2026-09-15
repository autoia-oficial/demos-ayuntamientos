#!/usr/bin/env bash
# Diagnóstico: dice qué sistema tienes y qué protecciones están ya activas.
# No modifica NADA. Ejecútalo primero:  ./scripts/00-diagnostico.sh

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib-comun.sh"

detectar_sistema

titulo "Sistema"
printf '  Distribución : %s\n' "$DISTRO_NOMBRE"
printf '  Familia      : %s\n' "$DISTRO_FAMILIA"
printf '  Paquetes     : %s\n' "$PKG"
printf '  Firewall     : %s (recomendado para esta familia)\n' "$FIREWALL"
printf '  Kernel       : %s\n' "$(uname -r)"
printf '  Arquitectura : %s\n' "$(uname -m)"
if hay systemd-detect-virt; then
  # Ojo: imprime "none" y ADEMÁS devuelve código 1 cuando no hay virtualización,
  # así que no se puede usar '|| echo': saldrían las dos cosas.
  virt="$(systemd-detect-virt 2>/dev/null || true)"
  [[ -z "$virt" || "$virt" == "none" ]] && virt="ninguna (hardware real)"
  printf '  Virtualización: %s\n' "$virt"
fi

titulo "Entorno de escritorio"
printf '  Sesión       : %s\n' "${XDG_SESSION_TYPE:-desconocida}"
printf '  Escritorio   : %s\n' "${XDG_CURRENT_DESKTOP:-ninguno (parece servidor)}"

titulo "Herramientas de desarrollo"

# Cada herramienta pide la versión a su manera; ssh usa -V y escribe en stderr.
version_de() {
  case "$1" in
    ssh) ssh -V 2>&1 | head -1 ;;
    *)   "$1" --version 2>&1 | head -1 ;;
  esac
}

for h in git gh ssh curl wget gpg; do
  if hay "$h"; then
    # Recortado: curl imprime una línea larguísima con todas sus bibliotecas
    ok "$(printf '%-6s %.62s' "$h" "$(version_de "$h")")"
  else
    aviso "$(printf '%-6s NO instalado' "$h")"
  fi
done

titulo "Estado de seguridad"

# --- Firewall ---
if hay firewall-cmd; then
  if sudo -n firewall-cmd --state >/dev/null 2>&1 || firewall-cmd --state >/dev/null 2>&1; then
    ok "firewalld activo (zona: $(firewall-cmd --get-default-zone 2>/dev/null || echo '?'))"
  else
    aviso "firewalld instalado pero NO activo"
  fi
elif hay ufw; then
  if ufw status 2>/dev/null | grep -qi '^Status: active'; then
    ok "ufw activo"
  else
    aviso "ufw instalado pero NO activo"
  fi
else
  aviso "Sin firewall gestionado detectado ($FIREWALL no instalado)"
fi

# --- SELinux / AppArmor ---
if hay getenforce; then
  estado="$(getenforce 2>/dev/null)"
  [[ "$estado" == "Enforcing" ]] && ok "SELinux: Enforcing" || aviso "SELinux: $estado (lo ideal es Enforcing)"
elif hay aa-status; then
  if sudo -n aa-status --enabled 2>/dev/null; then ok "AppArmor habilitado"; else aviso "AppArmor presente, estado desconocido (requiere sudo)"; fi
else
  aviso "Sin SELinux ni AppArmor detectados"
fi

# --- Actualizaciones automáticas ---
if systemctl is-enabled dnf-automatic.timer >/dev/null 2>&1 \
   || systemctl is-enabled unattended-upgrades >/dev/null 2>&1; then
  ok "Actualizaciones automáticas de seguridad activas"
else
  aviso "Actualizaciones automáticas de seguridad NO configuradas"
fi

# --- fail2ban ---
if systemctl is-active fail2ban >/dev/null 2>&1; then
  ok "fail2ban activo"
else
  aviso "fail2ban no activo (importante sólo si expones SSH a internet)"
fi

# --- SSH entrante ---
if systemctl is-active sshd >/dev/null 2>&1 || systemctl is-active ssh >/dev/null 2>&1; then
  aviso "Servidor SSH ACTIVO: acepta conexiones entrantes. Si no lo necesitas, desactívalo."
else
  ok "Servidor SSH no activo (menos superficie de ataque)"
fi

# --- Cifrado de disco ---
# Lo que importa NO es que exista algún dispositivo cifrado en la máquina
# (podría ser un disco externo, o una partición suelta de otra instalación),
# sino que lo esté la raíz del sistema. Se recorre hacia arriba la cadena de
# dispositivos que respaldan '/' buscando un eslabón de tipo 'crypt'.
#
# La función SIEMPRE devuelve 0 y emite una palabra: con 'set -e', un
# 'funcion; echo $?' mataría la subshell antes de poder leer el código.
estado_cifrado_raiz() {
  if ! hay findmnt || ! hay lsblk; then echo desconocido; return 0; fi
  local fuente
  fuente="$(findmnt -no SOURCE / 2>/dev/null || true)"
  if [[ -z "$fuente" ]]; then echo desconocido; return 0; fi
  if lsblk -no TYPE --inverse "$fuente" 2>/dev/null | grep -qx crypt; then
    echo cifrada
  else
    echo en_claro
  fi
  return 0
}

case "$(estado_cifrado_raiz)" in
  cifrada)
    ok "Cifrado de disco: la raíz del sistema está cifrada (LUKS)" ;;
  en_claro)
    aviso "La raíz del sistema NO está cifrada. Quien se lleve el equipo lee tus datos."
    # Si hay otro dispositivo cifrado (un USB, una partición de otra instalación),
    # se dice explícitamente: si no, un [✓] ajeno haría creer que el sistema lo está.
    if lsblk -no TYPE 2>/dev/null | grep -qx crypt; then
      aviso "  Ojo: hay otra partición cifrada en la máquina, pero NO es la del sistema."
    fi ;;
  *)
    aviso "No he podido determinar si el disco está cifrado (falta findmnt o lsblk)" ;;
esac

# --- DNS ---
if hay resolvectl; then
  modo="$(resolvectl status 2>/dev/null | grep -m1 -i 'DNSOverTLS' || true)"
  [[ -n "$modo" ]] && printf '  DNS          : %s\n' "$(echo "$modo" | xargs)" || aviso "DNS-over-TLS sin configurar"
fi

# --- VPN ---
if hay mullvad; then
  ok "Mullvad instalado — estado: $(mullvad status 2>/dev/null | head -1 || echo '?')"
elif hay protonvpn-cli || hay protonvpn; then
  ok "Proton VPN instalado"
elif hay wg; then
  aviso "WireGuard presente, sin cliente VPN comercial"
else
  aviso "Sin cliente VPN instalado"
fi

titulo "Claves y cuentas"
if [[ -d "$HOME/.ssh" ]]; then
  encontradas=0
  for k in "$HOME"/.ssh/id_*.pub; do
    [[ -e "$k" ]] || continue
    ok "Clave SSH: $(basename "$k") → $(ssh-keygen -lf "$k" 2>/dev/null | awk '{print $1" bits, "$4}')"
    encontradas=1
  done
  [[ $encontradas -eq 0 ]] && aviso "No hay claves SSH en ~/.ssh"
else
  aviso "No existe ~/.ssh — aún sin claves"
fi

if hay git; then
  nombre="$(git config --global user.name  2>/dev/null || true)"
  correo="$(git config --global user.email 2>/dev/null || true)"
  firma="$(git config --global commit.gpgsign 2>/dev/null || echo false)"
  [[ -n "$nombre" ]] && ok "git user.name: $nombre"   || aviso "git user.name sin configurar"
  [[ -n "$correo" ]] && ok "git user.email: $correo"  || aviso "git user.email sin configurar"
  [[ "$firma" == "true" ]] && ok "Firma de commits activada" || aviso "Firma de commits DESACTIVADA"
fi

titulo "Resumen"
echo "  Las líneas con [!] son lo que queda por hacer."
echo "  Siguiente paso:  ./scripts/01-github.sh"
echo
