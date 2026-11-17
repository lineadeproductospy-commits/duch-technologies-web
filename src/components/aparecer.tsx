"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Entrada suave al hacer scroll. Con "reducir movimiento" solo cambia la opacidad. */
export function Aparecer({
  children,
  retraso = 0,
  className,
}: {
  children: ReactNode;
  retraso?: number;
  className?: string;
}) {
  const reducir = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" }}
      whileInView={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reducir ? 0.3 : 0.65, ease: EASE_OUT, delay: retraso }}
    >
      {children}
    </motion.div>
  );
}
