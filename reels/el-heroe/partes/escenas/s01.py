ID = "s01-portada"; DUR = 2.06
LOCAL = """
            <rect x="60" y="600" width="960" height="900" fill="url(#s01-htn)" />
            """ + RAYOS("s01", "s01-rayos", 540, 1000, 36, 260, 900, "#ffd23f", 6, 0.35) + """
            <g class="s01-local">
              <rect class="p" x="210" y="980" width="660" height="520" />
              <path class="y" d="M180 980 L900 980 L870 1080 L210 1080 Z" />
              <path d="M300 980 L280 1080 M420 980 L410 1080 M540 980 L540 1080 M660 980 L670 1080 M780 980 L800 1080" stroke="#e63946" stroke-width="44" />
              <path class="l" d="M180 980 L900 980 L870 1080 L210 1080 Z" />
              <rect class="r" x="290" y="890" width="500" height="90" />
              <text x="540" y="958" text-anchor="middle" font-family="Bangers" font-size="66" letter-spacing="4" fill="#fdf6e3" stroke="#111111" stroke-width="3" paint-order="stroke">CONFITERÍA</text>
              <rect class="c" x="260" y="1140" width="300" height="220" />
              <path d="M270 1150 L400 1150 L280 1300 Z" fill="#fdf6e3" opacity="0.5" />
              <rect class="nn" x="620" y="1130" width="190" height="370" />
              <circle cx="780" cy="1320" r="9" fill="#ffd23f" />
            </g>
            <g class="s01-sil"><g transform="translate(0 -24)"><circle cx="540" cy="690" r="56" fill="#fdf6e3" fill-opacity="0.15" stroke="#fdf6e3" stroke-width="7" stroke-dasharray="22 16" /><path d="M440 762 L640 762 L604 890 L476 890 Z M440 770 L384 836 L460 868 M640 770 L696 836 L620 868 M440 762 L356 890 M640 762 L724 890" fill="#fdf6e3" fill-opacity="0.12" stroke="#fdf6e3" stroke-width="7" stroke-dasharray="22 16" stroke-linejoin="round" /></g></g>
"""
CSS = """
    $ .s01-q { position: absolute; left: 470px; top: 620px; width: 140px; text-align: center; font-family: "Bangers"; font-size: 130px; line-height: 1; color: #ffd23f; -webkit-text-stroke: 10px #111111; paint-order: stroke fill; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s01") + VINETA("s01", "s01-v", 60, 560, 960, 940, "#14214a", LOCAL) + """
          """ + ESTALLIDO("s01-est", 540, 1260, 330, 16, "#ffd23f") + """
        </svg>
        <div class="s01-q">?</div>
        """ + CAJA("s01-se", "SE BUSCA", 90, 590, 52, "#fdf6e3", "#111111", -4) + """
        """ + ONO("s01-heroe", "¡HÉROE!", 140, 1150, 230, "#e63946", -7, 800) + """
"""
JS = """
      const HEROE = 1.17;
      // cuadro 0: la viñeta ya está, el local a medio dibujar
      tl.fromTo(q(".s01-v"), { scale: 1.08, transformOrigin: "540px 1030px" }, { scale: 1, transformOrigin: "540px 1030px", duration: 2, ease: "power1.out" }, 0);
      tl.fromTo(q(".s01-local"), { y: 60, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s01-rayos"), { rotation: 0, svgOrigin: "540 1000" }, { rotation: 8, svgOrigin: "540 1000", duration: 2, ease: "none" }, 0);
      dibujar(".s01-sil path", 0.05, 0.7);
      pop(".s01-q", 0.5);
      tl.to(q(".s01-q"), { rotation: 10, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.8);
      pop(".s01-se", 0.25, { rotation: -14 });
      // ¡HÉROE!
      gsap.set(q(".s01-est"), { opacity: 0 });
      tl.fromTo(q(".s01-est"), { opacity: 0, scale: 0.2, svgOrigin: "540 1260" }, { opacity: 1, scale: 1, svgOrigin: "540 1260", duration: 0.16, ease: "back.out(2)", immediateRender: false }, HEROE - 0.05);
      golpe(".s01-heroe", HEROE, 2.6);
      sacudon(HEROE + 0.05, 1.2);
      late(".s01-heroe", HEROE + 0.2, 2, 1.06, 0.12);
"""
SFX = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.8}, {"t": 0.5, "sfx": "pop", "vol": 0.3}, {"t": 1.12, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 1.15, "sfx": "sparkle", "vol": 0.25}]
