import Image from "next/image";
import { ArrowRight, ArrowUpRight, Headset, Mail, Rocket, ShieldCheck, Smartphone } from "lucide-react";
import { Encabezado } from "@/components/encabezado";
import { Portada } from "@/components/portada";
import { Aparecer } from "@/components/aparecer";
import { IconoTikTok, IconoWhatsApp } from "@/components/iconos";
import {
  EMAIL,
  PROYECTOS,
  TIKTOK_URL,
  TIKTOK_USUARIO,
  WHATSAPP,
  WHATSAPP_LEGIBLE,
  linkWhatsApp,
  type Proyecto,
} from "@/lib/negocio";

const SERVICIOS = [
  {
    icono: Rocket,
    titulo: "Sitios de alto rendimiento",
    texto:
      "Tu página abre en segundos, incluso con datos móviles. Un cliente que espera se va con la competencia.",
  },
  {
    icono: ShieldCheck,
    titulo: "Seguridad avanzada",
    texto:
      "Certificado de seguridad (el candadito del navegador) y código limpio. Tus clientes ven un sitio confiable.",
  },
  {
    icono: Smartphone,
    titulo: "Diseño responsivo",
    texto:
      "Casi todos tus clientes te van a ver desde el celular. Diseñamos primero para esa pantalla y después para la computadora.",
  },
  {
    icono: Headset,
    titulo: "Soporte profesional",
    texto:
      "¿Cambió un precio o un horario? Nos escribes por WhatsApp y lo actualizamos. No te quedas solo después de publicar.",
  },
];

const PASOS = [
  {
    titulo: "Conversamos",
    texto: "Nos cuentas de tu negocio, a quién le vendes y qué quieres lograr. Por WhatsApp o en una llamada.",
  },
  {
    titulo: "Diseñamos",
    texto: "Te mostramos una primera versión con tus colores, tu logo y tus textos. Nada de plantillas genéricas.",
  },
  {
    titulo: "Ajustamos",
    texto: "Cambiamos lo que haga falta hasta que te guste. Tu opinión manda.",
  },
  {
    titulo: "Publicamos",
    texto: "Tu página queda en línea con su enlace, lista para compartir en redes y en tu WhatsApp.",
  },
];

const INCLUYE = [
  "Diseño a medida con tu logo y tus colores",
  "Botón directo a tu WhatsApp",
  "Adaptada a celular, tablet y computadora",
  "Optimizada para aparecer en Google",
  "Ajustes hasta que quedes conforme",
];

function EtiquetaEstado({ estado }: { estado: Proyecto["estado"] }) {
  return estado === "en-vivo" ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
      <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      Publicada
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-semibold text-silver">
      Diseño conceptual
    </span>
  );
}

function VistaProyecto({ p }: { p: Proyecto }) {
  return (
    <div className="relative pb-10 sm:pb-0">
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {p.imagenVertical ? (
          <div className="flex aspect-[16/10] justify-center bg-[#fdf0f5]">
            <Image
              src={p.imagenVertical}
              alt={p.alt}
              width={1080}
              height={1333}
              sizes="(min-width: 1024px) 360px, 60vw"
              className="h-full w-auto"
            />
          </div>
        ) : p.imagen ? (
          <Image
            src={p.imagen}
            alt={p.alt}
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="block h-auto w-full"
          />
        ) : null}
      </div>
      {p.imagenMovil && (
        <div className="phone absolute -bottom-2 right-3 w-[26%] min-w-[88px] sm:-bottom-8 sm:-right-5">
          <div>
            <Image
              src={p.imagenMovil}
              alt=""
              width={390}
              height={844}
              sizes="180px"
              className="block h-auto w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DUCH Technologies",
    description: "Diseño y desarrollo de páginas web profesionales para empresas y emprendedores.",
    telephone: `+${WHATSAPP}`,
    email: EMAIL,
    areaServed: "PY",
    sameAs: [TIKTOK_URL],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Encabezado />
      <main>
        <Portada />

        {/* Servicios */}
        <section id="servicios" className="border-t border-line py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Aparecer className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow">Servicios</p>
              <h2 className="mt-4 font-display text-h2 leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
                Una página que trabaja por ti, incluso cuando duermes.
              </h2>
              <p className="mt-6 max-w-[42ch] text-lead text-silver">
                No vendemos plantillas. Cada página se diseña para un negocio concreto y para la
                gente que le compra.
              </p>
            </Aparecer>

            <ul className="divide-y divide-line border-y border-line">
              {SERVICIOS.map((s, i) => (
                <li key={s.titulo}>
                  <Aparecer retraso={i * 0.05} className="grid gap-4 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                    <span className="grid size-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-accent">
                      <s.icono className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-tight">{s.titulo}</h3>
                      <p className="mt-2 max-w-[52ch] text-silver">{s.texto}</p>
                    </div>
                  </Aparecer>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Portafolio */}
        <section id="portafolio" className="bg-surface/60 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Aparecer className="max-w-2xl">
              <p className="eyebrow">Portafolio</p>
              <h2 className="mt-4 font-display text-h2 leading-[1.05] font-semibold tracking-[-0.02em]">
                Algunos trabajos.
              </h2>
              <p className="mt-6 text-lead text-silver">
                Una invitación publicada y tres diseños para rubros muy distintos. Cada uno tiene su
                propio estilo, porque cada negocio es diferente.
              </p>
            </Aparecer>

            <div className="mt-20 flex flex-col gap-24 md:gap-32">
              {PROYECTOS.map((p, i) => (
                <article
                  key={p.nombre}
                  className={`grid items-center gap-10 lg:gap-16 ${
                    i % 2 === 1 ? "lg:grid-cols-[0.75fr_1.25fr]" : "lg:grid-cols-[1.25fr_0.75fr]"
                  }`}
                >
                  <Aparecer className={i % 2 === 1 ? "lg:order-2" : undefined}>
                    <VistaProyecto p={p} />
                  </Aparecer>
                  <Aparecer retraso={0.08} className={i % 2 === 1 ? "lg:order-1" : undefined}>
                    <p className="font-display text-sm text-muted">0{i + 1}</p>
                    <p className="mt-3 text-sm font-medium text-accent">{p.rubro}</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {p.nombre}
                    </h3>
                    <p className="mt-4 text-silver">{p.descripcion}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <EtiquetaEstado estado={p.estado} />
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4"
                        >
                          Ver diseño
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                          <span className="sr-only">(se abre en otra pestaña)</span>
                        </a>
                      )}
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4"
                        >
                          Ver en vivo
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                          <span className="sr-only">(se abre en otra pestaña)</span>
                        </a>
                      )}
                    </div>
                  </Aparecer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section id="proceso" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Aparecer className="max-w-2xl">
              <p className="eyebrow">Cómo trabajamos</p>
              <h2 className="mt-4 font-display text-h2 leading-[1.05] font-semibold tracking-[-0.02em]">
                De la idea a tu página en línea.
              </h2>
            </Aparecer>
            <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {PASOS.map((p, i) => (
                <li key={p.titulo}>
                  <Aparecer retraso={i * 0.06} className="border-t border-line pt-6">
                    <span className="font-display text-5xl font-semibold text-primary/80">0{i + 1}</span>
                    <h3 className="mt-4 font-display text-2xl font-medium">{p.titulo}</h3>
                    <p className="mt-2 text-silver">{p.texto}</p>
                  </Aparecer>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cotización */}
        <section className="px-5 md:px-8">
          <Aparecer className="mx-auto grid max-w-7xl gap-12 rounded-3xl border border-line bg-[linear-gradient(140deg,#0e1524,#0b1a3a)] p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="eyebrow">Precios</p>
              <h2 className="mt-4 font-display text-h2 leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
                Cada negocio es distinto. Tu presupuesto también.
              </h2>
              <p className="mt-6 max-w-[44ch] text-lead text-silver">
                Una invitación no cuesta lo mismo que una tienda en línea. Cuéntanos qué necesitas y
                te pasamos una cotización clara, sin letra chica.
              </p>
              <a
                href={linkWhatsApp("Hola DUCH Technologies, quiero una cotización para mi página web.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8"
              >
                Pedir cotización
                <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:pt-12">
              <p className="font-display text-lg font-medium">Toda página incluye</p>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {INCLUYE.map((t) => (
                  <li key={t} className="flex items-start gap-3 py-4 text-silver">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Aparecer>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1fr_auto]">
            <Aparecer>
              <p className="eyebrow">Contacto</p>
              <h2 className="mt-4 max-w-[16ch] font-display text-h2 leading-[1.05] font-semibold tracking-[-0.02em]">
                ¿Hablamos de tu página?
              </h2>
              <p className="mt-6 max-w-[44ch] text-lead text-silver">
                Escríbenos por WhatsApp y te respondemos el mismo día. Si todavía no sabes bien lo
                que necesitas, también te ayudamos con eso.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <IconoWhatsApp className="size-5" />
                  WhatsApp {WHATSAPP_LEGIBLE}
                </a>
                <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
                  <Mail className="size-4" aria-hidden="true" />
                  Enviar un correo
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">
                También estamos en TikTok:{" "}
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-silver underline underline-offset-4 hover:text-foreground">
                  @{TIKTOK_USUARIO}
                </a>
              </p>
            </Aparecer>
            <Aparecer retraso={0.1} className="mx-auto w-full max-w-[340px]">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary/30 blur-3xl"
                />
                <Image
                  src="/images/logo-duch.webp"
                  alt="Logo de DUCH Technologies: Desarrollo web e innovación digital"
                  width={1254}
                  height={1254}
                  sizes="340px"
                  className="relative h-auto w-full rounded-full"
                />
              </div>
            </Aparecer>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-d.webp" alt="" width={36} height={36} className="size-9 rounded-full" />
            <div>
              <p className="font-display font-semibold">DUCH Technologies</p>
              <p className="text-sm text-muted">Desarrollo web · Paraguay</p>
            </div>
          </div>
          <ul className="flex items-center gap-3">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-line text-silver transition-colors duration-150 hover:text-foreground">
                <IconoWhatsApp className="size-5" />
              </a>
            </li>
            <li>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid size-11 place-items-center rounded-full border border-line text-silver transition-colors duration-150 hover:text-foreground">
                <IconoTikTok className="size-5" />
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} aria-label="Correo electrónico" className="grid size-11 place-items-center rounded-full border border-line text-silver transition-colors duration-150 hover:text-foreground">
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <p className="border-t border-line pt-6 text-sm text-muted">
            © 2026 DUCH Technologies. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
