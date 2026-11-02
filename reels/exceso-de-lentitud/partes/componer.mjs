// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/exceso-de-lentitud).
// partes/NN.wav (voces.sh) -> partes/NN-k.wav (recortar.sh: puntas, pausas topeadas, atempo por voz)
// -> tiempos.mjs sobre cada NN-k.wav -> partes/NN.json. Pegados con los silencios de G.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
// silencio DESPUÉS de cada parlamento (el de antes de Orus, más largo: entra el narrador)
const G = [0.4, 0.35, 0.4, 0.45, 0.5, 0.5, 0.35, 0.45, 0.7, 0.5, 0.55];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", lab = "", k = 0, t = 0;
const out = [];
// a mano (silencedetect sobre NN-k.wav): índice de palabra -> [inicio, fin]
const FIX = {
  "04": { 0: [0, 0.18], 1: [0.18, 0.32], 2: [0.32, 0.48], 3: [0.48, 0.6], 4: [0.6, 1.4] },
  "06": { 0: [0, 0.16], 1: [0.24, 0.69] },
  "07": { 0: [0, 0.3], 1: [0.3, 0.66] },
  "09": { 0: [0, 0.2], 1: [0.2, 0.47], 2: [0.97, 1.1] },
};
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach((n, i) => {
  args += ` -i partes/${n}-k.wav`; lab += `[${k}:a]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, [a, b]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[j], { start: a, end: b });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start), end: r(t + w.end) });
  console.log(n, "arranca en", r(t), "palabra", out.length - ws.length);
  t += dur(`partes/${n}-k.wav`);
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
