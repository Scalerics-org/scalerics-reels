import { silueta, rayas, placa } from "./pj.mjs";
export const ID = "s17-cta";
export const CSS = `
  $ .s17-flash { position: absolute; inset: 0; background: #ffffff; opacity: 0; }
  $ .s17-boton { position: absolute; left: 0; right: 0; margin: 0 auto; width: max-content; top: 1232px; padding: 18px 40px 16px; background: #5ce611; color: #111815; border-radius: 999px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(300 630)"><g class="s17-ficha">
            ${rayas("s17", { w: 480, h: 590 })}
            <g transform="translate(60 50)"><g class="s17-sil">${silueta("s17")}</g></g>
          </g></g>
          <g transform="translate(330 1000)"><g class="s17-placa">${placa("s17", ["«AHORA TE", "CONTESTO»"], { w: 420 })}</g></g>
        </svg>
        <div class="s17-boton">Mandáselo</div>
        <div class="etiqueta s17-et">Próximo sospechoso</div>
        <div class="s17-flash"></div>
`;
export const JS = `
      tl.fromTo(q(".s17-ficha"), { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      pop(".s17-boton", 0.15, 0.4);
      pop(".s17-et", 0.5);
      tl.to(q(".s17-q"), { scale: 1.15, svgOrigin: "180 250", duration: 0.25, yoyo: true, repeat: 1 }, 0.7);
      // "ahora te contesto": la placa y el flash de la foto de ficha
      gsap.set(q(".s17-placa"), { opacity: 0 });
      tl.fromTo(q(".s17-placa"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, 1.55);
      tl.to(q(".s17-flash"), { opacity: 0.8, duration: 0.04 }, 2.2);
      tl.to(q(".s17-flash"), { opacity: 0, duration: 0.4 }, 2.25);
      tl.to(q(".s17-boton"), { scale: 1.08, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 2.8);
      tl.to(q(".s17-q"), { rotation: 12, svgOrigin: "180 250", duration: 0.25, yoyo: true, repeat: 3 }, 3.4);
`;
export const SFX = [
  { t: 0.15, sfx: "pop", vol: 0.3 },
  { t: 1.55, sfx: "whoosh-short", vol: 0.25 },
  { t: 2.2, sfx: "click", vol: 0.4 },
  { t: 2.22, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
];
