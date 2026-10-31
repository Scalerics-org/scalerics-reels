// s05-obsesion: primer plano de la panelista horrorizada: "¡Cuarenta! Eso ya es obsesión."
import { escena, duracion, persona, brillito, COL } from "./comun.mjs";
const id = "s05-obsesion", dur = duracion(id);
const svg = `
  ${brillito(200, 760, 1.6, COL.oro, "s05-b")}${brillito(880, 820, 1.2, COL.rosa, "s05-b")}${brillito(860, 1200, 1.4, COL.oro, "s05-b")}
  ${persona({ id: "s05-aoe", x: 540, y: 1520, s: 1.6, pelo: "morocha", anteojos: true, pestanas: true, aros: true, cara: "grita", ropa: COL.oro })}
`;
const html = `
  <div class="tit s05-40">¡40!</div>
  <div class="sello s05-obs">OBSESIÓN</div>`;
const css = `
  P .s05-40 { top: 600px; font-size: 220px; color: ${COL.oro}; text-shadow: 10px 10px 0 ${COL.ink}; }
  P .s05-obs { left: 230px; top: 1260px; font-size: 104px; transform: rotate(-8deg); background: ${COL.blanco}; }
`;
const js = `
      const CUAR = 0, ESO = 1.07, OBS = 1.39;
      tl.fromTo(q(".s05-aoe"), { scale: 0.85, svgOrigin: "540 1680" }, { scale: 1, svgOrigin: "540 1680", duration: 0.3, ease: "back.out(2)" }, 0);
      habla(".s05-aoe-boca", 0, 0.9, 0.09, 0.6);
      habla(".s05-aoe-boca", ESO, 1.0, 0.09, 0.6);
      golpe(".s05-40", 0.12, { desde: 2.4 });
      tl.to(q(".s05-40"), { opacity: 0, y: -40, duration: 0.2 }, OBS - 0.15);
      golpe(".s05-obs", OBS + 0.05, { desde: 2.6 });
      sacudon(OBS + 0.08, 1.3);
      balancea(".s05-b", 0, DUR, 15, 0.3);
      tl.fromTo(q(".s05-aoe"), { x: -6 }, { x: 6, duration: 0.05, yoyo: true, repeat: 15, ease: "none", immediateRender: false }, OBS);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.1, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 1.4, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
  { t: 1.45, sfx: "glitch-1", vol: 0.18, max: 0.3 },
] });
