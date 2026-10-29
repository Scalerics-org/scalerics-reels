import { escena, PAPA, HIJO, C } from "./base.mjs";
import { CARTEL, RELOJ, MOSTRADOR, FRENTE } from "./piezas.mjs";

// ---------------- s11-cuanto ----------------
escena({
  id: "s11-cuanto",
  dur: 5.74,
  css: `
    [data-composition-id="s11-cuanto"] .s11-tel { position: absolute; left: 330px; top: 700px; width: 420px; height: 600px; border: 9px solid ${C.crema}; border-radius: 52px; background: ${C.som}; overflow: hidden; box-shadow: 10px 10px 0 rgba(26, 22, 34, 0.6); }
    [data-composition-id="s11-cuanto"] .s11-quedo { top: 1340px; font-size: 120px; color: ${C.ama}; }
    [data-composition-id="s11-cuanto"] .s11-punto { position: absolute; top: 640px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; line-height: 1; color: ${C.ama}; -webkit-text-stroke: 8px ${C.som}; paint-order: stroke fill; }
    [data-composition-id="s11-cuanto"] .s11-cuanto { top: 1330px; font-size: 104px; color: ${C.ama}; }`,
  html: `
      <div class="capa s11-cam"><div class="capa s11-sac">
        <div class="capa s11-a">
          <div class="s11-tel">
            <svg viewBox="0 0 1080 1920" aria-hidden="true">${FRENTE("s11-", { x: 28, y: 110, s: 0.42 })}</svg>
          </div>
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <path class="s11-wifi" d="M500 650 Q540 620 580 650" fill="none" stroke="${C.ama}" stroke-width="12" stroke-linecap="round" />
            <path class="s11-wifi" d="M460 618 Q540 562 620 618" fill="none" stroke="${C.ama}" stroke-width="12" stroke-linecap="round" />
            <path class="s11-wifi" d="M420 586 Q540 504 660 586" fill="none" stroke="${C.ama}" stroke-width="12" stroke-linecap="round" />
          </svg>
          <div class="big s11-quedo">Me quedo.</div>
        </div>
        <div class="capa s11-b">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${CARTEL("s11-")}
            ${RELOJ("s11-")}
            ${PAPA("s11-", { x: 540, y: 900, pose: ["abajo", "abajo"] })}
            ${MOSTRADOR("s11-")}
          </svg>
          <div class="s11-punto" style="left: 690px">.</div>
          <div class="s11-punto" style="left: 740px">.</div>
          <div class="s11-punto" style="left: 790px">.</div>
          <div class="big s11-cuanto">¿Cuánto lleva?</div>
        </div>
      </div></div>`,
  js: `
      const PONEMOS = 0.28, INTERNET = 0.86, QUEDO = 1.83, Y = 3.77, CUANTO = 4.17;
      mano(q(".s11-cam"), DUR, 7);
      // el local entra en el celular
      tl.fromTo(q(".s11-tel"), { scale: 0.8, opacity: 0.5, y: 80 }, { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s11-frente"), { scale: 1.5, svgOrigin: "420 400", opacity: 0 }, { scale: 1, svgOrigin: "420 400", opacity: 1, duration: 0.4, ease: "power3.out" }, PONEMOS);
      const W = qa(".s11-wifi");
      gsap.set(W, { opacity: 0 });
      W.forEach((w, i) => tl.to(w, { opacity: 1, duration: 0.08 }, INTERNET + i * 0.12));
      tl.to(W, { opacity: 0.35, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08 }, INTERNET + 0.45);
      golpe(q(".s11-quedo"), QUEDO, -3);
      sacudon(q(".s11-sac"), QUEDO + 0.03, 1.2);
      // corte al padre: silencio, piensa
      const B = q(".s11-b");
      gsap.set(B, { opacity: 0 });
      tl.set(q(".s11-a"), { opacity: 0 }, 2.45);
      tl.set(B, { opacity: 1 }, 2.45);
      tl.fromTo(q(".s11-b svg"), { scale: 1, transformOrigin: "540px 800px" }, { scale: 1.12, transformOrigin: "540px 800px", duration: 3.2, ease: "none" }, 2.45);
      const PT = qa(".s11-punto");
      PT.forEach((p, i) => pop(p, 2.65 + i * 0.36, 0.25, 0.2));
      [2.7, 3.06, 3.42].forEach((t) => tl.to(q(".s11-aguja"), { rotation: "+=30", svgOrigin: "905 700", duration: 0.08, ease: "back.out(3)" }, t));
      tl.to(qa(".s11-ojo"), { x: 10, duration: 0.25, ease: "power2.inOut" }, 2.7);
      tl.to(qa(".s11-ojo"), { x: -6, duration: 0.25, ease: "power2.inOut" }, 3.2);
      // "¿y eso cuánto lleva?": se rasca la cabeza
      tl.to(PT, { opacity: 0, duration: 0.15 }, Y - 0.1);
      tl.to(qa(".s11-ojo"), { x: 0, duration: 0.15 }, Y);
      pose("s11-", "d", "cabeza", Y - 0.05, 0.3);
      tl.to(q(".s11-ceja-d"), { attr: { d: "M16 -164 L64 -176" }, duration: 0.2 }, Y);
      tl.to(q(".s11-boca"), { attr: { d: "M-20 -42 Q8 -48 26 -36" }, duration: 0.2 }, Y);
      tl.to(q(".s11-brazo-d"), { y: -8, duration: 0.1, yoyo: true, repeat: 5 }, Y + 0.35);
      golpe(q(".s11-cuanto"), CUANTO, 2, 2);
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.2 },
    { t: 0.86, sfx: "sparkle", vol: 0.22 },
    { t: 1.75, sfx: "impact-bass-1", vol: 0.4, max: 0.5 },
    { t: 2.6, sfx: "click-soft", vol: 0.3 },
    { t: 3.0, sfx: "click-soft", vol: 0.3 },
    { t: 3.4, sfx: "click-soft", vol: 0.3 },
    { t: 4.1, sfx: "pop", vol: 0.3 },
    { t: 5.2, sfx: "glitch-3", vol: 0.25, max: 0.4 },
  ],
});

// ---------------- s12-sitio ----------------
escena({
  id: "s12-sitio",
  dur: 9.55,
  css: `
    [data-composition-id="s12-sitio"] .s12-azul { position: absolute; inset: 0; background: ${C.azul}; }
    [data-composition-id="s12-sitio"] .s12-tel { position: absolute; left: 300px; top: 590px; width: 480px; height: 880px; border: 9px solid ${C.crema}; border-radius: 56px; background: ${C.som}; overflow: hidden; box-shadow: 12px 12px 0 rgba(26, 22, 34, 0.45); }
    [data-composition-id="s12-sitio"] .s12-cab { position: absolute; left: 0; right: 0; top: 0; height: 170px; background: ${C.tom}; text-align: center; }
    [data-composition-id="s12-sitio"] .s12-nom { padding-top: 48px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; line-height: 1; color: ${C.crema}; }
    [data-composition-id="s12-sitio"] .s12-sub { margin-top: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: ${C.crema}; letter-spacing: 0.1em; }
    [data-composition-id="s12-sitio"] .s12-barra { position: absolute; left: 0; top: 170px; width: 100%; height: 12px; background: ${C.verde}; transform-origin: 0 50%; }
    [data-composition-id="s12-sitio"] .s12-chip { position: absolute; right: 22px; top: 198px; padding: 6px 16px; border-radius: 20px; border: 4px solid ${C.verde}; color: ${C.verde}; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.08em; }
    [data-composition-id="s12-sitio"] .s12-fila { position: absolute; left: 26px; right: 26px; }
    [data-composition-id="s12-sitio"] .s12-hor { top: 262px; }
    [data-composition-id="s12-sitio"] .s12-ab { font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: ${C.crema}; white-space: nowrap; }
    [data-composition-id="s12-sitio"] .s12-ab i { display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: ${C.verde}; margin-right: 12px; vertical-align: 1px; }
    [data-composition-id="s12-sitio"] .s12-hs { margin-top: 6px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: ${C.crema}; opacity: 0.75; white-space: nowrap; }
    [data-composition-id="s12-sitio"] .s12-map { top: 380px; height: 230px; border-radius: 20px; background: #2a2433; border: 4px solid rgba(233, 223, 198, 0.4); overflow: hidden; }
    [data-composition-id="s12-sitio"] .s12-maprot { position: absolute; left: 18px; bottom: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: ${C.ama}; letter-spacing: 0.06em; }
    [data-composition-id="s12-sitio"] .s12-boton { top: 650px; height: 112px; border-radius: 56px; background: ${C.verde}; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 30px; line-height: 112px; color: ${C.som}; white-space: nowrap; }
    [data-composition-id="s12-sitio"] .s12-mas { top: 1350px; font-size: 96px; color: ${C.ama}; }`,
  html: `
      <div class="s12-azul"></div>
      <div class="capa s12-cam"><div class="capa s12-sac">
        <div class="s12-tel">
          <div class="s12-cab"><div class="s12-nom">EL HORNO</div><div class="s12-sub">PIZZA · FAINÁ</div></div>
          <div class="s12-barra"></div>
          <div class="s12-chip">RÁPIDO</div>
          <div class="s12-fila s12-hor"><div class="s12-ab"><i></i>Abierto ahora</div><div class="s12-hs">Mar a dom · 19 a 24 h</div></div>
          <div class="s12-fila s12-map">
            <svg viewBox="0 0 1080 1920" aria-hidden="true">
              <path d="M0 70 H430 M0 170 H430 M110 0 V230 M300 0 V230" stroke="${C.crema}" stroke-width="16" opacity="0.25" />
              <path class="s12-ruta" d="M40 190 L110 170 L110 70 L300 70" fill="none" stroke="${C.ama}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 0" />
              <g class="s12-pin"><path d="M276 40 C276 4 324 4 324 40 C324 62 300 74 300 92 C300 74 276 62 276 40 Z" fill="${C.rojo}" stroke="${C.som}" stroke-width="4" /><circle cx="300" cy="38" r="9" fill="${C.crema}" /></g>
            </svg>
            <div class="s12-maprot">CÓMO LLEGAR</div>
          </div>
          <div class="s12-fila s12-boton">Escribinos por WhatsApp</div>
        </div>
        <div class="capa s12-c">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <defs><clipPath id="s12-hueco"><rect x="190" y="640" width="700" height="660" /></clipPath></defs>
            <rect x="160" y="580" width="760" height="66" rx="8" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" />
            <text x="540" y="628" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="40" fill="${C.crema}">PIZZERÍA EL HORNO</text>
            <g clip-path="url(#s12-hueco)">
              <rect x="190" y="640" width="700" height="660" fill="${C.som}" />
              <rect x="190" y="640" width="700" height="660" fill="${C.ama}" opacity="0.4" />
              ${PAPA("s12-", { x: 410, y: 960, s: 0.62, pose: ["abajo", "abajo"] })}
              ${HIJO("s12-h", { x: 680, y: 975, s: 0.6, pose: ["abajo", "abajo"] })}
              <rect x="190" y="1150" width="700" height="150" fill="${C.tom}" stroke="${C.som}" stroke-width="5" />
              <rect x="190" y="1136" width="700" height="22" fill="${C.crema}" />
              <g class="s12-persiana">
                <rect x="190" y="640" width="700" height="660" fill="#3a3446" />
                <path d="${Array.from({ length: 19 }, (_, i) => `M190 ${672 + i * 34} H890`).join(" ")}" stroke="${C.crema}" stroke-width="4" opacity="0.5" />
                <rect x="500" y="1262" width="80" height="22" rx="6" fill="${C.crema}" />
              </g>
            </g>
            <rect x="182" y="640" width="716" height="664" fill="none" stroke="${C.crema}" stroke-width="8" />
          </svg>
          <div class="big s12-mas">Treinta años más</div>
        </div>
      </div></div>`,
  js: `
      const SITIO = 0.56, RAPIDO = 1.49, HORARIOS = 3.09, COMO = 3.87, BOTON = 4.86, PARA = 6.09, CORTINA = 6.55, LEVANTANDO = 7.39, TREINTA = 7.95;
      mano(q(".s12-cam"), DUR, 5);
      // pantalla azul de la casetera, entra el celular con el sitio
      tl.fromTo(q(".s12-tel"), { y: 260, opacity: 0.4, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s12-cab"), { opacity: 0.3 }, { opacity: 1, duration: 0.25 }, SITIO);
      // "rápido": la barra de carga se llena de una
      gsap.set(q(".s12-barra"), { scaleX: 0 });
      tl.to(q(".s12-barra"), { scaleX: 1, duration: 0.25, ease: "power3.out" }, RAPIDO);
      pop(q(".s12-chip"), RAPIDO + 0.2, 0.3);
      // "horarios"
      entra(q(".s12-hor"), HORARIOS - 0.15, 30);
      tl.to(q(".s12-ab i"), { scale: 1.4, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, HORARIOS + 0.2);
      // "cómo llegar"
      entra(q(".s12-map"), COMO - 0.2, 30);
      dibujar(q(".s12-ruta"), COMO + 0.1, 0.5);
      tl.fromTo(q(".s12-pin"), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "bounce.out", immediateRender: false }, COMO + 0.4);
      gsap.set(q(".s12-pin"), { opacity: 0 });
      // "botón a WhatsApp"
      pop(q(".s12-boton"), BOTON - 0.1, 0.35, 0.5);
      tl.to(q(".s12-boton"), { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, BOTON + 0.5);
      // "para que la cortina...": la persiana sube y están los dos
      const Cc = q(".s12-c");
      gsap.set(Cc, { opacity: 0 });
      tl.to(q(".s12-tel"), { x: -700, rotation: -8, opacity: 0, duration: 0.35, ease: "power3.in" }, PARA - 0.2);
      tl.fromTo(Cc, { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, PARA);
      tl.fromTo(q(".s12-persiana"), { y: 0 }, { y: -540, duration: 1.3, ease: "power2.inOut" }, CORTINA);
      tl.to(q(".s12-papa"), { y: -10, duration: 0.15, yoyo: true, repeat: 3 }, LEVANTANDO + 0.3);
      tl.to(q(".s12-hhijo"), { y: -10, duration: 0.15, yoyo: true, repeat: 3 }, LEVANTANDO + 0.4);
      gsap.set(q(".s12-boca"), { attr: { d: "M-26 -46 Q0 -22 26 -46" } });
      pose("s12-", "d", "arriba", LEVANTANDO + 0.2, 0.3);
      pose("s12-h", "i", "arriba", LEVANTANDO + 0.25, 0.3);
      golpe(q(".s12-mas"), TREINTA, -3);
      sacudon(q(".s12-sac"), TREINTA + 0.03, 1);
`,
  sfx: [
    { t: 0.0, sfx: "glitch-1", vol: 0.25, max: 0.3 },
    { t: 0.1, sfx: "whoosh", vol: 0.25 },
    { t: 1.49, sfx: "sparkle", vol: 0.2 },
    { t: 1.7, sfx: "pop", vol: 0.28 },
    { t: 3.0, sfx: "pop", vol: 0.25 },
    { t: 4.3, sfx: "ping", vol: 0.28 },
    { t: 5.4, sfx: "click", vol: 0.32 },
    { t: 6.55, sfx: "whoosh-cinematic", vol: 0.25, max: 1.4 },
    { t: 7.85, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
    { t: 8.0, sfx: "chime", vol: 0.28 },
  ],
});

// ---------------- s13-cta ----------------
const RUEDA = (cx) => `<g class="s13-rueda" data-cx="${cx}">
      <circle cx="${cx}" cy="1090" r="48" fill="${C.crema}" stroke="${C.som}" stroke-width="5" />
      <circle cx="${cx}" cy="1090" r="16" fill="${C.som}" />
      <path d="M${cx} 1050 V1074 M${cx} 1106 V1130 M${cx - 40} 1090 H${cx - 16} M${cx + 16} 1090 H${cx + 40}" stroke="${C.som}" stroke-width="7" stroke-linecap="round" />
    </g>`;
escena({
  id: "s13-cta",
  dur: 5.39,
  css: `
    [data-composition-id="s13-cta"] .s13-azul { position: absolute; inset: 0; background: ${C.azul}; }
    [data-composition-id="s13-cta"] .s13-l1 { position: absolute; left: 0; right: 0; top: 806px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1; color: ${C.som}; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="s13-cta"] .s13-l2 { position: absolute; left: 0; right: 0; top: 884px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 80px; line-height: 1; color: ${C.rojo}; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="s13-cta"] .s13-w, [data-composition-id="s13-cta"] .s13-w2 { display: inline-block; }
    [data-composition-id="s13-cta"] .s13-firma { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-size: 40px; }`,
  html: `
      <div class="s13-azul"></div>
      <div class="capa s13-cam"><div class="capa s13-sac">
        <div class="capa s13-casete">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <rect x="130" y="700" width="820" height="540" rx="34" fill="${C.som}" stroke="${C.crema}" stroke-width="9" />
            <rect x="190" y="760" width="700" height="220" rx="14" fill="${C.crema}" />
            <path d="M190 780 H890" stroke="${C.rojo}" stroke-width="10" />
            <path d="M190 960 H890" stroke="${C.ama}" stroke-width="10" />
            <rect x="330" y="1030" width="420" height="120" rx="60" fill="#3a3446" stroke="${C.crema}" stroke-width="6" />
            ${RUEDA(420)}${RUEDA(660)}
            <path d="M300 1240 L340 1170 H740 L780 1240" fill="none" stroke="${C.crema}" stroke-width="7" stroke-linejoin="round" />
            <circle cx="380" cy="1205" r="10" fill="${C.crema}" /><circle cx="700" cy="1205" r="10" fill="${C.crema}" />
          </svg>
          <div class="s13-l1"><span class="s13-w">Mandáselo</span> <span class="s13-w">a</span> <span class="s13-w">tu</span> <span class="s13-w">viejo.</span></div>
          <div class="s13-l2"><span class="s13-w2">O a tu hijo.</span></div>
        </div>
        <div class="osd s13-firma">SCALERICS · SITIOS WEB</div>
      </div></div>`,
  js: `
      const MANDA = 0, VIEJO = 0.55, O = 1.48, HIJO = 1.81;
      mano(q(".s13-cam"), DUR, 4);
      tl.fromTo(q(".s13-casete"), { y: 220, rotation: 4, opacity: 0.5 }, { y: 0, rotation: -1.5, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, 0);
      // las ruedas giran
      qa(".s13-rueda").forEach((r) => tl.to(r, { rotation: 720, svgOrigin: r.dataset.cx + " 1090", duration: DUR, ease: "none" }, 0));
      const W = qa(".s13-w");
      [0, 0.45, 0.48, 0.55].forEach((t, i) => pop(W[i], MANDA + t, 0.25, 0.4));
      golpe(q(".s13-w2"), O + 0.05, -2, 2);
      gsap.set(q(".s13-w2"), { display: "inline-block" });
      sacudon(q(".s13-sac"), O + 0.08, 0.9);
      entra(q(".s13-firma"), 2.3, 20);
      tl.to(q(".s13-casete"), { y: -10, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.4);
`,
  sfx: [
    { t: 0.0, sfx: "click", vol: 0.3 },
    { t: 0.1, sfx: "whoosh", vol: 0.22 },
    { t: 1.4, sfx: "impact-bass-2", vol: 0.38, max: 0.6 },
    { t: 2.3, sfx: "chime", vol: 0.25 },
  ],
});
