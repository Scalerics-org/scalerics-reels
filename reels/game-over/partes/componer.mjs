// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/game-over).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (cortar.sh; los del anunciador y Orus con un corte más
// apretado, ver el comando en el historial del SPEC) -> tiempos.mjs con NN.g.txt -> partes/NN.json.
// Cada parlamento con su atempo (el anunciador va apurado); el jefe final y el "game over" con eco
// de fichín. Pegados con los silencios de G.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.08], ["02", 1.2], ["03", 1.08], ["04", 1.05], ["05", 1.2], ["06", 1.1], ["07", 1.2], ["08", 1.02], ["09", 1.1], ["10", 1.12], ["11", 1.0], ["12", 1.1], ["13", 1.08], ["14", 1.2], ["15", 1.05], ["16", 1.1]];
const G = [0.4, 0.3, 0.3, 0.35, 0.3, 0.35, 0.3, 0.3, 0.4, 0.35, 0.5, 0.3, 0.35, 0.4, 0.55];
const ECO = { "11": ",aecho=0.8:0.75:90|180:0.45|0.25", "12": ",aecho=0.8:0.7:70|140:0.35|0.2" };
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
const FIX = {};
P.forEach(([n, a], i) => {
  const extra = ECO[n] ? 0.25 : 0; // la cola del eco
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}${ECO[n] ? ECO[n] + ",apad=pad_dur=" + extra : ""}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, [s, e]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[j], { start: s, end: e });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  // largo real del parlamento procesado (el eco agrega su cola)
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${n}-c.wav -af "atempo=${a}${ECO[n] ? ECO[n] + ",apad=pad_dur=" + extra : ""}" /tmp/parte-go.wav`);
  t += dur("/tmp/parte-go.wav");
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
