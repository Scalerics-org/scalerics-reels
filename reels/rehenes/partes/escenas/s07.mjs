export const ID = "s07-stock";
const filas = [["Alfajores", "12"], ["Yerba", "3"], ["Galletitas", "7"], ["Leche", "20"]];
export const CSS = `
  $ .s07-dem { top: 590px; font-size: 104px; }
  $ .s07-dem span { color: #ffd60a; font-size: 150px; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
  $ .s07-hoja { position: absolute; left: 170px; top: 830px; width: 740px; border: 8px solid #21a366; border-radius: 16px; background: #0e2a1e; overflow: hidden; }
  $ .s07-fila { display: flex; height: 92px; border-top: 3px solid rgba(33,163,102,0.6); }
  $ .s07-fila:first-child { border-top: 0; background: rgba(33,163,102,0.3); }
  $ .s07-a { width: 440px; padding-left: 30px; line-height: 92px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; color: #f2f2f2; }
  $ .s07-b { position: relative; width: 300px; border-left: 3px solid rgba(33,163,102,0.6); text-align: center; line-height: 92px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 48px; color: #f2f2f2; }
  $ .s07-col { position: absolute; left: 610px; top: 830px; width: 300px; height: 476px; border: 8px solid #ffd60a; border-radius: 10px; }
  $ .s07-sello { left: 50%; top: 1380px; transform: translateX(-50%); font-size: 46px; background: #0a0d14; }
`;
export const HTML = `
        <div class="txt s07-dem">Demanda <span>2</span></div>
        <div class="s07-hoja">
          <div class="s07-fila"><div class="s07-a">PRODUCTO</div><div class="s07-b s07-cel">STOCK</div></div>
          ${filas.map(([a, b]) => `<div class="s07-fila"><div class="s07-a">${a}</div><div class="s07-b s07-cel"><span class="s07-num">${b}</span></div></div>`).join("")}
        </div>
        <div class="s07-col"></div>
        <div class="sello s07-sello">Columna borrada</div>
`;
export const JS = `
      const STOCK = 1.3, ACT = 1.96, BORRO = 3.5, COLUMNA = 4.1;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s07-dem"), { opacity: 0.5, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.1, 1);
      entra(".s07-hoja", 0.5, 0, 100, 0.35);
      tl.fromTo(qa(".s07-fila"), { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.08, immediateRender: false }, 0.6);
      // "stock": la columna se marca
      gsap.set(q(".s07-col"), { opacity: 0 });
      tl.fromTo(q(".s07-col"), { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)", immediateRender: false }, STOCK - 0.05);
      // "actualizado": los números bailan, sin saber cuál es el real
      qa(".s07-num").forEach((n, i) => tl.to(n, { y: -10, opacity: 0.3, duration: 0.06, yoyo: true, repeat: 5, ease: "none" }, ACT + i * 0.05));
      // "o le borro una columna": la columna se pone roja, tiembla y desaparece
      tl.to(q(".s07-col"), { borderColor: "#ff3b3b", duration: 0.05 }, 3.3);
      tl.to(qa(".s07-cel"), { backgroundColor: "rgba(255,59,59,0.45)", duration: 0.05 }, 3.3);
      tl.to([q(".s07-col")].concat(qa(".s07-cel")), { x: 8, duration: 0.04, yoyo: true, repeat: 9, ease: "none" }, BORRO);
      tl.to([q(".s07-col")].concat(qa(".s07-cel")), { scaleX: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.2, ease: "power3.in" }, COLUMNA);
      golpe(".s07-sello", COLUMNA + 0.15, 2.4);
      tl.set(q(".s07-sello"), { rotation: -5 }, 0);
      sacudon(COLUMNA + 0.2, 1.1);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.55, sfx: "whoosh-short", vol: 0.22 },
  { t: 1.25, sfx: "click", vol: 0.3 },
  { t: 1.96, sfx: "glitch-2", vol: 0.22, max: 0.4 },
  { t: 3.3, sfx: "glitch-1", vol: 0.3, max: 0.5 },
  { t: 4.1, sfx: "impact-bass-1", vol: 0.45, max: 0.6 },
  { t: 4.15, sfx: "glitch-3", vol: 0.25, max: 0.4 },
];
