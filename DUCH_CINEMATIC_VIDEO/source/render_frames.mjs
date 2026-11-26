// Renderiza scene.html cuadro a cuadro con Chromium headless (Playwright).
// Uso:
//   node render_frames.mjs --out <dir> [--fps 30] [--workers 4] [--quality 0.95]
//   node render_frames.mjs --out <dir> --stills 0.8,3.5,7   (solo fotogramas sueltos en PNG)
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, arr) => {
  if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
  return acc;
}, []));
const out = resolve(args.out || join(here, '..', 'build', 'frames'));
const fps = Number(args.fps || 30);
const workers = Number(args.workers || 4);
const quality = Number(args.quality || 0.95);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--disable-gpu-vsync'] });
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('pageerror:', e.message); process.exitCode = 1; });
  await page.goto('file://' + join(here, 'scene.html'));
  await page.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  return page;
}
const grab = (page, t, type, q) => page.evaluate(([t, type, q]) => { window.renderFrame(t); return document.getElementById('c').toDataURL(type, q); }, [t, type, q]);
const save = (file, url) => writeFileSync(file, Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));

if (args.stills) {
  const page = await openPage();
  for (const s of String(args.stills).split(',')) {
    const t = Number(s);
    save(join(out, `still_${t.toFixed(2).padStart(5, '0')}.png`), await grab(page, t, 'image/png'));
  }
} else {
  const page0 = await openPage();
  const duration = await page0.evaluate(() => window.DURATION);
  const total = Math.round(duration * fps);
  const pages = [page0, ...await Promise.all(Array.from({ length: workers - 1 }, openPage))];
  let done = 0; const t0 = Date.now();
  await Promise.all(pages.map(async (page, w) => {
    for (let i = w; i < total; i += workers) {
      save(join(out, `f_${String(i).padStart(5, '0')}.jpg`), await grab(page, i / fps, 'image/jpeg', quality));
      if (++done % 60 === 0) console.log(`${done}/${total} cuadros · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
  }));
  console.log(`listo: ${total} cuadros en ${((Date.now() - t0) / 1000).toFixed(1)} s → ${out}`);
}
await browser.close();
