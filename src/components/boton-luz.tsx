"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario";
  tamano?: "normal" | "chico";
  externo?: boolean;
  icono?: ReactNode;
  flecha?: "derecha" | "diagonal" | "ninguna";
  className?: string;
  onClick?: () => void;
  /** Ocupa todo el ancho disponible */
  ancho?: boolean;
};

/**
 * Botón con luz: se ilumina al acercar el cursor, sigue al cursor con un foco,
 * un reflejo recorre la superficie al pasar y tiene atracción magnética.
 * En pantallas táctiles queda como un botón limpio con respuesta al presionar.
 */
export function BotonLuz({
  href,
  children,
  variante = "primario",
  tamano = "normal",
  externo,
  icono,
  flecha = "derecha",
  className = "",
  onClick,
  ancho = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducir = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducir) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let ultimo: PointerEvent | null = null;

    const actualizar = () => {
      raf = 0;
      if (!ultimo) return;
      const r = el.getBoundingClientRect();
      const px = ultimo.clientX;
      const py = ultimo.clientY;
      const ex = Math.max(r.left - px, 0, px - r.right);
      const ey = Math.max(r.top - py, 0, py - r.bottom);
      const distancia = Math.hypot(ex, ey);
      const prox = Math.max(0, 1 - distancia / 110);
      el.style.setProperty("--prox", prox.toFixed(3));
      el.style.setProperty("--mx", `${px - r.left}px`);
      el.style.setProperty("--my", `${py - r.top}px`);
      if (distancia === 0) {
        x.set((px - (r.left + r.width / 2)) * 0.18);
        y.set((py - (r.top + r.height / 2)) * 0.3);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const alMover = (e: PointerEvent) => {
      ultimo = e;
      if (!raf) raf = requestAnimationFrame(actualizar);
    };
    const alSalir = () => {
      el.style.setProperty("--prox", "0");
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    document.documentElement.addEventListener("pointerleave", alSalir);
    return () => {
      window.removeEventListener("pointermove", alMover);
      document.documentElement.removeEventListener("pointerleave", alSalir);
      cancelAnimationFrame(raf);
    };
  }, [reducir, x, y]);

  const Flecha = flecha === "diagonal" ? ArrowUpRight : ArrowRight;

  return (
    <motion.span className={ancho ? "flex w-full" : "inline-flex"} style={{ transform }}>
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`btn-luz btn-luz--${variante} ${tamano === "chico" ? "btn-luz--chico" : ""} ${ancho ? "w-full" : ""} ${className}`}
      >
        <span className="btn-luz__borde" aria-hidden="true" />
        <span className="btn-luz__foco" aria-hidden="true" />
        <span className="btn-luz__brillo" aria-hidden="true" />
        {icono}
        <span>{children}</span>
        {flecha !== "ninguna" && <Flecha className="btn-luz__flecha size-[1.05em]" aria-hidden="true" />}
        {externo && <span className="sr-only">(se abre en otra pestaña)</span>}
      </a>
    </motion.span>
  );
}
