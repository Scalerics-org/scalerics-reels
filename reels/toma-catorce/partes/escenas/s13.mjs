// s13-toma17: claqueta TOMA 17 "LA BUENA", clac en "¡Acción!", y en el monitor Beto dice la frase entera;
// "aunque yo esté filmando": en el mostrador su celular se contesta solo (verde) y Beto guiña.
import { escena, duracion, claqueta, monitor, pizzeria, beto, pizza, mano, celular, brillito, COL } from "./comun.mjs";
const id = "s13-toma17", dur = duracion(id);
const W = 900, H = 600;
const cont = pizzeria(W, H, `
  <g class="s13-b1">${beto({ id: "s13-beto", x: 420, y: 600, s: 1.0, cara: "sonrisa" })}</g>
  <g class="s13-b2">${beto({ id: "s13-beto2", x: 420, y: 600, s: 1.0, cara: "guiño" })}</g>
  <g class="s13-pz">${pizza(610, 430, 86)}${mano(570, 500, 1.1, -20)}</g>
  <g class="s13-celm">${celular({ cls: "s13-cel", x: 770, y: 400, s: 0.42, rot: -8 })}</g>`);
const svg = `
  <g class="s13-claw">${claqueta({ cls: "s13-cla", x: 540, y: 920, s: 1.25, rot: -3, toma: "17", viejo: "16" })}</g>
  <g class="s13-monw">${monitor({ cls: "s13-mon", x: 540, y: 960, w: W, h: H, contenido: cont, toma: "17" })}</g>
  ${brillito(150, 1360, 1.2, COL.ama, "s13-b")}${brillito(950, 1330, 1.0, COL.ama, "s13-b")}
`;
const html = `
  <div class="sello s13-buena">LA BUENA</div>
  <div class="s13-auto">Respondido por tu agente ✓✓</div>`;
const css = `
  P .s13-buena { left: 330px; top: 1170px; font-size: 92px; color: ${COL.ama}; border-color: ${COL.ama}; transform: rotate(-6deg); }
  P .s13-auto { position: absolute; left: 500px; top: 1290px; padding: 14px 22px 12px; background: ${COL.ink}; border: 5px solid ${COL.verde}; border-radius: 24px 24px 6px 24px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: ${COL.verde}; white-space: nowrap; }
`;
const js = `
      const TOMA = 0, DIE = 0.18, LA = 1.22, BUE = 1.34, ACC = 2.00, EN = 2.97, ATE = 3.95, CASA = 4.57, AUN = 5.31, FIL = 5.74;
      tl.fromTo(q(".s13-claw"), { scale: 0.9, svgOrigin: "540 920" }, { scale: 1, svgOrigin: "540 920", duration: 0.3, ease: "back.out(2)" }, 0);
      dibujar(".s13-cla-tacha", 0.05, 0.2);
      gsap.set(q(".s13-cla-num"), { opacity: 0 });
      tl.fromTo(q(".s13-cla-num"), { opacity: 0, scale: 1.8, svgOrigin: "150 110" }, { opacity: 1, scale: 1, svgOrigin: "150 110", duration: 0.2, ease: "power4.in", immediateRender: false }, DIE);
      golpe(".s13-buena", BUE, { desde: 2.4 });
      clac(".s13-cla-barra", ACC + 0.05, 24);
      flash(ACC + 0.05, 0.8);
      sacudon(ACC + 0.06, 1.2);
      tl.to(q(".s13-claw"), { y: -900, opacity: 0, duration: 0.35, ease: "power3.in" }, ACC + 0.35);
      tl.to(q(".s13-buena"), { opacity: 0, duration: 0.2 }, ACC + 0.35);
      // el monitor: la toma buena
      gsap.set(q(".s13-monw"), { opacity: 0 });
      tl.fromTo(q(".s13-monw"), { opacity: 0, scale: 0.85, svgOrigin: "540 960" }, { opacity: 1, scale: 1, svgOrigin: "540 960", duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, ACC + 0.55);
      habla(".s13-beto-boca", EN - 0.05, CASA - EN + 0.4, 0.1, 0.5);
      habla(".s13-beto-boca", AUN - 0.05, 0.4, 0.1, 0.5);
      tl.to(q(".s13-pz"), { y: -24, rotation: 6, svgOrigin: "610 430", duration: 0.2, yoyo: true, repeat: 3 }, ATE);
      pop(".s13-b", CASA, { desde: 0.2, o: "0 0" });
      balancea(".s13-b", CASA, DUR - CASA, 20, 0.3);
      // se contesta solo
      vibrar(".s13-celm", AUN - 0.2, 0.4, 4);
      pop(".s13-auto", AUN + 0.1, { desde: 0.5, o: "100% 100%" });
      gsap.set(q(".s13-b2"), { opacity: 0 });
      tl.to(q(".s13-b1"), { opacity: 0, duration: 0.03 }, FIL + 0.15);
      tl.to(q(".s13-b2"), { opacity: 1, duration: 0.03 }, FIL + 0.15);
      tl.fromTo(q(".s13-mon-rec"), { opacity: 1 }, { opacity: 0.2, duration: 0.4, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, ACC + 0.6);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.15, sfx: "tiza", vol: 0.3 },
  { t: 1.3, sfx: "impact-bass-1", vol: 0.35, max: 0.6 },
  { t: 2.05, sfx: "claqueta", vol: 0.6 },
  { t: 4.57, sfx: "sparkle", vol: 0.3 },
  { t: 5.35, sfx: "ping", vol: 0.3 },
] });
