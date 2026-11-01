// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/cuenta-cartas).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos con tiempos.mjs).
// crupier (Kore), dueño (Charon), el de enfrente (Fenrir), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const K = Number(process.env.AK ?? 1.3), C = Number(process.env.AC ?? 1.22), F = Number(process.env.AF ?? 1.18), O = Number(process.env.AO ?? 1.2);
// [parte, atempo, quién]  k crupier · c dueño · f el de enfrente · o Scalerics
const P = [["01", K, "k"], ["02", K, "k"], ["03", K, "k"], ["04", C, "c"], ["05", F, "f"], ["06", K, "k"], ["07", C, "c"], ["08", F, "f"],
  ["09", K, "k"], ["10", C, "c"], ["11", F, "f"], ["12", K, "k"], ["13", K, "k"], ["14", K, "k"], ["15", K, "k"], ["16", F, "f"], ["17", O, "o"],
  ["18", O, "o"], ["19", K, "k"], ["20", O, "o"]];
// silencios entre parlamentos (después de cada uno); 1.4 s de "pensalo" después del 12
const G = [0.25, 0.22, 0.25, 0.25, 0.3, 0.25, 0.25, 0.3, 0.25, 0.25, 0.4, 1.4, 0.22, 0.3, 0.25, 0.4, 0.25, 0.35, 0.4];
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
