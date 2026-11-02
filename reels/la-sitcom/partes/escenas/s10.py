ID = "s10-sin-trabajo"; DUR = 3.73
CSS = """
    $ .s10-pasas { position: absolute; left: 60px; top: 560px; }
    $ .s10-sin { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 120px; line-height: 1; color: #d4581f; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="s10-osc" x="0" y="0" width="1080" height="1920" fill="#24122f" opacity="0" />
          <circle class="s10-foco" cx="480" cy="1000" r="430" fill="#f0b429" opacity="0.12" />
          <g class="s10-du"><g transform="translate(170 640) scale(1.6)">""" + DUENO("s10", "sospecha") + """</g></g>
          <g class="s10-ag"><g transform="translate(800 1080) scale(0.55)">""" + AGENTE("s10", "feliz") + """</g></g>
        </svg>
        """ + CARTEL("s10", "s10-pasas", 60, 560, "¿ME LA PASÁS?", fondo="#f0b429", fs=64, rot=-5) + """
        <div class="s10-sin">¿SIN TRABAJO?</div>
"""
JS = """
      const PASAS = 0.92, NO = 1.29, SIN = 2.41;
      habla(".s10-boca", 0, 3.1, "185 284");
      pop(".s10-pasas", PASAS - 0.1);
      // zoom lento y dramático, se oscurece el living
      tl.fromTo(q(ESC), { scale: 1 }, { scale: 1.12, transformOrigin: "45% 50%", duration: DUR, ease: "none", immediateRender: false }, 0);
      tl.to(q(".s10-osc"), { opacity: 0.45, duration: 0.6 }, NO);
      tl.fromTo(q(".s10-foco"), { opacity: 0.08 }, { opacity: 0.2, duration: 0.5, immediateRender: false }, NO);
      tl.fromTo(q(".s10-du"), { x: 0 }, { x: -20, duration: 0.6, ease: "power2.inOut", immediateRender: false }, NO);
      golpe(".s10-sin", SIN, 2.4); sacudon(SIN + 0.04, 1.0);
      tl.fromTo(q(".s10-ag"), { y: 0 }, { y: 30, duration: 0.3, ease: "power2.out", immediateRender: false }, SIN);
"""
SFX = [{"t": 0.9, "sfx": "pop", "vol": 0.28}, {"t": 1.3, "sfx": "riser", "vol": 0.22, "max": 1.1}, {"t": 2.38, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}]
