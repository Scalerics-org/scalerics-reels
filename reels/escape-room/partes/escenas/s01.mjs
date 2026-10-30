import { pillo, joven, encargada, candado } from "./pj.mjs";
export const ID = "s01-encerrados";
export const CSS = `
  $ .s01-sello { left: 0; right: 0; margin: 0 auto; width: max-content; top: 1272px; border-color: #ff2d3d; color: #efe9ff; background: #ff2d3d; font-size: 44px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-haz"><path d="M540 560 L200 1240 H880 Z" fill="#9b5cff" opacity="0.13" /></g>
          <g transform="translate(70 820) scale(0.78)"><g class="s01-pj s01-pj1">${joven("s01")}</g></g>
          <g transform="translate(400 790) scale(0.78)"><g class="s01-pj s01-pj2">${pillo("s01", { boca: "abierta" })}</g></g>
          <g transform="translate(730 820) scale(0.78)"><g class="s01-pj s01-pj3">${encargada("s01")}</g></g>
          <g transform="translate(460 600) scale(0.8)"><g class="s01-cand">${candado("s01")}</g></g>
          <g class="s01-cadena">
            <path class="ul s01-esl" d="M100 760 C300 700 420 690 470 690" stroke-width="12" stroke-dasharray="26 14" />
            <path class="ul s01-esl" d="M980 760 C780 700 660 690 610 690" stroke-width="12" stroke-dasharray="26 14" />
          </g>
        </svg>
        <div class="sello s01-sello">Escape room · Sala: el depósito</div>
`;
export const JS = `
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      // cuadro 0 ya lleno: los tres a medio entrar
      qa(".s01-pj").forEach((p, i) => tl.fromTo(p, { opacity: 0.5, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, i * 0.08));
      tl.fromTo(q(".s01-haz"), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0);
      // "tres": parpadean de miedo
      parpadeo(".s01-pj1 .s01-joven-ojos", 0.5);
      parpadeo(".s01-pj2 .s01-pillo-ojos", 0.6);
      parpadeo(".s01-pj3 .s01-encargada-ojos", 0.7);
      // "empleados": cae el candado y se tensan las cadenas
      tl.fromTo(q(".s01-cand"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.3, ease: "power4.in", immediateRender: false }, 0.75);
      gsap.set(q(".s01-cand"), { opacity: 0 });
      sacudon(1.05, 1.2);
      qa(".s01-esl").forEach((e) => { gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scaleX: 0.3, svgOrigin: e === qa(".s01-esl")[0] ? "470 690" : "610 690" }, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power3.out", immediateRender: false }, 1.05); });
      tl.to(qa(".s01-pj"), { y: 12, duration: 0.12, yoyo: true, repeat: 1 }, 1.06);
      // "depósito": sello
      golpe(".s01-sello", 1.7, 2.2);
      sacudon(1.72, 0.6);
      tl.to(q(".s01-cand"), { rotation: -6, svgOrigin: "540 700", duration: 0.12, yoyo: true, repeat: 3 }, 2.4);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.4, max: 0.8 },
  { t: 1.02, sfx: "impact-bass-1", vol: 0.45, max: 0.7 },
  { t: 1.05, sfx: "click", vol: 0.35 },
  { t: 1.65, sfx: "glitch-1", vol: 0.2, max: 0.3 },
];
