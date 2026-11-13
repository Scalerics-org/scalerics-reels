// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS):
//   partes/orus1-2.wav (Orus, frases 1-9; la toma 1 se comía el "en" de "en la fiambrería"; "MIT" sale "em-ai-ti")
//   partes/ruben-2.wav (Algenib, Rubén: "¿Graciela? ¿Vos estabas antes?")
//   partes/orus2-1.wav (Orus, frases 11-13)
// Cada silencio (silencedetect -40 dB) se lleva a un largo fijo. Orus va con atempo (sin cambiar el tono) para que
// el reel no pase de ~37 s con 94 palabras.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
// [archivo, desde, hasta, [[inicio silencio, fin silencio, largo que queda], ...], tempo]
const PARTES = [
  ["partes/orus1-2.wav", 0.12, 26.95, [
    [2.664, 3.093, 0.3],   // "número?" → "Para"
    [5.501, 5.915, 0.5],   // "pase." → "¿Por qué?" (bisagra)
    [6.392, 6.740, 0.6],   // "¿Por qué?" → "Un profesor" (el "?" en pantalla)
    [9.999, 10.191, 0.22], // "bici." → "Los que"
    [12.980, 13.137, 0.24], // "antes." → "Pasó"
    [16.168, 16.397, 0.2], // "escribió:" → "que te pasen"
    [20.181, 20.403, 0.45], // "esperar." → "En lo de Rubén" (asienta)
    [21.452, 21.771, 0.26], // "Rubén," → "la fila"
    [23.061, 23.232, 0.26], // "ve." → "Graciela"
    [24.904, 25.120, 0.24], // "WhatsApp." → "Walter"
  ], 1.1],
  ["partes/ruben-2.wav", 0.24, 2.42, [], 1.0],
  ["partes/orus2-1.wav", 0.22, 9.62, [
    [3.197, 3.714, 0.3],   // "solo." → "Graciela"
    [4.931, 5.469, 0.42],  // "primera." → "¿Ordenamos" (remate)
    [6.469, 6.815, 0.26],  // "tuya?" → "Agendá"
  ], 1.1],
];
const ENTRE = [0.45, 0.4];
const GAN = [-1.5, 1.5, -1.2]; // dB por parte: Rubén viene ~3,5 dB más bajo que Orus
const f = [], seg = [];
let k = 0;
const trozo = (inp, s, e, tempo, fo = 0.012) => { const d = (e - s) / tempo; f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,${tempo !== 1 ? `atempo=${tempo},` : ""}volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(d - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); };
const sil = (d) => { f.push(`anullsrc=r=48000:cl=mono,atrim=0:${d.toFixed(3)}[p${k}]`); seg.push(`[p${k++}]`); };
PARTES.forEach(([, desde, hasta, pausas, tempo], i) => {
  let a = desde;
  for (const [s0, s1, L] of pausas) { trozo(i, a, s0 + 0.04, tempo); sil(Math.max(0, L - 0.08)); a = s1 - 0.04; }
  trozo(i, a, hasta, tempo, 0.03);
  if (i < ENTRE.length) sil(ENTRE[i]);
});
sil(0.5);
const ins = PARTES.map(([p]) => `-i ${p}`).join(" ");
execSync(`ffmpeg -y -hide_banner -loglevel error ${ins} -filter_complex "${f.join(";")};${seg.join("")}concat=n=${seg.length}:v=0:a=1,aresample=48000[o]" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav`);
console.log("locucion.wav:", dur("assets/voice/locucion.wav").toFixed(2), "s");
