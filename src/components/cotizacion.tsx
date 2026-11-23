"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BotonLuz } from "./boton-luz";
import { IconoWhatsApp } from "./iconos";
import { EASE_CINE, TituloRevelado } from "./movimiento";
import { MONEDA, PLANES, linkWhatsApp, type Plan } from "@/lib/negocio";

function TarjetaPlan({ plan, indice }: { plan: Plan; indice: number }) {
  const reducir = useReducedMotion();
  return (
    <motion.article
      className="relative h-full"
      initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(40px)" }}
      whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_CINE, delay: indice * 0.08 }}
    >
      {plan.destacado && (
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-[29px] bg-[conic-gradient(from_var(--ang),transparent_0deg,transparent_240deg,rgba(0,217,255,0.7)_300deg,rgba(8,123,255,0.9)_330deg,transparent_360deg)] opacity-80 motion-safe:animate-[girar_9s_linear_infinite]"
        />
      )}
      <div
        className={`relative flex h-full flex-col rounded-[28px] border p-8 sm:p-10 ${
          plan.destacado
            ? "border-transparent bg-[linear-gradient(150deg,#111a27_0%,#0a111d_55%,#06224a_100%)]"
            : "border-linea bg-grafito/60"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-medium tracking-tight">{plan.nombre}</h3>
          {plan.destacado && (
            <span className="rounded-full border border-cian/40 bg-cian/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-cian uppercase">
              Más elegido
            </span>
          )}
        </div>
        <p className="mt-3 text-texto-2">{plan.para}</p>

        <div className="mt-8 flex items-end gap-2">
          {plan.precio !== null ? (
            <>
              <span className="pb-2 text-sm text-texto-3">Desde</span>
              <span className="font-display text-6xl leading-none font-medium tracking-[-0.04em] tabular-nums">
                {plan.precio}
              </span>
              <span className="pb-1.5 font-display text-lg text-texto-2">{MONEDA}</span>
            </>
          ) : (
            <span className="font-display text-4xl leading-none font-medium tracking-[-0.03em]">A cotizar</span>
          )}
        </div>
        <p className="mt-2 text-sm text-texto-3">{plan.nota}</p>

        <ul className="mt-8 grid gap-3 border-t border-linea pt-8">
          {plan.incluye.map((t) => (
            <li key={t} className="flex items-start gap-3 text-texto-2">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-cian/40 bg-cian/10">
                <Check className="size-3 text-cian" strokeWidth={2.5} aria-hidden="true" />
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <BotonLuz
            href={linkWhatsApp(plan.mensaje)}
            externo
            ancho
            variante={plan.destacado ? "primario" : "secundario"}
            icono={<IconoWhatsApp className="size-5" />}
          >
            {plan.precio !== null ? "Quiero este plan" : "Pedir cotización"}
          </BotonLuz>
        </div>
      </div>
    </motion.article>
  );
}

export function Cotizacion() {
  return (
    <section id="cotizacion" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="luz top-1/3 left-1/2 h-96 w-[60vw] -translate-x-1/2 bg-azul/10" />
      <div className="contenedor relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="etiqueta">Precios</p>
            <TituloRevelado
              texto="Precios claros, *sin letra chica.*"
              className="mt-6 max-w-[14ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
            />
          </div>
          <p className="max-w-[36ch] text-texto-2 lg:pb-3 lg:text-right">
            Elige un punto de partida. Te confirmamos el precio final por WhatsApp antes de empezar, sin compromiso.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
          {PLANES.map((plan, i) => (
            <TarjetaPlan key={plan.nombre} plan={plan} indice={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-texto-3">
          El dominio propio (.com o .com.py) se paga aparte, al proveedor que lo registra.
        </p>
      </div>
    </section>
  );
}
