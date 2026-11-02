// Sintetiza la "música de ascensor" (melodía propia, sin derechos) y el "ding" del ascensor.
// Correr desde reels/el-ascensor: node partes/musica.mjs -> assets/sfx/ascensor.mp3, assets/sfx/ding.mp3
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 48000;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
function wav(path, buf) {
  const n = buf.length, b = Buffer.alloc(44 + n * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + n * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * 32767))), 44 + i * 2);
  fs.writeFileSync(path, b);
}
// piano eléctrico: seno + armónicos con caída exponencial y un vibrato suave
function nota(buf, t, m, d, vol, dec) {
  const f = hz(m), i0 = Math.round(t * SR), n = Math.round((d + 0.6) * SR);
  for (let i = 0; i < n && i0 + i < buf.length; i++) {
    const s = i / SR, env = Math.min(1, s / 0.01) * Math.exp(-s * (dec || 2.2)) * (s > d ? Math.exp(-(s - d) * 8) : 1);
    const v = 1 + 0.003 * Math.sin(2 * Math.PI * 5 * s);
    buf[i0 + i] += vol * env * (Math.sin(2 * Math.PI * f * v * s) + 0.35 * Math.sin(4 * Math.PI * f * s) * Math.exp(-s * 4) + 0.12 * Math.sin(6 * Math.PI * f * s) * Math.exp(-s * 6));
  }
}
const BPM = 112, b = 60 / BPM;
const L = 8 * 4 * b; // 8 compases
const mus = new Float32Array(Math.round((L + 1) * SR));
// acordes de bossa (Cmaj7 · Am7 · Dm7 · G7) dos vueltas, con síncopa
const ac = [[48, 52, 55, 59], [45, 48, 52, 55], [50, 53, 57, 60], [43, 47, 50, 53]];
for (let c = 0; c < 8; c++) {
  const t0 = c * 4 * b, A = ac[c % 4];
  for (const [o, d] of [[0, 1.4], [1.5, 1], [2.5, 1], [3.5, 0.5]]) A.forEach((m) => nota(mus, t0 + o * b, m, d * b, 0.055, 1.6));
  nota(mus, t0, A[0] - 12, 1.5 * b, 0.12, 1.2); nota(mus, t0 + 2 * b, A[0] - 5, 1.5 * b, 0.1, 1.2);
}
// melodía propia, tranquila y un poco cursi
const mel = [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 1], [3, 71, 1], [4, 69, 1.5], [5.5, 72, 0.5], [6, 76, 2],
  [8, 77, 1.5], [9.5, 76, 0.5], [10, 74, 1], [11, 72, 1], [12, 71, 1.5], [13.5, 74, 0.5], [14, 79, 2],
  [16, 76, 1.5], [17.5, 74, 0.5], [18, 72, 1], [19, 71, 1], [20, 69, 1.5], [21.5, 72, 0.5], [22, 74, 2],
  [24, 77, 1], [25, 76, 1], [26, 74, 1], [27, 71, 1], [28, 72, 3]];
for (const [o, m, d] of mel) nota(mus, o * b, m, d * b, 0.16, 1.1);
let pk = 0; for (const v of mus) pk = Math.max(pk, Math.abs(v));
for (let i = 0; i < mus.length; i++) mus[i] *= 0.7 / pk;
wav("partes/ascensor.wav", mus);
// ding de ascensor: dos campanadas (mi agudo y do)
const ding = new Float32Array(Math.round(2.2 * SR));
nota(ding, 0, 88, 0.6, 0.5, 2.5); nota(ding, 0.38, 84, 1.2, 0.5, 2);
pk = 0; for (const v of ding) pk = Math.max(pk, Math.abs(v));
for (let i = 0; i < ding.length; i++) ding[i] *= 0.8 / pk;
wav("partes/ding.wav", ding);
execSync("ffmpeg -hide_banner -loglevel error -y -i partes/ascensor.wav -af 'lowpass=f=5000,afade=t=out:st=" + (L - 0.4).toFixed(2) + ":d=1' -b:a 160k assets/sfx/ascensor.mp3");
execSync("ffmpeg -hide_banner -loglevel error -y -i partes/ding.wav -b:a 160k assets/sfx/ding.mp3");
console.log("música", L.toFixed(2), "s; ding listo");
