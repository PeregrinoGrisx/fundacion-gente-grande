// Versión Markdown de la portada (la entrega el Worker con Accept: text/markdown).
import { inicioMarkdown, markdownResponse } from "../lib/agent-docs";

export const GET = () => markdownResponse(inicioMarkdown());
