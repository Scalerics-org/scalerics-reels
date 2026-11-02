ID = "s05-susto"; DUR = 2.67
CSS = """
    $ .s05-quien { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 130px; line-height: 1; color: #f0b429; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; white-space: nowrap; }
    $ .s05-living { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; }
    $ .s05-living span { display: inline-block; padding: 14px 30px 8px; background: #d4581f; color: #fff4e0; border: 6px solid #24122f; border-radius: 18px; box-shadow: 0 8px 0 #24122f; font-family: "Luckiest Guy", sans-serif; font-size: 70px; transform: rotate(-4deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + NOCHE("s05", 0.55) + """
          <rect class="b" x="262" y="700" width="556" height="800" />
          <path class="s05-luz" d="M300 718 H780 L1000 1500 H80 Z" fill="#f0b429" opacity="0.18" />
          <g class="s05-du"><g transform="translate(330 790) scale(1.15)">""" + DUENO("s05", "susto", brazos="arriba", chancleta=True) + """</g></g>
          <rect class="b" x="240" y="680" width="600" height="30" />
          <rect class="b" x="240" y="680" width="30" height="820" /><rect class="b" x="810" y="680" width="30" height="820" />
          <g class="s05-hoja"><rect class="t" x="820" y="700" width="200" height="800" rx="6" /><circle class="y" cx="850" cy="1110" r="16" stroke-width="5" /></g>
          <path class="lc s05-rayas" d="M200 820 L140 780 M190 920 L110 920 M200 1020 L140 1060 M880 820 L940 780 M890 920 L970 920 M880 1020 L940 1060" stroke="#f0b429" stroke-width="10" />
        </svg>
        <div class="s05-quien">¿QUIÉN ANDA?</div>
        <div class="s05-living"><span>¡HAY ALGUIEN!</span></div>
"""
JS = """
      const HAY = 1.13, LIV = 1.73;
      // la puerta se abre de golpe y aparece el dueño (arranca ya abierta a medias)
      tl.fromTo(q(".s05-hoja"), { scaleX: 1.6, svgOrigin: "1020 1100" }, { scaleX: 1, svgOrigin: "1020 1100", duration: 0.25, ease: "power3.out", immediateRender: false }, 0);
      tl.fromTo(q(".s05-du"), { y: 60 }, { y: 0, duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, 0.02);
      golpe(".s05-quien", 0.15, 2.4); sacudon(0.2, 1.2);
      habla(".s05-boca", 0, 2.4, "180 290");
      tl.fromTo(q(".s05-chancleta"), { rotation: -20, svgOrigin: "304 262" }, { rotation: 25, svgOrigin: "304 262", duration: 0.14, yoyo: true, repeat: 13, ease: "sine.inOut", immediateRender: false }, 0.3);
      dibujar(".s05-rayas", 0.1, 0.3);
      tl.fromTo(q(".s05-pelo"), { scaleY: 1, svgOrigin: "180 200" }, { scaleY: 1.12, svgOrigin: "180 200", duration: 0.1, yoyo: true, repeat: 9, ease: "none", immediateRender: false }, 0.2);
      golpe(".s05-living", HAY, 2.2); sacudon(HAY + 0.04, 0.8);
      zoom(LIV, 1.1, 0.3, "50%", "55%");
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 0.12, "sfx": "glitch-1", "vol": 0.2, "max": 0.4}, {"t": 1.1, "sfx": "pop", "vol": 0.3}]
