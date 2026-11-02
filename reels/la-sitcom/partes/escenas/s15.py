ID = "s15-cta"; DUR = 5.89
CSS = """
    $ .s15-et { position: absolute; left: 0; right: 0; top: 540px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 118px; line-height: 1; color: #5ce611; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; white-space: nowrap; }
    $ .s15-so { position: absolute; left: 0; right: 0; top: 670px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 96px; line-height: 1; color: #fff4e0; -webkit-text-stroke: 9px #24122f; paint-order: stroke fill; text-shadow: 0 10px 0 #24122f; white-space: nowrap; }
    $ .s15-tag { position: absolute; left: 60px; top: 900px; padding: 14px 26px 12px; background: #5ce611; border: 6px solid #24122f; border-radius: 40px; box-shadow: 0 8px 0 #24122f; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; color: #24122f; transform: rotate(-6deg); white-space: nowrap; }
    $ .s15-muda { position: absolute; left: 0; right: 0; top: 1490px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 74px; line-height: 1; color: #f0b429; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="0" y="0" width="1080" height="1920" fill="#120a1c" opacity="0.88" />
          <defs><clipPath id="s15-clip"><rect x="0" y="0" width="1080" height="1200" /></clipPath></defs>
          <g clip-path="url(#s15-clip)"><g class="s15-ag"><g transform="translate(378 770) scale(0.9)">""" + AGENTE("s15", "guino", brazo="saluda") + """</g></g></g>
          <g class="s15-caja">
            <path class="y" d="M290 1180 H790 V1460 H290 Z" />
            <path class="y" d="M290 1180 L230 1100 H470 L520 1180 Z" stroke-width="6" />
            <path class="y" d="M790 1180 L850 1100 H610 L560 1180 Z" stroke-width="6" />
            <path d="M290 1250 H790" stroke="#d4581f" stroke-width="22" opacity="0.8" />
            <text x="540" y="1380" text-anchor="middle" font-family="Luckiest Guy" font-size="64" fill="#24122f">MUDANZA</text>
            <text x="540" y="1430" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="28" letter-spacing="4" fill="#24122f">FRÁGIL · AGENTE DE IA</text>
          </g>
        </svg>
        <div class="s15-et">ETIQUETÁ</div>
        <div class="s15-so">A TU SOCIO</div>
        <div class="s15-tag">@tu_socio</div>
        <div class="s15-muda">¿quién se muda?</div>
"""
JS = """
      const SOCIO = 0.42, ENTERE = 1.42, MUDA = 2.15;
      golpe(".s15-et", 0.02, 2.2); sacudon(0.06, 0.6);
      pop(".s15-caja", 0.0, { transformOrigin: "540px 1300px" });
      golpe(".s15-so", SOCIO, 2.0);
      pop(".s15-tag", SOCIO + 0.4);
      tl.fromTo(q(".s15-tag"), { scale: 1 }, { scale: 1.08, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, SOCIO + 0.8);
      pop(".s15-muda", ENTERE + 0.3, { y: 20 });
      // el agente sale de la caja de la mudanza
      gsap.set(q(".s15-ag"), { y: 560 });
      tl.to(q(".s15-ag"), { y: 0, duration: 0.45, ease: "back.out(2)" }, MUDA - 0.1);
      tl.fromTo(q(".s15-caja"), { scaleY: 1, svgOrigin: "540 1460" }, { scaleY: 0.9, svgOrigin: "540 1460", duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, MUDA - 0.1);
      tl.fromTo(q(".s15-ag-bd"), { rotation: -14, svgOrigin: "290 300" }, { rotation: 14, svgOrigin: "290 300", duration: 0.22, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, MUDA + 0.4);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.6}, {"t": 0.4, "sfx": "pop", "vol": 0.28}, {"t": 2.05, "sfx": "pop", "vol": 0.32}, {"t": 2.2, "sfx": "sparkle", "vol": 0.28}]
