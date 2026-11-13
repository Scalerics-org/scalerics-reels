// Tiempos por palabra de assets/voice/locucion.wav. El STT (partes/pal-stt.json) se desfasa con la voz de Rubén y el
// dominio, así que los tramos de habla salen de silencedetect (-34 dB d=0,04) y dentro de cada tramo las palabras se
// reparten por sílabas. guion.txt sin el "RUBEN:" = 95 palabras ("scalerics.com." es una sola).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter((x) => x && x !== "RUBEN:");
// [primera palabra, última, inicio, fin] de cada tramo de habla
const TR = [ // ronda 2 (n5 entera: "antes" hasta 11,69; lo que sigue +0,21 s)
  [0, 1, 0.05, 0.24], [2, 8, 0.28, 2.19], [9, 16, 2.45, 4.52], [17, 18, 4.90, 5.31], [19, 22, 5.66, 7.04], [23, 27, 7.20, 8.48], [28, 30, 8.78, 9.60], [31, 31, 9.68, 10.03], [32, 33, 10.10, 10.60], [34, 35, 10.60, 11.36], [36, 36, 11.41, 11.69], [37, 40, 11.95, 13.75], [41, 45, 14.03, 15.40], [46, 49, 15.49, 16.38], [50, 53, 16.82, 17.73], [54, 58, 17.94, 19.04], [59, 62, 19.26, 20.59], [63, 63, 20.88, 21.42], [64, 65, 21.61, 22.35], [66, 69, 22.56, 23.33], [70, 70, 23.76, 24.45], [71, 73, 24.70, 25.79], [74, 76, 26.21, 26.93], [77, 81, 27.07, 28.74], [82, 82, 28.99, 29.50], [83, 83, 29.56, 30.04], [84, 88, 30.43, 31.86], [89, 92, 32.13, 33.66], [93, 94, 33.87, 35.14],
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
