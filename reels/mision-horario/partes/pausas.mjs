// Acorta las pausas internas de cada partes/NN-c.wav a 0.26 s (las de más de 0.34 s, a -38 dB).
// Correr desde reels/mision-horario después de recortar.sh y antes de tiempos.mjs.
import fs from "node:fs";
import { execSync } from "node:child_process";
const MAX = 0.26;
for (const f of fs.readdirSync("partes").filter((f) => /^\d\d-c\.wav$/.test(f))) {
  const p = "partes/" + f;
  const log = execSync(`ffmpeg -hide_banner -i ${p} -af silencedetect=n=-38dB:d=0.34 -f null - 2>&1`).toString();
  const ini = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const fin = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const cortes = ini.map((a, i) => [a + MAX / 2, (fin[i] ?? a) - MAX / 2]).filter(([a, b]) => b > a);
  if (!cortes.length) continue;
  const expr = cortes.map(([a, b]) => `between(t,${a.toFixed(3)},${b.toFixed(3)})`).join("+");
  const tmp = p.replace(".wav", ".tmp.wav");
  execSync(`ffmpeg -hide_banner -loglevel error -y -i ${p} -af "aselect='not(${expr})',asetpts=N/SR/TB" ${tmp}`);
  fs.renameSync(tmp, p);
  console.log(f, "pausas acortadas:", cortes.length, "−", cortes.reduce((s, [a, b]) => s + b - a, 0).toFixed(2), "s");
}
