# Prompt de continuación

Pega esto en `claude` (en la terminal, dentro de `~/demos-ayuntamientos`) para
que retome el trabajo sin tener que explicárselo todo otra vez.

---

```
Soy Ander, de AutoIA. Vendemos asistentes de atención ciudadana a ayuntamientos
españoles. Este repositorio tiene 132 demos publicadas, una por municipio, y un
sistema de ventas para gestionarlas. Necesito que sigas desde donde se quedó.

QUÉ HAY YA HECHO (no lo rehagas, léelo antes de tocar nada):

  _interno/sistema-de-ventas/
    abrir.sh              menú: 1=CRM, 2=correos, 3=estado, 4=datos,
                          5=guardar caja, 6=abrir caja
    crm/index.html        CRM con embudo y avance por tanda
    datos/extraer.mjs     saca los municipios de _generar/*.mjs a JSON
    datos/municipios.json 132 municipios (generado, no editar a mano)
    datos/desde-gmail.mjs reconstruye el estado del CRM desde los enviados
    datos/caja.mjs        base de datos cifrada AES-256-GCM + scrypt
    correos/enviar.mjs    envío diario; simula salvo que pases --enviar
    correos/smtp.mjs      cliente SMTP sin dependencias
    correos/plantilla.txt el texto del correo
    correos/bajas.txt     quien pide la baja; nunca se le vuelve a escribir
  _interno/claude/
    seguridad/            scripts de endurecimiento del equipo + guías

  Las dos cuelgan de _interno/ para que la raíz sea sólo las 132 demos, que es
  lo que publica GitHub Pages.

REGLAS QUE NO SE SALTAN (vienen de los ficheros originales del proyecto):

  1. No inventes correos de ayuntamientos. Si un municipio no tiene correo
     verificado, se salta y se dice por qué. Un correo inventado rebota y los
     rebotes queman el dominio del remitente.
  2. A quien esté en bajas.txt no se le escribe nunca.
  3. A quien ya figure en enviados.json no se le repite.
  4. correos/config.json, correos/enviados.json y datos/crm.caja NUNCA se suben
     al repositorio. Tampoco el JSON del CRM: este repo es público.

DISEÑO: el CRM usa el lenguaje visual de la landing, que está en el repo
autoia-oficial/autoia (styles.css): negro #000, superficie #1d1d1f al 60% con
desenfoque de 20px, azul #2997ff, gris #86868b, -apple-system con
letter-spacing -0.022em, curvas ease-apple y ease-spring. Si tocas la interfaz,
respétalo. Si haces gráficos, valida la paleta antes en vez de elegir a ojo.

DÓNDE ESTÁ CADA COSA. Este repositorio es autoia-oficial/demos-ayuntamientos.
La landing y el backend de reservas están en otro, autoia-oficial/autoia. No
son el mismo: si la sesión arranca en `autoia` no verás ninguna demo.

ESTADO A 16 DE SEPTIEMBRE DE 2026

  · 132 municipios, 117 con correo, 15 sólo teléfono, 0 sin contacto.
  · 16 ayuntamientos contactados el 8 y el 10 de septiembre desde
    contacto.autoia@gmail.com. Sólo contestó Badajoz: remiten a la sede
    electrónica. Cero rebotes, cero bajas.
  · El registro de esos 16 está sembrado en enviados.json, así que las tandas
    1 y 2 ya no se repiten.
  · Las cuatro fases están hechas. El backend de `autoia` está reparado (eran
    siete ficheros con las plantillas de cadena rotas, no tres) y su suite
    queda en 44 de 44, con el módulo de Ollama integrado.

LO QUE FALTA

  1. CONFIGURAR EL ENVÍO. Falta correos/config.json con la contraseña de
     aplicación de Google. Se hace en el ordenador de Ander, no aquí: es una
     credencial y hace falta salida SMTP. Luego:
         node correos/enviar.mjs --comprobar

  2. SEGUIR LA CAMPAÑA. Las tandas 3 a 19 están sin enviar. Primero en
     simulación, y sólo después con --enviar.

  3. DECIDIR SI LA LISTA DEBE SEGUIR SIENDO PÚBLICA. Este repo es público y
     tiene .nojekyll, así que _generar/ y _interno/ se sirven tal cual por
     Pages, con los 117 correos dentro. El README de la raíz lo avisa. Si eso
     tiene que dejar de ser accesible, hay que pasar el repo a privado y
     publicar sólo las demos.
```


Y pulsar **1** para confiar en la carpeta. Si `claude` dice *command not found*,
está sin instalar: mira la sección de Claude Code en `seguridad/MIGRAR-DISTRO.md`.

## Qué le estás concediendo

Ese Claude puede leer, crear, modificar y borrar cualquier fichero al que llegue
tu usuario, y ejecutar comandos. Abrirlo desde `~/demos-ayuntamientos` y no desde
tu carpeta personal limita el destrozo posible de un malentendido.
