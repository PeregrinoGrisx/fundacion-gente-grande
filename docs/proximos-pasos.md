# Dónde quedamos

Última sesión: 17 de octubre de 2026.

Sitio en Astro, 7 páginas, build limpio. Para levantarlo: `npm install` y
`npm run dev`.

## Estado actual

### Diseño

El lenguaje visual sale del template **Nosic Sketch** que aportó el cliente.
Ojo: ese ZIP **no traía código**, solo un archivo `.sketch`. Lo que se hizo fue
leer su JSON y reconstruir el sistema. El detalle de qué se extrajo —escala
tipográfica, contenedor de 1320 px, sombras, orden de secciones— está en
[template.md](template.md).

- **Tipografía**: Public Sans, la del template. Pesos hasta 900.
- **Color**: azul `#2275b7` y magenta `#e8388d` del logo, reservados para
  botones, enlaces y datos. Los pasteles llevan el peso visual (~60% de la
  superficie). Ver [marca.md](marca.md).
- **Formas**: todo redondeado. Botones en píldora, iconos circulares, tarjetas
  a 30 px.
- **Fondo**: arcos decorativos (`Lineas.astro`), que son elipses sin relleno
  con borde grueso, copiadas del template.

### El hero

Rehecho siguiendo una referencia aparte que pasó el cliente (plantilla "Camp"):

- Degradado de tres pasteles —morado, azul y rosa— con capa de grano encima.
  Sin verde: se probó y no pegaba.
- Titular en 800 a 6,25 rem, con "años." en magenta para dar jerarquía.
- Foto recortada en ventana de arco, con texto curvo siguiendo el borde, un
  sello orgánico giratorio con el año, y la píldora de SENAMA.

El texto curvo comparte circunferencia con el arco (mismo centro y radio + 4
unidades), así que se mantiene alineado a cualquier ancho. Si se cambia la
proporción de la ventana, hay que revisarlo.

### Fotografías

Ocho fotos de Envato Elements (stock, licencia comercial de por vida). Viven
en `src/assets/fotos/` y se sirven con `<Image>` de Astro: 70 MB en origen,
7,3 MB servidas.

**Son provisionales.** Las personas que aparecen no son residentes de la
Fundación. Hay que reemplazarlas por fotos reales del ELEAM antes de publicar.
Basta sustituir el archivo conservando el nombre, sin tocar código.

No se gastaron créditos de IA de Envato: quedan los 2 que había.

## Lo siguiente, por orden

### 1. Acercar más la portada al template

Quedaron cuatro diferencias identificadas al comparar lado a lado:

| Template                                   | Lo que hay                    |
| ------------------------------------------ | ----------------------------- |
| Servicios en 4 tarjetas chicas             | 2 bloques pastel grandes      |
| Testimonios en 3 tarjetas fijas            | Carrusel horizontal           |
| CTA con texto + imagen al costado          | Texto centrado, sin imagen    |
| Contacto con formulario + acordeón de FAQ  | 3 tarjetas                    |

Las dos que más cambiarían el parecido son el **CTA con imagen** y el
**contacto con acordeón**. Lo de los servicios está a propósito: el template
tiene cuatro, pero la Fundación tiene dos líneas reales (ELEAM y formación), y
no vale la pena inventar dos para cuadrar la simetría.

### 2. Llevar el lenguaje del hero a las páginas internas

Nosotros, ELEAM, Recursos, Noticias y Contacto heredan colores, tipografía y
redondeos, y tienen cabecera con su pastel propio. Pero no tienen el
tratamiento del hero nuevo (degradado, grano, formas). Prioridad: Nosotros y
ELEAM.

### 3. Datos que faltan de la Fundación

- Los 11 socios fundadores: nombres, profesiones, fotos
- Fotos reales del ELEAM y del directorio
- Datos bancarios para donar, o decidir pasarela (Webpay / Mercado Pago)
- Teléfono y horario exacto de atención
- Confirmar el correo: `@fundaciongentegrande.org` o
  `@fundaciongentegrandearica.org`
- Logo en SVG y versión monocroma blanca
- Tipografía propia, si finalmente se aporta una (ver `src/styles/fuentes.css`)

### 4. Configuración técnica

- `PUBLIC_GOOGLE_API_KEY` para que las descargas de Drive se listen solas
  (ver [documentos-drive.md](documentos-drive.md))
- `PUBLIC_FORM_ENDPOINT` para el formulario de contacto
- Decidir el despliegue: Cloudflare Pages (recomendado) o FTP al hosting actual

### 5. Noticias

El listado del sitio anterior cargaba de forma dinámica y no se alcanzó a
migrar. Hay que rescatar las entradas reales y pasarlas a Markdown en
`src/content/noticias/`.

## Notas de criterio

- **No usar texto de relleno.** El sitio anterior tenía "Lorem ipsum" y
  "John Doe, CEO" publicados; preferimos dejar el hueco marcado con
  `<Pendiente>`, que se ve solo en desarrollo.
- **Accesibilidad no es opcional acá.** El público es gente mayor y sus
  familias: contraste AA como mínimo, foco visible, `prefers-reduced-motion`
  respetado en cada animación. Por eso hay dos magentas: el de marca no alcanza
  AA sobre blanco.
- Los teléfonos y correos de los directores que aparecen en el sitio viejo son
  placeholders de plantilla (`+1 859 254-6589`, `info@example.com`). No
  publicarlos.
- El ZIP del template está versionado y su nombre es largo (88 caracteres). En
  rutas normales no hay problema; en rutas muy profundas Windows puede fallar
  al clonar. Si molesta, se saca del repositorio.
