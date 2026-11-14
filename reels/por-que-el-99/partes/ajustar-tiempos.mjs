// Tiempos por palabra de assets/voice/locucion.wav. Los tramos (una frase cada uno) salen exactos de
// partes/armar-voz.mjs (las marcas que imprime); dentro de cada tramo las palabras se reparten por sílabas.
// El STT de herramientas/tiempos.mjs queda en partes/pal-stt.json como control.
// partes/texto.txt = el guion de la voz con "scalerics.com." en vez de "Scálerics punto com." (una sola palabra).
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const FR = fs.readFileSync("partes/texto.txt", "utf8").split("\n").map((l) => l.trim()).filter(Boolean);
const TR = JSON.parse(fs.readFileSync("partes/tramos.json", "utf8"));
if (FR.length !== TR.length) throw new Error(`frases ${FR.length} != tramos ${TR.length}`);
const SIL = { "scalerics.com.": 5, "automático": 5, "noventa": 3 };
const sil = (w) => SIL[w.toLowerCase().replace(/[¿?¡!,.:…]/g, "")] ?? SIL[w] ?? Math.max(1, (w.toLowerCase().match(/[aeiouáéíóú]+/g) || []).length);
const out = [];
FR.forEach((fr, k) => {
  const ws = fr.split(/\s+/), [s, e] = TR[k], tot = ws.reduce((n, w) => n + sil(w), 0);
  let t = s;
  ws.forEach((w) => { const d = ((e - s) * sil(w)) / tot; out.push({ text: w, start: +t.toFixed(3), end: +(t + d).toFixed(3) }); t += d; });
});
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
out.forEach((w, i) => process.stdout.write(`${i}:${w.text}@${w.start.toFixed(2)} `)); console.log();
