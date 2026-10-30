// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-podcast).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh; el 19 cortado a 2.9 s
// con fade, después tenía risas largas). Tiempos: tiempos.mjs sobre cada NN-p.wav con NN.txt ->
// partes/NN.json. Cada parlamento con su atempo, pegados con los silencios de G.
// Voces: Sofi Aoede (01 03 05 07 09 12 14 16 19), Nacho Puck (02 04 06 08 10 13 15 18),
// el dueño ofendido Charon (11), narrador Orus (17).
import fs from "node:fs";
import { execSync } from "node:child_process";
const S = 1.18, N = 1.18, D = 1.12, O = 1.15;
const P = [["01", S], ["02", N], ["03", S], ["04", N], ["05", S], ["06", N], ["07", S], ["08", N], ["09", S], ["10", N], ["11", D], ["12", S], ["13", N], ["14", S], ["15", N], ["16", S], ["17", O], ["18", N], ["19", S]];
// silencio DESPUÉS de cada parlamento (el audio del oyente con 0.5 antes y después; antes de Orus 0.5)
const G = [0.4, 0.3, 0.25, 0.3, 0.25, 0.3, 0.2, 0.3, 0.3, 0.5, 0.45, 0.4, 0.25, 0.25, 0.35, 0.5, 0.45, 0.25];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
const inicios = {};
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  inicios[n] = out.length;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", inicios[n]);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
// a mano: Speech-to-Text pegó "Le compraría" a "casualidad" (la pausa de 15 está en 46.5-46.95)
const fix = { 134: [46.95, 47.1], 135: [47.1, 47.7] };
for (const [i, [a, b]] of Object.entries(fix)) if (out[i]) Object.assign(out[i], { start: a, end: b });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
