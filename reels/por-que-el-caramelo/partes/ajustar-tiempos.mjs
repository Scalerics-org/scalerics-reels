// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada tramo de voz (silencedetect -40 dB, d 0.08 sobre assets/voice/locucion.wav
// del guion v2, la que arma partes/armar-voz.sh); 81-85 es la línea de Rubén
const F = [[0, 0.05, 2.134], [9, 2.563, 4.651], [17, 4.877, 5.704], [20, 5.798, 6.35], [23, 6.77, 7.292], [25, 7.506, 7.985],
  [26, 8.297, 8.945], [30, 9.294, 9.865], [32, 10.146, 11.0955], [35, 11.188, 12.067], [39, 12.437, 13.866], [43, 14.275, 14.726],
  [45, 14.979, 16.621], [51, 17.032, 18.463], [56, 18.701, 19.824], [61, 20.315, 21.699], [67, 22.027, 23.771], [73, 24.175, 24.958],
  [77, 25.455, 26.256], [81, 26.759, 27.061], [83, 27.17, 28.70], [86, 29.26, 31.455], [93, 31.69, 34.82]];
// el cierre a mano (STT de tramos sueltos + envolvente RMS): la tarjeta arranca en "videollamada"
const MANO = { 94: 32.08, 95: 32.27, 96: 33.0, 97: 33.3, 98: 33.52 };
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
