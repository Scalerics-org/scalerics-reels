export const ID = "s05-ctrlc";
export const CSS = `
  $ .s05-dem { top: 590px; font-size: 104px; }
  $ .s05-dem span { color: #ffd60a; font-size: 150px; text-shadow: 0 0 34px rgba(255,214,10,0.45); }
  $ .s05-key { position: absolute; top: 880px; height: 230px; border: 7px solid #f2f2f2; border-bottom-width: 22px; border-radius: 26px; background: #141a28; color: #f2f2f2; font-family: "Lexend", sans-serif; font-weight: 900; text-align: center; line-height: 200px; box-shadow: 0 0 40px rgba(33,163,102,0.35); }
  $ .s05-ctrl { left: 110px; width: 380px; font-size: 96px; }
  $ .s05-mas { position: absolute; left: 500px; top: 920px; width: 80px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; color: #21a366; }
  $ .s05-letra { left: 600px; width: 330px; font-size: 150px; color: #21a366; }
  $ .s05-toda { top: 1300px; font-size: 100px; }
`;
export const HTML = `
        <div class="txt s05-dem">Demanda <span>1</span></div>
        <div class="s05-key s05-ctrl">Ctrl</div>
        <div class="s05-mas">+</div>
        <div class="s05-key s05-letra s05-c">C</div>
        <div class="s05-key s05-letra s05-v">V</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="y s05-luna" d="M540 1150 C470 1180 450 1270 500 1320 C440 1310 405 1250 420 1195 C435 1145 490 1130 540 1150 Z" stroke-width="5" />
        </svg>
        <div class="txt s05-toda">Toda la noche</div>
`;
export const JS = `
      const C1 = 0.76, C = 1.2, C2 = 1.4, V = 2.0, TODA = 3.23;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      tl.fromTo(q(".s05-dem"), { opacity: 0.5, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.1, 1);
      entra([q(".s05-ctrl"), q(".s05-mas")], C1 - 0.15, 0, 120, 0.25);
      pop(".s05-c", C - 0.15, 0.25);
      gsap.set(q(".s05-v"), { opacity: 0 });
      // aprieta: la tecla baja
      const apretar = (el, t) => tl.to(q(el), { y: 16, duration: 0.05, yoyo: true, repeat: 1, ease: "none" }, t);
      apretar(".s05-ctrl", C1); apretar(".s05-c", C);
      apretar(".s05-ctrl", C2);
      tl.to(q(".s05-c"), { opacity: 0, duration: 0.05 }, V - 0.1);
      tl.fromTo(q(".s05-v"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.12, ease: "power4.in", immediateRender: false }, V - 0.1);
      sacudon(V + 0.02, 0.7);
      // y sigue: C, V, C, V... cada vez más rápido
      const ritmo = [2.35, 2.55, 2.72, 2.86, 2.98, 3.08, 3.17];
      ritmo.forEach((t, i) => {
        const on = i % 2 ? ".s05-v" : ".s05-c", off = i % 2 ? ".s05-c" : ".s05-v";
        tl.set(q(on), { opacity: 1 }, t); tl.set(q(off), { opacity: 0 }, t);
        apretar(".s05-ctrl", t); apretar(on, t);
      });
      tl.set(q(".s05-v"), { opacity: 1 }, 3.25); tl.set(q(".s05-c"), { opacity: 0 }, 3.25);
      // toda la noche: luna y el texto
      tl.to([q(".s05-ctrl"), q(".s05-mas"), q(".s05-v")], { y: -120, opacity: 0.35, scale: 0.8, duration: 0.3, ease: "power2.inOut" }, TODA - 0.1);
      pop(".s05-luna", TODA - 0.05, 0.35, { svgOrigin: "480 1235" });
      golpe(".s05-toda", TODA + 0.35, 2);
      tl.to(q(".s05-luna"), { rotation: -12, svgOrigin: "480 1235", duration: 1, ease: "sine.inOut" }, TODA + 0.3);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.42, max: 0.8 },
  { t: 0.76, sfx: "key-press", vol: 0.45 },
  { t: 1.2, sfx: "key-press", vol: 0.45 },
  { t: 1.4, sfx: "key-press", vol: 0.45 },
  { t: 1.95, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 2.35, sfx: "typing", vol: 0.35, max: 0.9 },
  { t: 3.55, sfx: "whoosh", vol: 0.25 },
];
