export const ID = "s16-cta";
export const CSS = `
  $ .s16-cuantas { top: 600px; font-size: 92px; color: #ffb020; }
  $ .s16-tuya { top: 700px; font-size: 92px; color: #ecebe4; }
  $ .s16-tab { position: absolute; top: 840px; height: 64px; border-radius: 14px 14px 0 0; background: #1f231d; border: 3px solid #21a366; border-bottom: none; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: #ecebe4; padding: 15px 18px 0; box-sizing: border-box; white-space: nowrap; }
  $ .s16-com { position: absolute; left: 90px; width: 760px; padding: 22px 30px; border-radius: 26px; background: #ecebe4; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 38px; color: #070807; line-height: 1.25; box-sizing: border-box; }
  $ .s16-com b { display: block; font-size: 26px; color: #5a5c55; font-weight: 700; margin-bottom: 6px; }
`;
const tabs = ["STOCK FINAL", "v2", "AHORA SÍ", "NO TOCAR", "Hoja7", "???"];
let x = 60;
const tabsHTML = tabs.map((t, i) => { const w = t.length * 17 + 40; const s = `<div class="s16-tab s16-t${i}" style="left:${x}px; width:${w}px${t === "NO TOCAR" ? "; background:#ff2d2d; color:#070807; border-color:#ff2d2d" : ""}">${t}</div>`; x += w + 8; return s; }).join("");
export const HTML = `
        <div class="txt ops s16-cuantas">¿Cuántas pestañas</div>
        <div class="txt ops s16-tuya">tiene la tuya?</div>
        ${tabsHTML}
        <div class="s16-com s16-c1" style="top:960px"><b>comentario</b>Diecinueve. Y una se llama "NO ABRIR".</div>
        <div class="s16-com s16-c2" style="top:1130px; left:230px"><b>comentario</b>La mía la armó mi suegro.</div>
`;
export const JS = `
      const TUYA = 0.93, CONTALO = 1.71, COMENT = 2.28;
      tl.fromTo(ESC, { scale: 1.0 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "50% 50%" }, 0);
      golpe(".s16-cuantas", 0.05, 1.8);
      golpe(".s16-tuya", TUYA - 0.1, 1.8);
      sacudon(TUYA, 0.8);
      qa(".s16-tab").forEach((el, i) => entra(el, 0.3 + i * 0.1, 0, -40, 0.2));
      tl.fromTo(q(".s16-t5"), { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 5, immediateRender: false }, TUYA + 0.2);
      entra(".s16-c1", CONTALO + 0.1, -80, 0, 0.3);
      entra(".s16-c2", COMENT + 0.6, 80, 0, 0.3);
      tl.to(q(".s16-c1"), { y: -6, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, COMENT + 1.0);
`;
export const SFX = [
  { t: 0.0, sfx: "impact-bass-2", vol: 0.38, max: 0.7 },
  { t: 1.8, sfx: "notification", vol: 0.3 },
  { t: 2.9, sfx: "notification", vol: 0.3 },
];
