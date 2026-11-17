# DUCH Technologies — Página web

Página de DUCH Technologies: desarrollo web e innovación digital.
Hecha con Next.js 16, Tailwind CSS 4 y Motion.

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

Los diseños de ejemplo (hamburguesería, peluquería, inmobiliaria) están en
`public/proyectos/` y se pueden abrir desde el botón "Ver diseño" del portafolio.

## Publicar

```bash
npm run build
```

Se puede publicar gratis en [Vercel](https://vercel.com): importa este repositorio y
Vercel detecta Next.js solo.
