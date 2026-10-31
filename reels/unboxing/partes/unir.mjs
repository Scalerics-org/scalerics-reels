// Arma ../assets/voice/locucion.wav y palabras.json con los parlamentos de rec/ (recortados y,
// el youtuber, acelerado x1.1; los tiempos de pj/ ya están escalados). Los silencios van en G.
// Correr desde partes/. Escribe también voces.json (quién dice cada palabra).
import fs from "node:fs";
import { execSync } from "node:child_process";
const G = { "02y": 0.3, "03y": 0.35, "04y": 0.45, "05c": 0.5, "06a": 0.4, "07c": 0.35, "08a": 0.3, "09y": 0.5, "10a": 0.4, "11y": 0.5, "12y": 0.45, "13y": 0.45, "14o": 0.7, "15o": 0.45 };
const FIX = { "04y": [0, 0.3, 0.42, 0.96, 1.28, 1.37, 1.45, 1.86, 1.95, 2.2, 2.3], "05c": [0, 0.66, 0.9, 1.08, 1.26, 1.6, 1.7] };
const partes = fs.readdirSync("rec").filter((f) => /\.wav$/.test(f)).map((f) => f.slice(0, 3)).sort();
let t = 0, out = [], info = [], ins = [], filt = [];
for (const b of partes) {
  const g = G[b] || 0;
  if (g) { ins.push(`-f lavfi -t ${g} -i anullsrc=r=48000:cl=mono`); }
  t += g;
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${b}.wav`).toString());
  ins.push(`-i rec/${b}.wav`);
  const ws = JSON.parse(fs.readFileSync(`pj/${b}.json`, "utf8"));
  ws[0].start = 0;
  if (FIX[b]) FIX[b].forEach((x, i) => (ws[i].start = x));
  for (let i = 1; i < ws.length; i++) if (ws[i].start <= ws[i - 1].start + 0.08) ws[i].start = Math.min(ws[i - 1].start + 0.12, d - 0.05);
  ws.forEach((w, i) => { const end = i + 1 < ws.length ? ws[i + 1].start : d; out.push({ id: out.length, text: w.text, start: +(t + w.start).toFixed(3), end: +(t + Math.max(end, w.start + 0.1)).toFixed(3), voz: b[2] }); });
  info.push(`${b} ${t.toFixed(2)}-${(t + d).toFixed(2)}`);
  t += d;
}
const n = ins.length;
execSync(`ffmpeg -hide_banner -loglevel error -y ${ins.join(" ")} -filter_complex "${Array.from({ length: n }, (_, i) => `[${i}:a]`).join("")}concat=n=${n}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 ../assets/voice/locucion.wav`);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out.map(({ voz, ...w }) => w)));
fs.writeFileSync("voces.json", JSON.stringify(out.map((w) => w.voz)));
console.log(info.join("\n"), "\ntotal", t.toFixed(2), out.length, "palabras");
