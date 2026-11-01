// Arma ../assets/voice/locucion.wav y palabras.json con los parlamentos de fin/ (raw/ recortado con silenceremove y
// acelerados: capo x1.12, muchacho x1.05) y los tiempos de pj/. Los silencios van en G.
// Correr desde partes/. Escribe también voces.json (quién dice cada palabra) y ../guion.txt.
import fs from "node:fs";
import { execSync } from "node:child_process";
const G = { "02c": 0.5, "03m": 0.45, "04c": 0.3, "05m": 0.35, "06c": 0.3, "07m": 0.35, "08c": 0.3, "09m": 0.5, "10c": 0.4, "11m": 0.5, "12c": 0.4, "13c": 0.55, "14o": 0.8, "15o": 0.45 };
const FIX = {};
const partes = fs.readdirSync("fin").filter((f) => /\.wav$/.test(f)).map((f) => f.slice(0, 3)).sort();
let t = 0, out = [], info = [], ins = [];
for (const b of partes) {
  const g = G[b] || 0;
  if (g) ins.push(`-f lavfi -t ${g} -i anullsrc=r=48000:cl=mono`);
  t += g;
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 fin/${b}.wav`).toString());
  ins.push(`-i fin/${b}.wav`);
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
fs.writeFileSync("../guion.txt", partes.map((b) => fs.readFileSync(`${b}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(info.join("\n"), "\ntotal", t.toFixed(2), out.length, "palabras");
