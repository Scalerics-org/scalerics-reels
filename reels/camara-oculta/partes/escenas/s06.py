exec(PJ)
ID = "s06-videoclub"; DUR = 4.90
CSS = """
    $ .s06-boton { position: absolute; left: 300px; top: 600px; padding: 14px 30px 12px; background: #fbf7ea; color: #0c0c0c; border: 5px solid #0c0c0c; border-radius: 40px; box-shadow: 8px 8px 0 #ffd400; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; white-space: nowrap; }
    $ .s06-dir { position: absolute; left: 110px; top: 720px; width: 860px; padding: 22px 30px; background: #2b2b2b; border: 5px solid #fbf7ea; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 38px; line-height: 1.3; color: #fbf7ea; }
    $ .s06-dir span { opacity: 0; }
    $ .s06-que { left: 300px; top: 1170px; font-size: 64px; background: #ff3b30; color: #fbf7ea; transform: rotate(-4deg); }
"""
palabras = "Estamos a media cuadra de donde estaba el videoclub.".split(" ")
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- el videoclub fantasma -->
          <g class="s06-video" opacity="0.9">
            <path class="l s06-v" d="M330 1300 V1040 H750 V1300" stroke-dasharray="18 16" />
            <path class="l s06-v" d="M310 1040 L540 960 L770 1040" stroke-dasharray="18 16" />
            <g class="s06-vhsg"><rect class="k s06-vhs" x="430" y="1080" width="220" height="130" rx="10" />
            <circle class="l s06-vhs" cx="490" cy="1145" r="28" /><circle class="l s06-vhs" cx="590" cy="1145" r="28" />
            <rect class="s06-vhs" x="470" y="1100" width="140" height="14" fill="#ffd400" />
          </g></g>
          <path class="rl s06-x" d="M300 980 L780 1320 M780 980 L300 1320" stroke-width="12" />
          <g class="s06-sig" data-layout-allow-overlap><text x="900" y="1260" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="300" fill="#ffd400" stroke="#0c0c0c" stroke-width="8">?</text></g>
          <g class="s06-sig2" data-layout-allow-overlap><text x="170" y="1180" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="200" fill="#ff3b30" stroke="#0c0c0c" stroke-width="8">?</text></g>
        </svg>
        <div class="s06-boton">Cómo llegar</div>
        <div class="s06-dir">{' '.join(f'<span>{w}</span>' for w in palabras)}</div>
        <div class="cartela s06-que" data-layout-allow-overlap>¿Qué videoclub?</div>
"""
JS = """
      const LLEGO = 0.18, A = 1.06, VIDEOCLUB = 2.79, QUE = 3.22, VID2 = 3.86;
      gsap.set(q(".s06-boton"), { opacity: 1 });
      tl.fromTo(q(".s06-boton"), { scale: 0.7 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.to(q(".s06-boton"), { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, LLEGO + 0.3);
      pop(".s06-dir", A - 0.2);
      const T = [0, 0.15, 0.22, 0.42, 0.6, 1.12, 1.29, 1.64, 1.73];
      qa(".s06-dir span").forEach((s, i) => tl.set(s, { opacity: 1 }, A - 0.15 + T[i]));
      // el videoclub fantasma aparece punteado
      gsap.set(qa(".s06-v"), { opacity: 0 });
      tl.fromTo(qa(".s06-v"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, VIDEOCLUB - 0.1);
      tl.fromTo(qa(".s06-v"), { strokeDashoffset: 0 }, { strokeDashoffset: -136, duration: DUR - VIDEOCLUB, ease: "none" }, VIDEOCLUB);
      pop(".s06-vhsg", VIDEOCLUB);
      tl.to(q(".s06-vhsg"), { opacity: 0.35, duration: 0.1, yoyo: true, repeat: 3 }, VIDEOCLUB + 0.3);
      dibujar(".s06-x", QUE, 0.3);
      golpe(".s06-que", QUE + 0.1, 2.2);
      sacudon(QUE + 0.15, 0.7);
      pop(".s06-sig", VID2 - 0.2, { rotation: 20 });
      pop(".s06-sig2", VID2, { rotation: -20 });
      tl.to([q(".s06-sig"), q(".s06-sig2")], { y: -16, duration: 0.2, yoyo: true, repeat: 2, ease: "sine.inOut" }, VID2 + 0.3);
"""
SFX = [{"t": 0.45, "sfx": "click", "vol": 0.3}, {"t": 0.9, "sfx": "typing", "vol": 0.22, "max": 1.6}, {"t": 2.75, "sfx": "glitch-1", "vol": 0.2, "max": 0.4}, {"t": 3.25, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 3.7, "sfx": "pop", "vol": 0.25}]
