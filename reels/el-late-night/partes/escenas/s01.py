ID = "s01-invitado"; DUR = 5.31
CSS = """
    $ .s01-24 { position: absolute; left: 640px; top: 620px; width: 380px; padding: 18px 0 16px; text-align: center; background: #0b1330; border: 8px solid #ffb547; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 0.9; color: #ffb547; }
    $ .s01-24 small { display: block; margin-top: 8px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.22em; color: #fff1dc; }
    $ .s01-sello { position: absolute; left: 600px; top: 900px; padding: 14px 24px 10px; border: 8px solid #ff3d6e; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 54px; line-height: 1; color: #ff3d6e; white-space: nowrap; transform: rotate(-9deg); background: rgba(11, 19, 48, 0.85); }
    $ .s01-odia { position: absolute; left: 0; right: 0; top: 1360px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #ff3d6e; text-shadow: 0 0 30px rgba(255, 61, 110, 0.6), 0 6px 0 #0b1330; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s01", "s01-h", 360, 360, 60, 640, 560, 1500, "#ffb547") + """
          <g class="s01-nico"><g transform="translate(110 790) scale(1.3)">""" + NICO("s01") + """</g></g>
          """ + ESCRITORIO("s01", 30, 1300, 680, 220) + """
          <g class="s01-emp">
            <circle cx="820" cy="1130" r="200" fill="#0b1330" stroke="#ff3d6e" stroke-width="10" />
            <defs><clipPath id="s01-clip"><circle cx="820" cy="1130" r="194" /></clipPath></defs>
            <g clip-path="url(#s01-clip)"><g class="s01-empi"><g transform="translate(604 800) scale(1.2)">""" + EMPLEADO("s01e", True) + """</g></g></g>
          </g>
        </svg>
        <div class="s01-24">24<small>HORAS</small></div>
        <div class="s01-sello">SIN AUMENTO</div>
        <div class="s01-odia">LO ODIA</div>
"""
JS = """
      const H24 = 1.43, AUMENTO = 3.13, EMPLEADO = 3.93, ODIA = 4.38;
      // arranca ya armado (el cuadro 0 no puede estar negro) con un acercamiento de cámara
      tl.fromTo(q(ESC), { scale: 1.12, transformOrigin: "35% 60%" }, { scale: 1, transformOrigin: "35% 60%", duration: 1.0, ease: "power3.out", immediateRender: false }, 0);
      habla(".s01-boca", 0, 4.9, "180 284");
      tl.fromTo(q(".s01-cejas"), { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.6);
      tl.fromTo(q(".s01-brazo"), { rotation: 0, svgOrigin: "300 470" }, { rotation: -14, svgOrigin: "300 470", duration: 0.25, yoyo: true, repeat: 1, ease: "back.out(2)", immediateRender: false }, H24 - 0.1);
      tl.fromTo(q(".s01-vapor"), { y: 0, opacity: 0.5 }, { y: -18, opacity: 0.2, duration: 1.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0);
      golpe(".s01-24", H24, 2.2);
      sacudon(H24 + 0.04, 0.7);
      tl.to(q(".s01-24"), { y: -40, scale: 0.8, duration: 0.3, ease: "power2.inOut" }, AUMENTO - 0.25);
      golpe(".s01-sello", AUMENTO, 2.6);
      sacudon(AUMENTO + 0.04, 0.8);
      // el empleado que lo odia: entra en un círculo
      tl.to([q(".s01-24"), q(".s01-sello")], { opacity: 0, duration: 0.2 }, EMPLEADO - 0.15);
      pop(".s01-emp", EMPLEADO - 0.1);
      tl.fromTo(q(".s01-empi"), { y: 80 }, { y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, EMPLEADO - 0.1);
      golpe(".s01-odia", ODIA, 2.4);
      sacudon(ODIA + 0.04, 1.2);
      tl.fromTo(q(".s01-empi"), { x: 0 }, { x: 8, duration: 0.05, yoyo: true, repeat: 9, ease: "none", immediateRender: false }, ODIA + 0.05);
"""
SFX = [{"t": 1.38, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 3.08, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.6}, {"t": 3.85, "sfx": "pop", "vol": 0.3}, {"t": 4.33, "sfx": "glitch-1", "vol": 0.28, "max": 0.5}]
