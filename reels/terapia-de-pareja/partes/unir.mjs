// Arma la locución con los parlamentos de rec/ (silencios entre parlamentos en G) y los tiempos por
// palabra (pj/). Correr desde partes/: escribe ../assets/voice/locucion.wav, palabras.json y voces.json.
// Voces: c clienta (Leda), t terapeuta (Kore), d dueño (Charon), o narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const G = {"02t":0.45,"03c":0.4,"04d":0.15,"05c":0.3,"06t":0.5,"07t":0.3,"08d":0.35,"09c":0.4,"10t":0.5,"11c":0.3,"12t":0.4,"13c":0.35,"14t":0.4,"15c":0.6,"16d":0.6,"17c":0.7,"18t":0.4,"19o":0.9,"20o":0.4};
const partes = fs.readdirSync("rec").filter(f => /\.wav$/.test(f)).map(f => f.slice(0, 3)).sort();
let t = 0, out = [], info = [], ins = [], filt = [];
for (const [k, b] of partes.entries()) {
  const g = G[b] || 0;
  t += g;
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${b}.wav`).toString());
  const ws = JSON.parse(fs.readFileSync(`pj/${b}.json`, "utf8"));
  ws[0].start = 0;
  for (let i = 1; i < ws.length; i++) if (ws[i].start <= ws[i - 1].start + 0.08) ws[i].start = Math.min(ws[i - 1].start + 0.12, d - 0.05);
  ws.forEach((w, i) => { const end = i + 1 < ws.length ? ws[i + 1].start : d; out.push({ id: out.length, text: w.text, start: +(t + w.start).toFixed(3), end: +(t + Math.max(end, w.start + 0.1)).toFixed(3), voz: b[2] }); });
  info.push(`${b} ${t.toFixed(2)}-${(t + d).toFixed(2)}`);
  ins.push(`-i rec/${b}.wav`);
  filt.push(`[${k}:a]adelay=${Math.round(t * 1000)}:all=1[a${k}]`);
  t += d;
}
const mix = `${filt.join(";")};${partes.map((_, k) => `[a${k}]`).join("")}amix=inputs=${partes.length}:normalize=0,atrim=0:${t.toFixed(3)}[o]`;
execSync(`ffmpeg -hide_banner -loglevel error -y ${ins.join(" ")} -filter_complex "${mix}" -map "[o]" -ar 48000 -ac 1 ../assets/voice/locucion.wav`);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out.map(({voz, ...w}) => w)));
fs.writeFileSync("voces.json", JSON.stringify(out.map(w => w.voz)));
console.log(info.join("\n"), "\ntotal", t.toFixed(2), out.length, "palabras");
