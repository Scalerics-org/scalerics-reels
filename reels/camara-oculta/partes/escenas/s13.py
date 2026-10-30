exec(PJ)
ID = "s13-arriba"; DUR = 4.69
manito = '<g class="s13-mano"><path class="l" d="M120 -120 L170 -260" stroke-width="22" /><path d="M120 -120 L170 -260" stroke="#ff3b30" stroke-width="10" stroke-linecap="round" /><circle class="b" cx="172" cy="-276" r="26" /></g>'
CSS = """
    $ .s13-arriba { left: 560px; top: 640px; font-size: 52px; background: #ff3b30; color: #fbf7ea; transform: rotate(6deg); }
    $ .s13-letrero { position: absolute; left: 260px; top: 1110px; width: 560px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: #0c0c0c; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-edif">
            <path class="l s13-e" d="M240 1400 V600 H840 V1400" />
            <path class="l s13-e" d="M240 1080 H840" />
            <rect class="y" x="260" y="1095" width="560" height="70" rx="6" />
            <rect class="k" x="460" y="1200" width="160" height="200" />
            <rect class="k" x="300" y="1200" width="120" height="120" /><rect class="k" x="660" y="1200" width="120" height="120" />
            <rect class="k" x="660" y="700" width="140" height="160" />
          </g>
          <g class="s13-ventana">
            <rect class="k" x="330" y="680" width="260" height="290" />
            <g clip-path="url(#s13-clip)">{fede("s13", 460, 1020, 0.6, "risa", cel=False, extra=manito)}</g>
            <clipPath id="s13-clip"><rect x="334" y="684" width="252" height="282" /></clipPath>
            <path class="l" d="M330 970 H590" stroke-width="10" />
          </g>
          <!-- Tito chiquito en la puerta, mira para arriba -->
          {tito("s13", 540, 1400, 0.42, "abierta")}
          <path class="rl s13-flecha" d="M760 880 C720 860 680 830 620 820 M650 790 L612 820 L654 846" stroke-width="12" />
        </svg>
        <div class="s13-letrero">PARRILLA DON TITO</div>
        <div class="cartela s13-arriba">Vive arriba</div>
"""
JS = """
      const FEDE = 1.13, VIVE = 2.51, ARRIBA = 2.82, TUYO = 3.0;
      tl.fromTo(q(".s13-edif"), { scale: 1.08, svgOrigin: "540 1100" }, { scale: 1, svgOrigin: "540 1100", duration: 0.4, ease: "power3.out" }, 0);
      pop(".s13-letrero", 0.1);
      // Tito... (pausa dramática): la cámara sube por el edificio
      tl.fromTo(q(".s13-tito"), { y: 0 }, { y: -6, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.2);
      // Fede aparece en la ventana y saluda
      gsap.set(q(".s13-fede"), { opacity: 0 });
      tl.fromTo(q(".s13-fede"), { opacity: 1, y: 160 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, FEDE);
      tl.fromTo(q(".s13-mano"), { rotation: -15, svgOrigin: "120 -120" }, { rotation: 15, svgOrigin: "120 -120", duration: 0.18, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, FEDE + 0.3);
      dibujar(".s13-flecha", VIVE, 0.3);
      golpe(".s13-arriba", ARRIBA, 2.2);
      sacudon(ARRIBA + 0.05, 0.6);
      // Tito mira para arriba
      tl.to(q(".s13-tito"), { rotation: -12, svgOrigin: "540 1400", duration: 0.3, ease: "back.out(2)" }, TUYO);
      tl.to(q(".s13-arriba"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3 }, TUYO + 0.4);
"""
SFX = [{"t": 1.13, "sfx": "pop", "vol": 0.3}, {"t": 2.5, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.82, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 3.2, "sfx": "sparkle", "vol": 0.2}]
