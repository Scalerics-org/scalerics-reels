export const ID = "s04-pestanas";
const tabs = [
  ["STOCK FINAL", 0.0, 640, "#1f231d", "#ecebe4"],
  ["STOCK FINAL 2", 1.25, 790, "#1f231d", "#ecebe4"],
  ["STOCK FINAL AHORA SÍ", 2.5, 940, "#1f231d", "#ecebe4"],
];
export const CSS = `
  $ .s04-tab { position: absolute; left: 110px; width: 860px; height: 118px; padding: 30px 0 0 44px; border-radius: 26px 26px 0 0; border: 5px solid #21a366; border-bottom: 5px solid #21a366; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 52px; white-space: nowrap; }
  $ .s04-tab i { font-style: normal; color: #21a366; margin-right: 20px; }
  $ .s04-no { position: absolute; left: 140px; top: 1110px; width: 800px; height: 170px; border-radius: 26px 26px 0 0; background: #ff2d2d; border: 6px solid #ecebe4; text-align: center; padding-top: 30px; font-family: "Black Ops One", sans-serif; font-size: 112px; line-height: 1; color: #070807; white-space: nowrap; box-shadow: 0 0 60px rgba(255,45,45,0.5); }
  $ .s04-y { position: absolute; left: 0; right: 0; top: 1124px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 48px; color: #ecebe4; letter-spacing: 0.2em; }
`;
export const HTML = `
        ${tabs.map(([n, , y, bg, c], i) => `<div class="s04-tab s04-t${i}" style="top:${y}px; background:${bg}; color:${c}"><i>${i + 1}</i>${n}</div>`).join("\n        ")}
        <div class="s04-y">y una que dice...</div>
        <div class="s04-no">NO TOCAR</div>
`;
export const JS = `
      const T = ${JSON.stringify(tabs.map((t) => t[1]))}, Y = 4.62, NO = 5.78, TOCAR = 6.46;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      T.forEach((t, i) => {
        const el = q(".s04-t" + i);
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.8)", immediateRender: false }, Math.max(0, t - 0.05));
        // la linterna la ilumina mientras la lee, después queda apagada
        tl.fromTo(el, { borderColor: "#ffb020", boxShadow: "0 0 50px rgba(255,176,32,0.45)" }, { borderColor: "#21a366", boxShadow: "0 0 0px rgba(255,176,32,0)", duration: 0.4, immediateRender: false }, (T[i + 1] ?? Y) - 0.2);
      });
      // la tercera es "AHORA SÍ" (con esperanza): un temblor
      tl.to(q(".s04-t2"), { x: 8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 3.8);
      // "y una que dice": las tres suben y se apagan
      tl.to(qa(".s04-tab"), { opacity: 0.35, y: -20, duration: 0.3 }, Y - 0.1);
      pop(".s04-y", Y, 0.3);
      sale(".s04-y", NO - 0.15, 0.12);
      golpe(".s04-no", NO, 2.0);
      sacudon(NO + 0.05, 1.3);
      tl.fromTo(q(".s04-no"), { boxShadow: "0 0 60px rgba(255,45,45,0.5)" }, { boxShadow: "0 0 120px rgba(255,45,45,0.95)", duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, TOCAR);
`;
export const SFX = [
  { t: 0.0, sfx: "click", vol: 0.3 },
  { t: 1.2, sfx: "click", vol: 0.3 },
  { t: 2.45, sfx: "click", vol: 0.3 },
  { t: 4.6, sfx: "whoosh-short", vol: 0.2 },
  { t: 5.72, sfx: "impact-bass-2", vol: 0.5, max: 0.9 },
  { t: 6.4, sfx: "glitch-1", vol: 0.25, max: 0.4 },
];
