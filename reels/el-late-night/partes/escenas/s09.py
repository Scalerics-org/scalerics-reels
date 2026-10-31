ID = "s09-seguimiento"; DUR = 3.21
CSS = """
    $ .s09-sep { position: absolute; left: 190px; width: 700px; top: 1020px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.24em; color: #ffb547; }
    $ .s09-head { position: absolute; left: 290px; top: 672px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: #fff1dc; line-height: 1.1; }
    $ .s09-head small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #fff1dc; opacity: 0.7; letter-spacing: 0.08em; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + CELULAR("s09", 190, 600, 700, 900) + """
          <circle class="y" cx="250" cy="695" r="30" stroke-width="5" />
        </svg>
        <div class="s09-head">Sofía<small>PREGUNTÓ Y NO COMPRÓ</small></div>
        """ + GLOBO("s09", "s09-g1", 230, 790, 480, "¿Cuánto sale la campera verde?", "izq", "#fff1dc", "#0b1330", 34) + """
        """ + GLOBO("s09", "s09-g2", 230, 920, 300, "Lo pienso.", "izq", "#fff1dc", "#0b1330", 34) + """
        <div class="s09-sep">· AL OTRO DÍA ·</div>
        """ + GLOBO("s09", "s09-g3", 330, 1080, 520, "Hola, Sofía: ¿la seguís pensando? Te la guardo hasta el viernes.", "der", "#5ce611", "#0b1330", 34) + """
        """ + GLOBO("s09", "s09-g4", 230, 1290, 430, "¡Sí! Paso mañana.", "izq", "#fff1dc", "#0b1330", 34) + """
"""
JS = """
      const PREGUNTO = 0.34, COMPRO = 1.06, ESCRIBI = 1.68, OTRO = 2.13;
      tl.fromTo(q(ESC), { y: 60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, 0);
      pop(".s09-g1", PREGUNTO - 0.1, { y: 20 });
      pop(".s09-g2", COMPRO - 0.1, { y: 20 });
      pop(".s09-sep", ESCRIBI - 0.25);
      pop(".s09-g3", ESCRIBI, { y: 20 });
      pop(".s09-g4", OTRO + 0.5, { y: 20 });
"""
SFX = [{"t": 0.25, "sfx": "notification", "vol": 0.28}, {"t": 0.98, "sfx": "pop", "vol": 0.22}, {"t": 1.68, "sfx": "ping", "vol": 0.3}, {"t": 2.63, "sfx": "notification", "vol": 0.28}]
