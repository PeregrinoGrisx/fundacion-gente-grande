/**
 * Colecciones de documentos públicos.
 *
 * `carpetaDrive` es el ID de la carpeta compartida: los encargados suben los
 * PDF ahí y el sitio los lista solo (ver `src/lib/drive.ts`).
 *
 * `archivosManuales` sirve para fijar documentos destacados o para que la
 * sección funcione mientras no esté configurada la API key de Google. Si
 * ambos existen, se muestran los de Drive y, si no hay ninguno, los manuales.
 */

export type ColeccionDocumentos = {
  slug: string;
  titulo: string;
  descripcion: string;
  carpetaDrive: string;
  archivosManuales: Array<{
    nombre: string;
    /** ID del archivo en Drive. Se obtiene del enlace para compartir. */
    driveId: string;
    peso?: string;
    anio?: string;
  }>;
};

export const colecciones: ColeccionDocumentos[] = [
  {
    slug: "memorias-balances",
    titulo: "Memorias y Balances",
    descripcion:
      "Documentos institucionales que presentan la gestión anual de la Fundación: memorias, estados financieros y rendiciones.",
    carpetaDrive: "13ku6Ea-bJ7dX5wuyKoPva7iQozBBn3Mv",
    archivosManuales: [],
  },
  {
    slug: "recursos-transferidos",
    titulo: "Recursos Transferidos",
    descripcion:
      "Información sobre los recursos públicos y privados que ha recibido la Fundación.",
    carpetaDrive: "1hq-cvT7yKJ6lT6Zc_YC96g03r3yuZx3I",
    archivosManuales: [],
  },
];
