import { Contacto } from "@/components/contacto";
import { Cotizacion } from "@/components/cotizacion";
import { Cursor } from "@/components/cursor";
import { Encabezado } from "@/components/encabezado";
import { ProgresoScroll } from "@/components/movimiento";
import { Nosotros } from "@/components/nosotros";
import { Pie } from "@/components/pie";
import { Portada } from "@/components/portada";
import { Portafolio } from "@/components/portafolio";
import { Preguntas } from "@/components/preguntas";
import { Proceso } from "@/components/proceso";
import { Servicios } from "@/components/servicios";
import { Tecnologia } from "@/components/tecnologia";
import { EMAIL, TIKTOK_URL, WHATSAPP } from "@/lib/negocio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DUCH Technologies",
    description: "Desarrollo web, inteligencia artificial, automatización digital y marketing digital para empresas y emprendedores.",
    url: "https://duch-technologies-web.vercel.app",
    image: "https://duch-technologies-web.vercel.app/images/logo-duch.webp",
    telephone: `+${WHATSAPP}`,
    email: EMAIL,
    areaServed: "PY",
    priceRange: "Desde 85 USD",
    address: { "@type": "PostalAddress", addressCountry: "PY" },
    sameAs: [TIKTOK_URL],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProgresoScroll />
      <Cursor />
      <Encabezado />
      <main id="contenido">
        <Portada />

        <Servicios />
        <Tecnologia />
        <Portafolio />
        <Nosotros />
        <Proceso />
        <Cotizacion />
        <Preguntas />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
