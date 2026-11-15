// Envolvente de la voz de Rubén (sus tramos en assets/voice/locucion.wav, de partes/tramos.json) a 30 cuadros por
// segundo, para abrir la boca por amplitud. Fuera de los tramos de Rubén (10, 13, 14) la boca queda en 0.
// Uso (desde la carpeta del reel, después de partes/armar-voz.mjs): node partes/boca.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const TRS = JSON.parse(fs.readFileSync("partes/tramos.json", "utf8"));
const SUYOS = [10, 13, 14].map((i) => TRS[i]);
const T0 = SUYOS[0][0], T1 = SUYOS.at(-1)[1];
const txt = execSync(`ffmpeg -hide_banner -ss ${T0} -t ${T1 - T0} -i assets/voice/locucion.wav -af "asetnsamples=1600,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null - 2>&1`).toString();
const db = [...txt.matchAll(/RMS_level=(-?[\d.]+|-inf)/g)].map((m) => (m[1] === "-inf" ? -90 : Number(m[1])));
const v = db.map((d, i) => { const t = T0 + i / 30; const suyo = SUYOS.some(([a, b]) => t >= a - 0.02 && t <= b + 0.02); return suyo ? Math.round(Math.min(1, Math.max(0, (d + 42) / 26)) * 100) / 100 : 0; });
fs.writeFileSync("assets/boca.js", `// lo genera partes/boca.mjs\nexport const BOCA = { t0: ${T0}, fps: 30, v: ${JSON.stringify(v)} };\n`);
console.log("boca.js:", v.length, "cuadros desde", T0);
