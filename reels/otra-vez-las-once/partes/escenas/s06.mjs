import { nocheHTML, nocheJS } from "./noche.mjs";
export const ID = "s06-noche47";
export const CSS = `
  $ .s06-panel { position: absolute; top: 700px; width: 400px; height: 330px; border: 6px solid #f4efe4; border-radius: 22px; background: #0f2347; }
  $ .s06-local { left: 80px; }
  $ .s06-tienda { left: 600px; border-color: #7fb4ff; }
  $ .s06-tit { position: absolute; left: 0; right: 0; top: 22px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: #f4efe4; }
  $ .s06-item { position: absolute; left: 30px; right: 30px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; color: #f4efe4; }
  $ .s06-item b { float: right; font-weight: 800; color: #ffb84d; }
  $ .s06-vend { position: absolute; left: 30px; top: 150px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #ff2d2d; }
  $ .s06-num { position: absolute; left: 0; right: 0; top: 140px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; color: #f4efe4; }
  $ .s06-mano { position: absolute; left: 0; right: 0; top: 274px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: #7fb4ff; }
  $ .s06-caja { top: 1270px; font-size: 92px; }
  $ .s06-tira { position: absolute; left: 360px; top: 1060px; width: 360px; height: 190px; overflow: hidden; }
  $ .s06-papel { position: absolute; left: 30px; width: 300px; top: 0; padding: 8px 22px; background: #f4efe4; color: #050b18; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; line-height: 1.35; }
`;
const lineas = ["  120", "+ 350", "-  80", "+ 990", "+  45", "- 210", "+ 600", "= ???", "  ...", "  ..."];
export const HTML = `
        ${nocheHTML("s06", 47)}
        <div class="s06-panel s06-local"><div class="s06-tit">EN EL LOCAL</div><div class="s06-item" style="top:80px">Taza roja</div><div class="s06-vend">VENDÍ 2</div></div>
        <div class="s06-panel s06-tienda"><div class="s06-tit">TIENDA ONLINE</div><div class="s06-item" style="top:80px">Taza roja · stock</div>
          <div class="s06-num s06-n12">12</div><div class="s06-num s06-n11">11</div><div class="s06-num s06-n10">10</div><div class="s06-mano">A MANO</div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="yl s06-flecha" d="M490 865 H590" />
          <path class="y s06-punta" d="M580 845 L606 865 L580 885 Z" stroke-width="4" />
          <g class="s06-calcu">
            <rect x="420" y="1090" width="240" height="0" fill="none" />
          </g>
        </svg>
        <div class="s06-tira"><div class="s06-papel">${lineas.join("<br/>")}</div></div>
        <div class="txt s06-caja">Y hago la caja</div>
`;
export const JS = `
      const PASO = 1.63, STOCK = 1.9, TIENDA = 2.4, VENDI = 3.0, LOCAL = 3.4, HAGO = 4.2, CAJA = 4.6;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
${nocheJS("s06", "PASO - 0.3")}
      entra(".s06-tienda", STOCK - 0.1, 160, 0, 0.3);
      entra(".s06-local", PASO - 0.1, -160, 0, 0.3);
      gsap.set([q(".s06-n11"), q(".s06-n10"), q(".s06-vend")], { opacity: 0 });
      golpe(".s06-vend", VENDI, 2);
      dibujar(".s06-flecha", LOCAL - 0.1, 0.25);
      pop(".s06-punta", LOCAL + 0.1, 0.15);
      // a mano: 12, 11, 10, con el dedo
      tl.set(q(".s06-n12"), { opacity: 0 }, LOCAL + 0.15);
      tl.set(q(".s06-n11"), { opacity: 1 }, LOCAL + 0.15);
      tl.set(q(".s06-n11"), { opacity: 0 }, LOCAL + 0.45);
      tl.set(q(".s06-n10"), { opacity: 1 }, LOCAL + 0.45);
      tl.fromTo(q(".s06-n10"), { scale: 1.3 }, { scale: 1, duration: 0.2, immediateRender: false }, LOCAL + 0.45);
      // la caja: la tira de papel corre sin fin
      tl.to([q(".s06-local"), q(".s06-tienda")], { y: -40, opacity: 0.4, duration: 0.3 }, HAGO - 0.2);
      tl.to([q(".s06-flecha"), q(".s06-punta")], { opacity: 0, duration: 0.2 }, HAGO - 0.2);
      gsap.set(q(".s06-tira"), { opacity: 0 });
      tl.fromTo(q(".s06-tira"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, HAGO - 0.15);
      tl.fromTo(q(".s06-papel"), { y: -200 }, { y: 120, duration: 1.4, ease: "none", immediateRender: false }, HAGO - 0.15);
      golpe(".s06-caja", CAJA, 2);
      tl.to(q(".s06-tira"), { y: -170, duration: 0.3, ease: "power2.out" }, CAJA - 0.15);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 1.6, sfx: "whoosh-short", vol: 0.25 },
  { t: 3.0, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
  { t: 3.55, sfx: "key-press", vol: 0.4 },
  { t: 3.85, sfx: "key-press", vol: 0.4 },
  { t: 4.05, sfx: "typing", vol: 0.3, max: 1.0 },
  { t: 4.55, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
];
