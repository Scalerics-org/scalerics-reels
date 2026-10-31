ID = "s16-cta"; DUR = 8.2
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s16-htn)" />
            """ + RAYOS("s16", "s16-rayos", 540, 1050, 48, 220, 1000, "#ffd23f", 7, 0.4) + """
            <g class="s16-ag"><g transform="translate(410 760) scale(1.0)">""" + AGENTE("s16", "arriba") + """</g></g>
"""
CSS = """
    $ .s16-sc { position: absolute; left: 60px; top: 1300px; width: 960px; text-align: center; }
    $ .s16-sc .caja { position: relative; display: inline-block; font-size: 64px; background: #111111; color: #fdf6e3; border-color: #5ce611; box-shadow: 8px 8px 0 #5ce611; }
    $ .s16-sc b { color: #5ce611; font-weight: 400; }
    $ .s16-et { position: absolute; left: 60px; top: 1090px; width: 960px; text-align: center; }
    $ .s16-et .ono { position: relative; display: inline-block; }
    $ .s16-arroba { position: absolute; left: 830px; top: 880px; width: 150px; height: 150px; border-radius: 50%; background: #e63946; border: 7px solid #111111; box-shadow: 8px 8px 0 #111111; font-family: "Bangers"; font-size: 120px; line-height: 150px; text-align: center; color: #fdf6e3; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s16") + VINETA("s16", "s16-v", 60, 560, 960, 940, "#14214a", DENTRO) + """</svg>
        """ + CAJA("s16-cont", "CONTINUARÁ... EN TU LOCAL", 90, 590, 48, "#ffd23f", "#111111", -3) + """
        <div class="s16-sc"><div class="caja">LO ARMAMOS EN <b>SCALERICS</b></div></div>
        <div class="s16-et"><div class="ono s16-e" style="font-size:96px;color:#ffd23f;transform:rotate(-3deg)">¡ETIQUETÁ AL QUE<br>NECESITA UN HÉROE!</div></div>
        <div class="s16-arroba">@</div>
"""
JS = """
      const ARMAMOS = 1.32, SCALERICS = 1.89, ETIQUETA = 2.92, HEROE = 4.44;
      gsap.set(q(".s16-ag"), { opacity: 0 });
      tl.fromTo(q(".s16-ag"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, 0);
      pop(".s16-cont", 0.2, { rotation: -10 });
      tl.fromTo(q(".s16-rayos"), { rotation: 0, svgOrigin: "540 1050" }, { rotation: 20, svgOrigin: "540 1050", duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".s16-abr1"), { rotation: 0, svgOrigin: "28 250" }, { rotation: 8, svgOrigin: "28 250", duration: 0.35, yoyo: true, repeat: 21, ease: "sine.inOut", immediateRender: false }, 0.4);
      golpe(".s16-sc .caja", SCALERICS, 1.8);
      sacudon(SCALERICS + 0.05, 0.6);
      // etiquetá: el agente sube y entra el llamado
      tl.to(q(".s16-ag"), { y: -150, scale: 0.85, svgOrigin: "540 1100", duration: 0.35, ease: "power2.out" }, ETIQUETA - 0.2);
      golpe(".s16-e", ETIQUETA, 2.0);
      sacudon(ETIQUETA + 0.05, 1.0);
      pop(".s16-arroba", ETIQUETA + 0.3, { rotation: -40 });
      late(".s16-arroba", HEROE, 6, 1.12, 0.18);
      late(".s16-e", HEROE + 0.2, 5, 1.04, 0.2);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.2, "sfx": "pop", "vol": 0.25}, {"t": 1.85, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.9, "sfx": "chime", "vol": 0.28, "max": 1.0}, {"t": 2.9, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.7}, {"t": 3.25, "sfx": "notification", "vol": 0.3}]
