# DUCH Technologies — Página web

Página de DUCH Technologies: desarrollo web e innovación digital.
Hecha con Next.js 16, Tailwind CSS 4 y Motion (animaciones y efectos ligados al scroll).

## Ver la página en tu computadora

Necesitas [Node.js](https://nodejs.org) 18 o más nuevo.

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Cambiar datos (WhatsApp, correo, proyectos)

Todo está en un solo archivo: `src/lib/negocio.ts`.

- **WhatsApp, correo y TikTok:** las primeras líneas.
- **Portafolio:** la lista `PROYECTOS`. Para agregar uno nuevo, guarda la captura en
  `public/images/portafolio/` y copia el bloque de un proyecto existente.

Los diseños de ejemplo (hamburguesería y peluquería) están en
`public/proyectos/` y se pueden abrir desde el botón "Ver diseño" del portafolio.

## Dónde está cada sección

Cada sección es un archivo en `src/components/`:

| Sección | Archivo |
|---|---|
| Menú superior | `encabezado.tsx` |
| Portada y animación de partículas | `portada.tsx`, `particulas.tsx` |
| Servicios | `servicios.tsx` |
| Portafolio | `portafolio.tsx` |
| Proceso | `proceso.tsx` |
| Cotización | `cotizacion.tsx` |
| Contacto | `contacto.tsx` |
| Pie de página | `pie.tsx` |
| Botones con luz | `boton-luz.tsx` |
| Animaciones reutilizables | `movimiento.tsx` |

Los colores están al inicio de `src/app/globals.css`. Todas las animaciones respetan la
opción "reducir movimiento" del sistema y los efectos de cursor solo aparecen en computadora.

## Publicar

```bash
npm run build
```

Se puede publicar gratis en [Vercel](https://vercel.com): importa este repositorio y
Vercel detecta Next.js solo.
