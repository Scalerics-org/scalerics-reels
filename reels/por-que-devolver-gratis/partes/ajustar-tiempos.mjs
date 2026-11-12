// Tiempos por palabra de assets/voice/locucion.wav (ver partes/armar-voz.mjs): el STT de la locución armada
// (partes/pal-final-stt.json, de herramientas/tiempos.mjs) con los arreglos a mano de lo que interpoló mal, medidos con
// silencedetect (-38 dB d=0,1 y -32 dB d=0,035). Uso (desde la carpeta del reel): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const p = JSON.parse(fs.readFileSync("partes/pal-final-stt.json", "utf8"));
const fija = (i, s, e) => { p[i].start = s; p[i].end = e; };
// ronda 1 de revisión (voz nueva: frase 3 regenerada, 0,58 s después de "¿Por qué?"): arreglos sobre silencedetect
// -32 dB d=0,035 y las correcciones del revisor de sonido (subtítulos que se adelantaban)
const F = [
  [0, 0.25, 0.37], [1, 0.42, 0.56], [2, 0.58, 0.7],
  // ronda 2 (revisor de sonido): la frase nueva, medida en los stems
  [16, 5.37, 5.49], [17, 5.5, 5.9], [18, 5.92, 6.21], [19, 6.21, 6.25], [20, 6.25, 6.58], [21, 6.6, 6.68], [22, 6.7, 7.09], [23, 7.11, 7.47], [24, 7.49, 7.85],
  [25, 8.11, 8.27], [26, 8.34, 8.44], [27, 8.5, 8.85], [28, 8.88, 8.95], [29, 8.97, 9.62], [30, 9.68, 10.15], [31, 10.17, 10.4], [32, 10.41, 10.96],
  [33, 11.24, 11.3], [34, 11.31, 11.37], [35, 11.43, 11.77], [36, 11.9, 12.08], [37, 12.13, 12.24], [38, 12.25, 12.65],
  [39, 13.14, 13.26], [40, 13.31, 13.5], [41, 14.03, 14.38],
  [44, 15.12, 15.22], [45, 15.25, 15.33], [46, 15.35, 15.75],
  [47, 16.14, 16.48], [48, 16.5, 16.79], [49, 16.83, 17.02], [50, 17.15, 17.72],
  [51, 17.99, 18.28], [52, 18.3, 18.61], [53, 18.94, 19.3], [54, 19.67, 19.85], [55, 19.89, 20.18], [56, 20.2, 20.47], [57, 20.53, 21.06],
  [60, 22.8, 23.18], [61, 23.2, 23.72], [62, 23.85, 23.9], [66, 24.4, 24.79],
  [67, 25.36, 25.46], [68, 25.48, 25.73], [69, 25.75, 26.03], [70, 26.05, 26.28], [73, 26.93, 27.5], [74, 27.84, 28.06],
  [75, 28.62, 28.7], [76, 28.72, 28.82], [77, 28.84, 29.32], [78, 29.7, 29.78], [79, 29.84, 30.14], [80, 30.16, 30.26], [81, 30.28, 30.36], [82, 30.38, 30.78],
  [83, 31.0, 31.33], [84, 31.35, 31.48], [85, 31.5, 32.0], [86, 32.02, 32.34], [87, 32.38, 32.59], [88, 32.66, 33.94],
];
for (const [i, a, b] of F) fija(i, a, b);
// ronda 2: la pausa de la bisagra crece 0,04 s antes del atempo (0,037 s reales): todo lo que viene después se corre
const DB = 0.04 / 1.07;
for (let i = 41; i < p.length; i++) { p[i].start += DB; p[i].end += DB; }
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter(Boolean);
if (G.length !== p.length) throw new Error(`palabras ${p.length} != guion ${G.length}`);
const r3 = (x) => Math.round(x * 1000) / 1000;
const out = p.map((w, i) => ({ text: G[i], start: r3(w.start), end: r3(w.end) }));
for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].start) throw new Error("desorden en " + i);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
