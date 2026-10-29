import { escena, PAPA, HIJO, VECINO, C } from "./base.mjs";
import { RELOJ, FRENTE } from "./piezas.mjs";

// ---------------- s07-todo-el-mundo ----------------
const BURBUJA = (p, i, x, y) => `<g class="${p}burbuja ${p}b${i}">
      <rect x="${x - 120}" y="${y - 40}" width="240" height="72" rx="20" fill="${C.crema}" stroke="${C.som}" stroke-width="5" />
      <path d="M${x - 20} ${y + 30} L${x - 34} ${y + 62} L${x + 6} ${y + 30} Z" fill="${C.crema}" stroke="${C.som}" stroke-width="5" stroke-linejoin="round" />
      <rect x="${x - 30}" y="${y + 24}" width="40" height="10" fill="${C.crema}" />
      <text x="${x}" y="${y + 10}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="34" fill="${C.som}">409 27 13</text>
    </g>`;
escena({
  id: "s07-todo-el-mundo",
  dur: 4.07,
  css: `
    [data-composition-id="s07-todo-el-mundo"] .s07-edad { top: 1330px; font-size: 100px; color: ${C.ama}; }`,
  html: `
      <div class="capa s07-cam"><div class="capa s07-sac">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${RELOJ("s07-")}
          ${PAPA("s07-", { x: 540, y: 930, s: 0.86, pose: ["pecho", "pecho"] })}
          ${VECINO("s07-", 0, { x: 150, y: 1060, s: 0.56, color: C.tom })}
          ${VECINO("s07-", 1, { x: 330, y: 1150, s: 0.6, color: C.azul })}
          ${VECINO("s07-", 2, { x: 750, y: 1150, s: 0.6, color: C.tom })}
          ${VECINO("s07-", 3, { x: 930, y: 1060, s: 0.56, color: C.azul })}
          ${BURBUJA("s07-", 0, 210, 890)}
          ${BURBUJA("s07-", 1, 870, 890)}
        </svg>
        <div class="big s07-edad">(de tu edad)</div>
      </div></div>`,
  js: `
      const SABE = 0.8, TODO = 1.1, TODO2 = 2.41, EDAD = 3.06;
      mano(q(".s07-cam"), DUR, 7);
      // orgulloso: cabeza para arriba, cejas arriba, sonrisa
      gsap.set(q(".s07-boca"), { attr: { d: "M-26 -46 Q0 -26 26 -46" } });
      tl.to(q(".s07-cabeza"), { y: -12, duration: 0.3, ease: "power2.out" }, 0);
      tl.to(q(".s07-ceja-i"), { attr: { d: "M-64 -160 L-16 -156" }, duration: 0.2 }, SABE);
      tl.to(q(".s07-ceja-d"), { attr: { d: "M16 -156 L64 -160" }, duration: 0.2 }, SABE);
      // "todo el mundo": aparecen los vecinos recitando el número
      const V = qa(".s07-vecino");
      V.forEach((v, i) => entra(v, TODO - 0.25 + i * 0.07, 120, 0.3));
      qa(".s07-burbuja").forEach((b, i) => pop(b, TODO + 0.2 + i * 0.12, 0.3, 0.3));
      gsap.set(qa(".s07-viejo"), { opacity: 0 });
      // "de tu edad": canas, anteojos y bastón
      tl.to(qa(".s07-burbuja"), { opacity: 0, duration: 0.15 }, TODO2 - 0.1);
      qa(".s07-viejo").forEach((g, i) => tl.to(g, { opacity: 1, duration: 0.08 }, TODO2 + 0.1 + i * 0.12));
      V.forEach((v, i) => tl.to(v, { y: 18, duration: 0.25, ease: "power2.out" }, TODO2 + 0.1 + i * 0.12));
      golpe(q(".s07-edad"), EDAD, -3);
      tl.to(q(".s07-cabeza"), { y: 6, duration: 0.25, ease: "power2.out" }, EDAD);
      tl.to(q(".s07-boca"), { attr: { d: "M-22 -38 Q0 -50 22 -38" }, duration: 0.2 }, EDAD);
      tl.to(q(".s07-ceja-i"), { attr: { d: "M-64 -142 L-16 -150" }, duration: 0.2 }, EDAD);
      tl.to(q(".s07-ceja-d"), { attr: { d: "M16 -150 L64 -142" }, duration: 0.2 }, EDAD);
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.2 },
    { t: 0.95, sfx: "pop", vol: 0.3 },
    { t: 1.3, sfx: "pop", vol: 0.25 },
    { t: 2.45, sfx: "sparkle", vol: 0.22 },
    { t: 2.95, sfx: "impact-bass-1", vol: 0.4, max: 0.5 },
    { t: 3.2, sfx: "uuh", vol: 0.3 },
  ],
});

// ---------------- s08-otra-cuadra ----------------
escena({
  id: "s08-otra-cuadra",
  dur: 4.83,
  css: `
    [data-composition-id="s08-otra-cuadra"] .s08-preg { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 130px; line-height: 1; color: ${C.ama}; -webkit-text-stroke: 10px ${C.som}; paint-order: stroke fill; }
    [data-composition-id="s08-otra-cuadra"] .s08-mapa { position: absolute; left: 100px; top: 600px; width: 880px; height: 840px; border: 8px solid ${C.crema}; border-radius: 30px; background: #2a2433; overflow: hidden; }
    [data-composition-id="s08-otra-cuadra"] .s08-busca { position: absolute; left: 30px; right: 30px; top: 26px; height: 80px; border-radius: 40px; background: ${C.crema}; color: ${C.som}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; line-height: 80px; padding-left: 36px; z-index: 2; }
    [data-composition-id="s08-otra-cuadra"] .s08-rot { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; white-space: nowrap; letter-spacing: 0.04em; }`,
  html: `
      <div class="capa s08-cam"><div class="capa s08-sac">
        <div class="capa s08-a">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${HIJO("s08-a", { x: 230, y: 1060, s: 0.62, pose: ["frente", "frente"] })}
            ${HIJO("s08-b", { x: 540, y: 1010, s: 0.66, pose: ["frente", "frente"] })}
            ${HIJO("s08-c", { x: 850, y: 1060, s: 0.62, pose: ["frente", "frente"] })}
            <g class="s08-celus">
              <rect x="205" y="1180" width="50" height="80" rx="8" fill="${C.ama}" stroke="${C.som}" stroke-width="5" />
              <rect x="515" y="1140" width="50" height="80" rx="8" fill="${C.ama}" stroke="${C.som}" stroke-width="5" />
              <rect x="825" y="1180" width="50" height="80" rx="8" fill="${C.ama}" stroke="${C.som}" stroke-width="5" />
            </g>
          </svg>
          <div class="s08-preg" style="left: 196px; top: 640px">?</div>
          <div class="s08-preg" style="left: 506px; top: 600px">?</div>
          <div class="s08-preg" style="left: 816px; top: 640px">?</div>
        </div>
        <div class="capa s08-b">
          <div class="s08-mapa">
            <div class="s08-busca">${"pizza cerca".split("").map((c) => `<span class="s08-l">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div>
            <svg viewBox="0 0 880 840" style="width:880px;height:840px" aria-hidden="true">
              <path d="M0 330 H880 M0 620 H880 M300 120 V840 M600 120 V840" stroke="${C.crema}" stroke-width="34" opacity="0.22" />
              <g class="s08-mio">
                <rect x="70" y="450" width="170" height="120" rx="10" fill="${C.tom}" stroke="${C.crema}" stroke-width="5" />
                <path d="M60 460 L155 400 L250 460 Z" fill="${C.crema}" />
              </g>
              <g class="s08-otra">
                <rect x="660" y="190" width="170" height="120" rx="10" fill="${C.som}" stroke="${C.crema}" stroke-width="5" />
                <path d="M650 200 L745 140 L840 200 Z" fill="${C.crema}" opacity="0.7" />
              </g>
              <circle class="s08-onda" cx="745" cy="250" r="90" fill="none" stroke="${C.ama}" stroke-width="7" />
              <g class="s08-pin"><path d="M705 150 C705 90 785 90 785 150 C785 196 745 214 745 244 C745 214 705 196 705 150 Z" fill="${C.rojo}" stroke="${C.som}" stroke-width="6" /><circle cx="745" cy="148" r="16" fill="${C.crema}" /></g>
            </svg>
            <div class="s08-rot" style="left: 90px; top: 580px; color: ${C.crema}">EL HORNO</div>
            <div class="s08-rot s08-rot-otra" style="left: 560px; top: 326px; color: ${C.ama}">LA OTRA CUADRA</div>
            <div class="s08-preg s08-preg-mio" style="left: 120px; top: 280px; font-size: 110px; color: ${C.crema}">?</div>
          </div>
        </div>
      </div></div>`,
  js: `
      const SABEN = 0.58, EXISTIS = 0.95, BUSCAN = 2.04, SALE = 3.29, OTRA = 3.76;
      mano(q(".s08-cam"), DUR, 7);
      // los amigos mirando el celular, sin idea
      tl.to(qa(".s08-celus rect"), { opacity: 0.6, duration: 0.2, yoyo: true, repeat: 5 }, 0);
      const P = qa(".s08-a .s08-preg");
      P.forEach((p, i) => pop(p, EXISTIS - 0.1 + i * 0.1, 0.3, 0.2));
      P.forEach((p, i) => tl.to(p, { rotation: i % 2 ? 12 : -12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, EXISTIS + 0.3));
      ["s08-a", "s08-b", "s08-c"].forEach((p, i) => tl.to(q("." + p + "cabeza"), { y: -8, duration: 0.14, yoyo: true, repeat: 1 }, SABEN + i * 0.08));
      // corte al mapa: buscan pizza
      const B = q(".s08-b");
      gsap.set(B, { opacity: 0 });
      tl.set(q(".s08-a"), { opacity: 0 }, 1.96);
      tl.set(B, { opacity: 1 }, 1.96);
      const L = qa(".s08-l");
      gsap.set(L, { opacity: 0 });
      L.forEach((l, i) => tl.set(l, { opacity: 1 }, BUSCAN + i * 0.045));
      // "les sale": el pin cae en la otra
      gsap.set([q(".s08-pin"), q(".s08-onda"), q(".s08-rot-otra"), q(".s08-preg-mio")], { opacity: 0 });
      tl.fromTo(q(".s08-pin"), { opacity: 1, y: -300 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, SALE - 0.1);
      tl.fromTo(q(".s08-onda"), { opacity: 1, scale: 0.3, svgOrigin: "745 250" }, { opacity: 0, scale: 1.6, svgOrigin: "745 250", duration: 0.6, ease: "power2.out", immediateRender: false }, SALE + 0.25);
      tl.fromTo(q(".s08-onda"), { opacity: 1, scale: 0.3, svgOrigin: "745 250" }, { opacity: 0, scale: 1.6, svgOrigin: "745 250", duration: 0.6, ease: "power2.out", immediateRender: false }, SALE + 0.75);
      tl.to(q(".s08-mio"), { opacity: 0.3, duration: 0.3 }, SALE + 0.2);
      entra(q(".s08-rot-otra"), OTRA - 0.1, 20, 0.25);
      pop(q(".s08-preg-mio"), OTRA, 0.3, 0.3);
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.2 },
    { t: 0.9, sfx: "pop", vol: 0.28 },
    { t: 2.04, sfx: "typing", vol: 0.22, max: 0.5 },
    { t: 3.2, sfx: "whoosh-short", vol: 0.25 },
    { t: 3.5, sfx: "ping", vol: 0.3 },
    { t: 3.8, sfx: "uuh", vol: 0.25 },
  ],
});

// ---------------- s09-la-mejor ----------------
const PIZZA = `
          <g class="s09-pizza">
            <circle cx="540" cy="960" r="300" fill="${C.tom}" stroke="${C.crema}" stroke-width="7" />
            <circle cx="540" cy="960" r="258" fill="${C.ama}" opacity="0.85" />
            <path d="M330 900 Q380 860 420 910 Q460 960 400 990 Z M600 760 Q660 740 680 800 Q640 840 600 800 Z M620 1080 Q690 1060 720 1120 Q660 1160 620 1120 Z M430 1120 Q470 1100 500 1140 Q460 1180 430 1150 Z" fill="${C.crema}" opacity="0.8" />
            <path d="M540 702 V1218 M282 960 H798 M358 778 L722 1142 M722 778 L358 1142" stroke="${C.tom}" stroke-width="6" opacity="0.6" />
            ${[[440, 820], [660, 900], [470, 1040], [610, 1160], [380, 960], [720, 1030], [560, 880]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="${C.som}" /><circle cx="${x}" cy="${y}" r="6" fill="${C.tom}" />`).join("")}
          </g>
          <g class="s09-vapor"><path class="s09-v" d="M440 640 Q420 600 440 570 Q460 540 440 510" fill="none" stroke="${C.crema}" stroke-width="7" stroke-linecap="round" opacity="0.6" />
            <path class="s09-v" d="M540 630 Q520 590 540 560 Q560 530 540 500" fill="none" stroke="${C.crema}" stroke-width="7" stroke-linecap="round" opacity="0.6" />
            <path class="s09-v" d="M640 640 Q620 600 640 570 Q660 540 640 510" fill="none" stroke="${C.crema}" stroke-width="7" stroke-linecap="round" opacity="0.6" /></g>
          <g class="s09-medalla">
            <path d="M800 690 L770 790 L810 770 L830 810 L850 700 Z M860 690 L890 790 L850 770 L830 810 L810 700 Z" fill="${C.rojo}" stroke="${C.som}" stroke-width="5" />
            <circle cx="830" cy="660" r="70" fill="${C.ama}" stroke="${C.som}" stroke-width="7" />
            <circle cx="830" cy="660" r="52" fill="none" stroke="${C.som}" stroke-width="4" opacity="0.5" />
            <text x="830" y="688" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="78" fill="${C.som}">1</text>
          </g>`;
escena({
  id: "s09-la-mejor",
  dur: 4.01,
  css: `
    [data-composition-id="s09-la-mejor"] .s09-cinta { position: absolute; left: 140px; top: 1300px; width: 800px; height: 120px; background: ${C.rojo}; border: 7px solid ${C.som}; border-radius: 12px; text-align: center; }
    [data-composition-id="s09-la-mejor"] .s09-cinta-t { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; line-height: 106px; color: ${C.crema}; letter-spacing: 0.01em; text-transform: uppercase; white-space: nowrap; }`,
  html: `
      <div class="capa s09-cam"><div class="capa s09-sac">
        <div class="capa s09-a">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">${PIZZA}</svg>
          <div class="s09-cinta"><div class="s09-cinta-t">La mejor del barrio</div></div>
        </div>
        <div class="capa s09-b">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${PAPA("s09-", {
              x: 540, y: 1180, s: 1.7, pose: ["abajo", "abajo"],
              extra: `<circle class="s09-brillo" cx="-33" cy="-126" r="4" fill="${C.som}" /><circle class="s09-brillo" cx="43" cy="-126" r="4" fill="${C.som}" />
                <path class="s09-lagrima" d="M-46 -100 Q-38 -84 -46 -72 Q-56 -84 -46 -100 Z" fill="${C.azul}" stroke="${C.crema}" stroke-width="3" />`,
            })}
          </svg>
        </div>
      </div></div>`,
  js: `
      const MEJOR = 0.52, BARRIO = 1.26, LAMEJOR = 2.61, MEJOR2 = 2.81;
      mano(q(".s09-cam"), DUR, 7);
      // la pizza gira despacito, sale vapor
      tl.fromTo(q(".s09-pizza"), { rotation: -6, svgOrigin: "540 960", scale: 0.92 }, { rotation: 6, svgOrigin: "540 960", scale: 1, duration: 2.5, ease: "sine.out" }, 0);
      dibujar(qa(".s09-v"), 0.0, 0.5, 0.12);
      tl.to(qa(".s09-v"), { y: -20, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.4);
      // "la mejor": la medalla
      gsap.set(q(".s09-medalla"), { opacity: 0 });
      tl.fromTo(q(".s09-medalla"), { opacity: 0, scale: 2.4, svgOrigin: "830 700", rotation: -30 }, { opacity: 1, scale: 1, svgOrigin: "830 700", rotation: 8, duration: 0.18, ease: "power4.in", immediateRender: false }, MEJOR - 0.1);
      sacudon(q(".s09-sac"), MEJOR + 0.1, 1);
      tl.to(q(".s09-medalla"), { rotation: -6, svgOrigin: "830 700", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, MEJOR + 0.3);
      tl.fromTo(q(".s09-cinta"), { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, BARRIO - 0.15);
      gsap.set(q(".s09-cinta"), { opacity: 0 });
      // "¿la mejor?": primer plano del padre, emocionado
      const B = q(".s09-b");
      gsap.set(B, { opacity: 0 });
      tl.set(q(".s09-a"), { opacity: 0 }, 2.5);
      tl.set(B, { opacity: 1 }, 2.5);
      gsap.set(q(".s09-ceja-i"), { attr: { d: "M-64 -142 L-16 -160" } });
      gsap.set(q(".s09-ceja-d"), { attr: { d: "M16 -160 L64 -142" } });
      gsap.set(q(".s09-boca"), { attr: { d: "M-12 -40 Q0 -28 12 -40" } });
      tl.fromTo(B, { scale: 1, transformOrigin: "540px 960px" }, { scale: 1.12, transformOrigin: "540px 960px", duration: 1.5, ease: "power1.out" }, 2.5);
      tl.to(q(".s09-bigote"), { x: 2, duration: 0.05, yoyo: true, repeat: 13, ease: "none" }, MEJOR2);
      gsap.set(q(".s09-lagrima"), { opacity: 0 });
      tl.fromTo(q(".s09-lagrima"), { opacity: 1, y: 0 }, { opacity: 1, y: 60, duration: 0.9, ease: "power1.in", immediateRender: false }, MEJOR2 + 0.1);
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.2 },
    { t: 0.45, sfx: "impact-bass-1", vol: 0.38, max: 0.5 },
    { t: 0.6, sfx: "chime", vol: 0.3 },
    { t: 1.15, sfx: "pop", vol: 0.28 },
    { t: 2.85, sfx: "sparkle", vol: 0.2 },
  ],
});

// ---------------- s10-asi-no ----------------
escena({
  id: "s10-asi-no",
  dur: 6.32,
  css: `
    [data-composition-id="s10-asi-no"] .s10-hijo { transform-origin: 540px 1300px; }
    [data-composition-id="s10-asi-no"] .s10-no { top: 1240px; left: 380px; right: 0; font-size: 220px; color: ${C.rojo}; -webkit-text-stroke: 14px ${C.som}; }
    [data-composition-id="s10-asi-no"] .s10-asi { position: absolute; left: 540px; top: 620px; width: 440px; text-align: center; font-size: 34px; }`,
  html: `
      <div class="capa s10-cam"><div class="capa s10-sac">
        <div class="capa s10-frente-c">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${FRENTE("s10-", { x: 560, y: 700, s: 0.5 })}
            <path class="s10-tela" d="M570 770 L640 770 L570 840 Z M570 800 L605 770 M570 820 L625 770" fill="none" stroke="${C.crema}" stroke-width="3" opacity="0.8" />
            <path class="s10-tela" d="M970 940 L900 940 L970 1010 Z M970 970 L935 940 M970 990 L915 940" fill="none" stroke="${C.crema}" stroke-width="3" opacity="0.8" />
            <path class="s10-corazon" d="M770 920 C770 880 820 870 830 905 C840 870 890 880 890 920 C890 960 830 990 830 1010 C830 990 770 960 770 920 Z" fill="${C.rojo}" stroke="${C.som}" stroke-width="6" />
          </svg>
          <div class="osd s10-asi">ASÍ COMO ESTÁ</div>
        </div>
        <div class="capa s10-hijo">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${HIJO("s10-", { x: 540, y: 1190, s: 1.6, pose: ["abajo", "abajo"] })}
          </svg>
        </div>
        <div class="big s10-no">NO.</div>
      </div></div>`,
  js: `
      const MEJOR = 0.19, POR = 1.36, NO = 2.89, NEGOCIO = 3.79, ASI = 4.81, NO2 = 5.53;
      mano(q(".s10-cam"), DUR, 8);
      // da vuelta la cámara: selfie
      tl.fromTo(q(".s10-hijo"), { rotationY: 70, x: 200, opacity: 0.3 }, { rotationY: 0, x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      // "la mejor, viejo": sonríe
      tl.to(qa(".s10-ojo"), { attr: { ry: 5 }, duration: 0.12 }, MEJOR + 0.1);
      tl.to(q(".s10-boca"), { attr: { d: "M-34 -58 Q0 -24 34 -58" }, duration: 0.15 }, MEJOR + 0.1);
      // "por eso te lo digo": asiente
      tl.to(q(".s10-cabeza"), { y: 10, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, POR);
      tl.to(qa(".s10-ojo"), { attr: { ry: 13 }, duration: 0.12 }, POR + 0.4);
      tl.to(q(".s10-boca"), { attr: { d: "M-24 -50 Q0 -44 24 -50" }, duration: 0.15 }, POR + 0.4);
      // "no es que no quiera el negocio": se corre y aparece el local
      tl.to(q(".s10-hijo"), { x: -250, scale: 0.78, duration: 0.4, ease: "power3.inOut" }, NO - 0.15);
      const F = q(".s10-frente-c");
      gsap.set(F, { opacity: 0 });
      tl.fromTo(F, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, NO);
      gsap.set(q(".s10-corazon"), { opacity: 0 });
      tl.fromTo(q(".s10-corazon"), { opacity: 0, scale: 0.3, svgOrigin: "830 950" }, { opacity: 1, scale: 1, svgOrigin: "830 950", duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, NEGOCIO - 0.1);
      tl.to(q(".s10-corazon"), { scale: 1.12, svgOrigin: "830 950", duration: 0.14, yoyo: true, repeat: 3 }, NEGOCIO + 0.25);
      // "así como está": telarañas, el toldo se cae, el corazón se va
      gsap.set(qa(".s10-tela"), { opacity: 0 });
      entra(q(".s10-asi"), ASI - 0.1, 20, 0.2);
      tl.to(q(".s10-corazon"), { opacity: 0, y: 40, duration: 0.25 }, ASI);
      tl.to(qa(".s10-tela"), { opacity: 0.8, duration: 0.15, stagger: 0.1 }, ASI);
      tl.to(q(".s10-toldo"), { rotation: 7, svgOrigin: "0 0", duration: 0.35, ease: "bounce.out" }, ASI + 0.2);
      tl.to(q(".s10-frente"), { opacity: 0.7, duration: 0.3 }, ASI + 0.2);
      // "no.": golpe, niega con la cabeza
      golpe(q(".s10-no"), NO2, -6);
      sacudon(q(".s10-sac"), NO2 + 0.03, 1.8);
      tl.to(q(".s10-cabeza"), { x: 14, duration: 0.09, yoyo: true, repeat: 5, ease: "sine.inOut" }, NO2 - 0.3);
`,
  sfx: [
    { t: 0.0, sfx: "glitch-2", vol: 0.25, max: 0.35 },
    { t: 0.05, sfx: "whoosh", vol: 0.25 },
    { t: 2.8, sfx: "whoosh-short", vol: 0.25 },
    { t: 3.75, sfx: "pop", vol: 0.3 },
    { t: 4.85, sfx: "glitch-1", vol: 0.2, max: 0.3 },
    { t: 5.42, sfx: "impact-bass-2", vol: 0.48, max: 0.7 },
  ],
});
