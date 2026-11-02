// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/el-naufrago).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh).
// Vero náufraga (Leda), clienta en botella (Kore), Wilmar la pelota (Puck), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const N = Number(process.env.AN ?? 1.25), K = 1.05, W = 1.1, O = 1.15;
// [parte, atempo, quién]  n náufraga · k clienta · w pelota · o Scalerics
const P = [["01", N, "n"], ["02", N, "n"], ["03", K, "k"], ["04", N, "n"], ["05", K, "k"], ["06", N, "n"], ["07", K, "k"],
  ["08", N, "n"], ["09", N, "n"], ["10", W, "w"], ["11", N, "n"], ["12", W, "w"], ["13", N, "n"], ["14", W, "w"],
  ["15", N, "n"], ["16", W, "w"], ["17", O, "o"], ["18", N, "n"], ["19", W, "w"], ["20", O, "o"]];
// silencios entre parlamentos (después de cada uno)
const G = [0.45, 0.4, 0.35, 0.4, 0.35, 0.45, 0.35, 0.45, 0.35, 0.4, 0.35, 0.45, 0.35, 0.5, 0.4, 0.55, 0.5, 0.35, 0.5];
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
