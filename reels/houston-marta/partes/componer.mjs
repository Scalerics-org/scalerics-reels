// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/houston-marta).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: director Charon (01, 03, 05, 10, 13, 14), operador Puck (02, 04, 07, 09, 12),
// Marta Aoede (06, 08, 11, 17; con filtro de radio), narrador Orus (15, 16, 18).
import fs from "node:fs";
import { execSync } from "node:child_process";
const RADIO = new Set(["06", "08", "11"]); // Marta desde la playa: suena por radio
const A = { "01": 1.1, "02": 1.15, "03": 1.1, "04": 1.15, "05": 1.1, "06": 1.15, "07": 1.15, "08": 1.15, "09": 1.15, "10": 1.1, "11": 1.15, "12": 1.1, "13": 1.12, "14": 1.15, "15": 1.17, "16": 1.13, "17": 1.08, "18": 1.08 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento
const G = [0.4, 0.3, 0.25, 0.35, 0.5, 0.4, 0.35, 0.4, 0.3, 0.35, 0.25, 0.5, 0.7, 0.45, 0.35, 0.4, 0.35];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const radio = RADIO.has(n) ? ",highpass=f=350,lowpass=f=3400,acompressor=threshold=0.1:ratio=4,volume=1.4" : "";
  filt += `[${k}:a]atempo=${a}${radio}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
