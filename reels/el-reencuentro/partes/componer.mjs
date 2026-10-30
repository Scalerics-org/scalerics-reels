// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/el-reencuentro).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh). Tiempos: tiempos.mjs sobre cada NN-c.wav
// (con NN.txt) -> partes/NN.json; el "¡Oooh!" del público (10) va a mano. Cada parlamento con su
// atempo, pegados con los silencios de G (1 s antes y después del "¡Oooh!", 0.9 s para la cortina).
// Voces: conductora Aoede (01 02 04 06 11), Don Aldo Charon (03 05 08), Graciela Gacrux (07 09),
// público (10: Leda, Fenrir, Kore y Puck encimados), narrador Orus (12 13).
import fs from "node:fs";
import { execSync } from "node:child_process";
const C = 1.22, A = 1.16, GR = 1.14;
const P = [["01", C], ["02", C], ["03", A], ["04", C], ["05", A], ["06", C], ["07", GR], ["08", A], ["09", GR], ["10", 1.0], ["11", C], ["12", 1.16], ["13", 1.1]];
const G = [0.4, 0.35, 0.35, 0.3, 0.4, 0.9, 0.35, 0.35, 0.45, 0.8, 0.5, 0.4];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = n === "10" ? [{ text: "¡Oooh!", start: 0.05, end: dur(`partes/10-c.wav`) - 0.1 }] : JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += dur(`partes/${n}-c.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
