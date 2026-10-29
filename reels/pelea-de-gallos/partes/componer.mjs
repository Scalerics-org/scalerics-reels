// Arma assets/voice/palabras.json con los tiempos de cada parlamento (sacados por separado con
// tiempos.mjs sobre partes/NN-c.wav), divididos por el atempo y corridos a su inicio en la locución.
import fs from "node:fs";
const P = [["01",0,1.05],["02",7.48975,1.13],["03",19.498917,1.13],["04",31.669459,1.0],["05",34.550209,1.13],["06",46.774542,1.13],["07",61.280271,1.07]];
const out = []; const r = (n) => Math.round(n * 1000) / 1000;
for (const [n, off, k] of P) for (const w of JSON.parse(fs.readFileSync("partes/" + n + ".json", "utf8"))) out.push({ id: out.length, text: w.text, start: r(off + w.start / k), end: r(off + w.end / k) });
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras");
