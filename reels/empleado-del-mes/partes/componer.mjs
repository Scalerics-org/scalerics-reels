// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/empleado-del-mes).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh: silencios de las puntas recortados).
// Cada parlamento con su atempo, pegados con los silencios de G (los de ~1 s son para las risas
// y los aplausos del público). Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
// Voces: 01 03 05 06 09 presentador (Charon), 02 04 08 10 Marcelo (Puck), 07 agente de IA (Kore), 11 Orus.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.06], ["02", 1.05], ["03", 1.12], ["04", 1.0], ["05", 1.05], ["06", 1.16], ["07", 1.1], ["08", 1.05], ["09", 1.12], ["10", 1.0], ["11", 1.08]];
const G = [0.4, 0.35, 0.35, 0.3, 1.0, 1.2, 0.9, 0.35, 0.5, 0.6];
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
