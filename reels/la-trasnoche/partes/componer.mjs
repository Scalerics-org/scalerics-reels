// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/la-trasnoche).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con los
// silencios de G. Voces: Hugo Enceladus (01 02 04 06 08 12 15), Carmen Gacrux (03 05 10 14),
// Matías Puck (07), Raúl Charon (09 11), narrador Orus (13).
import fs from "node:fs";
import { execSync } from "node:child_process";
const H = 1.3, C = 1.22, M = 1.2, R = 1.15, O = 1.15;
const P = [["01", H], ["02", H], ["03", C], ["04", H], ["05", C], ["06", H], ["07", M], ["08", H], ["09", R], ["10", C], ["11", R], ["12", H], ["13", O], ["14", C], ["15", H]];
// silencio DESPUÉS de cada parlamento (antes de cada llamada, un poco más: suena el teléfono)
const G = [0.35, 0.45, 0.25, 0.25, 0.3, 0.5, 0.3, 0.45, 0.3, 0.3, 0.3, 0.45, 0.4, 0.35];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
// a mano (Speech-to-Text interpoló mal; tiempos sacados de los silencios de cada NN-p.wav)
const FIX = {
  "05": { 1: [1.06, 1.35], 2: [1.35, 1.58], 3: [1.69, 1.85], 4: [1.85, 2.98], 5: [3.18, 3.5], 6: [3.74, 4.2], 7: [4.2, 4.7], 8: [4.75, 5.37] },
  "08": { 2: [1.2, 2.4], 3: [2.81, 3.1] },
  "11": { 2: [0.8, 1.56], 3: [1.97, 2.4], 4: [2.4, 2.55], 5: [2.55, 2.65], 6: [2.65, 2.92], 7: [3.02, 3.29], 8: [3.42, 3.8], 9: [3.8, 3.95], 10: [3.95, 4.87] },
};
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ini = out.length;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [k, [x, y]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[k], { start: x, end: y });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", ini);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
