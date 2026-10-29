// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/storytime).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (cortar.sh: silencios recortados y dos frases fuera).
// Cada parlamento con su atempo (la influencer va acelerada), pegados con los silencios de G
// (el de 0.8 s es la pausa incómoda después de "todo el barrio").
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.2], ["02", 1.2], ["03", 1.2], ["04", 1.2], ["05", 1.08], ["06", 1.2], ["07", 1.2], ["08", 1.05], ["09", 1.15], ["10", 1.08]];
const G = [0.45, 0.35, 0.35, 0.6, 0.45, 0.5, 0.35, 0.8, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
// a mano (con silencedetect), en segundos del parlamento sin atempo
const FIX = {
  "03": { 13: [6.6, 7.24], 14: [7.32, 7.62], 15: [8.82, 9.22], 16: [9.22, 9.5] },
  "07": { 4: [1.45, 1.59] },
  "10": { 28: [10.1, 10.3], 29: [10.3, 10.6], 30: [10.6, 11.27] },
  "06": { 1: [1.08, 1.59], 2: [2.09, 2.25], 3: [2.25, 2.72], 4: [3.11, 3.3] },
};
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, [s, e]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[j], { start: s, end: e });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
