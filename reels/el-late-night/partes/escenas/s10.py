ID = "s10-el-dueno"; DUR = 5.00
CSS = """
    $ .s10-jefe { position: absolute; left: 560px; top: 640px; font-family: "Caveat", cursive; font-weight: 700; font-size: 84px; color: #ffb547; transform: rotate(-5deg); white-space: nowrap; }
"""
HTML = """
        <div class="s10-uno">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s10-cli"><g transform="translate(120 900) scale(1.1)">""" + CLIENTA("s10c") + """</g></g>
          </svg>
          """ + GLOBO("s10", "s10-g1", 470, 680, 540, "Quiero hablar con el dueño.", "izq", "#fff1dc", "#0b1330", 46) + """
        </div>
        <div class="s10-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s10-ag"><g transform="translate(20 920) scale(1.0)">""" + AGENTE("s10") + """</g></g>
            <g class="s10-dueno"><g transform="translate(680 940) scale(1.0)">""" + DUENO("s10d") + """</g></g>
            <path class="s10-arco" d="M330 1160 C420 900 640 900 720 1100" fill="none" stroke="#5ce611" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 26" />
            <g class="s10-tel"><rect class="b" x="-36" y="-62" width="72" height="124" rx="14" stroke-width="6" /><rect x="-24" y="-48" width="48" height="90" rx="6" fill="#5ce611" opacity="0.85" /></g>
          </svg>
          <div class="s10-jefe">Para vos, jefe.</div>
        </div>
"""
JS = """
      const PIDE = 0.62, DUENO = 1.52, PASO = 2.38, HAY = 3.29, EL = 4.11;
      tl.fromTo(q(ESC), { scale: 1.08, transformOrigin: "50% 60%" }, { scale: 1, transformOrigin: "50% 60%", duration: 0.6, ease: "power3.out", immediateRender: false }, 0);
      pop(".s10-g1", PIDE - 0.2, { y: 20 });
      habla(".s10c-boca", PIDE - 0.2, 1.2, "180 294");
      tl.fromTo(q(".s10-g1"), { rotation: 0 }, { rotation: -3, duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, DUENO);
      // corte: el agente le pasa el celular al dueño
      tl.to(q(".s10-uno"), { x: -1100, duration: 0.3, ease: "power3.in" }, PASO - 0.4);
      gsap.set(q(".s10-dos"), { x: 1100 });
      tl.fromTo(q(".s10-dos"), { x: 1100 }, { x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, PASO - 0.25);
      habla(".s10-ag-boca", PASO, 1.9, "180 260");
      dibujar(".s10-arco", PASO + 0.05, 0.4);
      gsap.set(q(".s10-tel"), { x: 330, y: 1150, rotation: 0 });
      tl.fromTo(q(".s10-tel"), { x: 330, y: 1150, rotation: 0 }, { x: 525, y: 950, rotation: 200, duration: 0.3, ease: "power1.out", immediateRender: false }, PASO + 0.1);
      tl.to(q(".s10-tel"), { x: 760, y: 1170, rotation: 360, duration: 0.3, ease: "power1.in" }, PASO + 0.4);
      tl.fromTo(q(".s10-ag-bd"), { rotation: 0, svgOrigin: "276 372" }, { rotation: -60, svgOrigin: "276 372", duration: 0.2, ease: "back.out(2)", immediateRender: false }, PASO);
      tl.fromTo(q(".s10-dueno"), { y: 0 }, { y: -20, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, PASO + 0.7);
      pop(".s10-jefe", HAY + 0.1, { rotation: -5 });
      tl.fromTo(q(".s10d-boca"), { scaleY: 1, scaleX: 1, svgOrigin: "180 304" }, { scaleY: 2, scaleX: 1.6, svgOrigin: "180 304", duration: 0.2, ease: "back.out(2)", immediateRender: false }, EL - 0.3);
"""
SFX = [{"t": 0.45, "sfx": "notification", "vol": 0.28}, {"t": 2.1, "sfx": "whoosh", "vol": 0.25, "max": 0.6}, {"t": 2.5, "sfx": "whoosh-short", "vol": 0.3}, {"t": 3.1, "sfx": "pop", "vol": 0.3}, {"t": 3.4, "sfx": "chime", "vol": 0.25}]
