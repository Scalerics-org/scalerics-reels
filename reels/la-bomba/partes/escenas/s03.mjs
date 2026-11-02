import { experto, HAZDEF } from "./pj.mjs";
export const ID = "s03-leemelas";
export const CSS = `
  $ .s03-desp { top: 600px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 84px; letter-spacing: 0.3em; color: #ffb020; text-transform: uppercase; }
  $ .s03-desp span { display: inline-block; opacity: 0; }
`;
const letras = "DESPACIO".split("").map((l) => `<span>${l}</span>`).join("");
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">${HAZDEF}
          <circle class="s03-haz" cx="540" cy="1000" r="460" fill="url(#hazgrad)" />
          <g transform="translate(306 700) scale(1.3)"><g class="s03-exp">${experto("s03")}</g></g>
          <path class="a s03-caida" d="M418 990 C408 1010 408 1024 420 1026 C432 1024 430 1010 418 990 Z" stroke-width="3" />
        </svg>
        <div class="txt s03-desp">${letras}</div>
`;
export const JS = `
      const DESPACIO = 1.21;
      tl.fromTo(ESC, { scale: 1.12 }, { scale: 1.0, duration: DUR, ease: "power1.out", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s03-exp"), { opacity: 0.3 }, { opacity: 1, duration: 0.25 }, 0);
      hablar(".s03-exp-boca", 0.0, 0.8, 0.4);
      hablar(".s03-exp-boca", 1.21, 2.0, 0.4);
      parpadeo(".s03-exp-ojos", 0.9);
      // las gotas tiemblan y una cae
      tl.to(qa(".s03-gota"), { y: 6, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s03-caida"), { opacity: 1, y: 0 }, { opacity: 0, y: 380, duration: 1.0, ease: "power2.in" }, 0.3);
      // la lámpara del casco titila
      tl.to(q(".s03-exp-lampara"), { opacity: 0.5, duration: 0.08, yoyo: true, repeat: 3, ease: "steps(1)" }, 0.5);
      // "despacio": letra por letra
      tl.fromTo(qa(".s03-desp span"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.08, immediateRender: false }, DESPACIO);
`;
export const SFX = [
  { t: 0.3, sfx: "riser", vol: 0.18, max: 2.0 },
  { t: 1.21, sfx: "typing", vol: 0.25, max: 0.7 },
];
