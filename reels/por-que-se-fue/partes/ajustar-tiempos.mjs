// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada frase (silencedetect -35 dB, d 0.07) · locución v2: v1 con las frases 5 y 9
// regeneradas (partes/frases1.wav) y pegadas con ffmpeg; "¿Querés" arranca después de la respiración
const F = [[0, 0.11, 1.17], [4, 1.36, 2.08], [6, 2.34, 2.96], [8, 3.11, 5.58], [18, 5.9, 6.26], [19, 6.35, 7.39], [22, 7.48, 7.9],
  [24, 8.2, 10.61], [32, 10.73, 12.52], [40, 12.81, 13.26], [42, 13.58, 14.76], [45, 14.85, 16.53], [51, 16.89, 18.89], [60, 19.22, 20.61],
  [66, 20.8, 21.72], [70, 22.02, 22.85], [73, 23.13, 25.16], [79, 25.67, 26.74], [84, 26.94, 28.59], [88, 28.7, 30.29]];
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
