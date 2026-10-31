ID = "s05-pulgar"; DUR = 5.0
ARRIBA = """
            <rect x="60" y="560" width="960" height="430" fill="url(#s05-htc)" />
"""
ABAJO = """
            <rect x="60" y="1020" width="960" height="480" fill="url(#s05-htn)" />
            """ + RAYOS("s05", "s05-rayos", 300, 1300, 30, 160, 800, "#4fc3ff", 5, 0.3) + """
            <g class="s05-vis"><g transform="translate(90 1080) scale(0.95)">""" + VISTO("s05", telefono=False) + """</g></g>
            <g class="s05-cal"><rect x="640" y="1110" width="300" height="330" fill="#fdf6e3" stroke="#111111" stroke-width="7" /><rect x="640" y="1110" width="300" height="90" fill="#e63946" stroke="#111111" stroke-width="7" />
              <circle cx="700" cy="1110" r="12" fill="#111111" /><circle cx="880" cy="1110" r="12" fill="#111111" />
              <text class="s05-dia s05-d0" x="790" y="1340" text-anchor="middle" font-family="Bangers" font-size="110" fill="#111111">LUNES</text>
              <text x="790" y="1176" text-anchor="middle" font-family="Bangers" font-size="54" fill="#fdf6e3">¿CUÁNDO?</text>
            </g>
"""
CSS = """
    $ .s05-msj { position: absolute; left: 120px; top: 640px; width: 640px; padding: 22px 26px 18px; background: #fdf6e3; border: 6px solid #111111; border-radius: 26px; box-shadow: 10px 10px 0 #111111; font-family: "Comic Neue", sans-serif; font-weight: 700; font-size: 42px; line-height: 1.1; color: #111111; }
    $ .s05-msj small { display: block; margin-top: 8px; text-align: right; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; color: #2f6fe0; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s05") + VINETA("s05", "s05-v1", 60, 560, 960, 430, "#2f6fe0", ARRIBA) + VINETA("s05", "s05-v2", 60, 1020, 960, 480, "#14214a", ABAJO) + """
          """ + TILDES("s05-tt", 860, 880, 1.25) + """
        </svg>
        <div class="s05-pul" style="position:absolute;left:330px;top:1010px;width:500px;height:500px"><svg viewBox="0 0 300 300" style="width:500px;height:500px" aria-hidden="true">""" + PULGAR("s05", "s05-p") + """</svg></div>
        <div class="s05-msj">¿Tienen la torta de chocolate para mañana?<small>23:02</small></div>
        """ + GLOBO("s05-g", 300, 1050, 380, "«Te contesto el <b>lunes</b>»", "izq", 40) + """
        """ + ONO("s05-visto", "¡VISTO!", 640, 590, 100, "#4fc3ff", 6) + """
        """ + ONO("s05-plaf", "¡PLAF!", 90, 1110, 150, "#ffd23f", -10) + """
"""
JS = """
      const VISTO = 0.0, TE = 1.12, LUNES2 = 2.50, PULGAR = 3.33;
      tl.fromTo(q(".s05-msj"), { y: 0 }, { y: -6, duration: 0.3, yoyo: true, repeat: 1 }, 0);
      dibujar(".s05-tt path", VISTO + 0.02, 0.22);
      tl.fromTo(q(".s05-tt"), { scale: 1.8, svgOrigin: "860 880" }, { scale: 1, svgOrigin: "860 880", duration: 0.22, ease: "back.out(2)" }, VISTO);
      golpe(".s05-visto", VISTO + 0.15, 2.0);
      sacudon(VISTO + 0.1, 1.0);
      entra(".s05-vis", 0.3, { x: -300 }, 0.3);
      tl.fromTo(q(".s05-ojos"), { filter: "drop-shadow(0 0 0 #4fc3ff)" }, { filter: "drop-shadow(0 0 14px #4fc3ff)", duration: 0.2, yoyo: true, repeat: 7, immediateRender: false }, 0.4);
      gsap.set(q(".s05-g"), { opacity: 0 });
      tl.fromTo(q(".s05-g"), { opacity: 0, scale: 0.4, transformOrigin: "0% 50%" }, { opacity: 1, scale: 1, transformOrigin: "0% 50%", duration: 0.28, ease: "back.out(2)", immediateRender: false }, TE);
      habla(".s05-boca", TE, 1.0, "200 316");
      gsap.set(q(".s05-cal"), { opacity: 0 });
      tl.fromTo(q(".s05-cal"), { opacity: 0, y: -300, rotation: -12, svgOrigin: "790 1280" }, { opacity: 1, y: 0, rotation: 4, svgOrigin: "790 1280", duration: 0.32, ease: "back.out(1.6)", immediateRender: false }, TE + 0.4);
      tl.to(q(".s05-cal"), { rotation: -4, svgOrigin: "790 1280", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, LUNES2);
      tl.fromTo(q(".s05-d0"), { scale: 1, svgOrigin: "790 1310" }, { scale: 1.2, svgOrigin: "790 1310", duration: 0.12, yoyo: true, repeat: 3 }, LUNES2);
      // un pulgar: la mano cae encima
      gsap.set(q(".s05-pul"), { opacity: 0 });
      tl.fromTo(q(".s05-pul"), { opacity: 0, y: -900, rotation: -20, transformOrigin: "50% 90%" }, { opacity: 1, y: 0, rotation: 0, transformOrigin: "50% 90%", duration: 0.2, ease: "power4.in", immediateRender: false }, PULGAR - 0.12);
      golpe(".s05-plaf", PULGAR + 0.08, 2.2);
      sacudon(PULGAR + 0.08, 1.5);
      tl.to(q(".s05-g"), { opacity: 0, duration: 0.15 }, PULGAR);
      tl.to(q(".s05-pul"), { rotation: 6, transformOrigin: "50% 90%", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, PULGAR + 0.3);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.02, "sfx": "notification", "vol": 0.3}, {"t": 1.12, "sfx": "pop", "vol": 0.28}, {"t": 1.52, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.5, "sfx": "click", "vol": 0.3}, {"t": 3.25, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.8}, {"t": 3.3, "sfx": "glitch-1", "vol": 0.2, "max": 0.3}]
