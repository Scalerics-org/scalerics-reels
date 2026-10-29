ID = "s04-raul"; DUR = 4.27
CSS = """
    $ .s04-nombre { position: absolute; left: 50px; top: 590px; }
    $ .s04-nombre b { display: block; padding: 10px 22px 8px; background: #e3212d; color: #f4f6fb; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; text-transform: uppercase; white-space: nowrap; }
    $ .s04-nombre span { display: block; padding: 8px 22px 6px; background: #f4f6fb; color: #0b1d4a; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.18em; white-space: nowrap; }
    $ .s04-dolar { top: 760px; font-size: 150px; color: #ff5a5f; text-shadow: 10px 10px 0 #050d22; }
    $ .s04-dolar-w { position: absolute; left: 40px; top: 740px; width: 560px; text-align: center; }
    $ .s04-querido { left: 110px; top: 1000px; background: #ffd21f; color: #050d22; font-size: 46px; box-shadow: 8px 8px 0 #e3212d; transform: rotate(-4deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- fondo: estantes del almacén, apagados -->
          <g opacity="0.35">
            <path class="l" d="M40 760 H1040 M40 940 H1040 M40 1120 H1040" stroke="#1f4fa8" />
            <rect x="80" y="700" width="40" height="60" fill="#1f4fa8" /><rect x="880" y="880" width="40" height="60" fill="#1f4fa8" /><rect x="300" y="1060" width="40" height="60" fill="#1f4fa8" />
          </g>
          <g class="s04-billete">
            <rect x="140" y="1000" width="300" height="150" rx="12" fill="#0b1d4a" stroke="#ff5a5f" stroke-width="7" />
            <circle cx="290" cy="1075" r="48" fill="none" stroke="#ff5a5f" stroke-width="6" />
            <text x="290" y="1096" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="54" fill="#ff5a5f">US$</text>
          </g>
          <path class="s04-flecha" d="M120 1300 L260 1200 L330 1240 L520 1060 M450 1060 H522 V1132" fill="none" stroke="#ff5a5f" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s04-raul">
            <g transform="translate(560 780) scale(1.15)">
              <path class="l s04-brazo-i" d="M60 420 C10 380 -10 330 0 290" stroke-width="16" />
              <path class="l s04-brazo-d" d="M300 420 C350 380 370 330 360 290" stroke-width="16" />
              <path class="b" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
              <path d="M110 372 H250 V520 H110 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <path class="l" d="M118 372 L96 362 M242 372 L264 362" />
              <ellipse class="b" cx="180" cy="230" rx="80" ry="90" />
              <path class="l" d="M104 250 C98 214 104 186 118 170 M256 250 C262 214 256 186 242 170 M128 166 C160 150 214 150 240 168" />
              <path class="l s04-cejas" d="M138 204 L166 196 M222 204 L194 196" stroke-width="6" />
              <circle cx="154" cy="222" r="7" fill="#f4f6fb" /><circle cx="206" cy="222" r="7" fill="#f4f6fb" />
              <path class="b s04-boca" d="M156 290 C168 300 192 300 204 290 Z" />
              <path class="s04-bigote" d="M136 266 C156 248 204 248 224 266 C206 282 192 272 180 268 C168 272 154 282 136 266 Z" fill="#f4f6fb" />
            </g>
          </g>
          <!-- micrófono del cronista -->
          <g class="s04-mic">
            <g transform="translate(470 1230) rotate(60)">
              <rect class="b" x="-18" y="0" width="36" height="300" rx="12"/><rect x="-58" y="-100" width="116" height="100" rx="10" fill="#ffd21f" stroke="#f4f6fb" stroke-width="7"/><text x="0" y="-38" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="#050d22" data-layout-ignore>MÓVIL</text><circle cx="0" cy="-140" r="48" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7"/>
            </g>
          </g>
        </svg>
        <div class="s04-nombre"><b>Don Raúl</b><span>COMERCIANTE · 30 AÑOS</span></div>
        <div class="s04-dolar-w"><div class="txt s04-dolar" style="position:static">EL DÓLAR</div></div>
        <div class="cartela s04-querido">"QUERIDO"</div>
"""
JS = """
      const RAUL = 0.11, QUE = 0.4, Y = 1.57, DOLAR = 2.53, QUERIDO = 3.29;
      // cuadro 0: Raúl ya está, la cámara llega
      tl.fromTo(q(".s04-raul"), { x: 120, opacity: 0.8 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s04-raul"), { y: 6, duration: 0.4, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.3);
      entra(".s04-mic", RAUL - 0.05, { x: -500, y: 200 });
      tl.to(q(".s04-mic"), { rotation: -3, svgOrigin: "470 1230", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      gsap.set(q(".s04-nombre"), { opacity: 0 });
      tl.fromTo(q(".s04-nombre"), { opacity: 1, x: -560 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, QUE);
      // "Y, es el dólar": abre los brazos y habla
      gsap.set(q(".s04-brazo-i"), { rotation: 35, svgOrigin: "60 420" });
      gsap.set(q(".s04-brazo-d"), { rotation: -35, svgOrigin: "300 420" });
      tl.to(q(".s04-brazo-i"), { rotation: -25, svgOrigin: "60 420", duration: 0.25, ease: "back.out(2)" }, Y);
      tl.to(q(".s04-brazo-d"), { rotation: 25, svgOrigin: "300 420", duration: 0.25, ease: "back.out(2)" }, Y);
      habla(".s04-boca", Y, 2.2, "180 292");
      tl.to(q(".s04-bigote"), { y: -4, duration: 0.11, yoyo: true, repeat: 19, ease: "sine.inOut" }, Y);
      tl.to(q(".s04-mic"), { x: -40, y: 30, duration: 0.3, ease: "power2.inOut" }, Y);
      // EL DÓLAR + billete + flecha
      tl.to(q(".s04-nombre"), { opacity: 0, x: -200, duration: 0.2 }, DOLAR - 0.3);
      golpe(".s04-dolar-w", DOLAR, 2.6);
      sacudon(DOLAR + 0.05, 1.2);
      gsap.set(q(".s04-billete"), { opacity: 0 });
      tl.fromTo(q(".s04-billete"), { opacity: 1, x: 300, y: -200, rotation: -30, svgOrigin: "290 1075" }, { opacity: 1, x: 0, y: 0, rotation: -8, svgOrigin: "290 1075", duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, DOLAR + 0.05);
      tl.to(q(".s04-billete"), { y: -12, rotation: 4, svgOrigin: "290 1075", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, DOLAR + 0.45);
      dibujar(".s04-flecha", DOLAR + 0.1, 0.4);
      // "querido": asiente
      tl.to(q(".s04-raul"), { rotation: 3, svgOrigin: "767 1300", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, QUERIDO);
      pop(".s04-querido", QUERIDO);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.2}, {"t": 0.4, "sfx": "click", "vol": 0.25}, {"t": 2.45, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 2.6, "sfx": "whoosh", "vol": 0.2}, {"t": 3.29, "sfx": "pop", "vol": 0.28}]
