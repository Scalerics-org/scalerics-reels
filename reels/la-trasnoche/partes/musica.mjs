// Música del programa, sintetizada (sin bancos de sonido): node partes/musica.mjs <dur> <t_orus>
// Bolero/lounge de radio de trasnoche: piano eléctrico con trémolo (Am9 Dm9 G13 Cmaj7), bajo
// redondo, un shaker suave y el crujido de una radio AM. Desde t_orus, más luminoso (Cmaj7 Fmaj7
// Dm9 G13). Sale assets/bgm/musica.wav (después ffmpeg a mp3).
import fs from "node:fs";
const [DUR, TS] = process.argv.slice(2).map(Number);
const SR = 48000, N = Math.ceil(DUR * SR);
const buf = new Float32Array(N);
const f = (m) => 440 * Math.pow(2, (m - 69) / 12);
// piano eléctrico (tipo Rhodes): seno + armónico campana, con trémolo
const ep = (t0, m, v, len) => {
  const fr = f(m), a = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && a + i < N; i++) {
    const t = i / SR, env = Math.min(1, t / 0.01) * Math.exp(-t * 0.9) * Math.min(1, (len - t) / 0.3);
    const trem = 1 + 0.25 * Math.sin(2 * Math.PI * 4.5 * t);
    buf[a + i] += v * env * trem * (Math.sin(2 * Math.PI * fr * t) + 0.25 * Math.sin(2 * Math.PI * fr * 2 * t) * Math.exp(-t * 4) + 0.12 * Math.sin(2 * Math.PI * fr * 7 * t) * Math.exp(-t * 12));
  }
};
const bajo = (t0, m, v, len) => {
  const fr = f(m), a = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && a + i < N; i++) {
    const t = i / SR, env = Math.min(1, t / 0.02) * Math.exp(-t * 1.6);
    buf[a + i] += v * env * (Math.sin(2 * Math.PI * fr * t) + 0.2 * Math.sin(4 * Math.PI * fr * t));
  }
};
let seed = 7;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1;
const shaker = (t0, v) => {
  const a = Math.floor(t0 * SR), n = Math.floor(0.09 * SR);
  let lp = 0;
  for (let i = 0; i < n && a + i < N; i++) { const t = i / SR; const x = rnd(); const hp = x - lp; lp = x; buf[a + i] += v * hp * Math.exp(-t * 40); }
};
const NOCHE = [[57, 60, 64, 67, 71], [50, 53, 57, 60, 64], [55, 59, 64, 65, 69], [48, 52, 55, 59, 64]]; // Am9 Dm9 G13 Cmaj7
const LUZ = [[48, 52, 55, 59, 64], [53, 57, 60, 64, 67], [50, 53, 57, 60, 64], [55, 59, 62, 65, 69]];   // Cmaj7 Fmaj7 Dm9 G13
const BEAT = 60 / 72, BAR = BEAT * 4;
for (let k = 0, t = 0; t < DUR; k++, t += BAR) {
  const luz = t >= TS - 0.05;
  const ch = (luz ? LUZ : NOCHE)[k % 4];
  const v = luz ? 0.05 : 0.045;
  // bolero: acorde arpegiado suave en el 1, golpecitos en el "y" del 2 y en el 3
  ch.forEach((m, i) => ep(t + i * 0.03, m, v, BAR * 0.95));
  ep(t + BEAT * 1.5, ch[2] + 12, v * 0.5, BEAT);
  ep(t + BEAT * 2.5, ch[3] + 12, v * 0.45, BEAT);
  bajo(t, ch[0] - 24, 0.16, BEAT * 1.4);
  bajo(t + BEAT * 1.5, ch[0] - 17, 0.11, BEAT);
  bajo(t + BEAT * 2, ch[0] - 24, 0.12, BEAT * 1.4);
  for (let b = 0; b < 8; b++) shaker(t + b * BEAT / 2, b % 2 ? 0.025 : 0.04);
}
// el crujido de la AM: siseo suave + chasquidos espaciados
for (let i = 0; i < N; i++) buf[i] += rnd() * 0.004;
for (let t = 0.3; t < DUR; t += 0.37 + ((Math.round(t * 100) * 37) % 50) / 100) { const a = Math.floor(t * SR); for (let i = 0; i < 40 && a + i < N; i++) buf[a + i] += rnd() * 0.05 * Math.exp(-i / 8); }
// fade in/out
for (let i = 0; i < N; i++) { const t = i / SR; buf[i] *= Math.min(1, t / 0.6) * Math.min(1, (DUR - t) / 1.5); }
let pk = 0;
for (const x of buf) pk = Math.max(pk, Math.abs(x));
const g = 0.8 / pk;
const pcm = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) pcm.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * g * 32767))), i * 2);
const h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
fs.writeFileSync("assets/bgm/musica.wav", Buffer.concat([h, pcm]));
console.log("música lista", DUR, "s, luz desde", TS);
