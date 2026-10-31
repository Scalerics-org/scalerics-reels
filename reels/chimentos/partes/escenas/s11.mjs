// s11-solos: en la mesita de luz de la de enfrente, el celular manda los avisos solo mientras ella duerme.
import { escena, duracion, persona, celular, globo, COL } from "./comun.mjs";
const id = "s11-solos", dur = duracion(id);
const svg = `
  <rect x="560" y="1300" width="420" height="260" rx="16" fill="#5a2a48" stroke="${COL.ink}" stroke-width="7" />
  <path d="M600 1380 H940" stroke="${COL.ink}" stroke-width="5" /><circle cx="770" cy="1430" r="12" fill="${COL.oro}" stroke="${COL.ink}" stroke-width="4" />
  ${celular({ id: "s11-cel", x: 770, y: 1180, s: 0.95, rot: -6, pantalla: `<rect x="-58" y="-112" width="116" height="40" fill="${COL.rosa}" /><path d="M-30 -10 L-6 14 L34 -30" fill="none" stroke="${COL.rosa}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" class="s11-tick" />` })}
  <g class="s11-ella">
    <ellipse cx="250" cy="1295" rx="200" ry="70" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
    ${persona({ id: "s11-dor", x: 250, y: 1495, s: 0.9, pelo: "morocha", colPelo: "#6a3a2a", cara: "dormida", cuello: "camison", ropa: COL.oro,
      extra: `<path d="M-74 -258 Q0 -272 74 -258 L70 -222 Q0 -210 -70 -222 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" />` })}
    <path d="M20 1440 Q200 1400 360 1450 Q460 1480 540 1440 L540 1570 L20 1570 Z" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
  </g>
`;
const html = `
  ${globo("s11-g s11-g0", "Recordatorio: tu turno es mañana a las 10", { x: 120, y: 600, w: 640, tam: 36 })}
  ${globo("s11-g s11-g1", "Tu pedido ya está listo", { x: 380, y: 760, tam: 38 })}
  ${globo("s11-g s11-g2", "Te recordamos tu pago", { x: 150, y: 890, tam: 38 })}
  <div class="barra s11-solos">¡SOLOS!</div>
  <div class="mk s11-z">zzz</div>`;
const css = `
  P .s11-solos { left: 560px; top: 1010px; font-size: 92px; color: ${COL.ink}; background: ${COL.oro}; transform: rotate(-6deg); }
  P .s11-z { left: 120px; top: 1080px; font-size: 90px; color: ${COL.blanco}; }
`;
const js = `
      const Y = 0, REC = 0.14, AVI = 1.10, LE = 1.90, SOLOS = 2.32;
      tl.fromTo(q(".s11-cel"), { y: 30, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      const G = qa(".s11-g");
      [REC + 0.1, AVI, LE].forEach((t, i) => {
        gsap.set(G[i], { opacity: 0 });
        tl.fromTo(G[i], { opacity: 0, scale: 0.3, x: 200, y: 300 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
        tl.to(q(".s11-cel"), { rotation: 3, svgOrigin: "0 0", duration: 0.06, yoyo: true, repeat: 3 }, t);
      });
      dibujar(".s11-tick", REC + 0.1, 0.3);
      golpe(".s11-solos", SOLOS, { desde: 2.4 });
      respira(".s11-ella", 0, DUR, 6, 0.8);
      gsap.set(q(".s11-z"), { opacity: 0 });
      tl.fromTo(q(".s11-z"), { opacity: 0, y: 20 }, { opacity: 1, y: -30, duration: 1.2, ease: "sine.out", immediateRender: false }, 0.3);
      tl.to(G, { y: -10, duration: 0.3, yoyo: true, repeat: 3, stagger: 0.1, ease: "sine.inOut" }, SOLOS + 0.1);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.24, sfx: "notification", vol: 0.28 },
  { t: 1.1, sfx: "notification", vol: 0.28 },
  { t: 1.9, sfx: "notification", vol: 0.28 },
  { t: 2.32, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
] });
