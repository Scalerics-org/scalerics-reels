// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/pit-stop).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: relator Puck (01, 02, 04, 08, 09, 14), cliente por la radio del auto Leda (03, 06; con
// filtro de radio), dueño mecánico Charon (05), comentarista Kore (07, 10, 11), narrador Orus (12, 13, 15).
import fs from "node:fs";
import { execSync } from "node:child_process";
const RADIO = new Set(["03", "06"]);
const A = { "01": 1.12, "02": 1.15, "03": 1.08, "04": 1.12, "05": 1.1, "06": 1.05, "07": 1.15, "08": 1.12, "09": 1.12, "10": 1.15, "11": 1.17, "12": 1.12, "13": 1.15, "14": 1.12, "15": 1.08 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..14)
const G = [0.45, 0.35, 0.4, 0.3, 0.45, 0.5, 0.35, 0.3, 0.45, 0.5, 0.55, 0.32, 0.42, 0.45];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const radio = RADIO.has(n) ? ",highpass=f=400,lowpass=f=3200,acompressor=threshold=0.08:ratio=4,volume=1.5" : "";
  filt += `[${k}:a]atempo=${a}${radio}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length - JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")).length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
