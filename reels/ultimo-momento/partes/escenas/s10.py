ID = "s10-cruzamos"; DUR = 5.66
CSS = """
    $ .s10-calle, $ .s10-casa { position: absolute; inset: 0; }
    $ .s10-excl { left: 60px; top: 590px; background: #ffd21f; color: #050d22; font-size: 56px; box-shadow: 8px 8px 0 #e3212d; transform: rotate(-3deg); }
    $ .s10-dur { left: 0; right: 0; top: 1250px; font-size: 104px; color: #f4f6fb; text-shadow: 8px 8px 0 #1f4fa8; }
    $ .s10-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #ffd21f; }
"""
CRONISTA = """
              <path class="m" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
              <ellipse class="b" cx="180" cy="230" rx="74" ry="86" />
              <path d="M108 196 L116 128 L142 168 L158 112 L184 160 L206 108 L222 160 L248 122 L254 196 C220 176 140 176 108 196 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="5" stroke-linejoin="round" />
              <path class="l" d="M168 226 h16 M206 226 h16" stroke-width="8" />
              <path class="b" d="M170 262 C185 290 215 290 230 262 Z" />
              <path class="l s10-pierna1" d="M120 520 L80 640" stroke-width="22" />
              <path class="l s10-pierna2" d="M240 520 L290 640" stroke-width="22" />
              <path class="l" d="M300 430 C350 400 370 360 360 320" stroke-width="12" />
              <g transform="translate(365 290) rotate(15)"><rect class="b" x="-14" y="0" width="28" height="130" rx="10"/><rect x="-46" y="-80" width="92" height="80" rx="8" fill="#ffd21f" stroke="#f4f6fb" stroke-width="6"/><text x="0" y="-30" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="#050d22" data-layout-ignore>MÓVIL</text><circle cx="0" cy="-112" r="38" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7"/></g>
"""
HTML = """
        <div class="s10-calle">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <path d="M0 1150 L1080 1150 L1080 1380 L0 1380 Z" fill="#0b1d4a" />
            <g fill="#f4f6fb" opacity="0.85">
              <rect x="40" y="1190" width="110" height="34" /><rect x="220" y="1190" width="110" height="34" /><rect x="400" y="1190" width="110" height="34" /><rect x="580" y="1190" width="110" height="34" /><rect x="760" y="1190" width="110" height="34" /><rect x="940" y="1190" width="110" height="34" />
              <rect x="40" y="1300" width="110" height="34" /><rect x="220" y="1300" width="110" height="34" /><rect x="400" y="1300" width="110" height="34" /><rect x="580" y="1300" width="110" height="34" /><rect x="760" y="1300" width="110" height="34" /><rect x="940" y="1300" width="110" height="34" />
            </g>
            <g class="s10-cronista"><g transform="translate(60 640) scale(0.95)">""" + CRONISTA + """</g></g>
            <path class="s10-vel" d="M20 820 H160 M40 900 H140 M10 980 H120" stroke="#f4f6fb" stroke-width="8" stroke-linecap="round" opacity="0.6" />
          </svg>
        </div>
        <div class="s10-casa">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <rect x="110" y="700" width="860" height="640" fill="#1f4fa8" stroke="#f4f6fb" stroke-width="7" />
            <path d="M80 700 L120 630 H940 L980 700 Z" fill="#ffd21f" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
            <!-- ventana grande: adentro, el dueño de enfrente durmiendo -->
            <rect class="b s10-ventana" x="170" y="770" width="740" height="500" />
            <g class="s10-dormido">
              <path class="w" d="M220 1150 H620 V1210 H220 Z" opacity="0.9" />
              <path class="m" d="M240 1100 C240 1040 600 1040 600 1100 V1150 H240 Z" />
              <ellipse class="b" cx="300" cy="1060" rx="62" ry="54" />
              <path class="l" d="M270 1062 h22 M314 1062 h22" stroke-width="7" />
              <path class="l" d="M290 1090 C298 1096 310 1096 318 1090" stroke-width="5" />
              <path d="M240 1020 C250 980 340 970 360 1010 L380 990" fill="none" stroke="#e3212d" stroke-width="12" stroke-linecap="round" />
              <circle cx="385" cy="985" r="12" fill="#f4f6fb" />
            </g>
            <g class="s10-cel">
              <rect x="730" y="1050" width="90" height="160" rx="16" fill="#0b1d4a" stroke="#ffd21f" stroke-width="7" />
              <path class="s10-cel-luz" d="M745 1080 H805 M745 1110 H790 M745 1140 H805 M745 1170 H780" stroke="#ffd21f" stroke-width="8" stroke-linecap="round" />
              <circle cx="775" cy="1130" r="120" fill="#ffd21f" opacity="0.12" />
            </g>
          </svg>
          <div class="s10-z" style="left: 380px; top: 880px; font-size: 60px">Z</div>
          <div class="s10-z" style="left: 430px; top: 820px; font-size: 76px">Z</div>
          <div class="s10-z" style="left: 500px; top: 760px; font-size: 92px">Z</div>
        </div>
        <div class="cartela s10-excl">EXCLUSIVO</div>
        <div class="txt s10-dur">DURMIENDO</div>
"""
JS = """
      const QUIEN = 0.86, HORA = 2.67, DUENIO = 3.62, DURMIENDO = 4.48;
      // cuadro 0: el cronista ya cruza la calle corriendo
      tl.fromTo(q(".s10-cronista"), { x: -120 }, { x: 760, duration: 2.6, ease: "none" }, 0);
      tl.to(q(".s10-cronista"), { y: -16, duration: 0.13, yoyo: true, repeat: 19, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s10-pierna1"), { rotation: -18, svgOrigin: "120 520" }, { rotation: 18, svgOrigin: "120 520", duration: 0.13, yoyo: true, repeat: 19, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s10-pierna2"), { rotation: 18, svgOrigin: "240 520" }, { rotation: -18, svgOrigin: "240 520", duration: 0.13, yoyo: true, repeat: 19, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s10-vel"), { opacity: 0.6 }, { opacity: 0.1, duration: 0.13, yoyo: true, repeat: 19, ease: "none" }, 0);
      tl.to(q(".s10-vel"), { x: 760, duration: 2.6, ease: "none" }, 0);
      golpe(".s10-excl", QUIEN, 2);
      sacudon(QUIEN + 0.05);
      tl.to(q(".s10-excl"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 5 }, QUIEN + 0.3);
      // "a esa hora": la fachada de enfrente, de noche
      gsap.set(q(".s10-casa"), { opacity: 0 });
      tl.to(q(".s10-calle"), { opacity: 0, duration: 0.1 }, HORA - 0.15);
      tl.fromTo(q(".s10-casa"), { opacity: 1, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", immediateRender: false }, HORA - 0.1);
      tl.to(q(".s10-excl"), { opacity: 0, duration: 0.15 }, HORA - 0.1);
      // adentro: el dueño de enfrente duerme
      gsap.set(q(".s10-dormido"), { opacity: 0 });
      tl.to(q(".s10-dormido"), { opacity: 1, duration: 0.25 }, DUENIO - 0.1);
      tl.to(q(".s10-dormido .m"), { scaleY: 1.06, svgOrigin: "420 1150", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, DUENIO);
      qa(".s10-z").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        tl.fromTo(z, { opacity: 0, y: 30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, DUENIO + 0.15 + i * 0.22);
        tl.to(z, { y: -14, duration: 0.4, yoyo: true, repeat: 2, ease: "sine.inOut" }, DUENIO + 0.45 + i * 0.22);
      });
      // el celular al lado prendido, que brilla
      tl.fromTo(q(".s10-cel"), { opacity: 0.5 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 6, ease: "steps(1)", immediateRender: false }, DUENIO + 0.3);
      golpe(".s10-dur", DURMIENDO, 2.2);
"""
SFX = [{"t": 0.0, "sfx": "whoosh", "vol": 0.25}, {"t": 0.8, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.55, "sfx": "whoosh-short", "vol": 0.2}, {"t": 3.7, "sfx": "notification", "vol": 0.2}, {"t": 4.42, "sfx": "pop", "vol": 0.28}]
