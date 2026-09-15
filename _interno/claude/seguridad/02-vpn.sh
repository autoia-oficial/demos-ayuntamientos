#!/usr/bin/env bash
# Instala y endurece una VPN comercial sin registros (Mullvad por defecto).
#
# Uso:   ./scripts/02-vpn.sh              # Mullvad
#        PROVEEDOR=proton ./scripts/02-vpn.sh
#        DRY_RUN=1 ./scripts/02-vpn.sh

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib-comun.sh"

PROVEEDOR="${PROVEEDOR:-mullvad}"

exigir_no_root
detectar_sistema
exigir_sudo

info "Sistema: $DISTRO_NOMBRE · Proveedor elegido: $PROVEEDOR"

# ═════════════════════════════════════════════════════════════════ MULLVAD ══
instalar_mullvad() {
  titulo "Instalando Mullvad VPN"

  if hay mullvad; then
    ok "Mullvad ya instalado"
  else
    case "$DISTRO_FAMILIA" in
      rhel)
        info "Añadiendo el repositorio firmado de Mullvad…"
        instalar dnf-plugins-core
        if sudo dnf config-manager --help 2>&1 | grep -q -- '--add-repo'; then
          sudo_ejecuta dnf config-manager --add-repo https://repository.mullvad.net/rpm/stable/mullvad.repo
        else
          sudo_ejecuta dnf config-manager addrepo --from-repofile=https://repository.mullvad.net/rpm/stable/mullvad.repo
        fi
        instalar mullvad-vpn
        ;;
      debian)
        info "Descargando y verificando la clave de firma de Mullvad…"
        ejecuta sudo mkdir -p -m 755 /usr/share/keyrings
        if [[ "$DRY_RUN" != "1" ]]; then
          curl -fsSL https://repository.mullvad.net/deb/mullvad-keyring.asc \
            | sudo tee /usr/share/keyrings/mullvad-keyring.asc >/dev/null
          echo "deb [signed-by=/usr/share/keyrings/mullvad-keyring.asc arch=$(dpkg --print-architecture)] https://repository.mullvad.net/deb/stable $(lsb_release -cs 2>/dev/null || echo stable) main" \
            | sudo tee /etc/apt/sources.list.d/mullvad.list >/dev/null
        fi
        actualizar_indices
        instalar mullvad-vpn
        ;;
      arch)
        aviso "Mullvad está en AUR. Con un ayudante de AUR (yay/paru):"
        echo "    yay -S mullvad-vpn-bin"
        hay yay  && ejecuta yay  -S --needed --noconfirm mullvad-vpn-bin
        hay paru && ejecuta paru -S --needed --noconfirm mullvad-vpn-bin
        ;;
    esac
  fi

  hay mullvad || { aviso "Mullvad aún no disponible en el PATH; abre una terminal nueva y repite."; return 0; }

  # ───────────────────────────────────────────── endurecimiento del túnel ───
  titulo "Endureciendo la configuración de Mullvad"

  # 'mullvad' devuelve error si la opción no existe en tu versión: no cortamos el script.
  intenta() {
    if [[ "$DRY_RUN" == "1" ]]; then
      printf '   %s(simulado)%s mullvad %s\n' "$C_AMAR" "$C_FIN" "$*"
    elif mullvad "$@" >/dev/null 2>&1; then
      ok "mullvad $*"
    else
      aviso "No aplicado (tu versión puede no soportarlo): mullvad $*"
    fi
  }

  # KILL SWITCH permanente: sin túnel, no hay tráfico. Ni siquiera al arrancar.
  intenta lockdown-mode set on
  intenta auto-connect set on

  # WireGuard: más rápido y con criptografía más moderna que OpenVPN
  intenta relay set tunnel-protocol wireguard

  # Resistencia a "cosecha ahora, descifra después" con ordenadores cuánticos
  intenta tunnel set wireguard --quantum-resistant on

  # DAITA: rellena el tráfico para frustrar el análisis de patrones por IA
  intenta tunnel set wireguard --daita on

  # DNS por el túnel + bloqueo en origen de anuncios, rastreadores y malware
  intenta dns set default --block-ads --block-malware --block-trackers

  # Sin fugas por IPv6 mal enrutado
  intenta tunnel set ipv6 on

  echo
  titulo "Qué te queda por hacer"
  cat <<'FIN'
  1) Consigue una cuenta en https://mullvad.net/es/account
     Se paga sin dar nombre ni correo: sólo te dan un número de cuenta de 16 dígitos.
     APÚNTALO EN PAPEL — si lo pierdes, pierdes la cuenta.

  2) Inicia sesión:
       mullvad account login <TU_NUMERO_DE_CUENTA>
       mullvad connect

  3) Comprueba que no hay fugas:
       mullvad status
     Y en el navegador: https://mullvad.net/check
     Debe decir "You are connected" y NO mostrar tu IP real ni tu DNS real.
FIN
}

# ══════════════════════════════════════════════════════════════ PROTON VPN ══
instalar_proton() {
  titulo "Proton VPN"
  cat <<'FIN'
  Proton VPN publica un paquete que instala su repositorio oficial. Como la URL
  lleva número de versión y cambia, este script NO la fija (una URL caducada
  instalaría algo equivocado). Hazlo así:

  1) Abre https://protonvpn.com/support/official-linux-vpn/
  2) Descarga el paquete de tu distribución:
       · AlmaLinux / Fedora / RHEL → el .rpm "protonvpn-stable-release"
       · Ubuntu / Debian           → el .deb "protonvpn-stable-release"
  3) VERIFICA EL CHECKSUM que aparece en esa misma página antes de instalar:
       sha256sum protonvpn-stable-release*.rpm
  4) Instala el repositorio y luego el cliente:
       sudo dnf install ./protonvpn-stable-release*.rpm   # RHEL/Alma
       sudo dnf install proton-vpn-gnome-desktop
     (en Debian/Ubuntu: sudo apt install ./protonvpn-stable-release*.deb
                        sudo apt update && sudo apt install proton-vpn-gnome-desktop)

  5) EN LA APP, activa estas dos opciones — son las importantes:
       · Kill Switch  (mejor "Permanent Kill Switch")
       · NetShield    (bloqueo de anuncios y malware)
     Y desactiva cualquier "conexión sin VPN al arrancar".

  Nota: el plan gratuito de Proton NO incluye kill-switch permanente ni NetShield.
FIN
}

case "$PROVEEDOR" in
  mullvad) instalar_mullvad ;;
  proton)  instalar_proton  ;;
  *)       fatal "PROVEEDOR debe ser 'mullvad' o 'proton' (recibido: $PROVEEDOR)" ;;
esac

# ══════════════════════════════════════════════════ fugas de DNS del sistema ═
titulo "DNS cifrado del sistema (protege cuando la VPN está desconectada)"

if hay resolvectl && systemctl is-active systemd-resolved >/dev/null 2>&1; then
  info "Configurando DNS-over-TLS en systemd-resolved"
  if [[ "$DRY_RUN" != "1" ]]; then
    sudo mkdir -p /etc/systemd/resolved.conf.d
    sudo tee /etc/systemd/resolved.conf.d/99-dns-cifrado.conf >/dev/null <<'CONF'
# DNS cifrado (DoT). Servidores de Mullvad y Quad9, ambos sin registros.
[Resolve]
DNS=194.242.2.2#dns.mullvad.net 9.9.9.9#dns.quad9.net 2620:fe::fe#dns.quad9.net
DNSOverTLS=yes
DNSSEC=allow-downgrade
FallbackDNS=
# No aceptes los DNS que imponga el router de una wifi pública
Domains=~.
CONF
    sudo systemctl restart systemd-resolved
  fi
  ok "DNS-over-TLS activo — tu proveedor de internet ya no ve qué dominios visitas"
else
  aviso "systemd-resolved no está activo; la VPN gestionará el DNS por su cuenta."
fi

echo
echo "  Siguiente paso:  ./scripts/03-endurecer.sh"
echo
