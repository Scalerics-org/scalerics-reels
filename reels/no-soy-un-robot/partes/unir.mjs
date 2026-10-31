// Une las partes (fin/NN.wav) con silencios y sus tiempos (pal/NN.json) en assets/voice/.
// Correr desde partes/: node unir.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
// pausa DESPUÉS de cada parte
const PAUSA = { "01": 0.5, "02": 0.35, "03": 0.4, "04": 0.35, "05": 0.45, "06": 0.4, "07": 0.35, "08": 0.4, "09": 0.35, "10": 0.4, "11": 0.35, "12": 0.4, "13": 0.6, "14": 0.45, "15": 0.45, "16": 0 };
// correcciones a mano dentro de cada parte (silencedetect): parte → { índice: inicio }
const FIX = { "01": { 3: 1.5 }, "02": { 1: 0.78 }, "04": { 2: 1.47 }, "07": { 11: 4.72 } };
const partes = Object.keys(PAUSA).sort();
let t = 0, out = [], lista = "", guion = "";
for (const n of partes) {
  const ws = JSON.parse(fs.readFileSync(`pal/${n}.json`, "utf8"));
  for (const [i, s] of Object.entries(FIX[n] ?? {})) ws[i].start = s;
  for (const w of ws) out.push({ id: out.length, text: w.text, start: +(w.start + t).toFixed(3), end: +(w.end + t).toFixed(3), parte: n });
  lista += `file 'fin/${n}.wav'\n`;
  t += dur(`fin/${n}.wav`);
  if (PAUSA[n]) {
    const s = `fin/s${PAUSA[n]}.wav`;
    if (!fs.existsSync(s)) execSync(`ffmpeg -hide_banner -loglevel error -y -f lavfi -i anullsrc=r=48000:cl=mono -t ${PAUSA[n]} -c:a pcm_s16le ${s}`);
    lista += `file '${s}'\n`;
    t += dur(s);
  }
  guion += fs.readFileSync(`${n}.txt`, "utf8").trim() + "\n";
}
for (let i = 0; i < out.length; i++) out[i].end = Math.max(out[i].start + 0.05, i + 1 < out.length ? Math.min(out[i].end, out[i + 1].start) : out[i].end);
fs.writeFileSync("lista.txt", lista);
execSync(`ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i lista.txt -c:a pcm_s16le -ar 48000 -ac 1 ../assets/voice/locucion.wav`);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("../guion.txt", guion);
console.log(out.length, "palabras, total", t.toFixed(2));
console.log(out.map((w) => `${w.id}:${w.text}@${w.start.toFixed(2)}`).join(" "));
