import { radio } from "./pj.mjs";
import { nocheHTML, nocheJS } from "./noche.mjs";
export const ID = "s05-noche2";
const CLI = ["Gabi", "Walter", "Sole", "Cacho"];
export const CSS = `
  $ .s05-once { top: 1220px; font-size: 104px; color: #ffb84d; text-shadow: 0 0 40px rgba(255,184,77,0.45); }
  $ .s05-fila { position: absolute; left: 150px; width: 780px; height: 92px; border: 5px solid #f4efe4; border-radius: 18px; background: #0f2347; }
  $ .s05-nom { position: absolute; left: 26px; top: 22px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; color: #f4efe4; }
  $ .s05-msg { position: absolute; left: 250px; top: 16px; padding: 10px 18px; background: #f4efe4; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; border-radius: 20px 6px 20px 20px; white-space: nowrap; }
  $ .s05-tilde { position: absolute; right: 22px; top: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; color: #7fb4ff; }
  $ .s05-turno { position: absolute; padding: 10px 18px; background: #ffb84d; color: #050b18; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.04em; border-radius: 10px; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(212 760) scale(0.8)"><g class="s05-radio">${radio("s05", ["23:00"])}</g></g>
        </svg>
        <div class="txt s05-once">¡Once en punto!</div>
        ${nocheHTML("s05", 2)}
        ${CLI.map((c, i) => `<div class="s05-fila s05-f${i}" style="top:${720 + i * 128}px"><div class="s05-nom">${c}</div><div class="s05-msg">Tu pedido está listo</div><div class="s05-tilde">✓✓</div></div>`).join("")}
        ${CLI.map((c, i) => `<div class="s05-turno s05-t${i}" style="left:400px; top:${738 + i * 128}px">Turno mañana 10:00</div>`).join("")}
`;
export const JS = `
      const NOCHE = 1.43, AVISO = 2.45, RECUERDO = 4.93;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      // el despertador otra vez
      tl.fromTo(q(".s05-radio"), { rotation: -3, svgOrigin: "410 200" }, { rotation: 3, svgOrigin: "410 200", duration: 0.06, yoyo: true, repeat: 13, ease: "none", immediateRender: false }, 0);
      golpe(".s05-once", 0.08, 2.2);
      sacudon(0.06, 1.2);
      tl.to([q(".s05-radio"), q(".s05-once")], { opacity: 0, duration: 0.15 }, NOCHE - 0.18);
${nocheJS("s05", "AVISO - 0.35", { t0: "NOCHE" })}
      // aviso uno por uno
      const T = [AVISO - 0.05, 2.95, 3.4, 3.9];
      T.forEach((t, i) => {
        entra(".s05-f" + i, t, 0, 60, 0.22);
        pop(q(".s05-f" + i + " .s05-msg"), t + 0.15, 0.2);
        pop(q(".s05-f" + i + " .s05-tilde"), t + 0.3, 0.15);
      });
      // recuerdo cada turno: un post-it de turno sobre cada fila
      [RECUERDO, 5.1, 5.3, 5.5].forEach((t, i) => {
        tl.to([q(".s05-f" + i + " .s05-msg"), q(".s05-f" + i + " .s05-tilde")], { opacity: 0, duration: 0.08 }, t - 0.08);
        pop(".s05-t" + i, t, 0.2, { rotation: i % 2 ? 2 : -2 });
      });
`;
export const SFX = [
  { t: 0.02, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
  { t: 0.05, sfx: "glitch-1", vol: 0.28, max: 0.4 },
  { t: 1.43, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
  { t: 2.55, sfx: "click-soft", vol: 0.35 },
  { t: 3.05, sfx: "click-soft", vol: 0.35 },
  { t: 3.5, sfx: "click-soft", vol: 0.35 },
  { t: 4.0, sfx: "click-soft", vol: 0.35 },
  { t: 4.93, sfx: "pop", vol: 0.3 },
];
