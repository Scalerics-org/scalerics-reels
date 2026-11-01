// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/la-pesca).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos con tiempos.mjs).
// conductor (Fenrir), clienta-pez (Leda), dueño (Charon), agente de IA (Kore), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const F = Number(process.env.AF ?? 1.22), L = Number(process.env.AL ?? 1.15), C = Number(process.env.AC ?? 1.12), K = Number(process.env.AK ?? 1.2), O = Number(process.env.AO ?? 1.15);
// [parte, atempo, quién]  f conductor · c clienta · d dueño · k agente · o Scalerics
const P = [["01", F, "f"], ["02", F, "f"], ["03", F, "f"], ["04", L, "c"], ["05", F, "f"], ["06", C, "d"], ["07", F, "f"], ["08", L, "c"],
  ["09", F, "f"], ["10", C, "d"], ["11", F, "f"], ["12", C, "d"], ["13", F, "f"], ["14", F, "f"], ["15", O, "o"], ["16", K, "k"], ["17", L, "c"], ["18", F, "f"], ["19", O, "o"]];
// silencios entre parlamentos (después de cada uno)
const G = [0.45, 0.3, 0.4, 0.3, 0.35, 0.3, 0.35, 0.35, 0.4, 0.3, 0.3, 0.3, 0.5, 0.45, 0.35, 0.35, 0.3, 0.5];
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
