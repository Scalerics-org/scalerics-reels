// Sintetiza la música (determinista). Uso (desde reels/manos-a-la-obra): node partes/musica.mjs
// - assets/bgm/manualidades.mp3: cortina de programa infantil de los 90 (xilofón alegre en Do mayor
//   y bajo saltarín) hasta que Raúl se duerme; ahí, cajita de música lenta (canción de cuna);
//   cuando entra Scalerics, un acorde cálido y un pulso suave.
// - assets/sfx/tijera.mp3: tijeretazo de papel. assets/sfx/ronquido.mp3: ronquido de dibujito.
import fs from "node:fs";
import { execSync } from "node:child_process";
const T = JSON.parse(fs.readFileSync("partes/momentos.json", "utf8")); // { duerme, orus, dur }
const SR = 44100;
const enc = (buf, out, extra = "") => {
  const raw = "/tmp/mo-" + process.pid + ".raw";
  const b = Buffer.alloc(buf.length * 2);
  for (let i = 0; i < buf.length; i++) b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * 32767))), i * 2);
  fs.writeFileSync(raw, b);
  execSync(`ffmpeg -hide_banner -loglevel error -y -f s16le -ar ${SR} -ac 1 -i ${raw} ${extra} -c:a libmp3lame -b:a 160k ${out}`);
  fs.unlinkSync(raw);
};
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (L, t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < L.length; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };
let semilla = 777;
const azar = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };

// ---------- bgm ----------
const DUR = T.dur + 0.5, L = new Float32Array(Math.round(DUR * SR));
const xilo = (t0, m, amp = 0.2) => add(L, t0, 0.5, (t) => amp * Math.exp(-t * 9) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.25 * Math.sin(2 * Math.PI * hz(m) * 3.98 * t) * Math.exp(-t * 30)));
const bajo = (t0, m, amp = 0.26) => add(L, t0, 0.3, (t) => amp * Math.exp(-t * 10) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(4 * Math.PI * hz(m) * t)));
const tick = (t0, amp = 0.04) => add(L, t0, 0.03, (t) => amp * Math.exp(-t * 150) * azar());
const caja = (t0, m, amp = 0.12) => add(L, t0, 1.6, (t) => amp * Math.exp(-t * 2.8) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.4 * Math.sin(2 * Math.PI * hz(m) * 2.76 * t) * Math.exp(-t * 8)));
const BEAT = 60 / 128;
// melodía de cortina (Do mayor), 2 compases de 8 corcheas que se repiten con variación
const MEL = [72, 76, 79, 76, 77, 81, 79, null, 76, 79, 84, 79, 77, 74, 72, null, 72, 76, 79, 81, 79, 77, 76, 74, 72, 74, 76, 77, 79, null, 84, null];
const BAJO = [48, 55, 53, 55, 48, 55, 43, 55, 45, 52, 53, 55, 48, 43, 48, null];
for (let k = 0, t = 0.05; t < T.duerme - 0.1; k++, t += BEAT / 2) {
  const m = MEL[k % MEL.length]; if (m !== null) xilo(t, m, 0.17);
  if (k % 2 === 0) { const b = BAJO[(k / 2) % BAJO.length]; if (b !== null) bajo(t, b); }
  if (k % 2 === 1) tick(t);
}
// se durmió: canción de cuna en cajita de música, lenta, hasta Scalerics
const CUNA = [79, 76, 79, 76, 77, 74, 72, null, 76, 77, 79, 84, 79, 76, 77, null];
for (let k = 0, t = T.duerme + 0.2; t < T.orus - 0.4; k++, t += 0.42) { const m = CUNA[k % CUNA.length]; if (m !== null) caja(t, m + 12, 0.1); }
// Scalerics: acorde cálido y pulso suave
const acorde = (t0, ms, amp = 0.07, d = 3.5) => ms.forEach((m) => add(L, t0, d, (t) => amp * Math.min(1, t * 6) * Math.exp(-t * 0.9) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.2 * Math.sin(4 * Math.PI * hz(m) * t))));
const PROG = [[48, 55, 64, 67, 72], [45, 52, 60, 64, 69], [41, 53, 60, 65, 69], [43, 55, 62, 67, 71]];
for (let k = 0, t = T.orus; t < DUR - 1; k++, t += BEAT * 8) acorde(t, PROG[k % 4], 0.05, BEAT * 8 + 0.6);
for (let k = 0, t = T.orus; t < DUR - 1.2; k++, t += BEAT) { bajo(t, PROG[Math.floor(k / 8) % 4][0], 0.14); if (k % 2 === 1) xilo(t, [72, 76, 79, 76][Math.floor(k / 2) % 4] + 12, 0.05); }
let pk = 0; for (const v of L) pk = Math.max(pk, Math.abs(v));
for (let i = 0; i < L.length; i++) L[i] = (L[i] / pk) * 0.8;
enc(L, "assets/bgm/manualidades.mp3", `-af afade=t=out:st=${(DUR - 2).toFixed(2)}:d=2`);

// ---------- tijeretazo ----------
const S = new Float32Array(Math.round(0.35 * SR));
[0, 0.13].forEach((t0) => add(S, t0, 0.12, (t) => 0.6 * Math.exp(-t * 40) * (azar() * 0.7 + 0.3 * Math.sin(2 * Math.PI * 3200 * t))));
enc(S, "assets/sfx/tijera.mp3");

// ---------- ronquido de dibujito ----------
const R = new Float32Array(Math.round(2.4 * SR));
add(R, 0, 1.1, (t) => { const env = Math.sin(Math.PI * t / 1.1); const f = 70 + 25 * Math.sin(2 * Math.PI * 30 * t); return 0.5 * env * (Math.sin(2 * Math.PI * f * t) * 0.6 + azar() * 0.4 * (Math.sin(2 * Math.PI * 34 * t) > 0 ? 1 : 0.2)); });
add(R, 1.3, 0.9, (t) => { const env = Math.sin(Math.PI * t / 0.9); return 0.35 * env * Math.sin(2 * Math.PI * (900 + 600 * t) * t); }); // silbidito de vuelta
enc(R, "assets/sfx/ronquido.mp3");
console.log("listo");
