// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/cambio-extremo).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios de punta recortados con silenceremove.
// 10-c es el coro "¡Mové ese camión!": 10a (conductora) + 10b (capataz) mezclados.
// Conductora (Zephyr) atempo 1.2, capataz (Alnilam) 1.15, Mónica (Gacrux) 1.1, Orus 1.12.
// Tiempos: tiempos.mjs sobre cada NN-c.wav -> partes/NN.json. Imprime el índice de la primera
// palabra de cada parlamento (para reel.voces).
import fs from "node:fs";
import { execSync } from "node:child_process";
const Z = 1.2, A = 1.15, M = 1.1, O = 1.12;
// [parte, atempo, quién]  c conductora · k capataz · m Mónica · t coro · o Scalerics
const P = [["01", Z, "c"], ["02", Z, "c"], ["03", M, "m"], ["04", Z, "c"], ["05", A, "k"], ["06", Z, "c"], ["07", A, "k"], ["08", M, "m"],
  ["09", Z, "c"], ["10", 1.08, "t"], ["11", M, "m"], ["12", Z, "c"], ["13", M, "m"], ["14", A, "k"], ["15", O, "o"]];
const G = [0.5, 0.4, 0.4, 0.35, 0.4, 0.3, 0.6, 0.4, 0.45, 1.0, 0.4, 0.45, 0.5, 0.6];
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
