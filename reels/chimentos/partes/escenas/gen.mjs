// Genera las escenas pedidas (o todas): node partes/escenas/gen.mjs [s01 s02 ...]
import fs from "node:fs";
const pedidas = process.argv.slice(2);
const todas = fs.readdirSync("partes/escenas").filter((f) => /^s\d\d\.mjs$/.test(f)).sort();
for (const f of todas) {
  if (pedidas.length && !pedidas.includes(f.slice(0, 3))) continue;
  await import("./" + f);
  console.log("escena", f);
}
