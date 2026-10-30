import { pillo, cuaderno } from "./pj.mjs";
export const ID = "s04-facil";
export const CSS = `
  $ .s04-facil { top: 615px; font-size: 140px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(70 760) scale(1.05)"><g class="s04-pj">${pillo("s04", { boca: "sonrisa" })}
            <path class="s04-brazo" d="M290 450 C350 430 410 400 450 360" fill="none" stroke="#efe9ff" stroke-width="52" stroke-linecap="round" /><path d="M290 450 C350 430 410 400 450 360" fill="none" stroke="#9b5cff" stroke-width="38" stroke-linecap="round" /><circle class="cara" cx="456" cy="354" r="22" />
          </g></g>
          <g transform="translate(560 900) scale(0.98)"><g class="s04-cuad">${cuaderno("s04")}
            <text x="230" y="350" text-anchor="middle" class="mono" font-size="30" letter-spacing="5" fill="#ff2d3d">DEL DUEÑO</text></g></g>
        </svg>
        <div class="txt uv s04-facil">¡Fácil!</div>
        <div class="etiqueta s04-et">Pista 1 · el cuaderno</div>
`;
export const JS = `
      tl.fromTo(q(".s04-facil"), { opacity: 0.6, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      tl.fromTo(q(".s04-pj"), { opacity: 0.5, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s04-pillo-cejas"), { y: -10, duration: 0.12, yoyo: true, repeat: 3 }, 0.1);
      tl.to(q(".s04-pj"), { rotation: -3, svgOrigin: "180 540", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.9);
      gsap.set(q(".s04-cuad"), { opacity: 0 });
      tl.fromTo(q(".s04-cuad"), { opacity: 0, y: -200, rotation: -20, svgOrigin: "230 160" }, { opacity: 1, y: 0, rotation: -6, svgOrigin: "230 160", duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, 1.35);
      dibujar(".s04-garabato", 1.6, 0.5);
      entra(".s04-et", 1.5, 0, 20);
`;
export const SFX = [
  { t: 0.0, sfx: "pop", vol: 0.35 },
  { t: 1.35, sfx: "whoosh", vol: 0.3 },
  { t: 1.7, sfx: "click-soft", vol: 0.3 },
];
