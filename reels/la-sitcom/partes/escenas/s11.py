ID = "s11-al-reves"; DUR = 5.18
CSS = """
    $ .s11-reves { position: absolute; left: 0; right: 0; top: 540px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 120px; line-height: 1; color: #f0b429; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; white-space: nowrap; }
    $ .s11-tit { position: absolute; top: 720px; width: 460px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 62px; line-height: 1; white-space: nowrap; }
    $ .s11-sub { position: absolute; top: 790px; width: 460px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.14em; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-pi"><rect class="b" x="40" y="690" width="480" height="720" rx="30" /><rect x="40" y="690" width="480" height="720" rx="30" fill="none" stroke="#5ce611" stroke-width="7" />
            <g transform="translate(110 860) scale(0.88)">""" + AGENTE("s11", "feliz", brazo="saluda") + """</g></g>
          <g class="s11-pd"><rect class="y" x="560" y="690" width="480" height="720" rx="30" />
            <defs><clipPath id="s11-clip"><rect x="560" y="690" width="480" height="720" rx="30" /></clipPath></defs>
            <g clip-path="url(#s11-clip)"><g transform="translate(620 890) scale(1.0)">""" + DUENO("s11", "feliz") + """</g></g>
            <rect x="560" y="690" width="480" height="720" rx="30" fill="none" stroke="#24122f" stroke-width="7" /></g>
          <path class="s11-flecha" d="M380 1150 C460 1060 560 1060 640 1130" fill="none" stroke="#d4581f" stroke-width="16" stroke-linecap="round" />
          <path class="s11-punta" d="M600 1100 L652 1140 L596 1166" fill="none" stroke="#d4581f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          """ + CORAZON("s11", "s11-c1", 140, 1300, 0.9) + CORAZON("s11", "s11-c2", 950, 1250, 1.1, "#5ce611") + CORAZON("s11", "s11-c3", 540, 1360, 0.8, "#1fb5a8") + """
        </svg>
        <div class="s11-reves">¡AL REVÉS!</div>
        <div class="s11-tit s11-t1" style="left:50px;color:#5ce611">LO FÁCIL</div>
        <div class="s11-sub s11-s1" style="left:50px;color:#fff4e0">A CUALQUIER HORA</div>
        <div class="s11-tit s11-t2" style="left:570px;color:#24122f">LO GRANDE</div>
        <div class="s11-sub s11-s2" style="left:570px;color:#24122f">PARA VOS</div>
"""
JS = """
      const REVES = 0.18, FACIL = 1.27, HORA = 1.64, GRANDE = 2.73, PASO = 3.37, AWW = 3.78;
      // "al revés": el texto aparece dado vuelta y gira
      gsap.set(q(".s11-reves"), { opacity: 0 });
      tl.fromTo(q(".s11-reves"), { opacity: 1, rotation: 180, scale: 1.4 }, { opacity: 1, rotation: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)", immediateRender: false }, REVES - 0.15);
      sacudon(REVES + 0.3, 0.6);
      pop(".s11-pi", 0.0, { transformOrigin: "280px 1050px" });
      habla(".s11-ag-boca", 0, 3.7, "180 290");
      pop(".s11-t1", FACIL - 0.05); pop(".s11-s1", HORA);
      tl.fromTo(q(".s11-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, FACIL);
      pop(".s11-pd", GRANDE - 0.15, { transformOrigin: "800px 1050px" });
      pop(".s11-t2", GRANDE); pop(".s11-s2", GRANDE + 0.3);
      dibujar(".s11-flecha", PASO, 0.35); dibujar(".s11-punta", PASO + 0.3, 0.15);
      // "awww": corazones
      [".s11-c1", ".s11-c2", ".s11-c3"].forEach((s, i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, scale: 0.3, y: 0 }, { opacity: 1, scale: 1, y: -80, duration: 0.6, ease: "back.out(2)", immediateRender: false }, AWW + i * 0.12);
      });
"""
SFX = [{"t": 0.1, "sfx": "whoosh", "vol": 0.28}, {"t": 1.25, "sfx": "pop", "vol": 0.28}, {"t": 2.7, "sfx": "pop", "vol": 0.28}, {"t": 3.35, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.78, "sfx": "sparkle", "vol": 0.3}]
