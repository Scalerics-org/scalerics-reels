// Sintetiza assets/bgm/noticiero.mp3: cortina de noticiero (golpe de apertura con acorde, pulso tipo
// reloj a 120 BPM, golpe al volver al estudio y acorde mayor cuando entra Scalerics). Determinista.
// Uso (desde reels/ultimo-momento): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 67.3, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) L[a + i] += f(i / SR); };
const saw = (fr, t) => 2 * ((fr * t) % 1) - 1;
const acorde = (t0, notas, amp, dur = 1.6) => notas.forEach((fr) => add(t0, dur, (t) => amp * Math.exp(-t * 2.2) * (0.6 * saw(fr, t) + 0.4 * Math.sin(2 * Math.PI * fr * t)) * Math.min(1, t * 200)));
const timbal = (t0, amp) => add(t0, 1.2, (t) => amp * Math.exp(-t * 4) * Math.sin(2 * Math.PI * (70 + 40 * Math.exp(-t * 20)) * t));
const tick = (t0, amp, fr = 1500) => add(t0, 0.05, (t) => amp * Math.exp(-t * 90) * Math.sin(2 * Math.PI * fr * t));
const MENOR = [164.81, 196.0, 246.94, 329.63], MAYOR = [196.0, 246.94, 293.66, 392.0];
// apertura
acorde(0, MENOR, 0.09); timbal(0, 0.5); acorde(0.5, MENOR.map((f) => f * 1.5), 0.05, 1.0);
// pulso urgente: tick cada 0.5 s, bombo suave cada 1 s, hasta el CTA
for (let t = 0.75; t < 58.0; t += 0.5) tick(t, (Math.round(t * 2) % 2 ? 0.05 : 0.09), Math.round(t * 2) % 2 ? 1200 : 1600);
for (let t = 1.0; t < 58.0; t += 1.0) add(t, 0.25, (x) => 0.18 * Math.exp(-x * 18) * Math.sin(2 * Math.PI * 55 * x));
// drone bajo y tenso
add(0, 58.2, (t) => 0.03 * Math.sin(2 * Math.PI * 82.41 * t) * (0.6 + 0.4 * Math.sin(2 * Math.PI * 0.25 * t)) * Math.min(1, (58.2 - t) * 2));
// el giro (47.82) y vuelta al estudio (54.83)
timbal(47.82, 0.45); acorde(47.82, [174.61, 220, 261.63], 0.05, 1.2);
acorde(54.83, MENOR, 0.08); timbal(54.83, 0.5);
// Scalerics: acorde mayor que queda
acorde(58.24, MAYOR, 0.06, 3.5);
add(58.24, 9.0, (t) => 0.035 * Math.min(1, t * 2) * Math.min(1, (9 - t) * 1.5) * MAYOR.reduce((s, fr) => s + Math.sin(2 * Math.PI * fr * t), 0) / 4);
for (let t = 58.74; t < 66.5; t += 0.5) tick(t, 0.03, 1800);
// a WAV mono 16 bit
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync("/tmp/noticiero-" + process.pid + ".wav", buf);
execSync(`ffmpeg -hide_banner -loglevel error -y -i /tmp/noticiero-${process.pid}.wav -c:a libmp3lame -b:a 160k assets/bgm/noticiero.mp3`);
fs.unlinkSync("/tmp/noticiero-" + process.pid + ".wav");
console.log("assets/bgm/noticiero.mp3");
