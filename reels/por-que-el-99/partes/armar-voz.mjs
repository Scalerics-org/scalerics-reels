// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS), por tramos:
//   partes/orus1-1.wav (Orus, frases 1-8; "No está probado" de esta toma el STT lo oía "aprobado")
//   partes/n4-2.wav    (Orus, "No está probado." suelta: el STT la oye exacta)
//   partes/ruben-3.wav (Algenib, Rubén: "¿Y mi noventa y nueve vendió más?")
//   partes/orus2-1.wav (Orus, "Un reporte automático…" → "…Scálerics punto com.")
//   partes/n7-3.wav    (Orus, "Lo que sí se comprobó:" suelta; ronda 1 de corrección)
// Cada tramo es una frase (cortada en los silencios de silencedetect -40 dB); el silencio de después es fijo.
// Orus con atempo 1,1 (sin cambiar el tono). Pausa de 0,42 s antes de "y vendió más" (el giro).
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const ARCH = ["partes/orus1-1.wav", "partes/n4-2.wav", "partes/ruben-3.wav", "partes/orus2-1.wav", "partes/n7-3.wav", "partes/n8-3.wav"];
const GAN = [-1.5, -3.7, 0.5, -1.0, -3.0, -1.7]; // dB por archivo para dejar todo parejo (~ -17 LUFS)
const T = 1.1;
// [archivo, desde, hasta, tempo, silencio después]
const TRAMOS = [
  [0, 0.21, 2.79, T, 0.42],   // ¿Por qué los precios terminan en noventa y nueve?
  [5, 0.23, 2.12, T, 0.28],   // Porque el primer número pesa más.  (ronda 2: toma suelta n8-3; en la larga el STT oía "pizza más")
  [0, 5.67, 7.97, T, 0.42],   // Noventa y nueve parece menos que cien.
  [0, 8.42, 9.85, T, 0.22],   // ¿Lo del cajero y el vuelto?
  [1, 0.23, 1.29, T, 0.45],   // No está probado.
  [4, 0.16, 1.645, T, 0.14],  // Lo que sí se comprobó:  (ronda 1: "se midió" el STT lo oía "se me dio"; n7-3 la oye exacta)
  [0, 12.98, 14.05, T, 0.12], // el mismo vestido,
  [0, 14.23, 15.40, T, 0.1],  // a treinta y cuatro
  [0, 15.54, 16.69, T, 0.3],  // y a treinta y nueve.
  [0, 17.05, 17.84, T, 0.42], // Más caro…  (la pausa del giro)
  [0, 18.21, 19.39, T, 0.3],  // y vendió más.
  [0, 20.04, 21.78, T, 0.24], // El nueve suena a oferta.
  [0, 22.27, 23.65, T, 0.45], // A veces gana el redondo.
  [2, 0.22, 2.01, 1.0, 0.4],  // Rubén
  [3, 0.22, 2.93, T, 0.28],   // Un reporte automático le dice qué precio vende más.
  [3, 3.15, 4.20, T, 0.18],   // ¿Medimos los tuyos?
  [3, 4.35, 7.57, T, 0.35],   // Agendá una videollamada gratis en Scálerics punto com.
];
const f = [], seg = [];
let k = 0, t = 0;
const trozo = (inp, s, e, tempo, fo = 0.03) => { const d = (e - s) / tempo; f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,aresample=48000,aformat=channel_layouts=mono,${tempo !== 1 ? `atempo=${tempo},` : ""}volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(d - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); return d; };
const sil = (d) => { f.push(`anullsrc=r=48000:cl=mono,atrim=0:${d.toFixed(3)}[p${k}]`); seg.push(`[p${k++}]`); };
const marcas = [];
for (const [i, desde, hasta, tempo, despues] of TRAMOS) {
  const d = trozo(i, desde, hasta, tempo);
  marcas.push([+t.toFixed(3), +(t + d).toFixed(3)]);
  t += d + despues; sil(despues);
}
const ins = ARCH.map((p) => `-i ${p}`).join(" ");
execSync(`ffmpeg -y -hide_banner -loglevel error ${ins} -filter_complex "${f.join(";")};${seg.join("")}concat=n=${seg.length}:v=0:a=1,aresample=48000[o]" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav`);
console.log("locucion.wav:", dur("assets/voice/locucion.wav").toFixed(2), "s");
console.log("tramos:", JSON.stringify(marcas)); (await import("node:fs")).writeFileSync("partes/tramos.json", JSON.stringify(marcas));
