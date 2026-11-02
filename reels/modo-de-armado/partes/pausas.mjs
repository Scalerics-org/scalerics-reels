// partes/NN-c.wav -> partes/NN-p.wav: cada pausa interna (bajo -32 dB, más de 0.22 s) queda en
// QUEDA s (la mitad pegada a cada palabra). Correr desde reels/modo-de-armado. Reemplaza a pausas.sh.
import fs from "node:fs";
import { execSync } from "node:child_process";
const QUEDA = { "11": 0.4 };
for (const f of fs.readdirSync("partes").filter((x) => /^\d\d-c\.wav$/.test(x))) {
  const n = f.slice(0, 2), q = QUEDA[n] ?? 0.18;
  const log = execSync(`ffmpeg -hide_banner -i partes/${f} -af silencedetect=n=-32dB:d=0.22 -f null - 2>&1`).toString();
  const S = [...log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)].map((m) => [+m[1], +m[2]]);
  const dur = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${f}`).toString());
  const tramos = []; let a = 0;
  for (const [s, e] of S) { if (e >= dur - 0.01) continue; tramos.push([a, s + q / 2]); a = e - q / 2; }
  tramos.push([a, dur]);
  const sel = tramos.map(([x, y]) => `between(t,${x.toFixed(3)},${y.toFixed(3)})`).join("+");
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${f} -af "aselect='${sel}',asetpts=N/SR/TB" -ar 48000 -ac 1 partes/${n}-p.wav`);
}
