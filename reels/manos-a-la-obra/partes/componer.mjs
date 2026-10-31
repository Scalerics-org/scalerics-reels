// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/manos-a-la-obra).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.sh). Tiempos: tiempos.mjs
// sobre cada NN-p.wav con NN.txt -> partes/NN.json. Cada parlamento con su velocidad, pegados con G.
// Voces: Seño Pochi Laomedeia (01 02 04 05 07 09 11 13), Raúl Charon (03 06 08 12),
// nena del público Leda con el tono subido (10 14), narrador Orus (15 16 17).
// La 08 se regeneró ("fila" sonaba "silla"); la vieja quedó en 08-viejo.wav.
import fs from "node:fs";
import { execSync } from "node:child_process";
const NENE = new Set(["10", "14"]);
const SENO = 1.2, RAUL = 1.0, NENA = 1.16, ORUS = 1.17;
const A = { "01": SENO, "02": SENO, "03": RAUL, "04": SENO, "05": SENO, "06": RAUL, "07": SENO, "08": RAUL, "09": SENO, "10": NENA, "11": SENO, "12": RAUL, "13": SENO, "14": NENA, "15": ORUS, "16": ORUS, "17": ORUS };
const P = Object.entries(A).sort((x, y) => x[0].localeCompare(y[0]));
// silencio después de cada parlamento (01..16)
const G = [0.4, 0.5, 0.42, 0.4, 0.3, 0.35, 0.3, 0.42, 0.3, 0.3, 0.38, 0.38, 0.55, 0.95, 0.42, 0.45];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-p.wav`;
  // la nena: el tono sube con la velocidad (asetrate), como voz de chiquita
  const vel = NENE.has(n) ? `asetrate=${Math.round(48000 * a)},aresample=48000` : `atempo=${a}`;
  filt += `[${k}:a]${vel}[v${k}];`; lab += `[v${k}]`; k++;
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t), "palabra", out.length);
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
