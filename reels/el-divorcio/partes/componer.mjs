// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-divorcio).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: mediadora Kore (01, 02, 05, 07, 11, 14, 20), dueño Charon (03, 09, 12, 15),
// vendedor Fenrir (04, 06, 08, 10, 13, 19), narrador Orus (16, 17, 18, 21).
import fs from "node:fs";
import { execSync } from "node:child_process";
const A = { "01": 1.08, "02": 1.1, "03": 1.06, "04": 1.04, "05": 1.1, "06": 1.06, "07": 1.04, "08": 1.08, "09": 1.04, "10": 1.1, "11": 1.12, "12": 1.0, "13": 1.06, "14": 1.12, "15": 1.04, "16": 1.12, "17": 1.15, "18": 1.1, "19": 1.06, "20": 1.0, "21": 1.06 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..20)
const G = [0.5, 0.35, 0.3, 0.4, 0.3, 0.45, 0.4, 0.35, 0.4, 0.5, 0.45, 0.35, 0.8, 0.4, 0.7, 0.4, 0.4, 0.6, 0.35, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length - JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")).length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
