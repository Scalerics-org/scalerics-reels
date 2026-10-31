ID = "s10-maestro"; DUR = 4.06
CSS = """
    $ .s10-card { position: absolute; left: 520px; width: 440px; padding: 24px 28px 22px; border-radius: 22px; border: 7px solid #e6e8f0; font-family: "Lexend", sans-serif; }
    $ .s10-card b { display: block; font-weight: 900; font-size: 92px; line-height: 0.95; text-transform: uppercase; }
    $ .s10-card small { display: block; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.08em; }
    $ .s10-mano { top: 640px; background: #2b1250; } $ .s10-mano b { color: #ff4fa3; } $ .s10-mano small { color: #e6e8f0; }
    $ .s10-solo { top: 980px; background: #0a0610; border-color: #5ce611; } $ .s10-solo b { color: #5ce611; } $ .s10-solo small { color: #e6e8f0; }
    $ .s10-noes { position: absolute; left: 600px; top: 640px; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-asis"><g transform="translate(-10 860) scale(1.22)">""" + ASISTENTE("s10") + """</g></g>
          <g class="s10-dueno"><g transform="translate(600 880) scale(0.95)">""" + DUENO("s10") + """</g></g>
          """ + ENGRANAJE("s10", "s10-e", 900, 1290, 70) + """
          """ + DESTELLOS("s10", "s10-d", [(470, 1000, 24), (480, 1180, 16), (130, 900, 20)], "#5ce611") + """
        </svg>
        """ + CARTEL("s10", "s10-noes", 600, 690, "No es él", "#c3a2ff", "#0a0610", 48, -4) + """
        <div class="s10-card s10-mano"><b>A mano</b><small>copiar · pegar · avisar · anotar</small></div>
        <div class="s10-card s10-solo"><b>Solo</b><small>lo que se hace solo</small></div>
"""
JS = """
      const PROBLEMA = 0.67, NO = 1.09, EL = 1.25, HACE = 1.50, MANO = 2.00, SOLO = 3.09;
      tl.fromTo(q(".s10-asis"), { x: -300 }, { x: 0, duration: 0.3, ease: "back.out(1.4)" }, 0);
      habla(".s10-boca", 0, 3.5, "180 292");
      tl.fromTo(q(".s10-dueno"), { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, 0);
      tl.fromTo(q(".s10-brazo"), { rotation: 30, svgOrigin: "268 420" }, { rotation: 0, svgOrigin: "268 420", duration: 0.3, ease: "back.out(2)" }, PROBLEMA);
      pop(".s10-noes", NO, { rotation: -4 });
      tl.to(q(".s10-dueno"), { y: -16, duration: 0.15, yoyo: true, repeat: 1 }, EL);
      // el dueño sale y aparecen las dos tarjetas
      tl.to([q(".s10-dueno"), q(".s10-noes")], { x: 600, opacity: 0, duration: 0.3, ease: "power3.in" }, HACE - 0.1);
      pop(".s10-mano", MANO - 0.15, { x: 80 });
      tl.to(q(".s10-mano"), { rotation: -2, duration: 0.08, yoyo: true, repeat: 5 }, MANO + 0.2);
      pop(".s10-solo", SOLO - 0.2, { x: 80 });
      pop(".s10-e", SOLO - 0.1);
      tl.fromTo(q(".s10-eng-gira"), { rotation: 0 }, { rotation: 180, transformOrigin: "50% 50%", duration: 1.0, ease: "none", immediateRender: false }, SOLO - 0.1);
      tl.to(q(".s10-mano"), { opacity: 0.45, duration: 0.2 }, SOLO);
      // chasquido
      tl.to(q(".s10-brazo"), { rotation: -25, svgOrigin: "268 420", duration: 0.12, ease: "power3.out" }, SOLO + 0.4);
      destello(".s10-d path", SOLO + 0.45, 1);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.09, "sfx": "pop", "vol": 0.28}, {"t": 1.85, "sfx": "pop", "vol": 0.3}, {"t": 2.9, "sfx": "chime", "vol": 0.3, "max": 0.8}, {"t": 3.5, "sfx": "click", "vol": 0.35}, {"t": 3.55, "sfx": "sparkle", "vol": 0.25}]
