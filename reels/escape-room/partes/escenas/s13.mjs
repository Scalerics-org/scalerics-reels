import { pillo, joven, encargada, dueno, cuaderno, hoja } from "./pj.mjs";
export const ID = "s13-luz";
export const CSS = `
  $ .s13-et { color: #5ce611; }
  $ .s13-ok { position: absolute; top: 905px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.2em; color: #5ce611; white-space: nowrap; }
`;
const X = [40, 290, 540, 790];
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-enredo">
            <path class="rl fino s13-hilo" d="M200 860 C260 960 360 900 420 1000 C470 1080 600 900 660 1010" stroke-width="5" stroke-dasharray="12 10" />
            <path class="rl fino s13-hilo" d="M540 840 C480 950 300 940 250 1010 M540 840 C640 940 820 930 880 1010" stroke-width="5" stroke-dasharray="12 10" />
            <path class="rl fino s13-hilo" d="M880 860 C820 960 700 900 640 1000 C580 1080 300 920 160 1020" stroke-width="5" stroke-dasharray="12 10" />
          </g>
          <g transform="translate(70 660) scale(0.5)"><g class="s13-i s13-i1">${cuaderno("s13")}</g></g>
          <g class="s13-i s13-i2">
            <g transform="translate(410 640) rotate(-8 50 70) scale(0.36)">${hoja("s13a", 1, "FINAL", "48")}</g>
            <g transform="translate(470 650) scale(0.36)">${hoja("s13b", 1, "FINAL 2", "112")}</g>
            <g transform="translate(530 640) rotate(8 50 70) scale(0.36)">${hoja("s13c", 1, "AHORA SÍ", "7")}</g>
          </g>
          <g transform="translate(800 640)"><g class="s13-i s13-i3">
            <path class="g" d="M40 200 C10 140 20 40 100 20 C170 4 220 50 220 110 C220 140 240 160 230 170 L210 178 C214 200 200 214 180 212 L170 240 H60 Z" />
            <path class="rl s13-nudo" d="M90 80 C110 50 160 60 150 100 C140 140 90 120 110 90 C130 70 170 100 140 120" stroke-width="5" />
          </g></g>
          ${[pillo("s13"), joven("s13"), encargada("s13"), dueno("s13")].map((p, i) => `<g transform="translate(${X[i]} 990) scale(0.6)"><g class="s13-pj">${p}</g></g>`).join("")}
          ${X.map((x) => `<g transform="translate(${x + 168} 975)"><g class="s13-check"><circle class="s" cx="0" cy="0" r="30" stroke-width="5" /><path class="d" d="M-13 0 L-3 11 L14 -10" stroke-width="7" /></g></g>`).join("")}
        </svg>
        <div class="etiqueta s13-et">Todo desparramado</div>
`;
export const JS = `
      // se prende la luz: todos encandilados
      tl.fromTo(qa(".s13-pj"), { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.05 }, 0);
      parpadeo(".s13-pj [class*=ojos]", 0.3);
      // "no es tu gente": checks verdes
      qa(".s13-check").forEach((c, i) => pop(c, 0.85 + i * 0.08, 0.3));
      // "un cuaderno, tres planillas y la cabeza del dueño"
      pop(".s13-i1", 2.65);
      pop(".s13-i2", 3.45);
      pop(".s13-i3", 4.35);
      dibujar(".s13-nudo", 4.5, 0.6);
      dibujar(".s13-hilo", 2.8, 2.2);
      tl.to(q(".s13-enredo"), { x: 6, duration: 0.08, yoyo: true, repeat: 7 }, 5.0);
      entra(".s13-et", 2.7, 0, 20);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.35, max: 0.6 },
  { t: 0.05, sfx: "sparkle", vol: 0.3 },
  { t: 0.85, sfx: "chime", vol: 0.25 },
  { t: 2.65, sfx: "pop", vol: 0.3 },
  { t: 3.45, sfx: "pop", vol: 0.3 },
  { t: 4.35, sfx: "pop", vol: 0.3 },
];
