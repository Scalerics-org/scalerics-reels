import sys; sys.path.insert(0, 'escenas')
from mk import mk
TAB = "const TB = { cx: 540, yN: 1330, yF: 900, W: 1000, k: 0.75 };\n      const C = (c, r) => AJ.casilla(TB, c, r);"
MOSTRADOR = """`<path d="M20 1250 L1060 1250 L1060 1370 L20 1370 Z" fill="${AJ.MAD2}" stroke="${AJ.INK}" stroke-width="8" stroke-linejoin="round"/><path d="M20 1250 L1060 1250 L1060 1274 L20 1274 Z" fill="${AJ.MAD3}" stroke="${AJ.INK}" stroke-width="6"/>`"""
BRAZO = r"""
      const brazo = (d) => `<path d="${d}" fill="none" stroke="${AJ.INK}" stroke-width="58" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${AJ.MAR}" stroke-width="44" stroke-linecap="round"/>`;
      const mano = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="30" ry="27" fill="${AJ.PIEL}" stroke="${AJ.INK}" stroke-width="6"/>`;"""

# ---------- s11 solo: el giro. No juega mal: juega solo. Atiende, cobra, repone...
mk("s11-solo", 7.06, """
.s11-no { left: 300px; top: 640px; }
.s11-solo { left: 300px; top: 620px; font-size: 76px; }
.s11-72 { left: 640px; top: 1400px; font-size: 54px; }
.s11-lbl { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.16em; color: #f3e6c8; background: #2a211b; border: 3px solid #d4a73a; border-radius: 6px; padding: 6px 14px 4px; white-space: nowrap; }
.s11-l1 { left: 90px; top: 760px; } .s11-l2 { left: 800px; top: 760px; } .s11-l3 { left: 820px; top: 1000px; }
""", """
        <div class="aj-tag mar s11-no">NO JUEGA MAL</div>
        <div class="aj-sello s11-solo">JUEGA SOLO</div>
        <div class="s11-lbl s11-l1">ATIENDE</div><div class="s11-lbl s11-l2">COBRA</div><div class="s11-lbl s11-l3">REPONE</div>
        <div class="aj-sello s11-72">72 HS</div>
""", BRAZO + r"""
      svg.innerHTML =
        `<g class="s11-b1">${brazo("M380 1150 C300 1080 260 1000 240 920")}<g transform="rotate(-12 240 880)"><rect x="196" y="800" width="90" height="150" rx="14" fill="${AJ.INK}"/><rect x="205" y="812" width="72" height="120" rx="8" fill="#9fc3d6"/></g>${mano(240, 920)}</g>` +
        `<g class="s11-b2">${brazo("M700 1150 C780 1080 830 1000 850 920")}<rect x="800" y="830" width="120" height="150" fill="${AJ.MAR}" stroke="${AJ.INK}" stroke-width="5"/><path d="M816 860 L904 860 M816 890 L890 890 M816 920 L904 920" stroke="${AJ.INK}" stroke-width="4"/><text data-layout-ignore x="860" y="962" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="${AJ.BOR}">$ 3.900</text>${mano(850, 960)}</g>` +
        `<g class="s11-b3">${brazo("M720 1200 C800 1190 860 1170 900 1130")}<rect x="840" y="1050" width="180" height="70" rx="6" fill="${AJ.MAD3}" stroke="${AJ.INK}" stroke-width="6"/><rect x="850" y="1120" width="180" height="70" rx="6" fill="${AJ.MAD3}" stroke="${AJ.INK}" stroke-width="6"/>${mano(900, 1140)}</g>` +
        `<g class="s11-d">${AJ.dueno(540, 1290, 0.95, { cara: "triste" })}</g>` +
        """ + MOSTRADOR + r""" +
        `<g class="s11-mini">${AJ.reloj(230, 1250, 0.55, { izq: "72:00", der: "00:01" })}</g>` +
        `<g class="s11-peon">${AJ.pieza("peon", 520, 1250, 0.7, "b", { extra: "colita" })}</g>`;
      const SOLO = 0.91, ATIENDE = 1.73, COBRA = 2.54, REPONE = 3.17, JUGADA = 4.51, DIAS = 5.99;
      K.popSvg(q(".s11-d"), 0, "540 1290", 0.35, 0.85);
      K.pop(q(".s11-no"), 0.05);
      tl.to(q(".s11-no"), { opacity: 0, duration: 0.15 }, SOLO - 0.15);
      K.sello(q(".s11-solo"), SOLO, -3);
      tl.to(q(".s11-solo"), { opacity: 0, y: -20, duration: 0.25 }, ATIENDE - 0.1);
      // le salen brazos: atiende, cobra, repone
      K.popSvg(q(".s11-b1"), ATIENDE, "380 1150", 0.35, 0.2); K.pop(q(".s11-l1"), ATIENDE + 0.1);
      K.popSvg(q(".s11-b2"), COBRA, "700 1150", 0.35, 0.2); K.pop(q(".s11-l2"), COBRA + 0.1);
      K.popSvg(q(".s11-b3"), REPONE, "720 1200", 0.35, 0.2); K.pop(q(".s11-l3"), REPONE + 0.1);
      tl.to(q(".s11-b1"), { rotation: -5, svgOrigin: "380 1150", duration: 0.25, yoyo: true, repeat: 9, ease: "sine.inOut" }, ATIENDE + 0.4);
      tl.to(q(".s11-b2"), { rotation: 5, svgOrigin: "700 1150", duration: 0.22, yoyo: true, repeat: 9, ease: "sine.inOut" }, COBRA + 0.4);
      // entre jugada y jugada: el peón espera en el mostrador y el reloj corre
      K.popSvg(q(".s11-mini"), JUGADA - 0.25, "230 1250", 0.35, 0.3);
      K.popSvg(q(".s11-peon"), JUGADA + 0.3, "520 1250", 0.35, 0.3);
      K.sello(q(".s11-72"), DIAS, -4);
      K.sacudon(q(".s11-mini"), DIAS + 0.02, 1);
""", [{"t": 0.0, "sfx": "drama", "vol": 0.2, "max": 1.2}, {"t": 0.91, "sfx": "golpe", "vol": 0.35}, {"t": 1.73, "sfx": "vibra", "vol": 0.3, "max": 0.6}, {"t": 2.54, "sfx": "beep", "vol": 0.25}, {"t": 3.17, "sfx": "pop", "vol": 0.3}, {"t": 4.3, "sfx": "tic", "vol": 0.3}, {"t": 4.8, "sfx": "tic", "vol": 0.3}, {"t": 5.3, "sfx": "tic", "vol": 0.3}, {"t": 5.99, "sfx": "impact-bass-1", "vol": 0.35}])

# ---------- s12 ayuda: el de enfrente no juega mejor: tiene ayuda (una sombra le sopla la jugada)
mk("s12-ayuda", 3.29, """
.s12-mejor { left: 90px; top: 640px; }
.s12-ayuda { left: 420px; top: 1390px; font-size: 64px; }
""", """
        <div class="aj-tag mar s12-mejor">NO JUEGA MEJOR</div>
        <div class="aj-sello lat s12-ayuda">TIENE AYUDA</div>
""", r"""
      svg.innerHTML =
        `<g class="s12-luz" opacity="0"><path d="M700 560 L520 1330 L1060 1330 L900 560 Z" fill="${AJ.LAT}" opacity="0.18"/></g>` +
        `<g class="s12-sombra"><g transform="translate(780 1330) scale(2.6)"><path d="M-62 0 L62 0 L56 -24 L-56 -24 Z M-46 -24 L46 -24 L40 -42 L-40 -42 Z M-38 -40 Q-28 -118 -20 -150 L20 -150 Q28 -118 38 -40 Z M-34 -160 L-48 -216 L-22 -186 L0 -230 L22 -186 L48 -216 L34 -160 Z" fill="#120c08" stroke="${AJ.LAT2}" stroke-width="3" stroke-linejoin="round"/></g>
          <text class="s12-q" data-layout-ignore x="780" y="1130" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="200" fill="${AJ.LAT}">?</text></g>` +
        `<g class="s12-n">${AJ.pieza("caballo", 380, 1330, 2.4, "n", { cara: "canchero" })}</g>` +
        `<g class="s12-psst"><text data-layout-ignore x="560" y="850" font-family="Caveat" font-weight="700" font-size="64" fill="${AJ.MAR}">psst...</text></g>` +
        `<path d="M40 1330 L1040 1330" stroke="${AJ.INK}" stroke-width="10"/>`;
      const NO = 0.40, MEJOR = 1.30, TIENE = 2.01, AYUDA = 2.21;
      K.popSvg(q(".s12-n"), 0, "380 1330", 0.35, 0.85);
      tl.fromTo(q(".s12-sombra"), { opacity: 0.25 }, { opacity: 0.6, duration: TIENE, ease: "none" }, 0);
      K.pop(q(".s12-mejor"), NO);
      tl.to(q(".s12-mejor"), { rotation: -3, duration: 0.15, yoyo: true, repeat: 1 }, MEJOR);
      K.popSvg(q(".s12-psst"), MEJOR + 0.2, "620 830", 0.3, 0.4);
      tl.to(q(".s12-sombra"), { opacity: 1, duration: 0.15 }, AYUDA - 0.1);
      tl.to(q(".s12-luz"), { opacity: 1, duration: 0.15 }, AYUDA - 0.1);
      tl.fromTo(q(".s12-q"), { opacity: 0.5 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, AYUDA);
      K.sello(q(".s12-ayuda"), AYUDA + 0.05, -3);
      tl.fromTo(q(".s12-escenario"), { scale: 1 }, { scale: 1.07, duration: DUR, ease: "none", transformOrigin: "60% 60%" }, 0);
""", [{"t": 0.0, "sfx": "drama", "vol": 0.2, "max": 1.0}, {"t": 1.5, "sfx": "suspiro", "vol": 0.2}, {"t": 2.21, "sfx": "impact-bass-2", "vol": 0.35}])

# ---------- s13 agente: entra Scalerics: la dama verde (agente de IA) juega con vos
mk("s13-agente", 6.65, """
.s13-tag { left: 300px; top: 620px; font-size: 44px; }
.s13-l1 { left: 40px; top: 1400px; }
.s13-l2 { left: 650px; top: 1400px; }
""", """
        <div class="aj-tag verde s13-tag">AGENTE DE IA</div>
        <div class="aj-tag verde s13-l1">PREGUNTÓ Y NO COMPRÓ</div>
        <div class="aj-tag verde s13-l2">DEJÓ DE VENIR</div>
""", TAB + r"""
      const k = C(3, 1), a = C(4, 1), cl = C(1, 5), w = C(6, 5);
      svg.innerHTML = AJ.tablero(TB) +
        `<path class="s13-x1" d="M${a.x} ${a.y - 260} Q${(a.x + cl.x) / 2} ${cl.y - 380} ${cl.x} ${cl.y - 190}" stroke="${AJ.VERDE}" stroke-width="10" stroke-dasharray="18 14" fill="none"/>` +
        `<path class="s13-x2" d="M${a.x} ${a.y - 260} Q${(a.x + w.x) / 2} ${w.y - 380} ${w.x} ${w.y - 190}" stroke="${AJ.VERDE}" stroke-width="10" stroke-dasharray="18 14" fill="none"/>` +
        `<g class="s13-cl">${AJ.pieza("peon", cl.x, cl.y, 1.2 * cl.p, "b", { cara: "duda", extra: "colita", halo: 0 })}</g>` +
        `<g class="s13-cl2" opacity="0">${AJ.pieza("peon", cl.x, cl.y, 1.2 * cl.p, "b", { cara: "feliz", extra: "colita", halo: 70 })}</g>` +
        `<g class="s13-w">${AJ.pieza("peon", w.x, w.y, 1.2 * w.p, "b", { cara: "triste", extra: "gorra" })}</g>` +
        `<g class="s13-w2" opacity="0">${AJ.pieza("peon", w.x, w.y, 1.2 * w.p, "b", { cara: "feliz", extra: "gorra", halo: 70 })}</g>` +
        `<g class="s13-k">${AJ.pieza("rey", k.x, k.y, 1.45 * k.p, "b", { cara: "triste", extra: "delantal" })}</g>` +
        `<g class="s13-k2" opacity="0">${AJ.pieza("rey", k.x, k.y, 1.45 * k.p, "b", { cara: "feliz", extra: "delantal" })}</g>` +
        `<g class="s13-a">${AJ.pieza("dama", a.x, a.y, 1.6 * a.p, "v", { cara: "pantalla", halo: 110 })}</g>`;
      const SCALERICS = 1.36, AGENTE = 2.15, ESCRIBE = 3.22, PREGUNTO = 3.98, DEJO = 5.59;
      tl.fromTo(q(".s13-escenario"), { scale: 1.05 }, { scale: 1, duration: DUR, ease: "power1.out", transformOrigin: "50% 60%" }, 0);
      K.popSvg(q(".s13-a"), SCALERICS, `${a.x} ${a.y}`, 0.45, 0.2);
      tl.set(q(".s13-k"), { opacity: 0 }, SCALERICS + 0.2);
      tl.set(q(".s13-k2"), { opacity: 1 }, SCALERICS + 0.2);
      K.sello(q(".s13-tag"), AGENTE, -2);
      tl.to(q(".s13-tag"), { opacity: 0, duration: 0.2 }, PREGUNTO - 0.3);
      K.dibujar(q(".s13-x1"), ESCRIBE, 0.5);
      tl.set(q(".s13-cl"), { opacity: 0 }, PREGUNTO);
      tl.set(q(".s13-cl2"), { opacity: 1 }, PREGUNTO);
      K.pop(q(".s13-l1"), PREGUNTO);
      K.dibujar(q(".s13-x2"), DEJO - 0.35, 0.45);
      tl.set(q(".s13-w"), { opacity: 0 }, DEJO + 0.1);
      tl.set(q(".s13-w2"), { opacity: 1 }, DEJO + 0.1);
      K.pop(q(".s13-l2"), DEJO + 0.1);
      tl.fromTo(q(".s13-a"), { y: 0 }, { y: -12, duration: 0.45, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, SCALERICS + 0.5);
""", [{"t": 1.36, "sfx": "flash", "vol": 0.3}, {"t": 1.4, "sfx": "sparkle", "vol": 0.35}, {"t": 2.15, "sfx": "impact-bass-1", "vol": 0.3}, {"t": 3.22, "sfx": "whoosh", "vol": 0.2, "max": 0.5}, {"t": 3.98, "sfx": "chime", "vol": 0.3}, {"t": 5.4, "sfx": "whoosh", "vol": 0.2, "max": 0.5}, {"t": 5.7, "sfx": "chime", "vol": 0.3}])

# ---------- s14 revancha: el agente le escribe a la clienta; ella vuelve; ¡movieron las blancas!
mk("s14-revancha", 6.60, """
.s14-sello { left: 290px; top: 640px; font-size: 96px; }
""", """
        <div class="aj-sello verde s14-sello">REVANCHA</div>
""", r"""
      const X = 260, Y = 600, W = 560, H = 640;
      const [g1] = AJ.globo(X + W - 30, Y + 160, ["Hola, ¿te guardo las", "blancas en 38?"], "d", { fs: 32, cls: "s14-g1", hora: "10:32", visto: "azul", fill: "#d9f7c4" });
      const [g2] = AJ.globo(X + 30, Y + 330, ["¡Sí! El sábado paso."], "i", { fs: 32, cls: "s14-g2", hora: "10:33" });
      svg.innerHTML =
        `<g class="s14-cel">${AJ.celular(X, Y, W, H, "s14-clip", "#efe2c4")}<g clip-path="url(#s14-clip)">${AJ.chatCabecera(X, Y, W, "Clienta · Lucía", "agente de IA · en línea", AJ.INK)}${g1}${g2}</g>${AJ.celularBorde(X, Y, W, H)}</g>` +
        `<g class="s14-a">${AJ.ayudante(540, 1340, 0.95, { cara: "feliz", brazo: "arriba" })}</g>` +
        `<g class="s14-p">${AJ.pieza("peon", 180, 1330, 1.3, "b", { cara: "feliz", extra: "colita", halo: 80 })}</g>`;
      const SI = 2.33, MOVIERON = 3.98, REV = 5.42;
      K.popSvg(q(".s14-cel"), 0, "540 920", 0.35, 0.85);
      K.popSvg(q(".s14-g1"), 0.1, `${X + W - 60} ${Y + 200}`, 0.35, 0.4);
      K.popSvg(q(".s14-g2"), SI, `${X + 60} ${Y + 370}`, 0.35, 0.4);
      K.popSvg(q(".s14-p"), SI + 0.3, "180 1330", 0.35, 0.3);
      K.saltar(q(".s14-p"), SI + 0.8, 0, 0, 0.35, 50);
      // ¡movieron las blancas!: el celular se va y festeja el ayudante
      tl.to(q(".s14-cel"), { y: -80, opacity: 0, duration: 0.3, ease: "power2.in" }, MOVIERON - 0.2);
      K.popSvg(q(".s14-a"), MOVIERON, "540 1340", 0.35, 0.6);
      K.hablar(".s14-a .aj-a-boca", MOVIERON + 0.1, 4, 0.1);
      tl.to(q(".s14-a .aj-a-brazo"), { y: -14, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, MOVIERON + 0.3);
      K.saltar(q(".s14-p"), MOVIERON + 0.4, 0, 0, 0.35, 70);
      K.sello(q(".s14-sello"), REV, -4);
      K.sacudon(q(".s14-escenario"), REV + 0.02, 0.8);
""", [{"t": 0.1, "sfx": "key-press", "vol": 0.3}, {"t": 0.3, "sfx": "ping", "vol": 0.25}, {"t": 2.33, "sfx": "notification", "vol": 0.35}, {"t": 3.98, "sfx": "aplausos", "vol": 0.25, "max": 1.6}, {"t": 5.42, "sfx": "golpe", "vol": 0.4}])

# ---------- s15 cta: ¿Cuántas partidas dejaste abiertas esta semana? Contanos en los comentarios.
mk("s15-cta", 7.42, """
.s15-t { left: 0; width: 1080px; top: 640px; font-size: 64px; }
.s15-cta { left: 120px; top: 1400px; width: 840px; font-size: 40px; }
.s15-ab { position: absolute; top: 1190px; padding: 6px 14px 4px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.14em; color: #f3e6c8; background: #d7263d; border: 3px solid #1c1612; border-radius: 6px; white-space: nowrap; }
.s15-a1 { left: 135px; } .s15-a2 { left: 475px; } .s15-a3 { left: 815px; }
""", """
        <div class="aj-titulo s15-t">¿CUÁNTAS DEJASTE<br>ABIERTAS?</div>
        <div class="s15-ab s15-a1">ABIERTA</div><div class="s15-ab s15-a2">ABIERTA</div><div class="s15-ab s15-a3">ABIERTA</div>
        <div class="aj-tag verde s15-cta">CONTANOS EN LOS COMENTARIOS</div>
""", r"""
      let s = "";
      [200, 540, 880].forEach((cx, i) => {
        const TBm = { cx, yN: 1150, yF: 1000, W: 250, k: 0.6 };
        const c = AJ.casilla(TBm, 3, 2), r = AJ.casilla(TBm, 5, 5);
        s += `<g class="s15-m s15-m${i}">${AJ.tablero(TBm)}${AJ.pieza("peon", r.x, r.y, 0.45 * r.p, "n")}${AJ.pieza("peon", c.x, c.y, 0.6 * c.p, "b", { cara: ["duda", "triste", "duda"][i], extra: ["colita", "gorra", ""][i] })}</g>`;
      });
      svg.innerHTML = s;
      const PARTIDAS = 0.77, ABIERTAS = 1.61, CONTANOS = 2.83;
      K.pop(q(".s15-t"), 0.05);
      [0, 1, 2].forEach((i) => K.popSvg(q(".s15-m" + i), PARTIDAS + i * 0.18, `${[200, 540, 880][i]} 1080`, 0.35, 0.3));
      [1, 2, 3].forEach((i) => K.sello(q(".s15-a" + i), ABIERTAS + (i - 1) * 0.15, -3));
      K.pop(q(".s15-cta"), CONTANOS);
      tl.to(q(".s15-cta"), { scale: 1.05, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut" }, CONTANOS + 0.5);
""", [{"t": 0.05, "sfx": "pop", "vol": 0.25}, {"t": 0.77, "sfx": "ficha", "vol": 0.35}, {"t": 1.61, "sfx": "tic", "vol": 0.35}, {"t": 2.83, "sfx": "chime", "vol": 0.35}])
