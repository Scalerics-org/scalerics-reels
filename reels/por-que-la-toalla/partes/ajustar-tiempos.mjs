// Corrige a mano los tiempos que Speech-to-Text interpoló mal (medidos con silencedetect sobre partes/orus1.wav)
// y los corre por los silencios agregados al armar la locución (0,35 s en 11,28 antes de "¿Por qué?", 0,25 s en 22,63
// antes de "Es el cartel de la toalla", 0,6 s al final para que la tarjeta dure ~2,9 s).
// Uso (desde reels/por-que-la-toalla): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const p = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
const fija = (i, s, e) => { p[i].start = s; p[i].end = e; };
fija(27, 9.4, 9.92);   // reusa.
fija(28, 10.29, 10.55); fija(29, 10.55, 10.64); fija(30, 10.64, 11.11); // Ganó el segundo.
fija(31, 11.46, 11.62); fija(32, 11.62, 11.81); // ¿Por qué?
fija(82, 27.0, 28.05); // scalerics.com.
const corr = (t) => Math.round((t + (t >= 11.28 ? 0.35 : 0) + (t >= 22.63 ? 0.25 : 0)) * 1000) / 1000;
for (const w of p) { w.start = corr(w.start); w.end = corr(w.end); }
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(p, null, 1));
console.log("palabras.json ajustado");
