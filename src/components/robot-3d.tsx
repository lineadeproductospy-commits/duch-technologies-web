"use client";

import { useEffect, useRef } from "react";

/**
 * Robot oficial de DUCH Technologies en 3D (modelo /models/duch-robot.glb).
 *
 * - Three.js se descarga solo cuando la portada está a la vista (carga diferida).
 * - Se dibuja únicamente mientras es visible y la pestaña está activa.
 * - Con "reducir movimiento" se muestra un cuadro fijo, sin animación.
 * - Si el navegador no tiene WebGL o el modelo no carga, avisa con `alFallar`
 *   y el escenario muestra el logotipo holográfico en su lugar.
 *
 * El modelo no trae animaciones propias: el movimiento (flotar, respirar, mirar al cursor
 * y el pulso de luz de los ojos) se calcula aquí. El modelo está en Z arriba y mira hacia -Y.
 */
export function Robot3D({ alListo, alFallar }: { alListo: () => void; alFallar: () => void }) {
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;

    let cancelado = false;
    let limpiar: (() => void) | null = null;

    const iniciar = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        if (cancelado) return;

        const movil = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
        const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        const renderer = new THREE.WebGLRenderer({ antialias: !movil, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, movil ? 1.5 : 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
        renderer.domElement.setAttribute("aria-hidden", "true");
        el.appendChild(renderer.domElement);

        const escena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
        camara.position.set(0, 0.15, 10.4);
        camara.lookAt(0, 0, 0);

        escena.add(new THREE.HemisphereLight(0x9bcaff, 0x071226, 2.1));
        const principal = new THREE.DirectionalLight(0xe5f3ff, 3.2);
        principal.position.set(3, 4, 8);
        escena.add(principal);
        const contraluz = new THREE.PointLight(0x008cff, 34, 16);
        contraluz.position.set(-4, 2.5, -1);
        escena.add(contraluz);
        const relleno = new THREE.PointLight(0x00bfff, 16, 14);
        relleno.position.set(3.5, -1.5, 4);
        escena.add(relleno);

        // pivote = lo que se anima; orientar = pasa el modelo de "Z arriba" a "Y arriba" y lo centra
        const pivote = new THREE.Group();
        const orientar = new THREE.Group();
        orientar.rotation.x = -Math.PI / 2;
        orientar.position.set(0, -2.3, -0.1);
        pivote.add(orientar);
        escena.add(pivote);

        const luces: { material: import("three").MeshStandardMaterial; base: number }[] = [];
        const gltf = await new GLTFLoader().loadAsync("/models/duch-robot.glb");
        if (cancelado) {
          renderer.dispose();
          return;
        }
        orientar.add(gltf.scene);
        const vistos = new Set<string>();
        gltf.scene.traverse((o) => {
          const malla = o as import("three").Mesh;
          const m = malla.material as import("three").MeshStandardMaterial | undefined;
          if (malla.isMesh && m && m.emissiveIntensity !== undefined && m.emissive && m.emissive.getHex() !== 0 && !vistos.has(m.uuid)) {
            vistos.add(m.uuid);
            luces.push({ material: m, base: m.emissiveIntensity || 1 });
          }
        });

        const ajustar = () => {
          const w = el.clientWidth || 1;
          const h = el.clientHeight || 1;
          renderer.setSize(w, h, false);
          camara.aspect = w / h;
          camara.updateProjectionMatrix();
        };
        ajustar();
        const ro = new ResizeObserver(ajustar);
        ro.observe(el);

        // Cursor: el robot gira hacia donde mira el usuario (solo con mouse)
        const objetivo = { x: 0, y: 0 };
        const alMover = (e: PointerEvent) => {
          objetivo.y = (e.clientX / window.innerWidth - 0.5) * 2;
          objetivo.x = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (mouse && !reducir) window.addEventListener("pointermove", alMover, { passive: true });

        let visible = true;
        let pestana = !document.hidden;
        let raf = 0;
        const reloj = new THREE.Clock();

        const dibujar = () => {
          const t = reloj.getElapsedTime();
          if (!reducir) {
            pivote.position.y = Math.sin(t * 1.1) * 0.07;
            const giroY = objetivo.y * 0.55 + Math.sin(t * 0.45) * 0.1;
            const giroX = objetivo.x * 0.12;
            pivote.rotation.y += (giroY - pivote.rotation.y) * 0.06;
            pivote.rotation.x += (giroX - pivote.rotation.x) * 0.06;
            const pulso = 1 + Math.sin(t * 2.2) * 0.22;
            luces.forEach((l) => (l.material.emissiveIntensity = l.base * pulso));
          }
          renderer.render(escena, camara);
        };
        const bucle = () => {
          raf = 0;
          if (!visible || !pestana) return;
          dibujar();
          raf = requestAnimationFrame(bucle);
        };
        const arrancar = () => {
          if (reducir || raf || !visible || !pestana) return;
          raf = requestAnimationFrame(bucle);
        };

        const io = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          arrancar();
        });
        io.observe(el);
        const alVisibilidad = () => {
          pestana = !document.hidden;
          arrancar();
        };
        document.addEventListener("visibilitychange", alVisibilidad);

        dibujar();
        arrancar();
        alListo();

        limpiar = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener("pointermove", alMover);
          document.removeEventListener("visibilitychange", alVisibilidad);
          gltf.scene.traverse((o) => {
            const malla = o as import("three").Mesh;
            if (malla.isMesh) {
              malla.geometry.dispose();
              const mat = malla.material;
              (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!cancelado) alFallar();
      }
    };

    // Carga diferida: solo cuando el contenedor entra en pantalla
    const espera = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          espera.disconnect();
          void iniciar();
        }
      },
      { rootMargin: "200px" },
    );
    espera.observe(el);

    return () => {
      cancelado = true;
      espera.disconnect();
      limpiar?.();
    };
  }, [alListo, alFallar]);

  return <div ref={caja} className="absolute inset-0" />;
}
