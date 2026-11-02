import { companera, HAZDEF } from "./pj.mjs";
export const ID = "s02-catorce";
const N = 14;
let tabs = "";
const nombres = ["STOCK FINAL", "STOCK FINAL 2", "AHORA SÍ", "NO TOCAR", "PRECIOS 2019", "COPIA DE COPIA", "HOJA7", "CAJA (MAL)", "PROVEEDORES?", "BORRAR", "STOCK FINAL 3", "LOCAL 2", "NO SÉ", "Hoja1 (2)"];
nombres.forEach((n, i) => {
  const col = i % 2, fila = Math.floor(i / 2);
  tabs += `<div class="s02-tab${n === "NO TOCAR" ? " s02-rojo" : ""}" style="left:${430 + col * 300}px; top:${860 + fila * 64}px">${n}</div>`;
});
export const CSS = `
  $ .s02-num { position: absolute; left: 430px; width: 600px; top: 600px; text-align: center; font-family: "Black Ops One", sans-serif; font-size: 230px; line-height: 1; color: #ffb020; text-shadow: 0 0 40px rgba(255,176,32,0.35); }
  $ .s02-pest { position: absolute; left: 430px; width: 600px; top: 818px; text-align: center; font-family: "Black Ops One", sans-serif; font-size: 50px; line-height: 1; color: #ecebe4; letter-spacing: 0.06em; }
  $ .s02-tab { position: absolute; box-sizing: border-box; width: 284px; height: 54px; padding-top: 12px; border-radius: 10px 10px 0 0; background: #1f231d; border: 3px solid #21a366; border-bottom: none; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #ecebe4; text-align: center; white-space: nowrap; }
  $ .s02-rojo { background: #ff2d2d; color: #070807; border-color: #ff2d2d; }
  $ .s02-que { top: 640px; left: 430px; width: 600px; right: auto; font-size: 120px; color: #ecebe4; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">${HAZDEF}
          <circle class="s02-haz" cx="760" cy="980" r="420" fill="url(#hazgrad)" />
          <g transform="translate(10 790) scale(1.05)"><g class="s02-comp">${companera("s02")}</g></g>
        </svg>
        <div class="txt ops s02-que">¿Qué?</div>
        <div class="s02-num">14</div>
        <div class="s02-pest">pestañas</div>
        ${tabs}
`;
export const JS = `
      const PLANILLA = 0.3, TIENE = 1.18, CATORCE = 1.3, PESTANAS = 1.8;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.06, duration: DUR, ease: "none", transformOrigin: "30% 70%" }, 0);
      tl.fromTo(q(".s02-comp"), { opacity: 0.4, x: -120 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s02-comp-boca", 0.0, 0.85, 0.35);
      hablar(".s02-comp-boca", 1.18, 2.2, 0.3);
      // la linterna tiembla (está nerviosa)
      tl.to(q(".s02-comp-brazo"), { rotation: 4, svgOrigin: "60 470", duration: 0.07, yoyo: true, repeat: 30, ease: "none" }, 0);
      tl.to(q(".s02-haz"), { x: 12, y: -8, duration: 0.07, yoyo: true, repeat: 30, ease: "none" }, 0);
      golpe(".s02-que", 0.05, 1.8);
      tl.to(q(".s02-que"), { opacity: 0, scale: 0.8, duration: 0.15 }, TIENE - 0.1);
      // "catorce": el número cae, las pestañas se apilan
      golpe(".s02-num", CATORCE, 2.4);
      sacudon(CATORCE + 0.05, 1);
      golpe(".s02-pest", PESTANAS, 1.6);
      const T = qa(".s02-tab");
      gsap.set(T, { opacity: 0 });
      T.forEach((el, i) => tl.fromTo(el, { opacity: 0, y: -60, rotation: i % 2 ? 6 : -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.16, ease: "back.out(2)", immediateRender: false }, CATORCE + 0.1 + i * 0.07));
      tl.fromTo(q(".s02-rojo"), { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, PESTANAS + 0.4);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.28, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 1.4, sfx: "typing", vol: 0.28, max: 1.0 },
  { t: 1.8, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
];
