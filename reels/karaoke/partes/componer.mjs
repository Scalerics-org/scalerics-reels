// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/karaoke).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos con tiempos.mjs).
// Animador (Puck), Vale (Leda), público (Fenrir), dueño (Charon), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const A = 1.15, V = 1.15, P = 1.08, D = 1.12, O = 1.2;
// [parte, atempo, quién]  a animador · v Vale · p público · d dueño · o Scalerics
const PARTES = [["02", V, "v"], ["03", P, "p"], ["04", V, "v"], ["05", V, "v"], ["07", V, "v"],
  ["08", A, "a"], ["09", D, "d"], ["10", O, "o"], ["11", O, "o"]];
// silencios después de cada parlamento (1 s donde reacciona el público)
const G = [0.35, 0.5, 0.5, 0.55, 0.9, 0.5, 0.55, 0.5];
// tiempos locales corregidos a mano: { "parte": { índice: segundo dentro del -c.wav } }
const FIX = { "02": { 8: 3.39, 9: 3.52, 10: 3.66 }, "03": { 1: 1.15 }, "05": { 1: 0.38, 9: 5.0 }, "07": { 1: 0.14 }, "09": { 7: 3.68 } };
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
PARTES.forEach(([n, a, quien], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, s] of Object.entries(FIX[n] ?? {})) { ws[j].start = s; if (ws[j - 1]) ws[j - 1].end = Math.min(ws[j - 1].end, s); }
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + Math.max(w.end, w.start + 0.1) / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", PARTES.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
