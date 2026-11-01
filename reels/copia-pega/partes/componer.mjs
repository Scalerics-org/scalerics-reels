// Arma assets/voice/locucion.wav, assets/voice/palabras.json y guion.txt (correr desde reels/copia-pega).
// partes/NN-c.wav y partes/NN.json salen de partes/procesar.sh (ya recortados y acelerados).
// Imprime el índice de la primera palabra de cada parlamento (para reel.voces) y escribe
// partes/escenas/vars.json (quién habla en cada tramo, para ambiente.html).
import fs from "node:fs";
import { execSync } from "node:child_process";
// [parte, quién]  m maestro · a alumno · o Scalerics
const P = [["01", "m"], ["02", "a"], ["03", "m"], ["04", "a"], ["05", "m"], ["06", "a"], ["07", "m"], ["08", "a"], ["09", "m"], ["10", "a"], ["11", "m"], ["12", "o"]];
// silencio DESPUÉS de cada parte
const G = [0.34, 0.34, 0.32, 0.34, 0.32, 0.3, 0.34, 0.34, 0.4, 0.34, 0.6];
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
let args = "", lab = "", k = 0, t = 0;
const out = [], voces = [], quien = [];
const r = (n) => Math.round(n * 1000) / 1000;
const fix = JSON.parse(fs.existsSync("partes/fix.json") ? fs.readFileSync("partes/fix.json", "utf8") : "{}");
P.forEach(([n, q], i) => {
  args += ` -i partes/${n}-c.wav`; lab += `[${k}:a]`; k++;
  voces.push([out.length, q]);
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [j, a] of Object.entries(fix[n] ?? {})) { ws[j].start = a; }
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start), end: r(t + w.end) });
  const d = dur(`partes/${n}-c.wav`);
  console.log(n, q, "arranca en", r(t), "palabra", voces.at(-1)[0]);
  quien.push([q, r(t), r(t + d + (G[i] ?? 3)) ]);
  t += d;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
for (let i = 1; i < out.length; i++) if (out[i].end < out[i].start) out[i].end = out[i].start + 0.1;
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", P.map(([n]) => fs.readFileSync(`partes/${n}.txt`, "utf8").trim()).join("\n") + "\n");
// tramos de quién habla, juntando los seguidos
const tramos = [];
for (const [q, a, b] of quien) { const u = tramos.at(-1); if (u && u[0] === "q" + q) u[2] = b; else tramos.push(["q" + q, a, b]); }
const vars = JSON.parse(fs.existsSync("partes/escenas/vars.json") ? fs.readFileSync("partes/escenas/vars.json", "utf8") : "{}");
vars.QUIEN = tramos;
fs.writeFileSync("partes/escenas/vars.json", JSON.stringify(vars, null, 1));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s");
console.log('"voces":', JSON.stringify(voces));
