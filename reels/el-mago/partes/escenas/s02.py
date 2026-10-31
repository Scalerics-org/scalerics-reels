ID = "s02-noches"; DUR = 4.39
CSS = """
    $ .s02-ventana { position: absolute; left: 90px; top: 600px; width: 900px; height: 640px; border: 7px solid #e6e8f0; border-radius: 30px; background: #120822; overflow: hidden; }
    $ .s02-hora { position: absolute; left: 130px; top: 640px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.2em; color: #45dcf0; }
    $ .s02-tecla { position: absolute; top: 1262px; width: 300px; padding: 22px 0 18px; text-align: center; border: 7px solid #e6e8f0; border-radius: 22px; background: #2b1250; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; color: #e6e8f0; box-shadow: 0 12px 0 #0a0610; }
    $ .s02-k1 { left: 190px; } $ .s02-k2 { left: 590px; }
    $ .s02-todas { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 96px; line-height: 1; color: #ff4fa3; text-transform: uppercase; text-shadow: 0 0 26px rgba(255, 79, 163, 0.5); }
    $ .s02-dias { position: absolute; left: 110px; top: 1420px; width: 860px; display: flex; justify-content: space-between; }
    $ .s02-dias span { padding: 8px 12px 6px; border: 4px solid #e6e8f0; border-radius: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: #e6e8f0; background: #0a0610; }
"""
HTML = """
        <div class="s02-ventana"></div>
        <div class="s02-hora">23:47 · TU LOCAL</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s02-noche">
            <path class="s" d="M880 700 C840 700 820 740 830 780 C840 820 890 840 920 820 C880 820 850 790 855 750 C858 725 870 708 880 700 Z" stroke-width="5" />
            """ + DESTELLOS("s02", "s02-ne", [(780, 690, 12), (950, 760, 10)]) + """
            <g class="s02-dueno"><g transform="translate(370 640) scale(0.95)">""" + DUENO("s02", telefono=False) + """</g></g>
            <path class="haz" d="M420 1000 L660 1000 L620 780 L460 780 Z" fill="#45dcf0" />
            <path class="k" d="M320 960 L760 960 L770 1150 L310 1150 Z" />
            <path class="cl s02-lineas" d="M500 1040 C520 1020 560 1020 580 1040 C560 1060 520 1060 500 1040 Z" stroke-width="6" />
            <path class="b" d="M180 1150 L900 1150 L900 1200 L180 1200 Z" />
          </g>
          <g class="s02-mago"><g transform="translate(234 620) scale(1.7)">""" + MAGO("s02", varita=False) + """</g></g>
        </svg>
        <div class="s02-tecla s02-k1">CTRL C</div>
        <div class="s02-tecla s02-k2">CTRL V</div>
        <div class="s02-todas">Todas las noches</div>
        <div class="s02-dias"><span>LUN</span><span>MAR</span><span>MIÉ</span><span>JUE</span><span>VIE</span><span>SÁB</span><span>DOM</span></div>
"""
JS = """
      const NO = 0.57, ESO = 1.21, HACES = 1.70, TODAS = 2.80, NOCHES = 3.22;
      // el mago se da cuenta: se le cae la ceja y mira a cámara
      tl.fromTo(q(".s02-mago"), { scale: 1.08, svgOrigin: "540 1540" }, { scale: 1, svgOrigin: "540 1540", duration: 0.5, ease: "power2.out" }, 0);
      habla(".s02-boca", 0, 1.0, "180 302");
      tl.to(q(".s02-ceja"), { y: 12, rotation: 8, svgOrigin: "180 205", duration: 0.2 }, NO);
      tl.to(q(".s02-galera"), { rotation: -8, svgOrigin: "180 172", duration: 0.25, ease: "back.out(2)" }, NO);
      // la escena de todas las noches
      gsap.set([q(".s02-ventana"), q(".s02-hora"), q(".s02-noche")], { opacity: 0 });
      tl.to(q(".s02-mago"), { x: -1100, duration: 0.3, ease: "power3.in" }, ESO - 0.2);
      tl.fromTo([q(".s02-ventana"), q(".s02-hora"), q(".s02-noche")], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, ESO);
      dibujar(".s02-lineas", ESO + 0.2, 0.5);
      destello(".s02-ne path", ESO + 0.3, 2);
      pop(".s02-k1", HACES); pop(".s02-k2", HACES + 0.25);
      [0, 1, 2, 3].forEach((k) => {
        tl.to(q(k % 2 ? ".s02-k2" : ".s02-k1"), { y: 12, duration: 0.07, yoyo: true, repeat: 1 }, HACES + 0.5 + k * 0.22);
        tl.to(q(".s02-dueno"), { y: k % 2 ? 0 : 8, duration: 0.1 }, HACES + 0.5 + k * 0.22);
      });
      tl.to([q(".s02-k1"), q(".s02-k2")], { opacity: 0, y: 40, duration: 0.2 }, TODAS - 0.15);
      golpe(".s02-todas", TODAS, 2.2);
      sacudon(TODAS + 0.04, 0.8);
      gsap.set(qa(".s02-dias span"), { opacity: 0 });
      tl.fromTo(qa(".s02-dias span"), { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.12, stagger: 0.09, ease: "power3.in", immediateRender: false }, NOCHES);
"""
SFX = [{"t": 0.55, "sfx": "click-soft", "vol": 0.25}, {"t": 1.2, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.7, "sfx": "key-press", "vol": 0.35}, {"t": 2.2, "sfx": "typing", "vol": 0.25, "max": 0.6}, {"t": 2.8, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.7}, {"t": 3.25, "sfx": "click", "vol": 0.22}]
