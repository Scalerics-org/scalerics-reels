// Une los tiempos por parlamento (pal/NN.json) en assets/voice/palabras.json según rec/lista.txt.
// El texto de cada palabra sale de ../guion.txt (ortografía de los subtítulos: "200" y no "doscientos").
import fs from "node:fs";
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${f}`).toString());
const G = fs.readFileSync("../guion.txt", "utf8").split(/\s+/).filter(Boolean);
let t = 0, out = [];
for (const l of fs.readFileSync("rec/lista.txt", "utf8").trim().split("\n")) {
  const f = l.match(/'(.+)'/)[1];
  const n = f.match(/^(\d\d)\.wav$/)?.[1];
  if (n) for (const w of JSON.parse(fs.readFileSync(`pal/${n}.json`, "utf8"))) out.push({ id: out.length, text: G[out.length], start: +(w.start + t).toFixed(3), end: +(w.end + t).toFixed(3), parte: n });
  t += dur(f);
}
if (out.length !== G.length) throw new Error(`palabras ${out.length} != guion ${G.length}`);
// correcciones a mano: id → inicio
const FIX = { 6: 3.81, 7: 3.95, 12: 5.98, 27: 12.47, 41: 21.87, 74: 34.94, 79: 36.34, 85: 39.27, 93: 44.5, 102: 49.12, 103: 49.24, 127: 60.78, 134: 63.37, 135: 63.52 };
for (const [i, s] of Object.entries(FIX)) out[i].start = s;
for (let i = 0; i < out.length; i++) out[i].end = Math.max(out[i].start + 0.05, i + 1 < out.length ? Math.min(out[i].end, out[i + 1].start) : out[i].end);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras, total", t.toFixed(2));
console.log(out.map((w) => `${w.id}:${w.text}@${w.start.toFixed(2)}`).join(" "));
