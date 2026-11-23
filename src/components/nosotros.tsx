import Image from "next/image";
import { MessagesSquare, Palette, Cpu, type LucideIcon } from "lucide-react";
import { Aparecer, ParrafoScroll } from "./movimiento";

const VALORES: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Palette,
    titulo: "Diseño a medida",
    texto: "Nada de plantillas: cada proyecto parte de tu marca, tus colores y la gente que te compra.",
  },
  {
    icono: MessagesSquare,
    titulo: "Trato directo",
    texto: "Hablas con quienes construyen tu proyecto, por WhatsApp o en una llamada. Sin intermediarios.",
  },
  {
    icono: Cpu,
    titulo: "Tecnología actual",
    texto: "Usamos herramientas modernas para que tu sitio sea rápido, seguro y fácil de mantener.",
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="luz top-[10%] left-[-12%] h-[50vh] w-[40vw] bg-azul/15" />
      <div className="contenedor relative">
        <p className="etiqueta">Sobre nosotros</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* Manifiesto: el texto se enciende palabra por palabra al bajar */}
          <ParrafoScroll
            texto="No vendemos plantillas. Cada proyecto se diseña para un negocio *concreto* y para la gente que le compra."
            className="max-w-[24ch] font-display text-titulo leading-[1.08] font-medium tracking-[-0.035em]"
          />
          <Aparecer className="lg:pt-6">
            <div className="vidrio rounded-[28px] p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/logo-d.webp"
                  alt=""
                  width={160}
                  height={160}
                  className="size-14 rounded-full ring-1 ring-cian/40"
                />
                <div>
                  <p className="font-display text-lg font-semibold tracking-wide">DUCH TECHNOLOGIES</p>
                  <p className="text-sm text-texto-3">Paraguay</p>
                </div>
              </div>
              <p className="mt-6 text-texto-2">
                Somos un estudio de desarrollo web e innovación digital. Ayudamos a empresas y emprendedores a tener una
                presencia en línea profesional, y a incorporar herramientas como automatización e inteligencia
                artificial cuando aportan valor real.
              </p>
            </div>
          </Aparecer>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-24">
          {VALORES.map((v, i) => (
            <Aparecer key={v.titulo} retraso={i * 0.08}>
              <div className="vidrio h-full rounded-3xl p-7">
                <span className="grid size-12 place-items-center rounded-xl border border-cian/30 bg-cian/10 text-cian">
                  <v.icono className="size-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{v.titulo}</h3>
                <p className="mt-2 text-texto-2">{v.texto}</p>
              </div>
            </Aparecer>
          ))}
        </div>
      </div>
    </section>
  );
}
