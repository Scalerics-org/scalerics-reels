ID = "s14-aplauso"; DUR = 3.00
CSS = """
    $ .s14-ap { position: absolute; left: 0; right: 0; top: 610px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 128px; line-height: 1; color: #ffb547; text-shadow: 0 8px 0 #ff3d6e; transform: rotate(-4deg); }
"""
confeti = "".join(f'<rect class="s14-cf" data-i="{i}" x="{(i * 137) % 1040 + 20}" y="{480 - (i * 53) % 300}" width="{14 + i % 3 * 5}" height="{28 + i % 4 * 5}" fill="{["#ffb547", "#ff3d6e", "#fff1dc", "#5ce611"][i % 4]}" />' for i in range(40))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s14", "s14-h1", 280, 280, 60, 520, 520, 1500, "#ffb547") + HAZ("s14", "s14-h2", 800, 800, 60, 520, 520, 1500, "#5ce611") + """
          <g class="s14-nico"><g transform="translate(60 820) scale(1.0)">""" + NICO("s14", tarjeta=False) + """</g>
            <g class="s14-mi"><circle class="b" cx="210" cy="1260" r="30" stroke-width="6" /></g>
            <g class="s14-md"><circle class="b" cx="300" cy="1260" r="30" stroke-width="6" /></g>
          </g>
          <g class="s14-ag"><g transform="translate(640 800) scale(1.0)">""" + AGENTE("s14") + """</g></g>
          """ + PUBLICO("s14", 1470, 2, 7) + """
          <g class="s14-confeti">""" + confeti + """</g>
        </svg>
        <div class="s14-ap">¡UN APLAUSO!</div>
"""
JS = """
      const APLAUSO = 1.30;
      habla(".s14-boca", 0, 1.9, "180 284");
      // Nico aplaude
      tl.fromTo(q(".s14-mi"), { x: -30 }, { x: 10, duration: 0.12, yoyo: true, repeat: 23, ease: "power2.in", immediateRender: false }, 0);
      tl.fromTo(q(".s14-md"), { x: 30 }, { x: -10, duration: 0.12, yoyo: true, repeat: 23, ease: "power2.in", immediateRender: false }, 0);
      // el agente hace la reverencia
      tl.fromTo(q(".s14-ag"), { rotation: 0, svgOrigin: "820 1350" }, { rotation: 14, svgOrigin: "820 1350", duration: 0.35, yoyo: true, repeat: 3, repeatDelay: 0.2, ease: "power2.inOut", immediateRender: false }, 0.3);
      // el público salta
      tl.fromTo(qa(".s14-c0"), { y: 0 }, { y: -26, duration: 0.15, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(qa(".s14-c1"), { y: -10 }, { y: -34, duration: 0.17, yoyo: true, repeat: 17, ease: "sine.inOut", immediateRender: false }, 0.05);
      tl.fromTo(qa(".s14-c2"), { y: -4 }, { y: -22, duration: 0.13, yoyo: true, repeat: 21, ease: "sine.inOut", immediateRender: false }, 0.1);
      golpe(".s14-ap", APLAUSO, 2.2);
      sacudon(APLAUSO + 0.04, 0.8);
      qa(".s14-cf").forEach((el, i) => tl.fromTo(el, { y: 0, rotation: 0, svgOrigin: el.getAttribute("x") + " " + el.getAttribute("y") }, { y: 1300 + (i % 5) * 60, rotation: 360 + i * 30, svgOrigin: el.getAttribute("x") + " " + el.getAttribute("y"), duration: 2.4 + (i % 4) * 0.2, ease: "none", immediateRender: false }, (i % 6) * 0.08));
"""
SFX = [{"t": 1.25, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 0.1, "sfx": "sparkle", "vol": 0.25}]
