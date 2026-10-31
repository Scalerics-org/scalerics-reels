// s02-pescada: por el visor del paparazzi, el celular de Mirta: chats con clientas, una por una.
import { escena, duracion, COL } from "./comun.mjs";
const id = "s02-pescada", dur = duracion(id);
const chats = [
  ["Graciela", "¿Confirmás tu turno?"],
  ["Susana", "Ya está tu pedido"],
  ["Mónica", "Te recuerdo el pago"],
  ["Beatriz", "Mañana 10 h, ¿venís?"],
  ["Rosario", "¿Venís mañana?"],
  ["Nelly", "Ya está tu tintura"],
];
// visor: esquinas
const c = (x, y, dx, dy) => `<path d="M${x} ${y + dy * 70} L${x} ${y} L${x + dx * 70} ${y}" />`;
const svg = `
  <g class="s02-visor" fill="none" stroke="${COL.blanco}" stroke-width="8" stroke-linecap="round">
    ${c(120, 590, 1, 1)}${c(960, 590, -1, 1)}${c(120, 1530, 1, -1)}${c(960, 1530, -1, -1)}
    <path d="M520 1060 L560 1060 M540 1040 L540 1080" stroke-width="5" opacity="0.6" />
  </g>
  <circle class="s02-rec" cx="166" cy="640" r="14" fill="${COL.rojo}" />
`;
const html = `
  <div class="s02-recl">REC</div>
  <div class="s02-cel">
    <div class="s02-cab">Chats <span class="s02-hora">23:04</span></div>
    ${chats.map(([n, t], i) => `<div class="s02-fila s02-f${i}"><div class="s02-av">${n[0]}</div><div class="s02-tx"><b>${n}</b><span>${t}</span></div><i class="s02-ck s02-ck${i}">✓✓</i></div>`).join("")}
  </div>`;
const css = `
  P .s02-recl { position: absolute; left: 192px; top: 620px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.1em; color: ${COL.blanco}; }
  P .s02-cel { position: absolute; left: 250px; top: 660px; width: 580px; height: 860px; border-radius: 56px; background: ${COL.blanco}; border: 16px solid ${COL.ink}; box-shadow: 0 0 120px rgba(255, 247, 251, 0.25); overflow: hidden; }
  P .s02-cab { height: 110px; padding: 30px 34px 0; background: ${COL.rosa}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: ${COL.ink}; }
  P .s02-hora { float: right; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; margin-top: 8px; }
  P .s02-fila { position: relative; display: flex; align-items: center; gap: 20px; height: 122px; padding: 0 26px; border-bottom: 3px solid ${COL.rosac}; }
  P .s02-av { flex: none; width: 78px; height: 78px; border-radius: 50%; background: ${COL.oro}; border: 4px solid ${COL.ink}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; line-height: 70px; text-align: center; color: ${COL.ink}; }
  P .s02-tx { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  P .s02-tx b { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; color: ${COL.ink}; }
  P .s02-tx span { font-family: "Lexend", sans-serif; font-weight: 500; font-size: 28px; color: #5a3a50; white-space: nowrap; }
  P .s02-ck { position: absolute; right: 22px; top: 22px; font-style: normal; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 26px; letter-spacing: -0.2em; color: ${COL.rosa}; }
`;
const js = `
      const MAND = 0, WHATS = 0.5, CLIENTAS = 1.22, UNA = 2.2, POR = 2.47, UNA2 = 2.74;
      tl.fromTo(q(".s02-cel"), { y: 80, scale: 0.94, opacity: 0.4 }, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s02-visor"), { scale: 1.12, svgOrigin: "540 1060" }, { scale: 1, svgOrigin: "540 1060", duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(qa(".s02-rec, .s02-recl"), { opacity: 1 }, { opacity: 0.2, duration: 0.3, yoyo: true, repeat: 11, ease: "steps(1)", immediateRender: false }, 0);
      const T = [0.15, 0.45, 0.8, 1.22, 1.6, 1.9];
      T.forEach((t, i) => {
        const f = q(".s02-f" + i);
        gsap.set(f, { opacity: 0 });
        tl.fromTo(f, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.22, ease: "power3.out", immediateRender: false }, t);
      });
      // una por una: los tildes se marcan de a uno
      qa(".s02-ck").forEach((el) => gsap.set(el, { opacity: 0 }));
      [UNA - 0.3, UNA - 0.1, UNA, POR, UNA2, UNA2 + 0.25].forEach((t, i) => pop(".s02-ck" + i, t, { desde: 0.2 }));
      [UNA, POR, UNA2].forEach((t) => tl.to(q(".s02-cel"), { scale: 1.03, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t));
      flash(CLIENTAS, 0.55);
      acerca(".s02-cel", 2.0, DUR - 2.0, 1, 1.04);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "click", vol: 0.35 },
  { t: 0.2, sfx: "key-press", vol: 0.25 }, { t: 0.8, sfx: "key-press", vol: 0.25 },
  { t: 1.22, sfx: "click", vol: 0.35 },
  { t: 2.2, sfx: "ping", vol: 0.25 }, { t: 2.47, sfx: "ping", vol: 0.25 }, { t: 2.74, sfx: "ping", vol: 0.28 },
] });
