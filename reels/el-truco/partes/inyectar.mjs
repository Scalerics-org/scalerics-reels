// Copia partes/naipes.js (cartas españolas dibujadas) dentro de cada escena, entre las marcas
// "// <naipes>" y "// </naipes>". Correr desde reels/el-truco después de cambiar naipes.js.
import fs from "node:fs";
const bloque = fs.readFileSync("partes/naipes.js", "utf8").trimEnd();
for (const f of fs.readdirSync("compositions").filter((f) => /^s\d\d.*\.html$/.test(f))) {
  const p = "compositions/" + f, s = fs.readFileSync(p, "utf8");
  const n = s.replace(/^[ \t]*\/\/ <naipes>[\s\S]*?\/\/ <\/naipes>/m, () => bloque);
  if (n !== s) { fs.writeFileSync(p, n); console.log("naipes →", f); }
}
