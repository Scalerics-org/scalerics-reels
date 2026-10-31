// Pone en cada compositions/<id>.html la duración de tiempos.md (DUR y data-duration).
import fs from "node:fs";
const t = fs.readFileSync("tiempos.md", "utf8");
for (const m of t.matchAll(/### (\S+) — dura ([\d.]+) s/g)) {
  const [, id, d] = m;
  const f = `compositions/${id}.html`;
  if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/const DUR = [\d.]+;/, `const DUR = ${d};`).replace(/data-duration="[\d.]+"/g, `data-duration="${d}"`);
  fs.writeFileSync(f, s);
  console.log(id, d);
}
const total = t.match(/Duración total ([\d.]+)/)[1];
let a = fs.readFileSync("compositions/ambiente.html", "utf8");
a = a.replace(/const DUR = [\d.]+;/, `const DUR = ${total};`).replace(/data-duration="[\d.]+"/g, `data-duration="${total}"`);
fs.writeFileSync("compositions/ambiente.html", a);
