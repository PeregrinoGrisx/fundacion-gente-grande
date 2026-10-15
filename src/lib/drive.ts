/**
 * Listado de documentos alojados en Google Drive.
 *
 * El objetivo: que los encargados sigan subiendo archivos a sus carpetas de
 * Drive (sin tocar el repositorio) y que el visitante los descargue con un
 * solo clic, sin entrar a Drive.
 *
 * Cómo funciona
 * -------------
 * 1. Cada carpeta de Drive se comparte como "Cualquier persona con el enlace
 *    puede ver".
 * 2. En el build, consultamos la API de Drive v3 y obtenemos la lista de
 *    archivos de cada carpeta.
 * 3. Para cada archivo generamos un enlace de descarga directa. El navegador
 *    baja el PDF sin pasar por la interfaz de Drive.
 *
 * Si no hay `PUBLIC_GOOGLE_API_KEY` configurada, la función no falla: devuelve
 * una lista vacía y la página muestra el enlace a la carpeta como respaldo.
 * Así el sitio compila igual en un clon recién hecho.
 *
 * Para que los archivos nuevos aparezcan en el sitio hay que volver a
 * desplegar (un webhook de deploy diario o un botón de "actualizar" en el
 * panel de hosting resuelve esto). La alternativa —consultar la API desde el
 * navegador en cada visita— deja la API key expuesta en el cliente, así que
 * preferimos resolverlo en el build.
 */

export type DriveFile = {
  id: string;
  nombre: string;
  /** Tamaño legible, ej. "2,4 MB". Vacío si Drive no lo informa. */
  peso: string;
  /** Fecha de la última modificación en formato ISO. */
  fecha: string;
  /** Enlace que dispara la descarga directa. */
  urlDescarga: string;
  /** Enlace para previsualizar en Drive, por si se quiere ofrecer. */
  urlVista: string;
};

type DriveApiFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
};

const API_KEY = import.meta.env.PUBLIC_GOOGLE_API_KEY ?? "";

/** Enlace de descarga directa para un archivo público de Drive. */
export function urlDescargaDirecta(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function urlCarpeta(folderId: string): string {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

function formatearPeso(bytes?: string): string {
  if (!bytes) return "";
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  const unidades = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), unidades.length - 1);
  const valor = n / 1024 ** i;
  const texto = valor >= 10 || i === 0 ? valor.toFixed(0) : valor.toFixed(1);
  return `${texto.replace(".", ",")} ${unidades[i]}`;
}

/**
 * Lista los archivos de una carpeta pública de Drive.
 * Devuelve `[]` ante cualquier problema (sin key, carpeta privada, API caída)
 * para que el build nunca se rompa por un documento.
 */
export async function listarCarpeta(folderId: string): Promise<DriveFile[]> {
  if (!API_KEY || !folderId) return [];

  const params = new URLSearchParams({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id,name,mimeType,size,modifiedTime)",
    orderBy: "name desc",
    pageSize: "200",
    key: API_KEY,
  });

  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
    if (!res.ok) {
      console.warn(
        `[drive] No se pudo listar la carpeta ${folderId}: ${res.status} ${res.statusText}`,
      );
      return [];
    }
    const data = (await res.json()) as { files?: DriveApiFile[] };
    return (data.files ?? [])
      .filter((f) => f.mimeType !== "application/vnd.google-apps.folder")
      .map((f) => ({
        id: f.id,
        nombre: f.name.replace(/\.(pdf|docx?|xlsx?)$/i, ""),
        peso: formatearPeso(f.size),
        fecha: f.modifiedTime ?? "",
        urlDescarga: urlDescargaDirecta(f.id),
        urlVista: `https://drive.google.com/file/d/${f.id}/view`,
      }));
  } catch (error) {
    console.warn(`[drive] Error consultando la carpeta ${folderId}:`, error);
    return [];
  }
}

export const driveConfigurado = Boolean(API_KEY);
