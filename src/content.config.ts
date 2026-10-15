import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Noticias en Markdown. Cada archivo de `src/content/noticias/` es una
 * entrada: se agrega un .md al repositorio y aparece publicada.
 */
const noticias = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/noticias" }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    resumen: z.string(),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    categoria: z.enum(["Comunicado", "Actividad", "Institucional"]).default("Actividad"),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { noticias };
