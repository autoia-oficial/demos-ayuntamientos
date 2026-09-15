# Migrar de AlmaLinux a Fedora (o a Ubuntu)

Guía para reinstalar sin perder nada importante y **aprovechando para cifrar
el disco**, que es la única mejora de seguridad que no se puede hacer sobre
un sistema ya instalado.

> Léela entera antes de empezar. Una vez formateas, no hay marcha atrás.

## Qué distribución elegir

|  | Fedora Workstation | Ubuntu LTS |
|---|---|---|
| Familia | RPM (`dnf`, `firewalld`, SELinux) | DEB (`apt`, `ufw`, AppArmor) |
| Soporte por versión | ~13 meses | 5 años |
| App de escritorio de Claude | ❌ no disponible | ✅ disponible |
| Claude Code (terminal) | ✅ | ✅ |
| Los scripts de este repo | Funcionan sin cambios | Funcionan sin cambios |

Las dos valen. Fedora si quieres software reciente y ya conoces `dnf`;
Ubuntu si quieres la app de escritorio y olvidarte de actualizar de versión
durante años.

---

## ⚠️ Reinstalar BORRA EL DISCO

Todo lo que no esté copiado fuera se pierde. Sin papelera y sin recuperación.

---

## Fase 1 · Copia de seguridad

```bash
du -sh ~                 # cuánto ocupa tu carpeta personal
ls -A ~/Documents ~/Pictures ~/Videos ~/Music ~/Downloads ~/Desktop
```

Si esas carpetas están vacías, no tienes nada que salvar. Si no:

```bash
rsync -av --progress ~/ /run/media/$USER/TU_USB/copia/
```

- [ ] Documentos, fotos, vídeos
- [ ] Marcadores de Firefox → ☰ → Marcadores → Gestionar → Exportar a HTML
- [ ] Proyectos que no estén ya en GitHub

### Lo que NO hace falta copiar

- **Claves SSH** (`~/.ssh/`) — más limpio crear unas nuevas y borrar las viejas
  de GitHub. Mover claves privadas en un USB es más riesgo que beneficio.
- **Este repositorio** — ya está en GitHub.

### Particiones de instalaciones anteriores

Antes de formatear, mira si quedan datos en particiones viejas:

```bash
lsblk -f
```

Si ves una partición `crypto_LUKS` de una instalación anterior, puedes intentar
abrirla y montarla para rescatar ficheros (necesitas su contraseña):

```bash
sudo cryptsetup open /dev/nvme0n1pX antigua
sudo mount /dev/mapper/antigua /mnt
ls /mnt
```

---

## Fase 2 · Apuntar en PAPEL

- [ ] Usuario y contraseña de GitHub
- [ ] **Códigos de recuperación del 2FA de GitHub**
- [ ] Códigos de respaldo de Google
- [ ] Número de cuenta de Mullvad (16 dígitos), si la tienes
- [ ] Contraseñas del navegador → expórtalas o pásalas a un gestor

> Un código de recuperación guardado sólo en el ordenador que vas a borrar no
> es una copia de seguridad. El papel no lo sobrescribe ningún instalador.

---

## Fase 3 · Descargar y VERIFICAR la imagen

### Fedora Workstation

Descarga desde **https://fedoraproject.org/workstation/download/**

En esa misma página tienes el enlace al fichero `CHECKSUM`. Descárgalo también,
al mismo directorio, y verifica:

```bash
cd ~/Downloads
sha256sum -c *-CHECKSUM 2>/dev/null | grep -i 'Workstation.*OK'
```

Debe decir `OK`. Si dice `FAILED` o no dice nada, la descarga está mal: bórrala
y repítela.

### Ubuntu LTS

Descarga desde **https://ubuntu.com/download/desktop** y compara a mano con el
valor publicado en *"Verify your download"*:

```bash
sha256sum ~/Downloads/ubuntu-*.iso
```

### Por qué esto importa

Una imagen incompleta o alterada instala un sistema roto o comprometido desde
el primer arranque, y eso no lo arregla ningún cortafuegos después. Comprueba
también el tamaño antes que nada:

```bash
ls -lh ~/Downloads/*.iso
```

Si pone `0`, la descarga no llegó a empezar.

---

## Fase 4 · Grabar el USB

**Usa un USB que no contenga nada que necesites**: grabar la imagen lo borra
por completo.

Identifica el dispositivo — la columna `TRAN` debe decir `usb`:

```bash
lsblk -o NAME,SIZE,TYPE,TRAN,MOUNTPOINT,LABEL
```

⚠️ **El nombre `sda` no es fijo**: se lo queda el USB que esté conectado en ese
momento. Si desenchufas uno y pones otro, el nuevo puede pasar a llamarse
`sda`. Comprueba el tamaño para asegurarte de que es el correcto.

```bash
sudo umount /dev/sdX1
sudo dd if=~/Downloads/LA_IMAGEN.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

Tarda varios minutos y parece congelado al final mientras `sync` vacía la
caché. Espera a que vuelva el prompt: verás `records in` igual a `records out`.

Comprueba que quedó bien grabado:

```bash
sudo udevadm settle
lsblk -f /dev/sdX
```

Debe aparecer `iso9660` y la etiqueta de la distribución.

> Si prefieres no usar el terminal, la aplicación **Discos** de GNOME graba
> imágenes (☰ → *Restaurar imagen de disco*) y te muestra modelo y tamaño en
> pantalla, que es más difícil de confundir que una letra de dispositivo.

---

## Fase 5 · Instalar

Arranca desde el USB (F12, F2 o Supr al encender, según el portátil).

**Las opciones que importan:**

| | Fedora (Anaconda) | Ubuntu |
|---|---|---|
| Destino | *Almacenamiento* → disco completo | *Borrar disco e instalar* |
| **Cifrado** | ✅ **Cifrar mis datos** | ✅ **Usar LUKS** (en opciones avanzadas) |
| Contraseña de cifrado | Larga, **en papel** | Larga, **en papel** |
| Drivers de terceros | Activa los repos de terceros | Marca la casilla |

> La contraseña de cifrado te la pedirá **al encender el ordenador**, antes de
> que arranque el sistema. Sin ella el disco es ilegible, también para ti.
> Si la pierdes, pierdes los datos. En papel, en un cajón.

---

## Fase 6 · Volver a dejarlo todo listo

Los scripts detectan la distribución solos: en Fedora usarán `dnf` y
`firewalld`; en Ubuntu, `apt` y `ufw`. No hay que tocar nada.

```bash
# Fedora:
sudo dnf install -y git
# Ubuntu:
sudo apt update && sudo apt install -y git

git clone https://github.com/autoia-oficial/AutoIA-web.git
cd AutoIA-web
git checkout claude/wonderful-pascal-gvs501
chmod +x scripts/*.sh

./scripts/00-diagnostico.sh
./scripts/01-github.sh
./scripts/02-vpn.sh
./scripts/03-endurecer.sh
```

En el paso del correo, usa este sin buscar nada:

```
265062451+autoia-oficial@users.noreply.github.com
```

### Claude Code

**Fedora** (mismo repositorio firmado que en AlmaLinux):

```bash
sudo tee /etc/yum.repos.d/claude-code.repo <<'REPO'
[claude-code]
name=Claude Code
baseurl=https://downloads.claude.ai/claude-code/rpm/stable
enabled=1
gpgcheck=1
gpgkey=https://downloads.claude.ai/keys/claude-code.asc
REPO
sudo dnf install claude-code
```

**Ubuntu**:

```bash
sudo apt install curl gnupg
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \
  -o /etc/apt/keyrings/claude-code.asc
gpg --show-keys /etc/apt/keyrings/claude-code.asc   # VERIFICA la huella
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] https://downloads.claude.ai/claude-code/apt/stable stable main" \
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update && sudo apt install claude-code
```

En ambos casos, **verifica que la huella de la clave sea**:

```
31DD DE24 DDFA B679 F42D  7BD2 BAA9 29FF 1A7E CACE
```

Si no coincide, no instales.

### La app de escritorio (sólo Ubuntu/Debian)

No está disponible para Fedora ni RHEL. En Ubuntu:

```bash
sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc \
  https://downloads.claude.ai/claude-desktop/key.asc
gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc
#   misma huella 31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" \
  | sudo tee /etc/apt/sources.list.d/claude-desktop.list
sudo apt update && sudo apt install claude-desktop
```

### Borrar las claves viejas de GitHub

Como creas claves nuevas, las anteriores ya no valen y sólo son superficie de
ataque. Bórralas en **https://github.com/settings/keys**.

---

## Lista final

- [ ] Copia de seguridad hecha **y comprobada** (ábrela y mira que están los ficheros)
- [ ] Contraseñas y códigos de recuperación **en papel**
- [ ] Particiones viejas revisadas por si quedan datos
- [ ] Imagen descargada y **checksum verificado**
- [ ] USB grabado y comprobado con `lsblk -f`
- [ ] Instalado **con cifrado activado**
- [ ] Scripts pasados otra vez
- [ ] Claves viejas borradas de GitHub
- [ ] 2FA comprobado desde el sistema nuevo
