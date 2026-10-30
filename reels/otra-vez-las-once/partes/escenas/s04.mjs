import { celu } from "./pj.mjs";
import { nocheHTML, nocheJS } from "./noche.mjs";
export const ID = "s04-noche1";
const filas = 6;
let celdas = "";
for (let r = 0; r < filas; r++) celdas += `<rect class="s04-cel" x="640" y="${840 + r * 62}" width="320" height="62" fill="#ffb84d" opacity="0" />`;
export const CSS = `
  $ .s04-uno { top: 600px; font-size: 92px; }
  $ .s04-uno span { display: inline-block; margin: 0 14px; opacity: 0; }
  $ .s04-msg { position: absolute; left: 96px; padding: 10px 18px; background: #f4efe4; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; border-radius: 6px 20px 20px 20px; white-space: nowrap; }
  $ .s04-vuela { position: absolute; left: 96px; top: 830px; padding: 10px 18px; background: #ffb84d; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; border-radius: 6px 20px 20px 20px; white-space: nowrap; }
  $ .s04-cab { position: absolute; left: 640px; top: 780px; width: 320px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.14em; color: #f4efe4; }
`;
export const HTML = `
        ${nocheHTML("s04", 1)}
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s04-tel"><g transform="translate(60 720) scale(0.9)">${celu("s04")}</g></g>
          <g class="s04-plan">
            <rect x="640" y="770" width="320" height="442" rx="10" fill="#0f2347" stroke="#21a366" stroke-width="7" />
            ${celdas}
            <path d="M640 840 H960 M640 902 H960 M640 964 H960 M640 1026 H960 M640 1088 H960 M640 1150 H960 M747 770 V1212 M853 770 V1212" stroke="#21a366" stroke-width="4" fill="none" />
            <path class="sl s04-flecha" d="M390 1000 C460 940 560 940 625 980" stroke="#ffb84d" stroke-dasharray="14 16" />
          </g>
        </svg>
        <div class="s04-cab">PLANILLA</div>
        <div class="s04-msg s04-m0" style="top:830px">Quiero 2 rojas</div>
        <div class="s04-msg s04-m1" style="top:910px">¿Talle M?</div>
        <div class="s04-msg s04-m2" style="top:990px">Mandame 3</div>
        <div class="s04-msg s04-m3" style="top:1070px">Lo de ayer</div>
        <div class="s04-msg s04-m4" style="top:1150px">¿Y lo mío?</div>
        <div class="s04-vuela">Pedido</div>
        <div class="txt s04-uno"><span>Uno.</span><span>Por.</span><span>Uno.</span></div>
`;
export const JS = `
      const PASO = 1.21, PEDIDOS = 1.6, WAPP = 2.1, PLANILLA = 2.7, UNO = 3.1, POR = 4.0, UNO2 = 4.2;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
${nocheJS("s04", "PASO - 0.3")}
      entra(".s04-tel", PASO - 0.05, -200, 0, 0.35);
      qa(".s04-msg").forEach((m, i) => entra(m, PEDIDOS + i * 0.1, -40, 0, 0.2));
      entra([q(".s04-plan"), q(".s04-cab")], PLANILLA - 0.3, 200, 0, 0.35);
      // un mensaje por vez vuela a la planilla y llena una celda
      gsap.set(q(".s04-vuela"), { opacity: 0 });
      const VUELOS = [2.9, 3.3, 3.75, 4.15, 4.5];
      VUELOS.forEach((t, i) => {
        tl.fromTo(q(".s04-vuela"), { opacity: 1, x: 0, y: i * 80, scale: 1 }, { x: 570, y: 20 + i * 62, scale: 0.6, opacity: 0.2, duration: 0.3, ease: "power2.in", immediateRender: false }, t);
        tl.to(q(".s04-m" + i), { opacity: 0.25, duration: 0.1 }, t);
        tl.set(qa(".s04-cel")[i], { opacity: 0.55 }, t + 0.3);
        tl.to(qa(".s04-cel")[i], { opacity: 0.18, duration: 0.3 }, t + 0.32);
      });
      dibujar(".s04-flecha", PLANILLA, 0.4);
      const sp = qa(".s04-uno span");
      [UNO, POR, UNO2].forEach((t, i) => { tl.fromTo(sp[i], { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08); });
      sacudon(UNO2 + 0.05, 0.6);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 1.2, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.6, sfx: "notification", vol: 0.25 },
  { t: 2.9, sfx: "key-press", vol: 0.4 },
  { t: 3.3, sfx: "key-press", vol: 0.4 },
  { t: 3.75, sfx: "key-press", vol: 0.4 },
  { t: 4.15, sfx: "key-press", vol: 0.4 },
  { t: 4.5, sfx: "key-press", vol: 0.4 },
];
