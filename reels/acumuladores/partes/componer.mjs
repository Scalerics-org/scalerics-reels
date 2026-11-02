// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/acumuladores).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: voz en off del reality Algenib (01 02 09 13), Patricia organizadora Kore (03 05 07 11),
// Norma Gacrux (04 06 08 10 14), narrador Scalerics Orus (12 15).
import fs from "node:fs";
import { execSync } from "node:child_process";
const TEL = new Set([]);
const A = JSON.parse(fs.readFileSync("partes/atempo.json", "utf8"));
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..12)
const G = JSON.parse(fs.readFileSync("partes/gaps.json", "utf8"));
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const tel = TEL.has(n) ? ",highpass=f=350,lowpass=f=3600,acompressor=threshold=0.08:ratio=3,volume=1.4" : "";
  filt += `[${k}:a]atempo=${a}${tel}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  console.log(n, "arranca en", r(t), "palabra", out.length);
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
