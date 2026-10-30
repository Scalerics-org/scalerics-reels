ID = "s01-alerta"; DUR = 6.22
CSS = """
    $ .s01-card { position: absolute; left: 70px; top: 700px; width: 940px; padding: 34px 0 30px; background: #ff8a1f; border: 8px solid #f4f6fb; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 136px; line-height: 0.95; color: #061428; text-transform: uppercase; letter-spacing: -0.02em; box-shadow: 14px 14px 0 #061428; }
    $ .s01-card small { display: block; margin-top: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.3em; color: #f4f6fb; }
    $ .s01-tri { display: block; margin: 0 auto 14px; width: 120px; height: 104px; }
    $ .s01-tulocal { left: 300px; top: 1040px; background: #ff8a1f; color: #061428; font-size: 40px; box-shadow: 6px 6px 0 #061428; }
    $ .s01-dom { position: absolute; left: 560px; top: 1110px; padding: 8px 16px 6px; background: #061428; border: 4px solid #ffd23f; color: #ffd23f; font-size: 34px; letter-spacing: 0.08em; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
""" + MAPA("s01") + """
          <g clip-path="url(#s01-clipmapa)">
            <g class="s01-radar" fill="none" stroke="#ff8a1f" stroke-width="5">
              <ellipse class="s01-r1" cx="420" cy="1000" rx="60" ry="24" /><ellipse class="s01-r2" cx="420" cy="1000" rx="60" ry="24" />
            </g>
            <g class="s01-llueve">""" + lluvia("s01-lluvia", 26, 270, 590, 800, 360, 11, globos=0.6, vel=(260, 380), esc=(0.9, 1.3), ang=6, cx=420, cy=1000) + """</g>
          </g>
          <g class="s01-nube"><g transform="translate(430 760) scale(0.95)">""" + NUBE("m") + """
            <path d="M-20 60 L-50 120 L-10 120 L-40 190" fill="none" stroke="#ffd23f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" class="s01-rayo" />
          </g></g>
          <g class="s01-pin"><g transform="translate(420 1000)">""" + PIN() + """</g></g>
          <g class="s01-paraguas"><g transform="translate(200 1190)">
            <path d="M-90 0 C-90 -60 -50 -96 0 -96 C50 -96 90 -60 90 0 C78 -12 60 -12 54 0 C42 -12 24 -12 18 0 C6 -12 -12 -12 -18 0 C-30 -12 -48 -12 -54 0 C-66 -12 -84 -12 -90 0 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="6" stroke-linejoin="round" />
            <path d="M0 0 V80 C0 100 -24 100 -24 84" fill="none" stroke="#f4f6fb" stroke-width="8" stroke-linecap="round" />
            <path class="s01-cruz" d="M-110 -110 L110 90 M110 -110 L-110 90" fill="none" stroke="#ff8a1f" stroke-width="20" stroke-linecap="round" />
          </g></g>
          <g class="s01-met"><g transform="translate(690 900) scale(0.95)">""" + METEO("s01") + """</g></g>
        </svg>
        <div class="cartela s01-tulocal">TU LOCAL</div>
        <div class="mono s01-dom">DOM 22:00</div>
        <div class="s01-card">
          <svg class="s01-tri" viewBox="0 0 120 104"><path d="M60 8 L112 96 H8 Z" fill="#061428" stroke="#061428" stroke-width="8" stroke-linejoin="round"/><path d="M60 38 V68" stroke="#ff8a1f" stroke-width="12" stroke-linecap="round"/><circle cx="60" cy="84" r="7" fill="#ff8a1f"/></svg>
          ALERTA<br>NARANJA<small>PARA TU LOCAL</small>
        </div>
"""
JS = """
      const LOCAL = 1.16, DOMINGO = 2.32, LLUEVEN = 3.30, SIN = 4.91;
      // cuadro 0: el mapa ya está; leve zoom de cámara
      tl.fromTo(q(".s01-mapa"), { scale: 1.06, svgOrigin: "540 940" }, { scale: 1, svgOrigin: "540 940", duration: 1.2, ease: "power2.out" }, 0);
      tl.fromTo(q(".s01-card"), { scale: 1.08 }, { scale: 1, duration: 0.25, ease: "back.out(2)" }, 0);
      sacudon(0.06, 1.2);
      tl.to(q(".s01-card"), { scale: 1.04, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3);
      tl.to(q(".s01-card"), { y: -900, opacity: 0, duration: 0.3, ease: "power3.in" }, LOCAL - 0.2);
      // pin de TU LOCAL
      gsap.set(q(".s01-pin"), { opacity: 0 });
      tl.fromTo(q(".s01-pin"), { opacity: 1, y: -500 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, LOCAL);
      pop(".s01-tulocal", LOCAL + 0.25);
      gsap.set(qa(".s01-radar ellipse"), { opacity: 0 });
      [".s01-r1", ".s01-r2"].forEach((s, i) => tl.fromTo(q(s), { scale: 0.4, opacity: 1, svgOrigin: "420 1000" }, { scale: 3, opacity: 0, svgOrigin: "420 1000", duration: 0.9, repeat: 4, ease: "power1.out", immediateRender: false }, LOCAL + 0.35 + i * 0.45));
      // la meteoróloga entra
      entra(".s01-met", 0.9, { x: 500 });
      tl.to(q(".s01-met"), { y: 8, duration: 0.45, yoyo: true, repeat: 9, ease: "sine.inOut" }, 1.3);
      habla(".s01-met-boca", 1.3, 4.4, "180 296");
      pop(".s01-dom", DOMINGO);
      // nube y lluvia de mensajes
      pop(".s01-nube", LLUEVEN - 0.25, { y: -80 });
      dibujar(".s01-rayo", LLUEVEN + 0.1, 0.25);
      tl.fromTo(q(".s01-nube"), { x: 0 }, { x: 14, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, LLUEVEN + 0.3);
      gsap.set(q(".s01-llueve"), { opacity: 0 });
      tl.to(q(".s01-llueve"), { opacity: 1, duration: 0.25 }, LLUEVEN);
      lluvia(".s01-lluvia", LLUEVEN, DUR);
      tl.fromTo(q(".s01-met-brazo"), { rotation: 0, svgOrigin: "84 430" }, { rotation: -28, svgOrigin: "84 430", duration: 0.3, ease: "back.out(2)", immediateRender: false }, LLUEVEN - 0.1);
      tl.to(q(".s01-dom"), { opacity: 0, duration: 0.2 }, SIN - 0.4);
      // sin paraguas
      golpe(".s01-paraguas", SIN, 2.2);
      dibujar(".s01-cruz", SIN + 0.12, 0.25);
      sacudon(SIN + 0.15);
"""
SFX = [{"t": 0.1, "sfx": "impact-bass-1", "vol": 0.42, "max": 0.8}, {"t": 1.2, "sfx": "pop", "vol": 0.3}, {"t": 1.5, "sfx": "ping", "vol": 0.22}, {"t": 2.32, "sfx": "click", "vol": 0.25}, {"t": 3.1, "sfx": "notification", "vol": 0.3}, {"t": 3.6, "sfx": "notification", "vol": 0.2}, {"t": 4.92, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}]
