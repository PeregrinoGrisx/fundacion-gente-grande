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

### Los pasteles

Muestreados del sitio anterior, donde ya se usaban como fondo de sección. No
son decoración: son los que dan aire y ritmo a la página. Al ir rotando entre
secciones y entre filas de una misma lista, evitan que todo se lea igual sin
tener que meter más tinta.

| Token       | Valor     | Dónde se usa                                   |
| ----------- | --------- | ---------------------------------------------- |
| `--lavanda` | `#ece5fa` | Fondo del hero, mitad "Misión", fichas          |
| `--cielo`   | `#eef6ff` | Sección de testimonios, hueco de la foto        |
| `--menta`   | `#dff3e8` | Mitad "Visión", fichas                          |
| `--rosa`    | `#fdeaf3` | Franja de denuncias, fichas                     |

Cada uno tiene su versión `-fuerte` para bordes y estados.

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

**Provisional.** El cliente va a aportar la tipografía definitiva. Lo que hay
hoy es un reemplazo decente, no una decisión cerrada.

| Rol       | Familia            | Por qué                                                          |
| --------- | ------------------ | ---------------------------------------------------------------- |
| Titulares | **Source Serif 4** | Serif humanista: transmite respeto y permanencia, no tendencia    |
| Texto     | **Public Sans**    | Diseñada para servicios públicos, con la legibilidad como requisito |

La serif en los titulares es deliberada. En una fundación de personas mayores
una serif se lee como institucional y digna; una grotesca comprimida, como se
probó antes, se lee como cartel y no corresponde al tema.

### Cambiar la tipografía

Todo el cambio ocurre en **`src/styles/fuentes.css`**, que tiene los pasos
escritos al inicio:

1. Copiar los archivos a `public/fonts/` (.woff2 de preferencia).
2. Descomentar y completar los bloques `@font-face`.
3. Descomentar el bloque `:root` del final.
4. Borrar el `<link>` a Google Fonts en `src/layouts/Base.astro`.

Si la fuente nueva es de palo seco, conviene revisar en `global.css` el
`letter-spacing` de los titulares: una serif y una sans piden tracking
distinto.

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
