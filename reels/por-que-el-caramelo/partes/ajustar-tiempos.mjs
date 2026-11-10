// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada tramo de voz (silencedetect -40 dB, d 0.08 sobre assets/voice/locucion.wav
// del guion v2, la que arma partes/armar-voz.sh); 78-82 es la línea de Rubén
const F = [[0, 0.05, 2.134], [9, 2.558, 4.377], [14, 4.827, 5.654], [17, 5.748, 6.575], [20, 6.77, 7.292], [22, 7.504, 7.986],
  [23, 8.297, 8.945], [27, 9.294, 9.865], [29, 10.146, 11.0955], [32, 11.188, 12.067], [36, 12.437, 13.866], [40, 14.575, 15.026],
  [42, 15.279, 16.921], [48, 17.332, 18.763], [53, 19.001, 20.124], [58, 20.615, 21.999], [64, 22.327, 24.071], [70, 24.538, 26.125],
  [74, 26.965, 27.759], [78, 28.286, 28.88], [80, 29.263, 31.046], [83, 31.628, 33.584], [90, 33.788, 36.922]];
// el cierre a mano (STT de tramos sueltos + envolvente RMS): la tarjeta arranca en "videollamada"
const MANO = { 79: 28.66, 81: 29.72, 82: 30.17, 91: 34.23, 92: 34.37, 93: 35.01, 94: 35.35, 95: 35.49 };
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
