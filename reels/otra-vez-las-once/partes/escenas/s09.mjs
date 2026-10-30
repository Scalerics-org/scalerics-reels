import { nestor } from "./pj.mjs";
import { nocheHTML, nocheJS } from "./noche.mjs";
export const ID = "s09-noche312";
let palitos = "";
for (let g = 0; g < 18; g++) {
  const x = 90 + (g % 6) * 150, y = 640 + Math.floor(g / 6) * 230;
  palitos += `<g class="s09-pal">` + [0, 1, 2, 3].map((k) => `<path d="M${x + k * 22} ${y} V${y + 90}" />`).join("") + `<path d="M${x - 12} ${y + 70} L${x + 80} ${y + 20}" /></g>`;
}
export const CSS = `
  $ .s09-pals path { fill: none; stroke: #f4efe4; stroke-width: 6; stroke-linecap: round; }
  $ .s09-q { position: absolute; padding: 12px 22px; background: #f4efe4; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; border-radius: 6px 24px 24px 24px; white-space: nowrap; box-shadow: 0 6px 18px rgba(0,0,0,0.5); }
  $ .s09-sabe { left: 690px; top: 700px; transform: rotate(6deg); border-color: #ffb84d; color: #ffb84d; background: rgba(5,11,24,0.85); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-pals" opacity="0.28">${palitos}</g>
          <g class="s09-nes"><g transform="translate(360 790) scale(1)">${nestor("s09", { ojos: "locos", boca: "abierta" })}
            <path d="M110 170 L84 112 M150 154 L140 92 M200 150 L212 90 M246 166 L280 116" stroke="#9aa3b8" stroke-width="10" stroke-linecap="round" /></g></g>
        </svg>
        ${nocheHTML("s09", 312, { escala: 1.15 })}
        <div class="sello s09-sabe">Ya me lo sé</div>
        <div class="s09-q s09-q0" style="left:70px; top:720px">¿Está listo lo mío?</div>
        <div class="s09-q s09-q1" style="left:620px; top:860px">¿Está listo lo mío?</div>
        <div class="s09-q s09-q2" style="left:40px; top:1010px">¿Está listo lo mío?</div>
        <div class="s09-q s09-q3" style="left:640px; top:1150px">¿Está listo lo mío?</div>
        <div class="s09-q s09-q4" style="left:110px; top:1240px">¿Está listo lo mío?</div>
`;
export const JS = `
      const YA = 1.09, CLIENTE = 3.09, ESTA = 3.29;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
${nocheJS("s09", "YA - 0.35")}
      gsap.set(q(".s09-nes"), { opacity: 0 });
      entra(".s09-nes", YA - 0.15, 0, 200, 0.3);
      dibujar(".s09-pals path", 0.3, 0.25);
      hablar(".s09-boca", YA, CLIENTE, 0.4);
      pop(".s09-sabe", YA + 0.5, 0.3);
      tl.to(q(".s09-sabe"), { opacity: 0, duration: 0.15 }, ESTA - 0.1);
      qa(".s09-q").forEach((b, i) => pop(b, ESTA + i * 0.22, 0.22, { rotation: i % 2 ? 3 : -3 }));
      tl.to(q(".s09-nes"), { rotation: 4, svgOrigin: "540 1100", duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut" }, ESTA);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.95, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.6, sfx: "pop", vol: 0.3 },
  { t: 3.3, sfx: "notification", vol: 0.28 },
  { t: 3.55, sfx: "notification", vol: 0.28 },
  { t: 3.75, sfx: "notification", vol: 0.28 },
  { t: 3.95, sfx: "notification", vol: 0.28 },
  { t: 4.2, sfx: "notification", vol: 0.28 },
];
