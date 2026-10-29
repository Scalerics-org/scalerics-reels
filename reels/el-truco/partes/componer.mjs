// Arma assets/voice/palabras.json con los tiempos de cada parlamento (sacados por separado con
// tiempos.mjs sobre partes/NN-c.wav), divididos por el atempo y corridos a su inicio en la locución.
// Lee partes/offsets.txt (lo escribe pegar.sh). Correr desde reels/el-truco.
import fs from "node:fs";
const P = fs.readFileSync("partes/offsets.txt", "utf8").trim().split("\n").map((l) => l.split(" ")).map(([n, o, k]) => [n, Number(o), Number(k)]);
const out = []; const r = (n) => Math.round(n * 1000) / 1000;
for (const [n, off, k] of P) for (const w of JSON.parse(fs.readFileSync("partes/" + n + ".json", "utf8"))) out.push({ id: out.length, text: w.text, start: r(off + w.start / k), end: r(off + w.end / k) });
// Ajustes a mano contra los silencios de la locución (silencedetect): el STT corría estas palabras.
const AJUSTE = { 14: 5.25, 61: 24.28, 62: 24.5, 89: 34.8, 90: 34.88, 91: 34.98, 95: 37.1, 110: 42.53, 111: 42.7, 112: 42.8, 113: 42.92, 114: 43.71, 115: 43.88, 116: 44.08, 117: 44.15, 161: 60.47, 162: 60.56, 163: 60.64, 168: 63.04, 169: 63.42, 170: 63.52, 171: 63.82, 172: 63.95 };
for (const [i, t] of Object.entries(AJUSTE)) out[i].start = t;
for (let i = 0; i < out.length - 1; i++) out[i].end = Math.min(Math.max(out[i].end, out[i].start + 0.08), out[i + 1].start);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras");
