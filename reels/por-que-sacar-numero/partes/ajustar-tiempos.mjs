// Tiempos por palabra de assets/voice/locucion.wav. El STT (partes/pal-stt.json) se desfasa con la voz de Rubén y el
// dominio, así que los tramos de habla salen de silencedetect (-34 dB d=0,04) y dentro de cada tramo las palabras se
// reparten por sílabas. guion.txt sin el "RUBEN:" = 95 palabras ("scalerics.com." es una sola).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter((x) => x && x !== "RUBEN:");
// [primera palabra, última, inicio, fin] de cada tramo de habla
const TR = [ // ronda 1 (voz rearmada, 95 palabras)
  [0, 1, 0.05, 0.24], [2, 8, 0.28, 2.19], [9, 16, 2.45, 4.52], [17, 18, 4.9, 5.31],
  [19, 22, 5.66, 7.04], [23, 27, 7.2, 8.48], [28, 31, 8.78, 9.6], [32, 36, 9.68, 11.36],
  [37, 40, 11.74, 13.54], [41, 45, 13.82, 15.19], [46, 49, 15.28, 16.17],
  [50, 53, 16.61, 17.52], [54, 58, 17.73, 18.83], [59, 62, 19.05, 20.38],
  [63, 63, 20.67, 21.21], [64, 65, 21.4, 22.14], [66, 69, 22.35, 23.12],
  [70, 70, 23.55, 24.24], [71, 73, 24.49, 25.58],
  [74, 76, 26.0, 26.72], [77, 81, 26.86, 28.53], [82, 82, 28.78, 29.29], [83, 83, 29.35, 29.83],
  [84, 88, 30.22, 31.65], [89, 92, 31.92, 33.45], [93, 94, 33.66, 34.93],
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
