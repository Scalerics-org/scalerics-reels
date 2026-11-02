export const css = `
P .s15-t { font-size: 28px; padding: 8px 18px 6px; }
P .s15-t1 { left: 820px; top: 600px; }
P .s15-t2 { left: 820px; top: 930px; }
P .s15-t3 { left: 820px; top: 1180px; }`;
export const html = `
<div class="fx-tag verde s15-t s15-t1">SOLO</div>
<div class="fx-tag verde s15-t s15-t2">SOLO</div>
<div class="fx-tag verde s15-t s15-t3">SOLO</div>`;
export const svg = (F) => {
  const I = F.INK;
  const ok = (cx, cy, cls) => `<g class="${cls}"><circle cx="${cx}" cy="${cy}" r="34" fill="${F.VER}" stroke="${I}" stroke-width="6"/><path d="M${cx - 16} ${cy} l11 12 l22 -24" fill="none" stroke="${I}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const [b1] = F.globo(50, 700, "2 milanesas", "i", { fs: 34, cls: "s15-b1" });
  const [b2] = F.globo(700, 990, "Tu pedido está listo", "d", { fs: 34, cls: "s15-b2" });
  return `${b1}
    <path class="s15-fl" d="M330 740 L450 740" stroke="${F.VER}" stroke-width="10" stroke-linecap="round" stroke-dasharray="18 14"/>
    ${F.planilla(470, 650, 370, [["Raúl", "pollo"], ["", ""]], { nums: 43, fh: 62, cols: [0.5, 0.5], cls: "s15-pl" })}
    <g class="s15-fila"><text x="564" y="815" font-family="Lexend" font-weight="600" font-size="26" fill="${I}">Sofía</text><text x="709" y="815" font-family="Lexend" font-weight="600" font-size="26" fill="${I}">2 mil.</text></g>
    ${ok(900, 700, "s15-ok1")}
    ${F.engranaje(160, 1030, 70, 9, { cls: "s15-e1", fill: F.VER, linea: "#2f7a0a" })}
    ${b2}
    ${ok(900, 1030, "s15-ok2")}
    <g class="s15-cel">${F.celular(250, 1150, 400, 320, "s15-clip", F.ACE)}
      <g clip-path="url(#s15-clip)">
        <text x="450" y="1222" text-anchor="middle" font-family="Black Ops One" font-size="44" fill="${F.HUE}">23:00</text>
        <g class="s15-not"><rect x="275" y="1250" width="350" height="150" rx="22" fill="${F.HUE}" stroke="${I}" stroke-width="5"/>
          <rect x="297" y="1272" width="44" height="44" rx="10" fill="${F.VER}" stroke="${I}" stroke-width="4"/>
          <text x="356" y="1305" font-family="Lexend" font-weight="700" font-size="28" fill="${I}">Reporte del día</text>
          <text x="297" y="1352" font-family="Lexend" font-weight="600" font-size="22" fill="${F.ACE2}">pedidos, ventas</text>
          <text x="297" y="1382" font-family="Lexend" font-weight="600" font-size="22" fill="${F.ACE2}">y stock</text></g>
      </g>${F.celularBorde(250, 1150, 400, 320)}</g>
    ${ok(900, 1290, "s15-ok3")}`;
};
export const js = `
const PASA = 1.29, PLANILLA = 2.08, AVISO = 3.04, SALE = 4.14, SOLO2 = 4.43, REPORTE = 5.3, CELULAR = 6.87;
K.girar(".s15-e1", 0, DUR, 420);
// 1: el pedido pasa solo a la planilla
K.popSvg(q(".s15-b1"), 0.05, "200 735", 0.3, 0.5);
K.pop(q(".s15-pl"), 0.15);
gsap.set(q(".s15-fila"), { opacity: 0 });
K.dibujar(q(".s15-fl"), PASA - 0.2, 0.3);
tl.to(q(".s15-b1"), { x: 450, y: 60, scale: 0.4, opacity: 0, duration: 0.5, ease: "power2.in", svgOrigin: "200 735" }, PASA);
tl.to(q(".s15-fila"), { opacity: 1, duration: 0.1 }, PLANILLA - 0.3);
K.popSvg(q(".s15-ok1"), PLANILLA - 0.2, "900 700", 0.35, 0.3);
K.pop(q(".s15-t1"), PLANILLA);
// 2: el aviso sale solo
K.popSvg(q(".s15-b2"), AVISO - 0.1, "500 1030", 0.35, 0.4);
tl.fromTo(q(".s15-b2"), { x: 0 }, { x: 20, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, SALE);
K.popSvg(q(".s15-ok2"), SOLO2 - 0.1, "900 1030", 0.35, 0.3);
K.pop(q(".s15-t2"), SOLO2);
// 3: el reporte del día llega al celular
K.pop(q(".s15-cel"), REPORTE - 0.5);
gsap.set(q(".s15-not"), { opacity: 0 });
tl.fromTo(q(".s15-not"), { opacity: 1, y: -180 }, { y: 0, duration: 0.4, ease: "back.out(1.5)", immediateRender: false }, REPORTE + 0.1);
K.sacudon(q(".s15-cel"), REPORTE + 0.5, 0.5);
K.popSvg(q(".s15-ok3"), CELULAR - 0.1, "900 1290", 0.35, 0.3);
K.pop(q(".s15-t3"), CELULAR);`;
export const sfx = [{ t: 0.05, sfx: "pop", vol: 0.3 }, { t: 1.3, sfx: "whoosh-short", vol: 0.3 }, { t: 1.9, sfx: "correcta", vol: 0.25, max: 0.8 }, { t: 2.95, sfx: "pop", vol: 0.3 }, { t: 4.35, sfx: "correcta", vol: 0.25, max: 0.8 }, { t: 5.4, sfx: "notification", vol: 0.35 }, { t: 6.8, sfx: "correcta", vol: 0.25, max: 0.8 }];
