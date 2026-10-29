// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/cita-a-ciegas).
// Tiempos: tiempos.mjs sobre cada NN-c.wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.09], ["02", 1.1], ["03", 1.08], ["04", 1.04], ["05", 1.09], ["06", 1.09], ["07", 1.08], ["08", 1.06], ["09", 1.0], ["10", 1.08], ["11", 1.07]];
const G = [0.45, 0.4, 0.4, 0.85, 0.45, 0.45, 0.5, 0.55, 0.7, 0.45];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
// a mano (oído con silencedetect sobre la locución): "Vi todo", "Y al otro día" y "Lo del" estaban corridos
const fix = { 83: [33.44, 33.6], 84: [33.6, 33.95], 94: [36.85, 37.1], 120: [47.38, 47.5], 121: [47.5, 47.68] };
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
