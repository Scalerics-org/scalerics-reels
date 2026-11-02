ID = "s12-abrazo"; DUR = 2.89
CSS = """
    $ .s12-cartel { position: absolute; left: 0; right: 0; top: 560px; text-align: center; }
    $ .s12-cartel span { display: inline-block; padding: 16px 30px 8px; background: #d4581f; color: #fff4e0; border: 7px solid #24122f; border-radius: 22px; box-shadow: 0 10px 0 #24122f; font-family: "Luckiest Guy", sans-serif; font-size: 58px; line-height: 1.05; transform: rotate(-3deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s12-halo" cx="540" cy="1080" r="420" fill="#f0b429" opacity="0.14" />
          <g class="s12-du"><g transform="translate(130 760) scale(1.2)">""" + DUENO("s12", "emocion", brazos="abrazo") + """</g></g>
          """ + SILLON("s12", 20, 1230, 1040, 290) + """
          <g class="s12-ag"><g transform="translate(560 800) scale(0.95)">""" + AGENTE("s12", "tranqui") + """</g></g>
          <g transform="translate(130 760) scale(1.2)"><g class="s12-brazo"><path class="t" d="M300 430 C356 420 400 400 420 360 L392 340 C372 376 340 392 290 398 Z" stroke-width="6" /><circle class="c" cx="414" cy="344" r="22" stroke-width="6" /></g></g>
          """ + CORAZON("s12", "s12-c1", 260, 900, 0.8) + CORAZON("s12", "s12-c2", 880, 860, 1.0, "#1fb5a8") + CORAZON("s12", "s12-c3", 560, 760, 0.7, "#f0b429") + """
        </svg>
        <div class="s12-cartel"><span>MEJOR COMPAÑERO<br>DE CASA</span></div>
"""
JS = """
      const MEJOR = 0.37;
      tl.fromTo(q(ESC), { scale: 1.08, transformOrigin: "50% 60%" }, { scale: 1, transformOrigin: "50% 60%", duration: 0.8, ease: "power3.out", immediateRender: false }, 0);
      habla(".s12-boca", 0, 2.1, "180 284");
      tl.fromTo(q(".s12-lagrima"), { y: 0, opacity: 1 }, { y: 50, opacity: 0, duration: 0.9, repeat: 2, ease: "power1.in", immediateRender: false }, 0.2);
      tl.fromTo(q(".s12-du"), { x: 0 }, { x: 14, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo(q(".s12-ag"), { rotation: -3, svgOrigin: "740 1300" }, { rotation: 3, svgOrigin: "740 1300", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      golpe(".s12-cartel", MEJOR, 2.2);
      [".s12-c1", ".s12-c2", ".s12-c3"].forEach((s, i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, y: 40 }, { opacity: 1, y: -60, duration: 1.2, ease: "power1.out", immediateRender: false }, 0.5 + i * 0.3);
      });
      tl.fromTo(q(".s12-halo"), { scale: 0.9, svgOrigin: "540 1080" }, { scale: 1.1, svgOrigin: "540 1080", duration: 0.7, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0);
"""
SFX = [{"t": 0.35, "sfx": "pop", "vol": 0.28}, {"t": 0.6, "sfx": "sparkle", "vol": 0.25}]
