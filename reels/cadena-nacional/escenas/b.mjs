// Escenas s07 a s11: la vecina de la torta, el cantito, el presidente que se quiebra y el
// nombramiento del ministro.
import { C, escudo, atril, presidente, vecina, gente, cartel, cacerola, celular, globo, cortina, cenefa } from "./lib.mjs";
import { despacho } from "./a.mjs";
const { noche, azul2, azul, oro, blanco, rojo } = C;
const S = (id) => `[data-composition-id="${id}"]`;

export default [
  // ---------------------------------------------------------------- s07
  {
    id: "s07-torta",
    css: `
    ${S("s07-torta")} .s07-sello { top: 1230px; left: 520px; right: auto; width: 520px; }
    ${S("s07-torta")} .s07-sello b { font-size: 60px; transform: rotate(-6deg); }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(270 1010) scale(1.05)"><g class="s07-vec">${vecina("s07v")}</g></g>
          <g transform="translate(150 1270) scale(0.8)"><g class="s07-cac">${cacerola("s07o")}</g></g>
          <g class="s07-cel">
            ${celular(520, 640, 460, 640, "La vecina", rojo)}
            ${globo("s07-g1", 600, 800, 350, "¿Tienen torta|para el domingo?", { mio: true, hora: "Vie 20:14" })}
            <g class="s07-dias">
              <text x="750" y="1010" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${blanco}" opacity="0.8">sáb · dom · lun</text>
              <path d="M600 1022 H900" stroke="${blanco}" stroke-width="3" opacity="0.4" stroke-dasharray="6 10" />
            </g>
            ${globo("s07-g2", 550, 1050, 330, "Hola! Sí,|¿para cuándo?", { hora: "Mar 11:02" })}
          </g>
        </svg>
        <div class="txt sello s07-sello"><b>¡El martes!</b></div>
        <div class="zoc s07-z"><div class="tab">Vecina</div><div class="tit">«¡Me contestó el martes!»</div></div>`,
    js: `
      const TORTA = 1.02, VIERNES = 1.67, CONTESTO = 2.68, MARTES = 3.77;
      tl.fromTo(q(".s07-vec"), { x: -400 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s07-cel"), { x: 600 }, { x: 0, duration: 0.45, ease: "power3.out" }, 0.1);
      hablar(".s07v-boca", 0, 4.1);
      tl.to(q(".s07o-cuch"), { rotation: 24, svgOrigin: "30 -60", duration: 0.1, yoyo: true, repeat: 7, ease: "power1.in" }, 0.2);
      tl.to(q(".s07o-cuch"), { rotation: 24, svgOrigin: "30 -60", duration: 0.1, yoyo: true, repeat: 5, ease: "power1.in" }, MARTES);
      pop(".s07-g1", TORTA - 0.1, 0.35, 0.6);
      tl.to(q(".s07-g1"), { scale: 1.05, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, VIERNES);
      pop(".s07-dias", CONTESTO - 0.5, 0.3);
      zocalos([[".s07-z", CONTESTO - 0.3]]);
      pop(".s07-g2", CONTESTO, 0.35, 0.6);
      golpe(".s07-sello", MARTES, 2);
      sacudon(MARTES + 0.02, 1.2);
      tl.to(q(".s07v-cejas"), { y: 6, duration: 0.15 }, MARTES);`,
    sfx: [
      { t: 1.0, sfx: "notification", vol: 0.28 },
      { t: 2.7, sfx: "notification", vol: 0.28 },
      { t: 3.75, sfx: "impact-bass-1", vol: 0.42, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s08
  {
    id: "s08-cumple",
    css: `
    ${S("s08-cumple")} .s08-fel { top: 610px; font-weight: 900; font-size: 76px; color: ${oro}; text-shadow: 5px 5px 0 ${rojo}; }
    ${S("s08-cumple")} .s08-sello { top: 1220px; }
    ${S("s08-cumple")} .s08-sello b { font-size: 66px; transform: rotate(4deg); }`,
    html: `
        <div class="txt s08-fel">Feliz cumple</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s08-guirn" d="M80 740 Q300 830 540 740 Q780 830 1000 740" stroke="${blanco}" stroke-width="4" fill="none" />
          <g class="s08-band">${[[150, rojo], [250, oro], [350, azul], [450, rojo], [630, oro], [730, azul], [830, rojo], [930, oro]].map(([x, c], i) => `<path d="M${x - 26} ${770 + (i % 4 === 0 || i % 4 === 3 ? 0 : 22)} h52 l-26 50 Z" fill="${c}" stroke="${blanco}" stroke-width="3" />`).join("")}</g>
          <path d="M160 1160 H920" stroke="${blanco}" stroke-width="8" stroke-linecap="round" />
          <ellipse cx="540" cy="1150" rx="230" ry="30" fill="${blanco}" stroke="${noche}" stroke-width="5" />
          <g class="s08-alf">
            <ellipse cx="540" cy="1110" rx="90" ry="26" fill="${noche}" stroke="${blanco}" stroke-width="4" />
            <rect x="450" y="1084" width="180" height="26" fill="${noche}" />
            <ellipse cx="540" cy="1084" rx="90" ry="26" fill="${azul2}" stroke="${blanco}" stroke-width="4" />
            <path d="M450 1098 H630" stroke="${oro}" stroke-width="5" />
          </g>
          <g class="s08-vela">
            <rect x="530" y="1000" width="20" height="80" fill="${rojo}" stroke="${blanco}" stroke-width="3" />
            <path class="s08-llama" d="M540 1000 c-14 -16 -6 -32 0 -42 c6 10 14 26 0 42 Z" fill="${oro}" />
          </g>
          <g transform="translate(300 1060) rotate(-14)"><path d="M-44 0 L0 -110 L44 0 Z" fill="${azul}" stroke="${blanco}" stroke-width="4" stroke-linejoin="round" /><path d="M-30 -36 L30 -36 M-16 -72 L16 -72" stroke="${oro}" stroke-width="5" /><circle cx="0" cy="-118" r="10" fill="${oro}" /></g>
          <text class="s08-nota" x="760" y="1090" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="26" fill="${blanco}" opacity="0.85">(un alfajor)</text>
        </svg>
        <div class="txt sello s08-sello"><b>Era el domingo</b></div>`,
    js: `
      const CUMPLE = 0.13, DOMINGO = 0.78;
      pop(".s08-fel", 0, 0.3, 0.6);
      dibujar(".s08-guirn", 0, 0.4);
      pop(".s08-band path", 0.15, 0.3, 0.3);
      tl.fromTo(q(".s08-alf"), { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "bounce.out" }, CUMPLE);
      tl.fromTo(q(".s08-vela"), { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.in" }, CUMPLE + 0.25);
      tl.to(q(".s08-llama"), { scaleY: 0.6, scaleX: 1.2, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.5);
      pop(".s08-nota", DOMINGO + 0.3, 0.3);
      golpe(".s08-sello", DOMINGO, 2);
      sacudon(DOMINGO + 0.02, 1.1);
      tl.to(q(".s08-fel"), { rotation: -3, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);`,
    sfx: [
      { t: 0.15, sfx: "pop", vol: 0.3 },
      { t: 0.8, sfx: "impact-bass-2", vol: 0.42, max: 0.6 },
    ],
  },
  // ---------------------------------------------------------------- s09
  {
    id: "s09-queremos",
    css: `
    ${S("s09-queremos")} .s09-a { top: 590px; font-weight: 900; font-size: 104px; color: ${blanco}; }
    ${S("s09-queremos")} .s09-b { top: 696px; font-weight: 900; font-size: 116px; color: ${oro}; text-shadow: 7px 7px 0 ${rojo}; }`,
    html: `
        <div class="txt s09-a">¡Queremos</div>
        <div class="txt s09-b">respuesta!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-multitud">
            <g transform="translate(200 930) scale(0.8)"><g class="s09-k s09-k1">${cartel("s09-c1", "¡CONTESTÁ!", 300)}</g></g>
            <g transform="translate(540 900) scale(0.8)"><g class="s09-k s09-k2">${cartel("s09-c2", "NO AL|«VISTO»", 280, noche, oro)}</g></g>
            <g transform="translate(880 930) scale(0.8)"><g class="s09-k s09-k3">${cartel("s09-c3", "¿PRECIO?", 270)}</g></g>
            ${[[110, 1130, rojo], [300, 1150, azul], [480, 1130, oro], [660, 1150, rojo], [850, 1130, azul], [1010, 1150, oro], [200, 1250, azul2], [400, 1260, rojo], [600, 1250, azul], [800, 1260, oro], [980, 1260, rojo]]
              .map(([x, y, c], i) => `<g transform="translate(${x} ${y}) scale(0.75)"><g class="s09-p">${gente("s09g" + i, c)}</g></g>`).join("")}
            <g transform="translate(140 1200) scale(0.6) rotate(-10)"><g class="s09-o">${cacerola("s09o1")}</g></g>
            <g transform="translate(940 1190) scale(0.6) rotate(10)"><g class="s09-o">${cacerola("s09o2")}</g></g>
          </g>
        </svg>
        <div class="zoc s09-z"><div class="tab">En vivo</div><div class="tit azul">El pueblo cliente, en la calle</div></div>`,
    js: `
      const Q1 = 0, Q2 = 1.54;
      [Q1, Q2].forEach((t) => {
        tl.fromTo(q(".s09-a"), { scale: 1.4, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, t);
        tl.fromTo(q(".s09-b"), { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, t + 0.5);
        sacudon(t + 0.55, 1.2);
        qa(".s09-p").forEach((p, i) => tl.to(p, { y: -30, duration: 0.14, yoyo: true, repeat: 3, ease: "power1.out" }, t + 0.1 + (i % 4) * 0.04));
      });
      tl.fromTo(q(".s09-multitud"), { y: 300 }, { y: 0, duration: 0.35, ease: "power3.out" }, 0);
      qa(".s09-k").forEach((k, i) => tl.to(k, { y: -26, rotation: i % 2 ? 5 : -5, transformOrigin: "50% 100%", duration: 0.19, yoyo: true, repeat: 17, ease: "sine.inOut" }, 0.1 + i * 0.07));
      tl.to(q(".s09o1-cuch"), { rotation: 24, svgOrigin: "30 -60", duration: 0.09, yoyo: true, repeat: 35, ease: "power1.in" }, 0);
      tl.to(q(".s09o2-cuch"), { rotation: 24, svgOrigin: "30 -60", duration: 0.1, yoyo: true, repeat: 31, ease: "power1.in" }, 0.05);
      zocalos([[".s09-z", 0.6]]);`,
    sfx: [
      { t: 0.0, sfx: "cacerolas", vol: 0.3 },
      { t: 0.55, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
      { t: 2.1, sfx: "impact-bass-1", vol: 0.32, max: 0.5 },
    ],
  },
  // ---------------------------------------------------------------- s10
  {
    id: "s10-gobierno-solo",
    css: `
    ${S("s10-gobierno-solo")} .s10-solo { top: 1292px; font-size: 34px; color: ${oro}; letter-spacing: 0.3em; }
    ${S("s10-gobierno-solo")} .s10-sello { top: 900px; }
    ${S("s10-gobierno-solo")} .s10-sello b { font-size: 70px; transform: rotate(-5deg); }
    ${S("s10-gobierno-solo")} .s10-lab { position: absolute; width: 420px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.2em; color: ${oro}; text-transform: uppercase; }`,
    html: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-sala">
            <path d="M80 1240 H1000" stroke="${blanco}" stroke-width="4" opacity="0.4" />
            <g transform="translate(540 940) scale(0.95)"><g class="s10-pre">${presidente("s10p")}</g></g>
            <g class="s10-luz"><path d="M540 560 L330 1250 H750 Z" fill="${oro}" opacity="0.1" /></g>
          </g>
          <g class="s10-paneles">
            ${[[90, 600, "atiende"], [570, 600, "cobra"], [90, 960, "repone"], [570, 960, "contesta"]].map(([x, y, n]) => `<g class="s10-pan s10-${n}"><rect x="${x}" y="${y}" width="420" height="330" rx="16" fill="${azul2}" stroke="${oro}" stroke-width="5" /></g>`).join("")}
          </g>
          <g class="s10-ic">
            <!-- atiende: mostrador con cliente -->
            <g class="s10-i1"><rect x="150" y="850" width="300" height="60" fill="${azul}" stroke="${blanco}" stroke-width="4" /><g transform="translate(240 740) scale(0.5)">${presidente("s10a")}</g><g transform="translate(390 760) scale(0.5)">${gente("s10ga", rojo)}</g></g>
            <!-- cobra: caja registradora -->
            <g class="s10-i2"><rect x="660" y="760" width="240" height="110" rx="10" fill="${azul}" stroke="${blanco}" stroke-width="4" /><rect x="700" y="690" width="160" height="60" rx="6" fill="${noche}" stroke="${blanco}" stroke-width="4" /><text x="780" y="732" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${oro}">$ 890</text>
              ${[0, 1, 2, 3].map((i) => `<rect x="${690 + i * 50}" y="780" width="36" height="24" rx="4" fill="${blanco}" />`).join("")}<rect class="s10-cajon" x="680" y="870" width="200" height="30" fill="${oro}" stroke="${blanco}" stroke-width="3" /></g>
            <!-- repone: estante con cajas -->
            <g class="s10-i3"><path d="M140 1180 H460 M140 1090 H460" stroke="${blanco}" stroke-width="5" />${[160, 240, 320].map((x) => `<rect x="${x}" y="1030" width="66" height="58" fill="${oro}" stroke="${noche}" stroke-width="3" />`).join("")}<rect class="s10-caja" x="380" y="1110" width="66" height="68" fill="${rojo}" stroke="${noche}" stroke-width="3" /></g>
            <!-- contesta: celular que no para -->
            <g class="s10-i4" transform="translate(0 40)"><rect x="720" y="1000" width="120" height="210" rx="20" fill="${noche}" stroke="${blanco}" stroke-width="5" /><circle cx="840" cy="1006" r="26" fill="${rojo}" /><text x="840" y="1015" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="24" fill="${blanco}">99</text>
              ${[1040, 1080, 1120, 1160].map((y, i) => `<rect x="${i % 2 ? 760 : 740}" y="${y}" width="${i % 2 ? 64 : 80}" height="26" rx="10" fill="${blanco}" opacity="0.8" />`).join("")}</g>
          </g>
        </svg>
        <div class="s10-lab s10-l1" style="left:90px;top:620px">Atiende</div>
        <div class="s10-lab s10-l2" style="left:570px;top:620px">Cobra</div>
        <div class="s10-lab s10-l3" style="left:90px;top:980px">Repone</div>
        <div class="s10-lab s10-l4" style="left:570px;top:980px">Contesta</div>
        <div class="txt mono s10-solo">Gobierna solo</div>
        <div class="txt sello s10-sello"><b>No doy abasto</b></div>
        <div class="zoc s10-z"><div class="tab">Presidente</div><div class="tit">«La verdad... gobierno solo»</div></div>`,
    js: `
      const VERDAD = 0.08, GOBIERNO = 1.02, SOLO = 1.53, ATIENDO = 2.26, COBRO = 3.19, REPONGO = 3.98, CONTESTO = 5.0, ABASTO = 6.21;
      tl.fromTo(q(".s10-pre"), { y: 30, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.4 }, 0);
      hablar(".s10p-boca", 0, 1.9);
      // se le cae la solemnidad: cejas tristes, gotas, se achica
      tl.to(q(".s10p-ci"), { rotation: -14, svgOrigin: "-30 -32", duration: 0.25 }, VERDAD + 0.3);
      tl.to(q(".s10p-cd"), { rotation: 14, svgOrigin: "30 -32", duration: 0.25 }, VERDAD + 0.3);
      tl.to(q(".s10p-gotas"), { opacity: 1, duration: 0.2 }, GOBIERNO);
      tl.fromTo(q(".s10p-gotas"), { y: 0 }, { y: 24, duration: 0.5, repeat: 1, ease: "power1.in", immediateRender: false }, GOBIERNO);
      tl.to(q(".s10-pre"), { scale: 0.8, svgOrigin: "0 330", duration: 0.6, ease: "power2.out" }, SOLO);
      zocalos([[".s10-z", GOBIERNO - 0.2]]);
      pop(".s10-solo", SOLO, 0.3);
      // cuatro trabajos a la vez
      tl.to([q(".s10-sala"), q(".s10-solo")], { opacity: 0, duration: 0.2 }, ATIENDO - 0.2);
      [[".s10-atiende", ".s10-i1", ".s10-l1", ATIENDO], [".s10-cobra", ".s10-i2", ".s10-l2", COBRO], [".s10-repone", ".s10-i3", ".s10-l3", REPONGO], [".s10-contesta", ".s10-i4", ".s10-l4", CONTESTO]]
        .forEach(([p, i, l, t]) => { pop(p, t - 0.05, 0.3, 0.6); pop(i, t, 0.3, 0.6); pop(l, t + 0.05, 0.25); sacudon(t + 0.05, 0.5); });
      tl.to(q(".s10a-boca"), { scaleY: 1.4, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 9 }, ATIENDO + 0.2);
      tl.to(q(".s10-cajon"), { y: 26, duration: 0.15, yoyo: true, repeat: 3 }, COBRO + 0.2);
      tl.fromTo(q(".s10-caja"), { y: 0 }, { y: -80, x: -20, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, REPONGO + 0.2);
      tl.to(q(".s10-i4"), { rotation: 6, svgOrigin: "780 1100", duration: 0.05, yoyo: true, repeat: 15 }, CONTESTO + 0.1);
      // todo a la vez: no doy abasto
      qa(".s10-pan, .s10-ic > g").forEach((g, i) => tl.to(g, { y: i % 2 ? -10 : 10, duration: 0.08, yoyo: true, repeat: 7 }, ABASTO - 0.3));
      golpe(".s10-sello", ABASTO, 2.2);
      sacudon(ABASTO + 0.03, 1.4);`,
    sfx: [
      { t: 1.0, sfx: "click-soft", vol: 0.25 },
      { t: 2.25, sfx: "pop", vol: 0.3 },
      { t: 3.18, sfx: "ping", vol: 0.25 },
      { t: 3.97, sfx: "pop", vol: 0.3 },
      { t: 5.0, sfx: "notification", vol: 0.28 },
      { t: 6.2, sfx: "impact-bass-2", vol: 0.45, max: 0.7 },
    ],
  },
  // ---------------------------------------------------------------- s11
  {
    id: "s11-ministro",
    css: `
    ${S("s11-ministro")} .s11-preg { top: 860px; font-weight: 900; font-size: 220px; color: ${oro}; text-shadow: 8px 8px 0 ${rojo}; }`,
    html: `
        <div class="txt art s11-art"><small>Artículo</small>4</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-foco"><path d="M540 700 L300 1330 H780 Z" fill="${oro}" opacity="0.16" /></g>
          <g class="s11-telon">
            <path d="M200 720 H540 V1330 H200 Z" fill="${rojo}" stroke="${oro}" stroke-width="5" />
            <path d="M540 720 H880 V1330 H540 Z" fill="${rojo}" stroke="${oro}" stroke-width="5" />
            <path d="M260 720 V1330 M330 720 V1330 M400 720 V1330 M470 720 V1330 M610 720 V1330 M680 720 V1330 M750 720 V1330 M820 720 V1330" stroke="${noche}" stroke-width="5" opacity="0.3" />
            <path d="M180 720 H900" stroke="${oro}" stroke-width="16" stroke-linecap="round" />
          </g>
          <g transform="translate(930 1200) scale(0.55)"><g class="s11-pre">${presidente("s11p")}</g></g>
          <g transform="translate(930 1300) scale(0.5)">${atril("s11a")}</g>
        </svg>
        <div class="txt s11-preg">?</div>
        <div class="zoc s11-z"><div class="tab">Decreto 4</div><div class="tit">Nuevo ministro de atención</div></div>`,
    js: `
      const ESO = 0.17, CUATRO = 1.36, NOMBRO = 2.16, MINISTRO = 3.14, ATENCION = 3.73;
      tl.fromTo(q(".s11-telon"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35 }, 0);
      tl.fromTo(q(".s11-pre"), { x: 300 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0.1);
      hablar(".s11p-boca", 0, 4.4);
      golpe(".s11-art", CUATRO, 1.8);
      sacudon(CUATRO + 0.02, 0.9);
      tl.fromTo(q(".s11-foco"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, NOMBRO);
      tl.to(q(".s11-foco"), { scaleX: 1.15, transformOrigin: "50% 0%", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, NOMBRO + 0.3);
      pop(".s11-preg", MINISTRO - 0.1, 0.35, 0.3);
      tl.to(q(".s11-preg"), { rotation: 8, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, MINISTRO + 0.3);
      tl.to(q(".s11-telon"), { x: 6, duration: 0.05, yoyo: true, repeat: 11 }, MINISTRO);
      zocalos([[".s11-z", MINISTRO - 0.3]]);`,
    sfx: [
      { t: 1.35, sfx: "impact-bass-1", vol: 0.4, max: 0.6 },
      { t: 1.78, sfx: "redoble", vol: 0.4 },
    ],
  },
];
