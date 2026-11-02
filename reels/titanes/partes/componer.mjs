// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/titanes).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Recortados a mano:
// 02-p sin "En este rincón" (cortado 4.30-6.10 s), 07-p a 4.6 s (dejé 4 de las 5 palabras), 11-p a 3.8 s (la voz agregó un "hola, tu pedido" de más),
// 15-p a 4.75 s (la risa del final, cortada). Tiempos: tiempos.mjs sobre cada NN-p.wav -> partes/NN.json,
// y fijar.mjs pisa los que STT comprimió. Cada parlamento con su atempo, pegados con G.
// Voces: presentador Fenrir (01 02 04 06 08 10 12 13 15), los rivales enmascarados Algenib (05 07 09),
// el dueño Charon (03 11), narrador Orus (14 16).
import fs from "node:fs";
import { execSync } from "node:child_process";
const A = { "01": 1.3, "02": 1.3, "03": 1.12, "04": 1.32, "05": 1.2, "06": 1.3, "07": 1.18, "08": 1.3, "09": 1.2, "10": 1.25, "11": 1.15, "12": 1.25, "13": 1.28, "14": 1.15, "15": 1.22, "16": 1.12 };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (más largo donde suena la campana o el público)
const G = [0.45, 0.3, 0.45, 0.3, 0.4, 0.25, 0.4, 0.25, 0.4, 0.3, 0.3, 0.8, 0.35, 0.35, 0.5];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
