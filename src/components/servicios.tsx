"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PointerEvent } from "react";
import { IconoWhatsApp } from "./iconos";
import { EASE_CINE, TituloRevelado } from "./movimiento";
import { SERVICIOS, linkWhatsApp, type Servicio } from "@/lib/negocio";

/* Foco de luz que sigue al cursor dentro de la tarjeta */
function alMoverFoco(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--fx", `${e.clientX - r.left}px`);
  el.style.setProperty("--fy", `${e.clientY - r.top}px`);
  el.style.setProperty("--fo", "1");
}
function alSalirFoco(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--fo", "0");
}

// Cómo se reparten las 5 tarjetas en la grilla de 6 columnas (escritorio)
const ANCHOS = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "md:col-span-2 lg:col-span-3"];

function Tarjeta({ s, indice }: { s: Servicio; indice: number }) {
  const reducir = useReducedMotion();
  const ancha = indice >= 3;
  return (
    <motion.article
      className={`${ANCHOS[indice]} group`}
      initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(40px)" }}
      whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_CINE, delay: (indice % 3) * 0.08 }}
    >
      <div
        onPointerMove={alMoverFoco}
        onPointerLeave={alSalirFoco}
        className="tarjeta-foco flex h-full flex-col transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1"
      >
        <div className={`relative overflow-hidden ${ancha ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <Image
            src={s.imagen}
            alt={s.alt}
            fill
            sizes={ancha ? "(min-width: 1024px) 45vw, 92vw" : "(min-width: 1024px) 30vw, 92vw"}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.06]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-gris via-gris/10 to-transparent" />
          <div aria-hidden="true" className="holo-escaneo opacity-40" />
          <span className="vidrio absolute top-4 left-4 rounded-full px-3 py-1 font-display text-xs tracking-[0.2em] text-cian tabular-nums">
            0{indice + 1}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-3 sm:p-8 sm:pt-4">
          <h3 className="font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">{s.nombre}</h3>
          <p className="mt-3 max-w-[48ch] text-texto-2">{s.descripcion}</p>
          <a
            href={linkWhatsApp(s.mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-cian transition-colors duration-200 hover:text-blanco"
          >
            <IconoWhatsApp className="size-4" />
            Consultar este servicio
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Servicios() {
  return (
    <section id="servicios" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="luz top-[20%] left-[-10%] h-[45vh] w-[40vw] bg-azul/15" />
      <div className="contenedor relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="etiqueta">Servicios</p>
            <TituloRevelado
              texto="Soluciones que *impulsan* tu negocio."
              className="mt-6 max-w-[16ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
            />
          </div>
          <p className="max-w-[40ch] text-texto-2 lg:pb-3">
            Desde una página web hasta sistemas inteligentes: elegimos la tecnología que tu negocio realmente
            necesita.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6 md:mt-20">
          {SERVICIOS.map((s, i) => (
            <Tarjeta key={s.id} s={s} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
