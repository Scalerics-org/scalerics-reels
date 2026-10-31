// Correcciones a mano de assets/voice/palabras.json (tiempos oídos con silencedetect), después de componer.mjs.
import fs from "node:fs";
const F = "assets/voice/palabras.json";
const p = JSON.parse(fs.readFileSync(F, "utf8"));
const fix = { 57: 27.9, 103: 49.07, 104: 49.25, 149: 64.9, 150: 65.4, 151: 65.55, 152: 66.0 };
for (const [i, t] of Object.entries(fix)) p[i].start = t;
for (let i = 0; i < p.length - 1; i++) if (p[i].end > p[i + 1].start) p[i].end = p[i + 1].start;
fs.writeFileSync(F, JSON.stringify(p));
console.log("ajustadas", Object.keys(fix).length);
