import { radio } from "./pj.mjs";
export const ID = "s14-cta";
const HORAS = ["21:30", "22:15", "23:00", "00:40", "01:10", "23:00", "22:45", "00:15"];
export const CSS = `
  $ .s14-cont { top: 600px; font-size: 70px; line-height: 1.08; white-space: normal; }
  $ .s14-q { top: 1110px; font-size: 76px; line-height: 1.08; color: #ffb84d; white-space: normal; }
  $ .s14-com { position: absolute; left: 140px; top: 1320px; width: 800px; height: 92px; border: 5px solid #f4efe4; border-radius: 46px; background: #0f2347; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; line-height: 82px; color: #f4efe4; padding-left: 36px; }
  $ .s14-cur { display: inline-block; width: 4px; height: 40px; background: #ffb84d; vertical-align: -6px; margin-left: 4px; }
`;
export const HTML = `
        <div class="txt s14-cont">Contanos en<br/>los comentarios</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(253 790) scale(0.7)"><g class="s14-radio">${radio("s14", HORAS)}</g></g>
        </svg>
        <div class="txt s14-q">¿A qué hora<br/>terminás vos?</div>
        <div class="s14-com">Yo a las ...<span class="s14-cur"></span></div>
`;
export const JS = `
      const COMENT = 0.7, QUE = 1.92, VOS = 2.8;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s14-cont"), { opacity: 0.3, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      tl.fromTo(q(".s14-radio"), { opacity: 0.4, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      // la hora va cambiando: la de cada uno
      const N = ${HORAS.length};
      for (let k = 1; k < 16; k++) {
        const t = 0.5 + k * 0.38;
        tl.set(q(".s14-h" + ((k - 1) % N)), { opacity: 0 }, t);
        tl.set(q(".s14-h" + (k % N)), { opacity: 1 }, t);
      }
      golpe(".s14-q", QUE, 1.8);
      sacudon(VOS, 0.7);
      entra(".s14-com", VOS + 0.2, 0, 60, 0.3);
      tl.to(q(".s14-cur"), { opacity: 0, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, VOS + 0.5);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 1.9, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
  { t: 3.0, sfx: "pop", vol: 0.3 },
  { t: 3.5, sfx: "typing", vol: 0.25, max: 0.8 },
];
