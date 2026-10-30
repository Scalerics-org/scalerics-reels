import { planilla, hija } from "./pj.mjs";
export const ID = "s11-guardar";
export const CSS = `
  $ .s11-dlg { position: absolute; left: 90px; top: 880px; width: 900px; border-radius: 18px; background: #f2f2f2; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
  $ .s11-dlg h4 { position: relative; margin: 0; padding: 16px 28px; background: #21a366; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; color: #f2f2f2; letter-spacing: 0.1em; }
  $ .s11-x { position: absolute; right: 18px; top: 8px; width: 52px; height: 52px; border-radius: 8px; background: #ff3b3b; text-align: center; line-height: 52px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; color: #f2f2f2; }
  $ .s11-dlg p { margin: 0; padding: 30px 30px 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 52px; color: #0a0d14; }
  $ .s11-bots { display: flex; gap: 18px; padding: 10px 30px 30px; }
  $ .s11-bots div { padding: 14px 22px; border-radius: 10px; border: 4px solid #0a0d14; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #0a0d14; white-space: nowrap; }
  $ .s11-bots .s11-si { background: #21a366; border-color: #21a366; color: #f2f2f2; }
  $ .s11-guardaste { top: 1250px; left: 280px; right: 30px; font-size: 104px; color: #ffd60a; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(252 580) scale(0.9)"><g class="s11-pl">${planilla("s11")}</g></g>
        </svg>
        <div class="s11-dlg"><h4>PLANILLA<span class="s11-x">X</span></h4><p>¿Guardar los cambios?</p><div class="s11-bots"><div class="s11-si">Guardar</div><div>No guardar</div><div>Cancelar</div></div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="w s11-cursor" d="M700 1180 L700 1260 L720 1242 L736 1276 L750 1270 L734 1236 L760 1234 Z" stroke="#0a0d14" stroke-width="5" />
          <g transform="translate(40 1170) scale(0.62)"><g class="s11-hija">${hija("s11")}</g></g>
        </svg>
        <div class="txt s11-guardaste">¿Guardaste?</div>
`;
export const JS = `
      const CIERRES = 0.31, GUARDAR = 1.11, PAPA = 2.14, GUARDASTE = 2.34;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s11-dlg"), { opacity: 0.4, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s11-pl"), { opacity: 0.5, y: 120 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s11-pl-boca", 0, 1.6, 0.2);
      // el cursor va a la X... y la planilla lo frena
      entra(".s11-cursor", 0.05, 0, 0, 0.1);
      tl.to(q(".s11-cursor"), { x: 210, y: -270, duration: 0.6, ease: "power2.inOut" }, CIERRES);
      tl.to(q(".s11-x"), { scale: 1.25, duration: 0.1, yoyo: true, repeat: 1 }, CIERRES + 0.55);
      tl.to(qa(".s11-pl-ojo"), { scale: 1.25, transformOrigin: "50% 50%", duration: 0.1 }, GUARDAR);
      tl.to(qa(".s11-pl-ceja"), { y: 14, duration: 0.1 }, GUARDAR);
      sacudon(GUARDAR + 0.05, 1);
      tl.to(q(".s11-cursor"), { x: 260, y: 80, opacity: 0, duration: 0.3, ease: "power3.out" }, GUARDAR + 0.1);
      // "¡Papá! ¿Guardaste?"
      entra(".s11-hija", PAPA - 0.15, -160, 0, 0.2);
      hablar(".s11-hija-boca", PAPA, 3.1, 0.4, 0.1);
      golpe(".s11-guardaste", GUARDASTE + 0.1, 2.4);
      sacudon(GUARDASTE + 0.15, 1.2);
`;
export const SFX = [
  { t: 0.0, sfx: "notification", vol: 0.3 },
  { t: 0.31, sfx: "whoosh-short", vol: 0.2 },
  { t: 1.0, sfx: "glitch-1", vol: 0.3, max: 0.4 },
  { t: 1.1, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
  { t: 2.0, sfx: "whoosh", vol: 0.22 },
  { t: 2.4, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
];
