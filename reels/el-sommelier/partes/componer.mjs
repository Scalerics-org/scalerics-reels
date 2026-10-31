// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-sommelier).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: sommelier Sadaltager (01, 03, 04, 06, 07, 08, 10, 13), clienta Leda (02, 05),
// dueño Charon (09), narrador Orus (11, 12, 14).
import fs from "node:fs";
import { execSync } from "node:child_process";
const GRAB = new Set([]);
const A = { "01": 1.18, "02": 1.06, "03": 1.2, "04": 1.2, "05": 1.08, "06": 1.2, "07": 1.18, "08": 1.15, "09": 1.05, "10": 1.18, "11": 1.15, "12": 1.18, "13": 1.15, "14": 1.12 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..13); 1.0 después de 08: la escupida
const G = [0.35, 0.3, 0.32, 0.3, 0.35, 0.32, 0.35, 1.0, 0.3, 0.6, 0.35, 0.5, 0.55];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const grab = GRAB.has(n) ? ",highpass=f=250,lowpass=f=4200,acompressor=threshold=0.1:ratio=3,volume=1.3" : "";
  filt += `[${k}:a]atempo=${a}${grab}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
