"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useRef, type ElementType, type ReactNode } from "react";

export const EASE_CINE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* ------------------------------------------------------------------
   TituloRevelado: cada palabra sube desde detrás de una máscara.
   Las palabras entre *asteriscos* van en serif itálica (acento).
   ------------------------------------------------------------------ */
type Pieza = { texto: string; acento: boolean };

function partir(texto: string): Pieza[] {
  const piezas: Pieza[] = [];
  texto.split(/(\*[^*]+\*)/g).forEach((trozo) => {
    if (!trozo) return;
    const acento = trozo.startsWith("*") && trozo.endsWith("*");
    const limpio = acento ? trozo.slice(1, -1) : trozo;
    limpio
      .split(" ")
      .filter(Boolean)
      .forEach((p) => piezas.push({ texto: p, acento }));
  });
  return piezas;
}

export function TituloRevelado({
  texto,
  como: Etiqueta = "h2",
  className,
  retraso = 0,
  alMontar = false,
  paso = 0.055,
}: {
  texto: string;
  como?: ElementType;
  className?: string;
  retraso?: number;
  /** true = anima al cargar (portada); false = al entrar en pantalla */
  alMontar?: boolean;
  paso?: number;
}) {
  const reducir = useReducedMotion();
  const piezas = partir(texto);
  const plano = texto.replace(/\*/g, "");

  const disparo = alMontar
    ? { initial: "oculto", animate: "visible" }
    : { initial: "oculto", whileInView: "visible", viewport: { once: true, margin: "0px 0px -15% 0px" } };

  return (
    <Etiqueta className={className}>
      <span className="sr-only">{plano}</span>
      <motion.span aria-hidden="true" className="block" {...disparo}>
        {piezas.map((p, i) => (
          <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${p.acento ? "acento pr-[0.04em]" : ""}`}
              variants={{
                oculto: reducir ? { opacity: 0 } : { transform: "translateY(108%)", opacity: 1 },
                visible: reducir
                  ? { opacity: 1, transition: { duration: 0.4, delay: retraso } }
                  : {
                      transform: "translateY(0%)",
                      transition: { duration: 0.95, ease: EASE_CINE, delay: retraso + i * paso },
                    },
              }}
            >
              {p.texto}
            </motion.span>
          </span>
          {/* espacio normal entre palabras: permite saltar de línea sin dejar huecos */}
          {i < piezas.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </Etiqueta>
  );
}

/* ------------------------------------------------------------------
   Aparecer: entrada suave al hacer scroll (fade + subida).
   ------------------------------------------------------------------ */
export function Aparecer({
  children,
  retraso = 0,
  className,
  desplazamiento = 24,
  como = "div",
}: {
  children: ReactNode;
  retraso?: number;
  className?: string;
  desplazamiento?: number;
  como?: "div" | "li" | "article" | "p";
}) {
  const reducir = useReducedMotion();
  const M = motion[como];
  return (
    <M
      className={className}
      initial={reducir ? { opacity: 0 } : { opacity: 0, transform: `translateY(${desplazamiento}px)` }}
      whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reducir ? 0.35 : 0.8, ease: EASE_CINE, delay: retraso }}
    >
      {children}
    </M>
  );
}

/* ------------------------------------------------------------------
   ParrafoScroll: las palabras se encienden a medida que bajas.
   ------------------------------------------------------------------ */
function PalabraScroll({
  progreso,
  rango,
  children,
  acento,
}: {
  progreso: MotionValue<number>;
  rango: [number, number];
  children: string;
  acento: boolean;
}) {
  const opacidad = useTransform(progreso, rango, [0.3, 1]);
  return (
    <motion.span style={{ opacity: opacidad }} className={acento ? "acento text-cian" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

export function ParrafoScroll({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const piezas = partir(texto);

  if (reducir) {
    return (
      <p ref={ref} className={className}>
        {piezas.map((p, i) => (
          <span key={i} className={p.acento ? "acento text-cian" : undefined}>
            {p.texto}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {piezas.map((p, i) => (
        <PalabraScroll
          key={i}
          progreso={scrollYProgress}
          rango={[i / piezas.length, (i + 1) / piezas.length]}
          acento={p.acento}
        >
          {p.texto}
        </PalabraScroll>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------
   Linea: una línea fina que se dibuja al entrar en pantalla.
   ------------------------------------------------------------------ */
export function Linea({ className = "" }: { className?: string }) {
  const reducir = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-linea-2 ${className}`}
      initial={reducir ? { opacity: 0 } : { transform: "scaleX(0)" }}
      whileInView={reducir ? { opacity: 1 } : { transform: "scaleX(1)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE_CINE }}
    />
  );
}

/* ------------------------------------------------------------------
   ProgresoScroll: barra superior que indica cuánto recorriste.
   ------------------------------------------------------------------ */
export function ProgresoScroll() {
  const { scrollYProgress } = useScroll();
  const suave = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const transform = useTransform(suave, (v) => `scaleX(${v})`);
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[linear-gradient(90deg,var(--azul),var(--cian))] shadow-[0_0_12px_rgba(0,217,255,0.6)]"
      style={{ transform }}
    />
  );
}
