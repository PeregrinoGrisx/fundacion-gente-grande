// Versión Markdown de cada noticia publicada.
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { markdownResponse, noticiaMarkdown } from "../../../lib/agent-docs";

export async function getStaticPaths() {
  const noticias = await getCollection("noticias", ({ data }) => !data.borrador);
  return noticias.map((entrada) => ({ params: { slug: entrada.id }, props: { entrada } }));
}

export const GET: APIRoute<{ entrada: CollectionEntry<"noticias"> }> = ({ props }) =>
  markdownResponse(noticiaMarkdown(props.entrada));
