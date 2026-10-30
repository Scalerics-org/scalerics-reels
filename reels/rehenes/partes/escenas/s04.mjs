import { poli } from "./pj.mjs";
export const ID = "s04-negociador";
export const CSS = `
  $ .s04-nadie { top: 588px; font-size: 112px; }
  $ .s04-lastimado { top: 704px; font-size: 112px; color: #ffd60a; text-shadow: 0 0 30px rgba(255,214,10,0.4); }
  $ .s04-peli { left: 50%; top: 838px; transform: translateX(-50%); border-color: #2f6bff; color: #f2f2f2; background: #2f6bff; font-size: 30px; }
  $ .s04-nota { position: absolute; left: 600px; top: 960px; width: 410px; height: 470px; background: #f2f2f2; border-radius: 10px; padding: 28px 30px; transform: rotate(4deg); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  $ .s04-nota h3 { margin: 0 0 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #ff3b3b; text-transform: uppercase; }
  $ .s04-nota p { margin: 0; height: 74px; border-bottom: 4px solid #2f6bff; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 44px; color: #0a0d14; }
`;
export const HTML = `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 900) scale(1.12)"><g class="s04-poli">${poli("s04")}</g></g>
        </svg>
        <div class="txt s04-nadie">Nadie sale</div>
        <div class="txt s04-lastimado">lastimado</div>
        <div class="sello s04-peli">Como en las películas</div>
        <div class="s04-nota"><h3>Demandas:</h3><p>1.</p><p>2.</p><p>3.</p><p>4.</p></div>
`;
export const JS = `
      const NADIE = 0.95, LASTIMADO = 1.5, DEMANDAS = 2.9;
      tl.fromTo(ESC, { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "30% 70%" }, 0);
      tl.fromTo(q(".s04-poli"), { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      hablar(".s04-poli-boca", 0.0, 0.6, 0.3);
      hablar(".s04-poli-boca", 0.95, 2.0, 0.3);
      hablar(".s04-poli-boca", 2.45, 3.4, 0.3);
      // "tranquila": baja el megáfono, calmo
      tl.to(q(".s04-poli-brazo"), { rotation: 10, transformOrigin: "20% 60%", duration: 0.5, ease: "sine.inOut" }, 0.2);
      golpe(".s04-nadie", NADIE, 1.8);
      golpe(".s04-lastimado", LASTIMADO, 2.2);
      sacudon(LASTIMADO + 0.05, 0.6);
      pop(".s04-peli", LASTIMADO + 0.4);
      // "¿cuáles son tus demandas?": la libreta de demandas
      tl.to(q(".s04-poli-brazo"), { rotation: 0, transformOrigin: "20% 60%", duration: 0.3 }, 2.3);
      entra(".s04-nota", 2.45, 200, 0, 0.3);
      tl.to(qa(".s04-nota p"), { color: "#0a0d14", duration: 0.01 }, 0);
      tl.fromTo(qa(".s04-nota p"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.15, stagger: 0.1, immediateRender: false }, DEMANDAS);
`;
export const SFX = [
  { t: 0.05, sfx: "whoosh-short", vol: 0.22 },
  { t: 0.9, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
  { t: 1.45, sfx: "impact-bass-2", vol: 0.4, max: 0.7 },
  { t: 1.9, sfx: "click", vol: 0.25 },
  { t: 2.45, sfx: "whoosh", vol: 0.25 },
  { t: 2.9, sfx: "typing", vol: 0.25, max: 0.6 },
];
