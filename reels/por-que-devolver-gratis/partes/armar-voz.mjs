// Arma assets/voice/locucion.wav desde partes/orus2.wav (Orus, toma 2, 36,49 s; guion para la voz en
// partes/guion-voz.txt) con el final de partes/orus1.wav (toma 1: en la toma 2 se oye "agenda EN una videollamada").
//  - Cada pausa (silencedetect -38 dB) se lleva a un largo fijo: más larga antes de "¿Por qué?" (bisagra) y antes de
//    "Y le quedaron." (pausa de comedia); las demás, cortas.
//  - Toma 2 hasta 32,95 s ("…¿Lo ponemos en tu tienda?") + toma 1 desde 35,00 s ("Agendá una videollamada gratis en
//    Scálerics punto com.", +0,6 dB para igualar el nivel).
//  - Todo a atempo 1,07 (la toma quedaba en ~36,7 s) y 0,30 s de silencio al final.
// Uso (desde la carpeta del reel): node partes/armar-voz.mjs
import { execSync } from "node:child_process";
// [inicio del silencio, fin del silencio, largo que queda] (segundos de orus2)
const PAUSAS = [
  [2.699, 3.026, 0.3],   // gancho → "Porque"
  [8.664, 9.117, 0.3],   // "online." → "Los que pagaron"
  [13.949, 14.378, 0.55], // "antes." → "¿Por qué?" (bisagra)
  [14.753, 15.23, 0.3],  // "¿Por qué?" → "Comprar"
  [19.153, 19.535, 0.3], // "achica." → "¿Devuelven"
  [20.936, 21.336, 0.4], // "Algo." → "Pero" (el matiz)
  [22.835, 23.067, 0.32], // "todavía." → "Rubén"
  [26.727, 26.952, 0.3], // "quedan?" → "La tienda"
  [30.139, 30.446, 0.62], // "gratis." → "Y le quedaron." (pausa de comedia)
  [31.193, 31.697, 0.4], // "quedaron." → "¿Lo ponemos"
];
const FIN2 = 32.95, DESDE1 = 35.0, TEMPO = 1.07;
const seg = [];
let a = 0, k = 0;
const f = [];
const trozo = (inp, s, e, extra = "") => { f.push(`[${inp}:a]atrim=${s}:${e},asetpts=N/SR/TB,afade=t=in:d=0.015,afade=t=out:st=${(e - s - 0.015).toFixed(3)}:d=0.015${extra}[p${k}]`); seg.push(`[p${k++}]`); };
const sil = (d) => { f.push(`anullsrc=r=48000:cl=mono,atrim=0:${d.toFixed(3)}[p${k}]`); seg.push(`[p${k++}]`); };
for (const [s0, s1, L] of PAUSAS) {
  // se conserva 0,04 s de cada borde del silencio (colas naturales) y el resto es silencio digital
  trozo(0, a, s0 + 0.04); sil(Math.max(0, L - 0.08)); a = s1 - 0.04;
}
trozo(0, a, FIN2);
sil(0.12);
trozo(1, DESDE1, 38.2, ",volume=0.6dB");
sil(0.3 * TEMPO);
f.push(`${seg.join("")}concat=n=${seg.length}:v=0:a=1,atempo=${TEMPO},aresample=48000[o]`);
execSync(`ffmpeg -y -hide_banner -loglevel error -i partes/orus2.wav -i partes/orus1.wav -filter_complex "${f.join(";")}" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav`);
console.log("locucion.wav:", execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString().trim(), "s");
