// s11-agente: entra Scalerics (verde): el celular del local con un AGENTE DE IA que contesta al instante,
// a cualquier hora (03:12 con luna), con tus precios y tus horarios.
import { escena, duracion, celu, COL } from "./comun.mjs";
const id = "s11-agente", dur = duracion(id);
const svg = `
  ${celu({ cls: "s11-cel", x: 540, y: 1080, s: 0.95, titulo: "Lo de Beto", sub: "agente de IA · en línea", avatar: COL.verde })}
  <g class="s11-reloj"><circle cx="190" cy="930" r="100" fill="${COL.ink}" stroke="${COL.verde}" stroke-width="7" />
    <path d="M190 870 L190 930 L230 950" fill="none" stroke="${COL.blanco}" stroke-width="9" stroke-linecap="round" />
    <path d="M150 790 A40 40 0 1 0 200 840 A32 32 0 1 1 150 790 Z" fill="${COL.ama}" stroke="${COL.ink}" stroke-width="4" />
    <text x="190" y="1080" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="40" fill="${COL.blanco}">03:12</text></g>
`;
const html = `
  <div class="tag s11-ag">AGENTE DE IA</div>
  <div class="s11-b s11-b1">¿Hacen delivery?</div>
  <div class="s11-b s11-b2">¡Sí! Hasta la medianoche. ¿Qué te mando?</div>
  <div class="s11-t s11-t0">AL INSTANTE</div>
  <div class="s11-chip s11-c1">✓ TUS PRECIOS</div>
  <div class="s11-chip s11-c2">✓ TUS HORARIOS</div>`;
const css = `
  P .s11-ag { left: 340px; top: 600px; font-size: 40px; background: ${COL.verde}; }
  P .s11-b { position: absolute; padding: 14px 20px 12px; border: 4px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; line-height: 1.15; color: ${COL.ink}; }
  P .s11-b1 { left: 392px; top: 920px; width: 240px; background: #ffffff; border-radius: 24px 24px 24px 6px; }
  P .s11-b2 { left: 430px; top: 1030px; width: 262px; background: #d9f7c4; border-radius: 24px 24px 6px 24px; }
  P .s11-t { position: absolute; left: 410px; top: 1200px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.1em; color: ${COL.verde}; background: ${COL.ink}; padding: 6px 14px; }
  P .s11-chip { position: absolute; left: 740px; padding: 12px 18px 10px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.04em; color: ${COL.ink}; background: ${COL.verde}; border: 4px solid ${COL.ink}; white-space: nowrap; }
  P .s11-c1 { top: 1120px; }
  P .s11-c2 { top: 1210px; }
`;
const js = `
      const UN = 0, IA = 0.61, ATI = 1.34, INS = 2.35, CUAL = 3.13, HORA = 3.48, PRE = 4.26, HOR = 5.04;
      tl.fromTo(q(".s11-cel"), { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      golpe(".s11-ag", 0.25, { desde: 2.2 });
      pop(".s11-b1", ATI, { desde: 0.5, o: "0% 100%" });
      pop(".s11-b2", INS - 0.15, { desde: 0.5, o: "100% 100%" });
      pop(".s11-t0", INS + 0.1, { desde: 0.6 });
      pop(".s11-reloj", CUAL, { desde: 0.4, o: "190 930" });
      tl.fromTo(q(".s11-reloj"), { rotation: -6, svgOrigin: "190 930" }, { rotation: 6, svgOrigin: "190 930", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, CUAL + 0.3);
      entra(".s11-c1", PRE, { x: 400 }, 0.28);
      entra(".s11-c2", HOR, { x: 400 }, 0.28);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "whoosh", vol: 0.22 },
  { t: 0.3, sfx: "sparkle", vol: 0.3 },
  { t: 1.34, sfx: "pop", vol: 0.3 },
  { t: 2.2, sfx: "ping", vol: 0.3 },
  { t: 3.13, sfx: "chime", vol: 0.25 },
  { t: 4.26, sfx: "click", vol: 0.3 },
  { t: 5.04, sfx: "click", vol: 0.3 },
] });
