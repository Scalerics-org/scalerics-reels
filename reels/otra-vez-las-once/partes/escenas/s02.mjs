import { radio } from "./pj.mjs";
export const ID = "s02-radio";
export const CSS = `
  $ .s02-once { top: 600px; font-size: 92px; color: #ffb84d; text-shadow: 0 0 40px rgba(255,184,77,0.45); }
  $ .s02-sello { left: 300px; top: 740px; transform: rotate(-4deg); }
  $ .s02-arriba { top: 1290px; font-size: 96px; }
`;
const B = [
  [90, 1180, "¿Tenés?"], [700, 1150, "Quiero 2"], [130, 860, "¿Hacen envío?"], [690, 860, "Hola!!"], [380, 1210, "¿Abren?"],
];
export const HTML = `
        <div class="txt s02-once">¡Once en punto!</div>
        <div class="sello s02-sello">Radio AM · Montevideo</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s02-ondas">
            <path class="yl s02-onda" d="M300 900 C250 940 250 1000 300 1040" />
            <path class="yl s02-onda" d="M250 860 C170 920 170 1020 250 1080" />
            <path class="yl s02-onda" d="M780 900 C830 940 830 1000 780 1040" />
            <path class="yl s02-onda" d="M830 860 C910 920 910 1020 830 1080" />
          </g>
          <g transform="translate(250 860) scale(0.71)"><g class="s02-radio">${radio("s02", ["23:00"])}</g></g>
        </svg>
        ${B.map(([x, y, t], i) => `<div class="burb s02-b s02-b${i}" style="left:${x}px; top:${y}px; background:#f4efe4; color:#050b18; border-radius:8px 28px 28px 28px;">${t}</div>`).join("")}
        <div class="txt s02-arriba">¡Arriba!</div>
`;
export const JS = `
      const MVD = 1.0, ARRIBA = 1.5, PEDIDOS = 3.3;
      tl.fromTo(ESC, { scale: 1.12 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      golpe(".s02-once", 0.08, 2.4);
      sacudon(0.06, 1.4);
      // el despertador vibra
      tl.fromTo(q(".s02-radio"), { rotation: -3, svgOrigin: "410 200" }, { rotation: 3, svgOrigin: "410 200", duration: 0.06, yoyo: true, repeat: 23, ease: "none", immediateRender: false }, 0);
      tl.to(q(".s02-radio"), { rotation: 0, svgOrigin: "410 200", duration: 0.1 }, 1.5);
      qa(".s02-onda").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 7, ease: "steps(1)", immediateRender: false }, 0.05 + (i % 2) * 0.12));
      gsap.set(q(".s02-ondas"), { opacity: 1 });
      pop(".s02-sello", MVD, 0.3);
      // arriba: salta
      golpe(".s02-arriba", ARRIBA + 0.05, 2.2);
      tl.to(q(".s02-radio"), { y: -60, duration: 0.15, yoyo: true, repeat: 3, ease: "power2.out" }, ARRIBA);
      tl.to(q(".s02-once"), { opacity: 0, y: -30, duration: 0.2 }, PEDIDOS - 0.5);
      tl.to(q(".s02-sello"), { opacity: 0, duration: 0.2 }, PEDIDOS - 0.5);
      tl.to(q(".s02-arriba"), { opacity: 0, duration: 0.15 }, PEDIDOS - 0.25);
      // pedidos: llueven mensajes
      qa(".s02-b").forEach((b, i) => pop(b, PEDIDOS - 0.2 + i * 0.12, 0.25));
      sacudon(PEDIDOS + 0.1, 0.8);
`;
export const SFX = [
  { t: 0.02, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
  { t: 0.05, sfx: "glitch-1", vol: 0.3, max: 0.5 },
  { t: 1.5, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
  { t: 3.1, sfx: "notification", vol: 0.32 },
  { t: 3.35, sfx: "ping", vol: 0.28 },
  { t: 3.6, sfx: "notification", vol: 0.28 },
];
