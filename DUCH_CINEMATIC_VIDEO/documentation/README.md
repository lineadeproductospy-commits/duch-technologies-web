# «El mundo cambió. ¿Y tu negocio?» — DUCH Technologies

Cortometraje vertical de estilo documental sobre cómo internet cambió la forma de
encontrar negocios. DUCH Technologies aparece solo al final, como firma.

| | |
|---|---|
| Archivo final | `video/duch_cinematic_final.mp4` |
| Formato | 1080 × 1920 (9:16), 30 fps, 38 s |
| Vídeo | H.264 High 4.2, yuv420p, BT.709, `faststart` |
| Audio | AAC 256 kbps, 48 kHz estéreo, normalizado a −14 LUFS / −1.5 dBTP, con voz en off |
| Destino | Instagram Reels, TikTok y YouTube Shorts (sin barras ni recortes) |

## Cómo está hecho

La imagen, la música y los efectos se produjeron en local, sin metraje real ni
servicios externos de generación. Las escenas son ilustraciones vectoriales y
procedurales animadas: no son grabaciones reales. La única excepción, pedida por
el cliente, es la **voz en off**, generada con ElevenLabs (ver más abajo).

| Capa | Herramienta | Archivo |
|---|---|---|
| Imagen | Canvas 2D en Chromium headless; cada cuadro sale de `renderFrame(t)` y siempre da el mismo resultado | `source/scene.html` |
| Captura | Playwright, 4 navegadores en paralelo, JPEG calidad 95 | `source/render_frames.mjs` |
| Voz en off | ElevenLabs, voz «Damián» (grave, latinoamericana neutra), modelo eleven_v4, una sola toma | `assets/voz/narracion_original.mp3` |
| Sonido | Síntesis con NumPy: piano, pads, arpegios, percusión, ambiente urbano, efectos y reverberación por convolución | `source/audio.py` |
| Montaje | FFmpeg: encode H.264/AAC y loudnorm | `source/build.sh` |

## Guion visual

| Tiempo | Escena | Texto en pantalla |
|---|---|---|
| 0–2.3 s | La ciudad de noche aparece desde el negro, con un travelling hacia adentro y luces de avenida | «El mundo cambió…» |
| 2.3–5 s | Barrido a la calle: siluetas a contraluz miran el teléfono y se levanta una persiana | «Pero no todos los negocios cambiaron con él.» |
| 5–9 s | Panadería «La Esquina» (desde 1987): el panadero escribe en su cuaderno y los clientes pasan de largo | «Hoy, antes de comprar, las personas buscan, comparan…» |
| 9–10.8 s | Inserto: el cartel gira de ABIERTO a CERRADO y se apagan las luces | «y descubren nuevas oportunidades desde una pantalla.» |
| 10.8–12.9 s | Baja la persiana y se enciende el farol; los peatones van con el teléfono | (continúa) |
| 12.9–14 s | Una línea de luz abre el mundo digital | — |
| 14–23 s | Un teléfono: búsqueda «panadería cerca de mí», resultado, sitio web, catálogo en guaraníes, pedido confirmado. Alrededor flotan paneles de reseñas, mapa y notificación | «La tecnología no reemplazó los buenos negocios.» / «Cambió la manera en que el mundo puede encontrarlos.» |
| 23–32 s | Desde «La Esquina» la cámara se aleja hasta mostrar una ciudad entera de negocios conectados con personas | «Porque tener algo bueno que ofrecer es importante.» / «Pero permitir que las personas lo descubran también lo es.» |
| 32–38 s | Fondo negro: una órbita de luz, la «D» metálica, DUCH TECHNOLOGIES | «El futuro no espera.» · «Construimos experiencias digitales.» |

Retención: el primer texto entra a los 0.3 s. Hay un corte o cambio visual cada
2–4 s. La historia es la de un mismo negocio que primero no se encuentra y
después sí.

## Banda sonora (original)

- **0–13 s**: ciudad (tráfico, autos de paso, murmullo, pasos y bocinas lejanas). Un dron grave y un piano en La menor. Foley: persianas, campanita de la puerta, el cartel que gira, interruptores y el zumbido del farol.
- **12.9–13.3 s**: silencio, un tono ascendente y un impacto que abre lo digital.
- **13.3–32 s**: pulso a 120 BPM (Am–F–C–G) con arpegio, bajo, kick y hi-hat. La intensidad sube por compás. Clics de tecleo y de toque, sonidos de los paneles, el aviso de pedido y destellos de la red. Termina en un riser.
- **32–38 s**: impacto, la órbita, un barrido de luz y un acorde de Do mayor con campanas. Fade final.

## Voz en off

La narración es una sola toma de ElevenLabs (voz «Damián», acento latinoamericano
neutro). `audio.py` la corta frase a frase según la tabla `VOZ_SEGS` y coloca cada
frase sobre su texto en pantalla. La frase «y descubren nuevas oportunidades…»
va al 104 % de velocidad para caber antes del impacto de los 13,3 s. Cada frase se
nivela y se comprime. Mientras habla el narrador, la música baja unos 8,5 dB y el
ambiente unos 7 dB. La voz queda entre 7 y 11 dB por encima del fondo.

Para cambiar de voz, genera una toma nueva con el mismo texto, reemplaza
`assets/voz/narracion_original.mp3` y ajusta los tiempos de `VOZ_SEGS` (los cortes
se encuentran con `ffmpeg -af silencedetect=noise=-40dB:d=0.25`). Si se borra ese
archivo, el video se genera sin narración.

Los stems separados están en `assets/audio/`, para remezclar en cualquier editor:
`stem_ambiente.wav`, `stem_musica.wav`, `stem_efectos.wav`, `stem_voz.wav` y la mezcla
`banda_sonora_mezcla.wav`.

## Reproducir y volver a renderizar

Requisitos: Node 18+ con `playwright` y Chromium, Python 3 con `numpy`, y `ffmpeg`.

```bash
cd DUCH_CINEMATIC_VIDEO/source
```

```bash
./build.sh
```

Variables opcionales: `WORKERS=8` (navegadores en paralelo) y `FRAMES_DIR=/ruta`
(cuadros intermedios; por defecto `build/frames`, que git ignora). Un render
completo tarda unos 90 s con 4 núcleos.

Para previsualizar una escena, abre `source/scene.html` en Chrome y ejecuta
`renderFrame(15.5)` en la consola. Para exportar fotogramas sueltos:

```bash
node render_frames.mjs --out ../build/stills --stills 1,6.5,19.5,36
```

## Cómo editar

- **Textos y tiempos de la narración**: arreglo `CARDS` al final de `scene.html`. Las palabras entre `*asteriscos*` se resaltan en azul.
- **Nombre, productos y precios del negocio de ejemplo**: `PRODUCTS`, `drawScreen()` y `buildShop()`.
- **Duración de cada escena y transiciones**: arreglo `SCENES` (inicio `a`, fin `b` y función `comp` con fundidos, zoom y barrido).
- **Colores de marca**: azul `#087bff`, cian `#00d9ff` y negro `#050914`, los mismos del sitio web.
- **Música**: progresión `prog`, `bars` y las melodías en `audio.py`. Si mueves un evento visual, mueve también su efecto (las marcas de tiempo están comentadas).

## Notas

- El negocio («Panadería La Esquina») y los demás comercios de la red son ficticios y solo ilustran la idea.
- La narración se escucha y también se lee: los textos en pantalla funcionan como subtítulos para quien mira sin sonido.
- Fotogramas clave de referencia en `assets/stills/`.
