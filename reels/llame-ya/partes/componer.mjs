// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/llame-ya).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav (cortar.sh) -> tiempos.mjs con NN.txt -> partes/NN.json.
// Cada parlamento con su atempo, pegados con los silencios de G. 08 y 14 (el público, "¡Oooh!")
// son una sola palabra que ocupa todo el parlamento (Speech-to-Text no oye un "oooh").
import fs from "node:fs";
import { execSync } from "node:child_process";
const R = 1.2, A = 1.2; // el presentador y la asistente de teletienda hablan a mil
const P = [["01", R], ["02", A], ["03", 1.12], ["04", 1.05], ["05", A], ["06", 1.0], ["07", R], ["08", 1.15], ["09", R], ["10", A],
  ["11", 1.15], ["12", R], ["13", A], ["14", 1.15], ["15", A], ["16", R], ["17", 1.12], ["18", 1.12], ["19", 1.18]];
const G = [0.35, 0.3, 0.35, 0.5, 0.4, 0.35, 0.15, 0.35, 0.3, 0.35, 0.3, 0.3, 0.12, 0.35, 0.3, 0.35, 0.35, 0.5];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [];
const r = (n) => Math.round(n * 1000) / 1000;
P.forEach(([n, a], i) => {
  args += ` -i partes/${n}-c.wav`; filt += `[${k}:a]atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  const d = dur(`partes/${n}-c.wav`);
  const ws = n === "08" || n === "14"
    ? [{ text: "¡Oooh!", start: 0, end: d }]
    : JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  console.log(n, "arranca en", r(t));
  t += d / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
// palabras pegadas en el mismo instante (Speech-to-Text no las oyó): se reparten hasta la siguiente
for (let i = 0; i < out.length; ) {
  let j = i + 1;
  while (j < out.length && Math.abs(out[j].start - out[i].start) < 0.02) j++;
  if (j - i > 1) {
    const hasta = j < out.length ? Math.min(out[j].start, out[i].start + 0.28 * (j - i)) : out[i].start + 0.28 * (j - i);
    const paso = (hasta - out[i].start) / (j - i);
    for (let k = i; k < j; k++) { out[k].start = r(out[i].start + paso * (k - i)); out[k].end = r(out[k].start + paso); }
  }
  i = j;
}
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
