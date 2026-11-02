ID = "s08-ochenta"; DUR = 3.49
CSS = """
    $ .s08-num { position: absolute; left: 0; right: 0; top: 520px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 460px; line-height: 1; color: #f0b429; -webkit-text-stroke: 14px #24122f; paint-order: stroke fill; text-shadow: 0 18px 0 #24122f; }
    $ .s08-rapido { position: absolute; left: 600px; top: 1010px; }
"""
GOTAS = "".join(f'<circle class="s08-gota" cx="{x}" cy="{y}" r="{r}" fill="#7a3a1c" stroke="#24122f" stroke-width="4" />' for x, y, r in [(760, 880, 18), (820, 840, 12), (700, 830, 14), (860, 900, 10), (790, 790, 9)])
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-rayos">""" + "".join(f'<path d="M540 1100 L{540 + 1400 * __import__("math").cos(k * 0.3927):.0f} {1100 + 1400 * __import__("math").sin(k * 0.3927):.0f} L{540 + 1400 * __import__("math").cos(k * 0.3927 + 0.2):.0f} {1100 + 1400 * __import__("math").sin(k * 0.3927 + 0.2):.0f} Z" fill="#d4581f" opacity="0.35" />' for k in range(16)) + """</g>
        </svg>
        <div class="s08-num">¡80!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-du"><g transform="translate(130 860) scale(1.35)">""" + DUENO("s08", "susto", brazos="arriba") + """</g></g>
          <g class="s08-taza"><path class="y" d="M700 960 H780 L772 1060 H708 Z" stroke-width="6" transform="rotate(-30 740 1010)" /></g>
          """ + GOTAS + """
          <g class="s08-ag"><g transform="translate(760 1150) scale(0.55)">""" + AGENTE("s08", "feliz") + """</g></g>
        </svg>
        """ + CARTEL("s08", "s08-contestale", 70, 1180, "¡CONTESTALE VOS!", fondo="#1fb5a8", tinta="#fff4e0", fs=60, rot=-6) + """
        """ + CARTEL("s08", "s08-rapido", 560, 1450, "¡SOS RÁPIDO!", fondo="#f0b429", fs=52, rot=5) + """
"""
JS = """
      const CONT = 0.85, RAP = 2.45;
      golpe(".s08-num", 0.02, 2.6); sacudon(0.08, 1.4);
      tl.fromTo(q(".s08-rayos"), { rotation: 0, svgOrigin: "540 1100" }, { rotation: 18, svgOrigin: "540 1100", duration: DUR, ease: "none", immediateRender: false }, 0);
      tl.fromTo(q(".s08-du"), { y: 50 }, { y: 0, duration: 0.3, ease: "back.out(2.6)", immediateRender: false }, 0);
      habla(".s08-boca", 0, 3.0, "180 290");
      tl.fromTo(q(".s08-taza"), { y: 0, rotation: 0, svgOrigin: "740 1010" }, { y: -60, rotation: -120, svgOrigin: "740 1010", duration: 0.6, ease: "power2.out", immediateRender: false }, 0.05);
      qa(".s08-gota").forEach((g, i) => tl.fromTo(g, { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: (i - 2) * 40, y: -80 - i * 20, duration: 0.5, ease: "power2.out", immediateRender: false }, 0.1 + i * 0.03));
      qa(".s08-gota").forEach((g, i) => tl.to(g, { y: 400, opacity: 0, duration: 0.7, ease: "power2.in" }, 0.65 + i * 0.03));
      tl.to(q(".s08-num"), { scale: 0.7, y: -40, duration: 0.3, ease: "power2.inOut" }, CONT - 0.2);
      golpe(".s08-contestale", CONT, 2.4); sacudon(CONT + 0.04, 0.8);
      tl.fromTo([q(".s08-du-bi"), q(".s08-du-bd")], { rotation: -8, svgOrigin: "180 420" }, { rotation: 8, svgOrigin: "180 420", duration: 0.12, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, 0.3);
      golpe(".s08-rapido", RAP, 2.2);
      tl.fromTo(q(".s08-ag"), { y: 0 }, { y: -20, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, RAP);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}, {"t": 0.82, "sfx": "pop", "vol": 0.3}, {"t": 2.42, "sfx": "pop", "vol": 0.28}]
