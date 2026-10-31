// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/talle-unico).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios de punta recortados con silenceremove.
// Crítica (Kore) atempo 1.18, presentador (Puck) 1.2, Don Hugo (Charon) 1.1, dueña de la tienda (Leda) 1.12, Orus 1.16.
// Tiempos: tiempos.mjs sobre cada NN-c.wav -> partes/NN.json. Imprime el índice de la primera
// palabra de cada parlamento (para reel.voces).
import fs from "node:fs";
import { execSync } from "node:child_process";
const K = 1.18, P_ = 1.2, D = 1.1, L = 1.12, O = 1.16;
// [parte, atempo, quién]  k crítica · p presentador · d Don Hugo · t dueña de la tienda · o Scalerics
const P = [["01", K, "k"], ["02", P_, "p"], ["03", K, "k"], ["04", D, "d"], ["05", K, "k"], ["06", P_, "p"], ["07", K, "k"], ["08", P_, "p"],
  ["09", K, "k"], ["10", L, "t"], ["11", K, "k"], ["12", O, "o"], ["13", K, "k"], ["14", O, "o"]];
const G = [0.45, 0.35, 0.3, 0.3, 0.45, 0.3, 0.4, 0.3, 0.35, 0.35, 0.55, 0.3, 0.4];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a, quien], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
const fix = JSON.parse(fs.existsSync("partes/fix.json") ? fs.readFileSync("partes/fix.json", "utf8") : "{}");
for (const [i, a] of Object.entries(fix)) if (out[i]) { out[i].start = a; out[i].end = Math.max(out[i].end, a + 0.12); }
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
