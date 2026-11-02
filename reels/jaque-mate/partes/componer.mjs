// Arma assets/voice/locucion.wav y assets/voice/palabras.json (correr desde reels/jaque-mate).
// partes/NN.wav (voces.sh) -> NN-c.wav (recortar.sh) -> NN-p.wav (pausas.mjs) -> NN.json (tiempos.sh).
// Voces: gran maestro Charon (m), ayudante Puck (a), dueño Fenrir (d), clienta Leda (c), agente Kore (k), Orus (o).
import fs from "node:fs";
import { execSync } from "node:child_process";
const VOZ = { "01": "m", "02": "a", "03": "m", "04": "c", "05": "d", "06": "m", "07": "a", "08": "d", "09": "m", "10": "a", "11": "m", "12": "a",
  "13": "m", "14": "d", "15": "m", "16": "a", "17": "m", "18": "o", "19": "k", "20": "c", "21": "a", "22": "m", "23": "o" };
const AT = { m: 1.22, a: 1.22, d: 1.18, c: 1.15, k: 1.2, o: 1.18 };
const TEL = new Set(["04", "19", "20"]); // los mensajes de WhatsApp suenan un poco a celular
// silencio después de cada parlamento (01..22)
const G = [0.5, 0.35, 0.3, 0.3, 0.4, 0.25, 0.25, 0.3, 0.4, 0.25, 0.35, 0.25, 0.3, 0.35, 0.5, 0.3, 0.45, 0.35, 0.25, 0.3, 0.25, 0.5];
const P = Object.keys(VOZ).sort();
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const r = (n) => Math.round(n * 1000) / 1000;
let args = "", filt = "", lab = "", k = 0, t = 0;
const out = [], turnos = [];
P.forEach((n, i) => {
  const a = AT[VOZ[n]];
  args += ` -i partes/${n}-p.wav`;
  const tel = TEL.has(n) ? ",highpass=f=250,lowpass=f=5000" : "";
  filt += `[${k}:a]atempo=${a}${tel}[v${k}];`; lab += `[v${k}]`; k++;
  const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  turnos.push([out.length, VOZ[n]]);
  console.log(n, VOZ[n], "arranca en", r(t), "palabra", out.length);
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(t + w.start / a), end: r(t + w.end / a) });
  t += dur(`partes/${n}-p.wav`) / a;
  if (i < G.length) { args += ` -f lavfi -t ${G[i]} -i anullsrc=r=48000:cl=mono`; lab += `[${k}:a]`; k++; t += G[i]; }
});
execSync(`ffmpeg -hide_banner -loglevel error -y ${args} -filter_complex "${filt}${lab}concat=n=${k}:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras; locución", dur("assets/voice/locucion.wav"), "s (calculado", r(t), ")");
console.log("voces:", JSON.stringify(turnos));
