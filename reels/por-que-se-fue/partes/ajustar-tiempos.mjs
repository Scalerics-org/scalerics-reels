// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada frase (silencedetect -35 dB, d 0.07)
const F = [[0, 0.11, 1.17], [4, 1.36, 2.08], [6, 2.34, 2.96], [8, 3.36, 5.83], [18, 6.15, 6.5], [19, 6.6, 7.64], [22, 7.73, 8.15], [24, 8.45, 10.86], [32, 11.01, 12.87],
  [40, 13.13, 13.58], [42, 13.9, 15.08], [45, 15.17, 16.85], [51, 17.21, 19.21], [60, 19.54, 21.65], [68, 21.91, 22.81], [70, 23.1, 23.93], [73, 24.21, 26.24],
  [79, 26.51, 26.64], [80, 26.75, 27.82], [84, 28.02, 29.67], [88, 29.78, 31.37]];
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
