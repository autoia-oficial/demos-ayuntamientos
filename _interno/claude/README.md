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
| 2 | IA en local | ⬜ Sin empezar. Ver la nota de abajo |
| 3 | Animaciones personalizadas | ✅ Hechas — GSAP en el repo `autoia` |
| 4 | **Correos diarios a ayuntamientos** | ✅ **Hecho — `../sistema-de-ventas/`** |

### La fase 2 no estaba empezada

Esta tabla decía que la fase 2 estaba a medias, «empezada (Ollama), con errores
de sintaxis pendientes». Eran dos cosas distintas que se anotaron como una:

**No hay código de Ollama.** Ni una línea, en ningún commit de ningún repo. Se
buscó en todo el historial de `autoia` y de este repositorio.

**Los errores de sintaxis sí existían, y eran otra cosa.** No tres ficheros,
sino siete: a todo el backend de `autoia` se le habían quitado los acentos
graves de las plantillas de cadena, y con ellos algunas interpolaciones. Ya
está arreglado y la suite queda en 31 de 31. No tenía relación con Ollama.

Así que la fase 2 empieza de cero, y lo primero es decidir qué tiene que hacer
el modelo local: hoy el backend responde con frases fijas y el `switch` del
webhook manda a «función no reconocida» todo lo que no sea una de las cuatro
herramientas de reserva.

## Una cosa que conviene no repetir

El CRM anterior vivía sólo en una carpeta local del ordenador y se perdió al
reinstalar el sistema. Por eso esto está en el repositorio: **lo que no está en
git, no existe.** Si formateas, vuelve con un `git clone`.
