ID = "s11-miedo"; DUR = 3.76
CSS = """
    $ .s11-ult { position: absolute; left: 0; right: 0; top: 610px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; letter-spacing: 0.34em; color: #ffb547; }
    $ .s11-miedo { position: absolute; left: 0; right: 0; top: 680px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 190px; line-height: 1; color: #ff3d6e; text-shadow: 0 0 40px rgba(255, 61, 110, 0.6), 0 8px 0 #0b1330; }
    $ .s11-sello { position: absolute; left: 210px; top: 1400px; padding: 14px 28px 10px; border: 9px solid #ff3d6e; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 78px; line-height: 1; color: #ff3d6e; background: #0b1330; white-space: nowrap; transform: rotate(-6deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="s11-oscuro" x="-100" y="520" width="1280" height="1100" fill="#050a1f" opacity="0.7" />
          """ + HAZ("s11", "s11-h", 540, 540, 60, 760, 520, 1560, "#ff3d6e") + """
          <g class="s11-nico"><g transform="translate(270 900) scale(1.5)">""" + NICO("s11", tarjeta=False) + """
            <rect x="140" y="270" width="80" height="50" fill="#0b1330" />
            <path class="l" d="M156 294 H204" stroke-width="7" />
          </g></g>
          """ + ESCRITORIO("s11", -40, 1500, 1160, 260, taza=False) + """
        </svg>
        <div class="s11-ult">ÚLTIMA PREGUNTA</div>
        <div class="s11-miedo">¿MIEDO?</div>
        <div class="s11-sello">SIN TRABAJO</div>
"""
JS = """
      const PREG = 0.27, MIEDO = 1.64, TRABAJO = 2.64;
      tl.fromTo(q(".s11-oscuro"), { opacity: 0 }, { opacity: 0.7, duration: 0.4, immediateRender: false }, 0);
      tl.fromTo(q(ESC), { scale: 1, transformOrigin: "50% 60%" }, { scale: 1.12, transformOrigin: "50% 60%", duration: 3.5, ease: "sine.inOut", immediateRender: false }, 0);
      pop(".s11-ult", 0.05);
      tl.fromTo(q(".s11-cejas"), { y: 0, rotation: 0, svgOrigin: "180 210" }, { y: 8, duration: 0.2, immediateRender: false }, 0.3);
      tl.to(q(".s11-ult"), { opacity: 0, duration: 0.15 }, MIEDO - 0.2);
      golpe(".s11-miedo", MIEDO, 2.4);
      sacudon(MIEDO + 0.04, 1);
      golpe(".s11-sello", TRABAJO, 2.4);
      sacudon(TRABAJO + 0.04, 0.8);
      tl.fromTo(q(".s11-miedo"), { x: 0 }, { x: 6, duration: 0.05, yoyo: true, repeat: 11, ease: "none", immediateRender: false }, MIEDO + 0.2);
"""
SFX = [{"t": 0.0, "sfx": "riser", "vol": 0.22, "max": 1.6}, {"t": 1.58, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 2.58, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
