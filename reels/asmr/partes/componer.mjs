// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/asmr).
// partes/NN.wav (voces.sh) -> partes/NN-c.wav + partes/NN.json (tiempos.sh: normaliza, corta silencios de punta y saca tiempos).
// Acá: acorta las pausas internas largas de cada parte (silencedetect), le aplica atempo y pega todo con silencios.
// ASMRtista (Aoede, a) · Beto el panadero (Charon, d) · narrador Scalerics (Orus, o)
import fs from "node:fs";
import { execSync } from "node:child_process";
const A = Number(process.env.AA ?? 1.25), D = Number(process.env.AD ?? 1.08), O = Number(process.env.AO ?? 1.12);
// [parte, atempo, quién, pausa interna máxima]
const P = [["01", A, "a", 0.34], ["02", A, "a", 0.32], ["03", A, "a", 0.3], ["04", A, "a", 0.3], ["05", D, "d", 0.25], ["06", A, "a", 0.3], ["07", D, "d", 0.25],
  ["08", A, "a", 0.3], ["09", D, "d", 0.25], ["10", A, "a", 0.34], ["11", O, "o", 0.25], ["12", A, "a", 0.34], ["13", O, "o", 0.25]];
// silencios entre parlamentos (después de cada uno)
const G = [0.45, 0.45, 0.4, 0.3, 0.35, 0.3, 0.4, 0.3, 0.45, 0.4, 0.45, 0.4];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const r = (n) => Math.round(n * 1000) / 1000;
// tramos con sonido de una parte, achicando cada silencio a `max`
function tramos(f, max) {
  const total = dur(f);
  const log = execSync(`ffmpeg -hide_banner -i ${f} -af silencedetect=n=-36dB:d=${max} -f null - 2>&1`).toString();
  const s = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const e = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
  const keep = []; let desde = 0;
  s.forEach((a, i) => { const b = e[i] ?? total; const mitad = max / 2; keep.push([desde, a + mitad]); desde = b - mitad; });
  keep.push([desde, total]);
  return keep.filter(([a, b]) => b - a > 0.01);
}
// tiempo original -> tiempo dentro de la parte compactada
const mapa = (keep) => (t) => { let acc = 0; for (const [a, b] of keep) { if (t < a) return acc; if (t <= b) return acc + t - a; acc += b - a; } return acc; };
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], voces = [];
P.forEach(([n, a, quien, max], i) => {
  const f = `partes/${n}-c.wav`;
  const keep = tramos(f, max), m = mapa(keep);
  const sel = keep.map(([x, y]) => `between(t,${x.toFixed(3)},${y.toFixed(3)})`).join("+");
  const largo = keep.reduce((s, [x, y]) => s + y - x, 0);
  args += ` -i ${f}`; filt += `[${k}:a]aresample=48000,aformat=channel_layouts=mono,aselect='${sel}',asetpts=N/SR/TB,atempo=${a}[v${k}];`; lab += `[v${k}]`; k++;
  voces.push([out.length, quien]);
  for (const w of JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: r(t + m(w.start) / a), end: r(t + m(w.end) / a) });
  console.log(n, quien, "arranca en", r(t), "palabra", voces.at(-1)[0], "· largo", r(dur(f)), "->", r(largo / a));
  t += largo / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
const fix = JSON.parse(fs.existsSync("partes/fix.json") ? fs.readFileSync("partes/fix.json", "utf8") : "{}");
for (const [i, a] of Object.entries(fix)) if (out[i]) { out[i].start = a; out[i].end = Math.max(out[i].end, a + 0.12); }
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(voces));
