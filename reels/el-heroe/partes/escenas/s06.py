ID = "s06-zas"; DUR = 5.91
ARRIBA = """
            <rect x="60" y="560" width="960" height="440" fill="url(#s06-hty)" />
            <path class="s06-vel" d="M80 700 H400 M100 780 H460 M70 860 H380 M120 940 H430" stroke="#111111" stroke-width="8" stroke-linecap="round" opacity="0.6" />
            <g class="s06-enf"><rect class="p" x="760" y="680" width="260" height="330" /><rect class="a" x="740" y="630" width="300" height="70" />
              <text x="890" y="682" text-anchor="middle" font-family="Bangers" font-size="44" fill="#fdf6e3">ENFRENTE</text>
              <rect class="nn" x="800" y="760" width="140" height="250" /><rect x="808" y="800" width="124" height="44" fill="#ffd23f" stroke="#111111" stroke-width="5" />
              <text x="870" y="834" text-anchor="middle" font-family="Bangers" font-size="32" fill="#111111">ABIERTO</text></g>
            <g class="s06-cli"><g transform="translate(330 640) scale(0.7) rotate(8 180 300)">""" + CLIENTA("s06") + """</g></g>
"""
ABAJO = """
            <rect x="60" y="1030" width="960" height="470" fill="url(#s06-htp)" />
            """ + RAYOS("s06", "s06-rayos", 540, 1300, 30, 200, 800, "#e63946", 6, 0.4) + """
            <g class="s06-due"><g transform="translate(345 1075) scale(1.05)">""" + DUENO("s06") + """</g></g>
"""
CSS = """
    $ .s06-espiral { position: absolute; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s06") + VINETA("s06", "s06-v1", 60, 560, 960, 440, "#ffd23f", ARRIBA) + VINETA("s06", "s06-v2", 60, 1030, 960, 470, "#fdf6e3", ABAJO) + """
          """ + ESTALLIDO("s06-est", 300, 800, 260, 14, "#e63946") + """
        </svg>
        """ + ONO("s06-zas", "¡ZAS!", 110, 690, 210, "#ffd23f", -10) + """
        """ + CAJA("s06-cap", "MIENTRAS, EN LA CONFITERÍA...", 90, 1050, 40, "#ffd23f", "#111111", -2) + """
        """ + ONO("s06-uf", "¡UF!", 760, 1180, 150, "#2f6fe0", 10) + """
"""
JS = """
      const ZAS = 0.0, OTRA = 0.69, ENFRENTE = 1.67, Y = 2.56, DUENO = 3.0, NO = 4.68;
      gsap.set(q(".s06-est"), { opacity: 1 });
      tl.fromTo(q(".s06-est"), { scale: 0.3, svgOrigin: "300 800" }, { scale: 1, svgOrigin: "300 800", duration: 0.14, ease: "back.out(2)" }, ZAS);
      tl.fromTo(q(".s06-zas"), { opacity: 0.5, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in" }, ZAS);
      sacudon(ZAS + 0.05, 1.4);
      tl.to([q(".s06-zas"), q(".s06-est")], { opacity: 0, scale: 0.5, duration: 0.2 }, OTRA - 0.1);
      // la clienta se va corriendo al de enfrente
      gsap.set(q(".s06-cli"), { opacity: 0 });
      tl.fromTo(q(".s06-cli"), { opacity: 1, x: -500 }, { opacity: 1, x: 260, duration: ENFRENTE - OTRA + 0.6, ease: "power1.in", immediateRender: false }, OTRA);
      tl.fromTo(q(".s06-vel"), { x: -400, opacity: 0 }, { x: 160, opacity: 0.6, duration: ENFRENTE - OTRA + 0.6, ease: "power1.in", immediateRender: false }, OTRA);
      tl.fromTo(q(".s06-enf"), { x: 200 }, { x: 0, duration: 0.4, ease: "back.out(1.5)" }, OTRA);
      tl.to([q(".s06-cli"), q(".s06-vel")], { opacity: 0, duration: 0.15 }, ENFRENTE + 0.55);
      tl.fromTo(q(".s06-enf"), { scale: 1, svgOrigin: "890 1000" }, { scale: 1.05, svgOrigin: "890 1000", duration: 0.12, yoyo: true, repeat: 1 }, ENFRENTE + 0.6);
      // el dueño de la confitería
      pop(".s06-cap", Y, { rotation: -6 });
      entra(".s06-due", DUENO - 0.1, { y: 300 }, 0.35);
      tl.fromTo(q(".s06-sudor"), { y: 0, opacity: 1 }, { y: 50, opacity: 0, duration: 0.5, repeat: 4, ease: "power1.in", immediateRender: false }, DUENO + 0.3);
      tl.fromTo(q(".s06-sudor2"), { y: 0, opacity: 1 }, { y: 40, opacity: 0, duration: 0.45, repeat: 4, ease: "power1.in", immediateRender: false }, DUENO + 0.5);
      tl.fromTo(q(".s06-due"), { x: -8 }, { x: 8, duration: 0.06, yoyo: true, repeat: 11, ease: "none", immediateRender: false }, NO);
      golpe(".s06-uf", NO + 0.1, 2.0);
      tl.fromTo(q(".s06-rayos"), { opacity: 0.1 }, { opacity: 0.5, duration: 0.2 }, NO);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.7}, {"t": 0.02, "sfx": "whoosh", "vol": 0.3, "max": 0.5}, {"t": 0.72, "sfx": "whoosh-short", "vol": 0.3}, {"t": 2.3, "sfx": "chime", "vol": 0.22, "max": 0.8}, {"t": 2.9, "sfx": "whoosh-short", "vol": 0.22}, {"t": 4.75, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.6}]
