// s08-giro: se apagan las luces del set; Beto solo bajo un cono de luz con el celular que no para.
// "Actuás bárbaro" (estrellas), "sos el único" (el cono se cierra), "que atiende ese teléfono" (contador).
import { escena, duracion, beto, celular, mano, brillito, cono, COL } from "./comun.mjs";
const id = "s08-giro", dur = duracion(id);
const svg = `
  <rect class="s08-osc" x="0" y="0" width="1080" height="1920" fill="#000" opacity="0" />
  ${cono(540, 560, 1600, 160, 820, "s08-cono", 0.16)}
  <ellipse cx="540" cy="1580" rx="380" ry="50" fill="${COL.ambar}" opacity="0.14" />
  ${beto({ id: "s08-beto", x: 540, y: 1560, s: 1.05, cara: "sonrisa" })}
  <g class="s08-celg">${celular({ cls: "s08-cel", x: 760, y: 1240, s: 0.75, rot: 14 })}${mano(770, 1330, 1.0, 14)}
    <g class="s08-badge"><circle cx="830" cy="1135" r="40" fill="${COL.rojo}" stroke="${COL.ink}" stroke-width="5" />
      <text class="s08-n1" x="830" y="1151" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${COL.blanco}">1</text>
      <text class="s08-n2" x="830" y="1151" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${COL.blanco}">2</text>
      <text class="s08-n3" x="830" y="1151" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="${COL.blanco}">3</text></g></g>
  ${brillito(300, 900, 1.4, COL.ama, "s08-est")}${brillito(800, 840, 1.1, COL.ama, "s08-est")}${brillito(220, 1120, 0.9, COL.ama, "s08-est")}
`;
const html = `
  <div class="sello s08-bar">¡BÁRBARO!</div>
  <div class="tag s08-uni">EL ÚNICO QUE ATIENDE</div>`;
const css = `
  P .s08-bar { left: 300px; top: 620px; font-size: 84px; color: ${COL.ama}; border-color: ${COL.ama}; transform: rotate(-5deg); }
  P .s08-uni { left: 120px; top: 1000px; font-size: 28px; transform: rotate(-3deg); }
`;
const js = `
      const ACT = 0, BAR = 0.31, EL = 1.15, UNI = 1.94, ATI = 2.39, TEL = 2.83;
      pop(".s08-bar", BAR, { desde: 1.8 });
      pop(".s08-est", BAR + 0.1, { desde: 0.2, o: "0 0" });
      balancea(".s08-est", BAR, 1.2, 18, 0.25);
      // "el problema...": baja la luz, se va el bárbaro
      tl.to(q(".s08-bar"), { opacity: 0, y: -40, duration: 0.25 }, EL);
      sale(".s08-est", EL, 0.25);
      tl.to(q(".s08-osc"), { opacity: 0.55, duration: 0.5 }, EL);
      tl.fromTo(q(".s08-cono"), { scaleX: 1, svgOrigin: "540 560" }, { scaleX: 0.6, svgOrigin: "540 560", duration: 0.6, ease: "power2.inOut", immediateRender: false }, EL);
      pop(".s08-uni", UNI, { desde: 0.6 });
      // el teléfono que no para
      pop(".s08-celg", ATI - 0.2, { desde: 0.5, o: "760 1240" });
      vibrar(".s08-celg", ATI, 1.2, 6);
      gsap.set(qa(".s08-n2, .s08-n3"), { opacity: 0 });
      tl.to(q(".s08-n1"), { opacity: 0, duration: 0.01 }, TEL);
      tl.to(q(".s08-n2"), { opacity: 1, duration: 0.01 }, TEL);
      tl.to(q(".s08-n2"), { opacity: 0, duration: 0.01 }, TEL + 0.4);
      tl.to(q(".s08-n3"), { opacity: 1, duration: 0.01 }, TEL + 0.4);
      tl.to(q(".s08-badge"), { scale: 1.3, svgOrigin: "830 1135", duration: 0.1, yoyo: true, repeat: 3 }, TEL);
      respira(".s08-beto", 0, DUR, 5, 0.6);
      pestanea(".s08-beto-ojos", 2.0);
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.31, sfx: "sparkle", vol: 0.3 },
  { t: 1.15, sfx: "whoosh", vol: 0.2 },
  { t: 2.4, sfx: "vibra", vol: 0.35 },
  { t: 2.83, sfx: "ping", vol: 0.25 },
  { t: 3.23, sfx: "ping", vol: 0.25 },
] });
