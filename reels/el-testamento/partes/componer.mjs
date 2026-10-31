// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-testamento).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: escribano Charon (01, 02, 04, 07, 09), hija Leda (03, 06, 10, 14), hijo Fenrir (05, 08, 11),
// Don Hugo Gacrux (13, 18; grabación desde la costa, con filtro), narrador Orus (15, 16, 17, 19).
// La 12 ("Hay un mensaje grabado") quedó afuera por largo.
import fs from "node:fs";
import { execSync } from "node:child_process";
const GRAB = new Set(["13", "18"]);
const A = { "01": 1.22, "02": 1.3, "03": 1.12, "04": 1.3, "05": 1.12, "06": 1.12, "07": 1.3, "08": 1.12, "09": 1.25, "10": 1.12, "11": 1.08, "13": 1.14, "14": 1.12, "15": 1.15, "16": 1.2, "17": 1.1, "18": 1.08, "19": 1.1 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..19 sin 12)
const G = [0.4, 0.32, 0.28, 0.28, 0.32, 0.28, 0.32, 0.28, 0.28, 0.55, 0.55, 0.5, 0.55, 0.32, 0.38, 0.38, 0.42];
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
