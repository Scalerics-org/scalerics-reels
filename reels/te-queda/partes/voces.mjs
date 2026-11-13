// Genera las tomas que falten (a y b) de partes/lineas.tsv, de a una, reintentando si la cuota corta.
import fs from "node:fs"; import { execFileSync } from "node:child_process";
const L = fs.readFileSync("partes/lineas.tsv", "utf8").trim().split("\n").map((l) => l.split("\t"));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
for (const [f, v, , tono] of L) for (const k of (process.env.TOMAS || "ab").split("")) {
  const out = `partes/tomas/${f}-${k}.wav`; if (fs.existsSync(out)) continue;
  for (let i = 0; i < 8; i++) {
    try { execFileSync("node", ["../../herramientas/voz.mjs", `partes/${f}.txt`, out, "--voz", v, "--tono", tono], { stdio: "pipe" }); console.log("ok", out); break; }
    catch (e) { console.log("reintento", out, String(e.stderr).match(/→ (\d+)/)?.[1]); await esperar(20000); }
  }
}
