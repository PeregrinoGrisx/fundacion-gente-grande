/**
 * Fuente única de contenido del sitio.
 *
 * Todo el texto institucional vive acá para que se edite sin tocar las
 * plantillas. Los campos marcados con `PENDIENTE` fueron extraídos del sitio
 * antiguo (fundaciongentegrandearica.org) y necesitan confirmación o
 * completarse con material que todavía no tenemos.
 */

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
  direccionPostal: "Volcán Cotacotani #131, Arica",
  direccionEleam: "Sargento Carvajal 3944, depto. 22, Arica",
  horario: "Lunes a viernes, horario de oficina", // PENDIENTE: horas exactas
  redes: {
    facebook: "https://web.facebook.com/fggaricachile",
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
    "Desde septiembre de 2014 administramos un ELEAM —Establecimiento de Larga Estadía para el Adulto Mayor— bajo la fiscalización de SENAMA, y mantenemos una presencia social activa en Arica y en la XV Región.",
    "Nuestro nombre dice lo que creemos: la grandeza se ve en el aspecto, en los logros, en la resiliencia, en los años y en el espíritu. Por eso somos Gente Grande.",
  ],
  objetivos: [
    {
      titulo: "Desarrollo pleno",
      texto:
        "Promover el desarrollo de las personas mayores con acompañamiento significativo y pertinente.",
    },
    {
      titulo: "Trabajo en red",
      texto:
        "Articularnos con organizaciones sociales, servicios públicos e instituciones académicas de la región.",
    },
    {
      titulo: "Conciencia comunitaria",
      texto:
        "Sensibilizar a la comunidad sobre el envejecimiento como un proceso vital y natural.",
    },
  ],
};

/**
 * Directorio.
 * PENDIENTE: fotografías de cada integrante (`foto`). Los teléfonos y correos
 * que aparecen en el sitio antiguo son placeholders de plantilla
 * (+1 859 254-6589 / info@example.com) y se omitieron a propósito.
 */
export const directorio = [
  {
    nombre: "Romina Le Blanc Ampuero",
    cargo: "Presidenta y representante legal",
    profesion: "Abogada",
    bio: "Más de 10 años promoviendo los derechos de las personas mayores.",
    foto: "", // PENDIENTE
  },
  {
    nombre: "Francisco Osorio Sobarzo",
    cargo: "Vicepresidente y director",
    profesion: "Médico psiquiatra",
    bio: "Impulsa la salud mental y el bienestar integral en el ELEAM.",
    foto: "", // PENDIENTE
  },
  {
    nombre: "Carola Sandoval Yañez",
    cargo: "Tesorera y directora",
    profesion: "Contadora auditora",
    bio: "Responsable de la transparencia financiera y la rendición de cuentas.",
    foto: "", // PENDIENTE
  },
  {
    nombre: "Ilse Flores Rivera",
    cargo: "Secretaria y directora",
    profesion: "Terapeuta ocupacional",
    bio: "Coordina los programas y talleres de envejecimiento activo del ELEAM.",
    foto: "", // PENDIENTE
  },
  {
    nombre: "Pía Hachim Meza",
    cargo: "Directora",
    profesion: "Psicóloga",
    bio: "A cargo del apoyo emocional y psicosocial a residentes y familias.",
    foto: "", // PENDIENTE
  },
];

/**
 * Socios fundadores.
 * PENDIENTE: el sitio antiguo declara 11 socios fundadores pero muestra
 * tarjetas con texto de relleno ("Lorem ipsum", "John Doe, CEO").
 * Hacen falta los 11 nombres reales, sus profesiones y fotos.
 */
export const sociosFundadores: Array<{
  nombre: string;
  profesion?: string;
  foto?: string;
}> = [];

export const sociosFundadoresTotal = 11;

export const servicios = [
  {
    titulo: "Atención integral",
    texto:
      "Equipo multidisciplinario de médicos, psicólogos, terapeutas ocupacionales y asistentes sociales.",
    icono: "corazon",
  },
  {
    titulo: "Envejecimiento activo",
    texto:
      "Actividades físicas, cognitivas y sociales orientadas a mantener la autonomía.",
    icono: "actividad",
  },
  {
    titulo: "Comunidad y familia",
    texto:
      "Visitas de autoridades, organizaciones y familias como parte de la vida cotidiana del ELEAM.",
    icono: "comunidad",
  },
  {
    titulo: "Regulación SENAMA",
    texto:
      "Operamos bajo los estándares y la fiscalización del Servicio Nacional del Adulto Mayor.",
    icono: "escudo",
  },
  {
    titulo: "Participación social",
    texto:
      "Charlas, visitas de servicios públicos y trabajo conjunto con agrupaciones locales.",
    icono: "megafono",
  },
  {
    titulo: "Formación y talleres",
    texto:
      "Capacitaciones dirigidas a cuidadores, familias y estudiantes en práctica.",
    icono: "libro",
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

export const testimonios = [
  {
    texto:
      "Al principio tenía algunas dudas, pero poco a poco fui sintiéndome como en casa. Hoy disfruto mucho conversar y compartir con mis compañeros.",
    autor: "Residente",
  },
  {
    texto:
      "Lo que más valoramos es el trato cercano del equipo. Siempre sentimos que nuestras inquietudes son escuchadas y que nuestro familiar está bien acompañado.",
    autor: "Hija de residente",
  },
  {
    texto:
      "Aquí he encontrado compañía, nuevas amistades y momentos para disfrutar. Me gusta sentir que cada día tengo algo nuevo que compartir.",
    autor: "Residente",
  },
  {
    texto:
      "Desde que mi mamá llegó, la vemos más tranquila y acompañada. Saber que está en buenas manos nos da mucha tranquilidad como familia.",
    autor: "Hija de residente",
  },
  {
    texto:
      "Me gusta compartir con los demás y participar en las actividades. Aquí me siento acompañada y tengo cosas que disfrutar cada día.",
    autor: "Residente",
  },
  {
    texto:
      "Encontrar este lugar fue un alivio para nuestra familia. Sabemos que nuestro padre recibe atención, cariño y el respeto que merece.",
    autor: "Hija de residente",
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
