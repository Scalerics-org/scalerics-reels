// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/la-quiniela).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos con tiempos.mjs).
// locutora (Aoede), clienta (Leda), dueño (Charon), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const L = Number(process.env.AL ?? 1.28), C = Number(process.env.AC ?? 1.15), D = Number(process.env.AD ?? 1.15), O = Number(process.env.AO ?? 1.15);
// [parte, atempo, quién]  l locutora · c clienta · d dueño · o Scalerics
const P = [["01", L, "l"], ["02", L, "l"], ["03", L, "l"], ["04", C, "c"], ["05", L, "l"], ["06", C, "c"], ["07", D, "d"], ["08", L, "l"],
  ["09", L, "l"], ["10", C, "c"], ["11", D, "d"], ["12", L, "l"], ["13", O, "o"], ["14", O, "o"], ["15", L, "l"], ["16", C, "c"], ["17", L, "l"], ["18", O, "o"]];
// silencios entre parlamentos (después de cada uno)
const G = [0.3, 0.35, 0.3, 0.35, 0.3, 0.3, 0.3, 0.4, 0.3, 0.35, 0.45, 0.45, 0.3, 0.5, 0.3, 0.35, 0.45];
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
