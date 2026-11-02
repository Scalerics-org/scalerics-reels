ID = "s07-manana"; DUR = 5.77
CSS = """
    $ .s07-audio { position: absolute; left: 90px; top: 720px; width: 900px; height: 200px; background: #fff4e0; border: 7px solid #24122f; border-radius: 34px; border-bottom-left-radius: 8px; box-shadow: 0 10px 0 #24122f; }
    $ .s07-audio svg { position: absolute; left: 0; top: 0; width: 900px; height: 200px; overflow: visible; }
    $ .s07-nom { position: absolute; left: 210px; top: 26px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; color: #1fb5a8; white-space: nowrap; }
    $ .s07-80 { position: absolute; left: 330px; top: 960px; padding: 16px 30px 8px; background: #d4581f; color: #fff4e0; border: 7px solid #24122f; border-radius: 20px; box-shadow: 0 10px 0 #24122f; font-family: "Luckiest Guy", sans-serif; font-size: 84px; line-height: 1; white-space: nowrap; transform: rotate(5deg); }
"""
ONDA = "".join(f'<rect class="s07-b" x="{300 + k * 22}" y="{110 - h / 2}" width="12" height="{h}" rx="6" fill="#24122f" />' for k, h in enumerate([20, 44, 70, 36, 90, 60, 30, 76, 50, 24, 64, 86, 40, 22, 56, 74, 30, 48, 20, 38, 60, 28, 18, 44]))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + VENTANA("s07", 120, 560, 300, 320, noche=False) + """
          <g class="s07-heladera"><rect class="c" x="800" y="560" width="250" height="900" rx="40" /><path class="l" d="M800 860 H1050" /><path class="l" d="M830 640 V760 M830 900 V1040" stroke-width="10" />
            <circle class="o" cx="960" cy="660" r="20" stroke-width="5" /><rect class="t" x="900" y="940" width="70" height="50" rx="8" stroke-width="5" /></g>
          <g class="s07-du"><g transform="translate(60 820) scale(1.0)">""" + DUENO("s07", "cansado", taza=True) + """</g></g>
          <rect class="y" x="-20" y="1300" width="840" height="60" rx="10" />
          <rect class="o" x="0" y="1356" width="800" height="150" />
          <path class="l" d="M260 1370 V1490 M540 1370 V1490" />
          <g class="s07-ag"><g transform="translate(470 1000) scale(0.55)">""" + AGENTE("s07", "feliz", brazo="saluda") + """</g></g>
        </svg>
        """ + CARTEL("s07", "s07-manana", 60, 560, "A LA MAÑANA...", fondo="#1fb5a8", tinta="#fff4e0", fs=60, rot=-5) + """
        <div class="s07-audio">
          <svg viewBox="0 0 900 200" aria-hidden="true">
            <g transform="translate(36 10) scale(0.9)">""" + GRACIELA("s07") + """</g>
            <path class="s07-play" d="M232 80 L232 140 L282 110 Z" fill="#1fb5a8" stroke="#24122f" stroke-width="5" stroke-linejoin="round" />
            """ + ONDA + """
          </svg>
          <div class="s07-nom">Graciela · colegio</div>
        </div>
        <div class="s07-80">¡80 CAMPERAS!</div>
"""
JS = """
      const NOM = 0.6, OCHENTA = 2.64, HABLAMOS = 4.74;
      golpe(".s07-manana", 0.02, 2.2);
      tl.fromTo(q(".s07-du"), { y: 20 }, { y: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, 0);
      tl.fromTo(q(".s07-vapor"), { y: 0, opacity: 0.6 }, { y: -16, opacity: 0.2, duration: 0.8, yoyo: true, repeat: 6, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(q(".s07-audio"), { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }, 0.15);
      // la onda del audio se mueve mientras habla
      qa(".s07-b").forEach((b, i) => tl.fromTo(b, { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.35, transformOrigin: "50% 50%", duration: 0.16 + (i % 4) * 0.03, yoyo: true, repeat: 25, ease: "sine.inOut", immediateRender: false }, 0.3));
      tl.fromTo(q(".s07-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, NOM);
      golpe(".s07-80", OCHENTA, 2.6); sacudon(OCHENTA + 0.04, 1.0);
      tl.to(q(".s07-taza"), { rotation: -18, svgOrigin: "290 470", duration: 0.2, ease: "back.out(3)" }, OCHENTA + 0.05);
      tl.fromTo(q(".s07-audio"), { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, HABLAMOS);
"""
SFX = [{"t": 0.1, "sfx": "notification", "vol": 0.32}, {"t": 2.6, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 4.7, "sfx": "pop", "vol": 0.25}]
