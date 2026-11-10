// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada tramo de voz (silencedetect -40 dB, d 0.09 sobre assets/voice/locucion.wav,
// la que arma partes/armar-voz.sh); "Rubén" (75-78) es la línea de Rubén
const F = [[0, 0.05, 2.134], [9, 2.606, 4.107], [14, 4.474, 5.354], [17, 5.468, 6.832], [22, 7.17, 7.692], [24, 7.906, 8.385],
  [25, 8.697, 9.345], [29, 9.694, 10.265], [31, 10.546, 11.4955], [34, 11.588, 12.467], [38, 12.837, 14.266], [42, 14.675, 15.126],
  [44, 15.256, 16.981], [48, 17.402, 19.049], [54, 19.34, 21.218], [60, 21.504, 23.107], [66, 23.401, 24.321], [70, 24.553, 25.447],
  [73, 25.819, 26.354], [75, 26.7715, 27.054], [77, 27.154, 27.979], [79, 28.585, 30.84], [86, 31.212, 34.38]];
// el cierre a mano (STT del tramo suelto + envolvente RMS): la tarjeta arranca en "videollamada"
const MANO = { 87: 31.5, 88: 31.68, 89: 32.1, 90: 32.72, 91: 33.0 };
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
for (const [i, s] of Object.entries(MANO)) { out[i].start = s; out[i - 1].end = s; }
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log(out.map((w, i) => `${i}:${w.text}@${w.start}`).join(" "));
