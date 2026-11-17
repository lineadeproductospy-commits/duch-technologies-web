"use client";

import { useEffect, useRef } from "react";

type P3 = [number, number, number];
type Seg = [number, number, number, number]; // x1 y1 x2 y2

// ---------- Formas (coordenadas de -1 a 1) ----------

function arco(cx: number, cy: number, r: number, a0: number, a1: number, pasos = 24): Seg[] {
  const segs: Seg[] = [];
  for (let i = 0; i < pasos; i++) {
    const t0 = a0 + ((a1 - a0) * i) / pasos;
    const t1 = a0 + ((a1 - a0) * (i + 1)) / pasos;
    segs.push([cx + r * Math.cos(t0), cy + r * Math.sin(t0), cx + r * Math.cos(t1), cy + r * Math.sin(t1)]);
  }
  return segs;
}

function rect(x: number, y: number, w: number, h: number): Seg[] {
  return [
    [x, y, x + w, y],
    [x + w, y, x + w, y + h],
    [x + w, y + h, x, y + h],
    [x, y + h, x, y],
  ];
}

function rectRedondeado(x: number, y: number, w: number, h: number, r: number): Seg[] {
  return [
    [x + r, y, x + w - r, y],
    [x + w, y + r, x + w, y + h - r],
    [x + w - r, y + h, x + r, y + h],
    [x, y + h - r, x, y + r],
    ...arco(x + w - r, y + r, r, -Math.PI / 2, 0, 6),
    ...arco(x + w - r, y + h - r, r, 0, Math.PI / 2, 6),
    ...arco(x + r, y + h - r, r, Math.PI / 2, Math.PI, 6),
    ...arco(x + r, y + r, r, Math.PI, 1.5 * Math.PI, 6),
  ];
}

// La "D" del logo: barra vertical, dos tramos rectos y la curva.
const FORMA_D: Seg[] = [
  [-0.62, -0.82, -0.62, 0.82],
  [-0.62, -0.82, 0.02, -0.82],
  [-0.62, 0.82, 0.02, 0.82],
  ...arco(0.02, 0, 0.82, -Math.PI / 2, Math.PI / 2, 28),
  // contorno interior
  [-0.3, -0.5, -0.3, 0.5],
  [-0.3, -0.5, 0.02, -0.5],
  [-0.3, 0.5, 0.02, 0.5],
  ...arco(0.02, 0, 0.5, -Math.PI / 2, Math.PI / 2, 20),
];

// Ventana de navegador con una página dentro.
const FORMA_WEB: Seg[] = [
  ...rectRedondeado(-1, -0.66, 2, 1.32, 0.06),
  [-1, -0.46, 1, -0.46],
  [-0.9, -0.56, -0.86, -0.56],
  [-0.8, -0.56, -0.76, -0.56],
  [-0.7, -0.56, -0.66, -0.56],
  [-0.82, -0.26, 0.1, -0.26],
  [-0.82, -0.12, -0.1, -0.12],
  ...rectRedondeado(-0.82, 0.04, 0.36, 0.12, 0.05),
  ...rect(0.24, -0.3, 0.58, 0.5),
  ...rect(-0.82, 0.32, 0.5, 0.2),
  ...rect(-0.22, 0.32, 0.5, 0.2),
  ...rect(0.38, 0.32, 0.44, 0.2),
];

// Celular.
const FORMA_CEL: Seg[] = [
  ...rectRedondeado(-0.44, -0.92, 0.88, 1.84, 0.14),
  [-0.12, -0.8, 0.12, -0.8],
  [-0.3, -0.55, 0.3, -0.55],
  [-0.3, -0.42, 0.14, -0.42],
  ...rect(-0.3, -0.25, 0.6, 0.45),
  ...rectRedondeado(-0.3, 0.36, 0.6, 0.16, 0.08),
  [-0.3, 0.66, 0.3, 0.66],
];

function largo(s: Seg) {
  return Math.hypot(s[2] - s[0], s[3] - s[1]);
}

function muestrearPlano(segs: Seg[], n: number, grosor: number, prof: number): P3[] {
  const largos = segs.map(largo);
  const total = largos.reduce((a, b) => a + b, 0);
  const pts: P3[] = [];
  for (let i = 0; i < n; i++) {
    let r = Math.random() * total;
    let k = 0;
    while (r > largos[k] && k < segs.length - 1) r -= largos[k++];
    const s = segs[k];
    const t = largos[k] ? r / largos[k] : 0;
    pts.push([
      s[0] + (s[2] - s[0]) * t + (Math.random() - 0.5) * grosor,
      s[1] + (s[3] - s[1]) * t + (Math.random() - 0.5) * grosor,
      (Math.random() - 0.5) * prof,
    ]);
  }
  return pts;
}

function muestrearGlobo(n: number): P3[] {
  const pts: P3[] = [];
  for (let i = 0; i < n; i++) {
    const enParalelo = Math.random() < 0.5;
    let lat: number, lon: number;
    if (enParalelo) {
      lat = ((Math.floor(Math.random() * 7) - 3) * Math.PI) / 8;
      lon = Math.random() * Math.PI * 2;
    } else {
      lon = (Math.floor(Math.random() * 8) * Math.PI) / 8;
      lat = (Math.random() - 0.5) * Math.PI;
    }
    const r = 0.92 + (Math.random() - 0.5) * 0.04;
    const x = r * Math.cos(lat) * Math.sin(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.cos(lon);
    // inclinación de ~23° para que se vea como un globo y no como un plato
    const inc = 0.4;
    pts.push([x, y * Math.cos(inc) - z * Math.sin(inc), y * Math.sin(inc) + z * Math.cos(inc)]);
  }
  return pts;
}

function mezclar<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COLORES = ["#1f6fff", "#5aa9ff", "#5aa9ff", "#c9d1dc"];

// ---------- Componente ----------

export function Particulas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const angosto = window.innerWidth < 768;
    const N = angosto ? 1300 : 2800;

    const formas: P3[][] = [
      muestrearPlano(FORMA_D, N, 0.07, 0.25),
      muestrearPlano(FORMA_WEB, N, 0.05, 0.2),
      muestrearPlano(FORMA_CEL, N, 0.05, 0.2),
      muestrearGlobo(N),
    ].map((f) => mezclar(f));

    const color = Array.from({ length: N }, () => COLORES[Math.floor(Math.random() * COLORES.length)]);
    const retraso = Float32Array.from({ length: N }, () => Math.random() * 0.35);
    const tam = Float32Array.from({ length: N }, () => 1.1 + Math.random() * 1.5);

    let ancho = 0;
    let alto = 0;
    let dpr = 1;
    const ajustar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      ancho = r.width;
      alto = r.height;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    ajustar();

    const DURA_FORMA = 4200; // ms quieto en cada forma
    const DURA_CAMBIO = 1800; // ms de transición
    const ciclo = DURA_FORMA + DURA_CAMBIO;

    // ease-in-out para el viaje entre formas
    const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const dibujar = (ms: number) => {
      ctx.clearRect(0, 0, ancho, alto);
      const escala = Math.min(ancho, alto) * (angosto ? 0.42 : 0.44);
      const cx = ancho / 2;
      const cy = alto / 2;

      const idx = Math.floor(ms / ciclo) % formas.length;
      const sig = (idx + 1) % formas.length;
      const enCiclo = ms % ciclo;
      const progreso = enCiclo < DURA_FORMA ? 0 : (enCiclo - DURA_FORMA) / DURA_CAMBIO;

      const giro = reducir ? 0.35 : Math.sin(ms / 5200) * 0.55 + (idx === 3 ? ms / 6000 : 0);
      const cos = Math.cos(giro);
      const sin = Math.sin(giro);
      const A = formas[idx];
      const B = formas[sig];

      for (let i = 0; i < N; i++) {
        let t = progreso === 0 ? 0 : (progreso - retraso[i]) / (1 - 0.35);
        t = suave(Math.max(0, Math.min(1, t)));
        // al viajar, cada punto se abre un poco hacia afuera
        const abrir = Math.sin(t * Math.PI) * 0.35;
        const x0 = A[i][0] + (B[i][0] - A[i][0]) * t;
        const y0 = A[i][1] + (B[i][1] - A[i][1]) * t;
        const z0 = A[i][2] + (B[i][2] - A[i][2]) * t;
        const x = x0 * (1 + abrir);
        const y = y0 * (1 + abrir);
        const z = z0 * (1 + abrir);

        const xr = x * cos + z * sin;
        const zr = -x * sin + z * cos;
        const persp = 2.6 / (2.6 + zr);
        const px = cx + xr * escala * persp;
        const py = cy + y * escala * persp;
        const s = tam[i] * persp;

        ctx.globalAlpha = Math.max(0.25, Math.min(1, 0.85 * persp - zr * 0.2));
        ctx.fillStyle = color[i];
        ctx.fillRect(px, py, s, s);
      }
      ctx.globalAlpha = 1;
    };

    if (reducir) {
      dibujar(0);
      const alCambiar = () => {
        ajustar();
        dibujar(0);
      };
      window.addEventListener("resize", alCambiar);
      return () => window.removeEventListener("resize", alCambiar);
    }

    let raf = 0;
    let visible = true;
    let inicio = performance.now();
    let pausado = 0;

    const loop = (ahora: number) => {
      dibujar(Math.max(0, ahora - inicio));
      raf = requestAnimationFrame(loop);
    };

    const arrancar = () => {
      if (raf || !visible || document.hidden) return;
      inicio += performance.now() - pausado;
      raf = requestAnimationFrame(loop);
    };
    const parar = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      pausado = performance.now();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) arrancar();
      else parar();
    });
    io.observe(canvas);

    const alVisibilidad = () => (document.hidden ? parar() : arrancar());
    document.addEventListener("visibilitychange", alVisibilidad);
    window.addEventListener("resize", ajustar);

    pausado = performance.now();
    arrancar();

    return () => {
      parar();
      io.disconnect();
      document.removeEventListener("visibilitychange", alVisibilidad);
      window.removeEventListener("resize", ajustar);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
