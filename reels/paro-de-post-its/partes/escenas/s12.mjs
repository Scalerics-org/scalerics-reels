// s12-crm: entra Scalerics. Los post-its vuelan a una pantalla: el CRM.
import { escena, duracion, postit, COL } from "./comun.mjs";
const id = "s12-crm", dur = duracion(id);
const vuelan = [[180, 760, "y"], [900, 720, "r"], [160, 1300, "c"], [920, 1320, "y"], [540, 1480, "r"]];
const svg = `
  <g class="s12-comp">
    <rect x="200" y="760" width="680" height="440" rx="26" fill="${COL.ink}" stroke="${COL.papel}" stroke-width="9" />
    <path d="M130 1240 H950 L900 1290 H180 Z" fill="${COL.ink}" stroke="${COL.papel}" stroke-width="9" stroke-linejoin="round" />
    <rect x="240" y="800" width="600" height="58" rx="10" fill="${COL.verde}" />
    <text x="270" y="841" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${COL.ink}">CLIENTES</text>
    <g class="s12-filas">
      <rect x="240" y="890" width="600" height="80" rx="10" fill="none" stroke="${COL.papel}" stroke-width="4" opacity="0.5" />
      <rect x="240" y="990" width="600" height="80" rx="10" fill="none" stroke="${COL.papel}" stroke-width="4" opacity="0.5" />
      <rect x="240" y="1090" width="600" height="80" rx="10" fill="none" stroke="${COL.papel}" stroke-width="4" opacity="0.5" />
      <circle cx="290" cy="930" r="22" fill="${COL.r}" /><circle cx="290" cy="1030" r="22" fill="${COL.c}" /><circle cx="290" cy="1130" r="22" fill="${COL.y}" />
      <path d="M330 930 H560 M330 1030 H520 M330 1130 H600" stroke="${COL.papel}" stroke-width="12" stroke-linecap="round" />
      <path d="M760 920 L780 940 L812 908" fill="none" stroke="${COL.verde}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
  ${vuelan.map(([x, y, col], i) => postit({ id: "s12-v s12-v" + i, x, y, s: 0.32, col, rot: i * 7 - 12, cara: "feliz" })).join("")}
`;
const html = `<div class="s12-crm">CRM</div>`;
const css = `P .s12-crm { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; color: ${COL.verde}; letter-spacing: 0.04em; line-height: 1; }`;
const js = `
      const EN = 0, SCA = 0.09, ARM = 0.7, CRM = 1.77;
      tl.fromTo(q(".s12-comp"), { opacity: 0, scale: 0.7, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, svgOrigin: "540 1000", duration: 0.35, ease: "back.out(1.7)" }, 0);
      pop(".s12-v", 0.05, { d: 0.25 });
      // los post-its vuelan adentro de la pantalla
      [[360, 240], [-360, 280], [380, -300], [-380, -320], [0, -480]].forEach(([dx, dy], i) => {
        tl.to(q(".s12-v" + i), { x: dx, y: dy, scale: 0.2, svgOrigin: "0 0", duration: 0.45, ease: "power3.in" }, ARM - 0.2 + i * 0.1);
        tl.to(q(".s12-v" + i), { opacity: 0, duration: 0.05 }, ARM + 0.25 + i * 0.1);
      });
      gsap.set(q(".s12-filas"), { opacity: 0 });
      tl.to(q(".s12-filas"), { opacity: 1, duration: 0.2 }, ARM + 0.5);
      golpe(".s12-crm", CRM, { desde: 2.2 });
      sacudon(CRM + 0.05, 1);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "whoosh-cinematic", vol: 0.3, max: 1.0 },
  { t: 0.6, sfx: "whoosh-short", vol: 0.25 },
  { t: 1.2, sfx: "sparkle", vol: 0.25 },
  { t: 1.75, sfx: "impact-bass-2", vol: 0.4, max: 0.6 },
] });
