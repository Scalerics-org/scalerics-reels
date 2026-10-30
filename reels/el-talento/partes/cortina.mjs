// Sintetiza assets/bgm/escenario.mp3: cortina de concurso de talentos (pulso de tensión con bajo y
// cuerdas, redoble de tambor antes del gran final y del botón dorado, chicharra de las X, fanfarria
// dorada con aplausos) y mezcla el público (partes/publico: "uuuh" y "oooh" con varias voces).
// Determinista. Uso (desde reels/el-talento): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 77.0, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };
let semilla = 4242;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
// pad de cuerdas (sierra suavizada) y bajo
const pad = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => amp * env(t, d, 0.4, 0.5) * (sin(fr, t) + 0.5 * sin(fr * 2.003, t) + 0.25 * sin(fr * 3.01, t)) * (1 + 0.15 * sin(5.2, t))));
const bajo = (t0, fr, amp) => add(t0, 0.45, (t) => amp * Math.exp(-t * 7) * (sin(fr, t) + 0.3 * sin(fr * 2, t)) * Math.min(1, t * 300));
const bombo = (t0, amp) => add(t0, 0.35, (t) => amp * Math.exp(-t * 14) * sin(55 + 90 * Math.exp(-t * 30), t));
const tambor = (t0, amp) => add(t0, 0.12, (t) => amp * Math.exp(-t * 40) * (0.6 * rnd() + 0.4 * sin(190, t)));
const redoble = (t0, t1, a0, a1) => { for (let t = t0; t < t1; t += 0.045) tambor(t, a0 + (a1 - a0) * ((t - t0) / (t1 - t0))); };
const platillo = (t0, amp) => { let y = 0; add(t0, 2.2, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * 2.2) * v; }); };
const chicharra = (t0, amp, d = 0.85) => add(t0, d, (t) => amp * env(t, d, 0.005, 0.08) * (Math.sign(sin(98, t)) * 0.6 + Math.sign(sin(147.5, t)) * 0.4) * (0.8 + 0.2 * sin(31, t)));
const aplauso = (t0, d, amp) => { let y = 0; add(t0, d, (t) => { const r = rnd(); y = 0.6 * y + 0.4 * r; const golpes = 0.55 + 0.45 * Math.abs(sin(7.3, t) * sin(11.1, t + 0.3)); return amp * env(t, d, 0.25, 0.9) * (r - y) * golpes; }); };
const brillo = (t0, amp) => [1318.5, 1568, 1975.5, 2637, 3136].forEach((fr, k) => add(t0 + k * 0.07, 1.4, (t) => amp * Math.exp(-t * 3) * sin(fr, t)));

// tensión: A menor con pulso a 120 bpm hasta el giro; más suave en la confesión
const Am = [110, 130.81, 164.81], F = [87.31, 110, 130.81], E = [82.41, 103.83, 123.47], C = [130.81, 164.81, 196], G = [98, 123.47, 146.83];
const PROG = [Am, F, E, Am];
for (let k = 0, t = 0; t < 36.5; k++, t += 2) {
  pad(t, 2.1, PROG[k % 4], 0.018);
  for (let b = 0; b < 4; b++) { bajo(t + b * 0.5, PROG[k % 4][0] / 2, 0.11); if (b % 2 === 0) bombo(t + b * 0.5, 0.22); }
}
// la confesión (36.5 a 42.7): solo pad triste, sin pulso
pad(36.5, 3.2, [87.31, 110, 130.81], 0.02); pad(39.6, 3.2, [82.41, 98, 123.47], 0.02);
// el compañero y el agente (42.7 a 59): mayor y esperanzado, pulso de vuelta
const PROG2 = [C, G, Am, F];
for (let k = 0, t = 42.74; t < 61.2; k++, t += 2) {
  pad(t, 2.1, PROG2[k % 4], 0.018);
  for (let b = 0; b < 4; b++) { bajo(t + b * 0.5, PROG2[k % 4][0] / 2, 0.1); if (b % 2 === 0) bombo(t + b * 0.5, 0.2); }
}
// gran final de Maxi: redoble y platillo en "pulgar"
redoble(18.6, 21.9, 0.05, 0.22); platillo(21.95, 0.25);
// las X: chicharra en cada "no" y triple en "¡Tres X!"
chicharra(28.66, 0.16); chicharra(29.4, 0.16); chicharra(32.3, 0.16);
[33.7, 33.95, 34.2].forEach((t) => chicharra(t, 0.14, 0.22));
// aplausos: presentación de Maxi y del agente
aplauso(7.9, 1.9, 0.32); aplauso(50.6, 1.4, 0.3);
// botón dorado: redoble, fanfarria, brillo y aplausos
redoble(61.0, 62.6, 0.05, 0.2); platillo(62.66, 0.3);
pad(62.66, 4.0, [196, 246.94, 293.66, 392], 0.03); brillo(62.66, 0.05); brillo(63.3, 0.035);
aplauso(62.8, 4.2, 0.4);
// Scalerics: acorde mayor que queda
pad(69.3, 7.5, [130.81, 164.81, 196, 261.63], 0.022);

const tmp = "/tmp/escenario-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
// público: [archivo, segundo, volumen]
const P = [];
const tribuna = (tipo, t0, vol) => ["Puck", "Leda", "Fenrir", "Kore", "Charon", "Aoede"].forEach((v, k) => P.push([`partes/publico/${tipo}-${v}.wav`, t0 + k * 0.07, vol]));
tribuna("uh", 14.45, 0.32); tribuna("uh", 22.35, 0.36); tribuna("oh", 50.55, 0.3); tribuna("oh", 62.85, 0.26);
const ins = P.map(([f]) => `-i ${f}`).join(" ");
const fil = P.map(([, t, v], k) => `[${k + 1}:a]aresample=44100,volume=${v},adelay=${Math.round(t * 1000)}:all=1[p${k}]`).join(";");
const mezcla = `[0:a]${P.map((_, k) => `[p${k}]`).join("")}amix=inputs=${P.length + 1}:normalize=0,aecho=0.8:0.6:60:0.15[o]`;
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} ${ins} -filter_complex "${fil};${mezcla}" -map "[o]" -t ${DUR} -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/escenario.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/escenario.mp3");
