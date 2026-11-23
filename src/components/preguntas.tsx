import { Plus } from "lucide-react";
import { Aparecer, TituloRevelado } from "./movimiento";
import { PREGUNTAS } from "@/lib/negocio";

export function Preguntas() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PREGUNTAS.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };

  return (
    <section id="preguntas" className="relative border-y border-linea bg-grafito py-28 md:py-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="contenedor grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="etiqueta">Preguntas frecuentes</p>
          <TituloRevelado
            texto="Lo que todos *nos preguntan.*"
            className="mt-6 max-w-[12ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
          />
          <p className="mt-8 max-w-[34ch] text-texto-2">
            ¿No encuentras tu respuesta? Escríbenos por WhatsApp y te contestamos.
          </p>
        </div>

        <Aparecer className="border-t border-linea-2">
          {PREGUNTAS.map((p) => (
            <details key={p.pregunta} className="group border-b border-linea-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium tracking-tight transition-colors duration-200 hover:text-cian sm:text-2xl [&::-webkit-details-marker]:hidden">
                {p.pregunta}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-linea-2 transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-45">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 text-lead text-texto-2">{p.respuesta}</p>
            </details>
          ))}
        </Aparecer>
      </div>
    </section>
  );
}
