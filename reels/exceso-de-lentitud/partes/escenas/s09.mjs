import { dueno, celular } from "./pj.mjs";
export const ID = "s09-mostrador";
const sil = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="b" d="M24 540 C24 404 92 362 180 362 C268 362 336 404 336 540 Z" /><ellipse class="b" cx="180" cy="252" rx="80" ry="96" /></g>`;
export const CSS = `
  $ .s09-badge { position: absolute; left: 905px; top: 740px; width: 76px; height: 76px; border-radius: 50%; background: #ff3b4a; border: 5px solid #efeadf; color: #efeadf; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 36px; line-height: 66px; text-align: center; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-cola">${sil(-60, 760, 0.85)}${sil(60, 820, 0.75)}</g>
          <g transform="translate(330 660) scale(1.0)"><g class="s09-pj">${dueno("s09", { b: "abierta" })}</g></g>
          <g class="s09-most">
            <rect class="m" x="160" y="1110" width="760" height="260" rx="8" />
            <path class="d" d="M160 1170 H920" stroke-width="5" opacity="0.4" />
            <text x="540" y="1270" text-anchor="middle" class="slex" font-size="54" fill="#0b1020">MOSTRADOR</text>
          </g>
          <g transform="translate(760 760) rotate(10) scale(0.6)"><g class="s09-cel">${celular("s09", { pantalla: "#efeadf" })}
            <rect x="40" y="90" width="220" height="60" rx="16" fill="#0b1020" /><rect class="s09-n1" x="40" y="170" width="220" height="60" rx="16" fill="#0b1020" />
            <rect class="s09-n2" x="40" y="250" width="220" height="60" rx="16" fill="#0b1020" /><rect class="s09-n3" x="40" y="330" width="220" height="60" rx="16" fill="#0b1020" />
          </g></g>
        </svg>
        <div class="s09-badge"><span class="s09-num">9</span></div>
        <div class="etiqueta s09-et">Un solo conductor</div>
`;
export const JS = `
      tl.fromTo(q(".s09-pj"), { y: 30, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s09-dueno-boca", 0.0, 1.4, 0.4);
      hablar(".s09-dueno-boca", 2.2, 4.6, 0.4);
      tl.to(q(".s09-dueno-cejas"), { y: -10, duration: 0.15 }, 0.1);
      // "atendiendo el local": la cola de clientes
      entra(".s09-cola", 0.3, -200, 0, 0.35);
      pop(".s09-et", 0.4);
      // "mostrador"
      tl.to(q(".s09-most"), { y: -14, duration: 0.12, yoyo: true, repeat: 1 }, 2.9);
      // "WhatsApp": el celular vibra y se llena
      gsap.set(qa(".s09-cel, .s09-n1, .s09-n2, .s09-n3, .s09-badge"), { opacity: 0 });
      pop(".s09-cel", 3.5, 0.3, { transformOrigin: "50% 50%" });
      tl.to(q(".s09-n1"), { opacity: 1, duration: 0.1 }, 3.7);
      tl.to(q(".s09-n2"), { opacity: 1, duration: 0.1 }, 3.9);
      tl.to(q(".s09-n3"), { opacity: 1, duration: 0.1 }, 4.1);
      pop(".s09-badge", 3.8, 0.3);
      tl.to(q(".s09-cel"), { rotation: 6, svgOrigin: "150 280", duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, 3.7);
      // "al mismo tiempo": el dueño mira a un lado y al otro
      tl.to(q(".s09-pj"), { x: -40, duration: 0.18, yoyo: true, repeat: 3, ease: "power1.inOut" }, 4.1);
      tl.to(qa(".s09-gota"), { opacity: 0.85, duration: 0.15 }, 4.1);
      tl.to(qa(".s09-gota"), { y: 34, duration: 0.8, ease: "power1.in" }, 4.2);
      tl.to(q(".s09-cola"), { x: 30, duration: 1.2, ease: "none" }, 3.0);
`;
export const SFX = [
  { t: 0.3, sfx: "whoosh-short", vol: 0.2 },
  { t: 3.5, sfx: "notification", vol: 0.3 },
  { t: 3.9, sfx: "notification", vol: 0.25 },
  { t: 4.2, sfx: "notification", vol: 0.25 },
  { t: 4.3, sfx: "glitch-1", vol: 0.15, max: 0.3 },
];
