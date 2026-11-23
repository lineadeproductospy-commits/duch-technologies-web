"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Robot3D } from "./robot-3d";

/**
 * Escenario de la mascota oficial de DUCH (portada): anillos holográficos, luz, plataforma y
 * el robot 3D encima. Mientras el modelo carga, o si el navegador no tiene WebGL, se muestra
 * el logotipo holográfico como alternativa.
 */

function LogoHolografico({ reducir }: { reducir: boolean | null }) {
  return (
    <div
      className={`relative size-[46%] ${reducir ? "" : "movimiento-decorativo motion-safe:animate-[flotar_6s_ease-in-out_infinite]"}`}
    >
      <div aria-hidden="true" className="absolute inset-[-25%] rounded-full bg-cian/25 blur-[60px]" />
      <Image
        src="/images/logo-duch.webp"
        alt="Logotipo de DUCH Technologies"
        width={640}
        height={640}
        sizes="(min-width: 1024px) 300px, 55vw"
        preload
        className="relative size-full rounded-full object-cover shadow-[0_0_60px_-10px_rgba(0,217,255,0.55)] ring-1 ring-cian/40"
      />
    </div>
  );
}

const CHIPS = [
  { texto: "Web", clase: "left-[2%] top-[18%]", retraso: "0s" },
  { texto: "IA", clase: "right-[0%] top-[30%]", retraso: "1.2s" },
  { texto: "Cloud", clase: "left-[6%] bottom-[24%]", retraso: "2.1s" },
] as const;

export function RobotDuch() {
  const reducir = useReducedMotion();
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState(false);
  const alListo = useCallback(() => setListo(true), []);
  const alFallar = useCallback(() => setFallo(true), []);
  const rx = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  // Interacción con el cursor: la escena se inclina suavemente hacia donde mira el usuario (solo con mouse)
  useEffect(() => {
    if (reducir) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const alMover = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        ry.set((e.clientX / window.innerWidth - 0.5) * 16);
        rx.set(-(e.clientY / window.innerHeight - 0.5) * 12);
      });
    };
    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      cancelAnimationFrame(raf);
    };
  }, [reducir, rx, ry]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* halo de luz cinematográfica */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-azul/35 blur-[90px]" />
      <div aria-hidden="true" className="absolute top-[6%] left-1/2 h-[70%] w-[28%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(0,217,255,0.28),transparent)] blur-2xl [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)]" />

      <motion.div className="absolute inset-0 grid place-items-center" style={{ transform }}>
        {/* anillos holográficos */}
        <div
          aria-hidden="true"
          className="movimiento-decorativo absolute inset-[4%] rounded-full border border-dashed border-cian/30 motion-safe:animate-[giro-lento_60s_linear_infinite]"
        />
        <div
          aria-hidden="true"
          className="movimiento-decorativo absolute inset-[14%] rounded-full border border-azul/40 motion-safe:animate-[giro-lento_40s_linear_infinite_reverse] [border-top-color:var(--cian)]"
        />
        <div aria-hidden="true" className="absolute inset-[24%] rounded-full border border-linea-2" />

        <div
          className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${listo ? "opacity-0" : "opacity-100"}`}
          aria-hidden={listo}
        >
          <LogoHolografico reducir={reducir} />
        </div>
        {!fallo && (
          <div
            role="img"
            aria-label="Robot 3D, la mascota de DUCH Technologies"
            className={`absolute inset-x-[-6%] inset-y-[-4%] transition-opacity duration-700 ${listo ? "opacity-100" : "opacity-0"}`}
          >
            <Robot3D alListo={alListo} alFallar={alFallar} />
          </div>
        )}

        {/* plataforma */}
        <div aria-hidden="true" className="absolute bottom-[8%] left-1/2 h-[16%] w-[70%] -translate-x-1/2">
          <div className="absolute inset-0 rounded-[50%] border border-cian/50 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.3),rgba(8,123,255,0.08)_60%,transparent_72%)] shadow-[0_0_50px_-6px_rgba(0,217,255,0.5)]" />
          <div className="absolute inset-x-[12%] inset-y-[22%] rounded-[50%] border border-azul/50" />
        </div>

        {/* etiquetas de cristal */}
        {CHIPS.map((c) => (
          <span
            key={c.texto}
            aria-hidden="true"
            style={{ animationDelay: c.retraso }}
            className={`vidrio movimiento-decorativo absolute ${c.clase} rounded-full px-3.5 py-1.5 font-display text-xs tracking-[0.18em] text-cian uppercase motion-safe:animate-[flotar_7s_ease-in-out_infinite]`}
          >
            {c.texto}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
