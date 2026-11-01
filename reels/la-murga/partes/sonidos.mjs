// Sintetiza los sonidos de murga (deterministas, ruido con semilla fija) y la pista de fondo.
//   node partes/sonidos.mjs            -> assets/sfx/{bombo,platillo,redoble,aplausos,abucheo,risas}.mp3
//   node partes/sonidos.mjs fondo      -> assets/bgm/murga.mp3 (marcha camión: bombo + platillo +
//                                         redoblante, público; se corta cuando grita el dueño)
// Los tiempos del fondo salen de assets/voice/palabras.json (índices de palabra fijos: si cambia el
// guion, revisarlos).
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 48000;
let semilla = 7654321;
const rnd = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const ruido = () => rnd() * 2 - 1;
let L, R, N;
const nuevo = (dur) => { N = Math.round(dur * SR); L = new Float32Array(N); R = new Float32Array(N); };

function bombo(t0, g) { // bombo de murga: grave, largo, con parche
  const n = Math.round(0.7 * SR), s0 = Math.round(t0 * SR); let fase = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR, f = 52 + 90 * Math.exp(-t * 26);
    fase += (2 * Math.PI * f) / SR;
    const v = Math.sin(fase) * Math.exp(-t * 5) * g + (i < 120 ? ruido() * 0.25 * g * (1 - i / 120) : 0);
    L[s0 + i] += v; R[s0 + i] += v;
  }
}
function platillo(t0, g, largo = 0.09) { // platillo de murga (de choque, a mano)
  const n = Math.round(largo * 5 * SR), s0 = Math.round(t0 * SR); let p1 = 0, p2 = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR, x = ruido(); const h = x - 2 * p1 + p2; p2 = p1; p1 = x;
    const metal = Math.sin(2 * Math.PI * 5200 * t) * 0.15 + Math.sin(2 * Math.PI * 7300 * t) * 0.1;
    const v = (h * 0.35 + metal) * Math.exp(-t / largo) * g;
    L[s0 + i] += v * 0.85; R[s0 + i] += v * 1.1;
  }
}
function golpeCaja(t0, g) { // redoblante
  const n = Math.round(0.18 * SR), s0 = Math.round(t0 * SR); let lp = 0, fase = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR, x = ruido(); lp += 0.3 * (x - lp); fase += (2 * Math.PI * 210) / SR;
    const v = ((x - lp) * 0.7 * Math.exp(-t * 22) + Math.sin(fase) * 0.4 * Math.exp(-t * 35)) * g;
    L[s0 + i] += v; R[s0 + i] += v * 0.95;
  }
}
function voz(t0, dur, f0, vocal, g, curva) { // una voz del público (formantes)
  const [F1, F2] = vocal === "u" ? [330, 760] : vocal === "a" ? [750, 1250] : [520, 1750];
  const n = Math.round(dur * SR), s0 = Math.round(t0 * SR);
  let fase = 0, b1 = [0, 0], b2 = [0, 0];
  const res = (F, bw) => { const r = Math.exp(-Math.PI * bw / SR); return [2 * r * Math.cos(2 * Math.PI * F / SR), -r * r]; };
  const [a1, a2] = res(F1, 120), [c1, c2] = res(F2, 160);
  const pan = 0.3 + rnd() * 0.4, vib = 4 + rnd() * 2;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR, u = t / dur, f = f0 * curva(u, t) * (1 + 0.015 * Math.sin(2 * Math.PI * vib * t));
    fase = (fase + f / SR) % 1;
    const x = (fase * 2 - 1) * 0.6 + ruido() * 0.15;
    const y1 = x + a1 * b1[0] + a2 * b1[1]; b1 = [y1, b1[0]];
    const y2 = x + c1 * b2[0] + c2 * b2[1]; b2 = [y2, b2[0]];
    const env = Math.min(1, u / 0.12) * Math.pow(Math.min(1, (1 - u) / 0.35), 1.5);
    const v = (y1 * 0.05 + y2 * 0.025) * env * g;
    L[s0 + i] += v * (1 - pan); R[s0 + i] += v * pan;
  }
}
function aplausos(t0, dur, g) {
  const golpes = Math.round(dur * 80);
  for (let k = 0; k < golpes; k++) {
    const t = t0 + rnd() * dur, s0 = Math.round(t * SR), n = Math.round(0.02 * SR);
    const env0 = Math.min(1, (t - t0) / 0.15) * Math.min(1, (t0 + dur - t) / (dur * 0.5)), pan = rnd(); let prev = 0;
    for (let i = 0; i < n && s0 + i < N; i++) { const x = ruido(); const hp = x - prev * 0.7; prev = x; const v = hp * Math.exp(-i / (SR * 0.004)) * g * 0.22 * env0; L[s0 + i] += v * (1 - pan); R[s0 + i] += v * pan; }
  }
}
function murmullo(t0, dur, g) {
  const n = Math.round(dur * SR), s0 = Math.round(t0 * SR); let lp = 0, lp2 = 0;
  for (let i = 0; i < n && s0 + i < N; i++) { const t = i / SR; lp += 0.04 * (ruido() - lp); lp2 += 0.08 * (lp - lp2);
    const env = Math.min(1, t / 0.3) * Math.min(1, (dur - t) / 0.4) * (0.8 + 0.2 * Math.sin(t * 5.3)); const v = lp2 * 1.6 * env * g; L[s0 + i] += v; R[s0 + i] += v * 0.9; }
}
function guardar(ruta, pico = 0.9) {
  let p = 0; for (let i = 0; i < N; i++) p = Math.max(p, Math.abs(L[i]), Math.abs(R[i]));
  const k = pico / (p || 1);
  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * k)) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * k)) * 32767), 46 + i * 4); }
  const tmp = ruta.replace(/\.mp3$/, ".wav");
  fs.writeFileSync(tmp, buf);
  execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -b:a 192k ${ruta}`); fs.unlinkSync(tmp);
}

// la marcha camión: compás de 2/4 en corcheas con semicorcheas; bombo en 1, (y de 2), platillo en
// los contratiempos, redoblante haciendo la "rueda"
const BPM = 112, SEMI = 60 / BPM / 4, BAR = SEMI * 8;
function marcha(desde, hasta, g = 1) {
  for (let b = 0; desde + b * BAR < hasta; b++) {
    const t0 = desde + b * BAR;
    for (let s = 0; s < 8; s++) {
      const t = t0 + s * SEMI; if (t >= hasta) break;
      if (s === 0 || s === 3 || (s === 6 && b % 2 === 0)) bombo(t, (s === 0 ? 0.95 : 0.7) * g);
      if (s === 2 || s === 6) platillo(t, 0.55 * g, 0.07);
      if (s === 4 && b % 2) platillo(t, 0.4 * g, 0.05);
      if (s % 2 === 1 || s === 4) golpeCaja(t, (s === 4 ? 0.45 : 0.25) * g);
    }
  }
}

if (process.argv[2] !== "fondo") {
  fs.mkdirSync("assets/sfx", { recursive: true });
  nuevo(1.0); bombo(0.01, 1); guardar("assets/sfx/bombo.mp3");
  nuevo(1.0); bombo(0.01, 1); platillo(0.01, 0.9, 0.16); guardar("assets/sfx/platillo.mp3");
  nuevo(1.2); for (let i = 0; i < 16; i++) golpeCaja(0.01 + i * 0.045, 0.3 + i * 0.04); bombo(0.75, 1); platillo(0.75, 0.9, 0.14); guardar("assets/sfx/redoble.mp3");
  nuevo(2.6); aplausos(0.02, 2.2, 1); for (let k = 0; k < 10; k++) voz(0.05 + rnd() * 0.2, 1.2 + rnd() * 0.6, (k % 2 ? 230 : 130) * (0.85 + rnd() * 0.4), "e", 0.7, (u) => 1 + 0.2 * Math.sin(u * Math.PI)); guardar("assets/sfx/aplausos.mp3");
  nuevo(2.2); for (let k = 0; k < 20; k++) voz(rnd() * 0.15, 1.6 * (0.8 + rnd() * 0.35), (k % 3 === 0 ? 190 : 105) * (0.85 + rnd() * 0.5), "u", 0.8 + rnd() * 0.4, (u) => 1 - 0.2 * u); murmullo(0, 2.0, 0.5); guardar("assets/sfx/abucheo.mp3");
  nuevo(1.8); for (let k = 0; k < 12; k++) { const f0 = (k % 2 ? 240 : 150) * (0.85 + rnd() * 0.4), ph = rnd() * 6; voz(rnd() * 0.15, 1.3 + rnd() * 0.3, f0, "a", 0.8, (u, t) => 1 + 0.12 * Math.sin(2 * Math.PI * 6 * t + ph)); } guardar("assets/sfx/risas.mp3");
  console.log("sfx listos");
} else {
  const P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
  const VOZ = Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString());
  const DUR = Math.max(VOZ, P.at(-1).end) + 3.2;
  // pare: "¡Eh, pará!" del dueño (corta la marcha); retirada: "¡Retirada!"; orus: entra el narrador
  const T = { pare: P[80].start, retirada: P[116].start + 0.55, orus: P[163].start };
  nuevo(DUR);
  murmullo(0, DUR, 0.12);
  aplausos(0, 1.6, 0.9);
  marcha(0, T.pare - 0.05, 1);                     // el cuplé, hasta que el dueño grita
  bombo(T.pare - 0.05, 0.8);
  marcha(T.retirada, T.orus + 0.2, 0.75);           // la retirada, más suave
  aplausos(T.orus - 0.6, 3.0, 1.1);
  marcha(T.orus + 0.4, DUR - 0.6, 0.35);             // por debajo del cierre
  for (let i = Math.round(DUR * SR) - Math.round(1.2 * SR); i < N; i++) { const f = (N - i) / (1.2 * SR); L[i] *= f; R[i] *= f; }
  fs.mkdirSync("assets/bgm", { recursive: true });
  guardar("assets/bgm/murga.mp3", 0.8);
  console.log("fondo listo", DUR.toFixed(2));
}
