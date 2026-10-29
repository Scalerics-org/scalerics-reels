import { escena, PAPA, C } from "./base.mjs";
import { CARTEL, RELOJ, MOSTRADOR, FRENTE } from "./piezas.mjs";

const TELCSS = (id, p) => `
    [data-composition-id="${id}"] .${p}tel { position: absolute; left: 270px; top: 600px; width: 540px; height: 860px; border: 9px solid ${C.crema}; border-radius: 58px; background: ${C.som}; overflow: hidden; box-shadow: 10px 10px 0 rgba(26, 22, 34, 0.6); }
    [data-composition-id="${id}"] .${p}barra { position: absolute; left: 36px; right: 36px; top: 76px; height: 78px; border-radius: 39px; background: ${C.crema}; color: ${C.som}; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 78px; padding-left: 32px; white-space: nowrap; }
    [data-composition-id="${id}"] .${p}tarjeta { position: absolute; left: 36px; right: 36px; top: 196px; height: 560px; border-radius: 24px; background: #2a2433; border: 4px solid rgba(233, 223, 198, 0.4); }
    [data-composition-id="${id}"] .${p}mapa { position: absolute; left: 24px; right: 24px; top: 24px; height: 220px; border-radius: 14px; background: ${C.azul}; opacity: 0.85; overflow: hidden; }
    [data-composition-id="${id}"] .${p}nombre { position: absolute; left: 28px; top: 270px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 42px; color: ${C.crema}; white-space: nowrap; }
    [data-composition-id="${id}"] .${p}rubro { position: absolute; left: 28px; top: 328px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: ${C.crema}; opacity: 0.7; white-space: nowrap; }
    [data-composition-id="${id}"] .${p}estado { position: absolute; left: 28px; top: 392px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 27px; color: ${C.rojo}; white-space: nowrap; }`;
const TELHTML = (p, letras = true) => `
        <div class="${p}tel">
          <div class="${p}barra">${letras ? "pizzería el horno".split("").map((c) => `<span class="${p}l">${c === " " ? "&nbsp;" : c}</span>`).join("") : "pizzería el horno"}</div>
          <div class="${p}tarjeta">
            <div class="${p}mapa"><svg viewBox="0 0 400 220" style="width:400px;height:220px" aria-hidden="true">
              <path d="M0 80 H400 M0 170 H400 M120 0 V220 M290 0 V220" stroke="${C.crema}" stroke-width="10" opacity="0.5" />
              <path d="M205 60 C205 30 245 30 245 60 C245 85 225 100 225 112 C225 100 205 85 205 60 Z" fill="${C.rojo}" stroke="${C.som}" stroke-width="4" />
            </svg></div>
            <div class="${p}nombre" data-layout-ignore>Pizzería El Horno</div>
            <div class="${p}rubro" data-layout-ignore>Pizzería · Barrio</div>
            <div class="${p}estado" data-layout-ignore>CERRADO PERMANENTEMENTE</div>
          </div>
        </div>`;

// ---------------- s03-cerrado ----------------
escena({
  id: "s03-cerrado",
  dur: 5.54,
  css: TELCSS("s03-cerrado", "s03-") + `
    [data-composition-id="s03-cerrado"] .s03-sello { position: absolute; left: 150px; top: 960px; width: 780px; padding: 22px 0 26px; border: 12px solid ${C.rojo}; border-radius: 18px; text-align: center; background: rgba(26, 22, 34, 0.55); }
    [data-composition-id="s03-cerrado"] .s03-sello .big { position: static; color: ${C.rojo}; -webkit-text-stroke: 0; text-shadow: 4px 0 0 rgba(43, 76, 209, 0.6); }
    [data-composition-id="s03-cerrado"] .s03-s1 { font-size: 132px; }
    [data-composition-id="s03-cerrado"] .s03-s2 { font-size: 62px; margin-top: 10px; letter-spacing: 0.01em; }`,
  html: `
      <div class="capa s03-cam"><div class="capa s03-sac">
        <div class="capa s03-movil">
          ${TELHTML("s03-")}
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <path d="M1140 1980 Q980 1700 800 1420" fill="none" stroke="${C.crema}" stroke-width="168" stroke-linecap="round" />
            <path d="M1140 1980 Q980 1700 800 1420" fill="none" stroke="${C.azul}" stroke-width="156" stroke-linecap="round" />
            <ellipse cx="790" cy="1400" rx="70" ry="58" fill="${C.som}" stroke="${C.crema}" stroke-width="6" />
            <path d="M742 1360 Q770 1330 800 1352" fill="none" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
          </svg>
        </div>
        <div class="s03-sello"><div class="big s03-s1">CERRADO</div><div class="big s03-s2">PERMANENTEMENTE</div></div>
      </div></div>`,
  js: `
      const PERO = 1.36, BUSQUE = 1.61, DICE = 2.8, CERRADO = 3.34, PERMA = 3.8;
      mano(q(".s03-cam"), DUR, 8);
      // el celular sube a cámara
      tl.fromTo(q(".s03-movil"), { y: 260, rotation: 6 }, { y: 0, rotation: -2, duration: 0.45, ease: "power3.out" }, 0);
      // escribe la búsqueda
      const L = qa(".s03-l");
      gsap.set(L, { opacity: 0 });
      L.forEach((l, i) => tl.set(l, { opacity: 1 }, PERO + i * 0.04));
      const tarjeta = q(".s03-tarjeta");
      entra(tarjeta, DICE - 0.35, 50);
      gsap.set(q(".s03-estado"), { opacity: 0 });
      tl.set(q(".s03-estado"), { opacity: 1 }, CERRADO);
      tl.to(q(".s03-estado"), { opacity: 0.3, duration: 0.06, yoyo: true, repeat: 5 }, CERRADO + 0.05);
      // el sello
      gsap.set(q(".s03-sello"), { opacity: 0 });
      tl.fromTo(q(".s03-sello"), { opacity: 0, scale: 2.4, rotation: -14 }, { opacity: 1, scale: 1, rotation: -7, duration: 0.14, ease: "power4.in", immediateRender: false }, PERMA - 0.1);
      sacudon(q(".s03-sac"), PERMA + 0.05, 1.8);
      tl.to(q(".s03-movil"), { opacity: 0.55, duration: 0.2 }, PERMA + 0.1);
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.22 },
    { t: 1.36, sfx: "typing", vol: 0.25, max: 0.7 },
    { t: 2.5, sfx: "click-soft", vol: 0.3 },
    { t: 3.34, sfx: "glitch-1", vol: 0.22, max: 0.3 },
    { t: 3.72, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
  ],
});

// ---------------- s04-abierto ----------------
escena({
  id: "s04-abierto",
  dur: 4.46,
  css: `
    [data-composition-id="s04-abierto"] .s04-neon { position: absolute; left: 92px; top: 620px; width: 380px; height: 140px; border: 7px solid ${C.rojo}; border-radius: 22px; background: rgba(26, 22, 34, 0.8); text-align: center;
      box-shadow: 0 0 22px ${C.rojo}, inset 0 0 16px rgba(255, 59, 59, 0.5); }
    [data-composition-id="s04-abierto"] .s04-neon-t { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 74px; line-height: 126px; color: #fff3a8; text-shadow: 0 0 8px ${C.ama}, 0 0 24px ${C.ama}; letter-spacing: 0.02em; }`,
  html: `
      <div class="capa s04-cam"><div class="capa s04-sac">
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          ${RELOJ("s04-")}
          ${PAPA("s04-", { x: 600, y: 910, pose: ["abajo", "pecho"] })}
          ${MOSTRADOR("s04-")}
          <g class="s04-radio">
            <path d="M860 1130 L940 1040" stroke="${C.crema}" stroke-width="6" stroke-linecap="round" />
            <rect x="760" y="1120" width="230" height="122" rx="18" fill="${C.tom}" stroke="${C.crema}" stroke-width="6" />
            <circle cx="820" cy="1181" r="38" fill="${C.som}" stroke="${C.crema}" stroke-width="5" />
            <circle cx="820" cy="1181" r="14" fill="${C.crema}" opacity="0.6" />
            <rect x="876" y="1146" width="90" height="30" rx="5" fill="${C.ama}" stroke="${C.som}" stroke-width="4" />
            <circle cx="900" cy="1212" r="10" fill="${C.som}" /><circle cx="944" cy="1212" r="10" fill="${C.som}" />
          </g>
          <g class="s04-notas">
            <g class="s04-nota"><ellipse cx="800" cy="1060" rx="18" ry="14" fill="${C.ama}" /><path d="M816 1058 V990 L846 1000" fill="none" stroke="${C.ama}" stroke-width="7" stroke-linecap="round" /></g>
            <g class="s04-nota"><ellipse cx="900" cy="990" rx="18" ry="14" fill="${C.crema}" /><path d="M916 988 V920 L946 930" fill="none" stroke="${C.crema}" stroke-width="7" stroke-linecap="round" /></g>
            <g class="s04-nota"><ellipse cx="990" cy="1070" rx="18" ry="14" fill="${C.ama}" /><path d="M1006 1068 V1000" fill="none" stroke="${C.ama}" stroke-width="7" stroke-linecap="round" /></g>
          </g>
        </svg>
        <div class="s04-neon"><div class="s04-neon-t">ABIERTO</div></div>
      </div></div>`,
  js: `
      const ACA = 0.5, ABIERTO = 0.9, RADIO = 2.8;
      mano(q(".s04-cam"), DUR, 8);
      gsap.set(q(".s04-ceja-i"), { attr: { d: "M-64 -164 L-16 -140" } });
      gsap.set(q(".s04-ceja-d"), { attr: { d: "M16 -140 L64 -164" } });
      gsap.set(q(".s04-boca"), { attr: { d: "M-24 -46 Q0 -12 24 -46" } });
      tl.fromTo(q(".s04-papa"), { x: 60 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      // "acá": se señala, golpe en el pecho
      tl.to(q(".s04-papa"), { y: 10, duration: 0.08, yoyo: true, repeat: 3 }, ACA);
      // "abierto": abre los brazos y se prende el cartel
      pose("s04-", "i", "arriba", ABIERTO - 0.1);
      pose("s04-", "d", "arriba", ABIERTO - 0.1);
      const neon = q(".s04-neon");
      gsap.set(neon, { opacity: 0.2 });
      [[0, 1], [0.06, 0.25], [0.12, 1], [0.2, 0.4], [0.28, 1]].forEach(([d, o]) => tl.to(neon, { opacity: o, duration: 0.02 }, ABIERTO + d));
      tl.fromTo(neon, { scale: 1.15 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, ABIERTO);
      sacudon(q(".s04-sac"), ABIERTO + 0.03, 1);
      tl.to(q(".s04-neon-t"), { opacity: 0.8, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, ABIERTO + 0.4);
      // "radio prendida": la radio salta y salen notas
      pose("s04-", "d", "frente", RADIO - 0.4);
      pose("s04-", "i", "abajo", RADIO - 0.4);
      tl.to(q(".s04-radio"), { y: -12, duration: 0.1, yoyo: true, repeat: 9, ease: "sine.inOut" }, RADIO - 0.1);
      qa(".s04-nota").forEach((n, i) => {
        gsap.set(n, { opacity: 0 });
        tl.fromTo(n, { opacity: 0, y: 40 }, { opacity: 1, y: -30, duration: 0.5, ease: "power2.out", immediateRender: false }, RADIO + i * 0.14);
        tl.to(n, { y: -60, opacity: 0.6, duration: 0.6, ease: "sine.inOut" }, RADIO + 0.5 + i * 0.14);
      });
`,
  sfx: [
    { t: 0.0, sfx: "whoosh", vol: 0.2 },
    { t: 0.5, sfx: "impact-bass-1", vol: 0.3, max: 0.4 },
    { t: 0.9, sfx: "glitch-2", vol: 0.22, max: 0.35 },
    { t: 1.0, sfx: "beep", vol: 0.2 },
    { t: 2.8, sfx: "sparkle", vol: 0.25 },
  ],
});

// ---------------- s05-pagina ----------------
escena({
  id: "s05-pagina",
  dur: 3.32,
  css: TELCSS("s05-pagina", "s05-") + `
    [data-composition-id="s05-pagina"] .s05-movil { transform-origin: 540px 1000px; }
    [data-composition-id="s05-pagina"] .s05-anda { top: 1310px; font-size: 92px; color: ${C.ama}; }
    [data-composition-id="s05-pagina"] .s05-nav { position: absolute; left: 110px; top: 620px; width: 860px; height: 640px; border: 8px solid ${C.crema}; border-radius: 20px; background: ${C.som}; overflow: hidden; }
    [data-composition-id="s05-pagina"] .s05-nav-barra { position: absolute; left: 0; right: 0; top: 0; height: 92px; background: #3a3446; border-bottom: 6px solid ${C.crema}; }
    [data-composition-id="s05-pagina"] .s05-url { position: absolute; left: 190px; right: 30px; top: 18px; height: 56px; border-radius: 28px; background: ${C.crema}; color: ${C.som}; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; line-height: 56px; padding-left: 26px; }
    [data-composition-id="s05-pagina"] .s05-preg { position: absolute; left: 0; right: 0; top: 160px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 360px; line-height: 1; color: ${C.crema}; opacity: 0.25; }
    [data-composition-id="s05-pagina"] .s05-lapag { top: 1310px; font-size: 112px; color: ${C.crema}; }`,
  html: `
      <div class="capa s05-cam"><div class="capa s05-sac">
        <div class="capa s05-a">
          <div class="capa s05-movil">${TELHTML("s05-", false)}</div>
          <div class="big s05-anda">Andá a decírselo</div>
        </div>
        <div class="capa s05-b">
          <div class="s05-nav">
            <div class="s05-nav-barra">
              <svg viewBox="0 0 1080 1920" aria-hidden="true"><circle cx="40" cy="46" r="13" fill="${C.rojo}" /><circle cx="84" cy="46" r="13" fill="${C.ama}" /><circle cx="128" cy="46" r="13" fill="${C.crema}" opacity="0.5" /></svg>
              <div class="s05-url">www.<span class="s05-q">???</span></div>
            </div>
            <div class="s05-preg">?</div>
          </div>
          <svg viewBox="0 0 1080 1920" aria-hidden="true"><path class="s05-cursor" d="M640 980 L640 1090 L668 1064 L690 1112 L708 1104 L686 1056 L724 1056 Z" fill="${C.crema}" stroke="${C.som}" stroke-width="5" stroke-linejoin="round" /></svg>
          <div class="big s05-lapag">¿La página?</div>
        </div>
      </div></div>`,
  js: `
      const DECIR = 0.37, GOOGLE = 0.93, PAGINA = 2.24;
      mano(q(".s05-cam"), DUR, 8);
      // el celular con el "cerrado" se achica y tiembla de vergüenza
      tl.fromTo(q(".s05-movil"), { scale: 1, y: 0 }, { scale: 0.78, y: -60, duration: 0.4, ease: "power3.out" }, 0);
      golpe(q(".s05-anda"), DECIR, -3);
      tl.to(q(".s05-movil"), { rotation: 4, duration: 0.06, yoyo: true, repeat: 7, ease: "sine.inOut" }, GOOGLE);
      tl.to(q(".s05-estado"), { opacity: 0.3, duration: 0.06, yoyo: true, repeat: 7 }, GOOGLE);
      // corte al navegador
      const B = q(".s05-b");
      gsap.set(B, { opacity: 0 });
      tl.set(q(".s05-a"), { opacity: 0 }, 2.0);
      tl.set(B, { opacity: 1 }, 2.0);
      tl.fromTo(q(".s05-nav"), { scale: 0.9, rotation: -3 }, { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.8)" }, 2.0);
      tl.fromTo(q(".s05-cursor"), { x: 120, y: 160 }, { x: 0, y: 0, duration: 0.3, ease: "power2.out" }, 2.0);
      tl.to(q(".s05-cursor"), { scale: 0.85, svgOrigin: "660 1040", duration: 0.06, yoyo: true, repeat: 3 }, 2.35);
      golpe(q(".s05-lapag"), PAGINA, 2);
      tl.to(q(".s05-preg"), { opacity: 0.6, duration: 0.1, yoyo: true, repeat: 5 }, PAGINA);
      tl.to(q(".s05-q"), { opacity: 0, duration: 0.05, yoyo: true, repeat: 7, repeatDelay: 0.08 }, 2.1);
`,
  sfx: [
    { t: 0.37, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
    { t: 0.95, sfx: "glitch-1", vol: 0.15, max: 0.25 },
    { t: 2.35, sfx: "click", vol: 0.32 },
    { t: 2.2, sfx: "pop", vol: 0.3 },
  ],
});

// ---------------- s06-toldo ----------------
escena({
  id: "s06-toldo",
  dur: 5.82,
  css: `
    [data-composition-id="s06-toldo"] .s06-cuenta { position: absolute; left: 0; right: 0; top: 870px; text-align: center; font-size: 62px; }
    [data-composition-id="s06-toldo"] .s06-cuenta span { display: inline-block; margin: 0 6px; }
    [data-composition-id="s06-toldo"] .s06-siete { top: 1160px; font-size: 96px; color: ${C.ama}; }
    [data-composition-id="s06-toldo"] .s06-noexiste { top: 1250px; font-size: 118px; color: ${C.rojo}; }`,
  html: `
      <div class="capa s06-cam"><div class="capa s06-sac">
        <div class="capa s06-zoom">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            ${FRENTE("s06-", { x: 120, y: 600 })}
            <ellipse class="s06-circulo" cx="540" cy="815" rx="262" ry="56" fill="none" stroke="${C.ama}" stroke-width="8" stroke-linecap="round" />
            <path class="s06-x" d="M290 770 L790 860" fill="none" stroke="${C.rojo}" stroke-width="14" stroke-linecap="round" />
            <path class="s06-x" d="M290 860 L790 770" fill="none" stroke="${C.rojo}" stroke-width="14" stroke-linecap="round" />
          </svg>
          <div class="osd s06-cuenta">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<span class="s06-n">${n}</span>`).join("")}</div>
        </div>
        <div class="big s06-noexiste">No existe</div>
      </div></div>`,
  js: `
      const TEL = 0.23, PINTADO = 0.7, TOLDO = 1.26, SIETE = 2.47, ESO = 3.93, EXISTE = 4.34;
      mano(q(".s06-cam"), DUR, 8);
      dibujar(q(".s06-circulo"), TEL, 0.45);
      // la cámara se acerca al número
      tl.fromTo(q(".s06-zoom"), { scale: 1, transformOrigin: "540px 820px" }, { scale: 1.45, transformOrigin: "540px 820px", duration: 0.6, ease: "power2.inOut" }, PINTADO);
      // el toldo flamea
      tl.to(q(".s06-toldo"), { skewX: 2, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, TOLDO);
      // cuenta los dígitos
      const N = qa(".s06-n");
      N.forEach((n, i) => pop(n, SIETE - 0.1 + i * 0.07, 0.2, 0.2));
      tl.to(q(".s06-cuenta"), { opacity: 0, duration: 0.2 }, ESO - 0.2);
      // "eso ya no existe": se tacha
      dibujar(qa(".s06-x"), ESO, 0.22, 0.15);
      tl.to(q(".s06-circulo"), { opacity: 0, duration: 0.15 }, ESO);
      golpe(q(".s06-noexiste"), EXISTE, -4);
      sacudon(q(".s06-sac"), EXISTE + 0.03, 1.6);
      tl.to(q(".s06-zoom"), { scale: 1.3, duration: 0.6, ease: "power2.out" }, EXISTE);
`,
  sfx: [
    { t: 0.23, sfx: "whoosh-short", vol: 0.25 },
    { t: 0.7, sfx: "whoosh", vol: 0.22 },
    { t: 2.4, sfx: "key-press", vol: 0.3 },
    { t: 2.6, sfx: "key-press", vol: 0.3 },
    { t: 2.8, sfx: "pop", vol: 0.3 },
    { t: 3.93, sfx: "glitch-1", vol: 0.22, max: 0.3 },
    { t: 4.25, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
  ],
});
