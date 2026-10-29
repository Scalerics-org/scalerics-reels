// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-grupo-de-los-agentes).
// partes/NN.wav (voces.sh; 03 y 10 regenerados porque decían mal "Yo le vendí" y "No es vago, che")
// -> partes/NN-c.wav con partes/cortar.sh (silencios de las puntas recortados, los de adentro achicados).
// Cada parlamento con su atempo, pegados con los silencios de G (el de 1 s es para las risas del grupo).
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.1], ["02", 1.06], ["03", 1.04], ["04", 1.06], ["05", 1.04], ["06", 1.06], ["07", 1.0], ["08", 1.06], ["09", 1.05], ["10", 1.06], ["11", 1.04], ["12", 1.06]];
const G = [0.55, 0.4, 0.4, 0.5, 0.4, 0.55, 0.45, 0.35, 1.0, 0.4, 0.6];
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
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
