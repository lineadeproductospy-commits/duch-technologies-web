"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IconoTikTok, IconoWhatsApp } from "./iconos";
import { EMAIL, SECCIONES, TIKTOK_URL, TIKTOK_USUARIO, WHATSAPP_LEGIBLE, linkWhatsApp } from "@/lib/negocio";

export function Pie() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const marcaY = useTransform(scrollYProgress, [0, 1], [reducir ? 0 : 120, 0]);
  const marcaT = useTransform(marcaY, (v) => `translateY(${v}px)`);
  const marcaO = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-linea bg-grafito pt-20">
      <div className="contenedor grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo-d.webp" alt="" width={88} height={88} className="size-11 rounded-full ring-1 ring-linea-2" />
            <div>
              <p className="font-display text-lg font-semibold tracking-wide">DUCH TECHNOLOGIES</p>
              <p className="text-sm text-texto-3">Desarrollo web e innovación digital</p>
            </div>
          </div>
          <p className="mt-6 max-w-[34ch] text-texto-2">Tu visión, nuestra tecnología.</p>
        </div>

        <nav aria-label="Pie de página">
          <p className="text-xs font-semibold tracking-[0.2em] text-texto-3 uppercase">Navegación</p>
          <ul className="mt-5 grid gap-3">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-texto-2 transition-colors duration-200 hover:text-blanco">
                  {s.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-texto-3 uppercase">Contacto</p>
          <ul className="mt-5 grid gap-3 text-texto-2">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-blanco">
                <IconoWhatsApp className="size-4" /> {WHATSAPP_LEGIBLE}
                <span className="sr-only">(WhatsApp, se abre en otra pestaña)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 break-all transition-colors duration-200 hover:text-blanco">
                <Mail className="size-4 shrink-0" aria-hidden="true" /> {EMAIL}
              </a>
            </li>
            <li>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-blanco">
                <IconoTikTok className="size-4" /> @{TIKTOK_USUARIO}
                <span className="sr-only">(TikTok, se abre en otra pestaña)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="contenedor mt-16 flex flex-col gap-4 border-t border-linea py-6 text-sm text-texto-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 DUCH Technologies · Paraguay ·{" "}
          <Link href="/privacidad" className="underline-offset-2 transition-colors duration-200 hover:text-blanco hover:underline">
            Privacidad y términos
          </Link>
        </p>
        <a href="#inicio" className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-blanco">
          Volver arriba
          <span className="grid size-8 place-items-center rounded-full border border-linea-2 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5">
            <ArrowUp className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>

      {/* Marca gigante de cierre */}
      <motion.p
        aria-hidden="true"
        style={{ transform: marcaT, opacity: marcaO }}
        className="pointer-events-none -mb-[0.2em] text-center font-display text-[24vw] leading-[0.8] font-semibold tracking-[-0.06em] select-none"
      >
        <span className="bg-[linear-gradient(180deg,rgba(243,244,246,0.14)_0%,rgba(43,107,255,0.22)_60%,transparent_100%)] bg-clip-text text-transparent">
          DUCH
        </span>
      </motion.p>
    </footer>
  );
}
