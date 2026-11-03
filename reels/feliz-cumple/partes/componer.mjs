// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/feliz-cumple).
// partes/NN.wav (voces.sh) -> partes/NN-p.wav (recortar.sh) -> tiempos.mjs sobre cada uno -> partes/NN.json.
// Graciela (Gacrux) con atempo 1.12, Julio (Charon) 1.08, Orus 1.1. G = silencios entre parlamentos.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.12], ["02", 1.12], ["03", 1.12], ["04", 1.12], ["05", 1.12], ["06", 1.08], ["07", 1.12], ["08", 1.1]];
const G = [0.45, 0.4, 0.45, 0.5, 0.35, 0.6, 0.6];
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
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
