// s06-ravioles: la foto del almuerzo del domingo y, abajo de la mesa, el celular: «Ya está tu pedido».
import { escena, duracion, persona, foto, celular, globo, COL } from "./comun.mjs";
const id = "s06-ravioles", dur = duracion(id);
let cuadros = "";
for (let x = 0; x < 700; x += 50) for (let y = 300; y < 460; y += 50) if (((x + y) / 50) % 2 === 0) cuadros += `<rect x="${x}" y="${y}" width="50" height="50" fill="${COL.rosa}" opacity="0.45" />`;
let rav = "";
[[-60, -10], [-20, -18], [20, -14], [60, -6], [-40, 12], [0, 8], [40, 14]].forEach(([x, y]) => (rav += `<rect x="${360 + x - 16}" y="${350 + y - 12}" width="32" height="26" rx="4" fill="${COL.oro}" stroke="${COL.ink}" stroke-width="3" transform="rotate(${x / 3} ${360 + x} ${350 + y})" />`));
const mesa = `
  <rect width="700" height="460" fill="#5a2a48" />
  <rect x="470" y="40" width="160" height="110" fill="#3a1838" stroke="${COL.ink}" stroke-width="5" />
  ${persona({ id: "s06-abu", x: 120, y: 340, s: 0.6, pelo: "rulos", colPelo: "#c9bcc4", cara: "sonrisa", anteojos: true, ropa: "#8a3a6a" })}
  ${persona({ id: "s06-nene", x: 590, y: 350, s: 0.52, pelo: "jopo", cara: "habla", ropa: COL.oro })}
  ${persona({ id: "s06-mirta", x: 355, y: 330, s: 0.66, pelo: "rulos", cara: "chusma", aros: true, ropa: COL.rosac })}
  <rect x="0" y="300" width="700" height="160" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />${cuadros}
  <ellipse cx="360" cy="352" rx="110" ry="40" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="5" />${rav}
  <path d="M150 360 L150 300 M600 360 L600 300" stroke="${COL.ink}" stroke-width="6" />
`;
const abajo = `
  <rect width="420" height="300" fill="#1c0d24" />
  <rect x="-10" y="0" width="440" height="50" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="5" />
  <path d="M40 300 Q60 160 140 120 L200 130 Q150 200 150 300 Z M380 300 Q360 160 280 120 L220 130 Q270 200 270 300 Z" fill="${COL.rosac}" stroke="${COL.ink}" stroke-width="5" opacity="0.7" />
  <circle cx="210" cy="190" r="120" fill="${COL.blanco}" opacity="0.14" class="s06-luz" />
  ${celular({ id: "s06-cel", x: 210, y: 190, s: 0.62, rot: -8, brillo: false })}
`;
const svg = `
  ${foto({ id: "s06-f1", x: 470, y: 900, w: 700, h: 460, rot: -4, contenido: mesa, hora: "13:30", lugar: "domingo, ravioles" })}
  ${foto({ id: "s06-f2", x: 720, y: 1260, w: 420, h: 300, rot: 7, contenido: abajo, lugar: "abajo de la mesa" })}
  <ellipse class="s06-circ" cx="478" cy="846" rx="92" ry="96" fill="none" stroke="${COL.rojo}" stroke-width="9" transform="rotate(-4 478 846)" />
  <g class="s06-flecha"><path d="M300 1440 Q420 1460 560 1330" fill="none" stroke="${COL.rojo}" stroke-width="12" stroke-linecap="round" /><path d="M528 1322 L566 1324 L556 1362" fill="none" stroke="${COL.rojo}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></g>
`;
const html = globo("s06-g", "Ya está tu pedido", { x: 70, y: 1210, tam: 44 });
const js = `
      const Y = 0, DOM = 0.95, RAV = 1.82, FAM = 2.43, ABAJO = 3.17, MESA = 3.65, YA = 4.52, PED = 4.95;
      cae(".s06-f1", 0.2, { rot: -14, o: "470 900" });
      tl.fromTo(q(".s06-f1-fl"), { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, 0.12);
      flash(0.1, 0.6);
      dibujar(".s06-circ", RAV, 0.4);
      habla(".s06-nene-boca", FAM, 1.2, 0.12);
      pestanea(".s06-abu-ojos", FAM + 0.3);
      // abajo de la mesa
      cae(".s06-f2", ABAJO + 0.1, { rot: 18, o: "720 1260" });
      tl.fromTo(q(".s06-f2-fl"), { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, ABAJO + 0.05);
      flash(ABAJO, 0.55);
      tl.fromTo(q(".s06-luz"), { opacity: 0.1 }, { opacity: 0.28, duration: 0.2, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, MESA);
      pop(".s06-g", YA, { desde: 0.4 });
      dibujar(".s06-flecha path", YA + 0.1, 0.3);
      tl.to(q(".s06-g"), { scale: 1.1, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, PED);
      acerca(".s06-f1", 1.0, DUR - 1.2, 1, 1.04, "470 900");
`;
escena({ id, dur, html, svg, js, sfx: [
  { t: 0.1, sfx: "click", vol: 0.4 },
  { t: 1.82, sfx: "pop", vol: 0.25 },
  { t: 3.17, sfx: "click", vol: 0.4 },
  { t: 3.3, sfx: "whoosh", vol: 0.2 },
  { t: 4.52, sfx: "notification", vol: 0.32 },
] });
