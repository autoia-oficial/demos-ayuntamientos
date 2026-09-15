# claude

Todo lo que Claude ha construido para AutoIA, en un sitio.

Vive en `_interno/`, junto al sistema de ventas, para dejar la raíz del
repositorio sólo con las demos que se publican.

## Qué hay aquí

### `seguridad/` — endurecimiento del equipo

Scripts que se ejecutan **en tu ordenador**. Detectan la distribución solos
(AlmaLinux, Fedora, Ubuntu, Debian, Arch), así que funcionan igual antes y
después de reinstalar.

```bash
chmod +x _interno/claude/seguridad/*.sh
./_interno/claude/seguridad/00-diagnostico.sh    # qué tienes y qué falta (no toca nada)
./_interno/claude/seguridad/01-github.sh         # claves SSH y firma de commits
./_interno/claude/seguridad/02-vpn.sh            # Mullvad con kill-switch
./_interno/claude/seguridad/03-endurecer.sh      # cortafuegos, kernel, actualizaciones
```

Cualquiera admite `DRY_RUN=1` delante para ver qué haría sin ejecutarlo.

| Fichero | Para qué |
|---|---|
| `00-diagnostico.sh` | Informe de estado. No modifica nada |
| `01-github.sh` | git + gh, dos claves ed25519 (entrar / firmar), ajustes de git |
| `02-vpn.sh` | Mullvad: kill-switch permanente, WireGuard, DNS cifrado |
| `03-endurecer.sh` | Cortafuegos, sysctl, SELinux, SSH, fail2ban. Bloque a bloque |
| `lib-comun.sh` | Detección de distro y gestor de paquetes |
| `SEGURIDAD.md` | Guía ordenada por impacto real |
| `MIGRAR-DISTRO.md` | Reinstalar con cifrado LUKS, paso a paso |

## Lo que está en otro sitio

| Qué | Dónde |
|---|---|
| **Sistema de ventas y CRM** | `../sistema-de-ventas/` (este mismo repo) |
| **132 demos municipales** | la raíz de este repo, una carpeta por municipio |
| **Generadores de demos** | `../../_generar/` |
| **Landing con animaciones GSAP** | repo `autoia-oficial/autoia` |
| **Backend de reservas** | repo `autoia-oficial/autoia`, en `src/` |
| **Web pública** | repo `autoia-oficial/AutoIA-web` |

## Las cuatro fases

Estado real, a 15 de septiembre de 2026:

| | Fase | Estado |
|---|---|---|
| 1 | Base de datos cifrada | ✅ Hecha — `../sistema-de-ventas/datos/caja.mjs` |
| 2 | IA en local | 🟡 Empezada en el repo `autoia` (Ollama), con errores de sintaxis pendientes |
| 3 | Animaciones personalizadas | ✅ Hechas — GSAP en el repo `autoia` |
| 4 | **Correos diarios a ayuntamientos** | ✅ **Hecho — `../sistema-de-ventas/`** |

La fase 2 se quedó a medias en otra sesión: `respuestas.js`, `server.js` y
`reservas.js` no pasan `node --check`.

## Una cosa que conviene no repetir

El CRM anterior vivía sólo en una carpeta local del ordenador y se perdió al
reinstalar el sistema. Por eso esto está en el repositorio: **lo que no está en
git, no existe.** Si formateas, vuelve con un `git clone`.
