// s10-enfrente: el giro. La panelista saca la otra foto: la de enfrente, dormida a las nueve.
import { escena, duracion, persona, foto, COL } from "./comun.mjs";
const id = "s10-enfrente", dur = duracion(id);
const cuarto = `
  <rect width="560" height="420" fill="#24123a" />
  <rect x="380" y="40" width="140" height="150" fill="#13091f" stroke="${COL.ink}" stroke-width="5" /><circle cx="460" cy="96" r="26" fill="${COL.oro}" /><circle cx="472" cy="88" r="22" fill="#13091f" />
  <rect x="40" y="180" width="440" height="200" rx="34" fill="#4a2350" stroke="${COL.ink}" stroke-width="6" />
  <ellipse cx="200" cy="300" rx="130" ry="50" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="5" />
  ${persona({ id: "s10-ella", x: 200, y: 510, s: 0.9, pelo: "morocha", colPelo: "#6a3a2a", cara: "dormida", cuello: "camison", ropa: COL.oro,
    extra: `<path d="M-74 -258 Q0 -272 74 -258 L70 -222 Q0 -210 -70 -222 Z" fill="${COL.rosa}" stroke="${COL.ink}" stroke-width="5" />` })}
  <path d="M0 360 Q160 330 300 370 Q430 400 560 350 L560 420 L0 420 Z" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" />
  <rect x="400" y="290" width="110" height="64" rx="10" fill="${COL.ink}" stroke="${COL.oro}" stroke-width="4" />
  <text x="455" y="334" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${COL.rojo}">21:00</text>
`;
const svg = `
  ${foto({ id: "s10-foto", x: 650, y: 950, w: 560, h: 420, rot: 5, contenido: cuarto, lugar: "la de enfrente" })}
  ${persona({ id: "s10-aoe", x: 250, y: 1470, s: 0.95, pelo: "morocha", anteojos: true, pestanas: true, aros: true, cara: "chusma", ropa: COL.oro })}
`;
const html = `
  <div class="mk s10-paren">¡paren!</div>
  <div class="mk s10-z s10-z1">z</div><div class="mk s10-z s10-z2">z</div><div class="mk s10-z s10-z3">Z</div>
  <div class="barra s10-21">21:00</div>`;
const css = `
  P .s10-paren { left: 90px; top: 640px; font-size: 130px; color: ${COL.oro}; transform: rotate(-8deg); }
  P .s10-z { font-size: 90px; color: ${COL.blanco}; }
  P .s10-z1 { left: 520px; top: 700px; } P .s10-z2 { left: 580px; top: 640px; font-size: 110px; } P .s10-z3 { left: 650px; top: 570px; font-size: 130px; }
  P .s10-21 { left: 600px; top: 1290px; font-size: 120px; color: ${COL.ink}; background: ${COL.oro}; transform: rotate(-5deg); }
`;
const js = `
      const PAREN = 0, MAS = 0.52, TENGO = 1.25, FOTO = 1.48, ENF = 2.0, SE = 3.13, DORMIR = 3.30, NUEVE = 3.83;
      entra(".s10-aoe", 0, { x: -500 }, 0.3);
      habla(".s10-aoe-boca", 0, DUR - 0.3, 0.11, 0.4);
      gsap.set(q(".s10-paren"), { opacity: 0 });
      tl.fromTo(q(".s10-paren"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, 0.05);
      tl.to(q(".s10-paren"), { opacity: 0, duration: 0.2 }, FOTO - 0.1);
      cae(".s10-foto", FOTO, { rot: 20, o: "650 950" });
      tl.fromTo(q(".s10-foto-fl"), { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, FOTO);
      flash(FOTO, 0.6);
      tl.to(q(".s10-foto"), { scale: 1.06, svgOrigin: "650 950", duration: 0.12, yoyo: true, repeat: 1 }, ENF);
      qa(".s10-z").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        tl.fromTo(z, { opacity: 0, y: 30 }, { opacity: 1, y: -20, duration: 0.5, ease: "sine.out", immediateRender: false }, DORMIR + i * 0.18);
      });
      golpe(".s10-21", NUEVE, { desde: 2.4 });
      sacudon(NUEVE + 0.03, 1);
      acerca(".s10-foto", ENF + 0.3, DUR - ENF - 0.5, 1, 1.04, "650 950");
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "click-soft", vol: 0.3 },
  { t: 1.4, sfx: "click", vol: 0.4 },
  { t: 3.3, sfx: "sparkle", vol: 0.22 },
  { t: 3.83, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
] });
