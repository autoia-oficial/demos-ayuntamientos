#!/usr/bin/env bash
# Librería común: detección de distribución, gestor de paquetes y utilidades.
# Se importa desde los demás scripts con:  source "$(dirname "$0")/lib-comun.sh"

set -euo pipefail

# ---------------------------------------------------------------- colores ---
if [[ -t 1 ]]; then
  C_ROJO=$'\e[31m'; C_VERDE=$'\e[32m'; C_AMAR=$'\e[33m'
  C_AZUL=$'\e[34m'; C_NEG=$'\e[1m'; C_FIN=$'\e[0m'
else
  C_ROJO=''; C_VERDE=''; C_AMAR=''; C_AZUL=''; C_NEG=''; C_FIN=''
fi

info()  { printf '%s[·]%s %s\n' "$C_AZUL"  "$C_FIN" "$*"; }
ok()    { printf '%s[✓]%s %s\n' "$C_VERDE" "$C_FIN" "$*"; }
aviso() { printf '%s[!]%s %s\n' "$C_AMAR"  "$C_FIN" "$*"; }
error() { printf '%s[✗]%s %s\n' "$C_ROJO"  "$C_FIN" "$*" >&2; }
titulo(){ printf '\n%s══ %s ══%s\n' "$C_NEG" "$*" "$C_FIN"; }

fatal() { error "$*"; exit 1; }

# --------------------------------------------------------------- dry-run ----
# Exporta DRY_RUN=1 para ver qué haría el script sin tocar nada.
DRY_RUN="${DRY_RUN:-0}"

# ejecuta <comando...>  → lo corre, o sólo lo imprime si DRY_RUN=1
ejecuta() {
  if [[ "$DRY_RUN" == "1" ]]; then
    printf '   %s(simulado)%s %s\n' "$C_AMAR" "$C_FIN" "$*"
  else
    "$@"
  fi
}

# como 'ejecuta' pero con sudo por delante
sudo_ejecuta() {
  if [[ "$DRY_RUN" == "1" ]]; then
    printf '   %s(simulado)%s sudo %s\n' "$C_AMAR" "$C_FIN" "$*"
  else
    sudo "$@"
  fi
}

# --------------------------------------------------- detección de sistema ---
DISTRO_ID=""       # almalinux, ubuntu, debian, fedora, arch...
DISTRO_FAMILIA=""  # rhel | debian | arch
DISTRO_NOMBRE=""   # texto legible
PKG=""             # dnf | apt | pacman
FIREWALL=""        # firewalld | ufw

detectar_sistema() {
  [[ -r /etc/os-release ]] || fatal "No encuentro /etc/os-release; no puedo identificar la distribución."
  # shellcheck disable=SC1091
  . /etc/os-release

  DISTRO_ID="${ID:-desconocido}"
  DISTRO_NOMBRE="${PRETTY_NAME:-$DISTRO_ID}"
  local familias=" ${ID_LIKE:-} $DISTRO_ID "

  if [[ "$familias" == *" rhel "* || "$familias" == *" fedora "* || "$familias" == *" centos "* ]]; then
    DISTRO_FAMILIA="rhel";   PKG="dnf";    FIREWALL="firewalld"
  elif [[ "$familias" == *" debian "* || "$familias" == *" ubuntu "* ]]; then
    DISTRO_FAMILIA="debian"; PKG="apt";    FIREWALL="ufw"
  elif [[ "$familias" == *" arch "* ]]; then
    DISTRO_FAMILIA="arch";   PKG="pacman"; FIREWALL="ufw"
  else
    fatal "Distribución no reconocida: $DISTRO_NOMBRE (ID=$DISTRO_ID, ID_LIKE=${ID_LIKE:-vacío})"
  fi

  # dnf5 / yum como alternativas
  if [[ "$PKG" == "dnf" ]] && ! command -v dnf >/dev/null 2>&1; then
    command -v yum >/dev/null 2>&1 && PKG="yum" || fatal "Ni dnf ni yum disponibles."
  fi
}

# ¿está instalado este binario?
hay() { command -v "$1" >/dev/null 2>&1; }

# ¿está instalado este paquete? (por nombre de paquete, no de binario)
paquete_instalado() {
  case "$PKG" in
    dnf|yum) rpm -q "$1" >/dev/null 2>&1 ;;
    apt)     dpkg -s "$1" >/dev/null 2>&1 ;;
    pacman)  pacman -Q "$1" >/dev/null 2>&1 ;;
  esac
}

# instala paquetes, saltando los que ya están
instalar() {
  local pendientes=()
  for p in "$@"; do
    if paquete_instalado "$p"; then
      ok "$p ya instalado"
    else
      pendientes+=("$p")
    fi
  done
  [[ ${#pendientes[@]} -eq 0 ]] && return 0

  info "Instalando: ${pendientes[*]}"
  case "$PKG" in
    dnf|yum) sudo_ejecuta "$PKG" install -y "${pendientes[@]}" ;;
    apt)     sudo_ejecuta apt-get install -y "${pendientes[@]}" ;;
    pacman)  sudo_ejecuta pacman -S --needed --noconfirm "${pendientes[@]}" ;;
  esac
}

actualizar_indices() {
  info "Actualizando índices de paquetes…"
  case "$PKG" in
    dnf|yum) sudo_ejecuta "$PKG" makecache -q ;;
    apt)     sudo_ejecuta apt-get update -qq ;;
    pacman)  sudo_ejecuta pacman -Sy --noconfirm ;;
  esac
}

# ------------------------------------------------------------ validaciones --
exigir_no_root() {
  [[ "${EUID:-$(id -u)}" -ne 0 ]] || fatal \
    "No ejecutes este script como root. Úsalo con tu usuario normal; pedirá sudo cuando haga falta."
}

exigir_sudo() {
  hay sudo || fatal "Necesitas 'sudo' instalado y tu usuario en el grupo de administradores."
  if ! sudo -n true 2>/dev/null; then
    info "Se te pedirá la contraseña de sudo."
    sudo -v || fatal "No se pudo obtener permiso de sudo."
  fi
}

# pregunta sí/no; devuelve 0 si sí
confirmar() {
  local respuesta
  read -r -p "$(printf '%s[?]%s %s [s/N] ' "$C_AMAR" "$C_FIN" "$1")" respuesta
  [[ "$respuesta" =~ ^[sSyY]$ ]]
}

# habilita un servicio systemd si existe systemd
activar_servicio() {
  hay systemctl || { aviso "systemd no disponible; omito activar $1"; return 0; }
  sudo_ejecuta systemctl enable --now "$1"
}
