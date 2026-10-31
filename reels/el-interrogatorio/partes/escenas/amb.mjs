// Ambiente de todo el reel (va ENCIMA de las escenas): lámpara colgante arriba al centro con su cono
// de luz amarilla que se balancea, reloj de pared arriba a la derecha (21:14, segundero que avanza),
// cartel mono arriba a la izquierda, borde de la mesa abajo (los personajes quedan detrás) y viñeta.
// El espejo polarizado está en el fondo (armar.mjs, #espejo). Golpe en la mesa (16.5): la lámpara se
// sacude y titila. Entra Orus (51.63): luz de puerta abierta desde la derecha con verde Scalerics y el
// cartel pasa a "CASO RESUELTO". CTA (66.81): vuelve la sala.
import { reloj } from "./pj.mjs";
export const ID = "ambiente";
export const CSS = `
  $ .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 820px 1120px at 540px 900px, rgba(10, 14, 12, 0) 58%, rgba(10, 14, 12, 0.85) 100%); }
  $ .amb-puerta { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 700px 1200px at 1080px 900px, rgba(239, 234, 223, 0.16), rgba(92, 230, 17, 0.07) 55%, rgba(92, 230, 17, 0) 80%); }
  $ .amb-flash { position: absolute; inset: 0; background: #fff6d8; opacity: 0; }
  $ .amb-sala { position: absolute; left: 72px; top: 118px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.16em; color: #9fb3a8; white-space: nowrap; }
  $ .amb-sala2 { color: #5ce611; opacity: 0; }
  $ .amb-mesa { position: absolute; left: -20px; right: -20px; top: 1352px; height: 48px; background: #18211c; border-top: 10px solid #3a4a42; }
  $ .amb-mesa2 { position: absolute; left: -20px; right: -20px; top: 1362px; height: 40px; background: rgba(255, 210, 63, 0.10); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="amb-lampara">
            <path class="amb-cono" d="M482 176 L598 176 L1000 1360 L80 1360 Z" fill="#ffd23f" opacity="0.07" />
            <path class="amb-cono2" d="M500 176 L580 176 L800 1360 L280 1360 Z" fill="#ffd23f" opacity="0.06" />
            <path d="M540 -10 V96" stroke="#111815" stroke-width="6" />
            <path class="k" d="M500 96 H580 L640 170 H440 Z" stroke-width="5" />
            <ellipse class="amb-foco" cx="540" cy="176" rx="46" ry="14" fill="#ffd23f" />
          </g>
          <g transform="translate(948 132)"><g class="amb-reloj">${reloj("amb", { r: 64, h: 9, m: 14 })}<g class="amb-seg"><path d="M0 8 V-52" stroke="#e5484d" stroke-width="3" stroke-linecap="round" /></g></g></g>
        </svg>
        <div class="amb-mesa"></div>
        <div class="amb-mesa2"></div>
        <div class="amb-puerta"></div>
        <div class="amb-vineta"></div>
        <div class="amb-sala" data-layout-ignore>SALA 3 · INTERROGATORIO</div>
        <div class="amb-sala amb-sala2" data-layout-ignore>CASO RESUELTO</div>
        <div class="amb-flash"></div>
`;
export const JS = `
      const GOLPE = 16.5, ORUS = 51.63, CTA = 66.81;
      // segundero: un salto por segundo
      tl.fromTo(q(".amb-seg"), { rotation: 84, svgOrigin: "0 0" }, { rotation: 84 + Math.floor(DUR) * 6, svgOrigin: "0 0", duration: Math.floor(DUR), ease: "steps(" + Math.floor(DUR) + ")" }, 0);
      // la lámpara se balancea siempre (péndulo suave)
      const vaiven = (a, t0, t1, amp, per) => {
        const n = Math.max(1, Math.round((t1 - t0) / per));
        tl.fromTo(q(".amb-lampara"), { rotation: -amp, svgOrigin: "540 0" }, { rotation: amp, svgOrigin: "540 0", duration: per, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      };
      gsap.set(q(".amb-lampara"), { rotation: -1.2, svgOrigin: "540 0" });
      vaiven(0, 0, GOLPE, 1.2, 1.6);
      vaiven(0, GOLPE, GOLPE + 2.4, 5, 0.6);
      vaiven(0, GOLPE + 2.4, DUR, 1.2, 1.6);
      // titileos de la lámpara (golpe, abogado, culpable)
      [[0.05, 0.25], [GOLPE + 0.05, 0.45], [33.2, 0.25], [48.95, 0.3]].forEach(([t, d]) => {
        tl.to(qa(".amb-cono, .amb-cono2, .amb-foco"), { opacity: 0.02, duration: 0.04 }, t);
        tl.to(qa(".amb-cono, .amb-cono2"), { opacity: 0.07, duration: 0.04 }, t + d * 0.4);
        tl.to(q(".amb-foco"), { opacity: 1, duration: 0.04 }, t + d * 0.4);
        tl.to(qa(".amb-cono, .amb-cono2, .amb-foco"), { opacity: 0.02, duration: 0.04 }, t + d * 0.7);
        tl.to(qa(".amb-cono, .amb-cono2"), { opacity: 0.07, duration: 0.04 }, t + d);
        tl.to(q(".amb-foco"), { opacity: 1, duration: 0.04 }, t + d);
      });
      // el reloj tiembla con el golpe
      tl.to(q(".amb-reloj"), { rotation: 8, svgOrigin: "0 0", duration: 0.08, yoyo: true, repeat: 3 }, GOLPE + 0.02);
      // entra Orus: se abre la puerta (luz desde la derecha) y cambia el cartel
      tl.to(q(".amb-flash"), { opacity: 0.55, duration: 0.05 }, ORUS - 0.06);
      tl.to(q(".amb-flash"), { opacity: 0, duration: 0.5, ease: "power2.out" }, ORUS);
      tl.to(q(".amb-puerta"), { opacity: 1, duration: 0.6 }, ORUS);
      tl.to(q(".amb-sala"), { opacity: 0, duration: 0.2 }, ORUS);
      tl.to(q(".amb-sala2"), { opacity: 1, duration: 0.3 }, ORUS + 0.1);
      // CTA: vuelve la sala
      tl.to(q(".amb-puerta"), { opacity: 0, duration: 0.5 }, CTA);
      tl.to(q(".amb-sala2"), { opacity: 0, duration: 0.2 }, CTA);
      tl.to(q(".amb-sala"), { opacity: 1, duration: 0.2 }, CTA + 0.1);
`;
export const SFX = [];
