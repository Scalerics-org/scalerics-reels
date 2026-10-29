// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/habitat-natural).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh) -> partes/NN.json (tiempos.sh).
// n = narrador de documental (Algenib, con atempo: susurra lento), c = camarógrafo (Puck),
// d = el comerciante (Charon), o = Orus. G: silencio después de cada parlamento.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = ["01n", "02n", "03n", "04n", "05c", "06n", "07n", "08d", "09n", "10c", "11n", "12c", "13n", "14c", "15n", "16o"];
const AT = { n: 1.17, c: 1.05, d: 1.0, o: 1.05 };
const G = [0.45, 0.4, 0.35, 0.5, 0.35, 0.5, 0.3, 0.55, 0.4, 0.5, 0.4, 0.35, 0.45, 0.4, 0.8];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const r = (n) => Math.round(n * 1000) / 1000;
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
// a mano (oído con silencedetect sobre la locución), en segundos del parlamento sin atempo
const FIX = { "09n": { 9: 3.616 }, "11n": { 21: 10.826, 22: 10.92, 23: 11.01 }, "13n": { 19: 7.642, 20: 7.76, 21: 7.935 }, "15n": { 2: 2.093, 3: 2.971, 4: 3.11 } };
P.forEach((n, i) => {
  const a = AT[n[2]];
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const d = dur(`partes/${n}-c.wav`);
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  ws[0].start = 0;
  for (const [j, st] of Object.entries(FIX[n] ?? {})) ws[j].start = st;
  for (let j = 1; j < ws.length; j++) if (ws[j].start <= ws[j - 1].start + 0.08) ws[j].start = Math.min(ws[j - 1].start + 0.12, d - 0.05);
  ws.forEach((w, j) => {
    const end = j + 1 < ws.length ? ws[j + 1].start : d;
    out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + Math.max(end, w.start + 0.1) / a) });
    voces.push(n[2]);
  });
  console.log(n, "arranca en", r(t));
  t += d / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("partes/voces.json", JSON.stringify(voces));
fs.writeFileSync("guion.txt", P.map((n) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
