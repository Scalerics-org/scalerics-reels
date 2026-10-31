import { buena, dueno, taza } from "./pj.mjs";
export const ID = "s04-cafecito";
export const CSS = `
  $ .s04-todavia { position: absolute; left: 90px; top: 640px; font-family: "Caveat", cursive; font-weight: 700; font-size: 84px; color: #ffd23f; transform: rotate(-6deg); white-space: nowrap; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(700 980) scale(0.75)"><g class="s04-dueno">${dueno("s04", { b: "mueca" })}</g></g>
          <g transform="translate(90 760) scale(1.15)"><g class="s04-pj">${buena("s04")}</g></g>
          <g transform="translate(560 1200)"><g class="s04-taza">${taza("s04")}</g></g>
        </svg>
        <div class="s04-todavia">todavía...</div>
        <div class="etiqueta s04-et">La policía buena</div>
`;
export const JS = `
      tl.fromTo(q(".s04-pj"), { x: -120, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".s04-dueno"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      hablar(".s04-buena-boca", 0.05, 1.9, 0.5);
      pop(".s04-et", 0.3);
      parpadeo(".s04-buena-ojos", 1.0);
      // "nadie te acusa": el dueño respira
      tl.to(q(".s04-dueno"), { y: -10, duration: 0.3, yoyo: true, repeat: 1 }, 1.3);
      // "Todavía": ceja arriba, el dueño traga
      tl.to(q(".s04-buena-cejas"), { y: -10, duration: 0.15 }, 2.7);
      pop(".s04-todavia", 2.75, 0.4);
      hablar(".s04-buena-boca", 2.77, 3.2, 0.5);
      tl.to(q(".s04-dueno"), { x: 10, duration: 0.05, yoyo: true, repeat: 7 }, 2.9);
      qa(".s04-gota").forEach((g, i) => tl.fromTo(g, { y: 0, opacity: 0.9 }, { y: 50, opacity: 0, duration: 0.7, ease: "power1.in", immediateRender: false }, 3.0 + i * 0.3));
      // "¿Un cafecito?": la taza se desliza por la mesa
      sale(".s04-todavia", 3.4);
      gsap.set(q(".s04-taza"), { opacity: 0 });
      tl.fromTo(q(".s04-taza"), { opacity: 0, x: -260 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, 3.5);
      hablar(".s04-buena-boca", 3.5, 4.5, 0.5);
      dibujar(".s04-humo", 4.0, 0.6);
      tl.to(q(".s04-humo"), { y: -14, duration: 0.6, ease: "sine.inOut" }, 4.4);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.2 },
  { t: 2.75, sfx: "click-soft", vol: 0.3 },
  { t: 3.5, sfx: "whoosh", vol: 0.25 },
  { t: 3.9, sfx: "click", vol: 0.25 },
];
