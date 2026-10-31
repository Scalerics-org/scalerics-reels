ID = "s12-quien"; DUR = 2.75
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s12-htc)" />
            """ + RAYOS("s12", "s12-rayos", 300, 1100, 44, 160, 900, "#111111", 8, 0.55) + """
            <g class="s12-vis"><g transform="translate(90 820) scale(1.15) rotate(-8 200 600)">""" + VISTO("s12", telefono=False) + """</g></g>
            <g class="s12-sombra"><g transform="translate(720 880) scale(1.05)">
              <rect x="20" y="36" width="220" height="370" rx="42" fill="#111111" />
              <path d="M28 250 C0 226 -14 188 -6 150 M232 250 C262 270 270 300 252 320 M96 396 L88 462 M164 396 L172 462" stroke="#111111" stroke-width="12" stroke-linecap="round" fill="none" />
              <circle cx="-6" cy="140" r="20" fill="#111111" />
              <path d="M54 176 C74 150 116 154 130 172 C144 154 186 150 206 176 C204 212 166 220 130 202 C94 220 56 212 54 176 Z" fill="#e63946" />
              <text x="130" y="330" text-anchor="middle" font-family="Bangers" font-size="120" fill="#ffd23f">?</text>
            </g></g>
"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s12") + VINETA("s12", "s12-v", 60, 560, 960, 940, "#2f6fe0", DENTRO) + """</svg>
        """ + ONO("s12-no", "¡NOOO!", 90, 600, 220, "#e63946", -8) + """
        """ + GLOBO("s12-g", 330, 780, 400, "¿<b>Quién</b> sos?", "abajo-izq", 60, "#fdf6e3") + """
"""
JS = """
      const NO = 0.0, QUIEN = 1.40;
      gsap.set(q(".s12-vis"), { opacity: 1 });
      tl.fromTo(q(".s12-vis"), { x: 60, rotation: 0, svgOrigin: "270 1500" }, { x: -10, rotation: -6, svgOrigin: "270 1500", duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s12-no"), { opacity: 0.4, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in" }, NO);
      sacudon(0.05, 1.6);
      tl.fromTo(q(".s12-vis"), { x: -16 }, { x: -4, duration: 0.05, yoyo: true, repeat: 13, ease: "none", immediateRender: false }, 0.35);
      habla(".s12-boca", 0.0, 1.0, "200 316");
      tl.fromTo(q(".s12-ojos"), { scale: 1, svgOrigin: "200 272" }, { scale: 1.4, svgOrigin: "200 272", duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, 0.1);
      // la sombra del héroe
      gsap.set(q(".s12-sombra"), { opacity: 0 });
      tl.fromTo(q(".s12-sombra"), { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, 0.9);
      gsap.set(q(".s12-g"), { opacity: 0 });
      tl.fromTo(q(".s12-g"), { opacity: 0, scale: 0.4, transformOrigin: "20% 100%" }, { opacity: 1, scale: 1, transformOrigin: "20% 100%", duration: 0.25, ease: "back.out(2)", immediateRender: false }, QUIEN - 0.05);
      tl.to(q(".s12-no"), { opacity: 0, y: -30, duration: 0.2 }, QUIEN - 0.2);
      habla(".s12-boca", QUIEN, 0.5, "200 316");
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 0.02, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}, {"t": 0.9, "sfx": "whoosh", "vol": 0.3, "max": 0.6}, {"t": 1.4, "sfx": "pop", "vol": 0.28}]
