// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/duelo-al-mediodia).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: narrador western Algenib (01 02 04 07 09 12), clienta Leda (03 06), pistolero Fenrir (05 11),
// dueño Charon (08 10), Scalerics Orus (13 14).
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.32], ["02", 1.35], ["03", 1.05], ["04", 1.3], ["05", 1.1], ["06", 1.05], ["07", 1.28], ["08", 1.08], ["09", 1.25], ["10", 1.08], ["11", 1.15], ["12", 1.3], ["13", 1.12], ["14", 1.08]];
const G = [0.45, 0.5, 0.35, 0.4, 0.35, 0.55, 0.4, 0.45, 0.4, 0.45, 0.45, 0.65, 0.4];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
