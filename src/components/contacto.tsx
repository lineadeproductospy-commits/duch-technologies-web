"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { BotonLuz } from "./boton-luz";
import { IconoTikTok, IconoWhatsApp } from "./iconos";
import { Aparecer, TituloRevelado } from "./movimiento";
import { EMAIL, TIKTOK_URL, TIKTOK_USUARIO, WHATSAPP_LEGIBLE, linkWhatsApp } from "@/lib/negocio";

function alMoverFoco(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--fx", `${e.clientX - r.left}px`);
  el.style.setProperty("--fy", `${e.clientY - r.top}px`);
  el.style.setProperty("--fo", "1");
}

function Canal({
  href,
  icono,
  titulo,
  valor,
  externo = true,
}: {
  href: string;
  icono: ReactNode;
  titulo: string;
  valor: string;
  externo?: boolean;
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={alMoverFoco}
      onPointerLeave={(e) => e.currentTarget.style.setProperty("--fo", "0")}
      className="tarjeta-foco group flex items-center gap-5 !rounded-2xl p-5 transition-transform duration-150 active:scale-[0.98]"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-linea-2 bg-white/[0.03] text-blanco transition-colors duration-300 group-hover:text-cian">
        {icono}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-texto-3">{titulo}</span>
        <span className="block font-medium break-all">{valor}</span>
      </span>
      <ArrowUpRight
        className="size-5 shrink-0 text-texto-3 transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blanco"
        aria-hidden="true"
      />
      {externo && <span className="sr-only">(se abre en otra pestaña)</span>}
    </a>
  );
}

export function Contacto() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [reducir ? 0 : 80, reducir ? 0 : -80]);
  const logoT = useTransform(logoY, (v) => `translateY(${v}px)`);

  return (
    <section ref={ref} id="contacto" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="luz top-1/3 right-[-10%] h-[50vh] w-[50vw] bg-azul/20" />
      <div className="contenedor relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="etiqueta">Contacto</p>
          <TituloRevelado
            texto="Tu próximo proyecto digital *comienza aquí.*"
            className="mt-6 max-w-[14ch] font-display text-titulo leading-[1] font-medium tracking-[-0.035em]"
          />
          <Aparecer>
            <p className="mt-8 max-w-[44ch] text-lead text-texto-2">
              Cuéntanos tu idea. Nosotros nos encargamos de convertirla en una experiencia digital
              profesional.
            </p>
            <div className="mt-10">
              <BotonLuz href={linkWhatsApp()} externo icono={<IconoWhatsApp className="size-5" />}>
                Escribir por WhatsApp
              </BotonLuz>
            </div>
          </Aparecer>
          <Aparecer retraso={0.1} className="mt-12 grid max-w-[560px] gap-3">
            <Canal href={linkWhatsApp()} icono={<IconoWhatsApp className="size-5" />} titulo="WhatsApp" valor={WHATSAPP_LEGIBLE} />
            <Canal href={`mailto:${EMAIL}`} externo={false} icono={<Mail className="size-5" strokeWidth={1.6} />} titulo="Correo" valor={EMAIL} />
            <Canal href={TIKTOK_URL} icono={<IconoTikTok className="size-5" />} titulo="TikTok" valor={`@${TIKTOK_USUARIO}`} />
          </Aparecer>
        </div>

        <motion.div className="relative mx-auto w-full max-w-[460px]" style={{ transform: logoT }}>
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-azul/40 blur-[70px] motion-safe:animate-[pulso_6s_ease-in-out_infinite]" />
          <div aria-hidden="true" className="absolute -inset-6 rounded-full border border-linea motion-safe:animate-[spin_40s_linear_infinite] [border-style:dashed]" />
          <Image
            src="/images/logo-duch.webp"
            alt="Logo de DUCH Technologies: desarrollo web e innovación digital"
            width={1254}
            height={1254}
            sizes="(min-width: 1024px) 460px, 80vw"
            className="relative h-auto w-full rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
