// Versión Markdown de /nosotros/ (la entrega el Worker con Accept: text/markdown).
import { nosotrosMarkdown, markdownResponse } from "../../lib/agent-docs";

export const GET = () => markdownResponse(nosotrosMarkdown());
