import sys; sys.path.insert(0, 'escenas')
from mk import mk
TAB = "const TB = { cx: 540, yN: 1330, yF: 900, W: 1000, k: 0.75 };\n      const C = (c, r) => AJ.casilla(TB, c, r);"
# inserto redondo con un comentarista (cx, cy, r, svg del personaje, id)
INSERTO = r"""
      const inserto = (cx, cy, r, pj, id) => `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r - 4}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="${AJ.EBA}"/><g clip-path="url(#${id})">${pj}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${AJ.LAT}" stroke-width="8"/>`;"""
MOSTRADOR = """`<path d="M20 1250 L1060 1250 L1060 1370 L20 1370 Z" fill="${AJ.MAD2}" stroke="${AJ.INK}" stroke-width="8" stroke-linejoin="round"/><path d="M20 1250 L1060 1250 L1060 1274 L20 1274 Z" fill="${AJ.MAD3}" stroke="${AJ.INK}" stroke-width="6"/>`"""

# ---------- s06 mañana: "Mañana le escribo." "Eso dijo hace tres días."
mk("s06-manana", 3.57, """
.s06-sello { left: 90px; top: 640px; font-size: 64px; }
""", """
        <div class="aj-sello s06-sello">HACE 3 DÍAS</div>
""", r"""
      const dias = ["LUN", "MAR", "MIÉ", "JUE"];
      let hojas = "";
      dias.slice().reverse().forEach((d, i) => {
        const k = dias.length - 1 - i;
        hojas += `<g class="s06-h s06-h${k}"><rect x="780" y="640" width="230" height="230" rx="10" fill="${AJ.MAR}" stroke="${AJ.INK}" stroke-width="6"/><rect x="780" y="640" width="230" height="60" rx="10" fill="${AJ.ROJO}" stroke="${AJ.INK}" stroke-width="6"/>
          <text data-layout-ignore x="895" y="684" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="${AJ.MAR}">${d}</text>
          <text data-layout-ignore x="895" y="830" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="110" fill="${AJ.INK}">${12 + k}</text></g>`;
      });
      svg.innerHTML =
        `<g class="s06-cal">${hojas}<circle cx="840" cy="640" r="12" fill="${AJ.LAT}" stroke="${AJ.INK}" stroke-width="5"/><circle cx="950" cy="640" r="12" fill="${AJ.LAT}" stroke="${AJ.INK}" stroke-width="5"/></g>` +
        `<g class="s06-d">${AJ.dueno(470, 1350, 0.95, { cara: "desganado", brazo: "celular" })}</g>` +
        `<g class="s06-tela" fill="none" stroke="${AJ.MAR}" stroke-width="5" stroke-linecap="round">
          <path class="s06-t" d="M500 1150 L620 1180"/><path class="s06-t" d="M500 1150 L590 1250"/><path class="s06-t" d="M500 1150 L520 1270"/>
          <path class="s06-t" d="M545 1161 Q540 1185 530 1196 Q520 1210 510 1214"/><path class="s06-t" d="M580 1170 Q568 1210 560 1232 Q540 1250 515 1250"/></g>`;
      const ESO = 1.23, DIJO = 1.48, HACE = 1.89, TRES = 2.30, DIAS = 2.63;
      K.popSvg(q(".s06-d"), 0, "470 1350", 0.35, 0.85);
      K.hablar(".s06-d .aj-d-boca", 0.05, 3, 0.12);
      K.respirar(q(".s06-d"), 0.4, DUR - 0.4, 0.015, "470 1350");
      K.popSvg(q(".s06-cal"), ESO - 0.2, "895 640", 0.35, 0.3);
      // las hojas se arrancan: LUN, MAR, MIÉ... queda JUE
      [DIJO, HACE, TRES].forEach((t, k) => {
        tl.to(q(".s06-h" + k), { y: -120, rotation: -25, opacity: 0, svgOrigin: "895 640", duration: 0.3, ease: "power2.in" }, t);
      });
      K.sello(q(".s06-sello"), DIAS, -5);
      qa(".s06-t").forEach((el, i) => K.dibujar(el, DIAS + 0.1 + i * 0.08, 0.4));
""", [{"t": 0.0, "sfx": "suspiro", "vol": 0.3}, {"t": 1.48, "sfx": "whoosh-short", "vol": 0.3}, {"t": 1.89, "sfx": "whoosh-short", "vol": 0.3}, {"t": 2.30, "sfx": "whoosh-short", "vol": 0.3}, {"t": 2.63, "sfx": "golpe", "vol": 0.4}])

# ---------- s07 enfrente: el caballo negro salta en L y le escribe a tu clienta
mk("s07-enfrente", 3.21, """
.s07-tag { left: 250px; top: 630px; font-size: 44px; }
""", """
        <div class="aj-tag rojo s07-tag">¿ESO SE PUEDE?</div>
""", TAB + INSERTO + r"""
      const k = C(6, 0), p = C(3, 3), n0 = C(5, 6), n1 = C(4, 4), t = C(0, 7), np = C(2, 6);
      svg.innerHTML = AJ.tablero(TB) +
        AJ.pieza("torre", t.x, t.y, 1.0 * t.p, "n") + AJ.pieza("peon", np.x, np.y, 1.1 * np.p, "n") +
        `<g class="s07-n">${AJ.pieza("caballo", n0.x, n0.y, 1.35 * n0.p, "n", { cara: "canchero" })}</g>` +
        `<g class="s07-cli">${AJ.pieza("peon", p.x, p.y, 1.4 * p.p, "b", { cara: "feliz", extra: "colita" })}</g>` +
        AJ.pieza("rey", k.x, k.y, 1.3 * k.p, "b", { cara: "seria", extra: "delantal" }) +
        `<g class="s07-glo"><path d="M${n1.x - 330} ${n1.y - 420} h320 a26 26 0 0 1 26 26 v70 a26 26 0 0 1 -26 26 h-60 l30 50 l-80 -50 h-210 a26 26 0 0 1 -26 -26 v-70 a26 26 0 0 1 26 -26 Z" fill="${AJ.EBA}" stroke="${AJ.LAT}" stroke-width="6" stroke-linejoin="round"/>
          <text data-layout-ignore x="${n1.x - 170}" y="${n1.y - 348}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="42" fill="${AJ.MAR}">¿Te las guardo?</text></g>` +
        `<g class="s07-a">${inserto(880, 1250, 150, AJ.ayudante(880, 1430, 0.55, { cara: "grito" }), "s07-clip")}</g>`;
      const MOVIO = 0.0, ESCRIBIO = 1.07, CLIENTA = 1.48, ESO = 2.16;
      K.saltar(q(".s07-n"), MOVIO + 0.1, n1.x - n0.x, n1.y - n0.y, 0.35, 70);
      tl.to(q(".s07-n"), { scale: n1.p / n0.p, svgOrigin: `${n0.x} ${n0.y}`, duration: 0.35, ease: "power1.inOut" }, MOVIO + 0.1);
      K.sacudon(q(".s07-escenario"), MOVIO + 0.47, 0.6);
      K.popSvg(q(".s07-glo"), ESCRIBIO, `${n1.x - 120} ${n1.y - 300}`, 0.35, 0.3);
      // la clienta mira al caballo
      K.origen(q(".s07-cli"), `${p.x} ${p.y}`);
      tl.to(q(".s07-cli"), { rotation: 8, svgOrigin: `${p.x} ${p.y}`, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, CLIENTA);
      tl.to(q(".s07-glo"), { opacity: 0, duration: 0.15 }, ESO - 0.2);
      K.popSvg(q(".s07-a"), ESO - 0.15, "880 1250", 0.3, 0.3);
      K.sello(q(".s07-tag"), ESO, -3);
""", [{"t": 0.1, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 0.45, "sfx": "ficha", "vol": 0.5}, {"t": 1.07, "sfx": "notification", "vol": 0.35}, {"t": 2.16, "sfx": "buzzer", "vol": 0.2, "max": 0.6}])

# ---------- s08 seguimiento: "Se puede. Se llama seguimiento."
mk("s08-seguimiento", 2.75, """
.s08-placa { position: absolute; left: 140px; top: 620px; width: 800px; box-sizing: border-box; padding: 16px 0 18px; background: #2a211b; border: 6px solid #d4a73a; border-radius: 14px; box-shadow: 8px 10px 0 rgba(0,0,0,0.4); text-align: center; }
.s08-placa small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.3em; color: #d4a73a; white-space: nowrap; }
.s08-placa b { display: block; margin-top: 6px; font-family: "Cinzel", serif; font-weight: 900; font-size: 74px; line-height: 1; color: #f3e6c8; white-space: nowrap; }
.s08-nota { left: 640px; top: 1400px; }
""", """
        <div class="s08-placa"><small>APERTURA</small><b>EL SEGUIMIENTO</b></div>
        <div class="aj-nota s08-nota"><b>!!</b>jugada brillante</div>
""", r"""
      svg.innerHTML = `<g class="s08-m">${AJ.maestro(540, 1340, 1.0, { cara: "sorna", brazo: "pieza" })}</g>`;
      const PUEDE = 0.17, SEG = 1.41;
      K.popSvg(q(".s08-m"), 0, "540 1340", 0.35, 0.85);
      K.hablar(".s08-m .aj-m-boca", 0.05, 6, 0.1);
      K.origen(q(".s08-m .aj-m-brazo"), "170 -120");
      tl.fromTo(q(".s08-m .aj-m-brazo"), { rotation: 6 }, { rotation: -4, svgOrigin: "170 -120", duration: 0.5, ease: "back.out(2)", immediateRender: false }, PUEDE);
      K.sello(q(".s08-placa"), SEG, 0);
      K.pop(q(".s08-nota"), SEG + 0.5);
      tl.fromTo(q(".s08-escenario"), { scale: 1 }, { scale: 1.05, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
""", [{"t": 0.17, "sfx": "tic", "vol": 0.3}, {"t": 1.41, "sfx": "impact-bass-1", "vol": 0.35}, {"t": 1.91, "sfx": "sparkle", "vol": 0.25}])

# ---------- s09 walter: el que dejó de venir vuelve... a la de enfrente. Jaque.
mk("s09-walter", 6.06, """
.s09-aus { left: 70px; top: 640px; }
.s09-jaque { left: 330px; top: 640px; font-size: 110px; }
""", """
        <div class="aj-tag mar s09-aus">WALTER · DEJÓ DE VENIR</div>
        <div class="aj-sello s09-jaque">JAQUE</div>
""", TAB + r"""
      const k = C(6, 0), cl = C(3, 5), n = C(4, 4), w0 = C(0, 3), w1 = C(4, 6), d = C(6, 6), t = C(0, 7);
      svg.innerHTML = AJ.tablero(TB) +
        AJ.pieza("torre", t.x, t.y, 1.0 * t.p, "n") +
        `<g class="s09-d">${AJ.pieza("dama", d.x, d.y, 1.25 * d.p, "n", { cara: "canchero" })}</g>` +
        AJ.pieza("peon", cl.x, cl.y, 1.2 * cl.p, "b", { cara: "feliz", extra: "colita" }) +
        AJ.pieza("caballo", n.x, n.y, 1.3 * n.p, "n", { cara: "canchero" }) +
        `<g class="s09-w"><g class="s09-w1" opacity="0.5">${AJ.pieza("peon", w0.x, w0.y, 1.4 * w0.p, "b", { cara: "triste", extra: "gorra" })}</g><g class="s09-w2" opacity="0">${AJ.pieza("peon", w0.x, w0.y, 1.4 * w0.p, "b", { cara: "feliz", extra: "gorra" })}</g></g>` +
        `<g class="s09-k1">${AJ.pieza("rey", k.x, k.y, 1.3 * k.p, "b", { cara: "seria", extra: "delantal" })}</g>` +
        `<g class="s09-k2" opacity="0">${AJ.pieza("rey", k.x, k.y, 1.3 * k.p, "b", { cara: "susto", extra: "delantal" })}</g>` +
        `<g class="s09-glo"><path d="M${n.x - 20} ${n.y - 250} L${w0.x + 60} ${w0.y - 190}" stroke="${AJ.LAT}" stroke-width="6" stroke-dasharray="14 12" fill="none"/>
          <rect x="${w0.x - 30}" y="${w0.y - 330}" width="330" height="96" rx="24" fill="${AJ.EBA}" stroke="${AJ.LAT}" stroke-width="6"/>
          <text data-layout-ignore x="${w0.x + 135}" y="${w0.y - 268}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="38" fill="${AJ.MAR}">¡Te extrañamos!</text></g>` +
        `<path class="s09-linea" d="M${d.x} ${d.y - 120} L${k.x} ${k.y - 200}" stroke="${AJ.ROJO}" stroke-width="16" stroke-linecap="round" fill="none"/>`;
      const ESCRIBE = 0.41, WALTER = 0.82, DEJO = 1.64, VUELVE = 3.06, PERO = 3.72, ENFRENTE = 4.55, JAQUE = 5.19;
      K.popSvg(q(".s09-glo"), ESCRIBE, `${w0.x + 135} ${w0.y - 280}`, 0.35, 0.3);
      tl.to(q(".s09-w"), { x: -6, duration: 0.08, yoyo: true, repeat: 5, ease: "none" }, WALTER);
      K.pop(q(".s09-aus"), DEJO);
      // vuelve: recupera el color, sonríe y salta hacia el caballo
      tl.set(q(".s09-w1"), { opacity: 0 }, VUELVE);
      tl.set(q(".s09-w2"), { opacity: 1 }, VUELVE);
      tl.to(q(".s09-glo"), { opacity: 0, duration: 0.2 }, VUELVE);
      tl.to(q(".s09-aus"), { opacity: 0, duration: 0.2 }, VUELVE);
      K.saltar(q(".s09-w"), VUELVE + 0.1, w1.x - w0.x, w1.y - w0.y, 0.6, 110);
      tl.to(q(".s09-w"), { scale: w1.p / w0.p, svgOrigin: `${w0.x} ${w0.y}`, duration: 0.6, ease: "power1.inOut" }, VUELVE + 0.1);
      // jaque: la dama negra apunta al rey
      K.dibujar(q(".s09-linea"), JAQUE - 0.15, 0.25, "power3.out");
      tl.set(q(".s09-k1"), { opacity: 0 }, JAQUE);
      tl.set(q(".s09-k2"), { opacity: 1 }, JAQUE);
      K.sello(q(".s09-jaque"), JAQUE, -4);
      K.sacudon(q(".s09-escenario"), JAQUE + 0.02, 1);
      tl.fromTo(q(".s09-escenario"), { scale: 1 }, { scale: 1.06, duration: DUR, ease: "none", transformOrigin: "55% 60%" }, 0);
""", [{"t": 0.41, "sfx": "notification", "vol": 0.35}, {"t": 1.64, "sfx": "suspiro", "vol": 0.2}, {"t": 3.06, "sfx": "correcta", "vol": 0.25}, {"t": 3.6, "sfx": "ficha", "vol": 0.5}, {"t": 5.19, "sfx": "impact-bass-2", "vol": 0.45}, {"t": 5.2, "sfx": "golpe", "vol": 0.3}])

# ---------- s10 pará: el dueño a los gritos; jaque mate; "¿Pero juega mal?"
mk("s10-para", 5.19, """
.s10-mate { left: 120px; top: 620px; font-size: 104px; }
.s10-nota { left: 90px; top: 1400px; }
""", """
        <div class="aj-sello s10-mate">JAQUE MATE</div>
        <div class="aj-nota s10-nota"><b>0-1</b>abandono por mostrador</div>
""", TAB + INSERTO + r"""
      const k = C(5, 1), n = C(4, 3), d = C(6, 4), cl = C(3, 5), w = C(4, 6);
      svg.innerHTML =
        `<g class="s10-tienda"><g class="s10-du">${AJ.dueno(540, 1290, 1.0, { cara: "grito", brazo: "caja" })}</g>` + """ + MOSTRADOR + r""" +
          `<g class="s10-bang"><text data-layout-ignore x="150" y="900" font-family="Cinzel" font-weight="900" font-size="150" fill="${AJ.ROJO}" stroke="${AJ.INK}" stroke-width="6" paint-order="stroke">!</text><text data-layout-ignore x="870" y="880" font-family="Cinzel" font-weight="900" font-size="150" fill="${AJ.ROJO}" stroke="${AJ.INK}" stroke-width="6" paint-order="stroke">!</text></g></g>` +
        `<g class="s10-tab">${AJ.tablero(TB)}` +
          AJ.pieza("peon", w.x, w.y, 1.1 * w.p, "b", { extra: "gorra" }) + AJ.pieza("peon", cl.x, cl.y, 1.15 * cl.p, "b", { extra: "colita" }) +
          AJ.pieza("dama", d.x, d.y, 1.25 * d.p, "n", { cara: "canchero" }) + AJ.pieza("caballo", n.x, n.y, 1.4 * n.p, "n", { cara: "canchero" }) +
          `<g class="s10-k">${AJ.pieza("rey", k.x, k.y, 1.55 * k.p, "b", { cara: "susto", extra: "delantal" })}</g></g>` +
        `<g class="s10-a">${inserto(880, 1250, 150, AJ.ayudante(880, 1430, 0.55, { cara: "triste" }), "s10-clip")}</g>`;
      const PARA2 = 0.17, MOSTRADOR = 1.53, MATE = 2.53, JUEGA = 4.17;
      const kb = `${k.x} ${k.y}`;
      K.popSvg(q(".s10-du"), 0, "540 1290", 0.25, 0.9);
      K.sacudon(q(".s10-du"), 0.05, 1);
      K.sacudon(q(".s10-du"), PARA2 + 0.05, 1);
      K.hablar(".s10-du .aj-d-boca", 0.3, 6, 0.1);
      K.popSvg(q(".s10-bang"), PARA2, "540 850", 0.3, 0.4);
      tl.to(q(".s10-bang"), { opacity: 0.3, duration: 0.15, yoyo: true, repeat: 5, ease: "steps(1)" }, PARA2 + 0.4);
      // corte al tablero en "Jaque mate"
      gsap.set(q(".s10-tab"), { opacity: 0 });
      tl.to(q(".s10-tienda"), { opacity: 0, duration: 0.12 }, MATE - 0.12);
      tl.to(q(".s10-tab"), { opacity: 1, duration: 0.12 }, MATE - 0.1);
      K.sello(q(".s10-mate"), MATE + 0.05, -4);
      K.tumbar(q(".s10-k"), MATE + 0.3, kb, -84);
      K.sacudon(q(".s10-escenario"), MATE + 0.85, 1.2);
      K.pop(q(".s10-nota"), MATE + 0.9);
      K.popSvg(q(".s10-a"), JUEGA - 0.2, "880 1250", 0.3, 0.3);
""", [{"t": 0.0, "sfx": "uuh", "vol": 0.2, "max": 0.8}, {"t": 0.17, "sfx": "golpe", "vol": 0.3}, {"t": 2.53, "sfx": "gong", "vol": 0.3, "max": 2.0}, {"t": 2.85, "sfx": "ficha", "vol": 0.5}, {"t": 3.43, "sfx": "tic", "vol": 0.3}, {"t": 4.0, "sfx": "suspiro", "vol": 0.25}])
