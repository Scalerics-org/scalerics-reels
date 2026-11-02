// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/tiene-mensajes).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su atempo, pegados con
// gaps.json (un número = silencio; "bip" = partes/bip.wav, el bip del contestador).
// Voces: contestador Kore (01 04 06 09 11), Graciela Aoede (02 12), dueño Charon (03 08 13),
// Ernesto Iapetus (05), la novia Leda (07), el pibe del talle Puck (10), narrador Orus (14 15).
// Los mensajes de los clientes (TEL) pasan por un filtro de teléfono; el contestador (MAQ), uno más leve.
import fs from "node:fs";
import { execSync } from "node:child_process";
const TEL = new Set(["02", "05", "07", "10", "12"]);
const MAQ = new Set(["01", "04", "06", "09", "11"]);
const A = JSON.parse(fs.readFileSync("partes/atempo.json", "utf8"));
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
const G = JSON.parse(fs.readFileSync("partes/gaps.json", "utf8"));
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], bips = [], partes = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  const fx = TEL.has(n) ? ",highpass=f=380,lowpass=f=3400,acompressor=threshold=0.08:ratio=3,volume=1.5"
    : MAQ.has(n) ? ",highpass=f=160,lowpass=f=6500" : "";
  filt += `[${k}:a]atempo=${a}${fx}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  console.log(n, "arranca en", r(t), "palabra", out.length);
  partes.push({ n, t: r(t), palabra: out.length });
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) {
    if (G[i] === "bip") { args += ` -i partes/bip.wav`; bips.push(r(t + 0.15)); t += dur("partes/bip.wav"); }
    else { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; t += G[i]; }
    lab += `[${k}:a]`; k++;
  }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("partes/marcas.json", JSON.stringify({ bips, partes }));
console.log("bips en", bips.join(", "));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
