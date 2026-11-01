// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/la-medium).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos).
// médium (Gacrux), clienta (Leda), espíritu del local (Algenib, más grave y con eco), narrador Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const M = Number(process.env.AM ?? 1.3), C = Number(process.env.AC ?? 1.2), E = Number(process.env.AE ?? 1.22), O = Number(process.env.AO ?? 1.2);
// [parte, atempo, quién]  m médium · c clienta · e espíritu · o Scalerics
const P = [["01", M, "m"], ["02", C, "c"], ["03", M, "m"], ["04", M, "m"], ["05", E, "e"], ["06", M, "m"], ["07", C, "c"], ["08", M, "m"],
  ["09", E, "e"], ["10", M, "m"], ["11", C, "c"], ["12", M, "m"], ["13", O, "o"], ["14", C, "c"], ["15", M, "m"], ["16", O, "o"]];
// silencios entre parlamentos (después de cada uno); después de "golpeá una vez" va el golpe en la mesa
const G = [0.3, 0.35, 0.9, 0.4, 0.35, 0.3, 0.3, 0.35, 0.35, 0.3, 0.45, 0.4, 0.3, 0.3, 0.45];
const ESP = 0.88; // el espíritu: más grave (asetrate) y con eco
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a, quien], i) => {
  const fx = quien === "e" ? `asetrate=${48000 * ESP},aresample=48000,aecho=0.8:0.75:70|140:0.35|0.2,` : "";
  const tempo = quien === "e" ? a * ESP : a; // a efectos de los tiempos
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,${fx}atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / tempo), end: r(t + w.end / tempo) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  t += dur(`partes/${n}-c.wav`) / tempo;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
const fix = JSON.parse(fs.existsSync("partes/fix.json") ? fs.readFileSync("partes/fix.json", "utf8") : "{}");
for (const [i, a] of Object.entries(fix)) if (out[i]) { out[i].start = a; out[i].end = Math.max(out[i].end, a + 0.12); }
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
