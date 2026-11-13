// Tiempos por palabra de assets/voice/locucion.wav. El STT (partes/pal-stt.json) se desfasa con la voz de Rubén y el
// dominio, así que los tramos de habla salen de silencedetect (-34 dB d=0,04) y dentro de cada tramo las palabras se
// reparten por sílabas. guion.txt sin el "RUBEN:" = 94 palabras ("scalerics.com." es una sola).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter((x) => x && x !== "RUBEN:");
// [primera palabra, última, inicio, fin] de cada tramo de habla
const TR = [
  [0, 1, 0.05, 0.25], [2, 8, 0.3, 2.29], [9, 16, 2.6, 4.77], [17, 18, 5.29, 5.72],
  [19, 22, 6.33, 7.76], [23, 27, 7.92, 9.28], [28, 31, 9.51, 10.72], [32, 35, 10.86, 12.04],
  [36, 39, 12.27, 14.15], [40, 41, 14.29, 15.03], [42, 44, 15.24, 16.04], [45, 46, 16.2, 17.16],
  [47, 50, 17.52, 18.66], [51, 54, 19.12, 20.07], [55, 59, 20.34, 21.5], [60, 63, 21.77, 23.17],
  [64, 66, 23.53, 24.08], [67, 70, 24.29, 25.07], [71, 71, 25.68, 26.38], [72, 74, 26.69, 27.78],
  [75, 77, 28.28, 29.04], [78, 82, 29.18, 30.92], [83, 83, 31.23, 31.77], [84, 84, 31.82, 32.33],
  [85, 87, 32.75, 33.66], [88, 91, 33.91, 35.5], [92, 93, 35.74, 36.45],
];
const SIL = { "MIT": 3, "scalerics.com.": 6, "WhatsApp.": 2 };
const sil = (w) => SIL[w] ?? Math.max(1, (w.toLowerCase().match(/[aeiouáéíóú]+/g) || []).length);
const out = [];
for (const [a, b, s, e] of TR) {
  const ws = G.slice(a, b + 1), tot = ws.reduce((n, w) => n + sil(w), 0);
  let t = s;
  ws.forEach((w, k) => { const d = ((e - s) * sil(w)) / tot; out[a + k] = { text: w, start: +t.toFixed(3), end: +(t + d).toFixed(3) }; t += d; });
}
if (out.length !== G.length || out.some((x) => !x)) throw new Error(`palabras ${out.length} != guion ${G.length}`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
