// Arma la locución con los parlamentos de cmp/ (silencios antes de cada parlamento en G) y los tiempos por
// palabra (pj/). Correr desde partes/: escribe ../assets/voice/locucion.wav, palabras.json y voces.json.
// Voces: g Gustavo (Charon), x el grupo a coro (Kore+Leda+Puck+Fenrir), k coordinadora (Kore),
// m Mirta (Leda), r Rosa (Aoede), o narrador Scalerics (Orus).
// Cadena: gen.sh/gentodo.sh -> raw/ ; recortar.sh -> rec/ ; compactar.mjs -> cmp/ ; pj.sh -> pj/ ; unir.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const G = { "02x": 0.3, "03k": 0.45, "05k": 0.3, "06g": 0.3, "07g": 0.45, "08g": 0.35, "09k": 0.45, "10m": 0.3, "11k": 0.35, "12m": 0.35,
  "13k": 1.15, "14g": 0.4, "15k": 0.45, "16k": 0.6, "17g": 0.3, "18r": 0.35, "19g": 0.4, "20r": 0.3, "21o": 1.05, "22o": 0.35 };
const partes = fs.readdirSync("cmp").filter((f) => /^\d\d[a-z]\.wav$/.test(f)).map((f) => f.slice(0, 3)).sort();
let t = 0; const out = [], info = [], ins = [], filt = [];
for (const [k, b] of partes.entries()) {
  t += G[b] ?? 0.35 * (k > 0);
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 cmp/${b}.wav`).toString());
  const ws = JSON.parse(fs.readFileSync(`pj/${b}.json`, "utf8"));
  ws[0].start = 0;
  for (let i = 1; i < ws.length; i++) if (ws[i].start <= ws[i - 1].start + 0.08) ws[i].start = Math.min(ws[i - 1].start + 0.12, d - 0.05);
  ws.forEach((w, i) => { const end = i + 1 < ws.length ? ws[i + 1].start : d; out.push({ id: out.length, text: w.text, start: +(t + w.start).toFixed(3), end: +(t + Math.max(end, w.start + 0.1)).toFixed(3), voz: b[2] }); });
  info.push(`${b} ${t.toFixed(2)}-${(t + d).toFixed(2)}`);
  ins.push(`-i cmp/${b}.wav`);
  filt.push(`[${k}:a]adelay=${Math.round(t * 1000)}:all=1[a${k}]`);
  t += d;
}
const mix = `${filt.join(";")};${partes.map((_, k) => `[a${k}]`).join("")}amix=inputs=${partes.length}:normalize=0,atrim=0:${t.toFixed(3)}[o]`;
execSync(`ffmpeg -hide_banner -loglevel error -y ${ins.join(" ")} -filter_complex "${mix}" -map "[o]" -ar 48000 -ac 1 ../assets/voice/locucion.wav`);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out.map(({ voz, ...w }) => w)));
fs.writeFileSync("voces.json", JSON.stringify(out.map((w) => w.voz)));
console.log(info.join("\n"), "\ntotal", t.toFixed(2), out.length, "palabras");
