export const css = `
P .s05-cartel { left: 330px; top: 610px; width: 420px; }
P .s05-cartel b { position: relative; }
P .s05-n { display: inline-block; }
P .s05-k { position: absolute; top: 800px; width: 200px; height: 200px; box-sizing: border-box; background: #f2f1ea; border: 9px solid #121417; border-radius: 28px;
  box-shadow: 0 22px 0 #121417; font-family: "Black Ops One", sans-serif; font-size: 130px; line-height: 180px; text-align: center; color: #121417; }
P .s05-kc { left: 80px; }
P .s05-kv { left: 800px; }`;
export const html = `
<div data-layout-allow-overlap class="fx-cartel s05-cartel"><span class="fx-cadena" style="left:60px"></span><span class="fx-cadena" style="right:60px"></span><small>FILA</small><b><span class="s05-n s05-n1">41</span></b></div>
<div class="s05-k s05-kc">C</div>
<div class="s05-k s05-kv">V</div>`;
export const svg = (F) => `<g class="s05-op">${F.operario(540, 1500, 1.08, { cara: "cansado", celular: true })}</g>`;
export const js = `
const PEGAR = 0.86, CUARENTA = 1.27, TRES = 1.87;
tl.fromTo(q(".s05-op"), { scale: 1.06, transformOrigin: "50% 100%" }, { scale: 1, duration: DUR, ease: "none" }, 0);
K.pop(q(".s05-cartel"), 0.0);
// pistones: C y V se hunden alternados, cada vez más rápido
const golpes = [[".s05-kc", 0.0], [".s05-kv", PEGAR], [".s05-kc", 1.3], [".s05-kv", 1.6], [".s05-kc", 1.85], [".s05-kv", 2.05], [".s05-kc", 2.25], [".s05-kv", 2.45]];
golpes.forEach(([s, t]) => tl.fromTo(q(s), { y: 0 }, { y: 18, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in", immediateRender: false }, t));
K.hablar(".fx-op-boca", 0.0, 3, 0.12);
K.hablar(".fx-op-boca", PEGAR, 2, 0.12);
K.hablar(".fx-op-boca", 1.0, 5, 0.1);
// el número de fila sube
const n = q(".s05-n1");
tl.set(n, { textContent: "42" }, CUARENTA);
tl.fromTo(n, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15, immediateRender: false }, CUARENTA);
tl.set(n, { textContent: "43" }, TRES);
tl.fromTo(n, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15, immediateRender: false }, TRES);
K.sacudon(q(".s05-cartel"), TRES, 0.5);`;
export const sfx = [{ t: 0.02, sfx: "key-press", vol: 0.4 }, { t: 0.86, sfx: "key-press", vol: 0.4 }, { t: 1.3, sfx: "key-press", vol: 0.3 }, { t: 1.6, sfx: "key-press", vol: 0.3 }, { t: 1.87, sfx: "tic", vol: 0.3 }];
