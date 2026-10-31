import { dueno, rayas, placa } from "./pj.mjs";
export const ID = "s13-culpable";
export const CSS = `
  $ .s13-vago { position: absolute; left: 540px; top: 650px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 140px; line-height: 1; color: #efeadf; letter-spacing: -0.02em; }
  $ .s13-sello { left: 520px; top: 880px; font-size: 60px; background: rgba(17, 24, 21, 0.9); }
  $ .s13-nota { position: absolute; left: 560px; top: 1030px; font-family: "Caveat", cursive; font-weight: 700; font-size: 66px; line-height: 0.95; color: #ffd23f; transform: rotate(-4deg); white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(70 690)"><g class="s13-ficha">
            ${rayas("s13", { w: 420, h: 640 })}
            <g transform="translate(48 160) scale(0.9)">${dueno("s13", { b: "mueca" })}</g>
            <g transform="translate(60 470)">${placa("s13", ["EL DUEÑO", "SÁB 21:14"], { w: 300 })}</g>
          </g></g>
          <path class="rl s13-tacha" d="M520 780 L1010 650" stroke-width="16" />
        </svg>
        <div class="s13-vago">VAGO</div>
        <div class="sello s13-sello">Culpable</div>
        <div class="s13-nota">de querer hacer<br>todo solo</div>
        <div class="etiqueta s13-et">El veredicto</div>
`;
export const JS = `
      tl.fromTo(q(".s13-ficha"), { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      // flash de la foto de ficha
      tl.fromTo(q(".s13-ficha"), { filter: "brightness(2)" }, { filter: "brightness(1)", duration: 0.35, immediateRender: false }, 0.1);
      pop(".s13-et", 0.3);
      // "No sos un vago": aparece VAGO y se tacha
      pop(".s13-vago", 0.9, 0.3);
      dibujar(".s13-tacha", 1.4, 0.25);
      tl.to(q(".s13-vago"), { opacity: 0.4, duration: 0.3 }, 1.7);
      // "culpable"
      golpe(".s13-sello", 2.3, 2.4);
      tl.set(q(".s13-sello"), { rotation: -8 }, 0);
      sacudon(2.32, 1);
      // "de querer hacer todo solo"
      gsap.set(q(".s13-nota"), { opacity: 0 });
      tl.fromTo(q(".s13-nota"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, 2.85);
      tl.to(q(".s13-nota"), { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1 }, 3.6);
`;
export const SFX = [
  { t: 0.1, sfx: "click", vol: 0.35 },
  { t: 1.4, sfx: "whoosh-short", vol: 0.25 },
  { t: 2.28, sfx: "impact-bass-1", vol: 0.45, max: 0.7 },
  { t: 2.85, sfx: "typing", vol: 0.12, max: 0.6 },
];
