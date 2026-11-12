// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS):
//   partes/orus1-2.wav (Orus, frases 1-6; "Joe Girard" sale en inglés: el STT oye "yo girar")
//   partes/ruben-2.wav (Algenib, Rubén: "¿Walter? ¿Hace cuánto que no viene?")
//   partes/orus2-1.wav (Orus, frases 8-10; la toma 2 decía "lo escribe")
// Cada silencio (silencedetect -38 dB, y -34 dB d=0,04 para el de después de "¿Por qué?") se lleva a un largo fijo.
// Entre partes: 0,7 s antes de Rubén (incluye el +0,3 de "acordarse.") y 0,4 s después. 0,3 s al final.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
// [archivo, desde, hasta, [[inicio silencio, fin silencio, largo que queda], ...]]
const PARTES = [
  ["partes/orus1-2.wav", 0.0, 17.7, [
    [4.019, 4.353, 0.34],  // "compraron?" → "Porque"
    [9.069, 9.418, 0.55],  // "año." → "¿Por qué?" (bisagra)
    [9.78, 10.02, 0.8],    // "¿Por qué?" → "La tarjeta" (el "?" en pantalla; ronda 1: 0,62 → 0,8)
    [14.025, 14.209, 0.42], // "bien." → "Al que"
  ]],
  ["partes/ruben-2.wav", 0.24, 2.7, [[1.062, 1.452, 0.3]]],
  ["partes/orus2-1.wav", 0.25, 13.1, [
    [1.309, 1.741, 0.3],   // "sabe:" → "tres"
    [4.805, 5.551, 0.62],  // "nada." → "El sábado" (pausa de comedia)
    [7.379, 8.387, 0.42],  // "volvió." → "¿Que no"
    [9.679, 10.087, 0.3],  // "ninguno?" → "Agendá"
  ]],
];
const ENTRE = [0.62, 0.4]; // ronda 1: la cola de "acordarse." 80 ms más larga (se oía "acordar"); la pausa compensa
const f = [], seg = [];
let k = 0;
const GAN = [-1.5, 0.0, -1.2]; // dB por parte: Orus pica en 0 dBFS; Rubén venía 2,6 LU más bajo
const trozo = (inp, s, e, fo = 0.012) => { f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(e - s - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); };
const sil = (d) => { f.push(`anullsrc=r=48000:cl=mono,atrim=0:${d.toFixed(3)}[p${k}]`); seg.push(`[p${k++}]`); };
PARTES.forEach(([, desde, hasta, pausas], i) => {
  let a = desde;
  for (const [s0, s1, L] of pausas) { trozo(i, a, s0 + 0.04); sil(Math.max(0, L - 0.08)); a = s1 - 0.04; }
  trozo(i, a, hasta, 0.03);
  if (i < ENTRE.length) sil(ENTRE[i]);
});
sil(0.25);
const ins = PARTES.map(([p]) => `-i ${p}`).join(" ");
execSync(`ffmpeg -y -hide_banner -loglevel error ${ins} -filter_complex "${f.join(";")};${seg.join("")}concat=n=${seg.length}:v=0:a=1,aresample=48000[o]" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav`);
console.log("locucion.wav:", dur("assets/voice/locucion.wav").toFixed(2), "s");
