"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Particulas } from "./particulas";
import { IconoWhatsApp } from "./iconos";
import { linkWhatsApp } from "@/lib/negocio";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Portada() {
  const reducir = useReducedMotion();
  const entrar = (i: number) =>
    reducir
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, transform: "translateY(18px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.07 },
        };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* brillo suave arriba, como un foco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(31,111,255,0.22),transparent_65%)]"
      />
      <Particulas />
      {/* oscurece el centro para que el texto se lea sobre los puntos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_50%_52%,rgba(7,11,20,0.5),transparent)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center">
        <motion.p className="eyebrow" {...entrar(0)}>
          Desarrollo web · Innovación digital
        </motion.p>
        <motion.h1
          className="mt-6 font-display text-display leading-[1.02] font-semibold tracking-[-0.03em] text-balance"
          {...entrar(1)}
        >
          Páginas web que hacen <span className="text-accent">crecer</span> tu negocio.
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-[46ch] text-lead leading-relaxed text-silver text-pretty"
          {...entrar(2)}
        >
          Diseñamos tu página a medida, con tu estilo y tus colores. Carga rápido, se ve bien en el
          celular y deja que tus clientes te escriban con un solo toque.
        </motion.p>
        <motion.div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row" {...entrar(3)}>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <IconoWhatsApp className="size-5" />
            Cotiza tu página
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
          <a href="#portafolio" className="btn btn-ghost">
            Ver portafolio
          </a>
        </motion.div>
        <motion.p
          className="mt-10 text-xs font-medium tracking-[0.28em] text-muted uppercase"
          {...entrar(4)}
        >
          Tu visión, nuestra tecnología
        </motion.p>
      </div>
    </section>
  );
}
