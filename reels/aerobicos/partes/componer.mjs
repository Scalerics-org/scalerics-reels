// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/aerobicos).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios recortados con silenceremove.
// 02-e: sin "¡Cliente por cliente!" (3.85-6.05); 04-e: sin "¡Sonrisa!" (cortado en 13.1). El 05
// ("Ya ni sé a quién le escribí") quedó afuera por largo. Instructora (Laomedeia) con atempo 1.17,
// dueño (Enceladus) 1.05, Orus 1.1. Silencios de G entre parlamentos (0.8 = el dueño se tira al piso).
// Tiempos: tiempos.mjs sobre cada wav (con NN.g.txt) -> partes/NN.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", "01-c", 1.17], ["02", "02-e", 1.17], ["03", "03-c", 1.05], ["04", "04-e", 1.17], ["06", "06-c", 1.17], ["07", "07-c", 1.17], ["08", "08-c", 1.05], ["09", "09-c", 1.05], ["10", "10-c", 1.1]];
const G = [0.4, 0.45, 0.35, 0.5, 0.4, 0.8, 0.45, 0.7];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, f, a], i) => {
  args += ` -i partes/${f}.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${f}.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
// a mano (silencedetect sobre la locución): Speech-to-Text corría las repeticiones "¡Y uno!"
const fix = { 29: 11.05, 30: 11.3, 31: 11.6, 32: 11.85, 33: 12.47, 34: 13.14, 35: 13.92, 36: 14.15, 37: 14.5, 38: 14.75, 39: 15.31, 40: 16.02, 41: 16.89, 42: 17.05, 43: 17.81, 44: 18.0,
  15: 5.15, 53: 24.73, 54: 25.25, 55: 25.73, 56: 26.2, 57: 26.4, 58: 27.46, 59: 27.65, 60: 28.1, 61: 28.2, 63: 29.32, 64: 29.6, 65: 30.36, 66: 30.55, 67: 31.0, 68: 31.15, 69: 31.45, 70: 32.5, 71: 32.8,
  85: 39.03, 86: 39.5, 87: 40.17, 88: 40.6, 89: 41.37, 90: 41.6, 91: 41.85, 98: 44.03, 99: 44.2, 100: 45.13, 104: 46.41, 111: 48.97, 112: 49.15, 113: 49.68, 114: 50.36, 115: 50.95,
  118: 52.77, 127: 58.26, 128: 58.45, 129: 58.6, 130: 58.85, 131: 58.95, 132: 59.0 };
for (const [i, a] of Object.entries(fix)) if (out[i]) { out[i].start = a; out[i].end = Math.max(out[i].end, a + 0.12); }
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.g.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
