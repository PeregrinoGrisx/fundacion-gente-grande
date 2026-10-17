# Marca

Los colores y el logo salen del material existente. La tipografía y el lenguaje
visual sí son propuesta nueva, porque el encargo es rediseñar, no maquillar.

## Colores

### Los dos principales

| Token           | Valor     | Origen y uso                                              |
| --------------- | --------- | --------------------------------------------------------- |
| `--azul-600`    | `#2275b7` | Azul del logotipo. Color principal: botones, enlaces, foco |
| `--magenta-600` | `#e8388d` | Magenta del logotipo. Acento y titulares destacados        |
| `--magenta-700` | `#b82068` | Acento para texto y rellenos sobre fondo claro (ver abajo) |
| `--azul-900`    | `#0a2c45` | Fondo de las secciones oscuras y del pie                   |

### Los pasteles, que son los que mandan

Muestreados del sitio anterior. **Llevan el peso visual del sitio: ocupan
cerca del 60% de la superficie**, rotando sección a sección para que ninguna
se lea igual a la anterior.

| Token       | Valor     | Dónde se usa                                       |
| ----------- | --------- | -------------------------------------------------- |
| `--lavanda` | `#ece5fa` | Hero, noticias, bloque "sobre nosotros", fichas     |
| `--cielo`   | `#eef6ff` | Qué nos diferencia, contacto, fichas                |
| `--menta`   | `#dff3e8` | Objetivos, segundo bloque de servicios, fichas      |
| `--rosa`    | `#fdeaf3` | Formas de aportar, fichas                           |

Cada uno tiene su versión `-fuerte` para bordes y estados.

Para teñir una sección completa: `.section--lavanda`, `--cielo`, `--menta`,
`--rosa`. Para un bloque redondeado dentro de una sección blanca:
`.bloque.bloque--lavanda` y sus variantes.

### Dónde va el color de marca

Regla: **el azul y el magenta se reservan para la acción y el dato**. Si
aparecieran en titulares, iconos y etiquetas, el sitio se volvería azul y los
botones dejarían de destacar.

| Sí lleva color de marca            | No lo lleva                     |
| ---------------------------------- | ------------------------------- |
| Botones                            | Titulares (van en `--ink-900`)  |
| Enlaces y "leer más"               | Etiquetas en versales (`--ink-500`) |
| Las cifras del hero                | Iconos de tarjeta (fondo pastel, trazo `--ink-700`) |
| La columna destacada de "aportar"  | Bordes y separadores            |
| El subrayado del menú activo       | Texto corrido                   |

### Por qué hay dos magentas

El magenta de marca `#e8388d` con texto blanco da **3,9:1** de contraste, bajo
el mínimo de 4,5:1 que pide WCAG AA para texto normal. Como el público del
sitio es gente mayor, no lo dejamos pasar:

- **Texto y botones sobre fondo claro** usan `--magenta-700` (`#b82068`,
  6,1:1). Es el mismo magenta, solo más oscuro.
- **Titulares grandes, fondos oscuros y elementos decorativos** usan el
  `#e8388d` original, donde sí cumple.

El azul `#2275b7` con blanco da 4,9:1 y se usa tal cual.

## Tipografía

**Public Sans**, en todo el sitio. Es la del template Nosic Sketch, y coincide
con la que ya se usaba para texto. Está diseñada para servicios públicos, con
la legibilidad como requisito: justo lo que pide un público mayor.

Escala tomada del archivo de diseño —48 / 40 / 32 / 28 / 24 / 20 / 17 / 16 /
13 / 12— expresada en `clamp()` para que se adapte sin perder las
proporciones. Los tokens son `--fs-display`, `--fs-h1`, `--fs-h2`,
`--fs-h3`, `--fs-lg`, `--fs-md`, `--fs-base`, `--fs-sm` y `--fs-xs`.

Ver [template.md](template.md) para el detalle de qué se extrajo del archivo.

### Cambiar la tipografía

El cliente puede aportar otra. Todo el cambio ocurre en
**`src/styles/fuentes.css`**, que tiene los pasos escritos al inicio:

1. Copiar los archivos a `public/fonts/` (.woff2 de preferencia).
2. Descomentar y completar los bloques `@font-face`.
3. Descomentar el bloque `:root` del final.
4. Borrar el `<link>` a Google Fonts en `src/layouts/Base.astro`.

## Archivos del logo

En `public/img/marca/`:

| Archivo                | Qué es                                    |
| ---------------------- | ----------------------------------------- |
| `cropped-Logotipo.png` | Logotipo horizontal completo (904 × 255)  |
| `Isotipo.png`          | Solo el corazón (266 × 255)               |

Ambos se bajaron del sitio anterior y son PNG sobre transparente. El isotipo
también se usa en gran tamaño y baja opacidad como filigrana del hero.

### Pendiente

- **Versiones vectoriales (SVG)** del logotipo y el isotipo. Los PNG se ven
  bien hoy, pero pierden nitidez en alta densidad y, en la filigrana del hero
  —que se escala a 40rem— se nota.
- **Versión monocroma blanca**, para el pie de página. Hoy el isotipo va sobre
  un disco blanco porque su mitad azul se perdería contra el azul oscuro; con
  una versión blanca el disco sobra.
- **Favicon dedicado**: el isotipo a 16 px queda apretado.
