// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-debate).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.g.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: moderadora Kore (01 03 05 06 08 10 11 13 16), dueño Charon (02 04 07 09 14), agente Achird (12 15), narrador Orus (17 18).
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.2], ["02", 1.15], ["03", 1.22], ["04", 1.15], ["05", 1.22], ["06", 1.2], ["07", 1.1], ["08", 1.15], ["09", 1.12], ["10", 1.2], ["11", 1.22], ["12", 1.2], ["13", 1.05], ["14", 1.12], ["15", 1.2], ["16", 1.18], ["17", 1.17], ["18", 1.12]];
const G = [0.45, 0.35, 0.4, 0.35, 0.45, 0.35, 0.3, 0.4, 0.35, 1.0, 0.4, 0.35, 0.45, 0.35, 0.5, 0.7, 0.4];
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
