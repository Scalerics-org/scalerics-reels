// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada frase (silencedetect -35 dB, d 0.07) · locución v3: v1 con las líneas 4, 5 y 9
// de partes/frases3.wav (la toma de tono más parecido, medido con partes/tono.py) pegadas con ffmpeg; "¿Querés" arranca después de la respiración
const F = [[0, 0.11, 1.17], [4, 1.36, 2.08], [6, 2.34, 2.96], [8, 3.11, 5.58], [18, 5.9, 6.26], [19, 6.35, 7.39], [22, 7.48, 7.9],
  [24, 8.19, 10.58], [32, 10.8, 12.65], [40, 13.06, 13.51], [42, 13.83, 15.01], [45, 15.1, 16.78], [51, 17.14, 19.14], [60, 19.48, 21.04],
  [66, 21.28, 22.41], [70, 22.71, 23.54], [73, 23.82, 25.85], [79, 26.36, 27.43], [84, 27.63, 29.28], [88, 29.39, 30.98]];
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
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log(out.map((w, i) => `${i}:${w.text}@${w.start}`).join(" "));
