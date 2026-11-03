# Fundación Gente Grande — sitio web

Sitio institucional de la Fundación Gente Grande de Arica. Reemplaza el sitio
WordPress anterior por un sitio estático: más rápido, más barato de alojar y
versionado en Git.

## Estado

Primera versión del rediseño. La estructura y el diseño están listos; falta
material de la Fundación (fotos, nombres, datos bancarios). Todo lo que falta
está marcado en el código con el componente `<Pendiente>`, que se ve **solo en
desarrollo** y nunca en el sitio publicado. Para revisar la lista completa:

```bash
npm run dev
```

y recorrer las páginas: cada bloque a rayas es algo por conseguir.

Para retomar el trabajo, ver [docs/proximos-pasos.md](docs/proximos-pasos.md).

## Stack

- **[Astro](https://astro.build)** — genera HTML estático, sin framework de UI.
- **CSS propio** con custom properties (`src/styles/global.css`), con los
  colores y la tipografía de la marca (ver [docs/marca.md](docs/marca.md)). Sin Tailwind
  ni preprocesadores.
- **JavaScript mínimo**: menú móvil, revelado al hacer scroll, contadores.
  Todo respeta `prefers-reduced-motion`.

Resultado: páginas de pocos kB, sin dependencias de runtime, desplegables en
cualquier hosting que sirva archivos estáticos.

## Comandos

| Comando           | Qué hace                                      |
| ----------------- | --------------------------------------------- |
| `npm install`     | Instala dependencias                          |
| `npm run dev`     | Servidor local en `http://localhost:4321`     |
| `npm run build`   | Genera el sitio en `dist/`                    |
| `npm run preview` | Sirve `dist/` para revisar antes de publicar  |
| `npm run check`   | Revisa tipos y errores de plantilla           |

## Estructura

```
src/
  data/site.ts          Todo el texto institucional. Editar acá, no en las páginas.
  data/documentos.ts    Carpetas de Drive para memorias y balances.
  lib/drive.ts          Lista los PDF de Drive y arma las descargas directas.
  layouts/Base.astro    <head>, header, footer y los scripts de animación.
  components/           Header, Footer, PageHero, Icon, Pendiente.
  pages/                Una página por archivo (ruta = nombre del archivo).
  content/noticias/     Noticias en Markdown: un archivo = una entrada.
public/                 Imágenes, favicon y robots.txt (se copian tal cual).
docs/                   Notas de operación (Drive, despliegue).
```

### Editar contenido

- **Textos institucionales** (misión, visión, directorio, servicios,
  testimonios, contacto): `src/data/site.ts`.
- **Noticias**: agregar un `.md` en `src/content/noticias/`. Ver
  `ejemplo-estructura.md` como plantilla.
- **Documentos descargables**: los encargados suben los PDF a Google Drive; el
  sitio los lista solo. Ver [docs/documentos-drive.md](docs/documentos-drive.md).

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

| Variable                | Para qué sirve                                          |
| ----------------------- | ------------------------------------------------------- |
| `PUBLIC_GOOGLE_API_KEY` | Listar los PDF de las carpetas de Drive en el build      |
| `PUBLIC_FORM_ENDPOINT`  | Recibir el formulario de contacto (Formspree, Web3Forms) |

Sin ellas el sitio compila igual: la sección de documentos muestra el enlace a
la carpeta de Drive y el formulario cae a `mailto:`.

Para el sitio publicado se cargan como secrets del repositorio con el mismo
nombre (ver [Despliegue](#despliegue)); el workflow las pasa al build.

## Despliegue

El sitio se sirve desde **Cloudflare Workers**: el Worker
`fundacion-gente-grande` publica los archivos estáticos de `dist/` y atiende
`fundaciongentegrandearica.org` y `www.fundaciongentegrandearica.org` como
Custom Domains. La configuración está en [wrangler.jsonc](wrangler.jsonc).

El dominio sigue registrado en Wix, pero sus servidores de nombres son los de
Cloudflare: el DNS se administra en Cloudflare, no en Wix.

### Publicación automática

Cada push a `main` ejecuta [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
compila con `npm run build` y publica con `wrangler deploy`. También se puede
lanzar a mano desde **Actions → Publicar en Cloudflare Workers → Run workflow**,
por ejemplo para que aparezcan PDF nuevos de Drive sin cambiar código.

El workflow lee estos secrets del repositorio (**Settings → Secrets and
variables → Actions → New repository secret**; solo puede cargarlos la cuenta
dueña del repositorio):

| Secret                  | Qué es                                                        |
| ----------------------- | ------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Token de API de Cloudflare para publicar el Worker            |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare dueña del Worker                |
| `PUBLIC_GOOGLE_API_KEY` | Opcional. Ver [Variables de entorno](#variables-de-entorno)   |
| `PUBLIC_FORM_ENDPOINT`  | Opcional. Ver [Variables de entorno](#variables-de-entorno)   |

**Crear el token** (en la cuenta de Cloudflare de la Fundación):

1. **My Profile → API Tokens → Create Token → Create Custom Token**.
2. Permisos:
   - *Account* · *Workers Scripts* · *Edit*
   - *Account* · *Account Settings* · *Read*
   - *Zone* · *Workers Routes* · *Edit* (Cloudflare lo pide cuando un deploy
     toca los Custom Domains)
3. *Account Resources*: solo la cuenta de la Fundación. *Zone Resources*:
   solo la zona `fundaciongentegrandearica.org`.
4. Crear, copiar el token (se muestra una sola vez) y cargarlo como
   `CLOUDFLARE_API_TOKEN`.

El ID de cuenta aparece en el panel de Cloudflare, en **Workers & Pages** (columna
derecha, *Account ID*), o en la URL del panel: `dash.cloudflare.com/<ID>/...`.

### Publicación manual

Con una sesión de Cloudflare iniciada (`npx wrangler login`):

```bash
npm run build
npx wrangler deploy
```

Sirve para emergencias; lo normal es dejar que publique el workflow.

## Accesibilidad

Pensado desde el inicio porque el público es gente mayor y sus familias:
contraste alto, tipografía grande, foco visible, navegación por teclado, textos
alternativos y respeto por `prefers-reduced-motion`.
