import { local, caja } from "./pj.mjs";
export const ID = "s09-otro-local";
export const CSS = `
  $ .s09-nadie { left: 170px; top: 1190px; font-size: 64px; color: #efe9ff; background: #ff2d3d; }
  $ .s09-nunca { left: 560px; top: 1210px; font-size: 64px; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(60 700)"><g class="s09-l1">${local("s09", "LOCAL 1")}</g></g>
          <g transform="translate(720 700)"><g class="s09-l2">${local("s09", "LOCAL 2", "p")}</g></g>
          <path class="cl s09-ruta" d="M370 900 C470 830 610 830 710 900" stroke-dasharray="14 16" />
          <g transform="translate(740 1010)"><g class="s09-caja">${caja("s09", { q: true })}</g></g>
          <g transform="translate(880 1010)"><g class="s09-caja">${caja("s09", { q: true })}</g></g>
          <g transform="translate(810 900)"><g class="s09-caja">${caja("s09", { q: true })}</g></g>
          <g class="s09-reg"><g transform="translate(400 990)"><rect class="w" x="0" y="0" width="200" height="160" rx="10" stroke-width="6" />
            <path class="d fino" d="M20 50 H180 M20 90 H180 M20 130 H180" opacity="0.35" />
            <text x="100" y="36" text-anchor="middle" class="mono" font-size="22" fill="#0c0718">REGISTRO</text></g></g>
        </svg>
        <div class="sello s09-nadie">Nadie.</div>
        <div class="sello s09-nunca">Nunca.</div>
`;
export const JS = `
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s09-l1"), { opacity: 0.5, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      gsap.set(q(".s09-l2"), { opacity: 0 });
      tl.fromTo(q(".s09-l2"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, 0.7);
      dibujar(".s09-ruta", 0.75, 0.5);
      qa(".s09-caja").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, 0.3 + i * 0.15);
      });
      tl.to(qa(".s09-caja"), { y: -8, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.2);
      // "¿Quién las anotó?": el registro, vacío
      pop(".s09-reg", 1.4);
      tl.to(q(".s09-reg"), { rotation: -4, svgOrigin: "500 1070", duration: 0.1, yoyo: true, repeat: 3 }, 2.0);
      golpe(".s09-nadie", 3.0, 2.4);
      tl.set(q(".s09-nadie"), { rotation: -6 }, 0);
      sacudon(3.05, 1);
      golpe(".s09-nunca", 3.83, 2.4);
      tl.set(q(".s09-nunca"), { rotation: 5 }, 0);
      sacudon(3.88, 1);
`;
export const SFX = [
  { t: 0.3, sfx: "pop", vol: 0.25 },
  { t: 0.45, sfx: "pop", vol: 0.25 },
  { t: 0.6, sfx: "pop", vol: 0.25 },
  { t: 1.4, sfx: "click-soft", vol: 0.3 },
  { t: 2.95, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
  { t: 3.78, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
];
