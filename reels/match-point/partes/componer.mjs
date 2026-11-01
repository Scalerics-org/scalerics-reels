// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/match-point).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: comentarista Charon (01, 04, 09, 14, 18), comentarista Kore (02, 06, 12, 15, 17),
// empleada Leda (03, 07, 10), depósito Fenrir (05, 08, 11; con filtro de teléfono),
// clienta Aoede (13), narrador Orus (16, 19).
import fs from "node:fs";
import { execSync } from "node:child_process";
const TEL = new Set(["05", "08", "11"]);
const A = { "01": 1.1, "02": 1.1, "03": 1.06, "04": 1.08, "05": 1.06, "06": 1.1, "07": 1.08, "08": 1.06, "09": 1.1, "10": 1.06, "11": 1.06, "12": 1.08, "13": 1.04, "14": 1.1, "15": 1.12, "16": 1.12, "17": 1.08, "18": 1.1, "19": 1.08 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..18)
const G = [0.45, 0.5, 0.3, 0.3, 0.35, 0.35, 0.3, 0.4, 0.35, 0.25, 0.4, 0.7, 0.5, 0.6, 0.5, 0.4, 0.35, 0.5];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const tel = TEL.has(n) ? ",highpass=f=350,lowpass=f=3400,acompressor=threshold=0.08:ratio=4,volume=1.4" : "";
  filt += `[${k}:a]atempo=${a}${tel}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  console.log(n, "arranca en", r(t), "palabra", out.length);
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
