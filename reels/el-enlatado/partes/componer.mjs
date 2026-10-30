// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-enlatado).
// OJO: partes/08-p.wav está recortado a mano a 3.95 s (la voz repitió "¡Y ahora tengo los dos!"): si se corre
// pausas.sh de nuevo, volver a recortarlo con: ffmpeg -i partes/08-p.wav -af "atrim=0:3.95,afade=t=out:st=3.85:d=0.1" ...
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: comentarista Puck (01, 03, 05, 07, 09, 11), anunciador Fenrir (02, 14), el enlatado Kore
// con filtro de robot (04, 06, 10), dueño Charon (08), entrenador Algenib (12), narrador Orus (13, 15).
import fs from "node:fs";
import { execSync } from "node:child_process";
const ROBOT = new Set(["04", "06", "10"]);
const A = { "01": 1.2, "02": 1.2, "03": 1.22, "04": 1.25, "05": 1.22, "06": 1.25, "07": 1.22, "08": 1.12, "09": 1.2, "10": 1.25, "11": 1.22, "12": 1.15, "13": 1.17, "14": 1.12, "15": 1.1 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (1 s donde suena la campana o el público)
const G = [0.4, 0.8, 0.3, 0.35, 0.3, 0.4, 0.3, 0.35, 0.25, 0.45, 0.35, 0.5, 0.4, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const robot = ROBOT.has(n) ? ",afftfilt=real='hypot(re,im)':imag='0':win_size=512:overlap=0.75,aecho=0.8:0.6:12:0.35,highpass=f=180,volume=1.5" : "";
  filt += `[${k}:a]atempo=${a}${robot}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
