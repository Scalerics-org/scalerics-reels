// s13-scalerics: entra Scalerics: panel de automatizaciones con tres interruptores que se prenden solos.
import { escena, duracion, COL } from "./comun.mjs";
const id = "s13-scalerics", dur = duracion(id);
const filas = [["Recordar turnos", "el día antes · 10:00"], ["Avisar: pedido listo", "apenas está pronto"], ["Reclamar pagos", "al vencer · 09:00"]];
const reloj = `<svg viewBox="-30 -30 60 60" width="56" height="56"><circle r="25" fill="none" stroke="${COL.verde}" stroke-width="5" /><path d="M0 -14 V0 L10 8" fill="none" stroke="${COL.verde}" stroke-width="5" stroke-linecap="round" /></svg>`;
const svg = `<path class="s13-tch" d="M200 1336 Q540 1310 880 1330" fill="none" stroke="${COL.rojo}" stroke-width="12" stroke-linecap="round" />`;
const html = `
  <div class="s13-panel">
    <div class="s13-cab"><b>Scalerics</b><span>automatizaciones</span></div>
    ${filas.map(([t, s], i) => `<div class="s13-fila s13-f${i}"><div class="s13-ic">${reloj}</div><div class="s13-tx"><b>${t}</b><span>${s}</span></div><div class="s13-sw"><i class="s13-on s13-on${i}"></i><i class="s13-bo s13-bo${i}"></i></div></div>`).join("")}
  </div>
  <div class="mk s13-mano">lo que hacés a mano</div>`;
const css = `
  P .s13-panel { position: absolute; left: 90px; top: 600px; width: 900px; padding: 0 0 18px; border-radius: 40px; background: ${COL.ink}; border: 5px solid ${COL.verde}; box-shadow: 0 0 0 10px rgba(92, 230, 17, 0.12); overflow: hidden; }
  P .s13-cab { display: flex; align-items: baseline; gap: 20px; padding: 32px 44px 26px; border-bottom: 3px solid rgba(92, 230, 17, 0.35); }
  P .s13-cab b { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 52px; color: ${COL.blanco}; }
  P .s13-cab span { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; color: ${COL.verde}; }
  P .s13-fila { display: flex; align-items: center; gap: 26px; height: 150px; padding: 0 44px; border-bottom: 3px solid rgba(255, 247, 251, 0.08); }
  P .s13-ic { flex: none; width: 56px; height: 56px; }
  P .s13-ic svg { position: static; width: 56px; height: 56px; overflow: visible; }
  P .s13-tx { flex: 1; display: flex; flex-direction: column; gap: 6px; }
  P .s13-tx b { font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; color: ${COL.blanco}; white-space: nowrap; }
  P .s13-tx span { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: rgba(255, 247, 251, 0.7); white-space: nowrap; }
  P .s13-sw { position: relative; flex: none; width: 128px; height: 68px; border-radius: 34px; background: rgba(255, 247, 251, 0.18); }
  P .s13-on { position: absolute; inset: 0; border-radius: 34px; background: ${COL.verde}; opacity: 0; }
  P .s13-bo { position: absolute; left: 8px; top: 8px; width: 52px; height: 52px; border-radius: 50%; background: ${COL.blanco}; }
  P .s13-mano { left: 0; right: 0; text-align: center; top: 1250px; font-size: 96px; color: ${COL.blanco}; }
`;
const js = `
      const EN = 0, SCA = 0.09, AUTO = 0.85, MANO = 2.05, REC = 2.64, AVI = 3.72, RECL = 5.40, OLV = 6.34;
      tl.fromTo(q(".s13-panel"), { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.05);
      qa(".s13-fila").forEach((f) => gsap.set(f, { opacity: 0.35 }));
      gsap.set(q(".s13-mano"), { opacity: 0 });
      tl.fromTo(q(".s13-mano"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, 1.5);
      dibujar(".s13-tch", MANO + 0.1, 0.35);
      [REC, AVI, RECL].forEach((t, i) => {
        tl.to(q(".s13-f" + i), { opacity: 1, duration: 0.2 }, t - 0.1);
        tl.to(q(".s13-bo" + i), { x: 60, duration: 0.25, ease: "back.out(2)" }, t);
        tl.to(q(".s13-on" + i), { opacity: 1, duration: 0.2 }, t);
        tl.fromTo(q(".s13-f" + i + " .s13-ic"), { rotation: 0 }, { rotation: 360, duration: 0.6, ease: "power2.out", immediateRender: false }, t);
      });
      tl.to(qa(".s13-mano, .s13-tch"), { opacity: 0, duration: 0.3 }, AVI);
      tl.to(q(".s13-panel"), { scale: 1.03, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, OLV);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "chime", vol: 0.3 },
  { t: 2.15, sfx: "click-soft", vol: 0.25 },
  { t: 2.64, sfx: "click", vol: 0.35 },
  { t: 3.72, sfx: "click", vol: 0.35 },
  { t: 5.4, sfx: "click", vol: 0.35 },
  { t: 6.34, sfx: "sparkle", vol: 0.22 },
] });
