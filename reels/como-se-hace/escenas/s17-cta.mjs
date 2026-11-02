export const css = `
P .s17-m { left: 0; right: 0; top: 620px; font-size: 140px; }
P .s17-a { left: 0; right: 0; top: 790px; font-size: 58px; }
P .s17-f { left: 0; right: 0; top: 870px; font-size: 84px; }
P .s17-pil { position: absolute; left: 160px; top: 1010px; width: 760px; height: 110px; box-sizing: border-box; background: #121417; border: 6px solid #5ce611; border-radius: 55px;
  font-family: "Lexend", sans-serif; font-weight: 700; font-size: 46px; line-height: 98px; color: #f2f1ea; padding-left: 40px; white-space: nowrap; box-shadow: 8px 8px 0 rgba(0,0,0,0.5); }
P .s17-pil span { color: #5ce611; }
P .s17-pil i { display: inline-block; width: 6px; height: 50px; background: #b8ff7a; vertical-align: -8px; margin-left: 6px; }`;
export const html = `
<div class="fx-titulo verde s17-m">MANDÁSELO</div>
<div class="fx-titulo hueso s17-a">AL QUE ES</div>
<div class="fx-titulo s17-f">LA FÁBRICA ENTERA</div>
<div class="s17-pil"><span>Enviar a:</span> el operario<i class="s17-cur"></i></div>`;
export const svg = (F) => `<g class="s17-op">${F.operario(540, 1480, 0.6, { cara: "feliz", parche: "GUSTAVO", mate: true })}</g>
  ${F.engranaje(150, 1360, 80, 9, { cls: "s17-e1", fill: F.VER, linea: "#2f7a0a" })}${F.engranaje(930, 1360, 80, 9, { cls: "s17-e2", fill: F.VER, linea: "#2f7a0a" })}`;
export const js = `
const AL = 0.53, FABRICA = 0.79, ENTERA = 1.22;
K.sello(q(".s17-m"), 0.1, -2);
K.pop(q(".s17-a"), AL - 0.1);
K.sello(q(".s17-f"), ENTERA - 0.1, 0);
K.pop(q(".s17-pil"), ENTERA + 0.4);
tl.fromTo(q(".s17-cur"), { opacity: 1 }, { opacity: 0, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, ENTERA + 0.6);
tl.fromTo(q(".s17-op"), { y: 200 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, 0.15);
K.flotar(q(".s17-op"), 0.8, DUR - 1.2, 8, 1.2);
K.girar(".s17-e1", 0, DUR, 200);
K.girar(".s17-e2", 0, DUR, -200);
tl.to(q(".s17-pil"), { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.6);`;
export const sfx = [{ t: 0.1, sfx: "impact-bass-1", vol: 0.35, max: 0.8 }, { t: 1.15, sfx: "golpe", vol: 0.3, max: 0.6 }, { t: 1.6, sfx: "pop", vol: 0.3 }, { t: 2.6, sfx: "ping", vol: 0.25 }];
