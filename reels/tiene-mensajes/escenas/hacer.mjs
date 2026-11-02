// Escribe compositions/sNN-*.html y sus .sfx.json desde escenas/a.mjs, b.mjs y c.mjs.
// Correr desde reels/tiene-mensajes DESPUÉS de `node armar.mjs` (toma las duraciones de tiempos.md),
// y de nuevo `node armar.mjs` al final (para que el index incluya las escenas nuevas).
import fs from "node:fs";
import { escena } from "./lib.mjs";

const dur = {};
for (const m of fs.readFileSync("tiempos.md", "utf8").matchAll(/### (\S+) — dura ([\d.]+) s/g)) dur[m[1]] = Number(m[2]);

const solo = process.argv[2];
for (const f of ["a", "b", "c"]) {
  if (!fs.existsSync(`escenas/${f}.mjs`)) continue;
  const { default: lista } = await import(`./${f}.mjs`);
  for (const e of lista) {
    if (solo && !e.id.startsWith(solo)) continue;
    if (!dur[e.id]) throw new Error("sin duración: " + e.id);
    fs.writeFileSync(`compositions/${e.id}.html`, escena({ ...e, dur: dur[e.id] }));
    fs.writeFileSync(`compositions/${e.id}.sfx.json`, JSON.stringify(e.sfx, null, 0).replace(/\},\{/g, "},\n{") + "\n");
    console.log("escrita", e.id, dur[e.id]);
  }
}
