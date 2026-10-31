ID = "s07-no-da-mas"; DUR = 4.75
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s07-htp)" />
            """ + RAYOS("s07", "s07-rayos", 540, 1150, 40, 200, 900, "#e63946", 7, 0.45) + """
            <g class="s07-due"><g transform="translate(320 920) scale(1.2)">""" + DUENO("s07", "grito") + """</g></g>
"""
CAJA_REG = """<g class="s07-caja"><g transform="translate(760 640)">
              <path class="y" d="M20 120 L40 40 L190 40 L210 120 Z" /><rect class="k" x="70" y="56" width="90" height="40" /><text x="115" y="88" text-anchor="middle" font-family="Bangers" font-size="30" fill="#ffd23f">$</text>
              <rect class="y" x="0" y="120" width="230" height="110" /><rect class="p" x="20" y="190" width="190" height="26" />
              <path class="l" d="M40 140 H70 M90 140 H120 M140 140 H170 M40 165 H70 M90 165 H120 M140 165 H170" stroke-width="6" /></g></g>"""
PROV = """<g class="s07-prov"><g transform="translate(90 1150)">
              <rect class="y" x="0" y="80" width="200" height="140" /><path class="l" d="M0 120 H200 M100 80 V220" stroke-width="5" />
              <rect class="r" x="40" y="0" width="170" height="90" /><path class="l" d="M40 40 H210 M125 0 V90" stroke-width="5" />
              <text x="100" y="270" text-anchor="middle" font-family="Bangers" font-size="40" fill="#111111">PROVEEDORES</text></g></g>"""
CEL = """<g class="s07-cel"><g transform="translate(770 1110) rotate(10)">
              <rect class="a" x="0" y="0" width="150" height="270" rx="26" /><rect class="p" x="14" y="30" width="122" height="200" rx="10" />
              <rect x="26" y="50" width="98" height="34" rx="12" fill="#4fc3ff" stroke="#111111" stroke-width="4" /><rect x="26" y="98" width="80" height="34" rx="12" fill="#4fc3ff" stroke="#111111" stroke-width="4" /><rect x="26" y="146" width="98" height="34" rx="12" fill="#4fc3ff" stroke="#111111" stroke-width="4" />
              <path class="s07-vib" d="M-20 60 L-40 80 L-20 100 M170 60 L190 80 L170 100 M-20 170 L-40 190 L-20 210 M170 170 L190 190 L170 210" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round" /></g></g>"""
TORTA_G = """<g class="s07-torta"><g transform="translate(100 640) scale(0.75)">""" + TORTA("s07", "s07-t") + """</g></g>"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s07") + VINETA("s07", "s07-v", 60, 560, 960, 940, "#fdf6e3", DENTRO + TORTA_G + CAJA_REG + PROV + CEL) + """</svg>
        """ + ONO("s07-bzz", "¡BZZ! ¡BZZ!", 560, 1380, 110, "#e63946", -6) + """
        """ + CAJA("s07-cap", "EL DUEÑO, SOLO CONTRA TODO", 300, 590, 42, "#ffd23f", "#111111", 2) + """
"""
JS = """
      const TORTAS = 0.55, CAJA = 1.52, PROV = 2.29, CELU = 3.30, PARA = 3.81;
      entra(".s07-due", 0, { y: 260 }, 0.3);
      habla(".s07-boca", 0.0, 4.2, "181 300");
      pop(".s07-cap", 0.2, { rotation: -8 });
      tl.fromTo(q(".s07-rayos"), { rotation: 0, svgOrigin: "540 1150" }, { rotation: -12, svgOrigin: "540 1150", duration: DUR, ease: "none" }, 0);
      const cae = (sel, t, o) => { gsap.set(q(sel), { opacity: 0 }); tl.fromTo(q(sel), { opacity: 0, scale: 0.2, svgOrigin: o, rotation: -30 }, { opacity: 1, scale: 1, svgOrigin: o, rotation: 0, duration: 0.3, ease: "back.out(2.2)", immediateRender: false }, t); };
      cae(".s07-torta", TORTAS - 0.1, "212 860");
      cae(".s07-caja", CAJA - 0.1, "875 760");
      cae(".s07-prov", PROV - 0.15, "200 1260");
      cae(".s07-cel", CELU - 0.1, "845 1245");
      // el dueño mira para cada lado
      tl.to(q(".s07-due"), { x: -40, duration: 0.15 }, TORTAS);
      tl.to(q(".s07-due"), { x: 40, duration: 0.15 }, CAJA);
      tl.to(q(".s07-due"), { x: -30, duration: 0.15 }, PROV);
      tl.to(q(".s07-due"), { x: 20, duration: 0.15 }, CELU);
      tl.fromTo(q(".s07-cel"), { x: -6 }, { x: 6, duration: 0.05, yoyo: true, repeat: 15, ease: "none", immediateRender: false }, CELU + 0.2);
      golpe(".s07-bzz", PARA, 2.0);
      sacudon(PARA + 0.05, 1.3);
      tl.fromTo(q(".s07-sudor"), { y: 0, opacity: 1 }, { y: 50, opacity: 0, duration: 0.45, repeat: 7, ease: "power1.in", immediateRender: false }, 0.4);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.5, "sfx": "pop", "vol": 0.3}, {"t": 1.45, "sfx": "click", "vol": 0.32}, {"t": 2.2, "sfx": "pop", "vol": 0.3}, {"t": 3.25, "sfx": "notification", "vol": 0.35}, {"t": 3.8, "sfx": "glitch-1", "vol": 0.25, "max": 0.5}, {"t": 3.82, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
