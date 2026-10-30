import { radio, nestor } from "./pj.mjs";
export const ID = "s13-sillon";
export const CSS = `
  $ .s13-once { top: 600px; font-size: 92px; color: #ffb84d; text-shadow: 0 0 40px rgba(255,184,77,0.45); }
  $ .s13-cal { position: absolute; left: 740px; top: 640px; width: 220px; height: 230px; border: 6px solid #f4efe4; border-radius: 18px; background: #f4efe4; overflow: hidden; }
  $ .s13-cal .cab { height: 58px; background: #ff2d2d; color: #f4efe4; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; line-height: 58px; text-align: center; }
  $ .s13-hoja { position: absolute; left: 0; right: 0; top: 58px; height: 166px; background: #f4efe4; color: #050b18; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; line-height: 166px; text-align: center; }
  $ .s13-man { top: 1310px; font-size: 76px; color: #5ce611; }
`;
export const HTML = `
        <div class="txt s13-once">¡Once en punto!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-r"><g transform="translate(130 760) scale(1)"><g class="s13-radio">${radio("s13", ["23:00"])}</g></g></g>
          <g class="s13-sillon">
            <path d="M250 1240 V900 C250 820 310 790 390 790 H690 C770 790 830 820 830 900 V1240 Z" fill="#7a2e3b" stroke="#f4efe4" stroke-width="8" stroke-linejoin="round" />
            <g transform="translate(360 760) scale(0.9)">${nestor("s13", { ojos: "feliz", boca: "sonrisa" })}</g>
            <path d="M190 1000 C190 960 250 950 290 970 V1250 H190 Z" fill="#8f3646" stroke="#f4efe4" stroke-width="8" stroke-linejoin="round" />
            <path d="M890 1000 C890 960 830 950 790 970 V1250 H890 Z" fill="#8f3646" stroke="#f4efe4" stroke-width="8" stroke-linejoin="round" />
            <rect x="260" y="1160" width="560" height="90" rx="20" fill="#8f3646" stroke="#f4efe4" stroke-width="8" />
            <path d="M210 1250 V1290 M870 1250 V1290" stroke="#f4efe4" stroke-width="8" stroke-linecap="round" />
            <g class="s13-mate"><path d="M840 1080 C840 1040 900 1040 900 1080 C900 1130 840 1130 840 1080 Z" fill="#ffb84d" stroke="#f4efe4" stroke-width="6" /><path d="M880 1060 L910 990" stroke="#f4efe4" stroke-width="6" stroke-linecap="round" /></g>
          </g>
          <g class="s13-mini"><g transform="translate(110 640) scale(0.4)">${radio("s13m", ["23:00"], { color: "#5ce611" })}</g></g>
        </svg>
        <div class="s13-cal"><div class="cab">OCT</div><div class="s13-hoja s13-d31">31</div><div class="s13-hoja s13-d30">30</div></div>
        <div class="txt s13-man">Mañana es otro día</div>
`;
export const JS = `
      const YO = 2.71, SILLON = 3.21, MANANA = 4.05, DIA = 4.61;
      tl.fromTo(ESC, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s13-radio"), { rotation: -3, svgOrigin: "410 200" }, { rotation: 3, svgOrigin: "410 200", duration: 0.06, yoyo: true, repeat: 17, ease: "none", immediateRender: false }, 0);
      golpe(".s13-once", 0.08, 2.2);
      sacudon(0.06, 1.2);
      // esta vez no rebobina: se va el radio grande y aparece Néstor en el sillón
      tl.to([q(".s13-r"), q(".s13-once")], { opacity: 0, y: -120, duration: 0.3, ease: "power2.in" }, YO - 0.4);
      gsap.set(q(".s13-sillon"), { opacity: 0 });
      tl.fromTo(q(".s13-sillon"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, YO - 0.15);
      pop(".s13-mini", SILLON, 0.3);
      pop(".s13-cal", SILLON + 0.2, 0.3);
      tl.to(q(".s13-mate"), { rotation: -10, svgOrigin: "870 1110", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, SILLON + 0.3);
      // mañana: la hoja del 30 se arranca
      tl.to(q(".s13-d30"), { y: 260, rotation: 25, opacity: 0, duration: 0.45, ease: "power2.in" }, MANANA);
      golpe(".s13-man", DIA - 0.3, 1.8);
`;
export const SFX = [
  { t: 0.02, sfx: "impact-bass-2", vol: 0.38, max: 0.6 },
  { t: 2.6, sfx: "whoosh", vol: 0.25 },
  { t: 3.3, sfx: "pop", vol: 0.28 },
  { t: 4.05, sfx: "whoosh-short", vol: 0.3 },
  { t: 4.35, sfx: "chime", vol: 0.32 },
];
