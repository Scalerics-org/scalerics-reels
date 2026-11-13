// Envolvente de la voz de Rubén (23,45-25,7 s de la locución) a 30 cuadros por segundo, para abrir la boca por amplitud.
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/boca.mjs → assets/boca.js
import fs from "node:fs";
import { execSync } from "node:child_process";
const T0 = 23.66, T1 = 25.91;
const txt = execSync(`ffmpeg -hide_banner -ss ${T0} -t ${T1 - T0} -i assets/voice/locucion.wav -af "asetnsamples=1600,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null - 2>&1`).toString();
const db = [...txt.matchAll(/RMS_level=(-?[\d.]+|-inf)/g)].map((m) => (m[1] === "-inf" ? -90 : Number(m[1])));
const v = db.map((d) => Math.round(Math.min(1, Math.max(0, (d + 42) / 26)) * 100) / 100);
fs.writeFileSync("assets/boca.js", `// lo genera partes/boca.mjs\nexport const BOCA = { t0: ${T0}, fps: 30, v: ${JSON.stringify(v)} };\n`);
console.log("boca.js:", v.length, "cuadros");
