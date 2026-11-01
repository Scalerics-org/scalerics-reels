// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/avistamiento).
// partes/NN.wav (voces.sh) -> partes/NN-p.wav (recortar.sh). Tiempos: tiempos.mjs sobre cada NN-p.wav -> partes/NN.json.
// Voces: conductor (Algenib) 01 02 06 08, Nilda (Gacrux) 03 11, experto (Charon) 04 12,
// hija (Leda) 05, testigo de Maroñas (Fenrir) 07, narrador (Orus) 09 10 13 14.
import fs from "node:fs";
import { execSync } from "node:child_process";
// [parte, atempo]
const P = [["01", 1.04], ["02", 1.04], ["03", 1.0], ["04", 1.05], ["05", 1.0], ["06", 1.04], ["07", 1.0], ["08", 1.0], ["09", 1.05], ["10", 1.08], ["11", 1.0], ["12", 1.0], ["13", 1.05], ["14", 1.0]];
// silencios entre parlamentos
const G = [0.5, 0.45, 0.4, 0.4, 0.55, 0.4, 0.5, 0.6, 0.35, 0.45, 0.35, 0.5, 0.45];
// tiempos oídos a mano (en segundos del NN-p.wav)
const FIX = {
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
  console.log(n, "arranca en", r(t), "palabra", out.length - JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")).length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
