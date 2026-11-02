export const css = `
P .s10-hora { left: 0; right: 0; top: 1200px; font-size: 150px; }
P .s10-extra { left: 270px; top: 980px; font-size: 76px; }`;
export const html = `
<div class="fx-titulo rojo s10-hora">23:00</div>
<div class="fx-sello s10-extra">HORAS EXTRA</div>`;
export const svg = (F) => F.reloj(540, 900, 220, 23, 0, { cls: "s10-rj" });
export const js = `
const NOCHE = 0.75, TERMINA = 1.92;
gsap.set(q(".fx-rj-h"), { rotation: 330, svgOrigin: "540 900" });
gsap.set(q(".fx-rj-m"), { rotation: 0, svgOrigin: "540 900" });
tl.fromTo(q(".s10-rj"), { scale: 1.25, opacity: 0.6, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
// la aguja tiembla en las doce
tl.fromTo(q(".fx-rj-m"), { rotation: 0 }, { rotation: 6, duration: 0.08, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, 0.4);
K.pop(q(".s10-hora"), NOCHE - 0.2);
tl.fromTo(q(".s10-hora"), { opacity: 1 }, { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 3, ease: "steps(1)", immediateRender: false }, NOCHE + 0.3);
K.sello(q(".s10-extra"), TERMINA, -12);
K.sacudon(q(".s10-rj"), TERMINA + 0.02, 0.8);`;
export const sfx = [{ t: 0.0, sfx: "tic", vol: 0.4 }, { t: 0.5, sfx: "tic", vol: 0.3 }, { t: 1.0, sfx: "tic", vol: 0.3 }, { t: 1.9, sfx: "golpe", vol: 0.35, max: 0.6 }];
