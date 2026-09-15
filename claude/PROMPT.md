# Prompt de continuación

Pega esto en `claude` (en la terminal, dentro de `~/demos-ayuntamientos`) para
que retome el trabajo sin tener que explicárselo todo otra vez.

---

```
Soy Ander, de AutoIA. Vendemos asistentes de atención ciudadana a ayuntamientos
españoles. Este repositorio tiene 132 demos publicadas, una por municipio, y un
sistema de ventas para gestionarlas. Necesito que sigas desde donde se quedó.

QUÉ HAY YA HECHO (no lo rehagas, léelo antes de tocar nada):

  sistema-de-ventas/
    abrir.sh              menú: 1=CRM, 2=correos, 3=estado, 4=datos,
                          5=guardar caja, 6=abrir caja
    crm/index.html        CRM con embudo y avance por tanda
    datos/extraer.mjs     saca los municipios de _generar/*.mjs a JSON
    datos/municipios.json 132 municipios (generado, no editar a mano)
    datos/caja.mjs        base de datos cifrada AES-256-GCM + scrypt
    correos/enviar.mjs    envío diario; simula salvo que pases --enviar
    correos/smtp.mjs      cliente SMTP sin dependencias
    correos/plantilla.txt el texto del correo
    correos/bajas.txt     quien pide la baja; nunca se le vuelve a escribir
  claude/
    seguridad/            scripts de endurecimiento del equipo + guías

REGLAS QUE NO SE SALTAN (vienen de los ficheros originales del proyecto):

  1. No inventes correos de ayuntamientos. Si un municipio no tiene correo
     verificado, se salta y se dice por qué. Un correo inventado rebota y los
     rebotes queman el dominio del remitente.
  2. A quien esté en bajas.txt no se le escribe nunca.
  3. A quien ya figure en enviados.json no se le repite.
  4. correos/config.json y datos/crm.caja NUNCA se suben al repositorio.

DISEÑO: el CRM usa el lenguaje visual de la landing, que está en el repo
autoia-oficial/autoia (styles.css): negro #000, superficie #1d1d1f al 60% con
desenfoque de 20px, azul #2997ff, gris #86868b, -apple-system con
letter-spacing -0.022em, curvas ease-apple y ease-spring. Si tocas la interfaz,
respétalo. Si haces gráficos, valida la paleta antes en vez de elegir a ojo.

ORGANIZACIÓN QUE QUIERO (esto primero):

  Ahora mismo sistema-de-ventas/ y claude/ cuelgan de la raíz del repositorio,
  mezclados con las 132 carpetas de municipios (a-coruna/, albacete/, elche/…).
  Eso ensucia: este repo es un GitHub Pages que sirve las demos, y las
  herramientas internas no pintan ahí al lado.

  Quiero las dos cosas APARTE de las demos:
    · el sistema de ventas en su propia carpeta, con todo lo suyo dentro
    · una carpeta claude/ con todo lo que has hecho tú

  Hay dos formas y no sé cuál conviene. Míralo y recomiéndame una:

    a) Moverlo a un repositorio propio (autoia-oficial/sistema-de-ventas).
       Queda del todo separado, pero el extractor lee _generar/*.mjs de este
       repo, así que habría que resolver cómo accede a esos datos.

    b) Dejarlo aquí pero bajo una sola carpeta (por ejemplo _interno/), para
       que la raíz vuelva a ser sólo demos. Más simple, y el extractor sigue
       leyendo los datos con una ruta relativa.

  Dime cuál ves mejor y por qué, y luego hazlo. Si mueves ficheros, comprueba
  después que sigue funcionando:
      node datos/extraer.mjs       tiene que sacar 132 municipios
      ./abrir.sh estado            tiene que responder
      ./abrir.sh crm               el CRM tiene que cargar la tabla

LO QUE ME FALTA, por orden:

  1. LOS DATOS REALES. El CRM arranca vacío, pero yo ya he enviado correos a
     muchos de estos ayuntamientos desde mi Gmail. Busca en mi bandeja de
     enviados los correos a dominios de ayuntamiento, crúzalos con
     datos/municipios.json, y genera un JSON con el estado real (enviado, con
     su fecha; respondido si contestaron) que pueda importar con el botón
     "Importar" del CRM. Pregúntame con qué cuenta los envié.

  2. CONFIGURAR EL ENVÍO. Ayúdame a rellenar correos/config.json con mi Gmail
     y una contraseña de aplicación de Google, y comprueba que funciona con:
         node correos/enviar.mjs --comprobar
     Eso valida la configuración y autentica contra el servidor sin enviar nada.

  3. LOS 8 MUNICIPIOS SIN CONTACTO. La tanda del día 01 (León, Alcalá de
     Henares, Pinto, Elche, Badajoz, Telde, Logroño, Jumilla) se envió a mano y
     no dejó los correos apuntados. Búscalos en las webs oficiales que indica
     el campo "dominios", verifícalos, y añádelos a
     _generar/municipios-dia01.mjs. Si alguno no se puede verificar, déjalo sin
     correo antes que inventarlo.

  4. FASE 2 — IA EN LOCAL. En el repo autoia-oficial/autoia hay tres ficheros
     que no pasan "node --check": respuestas.js, server.js y reservas.js
     (comillas invertidas mal cerradas). Arréglalos y termina de integrar el
     módulo de Ollama que se quedó a medias.

Empieza por leer sistema-de-ventas/README.md y claude/README.md, dime qué has
entendido del estado actual, y luego vamos por el punto 1.
```

---

## Antes de pegarlo

Necesitas Claude Code instalado y la carpeta clonada:

```bash
cd ~/demos-ayuntamientos
claude
```

Y pulsar **1** para confiar en la carpeta. Si `claude` dice *command not found*,
está sin instalar: mira la sección de Claude Code en `seguridad/MIGRAR-DISTRO.md`.

## Qué le estás concediendo

Ese Claude puede leer, crear, modificar y borrar cualquier fichero al que llegue
tu usuario, y ejecutar comandos. Abrirlo desde `~/demos-ayuntamientos` y no desde
tu carpeta personal limita el destrozo posible de un malentendido.
