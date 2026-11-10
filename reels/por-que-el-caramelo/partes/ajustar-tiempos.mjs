// Corrige palabras.json con los silencios reales de la locución: cada frase arranca donde termina el silencio
// anterior; dentro de la frase se usan los tiempos de STT si caen adentro y en orden, si no se reparten por letras.
import fs from "node:fs";
const stt = JSON.parse(fs.readFileSync("assets/voice/palabras-stt.json", "utf8"));
// [primer índice de palabra, inicio, fin] de cada tramo de voz (silencedetect -40 dB, d 0.08 sobre assets/voice/locucion.wav
// del guion v2, la que arma partes/armar-voz.sh); 78-82 es la línea de Rubén
const F = [[0, 0.05, 2.134], [9, 2.558, 4.377], [14, 4.827, 5.654], [17, 5.748, 6.30], [20, 6.72, 7.242], [22, 7.456, 7.935],
  [23, 8.247, 8.895], [27, 9.244, 9.815], [29, 10.096, 11.0455], [32, 11.138, 12.017], [36, 12.387, 13.816], [40, 14.225, 14.676],
  [42, 14.929, 16.571], [48, 16.982, 18.413], [53, 18.651, 19.774], [58, 20.265, 21.649], [64, 21.977, 23.721], [70, 24.125, 24.908],
  [74, 25.405, 26.206], [78, 26.709, 27.011], [80, 27.12, 28.65], [83, 29.21, 31.405], [90, 31.64, 34.77]];
// el cierre a mano (STT de tramos sueltos + envolvente RMS): la tarjeta arranca en "videollamada"
const MANO = { 91: 32.03, 92: 32.22, 93: 32.95, 94: 33.25, 95: 33.47 };
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
