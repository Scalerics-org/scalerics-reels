// node escenas/hacer.mjs [s02 s03 ...]  (desde reels/modo-de-armado): regenera las escenas
const pedidas = process.argv.slice(2);
const todas = ["s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "s11", "s12", "s13"];
for (const s of pedidas.length ? pedidas : todas) {
  try { await import(`./${s}.mjs`); } catch (e) { if (e.code !== "ERR_MODULE_NOT_FOUND") throw e; }
}
