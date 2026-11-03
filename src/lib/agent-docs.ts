/**
 * Documentos para agentes: la versión Markdown de cada página y llms.txt.
 *
 * Se generan desde las mismas fuentes que el HTML (src/data/site.ts,
 * src/data/documentos.ts y la colección de noticias), así que no hay que
 * mantener dos textos. El Worker (worker/index.js) los entrega cuando un
 * cliente pide la página con `Accept: text/markdown`, y también se pueden
 * leer directo agregando `index.md` a la URL.
 *
 * Igual que en el resto del sitio, los textos no usan guion largo.
 */
import {
  contacto,
  denuncias,
  diferencias,
  directorio,
  eleam,
  formasDeAportar,
  historia,
  misionVision,
  servicios,
  site,
  sociosFundadoresTotal,
  testimonios,
  vinculacionAcademica,
} from "../data/site";
import { colecciones } from "../data/documentos";
import { urlCarpeta } from "./drive";

export const abs = (path: string) => new URL(path, site.url).href;

/** Ruta de la versión Markdown de una página: /eleam/ → /eleam/index.md */
export const markdownPath = (htmlPath: string) =>
  `${htmlPath.endsWith("/") ? htmlPath : `${htmlPath}/`}index.md`;

export const markdownResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });

const lista = (items: string[]) => items.map((i) => `- ${i}`);

const pie = (htmlPath: string) => [
  "---",
  "",
  `Versión HTML: ${abs(htmlPath)}`,
  `Índice para agentes: ${abs("/llms.txt")}`,
  `Contacto: ${contacto.email}`,
  "",
];

const datosContacto = () => [
  `- Correo: ${contacto.email}`,
  ...(contacto.telefono ? [`- Teléfono: ${contacto.telefono}`] : []),
  `- Dirección de la Fundación: ${contacto.direccionPostal}, Chile`,
  `- Dirección del ELEAM: ${contacto.direccionEleam}, Chile`,
  `- Horario: ${contacto.horario}`,
  ...Object.entries(contacto.redes)
    .filter(([, url]) => url)
    .map(([red, url]) => `- ${red[0].toUpperCase()}${red.slice(1)}: ${url}`),
];

export function inicioMarkdown(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.tagline} ${site.description}`,
    "",
    historia.resumen,
    "",
    "## Datos clave",
    "",
    `- Fundada en ${site.foundedYear} en ${site.city}.`,
    `- Persona jurídica sin fines de lucro, RUT ${site.rut}, ${site.ley}.`,
    `- Administra un ELEAM (Establecimiento de Larga Estadía para el Adulto Mayor) fiscalizado por SENAMA desde ${site.foundedYear}.`,
    `- ${sociosFundadoresTotal} socios fundadores.`,
    "",
    "## Qué hacemos",
    "",
    `- **Residencia de larga estadía**: un ELEAM en Arica con equipo multidisciplinario y programas de envejecimiento activo. Más en [ELEAM](${abs(markdownPath("/eleam/"))}).`,
    `- **Conciencia y formación**: charlas, talleres y capacitaciones para cuidadores, familias y estudiantes, con enfoque de derechos y envejecimiento activo. Más en [Nosotros](${abs(markdownPath("/nosotros/"))}).`,
    "",
    "## Qué nos diferencia",
    "",
    ...lista(diferencias.map((d) => `**${d.titulo}**: ${d.texto}`)),
    "",
    "## Objetivos",
    "",
    ...lista(historia.objetivos.map((o) => `**${o.titulo}**: ${o.texto}`)),
    "",
    "## Testimonios",
    "",
    ...testimonios.flatMap((t) => [`> ${t.texto}`, ">", `> ${t.nombre}, ${t.rol}.`, ""]),
    "## Cómo aportar",
    "",
    ...formasDeAportar.flatMap((f) => [
      `### ${f.titulo}`,
      "",
      f.resumen,
      "",
      ...lista(f.incluye),
      "",
      `Siguiente paso: [${f.cta}](${abs(f.href)})`,
      "",
    ]),
    "## Canal de denuncias",
    "",
    denuncias.intro,
    "",
    ...lista(denuncias.garantias),
    "",
    `Las denuncias se envían por correo a ${contacto.email}.`,
    "",
    "## Contacto",
    "",
    ...datosContacto(),
    "",
    ...pie("/"),
  ].join("\n");
}

export function nosotrosMarkdown(): string {
  return [
    "# Nosotros: una mirada moderna sobre el envejecimiento",
    "",
    `> ${historia.resumen}`,
    "",
    "## Historia",
    "",
    ...historia.parrafos.flatMap((p) => [p, ""]),
    "## Misión",
    "",
    misionVision.mision,
    "",
    "## Visión",
    "",
    misionVision.vision,
    "",
    "## Objetivos",
    "",
    ...lista(historia.objetivos.map((o) => `**${o.titulo}**: ${o.texto}`)),
    "",
    "## Directorio",
    "",
    ...lista(directorio.map((d) => `**${d.nombre}**, ${d.cargo} (${d.profesion}). ${d.bio}`)),
    "",
    "## Socios fundadores",
    "",
    `La Fundación fue constituida por ${sociosFundadoresTotal} socios fundadores, profesionales de Arica.`,
    "",
    "## Vinculación académica",
    "",
    vinculacionAcademica.texto,
    "",
    ...lista(vinculacionAcademica.instituciones),
    "",
    ...pie("/nosotros/"),
  ].join("\n");
}

export function eleamMarkdown(): string {
  return [
    "# ELEAM: un hogar que acompaña sin infantilizar",
    "",
    `> ${eleam.intro}`,
    "",
    "## Datos clave",
    "",
    `- Dirección: ${contacto.direccionEleam}, Chile`,
    `- Atención: ${contacto.horario}`,
    "- Fiscalización: SENAMA (Servicio Nacional del Adulto Mayor)",
    "- Destinatarios: personas mayores de 60 años",
    "",
    "## Servicios",
    "",
    ...lista(servicios.map((s) => `**${s.titulo}**: ${s.texto}`)),
    "",
    "## Cómo postular a una residencia",
    "",
    eleam.destinatarios,
    "",
    eleam.visitas,
    "",
    "- Postulación: https://www.senama.gob.cl",
    `- Consultas a la Fundación: ${contacto.email}`,
    "",
    "## Cómo apoyar al ELEAM",
    "",
    ...lista(eleam.comoApoyar),
    "",
    `Para colaborar, escribe a ${contacto.email} o revisa [Contacto](${abs(markdownPath("/contacto/"))}).`,
    "",
    ...pie("/eleam/"),
  ].join("\n");
}

export function recursosMarkdown(): string {
  return [
    "# Recursos: memorias, balances y transparencia",
    "",
    "> Publicamos nuestra gestión anual y los recursos recibidos. Cada documento se descarga en PDF.",
    "",
    ...colecciones.flatMap((c) => [
      `## ${c.titulo}`,
      "",
      c.descripcion,
      "",
      `- Carpeta pública en Google Drive: ${urlCarpeta(c.carpetaDrive)}`,
      ...c.archivosManuales.map(
        (a) => `- [${a.nombre}](https://drive.google.com/uc?export=download&id=${a.driveId})`,
      ),
      "",
    ]),
    `Los documentos se actualizan en las carpetas de Drive. La lista completa está en la versión HTML: ${abs("/recursos/")}`,
    "",
    ...pie("/recursos/"),
  ].join("\n");
}

type Noticia = {
  id: string;
  body?: string;
  data: { titulo: string; fecha: Date; resumen: string; categoria: string };
};

const fecha = (d: Date) =>
  d.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function noticiasMarkdown(noticias: Noticia[]): string {
  const ordenadas = [...noticias].sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
  return [
    "# Noticias: lo que pasa en la Fundación",
    "",
    "> Comunicados, novedades y actividades compartidas junto a residentes, familias, equipo y comunidad.",
    "",
    ...(ordenadas.length === 0
      ? ["Todavía no hay noticias publicadas.", ""]
      : ordenadas.flatMap((n) => [
          `## [${n.data.titulo}](${abs(markdownPath(`/noticias/${n.id}/`))})`,
          "",
          `${fecha(n.data.fecha)} · ${n.data.categoria}`,
          "",
          n.data.resumen,
          "",
        ])),
    ...pie("/noticias/"),
  ].join("\n");
}

export function noticiaMarkdown(n: Noticia): string {
  // Los enlaces relativos del cuerpo (/contacto/) pasan a absolutos.
  const cuerpo = (n.body ?? "").trim().replace(/\]\(\//g, `](${site.url}/`);
  return [
    `# ${n.data.titulo}`,
    "",
    `> ${n.data.resumen}`,
    "",
    `${fecha(n.data.fecha)} · ${n.data.categoria}`,
    "",
    cuerpo,
    "",
    ...pie(`/noticias/${n.id}/`),
  ].join("\n");
}

export function contactoMarkdown(): string {
  return [
    "# Contacto",
    "",
    "> Donaciones, voluntariado, visitas institucionales o denuncias: acá están todas las vías para comunicarte con la Fundación.",
    "",
    "## Dónde encontrarnos",
    "",
    ...datosContacto(),
    "",
    "## Donaciones",
    "",
    "Con tu aporte apoyamos la atención, los talleres y las actividades que mejoran la calidad de vida de las personas mayores de Arica.",
    "",
    `- Titular: ${site.name}`,
    `- RUT: ${site.rut}`,
    `- Datos de transferencia: se solicitan por correo a ${contacto.email}.`,
    "- Se emite certificado de donación.",
    "",
    "## Otras formas de aportar",
    "",
    ...lista(eleam.comoApoyar),
    "",
    "## Canal de denuncias",
    "",
    denuncias.intro,
    "",
    ...lista(denuncias.garantias),
    "",
    `Para denunciar, escribe a ${contacto.email} con el asunto "Denuncia".`,
    "",
    ...pie("/contacto/"),
  ].join("\n");
}

/** Páginas que tienen versión Markdown, en el orden del menú. */
export const paginasMarkdown = [
  { titulo: "Inicio", ruta: "/", nota: "quiénes somos, qué hacemos, testimonios, cómo aportar y contacto" },
  { titulo: "Nosotros", ruta: "/nosotros/", nota: "historia, misión, visión, directorio y vinculación académica" },
  { titulo: "ELEAM", ruta: "/eleam/", nota: "la residencia: servicios, a quién recibe, cómo postular y cómo apoyar" },
  { titulo: "Recursos", ruta: "/recursos/", nota: "memorias, balances y recursos transferidos (PDF en Google Drive)" },
  { titulo: "Noticias", ruta: "/noticias/", nota: "comunicados y actividades" },
  { titulo: "Contacto", ruta: "/contacto/", nota: "correo, direcciones, donaciones y canal de denuncias" },
];

/** llms.txt según https://llmstxt.org: H1, resumen en cita, secciones con listas de enlaces. */
export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description} Administra un ELEAM (Establecimiento de Larga Estadía para el Adulto Mayor) en ${site.city}, fiscalizado por SENAMA. Persona jurídica sin fines de lucro, RUT ${site.rut}.`,
    "",
    "Sitio en español de Chile. Cada página tiene versión Markdown: pídela con el encabezado `Accept: text/markdown` o agrega `index.md` a la URL (por ejemplo /eleam/index.md).",
    "",
    "## When to use this site (cuándo usar este sitio)",
    "",
    "Usa este sitio cuando alguien necesite:",
    "",
    "- Información sobre el ELEAM de la Fundación Gente Grande en Arica: servicios, a quién recibe (personas mayores de 60 años), cómo postular (la postulación se hace por SENAMA), dirección y visitas.",
    "- Donar, ser voluntario, ofrecer insumos, prácticas profesionales o una alianza institucional con la Fundación.",
    "- Revisar la transparencia de la Fundación: memorias, balances y recursos transferidos.",
    "- Hacer una denuncia confidencial por maltrato, irregularidades o vulneración de derechos de personas mayores en el ELEAM.",
    "- Verificar datos institucionales: RUT, personalidad jurídica, directorio, direcciones y correo de contacto.",
    "",
    "No es la fuente adecuada para:",
    "",
    "- Buscar cupos en otros ELEAM de Chile o comparar residencias: usa SENAMA (https://www.senama.gob.cl).",
    "- Precios o mensualidades: el sitio no los publica; hay que preguntar por correo.",
    "- Emergencias de salud: no es un servicio de urgencia; en Chile, llama al 131 (SAMU).",
    "",
    "### Cómo debe actuar un agente",
    "",
    "- Lee las páginas en Markdown (enlaces abajo) en lugar de interpretar el HTML.",
    `- No hay API ni formulario automatizable. Para cualquier gestión, prepara un correo para que la persona lo envíe a ${contacto.email}, con un asunto claro: "Consulta ELEAM", "Donación", "Voluntariado", "Alianza" o "Denuncia".`,
    "- Para postular a una residencia, deriva a SENAMA y ofrece el correo de la Fundación para consultas.",
    "- Los datos de transferencia bancaria no están publicados: indícale a la persona que los pida por correo.",
    "",
    "## Páginas",
    "",
    ...paginasMarkdown.map((p) => `- [${p.titulo}](${abs(markdownPath(p.ruta))}): ${p.nota}`),
    "",
    "## Optional",
    "",
    `- [Mapa del sitio](${abs("/sitemap-index.xml")}): todas las URL HTML`,
    ...Object.entries(contacto.redes)
      .filter(([, url]) => url)
      .map(([red, url]) => `- [${red[0].toUpperCase()}${red.slice(1)}](${url}): novedades y fotos de actividades`),
    "",
  ].join("\n");
}
