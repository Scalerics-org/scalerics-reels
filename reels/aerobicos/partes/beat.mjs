// Sintetiza la música de la clase: beat de aeróbicos de los 80 (128 BPM, bombo en negras, palmas
// en 2 y 4, hi-hat a contratiempo, bajo de sintetizador en octavas). Se frena como cinta que se
// estira en "Pará..." (el giro), silencio en la pausa del VHS y vuelve suave (sin bombo) cuando
// entra Scalerics. Determinista (ruido con semilla fija). Sale en assets/bgm/bed.wav; correr desde
// reels/aerobicos:  node partes/beat.mjs && ffmpeg -y -i assets/bgm/bed.wav -b:a 192k assets/bgm/bed.mp3
import fs from "node:fs";
const SR = 48000, DUR = 77, N = Math.round(SR * DUR);
const L = new Float32Array(N), R = new Float32Array(N);
let semilla = 7654321;
const rnd = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const ruido = () => rnd() * 2 - 1;
const P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const PARA = P[118].start, SCALERICS = P[133].start; // "Pará..." y "Otro, sí."
const BPM = 128, NEGRA = 60 / BPM, CORCHEA = NEGRA / 2;
const add = (s, v, pan = 0) => { if (s >= 0 && s < N) { L[s] += v * (1 - pan); R[s] += v * (1 + pan); } };
function bombo(t0, g) {
  const s0 = Math.round(t0 * SR); let fase = 0;
  for (let i = 0; i < 0.3 * SR; i++) { const t = i / SR; fase += (2 * Math.PI * (50 + 120 * Math.exp(-t * 35))) / SR; add(s0 + i, Math.sin(fase) * Math.exp(-t * 9) * g); }
}
function palma(t0, g) {
  const s0 = Math.round(t0 * SR); let lp = 0;
  for (let i = 0; i < 0.22 * SR; i++) { const t = i / SR; const x = ruido(); lp += 0.25 * (x - lp); const env = (t < 0.01 || (t > 0.012 && t < 0.02) ? 1 : 0.7) * Math.exp(-t * 20); add(s0 + i, (x - lp) * env * g, -0.1); }
}
function hat(t0, g) {
  const s0 = Math.round(t0 * SR); let prev = 0;
  for (let i = 0; i < 0.06 * SR; i++) { const t = i / SR; const x = ruido(); add(s0 + i, (x - prev) * Math.exp(-t * 70) * g, 0.25); prev = x; }
}
function sierra(t0, f, dur, g, pan = 0, corte = 0.18) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR); let lp = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; const env = Math.min(1, t / 0.005) * Math.min(1, (dur - t) / 0.03);
    const x = 2 * ((f * t) % 1) - 1 + 0.5 * (2 * ((f * 1.005 * t) % 1) - 1); lp += corte * (x - lp); add(s0 + i, lp * env * g, pan); }
}
function pad(t0, fs_, dur, g) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR);
  for (let i = 0; i < n; i++) { const t = i / SR; const env = Math.min(1, t / 0.6) * Math.min(1, (dur - t) / 0.8);
    let v = 0; for (const f of fs_) v += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t); add(s0 + i, (v / fs_.length) * env * g); }
}
// progresión: La menor, Fa, Do, Sol (un compás cada uno)
const RAIZ = [55, 43.65, 65.41, 49];
const ACORDE = [[220, 261.6, 329.6], [174.6, 220, 261.6], [261.6, 329.6, 392], [196, 246.9, 293.7]];
const COMPAS = NEGRA * 4;
for (let t = 0, c = 0; t < PARA; t += COMPAS, c++) {
  const k = c % 4;
  for (let b = 0; b < 4; b++) { const tb = t + b * NEGRA; if (tb >= PARA) break; bombo(tb, 0.9); if (b % 2) palma(tb, 0.45); hat(tb + CORCHEA, 0.25); }
  for (let e = 0; e < 8; e++) { const te = t + e * CORCHEA; if (te >= PARA) break; sierra(te, RAIZ[k] * (e % 2 ? 2 : 1), CORCHEA * 0.85, 0.32); }
  for (const b of [0.5, 2.5]) { const tb = t + b * NEGRA; if (tb >= PARA) break; for (const f of ACORDE[k]) sierra(tb, f, NEGRA * 0.6, 0.06, 0.2, 0.12); }
}
// cola: se estira como cinta frenándose (el acorde baja de tono)
{ const s0 = Math.round(PARA * SR), n = Math.round(0.9 * SR); let fase = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; const f = 110 * Math.pow(0.25, t / 0.9); fase += (2 * Math.PI * f) / SR; add(s0 + i, (2 * ((fase / (2 * Math.PI)) % 1) - 1) * 0.25 * (1 - t / 0.9)); } }
// Scalerics: pad suave + hi-hat liviano
for (let t = SCALERICS, c = 0; t < DUR - 1; t += COMPAS, c++) {
  pad(t, ACORDE[c % 4], Math.min(COMPAS + 0.4, DUR - t), 0.22);
  for (let b = 0; b < 4; b++) hat(t + b * NEGRA + CORCHEA, 0.12);
  for (let e = 0; e < 8; e += 2) sierra(t + e * CORCHEA, RAIZ[c % 4], CORCHEA * 0.9, 0.15);
}
// normalizar y escribir WAV estéreo 16 bit
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round((L[i] / pico) * 0.85 * 32767), 44 + i * 4); buf.writeInt16LE(Math.round((R[i] / pico) * 0.85 * 32767), 46 + i * 4); }
fs.writeFileSync("assets/bgm/bed.wav", buf);
console.log("beat listo", DUR, "s; pará en", PARA, "scalerics en", SCALERICS);
