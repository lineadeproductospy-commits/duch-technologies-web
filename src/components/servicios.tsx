"use client";

import { Headset, Lock, Rocket, ShieldCheck, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { EASE_CINE, TituloRevelado } from "./movimiento";

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

/* ---------- Ilustraciones de cada servicio ---------- */

function GraficoRendimiento() {
  const reducir = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[440px]">
      <div className="marco-web">
        <div className="marco-web__barra">
          <span />
          <span />
          <span />
          <div className="ml-3 h-3 flex-1 rounded-full bg-white/[0.06]" />
        </div>
        <div className="relative h-[3px] bg-white/[0.04]">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,var(--azul),var(--cian))] shadow-[0_0_10px_var(--cian)]"
            initial={{ transform: "scaleX(0)" }}
            whileInView={{ transform: "scaleX(1)" }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: reducir ? 0 : 1.1, ease: EASE_CINE, delay: 0.3 }}
          />
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 p-5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`rounded-md ${
                i === 0
                  ? "col-span-2 h-14 bg-[linear-gradient(90deg,rgba(43,107,255,0.45),rgba(59,224,255,0.25))]"
                  : i === 1
                    ? "h-24 bg-white/[0.09]"
                    : "h-10 bg-white/[0.07]"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.4, delay: reducir ? 0 : 0.9 + i * 0.08 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function GraficoSeguridad() {
  return (
    <div aria-hidden="true" className="relative grid h-40 place-items-center">
      <div className="absolute size-36 rounded-full border border-dashed border-cian/30 transition-transform duration-700 ease-[var(--ease-out)] group-hover:rotate-45" />
      <div className="absolute size-24 rounded-full border border-linea-2" />
      <div className="relative grid size-16 place-items-center rounded-2xl border border-azul/40 bg-azul/15 shadow-[0_0_40px_-8px_var(--azul)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105">
        <ShieldCheck className="size-8 text-cian" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-0 flex items-center gap-2 rounded-full border border-linea bg-negro/60 px-3 py-1.5 font-mono text-[0.7rem] text-texto-2">
        <Lock className="size-3 text-cian" /> Conexión segura · SSL
      </div>
    </div>
  );
}

function GraficoResponsivo() {
  return (
    <div aria-hidden="true" className="relative flex h-40 items-end justify-center">
      <div className="h-28 w-44 rounded-lg border border-linea-2 bg-white/[0.03] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-x-6" />
      <div className="absolute bottom-0 h-24 w-20 rounded-lg border border-linea-2 bg-gris-2/80 backdrop-blur transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-10" />
      <div className="absolute bottom-0 left-1/2 h-20 w-11 translate-x-12 rounded-[10px] border border-cian/50 bg-negro shadow-[0_0_24px_-6px_var(--cian)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-20">
        <div className="mx-auto mt-1.5 h-0.5 w-3 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

function GraficoSoporte() {
  const reducir = useReducedMotion();
  const burbujas = [
    { texto: "Hola, ¿pueden actualizar mis precios?", propia: false },
    { texto: "¡Claro! Ya quedó actualizado en tu página.", propia: true },
  ];
  return (
    <div aria-hidden="true" className="flex w-full max-w-[380px] flex-col gap-3">
      {burbujas.map((b, i) => (
        <motion.div
          key={i}
          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
            b.propia
              ? "self-end rounded-br-md bg-azul text-white shadow-[0_10px_30px_-12px_var(--azul)]"
              : "self-start rounded-bl-md border border-linea bg-white/[0.05] text-texto-2"
          }`}
          initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.96)" }}
          whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease: EASE_CINE, delay: 0.3 + i * 0.45 }}
        >
          {b.texto}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Tarjeta ---------- */

function Tarjeta({
  numero,
  icono,
  titulo,
  texto,
  grafico,
  className = "",
  horizontal = false,
  retraso = 0,
}: {
  numero: string;
  icono: ReactNode;
  titulo: string;
  texto: string;
  grafico: ReactNode;
  className?: string;
  horizontal?: boolean;
  retraso?: number;
}) {
  const reducir = useReducedMotion();
  return (
    <motion.article
      onPointerMove={alMoverFoco}
      onPointerLeave={alSalirFoco}
      className={`tarjeta-foco group flex flex-col gap-10 p-7 sm:p-9 ${
        horizontal ? "lg:flex-row lg:items-center lg:gap-12" : ""
      } ${className}`}
      initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(40px) scale(0.98)" }}
      whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE_CINE, delay: retraso }}
    >
      <div className={`flex flex-col ${horizontal ? "lg:w-[46%]" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-xl border border-linea-2 bg-white/[0.03] text-cian transition-[border-color,background-color] duration-300 group-hover:border-azul/50 group-hover:bg-azul/10">
            {icono}
          </span>
          <span className="font-display text-sm text-texto-3 tabular-nums">{numero}</span>
        </div>
        <h3 className="mt-8 font-display text-[1.7rem] leading-tight font-medium tracking-tight sm:text-3xl">{titulo}</h3>
        <p className="mt-3 max-w-[42ch] text-texto-2">{texto}</p>
      </div>
      <div className={`flex flex-1 items-center justify-center ${horizontal ? "" : "mt-auto"}`}>{grafico}</div>
    </motion.article>
  );
}

export function Servicios() {
  return (
    <section id="servicios" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="luz top-40 left-1/2 h-96 w-[60vw] -translate-x-1/2 bg-azul/10" />
      <div className="contenedor relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="etiqueta">Servicios</p>
            <TituloRevelado
              texto="Soluciones digitales diseñadas para hacer *crecer* tu negocio."
              className="mt-6 max-w-[16ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
            />
          </div>
          <p className="max-w-[34ch] text-texto-2 lg:pb-3 lg:text-right">
            Cuatro pilares presentes en cada página que diseñamos y desarrollamos.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-6">
          <Tarjeta
            numero="01"
            icono={<Rocket className="size-5" strokeWidth={1.6} />}
            titulo="Sitios de alto rendimiento"
            texto="Tu página abre en segundos, incluso con datos móviles. Un cliente que espera se va con la competencia."
            grafico={<GraficoRendimiento />}
            className="lg:col-span-4"
            horizontal
          />
          <Tarjeta
            numero="02"
            icono={<ShieldCheck className="size-5" strokeWidth={1.6} />}
            titulo="Seguridad avanzada"
            texto="Certificado de seguridad (el candadito del navegador) y código limpio. Tus clientes ven un sitio confiable."
            grafico={<GraficoSeguridad />}
            className="lg:col-span-2"
            retraso={0.08}
          />
          <Tarjeta
            numero="03"
            icono={<Smartphone className="size-5" strokeWidth={1.6} />}
            titulo="Diseño responsivo"
            texto="Casi todos tus clientes te van a ver desde el celular. Diseñamos primero para esa pantalla y después para la computadora."
            grafico={<GraficoResponsivo />}
            className="lg:col-span-2"
          />
          <Tarjeta
            numero="04"
            icono={<Headset className="size-5" strokeWidth={1.6} />}
            titulo="Soporte profesional"
            texto="¿Cambió un precio o un horario? Nos escribes por WhatsApp y lo actualizamos. No te quedas solo después de publicar."
            grafico={<GraficoSoporte />}
            className="lg:col-span-4"
            horizontal
            retraso={0.08}
          />
        </div>
      </div>
    </section>
  );
}
