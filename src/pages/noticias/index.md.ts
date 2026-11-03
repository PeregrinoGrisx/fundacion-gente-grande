// Versión Markdown de /noticias/ (la entrega el Worker con Accept: text/markdown).
import { getCollection } from "astro:content";
import { markdownResponse, noticiasMarkdown } from "../../lib/agent-docs";

export const GET = async () =>
  markdownResponse(noticiasMarkdown(await getCollection("noticias", ({ data }) => !data.borrador)));
