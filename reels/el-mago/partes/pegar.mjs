// Arma assets/voice/locucion.wav (partes/NN-c.wav con atempo y silencios) y, con los tiempos de
// tiempos.mjs sobre cada parlamento (partes/NN.json), assets/voice/palabras.json y guion.txt.
// Uso (desde reels/el-mago): node partes/pegar.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
import { N, T, G } from "./conf.mjs";
let args = "", filt = "", lab = "", k = 0;
N.forEach((n, i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${T[i]}[v${k}];`; lab += `[v${k}]`; k++;
  if (i < N.length - 1) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
const out = []; const r = (x) => Math.round(x * 1000) / 1000; const inicios = [];
let off = 0;
N.forEach((n, i) => {
  inicios.push([n, r(off), out.length]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(off + w.start / T[i]), end: r(off + w.end / T[i]) });
  off += Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${n}-c.wav`).toString()) / T[i] + (G[i] ?? 0);
});
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("partes/inicios.json", JSON.stringify(inicios));
fs.writeFileSync("guion.txt", N.map((n) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
for (const [n, t, w] of inicios) console.log(n, "arranca en", t, "palabra", w);
console.log(out.length, "palabras; voz", execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString().trim());
