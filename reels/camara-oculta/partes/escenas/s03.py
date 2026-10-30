exec(PJ)
ID = "s03-carga"; DUR = 3.82
CSS = """
    $ .s03-url { position: absolute; left: 330px; top: 650px; width: 420px; height: 64px; border-radius: 32px; background: #2b2b2b; border: 4px solid #fbf7ea; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: #fbf7ea; line-height: 56px; padding-left: 24px; white-space: nowrap; overflow: hidden; }
    $ .s03-url span { opacity: 0; }
    $ .s03-c1 { left: 60px; top: 1010px; font-size: 64px; transform: rotate(-8deg); }
    $ .s03-c2 { left: 640px; top: 1160px; font-size: 64px; transform: rotate(7deg); background: #ff3b30; color: #fbf7ea; }
    $ .s03-pct { position: absolute; left: 0; right: 0; top: 1236px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: #fbf7ea; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- manga roja de Fede sosteniendo el celular -->
          <path class="r s03-manga" d="M560 1520 C560 1440 600 1400 640 1380 L760 1380 C800 1420 820 1470 820 1520 Z" />
          {celular("s03", 290, 560, 500, 820, extra='''
            <rect x="314" y="740" width="452" height="610" rx="14" fill="#2b2b2b" />
            <g class="s03-rueda" fill="none" stroke-linecap="round" stroke-width="16">
              <path d="M540 900 A100 100 0 0 1 640 1000" stroke="#ffd400" />
              <path d="M640 1000 A100 100 0 0 1 540 1100" stroke="#fbf7ea" opacity="0.5" />
              <path d="M540 1100 A100 100 0 0 1 440 1000" stroke="#fbf7ea" opacity="0.3" />
              <path d="M440 1000 A100 100 0 0 1 540 900" stroke="#fbf7ea" opacity="0.15" />
            </g>
            <rect x="350" y="1180" width="380" height="30" rx="15" fill="none" stroke="#fbf7ea" stroke-width="4" />
            <rect class="s03-barra" x="356" y="1186" width="368" height="18" rx="9" fill="#ff3b30" />
          ''')}
        </svg>
        <div class="s03-url">{''.join(f'<span>{c}</span>' for c in 'www.parrilladontito')}</div>
        <div class="s03-pct">3%</div>
        <div class="cartela s03-c1">Carga...</div>
        <div class="cartela s03-c2">carga...</div>
"""
JS = """
      const PAGINA = 0.78, TITO = 1.56, C1 = 3.04, C2 = 3.30;
      tl.fromTo(q(".s03-cel"), { y: 200, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s03-manga"), { y: 200 }, { y: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      pop(".s03-url", 0.2);
      qa(".s03-url span").forEach((s, i) => tl.set(s, { opacity: 1 }, PAGINA + i * 0.05));
      // la ruedita gira todo el tiempo
      tl.fromTo(q(".s03-rueda"), { rotation: 0, svgOrigin: "540 1000" }, { rotation: 1440, svgOrigin: "540 1000", duration: DUR, ease: "none" }, 0);
      // la barra no avanza: 3% y se queda
      tl.fromTo(q(".s03-barra"), { scaleX: 0.0, svgOrigin: "356 1195" }, { scaleX: 0.04, svgOrigin: "356 1195", duration: 0.6, ease: "power2.out" }, TITO);
      tl.to(q(".s03-barra"), { scaleX: 0.05, svgOrigin: "356 1195", duration: 1.2, ease: "none" }, TITO + 0.6);
      tl.fromTo(q(".s03-pct"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, TITO);
      // impaciencia: el celular tiembla
      tl.to(q(".s03-cel"), { rotation: 2, svgOrigin: "540 1380", duration: 0.08, yoyo: true, repeat: 7, ease: "none" }, 2.3);
      golpe(".s03-c1", C1, 2.4);
      golpe(".s03-c2", C2, 2.4);
      sacudon(C2 + 0.05, 0.7);
"""
SFX = [{"t": 0.0, "sfx": "click", "vol": 0.25}, {"t": 0.78, "sfx": "typing", "vol": 0.22, "max": 0.9}, {"t": 1.6, "sfx": "click-soft", "vol": 0.25}, {"t": 3.0, "sfx": "pop", "vol": 0.3}, {"t": 3.28, "sfx": "pop", "vol": 0.3}]
