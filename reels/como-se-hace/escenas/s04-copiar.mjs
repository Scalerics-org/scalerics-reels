export const css = `
P .s04-cartel { left: 160px; top: 620px; width: 760px; }
P .s04-k { position: absolute; top: 1250px; width: 220px; height: 120px; box-sizing: border-box; background: #f2f1ea; border: 8px solid #121417; border-radius: 18px;
  box-shadow: 0 14px 0 #121417; font-family: "Black Ops One", sans-serif; font-size: 50px; line-height: 104px; text-align: center; color: #121417; white-space: nowrap; }
P .s04-kc { left: 540px; }
P .s04-kv { left: 800px; }`;
export const html = `
<div data-layout-allow-overlap class="fx-cartel s04-cartel"><span class="fx-cadena" style="left:80px"></span><span class="fx-cadena" style="right:80px"></span><small>ESTACIÓN 2</small><b>COPIAR Y PEGAR</b></div>
<div class="s04-k s04-kc">CTRL C</div>
<div class="s04-k s04-kv">CTRL V</div>`;
export const svg = (F) => {
  const I = F.INK;
  const [gl] = F.globo(250, 1290, "2 milanesas", "i", { fs: 28, cls: "s04-gl" });
  return `${F.planilla(520, 850, 500, [["Raúl", "1 pollo"], ["Marta", "papas"], ["", ""]], { nums: 41, cls: "s04-pl", fh: 70 })}
    <g class="s04-nueva"><text x="614" y="1129" font-family="Lexend" font-weight="600" font-size="28" fill="${I}">Sofía</text><text x="804" y="1129" font-family="Lexend" font-weight="600" font-size="28" fill="${I}">2 milan. 21h</text></g>
    <rect class="s04-sel" x="526" y="1082" width="488" height="70" fill="none" stroke="${F.AMA}" stroke-width="7"/>
    <g class="s04-op">${F.operario(290, 1470, 0.72, { cara: "neutra", celular: true })}</g>
    <g class="s04-lupa"><circle cx="323" cy="1219" r="34" fill="${F.AZU2}" fill-opacity="0.35" stroke="${I}" stroke-width="10"/>
      <path d="M350 1196 L384 1166" stroke="${I}" stroke-width="12" stroke-linecap="round"/></g>
    ${gl}`;
};
export const js = `
const COPIAR = 0.91, PEGAR = 1.25, RELOJERO = 2.58, PASA = 3.67, PLANILLA = 4.5;
K.bajar(q(".s04-cartel"), 0.0);
tl.fromTo(q(".s04-op"), { y: 60 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
tl.fromTo(q(".s04-pl"), { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, 0.1);
gsap.set(q(".s04-nueva"), { opacity: 0 });
gsap.set(q(".s04-sel"), { opacity: 0 });
// teclas: caen y se hunden
K.pop(q(".s04-kc"), COPIAR - 0.2);
tl.to(q(".s04-kc"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, COPIAR);
K.pop(q(".s04-kv"), PEGAR - 0.15);
tl.to(q(".s04-kv"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, PEGAR + 0.05);
tl.to(q(".s04-kc"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, 1.9);
tl.to(q(".s04-kv"), { y: 10, duration: 0.08, yoyo: true, repeat: 1 }, 2.15);
// lupa de relojero en el ojo
K.popSvg(q(".s04-lupa"), RELOJERO - 0.3, "323 1219", 0.35, 0.2);
// el pedido vuela del celular a la fila 43
gsap.set(q(".s04-gl"), { opacity: 0 });
tl.fromTo(q(".s04-gl"), { opacity: 1, scale: 0.4, svgOrigin: "290 1320" }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PASA - 0.2);
tl.to(q(".s04-gl"), { x: 420, y: -195, scale: 0.6, duration: 0.45, ease: "power2.inOut", svgOrigin: "290 1320" }, PASA + 0.15);
tl.to(q(".s04-gl"), { opacity: 0, duration: 0.1 }, PLANILLA - 0.15);
tl.to(q(".s04-sel"), { opacity: 1, duration: 0.1 }, PLANILLA - 0.15);
tl.to(q(".s04-nueva"), { opacity: 1, duration: 0.1 }, PLANILLA - 0.1);
K.sacudon(q(".s04-pl"), PLANILLA - 0.1, 0.4);`;
export const sfx = [{ t: 0.05, sfx: "golpe", vol: 0.3, max: 0.6 }, { t: 0.9, sfx: "key-press", vol: 0.4 }, { t: 1.28, sfx: "key-press", vol: 0.4 }, { t: 2.35, sfx: "sparkle", vol: 0.25 }, { t: 3.75, sfx: "whoosh-short", vol: 0.3 }, { t: 4.4, sfx: "click", vol: 0.35 }];
