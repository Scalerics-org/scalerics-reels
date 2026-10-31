// s02-toma: la periodista en vivo; los post-its toman la caja registradora.
import { escena, duracion, postit, caja, persona, COL } from "./comun.mjs";
const id = "s02-toma", dur = duracion(id);
// post-its que se pegan sobre la caja (cara chica)
const P = [
  [560, 1120, "y", -8], [700, 1110, "r", 6], [850, 1130, "c", -4], [620, 1240, "c", 5], [780, 1250, "y", -6],
  [930, 1250, "r", 8], [560, 1370, "r", -5], [720, 1380, "y", 4], [880, 1380, "c", -7], [990, 1150, "y", 10],
];
const caras = ["enojado", "grita", "enojado", "sorpresa", "enojado"];
const svg = `
  ${caja({ id: "s02-caja", x: 760, y: 1500, s: 0.85 })}
  ${P.map(([x, y, col, rot], i) => postit({ id: "s02-p s02-p" + i, x, y, s: 0.36, col, rot, cara: caras[i % 5] })).join("\n")}
  ${persona({ id: "s02-per", x: 250, y: 1360, s: 1.05, pelo: "largo", ropa: COL.c, cara: "habla", extra: `
    <g class="s02-mic"><path d="M120 -40 L150 -150" stroke="${COL.ink}" stroke-width="18" stroke-linecap="round" /><circle cx="156" cy="-172" r="34" fill="${COL.ink}" /><rect x="118" y="-118" width="70" height="44" rx="6" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="5" transform="rotate(14 150 -96)" /><circle cx="110" cy="-30" r="24" fill="#f3c9a0" stroke="${COL.ink}" stroke-width="6" /></g>` })}
`;
const html = `
  <div class="s02-sello">¡INSÓLITO!</div>
  <div class="mk s02-papel">versión papel</div>
  <div class="mk s02-preg">¿reclamos?</div>`;
const css = `
  P .s02-sello { position: absolute; left: 120px; top: 620px; padding: 10px 30px 4px; border: 9px solid ${COL.rojo}; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 104px; letter-spacing: 0.02em; color: ${COL.rojo}; transform: rotate(-7deg); white-space: nowrap; background: rgba(36, 23, 14, 0.5); }
  P .s02-papel { left: 560px; top: 820px; font-size: 80px; color: ${COL.y}; transform: rotate(-5deg); }
  P .s02-preg { left: 470px; top: 760px; font-size: 104px; color: ${COL.papel}; transform: rotate(4deg); }
`;
const js = `
      const INS = 0.0, TOY = 1.17, PAPEL = 1.92, POST = 2.75, TOMARON = 3.17, CAJA = 3.67, REG = 3.92, CUALES = 4.86, RECL = 5.34;
      entra(".s02-per", 0, { x: -500 }, 0.35);
      habla(".s02-per-boca", 0.1, 1.1, 0.09);
      habla(".s02-per-boca", TOY, 1.5, 0.09);
      habla(".s02-per-boca", POST, 1.8, 0.09);
      habla(".s02-per-boca", CUALES, 1.0, 0.09);
      golpe(".s02-sello", 0.25, { desde: 2.4 });
      sacudon(0.2, 1.1);
      tl.to(q(".s02-sello"), { opacity: 0, y: -40, duration: 0.2 }, PAPEL + 0.6);
      // como en Toy Story: los primeros post-its pestañean y miran
      [0, 1, 2].forEach((i) => pega(".s02-p" + i, 0.5 + i * 0.25, { rot: i % 2 ? 12 : -12 }));
      [0, 1, 2].forEach((i) => pestanea(".s02-p" + i + "-ojos", TOY + i * 0.12));
      tl.fromTo(qa(".s02-p0, .s02-p1, .s02-p2"), { y: 0 }, { y: -26, duration: 0.16, yoyo: true, repeat: 3, stagger: 0.07, ease: "power2.out", immediateRender: false }, TOY + 0.3);
      gsap.set(q(".s02-papel"), { opacity: 0 });
      tl.fromTo(q(".s02-papel"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, PAPEL);
      tl.to(q(".s02-papel"), { opacity: 0, duration: 0.2 }, TOMARON - 0.1);
      // tomaron la caja: llueven post-its
      [3, 4, 5, 6, 7, 8, 9].forEach((i, k) => pega(".s02-p" + i, TOMARON + k * 0.1, { rot: k % 2 ? 14 : -14 }));
      sacudon(REG, 1.2);
      tl.to(q(".s02-caja"), { rotation: 2, svgOrigin: "760 1500", duration: 0.08, yoyo: true, repeat: 5 }, REG);
      // el micrófono apunta a los post-its
      tl.to(q(".s02-mic"), { rotation: 18, svgOrigin: "110 -30", duration: 0.3, ease: "back.out(2)" }, CUALES);
      tl.to(q(".s02-per"), { x: 40, duration: 0.3 }, CUALES);
      gsap.set(q(".s02-preg"), { opacity: 0 });
      tl.fromTo(q(".s02-preg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, RECL - 0.05);
      tl.fromTo(qa(".s02-p"), { rotation: 0 }, { rotation: 6, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 5, stagger: 0.02, immediateRender: false }, RECL);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.22, sfx: "impact-bass-2", vol: 0.38, max: 0.6 },
  { t: 1.2, sfx: "sparkle", vol: 0.22 },
  { t: 3.1, sfx: "pop", vol: 0.25 }, { t: 3.4, sfx: "pop", vol: 0.25 }, { t: 3.7, sfx: "pop", vol: 0.25 },
  { t: 3.92, sfx: "impact-bass-1", vol: 0.3, max: 0.6 },
  { t: 5.3, sfx: "click", vol: 0.3 },
] });
