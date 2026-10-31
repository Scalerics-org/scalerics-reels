import { dueno, sarten } from "./pj.mjs";
export const ID = "s12-milanesa";
export const CSS = `
  $ .s12-cartel { left: 0; right: 0; margin: 0 auto; width: max-content; top: 640px; transform: rotate(2deg); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(360 820)"><g class="s12-pj">
            <path d="M70 420 L-10 320" stroke="#efeadf" stroke-width="56" stroke-linecap="round" />
            <path d="M290 420 L370 320" stroke="#efeadf" stroke-width="56" stroke-linecap="round" />
            <g class="s12-izq"><g transform="translate(-314 274) scale(0.8)">${sarten("s12")}</g><circle class="piel" cx="-10" cy="318" r="34" stroke-width="5" /></g>
            <g class="s12-der">
              <g transform="translate(320 120)">
                <rect class="k" x="0" y="0" width="120" height="210" rx="20" stroke-width="6" />
                <rect class="s12-pant" x="12" y="28" width="96" height="164" rx="6" fill="#ffd23f" />
                <text x="60" y="124" text-anchor="middle" class="slex" font-size="54" fill="#111815">!</text>
              </g>
              <path class="yl s12-vib" d="M300 130 V200 M282 150 V180 M460 130 V200 M478 150 V180" stroke-width="5" />
              <circle class="piel" cx="370" cy="318" r="34" stroke-width="5" />
            </g>
            ${dueno("s12")}
          </g></g>
        </svg>
        <div class="cartel s12-cartel">¿Y qué querían?</div>
        <div class="etiqueta s12-et">La defensa</div>
`;
export const JS = `
      tl.fromTo(q(".s12-pj"), { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.25, ease: "back.out(1.6)" }, 0);
      golpe(".s12-cartel", 0.05, 2);
      hablar(".s12-dueno-boca", 0, 3.6, 0.3);
      pop(".s12-et", 0.4);
      sale(".s12-cartel", 1.45);
      // "milanesa": vuela y da vuelta
      tl.to(q(".s12-mila"), { y: -170, rotation: 180, svgOrigin: "130 30", duration: 0.4, ease: "power2.out" }, 1.55);
      tl.to(q(".s12-mila"), { y: 0, duration: 0.3, ease: "bounce.out" }, 1.95);
      tl.to(q(".s12-izq"), { rotation: -8, svgOrigin: "-10 318", duration: 0.15, yoyo: true, repeat: 1 }, 1.5);
      // "una mano" / "la otra": el celular explota de mensajes
      tl.to(q(".s12-der"), { y: -14, duration: 0.12, yoyo: true, repeat: 1 }, 2.2);
      dibujar(".s12-vib", 2.9, 0.15);
      tl.to(q(".s12-der"), { rotation: 5, svgOrigin: "370 318", duration: 0.05, yoyo: true, repeat: 9 }, 2.95);
      tl.to(q(".s12-pj"), { x: 8, duration: 0.05, yoyo: true, repeat: 7 }, 3.0);
      qa(".s12-gota").forEach((g, i) => tl.fromTo(g, { y: 0, opacity: 0.9 }, { y: 60, opacity: 0, duration: 0.6, ease: "power1.in", immediateRender: false }, 2.4 + i * 0.3));
`;
export const SFX = [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.28, max: 0.5 },
  { t: 1.55, sfx: "whoosh-short", vol: 0.3 },
  { t: 1.95, sfx: "pop", vol: 0.3 },
  { t: 2.95, sfx: "notification", vol: 0.3 },
  { t: 3.15, sfx: "notification", vol: 0.25 },
];
