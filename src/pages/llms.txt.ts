// Índice para agentes según https://llmstxt.org
import { llmsTxt } from "../lib/agent-docs";

export const GET = () =>
  new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
