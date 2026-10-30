ID = "s01-concurso"; DUR = 5.89
CSS = """
    $ .s01-marq { position: absolute; left: 90px; top: 590px; width: 900px; height: 236px; border: 8px solid #f6c544; border-radius: 26px; background: #1c151c; text-align: center; }
    $ .s01-marq b { display: block; margin-top: 30px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1; color: #f6c544; letter-spacing: 0.02em; }
    $ .s01-marq small { display: block; margin-top: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: #fff3d6; }
    $ .s01-foco { position: absolute; width: 14px; height: 14px; border-radius: 50%; background: #f6c544; }
    $ .s01-card { position: absolute; left: 70px; top: 600px; width: 940px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; letter-spacing: -0.02em; }
    $ .s01-dejar { display: block; font-size: 128px; color: #fff3d6; }
    $ .s01-visto { display: block; font-size: 190px; color: #4fc3ff; text-shadow: 0 0 30px rgba(79, 195, 255, 0.55); }
    $ .s01-preg { position: absolute; left: 760px; top: 860px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 260px; color: #f6c544; line-height: 1; }
"""
focos = "".join(f'<div class="s01-foco s01-f{i % 2}" style="left:{100 + i * 68}px;top:{582 if i < 13 else 0}px"></div>' for i in range(13))
focos += "".join(f'<div class="s01-foco s01-f{i % 2}" style="left:{100 + i * 68}px;top:818px"></div>' for i in range(13))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s01", "s01-h", 540, 540, 60, 560, 0, 1480) + """
          """ + PISO("s01", 540, 1460, 360, 66) + """
          <g class="s01-maxi"><g transform="translate(333 820) scale(1.15)">""" + MAXI("s01") + """</g></g>
          """ + TILDES("s01", "s01-tt", 870, 1080, 2.0) + """
        </svg>
        <div class="s01-marqg"><div class="s01-marq"><b>CONCURSO DE TALENTOS</b><small>AUDICIONES</small></div>""" + focos + """</div>
        <div class="s01-preg">?</div>
        <div class="s01-card"><span class="s01-dejar">Dejar en</span><span class="s01-visto">visto</span></div>
"""
JS = """
      const CONCURSO = 1.10, SU = 2.65, DEJAR = 3.85, VISTO = 5.00;
      // cuadro 0: Maxi a media luz, el haz ya prendido
      gsap.set(q(".s01-maxi"), { opacity: 0.35 });
      tl.fromTo(q(".s01-maxi"), { scale: 0.96, svgOrigin: "540 1460" }, { scale: 1, svgOrigin: "540 1460", duration: 2.5, ease: "power1.out" }, 0);
      tl.fromTo(q(".s01-h"), { opacity: 0.05 }, { opacity: 0.12, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      // la marquesina
      golpe(".s01-marqg", CONCURSO, 1.8);
      sacudon(CONCURSO + 0.05);
      tl.fromTo(qa(".s01-f0"), { opacity: 1 }, { opacity: 0.2, duration: 0.18, yoyo: true, repeat: 15, ease: "steps(1)", immediateRender: false }, CONCURSO);
      tl.fromTo(qa(".s01-f1"), { opacity: 0.2 }, { opacity: 1, duration: 0.18, yoyo: true, repeat: 15, ease: "steps(1)", immediateRender: false }, CONCURSO);
      // ¿su talento?: se prende Maxi
      tl.to(q(".s01-maxi"), { opacity: 1, duration: 0.15 }, SU);
      tl.to(q(".s01-h"), { opacity: 0.2, duration: 0.15 }, SU);
      pop(".s01-preg", SU + 0.1);
      tl.to(q(".s01-preg"), { rotation: 12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, SU + 0.4);
      habla(".s01-boca", SU, 0.5, "182 291");
      // DEJAR EN VISTO
      tl.to(q(".s01-marqg"), { y: -500, opacity: 0, duration: 0.25, ease: "power3.in" }, DEJAR - 0.25);
      tl.to(q(".s01-preg"), { opacity: 0, scale: 0.5, duration: 0.2 }, DEJAR - 0.2);
      gsap.set(q(".s01-visto"), { opacity: 0 });
      golpe(".s01-card", DEJAR, 2.2);
      tl.fromTo(q(".s01-visto"), { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, VISTO - 0.12);
      tl.to(q(".s01-maxi"), { y: 90, duration: 0.3, ease: "power2.out" }, DEJAR);
      dibujar(".s01-tt path", VISTO, 0.3);
      sacudon(VISTO + 0.05, 1.3);
      tl.to(q(".s01-card"), { scale: 1.04, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, VISTO + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.8}, {"t": 1.08, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 1.2, "sfx": "sparkle", "vol": 0.25}, {"t": 2.7, "sfx": "pop", "vol": 0.3}, {"t": 3.82, "sfx": "whoosh-short", "vol": 0.3}, {"t": 5.0, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 5.05, "sfx": "notification", "vol": 0.3}]
