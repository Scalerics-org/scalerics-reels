ID = "s15-cta"; DUR = 12.76
CSS = """
    $ .s15-card { position: absolute; left: 110px; top: 1210px; width: 860px; padding: 18px 0 14px; text-align: center; background: #0b1330; border: 8px solid #5ce611; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: #5ce611; line-height: 1; }
    $ .s15-card small { display: block; margin-top: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #fff1dc; }
    $ .s15-et { position: absolute; left: 0; right: 0; top: 1190px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #ffb547; text-shadow: 0 8px 0 #0b1330; }
    $ .s15-al { position: absolute; left: 0; right: 0; top: 1350px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 78px; line-height: 1; color: #fff1dc; }
    $ .s15-ve { position: absolute; left: 0; right: 0; top: 1450px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 34px; letter-spacing: 0.24em; color: #ff3d6e; }
    $ .s15-tag { position: absolute; left: 270px; top: 650px; padding: 6px 14px 4px; background: #ff3d6e; border-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; color: #fff1dc; letter-spacing: 0.06em; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="s15-oscuro" x="-100" y="0" width="1280" height="1920" fill="#050a1f" opacity="0.75" />
          <!-- tele vieja con la entrevista -->
          <g class="s15-tv">
            <path class="l" d="M440 600 L520 560 M640 600 L560 560" stroke-width="7" />
            <rect class="m" x="220" y="600" width="640" height="520" rx="44" />
            <rect class="b" x="256" y="634" width="460" height="452" rx="40" stroke-width="6" />
            <circle class="y" cx="790" cy="700" r="26" stroke-width="5" /><circle class="y" cx="790" cy="780" r="26" stroke-width="5" />
            <path class="l" d="M760 860 H820 M760 890 H820 M760 920 H820" stroke-width="5" opacity="0.6" />
            <defs><clipPath id="s15-clip"><rect x="262" y="640" width="448" height="440" rx="36" /></clipPath></defs>
            <g clip-path="url(#s15-clip)">
              <rect x="262" y="640" width="448" height="440" fill="#13214f" />
              <rect x="262" y="980" width="448" height="100" fill="#ff3d6e" opacity="0.8" />
              <g class="s15-ag"><g transform="translate(366 700) scale(0.7)">""" + AGENTE("s15") + """</g></g>
              <rect class="s15-lineas" x="262" y="640" width="448" height="440" fill="url(#s15-scan)" opacity="0.25" />
            </g>
            <defs><pattern id="s15-scan" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="3" fill="#050a1f" /></pattern></defs>
            <path class="l" d="M300 1120 L280 1160 M780 1120 L800 1160" stroke-width="8" />
          </g>
        </svg>
        <div class="s15-tag">EN VIVO</div>
        <div class="s15-card">TU AGENTE DE IA<small>ATIENDE POR WHATSAPP · A CUALQUIER HORA</small></div>
        <div class="s15-et">ETIQUETÁ</div>
        <div class="s15-al">al que contesta a los tres días</div>
        <div class="s15-ve">QUE VEA LA ENTREVISTA</div>
"""
JS = """
      const SCALERICS = 1.63, AGENTE = 2.63, WHATSAPP = 4.27, ETIQUETA = 6.16, TRES = 7.54, VEA = 8.54;
      tl.fromTo(q(".s15-oscuro"), { opacity: 0 }, { opacity: 0.75, duration: 0.5, immediateRender: false }, 0);
      tl.fromTo(q(".s15-tv"), { scale: 0.8, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false, transformOrigin: "50% 50%" }, 0.05);
      gsap.set(q(".s15-tv"), { opacity: 0 });
      pop(".s15-tag", 0.4);
      tl.fromTo(q(".s15-tag"), { opacity: 1 }, { opacity: 0.4, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: 23, immediateRender: false }, 0.8);
      tl.fromTo(q(".s15-ag-bd"), { rotation: 0, svgOrigin: "276 372" }, { rotation: -70, svgOrigin: "276 372", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, SCALERICS - 0.2);
      tl.fromTo(q(".s15-ag-ant"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.6, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, 0.5);
      golpe(".s15-card", AGENTE, 2);
      sacudon(AGENTE + 0.04, 0.6);
      tl.fromTo(q(".s15-card small"), { opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, WHATSAPP - 0.1);
      gsap.set(q(".s15-card small"), { opacity: 0 });
      tl.to(q(".s15-card"), { opacity: 0, y: -30, duration: 0.2 }, ETIQUETA - 0.25);
      golpe(".s15-et", ETIQUETA, 2.4);
      sacudon(ETIQUETA + 0.04, 0.9);
      pop(".s15-al", TRES - 0.6, { y: 20 });
      pop(".s15-ve", VEA, { y: 20 });
      // guiño del agente al final
      tl.to(q(".s15-ag-ojos"), { scaleY: 0.12, svgOrigin: "180 189", duration: 0.08, yoyo: true, repeat: 1 }, 9.8);
      tl.fromTo(q(".s15-et"), { scale: 1 }, { scale: 1.06, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 9.6);
"""
SFX = [{"t": 0.05, "sfx": "click-soft", "vol": 0.3}, {"t": 2.58, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 4.2, "sfx": "pop", "vol": 0.22}, {"t": 6.1, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 7.0, "sfx": "pop", "vol": 0.25}, {"t": 8.5, "sfx": "chime", "vol": 0.3}]
