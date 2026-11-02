// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-match).
// partes/NN.wav (voces.sh) -> partes/NN-p.wav (recortar.sh). Tiempos: tiempos.mjs sobre cada NN-p.wav -> partes/NN.json.
// Voces: coach (Zephyr) 01 03 05 07 09 11, dueño de la óptica (Puck) 02 06, Gabriela (Kore) 04 10, narrador (Orus) 08.
import fs from "node:fs";
import { execSync } from "node:child_process";
// [parte, atempo]
const P = [["01", 1.06], ["02", 1.05], ["03", 1.1], ["04", 1.0], ["05", 1.1], ["06", 1.06], ["07", 1.08], ["08", 1.1], ["09", 1.05], ["10", 1.0], ["11", 1.05]];
// silencios entre parlamentos
const G = [0.35, 0.4, 0.35, 0.45, 0.35, 0.45, 0.55, 0.45, 0.35, 0.4];
// tiempos oídos a mano (en segundos del NN-p.wav), por índice de palabra
const FIX = {
  "01": { 1: [1.0, 1.77] },
  "03": { 14: [3.0, 3.1], 15: [3.54, 4.42], 16: [5.03, 5.6], 30: [9.3, 9.55], 31: [9.55, 10.1], 32: [10.38, 10.75], 33: [10.75, 10.85], 34: [10.85, 11.0], 35: [11.0, 11.3] },
  "05": { 20: [6.2, 6.55], 21: [7.2, 7.35], 22: [7.35, 7.6], 23: [7.6, 7.7], 24: [7.7, 7.8], 25: [7.8, 8.0], 26: [8.0, 8.44] },
  "08": { 4: [1.3, 2.32], 11: [4.3, 4.7], 12: [5.08, 5.3], 13: [5.3, 5.4], 14: [5.4, 5.98], 15: [6.15, 6.25], 16: [6.25, 6.5], 30: [10.51, 10.75], 31: [10.75, 11.1], 32: [11.1, 11.25], 33: [11.25, 11.4], 34: [11.4, 12.15], 35: [12.45, 12.6], 36: [12.6, 13.13], 37: [13.29, 13.4], 38: [13.4, 13.5], 39: [13.5, 14.1] },
  "11": { 0: [0, 0.67], 2: [1.2, 1.5], 8: [3.84, 4.35], 9: [4.35, 4.45], 10: [4.45, 4.55], 11: [4.55, 5.3] },
};
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  console.log(n, "arranca en", r(t), "palabra", out.length);
  ws.forEach((w, j) => {
    const [s, e] = FIX[n]?.[j] ?? [w.start, w.end];
    out.push({ id: out.length, text: w.text, start: r(t + s / a), end: r(t + e / a) });
  });
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
