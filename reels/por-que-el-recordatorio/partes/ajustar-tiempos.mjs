// Tiempos por palabra de assets/voice/locucion.wav (ver partes/armar-voz.sh): el STT de la toma 1 (partes/pal1.json,
// de herramientas/tiempos.mjs) con los arreglos a mano de lo que interpoló mal (medido con silencedetect -38 dB) y
// corrido por los silencios que agrega armar-voz.sh. Uso (desde la carpeta del reel): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const p = JSON.parse(fs.readFileSync("partes/pal1.json", "utf8"));
const fija = (i, s, e) => { p[i].start = s; p[i].end = e; };
fija(0, 0.26, 0.39); fija(1, 0.46, 0.62);
fija(17, 5.6, 6.1);
fija(18, 6.47, 6.7); fija(19, 6.72, 7.14); // ¿Por qué?
fija(20, 7.51, 7.62);
fija(27, 8.6, 9.18); fija(28, 9.38, 9.52); fija(29, 9.52, 9.94); // «me olvidé»
fija(30, 10.36, 10.47); fija(31, 10.55, 10.7);
fija(36, 11.6, 12.12); fija(37, 12.36, 12.52); fija(38, 12.52, 13.1); // Un estudio
fija(40, 13.2, 13.94); fija(41, 14.26, 14.4);
fija(55, 18.3, 18.99); fija(56, 19.37, 19.6);
fija(66, 21.85, 22.49); fija(67, 22.78, 23.2);
fija(71, 24.1, 24.46); fija(72, 24.64, 24.72);
fija(75, 25.3, 25.58); fija(76, 25.7, 25.82); fija(77, 26.11, 26.5); fija(78, 26.5, 26.97); // Y Graciela pasa.
fija(79, 27.45, 27.6);
fija(84, 28.4, 29.05); fija(85, 29.21, 29.6); fija(86, 29.6, 29.78); fija(87, 29.78, 30.25); fija(88, 30.25, 30.59);
fija(89, 30.65, 30.89); fija(90, 30.96, 32.29);
// ronda 1: el tramo 12,30-19,10 de orus1 se reemplaza por partes/prest2.wav (desde 0,25, 7,16 s) + 0,08 s
const PL = 7.41 - 0.25, D2 = 0.2 + 12.3 + PL + 0.08 - 19.1;
const corre = (t) => (t < 6.3 ? 0 : t < 12.3 ? 0.2 : t < 25.64 ? D2 : t < 25.86 ? D2 + 0.3 : D2 + 0.12);
const pr = JSON.parse(fs.readFileSync("partes/prest2.json", "utf8"));
const fp = (i, s, e) => { pr[i].start = s; pr[i].end = e; };
fp(0, 0.29, 0.4); fp(10, 4.07, 4.5); fp(11, 4.52, 4.68); fp(12, 4.74, 5.3); fp(18, 6.7, 7.38);
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter(Boolean);
if (G.length !== p.length) throw new Error(`palabras ${p.length} != guion ${G.length}`);
const r3 = (x) => Math.round(x * 1000) / 1000;
const out = p.map((w, i) => {
  if (i >= 37 && i <= 55) { const q = pr[i - 37], o = 0.2 + 12.3 - 0.25; return { text: G[i], start: r3(q.start + o), end: r3(q.end + o) }; }
  return { text: G[i], start: r3(w.start + corre(w.start)), end: r3(w.end + corre(w.start)) };
});
for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].start) throw new Error("desorden en " + i);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
