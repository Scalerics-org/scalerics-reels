// abren-hoy-completo: parte 1 + cartel "Un agente de IA más tarde…" + parte 2, en un solo reel.
//   node armar.mjs        → mezcla del cartel (assets/audio/cartel.wav) e index.html del cartel (3,2 s)
//   (render del cartel)   → npx --yes hyperframes@0.8.206 render --workers 2 -o renders/cartel.mp4
//   node armar.mjs unir   → pega partes/parte1.mp4 (abren-hoy sin la línea chica: SINCIERRE=1) + renders/cartel.mp4
//                           + partes/parte2.mp4 (abren-hoy-2) y hace el paso 10 → renders/abren-hoy-completo-final.mp4
// El cartel entra con el último cuadro de la parte 1 girando y sale con un iris al primer cuadro de la parte 2
// (assets/img/fin-parte1.png e inicio-parte2.png), así los cortes no se notan.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const DUR = 3.2;
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args]);

if (process.argv[2] === "unir") {
  const P = ["partes/parte1.mp4", "renders/cartel.mp4", "partes/parte2.mp4"];
  const ins = P.flatMap((p) => ["-i", p]);
  const norm = P.map((_, i) => `[${i}:v]fps=30,format=yuv420p,setsar=1[v${i}];[${i}:a]aresample=48000,aformat=channel_layouts=stereo[a${i}]`).join(";");
  ff([...ins, "-filter_complex", `${norm};[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]`, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "12", "-preset", "medium", "-c:a", "pcm_s16le", "renders/abren-hoy-completo.mkv"]);
  // paso 10 (con el limitador después del loudnorm: sin él, el AAC clipeaba en las partes)
  ff(["-i", "renders/abren-hoy-completo.mkv", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-tune", "animation", "-profile:v", "high", "-pix_fmt", "yuv420p", "-g", "60", "-maxrate", "14M", "-bufsize", "28M", "-movflags", "+faststart",
    "-af", "loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.66:level=false:attack=1:release=40", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "renders/abren-hoy-completo-final.mp4"]);
  ff(["-i", "renders/abren-hoy-completo-final.mp4", "-vf", "fps=1/1.5,scale=240:-1,tile=7x3", "-frames:v", "1", "renders/hoja.png"]);
  console.log("listo: renders/abren-hoy-completo-final.mp4 y renders/hoja.png");
  process.exit(0);
}

// ---------- mezcla del cartel ----------
// [archivo, inicio, dB]
const SONIDO = [
  ["sfx/whoosh.mp3", 0.0, -8],          // el giro de la parte 1 que se va
  ["sfx/stinger.wav", 0.05, -14],        // vibráfono de cambio de escena (CC0, ver fuentes.md)
  ["voice/narrador.wav", 0.42, 0],      // Gemini Rasalgethi: "Un agente de IA más tarde."
  ["sfx/whoosh-short.mp3", 2.74, -5],   // el iris que abre la parte 2
];
fs.mkdirSync("assets/audio", { recursive: true });
{
  const args = [];
  const f = [];
  SONIDO.forEach(([a, t, db], i) => { args.push("-i", `assets/${a}`); f.push(`[${i}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${db}dB,adelay=${Math.round(t * 1000)}|${Math.round(t * 1000)},apad=whole_dur=${DUR}[a${i}]`); });
  f.push(`${SONIDO.map((_, i) => `[a${i}]`).join("")}amix=inputs=${SONIDO.length}:normalize=0,atrim=duration=${DUR}[m]`);
  ff([...args, "-filter_complex", f.join(";"), "-map", "[m]", "-ar", "48000", "-c:a", "pcm_s16le", "assets/audio/cartel-cruda.wav"]);
  // al nivel de las partes (sus mezclas salen a -14 LUFS con limitador a -4,4 dBFS)
  ff(["-i", "assets/audio/cartel-cruda.wav", "-af", "loudnorm=I=-14:TP=-3:LRA=11,alimiter=limit=0.6:level=false", "-ar", "48000", "assets/audio/cartel.wav"]);
}

// ---------- index del cartel ----------
fs.writeFileSync("index.html", `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #5ce611; }
      #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #5ce611; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
      <div id="el-cartel" class="scene" data-composition-id="cartel" data-composition-src="compositions/cartel.html" data-start="0" data-duration="${DUR}" data-track-index="1" data-track-kind="graphics"></div>
      <audio id="mezcla" src="assets/audio/cartel.wav" data-start="0" data-duration="${DUR}" data-track-index="30" data-volume="1"></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.to("#root", { opacity: 1, duration: ${DUR} }, 0);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log("cartel listo: assets/audio/cartel.wav + index.html (" + DUR + " s)");
