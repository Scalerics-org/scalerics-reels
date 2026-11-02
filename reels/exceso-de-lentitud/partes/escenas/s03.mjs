import { radar, dig } from "./pj.mjs";
export const ID = "s03-radar";
export const CSS = `
  $ .s03-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1180px; font-size: 62px; background: rgba(11, 16, 32, 0.9); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(200 620) scale(1.45)"><g class="s03-radar">${radar("s03")}</g></g>
          <g class="s03-panel">
            <rect x="150" y="960" width="780" height="200" rx="18" fill="#05080f" stroke="#efeadf" stroke-width="6" />
            <text x="190" y="1040" class="mono" font-size="34" letter-spacing="4" fill="#9aa3b8">EN VISTO</text>
            <text x="190" y="1090" class="mono" font-size="34" letter-spacing="4" fill="#9aa3b8">HACE</text>
            <g class="s03-hs">${dig(520, 990, 80, 140, 16, "#ff3b4a")}${dig(620, 990, 80, 140, 16, "#ff3b4a")}</g>
            <text x="730" y="1124" class="slex" font-size="64" fill="#ff3b4a">HS</text>
          </g>
        </svg>
        <div class="sello s03-sello">Exceso de lentitud</div>
        <div class="etiqueta s03-et">Radar de respuestas</div>
`;
export const JS = `
      tl.fromTo(q(".s03-radar"), { opacity: 0.6, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      pop(".s03-et", 0.3);
      // el radar mide la velocidad del dueño: 000
      reloj("s03-rd", (t) => (t < 1.4 ? (Math.floor(t * 6) % 2 ? "---" : "   ") : "000"));
      // "radar": el radar se levanta y el led titila
      tl.to(q(".s03-radar"), { rotation: -6, svgOrigin: "120 300", duration: 0.25, yoyo: true, repeat: 1 }, 1.4);
      tl.fromTo(q(".s03-led"), { opacity: 1 }, { opacity: 0.2, duration: 0.15, yoyo: true, repeat: 11, immediateRender: false }, 1.5);
      // "visto hace dos días": el panel, y las horas suben a 48
      entra(".s03-panel", 2.35, 0, 80, 0.3);
      reloj("s03-hs", (t) => (t < 2.9 ? "00" : t < 3.5 ? String(Math.min(48, Math.floor((t - 2.9) / 0.6 * 48))).padStart(2, "0") : "48"));
      tl.to(q(".s03-panel"), { scale: 1.05, svgOrigin: "540 1060", duration: 0.15, yoyo: true, repeat: 1 }, 3.5);
      // "Exceso de lentitud": sello
      golpe(".s03-sello", 4.03, 2.4);
      tl.set(q(".s03-sello"), { rotation: -5 }, 0);
      sacudon(4.05, 1);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.45, sfx: "beep", vol: 0.25, max: 0.4 },
  { t: 1.75, sfx: "beep", vol: 0.25, max: 0.4 },
  { t: 2.9, sfx: "key-press", vol: 0.3, max: 0.6 },
  { t: 4.0, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
  { t: 4.02, sfx: "click", vol: 0.3 },
];
