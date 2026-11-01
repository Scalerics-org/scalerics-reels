// El coro: dos voces (NN-a-c.wav y NN-b-c.wav, de limpiar.sh) alineadas frase por frase. La voz b se
// corta en cada comienzo de frase (tiempos de tiempos.mjs: partes/NN.json para a, partes/NN-b.json
// para b), cada tramo se estira a la duración del mismo tramo en a, y se mezclan con un eco corto.
// Pisa partes/NN-c.wav. Uso (desde reels/la-murga): node partes/coro.mjs 02 04 06 09 11
import fs from "node:fs";
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
for (const n of process.argv.slice(2)) {
  const A = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  const B = JSON.parse(fs.readFileSync(`partes/${n}-b.json`, "utf8"));
  const da = dur(`partes/${n}-a-c.wav`), db = dur(`partes/${n}-b-c.wav`);
  // bordes: el principio, cada palabra que sigue a una puntuación, y el final
  const idx = A.map((w, i) => i).filter((i) => i > 0 && /[,.:;!?…]$/.test(A[i - 1].text));
  const ba = [0, ...idx.map((i) => A[i].start), da], bb = [0, ...idx.map((i) => B[i].start), db];
  let f = "", lab = "";
  for (let k = 0; k < ba.length - 1; k++) {
    const la = ba[k + 1] - ba[k], lb = bb[k + 1] - bb[k];
    if (la < 0.05 || lb < 0.05) continue;
    const at = Math.max(0.5, Math.min(2, lb / la));
    f += `[1:a]atrim=start=${bb[k]}:end=${bb[k + 1]},asetpts=PTS-STARTPTS,atempo=${at.toFixed(4)}[b${k}];`;
    lab += `[b${k}]`;
  }
  const m = lab.split("][").length;
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${n}-a-c.wav -i partes/${n}-b-c.wav -filter_complex "${f}${lab}concat=n=${m}:v=0:a=1[bb];[0:a][bb]amix=inputs=2:duration=first:weights=1 0.8:normalize=0,aecho=0.8:0.55:28|52:0.25|0.18,volume=1.6,alimiter=limit=0.95[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le partes/${n}-c.wav`);
  console.log(n, "coro alineado en", m, "tramos,", dur(`partes/${n}-c.wav`).toFixed(2), "s");
}
