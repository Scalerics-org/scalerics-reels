ID = "s06-galera"; DUR = 6.54
CSS = """
    $ .s06-rep { position: absolute; left: 150px; top: 600px; width: 430px; padding: 22px 26px 26px; background: #e6e8f0; border-radius: 10px; transform-origin: 50% 100%; }
    $ .s06-rep b { display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: #0a0610; text-transform: uppercase; line-height: 1; }
    $ .s06-rep small { display: block; margin-top: 8px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.1em; color: #2b1250; }
    $ .s06-rep svg { position: static; width: 380px; height: 190px; margin-top: 10px; }
    $ .s06-hora { position: absolute; left: 640px; top: 820px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #ff4fa3; text-shadow: 0 0 24px rgba(255, 79, 163, 0.5); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s06", "", 380, 1460, 300, 56, 380) + """
          """ + CONEJO("s06", "s06-con", 380, 1070, 0.9) + """
          """ + GALERA("s06", "s06-g", 380, 1130, 1.1) + """
          <g class="s06-mago"><g transform="translate(1090 900) scale(-0.95 0.95)">""" + MAGO("s06") + """</g></g>
          <g class="s06-dueno"><g transform="translate(640 940) scale(1.0)">""" + DUENO("s06d", telefono=False) + """
            <g class="s06d-lapiz"><path d="M300 470 L360 330" stroke="#e6e8f0" stroke-width="22" stroke-linecap="round" /><path d="M300 470 L360 330" stroke="#ff4fa3" stroke-width="12" stroke-linecap="round" /><circle class="b" cx="300" cy="474" r="26" /></g>
          </g></g>
          """ + RELOJ("s06", "s06-rel", 900, 760, 90, 1, 0) + """
          """ + DESTELLOS("s06", "s06-d", [(250, 1050, 26), (520, 1020, 22), (380, 960, 30), (300, 900, 16)], "#ff4fa3") + """
          <g class="s06-preg"><text x="500" y="980" font-family="Lexend" font-weight="900" font-size="120" fill="#e6e8f0">?</text></g>
        </svg>
        <div class="s06-rep"><b>Reporte del día</b><small>HECHO A MANO · 1:00 AM</small>
          <svg viewBox="0 0 380 190"><path class="s06-gar" d="M10 30 C40 10 70 50 100 30 C130 10 160 50 200 28 C240 10 270 44 300 30 M10 80 C50 60 80 100 120 78 C160 60 190 96 230 80 M10 130 C40 110 80 150 110 128 C150 110 180 146 220 130 C260 116 290 140 340 128 M10 175 C50 160 90 186 130 172" fill="none" stroke="#2b1250" stroke-width="7" stroke-linecap="round" /></svg>
        </div>
        <div class="s06-hora">1:00 AM</div>
"""
JS = """
      const GALERA = 0.52, SACAR = 1.57, EL = 2.52, REPORTE = 2.69, PORQUE = 4.01, SACO = 4.27, MANO = 4.61, UNA = 5.52;
      tl.fromTo(q(".s06-g"), { y: 120, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s06-mago"), { x: 300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s06-boca", 0, 2.2, "180 302");
      // golpecitos de varita y chispas
      [GALERA, GALERA + 0.45, SACAR - 0.2].forEach((t) => tl.fromTo(q(".s06-brazo"), { rotation: 0, svgOrigin: "276 418" }, { rotation: 18, svgOrigin: "276 418", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, t));
      destello(".s06-d path", GALERA, 3);
      tl.to(q(".s06-g"), { rotation: 3, svgOrigin: "380 1380", duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, GALERA + 0.2);
      // asoma el conejo... y lo interrumpen
      gsap.set(q(".s06-con"), { opacity: 0 });
      tl.fromTo(q(".s06-con"), { opacity: 1, y: 160 }, { opacity: 1, y: -70, duration: 0.5, ease: "power2.out", immediateRender: false }, SACAR);
      pop(".s06-preg", EL + 0.1);
      tl.to(q(".s06-con"), { y: 200, duration: 0.25, ease: "power2.in" }, REPORTE + 0.2);
      // el reporte sale de la galera, pero hecho a mano
      gsap.set(q(".s06-rep"), { opacity: 0 });
      tl.fromTo(q(".s06-rep"), { opacity: 1, y: 420, scaleY: 0.2 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, REPORTE);
      dibujar(".s06-gar", REPORTE + 0.4, 1.2);
      tl.to(q(".s06-preg"), { opacity: 0, duration: 0.2 }, PORQUE);
      // el dueño entra con el lápiz
      gsap.set(q(".s06-dueno"), { opacity: 0 });
      tl.to(q(".s06-mago"), { x: 600, duration: 0.3, ease: "power3.in" }, PORQUE - 0.3);
      tl.fromTo(q(".s06-dueno"), { opacity: 1, x: 500 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, PORQUE - 0.05);
      habla(".s06d-boca", PORQUE, 2.3, "180 294");
      tl.fromTo(q(".s06d-lapiz"), { rotation: 0, svgOrigin: "300 474" }, { rotation: -10, svgOrigin: "300 474", duration: 0.09, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, SACO);
      pop(".s06-rel", UNA - 0.3);
      pop(".s06-hora", UNA);
      tl.to(q(".s06-rel"), { rotation: 6, svgOrigin: "900 760", duration: 0.07, yoyo: true, repeat: 7 }, UNA + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.52, "sfx": "sparkle", "vol": 0.3}, {"t": 1.6, "sfx": "pop", "vol": 0.25}, {"t": 2.55, "sfx": "glitch-1", "vol": 0.22, "max": 0.4}, {"t": 2.7, "sfx": "whoosh", "vol": 0.28}, {"t": 4.3, "sfx": "typing", "vol": 0.2, "max": 1.0}, {"t": 5.5, "sfx": "ping", "vol": 0.3}]
