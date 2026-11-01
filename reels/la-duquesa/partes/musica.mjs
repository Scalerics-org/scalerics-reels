// Música de época sintetizada (sin bancos de sonido): un minué de clave en 3/4, re mayor, suave.
// node partes/musica.mjs <dur> <t_scalerics>  ->  assets/bgm/bed.wav (después ffmpeg a bed.mp3)
// 0 -> t_scalerics: minué de clave con bajo; t_scalerics -> fin: lo mismo más brillante (octava arriba y cuerdas).
import fs from "node:fs";
const [DUR, TS] = process.argv.slice(2).map(Number);
const SR = 48000, N = Math.ceil(DUR * SR);
const buf = new Float32Array(N);
const f = (m) => 440 * Math.pow(2, (m - 69) / 12);
// clave: pulsado brillante que decae rápido (suma de armónicos con caída más rápida en los agudos)
const clave = (t0, m, v, len = 1.2) => {
  const fr = f(m), a = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && a + i < N; i++) {
    const t = i / SR, env = Math.min(1, t / 0.002) * Math.exp(-t * 3.2);
    let s = 0;
    for (let h = 1; h <= 6; h++) s += Math.sin(2 * Math.PI * fr * h * t) * Math.exp(-t * h * 1.6) / h;
    buf[a + i] += v * env * s;
  }
};
const cuerdas = (t0, t1, ms, v) => {
  const a = Math.floor(t0 * SR), b = Math.min(N, Math.floor(t1 * SR));
  for (let i = a; i < b; i++) {
    const t = (i - a) / SR, L = (b - a) / SR;
    const env = Math.min(1, t / 0.5) * Math.min(1, (L - t) / 0.5);
    let s = 0;
    for (const m of ms) { const fr = f(m); s += Math.sin(2 * Math.PI * fr * 1.002 * t) + Math.sin(2 * Math.PI * fr * 0.998 * t + 1); }
    buf[i] += v * env * s / ms.length;
  }
};
// D A Bm G | D A D D  (acordes) y una melodía de minué por compás (3 negras)
const AC = [[50, 54, 57], [45, 49, 52], [47, 50, 54], [43, 47, 50], [50, 54, 57], [45, 49, 52], [50, 54, 57], [45, 49, 52]];
const MEL = [[74, 76, 78], [76, 73, 69], [71, 74, 78], [79, 78, 76], [78, 74, 76], [73, 71, 69], [74, 78, 81], [79, 76, 73]];
const B = 60 / 112; // negra
let t = 0, k = 0;
while (t < DUR - 0.3) {
  const luz = t >= TS;
  const ac = AC[k % 8], mel = MEL[k % 8];
  clave(t, ac[0] - 12, 0.16, 1.6);
  [1, 2].forEach((j) => clave(t + j * B, ac[1] - 12 + 12, 0.07, 0.6));
  [1, 2].forEach((j) => clave(t + j * B, ac[2] - 12 + 12, 0.06, 0.6));
  mel.forEach((m, j) => { clave(t + j * B, m - (luz ? 0 : 12), luz ? 0.1 : 0.09, 0.9); if (j === 2) clave(t + j * B + B / 2, mel[0] - (luz ? 0 : 12), 0.05, 0.5); });
  if (luz) cuerdas(t, t + 3 * B + 0.2, ac.map((m) => m + 12), 0.05);
  t += 3 * B; k++;
}
for (let i = 0; i < N; i++) { const tt = i / SR; if (tt > DUR - 1.5) buf[i] *= Math.max(0, (DUR - tt) / 1.5); if (tt < 0.3) buf[i] *= tt / 0.3; }
let pk = 0; for (const x of buf) pk = Math.max(pk, Math.abs(x));
const g = 0.7 / pk;
const out = Buffer.alloc(44 + N * 2);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 2, 4); out.write("WAVEfmt ", 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i] * g)) * 32767), 44 + i * 2);
fs.writeFileSync("assets/bgm/bed.wav", out);
console.log("bed.wav", DUR, "s");
