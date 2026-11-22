import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Outfit } from "next/font/google";
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
  title: "DUCH Technologies | Diseño y desarrollo web profesional",
  description:
    "Diseñamos y desarrollamos páginas web estratégicas para empresas, microempresas y emprendedores en Paraguay. Rápidas, seguras, adaptadas al celular y conectadas a tu WhatsApp.",
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
    title: "DUCH Technologies | Transformamos ideas en experiencias digitales",
    description:
      "Páginas web estratégicas que elevan la presencia digital de tu negocio. Cotiza por WhatsApp.",
    url: URL_SITIO,
    siteName: "DUCH Technologies",
    type: "website",
    locale: "es_PY",
    images: [{ url: "/images/logo-duch.webp", width: 1254, height: 1254, alt: "Logo de DUCH Technologies" }],
  },
  icons: { icon: "/images/logo-d.webp", apple: "/images/logo-d.webp" },
};

export const viewport: Viewport = {
  themeColor: "#050607",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${cuerpo.variable} ${serif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
