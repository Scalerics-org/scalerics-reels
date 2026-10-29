// Tiempos por palabra de la locución armada con los parlamentos de rec/ (los silencios entre
// parlamentos van en G). Correr desde partes/: escribe ../assets/voice/palabras.json y voces.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const G = {"02d":0.5,"03a":0.3,"04d":0.35,"05a":0.3,"06d":0.35,"07a":0.3,"08d":0.4,"09a":0.3,"10d":0.4,"11a":0.35,"12d":0.5,"13a":0.35,"14d":0.5,"15a":0.7,"16d":0.8,"17a":0.35,"18d":0.5,"19a":0.45,"20d":0.7,"21o":0.9,"22o":0.4,"23o":0.4,"24o":0.5};
const FIX = { "15a": [0, 0.3, 0.6, 1.2, 1.35] };
const partes = fs.readdirSync("rec").filter(f => /\.wav$/.test(f)).map(f => f.slice(0, 3)).sort();
let t = 0, out = [], info = [];
for (const b of partes) {
  t += G[b] || 0;
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${b}.wav`).toString());
  const ws = JSON.parse(fs.readFileSync(`pj/${b}.json`, "utf8"));
  ws[0].start = 0;
  if (FIX[b]) FIX[b].forEach((s, i) => (ws[i].start = s));
  // separar palabras pegadas en el mismo inicio
  for (let i = 1; i < ws.length; i++) if (ws[i].start <= ws[i - 1].start + 0.08) ws[i].start = Math.min(ws[i - 1].start + 0.12, d - 0.05);
  ws.forEach((w, i) => { const end = i + 1 < ws.length ? ws[i + 1].start : d; out.push({ id: out.length, text: w.text, start: +(t + w.start).toFixed(3), end: +(t + Math.max(end, w.start + 0.1)).toFixed(3), voz: b[2] }); });
  info.push(`${b} ${t.toFixed(2)}-${(t + d).toFixed(2)}`);
  t += d;
}
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out.map(({voz, ...w}) => w)));
fs.writeFileSync("voces.json", JSON.stringify(out.map(w => w.voz)));
console.log(info.join("\n"), "\ntotal", t.toFixed(2), out.length, "palabras");
