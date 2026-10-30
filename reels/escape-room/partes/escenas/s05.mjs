import { cuaderno, joven } from "./pj.mjs";
export const ID = "s05-lo-de-siempre";
export const CSS = `
  $ .s05-m { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: #39ffd2; text-shadow: 0 0 22px rgba(57, 255, 210, 0.7); white-space: nowrap; line-height: 1; }
  $ .s05-a { left: 200px; top: 705px; font-size: 64px; transform: rotate(-4deg); }
  $ .s05-b { left: 215px; top: 800px; font-size: 74px; transform: rotate(-2deg); }
  $ .s05-c { left: 575px; top: 750px; font-size: 70px; transform: rotate(3deg); }
  $ .s05-q { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #ff4fd8; text-shadow: 0 0 26px rgba(255, 79, 216, 0.7); line-height: 1; }
  $ .s05-q1 { left: 120px; top: 1020px; font-size: 150px; transform: rotate(-14deg); }
  $ .s05-q2 { left: 470px; top: 980px; font-size: 190px; }
  $ .s05-q3 { left: 860px; top: 600px; font-size: 140px; transform: rotate(12deg); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(150 610) scale(1.7)"><g class="s05-cuad">${cuaderno("s05", { oscuro: true })}</g></g>
          <ellipse class="pl s05-circ" cx="730" cy="790" rx="190" ry="70" />
          <g class="s05-haz"><path d="M880 1180 L120 650 L240 1080 Z" fill="#39ffd2" opacity="0.13" /></g>
          <g transform="translate(790 1040) scale(0.62)"><g class="s05-pj">${joven("s05")}
            <g transform="rotate(-35 40 420)"><rect class="k" x="-40" y="400" width="120" height="44" rx="10" stroke-width="6" /><rect class="c" x="-60" y="394" width="26" height="56" rx="6" stroke-width="5" /></g></g></g>
        </svg>
        <div class="s05-m s05-a">cajas de lo de</div>
        <div class="s05-m s05-b">siempre:</div>
        <div class="s05-m s05-c">unas cuantas</div>
        <div class="s05-q s05-q1">?</div>
        <div class="s05-q s05-q2">?</div>
        <div class="s05-q s05-q3">?</div>
`;
export const JS = `
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s05-cuad"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      tl.fromTo(q(".s05-pj"), { opacity: 0.5, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      hablar(".s05-joven-boca", 0, 0.6, 0.3);
      // la linterna barre la hoja
      tl.fromTo(q(".s05-haz"), { rotation: 10, svgOrigin: "880 1180" }, { rotation: -8, svgOrigin: "880 1180", duration: 3.4, ease: "sine.inOut" }, 0);
      tl.to(q(".s05-haz"), { rotation: 4, svgOrigin: "880 1180", duration: 2.4, ease: "sine.inOut" }, 3.4);
      const tinta = (s, t) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 0, filter: "blur(12px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.35, immediateRender: false }, t); };
      tinta(".s05-a", 1.1); tinta(".s05-b", 1.95); tinta(".s05-c", 3.2);
      hablar(".s05-joven-boca", 1.1, 3.6, 0.3);
      dibujar(".s05-circ", 3.5, 0.5);
      // "¿Cuántas son unas cuantas?"
      tl.to(q(".s05-joven-cejas"), { y: -14, duration: 0.15 }, 4.5);
      hablar(".s05-joven-boca", 4.5, 5.6, 0.2);
      pop(".s05-q2", 4.5, 0.35); pop(".s05-q1", 4.8, 0.35); pop(".s05-q3", 5.2, 0.35);
      tl.to(qa(".s05-q"), { y: -16, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, 5.5);
`;
export const SFX = [
  { t: 0.0, sfx: "click-soft", vol: 0.3 },
  { t: 1.1, sfx: "sparkle", vol: 0.25 },
  { t: 3.2, sfx: "sparkle", vol: 0.25 },
  { t: 4.5, sfx: "pop", vol: 0.35 },
  { t: 5.2, sfx: "pop", vol: 0.3 },
];
