"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BotonLuz } from "./boton-luz";
import { IconoTikTok, IconoWhatsApp } from "./iconos";
import { EASE_CINE } from "./movimiento";
import { SECCIONES, TIKTOK_URL, WHATSAPP_LEGIBLE, linkWhatsApp } from "@/lib/negocio";

function useSeccionActiva() {
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    const els = SECCIONES.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActiva(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return activa;
}

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const activa = useSeccionActiva();
  const reducir = useReducedMotion();
  const botonMenu = useRef<HTMLButtonElement>(null);
  const primerEnlace = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const alScroll = () => setConFondo(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    document.documentElement.style.overflow = "hidden";
    primerEnlace.current?.focus();
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonMenu.current?.focus();
      }
    };
    document.addEventListener("keydown", alTecla);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", alTecla);
    };
  }, [abierto]);

  useEffect(() => {
    const alCambiar = () => window.innerWidth >= 1280 && setAbierto(false);
    window.addEventListener("resize", alCambiar);
    return () => window.removeEventListener("resize", alCambiar);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-blanco px-4 py-2 text-sm font-semibold text-negro focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <motion.header
        initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(-16px)" }}
        animate={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.9, ease: EASE_CINE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color] duration-300 ${
            conFondo && !abierto
              ? "border-b border-linea bg-negro/55 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent"
          }`}
        >
          <div className="contenedor flex h-[72px] items-center justify-between gap-6">
            <a href="#inicio" className="group flex items-center gap-3">
              <span className="relative block size-10 overflow-hidden rounded-full ring-1 ring-linea-2">
                <Image src="/images/logo-d.webp" alt="" width={80} height={80} className="size-full object-cover" preload />
              </span>
              <span className="font-display text-[1.05rem] leading-none font-semibold tracking-[0.02em]">
                DUCH{" "}
                <span className="ml-0.5 font-light tracking-[0.14em] text-texto-2 uppercase text-[0.7rem]">
                  Technologies
                </span>
                <span className="sr-only">, ir al inicio</span>
              </span>
            </a>

            <nav aria-label="Principal" className="hidden xl:block">
              <ul className="flex items-center gap-1 rounded-full border border-linea bg-grafito/40 p-1 backdrop-blur-md">
                {SECCIONES.map((s) => {
                  const esActiva = activa === s.id;
                  return (
                    <li key={s.id} className="relative">
                      {esActiva && (
                        <motion.span
                          layoutId="indicador-seccion"
                          className="absolute inset-0 rounded-full bg-blanco/[0.08] shadow-[inset_0_0_0_1px_rgba(243,244,246,0.12)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <a
                        href={`#${s.id}`}
                        aria-current={esActiva ? "true" : undefined}
                        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                          esActiva ? "text-blanco" : "text-texto-2 hover:text-blanco"
                        }`}
                      >
                        {esActiva && <span className="size-1 rounded-full bg-cian shadow-[0_0_8px_var(--cian)]" aria-hidden="true" />}
                        {s.texto}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <BotonLuz href={linkWhatsApp()} externo tamano="chico" flecha="ninguna" icono={<IconoWhatsApp className="size-4" />}>
                  Cotizar
                </BotonLuz>
              </div>
              <button
                ref={botonMenu}
                type="button"
                className="relative grid size-11 place-items-center rounded-full border border-linea-2 bg-grafito/50 backdrop-blur-md xl:hidden"
                aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={abierto}
                aria-controls="menu-movil"
                onClick={() => setAbierto((v) => !v)}
              >
                <span
                  aria-hidden="true"
                  className={`absolute h-px w-5 bg-blanco transition-transform duration-250 ease-[var(--ease-out)] ${
                    abierto ? "rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute h-px w-5 bg-blanco transition-transform duration-250 ease-[var(--ease-out)] ${
                    abierto ? "-rotate-45" : "translate-y-[4px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-40 flex flex-col bg-negro/95 pt-[72px] backdrop-blur-2xl xl:hidden"
            initial={reducir ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={reducir ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={
              reducir
                ? { opacity: 0, transition: { duration: 0.2 } }
                : { opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.3, ease: EASE_CINE } }
            }
            transition={{ duration: 0.45, ease: EASE_CINE }}
          >
            <div aria-hidden="true" className="luz top-1/4 right-[-20%] h-72 w-72 bg-azul/30" />
            <nav aria-label="Menú móvil" className="contenedor flex flex-1 flex-col justify-center">
              <ul className="flex flex-col">
                {SECCIONES.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px)" }}
                    animate={reducir ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_CINE, delay: 0.12 + i * 0.05 }}
                    className="border-b border-linea"
                  >
                    <a
                      ref={i === 0 ? primerEnlace : undefined}
                      href={`#${s.id}`}
                      onClick={() => setAbierto(false)}
                      className="flex items-baseline gap-5 py-5 font-display text-4xl font-medium tracking-tight sm:text-5xl"
                    >
                      <span className="w-7 text-sm font-normal text-texto-3 tabular-nums">0{i + 1}</span>
                      <span className={activa === s.id ? "text-cian" : undefined}>{s.texto}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="contenedor flex flex-col gap-4 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <BotonLuz
                href={linkWhatsApp()}
                externo
                ancho
                icono={<IconoWhatsApp className="size-5" />}
                onClick={() => setAbierto(false)}
              >
                WhatsApp {WHATSAPP_LEGIBLE}
              </BotonLuz>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-texto-2"
              >
                <IconoTikTok className="size-4" /> @duch.technologies
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
