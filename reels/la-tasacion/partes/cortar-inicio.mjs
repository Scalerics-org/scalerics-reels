// Saca las primeras k palabras de un parlamento ya procesado (NN-p.wav, NN.txt, NN.json) sin regenerar la voz.
// Uso (desde reels/la-tasacion): node partes/cortar-inicio.mjs NN k
import fs from "node:fs";
import { execSync } from "node:child_process";
const [n, k] = [process.argv[2], Number(process.argv[3])];
const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
const t = Math.max(0, ws[k].start - 0.04);
execSync(`ffmpeg -hide_banner -loglevel error -y -ss ${t} -i partes/${n}-p.wav -ar 48000 -ac 1 partes/${n}-p2.wav && mv partes/${n}-p2.wav partes/${n}-p.wav`);
const out = ws.slice(k).map((w, i) => ({ ...w, id: i, start: Math.round((w.start - t) * 1000) / 1000, end: Math.round((w.end - t) * 1000) / 1000 }));
fs.writeFileSync(`partes/${n}.json`, JSON.stringify(out));
fs.writeFileSync(`partes/${n}.txt`, fs.readFileSync(`partes/${n}.txt`, "utf8").split(/\s+/).filter(Boolean).slice(k).join(" ") + "\n");
console.log(n, "cortado en", t.toFixed(2), "->", fs.readFileSync(`partes/${n}.txt`, "utf8").trim());
