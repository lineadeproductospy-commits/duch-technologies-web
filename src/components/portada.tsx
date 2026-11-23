"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotonLuz } from "./boton-luz";
import { Ciudad } from "./ciudad";
import { EASE_CINE, TituloRevelado } from "./movimiento";
import { Particulas } from "./particulas";
import { RobotDuch } from "./robot-duch";
import { linkWhatsApp } from "@/lib/negocio";

export function Portada() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Profundidad: texto, robot y ciudad se mueven a distinta velocidad
  const textoY = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -120]);
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textoTransform = useTransform(textoY, (v) => `translateY(${v}px)`);
  const robotY = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -50]);
  const robotTransform = useTransform(robotY, (v) => `translateY(${v}px)`);
  const ciudadY = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : 70]);
  const ciudadTransform = useTransform(ciudadY, (v) => `translateY(${v}px)`);

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
      {/* Fondo: cielo, luces, ciudad y partículas */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,#0a2a5e_0%,#06142e_45%,#050914_80%)]" />
        <div className="grilla-fondo absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_70%_40%,#000_10%,transparent_75%)]" />
        <div className="luz top-[-12%] right-[2%] h-[55vh] w-[55vw] bg-azul/30 motion-safe:animate-[deriva-a_18s_ease-in-out_infinite]" />
        <div className="luz bottom-[10%] left-[-10%] h-[40vh] w-[45vw] bg-cian/10 motion-safe:animate-[deriva-b_22s_ease-in-out_infinite]" />
        <div className="absolute inset-0 opacity-50">
          <Particulas />
        </div>
        <motion.div className="absolute inset-x-0 bottom-0" style={{ transform: ciudadTransform }}>
          <Ciudad className="block h-auto min-h-[200px] w-full opacity-90" />
        </motion.div>
        <div className="holo-escaneo opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-negro" />
      </div>

      <div className="contenedor relative grid flex-1 items-center gap-6 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24 lg:pb-24">
        <motion.div style={{ transform: textoTransform, opacity: textoOpacidad }} className="order-2 lg:order-1">
          <motion.p className="etiqueta" {...entrar(0.25)}>
            Innovación digital · Paraguay
          </motion.p>
          <TituloRevelado
            como="h1"
            alMontar
            retraso={0.35}
            paso={0.07}
            texto="Construimos hoy la *tecnología del mañana.*"
            className="mt-7 font-display text-portada leading-[0.97] font-medium tracking-[-0.045em] text-balance"
          />
          <motion.p
            className="mt-7 max-w-[50ch] text-lead leading-relaxed text-texto-2 text-pretty"
            {...entrar(0.95)}
          >
            Desarrollamos soluciones digitales innovadoras para impulsar negocios, conectar ideas y transformar el
            futuro.
          </motion.p>
          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" {...entrar(1.1)}>
            <BotonLuz href="#servicios">Explorar servicios</BotonLuz>
            <BotonLuz href={linkWhatsApp("Hola DUCH Technologies, quiero trabajar con ustedes.")} externo variante="secundario" flecha="diagonal">
              Trabajemos juntos
            </BotonLuz>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          style={{ transform: robotTransform }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        >
          <div className="mx-auto w-[68%] max-w-[300px] sm:w-[52%] lg:w-full lg:max-w-[560px]">
            <RobotDuch />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="contenedor relative hidden items-end justify-between pb-8 text-xs tracking-[0.22em] text-texto-3 uppercase md:flex"
        {...entrar(1.35)}
      >
        <p>Tu visión, nuestra tecnología</p>
        <a href="#servicios" className="group flex items-center gap-4 transition-colors duration-200 hover:text-blanco">
          Desliza
          <span className="relative block h-10 w-px overflow-hidden bg-linea">
            <span className="absolute inset-0 bg-cian motion-safe:animate-[linea-scroll_2.4s_var(--ease-in-out)_infinite]" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
