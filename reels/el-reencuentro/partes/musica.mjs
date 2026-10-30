// Música del programa, sintetizada (sin bancos de sonido): node partes/musica.mjs <dur> <t_musica> <t_ooh> <t_orus>
// 0 → t_musica: colchón suave de cuerdas (la menor), tenso. t_musica → t_ooh: piano triste arpegiado
// (Am F C G) sobre las cuerdas, el "Música, por favor" de la conductora. t_ooh: corte seco ~1 s.
// t_orus → fin: entra Scalerics, mayor y más luminoso (C G Am F), piano más ágil. Sale assets/bgm/musica.wav.
import fs from "node:fs";
const [DUR, TM, TO, TS] = process.argv.slice(2).map(Number);
const SR = 48000, N = Math.ceil(DUR * SR);
const buf = new Float32Array(N);
const f = (m) => 440 * Math.pow(2, (m - 69) / 12);
const piano = (t0, m, v, len = 2.6) => {
  const fr = f(m), a = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && a + i < N; i++) {
    const t = i / SR, env = Math.min(1, t / 0.006) * Math.exp(-t * 2.2);
    buf[a + i] += v * env * (Math.sin(2 * Math.PI * fr * t) + 0.45 * Math.sin(4 * Math.PI * fr * t) * Math.exp(-t * 3) + 0.18 * Math.sin(6 * Math.PI * fr * t) * Math.exp(-t * 5));
  }
};
const cuerdas = (t0, t1, ms, v) => {
  const a = Math.floor(t0 * SR), b = Math.min(N, Math.floor(t1 * SR));
  for (let i = a; i < b; i++) {
    const t = (i - a) / SR, L = (b - a) / SR;
    const env = Math.min(1, t / 0.8) * Math.min(1, (L - t) / 0.6);
    let s = 0;
    for (const m of ms) { const fr = f(m); s += Math.sin(2 * Math.PI * fr * 1.003 * t) + Math.sin(2 * Math.PI * fr * 0.997 * t + 1) + 0.3 * Math.sin(4 * Math.PI * fr * t); }
    buf[i] += v * env * (1 + 0.15 * Math.sin(2 * Math.PI * 5 * t)) * s / ms.length;
  }
};
const TRISTE = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]; // Am F C G
const LUZ = [[48, 52, 55], [55, 59, 62], [57, 60, 64], [53, 57, 60]];   // C G Am F
// 1) colchón tenso
for (let t = 0, k = 0; t < TM; t += 3.2, k++) cuerdas(t, Math.min(TM + 0.4, t + 3.4), TRISTE[k % 2 === 0 ? 0 : 1].map((m) => m - 12), 0.05);
// 2) el piano triste
const B = 60 / 66;
for (let t = TM, k = 0; t < TO - 0.2; t += 4 * B, k++) {
  const ac = TRISTE[k % 4];
  cuerdas(t, Math.min(TO, t + 4 * B + 0.3), ac.map((m) => m - 12), 0.06);
  piano(t, ac[0] - 12, 0.12, 3.5);
  [0, 1, 2, 1, 2, 1, 0, 1].forEach((j, i) => { if (t + i * B / 2 < TO - 0.1) piano(t + i * B / 2, ac[j] + 12, i === 0 ? 0.11 : 0.075); });
  if (k % 2 === 1 && t + 3 * B < TO) piano(t + 3 * B, ac[2] + 24, 0.06);
}
// 3) Scalerics: mayor, más ligero
const B2 = 60 / 96;
for (let t = TS, k = 0; t < DUR - 0.5; t += 4 * B2, k++) {
  const ac = LUZ[k % 4];
  cuerdas(t, Math.min(DUR, t + 4 * B2 + 0.3), ac.map((m) => m - 12), 0.045);
  piano(t, ac[0] - 12, 0.1, 2);
  [0, 1, 2, 1, 0, 2, 1, 2].forEach((j, i) => piano(t + i * B2 / 2, ac[j] + 12, 0.06, 1.4));
}
// fade final
for (let i = 0; i < N; i++) { const t = i / SR; if (t > DUR - 1.5) buf[i] *= Math.max(0, (DUR - t) / 1.5); }
let pk = 0; for (const x of buf) pk = Math.max(pk, Math.abs(x));
const g = 0.8 / pk;
const out = Buffer.alloc(44 + N * 2);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 2, 4); out.write("WAVEfmt ", 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i] * g)) * 32767), 44 + i * 2);
fs.writeFileSync("assets/bgm/musica.wav", out);
console.log("musica.wav", DUR, "s");
