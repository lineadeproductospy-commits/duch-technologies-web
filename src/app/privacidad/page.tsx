import Link from "next/link";
import type { Metadata } from "next";
import { EMAIL, WHATSAPP_LEGIBLE } from "@/lib/negocio";

export const metadata: Metadata = {
  title: "Privacidad y términos | DUCH Technologies",
  description: "Cómo usa DUCH Technologies los datos que nos envías y las condiciones de nuestros servicios.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <main id="contenido" className="contenedor max-w-3xl py-28 md:py-36">
      <Link href="/" className="text-sm text-texto-3 transition-colors duration-200 hover:text-blanco">
        ← Volver al inicio
      </Link>
      <h1 className="mt-10 font-display text-titulo leading-[1] font-medium tracking-[-0.035em]">
        Privacidad y términos
      </h1>
      <p className="mt-6 text-sm text-texto-3">Última actualización: noviembre de 2026</p>

      <div className="mt-14 grid gap-12 text-lead leading-relaxed text-texto-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-blanco [&_h2]:tracking-tight">
        <section className="grid gap-4">
          <h2>Qué datos recibimos</h2>
          <p>
            Esta página no tiene cuentas de usuario ni guarda datos en un servidor propio. Cuando usas el
            formulario o los botones de contacto, se abre WhatsApp o tu correo con tu mensaje. Solo
            recibimos lo que tú decides enviarnos: tu nombre, el de tu negocio y lo que nos cuentes.
          </p>
        </section>

        <section className="grid gap-4">
          <h2>Para qué los usamos</h2>
          <p>
            Usamos esos datos únicamente para responder tu consulta, preparar tu presupuesto y trabajar
            en tu proyecto. No los vendemos ni los compartimos con terceros con fines publicitarios.
          </p>
        </section>

        <section className="grid gap-4">
          <h2>Servicios de terceros</h2>
          <p>
            La página está alojada en Vercel y los mensajes viajan por WhatsApp (Meta), correo
            electrónico o TikTok, según el canal que elijas. Cada uno tiene su propia política de
            privacidad.
          </p>
        </section>

        <section className="grid gap-4">
          <h2>Tus derechos</h2>
          <p>
            Puedes pedirnos en cualquier momento que borremos tus datos o tus conversaciones con
            nosotros escribiendo a {EMAIL} o al WhatsApp {WHATSAPP_LEGIBLE}.
          </p>
        </section>

        <section className="grid gap-4">
          <h2>Condiciones del servicio</h2>
          <p>
            Los precios publicados son puntos de partida. El precio final, el plazo de entrega y la
            forma de pago se acuerdan por escrito en el presupuesto antes de empezar cada proyecto. El
            dominio propio y otros servicios de terceros se pagan aparte, salvo que el presupuesto diga
            lo contrario.
          </p>
          <p>
            Los proyectos marcados como “Diseño conceptual” en el portafolio son trabajos de muestra
            creados por DUCH Technologies y no representan a negocios reales.
          </p>
        </section>
      </div>
    </main>
  );
}
