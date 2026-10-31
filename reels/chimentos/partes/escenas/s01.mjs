// s01-primicia: la conductora en el escritorio, zócalo gigante ¡PRIMICIA! que tiembla y la foto de Mirta.
import { escena, duracion, persona, foto, celular, destello, COL } from "./comun.mjs";
const id = "s01-primicia", dur = duracion(id);
const mirta = `
  <circle cx="230" cy="250" r="150" fill="${COL.blanco}" opacity="0.10" />
  ${persona({ id: "s01-mirta", x: 180, y: 430, s: 0.85, pelo: "rulos", ruleros: true, cara: "chusma", cuello: "camison", ropa: COL.rosac, aros: true })}
  ${celular({ id: "s01-cel", x: 262, y: 300, s: 0.5, rot: 12, brillo: true })}`;
const svg = `
  ${persona({ id: "s01-con", x: 300, y: 1340, s: 1.15, pelo: "rubia", cara: "grita", pestanas: true, aros: true, ropa: COL.rosa })}
  <g class="s01-mesa"><rect x="40" y="1390" width="1000" height="150" rx="16" fill="${COL.ink}" stroke="${COL.oro}" stroke-width="8" />
    <text x="540" y="1490" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="64" letter-spacing="6" fill="${COL.oro}">PICANTE</text></g>
  ${foto({ id: "s01-foto", x: 760, y: 1090, w: 360, h: 380, rot: 6, contenido: mirta, hora: "23:00", lugar: "Mirta · peluquera" })}
  ${destello(900, 860, 0.9, "s01-dest")}
`;
const html = `
  <div class="barra s01-prim">¡PRIMICIA!</div>
  `;
const css = `
  P .s01-prim { left: 50px; top: 580px; font-size: 142px; color: ${COL.blanco}; background: ${COL.rojo}; transform: rotate(-4deg); }
  
`;
const js = `
      const PRIM = 0.0, PESC = 0.80, MIRTA = 1.70, PELU = 2.50, UNION = 3.13, ONCE = 3.93, NOCHE = 4.55;
      // cuadro 0: conductora y mesa ya están
      tl.fromTo(q(".s01-con"), { scale: 0.92, svgOrigin: "0 160" }, { scale: 1, svgOrigin: "0 160", duration: 0.4, ease: "back.out(2)" }, 0);
      habla(".s01-con-boca", 0, 0.7, 0.08);
      habla(".s01-con-boca", PESC, 3.9, 0.1);
      // ¡PRIMICIA! cae y tiembla todo el rato
      golpe(".s01-prim", 0.12, { desde: 2.4 });
      flash(0.1, 0.9);
      sacudon(0.1, 1.4);
      tiembla(".s01-prim", 0.3, DUR - 0.6, 6, 0.05);
      // la foto de Mirta cae en "Mirta" con flash
      cae(".s01-foto", MIRTA, { rot: -18 });
      tl.fromTo(q(".s01-foto-fl"), { opacity: 0.95 }, { opacity: 0, duration: 0.35, immediateRender: false }, MIRTA + 0.05);
      gsap.set(q(".s01-dest"), { opacity: 0 });
      tl.fromTo(q(".s01-dest"), { opacity: 1, scale: 0.2, rotation: 0, svgOrigin: "900 860" }, { opacity: 0, scale: 1.4, rotation: 45, svgOrigin: "900 860", duration: 0.4, immediateRender: false }, MIRTA);
      flash(PELU + 0.05, 0.5);
      tl.fromTo(q(".s01-foto-fl"), { opacity: 0.8 }, { opacity: 0, duration: 0.3, immediateRender: false }, PELU + 0.05);
      // el celular le ilumina la cara
      tl.fromTo(q(".s01-cel-brillo"), { opacity: 0.08 }, { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, MIRTA + 0.3);
      pestanea(".s01-mirta-ojos", UNION + 0.2);
      // a las once de la noche: la hora late
      tl.to(q(".s01-foto"), { scale: 1.07, svgOrigin: "760 1090", duration: 0.12, yoyo: true, repeat: 1 }, ONCE);
      flash(NOCHE, 0.45);
      acerca(".s01-foto", NOCHE + 0.2, DUR - NOCHE - 0.2, 1, 1.05, "760 1090");
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.12, sfx: "glitch-1", vol: 0.2, max: 0.4 },
  { t: 1.62, sfx: "click", vol: 0.4 },
  { t: 1.7, sfx: "sparkle", vol: 0.25 },
  { t: 2.5, sfx: "click", vol: 0.35 },
  { t: 4.55, sfx: "click", vol: 0.35 },
] });
