// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/habia-una-vez).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: cuentacuentos Gacrux (01 02 05 10 11 18 19 20 22), Caperucita Leda (03 06 08 12 14 16),
// tu local Charon (04 07 09), el lobo Fenrir (13 15 17), narrador Orus (21).
import fs from "node:fs";
import { execSync } from "node:child_process";
const A = 1.3, CA = 1.15, LO = 1.12, W = 1.14, O = 1.17;
const P = [["01", A], ["02", A], ["03", CA], ["04", LO], ["05", A], ["06", CA], ["07", LO], ["08", CA], ["09", LO], ["10", A], ["11", A], ["12", CA], ["13", W], ["14", CA], ["15", W], ["16", CA], ["17", W], ["18", A], ["19", A], ["20", A], ["21", O], ["22", A]];
const G = [0.35, 0.35, 0.28, 0.35, 0.35, 0.28, 0.3, 0.28, 0.4, 0.3, 0.35, 0.28, 0.3, 0.28, 0.3, 0.28, 0.55, 0.3, 0.35, 0.5, 0.45];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
const fix = {};
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
