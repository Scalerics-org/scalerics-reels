export const ID = "s13-automatizamos";
// especialista: traje oscuro, chaleco verde, anteojos negros. 360 x 540
const esp = (P) => `
      <path class="k" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />
      <path class="s" d="M70 540 C70 440 110 400 150 392 L180 470 L210 392 C250 400 290 440 290 540 Z" stroke-width="6" />
      <text x="180" y="520" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="#0a0d14" letter-spacing="2" data-layout-ignore>SCALERICS</text>
      <ellipse class="cara" cx="180" cy="250" rx="78" ry="92" />
      <path class="k" d="M100 220 C96 160 140 148 180 148 C224 148 266 166 260 222 C230 200 130 200 100 220 Z" />
      <path d="M112 236 H248 V262 C248 280 222 284 206 270 L192 252 H168 L154 270 C138 284 112 280 112 262 Z" fill="#0a0d14" />
      <path class="d" d="M156 300 C170 310 194 310 206 300" stroke-width="6" />`;
export const CSS = `
  $ .s13-no { top: 590px; font-size: 92px; }
  $ .s13-con { top: 696px; font-size: 92px; }
  $ .s13-la { top: 600px; font-size: 80px; color: #f2f2f2; }
  $ .s13-auto { top: 700px; font-size: 104px; color: #5ce611; text-shadow: 0 0 40px rgba(92,230,17,0.5); }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(90 930) scale(1.05)"><g class="s13-e1">${esp("s13")}</g></g>
          <g transform="translate(610 930) scale(1.05)"><g class="s13-e2">${esp("s13")}</g></g>
        </svg>
        <div class="txt s13-no">No negociamos</div>
        <div class="txt s13-con">con planillas.</div>
        <div class="txt s13-la">La</div>
        <div class="txt s13-auto">automatizamos.</div>
`;
export const JS = `
      const NEGO = 0.5, PLANILLAS = 1.1, LA = 1.7, AUTO = 2.05;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "power1.out", transformOrigin: "50% 70%" }, 0);
      // entran caminando desde abajo, en cámara lenta de película
      tl.fromTo(q(".s13-e1"), { opacity: 0.3, y: 260 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
      tl.fromTo(q(".s13-e2"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.15);
      tl.to([q(".s13-e1"), q(".s13-e2")], { y: -8, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.8);
      golpe(".s13-no", NEGO, 1.8);
      golpe(".s13-con", PLANILLAS, 1.8);
      tl.to([q(".s13-no"), q(".s13-con")], { opacity: 0, duration: 0.1 }, LA - 0.1);
      golpe(".s13-la", LA, 1.6);
      golpe(".s13-auto", AUTO + 0.05, 2.8);
      sacudon(AUTO + 0.1, 1.4);
`;
export const SFX = [
  { t: 0.0, sfx: "whoosh-cinematic", vol: 0.35, max: 1.4 },
  { t: 0.45, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
  { t: 1.05, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
  { t: 2.0, sfx: "impact-bass-2", vol: 0.5, max: 0.9 },
  { t: 2.05, sfx: "sparkle", vol: 0.3 },
];
