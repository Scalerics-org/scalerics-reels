ID = "s04-carta"; DUR = 2.87
CSS = """
    $ .s04-cual { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; line-height: 1; color: #ff4fa3; text-transform: uppercase; text-shadow: 0 0 26px rgba(255, 79, 163, 0.5); }
"""
cartas = "".join(CARTA("s04", f"s04-c{i}", 540, 1060, 0, 1.25, l, p) for i, (l, p) in enumerate([("K", "pica"), ("Q", "corazon"), ("A", "pica"), ("J", "diamante"), ("7", "corazon")]))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s04", "", 540, 1480, 380, 60, 540) + """
          <g class="s04-mago"><g transform="translate(-30 1000) scale(1.0)">""" + MAGO("s04", varita=False) + """</g></g>
          <g class="s04-mano"><circle class="s" cx="540" cy="1250" r="40" /></g>
          """ + cartas + """
          """ + DESTELLOS("s04", "s04-d", [(330, 840, 22), (760, 820, 26), (840, 1100, 18), (260, 1080, 16)], "#ff4fa3") + """
        </svg>
        <div class="s04-cual">Cualquier carta</div>
"""
JS = """
      const CARTA = 0.70, CUAL = 1.52, CARTA2 = 2.09;
      const ANG = [-40, -20, 0, 20, 40];
      // las cartas se abren en abanico desde la mano
      ANG.forEach((a, i) => tl.fromTo(q(".s04-c" + i), { rotation: 0, svgOrigin: "540 1250" }, { rotation: a, svgOrigin: "540 1250", duration: 0.45, ease: "back.out(1.6)" }, 0));
      tl.fromTo(q(".s04-mago"), { x: -200 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s04-boca", 0, 2.6, "180 302");
      destello(".s04-d path", CARTA, 2);
      tl.to(q(".s04-ceja"), { y: -12, duration: 0.2, yoyo: true, repeat: 1 }, CARTA);
      golpe(".s04-cual", CUAL, 2.0);
      // la del medio sube
      tl.to(q(".s04-c2"), { y: -150, duration: 0.3, ease: "back.out(2)" }, CARTA2);
      tl.to(qa(".s04-c0, .s04-c1, .s04-c3, .s04-c4"), { opacity: 0.5, duration: 0.2 }, CARTA2);
      tl.to(q(".s04-c2"), { y: -130, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, CARTA2 + 0.3);
"""
SFX = [{"t": 0.02, "sfx": "whoosh-short", "vol": 0.3}, {"t": 0.15, "sfx": "click-soft", "vol": 0.25}, {"t": 0.7, "sfx": "sparkle", "vol": 0.28}, {"t": 1.5, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 2.1, "sfx": "pop", "vol": 0.28}]
