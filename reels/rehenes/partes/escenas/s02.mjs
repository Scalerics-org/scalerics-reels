import { local } from "./pj.mjs";
export const ID = "s02-rehen";
export const CSS = `
  $ .s02-cartel { left: 50%; top: 588px; transform: translateX(-50%); }
  $ .s02-otra { top: 580px; font-size: 128px; color: #f2f2f2; }
  $ .s02-sello { left: 130px; top: 1290px; font-size: 64px; padding: 14px 30px 10px; background: rgba(10,13,20,0.7); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(102 720) scale(1.25)"><g class="s02-local">${local("s02")}</g></g>
          <circle class="rl s02-circulo" cx="414" cy="1150" r="120" stroke-width="9" />
          <g class="s02-palitos">
            <path class="yl s02-palo" d="M180 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M205 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M230 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M255 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M170 1025 L268 982" stroke-width="8" />
            <path class="yl s02-palo" d="M295 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M320 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M345 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M370 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M285 1025 L383 982" stroke-width="8" />
            <path class="yl s02-palo" d="M410 975 V1035" stroke-width="8" />
            <path class="yl s02-palo" d="M435 975 V1035" stroke-width="8" />
          </g>
        </svg>
        <div class="cartel s02-cartel">Secuestradora: la planilla</div>
        <div class="sello s02-sello">Rehén</div>
        <div class="txt s02-otra">Otra vez.</div>
`;
export const JS = `
      const PLANILLA = 0.09, REHEN = 1.89, DUENO = 2.49, OTRA = 3.82;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.07, duration: DUR, ease: "none", transformOrigin: "40% 62%" }, 0);
      tl.fromTo(q(".s02-local"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      // la vidriera titila verde: ahí está la planilla
      tl.fromTo(q(".s02-vidriera"), { fill: "#0e2a1e" }, { fill: "#1c5a3c", duration: 0.12, yoyo: true, repeat: 5, ease: "steps(1)" }, PLANILLA + 0.1);
      golpe(".s02-cartel", PLANILLA + 0.35, 1.8);
      // "rehén": sello rojo sobre la vidriera
      golpe(".s02-sello", REHEN, 2.8);
      tl.set(q(".s02-sello"), { rotation: -9 }, 0);
      sacudon(REHEN + 0.05, 1.2);
      // "dueño": círculo rojo alrededor de la silueta
      dibujar(".s02-circulo", DUENO, 0.4);
      tl.to(q(".s02-dueno-cabeza"), { y: 6, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, DUENO);
      // "otra vez": palitos de noches contadas en el vidrio, y el cartel cambia
      sale(".s02-sello", OTRA - 0.4, 0.2);
      sale(".s02-circulo", OTRA - 0.4, 0.2);
      tl.to(q(".s02-cartel"), { opacity: 0, y: -30, duration: 0.15 }, OTRA - 0.15);
      qa(".s02-palo").forEach((p, i) => dibujar(p, OTRA - 0.5 + i * 0.07, 0.12));
      golpe(".s02-otra", OTRA + 0.05, 2.2);
      sacudon(OTRA + 0.1, 0.7);
`;
export const SFX = [
  { t: 0.2, sfx: "glitch-1", vol: 0.22, max: 0.4 },
  { t: 0.42, sfx: "click", vol: 0.3 },
  { t: 1.82, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 2.49, sfx: "whoosh-short", vol: 0.25 },
  { t: 3.35, sfx: "typing", vol: 0.25, max: 0.7 },
  { t: 3.85, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
