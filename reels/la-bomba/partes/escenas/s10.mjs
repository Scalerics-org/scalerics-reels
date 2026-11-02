import { experto, HAZDEF } from "./pj.mjs";
export const ID = "s10-ctrlz";
export const CSS = `
  $ .s10-mac { left: 590px; top: 1150px; font-size: 40px; border-color: #ffb020; color: #ffb020; background: rgba(7,8,7,0.85); }
  $ .s10-tecla { position: absolute; top: 820px; height: 300px; border-radius: 36px; background: #ecebe4; border: 8px solid #070807; box-shadow: 0 26px 0 #8d8b80, 0 40px 60px rgba(0,0,0,0.6); text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; color: #070807; line-height: 300px; }
  $ .s10-ctrl { left: 90px; width: 440px; font-size: 120px; }
  $ .s10-z { left: 620px; width: 340px; font-size: 190px; }
  $ .s10-mas { position: absolute; left: 530px; width: 90px; top: 900px; text-align: center; font-family: "Black Ops One", sans-serif; font-size: 110px; color: #ffb020; }
  $ .s10-unico { top: 640px; font-size: 52px; color: #ecebe4; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.04em; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">${HAZDEF}
          <circle cx="540" cy="980" r="440" fill="url(#hazgrad)" />
          <g class="s10-a">
            <g transform="translate(270 640) scale(1.3)"><g class="s10-exp">${experto("s10")}</g></g>
            <!-- clip y chicle de MacGyver -->
            <g class="s10-clip"><path class="l" d="M760 760 V880 C760 910 800 910 800 880 V740 C800 710 740 710 740 740 V860" style="stroke:#ecebe4; stroke-width:8px" /></g>
            <g class="s10-chicle"><path class="w" d="M840 820 C860 790 920 800 930 830 C950 860 900 890 870 880 C840 878 826 850 840 820 Z" style="fill:#ff8fb0" stroke-width="5" /></g>
          </g>
        </svg>
        <div class="sello s10-mac">ni MacGyver</div>
        <div class="txt s10-unico">lo único que queda...</div>
        <div class="s10-tecla s10-ctrl">CTRL</div>
        <div class="s10-mas">+</div>
        <div class="s10-tecla s10-z">Z</div>
`;
export const JS = `
      const MAC = 1.2, VOY = 2.55, UNICO = 3.1, CONTROL = 4.52, Z = 5.0;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.06, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s10-exp"), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0);
      hablar(".s10-exp-boca", 0.0, 2.0, 0.35);
      tl.to(qa(".s10-gota"), { y: 30, opacity: 0.4, duration: 0.6, stagger: 0.2, yoyo: true, repeat: 2, ease: "power1.in" }, 0.2);
      // MacGyver: el clip y el chicle caen al piso, inútiles
      tl.fromTo(q(".s10-clip"), { opacity: 0, y: -200, rotation: 0 }, { opacity: 1, y: 0, rotation: 15, svgOrigin: "770 820", duration: 0.35, ease: "bounce.out", immediateRender: false }, MAC - 0.2);
      tl.fromTo(q(".s10-chicle"), { opacity: 0, y: -220 }, { opacity: 1, y: 0, duration: 0.4, ease: "bounce.out", immediateRender: false }, MAC - 0.05);
      gsap.set(qa(".s10-clip, .s10-chicle"), { opacity: 0 });
      pop(".s10-mac", MAC + 0.1, 0.3);
      tl.set(q(".s10-mac"), { rotation: -5 }, 0);
      // "voy a hacer lo único que queda": se va el experto, suben las teclas
      tl.to(q(".s10-a"), { opacity: 0, y: 80, duration: 0.3 }, VOY - 0.2);
      sale(".s10-mac", VOY - 0.2, 0.2);
      pop(".s10-unico", UNICO - 0.3, 0.3);
      entra(".s10-ctrl", VOY + 0.1, 0, 300, 0.4);
      entra(".s10-z", VOY + 0.25, 0, 300, 0.4);
      pop(".s10-mas", VOY + 0.4, 0.3);
      // tiemblan de suspenso
      tl.to(qa(".s10-tecla"), { x: 3, duration: 0.04, yoyo: true, repeat: 15, ease: "none" }, 3.6);
      // CONTROL... Z: se hunden
      tl.to(q(".s10-ctrl"), { y: 22, boxShadow: "0 4px 0 #8d8b80, 0 10px 20px rgba(0,0,0,0.6)", backgroundColor: "#ffb020", duration: 0.08 }, CONTROL);
      tl.to(q(".s10-z"), { y: 22, boxShadow: "0 4px 0 #8d8b80, 0 10px 20px rgba(0,0,0,0.6)", backgroundColor: "#ffb020", duration: 0.08 }, Z);
      sacudon(Z + 0.02, 1.2);
`;
export const SFX = [
  { t: 1.0, sfx: "click-soft", vol: 0.3 },
  { t: 1.2, sfx: "pop", vol: 0.25 },
  { t: 2.6, sfx: "whoosh", vol: 0.25 },
  { t: 3.3, sfx: "riser", vol: 0.25, max: 1.3 },
  { t: 4.52, sfx: "key-press", vol: 0.5 },
  { t: 5.0, sfx: "key-press", vol: 0.5 },
  { t: 5.02, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
];
