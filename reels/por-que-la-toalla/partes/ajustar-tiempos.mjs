// Tiempos por palabra de assets/voice/locucion.wav (ver partes/armar-voz.sh): se arman desde el STT de cada toma
// (orus1, reutiliza1, cierre1) corrido por el lugar donde quedó cada tramo, con los arreglos a mano de lo que STT
// interpoló mal (medido con silencedetect). Uso (desde reels/por-que-la-toalla): node partes/ajustar-tiempos.mjs
import fs from "node:fs";
const L = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const o = L("partes/orus1-stt.json"), r = L("partes/reutiliza1.json"), c = L("partes/cierre1.json");
const fija = (p, i, s, e) => { p[i].start = s; p[i].end = e; };
fija(o, 28, 10.29, 10.55); fija(o, 29, 10.55, 10.64); fija(o, 30, 10.64, 11.11); // Ganó el segundo.
fija(o, 31, 11.46, 11.62); fija(o, 32, 11.62, 11.81); // ¿Por qué?
fija(o, 49, 17.75, 18.3); // Graciela
const G = fs.readFileSync("guion.txt", "utf8").split(/\s+/).filter(Boolean);
const out = [];
const pon = (w, off) => out.push({ text: G[out.length], start: Math.round((w.start + off) * 1000) / 1000, end: Math.round((w.end + off) * 1000) / 1000 });
const A = 8.0, N = 2.39, B = 11.28 - 10.15, Cc = 11.9 - 11.28, D = 22.63 - 11.9, Ee = 24.15 - 22.63;
const tB = A + N, tC = tB + B + 0.35, tD = tC + Cc + 0.25, tE = tD + D + 0.25, tF = tE + Ee + 0.12;
for (let i = 0; i <= 21; i++) pon(o[i], 0);
for (let i = 0; i < 6; i++) pon(r[i], A - 0.1);
for (let i = 28; i <= 30; i++) pon(o[i], tB - 10.15);
for (let i = 31; i <= 32; i++) pon(o[i], tC - 11.28);
for (let i = 33; i <= 65; i++) pon(o[i], tD - 11.9);
for (let i = 66; i <= 71; i++) pon(o[i], tE - 22.63);
for (let i = 0; i < 10; i++) pon(c[i], tF - 0.12);
pon({ start: c[10].start, end: 4.72 }, tF - 0.12); // "scalerics.com." = "Scálerics punto com"
if (out.length !== G.length) throw new Error(`palabras ${out.length} != guion ${G.length}`);
fs.writeFileSync("assets/voice/palabras.json", JSON.stringify(out, null, 1));
console.log("palabras.json:", out.length, "palabras; fin", out.at(-1).end);
