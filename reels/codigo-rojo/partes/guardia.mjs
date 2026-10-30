// Sintetiza assets/bgm/guardia.mp3: los bips del monitor (de partes/latidos.json, los mismos del
// trazo de ambiente.html), un pulso grave tenso, el pitido de la línea plana, la carga del
// desfibrilador y un acorde mayor cuando vuelve el pulso. Determinista.
// Uso (desde reels/codigo-rojo): python3 partes/ambiente.py && node partes/guardia.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 72.9, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR); };
const sin = (fr, t) => Math.sin(2 * Math.PI * fr * t);
const LAT = JSON.parse(fs.readFileSync("partes/latidos.json", "utf8"));
// bip de monitor en cada latido (el pico del trazo cae 0.15 s después del inicio del latido)
for (const [t, a] of LAT) {
  if (a <= 0) continue;
  const fr = t > 60.5 ? 1046.5 : 987.8;
  add(t + 0.15, 0.11, (x) => 0.11 * Math.min(1, a) * sin(fr, x) * Math.min(1, x * 400) * Math.min(1, (0.11 - x) * 60));
  add(t + 0.15, 0.2, (x) => 0.16 * Math.min(1.2, a) * Math.exp(-x * 22) * sin(55, x)); // golpe grave
}
// línea plana: pitido continuo
add(31.67, 4.5, (x) => 0.09 * sin(987.8, x) * Math.min(1, x * 50) * Math.min(1, (4.5 - x) * 3));
// desfibrilador cargando (sube) y la descarga
add(29.2, 1.2, (x) => 0.05 * sin(600 + 2200 * x / 1.2 * (x / 1.2), x) * Math.min(1, (1.2 - x) * 20));
add(30.42, 0.6, (x) => 0.5 * Math.exp(-x * 8) * sin(48 + 30 * Math.exp(-x * 15), x));
// drone tenso hasta el giro, que se abre en el alta
add(0, 60.6, (x) => 0.025 * (sin(73.4, x) + 0.5 * sin(110, x)) * (0.7 + 0.3 * sin(0.2, x)) * Math.min(1, x * 2) * Math.min(1, (60.6 - x) * 2));
const MAYOR = [261.63, 329.63, 392.0, 523.25];
add(60.51, 12.3, (x) => 0.03 * Math.min(1, x * 2) * Math.min(1, (12.3 - x) * 1.2) * MAYOR.reduce((s, fr) => s + sin(fr, x), 0) / 4);
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
const tmp = "/tmp/guardia-" + process.pid + ".wav";
fs.writeFileSync(tmp, buf);
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -c:a libmp3lame -b:a 160k assets/bgm/guardia.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/guardia.mp3");
