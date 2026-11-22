"use client";

import { useEffect, useRef } from "react";

type P3 = [number, number, number];
type Seg = [number, number, number, number]; // x1 y1 x2 y2

/* ---------------- Formas (coordenadas de -1 a 1) ---------------- */

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

// La "D" del logo
const FORMA_D: Seg[] = [
  [-0.62, -0.82, -0.62, 0.82],
  [-0.62, -0.82, 0.02, -0.82],
  [-0.62, 0.82, 0.02, 0.82],
  ...arco(0.02, 0, 0.82, -Math.PI / 2, Math.PI / 2, 28),
  [-0.3, -0.5, -0.3, 0.5],
  [-0.3, -0.5, 0.02, -0.5],
  [-0.3, 0.5, 0.02, 0.5],
  ...arco(0.02, 0, 0.5, -Math.PI / 2, Math.PI / 2, 20),
];

// Ventana de navegador con una página
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

// Celular
const FORMA_CEL: Seg[] = [
  ...rectRedondeado(-0.44, -0.92, 0.88, 1.84, 0.14),
  [-0.12, -0.8, 0.12, -0.8],
  [-0.3, -0.55, 0.3, -0.55],
  [-0.3, -0.42, 0.14, -0.42],
  ...rect(-0.3, -0.25, 0.6, 0.45),
  ...rectRedondeado(-0.3, 0.36, 0.6, 0.16, 0.08),
  [-0.3, 0.66, 0.3, 0.66],
];

function muestrearPlano(segs: Seg[], n: number, grosor: number, prof: number): P3[] {
  const largos = segs.map((s) => Math.hypot(s[2] - s[0], s[3] - s[1]));
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
  const inc = 0.4;
  for (let i = 0; i < n; i++) {
    let lat: number, lon: number;
    if (Math.random() < 0.5) {
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
    pts.push([x, y * Math.cos(inc) - z * Math.sin(inc), y * Math.sin(inc) + z * Math.cos(inc)]);
  }
  return pts;
}

function nube(n: number): P3[] {
  return Array.from({ length: n }, () => {
    const u = Math.random() * Math.PI * 2;
    const v = Math.acos(2 * Math.random() - 1);
    const r = 2.2 + Math.random() * 1.6;
    return [r * Math.sin(v) * Math.cos(u), r * Math.sin(v) * Math.sin(u), r * Math.cos(v)] as P3;
  });
}

function mezclar<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COLORES = ["#2b6bff", "#2b6bff", "#4d84ff", "#3be0ff", "#e8eefc"];

/* ---------------- Componente ---------------- */

export function Particulas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let limpiar: (() => void) | undefined;
    let cancelado = false;

    const iniciar = () => {
    if (cancelado) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const punteroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const angostoInicial = window.innerWidth < 1024;
    const N = window.innerWidth < 640 ? 950 : angostoInicial ? 1400 : 2800;

    const formas: P3[][] = [
      muestrearPlano(FORMA_D, N, 0.07, 0.25),
      muestrearPlano(FORMA_WEB, N, 0.05, 0.2),
      muestrearPlano(FORMA_CEL, N, 0.05, 0.2),
      muestrearGlobo(N),
    ].map((f) => mezclar(f));
    const origen = nube(N);

    const color = Array.from({ length: N }, () => COLORES[Math.floor(Math.random() * COLORES.length)]);
    const retraso = Float32Array.from({ length: N }, () => Math.random() * 0.35);
    const tam = Float32Array.from({ length: N }, () => 1 + Math.random() * 1.5);

    let ancho = 0;
    let alto = 0;
    let angosto = angostoInicial;
    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      ancho = r.width;
      alto = r.height;
      angosto = ancho < 1024;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    ajustar();

    // Cámara que sigue al cursor
    let objX = 0;
    let objY = 0;
    let camX = 0;
    let camY = 0;
    const alMover = (e: PointerEvent) => {
      objX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      objY = (e.clientY / window.innerHeight - 0.5) * 0.45;
    };

    const ENTRADA = 1700;
    const DURA_FORMA = 4200;
    const DURA_CAMBIO = 1800;
    const ciclo = DURA_FORMA + DURA_CAMBIO;
    const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const salida = (t: number) => 1 - Math.pow(1 - t, 4);

    const dibujar = (ms: number) => {
      ctx.clearRect(0, 0, ancho, alto);
      const cx = angosto ? ancho / 2 : ancho * 0.7;
      const cy = angosto ? alto * 0.3 : alto * 0.48;
      const escala = angosto ? Math.min(ancho, alto) * 0.36 : Math.min(ancho * 0.25, alto * 0.38);
      const alfaBase = angosto ? 0.5 : 0.9;

      const entrada = salida(Math.min(1, ms / ENTRADA));
      const t0 = Math.max(0, ms - ENTRADA);
      const idx = Math.floor(t0 / ciclo) % formas.length;
      const sig = (idx + 1) % formas.length;
      const enCiclo = t0 % ciclo;
      const progreso = enCiclo < DURA_FORMA ? 0 : (enCiclo - DURA_FORMA) / DURA_CAMBIO;

      camX += (objX - camX) * 0.05;
      camY += (objY - camY) * 0.05;
      const giroY = (reducir ? 0.35 : Math.sin(ms / 5200) * 0.5 + (idx === 3 ? t0 / 6000 : 0)) + camX;
      const giroX = camY;
      const cY = Math.cos(giroY);
      const sY = Math.sin(giroY);
      const cX = Math.cos(giroX);
      const sX = Math.sin(giroX);
      const A = formas[idx];
      const B = formas[sig];

      for (let i = 0; i < N; i++) {
        let t = progreso === 0 ? 0 : (progreso - retraso[i]) / 0.65;
        t = suave(Math.max(0, Math.min(1, t)));
        const abrir = Math.sin(t * Math.PI) * 0.35;
        let x = (A[i][0] + (B[i][0] - A[i][0]) * t) * (1 + abrir);
        let y = (A[i][1] + (B[i][1] - A[i][1]) * t) * (1 + abrir);
        let z = (A[i][2] + (B[i][2] - A[i][2]) * t) * (1 + abrir);

        if (entrada < 1) {
          const e = Math.max(0, Math.min(1, (entrada - retraso[i] * 0.6) / 0.8));
          x = origen[i][0] + (x - origen[i][0]) * e;
          y = origen[i][1] + (y - origen[i][1]) * e;
          z = origen[i][2] + (z - origen[i][2]) * e;
        }

        // rotación Y luego X
        const xr = x * cY + z * sY;
        const zr0 = -x * sY + z * cY;
        const yr = y * cX - zr0 * sX;
        const zr = y * sX + zr0 * cX;

        const persp = 2.8 / (2.8 + zr);
        if (persp <= 0) continue;
        const px = cx + xr * escala * persp;
        const py = cy + yr * escala * persp;
        const s = tam[i] * persp;

        ctx.globalAlpha = Math.max(0.08, Math.min(1, (0.85 * persp - zr * 0.2) * alfaBase * (0.25 + 0.75 * entrada)));
        ctx.fillStyle = color[i];
        ctx.fillRect(px, py, s, s);
      }
      ctx.globalAlpha = 1;
    };

    if (reducir) {
      dibujar(ENTRADA);
      const alCambiar = () => {
        ajustar();
        dibujar(ENTRADA);
      };
      window.addEventListener("resize", alCambiar);
      limpiar = () => window.removeEventListener("resize", alCambiar);
      return;
    }

    let raf = 0;
    let visible = true;
    let inicio = performance.now();
    let pausado = performance.now();

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
    if (punteroFino) window.addEventListener("pointermove", alMover, { passive: true });

    arrancar();

    limpiar = () => {
      parar();
      io.disconnect();
      document.removeEventListener("visibilitychange", alVisibilidad);
      window.removeEventListener("resize", ajustar);
      window.removeEventListener("pointermove", alMover);
    };
    };

    // Espera a que el navegador termine de cargar lo importante
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(iniciar, { timeout: 600 });

    return () => {
      cancelado = true;
      cic(id);
      limpiar?.();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
