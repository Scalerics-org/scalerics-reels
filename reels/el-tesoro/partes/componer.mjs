// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/el-tesoro).
// partes/NN.wav (voces.sh; el loro 02/09/18 con el tono subido) -> partes/NN-c.wav + partes/NN.json (tiempos.sh).
// Capitán (Algenib), grumete (Puck), loro (Zephyr + pitch), narrador Scalerics (Orus).
// La parte 13 ("Siete mares crucé por una fugazzeta") quedó afuera por duración.
import fs from "node:fs";
import { execSync } from "node:child_process";
const C = 1.3, G_ = 1.25, L = 1.1, O = 1.18;
// [parte, atempo, quién]  c capitán · g grumete · l loro · o Scalerics
const P = [["01", C, "c"], ["02", L, "l"], ["03", C, "c"], ["04", G_, "g"], ["05", C, "c"], ["06", G_, "g"], ["07", C, "c"],
  ["08", G_, "g"], ["09", L, "l"], ["10", G_, "g"], ["11", C, "c"], ["12", G_, "g"], ["14", G_, "g"], ["15", C, "c"],
  ["16", O, "o"], ["17", G_, "g"], ["18", L, "l"], ["19", O, "o"]];
// silencios después de cada parlamento
const G = [0.3, 0.45, 0.35, 0.4, 0.35, 0.35, 0.35, 0.3, 0.4, 0.4, 0.8, 0.4, 0.45, 0.55, 0.4, 0.3, 0.55];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a, quien], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
const fix = JSON.parse(fs.existsSync("partes/fix.json") ? fs.readFileSync("partes/fix.json", "utf8") : "{}");
for (const [i, a] of Object.entries(fix)) if (out[i]) { out[i].start = a; out[i].end = Math.max(out[i].end, a + 0.12); }
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
