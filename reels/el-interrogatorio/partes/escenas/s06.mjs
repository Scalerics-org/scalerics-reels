import { foto } from "./pj.mjs";
export const ID = "s06-prueba-uno";
const t = (y, txt, cls) => `<text class="lex6 ${cls}" x="76" y="${y}" font-size="31" fill="#111815">${txt}</text>`;
const chat = `
      <circle cx="80" cy="70" r="28" fill="#e5484d" stroke="#efeadf" stroke-width="4" />
      <text x="126" y="66" class="lex6" font-size="28" fill="#efeadf">Clienta</text>
      <text x="126" y="96" class="mono" font-size="20" fill="#9fb3a8">sáb · 21:14</text>
      <path d="M40 118 H600" stroke="#efeadf" stroke-width="2" opacity="0.25" />
      <g class="s06-burb">
        <rect x="50" y="140" width="520" height="250" rx="26" fill="#efeadf" />
        ${t(190, "Hola,", "s06-l1")}
        ${t(236, "¿tienen mesa para cuatro", "s06-l2")}
        ${t(282, "esta noche? Es el cumple", "s06-l3")}
        ${t(328, "de mi vieja.", "s06-l4")}
        <text x="550" y="374" text-anchor="end" class="mono s06-l4" font-size="20" fill="#5b6b62">21:14</text>
      </g>
      <g class="s06-sinleer">
        <rect x="150" y="402" width="340" height="56" rx="28" fill="#e5484d" />
        <text x="320" y="439" text-anchor="middle" class="lex6" font-size="26" fill="#efeadf">1 mensaje sin leer</text>
      </g>
      <text x="320" y="582" text-anchor="middle" class="mano" font-size="44" fill="#111815">Prueba 1 · el mensaje</text>`;
export const CSS = `
  $ .s06-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1150px; font-size: 76px; background: rgba(17, 24, 21, 0.85); }
  $ .s06-sello span { display: inline-block; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(220 660)"><g class="s06-foto">${foto("s06", { w: 640, h: 610, rot: -2, contenido: chat })}</g></g>
        </svg>
        <div class="sello s06-sello" data-layout-allow-overlap>Leído: <span class="s06-nunca">nunca</span></div>
        <div class="etiqueta s06-et">Prueba Nº 1</div>
`;
export const JS = `
      // cuadro 0: la foto ya cayendo sobre la mesa
      tl.fromTo(q(".s06-foto"), { opacity: 0.6, y: -120, rotation: -8, svgOrigin: "320 300" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "320 300", duration: 0.35, ease: "power3.out" }, 0);
      pop(".s06-et", 0.2);
      // el mensaje se escribe con la voz de la clienta
      pop(".s06-burb", 0.05, 0.3, { transformOrigin: "0% 0%" });
      ["l2", "l3", "l4"].forEach((c, i) => { gsap.set(qa(".s06-" + c), { opacity: 0 }); tl.to(qa(".s06-" + c), { opacity: 1, duration: 0.2 }, [0.86, 1.9, 3.3][i]); });
      tl.to(q(".s06-foto"), { scale: 1.04, svgOrigin: "320 300", duration: 4, ease: "none" }, 0.4);
      // "Leído": sin leer + sello
      pop(".s06-sinleer", 4.3, 0.35);
      tl.to(q(".s06-sinleer"), { scale: 1.08, svgOrigin: "320 430", duration: 0.2, yoyo: true, repeat: 3 }, 4.7);
      golpe(".s06-sello", 4.58, 2.2);
      tl.set(q(".s06-sello"), { rotation: -6 }, 0);
      sacudon(4.6, 0.8);
      gsap.set(q(".s06-nunca"), { opacity: 0 });
      tl.fromTo(q(".s06-nunca"), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, 5.45);
      sacudon(5.6, 0.6);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 0.1, sfx: "notification", vol: 0.3 },
  { t: 0.86, sfx: "typing", vol: 0.15, max: 2.6 },
  { t: 4.55, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
  { t: 5.45, sfx: "impact-bass-2", vol: 0.35, max: 0.6 },
];
