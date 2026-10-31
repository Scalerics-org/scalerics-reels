// s10-jubilarnos: ¡no queremos más cinta! Queremos jubilarnos.
import { escena, duracion, postit, megafono, vincha, rollo, pancarta, COL } from "./comun.mjs";
const id = "s10-jubilarnos", dur = duracion(id);
const svg = `
  ${rollo(800, 760, 0.9, "s10-rollo")}
  <g class="s10-x"><path d="M680 640 L920 880 M920 640 L680 880" stroke="${COL.rojo}" stroke-width="26" stroke-linecap="round" /></g>
  ${pancarta({ id: "s10-pan", x: 540, y: 760, w: 900, h: 290, rot: -3, txt: ["¡QUEREMOS", "JUBILARNOS!"], tam: 108, palo: 0, col: COL.rojo })}
  ${postit({ id: "s10-del", x: 330, y: 1160, s: 0.95, col: "y", rot: 0, cara: "grita", brazos: "puno", piernas: true, extra: vincha() + megafono(150, -40, -20) })}
  ${postit({ id: "s10-a", x: 790, y: 1240, s: 0.5, col: "r", rot: 8, cara: "grita", brazos: "puno" })}
  ${postit({ id: "s10-b", x: 950, y: 1300, s: 0.45, col: "c", rot: -8, cara: "grita", brazos: "puno" })}
`;
const js = `
      const NO = 0, QUER = 0.17, MAS = 0.59, CINTA = 0.93, Q2 = 2.06, JUB = 2.37;
      entra(".s10-del", 0, { y: 400 }, 0.3);
      habla(".s10-del-boca", 0, 1.4, 0.08);
      habla(".s10-del-boca", Q2, 1.3, 0.08);
      pop(".s10-rollo", 0.1, { o: "0 0" });
      golpe(".s10-x", CINTA, { desde: 2.2, o: "800 760" });
      sacudon(CINTA + 0.05, 1.2);
      tl.to(qa(".s10-rollo, .s10-x"), { opacity: 0, y: -60, duration: 0.2 }, Q2 - 0.1);
      golpe(".s10-pan", JUB, { desde: 2.0, o: "0 0" });
      sacudon(JUB + 0.05, 1.5);
      balancea(".s10-pan", JUB + 0.25, 1.0, 2, 0.2, "0 130");
      pop(".s10-a, .s10-b", Q2, { d: 0.25 });
      respira(".s10-a, .s10-b", Q2 + 0.2, 1.4, -18, 0.16);
`;
escena({ id, dur, css: "", svg, html: "", js, sfx: [
  { t: 0.05, sfx: "whoosh-short", vol: 0.25 },
  { t: 0.9, sfx: "glitch-1", vol: 0.3, max: 0.4 },
  { t: 0.95, sfx: "impact-bass-1", vol: 0.35, max: 0.5 },
  { t: 2.33, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
] });
