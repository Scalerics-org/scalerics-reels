// Ambiente de todo el reel (va ENCIMA de las escenas): balizas de patrullero que barren la escena
// (resplandor rojo a la izquierda y azul a la derecha que se alternan, más un haz que cruza), la
// banquina en primer plano (asfalto con la línea blanca discontinua y dos conos naranjas, los
// personajes quedan detrás), cartel mono del operativo arriba a la izquierda y "EN VIVO" arriba a la
// derecha (reality). Entra Orus (51.07): las balizas pasan a verde Scalerics, el cartel dice
// "CONTROL SUPERADO". CTA "Etiquetá" (67.72): vuelven rojo y azul.
import { cono } from "./pj.mjs";
export const ID = "ambiente";
export const CSS = `
  $ .amb-rojo { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 620px 1100px at 0px 820px, rgba(255, 59, 74, 0.34), rgba(255, 59, 74, 0) 75%); }
  $ .amb-azul { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 620px 1100px at 1080px 820px, rgba(61, 123, 255, 0.38), rgba(61, 123, 255, 0) 75%); }
  $ .amb-verde { position: absolute; inset: 0; opacity: 0; background: radial-gradient(ellipse 760px 1100px at 540px 1000px, rgba(92, 230, 17, 0.14), rgba(92, 230, 17, 0) 75%); }
  $ .amb-haz { position: absolute; left: -400px; top: 300px; width: 380px; height: 1100px; opacity: 0.0; background: linear-gradient(90deg, rgba(61, 123, 255, 0), rgba(61, 123, 255, 0.10), rgba(61, 123, 255, 0)); transform: skewX(-12deg); }
  $ .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 820px 1120px at 540px 900px, rgba(5, 8, 18, 0) 60%, rgba(5, 8, 18, 0.8) 100%); }
  $ .amb-banquina { position: absolute; left: -20px; right: -20px; top: 1352px; height: 80px; background: #161a27; border-top: 8px solid #2a3352; }
  $ .amb-sala { position: absolute; left: 72px; top: 118px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.16em; color: #9aa3b8; white-space: nowrap; }
  $ .amb-sala2 { color: #5ce611; opacity: 0; }
  $ .amb-vivo { position: absolute; right: 72px; top: 112px; padding: 6px 14px 4px; border: 3px solid #ff3b4a; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.14em; color: #ff3b4a; white-space: nowrap; }
`;
let lineas = "";
for (let i = 0; i < 6; i++) lineas += `<rect x="${-60 + i * 220}" y="1396" width="120" height="14" fill="#efeadf" opacity="0.7" />`;
export const HTML = `
        <div class="amb-rojo"></div>
        <div class="amb-azul"></div>
        <div class="amb-verde"></div>
        <div class="amb-haz"></div>
        <div class="amb-banquina"></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true" style="clip-path: none">
          <g class="amb-lineas">${lineas}</g>
          <g transform="translate(-10 1250)"><g class="amb-cono1">${cono("amb")}</g></g>
          <g transform="translate(950 1250)"><g class="amb-cono2">${cono("amb")}</g></g>
        </svg>
        <div class="amb-vineta"></div>
        <div class="amb-sala" data-layout-ignore>OPERATIVO NOCTURNO · RUTA 1</div>
        <div class="amb-sala amb-sala2" data-layout-ignore>CONTROL SUPERADO</div>
        <div class="amb-vivo" data-layout-ignore>● EN VIVO</div>
`;
export const JS = `
      const ORUS = 51.07, CTA = 67.72;
      // balizas: rojo y azul alternados (0.36 s cada uno), con repeticiones finitas
      const balizas = (t0, t1) => {
        const per = 0.36, n = Math.max(1, Math.floor((t1 - t0) / (per * 2)));
        tl.fromTo(q(".amb-rojo"), { opacity: 1 }, { opacity: 0.15, duration: per, ease: "power1.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
        tl.fromTo(q(".amb-azul"), { opacity: 0.15 }, { opacity: 1, duration: per, ease: "power1.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
        // un haz azul cruza la pantalla cada ~3 s
        for (let t = t0 + 0.4; t < t1 - 1; t += 3.1) tl.fromTo(q(".amb-haz"), { x: 0, opacity: 1 }, { x: 1900, opacity: 1, duration: 1.1, ease: "power1.inOut", immediateRender: false }, t);
      };
      gsap.set(q(".amb-rojo"), { opacity: 1 });
      gsap.set(q(".amb-azul"), { opacity: 0.15 });
      balizas(0, ORUS);
      // "EN VIVO": parpadea el punto (todo el cartel, suave)
      tl.fromTo(q(".amb-vivo"), { opacity: 1 }, { opacity: 0.45, duration: 0.6, yoyo: true, repeat: Math.floor(DUR / 0.6) - 1, ease: "steps(1)" }, 0);
      // entra Orus: balizas apagadas, luz verde, cartel nuevo
      tl.to(qa(".amb-rojo, .amb-azul"), { opacity: 0, duration: 0.4, overwrite: false }, ORUS + 0.02);
      tl.to(q(".amb-verde"), { opacity: 1, duration: 0.6 }, ORUS);
      tl.to(q(".amb-sala"), { opacity: 0, duration: 0.2 }, ORUS);
      tl.to(q(".amb-sala2"), { opacity: 1, duration: 0.3 }, ORUS + 0.1);
      // CTA: vuelven las balizas (para etiquetar al de diez por hora)
      tl.to(q(".amb-verde"), { opacity: 0, duration: 0.4 }, CTA);
      tl.to(q(".amb-sala2"), { opacity: 0, duration: 0.2 }, CTA);
      tl.to(q(".amb-sala"), { opacity: 1, duration: 0.2 }, CTA + 0.1);
      balizas(CTA + 0.05, DUR);
`;
export const SFX = [];
