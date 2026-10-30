import { dueno } from "./pj.mjs";
export const ID = "s16-cena";
const barras = [120, 190, 150, 260, 220, 320];
export const CSS = `
  $ .s16-rep { top: 600px; font-size: 86px; }
  $ .s16-cenas { top: 600px; font-size: 104px; color: #5ce611; text-shadow: 0 0 34px rgba(92,230,17,0.4); }
  $ .s16-cel { position: absolute; left: 330px; top: 760px; width: 420px; height: 680px; border-radius: 56px; border: 8px solid #f2f2f2; background: #141a28; }
  $ .s16-cel h5 { position: absolute; left: 34px; top: 70px; margin: 0; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: #5ce611; }
  $ .s16-cel h6 { position: absolute; left: 34px; top: 112px; margin: 0; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: #f2f2f2; }
  $ .s16-barra { position: absolute; bottom: 150px; width: 44px; border-radius: 8px 8px 0 0; background: #21a366; }
  $ .s16-pie { position: absolute; left: 34px; bottom: 60px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #f2f2f2; }
`;
export const HTML = `
        <div class="s16-cel"><h5>REPORTE DEL DÍA</h5><h6>Ventas: bien</h6>
          ${barras.map((h, i) => `<div class="s16-barra" style="left:${40 + i * 58}px;height:${h}px"></div>`).join("")}
          <div class="s16-pie">Pedidos: todos OK</div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s16-mesa-g">
            <g transform="translate(560 800) scale(0.95)"><g class="s16-dueno">${dueno("s16")}</g></g>
            <path class="w" d="M480 1320 H1050 V1350 H480 Z" stroke-width="5" />
            <ellipse class="w" cx="740" cy="1300" rx="130" ry="30" stroke-width="5" />
            <path class="y" d="M680 1294 C680 1276 760 1270 800 1282 C820 1292 806 1306 780 1308 C730 1312 680 1308 680 1294 Z" stroke="#0a0d14" stroke-width="4" />
            <path class="yl s16-vapor" d="M700 1250 C690 1230 712 1214 700 1194 M740 1244 C730 1224 752 1208 740 1188 M780 1250 C770 1230 792 1214 780 1194" stroke-width="6" />
          </g>
        </svg>
        <div class="txt s16-rep">Reporte del día</div>
        <div class="txt s16-cenas">Mientras cenás.</div>
`;
export const JS = `
      const LLEGA = 0.27, REPORTE = 0.57, CELULAR = 1.47, MIENTRAS = 2.22;
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s16-cel"), { opacity: 0.4, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" }, 0);
      golpe(".s16-rep", REPORTE, 1.8);
      gsap.set(qa(".s16-barra"), { scaleY: 0, transformOrigin: "50% 100%" });
      tl.to(qa(".s16-barra"), { scaleY: 1, duration: 0.25, stagger: 0.08, ease: "back.out(1.6)" }, LLEGA + 0.3);
      tl.to(q(".s16-cel"), { x: 8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, CELULAR);
      // mientras cenás: el celular se corre y aparece el dueño, libre, en la mesa
      tl.to(q(".s16-cel"), { x: -250, scale: 0.8, rotation: -6, duration: 0.35, ease: "power3.inOut" }, MIENTRAS - 0.35);
      sale(".s16-rep", MIENTRAS - 0.15, 0.1);
      entra(".s16-mesa-g", MIENTRAS - 0.25, 200, 0, 0.35);
      golpe(".s16-cenas", MIENTRAS + 0.15, 1.8);
      tl.to(q(".s16-vapor"), { y: -16, opacity: 0.5, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, MIENTRAS + 0.2);
      tl.to(q(".s16-dueno-boca"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.2 }, MIENTRAS + 0.3);
`;
export const SFX = [
  { t: 0.1, sfx: "notification", vol: 0.32 },
  { t: 0.5, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 0.6, sfx: "pop", vol: 0.25 },
  { t: 1.9, sfx: "whoosh", vol: 0.25 },
  { t: 2.3, sfx: "chime", vol: 0.28 },
];
