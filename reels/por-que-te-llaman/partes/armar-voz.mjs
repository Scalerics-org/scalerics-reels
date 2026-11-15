// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS), por tramos:
//   partes/orus1-1.wav (Orus, frases 1-2)
//   partes/orus1b-4.wav (Orus, ronda 1: "¿Qué tan rápido? Un estudio lo midió: …casi dos días. Listo."; el "Listo." del
//                       final se descarta: es para que Gemini no corte la última palabra, como pasaba con las tomas largas)
//   partes/ruben-2.wav (Algenib, Rubén: "Yo le compré al que llamó primero." / "¿Y esta consulta de ayer?")
//   partes/orus2-4.wav (Orus, "Un CRM…" → "…Scálerics punto com."; "ce erre eme" en el texto de la voz)
// Cada tramo es una frase (cortada en los silencios de silencedetect -45 dB y la envolvente); el silencio de después es fijo.
// Orus con atempo 1,06 (sin cambiar el tono). Rubén a tempo 1.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const ARCH = ["partes/orus1-1.wav", "partes/orus1b-4.wav", "partes/ruben-2.wav", "partes/orus2-4.wav"];
const GAN = [-0.6, -2.9, 0.3, -1.4]; // dB por archivo para dejar todo parejo (~ -17 LUFS)
const T = 1.06;
// [archivo, desde, hasta, tempo, silencio después]  (ronda 1: cada tramo termina 60-120 ms después, con fundido de 60 ms)
const TRAMOS = [
  [0, 0.09, 2.47, T, 0.3],    // ¿Por qué pedís un presupuesto y te llaman enseguida?
  [0, 2.83, 4.36, T, 0.28],   // Porque el interés se enfría rápido.
  [1, 0.25, 1.1, T, 0.25],    // ¿Qué tan rápido?
  [1, 1.4, 2.4, T, 0.12],     // Un estudio lo midió:
  [1, 2.62, 6.44, T, 0.3],    // llamar en la primera hora multiplicaba las chances de llegar al que decide.
  [1, 6.8, 9.32, T, 0.12],    // Pero cuando les escribió a más de dos mil empresas,
  [1, 9.66, 12.6, T, 0.3],    // casi una de cada cuatro nunca contestó.
  [1, 13.0, 15.72, T, 0.45],  // Las demás tardaron, en promedio, casi dos días.
  [2, 0.2, 1.88, 1.0, 0.5],   // Yo le compré al que llamó primero.
  [2, 2.21, 3.62, 1.0, 0.4],  // ¿Y esta consulta de ayer?
  [3, 0.27, 3.96, T, 0.25],   // Un CRM anota cada consulta y te avisa al instante.
  [3, 4.2, 6.3, T, 0.28],     // Si el cliente se enfría, le escribe solo.
  [3, 6.74, 7.86, T, 0.12],   // ¿Querés llegar primero?
  [3, 7.92, 11.15, T, 0.12],  // Agendá una videollamada gratis en Scálerics punto com.
];
const f = [], seg = [];
let k = 0, t = 0;
const trozo = (inp, s, e, tempo, fo = 0.06) => { const d = (e - s) / tempo; f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,aresample=48000,aformat=channel_layouts=mono,${tempo !== 1 ? `atempo=${tempo},` : ""}volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(d - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); return d; };
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
