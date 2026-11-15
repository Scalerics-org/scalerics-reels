// Tiempos por palabra de assets/voice/locucion.wav. Los tramos (una frase cada uno) salen exactos de
// partes/armar-voz.mjs (partes/tramos.json). Dentro de cada tramo, los inicios de palabra salen del STT de la TOMA
// original (partes/stt-*.json, de herramientas/tiempos.mjs sobre cada toma), llevados al tramo: (t - desde) / tempo.
// Si el STT de la toma no sirve (palabra fuera del tramo), se reparte por sílabas.
// partes/texto.txt = el guion de pantalla ("CRM" una palabra; "scalerics.com." una palabra).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const FR = fs.readFileSync("partes/texto.txt", "utf8").split("\n").map((l) => l.trim()).filter(Boolean);
const TR = JSON.parse(fs.readFileSync("partes/tramos.json", "utf8"));
if (FR.length !== TR.length) throw new Error(`frases ${FR.length} != tramos ${TR.length}`);
const stt = (n) => JSON.parse(fs.readFileSync(`partes/stt-${n}.json`, "utf8"));
const O1 = stt("orus1-1"), N7 = stt("n7-3"), RB = stt("ruben-2"), O2 = stt("orus2-4");
// por frase: [palabras STT de la toma (índices), desde, tempo]; en orus2 "CRM" = "ce erre eme" (3 palabras STT)
const T = 1.06;
const FUENTE = [
  [O1, [0, 9], 0.09, T], [O1, [9, 15], 2.83, T], [O1, [15, 18], 4.59, T], [O1, [18, 28], 5.85, T], [O1, [28, 35], 8.44, T],
  [O1, [35, 40], 11.25, T], [O1, [40, 43], 13.64, T], [N7, [0, 13], 0.21, T], [RB, [0, 7], 0.2, 1], [RB, [7, 12], 2.21, 1],
  [O2, [0, 12], 0.27, T], [O2, [12, 20], 4.2, T], [O2, [20, 23], 6.74, T], [O2, [23, 31], 7.92, T],
];
const SIL = { "scalerics.com.": 5, crm: 3 };
const sil = (w) => SIL[w.toLowerCase().replace(/[¿?¡!,:…]/g, "")] ?? Math.max(1, (w.toLowerCase().match(/[aeiouáéíóú]+/g) || []).length);
const out = [];
FR.forEach((fr, k) => {
  const ws = fr.split(/\s+/), [s, e] = TR[k];
  const [P, [a, b], desde, tempo] = FUENTE[k];
  let idx = Array.from({ length: b - a }, (_, j) => a + j);
  if (k === 10) idx = [a, a + 1, ...idx.slice(4)]; // "Un CRM" = "Un ce erre eme"
  if (idx.length > ws.length) idx = idx.slice(0, ws.length);
  let starts = idx.map((i) => s + (P[i].start - desde) / tempo);
  const ok = starts.length === ws.length && starts.every((x, j) => (j === 0 || x >= s - 0.05) && x < e && (j === 0 || x >= starts[j - 1]));
  if (!ok) {
    console.log("frase", k, "por sílabas", starts.length, ws.length);
    const tot = ws.reduce((n, w) => n + sil(w), 0); let t = s; starts = ws.map((w) => { const x = t; t += ((e - s) * sil(w)) / tot; return x; });
  }
  starts[0] = s;
  ws.forEach((w, j) => out.push({ text: w, start: +Math.max(s, starts[j]).toFixed(3), end: +(j + 1 < ws.length ? starts[j + 1] : e).toFixed(3) }));
});
// a mano (envolvente de la locución + STT de control): "cuatro" y "nunca" quedaban una sílaba antes
const FIJO = { 32: 8.4, 33: 8.82 };
for (const [i, v] of Object.entries(FIJO)) { out[i].start = v; out[i - 1].end = v; }
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
out.forEach((w, i) => process.stdout.write(`${i}:${w.text}@${w.start.toFixed(2)} `)); console.log();
