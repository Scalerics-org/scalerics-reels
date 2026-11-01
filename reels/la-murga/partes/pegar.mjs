// Pega partes/NN-c.wav (limpiar.sh) con silencios entre parlamentos -> assets/voice/locucion.wav,
// y arma assets/voice/palabras.json con los tiempos de cada parte (partes/NN.json, de tiempos.mjs
// sobre NN-c.wav o, en el coro, sobre NN-a-c.wav) corridos a su inicio y divididos por el atempo.
// También guion.txt (todos los parlamentos en orden).
// Correr desde reels/la-murga: node partes/pegar.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
// [parte, silencio después, atempo]
const P = [["01", 0.4, 1.08], ["02", 0.35, 1.1], ["03", 0.35, 1.1], ["04", 0.4, 1.12], ["05", 0.3, 1.12], ["06", 0.25, 1.1],
  ["07", 0.4, 1.1], ["08", 0.7, 1.12], ["09", 0.35, 1.1], ["10", 0.35, 1.12], ["11", 0.8, 1.2], ["12", 0, 1.08]].filter(([n]) => fs.existsSync(`partes/${n}-c.wav`));
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], ini = {};
const r = (n) => Math.round(n * 1000) / 1000;
for (const [n, sil, at] of P) {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${at}[v${k}];`; lab += `[v${k}]`; k++;
  ini[n] = t;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / at), end: r(t + w.end / at) });
  t += dur(`partes/${n}-c.wav`) / at;
  if (sil) { args += ` -f lavfi -t ${sil} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += sil; }
}
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras,", t.toFixed(2), "s;", JSON.stringify(ini));
