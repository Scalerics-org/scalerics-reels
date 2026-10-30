import { celular } from "./pj.mjs";
export const ID = "s14-a-medida";
const ROWS = [["Stock", 2.84], ["Pedidos", 3.53], ["Proveedores", 4.25], ["Caja", 5.13], ["Local 1 + Local 2", 5.79]];
export const CSS = `
  $ .s14-tit { position: absolute; left: 380px; top: 690px; width: 320px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: #efe9ff; white-space: nowrap; }
  $ .s14-tag { position: absolute; left: 380px; top: 744px; padding: 6px 14px; border-radius: 8px; background: #5ce611; color: #0c0718; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.14em; white-space: nowrap; }
  $ .s14-row { position: absolute; left: 380px; width: 320px; height: 72px; border-radius: 16px; border: 4px solid #5ce611; background: rgba(92, 230, 17, 0.12); font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #efe9ff; line-height: 64px; padding-left: 64px; white-space: nowrap; box-sizing: border-box; }
  $ .s14-row::before { content: ""; position: absolute; left: 20px; top: 20px; width: 24px; height: 24px; border-radius: 50%; background: #5ce611; }
  $ .s14-medida { position: absolute; left: 700px; top: 650px; padding: 14px 22px; background: #ff4fd8; color: #0c0718; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 36px; text-transform: uppercase; white-space: nowrap; transform: rotate(6deg); line-height: 1.05; }
  $ .s14-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1250px; font-size: 46px; color: #0c0718; background: #5ce611; border-color: #5ce611; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-cel"><g transform="translate(350 610)">${celular("s14")}</g></g>
          <g class="s14-cinta">
            <path class="cl s14-cm" d="M300 630 V1320" stroke-width="16" />
            ${Array.from({ length: 24 }, (_, i) => `<path class="cl s14-tick" d="M300 ${650 + i * 28} H${i % 4 ? 322 : 340}" stroke-width="4" />`).join("")}
          </g>
          <rect class="sl s14-marco" x="364" y="826" width="352" height="438" rx="22" stroke-width="6" />
        </svg>
        <div class="s14-tit">Tu sistema</div>
        <div class="s14-tag">A MEDIDA</div>
        ${ROWS.map(([t], i) => `<div class="s14-row s14-r${i}" style="top: ${836 + i * 84}px; ${i === 4 ? "font-size: 26px;" : ""}">${t}</div>`).join("")}
        <div class="s14-medida">Como<br/>trabajás vos</div>
        <div class="sello s14-sello">Todo en un solo lugar</div>
`;
export const JS = `
      tl.fromTo(q(".s14-cel"), { opacity: 0.5, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      entra(".s14-tit", 0.2, 0, 20);
      // "a medida": la cinta métrica mide el celular
      dibujar(".s14-cm", 0.7, 0.4);
      qa(".s14-tick").forEach((t, i) => dibujar(t, 0.75 + i * 0.015, 0.1));
      pop(".s14-tag", 0.8);
      pop(".s14-medida", 1.5);
      tl.to(q(".s14-medida"), { y: -8, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.9);
      ${JSON.stringify(ROWS)}.forEach(([, t], i) => entra(".s14-r" + i, t - 0.05, 80, 0, 0.3));
      // "en un solo lugar"
      dibujar(".s14-marco", 6.6, 0.5);
      golpe(".s14-sello", 6.75, 2);
      tl.set(q(".s14-sello"), { rotation: -3 }, 0);
      tl.to(qa(".s14-row"), { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.04 }, 7.1);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh", vol: 0.3 },
  { t: 0.75, sfx: "sparkle", vol: 0.25 },
  { t: 1.5, sfx: "pop", vol: 0.3 },
  { t: 2.8, sfx: "click", vol: 0.3 },
  { t: 3.48, sfx: "click", vol: 0.3 },
  { t: 4.2, sfx: "click", vol: 0.3 },
  { t: 5.08, sfx: "click", vol: 0.3 },
  { t: 5.74, sfx: "click", vol: 0.3 },
  { t: 6.95, sfx: "chime", vol: 0.3 },
];
