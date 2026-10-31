import { C, somm, copaSvg, botella, barrica, clienta, escena, sfx } from "./lib.mjs";
import { D } from "./dur.mjs";

// ---------------- s02-color ----------------
{
  const id = "s02-color", p = "s02";
  const sw = [["ROSADO", "#d9707f"], ["RUBÍ", "#b53048"], ["GRANATE", "#8a1f33"], ["BORDÓ", "#5e1222"]]
    .map(([n, c], i) => `<g class="${p}-sw"><rect x="0" y="${70 + i * 66}" width="56" height="48" rx="6" fill="${c}" stroke="${C.tinta}" stroke-width="3" /><text class="serif" x="76" y="${104 + i * 66}" font-size="28" fill="${C.tinta}">${n}</text></g>`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["Fase visual", "Visto, sin respuesta", "Guarda: tres horas"],
    svg: `
          <!-- vela grande detrás de la copa -->
          <g class="${p}-vela"><g transform="translate(220 1250)">
            <ellipse class="${p}-halo" cx="0" cy="-330" rx="150" ry="190" fill="#f2b254" opacity="0.14" />
            <rect x="-46" y="-250" width="92" height="250" rx="10" fill="${C.crema}" />
            <path d="M-46 -236 Q-24 -210 -28 -170 Q-30 -150 -12 -140" fill="none" stroke="${C.cremaS}" stroke-width="8" stroke-linecap="round" />
            <path d="M0 -250 V-270" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />
            <path class="${p}-llama" d="M0 -380 Q40 -320 22 -288 Q12 -270 0 -270 Q-12 -270 -22 -288 Q-40 -320 0 -380 Z" fill="#f2b254" />
            <path d="M0 -336 Q16 -304 8 -288 Q0 -282 -8 -288 Q-16 -304 0 -336 Z" fill="#fff1c9" />
          </g></g>
          ${copaSvg(p, "copa", 470, 1070, 2.55, 0.55)}
          <!-- lo que se ve en el vino: el mensaje en visto -->
          <g class="${p}-msj">
            <rect x="380" y="900" width="190" height="62" rx="26" fill="${C.crema}" />
            <text class="ui" x="475" y="941" font-size="28" fill="${C.tinta}" text-anchor="middle">¿Precio?</text>
          </g>
          <text class="ui ${p}-visto" x="566" y="1002" font-size="28" fill="${C.crema}" text-anchor="end" opacity="0.9">Visto</text>
          <!-- carta de colores -->
          <g class="${p}-carta"><g transform="translate(700 620)">
            <rect x="-14" y="0" width="330" height="430" rx="10" fill="${C.crema}" stroke="${C.cremaS}" stroke-width="4" />
            <text class="serif" x="151" y="46" font-size="30" fill="${C.bordo}" text-anchor="middle" letter-spacing="3">COLOR</text>
            ${sw}
            <g class="${p}-sw-visto">
              <rect x="-6" y="330" width="314" height="70" rx="8" fill="none" stroke="${C.dorado}" stroke-width="5" />
              <rect x="0" y="338" width="56" height="54" rx="6" fill="#2a060d" stroke="${C.tinta}" stroke-width="3" />
              <text class="serif" x="76" y="377" font-size="30" fill="${C.bordo}">VISTO</text>
            </g>
          </g></g>
          <g class="${p}-barrica">${barrica(p, "barr", 880, 1185, 0.8, "3 horas")}</g>
    `,
    js: `
      const COLOR = 1.09, VISTO = 2.87, INTENSO = 3.12, TRES = 4.67;
      tl.fromTo(q(".${p}-copa"), { opacity: 0.4, y: 60, rotation: -6, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".${p}-vela"), { opacity: 0.5 }, { opacity: 1, duration: 0.4 }, 0);
      tl.fromTo(q(".${p}-llama"), { scaleY: 0.9, skewX: -4, transformOrigin: "50% 100%" }, { scaleY: 1.1, skewX: 4, duration: 0.33, ease: "sine.inOut", yoyo: true, repeat: 18 }, 0);
      tl.fromTo(q(".${p}-halo"), { opacity: 0.1 }, { opacity: 0.2, duration: 0.45, yoyo: true, repeat: 13 }, 0);
      // el vino gira en la copa
      tl.fromTo(q(".${p}-copa-vino"), { rotation: -6, transformOrigin: "50% 50%" }, { rotation: 6, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 15 }, 0);
      etiq(0, 1, 0.1);
      // "color": la carta de colores
      tl.fromTo(q(".${p}-carta"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.4)" }, COLOR - 0.1);
      tl.fromTo(qa(".${p}-sw"), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.2, stagger: 0.12 }, COLOR + 0.15);
      gsap.set(q(".${p}-sw-visto"), { opacity: 0 });
      // "visto": aparece el mensaje en el vino y el color "VISTO"
      pop(q(".${p}-msj"), VISTO - 0.35);
      tl.fromTo(q(".${p}-visto"), { opacity: 0, y: 10 }, { opacity: 0.9, y: 0, duration: 0.25 }, VISTO);
      tl.fromTo(q(".${p}-sw-visto"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, VISTO);
      etiq(1, 2, VISTO);
      // "intenso": el vino se oscurece
      tl.to(q(".${p}-copa-vino rect"), { attr: { fill: "#4a0b18" }, duration: 0.5 }, INTENSO);
      tl.to(q(".${p}-copa-vino ellipse"), { attr: { fill: "#6e1426" }, duration: 0.5 }, INTENSO);
      tl.to(q(".${p}-sw-visto"), { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1 }, INTENSO);
      // "tres horas de guarda": la barrica
      tl.fromTo(q(".${p}-barrica"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, TRES - 0.15);
      tl.to(q(".${p}-msj"), { opacity: 0.45, duration: 0.6 }, TRES);
      etiq(2, 3, TRES + 0.2);
    `,
  });
  sfx(id, [{ t: 0.05, sfx: "tic", vol: 0.25 }, { t: 1.0, sfx: "whoosh-short", vol: 0.22 }, { t: 2.55, sfx: "notification", vol: 0.25 }, { t: 2.9, sfx: "pop", vol: 0.25 }, { t: 3.15, sfx: "drama", vol: 0.25, max: 1.2 }, { t: 4.55, sfx: "golpe", vol: 0.3 }]);
}

// ---------------- s03-nariz ----------------
{
  const id = "s03-nariz", p = "s03";
  const CX = 790, CY = 800, R = 200;
  const cols = [C.vino, C.roble, C.doradoOsc, C.bordo, C.robleC, "#5e1222"];
  const noms = ["FRUTOS", "ROBLE", "VAINILLA", "CUERO", "ESPECIAS", "PRIVADO"];
  let cuñas = "";
  for (let i = 0; i < 6; i++) {
    const a0 = (-90 + i * 60) * Math.PI / 180, a1 = (-90 + (i + 1) * 60) * Math.PI / 180, am = (a0 + a1) / 2;
    const P = (a, r) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
    const tx = Math.cos(am) * R * 0.62, ty = Math.sin(am) * R * 0.62;
    const rot = (am * 180 / Math.PI + 90 + 360) % 360;
    const rr = rot > 90 && rot < 270 ? rot + 180 : rot;
    cuñas += `<g class="${p}-cuña ${i === 5 ? p + "-cuña-p" : ""}"><path d="M0 0 L${P(a0, R)} A${R} ${R} 0 0 1 ${P(a1, R)} Z" fill="${cols[i]}" stroke="${C.tinta}" stroke-width="5" />
      <text class="serif" x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="25" fill="${C.crema}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rr.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)})" letter-spacing="1">${noms[i]}</text></g>`;
  }
  escena({
    id, dur: D[id],
    etiquetas: ["Fase olfativa", "Invasivas"],
    svg: `
          <g class="${p}-rueda-w"><g transform="translate(${CX} ${CY})"><g class="${p}-rueda">
            <circle r="${R + 14}" fill="none" stroke="${C.dorado}" stroke-width="4" opacity="0.7" />
            ${cuñas}
            <circle r="44" fill="${C.crema}" stroke="${C.tinta}" stroke-width="5" />
            <text class="serif" y="9" font-size="24" fill="${C.bordo}" text-anchor="middle">NARIZ</text>
          </g></g></g>
          ${somm(p, { x: 300, y: 940, s: 1.0, copa: false })}
          <g class="${p}-copa-w">${copaSvg(p, "copa", 420, 1030, 0.95, 0.35)}<circle cx="420" cy="1080" r="24" fill="${C.piel}" class="tinta" stroke-width="4" /></g>
          <g class="${p}-aromas" fill="none" stroke="${C.cremaS}" stroke-width="6" stroke-linecap="round" opacity="0.8">
            <path d="M420 860 Q400 820 425 790 Q450 760 430 720" />
            <path d="M460 850 Q445 815 468 785 Q492 755 475 715" />
            <path d="M380 875 Q355 845 375 815 Q395 785 380 750" />
          </g>
          <g class="${p}-cartel"><g transform="translate(790 1140)">
            <rect x="-240" y="-62" width="480" height="124" rx="10" fill="${C.crema}" stroke="${C.dorado}" stroke-width="5" />
            <text class="serif" x="0" y="-18" font-size="26" fill="${C.bordo}" text-anchor="middle" letter-spacing="3">NOTAS DE</text>
            <text class="cursiva" x="0" y="34" font-size="46" fill="${C.tinta}" text-anchor="middle">«precio por privado»</text>
          </g></g>
    `,
    js: `
      const NOTAS = 1.13, PRECIO = 2.07, PRIVADO = 2.58, INVASIVAS = 3.74;
      // la copa ya está en la nariz
      gsap.set(q(".${p}-copa"), { rotation: -38, transformOrigin: "50% 100%" });
      tl.fromTo(q(".${p}-som"), { opacity: 0.5, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.to(q(".${p}-som-cabeza"), { y: -4, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.2);
      tl.fromTo(q(".${p}-copa-w"), { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.to(q(".${p}-copa-w"), { y: -14, rotation: -4, transformOrigin: "50% 100%", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      tl.to(q(".${p}-copa-w"), { x: 50, y: 30, duration: 0.2, ease: "power3.out" }, INVASIVAS - 0.05);
      dibujar(".${p}-aromas path", 0.2, 0.7);
      etiq(0, 1, 0.1);
      // "notas": la rueda de aromas
      tl.fromTo(q(".${p}-rueda"), { opacity: 0, rotation: -120, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, rotation: 0, scale: 1, duration: 0.6, ease: "back.out(1.3)" }, NOTAS - 0.25);
      tl.to(q(".${p}-rueda"), { rotation: 8, duration: 0.8, ease: "sine.inOut" }, NOTAS + 0.4);
      // "precio por privado": la cuña sale
      tl.to(q(".${p}-cuña-p"), { x: -40, y: -26, duration: 0.3, ease: "back.out(2)" }, PRECIO);
      tl.to(q(".${p}-cuña-p path"), { attr: { fill: "${C.dorado}" }, duration: 0.2 }, PRECIO);
      tl.to(q(".${p}-cuña-p text"), { attr: { fill: "${C.tinta}" }, duration: 0.2 }, PRECIO);
      pop(q(".${p}-cartel"), PRECIO + 0.05);
      tl.to(q(".${p}-cartel"), { rotation: -2, duration: 0.2, yoyo: true, repeat: 1 }, PRIVADO + 0.2);
      // "invasivas": el sommelier se echa para atrás
      tl.to(q(".${p}-som"), { rotation: -7, x: -24, transformOrigin: "50% 100%", duration: 0.18, ease: "power3.out" }, INVASIVAS - 0.05);
      tl.set(q(".${p}-som-ojos-snob"), { opacity: 0 }, INVASIVAS);
      tl.set(q(".${p}-som-ojos-ab"), { opacity: 1 }, INVASIVAS);
      tl.set(q(".${p}-som-boca"), { opacity: 0 }, INVASIVAS);
      tl.set(q(".${p}-som-asco"), { opacity: 1 }, INVASIVAS);
      tl.to(q(".${p}-som-ceja-i"), { y: -12, duration: 0.15 }, INVASIVAS);
      tl.to(q(".${p}-aromas"), { scale: 1.5, transformOrigin: "50% 100%", attr: { stroke: "${C.vino}" }, duration: 0.3, ease: "back.out(2)" }, INVASIVAS);
      temblor(q(".${p}-rueda-w"), INVASIVAS + 0.05, 0.8);
      etiq(1, 2, INVASIVAS);
    `,
  });
  sfx(id, [{ t: 0.1, sfx: "whoosh-short", vol: 0.2 }, { t: 1.0, sfx: "whoosh-short", vol: 0.2 }, { t: 2.05, sfx: "pop", vol: 0.3 }, { t: 2.6, sfx: "tic", vol: 0.25 }, { t: 3.7, sfx: "glitch-1", vol: 0.25 }, { t: 3.75, sfx: "uuh", vol: 0.2, max: 1.2 }]);
}

// ---------------- s04-audio ----------------
{
  const id = "s04-audio", p = "s04";
  let barras = "";
  for (let i = 0; i < 12; i++) { const h = 10 + ((i * 37) % 7) * 6; barras += `<rect class="${p}-barra" x="${i * 11}" y="${-h / 2}" width="6" height="${h}" rx="3" fill="${C.crema}" />`; }
  escena({
    id, dur: D[id],
    etiquetas: ["Testigo · la clienta", "Audio de cuatro minutos"],
    svg: `
          ${clienta(p, { x: 290, y: 930, s: 1.22 })}
          <g class="${p}-mano"><g transform="translate(560 1130)"><path d="M-130 120 Q-60 60 -10 0" fill="none" stroke="${C.doradoOsc}" stroke-width="58" stroke-linecap="round" /><circle cx="0" cy="-6" r="30" fill="${C.piel}" class="tinta" stroke-width="4" /></g></g>
          <g class="${p}-celu"><g transform="translate(790 950)">
            <rect x="-175" y="-320" width="350" height="640" rx="44" fill="#120607" stroke="${C.crema}" stroke-width="6" />
            <rect x="-40" y="-302" width="80" height="12" rx="6" fill="${C.crema}" opacity="0.5" />
            <circle cx="-120" cy="-240" r="26" fill="${C.bordo}" stroke="${C.dorado}" stroke-width="4" />
            <text class="ui" x="-82" y="-231" font-size="26" fill="${C.crema}">tu_local</text>
            <path d="M-160 -196 H160" stroke="${C.crema}" stroke-width="2" opacity="0.25" />
            <g class="${p}-preg">
              <rect x="-56" y="-160" width="214" height="60" rx="26" fill="${C.dorado}" />
              <text class="ui" x="51" y="-121" font-size="24" fill="${C.tinta}" text-anchor="middle">¿Cuánto sale?</text>
            </g>
            <g class="${p}-escribe">
              <rect x="-160" y="-70" width="110" height="52" rx="24" fill="#3a1418" />
              <circle class="${p}-pt" cx="-130" cy="-44" r="7" fill="${C.crema}" /><circle class="${p}-pt" cx="-106" cy="-44" r="7" fill="${C.crema}" /><circle class="${p}-pt" cx="-82" cy="-44" r="7" fill="${C.crema}" />
            </g>
            <g class="${p}-audio">
              <rect x="-160" y="-76" width="300" height="88" rx="30" fill="${C.bordo}" stroke="${C.vino}" stroke-width="3" />
              <circle cx="-118" cy="-32" r="26" fill="${C.crema}" />
              <path d="M-126 -46 L-104 -32 L-126 -18 Z" fill="${C.bordo}" />
              <g transform="translate(-80 -32)">${barras}</g>
              <text class="ui ${p}-dur" x="130" y="-22" font-size="26" fill="${C.crema}" text-anchor="end">4:00</text>
            </g>
            <g class="${p}-grande">
              <circle cx="0" cy="150" r="96" fill="none" stroke="${C.dorado}" stroke-width="6" />
              <text class="ui" x="0" y="168" font-size="56" fill="${C.dorado}" text-anchor="middle">4:00</text>
              <text class="serif" x="0" y="290" font-size="30" fill="${C.crema}" text-anchor="middle" letter-spacing="3">MINUTOS</text>
            </g>
          </g></g>
    `,
    js: `
      const CUANTO = 0.92, MANDARON = 2.13, AUDIO = 2.87, CUATRO = 3.34, MINUTOS = 3.8;
      tl.fromTo(q(".${p}-cli"), { opacity: 0.5, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".${p}-celu"), { opacity: 0.4, y: 80, rotation: 6, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".${p}-mano"), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4 }, 0.1);
      tl.fromTo(q(".${p}-cli-boca"), { scaleY: 0.5, transformOrigin: "50% 50%" }, { scaleY: 1.25, duration: 0.18, yoyo: true, repeat: 9 }, 0.1);
      etiq(0, 1, 0.1);
      // "cuánto": su pregunta
      pop(q(".${p}-preg"), CUANTO - 0.1);
      // escribiendo...
      tl.fromTo(q(".${p}-escribe"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.6);
      tl.fromTo(qa(".${p}-pt"), { y: 0 }, { y: -8, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08 }, 1.65);
      tl.to(q(".${p}-escribe"), { opacity: 0, duration: 0.1 }, AUDIO - 0.15);
      // "audio": la respuesta es un audio
      pop(q(".${p}-audio"), AUDIO - 0.1);
      tl.fromTo(qa(".${p}-barra"), { scaleY: 0.3, transformOrigin: "50% 50%" }, { scaleY: 1, duration: 0.15, stagger: 0.03 }, AUDIO);
      // "cuatro minutos": la duración en grande
      tl.to(q(".${p}-dur"), { scale: 1.3, transformOrigin: "100% 50%", attr: { fill: "${C.dorado}" }, duration: 0.2 }, CUATRO);
      tl.fromTo(q(".${p}-grande"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, CUATRO);
      tl.to(q(".${p}-grande circle"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 3 }, MINUTOS);
      tl.to(q(".${p}-cli-cabeza"), { rotation: -8, transformOrigin: "50% 90%", duration: 0.12, yoyo: true, repeat: 3 }, MINUTOS);
      tl.to(q(".${p}-cli-cejas"), { y: -10, duration: 0.15 }, CUATRO);
      etiq(1, 2, CUATRO);
    `,
  });
  sfx(id, [{ t: 0.82, sfx: "key-press", vol: 0.3 }, { t: 1.0, sfx: "pop", vol: 0.25 }, { t: 1.65, sfx: "typing", vol: 0.2, max: 0.8 }, { t: 2.8, sfx: "notification", vol: 0.3 }, { t: 3.34, sfx: "impact-bass-1", vol: 0.3 }, { t: 3.85, sfx: "uuh", vol: 0.2, max: 1.2 }]);
}
