// s07-vicky: la asistente Vicky le saca el celular; forcejeo; se le cae la claqueta; "¡dos muzzarellas!".
import { escena, duracion, beto, vicky, celular, mano, claqueta, noti, COL } from "./comun.mjs";
const id = "s07-vicky", dur = duracion(id);
const svg = `
  ${beto({ id: "s07-beto", x: 260, y: 1560, s: 0.95, cara: "grita" })}
  ${vicky({ id: "s07-vic", x: 820, y: 1560, s: 0.95, cara: "harta" })}
  <g class="s07-tira">${celular({ cls: "s07-cel", x: 540, y: 1170, s: 0.85, rot: 0 })}${mano(455, 1200, 1.1, 90)}${mano(625, 1200, 1.1, -90)}</g>
  <g class="s07-claw">${claqueta({ cls: "s07-cla", x: 800, y: 830, s: 0.55, rot: 8, toma: "16" })}</g>
`;
const html = `
  ${noti("s07-noti", "PEDIDO", "Dos muzzarellas, ¿me las mandás?", { x: 60, y: 600, w: 620, tam: 36 })}
  <div class="tag s07-tag">VICKY · ASISTENTE</div>`;
const css = `P .s07-tag { left: 610px; top: 1150px; font-size: 28px; }`;
const js = `
      const VIC = 0, SAC = 0.33, CEL = 0.84, NO = 1.85, PARA = 2.02, MUZ = 3.06;
      entra(".s07-vic", 0, { x: 500 }, 0.3);
      entra(".s07-claw", 0, { x: 500 }, 0.3);
      pop(".s07-tag", 0.2, { desde: 0.6 });
      habla(".s07-beto-boca", NO - 0.05, 1.8, 0.08, 0.45);
      pop(".s07-tira", SAC, { desde: 0.5, o: "540 1170" });
      // forcejeo
      tl.fromTo(q(".s07-tira"), { x: -40 }, { x: 40, duration: 0.14, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, CEL);
      tl.fromTo(q(".s07-beto"), { rotation: -4, svgOrigin: "0 160" }, { rotation: 4, svgOrigin: "0 160", duration: 0.14, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, CEL);
      tl.fromTo(q(".s07-vic"), { rotation: -4, svgOrigin: "0 160" }, { rotation: 4, svgOrigin: "0 160", duration: 0.14, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, CEL);
      // se le cae la claqueta
      tl.to(q(".s07-claw"), { y: 820, rotation: 140, svgOrigin: "800 830", duration: 0.5, ease: "power2.in" }, PARA - 0.1);
      entra(".s07-noti", MUZ - 0.1, { y: -400 }, 0.28);
      vibrar(".s07-noti", MUZ + 0.2, 0.5, 6);
      sacudon(MUZ, 0.8);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "whoosh-short", vol: 0.25 },
  { t: 0.9, sfx: "murmullo", vol: 0.2, max: 2.5 },
  { t: 2.4, sfx: "golpe", vol: 0.45 },
  { t: 3.0, sfx: "notification", vol: 0.35, max: 0.9 },
] });
