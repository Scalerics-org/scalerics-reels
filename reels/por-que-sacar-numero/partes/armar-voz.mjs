// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS), por tramos:
//   partes/orus1-2.wav (Orus, frases 1-4, 6, 8-9; "MIT" sale "em-ai-ti")
//   partes/n5-2.wav    (Orus, ronda 1: "Los que llegaron después se llevaban lo suyo antes.")
//   partes/n7-1.wav    (Orus, ronda 1: "Que te pasen, muchas veces, pesa más que esperar.")
//   partes/ruben-2.wav (Algenib, Rubén: "¿Graciela? ¿Vos estabas antes?")
//   partes/orus2-1.wav (Orus, "Con un sistema…" + "Graciela, primera." y el cierre "Agendá…")
//   partes/n13-1.wav   (Orus, ronda 1: "¿Ponemos número en tu negocio?")
// Ronda 1: orus1-2 llega hasta 27,95 ("y se fue antes" estaba cortado) y orus2-1 hasta 10,30 (el "com").
// Cada silencio (silencedetect -40 dB) se lleva a un largo fijo. Orus va con atempo 1,15 (sin cambiar el tono).
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const ARCH = ["partes/orus1-2.wav", "partes/n5-2.wav", "partes/n7-1.wav", "partes/ruben-2.wav", "partes/orus2-1.wav", "partes/n13-1.wav"];
const GAN = [-1.5, -1.5, -1.5, 1.5, -1.2, -1.2]; // dB por archivo: Rubén viene ~3,5 dB más bajo que Orus
// [archivo, desde, hasta, [[inicio silencio, fin silencio, largo que queda], ...], tempo, silencio después]
const T = 1.15; // ronda 1: 1,1 → 1,15 para quedar en ~35,5 s
const TRAMOS = [
  [0, 0.12, 10.04, [[2.664, 3.093, 0.24], [5.501, 5.915, 0.36], [6.392, 6.740, 0.36]], T, 0.2], // gancho → "bici."
  [1, 0.2, 3.63, [[1.685, 1.793, 0.06]], T, 0.22],                       // "Los que llegaron después se llevaban lo suyo antes."
  [0, 13.1, 15.25, [], T, 0.2],                     // "Pasó años estudiando filas."
  [2, 0.1, 2.97, [[1.687, 1.901, 0.12]], T, 0.34],                       // "Que te pasen, muchas veces, pesa más que esperar."
  [0, 20.36, 27.95, [[21.453, 21.771, 0.2], [23.061, 23.232, 0.2], [24.904, 25.120, 0.18]], T, 0.36], // "En lo de Rubén…" → "…se fue antes."
  [3, 0.24, 2.42, [[1.0, 1.285, 0.22]], 1.0, 0.32],                      // Rubén
  [4, 0.22, 4.97, [[3.197, 3.714, 0.24]], T, 0.34],  // "Con un sistema…" + "Graciela, primera."
  [5, 0.22, 1.92, [], T, 0.2],                      // "¿Ponemos número en tu negocio?"
  [4, 6.775, 10.3, [], T, 0.4],                     // "Agendá una videollamada gratis en Scálerics punto com."
];
const f = [], seg = [];
let k = 0;
const trozo = (inp, s, e, tempo, fo = 0.012) => { const d = (e - s) / tempo; f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,${tempo !== 1 ? `atempo=${tempo},` : ""}volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(d - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); };
const sil = (d) => { f.push(`anullsrc=r=48000:cl=mono,atrim=0:${d.toFixed(3)}[p${k}]`); seg.push(`[p${k++}]`); };
for (const [i, desde, hasta, pausas, tempo, despues] of TRAMOS) {
  let a = desde;
  for (const [s0, s1, L] of pausas) { trozo(i, a, s0 + 0.04, tempo); sil(Math.max(0, L - 0.08)); a = s1 - 0.04; }
  trozo(i, a, hasta, tempo, 0.03);
  sil(despues);
}
const ins = ARCH.map((p) => `-i ${p}`).join(" ");
execSync(`ffmpeg -y -hide_banner -loglevel error ${ins} -filter_complex "${f.join(";")};${seg.join("")}concat=n=${seg.length}:v=0:a=1,aresample=48000[o]" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav`);
console.log("locucion.wav:", dur("assets/voice/locucion.wav").toFixed(2), "s");
