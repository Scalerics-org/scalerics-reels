import sys; sys.path.insert(0,'escenas')
from mk import mk

# ---------- s08 enfrente
mk("s08-enfrente", 5.30, """
.s08-man { left: 70px; top: 620px; font-size: 80px; }
.s08-gl { left: 300px; top: 640px; font-size: 42px; }
.s08-tag { left: 560px; top: 1390px; }
""", """
        <div class="pl-sello s08-man">¿MAÑANA?</div>
        <div class="pl-globo s08-gl">Bueno... lo compro<br>en otro lado.</div>
        <div class="pl-tag rojo s08-tag">LA RESCATÓ ENFRENTE</div>
""", r"""
      svg.innerHTML =
        `<g class="s08-torre">${PL.torre(850, 1300, 0.62, { cartel: "ENFRENTE" })}</g>` +
        PL.bandera(1010, 1300, 560, PL.VERDE, { w: 120, th: 90, palo: 12, cls: "s08-band" }) +
        `<path class="s08-soga" d="M800 1020 Q700 1100 620 1130" fill="none" stroke="${PL.AMA}" stroke-width="8" stroke-linecap="round"/>` +
        `<g class="s08-cli">${PL.clienta(600, 1200, 0.6, { cara: "duda", id: "s08-cc" })}${PL.salvavidas(600, 1196, 66, { cls: "s08-sv" })}</g>` +
        PL.olas(1240, { L: 200, amp: 18, h: 60, color: PL.TUR, cls: "s08-o" }) +
        `<g class="s08-g">${PL.guardavidas(250, 1340, 0.82, { cara: "grito" })}</g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const MAN2 = 0.96, RESCATO = 1.53, ENFRENTE = 2.09, BUENO = 3.14, OTRO = 4.29;
      K.popSvg(q(".s08-g"), 0, "250 1340", 0.3, 0.8);
      K.sello(q(".s08-man"), 0.05, -5);
      K.sacudon(q(".s08-escenario"), 0.08, 0.8);
      K.hablar(".s08-g .pl-g-boca", MAN2, 4, 0.12);
      tl.to(q(".s08-man"), { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 }, MAN2);
      K.flamear(".s08-band .pl-b-tela", 0, DUR, 0.2);
      K.olear(".s08-o", 0, DUR, 200, 1.2);
      K.popSvg(q(".s08-cli"), 0.2, "600 1200", 0.3, 0.6);
      gsap.set(q(".s08-sv"), { opacity: 0 });
      // el de enfrente le tira el salvavidas y la tira para su torre
      K.dibujar(q(".s08-soga"), RESCATO - 0.2, 0.3);
      tl.fromTo(q(".s08-sv"), { opacity: 0, scale: 0.3, svgOrigin: "600 1196" }, { opacity: 1, scale: 1, svgOrigin: "600 1196", duration: 0.3, ease: "back.out(2)", immediateRender: false }, RESCATO);
      tl.to(q(".s08-man"), { opacity: 0, duration: 0.2 }, RESCATO);
      K.pop(q(".s08-tag"), ENFRENTE);
      tl.to(q(".s08-cli"), { x: 120, duration: 0.8, ease: "power2.inOut" }, ENFRENTE);
      tl.to(q(".s08-soga"), { opacity: 0, duration: 0.2 }, ENFRENTE + 0.6);
      K.pop(q(".s08-gl"), BUENO);
      tl.to(q(".s08-cli"), { x: 420, y: -60, duration: 1.0, ease: "power2.in" }, OTRO);
""", [{"t":0.0,"sfx":"golpe","vol":0.35},{"t":1.35,"sfx":"whoosh","vol":0.25,"max":0.5},{"t":1.55,"sfx":"pop","vol":0.3},{"t":2.09,"sfx":"buzzer","vol":0.2,"max":0.6},{"t":3.14,"sfx":"notification","vol":0.3}])

# ---------- s09 torre (giro)
mk("s09-torre", 5.59, """
.s09-cartel { left: 530px; top: 960px; font-size: 46px; }
.s09-tag { left: 470px; top: 1390px; }
""", """
        <div class="pl-sello s09-cartel">HASTA LAS 20</div>
        <div class="pl-tag s09-tag">TORRE VACÍA</div>
""", r"""
      let marcas = "";
      for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; marcas += `<path d="M${300 + Math.cos(a) * 92} ${770 + Math.sin(a) * 92} L${300 + Math.cos(a) * 108} ${770 + Math.sin(a) * 108}" stroke="${PL.INK}" stroke-width="6" stroke-linecap="round"/>`; }
      svg.innerHTML =
        `<g class="s09-torre">${PL.torre(760, 1300, 0.88, { cartel: "TORRE 1" })}</g>` +
        `<g class="s09-reloj"><circle cx="300" cy="770" r="128" fill="${PL.CRE}" stroke="${PL.INK}" stroke-width="10"/>${marcas}
          <path class="s09-hora" d="M300 770 L300 710" stroke="${PL.INK}" stroke-width="12" stroke-linecap="round"/>
          <path class="s09-min" d="M300 770 L300 670" stroke="${PL.ROJO}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="300" cy="770" r="12" fill="${PL.INK}"/></g>` +
        `<g class="s09-g">${PL.guardavidas(290, 1340, 0.8, { cara: "serio", lentes: false })}</g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const NADIE = 1.01, TODO = 2.18, NI = 2.75, OCHO = 3.96, BAJO = 4.20, TORRE = 4.60;
      K.popSvg(q(".s09-torre"), 0, "760 1300", 0.35, 0.85);
      K.popSvg(q(".s09-g"), 0, "290 1340", 0.35, 0.85);
      K.hablar(".s09-g .pl-g-boca", 0.05, 3, 0.12);
      K.popSvg(q(".s09-reloj"), NADIE, "300 770", 0.35, 0.3);
      // todo el día: las agujas vuelan
      tl.fromTo(q(".s09-min"), { rotation: 0 }, { rotation: 1440, svgOrigin: "300 770", duration: OCHO - NADIE, ease: "power1.inOut", immediateRender: false }, NADIE);
      tl.fromTo(q(".s09-hora"), { rotation: 0 }, { rotation: 120, svgOrigin: "300 770", duration: OCHO - NADIE, ease: "power1.inOut", immediateRender: false }, NADIE);
      K.hablar(".s09-g .pl-g-boca", NI, 3, 0.12);
      K.sello(q(".s09-cartel"), OCHO, -6);
      // se baja de la torre: el guardavidas se va de cuadro saludando
      tl.to(q(".s09-g"), { y: 620, opacity: 0, duration: 0.6, ease: "power2.in" }, BAJO);
      tl.to(q(".s09-reloj"), { opacity: 0.0, duration: 0.3 }, BAJO + 0.2);
      K.pop(q(".s09-tag"), TORRE);
""", [{"t":0.0,"sfx":"click-soft","vol":0.25},{"t":1.01,"sfx":"tic","vol":0.3},{"t":1.6,"sfx":"tic","vol":0.25},{"t":2.2,"sfx":"tic","vol":0.25},{"t":3.96,"sfx":"martillo","vol":0.3},{"t":4.2,"sfx":"whoosh","vol":0.25,"max":0.5}])

# ---------- s10 agente
mk("s10-agente", 6.45, """
.s10-titulo { left: 0; top: 1350px; width: 1080px; font-size: 112px; color: #5ce611; }
.s10-tag { left: 190px; top: 1480px; }
""", """
        <div class="pl-titulo s10-titulo">AGENTE DE IA</div>
        <div class="pl-tag verde s10-tag">NUNCA SE BAJA DE LA TORRE</div>
""", r"""
      svg.innerHTML =
        `<path class="s10-haz" d="M560 690 L1200 560 L1200 900 Z" fill="${PL.AMA}" opacity="0.28"/>` +
        `<path class="s10-haz2" d="M520 690 L-120 560 L-120 900 Z" fill="${PL.AMA}" opacity="0.28"/>` +
        `<g class="s10-torre">${PL.torre(540, 1300, 0.9, { cartel: "TORRE 1" })}</g>` +
        `<g class="s10-k">${PL.agente(540, 880, 0.6, { brazo: "saluda" })}</g>` +
        `<g class="s10-chispas"><path d="M330 700 l10 28 l28 10 l-28 10 l-10 28 l-10 -28 l-28 -10 l28 -10 Z M760 640 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 l22 -8 Z" fill="${PL.VERDE}" stroke="${PL.INK}" stroke-width="4"/></g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const SCAL = 0.69, AGENTES = 2.03, GUARDA = 3.55, NUNCA = 4.62;
      K.popSvg(q(".s10-torre"), 0, "540 1300", 0.35, 0.9);
      // aparece el agente en la torre
      K.popSvg(q(".s10-k"), SCAL, "540 880", 0.45, 0.2);
      K.popSvg(q(".s10-chispas"), SCAL + 0.1, "545 720", 0.4, 0.4);
      tl.to(q(".s10-chispas"), { opacity: 0, duration: 0.3 }, SCAL + 1.0);
      K.pop(q(".s10-titulo"), AGENTES);
      // parpadea
      tl.to(q(".s10-k .pl-k-ojos"), { scaleY: 0.1, svgOrigin: "0 -381", duration: 0.07, yoyo: true, repeat: 1 }, AGENTES + 0.8);
      // saluda
      const br = q(".s10-k .pl-k-brazo");
      tl.fromTo(br, { rotation: -10 }, { rotation: 14, svgOrigin: "130 -330", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, GUARDA);
      // el reflector barre el mar
      gsap.set([q(".s10-haz"), q(".s10-haz2")], { opacity: 0 });
      tl.to([q(".s10-haz"), q(".s10-haz2")], { opacity: 0.28, duration: 0.3 }, SCAL + 0.3);
      tl.fromTo(q(".s10-haz"), { rotation: -8 }, { rotation: 10, svgOrigin: "560 690", duration: 1.4, yoyo: true, repeat: 2, ease: "sine.inOut", immediateRender: false }, SCAL + 0.3);
      tl.fromTo(q(".s10-haz2"), { rotation: 8 }, { rotation: -10, svgOrigin: "520 690", duration: 1.4, yoyo: true, repeat: 2, ease: "sine.inOut", immediateRender: false }, SCAL + 0.3);
      K.pop(q(".s10-tag"), NUNCA);
""", [{"t":0.69,"sfx":"sparkle","vol":0.35},{"t":0.72,"sfx":"impact-bass-2","vol":0.3,"max":0.8},{"t":2.03,"sfx":"chime","vol":0.3},{"t":3.55,"sfx":"pop","vol":0.25},{"t":4.62,"sfx":"click","vol":0.3}])

# ---------- s11 rescate (de noche, 03:12)
mk("s11-rescate", 6.52, """
.s11-sello { left: 300px; top: 1380px; font-size: 64px; }
""", """
        <div class="pl-sello verde s11-sello">¡RESCATADA!</div>
""", r"""
      const [b1] = PL.globo(60, 620, ["¡Hola! Sí, del azul en M", "nos queda uno."], "i", { fs: 36, fill: "#d6f0c4", hora: "03:12", cls: "s11-b1" });
      const [b2] = PL.globo(60, 772, "¿Te lo reservo?", "i", { fs: 36, fill: "#d6f0c4", hora: "03:12", cls: "s11-b2" });
      const [b3] = PL.globo(1030, 680, ["¡Ay, me salvaron!", "Sí, porfa."], "d", { fs: 38, fill: "#ffffff", hora: "03:12", cls: "s11-b3" });
      svg.innerHTML =
        PL.olas(1120, { L: 200, amp: 16, h: 200, color: PL.TUR3, cls: "s11-o1", op: 0.6 }) +
        `<g class="s11-c1">${PL.clienta(780, 1200, 0.8, { cara: "asustada", mano: "auxilio", id: "s11-cc1" })}</g>` +
        `<g class="s11-c2">${PL.clienta(780, 1200, 0.8, { cara: "feliz", mano: "celular", id: "s11-cc2" })}</g>` +
        `<g class="s11-c3">${PL.clienta(780, 1200, 0.8, { cara: "aliviada", mano: "celular", id: "s11-cc3" })}</g>` +
        `<g class="s11-sv">${PL.salvavidas(0, 0, 118, { color: PL.VERDE })}</g>` +
        `<g class="s11-k">${PL.agente(230, 1340, 0.62, { brazo: "tira" })}</g>` +
        b1 + b2 + b3;
      const K = PL.kit(tl, root);
      const { q } = K;
      const SI = 0.24, UNO = 2.46, RES = 3.27, AY = 4.18, SALV = 4.62, PORFA = 5.43;
      K.popSvg(q(".s11-k"), 0, "230 1340", 0.3, 0.85);
      K.olear(".s11-o1", 0, DUR, 200, 1.3);
      gsap.set([q(".s11-c2"), q(".s11-c3")], { opacity: 0 });
      K.flotar(q(".s11-c1 .pl-c-cuerpo"), 0, 1, 14);
      // el salvavidas verde vuela de la mano del agente a la clienta
      gsap.set(q(".s11-sv"), { x: 410, y: 1085, opacity: 0 });
      tl.set(q(".s11-sv"), { opacity: 1 }, SI);
      tl.to(q(".s11-sv"), { x: 780, duration: 0.6, ease: "none" }, SI);
      tl.to(q(".s11-sv"), { y: 880, duration: 0.28, ease: "power2.out" }, SI);
      tl.to(q(".s11-sv"), { y: 1215, duration: 0.32, ease: "power2.in" }, SI + 0.28);
      tl.to(q(".s11-sv"), { rotation: 300, transformOrigin: "50% 50%", duration: 0.6, ease: "none" }, SI);
      tl.fromTo(q(".s11-sv"), { scale: 1 }, { scale: 1.1, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, SI + 0.6);
      tl.set(q(".s11-c1"), { opacity: 0 }, SI + 0.6);
      tl.set(q(".s11-c2"), { opacity: 1 }, SI + 0.6);
      K.flotar(q(".s11-c2 .pl-c-cuerpo"), SI + 0.6, 3, 5);
      K.popSvg(q(".s11-b1"), 0.05, "300 680", 0.3, 0.5);
      K.popSvg(q(".s11-b2"), RES, "200 810", 0.3, 0.5);
      tl.to([q(".s11-b1"), q(".s11-b2")], { opacity: 0, y: -30, duration: 0.25 }, AY - 0.1);
      tl.set(q(".s11-c2"), { opacity: 0 }, AY);
      tl.set(q(".s11-c3"), { opacity: 1 }, AY);
      K.flotar(q(".s11-c3 .pl-c-cuerpo"), AY, DUR - AY, 5);
      K.popSvg(q(".s11-b3"), AY, "800 740", 0.3, 0.5);
      K.sello(q(".s11-sello"), SALV, -4);
""", [{"t":0.05,"sfx":"notification","vol":0.3},{"t":0.24,"sfx":"whoosh","vol":0.3,"max":0.6},{"t":0.84,"sfx":"golpe","vol":0.3},{"t":3.27,"sfx":"notification","vol":0.25},{"t":4.18,"sfx":"pop","vol":0.3},{"t":4.62,"sfx":"correcta","vol":0.35}])

# ---------- s12 explica
mk("s12-explica", 7.81, """
.s12-c { left: 70px; }
.s12-c1 { top: 640px; } .s12-c2 { top: 730px; } .s12-c3 { top: 820px; } .s12-c4 { top: 910px; } .s12-c5 { top: 1000px; }
.s12-tag { left: 140px; top: 1390px; }
""", """
        <div class="pl-tag verde s12-c s12-c1">AL INSTANTE</div>
        <div class="pl-tag verde s12-c s12-c2">A CUALQUIER HORA</div>
        <div class="pl-tag verde s12-c s12-c3">TUS PRECIOS</div>
        <div class="pl-tag verde s12-c s12-c4">TU STOCK</div>
        <div class="pl-tag verde s12-c s12-c5">TUS HORARIOS</div>
        <div class="pl-tag s12-tag">TE PASA LA CONVERSACIÓN</div>
""", r"""
      svg.innerHTML =
        `<g class="s12-due">${PL.dueno(300, 1360, 0.75, { cara: "unojo", lentes: false })}</g>` +
        `<g class="s12-k">${PL.agente(800, 1340, 0.66, { brazo: "saluda" })}</g>` +
        `<g class="s12-cel"><rect x="-50" y="-90" width="100" height="180" rx="18" fill="${PL.INK}"/><rect x="-40" y="-78" width="80" height="150" rx="10" fill="#d6f0c4"/>
           <rect x="-30" y="-60" width="56" height="18" rx="9" fill="#ffffff" stroke="${PL.INK}" stroke-width="2"/><rect x="-26" y="-30" width="50" height="18" rx="9" fill="${PL.VERDE}"/><rect x="-30" y="0" width="44" height="18" rx="9" fill="#ffffff" stroke="${PL.INK}" stroke-width="2"/></g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const INST = 0.57, CUAL = 1.48, PREC = 2.71, STOCK = 3.36, HOR = 4.10, Y = 4.86, VOS = 5.74, PASO = 6.31;
      K.popSvg(q(".s12-k"), 0, "800 1340", 0.35, 0.85);
      K.hablar(".s12-k .pl-k-boca", 0.05, 8, 0.14);
      [[".s12-c1", INST], [".s12-c2", CUAL], [".s12-c3", PREC], [".s12-c4", STOCK], [".s12-c5", HOR]].forEach(([s, t]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, t - 0.05);
      });
      tl.to([".s12-c1", ".s12-c2", ".s12-c3", ".s12-c4", ".s12-c5"].map((s) => q(s)), { opacity: 0, x: -40, duration: 0.25, stagger: 0.04 }, Y);
      // el dueño en la reposera abre un ojo; el agente le pasa el celular
      K.popSvg(q(".s12-due"), Y + 0.2, "300 1360", 0.35, 0.6);
      gsap.set(q(".s12-cel"), { x: 980, y: 900, opacity: 0, rotation: 0 });
      tl.set(q(".s12-cel"), { opacity: 1 }, VOS);
      tl.to(q(".s12-cel"), { x: 470, duration: 0.6, ease: "none" }, PASO - 0.2);
      tl.to(q(".s12-cel"), { y: 800, duration: 0.3, ease: "power2.out" }, PASO - 0.2);
      tl.to(q(".s12-cel"), { y: 1100, duration: 0.3, ease: "power2.in" }, PASO + 0.1);
      tl.to(q(".s12-cel"), { rotation: -340, transformOrigin: "50% 50%", duration: 0.6, ease: "none" }, PASO - 0.2);
      K.pop(q(".s12-tag"), PASO);
""", [{"t":0.57,"sfx":"click","vol":0.3},{"t":1.48,"sfx":"click","vol":0.3},{"t":2.71,"sfx":"click","vol":0.3},{"t":3.36,"sfx":"click","vol":0.3},{"t":4.1,"sfx":"click","vol":0.3},{"t":6.11,"sfx":"whoosh","vol":0.3,"max":0.6},{"t":6.45,"sfx":"pop","vol":0.3}])

# ---------- s13 bandera verde
mk("s13-verde", 3.75, """
.s13-q { left: 120px; top: 640px; font-size: 130px; }
.s13-sello { left: 170px; top: 1380px; font-size: 76px; }
""", """
        <div class="pl-mano s13-q">¿?</div>
        <div class="pl-sello verde s13-sello">¡BANDERA VERDE!</div>
""", r"""
      svg.innerHTML =
        `<g class="s13-band">${PL.bandera(560, 1300, 640, PL.VERDE, { w: 320, th: 210, palo: 18, trazo: 8, cls: "s13-b" })}</g>` +
        `<g class="s13-due">${PL.dueno(300, 1360, 0.85, { cara: "unojo", mate: true })}</g>` +
        `<g class="s13-g">${PL.guardavidas(810, 1340, 0.72, { cara: "feliz", brazo: "arriba" })}</g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const HAGO = 0.37, VOS = 1.22, MATE = 1.62, BAND = 2.29, VERDE = 2.67;
      K.popSvg(q(".s13-due"), 0, "300 1360", 0.3, 0.85);
      K.pop(q(".s13-q"), HAGO);
      tl.to(q(".s13-q"), { rotation: 8, duration: 0.15, yoyo: true, repeat: 3 }, HAGO + 0.3);
      K.popSvg(q(".s13-g"), VOS - 0.1, "810 1340", 0.35, 0.6);
      tl.to(q(".s13-q"), { opacity: 0, duration: 0.2 }, VOS);
      // toma mate tranquilo
      const mano = q(".s13-due .pl-d-mano");
      tl.to(mano, { x: -150, y: -260, rotation: -10, duration: 0.3, ease: "power2.out", svgOrigin: "160 -230" }, MATE);
      tl.to(mano, { x: 0, y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut", svgOrigin: "160 -230" }, MATE + 0.9);
      // sube la bandera verde
      gsap.set(q(".s13-band"), { opacity: 0 });
      tl.fromTo(q(".s13-band"), { opacity: 1, y: 640 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, BAND - 0.1);
      K.flamear(".s13-b .pl-b-tela", BAND, DUR - BAND, 0.18);
      K.sello(q(".s13-sello"), VERDE, -3);
      tl.fromTo(q(".s13-g .pl-g-brazo"), { y: 0 }, { y: -20, duration: 0.12, yoyo: true, repeat: 5, immediateRender: false }, VERDE);
""", [{"t":0.37,"sfx":"pop","vol":0.25},{"t":1.62,"sfx":"click-soft","vol":0.3},{"t":2.2,"sfx":"whoosh","vol":0.3,"max":0.6},{"t":2.67,"sfx":"campana","vol":0.3,"max":1.2},{"t":2.7,"sfx":"risas","vol":0.12,"max":1.0}])

# ---------- s14 cta
mk("s14-cta", 6.15, """
.s14-titulo { left: 0; top: 600px; width: 1080px; font-size: 128px; color: #ffc93c; }
.s14-txt { position: absolute; left: 470px; top: 820px; width: 580px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 60px; line-height: 1.08; color: #fff6e3; text-shadow: 0 5px 0 #10202b, 3px 3px 0 #10202b, -3px -3px 0 #10202b, 3px -3px 0 #10202b, -3px 3px 0 #10202b; }
.s14-txt span { display: block; }
.s14-txt .s14-roja { color: #e5484d; }
.s14-txt .s14-marzo { font-family: "Black Ops One", sans-serif; font-weight: 400; font-size: 92px; color: #ffc93c; margin-top: 6px; }
.s14-tag { left: 150px; top: 1390px; }
""", """
        <div class="pl-titulo s14-titulo">MANDÁSELO</div>
        <div class="s14-txt"><span class="s14-l1">al que tiene</span><span class="s14-l2">la bandera <i class="s14-roja" style="font-style:normal">roja</i></span><span class="s14-l3">puesta desde</span><span class="s14-l4 s14-marzo">MARZO</span></div>
        <div class="pl-tag rojo s14-tag">ENVIÁSELO · ETIQUETALO</div>
""", r"""
      svg.innerHTML =
        PL.bandera(170, 1320, 520, "#c9575a", { w: 270, th: 180, palo: 18, trazo: 8, cls: "s14-b" }) +
        // telaraña entre el palo y la tela
        `<g class="s14-tela"><path class="s14-t1" d="M176 860 L300 860 M176 860 L176 980 M176 860 L280 960 M176 900 Q206 900 210 868 M176 936 Q236 936 246 868 M176 968 Q262 966 284 868" fill="none" stroke="${PL.CRE}" stroke-width="3" opacity="0.9"/></g>` +
        // la hoja de almanaque de marzo, colgada del palo
        `<g class="s14-cal"><path d="M170 1040 L230 1060" stroke="${PL.INK}" stroke-width="5"/>
          <rect x="200" y="1050" width="180" height="200" rx="10" fill="${PL.CRE}" stroke="${PL.INK}" stroke-width="7"/>
          <rect x="200" y="1050" width="180" height="56" rx="8" fill="${PL.ROJO}" stroke="${PL.INK}" stroke-width="7"/>
          <text data-layout-ignore x="290" y="1092" text-anchor="middle" font-family="Black Ops One" font-size="34" fill="${PL.CRE}">MARZO</text>
          <text data-layout-ignore x="290" y="1206" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="90" fill="${PL.INK}">1</text></g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const AL = 0.53, BAND = 1.07, ROJA = 1.16, PUESTA = 1.78, MARZO = 2.41;
      K.sello(q(".s14-titulo"), 0.05, -2);
      K.flamear(".s14-b .pl-b-tela", 0, DUR, 0.5);
      [[".s14-l1", AL], [".s14-l2", BAND], [".s14-l3", PUESTA]].forEach(([s, t]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t - 0.05);
      });
      K.sello(q(".s14-l4"), MARZO, -4);
      K.popSvg(q(".s14-cal"), MARZO, "230 1060", 0.35, 0.3);
      tl.fromTo(q(".s14-cal"), { rotation: -8 }, { rotation: 6, svgOrigin: "170 1040", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, MARZO + 0.35);
      K.dibujar(q(".s14-t1"), MARZO + 0.3, 0.8);
      tl.to(q(".s14-roja"), { scale: 1.15, duration: 0.12, yoyo: true, repeat: 1 }, ROJA);
      K.pop(q(".s14-tag"), MARZO + 0.9);
      tl.fromTo(q(".s14-tag"), { y: 0 }, { y: -8, duration: 0.4, yoyo: true, repeat: 4, ease: "sine.inOut", immediateRender: false }, MARZO + 1.3);
""", [{"t":0.05,"sfx":"golpe","vol":0.35},{"t":1.07,"sfx":"pop","vol":0.25},{"t":2.41,"sfx":"martillo","vol":0.3},{"t":2.8,"sfx":"uuh","vol":0.15,"max":0.8},{"t":3.3,"sfx":"chime","vol":0.25}])
