import { clienta } from "./pj.mjs";
export const ID = "s02-clienta";
export const CSS = `
  $ .s02-burbuja { position: absolute; left: 520px; top: 690px; padding: 22px 30px; background: #efeadf; color: #111815; border-radius: 28px 28px 28px 6px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; line-height: 1.2; white-space: nowrap; }
  $ .s02-ausente { left: 590px; top: 1130px; font-size: 62px; }
`;
const silla = `
      <path class="b" d="M40 0 H220 V200 H40 Z" stroke-width="7" />
      <path class="l" d="M0 210 H260 V250 H0 Z" />
      <path class="l" d="M20 250 V420 M240 250 V420 M60 250 V380 M200 250 V380" />`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s02-a">
            <g transform="translate(90 800) scale(1.05)"><g class="s02-pj">${clienta("s02")}</g></g>
            <g class="s02-ondas"><path class="yl s02-onda" d="M440 1070 C470 1040 470 1000 440 970" /><path class="yl s02-onda" d="M480 1100 C530 1050 530 960 480 910" /></g>
          </g>
          <g class="s02-b">
            <path class="s02-luz" d="M700 640 L560 1350 H990 L850 640 Z" fill="#ffd23f" opacity="0.12" />
            <g transform="translate(640 930)"><g class="s02-silla">${silla}</g></g>
            <g transform="translate(620 640)"><g class="s02-cel">
              <rect class="k" x="0" y="0" width="150" height="250" rx="26" stroke-width="6" />
              <rect x="16" y="34" width="118" height="196" rx="8" fill="#111815" stroke="#efeadf" stroke-width="3" />
              <circle cx="75" cy="100" r="30" fill="#e5484d" /><text x="75" y="113" text-anchor="middle" class="slex" font-size="36" fill="#efeadf">1</text>
              <path class="l fino s02-vib" d="M-24 60 V130 M-44 80 V110 M174 60 V130 M194 80 V110" />
            </g></g>
          </g>
        </svg>
        <div class="s02-burbuja">¿Tienen mesa?</div>
        <div class="sello s02-ausente">Ausente</div>
        <div class="etiqueta s02-et">La víctima</div>
        <div class="etiqueta s02-et2">El sospechoso: ausente</div>
`;
export const JS = `
      // la clienta entra con el celular
      tl.fromTo(q(".s02-pj"), { opacity: 0.4, x: -80 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      pop(".s02-et", 0.3);
      // "reservar": manda el mensaje
      pop(".s02-burbuja", 1.15, 0.35, { transformOrigin: "0% 100%" });
      dibujar(".s02-onda", 1.2, 0.35);
      tl.to(q(".s02-burbuja"), { y: -12, duration: 0.25, yoyo: true, repeat: 1 }, 1.7);
      parpadeo(".s02-clienta-ojos", 1.9);
      // "Y vos": la mirada pasa a la silla vacía
      tl.to(qa(".s02-a, .s02-burbuja"), { opacity: 0, x: -200, duration: 0.3, ease: "power2.in" }, 2.35);
      sale(".s02-et", 2.35);
      gsap.set(q(".s02-b"), { opacity: 0 });
      tl.fromTo(q(".s02-b"), { opacity: 0, x: 0 }, { opacity: 1, x: -230, duration: 0.4, ease: "power3.out", immediateRender: false }, 2.45);
      tl.fromTo(q(".s02-luz"), { opacity: 0 }, { opacity: 0.16, duration: 0.3, immediateRender: false }, 2.5);
      // el celular sobre la silla vibra solo
      tl.to(q(".s02-cel"), { rotation: 4, svgOrigin: "75 125", duration: 0.06, yoyo: true, repeat: 9 }, 2.8);
      dibujar(".s02-vib", 2.8, 0.2);
      // "no estabas": sello AUSENTE
      golpe(".s02-ausente", 3.8, 2.4);
      tl.set(q(".s02-ausente"), { rotation: -8 }, 0);
      sacudon(3.82, 0.8);
      pop(".s02-et2", 4.0);
`;
export const SFX = [
  { t: 1.15, sfx: "notification", vol: 0.35 },
  { t: 2.4, sfx: "whoosh", vol: 0.25 },
  { t: 2.8, sfx: "key-press", vol: 0.25 },
  { t: 3.78, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
