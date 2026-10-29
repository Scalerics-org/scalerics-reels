// Une los tiempos por parlamento (pal/NN.json) en assets/voice/palabras.json según rec/lista.txt.
import fs from "node:fs";
import { execSync } from "node:child_process";
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 rec/${f}`).toString());
let t = 0, out = [];
for (const l of fs.readFileSync("rec/lista.txt", "utf8").trim().split("\n")) {
  const f = l.match(/'(.+)'/)[1];
  const n = f.match(/^(\d\d)\.wav$/)?.[1];
  if (n) for (const w of JSON.parse(fs.readFileSync(`pal/${n}.json`, "utf8"))) out.push({ id: out.length, text: w.text, start: +(w.start + t).toFixed(3), end: +(w.end + t).toFixed(3), parte: n });
  t += dur(f);
}
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out));
console.log(out.length, "palabras, total", t.toFixed(2));
console.log(out.map((w) => `${w.id}:${w.text}@${w.start.toFixed(2)}`).join(" "));
// correcciones a mano (silencedetect sobre locucion.wav): id → inicio
const FIX = { 16: 8.48, 17: 9.53, 18: 9.8, 26: 15.7, 35: 19.63, 36: 19.9, 37: 20.0, 51: 26.17, 52: 26.3, 66: 33.34, 97: 48.8, 98: 48.95, 99: 49.05, 105: 53.84, 106: 54.02 };
for (const [i, s] of Object.entries(FIX)) out[i].start = s;
for (let i = 0; i < out.length; i++) out[i].end = Math.max(out[i].start + 0.05, i + 1 < out.length ? Math.min(out[i].end, out[i + 1].start) : out[i].end);
fs.writeFileSync("../assets/voice/palabras.json", JSON.stringify(out));
