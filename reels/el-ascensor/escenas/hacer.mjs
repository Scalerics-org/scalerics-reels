// Escribe compositions/sNN-*.html y .sfx.json (menos s01, que está escrita a mano). Correr desde reels/el-ascensor.
import fs from "node:fs";
import { escribir } from "./molde.mjs";
import A from "./a.mjs";
const B = fs.existsSync("escenas/b.mjs") ? (await import("./b.mjs")).default : [];
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = Number((await import("node:child_process")).execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString());
const r2 = (n) => Math.round(n * 100) / 100;
const DUR = r2(Math.max(r2(VOZ), pal.at(-1).end) + 3.2);
const ultima = reel.escenas.at(-1);
const durFin = r2(DUR - r2(pal[ultima[1]].start));
const solo = process.argv[2];
for (const e of [...A, ...B]) if (!solo || e.id.startsWith(solo)) escribir(e, durFin);
