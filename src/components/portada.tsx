"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotonLuz } from "./boton-luz";
import { IconoWhatsApp } from "./iconos";
import { EASE_CINE, TituloRevelado } from "./movimiento";
import { Particulas } from "./particulas";
import { linkWhatsApp } from "@/lib/negocio";

export function Portada() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Profundidad: el texto sube más rápido que el fondo y se desvanece
  const textoY = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -140]);
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textoTransform = useTransform(textoY, (v) => `translateY(${v}px)`);
  const fondoEscala = useTransform(scrollYProgress, [0, 1], [1, reducir ? 1 : 1.18]);
  const fondoTransform = useTransform(fondoEscala, (v) => `scale(${v})`);
  const fondoOpacidad = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  const entrar = (retraso: number) =>
    reducir
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, transform: "translateY(16px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.9, ease: EASE_CINE, delay: retraso },
        };

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Presentación"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Capas de fondo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ transform: fondoTransform, opacity: fondoOpacidad }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
        <div className="grilla-fondo absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_45%,#000_10%,transparent_75%)]" />
        <div
          className="luz top-[-10%] right-[5%] h-[55vh] w-[55vw] bg-azul/25 motion-safe:animate-[deriva-a_18s_ease-in-out_infinite]"
        />
        <div
          className="luz bottom-[5%] left-[-10%] h-[40vh] w-[45vw] bg-cian/10 motion-safe:animate-[deriva-b_22s_ease-in-out_infinite]"
        />
        <Particulas />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-negro" />
      </motion.div>

      <motion.div
        className="contenedor relative flex flex-1 flex-col justify-end pt-32 pb-10 md:pb-14 lg:justify-center lg:pt-28"
        style={{ transform: textoTransform, opacity: textoOpacidad }}
      >
        <div className="lg:max-w-[68%]">
          <motion.p className="etiqueta" {...entrar(0.25)}>
            Desarrollo web · Innovación digital
          </motion.p>
          <TituloRevelado
            como="h1"
            alMontar
            retraso={0.35}
            paso={0.07}
            texto="Transformamos ideas en *experiencias digitales.*"
            className="mt-7 font-display text-hero leading-[0.95] font-medium tracking-[-0.045em]"
          />
          <motion.p
            className="mt-8 max-w-[48ch] text-lead leading-relaxed text-texto-2 text-pretty"
            {...entrar(0.95)}
          >
            Diseñamos y desarrollamos páginas web estratégicas que elevan la presencia digital de tu
            negocio y convierten visitantes en oportunidades.
          </motion.p>
          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" {...entrar(1.1)}>
            <BotonLuz href={linkWhatsApp()} externo icono={<IconoWhatsApp className="size-5" />}>
              Crear mi página web
            </BotonLuz>
            <BotonLuz href="#portafolio" variante="secundario" flecha="ninguna">
              Explorar proyectos
            </BotonLuz>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="contenedor relative hidden items-end justify-between pb-8 text-xs tracking-[0.22em] text-texto-3 uppercase md:flex"
        {...entrar(1.35)}
      >
        <p>Tu visión, nuestra tecnología</p>
        <a href="#manifiesto" className="group flex items-center gap-4 transition-colors duration-200 hover:text-blanco">
          Desliza
          <span className="relative block h-10 w-px overflow-hidden bg-linea">
            <span className="absolute inset-0 bg-cian motion-safe:animate-[linea-scroll_2.4s_var(--ease-in-out)_infinite]" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
