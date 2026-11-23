"use client";

import Image from "next/image";
import { Headset, ShieldCheck, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Aparecer, TituloRevelado } from "./movimiento";

const PILARES: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Zap,
    titulo: "Sitios de alto rendimiento",
    texto: "Imágenes optimizadas y código liviano para que tu página cargue rápido, también con datos móviles.",
  },
  {
    icono: ShieldCheck,
    titulo: "Seguridad avanzada",
    texto: "Conexión cifrada (HTTPS), cabeceras de seguridad y buenas prácticas desde la primera línea de código.",
  },
  {
    icono: Smartphone,
    titulo: "Diseño responsivo",
    texto: "Cada pantalla se diseña a propósito: celular, tablet y computadora se ven y se sienten bien.",
  },
  {
    icono: Headset,
    titulo: "Soporte profesional",
    texto: "Después de publicar no te dejamos solo: cambios, ajustes y dudas se resuelven por WhatsApp.",
  },
];

const HERRAMIENTAS = ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTTPS / SSL", "SEO técnico", "WhatsApp"];

export function Tecnologia() {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reducir ? 0 : 40, reducir ? 0 : -40]);
  const t = useTransform(y, (v) => `translateY(${v}px)`);

  return (
    <section id="tecnologia" className="relative overflow-hidden border-y border-linea bg-grafito py-28 md:py-40">
      <div aria-hidden="true" className="grilla-fondo absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,transparent,#000_25%,#000_75%,transparent)]" />
      <div aria-hidden="true" className="luz top-[10%] right-[-10%] h-[50vh] w-[45vw] bg-cian/10" />
      <div className="contenedor relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="etiqueta">Tecnología e innovación</p>
            <TituloRevelado
              texto="Tecnología pensada para *crecer contigo.*"
              className="mt-6 max-w-[14ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
            />
            <Aparecer>
              <p className="mt-8 max-w-[46ch] text-lead text-texto-2">
                Combinamos diseño, ingeniería y automatización para construir herramientas digitales que funcionan hoy
                y se adaptan a lo que tu negocio necesite mañana.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Tecnologías que usamos">
                {HERRAMIENTAS.map((h) => (
                  <li
                    key={h}
                    className="vidrio rounded-full px-4 py-2 text-sm text-texto-2 transition-colors duration-200 hover:text-cian"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Aparecer>
          </div>

          <div ref={ref} className="relative">
            <motion.div style={{ transform: t }} className="relative">
              <div aria-hidden="true" className="absolute inset-[6%] rounded-[32px] bg-azul/30 blur-[70px]" />
              <div className="vidrio relative overflow-hidden rounded-[28px] p-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                  <Image
                    src="/images/tecnologia/oficina-ancha.webp"
                    alt="Estación de desarrollo con monitores de código y pantallas holográficas flotantes"
                    fill
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-negro/50 via-transparent to-azul/15" />
                  <div aria-hidden="true" className="holo-escaneo opacity-50" />
                  <span
                    aria-hidden="true"
                    className="movimiento-decorativo absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-cian/10 to-transparent motion-safe:animate-[barrido_6s_linear_infinite]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {PILARES.map((p, i) => (
            <Aparecer key={p.titulo} retraso={i * 0.07}>
              <div className="vidrio group h-full rounded-3xl p-6 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl border border-cian/30 bg-cian/10 text-cian transition-shadow duration-300 group-hover:shadow-[0_0_28px_-4px_var(--cian)]">
                  <p.icono className="size-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-texto-2">{p.texto}</p>
              </div>
            </Aparecer>
          ))}
        </div>
      </div>
    </section>
  );
}
