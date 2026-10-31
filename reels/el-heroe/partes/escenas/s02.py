ID = "s02-villano"; DUR = 3.41
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s02-htc)" />
            """ + RAYOS("s02", "s02-rayos", 540, 1050, 40, 220, 900, "#111111", 8, 0.55) + """
            <g class="s02-puerta"><rect class="nn" x="120" y="700" width="230" height="760" transform="rotate(-18 120 1460)" /><circle cx="300" cy="1100" r="12" fill="#ffd23f" transform="rotate(-18 120 1460)" /></g>
            <g class="s02-vis"><g transform="translate(280 700) scale(1.3)">""" + VISTO("s02") + """</g></g>
"""
CSS = """
    $ .s02-nombre { position: absolute; left: 60px; top: 1290px; width: 960px; text-align: center; }
    $ .s02-nombre .ono { position: relative; display: inline-block; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s02") + VINETA("s02", "s02-v", 60, 560, 960, 940, "#2f6fe0", DENTRO) + """
          """ + ESTALLIDO("s02-est", 250, 760, 170, 12, "#ffd23f") + """
        </svg>
        """ + ONO("s02-bam", "¡BAM!", 130, 690, 130, "#e63946", -12) + """
        """ + CAJA("s02-cap", "EL VILLANO YA ENTRÓ...", 520, 590, 44, "#ffd23f", "#111111", 3) + """
        <div class="s02-nombre"><div class="ono s02-n" style="font-size:210px;color:#4fc3ff;transform:rotate(-4deg)">EL VISTO</div></div>
"""
JS = """
      const VILLANO = 0.19, ENTRO = 0.86, VISTO = 2.44;
      // patada a la puerta
      tl.fromTo(q(".s02-puerta"), { rotation: 18, svgOrigin: "120 1460" }, { rotation: -40, svgOrigin: "120 1460", duration: 0.2, ease: "power4.out" }, 0.02);
      tl.fromTo(q(".s02-est"), { scale: 0.2, svgOrigin: "250 760" }, { scale: 1, svgOrigin: "250 760", duration: 0.15, ease: "back.out(2)" }, 0.02);
      golpe(".s02-bam", 0.12, 2.2);
      sacudon(0.1, 1.3);
      // entra el villano
      entra(".s02-vis", VILLANO, { x: 500, rotation: 10 }, 0.35);
      pop(".s02-cap", ENTRO, { rotation: 8 });
      tl.fromTo(q(".s02-rayos"), { opacity: 0.2 }, { opacity: 0.6, duration: 0.3 }, ENTRO);
      tl.fromTo(q(".s02-vis"), { scale: 1, transformOrigin: "540px 1300px" }, { scale: 1.08, transformOrigin: "540px 1300px", duration: 1.5, ease: "power1.inOut", immediateRender: false }, ENTRO);
      habla(".s02-boca", 1.57, 0.6, "200 316");
      // EL VISTO: los ojos brillan y cae el nombre
      tl.fromTo(q(".s02-ojos"), { filter: "drop-shadow(0 0 0 #4fc3ff)" }, { filter: "drop-shadow(0 0 18px #4fc3ff)", duration: 0.15, yoyo: true, repeat: 5, immediateRender: false }, VISTO - 0.1);
      golpe(".s02-n", VISTO, 2.8);
      sacudon(VISTO + 0.05, 1.4);
      tl.to([q(".s02-bam"), q(".s02-est")], { opacity: 0, scale: 0.6, duration: 0.2 }, 1.4);
"""
SFX = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 0.08, "sfx": "glitch-1", "vol": 0.22, "max": 0.4}, {"t": 0.2, "sfx": "whoosh", "vol": 0.3, "max": 0.6}, {"t": 2.4, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.9}, {"t": 2.45, "sfx": "notification", "vol": 0.3}]
