// Arma reels/<slug>/portada.png (1080x1920) con reels/<slug>/portada.json:
//   { "t": 5.5, "chica": "Te voy a robar", "grande": "tus clientes", "sello": "Plan: el golpe",
//     "acento": "#f5c518", "sello_color": "#e5484d", "zoom": 1.12, "foco": "40%",
//     "velo": "6,16,31" (color RGB de las bandas oscuras, el del fondo del reel), "fondo": "#06101f" }
// El cuadro sale del render del reel (renders/<slug>-final.mp4 o su rama reel/<slug>).
// Uso, desde la raíz: node herramientas/portada.mjs <slug>
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const slug = process.argv[2];
if (!/^[a-z0-9-]+$/.test(slug || "")) throw new Error("uso: node herramientas/portada.mjs <slug>");
const dir = path.resolve("reels", slug);
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "portada.json"), "utf8"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portada-"));

let video = path.join(dir, "renders", `${slug}-final.mp4`);
if (!fs.existsSync(video)) {
  video = path.join(tmp, "v.mp4");
  fs.writeFileSync(video, execFileSync("git", ["show", `origin/reel/${slug}:reels/${slug}/renders/${slug}-final.mp4`], { maxBuffer: 300e6 }));
}
const cuadro = path.join(tmp, "cuadro.png");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", String(cfg.t ?? 2), "-i", video, "-frames:v", "1", cuadro]);

// Círculo rojo alrededor de lo importante: "circulo": { "x": 540, "y": 760, "r": 220 } (centro y radio, en px
// de la portada). Flecha roja: "flecha": { "x": 120, "y": 1000, "rot": -35 } (x, y = donde arranca la cola;
// rot = grados, 0 apunta a la derecha, negativo sube). Las dos son opcionales.
function extras(c) {
  let h = "";
  if (c.circulo) {
    const { x, y, r } = c.circulo;
    h += `<div class="circulo" style="left:${x - r}px;top:${y - r * 0.85}px;width:${2 * r}px;height:${1.7 * r}px"></div>`;
  }
  if (c.flecha) {
    const { x, y, rot = 0 } = c.flecha;
    h += `<svg class="flecha" viewBox="0 0 260 120" style="left:${x}px;top:${y - 60}px;transform:rotate(${rot}deg)">` +
      `<path d="M8 60 C 80 50, 140 70, 190 60" stroke="#000" stroke-width="40" fill="none" stroke-linecap="round"/>` +
      `<path d="M8 60 C 80 50, 140 70, 190 60" stroke="#ff2d2d" stroke-width="26" fill="none" stroke-linecap="round"/>` +
      `<path d="M170 14 L252 60 L170 106 Z" fill="#ff2d2d" stroke="#000" stroke-width="10" stroke-linejoin="round"/></svg>`;
  }
  return h;
}
// Tamaño de letra para que el renglón más largo entre en 960 px (Lexend 900 en mayúsculas ≈ 0,7 em por letra)
// sin pasar del máximo: así "ES UNA IA" no deja el "IA" solo abajo.
function tam(texto, maximo) {
  const palabras = String(texto || "").split(/\s+/);
  const largo = palabras.join(" ").length;
  // En un solo renglón si no hay que achicar más de un 30 %
  const unRenglon = Math.floor(960 / (largo * 0.76));
  if (unRenglon >= maximo * 0.7) return Math.min(maximo, unRenglon);
  const renglones = Math.max(1, Math.ceil((largo * 0.76 * maximo) / 960));
  const porRenglon = Math.max(...palabras.map((p) => p.length), Math.ceil(largo / renglones));
  return Math.min(maximo, Math.floor(960 / (porRenglon * 0.76)));
}
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const url = (p) => "file:///" + p.replace(/\\/g, "/");
let html = fs.readFileSync(path.resolve("herramientas/portada.html"), "utf8")
  .replaceAll("__FUENTES__", url(path.join(dir, "assets", "fonts")))
  .replaceAll("__CUADRO__", url(cuadro))
  .replace("__SELLO__", esc(cfg.sello))
  .replace("__CHICA__", `<span style="font-size:${tam(cfg.chica, 112)}px">${esc(cfg.chica)}</span>`)
  .replace("__GRANDE__", `<span style="font-size:${tam(cfg.grande, 190)}px">${esc(cfg.grande)}</span>`)
  .replace("__EXTRAS__", extras(cfg));
const vars = [["--acento", cfg.acento], ["--sello", cfg.sello_color], ["--zoom", cfg.zoom], ["--foco", cfg.foco], ["--velo", cfg.velo], ["--fondo", cfg.fondo], ["--foco-x", cfg.foco_x], ["--brillo-y", cfg.brillo_y]]
  .filter(([, v]) => v != null).map(([k, v]) => `${k}: ${v};`).join(" ");
if (vars) html = html.replace("</style>", `:root { ${vars} }\n</style>`);
const pagina = path.join(tmp, "portada.html");
fs.writeFileSync(pagina, html);

// En la nube no hay Chrome instalado: se usa el que bajó HyperFrames (puppeteer) en ~/.cache
function chromeDePuppeteer() {
  const raiz = path.join(os.homedir(), ".cache", "puppeteer");
  const pila = [raiz];
  while (pila.length) {
    const d = pila.pop();
    let hijos = [];
    try { hijos = fs.readdirSync(d, { withFileTypes: true }); } catch { continue; }
    for (const h of hijos) {
      const p = path.join(d, h.name);
      if (h.isDirectory()) pila.push(p);
      else if (/^(chrome|chrome-headless-shell)(\.exe)?$/.test(h.name)) return p;
    }
  }
  return null;
}
const chrome = process.env.CHROME
  || ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((c) => fs.existsSync(c))
  || chromeDePuppeteer();
if (!chrome) throw new Error("no encontré Chrome: corré antes un snapshot de HyperFrames o poné CHROME=<ruta>");
const salida = path.join(dir, "portada.png");
execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--window-size=1080,1920", "--virtual-time-budget=3000", `--screenshot=${salida}`, url(pagina)], { stdio: "ignore" });
fs.rmSync(tmp, { recursive: true, force: true });
console.log("portada:", path.relative(process.cwd(), salida));
