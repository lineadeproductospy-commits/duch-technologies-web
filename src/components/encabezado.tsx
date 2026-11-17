"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IconoWhatsApp } from "./iconos";
import { linkWhatsApp } from "@/lib/negocio";

const ENLACES = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#portafolio", texto: "Portafolio" },
  { href: "#proceso", texto: "Proceso" },
  { href: "#contacto", texto: "Contacto" },
];

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const alScroll = () => setConFondo(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alTecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        conFondo || abierto
          ? "border-line bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="DUCH Technologies, ir al inicio">
          <Image
            src="/images/logo-d.webp"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full ring-1 ring-line"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            DUCH <span className="font-normal text-silver">Technologies</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-silver">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="transition-colors duration-150 hover:text-foreground">
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !min-h-11 !px-5 text-sm sm:inline-flex"
          >
            <IconoWhatsApp className="size-4" />
            Escríbenos
          </a>
          <button
            type="button"
            className="inline-grid size-11 place-items-center rounded-full text-foreground md:hidden"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        hidden={!abierto}
        className="border-t border-line px-5 pb-6 md:hidden"
      >
        <ul className="flex flex-col">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                onClick={() => setAbierto(false)}
                className="block border-b border-line py-4 font-display text-xl"
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-6 w-full"
        >
          <IconoWhatsApp className="size-5" />
          Escribir por WhatsApp
        </a>
      </nav>
    </header>
  );
}
