import { seg7, seg7ancho } from "./pj.mjs";
export const ID = "s15-no-explota";
const w = seg7ancho("--:--", 120);
export const CSS = `
  $ .s15-tab { position: absolute; left: 70px; top: 660px; width: 420px; height: 110px; border-radius: 22px 22px 0 0; background: #ff2d2d; text-align: center; padding-top: 24px; box-sizing: border-box; font-family: "Black Ops One", sans-serif; font-size: 62px; color: #070807; white-space: nowrap; }
  $ .s15-cel { position: absolute; left: 600px; top: 620px; width: 380px; height: 190px; border-radius: 30px; background: #1f231d; border: 6px solid #ecebe4; text-align: center; padding-top: 34px; box-sizing: border-box; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; color: #ecebe4; white-space: nowrap; }
  $ .s15-cel span { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #ffb020; letter-spacing: 0.16em; }
  $ .s15-no { top: 900px; font-size: 104px; color: #5ce611; text-shadow: 0 0 40px rgba(92,230,17,0.35); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="sl s15-x1" d="M60 650 L500 780" stroke-width="16" />
          <path class="sl s15-x2" d="M590 610 L990 820" stroke-width="16" />
          <g class="s15-crono">
            <rect class="k" x="${540 - w / 2 - 50}" y="1050" width="${w + 100}" height="190" rx="20" style="stroke:#5ce611" />
            ${seg7("--:--", 540 - w / 2, 1085, 120, "#5ce611", "", 0.12)}
          </g>
          <path class="l s15-cr" d="M${540 - w / 2 - 50} 1145 C200 1150 120 1210 60 1300" style="stroke:#ff2d2d; stroke-width:14px" />
          <path class="l s15-ca" d="M${540 + w / 2 + 50} 1145 C880 1150 960 1210 1020 1300" style="stroke:#2f7bff; stroke-width:14px" />
        </svg>
        <div class="s15-tab">NO TOCAR</div>
        <div class="s15-cel"><span>LLAMAR A</span>Cuñado</div>
        <div class="txt ops s15-no">No explota.</div>
`;
export const JS = `
      const SIN2 = 1.55, CUNADO = 2.04, UN = 2.95, EXPLOTA = 4.14;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s15-tab"), { opacity: 0.3, y: 30 }, { opacity: 1, y: 0, duration: 0.25 }, 0);
      dibujar(".s15-x1", 0.6, 0.25);
      tl.to(q(".s15-tab"), { opacity: 0.35, duration: 0.2 }, 0.95);
      entra(".s15-cel", SIN2 - 0.2, 100, 0, 0.25);
      dibujar(".s15-x2", CUNADO, 0.25);
      tl.to(q(".s15-cel"), { opacity: 0.35, duration: 0.2 }, CUNADO + 0.35);
      // "un sistema a tu medida no explota": el cronómetro se apaga en verde y los cables se desenchufan
      pop(".s15-crono", UN - 0.1, 0.35);
      dibujar(".s15-cr", UN, 0.3);
      dibujar(".s15-ca", UN + 0.05, 0.3);
      tl.to(q(".s15-cr"), { x: -40, y: 60, opacity: 0.3, rotation: -8, duration: 0.4, ease: "power2.in" }, 3.7);
      tl.to(q(".s15-ca"), { x: 40, y: 60, opacity: 0.3, rotation: 8, duration: 0.4, ease: "power2.in" }, 3.75);
      golpe(".s15-no", EXPLOTA, 1.8);
      tl.fromTo(q(".s15-crono"), { opacity: 1 }, { opacity: 0.5, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, EXPLOTA + 0.2);
`;
export const SFX = [
  { t: 0.6, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.4, sfx: "pop", vol: 0.25 },
  { t: 2.04, sfx: "whoosh-short", vol: 0.25 },
  { t: 2.85, sfx: "chime", vol: 0.25 },
  { t: 4.1, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
];
