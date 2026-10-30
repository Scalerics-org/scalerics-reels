import { radio, nestor, celu } from "./pj.mjs";
export const ID = "s08-despierta";
const NOTIS = ["Hola!!", "¿Está?", "Quiero 3", "¿Envían?", "¿Y lo mío?", "Hola???", "¿Abren?", "Urgente", "¿Talle L?", "Gracias!!"];
export const CSS = `
  $ .s08-once { top: 600px; font-size: 92px; color: #ffb84d; text-shadow: 0 0 40px rgba(255,184,77,0.45); }
  $ .s08-n { position: absolute; padding: 10px 18px; background: #f4efe4; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; border-radius: 6px 20px 20px 20px; white-space: nowrap; box-shadow: 0 6px 18px rgba(0,0,0,0.5); }
  $ .s08-badge { position: absolute; left: 870px; top: 720px; width: 120px; height: 84px; border-radius: 42px; background: #ff2d2d; color: #f4efe4; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 84px; text-align: center; }
`;
export const HTML = `
        <div class="txt s08-once">¡Once en punto!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-r"><g transform="translate(130 760) scale(1)"><g class="s08-radio">${radio("s08", ["21:00", "22:13", "22:48", "23:00"])}</g></g></g>
          <g class="s08-nes"><g transform="translate(30 780) scale(1.0)">${nestor("s08", { ojos: "locos", boca: "grito", pijama: true })}
            <path d="M120 170 L100 120 M160 156 L156 104 M210 154 L224 104 M250 172 L280 130" stroke="#9aa3b8" stroke-width="10" stroke-linecap="round" /></g></g>
          <g class="s08-tel"><g transform="translate(640 760) scale(0.8)">${celu("s08", "", { brillo: "#ff2d2d" })}</g></g>
        </svg>
        ${NOTIS.map((t, i) => `<div class="s08-n s08-n${i}" style="left:${600 + (i % 3) * 40 - (i % 2) * 30}px; top:${1210 - i * 58}px">${t}</div>`).join("")}
        <div class="s08-badge">+99</div>
`;
export const JS = `
      const DESPERTE = 2.25, CON = 3.65, EXPLOTANDO = 4.15;
      tl.fromTo(ESC, { scale: 1.1 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      // el reloj rebobina de 21:00 a 23:00
      [[0.08, 1], [0.18, 2], [0.28, 3]].forEach(([t, i]) => { tl.set(q(".s08-h" + (i - 1)), { opacity: 0 }, t); tl.set(q(".s08-h" + i), { opacity: 1 }, t); });
      tl.fromTo(q(".s08-radio"), { rotation: -3, svgOrigin: "410 200" }, { rotation: 3, svgOrigin: "410 200", duration: 0.06, yoyo: true, repeat: 25, ease: "none", immediateRender: false }, 0.3);
      golpe(".s08-once", 0.35, 2.3);
      sacudon(0.36, 1.5);
      // se despierta igual: el radio se va arriba, aparece Néstor
      tl.to(q(".s08-r"), { opacity: 0, y: -200, duration: 0.3, ease: "power2.in" }, DESPERTE - 0.3);
      tl.to(q(".s08-once"), { opacity: 0, duration: 0.2 }, DESPERTE - 0.3);
      entra(".s08-nes", DESPERTE - 0.05, 0, 260, 0.3);
      sacudon(DESPERTE + 0.2, 1.1);
      hablar(".s08-boca", DESPERTE, DESPERTE + 0.6, 0.6);
      // el WhatsApp explota
      entra(".s08-tel", CON - 0.25, 200, 0, 0.3);
      qa(".s08-n").forEach((n, i) => pop(n, CON + 0.05 + i * 0.13, 0.18, { rotation: (i % 3 - 1) * 4 }));
      pop(".s08-badge", EXPLOTANDO, 0.25);
      tl.to(q(".s08-tel"), { x: 8, duration: 0.04, yoyo: true, repeat: 21, ease: "none" }, EXPLOTANDO);
      sacudon(EXPLOTANDO + 0.4, 0.8);
`;
export const SFX = [
  { t: 0.02, sfx: "glitch-1", vol: 0.3, max: 0.35 },
  { t: 0.33, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
  { t: 2.2, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 3.7, sfx: "notification", vol: 0.3 },
  { t: 3.95, sfx: "notification", vol: 0.3 },
  { t: 4.2, sfx: "notification", vol: 0.32 },
  { t: 4.45, sfx: "ping", vol: 0.3 },
  { t: 4.7, sfx: "notification", vol: 0.3 },
];
