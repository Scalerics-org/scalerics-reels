import { poli } from "./pj.mjs";
export const ID = "s12-especialistas";
export const CSS = `
  $ .s12-nopuedo { top: 600px; font-size: 80px; }
  $ .s12-llamen { top: 590px; font-size: 92px; }
  $ .s12-esp { top: 700px; font-size: 112px; color: #ffd60a; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(320 900) scale(1.1)"><g class="s12-poli">${poli("s12")}</g></g>
          <path class="al s12-gota" d="M300 1020 C290 1040 290 1056 300 1060 C310 1056 310 1040 300 1020 Z" stroke-width="5" />
          <path class="al s12-gota" d="M780 980 C770 1000 770 1016 780 1020 C790 1016 790 1000 780 980 Z" stroke-width="5" />
        </svg>
        <div class="txt s12-nopuedo">¡No puedo con ella!</div>
        <div class="txt s12-llamen">¡Llamen a los</div>
        <div class="txt s12-esp">especialistas!</div>
`;
export const JS = `
      const LLAMEN = 0.9, ESP = 1.4;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.fromTo(q(".s12-nopuedo"), { opacity: 0.5, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.out" }, 0);
      tl.fromTo(q(".s12-poli"), { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, 0);
      hablar(".s12-poli-boca", 0, 2.4, 0.3, 0.1);
      tl.to(q(".s12-poli"), { x: 10, duration: 0.06, yoyo: true, repeat: 7, ease: "none" }, 0.05);
      qa(".s12-gota").forEach((g, i) => tl.fromTo(g, { opacity: 0, y: 0 }, { opacity: 1, y: 60, duration: 0.7, ease: "power1.in", immediateRender: false }, 0.2 + i * 0.3));
      gsap.set(qa(".s12-gota"), { opacity: 0 });
      // tira el megáfono
      tl.to(q(".s12-poli-brazo"), { x: 160, y: 520, rotation: 120, opacity: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "power2.in" }, 0.55);
      sale(".s12-nopuedo", LLAMEN - 0.12, 0.1);
      golpe(".s12-llamen", LLAMEN + 0.05, 1.8);
      golpe(".s12-esp", ESP, 2.6);
      sacudon(ESP + 0.05, 1.3);
`;
export const SFX = [
  { t: 0.0, sfx: "glitch-2", vol: 0.25, max: 0.4 },
  { t: 0.55, sfx: "whoosh", vol: 0.28 },
  { t: 1.05, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 1.32, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 1.6, sfx: "riser", vol: 0.25, max: 1.4 },
];
