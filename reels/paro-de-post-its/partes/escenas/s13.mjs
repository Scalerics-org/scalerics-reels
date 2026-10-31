// s13-ficha: la ficha de Martina en el CRM: lo que compró, lo prometido y el aviso.
import { escena, duracion, COL } from "./comun.mjs";
const id = "s13-ficha", dur = duracion(id);
const svg = `
  <rect x="90" y="590" width="900" height="840" rx="34" fill="${COL.ink}" stroke="${COL.papel}" stroke-width="9" />
  <rect x="90" y="590" width="900" height="70" rx="34" fill="${COL.verde}" /><rect x="90" y="630" width="900" height="30" fill="${COL.verde}" />
  <text x="140" y="637" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${COL.ink}">FICHA DE CLIENTE</text>
`;
const html = `
  <div class="s13-cab"><div class="s13-av">M</div><div><b>Martina</b><small>clienta desde 2023</small></div></div>
  <div class="s13-fila s13-f1"><span>COMPRÓ</span><b>3 veces · la última en junio</b></div>
  <div class="s13-fila s13-f2"><span>LE PROMETISTE</span><b>reservarle la seña, el lunes</b></div>
  <div class="s13-aviso"><div class="s13-camp"></div><div><span>AVISO · HOY</span><b>Escribirle a Martina</b></div></div>`;
const css = `
  P .s13-cab { position: absolute; left: 140px; top: 700px; display: flex; align-items: center; gap: 30px; }
  P .s13-av { width: 120px; height: 120px; border-radius: 50%; background: ${COL.r}; border: 6px solid ${COL.papel}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: ${COL.ink}; text-align: center; line-height: 108px; }
  P .s13-cab b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 76px; color: ${COL.papel}; line-height: 1; }
  P .s13-cab small { display: block; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: ${COL.papel}; opacity: 0.7; }
  P .s13-fila { position: absolute; left: 140px; width: 800px; padding: 20px 28px; border: 4px solid rgba(255, 246, 224, 0.4); border-radius: 18px; }
  P .s13-fila span { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; color: ${COL.c}; }
  P .s13-fila b { display: block; margin-top: 6px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 44px; color: ${COL.papel}; white-space: nowrap; }
  P .s13-f1 { top: 880px; } P .s13-f2 { top: 1040px; }
  P .s13-aviso { position: absolute; left: 140px; top: 1210px; width: 800px; display: flex; align-items: center; gap: 26px; padding: 22px 28px; border-radius: 18px; background: ${COL.verde}; }
  P .s13-aviso span { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; color: ${COL.ink}; }
  P .s13-aviso b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 50px; color: ${COL.ink}; white-space: nowrap; }
  P .s13-camp { width: 70px; height: 70px; border-radius: 50%; background: ${COL.ink}; flex: none; position: relative; }
  P .s13-camp::after { content: ""; position: absolute; left: 21px; top: 16px; width: 28px; height: 32px; border-radius: 14px 14px 4px 4px; background: ${COL.verde}; }
`;
const js = `
      const CADA = 0, CLI = 0.2, FICHA = 0.81, COMPRO = 1.85, PROM = 2.98, AVISO = 4.11, ESCR = 5.51;
      tl.fromTo(q("svg"), { opacity: 0.4, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0);
      entra(".s13-cab", 0.1, { x: -300 }, 0.3);
      tl.fromTo(q(".s13-av"), { rotation: -20 }, { rotation: 0, duration: 0.4, ease: "back.out(2)", immediateRender: false }, FICHA);
      entra(".s13-f1", COMPRO - 0.15, { x: 900 }, 0.3);
      entra(".s13-f2", PROM - 0.15, { x: 900 }, 0.3);
      pop(".s13-aviso", AVISO, { desde: 0.7 });
      tl.fromTo(q(".s13-camp"), { rotation: -18 }, { rotation: 18, duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, AVISO + 0.2);
      tl.to(q(".s13-aviso"), { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, ESCR);
      sacudon(ESCR + 0.05, 0.5);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.15, sfx: "whoosh-short", vol: 0.22 },
  { t: 1.75, sfx: "click", vol: 0.3 },
  { t: 2.85, sfx: "click", vol: 0.3 },
  { t: 4.1, sfx: "notification", vol: 0.35 },
  { t: 5.5, sfx: "ping", vol: 0.25 },
] });
