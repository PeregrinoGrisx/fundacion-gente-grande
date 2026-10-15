---
titulo: "Así se publica una noticia"
fecha: 2026-10-15
resumen: "Entrada de ejemplo que muestra la estructura de una noticia. Para publicar, se copia este archivo, se cambian los datos de arriba y se escribe el texto abajo."
categoria: "Institucional"
borrador: true
---

Esta entrada es de ejemplo y está marcada como `borrador: true`, por lo que no
aparece en el sitio publicado.

## Cómo publicar una noticia

1. Copiar este archivo dentro de `src/content/noticias/` con un nombre nuevo,
   por ejemplo `2026-11-visita-senama.md`.
2. Cambiar `titulo`, `fecha`, `resumen` y `categoria`.
3. Quitar la línea `borrador: true` (o dejarla en `false`).
4. Escribir el contenido acá abajo en Markdown: **negritas**, _cursivas_,
   listas y enlaces.

Las imágenes se suben a `public/img/noticias/` y se referencian con el campo
`imagen` del encabezado, por ejemplo `imagen: "/img/noticias/visita.jpg"`.
