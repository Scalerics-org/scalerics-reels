// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/emergencias).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: operadora Kore (01, 03, 05, 07, 09, 11), llamador Puck (02, 04, 06, 08, con filtro de
// teléfono suave), patrullero Charon (10, 12, con filtro de radio), narrador Orus (13, 14).
import fs from "node:fs";
import { execSync } from "node:child_process";
const TEL = new Set(["02", "04", "06", "08"]);
const RADIO = new Set(["10", "12"]);
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
  const tel = TEL.has(n) ? ",highpass=f=250,lowpass=f=5000,acompressor=threshold=0.1:ratio=2.5,volume=1.25"
    : RADIO.has(n) ? ",highpass=f=400,lowpass=f=3200,acompressor=threshold=0.06:ratio=4,volume=1.5" : "";
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
