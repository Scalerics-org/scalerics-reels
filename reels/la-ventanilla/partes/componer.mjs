// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/la-ventanilla).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (cortar.sh) -> tiempos.mjs con NN.txt -> partes/NN.json.
// Cada parlamento con su atempo; el altavoz (01) con filtro de parlante viejo; la oficina con un
// eco chico de sala; el "¿Alguien?" (12) con eco de oficina vacía. Pegados con los silencios de G.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.12], ["02", 1.04], ["03", 1.1], ["04", 1.0], ["05", 1.08], ["06", 1.0], ["07", 1.08], ["08", 1.0], ["09", 1.1], ["10", 1.0], ["11", 1.1], ["12", 1.0], ["13", 1.15], ["14", 1.12]];
const G = [0.5, 0.4, 0.35, 0.35, 0.6, 0.4, 0.45, 0.35, 0.5, 0.7, 0.55, 0.6, 0.4];
const SALA = ",aecho=0.85:0.45:45|90:0.14|0.07";
const EXTRA = {
  "01": ",highpass=f=350,lowpass=f=3400,acompressor=threshold=0.1:ratio=4,aecho=0.8:0.5:70|140:0.22|0.12,volume=1.4",
  "12": ",aecho=0.8:0.6:120|240:0.3|0.18",
};
// arreglos a mano de palabras que Speech-to-Text no separó bien (segundos dentro del NN-c.wav)
const FIX = {
  "01": [[6, 0.9, 1.67], [7, 1.9, 2.02], [8, 2.02, 2.3]],
  "07": [[10, 3.633, 3.867], [11, 3.867, 4.5], [12, 4.75, 5.33]],
  "09": [[8, 2.7, 3.86], [9, 4.06, 4.2], [10, 4.2, 5.15], [14, 6.0, 6.45]],
  "04": [[0, 0, 0.2], [1, 0.29, 0.58], [2, 0.6, 0.68], [3, 0.7, 0.8], [4, 0.82, 1.37]],
  "13": [[0, 0, 0.2], [1, 0.2, 0.44], [2, 0.53, 0.6]],
};
const filtro = (n, a) => `atempo=${a}${EXTRA[n] ?? (Number(n) <= 12 ? SALA : "")}`;
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]${filtro(n, a)}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, s, e] of FIX[n] ?? []) { ws[j].start = s; ws[j].end = e; }
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${n}-c.wav -af "${filtro(n, a)}" /tmp/parte-ventanilla.wav`);
  t += dur("/tmp/parte-ventanilla.wav");
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
