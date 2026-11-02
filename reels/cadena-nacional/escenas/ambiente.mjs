// Escribe compositions/ambiente.html: la textura de TV vieja (líneas de barrido, viñeta, parpadeo),
// la barra de la transmisión oficial (EN VIVO · CADENA NACIONAL · hora) con el escudo, y el
// zócalo corrido de abajo (comunicado oficial; desde que asume el ministro, último momento).
// Correr desde reels/cadena-nacional después de `node armar.mjs`.
import fs from "node:fs";
import { C, escudo } from "./lib.mjs";
const { noche, azul2, azul, oro, blanco, rojo, verde } = C;
const DUR = Number(fs.readFileSync("tiempos.md", "utf8").match(/Duración total ([\d.]+)/)[1]);
const MINISTRO = 49.3; // "Un agente de IA" (s12)
const S = '[data-composition-id="ambiente"]';
const T1 = "COMUNICADO OFICIAL DEL LOCAL · LOS WHATSAPP SE CONTESTAN CUANDO SE PUEDA · EL HORARIO ES EL DEL CARTEL · PRECIOS: PASAR EL LUNES · ";
const T2 = "ÚLTIMO MOMENTO · ASUMIÓ EL NUEVO MINISTRO DE ATENCIÓN · CONTESTA A CUALQUIER HORA · TOMA PEDIDOS Y RESERVAS · ";
const html = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${S} .amb-capa { position: absolute; inset: 0; }
    ${S} svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${S} .amb-barrido { position: absolute; inset: 0; opacity: 0.16; background: repeating-linear-gradient(0deg, rgba(7, 22, 64, 0.9) 0px, rgba(7, 22, 64, 0.9) 2px, rgba(7, 22, 64, 0) 2px, rgba(7, 22, 64, 0) 5px); }
    ${S} .amb-banda { position: absolute; left: 0; right: 0; top: 0; height: 140px; opacity: 0.05; background: ${blanco}; }
    ${S} .amb-vineta { position: absolute; inset: 0; background: radial-gradient(ellipse 720px 1080px at 540px 960px, rgba(7, 22, 64, 0) 58%, rgba(7, 22, 64, 0.88) 100%); }
    ${S} .amb-flicker { position: absolute; inset: 0; background: ${blanco}; opacity: 0; }
    ${S} .amb-barra { position: absolute; left: 60px; top: 116px; height: 72px; display: flex; white-space: nowrap; border-radius: 6px; overflow: hidden; border: 3px solid ${oro}; }
    ${S} .amb-barra > div { display: flex; align-items: center; padding: 0 18px; font-family: "Lexend", sans-serif; font-weight: 800; text-transform: uppercase; font-size: 26px; letter-spacing: 0.05em; }
    ${S} .amb-vivo { background: ${rojo}; color: ${blanco}; gap: 10px; }
    ${S} .amb-punto { width: 14px; height: 14px; border-radius: 50%; background: ${blanco}; }
    ${S} .amb-cn { background: ${oro}; color: ${noche}; }
    ${S} .amb-hora { background: ${noche}; color: ${blanco}; font-family: "IBM Plex Mono", monospace !important; font-weight: 500 !important; font-size: 28px !important; }
    ${S} .amb-ticker { position: absolute; left: 0; right: 0; top: 1520px; height: 64px; overflow: hidden; display: flex; border-top: 3px solid ${oro}; border-bottom: 3px solid ${oro}; background: ${noche}; }
    ${S} .amb-tk-tab { position: absolute; left: 0; top: 0; bottom: 0; width: 270px; justify-content: center; display: flex; white-space: nowrap; align-items: center; padding: 0 18px; background: ${rojo}; color: ${blanco}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 26px; text-transform: uppercase; letter-spacing: 0.06em; }
    ${S} .amb-tk-tab.v { font-size: 23px; background: ${verde}; color: ${noche}; opacity: 0; }
    ${S} .amb-tk-clip { position: absolute; left: 270px; right: 0; top: 0; bottom: 0; overflow: hidden; }
    ${S} .amb-tk { position: absolute; left: 16px; top: 0; height: 58px; display: flex; align-items: center; white-space: nowrap; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.08em; color: ${blanco}; }
    ${S} .amb-tk2 { color: ${verde}; opacity: 0; }
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="${DUR}">
    <div id="amb-escena" class="amb-capa clip" data-start="0" data-duration="${DUR}" data-track-index="0">
      <div class="amb-vineta"></div>
      <div class="amb-barrido"></div>
      <div class="amb-banda"></div>
      <div class="amb-flicker"></div>
      <div class="amb-barra">
        <div class="amb-vivo"><span class="amb-punto"></span><span>En vivo</span></div>
        <div class="amb-cn"><span>Cadena nacional</span></div>
        <div class="amb-hora"><span>20:00</span></div>
      </div>
      <svg viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(960 152) scale(0.3)"><g class="amb-escudo">${escudo("amb-e")}</g></g></svg>
      <div class="amb-ticker">
        <div class="amb-tk-tab amb-tk-r">Comunicado</div>
        <div class="amb-tk-tab v">Último momento</div>
        <div class="amb-tk-clip">
          <div class="amb-tk amb-tk1">${T1.repeat(4)}</div>
          <div class="amb-tk amb-tk2">${T2.repeat(4)}</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "ambiente";
      const DUR = ${DUR};
      const MINISTRO = ${MINISTRO};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({ paused: true });
      // TV vieja: la banda clara baja sin parar y la imagen parpadea apenas
      tl.fromTo(q(".amb-banda"), { y: -200 }, { y: 1960, duration: 3.2, ease: "none", repeat: Math.floor(DUR / 3.2) - 1 }, 0);
      tl.to(q(".amb-flicker"), { opacity: 0.035, duration: 0.07, yoyo: true, repeat: Math.floor(DUR / 0.07) - 1, ease: "steps(1)" }, 0);
      tl.to(q(".amb-punto"), { opacity: 0.2, duration: 0.5, yoyo: true, repeat: Math.floor(DUR / 0.5) - 1, ease: "steps(1)" }, 0);
      // el zócalo corrido
      tl.fromTo(q(".amb-tk1"), { x: 0 }, { x: -110 * MINISTRO, duration: MINISTRO, ease: "none" }, 0);
      tl.to([q(".amb-tk1"), q(".amb-tk-r")], { opacity: 0, duration: 0.2 }, MINISTRO);
      tl.to([q(".amb-tk2"), q(".amb-tk-tab.v")], { opacity: 1, duration: 0.2 }, MINISTRO);
      tl.fromTo(q(".amb-tk2"), { x: 0 }, { x: -110 * (DUR - MINISTRO), duration: DUR - MINISTRO, ease: "none" }, MINISTRO);
      tl.to(q(".amb-escudo"), { rotation: 6, svgOrigin: "0 0", duration: 1.6, yoyo: true, repeat: Math.floor(DUR / 1.6) - 1, ease: "sine.inOut" }, 0);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
fs.writeFileSync("compositions/ambiente.html", html);
console.log("ambiente", DUR);
