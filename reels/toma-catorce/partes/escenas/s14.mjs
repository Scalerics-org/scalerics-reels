// s14-cta: "¡Esa va!" la directora feliz; "MANDÁSELO al que no termina una frase SIN MIRAR EL CELULAR".
import { escena, duracion, directora, megafono, claqueta, brillito, COL } from "./comun.mjs";
const id = "s14-cta", dur = duracion(id);
const svg = `
  ${brillito(170, 1240, 1.4, COL.ama, "s14-b")}${brillito(930, 1180, 1.1, COL.blanco, "s14-b")}
  ${directora({ id: "s14-dir", x: 330, y: 1590, s: 0.95, cara: "sonrisa", extra: megafono("s14-mega") })}
  ${claqueta({ cls: "s14-cla", x: 800, y: 1440, s: 0.6, rot: 10, toma: "OK", abierta: 0 })}
`;
const html = `
  <div class="barra s14-esa">¡ESA VA!</div>
  <div class="tit s14-mand">MANDÁSELO</div>
  <div class="tit s14-al">AL QUE NO TERMINA UNA FRASE</div>
  <div class="sello s14-sin">SIN MIRAR EL CELULAR</div>`;
const css = `
  P .s14-esa { left: 260px; top: 590px; font-size: 100px; color: ${COL.ink}; background: ${COL.ama}; transform: rotate(-4deg); }
  P .s14-mand { top: 790px; font-size: 150px; color: ${COL.ama}; text-shadow: 8px 8px 0 ${COL.ink}; }
  P .s14-al { top: 950px; font-size: 56px; color: ${COL.blanco}; text-shadow: 5px 5px 0 ${COL.ink}; }
  P .s14-sin { left: 140px; top: 1050px; font-size: 62px; transform: rotate(-3deg); }
`;
const js = `
      const ESA = 0, MAND = 0.82, AL = 1.24, FRA = 2.04, MIR = 2.57, CEL = 2.84;
      golpe(".s14-esa", 0.1, { desde: 2.4 });
      sacudon(0.12, 1);
      entra(".s14-dir", 0, { y: 300 }, 0.3);
      tl.to(q(".s14-dir"), { y: -40, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out" }, 0.3);
      habla(".s14-dir-boca", 0, 0.6, 0.1, 0.5);
      habla(".s14-dir-boca", MAND - 0.05, 2.4, 0.1, 0.5);
      tl.fromTo(q(".s14-mega"), { rotation: -20, svgOrigin: "40 -180" }, { rotation: 0, svgOrigin: "40 -180", duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.1);
      golpe(".s14-mand", MAND + 0.05, { desde: 2.2 });
      gsap.set(q(".s14-al"), { opacity: 0 });
      tl.fromTo(q(".s14-al"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, AL - 0.05);
      golpe(".s14-sin", MIR, { desde: 2.6 });
      sacudon(MIR + 0.03, 0.8);
      pop(".s14-cla", 0.4, { desde: 0.5, o: "0 0" });
      balancea(".s14-cla", 0.8, DUR - 1.2, 6, 0.4);
      balancea(".s14-b", 0, DUR, 20, 0.35);
      respira(".s14-mand", 1.2, DUR - 1.6, 8, 0.6);
      tl.to(q(".s14-sin"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, CEL + 0.4);
      pestanea(".s14-dir-ojos", 3.8);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 0.3, sfx: "risas", vol: 0.18, max: 2.0 },
  { t: 0.85, sfx: "whoosh", vol: 0.25 },
  { t: 2.55, sfx: "impact-bass-2", vol: 0.38, max: 0.6 },
  { t: 3.3, sfx: "chime", vol: 0.3 },
] });
