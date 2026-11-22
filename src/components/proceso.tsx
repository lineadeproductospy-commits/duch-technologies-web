"use client";

import { MessagesSquare, PenTool, Rocket, SlidersHorizontal } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { EASE_CINE, TituloRevelado } from "./movimiento";
import { PASOS } from "@/lib/negocio";

const ICONOS = [MessagesSquare, PenTool, SlidersHorizontal, Rocket];

export function Proceso() {
  const lista = useRef<HTMLOListElement>(null);
  const reducir = useReducedMotion();
  const [activo, setActivo] = useState(0);
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 0.6", "end 0.6"] });
  const relleno = useTransform(scrollYProgress, (v) => `scaleY(${Math.min(1, Math.max(0, v))})`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(PASOS.length - 1, Math.max(0, Math.floor(v * PASOS.length * 0.999 + 0.15)));
    setActivo(i);
  });

  const Icono = ICONOS[activo];

  return (
    <section id="proceso" className="relative border-y border-linea bg-grafito py-28 md:py-40">
      <div aria-hidden="true" className="grilla-fondo absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="contenedor relative grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        {/* Columna fija */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:self-start">
          <p className="etiqueta">Cómo trabajamos</p>
          <TituloRevelado
            texto="De la idea a tu página *en línea.*"
            className="mt-6 max-w-[13ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
          />
          <div className="mt-14 hidden items-center gap-8 lg:flex" aria-hidden="true">
            <div className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activo}
                  className="block font-display text-[9rem] leading-none font-light tracking-[-0.06em] text-blanco tabular-nums"
                  initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(40%)", filter: "blur(8px)" }}
                  animate={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" }}
                  exit={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(-40%)", filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: EASE_CINE }}
                >
                  0{activo + 1}
                </motion.span>
              </AnimatePresence>
              <div className="luz inset-0 bg-azul/30" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative grid size-16 place-items-center rounded-2xl border border-cian/40 bg-cian/10 shadow-[0_0_40px_-10px_var(--cian)]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activo}
                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                    transition={{ duration: 0.35, ease: EASE_CINE }}
                  >
                    <Icono className="size-7 text-cian" strokeWidth={1.5} />
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-sm text-texto-3">
                Etapa {activo + 1} de {PASOS.length}
              </p>
            </div>
          </div>
        </div>

        {/* Etapas */}
        <ol ref={lista} className="relative lg:pt-[22vh] lg:pb-[10vh]">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[23px] w-px bg-linea-2 lg:top-[22vh] lg:bottom-[10vh]">
            <motion.div
              className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--azul),var(--cian))] shadow-[0_0_12px_var(--cian)]"
              style={{ transform: relleno }}
            />
          </div>
          {PASOS.map((p, i) => {
            const encendido = i <= activo;
            const Ico = ICONOS[i];
            return (
              <li key={p.titulo} className="relative grid grid-cols-[48px_1fr] gap-6 pb-16 last:pb-0 lg:min-h-[40vh] lg:pb-0 lg:last:min-h-0">
                <span
                  className={`relative z-10 grid size-12 place-items-center rounded-full border font-display text-sm tabular-nums transition-[background-color,border-color,color,box-shadow] duration-500 ${
                    encendido
                      ? "border-cian/60 bg-negro text-cian shadow-[0_0_24px_-4px_var(--cian)]"
                      : "border-linea-2 bg-grafito text-texto-3"
                  }`}
                >
                  0{i + 1}
                </span>
                <div
                  className={`pt-2 transition-opacity duration-500 ${encendido ? "opacity-100" : "opacity-40"}`}
                >
                  <div className="flex items-center gap-3 lg:hidden">
                    <Ico className="size-5 text-cian" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:mt-0">{p.titulo}</h3>
                  <p className="mt-3 max-w-[40ch] text-lead text-texto-2">{p.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
