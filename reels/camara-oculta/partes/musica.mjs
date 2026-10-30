// Sintetiza la música (determinista). Uso (desde reels/camara-oculta): node partes/musica.mjs
// - assets/bgm/bromas.mp3: bajo pizzicato "en puntas de pie" de programa de bromas, con cortes
//   en la revelación (34.07), fiesta en "¡Sonreí!", silencio seco en "Ninguna" (42.19) y un
//   acorde mayor cuando entra Scalerics (60.48).
// - assets/sfx/musiquita.mp3: la música que arranca sola en la página de Don Tito (onda cuadrada
//   de página vieja, alegre y molesta).
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100;
const enc = (buf, out, extra = "") => {
  const raw = "/tmp/co-" + process.pid + ".raw";
  const b = Buffer.alloc(buf.length * 2);
  for (let i = 0; i < buf.length; i++) b.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * 32767))), i * 2);
  fs.writeFileSync(raw, b);
  execSync(`ffmpeg -hide_banner -loglevel error -y -f s16le -ar ${SR} -ac 1 -i ${raw} ${extra} -c:a libmp3lame -b:a 160k ${out}`);
  fs.unlinkSync(raw);
};
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (L, t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < L.length; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };

// ---------- bgm ----------
const DUR = 76.7, L = new Float32Array(Math.round(DUR * SR));
const pluck = (t0, m, amp = 0.28, d = 0.32) => add(L, t0, d, (t) => amp * Math.exp(-t * 11) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.35 * Math.sin(4 * Math.PI * hz(m) * t)));
const tick = (t0, amp = 0.05) => { let s = 12345 + Math.round(t0 * 1000); add(L, t0, 0.04, (t) => { s = (s * 1103515245 + 12345) & 0x7fffffff; return amp * Math.exp(-t * 120) * ((s / 0x7fffffff) * 2 - 1); }); };
const BEAT = 60 / 112;
// figura en puntas de pie (Mi menor): negra-corchea, sube y baja
const FIG = [40, null, 43, 44, 45, null, 44, 43, 40, null, 47, null, 46, 45, 44, 43];
const tramo = (a, b, amp = 0.26, trans = 0) => {
  for (let k = 0, t = a; t < b - 0.05; k++, t += BEAT / 2) {
    const m = FIG[k % FIG.length]; if (m !== null) pluck(t, m + trans, amp);
    if (k % 2 === 1) tick(t, 0.035);
  }
};
tramo(0.0, 34.0);
// revelación: acorde de fiesta y tramo más rápido y agudo
const acorde = (t0, ms, amp = 0.09, d = 1.4) => ms.forEach((m) => add(L, t0, d, (t) => amp * Math.exp(-t * 2.4) * (Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(6 * Math.PI * hz(m) * t))));
acorde(35.44, [60, 64, 67, 72], 0.1);
acorde(36.1, [62, 65, 69, 74], 0.08, 0.5);
acorde(37.18, [64, 67, 71, 76], 0.1, 1.6);
tramo(37.2, 42.1, 0.24, 5);
// "Ninguna": silencio seco hasta que Fede cruza
tramo(44.8, 60.3, 0.22, 0);
// Scalerics: acorde mayor y pulso suave
acorde(60.48, [52, 59, 64, 68, 71], 0.08, 3.0);
for (let t = 60.48; t < 75.5; t += BEAT) pluck(t, 40, 0.16, 0.5);
acorde(70.55, [52, 59, 64, 68, 71], 0.07, 3.0);
let pk = 0; for (const v of L) pk = Math.max(pk, Math.abs(v));
for (let i = 0; i < L.length; i++) L[i] = (L[i] / pk) * 0.8;
enc(L, "assets/bgm/bromas.mp3", "-af afade=t=out:st=74.5:d=2.1");

// ---------- musiquita de página vieja ----------
const M = new Float32Array(Math.round(3.6 * SR));
const sq = (fr, t) => (Math.sin(2 * Math.PI * fr * t) >= 0 ? 1 : -1);
const MEL = [72, 76, 79, 84, 79, 76, 77, 81, 84, 81, 79, 76, 74, 77, 76, 72];
MEL.forEach((m, k) => add(M, k * 0.2, 0.19, (t) => 0.22 * Math.min(1, t * 200) * Math.exp(-t * 4) * sq(hz(m), t)));
[48, 53, 55, 48].forEach((m, k) => add(M, k * 0.8, 0.78, (t) => 0.16 * Math.exp(-t * 2) * sq(hz(m), t)));
enc(M, "assets/sfx/musiquita.mp3", "-af afade=t=out:st=3.1:d=0.5");
console.log("listo");
