// Arma assets/voice/locucion.wav desde las tomas elegidas (Gemini TTS), por tramos (una frase cada uno):
//   partes/orus1aj-2.wav (Orus, gancho → "…mirando la cinta."; texto con "Jiúston" para que diga Houston bien)
//   partes/orus1b-1.wav  (Orus, "Entonces alejaron…" → "…más todavía.")
//   partes/ruben1-2.wav  (Algenib, "Sale hoy. Te lo dije hace una hora.")
//   partes/orus2-1.wav   (Orus, "Tu cliente sin noticias…" → "…cada paso.")
//   partes/ruben2-2.wav  (Algenib, "Nadie llamó. ¿Se cortó el teléfono?")
//   partes/orus3-2.wav   (Orus, "Agendá una videollamada gratis en Scálerics punto com."; "¿Lo armamos?" se saca:
//                         decisión del coordinador si la voz pasaba de 35 s)
// Los "Listo." del final de cada toma se descartan (están para que Gemini no corte la última palabra).
// Orus con atempo T (sin cambiar el tono). Rubén a tempo 1. Silencio fijo después de cada tramo.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
const ARCH = ["partes/orus1aj-2.wav", "partes/orus1b-1.wav", "partes/ruben1-2.wav", "partes/orus2-1.wav", "partes/ruben2-2.wav", "partes/orus3-2.wav", "partes/orus1c-2.wav", "partes/orus4-2.wav"];
const GAN = [-1.7, -1.9, 1.2, -0.9, -0.4, -2.6, -1.9, -2.6]; // dB por archivo (todo parejo, ~ -17 LUFS)
const T = 1.12;
// [archivo, desde, hasta, tempo, silencio después]
export const TRAMOS = [
  [0, 0.25, 3.9, T, 0.22],     // ¿Por qué un aeropuerto de Houston hizo caminar más a la gente?
  [0, 4.27, 5.42, T, 0.18],   // Seis veces más.
  [0, 5.89, 7.8, T, 0.22],    // Las quejas casi desaparecieron.
  [0, 8.33, 8.73, T, 0.24],    // ¿Por qué?
  [0, 9.42, 10.82, T, 0.14],  // Esperaban ocho minutos:
  [0, 11.18, 13.84, T, 0.2], // uno caminando y siete mirando la cinta.
  [1, 0.25, 2.62, T, 0.18],   // Entonces alejaron las puertas de llegada.
  [6, 0.25, 3.66, T, 0.08],   // ronda 1: Un profesor ya lo había explicado en 1985:
  [6, 4.05, 6.17, T, 0.2],    // ronda 1: la espera vacía se siente más larga. (misma toma)
  [1, 9.29, 12.05, T, 0.3],  // La que no sabés cuánto dura, más todavía.
  [2, 0.24, 2.2, 1.0, 0.22],  // Sale hoy. Te lo dije hace una hora.
  [3, 0.21, 2.8, T, 0.2],     // Tu cliente sin noticias está frente a la cinta.
  [3, 3.16, 5.93, T, 0.4],   // Una automatización le avisa sola cada paso.
  [4, 0.25, 1.14, 1.0, 0.62], // Nadie llamó. (ronda 1: pausa de comedia ~0,7 s con la cola)
  [4, 1.8, 3.27, 1.0, 0.24],  // ¿Se cortó el teléfono?
  [7, 0.24, 1.57, T, 0.14],   // ronda 1: ¿Sin esperas a ciegas? (orus4-2)
  [5, 1.26, 4.25, T, 0.1],    // Agendá una videollamada gratis en Scálerics punto com.
];
if (process.argv[1].endsWith("armar-voz.mjs")) {
  const f = [], seg = [];
  let k = 0, t = 0;
  const trozo = (inp, s, e, tempo, fo = 0.05) => { const d = (e - s) / tempo; f.push(`[${inp}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=N/SR/TB,aresample=48000,aformat=channel_layouts=mono,${tempo !== 1 ? `atempo=${tempo},` : ""}volume=${GAN[inp]}dB,afade=t=in:d=0.012,afade=t=out:st=${(d - fo).toFixed(3)}:d=${fo}[p${k}]`); seg.push(`[p${k++}]`); return d; };
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
  fs.writeFileSync("partes/tramos.json", JSON.stringify(marcas));
  console.log("tramos:", JSON.stringify(marcas));
}
