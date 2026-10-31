// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/respira-hondo).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (compactar.mjs: puntas y pausas largas recortadas).
// Guía de meditación (Aoede) atempo 1.08, dueño (Charon) 1.1, Orus 1.1.
// Tiempos: tiempos.mjs sobre cada NN-c.wav -> partes/NN.json, corregidos a mano en FIX (segundos
// relativos al NN-c.wav, mirando los silencios con silencedetect). Imprime el índice de la primera
// palabra de cada parlamento (para reel.voces).
import fs from "node:fs";
import { execSync } from "node:child_process";
const G_ = 1.08, D = 1.1, O = 1.1;
// [parte, atempo, quién]  g guía · d dueño · o Scalerics
const P = [["01", G_, "g"], ["02", G_, "g"], ["03", D, "d"], ["04", G_, "g"], ["05", D, "d"], ["06", G_, "g"], ["07", D, "d"], ["08", G_, "g"],
  ["09", D, "d"], ["10", G_, "g"], ["11", G_, "g"], ["12", O, "o"], ["13", D, "d"], ["14", G_, "g"], ["15", O, "o"]];
// silencio después de cada parte (las interrupciones del dueño entran pisando)
const G = [0.5, 0.2, 0.45, 0.2, 0.45, 0.3, 0.45, 0.25, 0.5, 0.5, 0.6, 0.45, 0.5, 0.6];
// correcciones: parte -> { índice de palabra en la parte: inicio relativo }
const FIX = {
  "02": { 10: 3.29, 11: 3.6, 12: 3.8, 13: 4.8, 14: 5.9, 15: 6.0 },
  "04": { 0: 0.0, 1: 0.35, 2: 0.55 },
  "07": { 1: 0.3, 2: 1.07, 3: 2.11, 4: 3.06, 5: 4.16 },
  "08": { 2: 1.72 },
  "10": { 1: 1.23, 2: 1.75, 3: 1.95, 8: 4.75, 9: 5.49 },
  "12": { 4: 2.25, 5: 2.38 },
  "13": { 1: 0.12 },
  "14": { 2: 1.49 },
};
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a, quien], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, s] of Object.entries(FIX[n] ?? {})) ws[j].start = s;
  ws.forEach((w, j) => { if (ws[j + 1]) w.end = Math.max(w.start + 0.08, Math.min(w.end, ws[j + 1].start)); else w.end = Math.max(w.end, w.start + 0.2); });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
