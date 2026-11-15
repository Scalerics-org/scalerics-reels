// Tiempos por palabra de assets/voice/locucion.wav. Los tramos (una frase cada uno) salen exactos de
// partes/armar-voz.mjs (partes/tramos.json). Dentro de cada tramo, los inicios de palabra salen del STT de la TOMA
// original (partes/stt-*.json, de herramientas/tiempos.mjs sobre cada toma), llevados al tramo: (t - desde) / tempo.
// Si el STT de la toma no sirve (fuera del tramo o desordenado), se reparte por sílabas.
// partes/texto.txt = el guion de pantalla ("1985:" y "scalerics.com." una palabra cada uno).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
import { TRAMOS } from "./armar-voz.mjs";
const FR = fs.readFileSync("partes/texto.txt", "utf8").split("\n").map((l) => l.trim()).filter(Boolean);
const TR = JSON.parse(fs.readFileSync("partes/tramos.json", "utf8"));
if (FR.length !== TR.length) throw new Error(`frases ${FR.length} != tramos ${TR.length}`);
const stt = (n) => JSON.parse(fs.readFileSync(`partes/stt-${n}.json`, "utf8"));
const TOMA = ["orus1aj-2", "orus1b-1", "ruben1-2", "orus2-1", "ruben2-2", "orus3-2", "orus1c-2", "orus4-2"].map(stt);
// índices (en el STT de la toma) de cada palabra de pantalla
const rango = (a, n) => Array.from({ length: n }, (_, j) => a + j);
const IDX = [rango(0, 12), rango(12, 3), rango(15, 4), rango(19, 2), rango(21, 3), rango(24, 7), rango(0, 6), rango(0, 8),
  rango(12, 7), rango(23, 8), rango(0, 8), rango(0, 9), rango(9, 7), rango(0, 2), rango(2, 4), rango(0, 4), rango(2, 6)];
const SIL = { "scalerics.com.": 5, "1985:": 8 };
const sil = (w) => SIL[w.toLowerCase()] ?? Math.max(1, (w.toLowerCase().match(/[aeiouáéíóú]+/g) || []).length);
const out = [];
FR.forEach((fr, k) => {
  const ws = fr.split(/\s+/), [s, e] = TR[k];
  const [arch, desde, , tempo] = TRAMOS[k];
  const P = TOMA[arch];
  let starts = IDX[k].map((i) => s + (P[i].start - desde) / tempo);
  starts[0] = s;
  const ok = starts.length === ws.length && starts.every((x, j) => x >= s - 0.01 && x < e - 0.1 && (j === 0 || x > starts[j - 1] + 0.04));
  if (!ok) {
    console.log("frase", k, "por sílabas");
    const tot = ws.reduce((n, w) => n + sil(w), 0); let t = s; starts = ws.map((w) => { const x = t; t += ((e - s) * sil(w)) / tot; return x; });
  }
  ws.forEach((w, j) => out.push({ text: w, start: +starts[j].toFixed(3), end: +(j + 1 < ws.length ? starts[j + 1] : e).toFixed(3) }));
});
// a mano (STT de la locución entera, partes/pal-stt.json, y los silencios de silencedetect -40 dB)
// a mano (STT de la locución entera, partes/pal-stt.json, y los silencios de silencedetect -40 dB).
// ronda 1: después de la frase 7 van relativos al inicio de su tramo ([tramo, segundos dentro del tramo])
const FIJO = { 3: 0.42, 4: 0.72, 5: 1.0, 6: 1.67, 12: 3.51, 26: 9.2, 27: 9.73, 43: 14.68, 44: 14.84 }; // ronda 2: "en 1985"
const REL = { 62: [10, 1.08], 63: [10, 1.17], 64: [10, 1.25], 65: [10, 1.43], 66: [10, 1.52], 67: [10, 1.65], 68: [11, 0.05], 79: [12, 1.148], 80: [12, 1.268],
  84: [13, 0.094], 85: [13, 0.424], 86: [14, 0.094], 94: [16, 0.084] };
for (const [i, [k, d]] of Object.entries(REL)) FIJO[i] = +(TR[k][0] + d).toFixed(3);
for (const [i, v] of Object.entries(FIJO)) { out[+i].start = v; if (+i > 0) out[+i - 1].end = Math.min(out[+i - 1].end, v); }
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
out.forEach((w, i) => process.stdout.write(`${i}:${w.text}@${w.start.toFixed(2)} `)); console.log();
