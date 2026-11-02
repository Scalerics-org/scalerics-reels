import { dueno } from "./pj.mjs";
export const ID = "s05-cunado";
export const CSS = `
  $ .s05-quien { top: 640px; font-size: 96px; color: #ecebe4; }
  $ .s05-quien span { color: #ffb020; }
  $ .s05-tabno { position: absolute; left: 340px; top: 820px; width: 400px; height: 90px; border-radius: 18px 18px 0 0; background: #ff2d2d; text-align: center; padding-top: 18px; font-family: "Black Ops One", sans-serif; font-size: 58px; color: #070807; white-space: nowrap; }
  $ .s05-pola { position: absolute; left: 520px; top: 640px; width: 420px; height: 500px; background: #ecebe4; padding: 26px 26px 0; box-shadow: 0 16px 40px rgba(0,0,0,0.6); }
  $ .s05-pola .foto { position: relative; width: 368px; height: 340px; background: #2a3a4a; overflow: hidden; }
  $ .s05-pola .pie { margin-top: 18px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; color: #070807; white-space: nowrap; }
  $ .s05-anio { position: absolute; left: 640px; top: 1080px; font-size: 60px; border-color: #ff2d2d; color: #ff2d2d; background: rgba(236,235,228,0.92); }
  $ .s05-espana { position: absolute; left: 600px; top: 1210px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 44px; letter-spacing: 0.16em; color: #ffb020; white-space: nowrap; }
`;
export const HTML = `
        <div class="txt ops s05-quien">¿Quién <span>armó</span> esa?</div>
        <div class="s05-tabno">NO TOCAR</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(10 800)"><g class="s05-due">${dueno("s05")}</g></g>
          <path class="yl s05-ruta" d="M760 1150 C860 1240 980 1180 1010 1060" stroke-dasharray="4 22" stroke-width="8" />
          <g class="s05-avion"><g transform="translate(1010 1050) rotate(-60)"><path class="w" d="M-40 0 L40 0 L60 -8 L40 -16 L-10 -16 L-30 -40 L-44 -40 L-30 -16 L-40 -16 Z" stroke-width="4" /></g></g>
        </svg>
        <div class="s05-pola">
          <div class="foto">
            <svg viewBox="0 0 368 340" style="width:368px;height:340px;left:0;top:0">
              <rect x="0" y="230" width="368" height="110" fill="#ffb020" opacity="0.5" />
              <path d="M70 340 C70 260 120 236 184 236 C248 236 298 260 298 340 Z" fill="#ff2d2d" stroke="#070807" stroke-width="5" />
              <ellipse cx="184" cy="150" rx="66" ry="78" fill="#ecebe4" stroke="#070807" stroke-width="5" />
              <path d="M118 128 C110 60 170 50 196 56 C230 64 262 90 250 130 C240 100 200 92 184 98 C160 88 130 100 118 128 Z" fill="#070807" />
              <path d="M136 140 H176 V162 C176 170 140 170 136 160 Z M192 140 H232 V160 C230 170 194 170 192 162 Z M176 146 H192" fill="#070807" stroke="#070807" stroke-width="4" />
              <path d="M156 196 C172 212 200 212 214 196" fill="none" stroke="#070807" stroke-width="6" stroke-linecap="round" />
              <path d="M262 262 L300 196" stroke="#070807" stroke-width="10" stroke-linecap="round" />
              <path d="M290 200 L312 184" stroke="#070807" stroke-width="16" stroke-linecap="round" />
            </svg>
          </div>
          <div class="pie">el cuñado</div>
        </div>
        <div class="sello s05-anio">2015</div>
        <div class="s05-espana">→ ESPAÑA</div>
`;
export const JS = `
      const QUIEN = 0.23, MI = 1.49, DOS = 2.79, QUINCE = 3.27, DESPUES = 3.92, ESPANA = 5.19;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "60% 60%" }, 0);
      golpe(".s05-quien", QUIEN, 1.8);
      pop(".s05-tabno", 0.0, 0.3);
      tl.to(q(".s05-tabno"), { rotation: 3, duration: 0.08, yoyo: true, repeat: 7, ease: "none" }, 0.3);
      tl.to(qa(".s05-quien, .s05-tabno"), { opacity: 0, y: -40, duration: 0.2 }, MI - 0.2);
      // el dueño confiesa
      entra(".s05-due", MI - 0.15, -200, 0, 0.3);
      hablar(".s05-due-boca", MI, 2.4, 0.3);
      hablar(".s05-due-boca", 2.59, 3.6, 0.3);
      hablar(".s05-due-boca", DESPUES, 5.7, 0.3);
      tl.to(q(".s05-due-cejas"), { y: -10, duration: 0.2 }, MI);
      // la polaroid del cuñado
      gsap.set(q(".s05-pola"), { opacity: 0 });
      tl.fromTo(q(".s05-pola"), { opacity: 0, rotation: -25, y: -200 }, { opacity: 1, rotation: 5, y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, MI + 0.1);
      golpe(".s05-anio", DOS, 2.4);
      tl.set(q(".s05-anio"), { rotation: -10 }, 0);
      sacudon(QUINCE, 0.6);
      // "se fue a vivir a España": el avioncito se va
      dibujar(".s05-ruta", DESPUES + 0.2, 1.0);
      tl.fromTo(q(".s05-avion"), { opacity: 0, x: -250, y: 100 }, { opacity: 1, x: 0, y: 0, duration: 1.0, ease: "power1.inOut", immediateRender: false }, DESPUES + 0.2);
      tl.to(q(".s05-avion"), { x: 120, y: -320, opacity: 0, duration: 0.6, ease: "power2.in" }, DESPUES + 1.3);
      gsap.set(q(".s05-avion"), { opacity: 0 });
      entra(".s05-espana", ESPANA, -60, 0, 0.3);
`;
export const SFX = [
  { t: 0.2, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
  { t: 1.55, sfx: "whoosh", vol: 0.25 },
  { t: 2.75, sfx: "impact-bass-2", vol: 0.38, max: 0.7 },
  { t: 4.1, sfx: "whoosh-cinematic", vol: 0.25, max: 1.4 },
  { t: 5.2, sfx: "pop", vol: 0.25 },
];
