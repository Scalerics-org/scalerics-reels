// s03-delivery: el WhatsApp interrumpe: "Hola, ¿hacen delivery?". Beto se olvida de la cámara y contesta.
import { escena, duracion, beto, celular, mano, vibra, camara, noti, globo, COL } from "./comun.mjs";
const id = "s03-delivery", dur = duracion(id);
const svg = `
  ${camara(890, 1020, 0.5, "s03-cam", -1)}
  ${beto({ id: "s03-beto", x: 720, y: 1560, s: 1.0, cara: "sonrisa" })}
  <g class="s03-celg">${celular({ cls: "s03-cel", x: 330, y: 1270, s: 1.0, rot: -12 })}${mano(345, 1380, 1.1, -12)}</g>
  ${vibra(330, 1270, 1.0, "s03-vib")}
`;
const html = `
  ${noti("s03-noti", "CLIENTA", "Hola, ¿hacen delivery?", { x: 70, y: 600, w: 940, tam: 50 })}
  ${globo("s03-resp", "¡Sí, reina! Ya te paso el menú", { x: 70, y: 820, w: 560, lado: "der", tam: 40 })}
  <div class="tag s03-tag">LA CÁMARA SIGUE GRABANDO</div>`;
const css = `
  P .s03-tag { left: 80px; top: 1000px; font-size: 28px; background: ${COL.rojo}; color: ${COL.blanco}; transform: rotate(-3deg); }
`;
const js = `
      const HOLA = 0, DEL = 0.91, SI = 1.87, REI = 2.04, YA = 2.56, MENU = 3.51;
      entra(".s03-noti", 0, { y: -400 }, 0.3);
      vibrar(".s03-noti", 0.3, 0.6, 7);
      pop(".s03-vib", 0.05, { desde: 0.5, o: "330 1270" });
      tl.to(q(".s03-vib"), { opacity: 0, duration: 0.2 }, 1.3);
      vibrar(".s03-celg", 0.05, 1.1, 8);
      entra(".s03-beto", 0, { y: 260 }, 0.35);
      habla(".s03-beto-boca", SI - 0.05, MENU - SI + 0.5, 0.1, 0.5);
      tl.to(q(".s03-beto"), { rotation: -8, svgOrigin: "0 100", duration: 0.25 }, 0.6);
      pop(".s03-resp", YA, { desde: 0.5, o: "100% 100%" });
      tl.fromTo(q(".s03-cam-tally"), { opacity: 1 }, { opacity: 0.15, duration: 0.3, yoyo: true, repeat: 13, ease: "steps(1)", immediateRender: false }, 0);
      pop(".s03-tag", 2.9, { desde: 0.6 });
      pestanea(".s03-beto-ojos", 1.4);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.0, sfx: "notification", vol: 0.45, max: 0.9 },
  { t: 0.05, sfx: "vibra", vol: 0.4 },
  { t: 2.56, sfx: "pop", vol: 0.3 },
  { t: 3.1, sfx: "typing", vol: 0.2, max: 0.8 },
] });
