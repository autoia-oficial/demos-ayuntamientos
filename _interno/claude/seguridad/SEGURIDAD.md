# Guía de seguridad — Linux, GitHub y VPN

Guía práctica para dejar el equipo y la cuenta de GitHub en un estado sólido.
Está ordenada por **impacto real**: lo de arriba te protege mucho más que lo
de abajo. Si sólo haces tres cosas, haz las tres primeras.

---

## Orden de prioridad

| # | Qué | Por qué importa | Dónde |
|---|---|---|---|
| 1 | **2FA en GitHub con llave física o TOTP** | Impide que te roben la cuenta aunque tengan tu contraseña | manual |
| 2 | **Cifrado de disco (LUKS)** | Sin él, quien se lleve el equipo lee todo | instalador |
| 3 | **Actualizaciones automáticas** | La mayoría de intrusiones usan fallos ya parcheados | `03-endurecer.sh` |
| 4 | **Gestor de contraseñas** | Reutilizar contraseñas es la causa nº1 de cuentas robadas | manual |
| 5 | **Copias de seguridad 3-2-1** | Es lo único que funciona contra el ransomware | pendiente |
| 6 | **Cortafuegos denegando entrante** | Cierra servicios expuestos sin querer | `03-endurecer.sh` |
| 7 | **VPN con kill-switch** | Privacidad frente al proveedor de internet y wifis públicas | `02-vpn.sh` |
| 8 | **Claves SSH + firma de commits** | Nadie puede suplantarte en tus commits | `01-github.sh` |
| 9 | **Endurecimiento del kernel** | Cierra vectores de red antiguos | `03-endurecer.sh` |

> Fíjate en que la VPN está en el puesto 7. Es útil, pero una VPN **no** te
> protege de malware, ni de contraseñas robadas, ni de que te roben el
> portátil. Lo que hace es impedir que tu proveedor de internet y las wifis
> públicas vean tu tráfico. Nada más. Desconfía de quien te la venda como
> "seguridad total".

---

## Cómo usar los scripts

Se ejecutan **en tu ordenador**, no aquí. Clona el repositorio y lánzalos en
orden. Todos detectan tu distribución solos (AlmaLinux, Ubuntu, Debian,
Fedora, Arch…).

```bash
git clone https://github.com/autoia-oficial/AutoIA-web.git
cd AutoIA-web
chmod +x scripts/*.sh
```

### 0 · Diagnóstico — no toca nada

```bash
./scripts/00-diagnostico.sh
```

Te dice qué distro tienes de verdad y qué protecciones te faltan. **Empieza
por aquí**, sobre todo porque no estás seguro de si es AlmaLinux.

### 1 · GitHub

```bash
./scripts/01-github.sh
```

Instala `git` y `gh`, crea **dos** claves ed25519 (una para conectarte, otra
para firmar commits) y configura git. Al final te dice los pasos manuales:
crear la cuenta, activar 2FA y `gh auth login`.

### 2 · VPN

```bash
./scripts/02-vpn.sh                  # Mullvad
PROVEEDOR=proton ./scripts/02-vpn.sh # Proton VPN
```

Instala Mullvad desde su repositorio firmado y activa kill-switch permanente,
WireGuard, resistencia cuántica, DAITA y bloqueo de anuncios/malware por DNS.

### 3 · Endurecimiento del sistema

```bash
./scripts/03-endurecer.sh
```

Pregunta bloque por bloque: actualizaciones automáticas, cortafuegos,
parámetros del kernel, SELinux, SSH y fail2ban. Puedes decir que sí a unos y
que no a otros. Guarda copia de todo lo que modifica.

### Probar antes de aplicar

```bash
DRY_RUN=1 ./scripts/03-endurecer.sh
```

Enseña cada comando que ejecutaría, sin ejecutarlo.

---

## Lo que los scripts NO pueden hacer por ti

### Cifrado de disco

```bash
lsblk -o NAME,TYPE,MOUNTPOINT
```

Si no aparece ningún dispositivo de tipo `crypt`, tu disco está sin cifrar.
Cualquiera que se lleve el equipo arranca desde un USB y lee todos tus
ficheros sin necesitar tu contraseña.

No se puede cifrar un sistema ya instalado sin riesgo serio de pérdida de
datos. La forma correcta: copia de seguridad completa → reinstalar marcando
**"Cifrar el disco"** (LUKS) en el instalador → restaurar.

### 2FA en GitHub

De mejor a peor:

1. **Llave física** (YubiKey, Nitrokey, SoloKey) — es la única inmune al
   phishing: la llave comprueba el dominio, así que una web falsa no
   funciona aunque tú te la creas. Compra **dos** y guarda una de respaldo.
2. **App TOTP** — Aegis (Android) o Ente Auth (iOS). Buenas y gratuitas.
3. **SMS** — evítalo. Con un *SIM swapping* te roban el número y con él la
   cuenta.

Guarda los códigos de recuperación **en papel**, fuera del ordenador.

### Contraseña de BIOS/UEFI

Sin ella, arrancar desde un USB salta tu pantalla de login. Ponla en el menú
de arranque (F2 o Supr al encender).

### Gestor de contraseñas

```bash
sudo dnf install keepassxc      # AlmaLinux/Fedora
sudo apt install keepassxc      # Ubuntu/Debian
```

KeePassXC guarda la base en local. Bitwarden sincroniza entre dispositivos
con cifrado extremo a extremo. Cualquiera de los dos sirve; lo importante es
**no reutilizar contraseñas nunca**.

---

## Seguridad del repositorio

Lo que ya está puesto en este repositorio:

| Fichero | Qué hace |
|---|---|
| `.github/workflows/seguridad.yml` | Busca secretos filtrados en el código y en todo el historial |
| `.github/workflows/analisis-codigo.yml` | CodeQL: busca XSS, inyección y otros fallos reales |
| `.github/dependabot.yml` | Avisa de dependencias con vulnerabilidades conocidas |
| `.gitignore` | Evita subir `.env`, claves privadas y credenciales |
| `SECURITY.md` | Canal privado para informar de fallos |

### Ajustes que hay que activar a mano en GitHub

En **Settings → Security**:

- **Secret scanning** + **Push protection** — bloquea el envío de un commit
  con un token dentro, antes de que llegue al servidor
- **Private vulnerability reporting** — activa el canal de `SECURITY.md`
- **Dependabot alerts** y **security updates**

En **Settings → Rules → Rulesets** (para la rama `main`):

- Requerir pull request antes de fusionar
- Requerir que los checks de estado pasen
- **Requerir commits firmados** ← el script 01 ya te deja firmando
- Bloquear `force push`

> ⚠️ Si eres el único que trabaja en el repositorio, exigir pull request te
> obligará a abrir uno para cada cambio. Es buena costumbre, pero decídelo tú.

---

## Si algo sale mal

**El script 03 me dejó sin conexión.** Los originales están en
`~/.respaldo-endurecimiento-FECHA/`. Para revertir el cortafuegos:

```bash
sudo firewall-cmd --permanent --zone=public --add-service=ssh && sudo firewall-cmd --reload
sudo ufw disable          # en Ubuntu/Debian
```

**Para revertir los parámetros del kernel:**

```bash
sudo rm /etc/sysctl.d/99-endurecimiento.conf && sudo sysctl --system
```

**No puedo conectarme por SSH a GitHub:**

```bash
ssh -vT git@github.com    # muestra qué clave está intentando usar
ssh-add -l                # ¿está la clave cargada en el agente?
```

**Perdí la contraseña de la clave SSH.** No se puede recuperar. Crea una
clave nueva con el script 01, súbela a GitHub y borra la vieja desde
github.com/settings/keys.

---

## Lo que queda pendiente

- [ ] Optimización del sistema (arranque, memoria, servicios innecesarios)
- [ ] Servidor propio de almacenamiento de datos
- [ ] Copias de seguridad cifradas automáticas (borgbackup)
- [ ] Cifrado de disco, si el diagnóstico dice que falta
