import { C, somm, botella, dueno, escena, sfx } from "./lib.mjs";
import { D } from "./dur.mjs";
const estrella = (x, y, r, cls) => `<path class="${cls}" d="M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z" fill="${C.dorado}" />`;

// ---------------- s08-para ----------------
{
  const id = "s08-para", p = "s08";
  escena({
    id, dur: D[id],
    etiquetas: ["El dueño", "Ofendido"],
    svg: `
          ${dueno(p, { x: 650, y: 920, s: 1.3 })}
          <g class="${p}-palma"><g transform="translate(300 860) rotate(-8)">
            <path d="M120 260 Q60 160 10 90" fill="none" stroke="${C.tinta}" stroke-width="66" stroke-linecap="round" />
            <path d="M120 260 Q60 160 10 90" fill="none" stroke="${C.crema}" stroke-width="56" stroke-linecap="round" />
            <path d="M-60 40 Q-70 -20 -50 -90 Q-40 -110 -26 -90 L-20 -30 L-14 -120 Q-4 -140 10 -120 L12 -36 L22 -126 Q34 -144 46 -122 L42 -30 L56 -100 Q68 -116 80 -96 L70 20 Q90 0 106 4 Q116 14 100 40 Q60 100 20 110 Q-50 110 -60 40 Z" fill="${C.piel}" class="tinta" />
          </g></g>
          <g class="${p}-prod">${botella(p, "botella", 300, 1260, 0.92, ["LO MÍO", "de la", "casa"])}</g>
          <g class="${p}-brillos">${estrella(190, 860, 34, p + "-br")}${estrella(420, 900, 26, p + "-br")}${estrella(230, 1100, 22, p + "-br")}${estrella(400, 1150, 30, p + "-br")}</g>
          <g class="${p}-rayas" fill="none" stroke="${C.dorado}" stroke-width="8" stroke-linecap="round">
            <path d="M840 700 L880 660 M880 760 L940 740 M800 660 L810 610" />
          </g>
    `,
    js: `
      const PARA = 0.0, VENDO = 1.04, BUENO = 1.61;
      tl.fromTo(q(".${p}-due"), { x: 420, rotation: 10, transformOrigin: "50% 100%" }, { x: 0, rotation: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".${p}-palma"), { opacity: 0, scale: 0.4, transformOrigin: "50% 80%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.08);
      dibujar(".${p}-rayas path", 0.2, 0.25);
      tl.fromTo(q(".${p}-due-boca"), { scaleY: 1.4, transformOrigin: "50% 50%" }, { scaleY: 0.6, duration: 0.15, yoyo: true, repeat: 11 }, 0);
      temblor(q(".${p}-due-cabeza"), 0.32, 0.6);
      etiq(0, 1, 0.05);
      // "vendo": cambia la palma por lo que vende
      tl.to(q(".${p}-palma"), { opacity: 0, scale: 0.6, duration: 0.15 }, VENDO - 0.2);
      tl.fromTo(q(".${p}-prod"), { opacity: 0, y: 80, rotation: -10, transformOrigin: "50% 100%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.3, ease: "back.out(1.8)" }, VENDO - 0.1);
      // "bueno": brilla, orgulloso
      qa(".${p}-br").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0, rotation: -45, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" }, BUENO - 0.1 + i * 0.06));
      tl.to(qa(".${p}-br"), { scale: 0.7, duration: 0.25, yoyo: true, repeat: 1 }, BUENO + 0.35);
      tl.to(q(".${p}-due-cejas"), { y: 6, duration: 0.15 }, BUENO);
      etiq(1, 2, BUENO);
    `,
  });
  sfx(id, [{ t: 0.0, sfx: "impact-bass-1", vol: 0.3 }, { t: 0.1, sfx: "whoosh-short", vol: 0.25 }, { t: 1.0, sfx: "pop", vol: 0.3 }, { t: 1.6, sfx: "sparkle", vol: 0.3 }]);
}

// ---------------- s09-uva ----------------
{
  const id = "s09-uva", p = "s09";
  const uvas = [[0, 0], [-56, 0], [56, 0], [-112, 0], [112, 0], [-84, 50], [-28, 50], [28, 50], [84, 50], [-56, 100], [0, 100], [56, 100], [-28, 150], [28, 150], [0, 200]]
    .map(([x, y]) => `<g class="${p}-uva"><circle cx="${x}" cy="${y}" r="32" fill="${C.vino}" class="tinta" stroke-width="4" /><circle cx="${x - 10}" cy="${y - 10}" r="7" fill="${C.crema}" opacity="0.6" /></g>`).join("");
  const notas = [["¿precio?", -10, -260, -8], ["transferí", 10, -170, 7], ["captura", -14, -80, -5], ["visto", 8, 10, 9]]
    .map(([t, x, y, r]) => `<g class="${p}-nota" data-layout-allow-overlap><g transform="translate(${x} ${y}) rotate(${r})"><rect x="-80" y="-36" width="160" height="72" rx="4" fill="${C.dorado}" stroke="${C.doradoOsc}" stroke-width="3" /><text class="mano" x="0" y="12" font-size="38" fill="${C.tinta}" text-anchor="middle">${t}</text></g></g>`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["La uva: excelente", "Falla: cómo se compra"],
    svg: `
          <g class="${p}-racimo"><g transform="translate(290 800) scale(1.3)">
            <path d="M0 -40 Q10 -100 50 -130" fill="none" stroke="${C.roble}" stroke-width="12" stroke-linecap="round" />
            <path d="M20 -90 Q80 -160 150 -110 Q110 -60 20 -90 Z" fill="#6b7a2e" class="tinta" stroke-width="4" />
            <path d="M24 -92 Q80 -118 130 -112" fill="none" stroke="#4f5a20" stroke-width="4" />
            ${uvas}
          </g></g>
          <g class="${p}-medalla"><g transform="translate(430 1170)">
            <path d="M-40 -20 L-70 90 L-30 70 L-10 110 L10 0 Z M40 -20 L70 90 L30 70 L10 110 L-10 0 Z" fill="${C.bordo}" class="tinta" stroke-width="4" />
            <circle r="78" fill="${C.dorado}" class="tinta" />
            <circle r="62" fill="none" stroke="${C.doradoOsc}" stroke-width="4" />
            <text class="serif" y="-6" font-size="25" fill="${C.tinta}" text-anchor="middle" letter-spacing="1">EXCE-</text>
            <text class="serif" y="24" font-size="25" fill="${C.tinta}" text-anchor="middle" letter-spacing="1">LENTE</text>
          </g></g>
          <g class="${p}-bot-w">${botella(p, "botella", 770, 1260, 1.0, ["TU LOCAL"])}
            <g transform="translate(770 1260)">${notas}</g>
            <path class="${p}-grieta" d="M800 1000 L780 1040 L806 1070 L784 1120 L800 1160" fill="none" stroke="${C.crema}" stroke-width="5" stroke-linecap="round" />
          </g>
    `,
    js: `
      const UVA = 0.17, EXC = 0.68, ARRUINA = 2.63, BOTELLA = 3.13, COMO = 3.98, COMPRA = 4.41;
      tl.fromTo(q(".${p}-racimo"), { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(qa(".${p}-uva"), { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.02 }, UVA - 0.1);
      tl.to(q(".${p}-racimo"), { rotation: 4, transformOrigin: "50% 0%", duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      // "excelente": medalla
      tl.fromTo(q(".${p}-medalla"), { opacity: 0, scale: 0.3, rotation: -30, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, EXC - 0.1);
      etiq(0, 1, EXC);
      // "arruina la botella"
      tl.fromTo(q(".${p}-bot-w"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.4)" }, ARRUINA - 0.1);
      // "cómo se compra": los papelitos tapan la botella
      qa(".${p}-nota").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 1.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.18, ease: "power3.in" }, COMO - 0.15 + i * 0.16));
      dibujar(q(".${p}-grieta"), COMPRA + 0.2, 0.3);
      tl.to(q(".${p}-bot-w"), { rotation: 6, transformOrigin: "70% 100%", duration: 0.3, ease: "power2.out" }, COMPRA + 0.4);
      etiq(1, 2, COMO);
    `,
  });
  sfx(id, [{ t: 0.15, sfx: "pop", vol: 0.25 }, { t: 0.65, sfx: "chime", vol: 0.3 }, { t: 2.6, sfx: "whoosh-short", vol: 0.22 }, { t: 3.85, sfx: "tic", vol: 0.3 }, { t: 4.01, sfx: "tic", vol: 0.3 }, { t: 4.17, sfx: "tic", vol: 0.3 }, { t: 4.33, sfx: "tic", vol: 0.3 }, { t: 4.65, sfx: "glitch-1", vol: 0.2 }]);
}

// ---------------- s10-razon ----------------
{
  const id = "s10-razon", p = "s10";
  const muros = [["visto", 400, -6], ["privado", 560, 5], ["captura", 720, -4]]
    .map(([t, x, r]) => `<g class="${p}-muro"><g transform="translate(${x} 1060) rotate(${r})"><rect x="-62" y="-120" width="124" height="190" rx="6" fill="${C.bordo}" class="tinta" /><path d="M-62 -60 H62 M-62 0 H62 M0 -120 V-60 M-30 -60 V0 M30 -60 V0 M0 0 V70" stroke="${C.bordoOsc}" stroke-width="5" /><rect x="-58" y="80" width="116" height="40" rx="4" fill="${C.crema}" /><text class="serif" x="0" y="110" font-size="26" fill="${C.tinta}" text-anchor="middle">${t}</text></g></g>`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["Producto: listo", "Falta: que sea fácil"],
    svg: `
          <!-- el cliente (genérico) -->
          <g class="${p}-cliente"><g transform="translate(170 1030)">
            <circle cx="0" cy="-130" r="50" fill="${C.piel}" class="tinta" />
            <path d="M-80 120 Q-76 -40 0 -60 Q76 -40 80 120 Z" fill="${C.crema}" class="tinta" />
            <circle cx="-16" cy="-136" r="6" fill="${C.tinta}" /><circle cx="16" cy="-136" r="6" fill="${C.tinta}" />
            <path class="${p}-cli-boca" d="M-14 -108 Q0 -98 14 -108" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />
          </g></g>
          ${muros}
          <path class="${p}-flecha" d="M270 1010 H760" fill="none" stroke="${C.dorado}" stroke-width="14" stroke-linecap="round" />
          <path class="${p}-punta" d="M730 976 L776 1010 L730 1044" fill="none" stroke="${C.dorado}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <g class="${p}-bot-w">${botella(p, "botella", 890, 1220, 0.95, ["TU", "PRODUCTO"])}</g>
          <g class="${p}-listo"><g transform="translate(960 790)">
            <circle r="52" fill="${C.dorado}" class="tinta" />
            <path d="M-24 2 L-6 20 L26 -16" fill="none" stroke="${C.tinta}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          </g></g>
    `,
    js: `
      const RAZON = 0.35, PRODUCTO = 1.38, ESTA = 1.92, FALTA = 2.7, COMPRARTE = 3.4, FACIL = 4.18;
      tl.fromTo(q(".${p}-bot-w"), { opacity: 0.3, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".${p}-cliente"), { opacity: 0.3, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      // "producto ... está": tilde de listo
      tl.to(q(".${p}-bot-w"), { scale: 1.06, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1 }, PRODUCTO);
      pop(q(".${p}-listo"), ESTA - 0.1);
      etiq(0, 1, PRODUCTO);
      // "falta": entre el cliente y el producto, los muros de siempre
      qa(".${p}-muro").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.25, ease: "bounce.out" }, FALTA - 0.25 + i * 0.12));
      etiq(1, 2, FALTA);
      // "comprarte": se caen
      qa(".${p}-muro").forEach((el, i) => tl.to(el, { y: 420, rotation: i % 2 ? 40 : -40, opacity: 0, transformOrigin: "50% 100%", duration: 0.45, ease: "power2.in" }, COMPRARTE + i * 0.1));
      // "fácil": camino derecho
      dibujar(q(".${p}-flecha"), FACIL - 0.25, 0.4);
      dibujar(q(".${p}-punta"), FACIL + 0.1, 0.2);
      tl.to(q(".${p}-cliente"), { y: -14, duration: 0.15, yoyo: true, repeat: 3 }, FACIL + 0.2);
    `,
  });
  sfx(id, [{ t: 0.1, sfx: "chime", vol: 0.22 }, { t: 1.85, sfx: "ping", vol: 0.3 }, { t: 2.5, sfx: "golpe", vol: 0.3 }, { t: 3.45, sfx: "whoosh", vol: 0.25 }, { t: 4.0, sfx: "sparkle", vol: 0.3 }]);
}
