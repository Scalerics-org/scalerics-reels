import { local } from "./pj.mjs";
export const ID = "s17-cta";
export const CSS = `
  $ .s17-etiq { top: 586px; font-size: 140px; color: #ffd60a; text-shadow: 0 0 36px rgba(255,214,10,0.45); }
  $ .s17-alque { top: 740px; font-size: 64px; }
  $ .s17-rehen { top: 820px; font-size: 92px; color: #ff3b3b; text-shadow: 0 0 30px rgba(255,59,59,0.45); }
  $ .s17-tag { position: absolute; left: 560px; top: 1030px; padding: 14px 26px; border-radius: 40px; background: #2f6bff; border: 5px solid #f2f2f2; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 42px; color: #f2f2f2; white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(260 980) scale(0.8)"><g class="s17-local">${local("s17")}</g></g>
        </svg>
        <div class="txt s17-etiq">Etiquetá</div>
        <div class="txt s17-alque">al que esta noche</div>
        <div class="txt s17-rehen">sigue de rehén</div>
        <div class="s17-tag">@el_de_la_planilla</div>
`;
export const JS = `
      const AL = 0.36, NOCHE = 0.86, REHEN = 1.56;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.fromTo(q(".s17-etiq"), { opacity: 0.5, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.1, 1);
      tl.fromTo(q(".s17-local"), { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.2);
      golpe(".s17-alque", AL + 0.05, 1.6);
      golpe(".s17-rehen", REHEN, 2.2);
      sacudon(REHEN + 0.05, 1);
      // la etiqueta cae sobre la ventana del que sigue de rehén
      gsap.set(q(".s17-tag"), { opacity: 0 });
      tl.fromTo(q(".s17-tag"), { opacity: 0, scale: 0.4, rotation: -20 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.3, ease: "back.out(2.2)", immediateRender: false }, REHEN + 0.6);
      tl.to(q(".s17-tag"), { scale: 1.06, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, REHEN + 1.0);
      tl.fromTo(q(".s17-vidriera"), { fill: "#0e2a1e" }, { fill: "#1c5a3c", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 1.0);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.4, sfx: "click", vol: 0.25 },
  { t: 1.5, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 2.16, sfx: "pop", vol: 0.32 },
  { t: 2.2, sfx: "notification", vol: 0.28 },
];
