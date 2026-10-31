import { dueno, buena, malo } from "./pj.mjs";
export const ID = "s16-libertad";
export const CSS = `
  $ .s16-lib { left: 0; right: 0; margin: 0 auto; width: max-content; top: 650px; font-size: 76px; color: #5ce611; border-color: #5ce611; background: rgba(17, 24, 21, 0.85); }
  $ .s16-cond { left: 0; right: 0; margin: 0 auto; width: max-content; top: 770px; font-size: 72px; background: rgba(17, 24, 21, 0.92); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 1010) scale(0.65)"><g class="s16-buena">${buena("s16")}</g></g>
          <g transform="translate(340 880) scale(0.88)"><g class="s16-pj">${dueno("s16", { b: "sonrisa" })}</g></g>
          <g transform="translate(760 990) scale(0.7)"><g class="s16-malo">${malo("s16", { b: "mueca" })}</g></g>
        </svg>
        <div class="sello s16-lib">Libertad</div>
        <div class="sello s16-cond">Condicional</div>
        <div class="etiqueta s16-et">Caso cerrado... por ahora</div>
`;
export const JS = `
      tl.fromTo(q(".s16-pj"), { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s16-buena"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      hablar(".s16-buena-boca", 0, 1.0, 0.5);
      golpe(".s16-lib", 0.4, 2.2);
      tl.set(q(".s16-lib"), { rotation: -4 }, 0);
      tl.to(q(".s16-pj"), { y: -40, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 0.55);
      // "Condicional": aparece el malo y estampa
      gsap.set(q(".s16-malo"), { opacity: 0 });
      tl.fromTo(q(".s16-malo"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, 1.35);
      hablar(".s16-malo-boca", 1.6, 2.3, 0.4);
      golpe(".s16-cond", 1.65, 2.6);
      tl.set(q(".s16-cond"), { rotation: 6 }, 0);
      sacudon(1.67, 1);
      tl.to(q(".s16-dueno-cejas"), { y: -10, duration: 0.15 }, 1.7);
      tl.to(q(".s16-lib"), { opacity: 0.5, duration: 0.2 }, 1.8);
      pop(".s16-et", 2.0);
`;
export const SFX = [
  { t: 0.38, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 0.55, sfx: "sparkle", vol: 0.25, max: 0.7 },
  { t: 1.62, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
];
