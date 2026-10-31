ID = "s08-tio"; DUR = 4.76
ARRIBA = """
            <rect x="60" y="560" width="960" height="500" fill="url(#s08-hty)" />
            <g class="s08-tio"><g transform="translate(70 560) scale(1.15)">""" + TIO("s08") + """</g></g>
"""
ENV = lambda x, y, r: f'<g transform="translate({x} {y}) rotate({r})"><rect x="-55" y="-36" width="110" height="72" fill="#fdf6e3" stroke="#111111" stroke-width="6" /><path d="M-55 -36 L0 8 L55 -36" fill="none" stroke="#111111" stroke-width="6" stroke-linejoin="round" /></g>'
CHAT = lambda x, y, r: f'<g transform="translate({x} {y}) rotate({r})"><rect x="-50" y="-30" width="100" height="60" rx="18" fill="#4fc3ff" stroke="#111111" stroke-width="6" /><path d="M-20 28 L-30 48 L0 28" fill="#4fc3ff" stroke="#111111" stroke-width="6" stroke-linejoin="round" /></g>'
pila = [ENV(380, 1290, -8), CHAT(500, 1270, 6), ENV(620, 1285, 10), CHAT(450, 1220, -12), ENV(560, 1210, 4), CHAT(680, 1220, 14), ENV(400, 1160, 12), CHAT(520, 1150, -6), ENV(640, 1150, -14), CHAT(470, 1090, 8), ENV(590, 1080, -4), CHAT(700, 1110, -10)]
ABAJO = """
            <rect x="60" y="1090" width="960" height="410" fill="url(#s08-htc)" />
            <g class="s08-pila">""" + "".join(f'<g class="s08-it s08-it{i}">{x}</g>' for i, x in enumerate(pila)) + """</g>
            <g class="s08-bandeja"><path class="r" d="M300 1330 L780 1330 L740 1450 L340 1450 Z" /><path class="l" d="M320 1360 H760" stroke-width="6" /></g>
"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s08") + VINETA("s08", "s08-v1", 60, 560, 960, 500, "#ffd23f", ARRIBA) + VINETA("s08", "s08-v2", 60, 1090, 960, 410, "#2f6fe0", ABAJO) + """</svg>
        """ + CAJA("s08-cap", "EL TÍO DEL CÓMIC DIJO:", 90, 586, 42, "#fdf6e3", "#111111", -2) + """
        """ + GLOBO("s08-g", 480, 640, 500, "Con un gran <b>local</b> viene una gran...", "izq", 46) + """
        """ + ONO("s08-band", "¡BANDEJA DE ENTRADA!", 70, 1120, 104, "#ffd23f", -4, 940) + """
"""
JS = """
      const TIO = 0.5, CON = 1.25, LOCAL = 1.91, VIENE = 2.54, BANDEJA = 3.16;
      entra(".s08-tio", 0, { x: -300 }, 0.3);
      pop(".s08-cap", 0.15, { rotation: -8 });
      habla(".s08-boca", 0.2, 3.9, "181 321");
      gsap.set(q(".s08-g"), { opacity: 0 });
      tl.fromTo(q(".s08-g"), { opacity: 0, scale: 0.4, transformOrigin: "0% 30%" }, { opacity: 1, scale: 1, transformOrigin: "0% 30%", duration: 0.28, ease: "back.out(2)", immediateRender: false }, CON - 0.1);
      tl.fromTo(q(".s08-tio"), { rotation: 0, svgOrigin: "277 1060" }, { rotation: 3, svgOrigin: "277 1060", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.4);
      // la bandeja y los mensajes que se apilan
      entra(".s08-bandeja", VIENE - 0.2, { y: 200 }, 0.3);
      qa(".s08-it").forEach((el, i) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 1, y: -700 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.in", immediateRender: false }, VIENE + i * 0.1); });
      golpe(".s08-band", BANDEJA + 0.05, 2.2);
      sacudon(BANDEJA + 0.08, 1.2);
      late(".s08-band", BANDEJA + 0.3, 3, 1.05, 0.13);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.15, "sfx": "pop", "vol": 0.3}, {"t": 2.5, "sfx": "notification", "vol": 0.25}, {"t": 2.8, "sfx": "notification", "vol": 0.25}, {"t": 3.1, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 3.2, "sfx": "notification", "vol": 0.3}]
