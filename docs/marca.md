# Marca

Los colores y la tipografía salen del logotipo y del sitio anterior, no de una
propuesta nueva.

## Colores

| Token           | Valor     | Origen y uso                                              |
| --------------- | --------- | --------------------------------------------------------- |
| `--azul-600`    | `#2275b7` | Azul del logotipo. Color principal: botones, enlaces, foco |
| `--magenta-600` | `#e8388d` | Magenta del logotipo. Acento sobre fondo oscuro, titulares |
| `--magenta-700` | `#b82068` | Acento para texto y rellenos sobre fondo claro (ver abajo) |
| `--azul-900`    | `#0a2c45` | Fondo de las secciones oscuras y del pie                   |

El resto de cada escala (`100` a `800`) se derivó de esos dos colores para
tener fondos, bordes y estados de hover coherentes. Están todos en
`src/styles/global.css`.

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

**Montserrat**, la misma familia del logotipo. Se carga desde Google Fonts en
`src/layouts/Base.astro`. Titulares en 700 con tracking negativo; texto en 400
y 500.

## Archivos del logo

En `public/img/marca/`:

| Archivo                | Qué es                                    |
| ---------------------- | ----------------------------------------- |
| `cropped-Logotipo.png` | Logotipo horizontal completo (904 × 255)  |
| `Isotipo.png`          | Solo el corazón (266 × 255)               |

Ambos se bajaron del sitio anterior y son PNG sobre transparente.

### Pendiente

- **Versiones vectoriales (SVG)** del logotipo y el isotipo. Los PNG se ven
  bien hoy, pero pierden nitidez en pantallas de alta densidad y pesan de más.
- **Versión monocroma blanca**, para el pie de página y cualquier fondo
  oscuro. Hoy el isotipo va sobre un disco blanco porque su mitad azul se
  perdería contra el azul oscuro del pie; con una versión blanca el disco
  sobra.
- **Favicon dedicado**. Ahora se usa el isotipo en PNG, que a 16 px se ve
  apretado. Conviene una versión simplificada.
