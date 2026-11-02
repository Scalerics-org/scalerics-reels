// Sintetiza la musiquita del documental de fábrica (estilo "Cómo se hace", solo como referencia):
// marimba saltarina en Do mayor, bajo de fagot en "oom-pa", tic de bloque de madera, 112 BPM.
// En "Las once de la noche" la música se frena como una máquina que se apaga (baja de tono),
// silencio durante la confesión y el giro, y vuelve suave y cálida (pad + marimba lenta) cuando
// entra Scalerics. Determinista. Correr desde reels/como-se-hace:
//   node partes/musica.mjs && ffmpeg -y -i assets/bgm/bed.wav -b:a 192k assets/bgm/bed.mp3
import fs from "node:fs";
const SR = 48000, P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const DUR = P.at(-1).end + 3.4, N = Math.round(SR * DUR);
const L = new Float32Array(N), R = new Float32Array(N);
const ONCE = P[111].start, SCALERICS = P[144].start;
const BPM = 112, NEGRA = 60 / BPM, CORCHEA = NEGRA / 2, COMPAS = NEGRA * 4;
const add = (s, v, pan = 0) => { if (s >= 0 && s < N) { L[s] += v * (1 - pan); R[s] += v * (1 + pan); } };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
// marimba: seno + parcial 4x que decae rápido
function marimba(t0, m, g, pan = 0.15, frena = null) {
  const s0 = Math.round(t0 * SR), f = hz(m); let fase = 0, fase4 = 0;
  for (let i = 0; i < 0.5 * SR; i++) { const t = i / SR; let ff = f; if (frena) ff *= frena(t0 + t);
    fase += 2 * Math.PI * ff / SR; fase4 += 2 * Math.PI * ff * 3.9 / SR;
    add(s0 + i, (Math.sin(fase) * Math.exp(-t * 7) + 0.35 * Math.sin(fase4) * Math.exp(-t * 30)) * Math.min(1, t / 0.002) * g, pan); }
}
// fagot: cuadrada filtrada con vibrato chico
function fagot(t0, m, dur, g, frena = null) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR), f = hz(m); let fase = 0, lp = 0, lp2 = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; let ff = f * (1 + 0.004 * Math.sin(2 * Math.PI * 5 * t)); if (frena) ff *= frena(t0 + t);
    fase += ff / SR; const x = (fase % 1) < 0.5 ? 1 : -1; lp += 0.06 * (x - lp); lp2 += 0.12 * (lp - lp2);
    const env = Math.min(1, t / 0.02) * Math.min(1, (dur - t) / 0.04); add(s0 + i, lp2 * env * g, -0.15); }
}
let sem = 4242; const rnd = () => ((sem = (sem * 1103515245 + 12345) % 2147483648) / 2147483648);
function madera(t0, g) {
  const s0 = Math.round(t0 * SR); let fase = 0;
  for (let i = 0; i < 0.05 * SR; i++) { const t = i / SR; fase += 2 * Math.PI * 1800 / SR; add(s0 + i, (Math.sin(fase) * 0.8 + (rnd() * 2 - 1) * 0.2) * Math.exp(-t * 90) * g, 0.3); }
}
function pad(t0, ms, dur, g) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR);
  for (let i = 0; i < n; i++) { const t = i / SR; const env = Math.min(1, t / 0.8) * Math.min(1, (dur - t) / 1.2);
    let v = 0; for (const m of ms) { const f = hz(m); v += Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 2.002 * t); }
    add(s0 + i, (v / ms.length) * env * g); }
}
// progresión C - Am - F - G; melodía saltarina de corcheas (grados por compás)
const BAJO = [[36, 43], [45, 40], [41, 36], [43, 38]];
const MEL = [[72, 76, 79, 76, 77, 76, 74, 72], [69, 72, 76, 72, 74, 72, 71, 69], [69, 72, 77, 72, 76, 74, 72, 69], [67, 71, 74, 79, 77, 74, 71, 74]];
// cerca del final del documental: la máquina se apaga (el tono cae en 1.1 s)
const FRENO = 1.1;
const frena = (t) => (t < ONCE ? 1 : Math.max(0.3, 1 - 0.7 * ((t - ONCE) / FRENO) ** 1.3));
for (let t = 0, c = 0; t < ONCE + FRENO; t += COMPAS, c++) {
  const k = c % 4;
  for (let b = 0; b < 4; b++) { const tb = t + b * NEGRA; if (tb >= ONCE + FRENO) break;
    fagot(tb, BAJO[k][b % 2] + (b % 2 ? 0 : 0), NEGRA * 0.45, 0.32, frena);
    madera(tb + CORCHEA, tb < ONCE ? 0.13 : 0); }
  for (let e = 0; e < 8; e++) { const te = t + e * CORCHEA; if (te >= ONCE + FRENO) break;
    if (c % 8 >= 4 && e % 2) continue; // respiro cada tanto
    marimba(te, MEL[k][e], 0.2, 0.15, frena); }
}
// Scalerics: pad cálido + marimba lenta (negras), sin percusión
const ACO = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
for (let t = SCALERICS - 0.3, c = 0; t < DUR - 0.5; t += COMPAS, c++) {
  const k = c % 4, d = Math.min(COMPAS + 0.9, DUR - t);
  pad(t, ACO[k], d, 0.11);
  for (let b = 0; b < 4; b++) { const tb = t + b * NEGRA; if (tb < DUR - 1.2) marimba(tb, MEL[k][b * 2], 0.12, -0.1); }
}
// limitar, fade final y escribir wav estéreo 16 bit
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
const g = 0.8 / pico, buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { const fo = Math.min(1, (N - i) / (SR * 1.2));
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g * fo)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g * fo)) * 32767), 46 + i * 4); }
fs.writeFileSync("assets/bgm/bed.wav", buf);
console.log("bed.wav", DUR.toFixed(2), "s; se apaga en", ONCE, "vuelve en", SCALERICS);
