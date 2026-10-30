ID = "s09-paraguas"; DUR = 3.81
# zona seca debajo del paraguas (en coordenadas de pantalla; el paraguas está en 540 1000, escala 0.95)
SECO = '<path class="s09-seco" d="M255 1000 C255 840 380 740 540 740 C700 740 825 840 825 1000 L825 1420 L255 1420 Z" fill="#000" />'
CSS = """
    $ .s09-igual { left: 90px; top: 590px; background: #f4f6fb; color: #061428; font-size: 64px; box-shadow: 8px 8px 0 #5ec8ff; transform: rotate(-4deg); }
    $ .s09-ia { left: 0; right: 0; margin: 0 auto; width: 470px; text-align: center; top: 1240px; background: #5ce611; color: #061428; font-size: 60px; box-shadow: 8px 8px 0 #061428; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <clipPath id="s09-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath>
            <mask id="s09-mask" maskUnits="userSpaceOnUse" x="-400" y="0" width="1880" height="1920"><rect x="-400" y="0" width="1880" height="1920" fill="#fff" />""" + SECO + """</mask>
          </defs>
          <rect x="60" y="760" width="960" height="570" fill="#14457a" stroke="#f4f6fb" stroke-width="7" />
          <path d="M40 760 L80 690 H1000 L1040 760 Z" fill="#ffd23f" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
          <path d="M180 690 L160 760 M320 690 L310 760 M460 690 L460 760 M600 690 L610 760 M740 690 L760 760 M880 690 L900 760" stroke="#061428" stroke-width="6" />
          <path class="l" d="M110 900 H970 M110 1020 H970" stroke-width="5" opacity="0.5" />
          <rect class="m" x="120" y="1150" width="840" height="180" rx="10" />
          <g class="s09-par"><g transform="translate(540 1000) scale(0.95)">""" + PARAGUAS("s09") + """</g></g>
          <g clip-path="url(#s09-clip)"><g mask="url(#s09-mask)">""" + lluvia("s09-lluvia", 60, -300, 1300, 420, 1000, 99, globos=0.5, vel=(900, 1200), esc=(1.0, 1.6), ang=14) + """</g></g>
        </svg>
        <div class="cartela s09-igual">¡LLUEVE IGUAL!</div>
        <div class="cartela s09-ia">AGENTE DE IA</div>
"""
JS = """
      const LLUEVE = 0.63, PARAGUAS = 2.18, AGENTE = 2.99;
      lluvia(".s09-lluvia", 0, DUR);
      tl.fromTo(q(".s09-escenario"), { scale: 1.05, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "power2.out" }, 0);
      golpe(".s09-igual", LLUEVE, 2.2);
      sacudon(LLUEVE + 0.05);
      tl.to(q(".s09-igual"), { opacity: 0, y: -30, duration: 0.2 }, PARAGUAS - 0.2);
      // el paraguas se abre de golpe
      gsap.set(q(".s09-par"), { opacity: 0 });
      gsap.set(q(".s09-seco"), { scaleX: 0, scaleY: 0, svgOrigin: "540 1000" });
      tl.fromTo(q(".s09-par"), { opacity: 1, scaleX: 0.08, scaleY: 0.6, svgOrigin: "540 1000" }, { opacity: 1, scaleX: 1, scaleY: 1, svgOrigin: "540 1000", duration: 0.28, ease: "back.out(2.2)", immediateRender: false }, PARAGUAS - 0.1);
      tl.to(q(".s09-seco"), { scaleX: 1, scaleY: 1, svgOrigin: "540 1000", duration: 0.28, ease: "back.out(2.2)" }, PARAGUAS - 0.1);
      sacudon(PARAGUAS + 0.1, 1.2);
      tl.to(q(".s09-par"), { rotation: 3, svgOrigin: "540 1260", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, PARAGUAS + 0.3);
      // abre los ojos
      tl.fromTo(q(".s09-ojos"), { scaleY: 0.08, svgOrigin: "0 -130" }, { scaleY: 1, svgOrigin: "0 -130", duration: 0.2, ease: "back.out(3)" }, AGENTE);
      tl.to(q(".s09-ojos"), { x: 14, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, AGENTE + 0.35);
      golpe(".s09-ia", AGENTE + 0.1, 2);
      tl.fromTo(q(".s09-par"), { filter: "drop-shadow(0 0 0 rgba(92,230,17,0))" }, { filter: "drop-shadow(0 0 26px rgba(92,230,17,0.6))", duration: 0.4, immediateRender: false }, AGENTE);
"""
SFX = [{"t": 0.63, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}, {"t": 2.1, "sfx": "whoosh", "vol": 0.3}, {"t": 2.2, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.7}, {"t": 2.99, "sfx": "sparkle", "vol": 0.3}, {"t": 3.1, "sfx": "chime", "vol": 0.25}]
