// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-museo).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (cortar.sh) -> tiempos.mjs con NN.txt -> partes/NN.json.
// Cada parlamento con su atempo (la guía habla lento por naturaleza); los del museo con un eco
// chico de sala; el nene con la voz un poco más aguda. Pegados con los silencios de G.
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.2], ["02", 1.25], ["03", 1.22], ["04", 1.25], ["05", 1.22], ["06", 1.0], ["07", 1.15], ["08", 1.08], ["09", 1.18], ["10", 1.12], ["11", 1.1]];
const G = [0.4, 0.35, 0.35, 0.4, 0.35, 0.25, 0.5, 0.55, 0.55, 0.4];
const SALA = ",aecho=0.85:0.5:55|110:0.18|0.09";
const EXTRA = { "06": "asetrate=55200,aresample=48000,atempo=0.92," };
const NENE_TEMPO = 55200 / 48000 * 0.92; // el nene queda un poco más rápido
const filtro = (n, a) => `${EXTRA[n] ?? ""}atempo=${a}${Number(n) <= 9 ? SALA : ""}`;
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  const vel = a * (EXTRA[n] ? NENE_TEMPO : 1);
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]${filtro(n, a)}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / vel), end: r(t + w.end / vel) });
  console.log(n, "arranca en", r(t));
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${n}-c.wav -af "${filtro(n, a)}" /tmp/parte-museo.wav`);
  t += dur("/tmp/parte-museo.wav");
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
