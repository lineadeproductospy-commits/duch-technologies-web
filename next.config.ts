import type { NextConfig } from "next";

/*
 * Cabeceras de seguridad para todas las páginas.
 *
 * CSP: el sitio no tiene backend propio ni formularios que envíen datos a un servidor
 * (el formulario arma un mensaje y abre WhatsApp). Por eso todo queda limitado a "self"
 * salvo lo que realmente se usa:
 *  - fonts.googleapis.com / fonts.gstatic.com → fuentes de los diseños de ejemplo
 *  - cdnjs.cloudflare.com → three.js del diseño Brasa & Pan
 *  - www.google.com → mapa embebido del diseño Salón Lapacho
 *  - vercel.live → barra de comentarios de Vercel en las vistas previas
 * 'unsafe-inline' en scripts es necesario porque Next.js inserta scripts en línea y las
 * páginas se generan estáticas (sin nonce). Si se agrega login o datos de usuarios,
 * conviene pasar a CSP con nonce.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vercel.live",
  "frame-src https://www.google.com https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const cabeceras = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: cabeceras }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
