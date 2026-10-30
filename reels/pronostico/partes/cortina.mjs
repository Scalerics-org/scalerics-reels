// Sintetiza assets/bgm/clima.mp3: cortina liviana de segmento del clima (acordes de piano eléctrico
// tipo smooth jazz cada 2 s, bajo suave y hi-hat), truenos en los relámpagos y acorde mayor con
// Scalerics. Determinista. Uso (desde reels/pronostico): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 72.0, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) L[a + i] += f(i / SR); };
const ep = (fr, t) => Math.sin(2 * Math.PI * fr * t + 0.8 * Math.sin(2 * Math.PI * fr * 2 * t) * Math.exp(-t * 3));
const acorde = (t0, notas, amp, dur = 1.9) => notas.forEach((fr) => add(t0, dur, (t) => amp * Math.exp(-t * 1.6) * ep(fr, t) * Math.min(1, t * 300)));
const bajo = (t0, fr, amp) => add(t0, 0.9, (t) => amp * Math.exp(-t * 3) * Math.sin(2 * Math.PI * fr * t) * Math.min(1, t * 200));
const hat = (t0, amp) => { let s = 12345 + Math.round(t0 * 1000); add(t0, 0.06, (t) => { s = (s * 1103515245 + 12345) & 0x7fffffff; return amp * Math.exp(-t * 80) * ((s / 0x7fffffff) * 2 - 1); }); };
const trueno = (t0, amp) => { let s = 777 + Math.round(t0 * 100); let y = 0; add(t0, 2.6, (t) => { s = (s * 1103515245 + 12345) & 0x7fffffff; y = 0.985 * y + 0.015 * ((s / 0x7fffffff) * 2 - 1); return amp * 9 * y * Math.exp(-t * 1.4) * Math.min(1, t * 30) * (1 + 0.6 * Math.sin(2 * Math.PI * 3 * t)); }); };
// progresión Fmaj7 - Em7 - Dm7 - G7 (en Hz)
const P = [[174.61, 220.0, 261.63, 329.63], [164.81, 196.0, 246.94, 293.66], [146.83, 174.61, 220.0, 261.63], [196.0, 246.94, 293.66, 349.23]];
const B = [87.31, 82.41, 73.42, 98.0];
const FIN = 63.4;
for (let k = 0, t = 0; t < FIN; k++, t += 2) {
  acorde(t, P[k % 4], 0.035); acorde(t + 1.25, P[k % 4].map((f) => f * 2), 0.012, 0.6);
  bajo(t, B[k % 4], 0.12); bajo(t + 1.0, B[k % 4] * 1.5, 0.07);
}
for (let t = 0.5; t < FIN; t += 0.5) hat(t, 0.035);
// truenos con los relámpagos
trueno(6.85, 0.5); trueno(20.23, 0.35); trueno(43.74, 0.55); trueno(38.6, 0.25);
// Scalerics: acorde mayor que queda
const MAYOR = [196.0, 246.94, 293.66, 392.0];
acorde(63.51, MAYOR, 0.06, 3.5);
add(63.51, 8.4, (t) => 0.03 * Math.min(1, t * 2) * Math.min(1, (8.4 - t) * 1.5) * MAYOR.reduce((s, fr) => s + Math.sin(2 * Math.PI * fr * t), 0) / 4);
const tmp = "/tmp/clima-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -c:a libmp3lame -b:a 160k assets/bgm/clima.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/clima.mp3");
