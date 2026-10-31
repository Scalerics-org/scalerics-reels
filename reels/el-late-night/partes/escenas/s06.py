ID = "s06-tres-am"; DUR = 6.22
CSS = """
    $ .s06-q { position: absolute; left: 120px; top: 620px; width: 840px; padding: 22px 30px 18px; text-align: center; background: #fff1dc; border-radius: 26px; transform: rotate(3deg); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 80px; line-height: 1.05; color: #0b1330; box-shadow: 0 10px 0 #ffb547; }
    $ .s06-head { position: absolute; left: 290px; top: 672px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: #fff1dc; line-height: 1.1; }
    $ .s06-head small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #5ce611; letter-spacing: 0.08em; }
    $ .s06-hora { position: absolute; left: 190px; width: 700px; top: 790px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 130px; line-height: 1; color: #ffb547; }
    $ .s06-hora small { display: block; font-size: 28px; letter-spacing: 0.3em; color: #fff1dc; opacity: 0.7; margin-top: 6px; }
    $ .s06-ok { position: absolute; left: 330px; top: 1385px; padding: 12px 26px 8px; border: 8px solid #5ce611; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #5ce611; background: #0b1330; transform: rotate(-8deg); white-space: nowrap; }
"""
HTML = """
        <div class="s06-uno">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s06-nico"><g transform="translate(200 840) scale(1.5)">""" + NICO("s06", tarjeta=False) + """</g></g>
            """ + ESCRITORIO("s06", -40, 1420, 1160, 300, taza=False) + """
          </svg>
          <div class="s06-q">¿Y QUÉ HICISTE?</div>
        </div>
        <div class="s06-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            """ + CELULAR("s06", 190, 600, 700, 900) + """
            <circle class="ag" cx="250" cy="695" r="30" stroke-width="5" />
            <rect x="236" y="682" width="9" height="16" rx="4" fill="#5ce611" /><rect x="256" y="682" width="9" height="16" rx="4" fill="#5ce611" />
            <path d="M840 700 a26 26 0 1 1 -20 -40 a20 20 0 1 0 20 40 Z" fill="#ffb547" />
          </svg>
          <div class="s06-head">Agente de IA<small>EN LÍNEA</small></div>
          <div class="s06-hora"><span class="s06-hh">03:00</span><small>DE LA MAÑANA</small></div>
          """ + GLOBO("s06", "s06-g1", 230, 1010, 520, "Hola, ¿tienen mesa para el sábado? Somos cuatro.", "izq", "#fff1dc", "#0b1330", 36) + """
          """ + GLOBO("s06", "s06-g2", 330, 1180, 520, "¡Hola! Sí: sábado 21 h, mesa para cuatro. Ya te la reservé.", "der", "#5ce611", "#0b1330", 36) + """
          <div class="s06-ok">RESERVADO</div>
        </div>
"""
JS = """
      const A_LAS = 1.29, TRES = 1.56, MANANA = 2.09, CLIENTA = 2.89, SABADO = 4.32, TOME = 5.15;
      habla(".s06-boca", 0, 0.8, "180 284");
      golpe(".s06-q", 0.08, 1.8);
      tl.fromTo(q(".s06-cejas"), { y: 0 }, { y: -14, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.1);
      // corte al celular
      tl.to(q(".s06-uno"), { x: -1400, duration: 0.3, ease: "power3.in" }, A_LAS - 0.35);
      gsap.set(q(".s06-dos"), { x: 1100 });
      tl.fromTo(q(".s06-dos"), { x: 1100 }, { x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, A_LAS - 0.2);
      tl.fromTo(q(".s06-hh"), { opacity: 0.25 }, { opacity: 1, duration: 0.05, immediateRender: false }, TRES - 0.05);
      tl.fromTo(q(".s06-hora"), { scale: 1.5 }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, TRES - 0.05);
      tl.fromTo(q(".s06-hh"), { opacity: 1 }, { opacity: 0.55, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: 7, immediateRender: false }, MANANA);
      pop(".s06-g1", CLIENTA - 0.1, { y: 30 });
      tl.to(q(".s06-hora"), { scale: 0.8, y: -30, duration: 0.3 }, CLIENTA - 0.1);
      pop(".s06-g2", TOME - 0.35, { y: 30 });
      golpe(".s06-ok", TOME + 0.25, 2.2);
      sacudon(TOME + 0.29, 0.8);
"""
SFX = [{"t": 0.05, "sfx": "pop", "vol": 0.22}, {"t": 0.95, "sfx": "whoosh", "vol": 0.25, "max": 0.6}, {"t": 1.5, "sfx": "click", "vol": 0.3}, {"t": 2.8, "sfx": "notification", "vol": 0.3}, {"t": 4.8, "sfx": "key-press", "vol": 0.25}, {"t": 4.82, "sfx": "ping", "vol": 0.3}, {"t": 5.35, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
