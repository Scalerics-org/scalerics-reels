export const ID = "s11-rompe";
export const CSS = `
  $ .s11-se { top: 600px; font-size: 96px; }
  $ .s11-auto { top: 720px; font-size: 82px; color: #5ce611; text-shadow: 0 0 36px rgba(92,230,17,0.45); }
  $ .s11-card { position: absolute; left: 140px; top: 1150px; width: 800px; padding: 22px 0 18px; border: 7px solid #5ce611; border-radius: 26px; background: rgba(5,11,24,0.85); text-align: center; }
  $ .s11-card .a { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: #f4efe4; }
  $ .s11-card .b { margin-top: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #5ce611; text-transform: uppercase; }
`;
const engranaje = (cls, cx, cy, r, n) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    d += `<rect x="${cx - 14}" y="${cy - r - 26}" width="28" height="34" rx="6" fill="#5ce611" transform="rotate(${(a * 180) / Math.PI} ${cx} ${cy})" />`;
  }
  return `<g class="${cls}">${d}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#5ce611" stroke="#f4efe4" stroke-width="6" /><circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="#050b18" stroke="#f4efe4" stroke-width="5" /></g>`;
};
export const HTML = `
        <div class="txt s11-se">Se rompe</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-p s11-p0"><path class="rl" d="M540 760 A 240 240 0 0 1 780 1000" stroke-width="12" /></g>
          <g class="s11-p s11-p1"><path class="rl" d="M780 1000 A 240 240 0 0 1 540 1240" stroke-width="12" /></g>
          <g class="s11-p s11-p2"><path class="rl" d="M540 1240 A 240 240 0 0 1 300 1000" stroke-width="12" /></g>
          <g class="s11-p s11-p3"><path class="rl" d="M300 1000 A 240 240 0 0 1 540 760" stroke-width="12" /></g>
          <g class="s11-eng">${engranaje("s11-g1", 450, 980, 90, 9)}${engranaje("s11-g2", 640, 900, 60, 7)}</g>
        </svg>
        <div class="txt s11-auto">Automatizándolo</div>
        <div class="s11-card"><div class="a">EN SCALERICS HACEMOS</div><div class="b">Automatizaciones</div></div>
`;
export const JS = `
      const ROMPE = 0.2, AUTO = 0.4, SCAL = 1.8, HACEMOS = 2.3;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s11-se"), { opacity: 0.4, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.out" }, 0);
      // el aro se parte en cuatro y vuela
      const V = [[60, -60, 25], [60, 60, -20], [-60, 60, 30], [-60, -60, -25]];
      qa(".s11-p").forEach((p, i) => {
        tl.fromTo(p, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: V[i][0] * 5, y: V[i][1] * 5, rotation: V[i][2], svgOrigin: "540 1000", opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, ROMPE + 0.15);
      });
      sacudon(ROMPE + 0.15, 1.6);
      golpe(".s11-auto", AUTO + 0.1, 2.2);
      gsap.set(q(".s11-eng"), { opacity: 0 });
      tl.fromTo(q(".s11-eng"), { opacity: 0, scale: 0.5, svgOrigin: "540 950" }, { opacity: 1, scale: 1, svgOrigin: "540 950", duration: 0.35, ease: "back.out(2)", immediateRender: false }, AUTO + 0.6);
      tl.fromTo(q(".s11-g1"), { rotation: 0 }, { rotation: 200, svgOrigin: "450 980", duration: DUR - 1, ease: "none", immediateRender: false }, AUTO + 0.6);
      tl.fromTo(q(".s11-g2"), { rotation: 0 }, { rotation: -300, svgOrigin: "640 900", duration: DUR - 1, ease: "none", immediateRender: false }, AUTO + 0.6);
      entra(".s11-card", SCAL - 0.1, 0, 80, 0.3);
      tl.fromTo(q(".s11-card .b"), { scale: 1.3 }, { scale: 1, duration: 0.2, ease: "power3.out", immediateRender: false }, HACEMOS + 0.45);
`;
export const SFX = [
  { t: 0.3, sfx: "glitch-1", vol: 0.35, max: 0.4 },
  { t: 0.33, sfx: "impact-bass-2", vol: 0.45, max: 0.9 },
  { t: 0.5, sfx: "sparkle", vol: 0.28, max: 1.0 },
  { t: 1.75, sfx: "whoosh", vol: 0.25 },
  { t: 2.75, sfx: "chime", vol: 0.3 },
];
