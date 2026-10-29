// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-millon).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh: puntas recortadas y pausas topeadas).
// Cada parlamento con su atempo, pegados con los silencios de G (el de 1.4 s después de "¿Qué
// respondés?" es para que el que mira piense, con el reloj; los de 0.6-0.8 s son reacciones del público).
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json, y a mano (FIX/TRAMOS,
// oídos con silencedetect) donde Speech-to-Text no oyó las letras de las opciones.
// Voces: 01 03 05 08 10 12 conductor (Algenib), 02 06 09 11 dueño (Charon), 04 amigo (Puck),
// 07 público (Leda, Fenrir, Kore y Puck encimados), 13 Orus.
import fs from "node:fs";
import { execSync } from "node:child_process";
const C = 1.18, D = 1.08;
const P = [["01", C], ["02", D], ["03", C], ["04", 1.0], ["05", C], ["06", D], ["07", 1.0], ["08", C], ["09", D], ["10", C], ["11", D], ["12", C], ["13", 1.12]];
const G = [0.45, 0.3, 0.6, 0.35, 0.3, 0.4, 0.5, 1.4, 0.8, 0.35, 0.35, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
// tramos con voz [desde, hasta] (segundos del NN-c.wav sin atempo) y cuántas palabras van en cada uno:
// las palabras se reparten adentro de su tramo según su largo
const TRAMOS = {
  "01": [[0, 0.84, 3], [1.18, 2.61, 4], [2.82, 4.53, 5], [4.9, 5.12, 1], [5.47, 5.97, 2], [6.34, 6.65, 1], [6.98, 7.74, 2], [8.08, 8.55, 1], [8.88, 10.84, 6], [11.22, 11.67, 1], [12.0, 14.05, 3]],
  "04": [[0, 0.36, 1], [0.77, 1.51, 3], [1.89, 2.82, 4]],
  "09": [[0, 0.42, 2], [0.5, 1.1, 2], [1.52, 2.41, 2]],
  "13": [[0, 2.7, 7], [3.0, 4.76, 5], [4.94, 5.9, 3], [6.1, 7.72, 6], [8.02, 10.24, 9], [10.56, 12.02, 3], [12.33, 12.79, 1], [12.94, 13.16, 1], [13.41, 13.71, 1], [13.92, 14.26, 1], [14.49, 14.8, 2]],
};
const repartir = (ws, tramos) => {
  let k = 0;
  for (const [a, b, n] of tramos) {
    const grupo = ws.slice(k, k + n);
    const tot = grupo.reduce((s, w) => s + w.text.replace(/[^\p{L}\p{N}]/gu, "").length + 1, 0);
    let t = a;
    for (const w of grupo) { const d = ((b - a) * (w.text.replace(/[^\p{L}\p{N}]/gu, "").length + 1)) / tot; w.start = t; w.end = t + d; t += d; }
    k += n;
  }
  if (k !== ws.length) throw new Error(`tramos: ${k} palabras de ${ws.length}`);
};
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  if (TRAMOS[n]) repartir(ws, TRAMOS[n]);
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
