// Versión Markdown de /eleam/ (la entrega el Worker con Accept: text/markdown).
import { eleamMarkdown, markdownResponse } from "../../lib/agent-docs";

export const GET = () => markdownResponse(eleamMarkdown());
