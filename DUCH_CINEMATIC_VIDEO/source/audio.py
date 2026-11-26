"""Banda sonora original de «El mundo cambió» — síntesis 100 % local con NumPy.

Genera tres stems (ambiente, música, efectos) y la mezcla final, sincronizados
con los eventos de scene.html. Uso:
    python3 audio.py <carpeta_salida>
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48000
DUR = 38.0
N = int(SR * DUR)
rng = np.random.default_rng(20261126)
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "../assets/audio")
OUT.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------- utilidades
class Bus:
    """Pista estéreo con envío a reverberación."""

    def __init__(self):
        self.d = np.zeros((2, N))
        self.r = np.zeros((2, N))

    def add(self, sig, t0, gain=1.0, pan=0.0, rev=0.0):
        sig = np.atleast_2d(sig)
        if sig.shape[0] == 1:
            sig = np.vstack([sig, sig])
        i = int(round(t0 * SR))
        if i < 0:
            sig, i = sig[:, -i:], 0
        if i >= N:
            return
        n = min(sig.shape[1], N - i)
        a = (pan + 1) * np.pi / 4
        g = np.array([[np.cos(a)], [np.sin(a)]]) * np.sqrt(2) * gain
        self.d[:, i:i + n] += sig[:, :n] * g
        if rev:
            self.r[:, i:i + n] += sig[:, :n] * g * rev


def tt(dur):
    return np.arange(int(dur * SR)) / SR


def fftfilt(x, lo=None, hi=None, order=2):
    n = x.shape[-1]
    X = np.fft.rfft(x, axis=-1)
    f = np.fft.rfftfreq(n, 1 / SR)
    g = np.ones_like(f)
    if hi:
        g /= np.sqrt(1 + (f / hi) ** (2 * order))
    if lo:
        g /= np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** (2 * order))
    return np.fft.irfft(X * g, n, axis=-1)


def norm(x, peak=1.0):
    m = np.max(np.abs(x))
    return x * (peak / m) if m > 0 else x


def sweep_noise(dur, f0, f1, bw=0.7, curve=None):
    """Ruido con filtro pasa-banda que barre de f0 a f1 (whoosh, risers, autos)."""
    n = int(dur * SR)
    F = 2048
    hop = 512
    x = rng.standard_normal(n + F)
    out = np.zeros(n + F)
    win = np.hanning(F)
    freqs = np.maximum(np.fft.rfftfreq(F, 1 / SR), 1)
    for s in range(0, n, hop):
        p = s / n
        p = curve(p) if curve else p
        fc = f0 * (f1 / f0) ** p
        g = np.exp(-0.5 * (np.log2(freqs / fc) / bw) ** 2)
        out[s:s + F] += np.fft.irfft(np.fft.rfft(x[s:s + F] * win) * g) * win
    return norm(out[:n])


def env_bell(n, peak=0.5, power=2.0):
    x = np.linspace(0, 1, n)
    a = np.where(x < peak, x / peak, (1 - x) / (1 - peak))
    return np.clip(a, 0, 1) ** power


def adsr(n, a=0.01, r=0.3):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na) ** 1.5
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 1.5
    return e


def hz(note):
    names = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
    name, octv = note[:-1], int(note[-1])
    return 440.0 * 2 ** ((names[name] + 12 * (octv + 1) - 69) / 12)


# ---------------------------------------------------------------- instrumentos
def piano(freq, dur=5.0, vel=1.0):
    t = tt(dur)
    s = np.zeros_like(t)
    for k in range(1, 10):
        fk = freq * k * np.sqrt(1 + 0.00035 * k * k)
        if fk > 15000:
            break
        tau = 3.2 / (1 + 0.7 * (k - 1)) * (330 / freq) ** 0.35
        s += (1 / k ** 1.25) * np.exp(-t / tau) * np.sin(2 * np.pi * fk * t + rng.random() * 6)
    s *= 1 - np.exp(-t / 0.003)
    hn = int(0.015 * SR)
    s[:hn] += rng.standard_normal(hn) * np.exp(-np.arange(hn) / (0.002 * SR)) * 0.04
    s *= adsr(len(t), 0.0, 0.4)
    return s * vel


def pluck(freq, dur=0.6, bright=1.0):
    t = tt(dur)
    s = np.zeros_like(t)
    for k in range(1, 14):
        fk = freq * k
        if fk > 14000:
            break
        s += (1 / k) * np.exp(-t * (7 + k * k * 1.2 / bright)) * np.sin(2 * np.pi * fk * t)
    return s * (1 - np.exp(-t / 0.002))


def pad(freqs, dur, att=1.2, rel=1.6, c0=900, c1=None, harm=16):
    t = tt(dur)
    fc = c0 if c1 is None else np.linspace(c0, c1, len(t))
    out = np.zeros((2, len(t)))
    for f in freqs:
        for ci, cents in enumerate((-8, 0, 7)):
            fv = f * 2 ** (cents / 1200)
            ph = rng.random() * 6
            v = np.zeros_like(t)
            for k in range(1, harm + 1):
                fk = fv * k
                if fk > 12000:
                    break
                v += (1 / k) / np.sqrt(1 + (fk / fc) ** 4) * np.sin(2 * np.pi * fk * t + ph * k)
            if ci == 0:
                out[0] += v
            elif ci == 2:
                out[1] += v
            else:
                out += v * 0.7
    out *= adsr(len(t), att, rel)
    return out / (len(freqs) * 3)


def kick(f0=115, f1=44, decay=0.24, dur=0.6):
    t = tt(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.035)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / decay)
    s[:240] += rng.standard_normal(240) * np.exp(-np.arange(240) / 40) * 0.25
    return s


def impact(dur=4.0, f0=75, f1=27):
    t = tt(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.12)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 1.3)
    nz = fftfilt(rng.standard_normal(len(t)), hi=500) * np.exp(-t / 0.35)
    air = fftfilt(rng.standard_normal(len(t)), lo=3000) * np.exp(-t / 0.6)
    return norm(boom) + 0.5 * norm(nz) + 0.06 * norm(air)


def hat(dur=0.06):
    t = tt(dur)
    return fftfilt(rng.standard_normal(len(t)), lo=7000) * np.exp(-t / 0.018)


def snare(dur=0.3):
    t = tt(dur)
    nz = fftfilt(rng.standard_normal(len(t)), lo=1200, hi=7000) * np.exp(-t / 0.09)
    tone = np.sin(2 * np.pi * 185 * t) * np.exp(-t / 0.05)
    return norm(nz) * 0.7 + tone * 0.4


def bell(freq, dur=3.0):
    t = tt(dur)
    s = np.zeros_like(t)
    for ratio, amp, tau in ((1, 1, 1.4), (2.0, .35, .9), (2.76, .3, .6), (5.4, .12, .25), (8.93, .05, .12)):
        s += amp * np.exp(-t / tau) * np.sin(2 * np.pi * freq * ratio * t)
    return s * (1 - np.exp(-t / 0.001))


def click(freq=2200, dur=0.03, nz=0.5):
    t = tt(dur)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.004)
    s += nz * fftfilt(rng.standard_normal(len(t)), lo=2500) * np.exp(-t / 0.002)
    return s


def rattle(dur, rate0, rate1, seed_gain=1.0):
    """Persiana metálica: ráfaga de golpecitos metálicos."""
    out = np.zeros(int(dur * SR) + SR // 4)
    t = 0.0
    while t < dur:
        p = t / dur
        rate = rate0 + (rate1 - rate0) * p
        i = int(t * SR)
        tk = tt(0.05)
        s = fftfilt(rng.standard_normal(len(tk)), lo=1200, hi=6000) * np.exp(-tk / 0.004)
        for f in (870, 1430, 2290, 3170):
            s += 0.18 * np.sin(2 * np.pi * f * (1 + rng.normal(0, .02)) * tk) * np.exp(-tk / 0.025)
        out[i:i + len(s)] += s * (0.6 + 0.4 * rng.random()) * seed_gain
        t += (1 / rate) * (0.7 + 0.6 * rng.random())
    rum = fftfilt(rng.standard_normal(len(out)), lo=60, hi=400) * 0.3
    return norm(out + rum * env_bell(len(out), .5, .5))


def step(gain=1.0):
    tk = tt(0.12)
    s = fftfilt(rng.standard_normal(len(tk)), lo=60, hi=380) * np.exp(-tk / 0.025)
    s += 0.25 * fftfilt(rng.standard_normal(len(tk)), lo=1500, hi=5000) * np.exp(-tk / 0.012)
    return s * gain


# ---------------------------------------------------------------- reverberación
def reverb(x, seconds=3.2, tau=0.7, hi=6000):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = np.vstack([rng.standard_normal(n), rng.standard_normal(n)]) * np.exp(-t / tau)
    ir = fftfilt(ir, lo=120, hi=hi)
    ir[:, :int(0.012 * SR)] = 0
    ir /= np.sqrt(np.sum(ir ** 2, axis=1, keepdims=True))
    m = 1 << int(np.ceil(np.log2(N + n)))
    y = np.fft.irfft(np.fft.rfft(x, m, axis=-1) * np.fft.rfft(ir, m, axis=-1), m, axis=-1)[:, :N]
    return y


AMB, MUS, SFX = Bus(), Bus(), Bus()

# ================================================================ AMBIENTE URBANO
T = np.arange(N) / SR
rumble = fftfilt(np.cumsum(rng.standard_normal(N)), lo=25, hi=220)
traffic = fftfilt(rng.standard_normal((2, N)), lo=180, hi=1400)
lfo = 0.6 + 0.25 * np.sin(2 * np.pi * 0.11 * T) + 0.15 * np.sin(2 * np.pi * 0.37 * T + 1)
murmur = fftfilt(rng.standard_normal((2, N)), lo=280, hi=1300)
am = fftfilt(rng.standard_normal(N), hi=5)
am = 0.5 + 0.5 * norm(am)
city = 0.55 * norm(rumble) + 0.35 * norm(traffic) * lfo + 0.22 * norm(murmur) * am
# automatización: ciudad → panadería → inserto amortiguado (vidrio) → noche → silencio
gain = np.interp(T, [0, .9, 2.3, 4.8, 5.2, 8.95, 9.05, 10.55, 10.8, 12.2, 12.85, 13, DUR],
                 [0, 1, 1, 1, .75, .75, .35, .35, .6, .55, 0, 0, 0])
city_lp = fftfilt(city, hi=650)
glass = np.interp(T, [0, 8.95, 9.05, 10.55, 10.8, DUR], [0, 0, 1, 1, 0, 0])
AMB.add(city * gain * (1 - glass) + city_lp * gain * glass, 0, 0.42)
for t0, d, pan0, g in ((0.6, 2.8, -.9, .5), (3.0, 2.4, .9, .45), (6.1, 3.0, -.8, .35), (7.9, 2.6, .8, .3), (11.3, 2.2, -.7, .35)):
    car = sweep_noise(d, 1100, 420, bw=1.1) * env_bell(int(d * SR), .5, 1.6)
    pans = np.linspace(pan0, -pan0, len(car))
    AMB.add(np.vstack([car * np.cos((pans + 1) * np.pi / 4), car * np.sin((pans + 1) * np.pi / 4)]) * 1.4, t0, g, rev=.15)
for t0 in (1.75, 7.1):
    th = tt(0.5)
    horn = sum(np.sign(np.sin(2 * np.pi * f * th)) for f in (349.2, 440.0)) * adsr(len(th), .03, .2)
    AMB.add(fftfilt(horn, hi=1200), t0, 0.025, pan=-.5, rev=.7)
# pasos
for t0, t1, rate, g, pan in ((2.3, 4.95, 3.6, .5, 0), (5.1, 8.9, 2.1, .4, -.3), (10.7, 12.6, 2.4, .4, .3)):
    t = t0
    while t < t1:
        AMB.add(step(), t, g * (0.6 + 0.4 * rng.random()), pan=pan + rng.normal(0, .3), rev=.12)
        t += 1 / rate * (0.8 + 0.4 * rng.random())

# ================================================================ MÚSICA
# — Escena 1: dron y primera nota (gancho)
MUS.add(pad([hz("A1"), hz("E2")], 5.4, att=0.4, rel=1.2, c0=300), 0.0, 0.55, rev=.3)
MUS.add(piano(hz("A4"), 5.0, .8), 0.32, 0.30, pan=.1, rev=.8)
MUS.add(piano(hz("E4"), 5.0, .7), 0.32, 0.16, pan=-.1, rev=.8)
MUS.add(piano(hz("C5"), 4.0, .7), 2.78, 0.22, pan=.15, rev=.8)
MUS.add(piano(hz("B4"), 4.0, .6), 3.85, 0.16, pan=-.1, rev=.8)
# — Escena 2: piano melancólico sobre cuerdas suaves (La menor)
for chord, t0, d in ((["A2", "E3", "A3"], 5.0, 3.6), (["F2", "C3", "A3"], 8.4, 2.7), (["C3", "G3", "E4"], 10.9, 2.0)):
    MUS.add(pad([hz(n) for n in chord], d + 0.4, att=.9, rel=1.0, c0=700), t0, 0.3, rev=.35)
    MUS.add(piano(hz(chord[0]), 4.5, .9), t0, 0.2, pan=-.2, rev=.6)
for note, t0, v in (("E4", 5.0, .8), ("C5", 5.9, .75), ("B4", 6.8, .7), ("A4", 7.6, .7), ("A4", 8.4, .7), ("C5", 9.2, .75),
                    ("E5", 10.0, .8), ("D5", 10.9, .7), ("C5", 11.6, .65), ("B4", 12.2, .7)):
    MUS.add(piano(hz(note), 4.0, v), t0, 0.22, pan=.15, rev=.75)
# — Escena 3 y 4: pulso digital a 120 BPM
B0 = 13.32
BEAT = 0.5
prog = [("A", ["A2", "C3", "E3"], ["A3", "C4", "E4", "A4"]), ("F", ["F2", "A2", "C3"], ["F3", "A3", "C4", "F4"]),
        ("C", ["C3", "E3", "G3"], ["C4", "E4", "G4", "C5"]), ("G", ["G2", "B2", "D3"], ["G3", "B3", "D4", "G4"])]
bars = [0, 1, 2, 3, 0, 1, 2, 3, 0, 3]  # compases de 2 s: 13.32 → 31.95 (el último, dominante, se corta antes del impacto)
pattern = [0, 1, 2, 3, 2, 1, 2, 3]
for b, ci in enumerate(bars):
    t_bar = B0 + b * 2 * 2 * BEAT
    _, low, arp = prog[ci]
    last = t_bar + 2.0 > 31.9
    span = min(2.0, 31.95 - t_bar)
    if span <= 0:
        break
    intensity = min(1.0, 0.35 + b * 0.09)
    MUS.add(pad([hz(n) for n in low] + [hz(arp[2])], span + .6, att=.25 if b else .05, rel=.5,
                c0=500 + b * 260, c1=700 + b * 320), t_bar, 0.45 + 0.07 * min(b, 8), rev=.35)
    # bajo pulsante
    for q in range(4):
        tq = t_bar + q * BEAT
        if tq >= 31.95:
            break
        MUS.add(pluck(hz(low[0]) / 2, 0.45, bright=.4) * 1.0, tq, 0.42 * intensity)
    # arpegio en semicorcheas
    for s in range(16):
        ts = t_bar + s * BEAT / 4
        if ts >= 31.95:
            break
        f = hz(arp[pattern[s % 8]]) * (2 if b >= 5 and s % 4 == 3 else 1)
        MUS.add(pluck(f, 0.5, bright=0.6 + 0.2 * b), ts, 0.11 * (1.15 if s % 4 == 0 else .8) * (0.7 + 0.3 * intensity),
                pan=0.45 * np.sin(s * 0.8), rev=.45)
    # percusión
    if b >= 1:
        for q in range(4):
            tq = t_bar + q * BEAT
            if tq < 31.95:
                MUS.add(kick(), tq, 0.62 if b < 5 else 0.75)
    if b >= 2:
        for q in range(4):
            tq = t_bar + q * BEAT + BEAT / 2
            if tq < 31.95:
                MUS.add(hat(), tq, 0.12, pan=.3, rev=.1)
    if b >= 6:
        for q in (1, 3):
            tq = t_bar + q * BEAT
            if tq < 31.95:
                MUS.add(snare(), tq, 0.2, rev=.5)
# melodía de campanas en la reflexión (escena 4)
for note, t0 in (("E5", 23.32), ("C5", 24.32), ("G5", 25.32), ("E5", 26.32), ("D5", 27.32), ("B4", 28.32), ("C5", 29.32), ("E5", 30.32)):
    MUS.add(bell(hz(note), 2.5), t0, 0.07, pan=.2, rev=.8)
# — Escena 5: resolución
MUS.add(pad([hz("C3"), hz("G3"), hz("D4"), hz("E4")], 6.0, att=1.4, rel=2.6, c0=600, c1=1500), 32.2, 0.55, rev=.6)
MUS.add(pad([hz("C2")], 6.0, att=.8, rel=2.6, c0=250), 32.0, 0.6, rev=.2)
for note, t0, g in (("G4", 33.05, .1), ("E5", 35.0, .11), ("G5", 35.75, .09), ("C6", 36.4, .06)):
    MUS.add(bell(hz(note), 3.5), t0, g, pan=.1, rev=.9)
MUS.add(piano(hz("C4"), 5.0, .8), 35.0, 0.16, rev=.9)
MUS.add(piano(hz("G4"), 5.0, .7), 35.0, 0.12, rev=.9)

# ================================================================ EFECTOS
SFX.add(sweep_noise(0.6, 300, 3500, bw=.9) * env_bell(int(.6 * SR), .7, 1.5), 2.05, 0.30, pan=.6, rev=.25)          # whip
SFX.add(rattle(1.8, 30, 18), 2.6, 0.13, pan=.2, rev=.3)                                                                 # persiana sube
SFX.add(sweep_noise(1.0, 2500, 400, bw=1.0) * env_bell(int(1.0 * SR), .25, 1.5), 4.75, 0.20, rev=.4)                 # caída a negro
SFX.add(impact(2.5, 60, 30), 5.0, 0.18, rev=.3)
SFX.add(click(1200, 0.04, .8), 8.98, 0.12)                                                                              # corte al inserto
SFX.add(bell(hz("E6"), 1.6) + .6 * bell(hz("B6"), 1.6), 9.45, 0.08, pan=.3, rev=.6)                                  # campanita de puerta
SFX.add(sweep_noise(0.35, 1800, 800, bw=.8) * env_bell(int(.35 * SR), .4, 1), 9.6, 0.25, rev=.2)                    # giro del cartel
SFX.add(click(900, .05, 1.0), 10.02, 0.25, rev=.2)
SFX.add(click(700, .04, 1.2), 10.17, 0.3, rev=.35)                                                                      # interruptores
SFX.add(click(650, .04, 1.2), 10.36, 0.26, rev=.35)
th = tt(0.4)
buzz = sum(np.sin(2 * np.pi * 100 * k * th) / k for k in range(1, 8)) * (rng.random(len(th)) > 0.5).repeat(1)[:len(th)]
SFX.add(fftfilt(buzz, hi=3000) * adsr(len(th), .01, .05), 10.9, 0.05, pan=.7, rev=.3)                                # farol
SFX.add(rattle(1.55, 16, 34), 11.0, 0.15, pan=-.1, rev=.35)                                                             # persiana baja
SFX.add(kick(90, 40, .3, dur=.37) + 0.4 * rattle(.12, 60, 60), 12.55, 0.4, rev=.5)                                              # golpe metálico
SFX.add(sweep_noise(0.45, 200, 6000, bw=.6, curve=lambda p: p ** 2) * np.linspace(0, 1, int(.45 * SR)) ** 2, 12.88, 0.22, rev=.3)
tr_ = tt(0.42)
SFX.add(np.sin(2 * np.pi * np.cumsum(200 * 8 ** (tr_ / .42)) / SR) * (tr_ / .42) ** 2, 12.9, 0.06, rev=.4)         # tono ascendente
SFX.add(impact(4.0), 13.32, 0.55, rev=.45)
SFX.add(bell(hz("A6"), 2.5) * .5 + bell(hz("E6"), 2.5) * .5, 13.34, 0.07, rev=.9)
# interfaz
q = "panadería cerca de mí"
for i in range(len(q)):
    SFX.add(click(2600 + rng.random() * 900, .025, .9), 14.45 + i * 1.55 / len(q), 0.08 * (0.7 + 0.3 * rng.random()), pan=rng.normal(0, .15))
for t0 in (16.2, 16.32, 16.44):
    SFX.add(sweep_noise(.18, 900, 2600, bw=.6) * env_bell(int(.18 * SR), .3, 1), t0, 0.06, rev=.2)
for t0, p in ((16.75, -.6), (18.0, .6), (18.45, -.6), (19.2, .6), (22.05, -.2)):
    SFX.add(bell(hz("E6"), .6) * .6 + bell(hz("B6"), .6) * .4, t0, 0.035, pan=p, rev=.6)                               # paneles
for t0 in (17.25, 20.9, 21.7):
    SFX.add(click(1700, .03, .4), t0, 0.22)
SFX.add(sweep_noise(.45, 700, 3000, bw=.8) * env_bell(int(.45 * SR), .4, 1.2), 17.5, 0.12, rev=.2)
SFX.add(sweep_noise(1.4, 500, 1400, bw=1.2) * env_bell(int(1.4 * SR), .5, 1.2), 18.9, 0.05)
SFX.add(bell(hz("C6"), .7), 20.95, 0.06)
SFX.add(bell(hz("E5"), 1.5), 22.0, 0.09, rev=.5)
SFX.add(bell(hz("A5"), 1.8), 22.12, 0.1, rev=.5)
SFX.add(sweep_noise(.55, 400, 5000, bw=.8, curve=lambda p: p ** 1.6) * np.linspace(0, 1, int(.55 * SR)) ** 1.5, 22.6, 0.3, rev=.3)
SFX.add(impact(3.0, 65, 32) * .6 + bell(hz("E6"), 3.0) * .15, 23.08, 0.35, rev=.6)
# pings de la red
pings = np.sort(rng.uniform(23.6, 30.8, 34))
penta = [hz(n) for n in ("A5", "C6", "D6", "E6", "G6", "A6")]
for i, t0 in enumerate(pings):
    SFX.add(bell(penta[i % len(penta)], .5), t0, 0.012 + 0.01 * (t0 - 23) / 8, pan=rng.uniform(-.8, .8), rev=.7)
SFX.add(sweep_noise(1.65, 150, 7000, bw=.7, curve=lambda p: p ** 1.8) * np.linspace(0, 1, int(1.65 * SR)) ** 2.2, 30.3, 0.35, rev=.3)
SFX.add(impact(5.0, 70, 26), 32.0, 0.7, rev=.6)
SFX.add(sweep_noise(1.0, 600, 4000, bw=.7) * env_bell(int(1.0 * SR), .6, 1.2), 32.05, 0.12, pan=-.3, rev=.5)          # órbita
SFX.add(sweep_noise(.7, 3000, 9000, bw=.5) * env_bell(int(.7 * SR), .5, 1.5), 33.75, 0.08, pan=.3, rev=.6)            # barrido de luz
SFX.add(click(3200, .03, .3), 33.55, 0.05, rev=.6)

# ================================================================ MEZCLA
stems = {}
for name, bus, rv in (("ambiente", AMB, (2.4, .45)), ("musica", MUS, (3.6, .9)), ("efectos", SFX, (2.8, .6))):
    stems[name] = bus.d + 0.55 * reverb(bus.r, *rv)
mix = 0.9 * stems["ambiente"] + 1.0 * stems["musica"] + 1.0 * stems["efectos"]
mix = fftfilt(mix, lo=28, order=2)
fade = np.interp(T, [0, 0.02, DUR - 0.6, DUR], [0, 1, 1, 0])
mix *= fade
mix = np.tanh(1.3 * norm(mix, 0.95)) / np.tanh(1.3)
mix = norm(mix, 10 ** (-1 / 20))


def write(path, x):
    x = np.clip(x, -1, 1)
    data = (x.T * 32767).astype("<i2").tobytes()
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data)


for name, s in stems.items():
    write(OUT / f"stem_{name}.wav", norm(s * fade, 0.89))
write(OUT / "banda_sonora_mezcla.wav", mix)
print("audio listo:", OUT)
