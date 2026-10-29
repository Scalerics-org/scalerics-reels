// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-visto-trailer).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.mjs: pausas a 0.18-0.3 s)
// -> tiempos.mjs sobre cada NN-c.wav -> partes/NN.json.
// La voz de tráiler (Algenib) va con atempo 1.16 (sigue grave, pero no arrastra); clienta, dueño
// y el de enfrente 1.06; Orus 1.1. Pegados con los silencios de G (los largos: antes del giro y
// antes de que entre Scalerics, el silencio dramático del tráiler).
import fs from "node:fs";
import { execSync } from "node:child_process";
const T = 1.16, D = 1.06, O = 1.1;
const P = [["01", T], ["02", T], ["03", D], ["04", D], ["05", T], ["06", D], ["07", D], ["08", D], ["09", T], ["10", T], ["11", T], ["12", D], ["13", T], ["14", O]];
const G = [0.45, 0.6, 0.35, 0.5, 0.45, 0.35, 0.35, 0.45, 0.8, 0.5, 0.4, 0.4, 0.75];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
const FIX = {};
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, [s, e]] of Object.entries(FIX[n] ?? {})) Object.assign(ws[j], { start: s, end: e });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length - ws.length);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
