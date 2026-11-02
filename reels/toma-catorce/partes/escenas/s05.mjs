// s05-cierran: toma 15 en el monitor; el celular "en silencio" vibra: "¿A qué hora cierran?"; Beto contesta.
import { escena, duracion, monitor, pizzeria, beto, pizza, mano, noti, globo, COL } from "./comun.mjs";
const id = "s05-cierran", dur = duracion(id);
const W = 900, H = 560;
const cont = pizzeria(W, H, `
  <g class="s05-b1">${beto({ id: "s05-beto", x: 450, y: 570, s: 0.95, cara: "sonrisa" })}</g>
  <g class="s05-b2">${beto({ id: "s05-beto2", x: 450, y: 570, s: 0.95, cara: "sorpresa" })}</g>
  <g class="s05-pz">${pizza(640, 420, 80)}${mano(600, 490, 1.0, -20)}</g>`);
const svg = `
  ${monitor({ cls: "s05-mon", x: 540, y: 920, w: W, h: H, contenido: cont, toma: "15" })}
`;
const html = `
  ${noti("s05-noti", "SEÑORA MARTA", "¿A qué hora cierran?", { x: 70, y: 1250, w: 940, tam: 48 })}
  ${globo("s05-resp", "¡A la medianoche, querida!", { x: 380, y: 1440, w: 620, lado: "der", tam: 40 })}
  <div class="sello s05-sil">¿NO ERA EN SILENCIO?</div>`;
const css = `
  P .s05-sil { left: 60px; top: 1110px; font-size: 52px; transform: rotate(-5deg); color: ${COL.ama}; border-color: ${COL.ama}; }
`;
const js = `
      const HOLA = 0, TE = 1.99, A = 2.78, CIE = 3.07, MED = 4.24;
      tl.fromTo(q(".s05-mon"), { scale: 0.92, svgOrigin: "450 280" }, { scale: 1, svgOrigin: "450 280", duration: 0.3, ease: "back.out(1.6)" }, 0);
      habla(".s05-beto-boca", 0.05, TE + 0.3, 0.09, 0.5);
      respira(".s05-b1", 0, 2.6, 6, 0.3);
      gsap.set(q(".s05-b2"), { opacity: 0 });
      tl.to(q(".s05-b1"), { opacity: 0, duration: 0.05 }, A - 0.2);
      tl.to(q(".s05-b2"), { opacity: 1, duration: 0.05 }, A - 0.2);
      habla(".s05-beto2-boca", MED - 0.05, 1.3, 0.1, 0.5);
      tl.fromTo(q(".s05-mon-rec"), { opacity: 1 }, { opacity: 0.2, duration: 0.4, yoyo: true, repeat: 13, ease: "steps(1)", immediateRender: false }, 0);
      // el celular vibra igual
      entra(".s05-noti", A - 0.3, { y: 500 }, 0.3);
      vibrar(".s05-noti", A, 0.9, 7);
      vibrar(".s05-mon-cont", A, 0.5, 5);
      pop(".s05-sil", CIE + 0.3, { desde: 1.8 });
      pop(".s05-resp", MED, { desde: 0.5, o: "100% 100%" });
      tl.to(q(".s05-pz"), { y: 200, rotation: 30, svgOrigin: "640 420", duration: 0.4, ease: "power2.in" }, A);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 2.45, sfx: "vibra", vol: 0.45 },
  { t: 2.5, sfx: "notification", vol: 0.4, max: 0.9 },
  { t: 3.4, sfx: "impact-bass-1", vol: 0.25, max: 0.5 },
  { t: 4.24, sfx: "pop", vol: 0.3 },
] });
