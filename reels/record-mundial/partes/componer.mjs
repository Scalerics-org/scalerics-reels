// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/record-mundial).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh: silencios de las puntas recortados).
// Cada parlamento con su atempo, pegados con los silencios de G (los de ~1 s son para las risas
// y los aplausos del público). Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
// Voces: 01 02 04 08 presentador (Puck), 03 07 09 11 juez (Rasalgethi), 05 Graciela (Aoede), 06 10 Walter (Charon), 12 Orus.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.08], ["02", 1.12], ["03", 1.2], ["04", 1.05], ["05", 1.05], ["06", 1.0], ["07", 1.15], ["08", 1.05], ["09", 1.15], ["10", 1.0], ["11", 1.0], ["12", 1.12]];
const G = [0.45, 0.4, 0.4, 0.4, 0.35, 0.45, 0.45, 1.1, 0.45, 0.35, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
const fix = {};
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
