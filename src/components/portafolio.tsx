"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotonLuz } from "./boton-luz";
import { Aparecer, EASE_CINE, Linea, TituloRevelado } from "./movimiento";
import { PROYECTOS, type Proyecto } from "@/lib/negocio";

function Estado({ estado }: { estado: Proyecto["estado"] }) {
  return estado === "en-vivo" ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
      <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-[pulso_2s_ease-in-out_infinite]" aria-hidden="true" />
      Publicado
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-linea-2 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-texto-2">
      Diseño conceptual
    </span>
  );
}

/* ---------- Escena visual del proyecto ---------- */
function Escena({ p, proporcion }: { p: Proyecto; proporcion: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const m = reducir ? 0 : 1;
  const escala = useTransform(scrollYProgress, [0, 0.5], [1 + 0.06 * m, 1]);
  const webY = useTransform(scrollYProgress, [0, 1], [30 * m, -30 * m]);
  const celY = useTransform(scrollYProgress, [0, 1], [130 * m, -110 * m]);
  const tEscala = useTransform(escala, (v) => `scale(${v})`);
  const tWeb = useTransform(webY, (v) => `translateY(${v}px)`);
  const tCel = useTransform(celY, (v) => `translateY(${v}px)`);

  const destino = p.url ?? p.demo ?? "#";
  const etiquetaCursor = p.url ? "Ver en vivo" : "Ver diseño";

  return (
    <motion.a
      ref={ref}
      href={destino}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={etiquetaCursor}
      aria-label={`${etiquetaCursor}: ${p.nombre} (se abre en otra pestaña)`}
      className={`group relative block overflow-hidden rounded-[28px] ${proporcion}`}
      style={{ backgroundColor: p.escena.fondo }}
      initial={reducir ? { opacity: 0 } : { clipPath: "inset(14% 8% 14% 8% round 40px)", opacity: 0.4 }}
      whileInView={reducir ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.3, ease: EASE_CINE }}
    >
      <motion.div className="absolute inset-0" style={{ transform: tEscala }}>
        {/* luz de la marca */}
        <div
          aria-hidden="true"
          className="absolute top-[-20%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full opacity-40 blur-[90px]"
          style={{ backgroundColor: p.escena.luz }}
        />

        {p.imagenVertical ? (
          <motion.div className="absolute inset-0 grid place-items-center p-[8%]" style={{ transform: tWeb }}>
            <div className="relative h-full max-h-[92%] overflow-hidden rounded-[22px] shadow-[0_40px_90px_-30px_rgba(120,20,70,0.55)] ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]">
              <Image
                src={p.imagenVertical}
                alt={p.alt}
                width={1080}
                height={1333}
                sizes="(min-width: 1024px) 520px, 80vw"
                className="h-full w-auto"
              />
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div className="absolute top-[13%] left-[7%] w-[86%]" style={{ transform: tWeb }}>
              <div className="marco-web transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02]">
                <div className="marco-web__barra">
                  <span />
                  <span />
                  <span />
                </div>
                {p.imagen && (
                  <Image
                    src={p.imagen}
                    alt={p.alt}
                    width={2880}
                    height={1800}
                    sizes="(min-width: 1024px) 60vw, 90vw"
                    className="block h-auto w-full"
                  />
                )}
              </div>
            </motion.div>
            {p.imagenMovil && (
              <motion.div className="absolute right-[6%] bottom-[-4%] w-[30%] max-w-[260px]" style={{ transform: tCel }}>
                <div className="marco-cel transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-2">
                  <div>
                    <Image
                      src={p.imagenMovil}
                      alt=""
                      width={1170}
                      height={2532}
                      sizes="(min-width: 1024px) 260px, 30vw"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
    </motion.a>
  );
}

/* ---------- Ficha del proyecto ---------- */
function Ficha({ p, indice, className = "" }: { p: Proyecto; indice: number; className?: string }) {
  return (
    <Aparecer className={className}>
      <div className="flex items-center gap-4 text-sm text-texto-3">
        <span className="font-display tabular-nums">
          0{indice + 1} <span className="text-texto-3/60">/ 0{PROYECTOS.length}</span>
        </span>
        <span className="h-px w-8 bg-linea-2" aria-hidden="true" />
        <span className="text-cian">{p.rubro}</span>
      </div>
      <h3 className="mt-5 font-display text-subtitulo leading-[1.05] font-medium tracking-[-0.03em]">{p.nombre}</h3>
      <p className="mt-4 max-w-[46ch] text-texto-2">{p.descripcion}</p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {p.url && (
          <BotonLuz href={p.url} externo variante="secundario" flecha="diagonal" tamano="chico">
            Ver invitación en vivo
          </BotonLuz>
        )}
        {p.demo && (
          <BotonLuz href={p.demo} externo variante="secundario" flecha="diagonal" tamano="chico">
            Explorar el diseño
          </BotonLuz>
        )}
        <Estado estado={p.estado} />
      </div>
    </Aparecer>
  );
}

export function Portafolio() {
  const [magali, brasa, salon] = PROYECTOS;
  return (
    <section id="portafolio" className="relative py-28 md:py-40">
      <div className="contenedor">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="etiqueta">Portafolio</p>
            <TituloRevelado
              texto="Proyectos con *identidad* propia."
              className="mt-6 font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
            />
          </div>
          <p className="max-w-[40ch] text-texto-2 lg:pb-3">
            Una invitación publicada y dos diseños para rubros muy distintos. Cada uno tiene su propio
            estilo, porque cada negocio es diferente.
          </p>
        </div>
        <Linea className="mt-14" />

        {/* 01 — vertical + ficha fija */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Escena p={magali} proporcion="aspect-[4/5] sm:aspect-[5/5] lg:aspect-[6/7]" />
          </div>
          <div className="lg:col-span-5">
            <Ficha p={magali} indice={0} className="lg:sticky lg:top-40" />
          </div>
        </div>

        {/* 02 — panorámico */}
        <div className="mt-28 md:mt-40">
          <Escena p={brasa} proporcion="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]" />
          <Ficha p={brasa} indice={1} className="mt-10 lg:max-w-[60%]" />
        </div>

        {/* 03 — imagen a la derecha, ficha fija a la izquierda */}
        <div className="mt-28 grid gap-10 md:mt-40 lg:grid-cols-12 lg:gap-16">
          <div className="lg:order-2 lg:col-span-7">
            <Escena p={salon} proporcion="aspect-[4/5] sm:aspect-[5/5] lg:aspect-[6/7]" />
          </div>
          <div className="lg:order-1 lg:col-span-5">
            <Ficha p={salon} indice={2} className="lg:sticky lg:top-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
