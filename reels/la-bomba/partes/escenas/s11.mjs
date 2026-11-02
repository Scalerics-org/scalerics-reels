import { experto, companera } from "./pj.mjs";
export const ID = "s11-boom";
// la explosión: estrella de puntas
let est = "";
for (let i = 0; i < 24; i++) {
  const a = (i / 24) * Math.PI * 2, r = i % 2 ? 230 : 420;
  est += `${i ? "L" : "M"}${(540 + Math.cos(a) * r).toFixed(0)} ${(960 + Math.sin(a) * r).toFixed(0)} `;
}
let est2 = "";
for (let i = 0; i < 20; i++) {
  const a = (i / 20) * Math.PI * 2 + 0.2, r = i % 2 ? 140 : 280;
  est2 += `${i ? "L" : "M"}${(540 + Math.cos(a) * r).toFixed(0)} ${(960 + Math.sin(a) * r).toFixed(0)} `;
}
const humo = [[260, 900, 150], [440, 1120, 180], [700, 1000, 170], [860, 1180, 140], [540, 800, 160], [300, 1240, 130], [800, 760, 120]];
export const CSS = `
  $ .s11-ven { position: absolute; left: 130px; top: 700px; width: 820px; height: 340px; border-radius: 18px; background: #ecebe4; border: 6px solid #070807; box-shadow: 0 20px 50px rgba(0,0,0,0.6); overflow: hidden; }
  $ .s11-ven .bar { height: 60px; background: #21a366; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: #ecebe4; padding: 15px 24px; white-space: nowrap; }
  $ .s11-ven .msg { position: absolute; left: 190px; top: 120px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 50px; color: #070807; white-space: nowrap; }
  $ .s11-ven .sub { position: absolute; left: 190px; top: 192px; font-family: "Lexend", sans-serif; font-weight: 500; font-size: 30px; color: #3b3d38; white-space: nowrap; }
  $ .s11-cuerpo { top: 600px; font-size: 96px; color: #ffb020; }
  $ .s11-boom { top: 860px; font-size: 230px; color: #070807; }
`;
export const HTML = `
        <div class="s11-ven"><div class="bar">planilla_local_FINAL_v14.xlsx</div>
          <svg viewBox="0 0 820 340" style="width:820px;height:340px" aria-hidden="true"><g class="s11-rueda"><circle cx="100" cy="190" r="52" fill="none" stroke="#3b3d38" stroke-width="12" opacity="0.25" /><path d="M100 138 A52 52 0 0 1 152 190" fill="none" stroke="#21a366" stroke-width="12" stroke-linecap="round" /></g></svg>
          <div class="msg">(No responde)</div><div class="sub">¿Esperar? ¿Esperar más?</div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-gente">
            <g transform="translate(60 980) scale(0.75)"><g class="s11-exp">${experto("s11")}</g></g>
            <g transform="translate(720 980) scale(0.75)"><g class="s11-comp">${companera("s11", { linterna: false })}</g></g>
          </g>
          <path class="s11-est" d="${est}Z" fill="#ffb020" stroke="#ecebe4" stroke-width="8" stroke-linejoin="round" />
          <path class="s11-est2" d="${est2}Z" fill="#ff2d2d" stroke="#ecebe4" stroke-width="6" stroke-linejoin="round" />
          ${humo.map(([x, y, r]) => `<circle class="s11-humo" cx="${x}" cy="${y}" r="${r}" fill="#3b3d38" opacity="0.9" />`).join("")}
        </svg>
        <div class="txt ops s11-cuerpo">¡Cuerpo a tierra!</div>
        <div class="txt ops s11-boom">BOOM</div>
`;
export const JS = `
      const RESPONDE = 0.09, CUERPO = 1.25, BOOM = 2.2;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: BOOM, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s11-ven"), { opacity: 0.3, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 0);
      tl.to(q(".s11-rueda"), { rotation: 720, svgOrigin: "100 190", duration: 1.2, ease: "none" }, 0);
      tl.to(q(".s11-ven"), { x: 8, duration: 0.04, yoyo: true, repeat: 7, ease: "none" }, RESPONDE + 0.3);
      // "¡cuerpo a tierra!": se tiran al piso
      tl.to(q(".s11-ven"), { opacity: 0, y: -40, duration: 0.15 }, CUERPO - 0.15);
      golpe(".s11-cuerpo", CUERPO, 1.8);
      gsap.set(q(".s11-gente"), { opacity: 0 });
      tl.set(q(".s11-gente"), { opacity: 1 }, CUERPO - 0.05);
      tl.fromTo(q(".s11-exp"), { x: 0, y: 0, rotation: 0 }, { x: 60, y: 260, rotation: -80, svgOrigin: "180 540", duration: 0.45, ease: "power2.in", immediateRender: false }, CUERPO + 0.3);
      tl.fromTo(q(".s11-comp"), { x: 0, y: 0, rotation: 0 }, { x: -60, y: 260, rotation: 80, svgOrigin: "180 540", duration: 0.45, ease: "power2.in", immediateRender: false }, CUERPO + 0.4);
      hablar(".s11-exp-boca", CUERPO, CUERPO + 0.6, 0.3);
      // BOOM
      gsap.set(qa(".s11-est, .s11-est2, .s11-humo"), { opacity: 0 });
      tl.fromTo(q(".s11-est"), { opacity: 1, scale: 0.1 }, { opacity: 1, scale: 1.25, svgOrigin: "540 960", duration: 0.25, ease: "power4.out", immediateRender: false }, BOOM);
      tl.fromTo(q(".s11-est2"), { opacity: 1, scale: 0.1 }, { opacity: 1, scale: 1.2, svgOrigin: "540 960", duration: 0.3, ease: "power4.out", immediateRender: false }, BOOM + 0.03);
      tl.to(qa(".s11-est, .s11-est2"), { rotation: 12, svgOrigin: "540 960", duration: 1.2, ease: "none" }, BOOM);
      tl.to(qa(".s11-cuerpo, .s11-gente"), { opacity: 0, duration: 0.05 }, BOOM);
      golpe(".s11-boom", BOOM + 0.05, 3);
      for (let i = 0; i < 6; i++) sacudon(BOOM + i * 0.18, 2.2 - i * 0.3);
      // humo que tapa todo
      qa(".s11-humo").forEach((h, i) => tl.fromTo(h, { opacity: 0, scale: 0.3 }, { opacity: 0.95, scale: 1.4, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out", immediateRender: false }, BOOM + 0.45 + i * 0.05));
      tl.to(qa(".s11-est, .s11-est2"), { opacity: 0, duration: 0.4 }, BOOM + 0.7);
      tl.to(q(".s11-boom"), { opacity: 0, scale: 1.3, duration: 0.4 }, BOOM + 0.9);
`;
export const SFX = [
  { t: 0.05, sfx: "error", vol: 0.3, max: 1.0 },
  { t: 1.2, sfx: "whoosh", vol: 0.3 },
  { t: 2.15, sfx: "impact-bass-2", vol: 0.7 },
  { t: 2.2, sfx: "impact-bass-1", vol: 0.6 },
  { t: 2.25, sfx: "glitch-3", vol: 0.3, max: 0.6 },
  { t: 2.6, sfx: "whoosh-cinematic", vol: 0.3 },
];
