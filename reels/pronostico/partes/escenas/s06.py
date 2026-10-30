ID = "s06-refugia"; DUR = 5.00
CSS = """
    $ .s06-calle { position: absolute; left: 0; top: 0; width: 2200px; height: 1920px; }
    $ .s06-calle > svg { width: 2200px; }
    $ .s06-nopara { left: 560px; top: 580px; background: #f4f6fb; color: #061428; font-size: 70px; box-shadow: 8px 8px 0 #5ec8ff; }
    $ .s06-refugio { left: 120px; top: 600px; background: #ffd23f; color: #061428; font-size: 54px; box-shadow: 8px 8px 0 #ff8a1f; }
"""
HTML = """
        <div class="s06-calle">
          <svg viewBox="0 0 2200 1920" aria-hidden="true">
            <path d="M0 1330 H2200" stroke="#f4f6fb" stroke-width="6" opacity="0.6" />
            <path d="M0 1350 H2200" stroke="#5ec8ff" stroke-width="10" stroke-dasharray="80 60" opacity="0.6" />
            <g opacity="0.6">
              <rect x="40" y="790" width="560" height="540" fill="#14457a" stroke="#f4f6fb" stroke-width="7" />
              <path d="M20 790 L60 720 H580 L620 790 Z" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <rect x="90" y="850" width="300" height="300" fill="#061428" stroke="#f4f6fb" stroke-width="6" />
              <rect x="430" y="850" width="130" height="480" fill="#0b2547" stroke="#f4f6fb" stroke-width="6" />
              <text x="320" y="690" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="#f4f6fb">WALTER</text>
            </g>
            <g class="s06-otro">
              <rect x="1380" y="790" width="700" height="540" fill="#14457a" stroke="#f4f6fb" stroke-width="7" />
              <rect x="1430" y="850" width="380" height="330" fill="#ffd23f" opacity="0.35" stroke="#f4f6fb" stroke-width="7" />
              <path class="l" d="M1440 960 H1800 M1440 1070 H1800" stroke-width="5" />
              <rect x="1860" y="850" width="180" height="480" fill="#0b2547" stroke="#f4f6fb" stroke-width="7" />
              <rect x="1870" y="930" width="160" height="60" rx="8" fill="#ffd23f" />
              <text x="1950" y="972" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="#061428">ABIERTO</text>
              <path d="M1330 790 L1390 690 H2070 L2130 790 Z" fill="#ffd23f" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <path d="M1470 690 L1440 790 M1580 690 L1560 790 M1690 690 L1680 790 M1800 690 L1800 790 M1910 690 L1920 790 M2020 690 L2040 790" stroke="#061428" stroke-width="6" />
              <text x="1730" y="650" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="#ffd23f">EL DE ENFRENTE</text>
            </g>
          </svg>
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s06-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath></defs>
          <g class="s06-cli"><g transform="translate(-120 860) scale(0.85)">""" + CLIENTA("s06") + """
            <path class="y s06-campera" d="M70 220 C70 120 290 120 290 220 C250 180 110 180 70 220 Z" />
            <path class="l" d="M70 220 L40 380 M290 220 L320 380" stroke-width="16" />
          </g></g>
          <g clip-path="url(#s06-clip)">""" + lluvia("s06-lluvia", 55, -300, 1300, 420, 1000, 66, globos=0.45, vel=(900, 1200), esc=(1.0, 1.5), ang=14) + """</g>
        </svg>
        <div class="cartela s06-nopara">¡NO PARA!</div>
        <div class="cartela s06-refugio">SE REFUGIÓ ENFRENTE</div>
"""
JS = """
      const NOPARA = 0.09, CLIENTA = 1.81, EN = 3.00, ENFRENTE = 4.00;
      lluvia(".s06-lluvia", 0, DUR);
      tl.fromTo(q(".s06-calle"), { x: 60 }, { x: 0, duration: 1.2, ease: "power2.out" }, 0);
      golpe(".s06-nopara", NOPARA + 0.1, 2.2);
      sacudon(NOPARA + 0.12);
      tl.to(q(".s06-nopara"), { opacity: 0, y: -40, duration: 0.2 }, CLIENTA - 0.3);
      // la clienta cruza corriendo con la campera en la cabeza
      gsap.set(q(".s06-cli"), { opacity: 0 });
      tl.set(q(".s06-cli"), { opacity: 1 }, CLIENTA - 0.2);
      tl.fromTo(q(".s06-cli"), { x: 0 }, { x: 560, duration: 1.2, ease: "power1.inOut", immediateRender: false }, CLIENTA - 0.2);
      tl.fromTo(q(".s06-cli"), { y: 0 }, { y: -22, duration: 0.13, yoyo: true, repeat: 25, ease: "sine.inOut" }, CLIENTA - 0.2);
      // la cámara panea al de enfrente y ella entra bajo el toldo
      tl.to(q(".s06-calle"), { x: -1120, duration: 1.3, ease: "power2.inOut" }, EN - 0.1);
      tl.to(q(".s06-cli"), { x: 760, duration: 1.3, ease: "power2.inOut" }, EN - 0.1);
      tl.fromTo(q(".s06-otro"), { opacity: 0.7 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, ENFRENTE - 0.3);
      golpe(".s06-refugio", ENFRENTE, 2);
      sacudon(ENFRENTE + 0.05);
"""
SFX = [{"t": 0.12, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}, {"t": 1.7, "sfx": "whoosh", "vol": 0.22}, {"t": 2.9, "sfx": "whoosh-cinematic", "vol": 0.2, "max": 1.0}, {"t": 4.0, "sfx": "pop", "vol": 0.32}]
