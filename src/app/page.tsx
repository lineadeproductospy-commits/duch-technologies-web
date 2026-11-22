import { Contacto } from "@/components/contacto";
import { Cotizacion } from "@/components/cotizacion";
import { Cursor } from "@/components/cursor";
import { Encabezado } from "@/components/encabezado";
import { ParrafoScroll, ProgresoScroll } from "@/components/movimiento";
import { Pie } from "@/components/pie";
import { Portada } from "@/components/portada";
import { Portafolio } from "@/components/portafolio";
import { Proceso } from "@/components/proceso";
import { Servicios } from "@/components/servicios";
import { EMAIL, TIKTOK_URL, WHATSAPP } from "@/lib/negocio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DUCH Technologies",
    description: "Diseño y desarrollo de páginas web profesionales para empresas y emprendedores.",
    url: "https://duch-technologies-web.vercel.app",
    image: "https://duch-technologies-web.vercel.app/images/logo-duch.webp",
    telephone: `+${WHATSAPP}`,
    email: EMAIL,
    areaServed: "PY",
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

        {/* Manifiesto: el texto se enciende palabra por palabra al bajar */}
        <section id="manifiesto" aria-label="Nuestra forma de trabajar" className="relative py-28 md:py-44">
          <div className="contenedor">
            <ParrafoScroll
              texto="No vendemos plantillas. Cada página se diseña para un negocio *concreto* y para la gente que le compra."
              className="max-w-[22ch] font-display text-titulo leading-[1.08] font-medium tracking-[-0.035em]"
            />
          </div>
        </section>

        <Servicios />
        <Portafolio />
        <Proceso />
        <Cotizacion />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
