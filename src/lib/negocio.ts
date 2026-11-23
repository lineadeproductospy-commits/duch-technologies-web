// Datos de DUCH Technologies. Cambia aquí y se actualiza toda la página.

export const WHATSAPP = "595982990708"; // 0982 990 708 con código de Paraguay
export const WHATSAPP_LEGIBLE = "0982 990 708";
export const EMAIL = "duchtechnogies@gmail.com"; // confirmado por el dueño
export const TIKTOK_USUARIO = "duch.technologies";
export const TIKTOK_URL = `https://www.tiktok.com/@${TIKTOK_USUARIO}`;

export function linkWhatsApp(mensaje = "Hola DUCH Technologies, quiero cotizar una página web para mi negocio.") {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

export const SECCIONES = [
  { id: "inicio", texto: "Inicio" },
  { id: "servicios", texto: "Servicios" },
  { id: "tecnologia", texto: "Tecnología e innovación" },
  { id: "portafolio", texto: "Proyectos y portafolio" },
  { id: "nosotros", texto: "Sobre nosotros" },
  { id: "contacto", texto: "Contacto" },
] as const;

/** Enlaces extra del pie: secciones que existen pero no van en el menú principal */
export const SECCIONES_EXTRA = [
  { id: "proceso", texto: "Cómo trabajamos" },
  { id: "cotizacion", texto: "Precios" },
  { id: "preguntas", texto: "Preguntas frecuentes" },
] as const;

export type Servicio = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  alt: string;
  mensaje: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "web",
    nombre: "Desarrollo web",
    descripcion:
      "Páginas y sistemas web rápidos, seguros y adaptados al celular, pensados para que tus clientes te encuentren y te contacten.",
    imagen: "/images/tecnologia/oficina.webp",
    alt: "Estación de trabajo con tres monitores de código y paneles holográficos",
    mensaje: "Hola DUCH Technologies, me interesa el servicio de Desarrollo web.",
  },
  {
    id: "ia",
    nombre: "Inteligencia artificial",
    descripcion:
      "Asistentes y herramientas con IA que responden consultas, ordenan información y reducen el trabajo repetitivo de tu equipo.",
    imagen: "/images/tecnologia/cerebro.webp",
    alt: "Cerebro holográfico formado por una red de puntos de luz azul",
    mensaje: "Hola DUCH Technologies, me interesa el servicio de Inteligencia artificial.",
  },
  {
    id: "automatizacion",
    nombre: "Automatización digital",
    descripcion:
      "Conectamos tus herramientas para que pedidos, mensajes y reportes fluyan solos, sin copiar y pegar datos a mano.",
    imagen: "/images/tecnologia/nube.webp",
    alt: "Nube luminosa conectada a una red de servidores sobre una ciudad nocturna",
    mensaje: "Hola DUCH Technologies, me interesa el servicio de Automatización digital.",
  },
  {
    id: "soluciones",
    nombre: "Soluciones tecnológicas",
    descripcion:
      "Sistemas a medida, paneles de gestión e infraestructura en la nube para resolver una necesidad concreta de tu negocio.",
    imagen: "/images/tecnologia/servidores.webp",
    alt: "Filas de servidores con luces azules en una sala tecnológica",
    mensaje: "Hola DUCH Technologies, me interesa el servicio de Soluciones tecnológicas.",
  },
  {
    id: "marketing",
    nombre: "Marketing digital",
    descripcion:
      "Presencia en buscadores y redes, con páginas medibles que convierten visitas en consultas reales por WhatsApp.",
    imagen: "/images/tecnologia/analitica.webp",
    alt: "Panel holográfico de analítica con gráficos y métricas",
    mensaje: "Hola DUCH Technologies, me interesa el servicio de Marketing digital.",
  },
];

export type Proyecto = {
  nombre: string;
  rubro: string;
  descripcion: string;
  estado: "en-vivo" | "concepto";
  /** Página publicada */
  url?: string;
  /** Diseño navegable dentro de esta misma web */
  demo?: string;
  imagen?: string;
  imagenMovil?: string;
  /** Captura vertical (de celular) */
  imagenVertical?: string;
  alt: string;
  /** Colores de la escena del caso de estudio */
  escena: { fondo: string; luz: string; tinta: "clara" | "oscura" };
};

export const PROYECTOS: Proyecto[] = [
  {
    nombre: "Magali Torres",
    rubro: "Invitación digital",
    descripcion:
      "Una invitación que se abre tocando un televisor retro lleno de color. Llega por WhatsApp y se ve perfecta en el celular.",
    estado: "en-vivo",
    url: "https://magartes.com/",
    imagenVertical: "/images/portafolio/magali.webp",
    alt: "Invitación de Magartes: un televisor retro con barras de colores y el botón Abrir invitación",
    escena: { fondo: "#fbe9f0", luz: "#ff5fa8", tinta: "oscura" },
  },
  {
    nombre: "Brasa & Pan",
    rubro: "Hamburguesería",
    descripcion:
      "Menú con fotos que abren el apetito y pedido directo por WhatsApp. Pensada para que el cliente pida en menos de un minuto desde el celular.",
    estado: "concepto",
    demo: "/proyectos/brasa-y-pan/index.html",
    imagen: "/images/portafolio/brasa.webp",
    imagenMovil: "/images/portafolio/brasa-movil.webp",
    alt: "Página de la hamburguesería Brasa & Pan con una hamburguesa a la leña",
    escena: { fondo: "#0d1411", luz: "#f0b429", tinta: "clara" },
  },
  {
    nombre: "Salón Lapacho",
    rubro: "Peluquería",
    descripcion:
      "Lista de precios clara, horarios que muestran si está abierto ahora y reservas de turnos por WhatsApp.",
    estado: "concepto",
    demo: "/proyectos/salon-lapacho/index.html",
    imagen: "/images/portafolio/pelu.webp",
    imagenMovil: "/images/portafolio/pelu-movil.webp",
    alt: "Página de la peluquería Salón Lapacho en tonos vino y dorado",
    escena: { fondo: "#2b1020", luz: "#c9a46a", tinta: "clara" },
  },
];

export const PASOS = [
  {
    titulo: "Conversamos",
    texto: "Nos cuentas de tu negocio, a quién le vendes y qué quieres lograr. Por WhatsApp o en una llamada.",
  },
  {
    titulo: "Diseñamos",
    texto: "Te mostramos una primera versión con tus colores, tu logo y tus textos. Nada de plantillas genéricas.",
  },
  {
    titulo: "Ajustamos",
    texto: "Cambiamos lo que haga falta hasta que te guste. Tu opinión manda.",
  },
  {
    titulo: "Publicamos",
    texto: "Tu página queda en línea con su enlace, lista para compartir en redes y en tu WhatsApp.",
  },
];

export const INCLUYE = [
  "Diseño personalizado",
  "Tu logotipo y los colores de tu negocio",
  "Integración con WhatsApp",
  "Adaptación a celular, tablet y computadora",
  "Optimización SEO para aparecer en Google",
  "Ajustes antes de publicar",
];

/* ---------- Planes y precios ----------
   Cambia precios y textos aquí. Si "precio" es null, se muestra "A cotizar". */
export type Plan = {
  nombre: string;
  para: string;
  precio: number | null;
  /** Texto chico junto al precio */
  nota: string;
  incluye: string[];
  destacado?: boolean;
  mensaje: string;
};

export const MONEDA = "USD";

export const PLANES: Plan[] = [
  {
    nombre: "Esencial",
    para: "Emprendedores y negocios que necesitan estar en internet ya.",
    precio: 85,
    nota: "pago único",
    incluye: [
      "Página de una sección (landing)",
      "Diseño a medida con tu logo y colores",
      "Botón directo a tu WhatsApp",
      "Adaptada a celular, tablet y computadora",
      "Certificado de seguridad (SSL)",
      "Publicación en línea",
    ],
    mensaje: "Hola DUCH Technologies, me interesa el plan Esencial (desde 85 USD).",
  },
  {
    nombre: "Negocio",
    para: "Comercios que quieren vender más: menú, catálogo, precios o turnos.",
    precio: null,
    nota: "según secciones",
    destacado: true,
    incluye: [
      "Todo lo del plan Esencial",
      "Varias secciones o páginas",
      "Menú, catálogo o lista de precios",
      "Pedidos o reservas por WhatsApp",
      "Ubicación en Google Maps",
      "SEO básico para aparecer en Google",
    ],
    mensaje: "Hola DUCH Technologies, me interesa el plan Negocio. ¿Me pasan una cotización?",
  },
  {
    nombre: "A medida",
    para: "Proyectos con funciones propias: tienda, sistema o panel.",
    precio: null,
    nota: "proyecto a medida",
    incluye: [
      "Tienda en línea o carrito de pedidos",
      "Panel para editar tus precios y fotos",
      "Formularios, reservas y calendario",
      "Conexión con tus herramientas",
      "Soporte y mejoras continuas",
    ],
    mensaje: "Hola DUCH Technologies, tengo un proyecto a medida y quiero cotizarlo.",
  },
];

/* ---------- Preguntas frecuentes ---------- */
export const PREGUNTAS = [
  {
    pregunta: "¿Cuánto cuesta una página web?",
    respuesta:
      "Las páginas arrancan desde 85 USD con el plan Esencial. Si necesitas más secciones, catálogo, reservas o tienda, te enviamos un presupuesto a medida por WhatsApp, sin compromiso.",
  },
  {
    pregunta: "¿Cuánto tarda en estar lista?",
    respuesta:
      "Depende del tamaño del proyecto. Una página simple se entrega rápido; los proyectos más grandes llevan más tiempo. Te confirmamos el plazo exacto junto con la cotización.",
  },
  {
    pregunta: "¿Necesito tener logo o fotos?",
    respuesta:
      "No es obligatorio. Si ya tienes logo y fotos, los usamos. Si no, te ayudamos a definir colores y estilo para que tu página se vea profesional.",
  },
  {
    pregunta: "¿Puedo tener mi propio dominio (.com o .com.py)?",
    respuesta:
      "Sí. Podemos conectar tu página a un dominio propio. El costo del dominio lo cobra el proveedor que lo registra y se paga aparte.",
  },
  {
    pregunta: "¿Qué pasa si después quiero cambiar precios u horarios?",
    respuesta:
      "Nos escribes por WhatsApp y lo actualizamos. No te quedas solo después de publicar.",
  },
  {
    pregunta: "¿Cómo se paga?",
    respuesta:
      "Te explicamos la forma de pago y los plazos en la cotización, antes de empezar. Sin letra chica.",
  },
];

/* ---------- Opciones del formulario de cotización ---------- */
export const TIPOS_PROYECTO = [
  "Página para mi negocio",
  "Menú o catálogo con pedidos",
  "Reservas o turnos",
  "Tienda en línea",
  "Invitación digital",
  "Otro",
];
