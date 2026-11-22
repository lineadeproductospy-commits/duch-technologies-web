"use client";

import { motion, useMotionTemplate, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const CONSULTA = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
function suscribir(cb: () => void) {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Anillo que acompaña al cursor en escritorio. El cursor del sistema sigue visible.
 * Sobre los proyectos muestra una etiqueta ("Ver diseño"). No existe en táctiles.
 */
export function Cursor() {
  const activo = useSyncExternalStore(
    suscribir,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
  const [etiqueta, setEtiqueta] = useState<string | null>(null);
  const [sobreEnlace, setSobreEnlace] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.4 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  useEffect(() => {
    if (!activo) return;

    let px = -100;
    let py = -100;
    let raf = 0;

    // Revisa qué hay bajo el cursor (también al hacer scroll sin mover el mouse)
    const revisar = () => {
      raf = 0;
      const t = document.elementFromPoint(px, py);
      const conEtiqueta = t?.closest("[data-cursor]");
      setEtiqueta(conEtiqueta ? conEtiqueta.getAttribute("data-cursor") : null);
      setSobreEnlace(!!t?.closest("a, button"));
    };
    const programar = () => {
      if (!raf) raf = requestAnimationFrame(revisar);
    };

    const alMover = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x.set(px);
      y.set(py);
      setVisible(true);
      programar();
    };
    const alSalir = () => setVisible(false);
    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("scroll", programar, { passive: true });
    document.documentElement.addEventListener("pointerleave", alSalir);
    return () => {
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("scroll", programar);
      document.documentElement.removeEventListener("pointerleave", alSalir);
      cancelAnimationFrame(raf);
    };
  }, [activo, x, y]);

  if (!activo) return null;

  const tam = etiqueta ? 104 : sobreEnlace ? 44 : 28;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[75]"
      style={{ transform }}
    >
      <div
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-300 ease-[var(--ease-out)] ${
          etiqueta
            ? "border border-transparent bg-blanco text-negro"
            : "border border-blanco/40 bg-transparent"
        } ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ width: tam, height: tam }}
      >
        {etiqueta && <span className="text-xs font-semibold whitespace-nowrap">{etiqueta}</span>}
      </div>
    </motion.div>
  );
}
