ID = "s13-tres-horas"; DUR = 4.78
CSS = """
    $ .s13-libres { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; line-height: 0.95; color: #5ce611; text-transform: uppercase; text-shadow: 0 0 30px rgba(92, 230, 17, 0.5); }
    $ .s13-libres small { display: block; font-size: 64px; color: #e6e8f0; text-shadow: none; }
    $ .s13-preg { position: absolute; left: 820px; top: 880px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; color: #ff4fa3; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-dueno"><g transform="translate(-40 850) scale(1.15)">""" + DUENO("s13", telefono=False) + """
            <path class="s s13-sonrisa" d="M150 282 C164 314 198 314 212 282 Z" stroke-width="5" />
          </g></g>
          <g class="s13-mago"><g transform="translate(1120 850) scale(-1.15 1.15)">""" + MAGO("s13m", varita=False) + """</g></g>
          """ + RELOJ("s13", "s13-rel", 540, 1000, 110, 9, 0) + """
          """ + HUMO("s13", "s13-puf", 540, 1000, 1.2) + """
          """ + DESTELLOS("s13", "s13-d", [(420, 900, 26), (660, 920, 30), (540, 1140, 22), (430, 1110, 18)], "#ff4fa3") + """
        </svg>
        <div class="s13-libres"><small>¿Y ahora qué hago con</small>tres horas?</div>
        <div class="s13-preg">?</div>
"""
JS = """
      const TRES = 0.91, HORAS = 1.22, NI = 1.78, YO = 2.62, HAGO = 3.22, DESAP = 3.39;
      tl.fromTo(q(".s13-dueno"), { x: -300 }, { x: 0, duration: 0.3, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s13-mago"), { x: 300 }, { x: 0, duration: 0.3, ease: "back.out(1.4)" }, 0.1);
      gsap.set(q(".s13-boca"), { opacity: 0 });
      tl.fromTo(q(".s13-sonrisa"), { scaleY: 1, svgOrigin: "181 290" }, { scaleY: 0.6, svgOrigin: "181 290", duration: 0.12, yoyo: true, repeat: 11, immediateRender: false }, 0);
      tl.fromTo(q(".s13-dueno"), { rotation: 0, svgOrigin: "150 1500" }, { rotation: 3, svgOrigin: "150 1500", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.3);
      golpe(".s13-libres", TRES, 2.0);
      pop(".s13-rel", HORAS - 0.1);
      tl.fromTo(q(".s13-aguja-m"), { rotation: 0, svgOrigin: "540 1000" }, { rotation: 360, svgOrigin: "540 1000", duration: 2.0, ease: "none", immediateRender: false }, HORAS);
      // el mago: "ni idea" (se encoge de hombros)
      habla(".s13m-boca", NI, 1.8, "180 302");
      tl.fromTo(q(".s13-mago"), { y: 0 }, { y: -26, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, NI);
      pop(".s13-preg", NI + 0.05);
      tl.to(q(".s13m-ceja"), { y: -12, duration: 0.2 }, NI);
      // ¡puf! las hace desaparecer
      tl.to(q(".s13m-brazo"), { rotation: 40, svgOrigin: "276 418", duration: 0.2, ease: "back.out(2)" }, HAGO - 0.1);
      puf(".s13-puf", DESAP - 0.05);
      tl.to(q(".s13-rel"), { opacity: 0, scale: 0.2, svgOrigin: "540 1000", duration: 0.2 }, DESAP);
      tl.to(q(".s13-libres"), { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in" }, DESAP);
      destello(".s13-d path", DESAP + 0.1, 2);
      tl.to(q(".s13-preg"), { opacity: 0, duration: 0.2 }, DESAP);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 0.9, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.6}, {"t": 1.2, "sfx": "pop", "vol": 0.25}, {"t": 1.8, "sfx": "click-soft", "vol": 0.25}, {"t": 3.35, "sfx": "whoosh", "vol": 0.3}, {"t": 3.45, "sfx": "sparkle", "vol": 0.3}]
