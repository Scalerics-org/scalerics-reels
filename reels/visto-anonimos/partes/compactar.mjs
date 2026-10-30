// rec/X.wav -> cmp/X.wav: las pausas internas de más de MAX se acortan a MAX y se aplica el atempo de cada voz.
// Correr desde partes/. Después: ./pj.sh de cada parte y node unir.mjs.
import fs from "node:fs";
import { execSync } from "node:child_process";
const MAX = { "01g": 0.42 }; // el gancho conserva sus pausas
// recortes después de compactar (segundos desde el principio): 03k pierde "Gracias por venir."
const DESDE = { "03k": 1.0 };
const TEMPO = { g: 1.17, k: 1.12, m: 1.08, r: 1.15, o: 1.08, x: 1.0 };
fs.mkdirSync("cmp", { recursive: true });
for (const f of fs.readdirSync("rec").filter((f) => /^\d\d[a-z]\.wav$/.test(f)).sort()) {
  const b = f.slice(0, 3), max = MAX[b] ?? 0.26;
  const d = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${f}`).toString());
  const log = execSync(`ffmpeg -hide_banner -i rec/${f} -af silencedetect=n=-40dB:d=${max} -f null - 2>&1`).toString();
  const ini = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const fin = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  // tramos que se quedan: todo menos el centro de cada silencio largo
  const keep = []; let t = 0;
  ini.forEach((s, i) => { const e = fin[i] ?? d; const mid = (s + e) / 2; keep.push([t, mid - max / 2]); t = mid + max / 2; });
  keep.push([t, d]);
  const filt = keep.map(([a, z], i) => `[0:a]atrim=${a.toFixed(3)}:${z.toFixed(3)},asetpts=PTS-STARTPTS[p${i}]`).join(";") +
    `;${keep.map((_, i) => `[p${i}]`).join("")}concat=n=${keep.length}:v=0:a=1,atempo=${TEMPO[b[2]]}${DESDE[b] ? `,atrim=start=${DESDE[b]},asetpts=PTS-STARTPTS` : ""}[o]`;
  execSync(`ffmpeg -hide_banner -loglevel error -y -i rec/${f} -filter_complex "${filt}" -map "[o]" -ar 48000 -ac 1 cmp/${f}`);
  const d2 = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 cmp/${f}`).toString());
  console.log(b, d.toFixed(2), "->", d2.toFixed(2));
}
