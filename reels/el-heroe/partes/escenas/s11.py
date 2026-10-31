ID = "s11-reservala"; DUR = 3.11
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s11-hty)" />
            """ + RAYOS("s11", "s11-rayos", 540, 1050, 40, 200, 900, "#e63946", 7, 0.45) + """
            <g class="s11-c1"><g transform="translate(300 860) scale(1.2)">""" + CLIENTA("s11", True, "feliz") + """<g class="s11-o"><ellipse cx="181" cy="292" rx="30" ry="16" fill="#fdf6e3" /><ellipse class="s11-oo" cx="181" cy="292" rx="15" ry="19" fill="#e63946" stroke="#111111" stroke-width="5" /></g></g></g>
"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s11") + VINETA("s11", "s11-v", 60, 560, 960, 940, "#ffd23f", DENTRO) + """</svg>
        """ + ONO("s11-once", "¿A LAS ONCE?", 120, 640, 120, "#fdf6e3", -6) + """
        """ + ONO("s11-si", "¡SÍ!", 720, 960, 200, "#e63946", 10) + """
"""
JS = """
      const ONCE = 0.89, SI = 1.78;
      entra(".s11-c1", 0, { x: 300 }, 0.3);
      tl.fromTo(q(".s11-c1"), { scale: 1, transformOrigin: "50% 100%" }, { scale: 1.1, transformOrigin: "50% 100%", duration: 1.6, ease: "power2.out", immediateRender: false }, 0.3);
      golpe(".s11-once", ONCE, 2.2);
      tl.fromTo(q(".s11-oo"), { scaleY: 0.7, svgOrigin: "181 292" }, { scaleY: 1.15, svgOrigin: "181 292", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.05);
      // ¡sí, reservala!: la boca pasa a sonrisa y salta
      tl.to(q(".s11-o"), { opacity: 0, duration: 0.05 }, SI - 0.05);
      tl.fromTo(q(".s11-c1"), { y: 0 }, { y: -50, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out", immediateRender: false }, SI);
      golpe(".s11-si", SI + 0.05, 2.4);
      sacudon(SI + 0.08, 1.0);
      tl.fromTo(q(".s11-rayos"), { rotation: 0, svgOrigin: "540 1050" }, { rotation: 14, svgOrigin: "540 1050", duration: DUR, ease: "none" }, 0);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.85, "sfx": "pop", "vol": 0.3}, {"t": 1.8, "sfx": "chime", "vol": 0.3, "max": 1.0}, {"t": 1.82, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
