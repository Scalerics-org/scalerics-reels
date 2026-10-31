// Sintetiza assets/bgm/marcha.mp3: batería de murga de movilización (bombo, platillo, redoblante)
// durante la asamblea, silencio en el minuto de silencio, pad suave en el giro y acorde mayor con
// Scalerics. Determinista. Uso (desde reels/paro-de-post-its): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 75.1, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR); };
let semilla = 31;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
const bombo = (t0, a) => add(t0, 0.45, (t) => a * Math.exp(-t * 9) * sin(48 + 70 * Math.exp(-t * 25), t));
const platillo = (t0, a, d = 0.35) => { let y = 0; add(t0, d, (t) => { const r = rnd(); const v = r - y; y = r; return a * Math.exp(-t * (3 / d)) * v; }); };
const caja = (t0, a) => add(t0, 0.1, (t) => a * Math.exp(-t * 45) * (0.7 * rnd() + 0.3 * sin(210, t)));
const pad = (t0, d, notas, a) => notas.forEach((fr) => add(t0, d, (t) => a * env(t, d, 0.5, 0.6) * (sin(fr, t) + 0.4 * sin(fr * 2.004, t)) * (1 + 0.12 * sin(4.8, t))));
const B = 60 / 112; // negra
const murga = (t0, t1, f = 1) => {
  for (let t = t0, k = 0; t < t1 - 0.05; t += B, k++) {
    if (k % 4 === 0) bombo(t, 0.5 * f);
    if (k % 4 === 1) bombo(t + B / 2, 0.42 * f);
    if (k % 4 === 2) bombo(t, 0.46 * f);
    if (k % 2 === 1) platillo(t, 0.09 * f);
    for (let s = 0; s < 4; s++) caja(t + (s * B) / 4, (s === 0 ? 0.11 : 0.05) * f);
  }
};
murga(0, 37.8, 1);
platillo(2.3, 0.16, 1.4); // ¡paro!
// minuto de silencio: solo un tono grave
pad(37.95, 2.0, [73.42, 110], 0.03);
murga(39.95, 45.8, 0.55);
murga(45.93, 49.4, 1.1);
for (let t = 47.3; t < 48.3; t += 0.06) caja(t, 0.06 + 0.12 * ((t - 47.3) / 1.0));
platillo(48.3, 0.2, 1.6); bombo(48.3, 0.6);
// el giro: pad menor sin batería
pad(49.55, 5.2, [110, 130.81, 164.81], 0.022);
// Scalerics: mayor, pulso liviano
pad(54.63, 4.2, [130.81, 164.81, 196], 0.02); pad(58.8, 4.2, [98, 123.47, 146.83], 0.02);
pad(63.0, 4.7, [110, 130.81, 164.81], 0.02); pad(67.7, 7.4, [130.81, 164.81, 196, 261.63], 0.022);
for (let t = 54.63, k = 0; t < 72; t += B, k++) { if (k % 2 === 0) bombo(t, 0.22); if (k % 2 === 1) platillo(t, 0.04); }
const tmp = "/tmp/marcha-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
fs.mkdirSync("assets/bgm", { recursive: true });
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -af "aecho=0.8:0.5:40:0.12,afade=t=out:st=73.6:d=1.4" -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/marcha.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/marcha.mp3");
