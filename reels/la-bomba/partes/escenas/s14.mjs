export const ID = "s14-medida";
// la notebook sin bomba: pantalla con el sistema a medida (módulos que aparecen en su palabra)
const mods = [["STOCK", 1.4], ["PEDIDOS", 2.1], ["PROVEEDORES", 2.8], ["CAJA", 3.6], ["LOCALES", 4.6]];
export const CSS = `
  $ .s14-tit { top: 600px; font-size: 78px; color: #5ce611; }
  $ .s14-pant { position: absolute; left: 175px; top: 730px; width: 730px; height: 450px; border-radius: 12px; background: #0d1a10; border: 4px solid #5ce611; overflow: hidden; }
  $ .s14-bar { height: 52px; background: #5ce611; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 28px; color: #070807; padding: 10px 24px; white-space: nowrap; }
  $ .s14-mod { position: absolute; left: 24px; width: 300px; height: 62px; border-radius: 12px; background: #1f2d1f; border: 3px solid #5ce611; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: #ecebe4; padding: 13px 0 0 22px; white-space: nowrap; box-sizing: border-box; }
  $ .s14-panel { position: absolute; left: 350px; top: 76px; width: 356px; height: 350px; border-radius: 12px; border: 3px solid rgba(92,230,17,0.5); }
  $ .s14-loc { position: absolute; left: 370px; width: 316px; height: 50px; border-radius: 10px; background: #1f2d1f; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #ecebe4; padding: 11px 0 0 18px; box-sizing: border-box; white-space: nowrap; }
  $ .s14-loc b { color: #5ce611; float: right; margin-right: 16px; }
  $ .s14-medida { left: 640px; top: 1230px; font-size: 40px; border-color: #ffb020; color: #070807; background: #ffb020; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="b" x="150" y="706" width="780" height="498" rx="22" />
          <path class="b" d="M120 1204 H960 L1010 1264 H70 Z" />
          <!-- cinta métrica -->
          <g class="s14-cinta">
            <path d="M60 1300 C300 1250 760 1340 1030 1270" stroke="#ffb020" stroke-width="44" fill="none" />
            <path class="s14-marcas" d="M60 1300 C300 1250 760 1340 1030 1270" stroke="#070807" stroke-width="20" fill="none" stroke-dasharray="3 27" />
          </g>
        </svg>
        <div class="txt ops s14-tit">Sistema a medida</div>
        <div class="s14-pant">
          <div class="s14-bar">TU LOCAL · sistema</div>
          ${mods.map(([m], i) => `<div class="s14-mod s14-m${i}" style="top:${76 + i * 72}px">${m}</div>`).join("")}
          <div class="s14-panel"></div>
          <div class="s14-loc s14-l0" style="top:100px">Local Centro <b>OK</b></div>
          <div class="s14-loc s14-l1" style="top:162px">Local 2 <b>OK</b></div>
          <div class="s14-loc s14-l2" style="top:224px">Depósito <b>OK</b></div>
          <div class="s14-loc s14-l3" style="top:286px">Caja de hoy <b>OK</b></div>
        </div>
        <div class="sello s14-medida">a tu medida</div>
`;
export const JS = `
      const M = ${JSON.stringify(mods.map((m) => m[1]))}, SOLO = 5.3, HECHO = 6.28, TRABAJAS = 6.8;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      golpe(".s14-tit", 0.05, 1.8);
      tl.fromTo(q(".s14-pant"), { opacity: 0.2 }, { opacity: 1, duration: 0.3 }, 0);
      M.forEach((t, i) => entra(".s14-m" + i, t - 0.05, -80, 0, 0.25));
      tl.fromTo(q(".s14-panel"), { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, SOLO - 0.4);
      gsap.set(q(".s14-panel"), { opacity: 0 });
      // "en un solo lugar": todo se conecta en un panel
      [0, 1, 2, 3].forEach((i) => entra(".s14-l" + i, SOLO - 0.2 + i * 0.12, 60, 0, 0.25));
      tl.to(qa(".s14-mod"), { borderColor: "#ffb020", duration: 0.1, stagger: 0.06, yoyo: true, repeat: 1 }, SOLO);
      // "hecho para cómo trabajás vos": la cinta métrica la mide
      gsap.set(q(".s14-cinta"), { opacity: 0 });
      tl.fromTo(q(".s14-cinta"), { opacity: 1, x: -1100 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, HECHO - 0.1);
      pop(".s14-medida", TRABAJAS, 0.3);
      tl.set(q(".s14-medida"), { rotation: -5 }, 0);
`;
export const SFX = [
  { t: 0.0, sfx: "chime", vol: 0.3 },
  { t: 1.35, sfx: "pop", vol: 0.22 },
  { t: 2.05, sfx: "pop", vol: 0.22 },
  { t: 2.75, sfx: "pop", vol: 0.22 },
  { t: 3.55, sfx: "pop", vol: 0.22 },
  { t: 4.55, sfx: "pop", vol: 0.22 },
  { t: 5.1, sfx: "sparkle", vol: 0.25 },
  { t: 6.2, sfx: "whoosh", vol: 0.25 },
  { t: 6.8, sfx: "click", vol: 0.25 },
];
