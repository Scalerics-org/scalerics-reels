// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS), por tramos:
//   partes/orus1-1.wav (Orus, frases 1-6; las 3 tomas largas salieron CORTADAS al final: "decide" truncado)
//   partes/n7-3.wav    (Orus, "Llamar en la primera hora… al que decide." suelta, termina entera)
//   partes/ruben-2.wav (Algenib, Rubén: "Yo le compré al que llamó primero." / "¿Y esta consulta de ayer?")
//   partes/orus2-4.wav (Orus, "Un CRM…" → "…Scálerics punto com."; "ce erre eme" en el texto de la voz)
// Cada tramo es una frase (cortada en los silencios de silencedetect -45 dB y la envolvente); el silencio de después es fijo.
// Orus con atempo 1,06 (sin cambiar el tono). Rubén a tempo 1.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const ARCH = ["partes/orus1-1.wav", "partes/n7-3.wav", "partes/ruben-2.wav", "partes/orus2-4.wav"];
const GAN = [-0.6, -2.4, 0.3, -1.4]; // dB por archivo para dejar todo parejo (~ -17 LUFS)
const T = 1.06;
// [archivo, desde, hasta, tempo, silencio después]
const TRAMOS = [
  [0, 0.09, 2.43, T, 0.3],    // ¿Por qué pedís un presupuesto y te llaman enseguida?
  [0, 2.83, 4.31, T, 0.3],    // Porque el interés se enfría rápido.
  [0, 4.59, 5.44, T, 0.3],    // ¿Qué tan rápido?
  [0, 5.85, 8.2, T, 0.22],    // Un estudio les escribió a más de dos mil empresas.
  [0, 8.44, 10.79, T, 0.28],  // Casi una de cada cuatro nunca contestó.
  [0, 11.25, 13.27, T, 0.14], // Las demás tardaron, en promedio,
  [0, 13.64, 14.62, T, 0.25], // casi dos días.
  [1, 0.21, 4.3, T, 0.45],    // Llamar en la primera hora multiplicaba las chances de llegar al que decide.
  [2, 0.2, 1.83, 1.0, 0.5],   // Yo le compré al que llamó primero.
  [2, 2.21, 3.58, 1.0, 0.4],  // ¿Y esta consulta de ayer?
  [3, 0.27, 3.9, T, 0.25],    // Un CRM anota cada consulta y te avisa al instante.
  [3, 4.2, 6.27, T, 0.3],     // Si el cliente se enfría, le escribe solo.
  [3, 6.74, 7.75, T, 0.15],   // ¿Querés llegar primero?
  [3, 7.92, 11.15, T, 0.28],  // Agendá una videollamada gratis en Scálerics punto com.
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
