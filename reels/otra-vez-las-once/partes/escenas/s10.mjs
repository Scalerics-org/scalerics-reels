import { nestor } from "./pj.mjs";
export const ID = "s10-entendi";
export const CSS = `
  $ .s10-mas { top: 1240px; font-size: 84px; }
  $ .s10-no { left: 600px; top: 640px; transform: rotate(8deg); }
  $ .s10-dentro { position: absolute; left: 0; right: 0; top: 920px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #f4efe4; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-luz">
            <path class="y" d="M540 600 C600 600 640 640 640 690 C640 730 610 750 600 780 L480 780 C470 750 440 730 440 690 C440 640 480 600 540 600 Z" stroke-width="6" />
            <path class="l" d="M490 800 H590 M500 822 H580" stroke-width="6" />
            <path class="yl s10-rayo" d="M540 560 V530 M630 590 L655 565 M450 590 L425 565 M680 680 H715 M400 680 H365" stroke-width="6" />
          </g>
          <g class="s10-nes"><g transform="translate(360 830) scale(0.9)">${nestor("s10", { ojos: "normal", boca: "abierta" })}</g></g>
          <g class="s10-bucle">
            <path class="rl s10-aro" d="M540 720 A 240 240 0 1 1 300 960" stroke-width="12" />
            <path class="r" d="M272 920 L300 990 L340 930 Z" stroke-width="4" />
          </g>
        </svg>
        <div class="s10-dentro">+ HORAS</div>
        <div class="sello s10-no">No se rompe</div>
        <div class="txt s10-mas">Trabajando más</div>
`;
export const JS = `
      const ENTENDI = 0.4, BUCLE = 1.3, NO = 1.8, TRAB = 2.3, MAS = 3.0;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s10-nes"), { opacity: 0.5, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s10-luz", ENTENDI, 0.3, { svgOrigin: "540 700" });
      tl.fromTo(q(".s10-rayo"), { opacity: 0.3 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, ENTENDI + 0.3);
      hablar(".s10-boca", 0, 1.0, 0.5);
      // el bucle
      tl.to([q(".s10-nes"), q(".s10-luz")], { opacity: 0, scale: 0.6, svgOrigin: "540 1000", duration: 0.25, ease: "power2.in" }, BUCLE - 0.3);
      gsap.set(q(".s10-bucle"), { opacity: 0 });
      tl.set(q(".s10-bucle"), { opacity: 1 }, BUCLE - 0.05);
      dibujar(".s10-aro", BUCLE - 0.05, 0.4);
      tl.fromTo(q(".s10-bucle"), { rotation: 0 }, { rotation: 900, svgOrigin: "540 960", duration: DUR - BUCLE, ease: "power2.in", immediateRender: false }, BUCLE);
      pop(".s10-dentro", BUCLE + 0.2, 0.25);
      pop(".s10-no", NO, 0.25);
      golpe(".s10-mas", TRAB + 0.05, 2);
      sacudon(MAS, 1);
`;
export const SFX = [
  { t: 0.4, sfx: "sparkle", vol: 0.3, max: 1.0 },
  { t: 1.3, sfx: "riser", vol: 0.25, max: 2.4 },
  { t: 1.8, sfx: "pop", vol: 0.3 },
  { t: 2.3, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
];
