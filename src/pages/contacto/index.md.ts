// Versión Markdown de /contacto/ (la entrega el Worker con Accept: text/markdown).
import { contactoMarkdown, markdownResponse } from "../../lib/agent-docs";

export const GET = () => markdownResponse(contactoMarkdown());
