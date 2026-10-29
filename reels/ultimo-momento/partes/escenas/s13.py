ID = "s13-insolito"; DUR = 3.42
CSS = """
    $ .s13-estudio { position: absolute; inset: 0; transform-origin: 540px 1000px; }
    $ .s13-pant { position: absolute; left: 60px; top: 600px; width: 540px; height: 400px; display: flex; flex-direction: column; justify-content: center; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1.05; color: #f4f6fb; text-transform: uppercase; }
    $ .s13-pant small { display: block; margin-bottom: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.24em; color: #ffd21f; }
    $ .s13-mesa { position: absolute; left: 0; right: 0; top: 1262px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; letter-spacing: 0.18em; color: #f4f6fb; }
    $ .s13-sello { position: absolute; left: 0; right: 0; margin: 0 auto; width: 860px; top: 640px; padding: 26px 0 20px; border: 12px solid #e3212d; border-radius: 18px; text-align: center; color: #ff5a5f; background: rgba(5, 13, 34, 0.88); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; text-transform: uppercase; }
"""
HTML = """
        <div class="s13-estudio">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <rect class="b" x="60" y="590" width="540" height="420" rx="18" />
            <g class="s13-cond">
              <g transform="translate(630 760)">
                <path class="m" d="M70 160 C50 40 310 40 290 160 L300 300 C260 312 240 290 240 270 L120 270 C120 290 100 312 60 300 Z" />
                <path class="r" d="M30 470 C30 360 90 320 180 320 C270 320 330 360 330 470 Z" />
                <path class="l" d="M150 324 L180 400 L210 324" />
                <path class="b" d="M155 260 V325 H205 V260" />
                <ellipse class="b" cx="180" cy="190" rx="76" ry="90" />
                <path class="m" d="M104 170 C110 100 250 92 258 172 C220 140 150 136 104 170 Z" />
                <path class="l s13-cejas" d="M140 176 L166 168 M220 176 L194 168" stroke-width="6" />
                <path class="l" d="M146 196 h18 M198 196 h18" stroke-width="8" />
                <path class="l s13-boca" d="M162 242 H200" stroke-width="6" />
                <circle cx="100" cy="226" r="9" fill="#ffd21f" /><circle cx="260" cy="226" r="9" fill="#ffd21f" />
              </g>
            </g>
            <g class="s13-papeles"><rect x="660" y="1100" width="200" height="60" rx="6" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="5" /></g>
            <path class="m" d="M40 1160 H1040 L1000 1380 H80 Z" />
            <path d="M60 1236 H1020" stroke="#e3212d" stroke-width="14" />
          </svg>
          <div class="s13-pant"><small>ÚLTIMO MOMENTO</small>Seguiremos informando</div>
          <div class="s13-mesa">NOTICIAS</div>
        </div>
        <div class="s13-sello">Insólito</div>
"""
JS = """
      const SEGUIREMOS = 1.34, INFORMANDO = 1.8;
      // cuadro 0: el sello cae sobre el estudio
      gsap.set(q(".s13-sello"), { opacity: 1 });
      tl.fromTo(q(".s13-sello"), { scale: 1.8, rotation: -14, opacity: 1 }, { scale: 1, rotation: -6, opacity: 1, duration: 0.16, ease: "power4.in" }, 0);
      sacudon(0.16, 1.4);
      tl.fromTo(q(".s13-cejas"), { y: 0 }, { y: -10, duration: 0.15, ease: "back.out(3)" }, 0.1);
      habla(".s13-boca", 0.1, 0.6, "181 242");
      tl.to(q(".s13-sello"), { opacity: 0, scale: 0.9, duration: 0.2 }, SEGUIREMOS - 0.25);
      // ordena los papeles
      tl.to(q(".s13-papeles"), { y: -18, duration: 0.1, yoyo: true, repeat: 3 }, SEGUIREMOS - 0.2);
      // la cámara se aleja, la pantalla dice "seguiremos informando"
      gsap.set(q(".s13-pant"), { opacity: 0 });
      tl.fromTo(q(".s13-pant"), { opacity: 1, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, SEGUIREMOS);
      tl.fromTo(q(".s13-estudio"), { scale: 1 }, { scale: 0.86, duration: DUR - SEGUIREMOS, ease: "power1.inOut", immediateRender: false }, SEGUIREMOS);
      habla(".s13-boca", SEGUIREMOS, 0.9, "181 242");
      tl.to(q(".s13-cond"), { y: 6, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, SEGUIREMOS);
      tl.fromTo(q(".s13-pant small"), { opacity: 1 }, { opacity: 0.3, duration: 0.2, yoyo: true, repeat: 5, ease: "steps(1)", immediateRender: false }, INFORMANDO);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 1.1, "sfx": "click-soft", "vol": 0.22}, {"t": 1.34, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.6, "sfx": "chime", "vol": 0.2}]
