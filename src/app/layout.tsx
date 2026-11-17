import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const display = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DUCH Technologies | Páginas web profesionales para tu negocio",
  description:
    "Diseñamos páginas web profesionales a medida para empresas, microempresas y emprendedores en Paraguay. Rápidas, seguras y listas para el celular. Cotiza por WhatsApp.",
  keywords: [
    "páginas web Paraguay",
    "diseño web",
    "desarrollo web",
    "página web para negocio",
    "DUCH Technologies",
  ],
  openGraph: {
    title: "DUCH Technologies | Páginas web que hacen crecer tu negocio",
    description:
      "Páginas web profesionales a medida para empresas y emprendedores. Cotiza por WhatsApp.",
    type: "website",
    locale: "es_PY",
    images: [{ url: "/images/logo-duch.webp", width: 1254, height: 1254, alt: "Logo de DUCH Technologies" }],
  },
  icons: { icon: "/images/logo-d.webp" },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
