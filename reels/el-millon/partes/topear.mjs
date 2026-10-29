// Topea los silencios de adentro de un parlamento: node partes/topear.mjs <entrada.wav> <salida.wav> <tope s> [umbral dB, -42]
// (el silenceremove de este ffmpeg no recorta los del medio). Deja `tope` segundos de cada pausa larga.
import { execSync } from "node:child_process";
const [ent, sal, tope, umbral = "-42"] = process.argv.slice(2);
const T = Number(tope);
const log = execSync(`ffmpeg -hide_banner -i ${ent} -af silencedetect=n=${umbral}dB:d=${T + 0.05} -f null - 2>&1`).toString();
const ini = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
const fin = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
const cortes = ini.map((s, i) => [s + T / 2, (fin[i] ?? 1e9) - T / 2]).filter(([a, b]) => fin.length && b > a);
const expr = cortes.length ? cortes.map(([a, b]) => `between(t,${a.toFixed(3)},${b.toFixed(3)})`).join("+") : "0";
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${ent} -af "aselect='not(${expr})',asetpts=N/SR/TB" -ar 48000 -ac 1 ${sal}`);
console.log(sal, cortes.length, "pausas topeadas");
