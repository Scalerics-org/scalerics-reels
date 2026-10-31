ID = "s13-agente"; DUR = 5.24
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s13-hty)" />
            """ + RAYOS("s13", "s13-rayos", 380, 1060, 44, 200, 1000, "#e63946", 8, 0.5) + """
            <g class="s13-ag"><g transform="translate(150 830) scale(1.3)">""" + AGENTE("s13", "arriba") + """</g></g>
"""
BADGE = lambda c, t, x, y, f, col: f'<div class="caja {c}" style="left:{x}px;top:{y}px;font-size:58px;background:{f};color:{col}">{t}</div>'
CSS = """
    $ .s13-reloj { position: absolute; left: 600px; top: 760px; width: 380px; text-align: center; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s13") + VINETA("s13", "s13-v", 60, 560, 960, 940, "#ffd23f", DENTRO) + """
          <g class="s13-sol"><g transform="translate(790 820)">
            <circle r="90" fill="#fdf6e3" stroke="#111111" stroke-width="8" />
            <path d="M0 -90 A90 90 0 0 1 0 90 A90 90 0 0 1 0 -90" fill="#14214a" stroke="#111111" stroke-width="8" />
            <path class="s13-aguja" d="M0 0 V-62" stroke="#e63946" stroke-width="10" stroke-linecap="round" />
            <path class="s13-aguja2" d="M0 0 H44" stroke="#111111" stroke-width="10" stroke-linecap="round" />
            <circle r="12" fill="#111111" />
          </g></g>
        </svg>
        """ + CAJA("s13-cap", "AGENTE DE IA", 90, 590, 72, "#2f6fe0", "#ffd23f", -3) + """
        """ + CAJA("s13-hora", "DÍA Y NOCHE", 640, 930, 44, "#111111", "#fdf6e3", 4) + """
        """ + BADGE("s13-b1", "PRECIOS", 640, 1060, "#fdf6e3", "#111111") + """
        """ + BADGE("s13-b2", "STOCK", 690, 1180, "#e63946", "#fdf6e3") + """
        """ + BADGE("s13-b3", "HORARIOS", 620, 1300, "#2f6fe0", "#fdf6e3") + """
        """ + ONO("s13-ta", "¡TA-DÁ!", 560, 640, 120, "#e63946", -8) + """
"""
JS = """
      const AGENTE = 0.22, ATIENDO = 1.91, PRECIOS = 3.22, STOCK = 3.65, HORARIOS = 4.17;
      entra(".s13-ag", 0, { y: 500 }, 0.4);
      golpe(".s13-cap", AGENTE, 2.0, { rotation: -10 });
      golpe(".s13-ta", 0.5, 2.2);
      sacudon(0.25, 1.0);
      tl.to(q(".s13-ta"), { opacity: 0, scale: 0.6, duration: 0.2 }, 1.6);
      tl.fromTo(q(".s13-rayos"), { rotation: 0, svgOrigin: "380 1060" }, { rotation: -14, svgOrigin: "380 1060", duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".s13-abr1"), { rotation: 0, svgOrigin: "28 250" }, { rotation: 8, svgOrigin: "28 250", duration: 0.3, yoyo: true, repeat: 13, ease: "sine.inOut", immediateRender: false }, 0.4);
      habla(".s13-boca", 0.1, 4.6, "130 255");
      // a cualquier hora: el reloj día/noche gira
      gsap.set(q(".s13-sol"), { opacity: 0 });
      tl.fromTo(q(".s13-sol"), { opacity: 0, scale: 0.3, svgOrigin: "790 820" }, { opacity: 1, scale: 1, svgOrigin: "790 820", duration: 0.3, ease: "back.out(2)", immediateRender: false }, ATIENDO - 0.1);
      tl.fromTo(q(".s13-aguja"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 720, svgOrigin: "0 0", duration: 2.8, ease: "power1.inOut", immediateRender: false }, ATIENDO);
      tl.fromTo(q(".s13-aguja2"), { rotation: 0, svgOrigin: "0 0" }, { rotation: 120, svgOrigin: "0 0", duration: 2.8, ease: "power1.inOut", immediateRender: false }, ATIENDO);
      pop(".s13-hora", ATIENDO + 0.3, { rotation: 10 });
      golpe(".s13-b1", PRECIOS, 1.8, { rotation: -10 });
      golpe(".s13-b2", STOCK, 1.8, { rotation: 8 });
      golpe(".s13-b3", HORARIOS, 1.8, { rotation: -6 });
      sacudon(HORARIOS + 0.05, 0.7);
"""
SFX = [{"t": 0.02, "sfx": "sparkle", "vol": 0.35}, {"t": 0.2, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 1.85, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.2, "sfx": "pop", "vol": 0.3}, {"t": 3.63, "sfx": "pop", "vol": 0.3}, {"t": 4.15, "sfx": "pop", "vol": 0.32}]
