ID = "s12-dolar"; DUR = 4.33
CSS = """
    $ .s12-lbl { position: absolute; top: 1110px; width: 220px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.14em; color: #f4f6fb; }
    $ .s12-igual { position: absolute; left: 640px; top: 470px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 230px; line-height: 1; color: #ffd21f; text-shadow: 8px 8px 0 #e3212d; }
    $ .s12-dos { left: 470px; top: 1250px; background: #ffd21f; color: #050d22; font-size: 48px; box-shadow: 8px 8px 0 #e3212d; }
"""
def BILLETE(x, y):
    return f'<g><rect x="{x-90}" y="{y-50}" width="180" height="96" rx="10" fill="#0b1d4a" stroke="#ff5a5f" stroke-width="6"/><text x="{x}" y="{y+14}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" fill="#ff5a5f">US$</text></g>'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-raul">
            <g transform="translate(-30 880) scale(0.95)">
              <path class="b" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
              <path d="M110 372 H250 V520 H110 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <ellipse class="b" cx="180" cy="230" rx="80" ry="90" />
              <path class="l" d="M104 250 C98 214 104 186 118 170 M256 250 C262 214 256 186 242 170 M128 166 C160 150 214 150 240 168" />
              <path class="l" d="M134 186 L166 196 M226 186 L194 196" stroke-width="6" />
              <circle cx="154" cy="222" r="11" fill="#f4f6fb" /><circle cx="206" cy="222" r="11" fill="#f4f6fb" />
              <ellipse class="b s12-boca" cx="180" cy="298" rx="14" ry="18" />
              <path d="M136 266 C156 248 204 248 224 266 C206 282 192 272 180 268 C168 272 154 282 136 266 Z" fill="#f4f6fb" />
              <path class="s12-gota" d="M268 170 C258 190 254 204 268 208 C282 204 278 190 268 170 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="4" />
            </g>
          </g>
          <text class="s12-signo" x="320" y="980" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="170" fill="#ff5a5f" stroke="#050d22" stroke-width="4">?</text>
          <g class="s12-balanza">
            <path class="l" d="M720 760 V1240 M620 1250 H820" stroke-width="12" />
            <circle cx="720" cy="740" r="18" fill="#ffd21f" stroke="#f4f6fb" stroke-width="5" />
            <path class="s12-viga" d="M520 760 H920" stroke="#f4f6fb" stroke-width="12" stroke-linecap="round" />
            <g class="s12-plato-i">
              <path class="l" d="M520 760 L450 940 M520 760 L590 940" stroke-width="4" />
              <path class="m" d="M430 940 H610 C600 990 440 990 430 940 Z" />
              """ + BILLETE(520, 880) + """
            </g>
            <g class="s12-plato-d">
              <path class="l" d="M920 760 L850 940 M920 760 L990 940" stroke-width="4" />
              <path class="m" d="M830 940 H1010 C1000 990 840 990 830 940 Z" />
              """ + BILLETE(920, 880) + """
            </g>
          </g>
        </svg>
        <div class="s12-lbl s12-lbl-i" style="left: 410px">RAÚL</div>
        <div class="s12-lbl s12-lbl-d" style="left: 810px">ENFRENTE</div>
        <div class="s12-igual">=</div>
        <div class="cartela s12-dos">IGUAL PARA LOS DOS</div>
"""
JS = """
      const DOLAR = 0.2, EL = 1.13, IGUAL = 2.13, DOS = 2.73, RAUL = 2.83;
      // cuadro 0: Raúl desconcertado
      tl.fromTo(q(".s12-raul"), { x: -80, opacity: 0.8 }, { x: 0, opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      habla(".s12-boca", 0, 0.6, "180 298");
      pop(".s12-signo", DOLAR, { svgOrigin: "320 920" });
      tl.to(q(".s12-signo"), { rotation: 12, svgOrigin: "320 920", duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOLAR + 0.3);
      // la balanza: arranca torcida y se equilibra en "igual"
      gsap.set(q(".s12-balanza"), { opacity: 0 });
      gsap.set([q(".s12-lbl-i"), q(".s12-lbl-d")], { opacity: 0 });
      tl.fromTo(q(".s12-balanza"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, EL - 0.1);
      tl.to([q(".s12-lbl-i"), q(".s12-lbl-d")], { opacity: 1, duration: 0.2 }, EL + 0.2);
      gsap.set(q(".s12-viga"), { rotation: -14, svgOrigin: "720 760" });
      gsap.set(q(".s12-plato-i"), { y: 48 });
      gsap.set(q(".s12-plato-d"), { y: -48 });
      gsap.set(q(".s12-lbl-i"), { y: 48 });
      gsap.set(q(".s12-lbl-d"), { y: -48 });
      // se mueve, duda...
      tl.to(q(".s12-viga"), { rotation: 8, svgOrigin: "720 760", duration: 0.35, ease: "sine.inOut" }, EL + 0.35);
      tl.to([q(".s12-plato-i"), q(".s12-lbl-i")], { y: -28, duration: 0.35, ease: "sine.inOut" }, EL + 0.35);
      tl.to([q(".s12-plato-d"), q(".s12-lbl-d")], { y: 28, duration: 0.35, ease: "sine.inOut" }, EL + 0.35);
      // ... y queda pareja
      tl.to(q(".s12-viga"), { rotation: 0, svgOrigin: "720 760", duration: 0.5, ease: "elastic.out(1, 0.5)" }, IGUAL);
      tl.to([q(".s12-plato-i"), q(".s12-lbl-i"), q(".s12-plato-d"), q(".s12-lbl-d")], { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }, IGUAL);
      golpe(".s12-igual", IGUAL + 0.1, 2.4);
      pop(".s12-dos", DOS);
      sacudon(DOS + 0.05);
      // Raúl se queda duro: gota de sudor
      gsap.set(q(".s12-gota"), { opacity: 0 });
      tl.fromTo(q(".s12-gota"), { opacity: 1, y: -20 }, { opacity: 1, y: 60, duration: 0.8, ease: "power1.in", immediateRender: false }, RAUL);
      tl.to(q(".s12-signo"), { opacity: 0, duration: 0.2 }, RAUL);
"""
SFX = [{"t": 0.2, "sfx": "pop", "vol": 0.25}, {"t": 1.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.48, "sfx": "click-soft", "vol": 0.25}, {"t": 2.13, "sfx": "chime", "vol": 0.25}, {"t": 2.73, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
