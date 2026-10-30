// Arma assets/voice/palabras.json y guion.txt con los parlamentos (tiempos de tiempos.mjs sobre cada
// partes/NN-c.wav), divididos por el atempo y corridos a su inicio en la locución (como pegar.sh).
import fs from "node:fs";
import { execSync } from "node:child_process";
const N = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"];
const T = [1.1,1.1,1.15,1.15,1.15,1.15,1.15,1.1,1.15,1.15,1.1,1.15,1.1,1.08,1.08];
const G = [0.4,0.35,0.45,0.3,0.3,0.3,0.35,0.3,0.4,0.5,0.4,0.35,0.6,0.45];
const out = []; const r = (n) => Math.round(n * 1000) / 1000;
let off = 0;
N.forEach((n, i) => {
  const ws = JSON.parse(fs.readFileSync("partes/" + n + ".json", "utf8"));
  console.log(n, "arranca en", r(off), "palabra", out.length);
  for (const w of ws) out.push({ id: out.length, text: w.text, start: r(off + w.start / T[i]), end: r(off + w.end / T[i]) });
  off += Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${n}-c.wav`).toString()) / T[i] + (G[i] ?? 0);
});
// a mano (tramos oídos con silencedetect sobre la locución): [primera palabra, última, desde, hasta];
// las palabras del tramo se reparten según su largo. STT corrió varias (Orus sobre todo).
const TRAMOS = [[31, 33, 13.59, 14.2], [37, 38, 16.17, 17.44], [39, 42, 17.65, 18.61], [70, 71, 30.14, 31.02],
  [99, 100, 43.55, 44.15], [121, 126, 52.29, 53.69], [127, 130, 54.14, 55.38], [131, 136, 55.59, 57.43],
  [137, 145, 58.12, 60.4], [146, 157, 60.64, 64.26], [158, 164, 64.4, 65.76], [165, 169, 66.03, 67.09], [174, 178, 69.04, 70.2]];
for (const [a, b, t0, t1] of TRAMOS) {
  const ws = out.slice(a, b + 1), pesos = ws.map((w) => w.text.replace(/[^\p{L}]/gu, "").length + 1.5);
  const tot = pesos.reduce((x, y) => x + y, 0); let t = t0;
  ws.forEach((w, k) => { const d = (t1 - t0) * pesos[k] / tot; w.start = r(t); w.end = r(t + d); t += d; });
}
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", N.map((n) => fs.readFileSync("partes/" + n + ".txt", "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; fin calculado", r(off));
