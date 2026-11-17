// prev2.mjs ("t@cam t@cam ..."): como prev.mjs con una cámara por cuadro. Vista rápida de la capa 3D (sin la capa HTML) para armar planos. Abre Chrome: correr con el candado.
//   flock /tmp/hyperframes.lock node prev.mjs "0.5,2,4.2" renders/prev/nombre [cam=px,py,pz,mx,my,mz,fov]
// Escribe renders/prev/nombre/t-<t>.png (540x960) y una hoja.png.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire("/opt/node-tools/node_modules/");
const { chromium } = require("playwright-core");
const [ts, out = "renders/prev/ult"] = process.argv.slice(2);
const tipos = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".png": "image/png", ".woff2": "font/woff2", ".wav": "audio/wav", ".css": "text/css" };
const srv = http.createServer((q, r) => {
  const f = path.join(process.cwd(), decodeURIComponent(q.url.split("?")[0]));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { "content-type": tipos[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r);
});
await new Promise((ok) => srv.listen(0, ok));
const port = srv.address().port;
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const pg = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
pg.on("pageerror", (e) => console.error("ERROR página:", e.message));
pg.on("console", (m) => { if (m.type() === "error") console.error("consola:", m.text()); });
await pg.goto(`http://localhost:${port}/index.html`);
await pg.waitForFunction(() => !!window.__tresRender, null, { timeout: 120000 });
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (f.endsWith(".png")) fs.unlinkSync(path.join(out, f));
const lista = ts.split(" ").filter(Boolean).map((s) => { const [t, c] = s.split("@"); return { t: Number(t), c }; });
for (const [i, { t, c: cam }] of lista.entries()) {
  const dbg = await pg.evaluate(([t, cam]) => { window.__cam = cam ? cam.split(",").map(Number) : undefined; window.__tresRender(t); return window.__tresDbg ? window.__tresDbg(t) : null; }, [t, cam]);
  const b64 = await pg.evaluate(() => document.getElementById("tres").toDataURL("image/png").split(",")[1]);
  const f = path.join(out, `t-${String(i).padStart(2, "0")}-${t.toFixed(2)}.png`);
  fs.writeFileSync(f, Buffer.from(b64, "base64"));
  if (!process.env.FULL) execSync(`ffmpeg -loglevel error -y -i ${f} -vf scale=540:-1 ${f}.s.png && mv ${f}.s.png ${f}`);
  console.log(t, JSON.stringify(dbg));
}
await nav.close(); srv.close();
const n = lista.length, cols = Math.min(6, n);
execSync(`ffmpeg -loglevel error -y -pattern_type glob -i "${out}/t-*.png" -vf "scale=270:-1,tile=${cols}x${Math.ceil(n / cols)}" -frames:v 1 ${out}/hoja.png`);
console.log(`${out}/hoja.png`);
