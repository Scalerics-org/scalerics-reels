exec(open("partes/escenas/pj.py").read())
ID = "s14-cta"; DUR = 8.44
TICK = '<svg class="s14-tk" viewBox="0 0 44 24" width="66" height="36"><path d="M2 13 L9 20 L22 5 M18 17 L21 20 L36 4" fill="none" stroke="#9fe3ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CSS = """
    $ .s14-tu { left: 0; right: 0; margin: 0 auto; width: 520px; top: 470px; text-align: center; background: #5ce611; color: #03171b; font-size: 44px; }
    $ .s14-logo { position: absolute; left: 230px; top: 990px; width: 620px; height: auto; }
    $ .s14-btn { position: absolute; left: 0; right: 0; margin: 0 auto; top: 1080px; width: 660px; height: 120px; border-radius: 60px; background: #5ce611; display: flex; align-items: center; justify-content: center; gap: 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #03171b; }
    $ svg.s14-flecha { position: static; width: 64px; height: 64px; }
    $ .s14-al { position: absolute; left: 0; right: 0; top: 1240px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; color: #eef6f5; white-space: nowrap; }
    $ .s14-al span { display: inline-flex; align-items: center; gap: 10px; }
    $ svg.s14-tk { position: static; width: 66px; height: 36px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-ag"><g transform="translate(540 760) scale(0.6) translate(-540 -940)">
            <circle class="s14-halo" cx="540" cy="940" r="300" fill="#5ce611" opacity="0.1" />
            {agente("s14")}
          </g></g>
        </svg>
        <div class="cartela s14-tu">TU AGENTE DE IA</div>
        <img class="s14-logo" src="assets/logo-blanco.png" alt="Scalerics" />
        <div class="s14-btn"><svg class="s14-flecha" viewBox="0 0 64 64"><path d="M12 50 C14 30 26 22 40 22 V12 L58 30 L40 48 V38 C28 38 18 42 12 50 Z" fill="#03171b"/></svg>MANDÁSELO</div>
        <div class="s14-al"><span>al que lleva 3 días en visto {TICK}</span></div>
"""
JS = """
      const AGENTE = 0.20, ARMAMOS = 1.36, SCAL = 2.21, MANDA = 2.77, TRES = 3.89, VISTO = 4.56;
      tl.fromTo(q(".s14-ag"), { scale: 0.6, opacity: 0.5, svgOrigin: "540 760" }, { scale: 1, opacity: 1, svgOrigin: "540 760", duration: 0.35, ease: "back.out(1.8)" }, 0);
      tl.fromTo(q(".s14-halo"), { scale: 0.8, svgOrigin: "540 940" }, { scale: 1.15, svgOrigin: "540 940", duration: 0.6, yoyo: true, repeat: 13, ease: "sine.inOut", immediateRender: false }, 0);
      tl.to(q(".s14-aojos"), { scaleY: 0.15, svgOrigin: "540 880", duration: 0.06, yoyo: true, repeat: 1 }, 1.2);
      tl.to(q(".s14-aojos"), { scaleY: 0.15, svgOrigin: "540 880", duration: 0.06, yoyo: true, repeat: 1 }, 5.4);
      pop(".s14-tu", AGENTE);
      pop(".s14-logo", SCAL - 0.1);
      tl.to(q(".s14-logo"), { y: -50, opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.in" }, MANDA - 0.2);
      golpe(".s14-btn", MANDA, 1.8);
      sacudon(MANDA + 0.05, 0.8);
      tl.fromTo(q(".s14-btn"), { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, MANDA + 0.4);
      tl.fromTo(q(".s14-flecha"), { x: 0 }, { x: 10, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, MANDA + 0.4);
      pop(".s14-al", TRES - 0.3);
      tl.fromTo(q(".s14-tk"), { scale: 1 }, { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, VISTO);
"""
SFX = [{"t": 0.05, "sfx": "sparkle", "vol": 0.25}, {"t": 0.2, "sfx": "pop", "vol": 0.25}, {"t": 2.11, "sfx": "chime", "vol": 0.3}, {"t": 2.77, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 3.6, "sfx": "pop", "vol": 0.25}, {"t": 4.56, "sfx": "ping", "vol": 0.22}]
