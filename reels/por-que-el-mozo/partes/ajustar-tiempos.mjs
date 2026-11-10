// Corrige palabras.json con los silencios reales de la locución (la que arma partes/armar-voz.sh): cada frase arranca
// donde termina el silencio anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no
// se reparten por letras. Correr desde reels/por-que-el-mozo después de tiempos.mjs (que escribe palabras-stt.json).
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada tramo de voz (silencedetect -40 dB, d 0.1 + envolvente RMS de 20-30 ms)
const F = [[0, 0.03, 2.954], [12, 3.321, 4.966], [18, 5.087, 5.988], [21, 6.38, 6.87], [22, 7.421, 7.906], [25, 8.151, 11.978],
  [36, 12.52, 12.843], [38, 13.306, 15.101], [45, 15.334, 17.89], [55, 18.21, 19.217], [58, 19.507, 20.823], [62, 20.928, 21.727],
  [64, 22.098, 24.244], [71, 24.427, 25.874], [75, 26.385, 27.002], [76, 27.578, 28.415], [79, 28.97, 30.526], [83, 30.81, 34.036]];
// a mano (envolvente RMS): las palabras donde pasa algo en pantalla
const MANO = { 1: 0.24, 8: 1.45, 9: 2.12, 11: 2.44, 37: 12.67, 53: 17.4, 54: 17.61, 84: 31.14, 85: 31.38, 86: 32.22, 87: 32.55, 88: 32.88 };
const out = stt.map((w) => ({ ...w }));
F.forEach(([i0, a, b], k) => {
  const i1 = k + 1 < F.length ? F[k + 1][0] : stt.length;
  const ws = out.slice(i0, i1);
  const peso = ws.map((w) => w.text.replace(/[^\p{L}\d]/gu, "").length + 2);
  const tot = peso.reduce((s, x) => s + x, 0);
  let acc = 0;
  const prop = ws.map((w, j) => { const s = a + ((b - a) * acc) / tot; acc += peso[j]; return s; });
  ws.forEach((w, j) => {
    const s = stt[i0 + j].start;
    const ok = j > 0 && s > a + 0.05 && s < b - 0.1 && Math.abs(s - prop[j]) < 0.35;
    w.start = Math.round((ok ? s : prop[j]) * 100) / 100;
    if (j === 0) w.start = a;
  });
  for (let j = 1; j < ws.length; j++) if (ws[j].start < ws[j - 1].start + 0.08) ws[j].start = Math.round((ws[j - 1].start + 0.08) * 100) / 100;
  ws.forEach((w, j) => { w.end = j + 1 < ws.length ? ws[j + 1].start : b; });
});
for (const [i, s] of Object.entries(MANO)) { out[i].start = s; if (i > 0 && out[i - 1].end > s) out[i - 1].end = s; if (out[i - 1] && F.every(([k]) => k !== Number(i))) out[i - 1].end = s; }
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log(out.map((w, i) => `${i}:${w.text}@${w.start}`).join(" "));
