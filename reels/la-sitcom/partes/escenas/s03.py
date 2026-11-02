ID = "s03-sofi"; DUR = 3.85
CSS = """
    $ .s03-si { position: absolute; left: 90px; top: 560px; font-family: "Luckiest Guy", sans-serif; font-size: 180px; line-height: 1; color: #1fb5a8; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; transform: rotate(-8deg); white-space: nowrap; }
    $ .s03-tres { position: absolute; left: 560px; top: 1180px; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + NOCHE("s03", 0.65) + VENTANA("s03", 640, 580, 330, 380, noche=True) + """
          <path class="v" d="M150 1500 V900 C150 820 230 780 320 780 H760 C850 780 930 820 930 900 V1500 Z" />
          <path d="M210 1500 V920 M870 1500 V920" stroke="#24122f" stroke-width="6" opacity="0.5" />
          <rect class="c" x="280" y="1020" width="520" height="160" rx="60" />
          <g class="s03-sofi"><g transform="translate(300 760) scale(1.3)">""" + SOFI("s03") + """</g></g>
          <ellipse class="s03-luz" cx="740" cy="1000" rx="220" ry="200" fill="#5ce611" opacity="0.12" />
          <path class="t" d="M80 1250 C300 1190 780 1190 1000 1250 V1520 H80 Z" />
          <path d="M140 1300 C380 1250 700 1250 940 1300 M140 1380 C380 1330 700 1330 940 1380" stroke="#24122f" stroke-width="6" fill="none" opacity="0.4" stroke-linecap="round" />
        </svg>
        <div class="s03-si">¡SÍ!</div>
        """ + CARTEL("s03", "s03-tres", 300, 1350, "¿¡A LAS 3 AM!?", fondo="#d4581f", tinta="#fff4e0", fs=66, rot=6) + """
"""
JS = """
      const CONT = 1.39, TRES = 2.32;
      golpe(".s03-si", 0.05, 2.6); sacudon(0.1, 0.8);
      tl.fromTo(q(".s03-sofi"), { y: 40 }, { y: 0, duration: 0.35, ease: "back.out(2.4)", immediateRender: false }, 0);
      habla(".s03-boca", 0, 3.3, "180 294");
      tl.fromTo(q(".s03-luz"), { opacity: 0.08 }, { opacity: 0.2, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      tl.to(q(".s03-si"), { opacity: 0, scale: 0.7, duration: 0.25 }, CONT - 0.3);
      tl.fromTo(q(".s03-cel"), { rotation: 0, svgOrigin: "300 420" }, { rotation: -8, svgOrigin: "300 420", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, CONT);
      golpe(".s03-tres", TRES, 2.4); sacudon(TRES + 0.04, 1.0);
      zoom(TRES, 1.08, 0.5, "50%", "55%");
"""
SFX = [{"t": 0.0, "sfx": "pop", "vol": 0.35}, {"t": 2.28, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
