import { escena, PAPA, C } from "./base.mjs";
import { CARTEL, RELOJ, MOSTRADOR } from "./piezas.mjs";

// ---------------- s01-rec ----------------
escena({
  id: "s01-rec",
  dur: 2.77,
  css: `
    [data-composition-id="s01-rec"] .s01-no { top: 1310px; font-size: 116px; color: ${C.rojo}; }`,
  html: `
      <div class="capa s01-cam"><div class="capa s01-sac">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${CARTEL("s01-")}
          ${RELOJ("s01-")}
          ${PAPA("s01-", { x: 540, y: 900, pose: ["amasar", "amasar"] })}
          ${MOSTRADOR("s01-")}
          <ellipse class="s01-masa" cx="540" cy="1236" rx="104" ry="34" fill="${C.crema}" stroke="${C.som}" stroke-width="5" />
          <path class="s01-harina" d="M380 1250 Q400 1240 420 1250 M660 1252 Q680 1242 700 1252" stroke="${C.crema}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.6" />
        </svg>
        <div class="big s01-no">NO ME QUEDO.</div>
      </div></div>`,
  js: `
      const NO = 0.19, NEGOCIO = 1.43;
      mano(q(".s01-cam"), DUR, 8);
      // amasa
      tl.fromTo(q(".s01-masa"), { scaleX: 1, scaleY: 1, transformOrigin: "50% 100%" }, { scaleX: 1.12, scaleY: 0.8, transformOrigin: "50% 100%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s01-papa"), { y: 0 }, { y: 8, duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);
      // "no": se queda duro
      tl.to(qa(".s01-ojo"), { attr: { ry: 21, rx: 14 }, duration: 0.12, ease: "back.out(3)" }, NO + 0.1);
      tl.to(q(".s01-ceja-i"), { attr: { d: "M-64 -172 L-16 -164" }, duration: 0.12 }, NO + 0.1);
      tl.to(q(".s01-ceja-d"), { attr: { d: "M16 -164 L64 -172" }, duration: 0.12 }, NO + 0.1);
      tl.to(q(".s01-aguja"), { rotation: 360, svgOrigin: "905 700", duration: DUR, ease: "none" }, 0);
      // "negocio": se le cae la masa, golpe
      tl.to(q(".s01-masa"), { scaleY: 0.45, scaleX: 1.35, transformOrigin: "50% 100%", duration: 0.12, ease: "power3.in" }, NEGOCIO - 0.05);
      tl.to(q(".s01-boca"), { attr: { d: "M-20 -44 Q0 -6 20 -44" }, duration: 0.1 }, NEGOCIO);
      golpe(q(".s01-no"), NEGOCIO, -4);
      sacudon(q(".s01-sac"), NEGOCIO + 0.03, 1.6);
      tl.to(q(".s01-no"), { opacity: 0.8, duration: 0.05, yoyo: true, repeat: 5 }, NEGOCIO + 0.3);
`,
  sfx: [
    { t: 0.0, sfx: "beep", vol: 0.25 },
    { t: 0.3, sfx: "click-soft", vol: 0.25 },
    { t: 1.33, sfx: "impact-bass-2", vol: 0.42, max: 0.7 },
    { t: 1.4, sfx: "glitch-2", vol: 0.18, max: 0.3 },
  ],
});

// ---------------- s02-treinta ----------------
escena({
  id: "s02-treinta",
  dur: 5.41,
  css: `
    [data-composition-id="s02-treinta"] .s02-30 { top: 1010px; font-size: 330px; color: ${C.ama}; -webkit-text-stroke: 16px ${C.som}; }
    [data-composition-id="s02-treinta"] .s02-anios { top: 1340px; font-size: 118px; color: ${C.crema}; }
    [data-composition-id="s02-treinta"] .s02-anio { position: absolute; left: 380px; top: 1372px; font-size: 64px; }`,
  html: `
      <div class="capa s02-cam"><div class="capa s02-sac">
        <div class="capa s02-a">
          <div class="capa s02-zoom">
            <svg viewBox="0 0 1080 1920" aria-hidden="true">
              ${CARTEL("s02-")}
              ${RELOJ("s02-")}
              ${PAPA("s02-", { x: 540, y: 900, pose: ["abajo", "abajo"] })}
              ${MOSTRADOR("s02-")}
            </svg>
          </div>
          <div class="big s02-30">30</div>
          <div class="big s02-anios">años</div>
        </div>
        <div class="capa s02-b">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <defs><clipPath id="s02-hueco"><rect x="190" y="640" width="700" height="660" /></clipPath></defs>
            <rect x="160" y="580" width="760" height="66" rx="8" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" />
            <text x="540" y="628" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="40" fill="${C.crema}">PIZZERÍA EL HORNO</text>
            <rect x="190" y="640" width="700" height="660" fill="${C.som}" />
            <rect x="190" y="640" width="700" height="660" fill="${C.ama}" opacity="0.3" />
            <rect x="230" y="1110" width="620" height="190" fill="${C.tom}" stroke="${C.som}" stroke-width="5" />
            <circle cx="540" cy="900" r="70" fill="${C.som}" stroke="${C.crema}" stroke-width="5" />
            <path d="M430 1110 Q440 990 540 980 Q640 990 650 1110 Z" fill="${C.som}" stroke="${C.crema}" stroke-width="5" />
            <g clip-path="url(#s02-hueco)"><g class="s02-persiana">
              <rect x="190" y="640" width="700" height="660" fill="#3a3446" />
              <path d="${Array.from({ length: 19 }, (_, i) => `M190 ${672 + i * 34} H890`).join(" ")}" stroke="${C.crema}" stroke-width="4" opacity="0.5" />
              <rect x="500" y="1262" width="80" height="22" rx="6" fill="${C.crema}" />
            </g></g>
            <rect x="182" y="640" width="716" height="664" fill="none" stroke="${C.crema}" stroke-width="8" />
            <g class="s02-sol"><circle cx="290" cy="1404" r="34" fill="${C.ama}" /><path d="M290 1350 V1338 M290 1458 V1470 M236 1404 H224 M344 1404 H356 M252 1366 L244 1358 M328 1442 L336 1450 M328 1366 L336 1358 M252 1442 L244 1450" stroke="${C.ama}" stroke-width="6" stroke-linecap="round" /></g>
            <path class="s02-luna" d="M300 1366 A40 40 0 1 0 300 1442 A30 30 0 1 1 300 1366 Z" fill="${C.crema}" />
          </svg>
          <div class="osd s02-anio s02-n0">AÑO 1</div>
          <div class="osd s02-anio s02-n1">AÑO 7</div>
          <div class="osd s02-anio s02-n2">AÑO 15</div>
          <div class="osd s02-anio s02-n3">AÑO 22</div>
          <div class="osd s02-anio s02-n4">AÑO 30</div>
        </div>
      </div></div>`,
  js: `
      const TREINTA = 1.34, CORTINA = 2.98, OTRA = 4.1;
      mano(q(".s02-cam"), DUR, 9);
      // enojado desde el cuadro 0
      gsap.set(q(".s02-ceja-i"), { attr: { d: "M-64 -164 L-16 -138" } });
      gsap.set(q(".s02-ceja-d"), { attr: { d: "M16 -138 L64 -164" } });
      gsap.set(q(".s02-boca"), { attr: { d: "M-24 -46 Q0 -14 24 -46" } });
      // la cámara hace zoom a la cara
      tl.fromTo(q(".s02-zoom"), { scale: 1, transformOrigin: "540px 760px" }, { scale: 1.45, transformOrigin: "540px 760px", duration: 1.2, ease: "power2.inOut" }, 0.05);
      tl.to(q(".s02-papa"), { y: -10, duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.1);
      // "treinta años": brazos arriba y el 30 gigante
      pose("s02-", "i", "arriba", TREINTA - 0.1);
      pose("s02-", "d", "arriba", TREINTA - 0.1);
      golpe(q(".s02-30"), TREINTA, -3);
      golpe(q(".s02-anios"), TREINTA + 0.44, 2, 2);
      sacudon(q(".s02-sac"), TREINTA + 0.03, 1.4);
      // corte a la persiana: treinta años de subirla y bajarla
      const B = q(".s02-b");
      gsap.set(B, { opacity: 0 });
      tl.set(q(".s02-a"), { opacity: 0 }, 2.0);
      tl.set(B, { opacity: 1 }, 2.0);
      const P = q(".s02-persiana");
      const sol = q(".s02-sol"), luna = q(".s02-luna");
      const ANIOS = qa(".s02-anio");
      gsap.set(ANIOS, { opacity: 0 });
      gsap.set(luna, { opacity: 0 });
      const SUBE = [2.05, 2.42, 2.74, 3.06, 3.38];
      SUBE.forEach((t, i) => {
        tl.fromTo(P, { y: 0 }, { y: -560, duration: 0.16, ease: "power2.out", immediateRender: false }, t);
        if (i < SUBE.length - 1) tl.to(P, { y: 0, duration: 0.12, ease: "power2.in" }, t + 0.2);
        tl.set(ANIOS, { opacity: 0 }, t);
        tl.set(ANIOS[i], { opacity: 1 }, t);
        tl.set(sol, { opacity: 1 }, t); tl.set(luna, { opacity: 0 }, t);
        if (i < SUBE.length - 1) { tl.set(sol, { opacity: 0 }, t + 0.24); tl.set(luna, { opacity: 1 }, t + 0.24); }
      });
      tl.fromTo(ANIOS[4], { scale: 1.6 }, { scale: 1, duration: 0.2, ease: "back.out(2)" }, 3.38);
      // "¡treinta!": de vuelta a la cara, el 30 de nuevo, más fuerte
      tl.set(B, { opacity: 0 }, OTRA - 0.08);
      tl.set(q(".s02-a"), { opacity: 1 }, OTRA - 0.08);
      pose("s02-", "i", "abajo", OTRA - 0.08, 0.15);
      golpe(q(".s02-30"), OTRA, 4, 3.4);
      gsap.set(q(".s02-anios"), { opacity: 0 });
      tl.set(q(".s02-anios"), { opacity: 0 }, OTRA - 0.1);
      tl.to(q(".s02-zoom"), { scale: 1.7, duration: 0.18, ease: "power3.out" }, OTRA - 0.05);
      sacudon(q(".s02-sac"), OTRA + 0.03, 2.4);
      sacudon(q(".s02-sac"), OTRA + 0.25, 1);
`,
  sfx: [
    { t: 0.05, sfx: "whoosh", vol: 0.22 },
    { t: 1.22, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
    { t: 2.05, sfx: "glitch-1", vol: 0.2, max: 0.3 },
    { t: 2.1, sfx: "click", vol: 0.3 },
    { t: 2.75, sfx: "click", vol: 0.3 },
    { t: 3.4, sfx: "click", vol: 0.3 },
    { t: 3.98, sfx: "impact-bass-2", vol: 0.5, max: 0.7 },
  ],
});
