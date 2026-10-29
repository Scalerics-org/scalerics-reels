// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/la-receta).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios de punta recortados con silenceremove.
// El chef (Fenrir) va con atempo 1.15 (1.12 en el giro) (programa de mediodía, apurado); la clienta (Leda) tal cual, con las pausas largas de cuando prueba acortadas a mano (aselect)
// (las pausas que quedan son el chiste); Orus 1.1. Pegados con los silencios de G
// (el de 1 s después de "¡Espantada! Salió perfecta." es el aplauso del estudio).
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.15], ["02", 1.15], ["03", 1.15], ["04", 1.15], ["05", 1.15], ["06", 1.15], ["07", 1.0], ["08", 1.1], ["09", 1.12], ["10", 1.05], ["11", 1.1]];
const G = [0.45, 0.4, 0.4, 0.4, 0.4, 0.5, 0.35, 1.0, 0.5, 0.45];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
// a mano (oído con silencedetect), en segundos del parlamento sin atempo
const FIX = { "02": { 2: [1.26, 1.62], 3: [1.62, 1.72] }, "04": { 0: [0, 0.35], 1: [0.35, 0.89], 2: [1.13, 1.5], 3: [1.5, 1.6], 4: [1.6, 2.04], 5: [2.39, 2.6], 6: [2.6, 3.4] }, "06": { 0: [0, 0.15], 1: [0.15, 0.55], 2: [0.55, 1.15], 9: [4.78, 5.19], 10: [5.37, 5.5], 11: [5.5, 5.79], 12: [6.17, 6.47], 13: [6.76, 7.1] }, "07": { 0: [0, 0.7], 1: [1.165, 1.38], 2: [1.38, 1.95], 5: [3.98, 4.05], 6: [4.05, 4.2] } };
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, [s, e]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[j], { start: s, end: e });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length - ws.length);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
