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
  { id: "servicios", texto: "Servicios" },
  { id: "portafolio", texto: "Portafolio" },
  { id: "proceso", texto: "Proceso" },
  { id: "cotizacion", texto: "Cotización" },
  { id: "contacto", texto: "Contacto" },
] as const;

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
  {
    nombre: "Cuadra Propiedades",
    rubro: "Inmobiliaria",
    descripcion:
      "Propiedades destacadas con precio y metros a la vista, tasaciones sin costo y visitas coordinadas en el día.",
    estado: "concepto",
    demo: "/proyectos/cuadra-propiedades/index.html",
    imagen: "/images/portafolio/inmo.webp",
    imagenMovil: "/images/portafolio/inmo-movil.webp",
    alt: "Página de la inmobiliaria Cuadra Propiedades en tonos verde oliva",
    escena: { fondo: "#e9e4d8", luz: "#3f5a45", tinta: "oscura" },
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
