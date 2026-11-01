// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/el-hipnotista).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh; fixpartes.mjs corrige palabras a mano).
// Mesmerino (Algenib), Osvaldo en trance (Charon), vecina del público (Leda), narrador Scalerics (Orus).
// La parte 09 ("¡Este hombre no se despierta nunca!") quedó afuera por largo.
import fs from "node:fs";
import { execSync } from "node:child_process";
const H = 1.25, D = 1.35, P = 1.12, O = 1.18;
// [parte, atempo, quién]  h Mesmerino · d Osvaldo · p vecina · o Scalerics
const PARTES = [["01", H, "h"], ["02", P, "p"], ["03", H, "h"], ["04", D, "d"], ["05", P, "p"], ["06", D, "d"], ["07", H, "h"],
  ["08", D, "d"], ["10", P, "p"], ["11", H, "h"], ["12", O, "o"], ["13", O, "o"]];
// silencios después de cada parlamento (más largos donde el público se ríe)
const G = [0.3, 0.75, 0.35, 0.3, 0.85, 0.35, 0.35, 0.3, 0.3, 0.55, 0.4];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [], inicios = [];
const r = (n) => Math.round(n * 1000) / 1000;
PARTES.forEach(([n, a, quien], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  inicios.push([n, r(t), r(t + dur(`partes/${n}-c.wav`) / a)]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("partes/inicios.json", JSON.stringify(inicios));
fs.writeFileSync("guion.txt", PARTES.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
