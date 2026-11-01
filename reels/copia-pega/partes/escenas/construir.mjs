// Arma compositions/<id>.html desde partes/escenas/<id>.html reemplazando <!--@PIEZA--> por el SVG de piezas.mjs.
// Correr desde reels/copia-pega: node partes/escenas/construir.mjs [ids...]
import fs from "node:fs";
import * as P from "./piezas.mjs";
const dir = "partes/escenas";
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));
for (const id of ids) {
  let s = fs.readFileSync(`${dir}/${id}.html`, "utf8");
  s = s.replace(/\/\*@([A-Z]+)\*\//g, (_, n) => P[n]);
  s = s.replace(/<!--@([A-Z]+)-->/g, (_, n) => {
    if (!P[n]) throw new Error(`${id}: no existe la pieza ${n}`);
    return P[n];
  });
  s = s.replaceAll("{{ID}}", id);
  // __CLAVE__ -> partes/escenas/vars.json (DUR, QUIEN, TINTA, FLASH para ambiente)
  const V = JSON.parse(fs.existsSync(`${dir}/vars.json`) ? fs.readFileSync(`${dir}/vars.json`, "utf8") : "{}");
  s = s.replace(/__([A-Z]+)__/g, (m, k) => (k in V ? JSON.stringify(V[k]) : m));
  fs.writeFileSync(`compositions/${id}.html`, s);
  console.log("ok", id);
}
