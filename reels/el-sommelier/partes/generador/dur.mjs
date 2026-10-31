import fs from "node:fs";
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(fs.readFileSync("/dev/null") && 0) || 0);
const DUR = 74.36;
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
export const D = {};
reel.escenas.forEach(([id, i], k) => { const b = k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR; D[id] = r2(b - ini(i)); });
