import { celular, puerta, candado } from "./pj.mjs";
export const ID = "s15-puerta";
export const CSS = `
  $ .s15-pre { position: absolute; left: 115px; top: 790px; width: 190px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 28px; color: #efe9ff; line-height: 1.2; }
  $ .s15-num { position: absolute; left: 90px; top: 890px; width: 236px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; color: #5ce611; line-height: 1; }
  $ .s15-cajas { position: absolute; left: 90px; top: 1010px; width: 236px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.16em; color: #efe9ff; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-cel"><g transform="translate(90 700) scale(0.62)">${celular("s15")}</g></g>
                    <g transform="translate(610 680) scale(0.9)"><g class="s15-puerta">${puerta("s15", { afuera: true })}</g></g>
          <g transform="translate(860 960) scale(0.45)"><g class="s15-cand">${candado("s15")}</g></g>
        </svg>
        <div class="s15-pre">¿Cuánto stock hay?</div>
        <div class="s15-num">248</div>
        <div class="s15-cajas">CAJAS · AL DÍA</div>
`;
export const JS = `
      tl.fromTo(q(".s15-cel"), { opacity: 0.5, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15-pre"), { opacity: 0.5, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15-puerta"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      // "Lo mirás en el celular": la respuesta
      golpe(".s15-num", 0.95, 1.8);
      pop(".s15-cajas", 1.2);
      // "la puerta se abre"
      const hoja = q(".s15-hoja");
      tl.to(q(".s15-cand [class*=arco]"), { y: -40, duration: 0.15, ease: "power2.out" }, 2.3);
      tl.to(q(".s15-cand"), { y: 500, rotation: 40, svgOrigin: "100 170", opacity: 0, duration: 0.5, ease: "power2.in" }, 2.55);
      tl.to(q(".s15-afuera"), { opacity: 1, duration: 0.2 }, 2.85);
      tl.to(hoja, { scaleX: 0.12, svgOrigin: "20 330", duration: 0.45, ease: "power2.inOut" }, 2.9);
`;
export const SFX = [
  { t: 0.95, sfx: "ping", vol: 0.35 },
  { t: 2.3, sfx: "click", vol: 0.45 },
  { t: 2.9, sfx: "whoosh-cinematic", vol: 0.3, max: 1.0 },
  { t: 3.1, sfx: "sparkle", vol: 0.3 },
];
