# Documentos: descarga con un clic desde Google Drive

El problema a resolver: los encargados de la Fundación deben poder subir
memorias y balances a sus carpetas de Drive sin pedirle nada al equipo de
desarrollo, y al mismo tiempo el visitante debe descargar el PDF con un clic,
sin entrar a Drive ni ver su interfaz.

## Cómo queda resuelto

1. Cada carpeta de Drive se comparte como **"Cualquier persona con el enlace
   puede ver"**. Los encargados siguen trabajando en Drive como siempre.
2. En el **build**, el sitio consulta la API de Drive y obtiene la lista de
   archivos de cada carpeta: nombre, peso y fecha de modificación.
3. Para cada archivo se genera un enlace de descarga directa
   (`drive.google.com/uc?export=download&id=…`). El botón "Descargar" baja el
   PDF de inmediato.

El visitante nunca ve Drive. Los encargados nunca ven el repositorio.

## Por qué en el build y no en el navegador

La API de Drive necesita una clave. Si la consulta se hiciera desde el
navegador, esa clave quedaría a la vista en el código del sitio. Haciéndolo en
el build, la clave vive solo en el servidor que compila.

**Consecuencia a tener presente:** un PDF nuevo aparece en el sitio recién
después del siguiente despliegue. Se resuelve de dos formas, según el hosting:

- **Cloudflare Pages / Netlify / Vercel**: configurar un *deploy hook* y
  llamarlo con un cron diario. El sitio se reconstruye solo cada noche.
- **Hosting actual por FTP**: reconstruir y subir cuando se agreguen
  documentos. Menos cómodo, pero funciona.

Si más adelante se quiere que los documentos aparezcan al instante, la
alternativa es una función serverless que haga de intermediaria con la API
(Cloudflare Worker o Netlify Function), manteniendo la clave del lado del
servidor.

## Configuración (una sola vez)

### 1. Compartir las carpetas

En Drive, por cada carpeta: **Compartir → Acceso general → Cualquier persona
con el enlace → Lector**.

Las carpetas en uso están declaradas en `src/data/documentos.ts`:

| Colección             | ID de carpeta                         |
| --------------------- | ------------------------------------- |
| Memorias y Balances   | `13ku6Ea-bJ7dX5wuyKoPva7iQozBBn3Mv`   |
| Recursos Transferidos | `1hq-cvT7yKJ6lT6Zc_YC96g03r3yuZx3I`   |

El ID es la parte final del enlace de la carpeta:
`drive.google.com/drive/folders/<ID>`.

### 2. Crear la clave de API

1. Entrar a [Google Cloud Console](https://console.cloud.google.com/) y crear
   un proyecto (o usar uno existente).
2. **APIs y servicios → Biblioteca** → habilitar **Google Drive API**.
3. **APIs y servicios → Credenciales → Crear credenciales → Clave de API**.
4. Restringir la clave:
   - *Restricciones de aplicación*: ninguna (se usa desde el servidor de build).
   - *Restricciones de API*: solo **Google Drive API**.
5. Copiar la clave a `.env`:

```
PUBLIC_GOOGLE_API_KEY=AIza...
```

En Cloudflare Pages / Netlify / Vercel, cargarla como variable de entorno del
proyecto. **Nunca** commitearla al repositorio.

### 3. Verificar

```bash
npm run build
```

Si la clave está bien, `/recursos/` lista los PDF con su peso y fecha. Si algo
falla (clave ausente, carpeta privada, API caída), el build **no se rompe**: la
página muestra el enlace a la carpeta de Drive como respaldo y se registra un
aviso en la consola.

## Agregar una colección nueva

En `src/data/documentos.ts`, añadir un objeto al arreglo `colecciones`:

```ts
{
  slug: "estatutos",
  titulo: "Estatutos",
  descripcion: "Documentos constitutivos de la Fundación.",
  carpetaDrive: "ID_DE_LA_CARPETA",
  archivosManuales: [],
}
```

`archivosManuales` sirve para fijar un documento puntual sin depender de Drive:

```ts
archivosManuales: [
  { nombre: "Memoria 2025", driveId: "1AbC...", peso: "2,4 MB", anio: "2025" },
],
```

Se muestran solo si la consulta a Drive no devuelve nada.

## Nombres de archivo

El sitio muestra el nombre del archivo tal como está en Drive, quitando la
extensión. Conviene pedirle a los encargados una convención simple:

- `Memoria Anual 2025.pdf`
- `Balance 2025.pdf`
- `Recursos Transferidos 2025.pdf`

Así el listado del sitio queda prolijo sin trabajo extra.
