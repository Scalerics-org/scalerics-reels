// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/poseido).
// partes/NN.wav (voces.sh) -> partes/NN-p.wav (recortado) y NN-c.wav (con efecto de demonio en 04 08 10),
// ambos de la misma duración (recortar.sh). Tiempos: tiempos.mjs sobre cada NN-p.wav -> partes/NN.json.
// Voces: 01 03 14 esposa (Leda), 02 05 07 09 11 exorcista (Charon), 04 08 10 poseído (Algenib
// con tono bajado y eco), 13 el marido ya liberado (Fenrir), 12 15 narrador (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
// (el 06, "La planilla, padre.", se sacó por duración)
const P = [["01", 1.08], ["02", 1.08], ["03", 1.14], ["04", 1.2], ["05", 1.1], ["07", 1.0], ["08", 1.25], ["09", 1.0], ["10", 1.15], ["11", 1.12], ["12", 1.14], ["13", 1.05], ["14", 1.08], ["15", 1.05]];
// silencios entre parlamentos (los largos: un trueno o el cambio de clima)
const G = [0.4, 0.35, 0.45, 0.45, 0.4, 0.45, 0.35, 0.45, 0.65, 0.6, 0.5, 0.35, 0.6];
// tiempos oídos a mano (en segundos del NN-p.wav)
const FIX = { "07": [[0, 0.4], [0.4, 0.7], [0.82, 0.9], [0.99, 1.29], [1.38, 1.9], [1.95, 2.35]] };
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")).forEach((w, j) => {
    const [s, e] = FIX[n]?.[j] ?? [w.start, w.end];
    out.push({ id: out.length, text: w.text, start: r(t + s / a), end: r(t + e / a) });
  });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
