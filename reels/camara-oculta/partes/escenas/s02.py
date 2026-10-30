exec(PJ)
ID = "s02-fede"; DUR = 4.18
CSS = """
    $ .s02-nombre { left: 90px; top: 640px; background: #ff3b30; color: #fbf7ea; font-size: 80px; transform: rotate(-5deg); }
    $ .s02-cartel { left: 560px; top: 610px; font-size: 40px; line-height: 1.05; text-align: center; transform: rotate(4deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- la parada -->
          <g class="s02-parada">
            <path class="l s02-p" d="M150 1400 V720" stroke-width="10" />
            <rect class="y s02-pc" x="80" y="740" width="140" height="110" rx="12" />
            <text x="150" y="808" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="#0c0c0c" class="s02-pc">PARADA</text>
            <path class="l s02-p" d="M60 1330 H330" opacity="0.5" />
          </g>
          <!-- globo de pensamiento con un chorizo -->
          <g class="s02-globo">
            <circle class="l" cx="760" cy="880" r="16" /><circle class="l" cx="730" cy="935" r="10" />
            <ellipse class="k" cx="820" cy="780" rx="170" ry="110" />
            <g class="s02-chori"><path class="r" d="M700 790 C700 740 940 740 940 790 C940 830 700 830 700 790 Z" /><path class="l" d="M760 770 L775 800 M810 768 L825 800 M860 770 L875 800" stroke-width="5" /></g>
          </g>
          {fede("s02", 540, 1410, 1.25, "o")}
          <!-- panza que ruge -->
          <path class="yl s02-ruge" d="M400 1300 C380 1280 380 1250 400 1230 M680 1300 C700 1280 700 1250 680 1230 M370 1320 C340 1290 340 1240 370 1210 M710 1320 C740 1290 740 1240 710 1210" />
          <path class="rl s02-flecha" d="M300 760 C340 820 380 860 430 880 M400 840 L432 882 L382 892" />
        </svg>
        <div class="cartela s02-nombre">Fede</div>
        <div class="cartela s02-cartel">Parrilla<br>Don Tito</div>
"""
JS = """
      const FEDE = 0.3, HAMBRE = 1.27, PARRILLA = 2.64, TITO = 3.27;
      // cuadro 0: Fede ya está, la cámara lo encuentra
      tl.fromTo(q(".s02-fede"), { scale: 1.12, svgOrigin: "540 1100" }, { scale: 1, svgOrigin: "540 1100", duration: 0.4, ease: "power3.out" }, 0);
      dibujar(".s02-p", 0, 0.4);
      pop(".s02-pc", 0.1);
      // mira el celular, se balancea
      tl.to(q(".s02-fede"), { y: 6, duration: 0.35, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.4);
      golpe(".s02-nombre", FEDE, 2.2);
      dibujar(".s02-flecha", FEDE + 0.1, 0.3);
      // hambre: la panza ruge y aparece el globo con el chorizo
      dibujar(".s02-ruge", HAMBRE, 0.25);
      tl.to(q(".s02-ruge"), { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 5 }, HAMBRE + 0.3);
      tl.to(q(".s02-ruge"), { opacity: 0, duration: 0.15 }, PARRILLA);
      tl.to(q(".s02-fede"), { x: 8, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, HAMBRE);
      pop(".s02-globo", HAMBRE + 0.15);
      tl.to(q(".s02-chori"), { rotation: -6, svgOrigin: "820 790", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, HAMBRE + 0.4);
      tl.to(q(".s02-cejas, .s02-fede-cejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 1 }, HAMBRE);
      // parrilla de Don Tito
      tl.to([q(".s02-nombre"), q(".s02-flecha")], { opacity: 0, duration: 0.15 }, PARRILLA - 0.2);
      tl.to(q(".s02-globo"), { opacity: 0, scale: 0.8, svgOrigin: "820 780", duration: 0.15 }, PARRILLA - 0.1);
      golpe(".s02-cartel", PARRILLA + 0.05, 2.4);
      tl.to(q(".s02-cartel"), { rotation: -3, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, TITO);
"""
SFX = [{"t": 0.3, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 1.27, "sfx": "glitch-1", "vol": 0.18, "max": 0.4}, {"t": 1.45, "sfx": "pop", "vol": 0.28}, {"t": 2.62, "sfx": "click", "vol": 0.3}, {"t": 3.27, "sfx": "pop", "vol": 0.22}]
