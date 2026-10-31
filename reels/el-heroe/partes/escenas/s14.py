ID = "s14-capa"; DUR = 4.73
IZQ = """
            <rect x="60" y="560" width="470" height="940" fill="url(#s14-htc)" />
            <g class="s14-fort"><g transform="translate(115 860) scale(1.0)">""" + FORTACHON("s14") + """</g></g>
            <g class="s14-x"><path d="M100 760 L500 1400 M500 760 L100 1400" stroke="#111111" stroke-width="40" stroke-linecap="round" /><path class="s14-xr" d="M100 760 L500 1400 M500 760 L100 1400" stroke="#e63946" stroke-width="24" stroke-linecap="round" /></g>
"""
DER = """
            <rect x="560" y="560" width="460" height="940" fill="url(#s14-hty)" />
            <g class="s14-ag"><g transform="translate(660 940) scale(1.05)">""" + AGENTE("s14", "saluda") + """</g></g>
            <g class="s14-chats">
              <g class="s14-c1"><rect x="600" y="700" width="170" height="70" rx="22" fill="#4fc3ff" stroke="#111111" stroke-width="6" /><path d="M640 710 v0 M640 735 H730" stroke="#111111" stroke-width="7" stroke-linecap="round" /></g>
              <g class="s14-c2"><rect x="800" y="780" width="170" height="70" rx="22" fill="#fdf6e3" stroke="#111111" stroke-width="6" /><path d="M840 815 H930" stroke="#111111" stroke-width="7" stroke-linecap="round" /></g>
              <g class="s14-c3"><rect x="620" y="860" width="150" height="64" rx="22" fill="#4fc3ff" stroke="#111111" stroke-width="6" /><path d="M655 892 H735" stroke="#111111" stroke-width="7" stroke-linecap="round" /></g>
            </g>
"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s14") + VINETA("s14", "s14-v1", 60, 560, 470, 940, "#2f6fe0", IZQ) + VINETA("s14", "s14-v2", 560, 560, 460, 940, "#ffd23f", DER) + """</svg>
        """ + CAJA("s14-cap", "SIN CAPA", 120, 600, 54, "#fdf6e3", "#111111", -4) + """
        """ + CAJA("s14-hora", "23:00 HS", 760, 600, 54, "#111111", "#ffd23f", 3) + """
        """ + ONO("s14-ok", "¡ATENDIDO!", 590, 1360, 92, "#e63946", -5) + """
"""
JS = """
      const CAPA = 1.09, ALGUNOS = 2.03, WHATS = 2.92, ONCE = 3.75;
      entra(".s14-fort", 0, { y: 200 }, 0.3);
      tl.fromTo(q(".s14-fcapa"), { scaleX: 1, svgOrigin: "180 300" }, { scaleX: 1.08, svgOrigin: "180 300", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.2);
      dibujar(".s14-x path", CAPA - 0.05, 0.25);
      pop(".s14-cap", CAPA + 0.1, { rotation: -12 });
      sacudon(CAPA + 0.1, 1.1);
      tl.to(q(".s14-fort"), { opacity: 0.45, duration: 0.3 }, CAPA + 0.3);
      // algunos atienden el WhatsApp a las once
      entra(".s14-ag", ALGUNOS - 0.1, { x: 400 }, 0.35);
      tl.fromTo(q(".s14-amano"), { rotation: 0, svgOrigin: "232 240" }, { rotation: -14, svgOrigin: "232 240", duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, ALGUNOS + 0.3);
      ["1", "2", "3"].forEach((k, i) => pop(".s14-c" + k, WHATS - 0.1 + i * 0.15));
      pop(".s14-hora", ONCE - 0.1, { rotation: 12 });
      golpe(".s14-ok", ONCE + 0.15, 2.0);
      habla(".s14-boca", ALGUNOS + 0.2, 1.6, "130 255");
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.05, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.08, "sfx": "glitch-1", "vol": 0.2, "max": 0.3}, {"t": 1.95, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.85, "sfx": "notification", "vol": 0.3}, {"t": 3.85, "sfx": "pop", "vol": 0.3}]
