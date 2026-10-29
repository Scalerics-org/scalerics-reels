// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-remate).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios recortados con silenceremove.
// Cada parlamento con su atempo (el rematador va apurado), pegados con los silencios de G (el de
// 1 s es el martillazo de "¡Vendido!" con el murmullo de la sala).
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.0], ["02", 1.15], ["03", 1.0], ["04", 1.1], ["05", 1.0], ["06", 1.1], ["07", 1.0], ["08", 1.05], ["09", 1.05], ["10", 1.0], ["11", 1.05], ["12", 1.0], ["13", 1.05]];
const G = [0.5, 0.4, 0.3, 0.35, 0.3, 0.4, 0.4, 1.0, 0.45, 0.4, 0.5, 0.8];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
// a mano (oído con silencedetect), en segundos del parlamento sin atempo
const FIX = { "08": { 3: [0.89, 1.0], 4: [1.0, 1.25], 5: [1.25, 1.82] } };
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
