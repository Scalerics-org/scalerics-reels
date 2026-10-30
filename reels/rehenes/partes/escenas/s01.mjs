import { poli } from "./pj.mjs";
export const ID = "s01-atencion";
export const CSS = `
  $ .s01-aten { top: 590px; font-size: 150px; color: #ffd60a; text-shadow: 0 0 40px rgba(255, 214, 10, 0.45); }
  $ .s01-sello { left: 470px; top: 790px; border-color: #2f6bff; color: #f2f2f2; background: #2f6bff; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-ondas">
            <path class="yl s01-onda" d="M640 1060 C680 1100 680 1180 640 1220" />
            <path class="yl s01-onda" d="M700 1010 C770 1080 770 1200 700 1270" />
            <path class="yl s01-onda" d="M760 960 C860 1060 860 1220 760 1320" />
            <path class="yl s01-onda" d="M820 910 C950 1040 950 1240 820 1370" />
          </g>
          <g transform="translate(40 790) scale(1.32)"><g class="s01-poli">${poli("s01")}</g></g>
        </svg>
        <div class="txt s01-aten">¡Atención!</div>
        <div class="sello s01-sello">Habla el negociador</div>
`;
export const JS = `
      const HABLA = 1.08, NEGO = 1.4;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      // cuadro 0 ya lleno: el cartel ya está, a medio golpe
      tl.fromTo(q(".s01-aten"), { opacity: 0.7, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      tl.fromTo(q(".s01-poli"), { opacity: 0.6, x: -120 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      sacudon(0.12, 1.2);
      // ondas del megáfono, en dos tandas
      qa(".s01-onda").forEach((o, i) => {
        tl.fromTo(o, { opacity: 0, scale: 0.7, svgOrigin: "600 1140" }, { opacity: 1, scale: 1, svgOrigin: "600 1140", duration: 0.18, ease: "power2.out", immediateRender: false }, 0.05 + i * 0.07);
        tl.to(o, { opacity: 0.25, duration: 0.3 }, 0.5 + i * 0.07);
        tl.to(o, { opacity: 1, duration: 0.1 }, HABLA + i * 0.07);
        tl.to(o, { opacity: 0.3, duration: 0.4 }, HABLA + 0.3 + i * 0.07);
      });
      hablar(".s01-poli-boca", 0, 0.7, 0.3);
      hablar(".s01-poli-boca", HABLA, 2.2, 0.3);
      tl.to(q(".s01-poli-brazo"), { rotation: -6, transformOrigin: "20% 60%", duration: 0.12, yoyo: true, repeat: 3 }, 0.05);
      golpe(".s01-sello", NEGO, 2.2);
      tl.set(q(".s01-sello"), { rotation: -4 }, 0);
      sacudon(NEGO + 0.05, 0.6);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.45, max: 0.8 },
  { t: 0.05, sfx: "glitch-1", vol: 0.2, max: 0.3 },
  { t: 1.32, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 1.9, sfx: "click", vol: 0.25 },
];
