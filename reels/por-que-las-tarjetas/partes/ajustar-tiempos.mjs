// Tiempos por palabra de assets/voice/locucion.wav: el STT de la locución armada (partes/pal-stt.json, de
// herramientas/tiempos.mjs sobre partes/guion-voz.txt, 91 palabras) con los arreglos a mano medidos con silencedetect
// (-36 dB d=0,06) y "Scálerics punto com" juntado en "scalerics.com." (guion.txt tiene 89 palabras).
// Uso (desde la carpeta del reel): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const p = JSON.parse(fs.readFileSync("partes/pal-stt.json", "utf8"));
const fija = (i, s, e) => { p[i].start = s; p[i].end = e; };
const F = [
  [0, 0.13, 0.3], [15, 3.45, 4.01], [16, 4.36, 4.62], [17, 4.62, 5.31], [18, 5.51, 5.6], [20, 5.98, 6.33], [21, 6.33, 6.73], [22, 6.96, 7.38],
  [29, 8.72, 9.08], [30, 9.62, 9.78], [31, 9.78, 9.99], [32, 10.61, 10.66], [33, 10.73, 11.05], [34, 11.07, 11.3], [35, 11.32, 11.7], [36, 11.72, 12.06],
  [37, 12.31, 12.78], [38, 12.95, 13.12], [39, 13.12, 13.41], [40, 13.66, 13.8], [41, 13.8, 14.12], [42, 14.12, 14.48],
  [43, 15.13, 15.3], [51, 16.7, 17.34], [52, 17.61, 17.72], [53, 17.72, 17.84], [54, 17.84, 18.44],
  [55, 19.18, 19.7], [56, 20.27, 20.42], [60, 21.05, 21.5],
  [61, 21.95, 22.02], [62, 22.02, 22.5], [63, 22.52, 22.97], [64, 23.27, 23.45], [65, 23.45, 24.11], [66, 24.46, 24.56], [67, 24.56, 24.65],
  [68, 24.72, 25.02], [69, 25.02, 25.39], [70, 25.53, 25.72], [71, 25.72, 26.0], [72, 26.0, 26.32], [73, 26.96, 27.08], [74, 27.08, 27.61],
  [75, 27.81, 28.3], [76, 28.3, 28.77], [77, 29.2, 29.36], [82, 30.1, 30.5], [83, 30.8, 31.12], [84, 31.12, 31.3], [85, 31.3, 31.95],
  [86, 31.95, 32.48], [87, 32.59, 32.83], [88, 32.9, 33.8],
];
for (const [i, a, b] of F) fija(i, a, b);
// ronda 1: la pausa después de "¿Por qué?" pasa de 0,62 a 0,8 s (todo lo que sigue se corre 0,18 s); "acordarse." termina 80 ms
// más tarde (la pausa siguiente se acortó lo mismo)
for (let i = 32; i < p.length; i++) { p[i].start += 0.18; p[i].end += 0.18; }
p[54].end += 0.08;
// "Scálerics punto com" → una sola palabra de pantalla
p.splice(89, 2);
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter(Boolean);
if (G.length !== p.length) throw new Error(`palabras ${p.length} != guion ${G.length}`);
const r3 = (x) => Math.round(x * 1000) / 1000;
const out = p.map((w, i) => ({ text: G[i], start: r3(w.start), end: r3(w.end) }));
for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].start) throw new Error("desorden en " + i);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
