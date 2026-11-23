"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconoWhatsApp } from "./iconos";
import { TIPOS_PROYECTO, linkWhatsApp } from "@/lib/negocio";

const campo =
  "w-full rounded-xl border border-linea-2 bg-negro/60 px-4 py-3.5 text-blanco placeholder:text-texto-3 transition-[border-color,box-shadow] duration-200 focus:border-cian/60 focus:shadow-[0_0_0_3px_rgba(0,217,255,0.15)] focus:outline-none";

export function FormularioCotizacion() {
  const [error, setError] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const negocio = String(datos.get("negocio") ?? "").trim();
    const tipo = String(datos.get("tipo") ?? "");
    const detalle = String(datos.get("detalle") ?? "").trim();

    if (!nombre || !negocio) {
      setError("Completa tu nombre y el nombre de tu negocio.");
      return;
    }
    setError("");

    const mensaje = [
      "Hola DUCH Technologies, quiero cotizar una página web.",
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Necesito: ${tipo}`,
      detalle ? `Detalles: ${detalle}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(linkWhatsApp(mensaje), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="relative rounded-[28px] border border-linea bg-[linear-gradient(150deg,#111a27_0%,#0a111d_55%,#06224a_100%)] p-7 sm:p-9"
    >
      <p className="font-display text-2xl font-medium tracking-tight">Pide tu cotización</p>
      <p className="mt-2 text-sm text-texto-3">Completa estos datos y se abre WhatsApp con tu mensaje listo.</p>

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm text-texto-2">
          Tu nombre
          <input name="nombre" autoComplete="name" required className={campo} placeholder="Ej.: María González" />
        </label>
        <label className="grid gap-2 text-sm text-texto-2">
          Nombre de tu negocio
          <input name="negocio" autoComplete="organization" required className={campo} placeholder="Ej.: Peluquería Lapacho" />
        </label>
        <label className="grid gap-2 text-sm text-texto-2">
          ¿Qué necesitas?
          <select name="tipo" className={campo} defaultValue={TIPOS_PROYECTO[0]}>
            {TIPOS_PROYECTO.map((t) => (
              <option key={t} value={t} className="bg-grafito">
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-texto-2">
          Cuéntanos un poco más (opcional)
          <textarea name="detalle" rows={3} className={`${campo} resize-none`} placeholder="Qué vendes, qué quieres mostrar, si tienes logo…" />
        </label>
      </div>

      <p role="alert" aria-live="polite" className="mt-4 min-h-5 text-sm text-[#ff8a8a]">
        {error}
      </p>

      <button
        type="submit"
        className="btn-luz btn-luz--primario mt-2 w-full justify-center"
      >
        <IconoWhatsApp className="size-5" />
        Enviar por WhatsApp
      </button>
      <p className="mt-4 text-center text-xs text-texto-3">
        Sin costo ni compromiso. Ver nuestra{" "}
        <Link href="/privacidad" className="underline underline-offset-2 hover:text-blanco">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
