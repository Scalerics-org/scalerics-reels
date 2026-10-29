ID = "s03-local"; DUR = 4.93
CSS = """
    $ .s03-camara { position: absolute; inset: 0; transform-origin: 370px 1010px; }
    $ .s03-cartel { position: absolute; left: 190px; top: 576px; width: 700px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; color: #050d22; background: #f4f6fb; padding: 10px 0 8px; border-radius: 8px; letter-spacing: 0.04em; }
    $ .s03-mosca-rot { left: 560px; top: 1140px; background: #e3212d; color: #f4f6fb; font-size: 48px; box-shadow: 8px 8px 0 #050d22; }
"""
HTML = """
        <div class="s03-camara">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <path class="l" d="M0 1330 H1080" opacity="0.5" />
            <rect class="b" x="120" y="700" width="840" height="630" />
            <path d="M120 700 L160 640 H920 L960 700 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
            <path d="M160 640 L120 700 H220 L240 640 Z M400 640 L390 700 H490 L480 640 Z M640 640 L660 700 H760 L720 640 Z" fill="#e3212d" />
            <path d="M120 700 C150 730 190 730 220 700 C250 730 290 730 320 700 C350 730 390 730 420 700 C450 730 490 730 520 700 C550 730 590 730 620 700 C650 730 690 730 720 700 C750 730 790 730 820 700 C850 730 890 730 920 700 C940 720 955 720 960 700" fill="#e3212d" stroke="#f4f6fb" stroke-width="6" />
            <!-- vidriera -->
            <rect class="m" x="180" y="790" width="380" height="460" />
            <g class="s03-adentro">
              <path class="l" d="M200 900 H540 M200 1010 H540" opacity="0.6" />
              <rect class="w" x="230" y="870" width="24" height="30" /><rect class="w" x="500" y="980" width="24" height="30" />
              <g class="s03-raul"><g transform="translate(280 930) scale(0.5)">
                <path class="b" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
                <path d="M110 372 H250 V520 H110 Z" fill="#f4f6fb" />
                <ellipse class="b" cx="180" cy="230" rx="80" ry="90" />
                <path class="l" d="M104 250 C98 214 104 186 118 170 M256 250 C262 214 256 186 242 170 M128 166 C160 150 214 150 240 168" />
                <path class="l" d="M138 204 L166 196 M222 204 L194 196" stroke-width="6" />
                <circle cx="154" cy="222" r="7" fill="#f4f6fb" /><circle cx="206" cy="222" r="7" fill="#f4f6fb" />
                <path d="M136 266 C156 248 204 248 224 266 C206 282 192 272 180 268 C168 272 154 282 136 266 Z" fill="#f4f6fb" />
              </g></g>
              <rect class="s03-mostrador b" x="195" y="1140" width="350" height="110" />
              <path class="l s03-mostrador" d="M195 1170 H545" />
              <g class="s03-mosca">
                <path d="M440 960 C480 900 540 960 500 1000 C460 1040 400 990 440 960" fill="none" stroke="#f4f6fb" stroke-width="3" stroke-dasharray="4 10" opacity="0.7" />
                <g class="s03-bicho"><ellipse cx="440" cy="960" rx="16" ry="12" fill="#f4f6fb" /><ellipse cx="428" cy="944" rx="14" ry="9" fill="none" stroke="#f4f6fb" stroke-width="4" /><ellipse cx="452" cy="944" rx="14" ry="9" fill="none" stroke="#f4f6fb" stroke-width="4" /></g>
              </g>
            </g>
            <path class="l" d="M180 1020 H560" opacity="0.35" />
            <!-- puerta -->
            <rect class="b" x="620" y="790" width="260" height="540" />
            <rect class="m" x="650" y="820" width="200" height="220" />
            <circle cx="845" cy="1110" r="10" fill="#f4f6fb" />
            <rect x="680" y="1060" width="140" height="56" rx="6" fill="#e3212d" />
            <text x="750" y="1098" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="30" fill="#f4f6fb">ABIERTO</text>
          </svg>
          <div class="s03-cartel">ALMACÉN Y DESPENSA</div>
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-cronista">
            <g transform="translate(-10 900)">
              <path class="m" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
              <path class="l" d="M180 362 V500 M150 362 L180 420 L210 362" />
              <ellipse class="b" cx="180" cy="230" rx="74" ry="86" />
              <path d="M108 196 L116 128 L142 168 L158 112 L184 160 L206 108 L222 160 L248 122 L254 196 C220 176 140 176 108 196 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="5" stroke-linejoin="round" />
              <path class="l" d="M148 226 h16 M196 226 h16" stroke-width="8" />
              <path class="b s03-boca" d="M150 262 C165 290 195 290 210 262 Z" />
              <path class="l" d="M300 440 C340 420 350 380 340 340" stroke-width="12" />
              <g transform="translate(345 300) rotate(-12)"><rect class="b" x="-14" y="0" width="28" height="130" rx="10"/><rect x="-46" y="-80" width="92" height="80" rx="8" fill="#ffd21f" stroke="#f4f6fb" stroke-width="6"/><text x="0" y="-30" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="#050d22" data-layout-ignore>MÓVIL</text><circle cx="0" cy="-112" r="38" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7"/></g>
            </g>
          </g>
        </svg>
        <div class="cartela s03-mosca-rot">UNA MOSCA</div>
"""
JS = """
      const ADENTRO = 1.71, DUENIO = 2.57, MOSTRADOR = 3.23, MOSCA = 4.19;
      // cuadro 0: la fachada ya está, la cámara se acomoda
      tl.fromTo(q(".s03-camara"), { scale: 1.08 }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(q(".s03-cronista"), { x: -200 }, { x: 0, duration: 0.3, ease: "back.out(1.4)" }, 0);
      tl.to(q(".s03-cronista"), { y: 8, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.3);
      habla(".s03-boca", 0, 1.6, "180 276");
      gsap.set(q(".s03-adentro"), { opacity: 0.25 });
      // "adentro": zoom a la vidriera, el cronista sale
      tl.to(q(".s03-cronista"), { x: -520, duration: 0.35, ease: "power2.in" }, ADENTRO - 0.1);
      tl.to(q(".s03-camara"), { scale: 1.75, x: 170, y: -40, duration: 0.6, ease: "power3.inOut" }, ADENTRO);
      tl.to(q(".s03-adentro"), { opacity: 1, duration: 0.3 }, ADENTRO + 0.2);
      tl.to(q(".s03-cartel"), { opacity: 0, duration: 0.2 }, ADENTRO);
      // el dueño respira, el mostrador vacío late
      tl.fromTo(q(".s03-raul"), { y: 0 }, { y: -6, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, DUENIO);
      tl.fromTo(qa(".s03-mostrador"), { opacity: 0.6 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 4, immediateRender: false }, MOSTRADOR);
      // la mosca vuela en loops
      gsap.set(q(".s03-mosca"), { opacity: 0 });
      tl.to(q(".s03-mosca"), { opacity: 1, duration: 0.1 }, MOSCA - 0.4);
      const m = q(".s03-bicho");
      [[0, 0], [60, -50], [90, 20], [30, 60], [-20, 10], [40, -40], [80, 10]].forEach(([x, y], i) => tl.to(m, { x, y, duration: 0.11, ease: "sine.inOut" }, MOSCA - 0.4 + i * 0.11));
      tl.to(m, { x: 20, y: -20, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, MOSCA + 0.38);
      pop(".s03-mosca-rot", MOSCA);
"""
SFX = [{"t": 0.0, "sfx": "click-soft", "vol": 0.25}, {"t": 1.65, "sfx": "whoosh", "vol": 0.25}, {"t": 3.23, "sfx": "pop", "vol": 0.2}, {"t": 3.85, "sfx": "typing", "vol": 0.12, "max": 0.6}, {"t": 4.19, "sfx": "pop", "vol": 0.3}]
