import { nestor, seg7, ancho7 } from "./pj.mjs";
export const ID = "s07-escape";
const w = ancho7("21:00") * 0.7;
export const CSS = `
  $ .s07-sello { left: 120px; top: 640px; transform: rotate(-6deg); border-color: #ffb84d; color: #ffb84d; }
  $ .s07-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #7fb4ff; opacity: 0; }
`;
export const HTML = `
        <div class="sello s07-sello">Plan de fuga</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-hora"><g transform="translate(${540 - w / 2} 640) scale(0.7)" style="filter: drop-shadow(0 0 18px #ff2d2d)">${seg7("s07-s", "21:00", { apagado: 0.07 })}</g></g>
          <rect class="b" x="120" y="1040" width="840" height="150" rx="20" />
          <path class="l" d="M150 1190 V1270 M930 1190 V1270" />
          <rect class="b" x="110" y="900" width="40" height="300" rx="14" />
          <rect x="160" y="980" width="250" height="90" rx="40" fill="#f4efe4" stroke="#f4efe4" stroke-width="6" />
          <g transform="translate(150 800) scale(0.62)">
            <g class="s07-abierto">${nestor("s07a", { ojos: "normal", boca: "sonrisa", pijama: true })}</g>
            <g class="s07-cerrado" opacity="0">${nestor("s07c", { ojos: "cerrados", boca: "seria", pijama: true })}</g>
          </g>
          <path d="M260 1030 C380 990 700 990 940 1030 L940 1150 L260 1150 Z" fill="#3a5fa8" stroke="#f4efe4" stroke-width="7" stroke-linejoin="round" />
          <path d="M380 1060 H900 M380 1100 H900" stroke="#f4efe4" stroke-width="4" opacity="0.35" />
        </svg>
        <div class="s07-z" style="left:420px; top:890px; font-size:56px">Z</div>
        <div class="s07-z" style="left:480px; top:830px; font-size:72px">Z</div>
        <div class="s07-z" style="left:560px; top:760px; font-size:92px">Z</div>
`;
export const JS = `
      const ESCAPARME = 0.2, ACOSTE = 1.4, NUEVE = 1.8;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      pop(".s07-sello", ESCAPARME, 0.3);
      // mira para los costados, pícaro
      tl.fromTo(q(".s07-abierto"), { x: 0 }, { x: 14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.1);
      gsap.set(q(".s07-hora"), { opacity: 0 });
      tl.fromTo(q(".s07-hora"), { opacity: 0, scale: 1.4, svgOrigin: "540 720" }, { opacity: 1, scale: 1, svgOrigin: "540 720", duration: 0.18, ease: "power4.out", immediateRender: false }, NUEVE - 0.05);
      tl.to(q(".s07-sello"), { opacity: 0, duration: 0.15 }, NUEVE - 0.2);
      tl.set(q(".s07-abierto"), { opacity: 0 }, ACOSTE);
      tl.set(q(".s07-cerrado"), { opacity: 1 }, ACOSTE);
      qa(".s07-z").forEach((z, i) => tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -10, duration: 0.35, ease: "power2.out", immediateRender: false }, ACOSTE + 0.2 + i * 0.25));
`;
export const SFX = [
  { t: 0.15, sfx: "pop", vol: 0.3 },
  { t: 1.4, sfx: "click-soft", vol: 0.3 },
  { t: 1.75, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 2.0, sfx: "sparkle", vol: 0.2, max: 0.8 },
];
