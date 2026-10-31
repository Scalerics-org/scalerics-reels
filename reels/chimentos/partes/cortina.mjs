// Sintetiza assets/bgm/cortina.mp3: cortina de programa de chimentos (bajo saltarín, chasquidos,
// golpe de "primicia"), suspenso en el giro y acorde mayor con Scalerics. Determinista.
// Uso (desde reels/chimentos): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 72.6, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR); };
let semilla = 17;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
const bajo = (t0, f, a = 0.22, d = 0.22) => add(t0, d, (t) => a * Math.exp(-t * 9) * (sin(f, t) + 0.3 * sin(f * 2, t)));
const chas = (t0, a = 0.08) => add(t0, 0.06, (t) => a * Math.exp(-t * 70) * rnd());
const bombo = (t0, a) => add(t0, 0.4, (t) => a * Math.exp(-t * 10) * sin(50 + 80 * Math.exp(-t * 25), t));
const plat = (t0, a, d = 1.2) => { let y = 0; add(t0, d, (t) => { const r = rnd(); const v = r - y; y = r; return a * Math.exp(-t * (3 / d)) * v; }); };
const campana = (t0, f, a = 0.06) => add(t0, 0.8, (t) => a * Math.exp(-t * 5) * (sin(f, t) + 0.5 * sin(f * 2.76, t)));
const pad = (t0, d, notas, a) => notas.forEach((fr) => add(t0, d, (t) => a * env(t, d, 0.5, 0.6) * (sin(fr, t) + 0.4 * sin(fr * 2.004, t))));
const B = 60 / 118;
const linea = [55, 55, 82.4, 55, 73.4, 55, 82.4, 98];
const chisme = (t0, t1, f = 1) => {
  for (let t = t0, k = 0; t < t1 - 0.05; t += B / 2, k++) {
    bajo(t, linea[k % 8], 0.2 * f);
    if (k % 4 === 2) chas(t, 0.09 * f);
    if (k % 8 === 0) bombo(t, 0.35 * f);
    if (k % 16 === 15) campana(t, 880, 0.05 * f);
  }
};
// golpe de PRIMICIA
bombo(0.05, 0.6); plat(0.05, 0.12, 1.6);
chisme(0.5, 42.3, 1);
for (const t of [12.4, 19.8, 28.7, 39.6, 40.7]) { bombo(t, 0.45); plat(t, 0.08, 0.8); }
// el giro: suspenso (pad menor + tic tac)
pad(42.4, 8.2, [110, 130.81, 164.81], 0.02);
for (let t = 42.4; t < 50.5; t += B) chas(t, 0.05);
chisme(50.6, 55.9, 0.8);
bombo(54.6, 0.5); plat(54.6, 0.1, 1.4);
// Scalerics: mayor, liviano
pad(56.1, 4.0, [130.81, 164.81, 196], 0.02); pad(60.1, 3.2, [98, 123.47, 146.83], 0.02);
pad(63.2, 3.2, [110, 130.81, 164.81], 0.02); pad(66.3, 6.2, [130.81, 164.81, 196, 261.63], 0.022);
for (let t = 56.1, k = 0; t < 71; t += B, k++) { if (k % 2 === 0) bombo(t, 0.2); else chas(t, 0.05); }
campana(66.3, 1046.5, 0.07); campana(66.6, 1318.5, 0.06);
const tmp = "/tmp/cortina-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
fs.mkdirSync("assets/bgm", { recursive: true });
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -af "aecho=0.8:0.5:40:0.12,afade=t=out:st=71.2:d=1.4" -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/cortina.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/cortina.mp3");
