// Corrige a mano tiempos de palabras dentro de cada parte (sacados de silencedetect). Correr desde reels/el-hipnotista.
import fs from "node:fs";
const F = {
  "04": { 6: 3.5, 10: 6.0, 11: 7.22, 12: 8.58 },
  "06": { 6: 3.6, 7: 4.0, 8: 5.29, 9: 5.75, 10: 6.3, 11: 7.63, 12: 8.15, 13: 8.7 },
  "07": { 6: 4.63, 7: 4.95, 8: 6.68, 9: 8.02, 10: 9.5 },
  "11": { 8: 4.75 },
  "12": { 4: 2.76, 5: 2.95 },
};
for (const [n, fx] of Object.entries(F)) {
  const w = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  for (const [i, t] of Object.entries(fx)) { w[i].start = t; }
  for (let i = 0; i < w.length; i++) w[i].end = i + 1 < w.length ? Math.max(w[i].start + 0.1, Math.min(w[i].end, w[i + 1].start)) : Math.max(w[i].end, w[i].start + 0.3);
  fs.writeFileSync(`partes/${n}.json`, JSON.stringify(w));
  console.log(n, w.map((x) => x.text + "@" + x.start).join(" "));
}
