// Versión Markdown de /recursos/ (la entrega el Worker con Accept: text/markdown).
import { recursosMarkdown, markdownResponse } from "../../lib/agent-docs";

export const GET = () => markdownResponse(recursosMarkdown());
