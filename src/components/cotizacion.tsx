"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BotonLuz } from "./boton-luz";
import { IconoWhatsApp } from "./iconos";
import { Aparecer, EASE_CINE, TituloRevelado } from "./movimiento";
import { INCLUYE, linkWhatsApp } from "@/lib/negocio";

export function Cotizacion() {
  const reducir = useReducedMotion();
  return (
    <section id="cotizacion" className="relative py-28 md:py-40">
      <div className="contenedor">
        <p className="etiqueta">Cotización</p>
        <TituloRevelado
          texto="Cada negocio tiene una visión. Nosotros la convertimos en una *experiencia digital.*"
          className="mt-6 max-w-[20ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
        />

        <Aparecer className="relative mt-16 md:mt-20" desplazamiento={40}>
          {/* borde de luz que gira alrededor de la tarjeta */}
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[32px] bg-[conic-gradient(from_var(--ang),transparent_0deg,transparent_240deg,rgba(59,224,255,0.7)_300deg,rgba(43,107,255,0.9)_330deg,transparent_360deg)] opacity-70 motion-safe:animate-[girar_9s_linear_infinite]"
          />
          <div className="relative grid overflow-hidden rounded-[31px] bg-[linear-gradient(150deg,#0e1118_0%,#080a0e_55%,#0a1330_100%)] lg:grid-cols-[1.1fr_1fr]">
            <div aria-hidden="true" className="luz -right-20 -bottom-20 h-80 w-80 bg-azul/25" />
            <div className="relative p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-semibold tracking-[0.18em] text-cian uppercase">Presupuesto personalizado</p>
              <p className="mt-6 font-display text-subtitulo leading-[1.1] font-medium tracking-[-0.02em] text-balance">
                Una invitación no cuesta lo mismo que una tienda en línea.
              </p>
              <p className="mt-5 max-w-[44ch] text-lead text-texto-2">
                Cada proyecto tiene necesidades diferentes. Cuéntanos qué necesitas y te enviamos un
                presupuesto a medida, claro y sin letra chica.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BotonLuz
                  href={linkWhatsApp("Hola DUCH Technologies, quiero un presupuesto para mi página web.")}
                  externo
                  icono={<IconoWhatsApp className="size-5" />}
                >
                  Solicitar mi cotización
                </BotonLuz>
                <p className="text-sm text-texto-3">Sin compromiso · Por WhatsApp</p>
              </div>
            </div>

            <div className="relative border-t border-linea p-8 sm:p-12 lg:border-t-0 lg:border-l lg:p-16">
              <p className="font-display text-lg font-medium">Toda página incluye</p>
              <ul className="mt-6">
                {INCLUYE.map((t, i) => (
                  <motion.li
                    key={t}
                    className="flex items-center gap-4 border-b border-linea py-4 last:border-0"
                    initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateX(-12px)" }}
                    whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateX(0px)" }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 0.6, ease: EASE_CINE, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-cian/40 bg-cian/10">
                      <Check className="size-3.5 text-cian" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-texto-2">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Aparecer>
      </div>
    </section>
  );
}
