// s09-visto: el cartel de la publicidad "TE ATENDEMOS COMO EN CASA" y, abajo, los chats en visto;
// en "visto" cae el sello EN VISTO sobre la promesa.
import { escena, duracion, COL } from "./comun.mjs";
const id = "s09-visto", dur = duracion(id);
const casa = `<g transform="translate(150 790)"><path d="M-60 10 L0 -50 L60 10 L60 70 L-60 70 Z" fill="${COL.ama}" stroke="${COL.ink}" stroke-width="7" stroke-linejoin="round" /><rect x="-16" y="30" width="32" height="40" fill="${COL.ink}" /></g>`;
const svg = `
  <g class="s09-cartel"><rect x="60" y="610" width="960" height="330" rx="20" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="8" />
    <rect x="60" y="610" width="960" height="70" rx="20" fill="${COL.rojo}" /><rect x="60" y="650" width="960" height="30" fill="${COL.rojo}" />
    <text x="540" y="662" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" letter-spacing="6" fill="${COL.blanco}">LO DE BETO · PIZZERÍA</text>
    ${casa}
    <text x="250" y="790" font-family="Lexend" font-weight="900" font-size="66" fill="${COL.ink}">TE ATENDEMOS</text>
    <text x="250" y="880" font-family="Caveat" font-weight="700" font-size="96" fill="${COL.rojo}">como en casa</text>
    <g class="s09-rec"><circle cx="940" cy="730" r="14" fill="${COL.rojo}" /><text x="920" y="742" text-anchor="end" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${COL.ink}">REC</text></g>
  </g>
`;
const fila = (cls, quien, txt, hora, y) => `<div class="s09-fila ${cls}" style="top:${y}px"><div class="s09-av"></div><div class="s09-tx"><b>${quien}</b><span>${txt}</span></div><i>${hora}</i><em>✓✓</em></div>`;
const html = `
  ${fila("s09-f1", "Clienta", "¿Hacen delivery?", "21:02", 1000)}
  ${fila("s09-f2", "Señora Marta", "¿A qué hora cierran?", "21:09", 1150)}
  ${fila("s09-f3", "Nico", "¿Tienen fainá? ¿Hola?", "21:14", 1300)}
  <div class="sello s09-sello">EN VISTO</div>`;
const css = `
  P .s09-fila { position: absolute; left: 90px; width: 900px; height: 128px; display: flex; align-items: center; gap: 22px; padding: 0 26px; background: ${COL.pared}; border: 5px solid ${COL.ink}; border-radius: 22px; font-family: "Lexend", sans-serif; color: ${COL.blanco}; }
  P .s09-av { flex: none; width: 76px; height: 76px; border-radius: 50%; background: ${COL.ambar}; border: 4px solid ${COL.ink}; }
  P .s09-tx { flex: 1; }
  P .s09-tx b { display: block; font-weight: 800; font-size: 32px; }
  P .s09-tx span { display: block; font-weight: 500; font-size: 32px; color: ${COL.aceroc}; }
  P .s09-fila i { position: absolute; right: 26px; top: 22px; font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 28px; color: ${COL.aceroc}; }
  P .s09-fila em { position: absolute; right: 26px; bottom: 18px; font-style: normal; font-size: 30px; color: #7fb6ff; letter-spacing: -0.2em; }
  P .s09-sello { left: 300px; top: 700px; font-size: 120px; transform: rotate(-10deg); }
`;
const js = `
      const PROM = 0, CASA = 0.92, FIL = 1.36, TUS = 2.25, CLI = 2.33, VIS = 3.04;
      tl.fromTo(q(".s09-cartel"), { scale: 0.85, opacity: 0, svgOrigin: "540 775" }, { scale: 1, opacity: 1, svgOrigin: "540 775", duration: 0.3, ease: "back.out(1.8)" }, 0);
      tl.to(q(".s09-cartel"), { scale: 1.04, svgOrigin: "540 775", duration: 0.15, yoyo: true, repeat: 1 }, CASA);
      pop(".s09-rec", FIL, { desde: 0.3, o: "940 730" });
      tl.fromTo(q(".s09-rec"), { opacity: 1 }, { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 7, ease: "steps(1)", immediateRender: false }, FIL + 0.35);
      entra(".s09-f1", TUS - 0.1, { x: 1100 }, 0.28);
      entra(".s09-f2", TUS + 0.1, { x: 1100 }, 0.28);
      entra(".s09-f3", TUS + 0.3, { x: 1100 }, 0.28);
      golpe(".s09-sello", VIS, { desde: 2.6 });
      sacudon(VIS, 1.3);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "pop", vol: 0.3 },
  { t: 1.36, sfx: "beep", vol: 0.25 },
  { t: 2.2, sfx: "whoosh-short", vol: 0.25 },
  { t: 3.0, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
] });
