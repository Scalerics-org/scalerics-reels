// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/papa-no-quiero).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios de punta recortados y pausas internas
// de más de 0.5 s llevadas a 0.35 s. Cada parlamento con su atempo, pegados con los silencios de G
// (el de 0.9 s es el "¿la mejor?" que le cuesta; el de 1.4 s es el silencio del padre antes de
// "¿y eso cuánto lleva?").
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.05], ["02", 1.0], ["03", 1.05], ["04", 1.0], ["05", 1.07], ["06", 1.0], ["07", 1.07], ["08", 1.0], ["09", 1.03], ["10", 1.0], ["11", 1.07]];
const G = [0.45, 0.5, 0.4, 0.4, 0.45, 0.4, 0.9, 0.6, 1.4, 0.8];
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
// a mano (silencedetect): "¡Treinta" estaba interpolado, "Así" y "O" caían dentro de un silencio
const fix = { 12: [4.11, 4.5], 13: [4.55, 4.8], 14: [4.85, 5.55], 15: [5.6, 5.7], 16: [5.75, 6.3], 17: [6.87, 7.6],
  115: [45.04, 45.25], 116: [45.28, 45.45], 117: [45.47, 45.7], 118: [45.76, 46.1],
  162: [63.32, 63.43], 163: [63.45, 63.53], 164: [63.55, 63.63], 165: [63.65, 64.0] };
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
