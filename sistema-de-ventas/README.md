# Sistema de ventas — AutoIA

CRM y envío diario de correos a ayuntamientos, sobre las demos de este repo.

## Empezar

```bash
cd sistema-de-ventas
./abrir.sh
```

```
  1  Abrir el CRM en el navegador
  2  Preparar los correos de una tanda (simulación)
  3  Ver el estado de los datos
  4  Regenerar municipios.json desde las demos
  5  Guardar el CRM en la caja cifrada
  6  Abrir la caja cifrada
  0  Salir
```

Atajo directo: `./abrir.sh crm`

> El CRM **no** se abre con doble clic. Los navegadores impiden que una página
> `file://` lea otro fichero local, así que saldría vacía. `abrir.sh` levanta un
> servidor en `127.0.0.1` y lo abre desde ahí.

## Qué hay

| Ruta | Para qué |
|---|---|
| `abrir.sh` | Menú. Sirve el CRM y lanza los envíos |
| `crm/index.html` | CRM: estado, notas y filtros por municipio |
| `datos/extraer.mjs` | Saca los municipios de `_generar/*.mjs` a JSON |
| `datos/municipios.json` | Los 132 municipios (generado, no editar a mano) |
| `correos/enviar.mjs` | Envío diario, con simulación por defecto |
| `correos/smtp.mjs` | Cliente SMTP mínimo, sin dependencias |
| `correos/plantilla.txt` | El texto del correo |
| `correos/bajas.txt` | Quien pide la baja. **Nunca** se le vuelve a escribir |
| `correos/config.json` | Tus datos SMTP. **No se sube al repo** |
| `datos/caja.mjs` | Base de datos cifrada (AES-256-GCM) |
| `datos/crm.caja` | Tus datos cifrados. **No se sube al repo** |

## Los datos

Salen de los mismos ficheros que generan las demos, así que el CRM y las
páginas publicadas no pueden desincronizarse. Hay una sola fuente de verdad.

```
132 municipios · 109 con correo · 15 sólo teléfono · 8 sin contacto
```

Los 8 sin contacto son la tanda del día 01, que se envió a mano y no dejó los
correos apuntados. El CRM los marca en ámbar para que se les busque.

Tras tocar cualquier `_generar/municipios*.mjs`:

```bash
node datos/extraer.mjs
```

## Enviar correos

```bash
node correos/enviar.mjs --dia 5             # simula: no manda nada
node correos/enviar.mjs --dia 5 --enviar    # manda de verdad
```

Antes del primer envío real:

```bash
cp correos/config.ejemplo.json correos/config.json
# y edita config.json con tus datos
```

Con Gmail hace falta una **contraseña de aplicación**, no la de la cuenta:
Google → Seguridad → Verificación en dos pasos → Contraseñas de aplicaciones.

### Tres reglas que el script no deja saltarse

1. **A quien esté en `bajas.txt` no se le escribe.** Nunca, aunque siga en la lista.
2. **A quien ya se le escribió no se le repite.** Queda anotado en `enviados.json`,
   que se guarda después de *cada* envío: si el proceso se corta a la mitad, lo ya
   mandado no se repite en la siguiente ejecución.
3. **Sin correo verificado no se inventa ninguno.** Ese municipio se salta y se
   dice por qué. Un correo inventado rebota, y los rebotes queman el dominio.

También hay tope diario (`porDia`) y espera entre envíos (`segundosEntreEnvios`):
mandar 100 correos seguidos desde una cuenta nueva es la forma más rápida de
acabar en spam.

## Lo legal, en dos líneas

Es comunicación comercial no solicitada a organismos públicos. En España la rige
la **LSSI-CE art. 21** y el **RGPD**. Por eso la plantilla se identifica como
comunicación comercial y ofrece la baja en el propio texto, y por eso existe
`bajas.txt`. **Cuando alguien responda BAJA, añádelo ahí el mismo día.**

No es un consejo legal: si el volumen crece, consúltalo con quien sepa.

## Copia de seguridad cifrada

El estado del CRM vive en el almacenamiento del navegador. Si formateas, se
pierde — que es exactamente lo que pasó con el sistema anterior.

```bash
# 1. Exporta desde el CRM (botón azul) → crm-ayuntamientos-2026-09-15.json
# 2. Guárdalo cifrado:
node datos/caja.mjs guardar ~/Descargas/crm-ayuntamientos-2026-09-15.json
# 3. Borra el JSON sin cifrar
rm ~/Descargas/crm-ayuntamientos-2026-09-15.json
```

Para recuperarlo:

```bash
node datos/caja.mjs abrir recuperado.json
# y lo importas en el CRM con el botón "Importar"
```

### Qué protege y qué no

`crm.caja` va cifrado con **AES-256-GCM**, y la clave sale de tu contraseña
mediante **scrypt** con coste alto (N=131072): cada intento de adivinarla
cuesta cerca de un segundo, lo que hace inviable probarlas a lo bruto.

Va **autenticado**: si alguien cambia un solo bit del fichero, al abrirlo falla
en vez de devolver datos alterados en silencio. Comprobado cambiando un bit
del cuerpo y otro de la cabecera: los dos casos se detectan.

El fichero se crea con permisos `600` — sólo tu usuario puede leerlo.

**Lo que NO protege:** si te roban el portátil con la sesión abierta, o si
alguien te instala un registrador de teclas, el cifrado no te salva. Para eso
está el cifrado de disco (LUKS) y el 2FA. Esto protege la copia, no el equipo.

**Si pierdes la contraseña, no hay recuperación.** No hay puerta trasera. Esa
es justamente la razón por la que sirve de algo.
