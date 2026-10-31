ID = "s15-jefe"; DUR = 7.17
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s15-htp)" />
            """ + RAYOS("s15", "s15-rayos", 380, 1100, 40, 200, 900, "#ffd23f", 8, 0.0) + """
            <g class="s15-due"><g transform="translate(130 900) scale(1.1)">
              <g class="s15-triste">""" + DUENO("s15t", "cansado") + """</g>
              <g class="s15-feliz">""" + DUENO("s15f", "feliz") + """</g>
            </g></g>
            <g class="s15-ag"><g transform="translate(760 1000) scale(0.95)">""" + AGENTE("s15", "saluda") + """</g></g>
            <g class="s15-torta"><g transform="translate(555 1150) scale(0.7)">""" + TORTA("s15", "s15-t") + """</g></g>
"""
CSS = """
    $ .s15-med { position: absolute; left: 400px; top: 1090px; width: 300px; text-align: center; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s15") + VINETA("s15", "s15-v", 60, 560, 960, 940, "#fdf6e3", DENTRO) + """</svg>
        """ + GLOBO("s15-g", 120, 620, 460, "¿Y yo no era el <b>héroe</b>?", "abajo-izq", 50) + """
        """ + CAJA("s15-mej", "LAS MEJORES TORTAS", 400, 1390, 44, "#ffd23f", "#111111", -4) + """
        """ + ONO("s15-equipo", "¡EQUIPO!", 470, 640, 150, "#2f6fe0", 6) + """
"""
JS = """
      const YO = 0.0, VOS = 1.80, MEJORES = 2.67, LO = 4.42, SOLO = 6.15;
      gsap.set(q(".s15-feliz"), { opacity: 0 });
      entra(".s15-due", 0, { x: -300 }, 0.3);
      gsap.set(q(".s15-g"), { opacity: 0 });
      tl.fromTo(q(".s15-g"), { opacity: 0, scale: 0.4, transformOrigin: "15% 100%" }, { opacity: 1, scale: 1, transformOrigin: "15% 100%", duration: 0.25, ease: "back.out(2)", immediateRender: false }, 0.1);
      habla(".s15t-boca", 0.05, 1.0, "181 306");
      tl.to(q(".s15-due"), { rotation: -3, svgOrigin: "330 1560", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.3);
      // entra el agente: vos hacés las mejores tortas
      tl.to(q(".s15-g"), { opacity: 0, scale: 0.8, duration: 0.15 }, VOS - 0.2);
      entra(".s15-ag", VOS - 0.15, { x: 400 }, 0.35);
      habla(".s15-boca", VOS, 4.4, "130 255");
      entra(".s15-torta", MEJORES - 0.3, { y: 400 }, 0.35);
      tl.to(q(".s15-torta"), { y: 400, opacity: 0, duration: 0.3, ease: "power2.in" }, LO - 0.1);
      tl.to(q(".s15-mej"), { opacity: 0, duration: 0.2 }, LO - 0.1);
      golpe(".s15-mej", MEJORES, 2.0, { rotation: 10 });
      tl.to(q(".s15-triste"), { opacity: 0, duration: 0.05 }, MEJORES + 0.2);
      tl.to(q(".s15-feliz"), { opacity: 1, duration: 0.05 }, MEJORES + 0.2);
      tl.fromTo(q(".s15-due"), { y: 0 }, { y: -30, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, MEJORES + 0.2);
      // lo que no podías era con todo solo: se juntan
      tl.to(q(".s15-ag"), { x: -120, duration: 0.4, ease: "back.out(1.4)" }, LO);
      tl.to(q(".s15-due"), { x: 40, duration: 0.4, ease: "back.out(1.4)" }, LO);
      tl.to(q(".s15-rayos"), { opacity: 0.5, duration: 0.3 }, LO);
      tl.fromTo(q(".s15-rayos"), { rotation: 0, svgOrigin: "380 1100" }, { rotation: 12, svgOrigin: "380 1100", duration: 2.7, ease: "none", immediateRender: false }, LO);
      golpe(".s15-equipo", SOLO - 0.2, 2.2);
      sacudon(SOLO - 0.15, 1.0);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 0.1, "sfx": "pop", "vol": 0.25}, {"t": 1.65, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.6, "sfx": "sparkle", "vol": 0.3}, {"t": 4.42, "sfx": "whoosh-short", "vol": 0.25}, {"t": 5.95, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.7}, {"t": 6.0, "sfx": "chime", "vol": 0.25, "max": 0.9}]
