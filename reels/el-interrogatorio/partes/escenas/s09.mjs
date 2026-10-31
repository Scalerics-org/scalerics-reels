import { dueno, telefono } from "./pj.mjs";
export const ID = "s09-abogado";
export const CSS = `
  $ .s09-cartel { left: 0; right: 0; margin: 0 auto; width: max-content; top: 630px; font-size: 56px; transform: rotate(-3deg); }
`;
const brazos = `
      <path d="M70 420 L-30 260" stroke="#efeadf" stroke-width="56" stroke-linecap="round" />
      <path d="M290 420 L390 260" stroke="#efeadf" stroke-width="56" stroke-linecap="round" />
      <circle class="piel" cx="-36" cy="236" r="36" stroke-width="5" />
      <circle class="piel" cx="396" cy="236" r="36" stroke-width="5" />`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(330 790) scale(1.05)"><g class="s09-pj">${brazos}${dueno("s09")}</g></g>
          <g transform="translate(700 1110) scale(0.8)"><g class="s09-tel">${telefono("s09")}</g></g>
        </svg>
        <div class="cartel s09-cartel">¡Quiero a mi abogado!</div>
        <div class="etiqueta s09-et">Derechos del detenido</div>
`;
export const JS = `
      tl.fromTo(q(".s09-pj"), { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.25, ease: "back.out(1.6)" }, 0);
      hablar(".s09-dueno-boca", 0, 2.2, 0.3);
      golpe(".s09-cartel", 0.3, 2.2);
      tl.to(q(".s09-pj"), { x: 8, duration: 0.05, yoyo: true, repeat: 9 }, 0.4);
      qa(".s09-gota").forEach((g, i) => tl.fromTo(g, { y: 0, opacity: 0.9 }, { y: 60, opacity: 0, duration: 0.6, ease: "power1.in", immediateRender: false }, 0.5 + i * 0.3));
      // "Pido mi llamada": entra el teléfono
      entra(".s09-tel", 1.1, 300, 0, 0.3);
      tl.to(q(".s09-tubo"), { y: -24, duration: 0.08, yoyo: true, repeat: 5 }, 1.5);
      pop(".s09-et", 0.25);
`;
export const SFX = [
  { t: 0.28, sfx: "impact-bass-2", vol: 0.32, max: 0.5 },
  { t: 1.1, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.5, sfx: "beep", vol: 0.25, max: 0.6 },
];
