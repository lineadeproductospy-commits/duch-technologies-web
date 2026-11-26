#!/usr/bin/env bash
# Pipeline completo: audio → cuadros → MP4 final → verificación.
# Requisitos locales: node + playwright (Chromium), python3 + numpy, ffmpeg.
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"
FRAMES="${FRAMES_DIR:-$ROOT/build/frames}"
WORKERS="${WORKERS:-4}"

echo "▸ 1/4 Banda sonora (síntesis local)"
python3 audio.py "$ROOT/assets/audio"

echo "▸ 2/4 Cuadros 1080×1920 @30 fps"
mkdir -p "$FRAMES"
node render_frames.mjs --out "$FRAMES" --workers "$WORKERS"

echo "▸ 3/4 Codificación H.264 + AAC (perfil para Reels / TikTok / Shorts)"
mkdir -p "$ROOT/video"
ffmpeg -y -hide_banner -loglevel warning \
  -framerate 30 -i "$FRAMES/f_%05d.jpg" \
  -i "$ROOT/assets/audio/banda_sonora_mezcla.wav" \
  -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 17 -maxrate 16M -bufsize 32M \
  -profile:v high -level:v 4.2 -pix_fmt yuv420p -r 30 \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 256k -ar 48000 \
  -t 38 -movflags +faststart \
  -metadata title="El mundo cambió. ¿Y tu negocio?" -metadata artist="DUCH Technologies" \
  "$ROOT/video/duch_cinematic_final.mp4"

echo "▸ 4/4 Verificación"
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,sample_rate,channels:format=duration,size,bit_rate \
  -of default=nw=1 "$ROOT/video/duch_cinematic_final.mp4"
ffmpeg -hide_banner -v error -i "$ROOT/video/duch_cinematic_final.mp4" -f null - && echo "✔ decodificación completa sin errores"
