// s01-paro: el delegado (post-it amarillo con megáfono) arriba de la caja registradora.
import { escena, duracion, postit, megafono, vincha, caja, pancarta, COL } from "./comun.mjs";
const id = "s01-paro", dur = duracion(id);
const chicos = [
  { id: "s01-m1", x: 190, y: 1250, col: "r", rot: -8 },
  { id: "s01-m2", x: 890, y: 1246, col: "c", rot: 7 },
  { id: "s01-m3", x: 160, y: 1452, col: "c", rot: 5 },
  { id: "s01-m4", x: 920, y: 1450, col: "y", rot: -6 },
];
const svg = `
  ${caja({ id: "s01-caja", x: 540, y: 1520, s: 1.1 })}
  ${chicos.map((c) => postit({ ...c, s: 0.42, cara: "enojado", brazos: "puno" })).join("\n")}
  <g class="s01-ondas" fill="none" stroke="${COL.papel}" stroke-width="9" stroke-linecap="round">
    <path d="M640 712 Q668 748 644 788" /><path d="M680 686 Q722 748 684 814" /><path d="M720 660 Q776 748 724 840" />
  </g>
  ${postit({ id: "s01-del", x: 330, y: 836, s: 1.0, col: "y", cara: "grita", brazos: "puno", piernas: true, extra: vincha() + megafono(150, -40, -20) })}
  ${pancarta({ id: "s01-cartel", x: 800, y: 590, w: 430, h: 190, rot: 6, txt: ["¡PARO!"], tam: 150, palo: 0, col: COL.rojo })}
`;
const html = `<div class="mk s01-razon">y tenemos razón</div>`;
const css = `
  P .s01-razon { left: 520px; top: 870px; font-size: 86px; color: ${COL.y}; transform: rotate(-6deg); }
`;
const js = `
      const POST = 0.18, CAJA = 1.07, ESTAMOS = 1.78, PARO = 2.32, Y = 3.40, RAZON = 3.84;
      // cuadro 0: la caja y el delegado ya están; se cierran de a poco
      tl.fromTo(q(".s01-del"), { scale: 0.9, svgOrigin: "0 200" }, { scale: 1, svgOrigin: "0 200", duration: 0.5, ease: "back.out(2)" }, 0);
      pega(".s01-m1", POST + 0.1, { rot: -14 }); pega(".s01-m2", POST + 0.3, { rot: 12 }); pega(".s01-m3", POST + 0.5, { rot: 10 }); pega(".s01-m4", POST + 0.7, { rot: -12 });
      // los chicos levantan el puño
      ["1", "2", "3", "4"].forEach((n, i) => tl.fromTo(q(".s01-m" + n + "-bd"), { rotation: -12, svgOrigin: "150 20" }, { rotation: 14, svgOrigin: "150 20", duration: 0.22, yoyo: true, repeat: 13, ease: "sine.inOut", immediateRender: false }, CAJA + i * 0.08));
      respira(".s01-m1, .s01-m3", CAJA, 3.4, -10, 0.24);
      respira(".s01-m2, .s01-m4", CAJA + 0.12, 3.3, -10, 0.24);
      // el delegado grita por el megáfono
      habla(".s01-del-boca", 0, 1.3, 0.09);
      habla(".s01-del-boca", ESTAMOS, 0.9, 0.09);
      habla(".s01-del-boca", Y, 1.0, 0.09);
      dibujar(".s01-ondas path", ESTAMOS, 0.25);
      tl.fromTo(q(".s01-ondas"), { opacity: 1 }, { opacity: 0.25, duration: 0.12, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, ESTAMOS + 0.3);
      tl.fromTo(q(".s01-del-bd"), { rotation: 0, svgOrigin: "150 20" }, { rotation: -8, svgOrigin: "150 20", duration: 0.15, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, ESTAMOS);
      // ¡PARO!
      golpe(".s01-cartel", PARO, { desde: 2.6 });
      sacudon(PARO + 0.05, 1.4);
      balancea(".s01-cartel", PARO + 0.3, 2.3, 3, 0.3);
      // y tenemos razón
      tl.to(q(".s01-ondas"), { opacity: 0, duration: 0.1 }, Y - 0.1);
      gsap.set(q(".s01-razon"), { opacity: 0 });
      tl.fromTo(q(".s01-razon"), { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, Y);
      tl.to(q(".s01-razon"), { scale: 1.12, duration: 0.14, yoyo: true, repeat: 1 }, RAZON);
      sacudon(RAZON + 0.05, 0.8);
      tl.to(q(".s01-caja"), { y: -10, duration: 0.08, yoyo: true, repeat: 1 }, PARO);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.1, sfx: "impact-bass-1", vol: 0.35, max: 0.8 },
  { t: 0.3, sfx: "pop", vol: 0.25 }, { t: 0.7, sfx: "pop", vol: 0.25 },
  { t: 1.78, sfx: "glitch-1", vol: 0.2, max: 0.4 },
  { t: 2.3, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
  { t: 3.84, sfx: "click", vol: 0.3 },
] });
