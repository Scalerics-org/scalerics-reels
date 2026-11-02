import sys; sys.path.insert(0, 'escenas')
from mk import mk
TAB = "const TB = { cx: 540, yN: 1330, yF: 900, W: 1000, k: 0.75 };\n      const C = (c, r) => AJ.casilla(TB, c, r);"
MESA = """`<path d="M30 1196 L1050 1196 L1050 1360 L30 1360 Z" fill="${AJ.MAD2}" stroke="${AJ.INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M30 1196 L1050 1196 L1050 1222 L30 1222 Z" fill="${AJ.MAD3}" stroke="${AJ.INK}" stroke-width="6"/>
        <path d="M60 1270 Q540 1262 1020 1272 M60 1320 Q540 1312 1020 1322" stroke="${AJ.MAD}" stroke-width="5" fill="none" opacity="0.7"/>`"""

# ---------- s02 torneo: la mesa de la transmisión
mk("s02-torneo", 6.07, """
.s02-placa { position: absolute; left: 250px; top: 1240px; width: 580px; padding: 14px 0 10px; background: #2a211b; border: 5px solid #d4a73a; border-radius: 10px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 46px; color: #f3e6c8; white-space: nowrap; letter-spacing: 0.04em; }
.s02-vs { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
.s02-cartel { position: absolute; top: 640px; width: 380px; height: 120px; box-sizing: border-box; border: 6px solid #1c1612; border-radius: 12px; box-shadow: 7px 8px 0 rgba(0,0,0,0.4); text-align: center; padding-top: 22px; font-family: "Cinzel", serif; font-weight: 900; font-size: 46px; white-space: nowrap; }
.s02-b { left: 60px; background: #f3e6c8; color: #1c1612; }
.s02-n { left: 640px; background: #2a211b; color: #f3e6c8; border-color: #d4a73a; font-size: 38px; padding-top: 30px; }
.s02-x { position: absolute; left: 470px; top: 650px; width: 140px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 80px; color: #d7263d; text-shadow: 4px 4px 0 #1c1612; }
.s02-gambito { left: 190px; top: 640px; font-size: 40px; }
.s02-glam { left: 330px; top: 760px; font-size: 64px; }
""", """
        <div class="s02-vs"><div class="s02-cartel s02-b">TU LOCAL</div><div class="s02-x">VS</div><div class="s02-cartel s02-n">EL DE ENFRENTE</div></div>
        <div class="aj-tag s02-gambito">COMO GAMBITO DE DAMA</div>
        <div class="aj-sello s02-glam">SIN GLAMOUR</div>
        <div class="s02-placa">TORNEO DEL BARRIO</div>
""", r"""
      svg.innerHTML =
        `<g class="s02-m1">${AJ.maestro(300, 1330, 0.92, { cara: "seria" })}</g>` +
        `<g class="s02-m2" opacity="0">${AJ.maestro(300, 1330, 0.92, { cara: "sorna" })}</g>` +
        `<g class="s02-a">${AJ.ayudante(790, 1330, 0.9, { cara: "grito", brazo: "arriba" })}</g>` +
        `<g class="s02-mic"><path d="M520 1200 L500 1090" stroke="${AJ.INK}" stroke-width="12" stroke-linecap="round"/><rect x="474" y="1040" width="48" height="70" rx="22" fill="${AJ.EBA2}" stroke="${AJ.INK}" stroke-width="6" transform="rotate(-12 498 1075)"/></g>` +
        """ + MESA + r""";
      const TORNEO = 0.0, LOCAL = 1.38, ENFRENTE = 2.54, GAMBITO = 3.45, GLAM = 5.08;
      tl.fromTo(q(".s02-escenario"), { scale: 1.06 }, { scale: 1, duration: DUR, ease: "power1.out", transformOrigin: "50% 70%" }, 0);
      K.popSvg(q(".s02-a"), 0, "790 1330", 0.35, 0.8);
      K.hablar(".s02-a .aj-a-boca", 0.05, 12, 0.1);
      K.sello(q(".s02-placa"), TORNEO + 0.15, 0);
      K.sacudon(q(".s02-escenario"), TORNEO + 0.17, 0.7);
      // tu local contra el de enfrente
      K.pop(q(".s02-b"), LOCAL);
      K.pop(q(".s02-x"), LOCAL + 0.4);
      K.pop(q(".s02-n"), ENFRENTE);
      tl.to(q(".s02-vs"), { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" }, GAMBITO - 0.15);
      K.pop(q(".s02-gambito"), GAMBITO);
      tl.to(q(".s02-gambito"), { y: -40, duration: GLAM - GAMBITO, ease: "none" }, GAMBITO);
      // sin glamour: sello torcido y el maestro con sorna
      K.sello(q(".s02-glam"), GLAM + 0.1, -7);
      tl.set(q(".s02-m1"), { opacity: 0 }, GLAM);
      tl.set(q(".s02-m2"), { opacity: 1 }, GLAM);
      K.respirar(q(".s02-m1"), 0, GLAM, 0.012, "300 1330");
""", [{"t": 0.0, "sfx": "redoble", "vol": 0.25, "max": 1.0}, {"t": 0.15, "sfx": "impact-bass-1", "vol": 0.35}, {"t": 1.38, "sfx": "pop", "vol": 0.3}, {"t": 2.54, "sfx": "pop", "vol": 0.3}, {"t": 3.45, "sfx": "sparkle", "vol": 0.25}, {"t": 5.08, "sfx": "golpe", "vol": 0.35}])

# ---------- s03 apertura: la clienta (peón blanco con colita) sale a jugar
mk("s03-apertura", 3.0, """
.s03-nota { left: 90px; top: 1390px; }
""", """
        <div class="aj-nota s03-nota"><b>1.</b>¿precio?</div>
""", TAB + r"""
      const k = C(6, 0), p0 = C(3, 1), p1 = C(3, 3), n = C(6, 6), np1 = C(2, 6), np2 = C(5, 6), t = C(0, 7);
      svg.innerHTML = AJ.tablero(TB) +
        AJ.pieza("torre", t.x, t.y, 1.0 * t.p, "n") +
        AJ.pieza("peon", np1.x, np1.y, 1.1 * np1.p, "n") + AJ.pieza("peon", np2.x, np2.y, 1.1 * np2.p, "n") +
        AJ.pieza("caballo", n.x, n.y, 1.3 * n.p, "n", { cara: "canchero" }) +
        `<g class="s03-cli">${AJ.pieza("peon", p0.x, p0.y, 1.5 * p0.p, "b", { cara: "feliz", extra: "colita" })}</g>` +
        AJ.pieza("rey", k.x, k.y, 1.3 * k.p, "b", { cara: "seria", extra: "delantal" }) +
        `<g class="s03-glo"><path d="M${p1.x + 40} ${p1.y - 330} h200 a30 30 0 0 1 30 30 v80 a30 30 0 0 1 -30 30 h-150 l-40 40 l4 -40 h-14 a30 30 0 0 1 -30 -30 v-80 a30 30 0 0 1 30 -30 Z" fill="${AJ.MAR}" stroke="${AJ.INK}" stroke-width="6" stroke-linejoin="round"/>
          <text data-layout-ignore x="${p1.x + 140}" y="${p1.y - 236}" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="72" fill="${AJ.ROJO}">¿$?</text></g>`;
      const BLANCAS = 0.41, PREGUNTA = 1.48, PRECIO = 2.22;
      tl.fromTo(q(".s03-escenario"), { scale: 1.0 }, { scale: 1.07, duration: DUR, ease: "none", transformOrigin: "45% 60%" }, 0);
      K.saltar(q(".s03-cli"), BLANCAS, p1.x - p0.x, p1.y - p0.y, 0.5, 90);
      K.popSvg(q(".s03-glo"), PREGUNTA, `${p1.x + 60} ${p1.y - 200}`, 0.35, 0.3);
      K.pop(q(".s03-nota"), PRECIO);
""", [{"t": 0.41, "sfx": "ficha", "vol": 0.5}, {"t": 1.48, "sfx": "pop", "vol": 0.3}, {"t": 2.22, "sfx": "tic", "vol": 0.35}])

# ---------- s04 chat: la clienta pregunta, el dueño contesta "cualquier cosa, avisame"
mk("s04-chat", 6.17, """
.s04-nota { left: 600px; top: 1400px; }
""", """
        <div class="aj-nota s04-nota"><b>?!</b>jugada dudosa</div>
""", r"""
      const X = 270, Y = 600, W = 560, H = 640;
      const [g1] = AJ.globo(X + 30, Y + 160, ["Hola, ¿cuánto salen las", "zapatillas blancas en 38?"], "i", { fs: 32, cls: "s04-g1", hora: "10:14" });
      const [g2] = AJ.globo(X + W - 30, Y + 330, ["$ 3.900. Cualquier", "cosa, avisame."], "d", { fs: 32, cls: "s04-g2", hora: "10:31", visto: "azul" });
      svg.innerHTML =
        `<g class="s04-cel">${AJ.celular(X, Y, W, H, "s04-clip", "#efe2c4")}<g clip-path="url(#s04-clip)">${AJ.chatCabecera(X, Y, W, "Clienta · Lucía", "en línea", AJ.MAD)}${g1}${g2}</g>${AJ.celularBorde(X, Y, W, H)}</g>` +
        `<g class="s04-zap"><g transform="translate(60 1330) rotate(-10) scale(1.35)">
          <path d="M0 0 L0 -40 Q10 -96 66 -104 L124 -104 Q150 -72 200 -62 L300 -42 Q344 -30 344 0 Z" fill="#ffffff" stroke="${AJ.INK}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M-6 0 L350 0 L350 22 Q344 36 322 36 L12 36 Q-6 36 -6 20 Z" fill="${AJ.MAR2}" stroke="${AJ.INK}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M120 -92 L160 -66 M136 -100 L176 -72 M100 -80 L144 -56" stroke="${AJ.INK}" stroke-width="6" stroke-linecap="round"/>
          <path d="M210 -58 Q250 -20 300 -40" fill="none" stroke="${AJ.ROJO}" stroke-width="10" stroke-linecap="round"/>
          <rect x="20" y="-80" width="70" height="44" rx="8" fill="${AJ.LAT}" stroke="${AJ.INK}" stroke-width="5"/><text data-layout-ignore x="55" y="-48" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="${AJ.INK}">38</text></g></g>`;
      const HOLA = 0.0, ZAP = 1.13, TRES = 3.33, AVISAME = 5.11;
      K.popSvg(q(".s04-cel"), 0, "550 920", 0.4, 0.85);
      K.popSvg(q(".s04-g1"), HOLA + 0.15, `${X + 60} ${Y + 200}`, 0.35, 0.4);
      K.popSvg(q(".s04-zap"), ZAP, "290 1300", 0.4, 0.2);
      tl.fromTo(q(".s04-zap"), { y: 0 }, { y: -14, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ZAP + 0.4);
      K.popSvg(q(".s04-g2"), TRES, `${X + W - 60} ${Y + 380}`, 0.35, 0.4);
      K.pop(q(".s04-nota"), AVISAME);
      tl.to(q(".s04-cel"), { rotation: -2, svgOrigin: "550 920", duration: DUR, ease: "none" }, 0);
""", [{"t": 0.15, "sfx": "notification", "vol": 0.35}, {"t": 1.13, "sfx": "pop", "vol": 0.3}, {"t": 3.33, "sfx": "key-press", "vol": 0.3}, {"t": 3.5, "sfx": "ping", "vol": 0.25}, {"t": 5.11, "sfx": "tic", "vol": 0.35}])

# ---------- s05 reloj: "Buena apertura. Y ahora... el reloj." "¿Y cuándo mueve?"
mk("s05-reloj", 3.95, """
.s05-tag { left: 300px; top: 640px; }
""", """
        <div class="aj-tag s05-tag">TU LOCAL · PENSANDO</div>
""", r"""
      svg.innerHTML =
        `<g class="s05-m">${AJ.maestro(540, 1340, 1.0, { cara: "enfatico", brazo: "dedo" })}</g>` +
        `<g class="s05-r">${AJ.reloj(540, 1250, 1.3, { izq: "00:03", der: "00:00" })}</g>` +
        `<g class="s05-a"><circle cx="880" cy="1240" r="150" fill="${AJ.EBA}" stroke="${AJ.LAT}" stroke-width="8"/><g clip-path="url(#s05-clip)">${AJ.ayudante(880, 1420, 0.55, { cara: "duda" })}</g><circle cx="880" cy="1240" r="150" fill="none" stroke="${AJ.LAT}" stroke-width="8"/></g>` +
        `<defs><clipPath id="s05-clip"><circle cx="880" cy="1240" r="146"/></clipPath></defs>`;
      const APERTURA = 0.32, AHORA = 1.27, RELOJ = 2.13, CUANDO = 2.84;
      K.popSvg(q(".s05-m"), 0, "540 1340", 0.35, 0.85);
      K.hablar(".s05-m .aj-m-boca", 0.05, 4, 0.12);
      K.origen(q(".s05-m .aj-m-brazo"), "170 -120");
      tl.fromTo(q(".s05-m .aj-m-brazo"), { rotation: 0 }, { rotation: -8, svgOrigin: "170 -120", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, APERTURA);
      tl.to(q(".s05-m"), { y: 60, opacity: 0, duration: 0.3, ease: "power2.in" }, RELOJ - 0.25);
      K.popSvg(q(".s05-r"), RELOJ, "540 1100", 0.4, 0.4);
      K.pop(q(".s05-tag"), RELOJ + 0.2);
      // el reloj del local corre
      const izq = q(".s05-r .aj-r-izq"), v = { m: 3 };
      const fmt = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(Math.floor(m % 60)).padStart(2, "0");
      tl.to(v, { m: 59, duration: DUR - RELOJ, ease: "none", onUpdate: () => { izq.innerHTML = AJ.seg(fmt(v.m), -240, -186, 62, AJ.ROJO2, true); } }, RELOJ);
      K.origen(q(".s05-r .aj-r-flag"), "-30 -150");
      tl.fromTo(q(".s05-r .aj-r-flag"), { rotation: -10 }, { rotation: 10, svgOrigin: "-30 -150", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, RELOJ + 0.3);
      K.popSvg(q(".s05-a"), CUANDO - 0.15, "880 1240", 0.35, 0.3);
""", [{"t": 0.32, "sfx": "tic", "vol": 0.3}, {"t": 2.13, "sfx": "impact-bass-2", "vol": 0.3}, {"t": 2.3, "sfx": "tic", "vol": 0.35}, {"t": 2.8, "sfx": "tic", "vol": 0.35}, {"t": 3.3, "sfx": "tic", "vol": 0.35}, {"t": 2.7, "sfx": "pop", "vol": 0.25}])
