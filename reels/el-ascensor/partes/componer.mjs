// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/el-ascensor).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: corta silencios y saca tiempos).
// Rubén (Charon), Valeria (Leda), intercomunicador de emergencias (Kore, con filtro de parlante), Scalerics (Orus).
import fs from "node:fs";
import { execSync } from "node:child_process";
const R = Number(process.env.AR ?? 1.2), V = Number(process.env.AV ?? 1.15), K = Number(process.env.AK ?? 1.3), O = Number(process.env.AO ?? 1.22);
// [parte, atempo, quién]  r Rubén · v Valeria · k intercomunicador · o Scalerics
const P = [["01", R, "r"], ["02", V, "v"], ["03", R, "r"], ["04", V, "v"], ["05", R, "r"], ["06", V, "v"], ["07", R, "r"], ["08", R, "r"],
  ["09", V, "v"], ["10", K, "k"], ["11", R, "r"], ["12", K, "k"], ["13", V, "v"], ["14", R, "r"], ["15", V, "v"], ["16", O, "o"],
  ["17", R, "r"], ["18", V, "v"], ["19", O, "o"]];
// silencios después de cada parlamento: tras 01 suena la música de ascensor; tras "Muy." el silencio incómodo
const G = JSON.parse(fs.existsSync("partes/gaps.json") ? fs.readFileSync("partes/gaps.json", "utf8") : "null") ??
  [1.7, 0.45, 0.4, 0.4, 0.35, 0.4, 0.3, 0.45, 0.6, 0.35, 0.4, 0.5, 0.45, 0.3, 1.5, 0.5, 0.35, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a, quien], i) => {
  const tel = quien === "k" ? ",highpass=f=420,lowpass=f=3200,acompressor=threshold=0.2:ratio=3,volume=1.4" : "";
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,atempo=${a}${tel}[v${k}];`; lab += `[v${k}]`; k++;
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
