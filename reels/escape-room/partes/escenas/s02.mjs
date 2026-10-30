import { puerta, candado } from "./pj.mjs";
export const ID = "s02-objetivo";
export const CSS = `
  $ .s02-salida { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1000px; background: #ff2d3d; color: #efe9ff; box-shadow: 0 0 30px rgba(255, 45, 61, 0.6); }
  $ .s02-una { top: 650px; font-size: 92px; }
  $ .s02-l1 { top: 625px; font-size: 120px; }
  $ .s02-l2 { top: 755px; font-size: 190px; }
  $ .s02-l3 { top: 955px; font-size: 120px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s02-puerta"><g transform="translate(450 1070) scale(0.42)">${puerta("s02")}</g>
            <g transform="translate(500 1170) scale(0.4)"><g class="s02-cand">${candado("s02")}</g></g></g>
          <g class="s02-haz"><path d="M1060 1320 L-60 560 L-60 1100 Z" fill="#39ffd2" opacity="0.12" /></g>
        </svg>
        <div class="cartel s02-salida">Salida</div>
        <div class="txt s02-una">Una sola cosa</div>
        <div class="txt uv s02-l1">¿Cuánto</div>
        <div class="txt uv s02-l2">stock</div>
        <div class="txt uv s02-l3">hay?</div>
`;
export const JS = `
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.fromTo(q(".s02-puerta"), { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s02-salida", 0.05);
      tl.to(q(".s02-salida"), { opacity: 0.3, duration: 0.06, yoyo: true, repeat: 3, ease: "steps(1)" }, 0.6);
      tl.to(q(".s02-cand"), { rotation: 8, svgOrigin: "540 1210", duration: 0.1, yoyo: true, repeat: 5 }, 0.2);
      // "una sola cosa"
      golpe(".s02-una", 1.16, 2);
      tl.to(q(".s02-una"), { opacity: 0, scale: 0.8, duration: 0.2 }, 2.2);
      tl.to(q(".s02-salida"), { opacity: 0, duration: 0.2 }, 2.2);
      // la pista aparece en tinta UV cuando pasa la linterna
      gsap.set(q(".s02-haz"), { opacity: 0 });
      tl.fromTo(q(".s02-haz"), { opacity: 0, rotation: 18, svgOrigin: "1060 1320" }, { opacity: 1, rotation: -14, svgOrigin: "1060 1320", duration: 1.6, ease: "sine.inOut", immediateRender: false }, 2.2);
      [[".s02-l1", 2.36], [".s02-l2", 2.99], [".s02-l3", 3.62]].forEach(([s, t]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, filter: "blur(14px)", scale: 1.15 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.28, ease: "power2.out", immediateRender: false }, t - 0.05);
      });
      tl.to(q(".s02-l2"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, 3.0);
`;
export const SFX = [
  { t: 0.05, sfx: "pop", vol: 0.3 },
  { t: 1.1, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 2.3, sfx: "sparkle", vol: 0.3 },
  { t: 2.95, sfx: "glitch-1", vol: 0.18, max: 0.3 },
];
