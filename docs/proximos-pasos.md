# Dónde quedamos

Última sesión: 15 de octubre de 2026.

## Hecho

- Repositorio creado y funcionando (Astro, sitio estático, 7 páginas).
- Contenido del sitio anterior migrado a `src/data/site.ts`, sin texto de
  relleno. Lo que falta está marcado con `<Pendiente>`, visible solo en
  `npm run dev`.
- Colores de marca reales (azul `#2275b7` + magenta `#e8388d`) más los cuatro
  pasteles del sitio anterior. Ver [marca.md](marca.md).
- Tipografía: Bricolage Grotesque + Instrument Sans.
- Descargas desde Google Drive resueltas. Ver
  [documentos-drive.md](documentos-drive.md).
- **Portada rediseñada** con lenguaje editorial: titular que ocupa el ancho,
  composición asimétrica, cinta en movimiento, cifras como banda editorial,
  misión/visión como partición a dos tonos, servicios como índice numerado con
  título fijo. Ya no se parece a la página anterior.

## Lo siguiente, por orden

### 1. Llevar el lenguaje editorial a las páginas internas

La portada ya tiene la nueva dirección. **Nosotros, ELEAM, Recursos, Noticias y
Contacto todavía usan la estructura de tarjetas de la primera versión.** Heredan
los colores y la tipografía nueva, así que no desentonan, pero les falta el
mismo tratamiento: composiciones asimétricas, uso de los pasteles por sección,
números grandes, menos cajas.

Prioridad: Nosotros y ELEAM, que son las que más se visitan.

### 2. Imágenes

Nada de esto existe todavía y es lo que más levanta el sitio:

- Fotografía principal del hero (vertical, persona mayor)
- Retratos de los 5 integrantes del directorio
- 6 a 8 fotos del ELEAM para la galería
- Imagen para compartir en redes (`public/img/og-default.jpg`)

Se pueden generar con la cuenta de Envato.

### 3. Datos que faltan de la Fundación

- Los 11 socios fundadores: nombres, profesiones, fotos
- Datos bancarios para donar, o decidir pasarela (Webpay / Mercado Pago)
- Teléfono y horario exacto de atención
- Confirmar el correo: `@fundaciongentegrande.org` o
  `@fundaciongentegrandearica.org`
- Archivos de logo en SVG y versión monocroma blanca

### 4. Configuración técnica

- `PUBLIC_GOOGLE_API_KEY` para que las descargas de Drive se listen solas
- `PUBLIC_FORM_ENDPOINT` para el formulario de contacto
- Decidir el despliegue: Cloudflare Pages (recomendado) o FTP al hosting actual

### 5. Noticias

El listado del sitio anterior cargaba de forma dinámica y no se alcanzó a
migrar. Hay que rescatar las entradas reales y pasarlas a Markdown en
`src/content/noticias/`.

## Notas de criterio

- **No usar texto de relleno.** El sitio anterior tenía "Lorem ipsum" y
  "John Doe, CEO" publicados; preferimos dejar el hueco marcado.
- **Accesibilidad no es opcional acá.** El público es gente mayor y sus
  familias: contraste AA como mínimo, foco visible, `prefers-reduced-motion`
  respetado en cada animación.
- Los teléfonos y correos de los directores que aparecen en el sitio viejo son
  placeholders de plantilla (`+1 859 254-6589`, `info@example.com`). No
  publicarlos.

## Fotografías (17 de octubre de 2026)

El sitio ya no tiene huecos grises: se bajaron 8 fotos de **Envato Elements**
(stock, licencia comercial de por vida, licenciadas automáticamente con la
suscripción). No se gastaron créditos de IA: quedan los 2 que había.

Viven en `src/assets/fotos/` y se sirven con el componente `<Image>` de Astro,
que genera webp en varios tamaños durante el build. Pesan 70 MB en origen y
7,3 MB servidas en total, y cada página carga solo las variantes que necesita.

| Archivo                     | Dónde se usa                         |
| --------------------------- | ------------------------------------ |
| `hero-retrato.jpg`          | Hero de la portada                   |
| `taller-manualidades.jpg`   | "Qué nos diferencia" + galería       |
| `comunidad-conversacion.jpg`| "Sobre nosotros"                     |
| `actividades-cartas.jpg`    | Galería ELEAM                        |
| `ejercicios.jpg`            | Galería ELEAM                        |
| `equipo-sala-comun.jpg`     | Galería ELEAM                        |
| `lectura.jpg`               | Galería ELEAM                        |
| `juego-argollas.jpg`        | Galería ELEAM                        |

**Son provisionales.** Las personas que aparecen no son residentes de la
Fundación. Sirven para que el sitio funcione y se pueda mostrar, pero hay que
reemplazarlas por fotografías reales del ELEAM antes de publicar: en un sitio
institucional, mostrar modelos de stock como si fueran residentes induce a
error. Está marcado con `<Pendiente>` en las dos páginas.

Reemplazarlas es sustituir el archivo en `src/assets/fotos/` conservando el
nombre. No hay que tocar el código.
