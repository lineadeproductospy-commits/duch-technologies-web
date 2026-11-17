// Datos de DUCH Technologies. Cambia aquí y se actualiza toda la página.

export const WHATSAPP = "595982990708"; // 0982 990 708 con código de Paraguay
export const WHATSAPP_LEGIBLE = "0982 990 708";
export const EMAIL = "duchtechnogies@gmail.com";
export const TIKTOK_USUARIO = "duch.technologies";
export const TIKTOK_URL = `https://www.tiktok.com/@${TIKTOK_USUARIO}`;

export function linkWhatsApp(mensaje = "Hola DUCH Technologies, quiero cotizar una página web para mi negocio.") {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

export type Proyecto = {
  nombre: string;
  rubro: string;
  descripcion: string;
  estado: "en-vivo" | "concepto";
  url?: string;
  imagen?: string;
  imagenMovil?: string;
  /** Captura vertical (de celular) que se muestra centrada dentro del marco */
  imagenVertical?: string;
  /** Enlace al diseño navegable dentro de esta misma web */
  demo?: string;
  alt: string;
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
  },
  {
    nombre: "Brasa & Pan",
    rubro: "Hamburguesería",
    descripcion:
      "Menú con fotos que abren el apetito y pedido directo por WhatsApp. Pensada para que el cliente pida en menos de un minuto desde el celular.",
    estado: "concepto",
    imagen: "/images/portafolio/brasa.webp",
    demo: "/proyectos/brasa-y-pan/index.html",
    imagenMovil: "/images/portafolio/brasa-movil.webp",
    alt: "Página de la hamburguesería Brasa & Pan con una hamburguesa a la leña",
  },
  {
    nombre: "Salón Lapacho",
    rubro: "Peluquería",
    descripcion:
      "Lista de precios clara, horarios que muestran si está abierto ahora y reservas de turnos por WhatsApp.",
    estado: "concepto",
    imagen: "/images/portafolio/pelu.webp",
    demo: "/proyectos/salon-lapacho/index.html",
    imagenMovil: "/images/portafolio/pelu-movil.webp",
    alt: "Página de la peluquería Salón Lapacho en tonos vino y dorado",
  },
  {
    nombre: "Cuadra Propiedades",
    rubro: "Inmobiliaria",
    descripcion:
      "Propiedades destacadas con precio y metros a la vista, tasaciones sin costo y visitas coordinadas en el día.",
    estado: "concepto",
    imagen: "/images/portafolio/inmo.webp",
    demo: "/proyectos/cuadra-propiedades/index.html",
    imagenMovil: "/images/portafolio/inmo-movil.webp",
    alt: "Página de la inmobiliaria Cuadra Propiedades en tonos verde oliva",
  },
];
