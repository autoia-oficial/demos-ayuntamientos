# Demos de asistente municipal — AutoIA

Una demo estática por municipio. Cada una se sirve en su propia ruta:

    /<municipio>/

No hay índice en la raíz a propósito: la lista de municipios es información
comercial. Cada enlace se manda solo al ayuntamiento que le corresponde.

Los HTML se generan desde `ayuntamientos/_envios/DIA 01 - martes 1 sep/<municipio>/demo-<municipio>.html`.
No editar aquí: editar el original y volver a generar.

## Qué hay aparte de las demos

Sólo dos carpetas que no son un municipio. Van con guion bajo delante para que
se distingan de un vistazo de las 132 que sí se publican:

| Carpeta | Qué es |
|---|---|
| `_generar/` | Los generadores de las demos y las listas por tanda |
| `_interno/` | Herramientas internas: sistema de ventas, CRM y scripts |

`_interno/` no es parte de lo que se enseña a nadie. Empieza por
`_interno/sistema-de-ventas/README.md`.

> **Ojo:** este repositorio es público y tiene `.nojekyll`, así que *todo* lo
> que hay aquí se sirve tal cual por GitHub Pages — `_generar/` y `_interno/`
> incluidos, con los correos de los ayuntamientos dentro. El guion bajo ordena,
> no esconde. Si esa lista tiene que dejar de ser accesible, hay que pasar el
> repositorio a privado y publicar sólo las demos.
