#!/usr/bin/env bash
# ---------------------------------------------------------------------------
#  SISTEMA DE VENTAS — AutoIA
#
#    ./abrir.sh        menú
#    ./abrir.sh crm    abre el CRM directamente
#
#  El CRM se sirve por HTTP en localhost, no se abre con doble clic: los
#  navegadores bloquean que un fichero file:// lea otro fichero local, así que
#  con doble clic el CRM saldría vacío.
# ---------------------------------------------------------------------------
set -euo pipefail

AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$AQUI"

if [[ -t 1 ]]; then
  N=$'\e[1m'; V=$'\e[32m'; A=$'\e[33m'; R=$'\e[31m'; F=$'\e[0m'
else N=''; V=''; A=''; R=''; F=''; fi

ok()    { printf '%s[✓]%s %s\n' "$V" "$F" "$*"; }
aviso() { printf '%s[!]%s %s\n' "$A" "$F" "$*"; }
error() { printf '%s[✗]%s %s\n' "$R" "$F" "$*" >&2; }

hay() { command -v "$1" >/dev/null 2>&1; }

# --------------------------------------------------------------- datos ------
generar_datos() {
  hay node || { error "Hace falta Node.js: sudo dnf install nodejs"; return 1; }
  node datos/extraer.mjs
}

asegurar_datos() {
  if [[ ! -f datos/municipios.json ]]; then
    aviso "No existe datos/municipios.json todavía. Generándolo…"
    generar_datos
  fi
}

# ----------------------------------------------------------------- CRM ------
abrir_crm() {
  asegurar_datos
  hay python3 || { error "Hace falta python3 para servir el CRM."; return 1; }

  # Puerto libre a partir del 8765. Si están todos ocupados, se avisa en vez
  # de arrancar en uno impredecible.
  local puerto=8765 limite=8785
  while (( puerto <= limite )) && (exec 3<>/dev/tcp/127.0.0.1/$puerto) 2>/dev/null; do
    exec 3>&- 2>/dev/null || true
    puerto=$((puerto + 1))
  done
  if (( puerto > limite )); then
    error "No hay puertos libres entre 8765 y $limite."
    return 1
  fi

  local url="http://127.0.0.1:$puerto/crm/"
  python3 -m http.server "$puerto" --bind 127.0.0.1 >/dev/null 2>&1 &
  local servidor=$!
  # Pase lo que pase (Ctrl+C incluido), el servidor se cierra al salir.
  trap 'kill "$servidor" 2>/dev/null || true' EXIT INT TERM

  # Espera a que responda de verdad, en vez de dormir a ciegas.
  local intento=0
  until (exec 3<>/dev/tcp/127.0.0.1/$puerto) 2>/dev/null; do
    exec 3>&- 2>/dev/null || true
    intento=$((intento + 1))
    if (( intento > 50 )); then error "El servidor no arrancó."; return 1; fi
    read -rt 0.1 <> <(:) 2>/dev/null || true
  done
  exec 3>&- 2>/dev/null || true

  ok "CRM en $url"
  if hay xdg-open; then xdg-open "$url" >/dev/null 2>&1 &
  else aviso "Sin xdg-open: abre esa dirección a mano en el navegador."; fi

  echo
  echo "  ${N}Ctrl+C para cerrar el servidor.${F}"
  wait "$servidor" 2>/dev/null || true
}

# -------------------------------------------------------------- correos -----
correos_del_dia() {
  asegurar_datos
  hay node || { error "Hace falta Node.js."; return 1; }
  read -rp "  ¿Qué tanda (día) quieres preparar? " dia
  [[ "$dia" =~ ^[0-9]+$ ]] || { error "Eso no es un número de tanda."; return 1; }
  echo
  node correos/enviar.mjs --dia "$dia"
  echo
  aviso "Eso ha sido una simulación. Para enviar de verdad:"
  echo "      node correos/enviar.mjs --dia $dia --enviar"
}

estado_actual() {
  asegurar_datos
  node -e '
    const m = JSON.parse(require("fs").readFileSync("datos/municipios.json","utf8"));
    const n = c => m.filter(x => x.contacto === c).length;
    console.log(`  municipios     : ${m.length}`);
    console.log(`  con correo     : ${n("email")}`);
    console.log(`  sólo teléfono  : ${n("solo-tel")}`);
    console.log(`  sin contacto   : ${n("falta")}`);
    console.log(`  tandas         : ${new Set(m.map(x=>x.dia)).size}`);
  '
}

# ---------------------------------------------------------------- menú ------
menu() {
  while true; do
    cat <<MENU

  ${N}SISTEMA DE VENTAS — AutoIA${F}

    ${N}1${F}  Abrir el CRM en el navegador
    ${N}2${F}  Preparar los correos de una tanda (simulación)
    ${N}3${F}  Ver el estado de los datos
    ${N}4${F}  Regenerar municipios.json desde las demos
    ${N}0${F}  Salir

MENU
    read -rp "  Opción: " opcion
    echo
    case "$opcion" in
      1) abrir_crm ;;
      2) correos_del_dia ;;
      3) estado_actual ;;
      4) generar_datos ;;
      0|q|salir) exit 0 ;;
      *) aviso "Opción no válida." ;;
    esac
  done
}

case "${1:-}" in
  crm)     abrir_crm ;;
  correos) correos_del_dia ;;
  estado)  estado_actual ;;
  datos)   generar_datos ;;
  "")      menu ;;
  *)       error "Uso: ./abrir.sh [crm|correos|estado|datos]"; exit 1 ;;
esac
