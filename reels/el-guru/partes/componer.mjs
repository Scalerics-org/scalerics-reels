// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-guru).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con G.
// Voces: gurú Fenrir (01 02 03 05 07 09), dueño del público Charon (04 06 08), narrador Orus (10 11 12).
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.08], ["02", 1.16], ["03", 1.14], ["04", 1.08], ["05", 1.1], ["06", 1.16], ["07", 1.1], ["08", 1.12], ["09", 1.1], ["10", 1.1], ["11", 1.14], ["12", 1.08]];
const G = [0.5, 0.4, 1.0, 0.4, 0.45, 0.4, 0.55, 0.4, 1.0, 0.45, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
const fix = { 92: [40.42, 40.9], 99: [42.93, 43.5], 100: [43.75, 44.2] };
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
