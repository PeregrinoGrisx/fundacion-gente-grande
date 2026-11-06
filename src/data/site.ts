/**
 * Fuente única de contenido del sitio.
 *
 * Todo el texto institucional vive acá para que se edite sin tocar las
 * plantillas. Los campos marcados con `PENDIENTE` fueron extraídos del sitio
 * antiguo (fundaciongentegrandearica.org) y necesitan confirmación o
 * completarse con material que todavía no tenemos.
 */

import type { ImageMetadata } from "astro";
import fotoSilvia from "../assets/testimonios/silvia-farina.jpg";
import fotoAlexandra from "../assets/testimonios/alexandra-bustos.jpg";
import fotoDavid from "../assets/testimonios/david-henriquez.jpg";
import fotoAlfredo from "../assets/testimonios/alfredo-torrejon.jpg";

// Fotos reales del ELEAM (carpeta "Gente Grande Web", noviembre 2026)
import fotoEquipoAtencion from "../assets/fotos-eleam/equipo-atencion.jpg";
import fotoBaile from "../assets/fotos-eleam/baile-residente.jpg";
import fotoMisa from "../assets/fotos-eleam/misa-eleam.jpg";
import fotoAcompanamiento from "../assets/fotos-eleam/acompanamiento.jpg";
import fotoCineTeatro from "../assets/fotos-eleam/cine-teatro.jpg";
import fotoTallerBandera from "../assets/fotos-eleam/taller-manualidades-bandera.jpg";
import fotoPlaya from "../assets/fotos-eleam/paseo-playa-volantines.jpg";
import fotoVisitaMascota from "../assets/fotos-eleam/visita-mascota.jpg";
import fotoFiestasPatrias from "../assets/fotos-eleam/fiestas-patrias.jpg";

// Directorio (documento "INSUMOS WEB FGG", noviembre 2026). La foto de Romina
// es la de su sitio, rominaleblancampuero.cl.
import fotoPaula from "../assets/directorio/paula-leiva.jpg";
import fotoCarola from "../assets/directorio/carola-sandoval.jpg";
import fotoJimena from "../assets/directorio/jimena-aragones.jpg";
import fotoLuis from "../assets/directorio/luis-garrido.jpg";
import fotoRomina from "../assets/directorio/romina-le-blanc.jpg";

export const site = {
  name: "Fundación Gente Grande",
  shortName: "Gente Grande",
  tagline: "La grandeza tiene muchos años.",
  description:
    "Fundación sin fines de lucro dedicada al envejecimiento activo y digno de las personas mayores de Arica desde 2014.",
  url: "https://fundaciongentegrandearica.org",
  rut: "65.085.707-0",
  ley: "Ley 20.500 N°174509",
  foundedYear: 2014,
  city: "Arica, Chile",
  region: "XV Región de Arica y Parinacota",
};

export const contacto = {
  // PENDIENTE confirmar: el sitio antiguo usa el dominio
  // `fundaciongentegrande.org` en el correo, pero el sitio vive en
  // `fundaciongentegrandearica.org`. Verificar cuál está operativo.
  email: "rominaleblanc@fundaciongentegrande.org",
  telefono: "", // PENDIENTE: no hay teléfono público en el sitio actual.
  whatsapp: "", // PENDIENTE
  // Direcciones según el documento "INSUMOS WEB FGG" (noviembre 2026).
  direccionPostal: "Sargento Carvajal 3944, depto. 22, Arica", // Fundación (FGG)
  direccionEleam: "Volcán Cotacotani 131, Arica",
  /** Canal de denuncias: correo exclusivo, distinto del de contacto. */
  denuncias: "denuncias@fundaciongentegrande.org",
  horario: "Lunes a viernes, horario de oficina", // PENDIENTE: horas exactas
  redes: {
    facebook: "https://www.facebook.com/fundaciongentegrande",
    instagram: "https://www.instagram.com/fundaciongentegrande",
    youtube: "", // PENDIENTE: el enlace actual apunta a youtube.com sin canal
  },
};

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "ELEAM", href: "/eleam/" },
  { label: "Recursos", href: "/recursos/" },
  { label: "Noticias", href: "/noticias/" },
  { label: "Contacto", href: "/contacto/" },
];

export const misionVision = {
  mision:
    "Generar conciencia y entregar conocimientos empíricos sustentados técnicamente, con enfoque de envejecimiento activo. Potenciamos el desarrollo personal de la persona mayor, el ejercicio de sus derechos ciudadanos y el mejoramiento de su calidad de vida.",
  vision:
    "Una sociedad que considere a las personas mayores como iguales, sin infantilizarlas, desmitificando y desprejuiciando el envejecimiento para entenderlo como un proceso vital-natural. Pleno respeto a los derechos de las Personas Mayores como seres individuales y únicos.",
};

export const stats = [
  { value: 2014, label: "Operando desde", format: "year" as const },
  { value: 11, label: "Socios fundadores", suffix: "" },
  { value: 1, label: "ELEAM fiscalizado por SENAMA", suffix: "" },
  { value: 100, label: "Sin fines de lucro", suffix: "%" },
];

/** Relato institucional usado en Inicio y Nosotros. */
export const historia = {
  resumen:
    "Nacimos en 2014 de un grupo de profesionales de Arica que quería mirar la vejez desde otro lugar: moderno, activo y respetuoso, lejos de la caridad tradicional.",
  parrafos: [
    "La Fundación Gente Grande fue constituida en 2014 por un grupo de profesionales de Arica que buscaba abordar el envejecimiento desde una perspectiva moderna, activa y respetuosa, alejándose de la mirada asistencialista tradicional.",
    "Desde septiembre de 2014 administramos un ELEAM (Establecimiento de Larga Estadía para el Adulto Mayor) bajo la fiscalización de SENAMA, y mantenemos una presencia social activa en Arica y en la XV Región.",
    "Nuestro nombre dice lo que creemos: la grandeza se ve en el aspecto, en los logros, en la resiliencia, en los años y en el espíritu. Por eso somos Gente Grande.",
  ],
  objetivos: [
    {
      titulo: "Desarrollo pleno",
      texto:
        "Promover el desarrollo de las personas mayores con acompañamiento significativo y pertinente.",
      foto: fotoPlaya,
      fotoAlt: "Residente del ELEAM mirando volantines durante un paseo a la playa",
    },
    {
      titulo: "Trabajo en red",
      texto:
        "Articularnos con organizaciones sociales, servicios públicos e instituciones académicas de la región.",
      foto: fotoVisitaMascota,
      fotoAlt: "Residentes saludando junto a la mascota de una institución que visitó el ELEAM",
    },
    {
      titulo: "Conciencia comunitaria",
      texto:
        "Sensibilizar a la comunidad sobre el envejecimiento como un proceso vital y natural.",
      foto: fotoFiestasPatrias,
      fotoAlt: "Residente celebrando Fiestas Patrias en el ELEAM con un marco de fotos",
    },
  ],
};

/**
 * Directorio y representante legal, según el documento "INSUMOS WEB FGG"
 * (noviembre 2026). La profesión sale de la nómina de socios fundadores;
 * para quienes no están en ella se deja vacía. Pía Hachim no envió foto:
 * se muestra un retrato con sus iniciales.
 */
export const directorio: Array<{
  nombre: string;
  cargo: string;
  profesion?: string;
  foto?: ImageMetadata;
}> = [
  { nombre: "Paula Leiva Le-Blanc", cargo: "Presidenta", profesion: "Asistente social", foto: fotoPaula },
  {
    nombre: "Carola Sandoval Yañez",
    cargo: "Tesorera",
    profesion: "Contadora auditora y contadora pública",
    foto: fotoCarola,
  },
  { nombre: "Pía Hachim Meza", cargo: "Directora de Salud", profesion: "Psicóloga" },
  { nombre: "Jimena Aragonés Sir", cargo: "Directora Social", foto: fotoJimena },
  { nombre: "Luis Garrido Ampuero", cargo: "Secretario", foto: fotoLuis },
  { nombre: "Romina Le Blanc Ampuero", cargo: "Representante legal", profesion: "Abogada", foto: fotoRomina },
];

/** Socios fundadores: solo nombre y título, como pide el documento de insumos. */
export const sociosFundadores: Array<{
  nombre: string;
  profesion?: string;
  foto?: string;
}> = [
  { nombre: "Carola Sandoval Yañez", profesion: "Contadora auditora y contadora pública" },
  { nombre: "Paula Leiva Le-Blanc", profesion: "Asistente social" },
  { nombre: "Romina Le Blanc Ampuero", profesion: "Abogada" },
  { nombre: "Pía Hachim Meza", profesion: "Psicóloga" },
  { nombre: "Ilse Flores Rivera", profesion: "Terapeuta ocupacional" },
  { nombre: "David Escauriaza Sánchez", profesion: "Kinesiólogo" },
  { nombre: "María Angélica Álvarez Miranda", profesion: "Abogada" },
  { nombre: "Eduardo Ramírez Gómez", profesion: "Médico cirujano" },
  { nombre: "Hna. Paulina Minaya Villafana", profesion: "Religiosa" },
  { nombre: "María Cecilia Díaz Cuevas", profesion: "Ingeniera civil industrial" },
  { nombre: "Francisco Osorio Sobarzo", profesion: "Médico psiquiatra" },
];

export const sociosFundadoresTotal = sociosFundadores.length;

/**
 * La Fundación en redes y medios (documento "INSUMOS WEB FGG"). Las de
 * Instagram se incrustan con el código oficial de Instagram; el video del
 * Poder Judicial, con el reproductor de Facebook; la nota y el PDF van como
 * tarjetas con enlace. Los enlaces se guardan sin los parámetros de rastreo
 * (igsh) que agrega el botón "compartir".
 */
export const enRedes = [
  { url: "https://www.instagram.com/reel/DYA8VBVoOhm/", incrustar: true },
  { url: "https://www.instagram.com/reel/DXxTtRXoIa-/", incrustar: true },
  { url: "https://www.instagram.com/reel/DXclaJACHE3/", incrustar: true },
  { url: "https://www.instagram.com/p/DXjo9NPgDwF/", incrustar: true },
  // Estos dos reels no admiten incrustarse (Instagram responde "Unavailable"
  // en su página de embed): se muestran como tarjeta con enlace.
  { url: "https://www.instagram.com/reel/DZViYOLpoxBBJk063_AEaEKgawJmIh28dOOShg0/", incrustar: false },
  { url: "https://www.instagram.com/reel/DZTklwuO_W8LNWyPJ1VEA8rCQGMozG5t-Qhe4g0/", incrustar: false },
];

export const enMedios = [
  {
    medio: "Arica al Día",
    tipo: "Nota",
    fecha: "9 de diciembre de 2024",
    titulo:
      "Corte de Apelaciones de Arica dictó charla a la jurisdicción sobre Protocolo de Acceso a la Justicia de Personas Mayores",
    url: "https://www.aricaldia.cl/corte-de-apelaciones-de-arica-dicto-charla-a-la-jurisdiccion-sobre-protocolo-de-acceso-a-la-justicia-de-personas-mayores/",
    cta: "Leer la nota",
  },
  {
    medio: "Poder Judicial de Chile",
    tipo: "Video",
    fecha: "",
    titulo: "Jurisdicción de Arica asistió a charla sobre el protocolo de acceso a la justicia",
    url: encodeURI(
      "https://www.facebook.com/PoderJudicialdeChile/videos/jurisdicción-de-arica-asistió-a-charla-sobre-el-protocolo-de-acceso-a-la-justici/1049789480444541/",
    ),
    cta: "Ver en Facebook",
    /** Se incrusta con el reproductor de Facebook. */
    video: true,
  },
  {
    medio: "Extracto Legal",
    tipo: "PDF",
    fecha: "",
    titulo: "Juzgado de Arica y representante de Fundación Gente Grande coordinan trabajo",
    url: "https://extractolegal.cl/wp-content/uploads/2025/04/juzgado_de_arica_y_representante_de_fundacion_gente_grande_coordinan_trabajo.pdf",
    cta: "Abrir el PDF",
  },
];

export const servicios = [
  {
    titulo: "Atención integral",
    texto:
      "Equipo multidisciplinario de médicos, psicólogos, terapeutas ocupacionales y asistentes sociales.",
    icono: "corazon",
    foto: fotoEquipoAtencion,
    fotoAlt: "Funcionarios del ELEAM sirviendo una torta a residentes",
  },
  {
    titulo: "Envejecimiento activo",
    texto:
      "Actividades físicas, cognitivas y sociales orientadas a mantener la autonomía.",
    icono: "actividad",
    foto: fotoBaile,
    fotoAlt: "Residente bailando en el hall del ELEAM",
  },
  {
    titulo: "Comunidad y familia",
    texto:
      "Visitas de autoridades, organizaciones y familias como parte de la vida cotidiana del ELEAM.",
    icono: "comunidad",
    foto: fotoMisa,
    fotoAlt: "Sacerdote dando la comunión a una residente durante una misa en el ELEAM",
  },
  {
    titulo: "Regulación SENAMA",
    texto:
      "Operamos bajo los estándares y la fiscalización del Servicio Nacional del Adulto Mayor.",
    icono: "escudo",
    foto: fotoAcompanamiento,
    fotoAlt: "Residente sonriendo junto a un funcionario que lo acompaña",
  },
  {
    titulo: "Participación social",
    texto:
      "Charlas, visitas de servicios públicos y trabajo conjunto con agrupaciones locales.",
    icono: "megafono",
    foto: fotoCineTeatro,
    fotoAlt: "Afiche del Cine-Teatro del ELEAM de Arica con carteleras de películas clásicas",
  },
  {
    titulo: "Formación y talleres",
    texto:
      "Capacitaciones dirigidas a cuidadores, familias y estudiantes en práctica.",
    icono: "libro",
    foto: fotoTallerBandera,
    fotoAlt: "Residente armando una bandera chilena en un taller de manualidades",
  },
];

export const eleam = {
  intro:
    "El ELEAM de la Fundación Gente Grande es un Establecimiento de Larga Estadía para el Adulto Mayor en Arica, en funcionamiento desde 2014 y fiscalizado por SENAMA.",
  destinatarios:
    "Personas mayores de 60 años que requieren cuidados de larga estadía. La postulación a residencia se realiza a través de SENAMA.",
  visitas:
    "Las visitas se coordinan con anticipación. Atendemos de lunes a viernes en horario de oficina.",
  comoApoyar: [
    "Voluntariado",
    "Donaciones de insumos y materiales",
    "Visitas institucionales",
    "Charlas y actividades",
    "Alianzas con organizaciones sociales",
  ],
};

export const vinculacionAcademica = {
  texto:
    "Mantenemos alianzas con instituciones de la región para prácticas profesionales, investigación y sensibilización sobre el envejecimiento.",
  instituciones: [
    "Universidad de Tarapacá",
    "Universidad Arturo Prat",
    "Instituto Profesional de Arica",
    "Centros de formación técnica de la región",
    "Colegios de Arica y Parinacota",
  ],
};

/**
 * Extractos del documento "TESTIMONIOS FGG" (noviembre 2026). Los textos
 * completos están en ese documento; acá va solo un fragmento textual de cada
 * uno. Las fotos son las que enviaron las mismas personas, recortadas en
 * cuadrado centrado en la cara (src/assets/testimonios/).
 */
export const testimonios = [
  {
    nombre: "Silvia Fariña",
    rol: "Colaboradora de la Fundación",
    foto: fotoSilvia,
    texto:
      "Fundación Gente Grande para mí es un refugio, al cual gente vulnerable tiene la fortuna de acceder para ser acogida y tener una vida digna en una etapa avanzada de su vida.",
  },
  {
    nombre: "Alexandra Bustos Ortuño",
    rol: "Hija de Sandra Ortuño, residente",
    foto: fotoAlexandra,
    texto:
      "Encontrarlos a ustedes fue una verdadera bendición en nuestras vidas. Gracias a su entrega, cariño y profesionalismo, mi mamá hoy recibe una atención integral, digna y sumamente humana.",
  },
  {
    nombre: "David Henríquez",
    rol: "Académico, carrera de Educación Física",
    foto: fotoDavid,
    texto:
      "Una institución como ELEAM permite entregar un espacio humano de calidad de vida para las personas mayores que no han tenido una vida fácil. Desde el principio fuimos recibidos con los brazos abiertos.",
  },
  {
    nombre: "Alfredo Torrejón Rivera",
    rol: "Hijo de María Rivera Zora, residente desde 2021",
    foto: fotoAlfredo,
    texto:
      "Con el paso del tiempo, esa tristeza inicial fue dando paso a una enorme tranquilidad y gratitud. Gracias por cuidar a mi madre como si fuera parte de su propia familia.",
  },
];

export const denuncias = {
  intro:
    "Si has sido testigo o víctima de irregularidades, maltrato, vulneración de derechos o situaciones contrarias a nuestra ética institucional, tienes el derecho y la responsabilidad de reportarlo. Tu denuncia es confidencial y será tratada con la seriedad que merece.",
  garantias: [
    "Confidencialidad garantizada",
    "Respuesta en 48 horas hábiles",
    "Cero represalias",
  ],
};

export const donacion = {
  titulo: "Tu donación transforma vidas",
  texto:
    "Con tu aporte apoyamos la atención, los talleres y las actividades que mejoran la calidad de vida de las personas mayores de Arica. Cada peso cuenta.",
  fineprint: `Persona jurídica sin fines de lucro · RUT ${site.rut} · Certificado de donación disponible`,
  // PENDIENTE: definir el medio de pago real (transferencia, Webpay, Mercado Pago).
  datosTransferencia: {
    titular: "Fundación Gente Grande",
    rut: site.rut,
    banco: "", // PENDIENTE
    tipoCuenta: "", // PENDIENTE
    numeroCuenta: "", // PENDIENTE
    email: contacto.email,
  },
};

/**
 * Qué nos diferencia. Ocupa el lugar de la sección "Features" del template.
 */
export const diferencias = [
  {
    titulo: "Sin infantilizar",
    texto:
      "Tratamos a cada residente como el adulto que es. Nada de diminutivos ni de decidir por ellos lo que pueden decidir solos.",
    icono: "comunidad",
  },
  {
    titulo: "Equipo multidisciplinario",
    texto:
      "Medicina, psiquiatría, psicología, terapia ocupacional y trabajo social, coordinados en un mismo plan de cuidado.",
    icono: "corazon",
  },
  {
    titulo: "Cuentas a la vista",
    texto:
      "Memorias, balances y recursos recibidos publicados para descarga. Fiscalizados por SENAMA desde 2014.",
    icono: "escudo",
  },
];

/**
 * Formas de aportar. Ocupa el lugar de la grilla de planes del template:
 * misma estructura de tres columnas con una destacada, pero sin precios,
 * porque acá no se vende nada.
 */
export const formasDeAportar = [
  {
    titulo: "Voluntariado",
    resumen: "Tu tiempo, que es lo que más se nota.",
    destacado: false,
    incluye: [
      "Acompañamiento a residentes",
      "Apoyo en talleres y actividades",
      "Salidas y celebraciones",
      "Coordinación según tu disponibilidad",
    ],
    cta: "Quiero ser voluntario",
    href: "/contacto/#voluntariado",
  },
  {
    titulo: "Donación",
    resumen: "Sostiene la atención diaria del ELEAM.",
    destacado: true,
    incluye: [
      "Aporte único o mensual",
      "Certificado de donación",
      "Rendición pública en memorias y balances",
      "Destino informado a quien aporta",
    ],
    cta: "Donar ahora",
    href: "/contacto/#donar",
  },
  {
    titulo: "Insumos y alianzas",
    resumen: "Materiales, servicios o convenios institucionales.",
    destacado: false,
    incluye: [
      "Donación de insumos y materiales",
      "Charlas y visitas institucionales",
      "Prácticas profesionales",
      "Convenios con organizaciones",
    ],
    cta: "Conversemos",
    href: "/contacto/",
  },
];
