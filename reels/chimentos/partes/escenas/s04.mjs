// s04-camison: la foto escandalosa: Mirta en camisón en la cama, "¿Confirmás tu turno de mañana?" x40.
import { escena, duracion, persona, foto, celular, globo, COL } from "./comun.mjs";
const id = "s04-camison", dur = duracion(id);
const W = 760, H = 560;
const cont = `
  <rect x="40" y="40" width="180" height="200" fill="#1c0d24" stroke="${COL.ink}" stroke-width="6" />
  <path d="M130 40 V240 M40 140 H220" stroke="${COL.ink}" stroke-width="6" />
  <circle cx="170" cy="90" r="30" fill="${COL.oro}" /><circle cx="184" cy="82" r="26" fill="#1c0d24" />
  <rect x="250" y="120" width="460" height="300" rx="40" fill="#4a2350" stroke="${COL.ink}" stroke-width="7" />
  <circle cx="420" cy="300" r="190" fill="${COL.blanco}" opacity="0.10" class="s04-luz" />
  ${persona({ id: "s04-mirta", x: 420, y: 700, s: 1.15, pelo: "rulos", ruleros: true, cara: "chusma", cuello: "camison", ropa: COL.rosac })}
  ${celular({ id: "s04-cel", x: 560, y: 470, s: 0.62, rot: 14, brillo: false })}
  <path d="M0 520 Q200 470 380 540 Q560 600 760 520 L760 560 L0 560 Z" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
`;
const svg = `
  ${foto({ id: "s04-foto", x: 540, y: 1000, w: W, h: H, rot: -3, contenido: cont, hora: "23:47", lugar: "en camisón" })}
  <ellipse class="s04-circ" cx="728" cy="1180" rx="88" ry="118" fill="none" stroke="${COL.rojo}" stroke-width="10" transform="rotate(12 728 1180)" />
`;
const pos = [[70, 715], [560, 840], [70, 965], [560, 715], [70, 840], [560, 965], [70, 1090], [560, 1090]];
const html = `
  <div class="sello s04-ex">EXCLUSIVO</div>
  ${pos.map(([x, y], i) => globo("s04-g s04-g" + i, "¿Confirmás tu turno de mañana?", { x, y, w: 430, tam: 32 })).join("")}
  <div class="barra s04-x40">x40</div>`;
const css = `
  P .s04-ex { left: 640px; top: 540px; font-size: 54px; transform: rotate(10deg); }
  P .s04-x40 { left: 640px; top: 1250px; font-size: 150px; color: ${COL.ink}; background: ${COL.oro}; transform: rotate(-6deg); }
`;
const js = `
      const MIREN = 0, ESTA = 0.35, FOTO = 0.61, MIRTA = 1.86, CAMISON = 2.69, CONF = 3.30, TURNO = 4.61, MANANA = 5.04, CUAR = 5.48, VECES = 6.61;
      cae(".s04-foto", ESTA, { rot: 14, o: "540 1000" });
      tl.fromTo(q(".s04-foto-fl"), { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, FOTO);
      flash(FOTO, 0.7);
      acerca(".s04-foto", FOTO + 0.3, DUR - FOTO - 0.5, 1, 1.06, "540 1000");
      golpe(".s04-ex", MIRTA, { desde: 2.6 });
      sacudon(MIRTA + 0.03, 1);
      tl.fromTo(q(".s04-luz"), { opacity: 0.1 }, { opacity: 0.22, duration: 0.25, yoyo: true, repeat: 23, ease: "sine.inOut", immediateRender: false }, 1.0);
      // círculo rojo sobre el celular
      dibujar(".s04-circ", CAMISON, 0.45);
      pestanea(".s04-mirta-ojos", CAMISON + 0.4);
      // los globos se multiplican
      const G = qa(".s04-g");
      const T = [CONF, TURNO, MANANA, CUAR - 0.2, CUAR, CUAR + 0.2, CUAR + 0.4, CUAR + 0.6];
      G.forEach((g, i) => {
        gsap.set(g, { opacity: 0 });
        tl.fromTo(g, { opacity: 0, scale: 0.5, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, T[i]);
      });
      golpe(".s04-x40", CUAR + 0.05, { desde: 2.6 });
      sacudon(CUAR + 0.08, 1.3);
      tl.to(q(".s04-x40"), { scale: 1.15, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 }, VECES);
      tl.to(G, { y: -14, duration: 0.2, yoyo: true, repeat: 3, stagger: 0.04, ease: "sine.inOut" }, VECES);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.25, sfx: "whoosh", vol: 0.25 },
  { t: 0.61, sfx: "click", vol: 0.4 },
  { t: 1.8, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 3.3, sfx: "notification", vol: 0.3 },
  { t: 4.61, sfx: "notification", vol: 0.25 },
  { t: 5.3, sfx: "ping", vol: 0.25 },
  { t: 5.5, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
] });
