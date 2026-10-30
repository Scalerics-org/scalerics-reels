// Arma assets/voice/palabras.json y guion.txt con los parlamentos (tiempos de tiempos.mjs sobre cada
// partes/NN-c.wav), divididos por el atempo y corridos a su inicio en la locución (como pegar.sh).
import fs from "node:fs";
import { execSync } from "node:child_process";
const N = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"];
const T = [1.1,1.1,1.15,1.1,1.15,1.15,1.15,1.1,1.06,1.15,1.06,1.15,1.06,1.1,1.07];
const G = [0.45,0.45,0.3,0.45,0.4,0.4,0.4,0.3,0.9,0.35,0.5,0.45,0.4,0.7];
const out = []; const r = (n) => Math.round(n * 1000) / 1000;
let off = 0;
N.forEach((n, i) => {
  for (const w of JSON.parse(fs.readFileSync("partes/" + n + ".json", "utf8"))) out.push({ id: out.length, text: w.text, start: r(off + w.start / T[i]), end: r(off + w.end / T[i]) });
  console.log(n, "arranca en", r(off), "palabra", out.length - JSON.parse(fs.readFileSync("partes/" + n + ".json", "utf8")).length);
  off += Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${n}-c.wav`).toString()) / T[i] + (G[i] ?? 0);
});
// arreglos a mano (palabras que Speech-to-Text interpoló todas juntas)
const fix = (i, st) => { out[i].start = st; out[i - 1].end = Math.min(out[i - 1].end, st); };
fix(16, r(out[15].start + 0.14)); fix(17, r(out[15].start + 0.3)); fix(119, r(out[118].start + 0.22)); fix(140, r(out[141].start - 0.3));
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
fs.writeFileSync("guion.txt", N.map((n) => fs.readFileSync("partes/" + n + ".txt", "utf8").trim()).join("\n") + "\n");
console.log(out.length, "palabras; fin calculado", r(off));
