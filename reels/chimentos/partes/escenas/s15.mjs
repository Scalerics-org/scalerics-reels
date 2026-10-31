// s15-cta: la conductora cierra: "Mandáselo a tu peluquera. Que se entere por acá."
import { escena, duracion, persona, brillito, COL } from "./comun.mjs";
const id = "s15-cta", dur = duracion(id);
const svg = `
  ${brillito(150, 1150, 1.4, COL.oro, "s15-b")}${brillito(940, 1220, 1.1, COL.rosa, "s15-b")}
  ${persona({ id: "s15-con", x: 540, y: 1470, s: 1.0, pelo: "rubia", pestanas: true, aros: true, cara: "habla", ropa: COL.rosa })}
  <g transform="translate(860 1040) rotate(-18)"><g class="s15-avion">
    <path d="M-70 0 L80 -50 L20 60 L0 14 Z" fill="${COL.blanco}" stroke="${COL.ink}" stroke-width="6" stroke-linejoin="round" />
    <path d="M0 14 L80 -50 L-14 30 Z" fill="${COL.rosac}" stroke="${COL.ink}" stroke-width="5" stroke-linejoin="round" />
  </g></g>
`;
const html = `
  <div class="tit s15-mand">MANDÁSELO</div>
  <div class="tit s15-pelu">A TU PELUQUERA</div>
  <div class="sello s15-ent">QUE SE ENTERE POR ACÁ</div>`;
const css = `
  P .s15-mand { top: 590px; font-size: 150px; color: ${COL.rosa}; text-shadow: 8px 8px 0 ${COL.ink}; }
  P .s15-pelu { top: 750px; font-size: 92px; color: ${COL.blanco}; text-shadow: 6px 6px 0 ${COL.ink}; }
  P .s15-ent { left: 120px; top: 885px; font-size: 54px; transform: rotate(-4deg); color: ${COL.oro}; border-color: ${COL.oro}; }
`;
const js = `
      const MAND = 0, PELU = 0.73, QUE = 1.28, ENT = 1.91, ACA = 2.46;
      tl.fromTo(q(".s15-con"), { y: 60 }, { y: 0, duration: 0.35, ease: "back.out(2)" }, 0);
      habla(".s15-con-boca", 0, 1.1, 0.1, 0.5);
      habla(".s15-con-boca", QUE, 1.5, 0.1, 0.5);
      golpe(".s15-mand", 0.1, { desde: 2.2 });
      sacudon(0.12, 1);
      gsap.set(q(".s15-pelu"), { opacity: 0 });
      tl.fromTo(q(".s15-pelu"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PELU - 0.05);
      golpe(".s15-ent", ENT, { desde: 2.6 });
      sacudon(ENT + 0.03, 0.8);
      gsap.set(q(".s15-avion"), { opacity: 0 });
      tl.fromTo(q(".s15-avion"), { opacity: 1, x: -500, y: 200 }, { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, PELU);
      tl.to(q(".s15-avion"), { y: -20, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, PELU + 0.6);
      pestanea(".s15-con-ojos", ACA + 0.4);
      pestanea(".s15-con-ojos", ACA + 2.0);
      balancea(".s15-b", 0, DUR, 20, 0.35);
      respira(".s15-mand", 1.0, DUR - 1.4, 8, 0.6);
      tl.to(q(".s15-ent"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, ACA);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 0.73, sfx: "whoosh", vol: 0.25 },
  { t: 1.9, sfx: "impact-bass-2", vol: 0.38, max: 0.6 },
  { t: 2.46, sfx: "chime", vol: 0.3 },
] });
