// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/el-diablito).
// partes/NN.wav (voces.sh) -> partes/NN-p.wav (recortar.sh). Tiempos: tiempos.mjs sobre cada NN-p.wav -> partes/NN.json.
// Voces: 01 04 06 08 10 12 diablito (Fenrir), 03 07 09 angelito (Leda), 02 05 dueño (Charon),
// 11 13 agente de IA (Kore), 14 15 narrador (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const P = [["01", 1.18], ["02", 1.12], ["03", 1.18], ["04", 1.22], ["05", 1.12], ["06", 1.22], ["07", 1.18], ["08", 1.22], ["09", 1.16], ["10", 1.18], ["11", 1.2], ["12", 1.1], ["13", 1.1], ["14", 1.18], ["15", 1.12]];
// silencios entre parlamentos (los largos: el bostezo, la aparición del agente, el remate)
const G = [0.45, 0.4, 0.35, 0.4, 0.35, 0.45, 0.35, 0.4, 0.4, 0.6, 0.35, 0.3, 0.7, 0.45];
// tiempos oídos a mano (en segundos del NN-p.wav), por índice de palabra
const FIX = {
  "07": { 11: [3.1, 3.8], 12: [4.19, 5.15], 13: [5.53, 6.5] },
  "09": { 0: [0, 0.5], 1: [0.5, 1.6], 2: [1.94, 2.3], 3: [2.71, 2.95], 6: [3.6, 3.85], 7: [3.85, 4.13], 8: [4.46, 4.7], 9: [4.72, 5.0] },
};
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")).forEach((w, j) => {
    const [s, e] = FIX[n]?.[j] ?? [w.start, w.end];
    out.push({ id: out.length, text: w.text, start: r(t + s / a), end: r(t + e / a) });
  });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
