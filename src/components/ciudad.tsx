/**
 * Ciudad futurista de fondo para la portada. Es un SVG decorativo hecho a mano:
 * dos capas de edificios, ventanas encendidas, antenas con luz y un suelo en perspectiva.
 * No usa imágenes externas ni JavaScript: pesa muy poco y se pinta al instante.
 */

type Edificio = { x: number; w: number; h: number };

// Generador determinista: el servidor y el navegador dibujan exactamente lo mismo.
function crearAzar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function edificios(semilla: number, ancho: number, minAlto: number, maxAlto: number, minAncho: number, maxAncho: number) {
  const azar = crearAzar(semilla);
  const lista: Edificio[] = [];
  let x = -20;
  while (x < ancho) {
    const w = minAncho + azar() * (maxAncho - minAncho);
    lista.push({ x, w, h: minAlto + azar() * (maxAlto - minAlto) });
    x += w + 2 + azar() * 8;
  }
  return lista;
}

const BASE = 420;
const ANCHO = 1600;
const CAPA_LEJOS = edificios(7, ANCHO, 90, 250, 34, 74);
const CAPA_CERCA = edificios(23, ANCHO, 60, 190, 44, 96);

function Ventanas({ lista, semilla, color }: { lista: Edificio[]; semilla: number; color: string }) {
  const azar = crearAzar(semilla);
  const ventanas: { x: number; y: number; o: number }[] = [];
  lista.forEach((b) => {
    const columnas = Math.max(2, Math.floor(b.w / 12));
    const filas = Math.floor(b.h / 16);
    for (let f = 1; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        if (azar() > 0.82) {
          ventanas.push({
            x: b.x + 6 + c * ((b.w - 12) / columnas),
            y: BASE - b.h + f * 16,
            o: 0.35 + azar() * 0.65,
          });
        }
      }
    }
  });
  return (
    <g fill={color}>
      {ventanas.map((v, i) => (
        <rect key={i} x={v.x.toFixed(1)} y={v.y} width="4" height="6" opacity={v.o.toFixed(2)} />
      ))}
    </g>
  );
}

export function Ciudad({ className = "" }: { className?: string }) {
  const antenas = CAPA_LEJOS.filter((_, i) => i % 6 === 2);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${ANCHO} ${BASE + 40}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      <defs>
        <linearGradient id="ciudad-lejos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f2547" />
          <stop offset="1" stopColor="#07101f" />
        </linearGradient>
        <linearGradient id="ciudad-cerca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1830" />
          <stop offset="1" stopColor="#050914" />
        </linearGradient>
        <linearGradient id="ciudad-suelo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#087bff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#050914" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* capa lejana */}
      <g fill="url(#ciudad-lejos)">
        {CAPA_LEJOS.map((b, i) => (
          <rect key={i} x={b.x.toFixed(1)} y={BASE - b.h} width={b.w.toFixed(1)} height={b.h} />
        ))}
      </g>
      <Ventanas lista={CAPA_LEJOS} semilla={11} color="#3d9bff" />
      {antenas.map((b, i) => (
        <g key={i}>
          <rect x={(b.x + b.w / 2).toFixed(1)} y={BASE - b.h - 34} width="1.5" height="34" fill="#1d4f94" />
          <circle
            cx={(b.x + b.w / 2 + 0.7).toFixed(1)}
            cy={BASE - b.h - 36}
            r="2.6"
            fill="#00d9ff"
            className="movimiento-decorativo motion-safe:animate-[titilar_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        </g>
      ))}

      {/* capa cercana */}
      <g fill="url(#ciudad-cerca)">
        {CAPA_CERCA.map((b, i) => (
          <rect key={i} x={b.x.toFixed(1)} y={BASE - b.h} width={b.w.toFixed(1)} height={b.h} />
        ))}
      </g>
      <g fill="none" stroke="#00d9ff" strokeOpacity="0.35" strokeWidth="1">
        {CAPA_CERCA.filter((_, i) => i % 3 === 0).map((b, i) => (
          <path key={i} d={`M${b.x.toFixed(1)} ${BASE - b.h} H${(b.x + b.w).toFixed(1)}`} />
        ))}
      </g>
      <Ventanas lista={CAPA_CERCA} semilla={41} color="#00d9ff" />

      {/* suelo luminoso */}
      <rect x="0" y={BASE} width={ANCHO} height="40" fill="url(#ciudad-suelo)" />
    </svg>
  );
}
