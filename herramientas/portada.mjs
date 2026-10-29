// Arma reels/<slug>/portada.png (1080x1920) con reels/<slug>/portada.json:
//   { "t": 5.5, "chica": "Te voy a robar", "grande": "tus clientes", "sello": "Plan: el golpe",
//     "acento": "#f5c518", "sello_color": "#e5484d", "zoom": 1.12, "foco": "40%" }
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

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const url = (p) => "file:///" + p.replace(/\\/g, "/");
let html = fs.readFileSync(path.resolve("herramientas/portada.html"), "utf8")
  .replaceAll("__FUENTES__", url(path.join(dir, "assets", "fonts")))
  .replaceAll("__CUADRO__", url(cuadro))
  .replace("__SELLO__", esc(cfg.sello))
  .replace("__CHICA__", esc(cfg.chica))
  .replace("__GRANDE__", esc(cfg.grande));
const vars = [["--acento", cfg.acento], ["--sello", cfg.sello_color], ["--zoom", cfg.zoom], ["--foco", cfg.foco]]
  .filter(([, v]) => v != null).map(([k, v]) => `${k}: ${v};`).join(" ");
if (vars) html = html.replace("</style>", `:root { ${vars} }\n</style>`);
const pagina = path.join(tmp, "portada.html");
fs.writeFileSync(pagina, html);

const chrome = process.env.CHROME || ["/c/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe", "google-chrome", "chromium"].find((c) => !c.includes("/") || fs.existsSync(c));
const salida = path.join(dir, "portada.png");
execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--window-size=1080,1920", "--virtual-time-budget=3000", `--screenshot=${salida}`, url(pagina)], { stdio: "ignore" });
fs.rmSync(tmp, { recursive: true, force: true });
console.log("portada:", path.relative(process.cwd(), salida));
