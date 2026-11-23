import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cuerpo = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const URL_SITIO = "https://duch-technologies-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: "DUCH Technologies | Tecnología, desarrollo web e innovación digital",
  description:
    "Construimos hoy la tecnología del mañana: desarrollo web, inteligencia artificial, automatización y marketing digital para empresas y emprendedores en Paraguay.",
  keywords: [
    "páginas web Paraguay",
    "diseño web",
    "desarrollo web",
    "página web para negocio",
    "agencia web",
    "DUCH Technologies",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DUCH Technologies | Construimos hoy la tecnología del mañana",
    description:
      "Soluciones digitales innovadoras para impulsar negocios. Cotiza por WhatsApp.",
    url: URL_SITIO,
    siteName: "DUCH Technologies",
    type: "website",
    locale: "es_PY",
    images: [{ url: "/images/logo-duch.webp", width: 1254, height: 1254, alt: "Logo de DUCH Technologies" }],
  },
  icons: { icon: "/images/logo-d.webp", apple: "/images/logo-d.webp" },
};

export const viewport: Viewport = {
  themeColor: "#050914",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${cuerpo.variable} ${serif.variable} antialiased`}>
      <body>
        {children}
        {/* Contador de visitas de Vercel Web Analytics. El script se sirve desde el propio dominio, por eso la CSP no cambia. */}
        <Script id="vercel-analytics-init" strategy="afterInteractive">
          {"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };"}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" defer />
      </body>
    </html>
  );
}
