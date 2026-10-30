export const ID = "s08-celda";
export const CSS = `
  $ .s08-dem { top: 590px; font-size: 104px; }
  $ .s08-dem span { color: #ffd60a; font-size: 150px; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
  $ .s08-hoja { position: absolute; left: 150px; top: 820px; width: 780px; height: 380px; border: 8px solid #21a366; border-radius: 16px; background: #0e2a1e;
      background-image: linear-gradient(rgba(33,163,102,0.6) 3px, transparent 3px), linear-gradient(90deg, rgba(33,163,102,0.6) 3px, transparent 3px); background-size: 195px 92px; }
  $ .s08-comb { position: absolute; left: 341px; top: 914px; width: 584px; height: 180px; background: #141a28; border: 7px solid #ffd60a; text-align: center; line-height: 166px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #ffd60a; letter-spacing: 0.04em; }
  $ .s08-err { position: absolute; left: 120px; top: 1230px; width: 840px; border-radius: 14px; background: #f2f2f2; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.6); }
  $ .s08-err h4 { margin: 0; padding: 14px 24px; background: #ff3b3b; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; color: #f2f2f2; letter-spacing: 0.12em; }
  $ .s08-err p { margin: 0; padding: 24px 28px 28px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; line-height: 1.2; color: #0a0d14; }
  $ .s08-vos { top: 1330px; font-size: 112px; }
  $ .s08-vos span { color: #ffd60a; }
`;
export const HTML = `
        <div class="txt s08-dem">Demanda <span>3</span></div>
        <div class="s08-hoja"></div>
        <div class="s08-comb">COMBINADA</div>
        <div class="s08-err"><h4>ERROR</h4><p>No se puede hacer eso en una celda combinada.</p></div>
        <div class="txt s08-vos">Arreglala <span>vos.</span></div>
`;
export const JS = `
      const CELDA = 1.11, COMB = 1.71, ARREGLALA = 2.51, VOS = 2.86;
      tl.fromTo(ESC, { scale: 1.05 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s08-dem"), { opacity: 0.5, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.1, 1);
      entra(".s08-hoja", 0.45, 0, 100, 0.3);
      // "celda": tres celdas se funden en una
      gsap.set(q(".s08-comb"), { opacity: 0 });
      tl.fromTo(q(".s08-comb"), { opacity: 0, scaleX: 0.33, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power3.out", immediateRender: false }, CELDA - 0.05);
      // "combinada": el error
      entra(".s08-err", COMB + 0.1, 0, 60, 0.2);
      tl.to(q(".s08-err"), { x: 14, duration: 0.04, yoyo: true, repeat: 5, ease: "none" }, COMB + 0.32);
      // "arreglala vos."
      tl.to(q(".s08-err"), { y: 60, opacity: 0, duration: 0.15 }, ARREGLALA - 0.15);
      golpe(".s08-vos", ARREGLALA + 0.05, 2.2);
      tl.fromTo(q(".s08-vos span"), { color: "#f2f2f2" }, { color: "#ffd60a", duration: 0.05, immediateRender: false }, VOS);
      sacudon(VOS + 0.05, 1.1);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.45, sfx: "whoosh-short", vol: 0.22 },
  { t: 1.08, sfx: "click", vol: 0.3 },
  { t: 1.8, sfx: "glitch-1", vol: 0.35, max: 0.5 },
  { t: 2.5, sfx: "impact-bass-1", vol: 0.38, max: 0.6 },
  { t: 2.86, sfx: "impact-bass-2", vol: 0.3, max: 0.5 },
];
