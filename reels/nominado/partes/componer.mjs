// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/nominado).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: conductora Aoede (01, 02, 07, 10, 16), el Hermano Algenib (03, 05, 09; con eco de parlante),
// clienta Leda (04, 08, 12), Walter Charon (06, 13), agente de IA Kore (11, 14), narrador Orus (15).
import fs from "node:fs";
import { execSync } from "node:child_process";
const HNO = new Set(["03", "05", "09"]);
const A = { "01": 1.14, "02": 1.16, "03": 1.06, "04": 1.24, "05": 1.06, "06": 1.16, "07": 1.3, "08": 1.2, "09": 1.1, "10": 1.12, "11": 1.27, "12": 1.12, "13": 1.05, "14": 1.08, "15": 1.16, "16": 1.12 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..15)
const G = [0.4, 0.45, 0.35, 0.5, 0.35, 0.5, 0.4, 0.5, 0.35, 0.45, 0.45, 0.35, 0.3, 0.55, 0.5];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const eco = HNO.has(n) ? ",aecho=0.8:0.5:60:0.25,volume=1.1" : "";
  filt += `[${k}:a]atempo=${a}${eco}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
