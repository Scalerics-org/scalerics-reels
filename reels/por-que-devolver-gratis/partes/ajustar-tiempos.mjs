// Tiempos por palabra de assets/voice/locucion.wav (ver partes/armar-voz.mjs): el STT de la locución armada
// (partes/pal-final-stt.json, de herramientas/tiempos.mjs) con los arreglos a mano de lo que interpoló mal, medidos con
// silencedetect (-38 dB d=0,1 y -32 dB d=0,035). Uso (desde la carpeta del reel): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const p = JSON.parse(fs.readFileSync("partes/pal-final-stt.json", "utf8"));
const fija = (i, s, e) => { p[i].start = s; p[i].end = e; };
fija(0, 0.25, 0.37); fija(1, 0.42, 0.56); fija(2, 0.58, 0.7); // ¿Por qué las
fija(39, 13.37, 13.53); fija(40, 13.53, 13.73); fija(41, 14.0, 14.4); // ¿Por qué? (bisagra)
fija(49, 17.12, 17.27); fija(50, 17.31, 17.68); // lo achica.
fija(51, 17.95, 18.25); fija(52, 18.25, 18.58);
fija(53, 18.9, 19.27); fija(54, 19.63, 19.72);
fija(67, 25.03, 25.15);
fija(75, 28.59, 28.7); fija(76, 28.7, 28.82); fija(77, 28.82, 29.3); // Y le quedaron.
fija(78, 29.66, 29.78);
fija(83, 30.97, 31.33); fija(84, 31.33, 31.5); fija(85, 31.5, 32.0); fija(86, 32.0, 32.31); fija(87, 32.35, 32.55); fija(88, 32.63, 33.9);
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter(Boolean);
if (G.length !== p.length) throw new Error(`palabras ${p.length} != guion ${G.length}`);
const r3 = (x) => Math.round(x * 1000) / 1000;
const out = p.map((w, i) => ({ text: G[i], start: r3(w.start), end: r3(w.end) }));
for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].start) throw new Error("desorden en " + i);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
