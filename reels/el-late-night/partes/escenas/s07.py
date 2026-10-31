ID = "s07-sonando"; DUR = 4.28
CSS = """
    $ .s07-que { position: absolute; left: 0; right: 0; top: 620px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #ffb547; text-shadow: 0 8px 0 #0b1330; }
    $ .s07-z { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: #fff1dc; line-height: 1; }
    $ .s07-env { position: absolute; left: 540px; top: 900px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: #0b1330; background: #ffb547; border-radius: 20px 20px 4px 20px; padding: 12px 18px 10px; }
"""
nube = "M260 1100 C200 1100 180 1020 240 990 C220 920 320 880 370 920 C400 850 520 840 560 900 C620 850 740 870 750 940 C820 930 870 1000 830 1050 C880 1090 840 1160 770 1150 C740 1210 620 1210 590 1160 C540 1210 420 1210 390 1160 C330 1190 250 1160 260 1100 Z"
HTML = """
        <div class="s07-uno">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s07-nico"><g transform="translate(270 860) scale(1.5)">""" + NICO("s07", tarjeta=False) + """</g></g>
            """ + ESCRITORIO("s07", -40, 1420, 1160, 300, taza=False) + """
          </svg>
          <div class="s07-que">¿A LAS TRES?</div>
        </div>
        <div class="s07-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <!-- la cama -->
            <rect class="m" x="80" y="1280" width="920" height="80" rx="16" />
            <path class="l" d="M110 1360 V1440 M970 1360 V1440" stroke-width="10" />
            <rect class="m" x="70" y="1150" width="40" height="290" rx="14" />
            <ellipse class="w" cx="250" cy="1250" rx="120" ry="44" />
            <g class="s07-cabeza">
              <ellipse class="b" cx="260" cy="1205" rx="74" ry="66" />
              <path class="l" d="M220 1200 C230 1210 244 1210 252 1200 M276 1200 C284 1210 298 1210 306 1200" stroke-width="6" />
              <path class="w" d="M232 1236 C250 1228 268 1228 286 1236 C270 1246 250 1246 232 1236 Z" stroke-width="4" />
              <ellipse cx="262" cy="1258" rx="10" ry="6" fill="#fff1dc" />
            </g>
            <path class="k s07-manta" d="M320 1180 C450 1140 700 1150 990 1190 L990 1290 L320 1290 Z" />
            <path class="l" d="M380 1200 C520 1180 700 1190 960 1214" stroke-width="5" opacity="0.4" />
            <!-- el sueño -->
            <circle class="w s07-b1" cx="330" cy="1110" r="14" stroke-width="4" /><circle class="w s07-b2" cx="360" cy="1060" r="22" stroke-width="4" />
            <g class="s07-sueno">
              <path class="b" d='""" + nube + """' stroke-width="7" />
              <g transform="translate(320 880) scale(0.62)">""" + DUENO("s07d") + """</g>
              <g class="s07-tel"><rect class="b" x="470" y="960" width="60" height="110" rx="12" stroke-width="5" /><rect x="480" y="972" width="40" height="80" rx="6" fill="#5ce611" opacity="0.8" /></g>
            </g>
          </svg>
          <div class="s07-env">¡Respondido!</div>
          <div class="s07-z s07-z1" style="left: 380px; top: 1150px; font-size: 60px;">z</div>
          <div class="s07-z s07-z2" style="left: 420px; top: 1110px; font-size: 80px;">z</div>
          <div class="s07-z s07-z3" style="left: 470px; top: 1060px; font-size: 100px;">Z</div>
        </div>
"""
JS = """
      const A_ESA = 0.52, DUENO = 1.61, SONANDO = 1.97, CONTESTA = 3.08;
      golpe(".s07-que", 0.15, 2);
      tl.fromTo(q(".s07-cejas"), { y: 0 }, { y: -22, duration: 0.12, ease: "back.out(3)", immediateRender: false }, 0.1);
      habla(".s07-boca", 0, 0.5, "180 284");
      sacudon(0.2, 0.7);
      // corte al dueño durmiendo
      tl.to(q(".s07-uno"), { y: -2100, duration: 0.35, ease: "power3.in" }, A_ESA + 0.2);
      gsap.set(q(".s07-dos"), { y: 1500 });
      tl.fromTo(q(".s07-dos"), { y: 1500 }, { y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, A_ESA + 0.3);
      tl.fromTo(q(".s07-manta"), { scaleY: 1, svgOrigin: "650 1290" }, { scaleY: 1.06, svgOrigin: "650 1290", duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.8);
      ["1", "2", "3"].forEach((k, i) => { gsap.set(q(".s07-z" + k), { opacity: 0 }); tl.fromTo(q(".s07-z" + k), { opacity: 0, y: 20 }, { opacity: 1, y: -20, duration: 0.5, ease: "power1.out", immediateRender: false }, DUENO - 0.4 + i * 0.2); tl.to(q(".s07-z" + k), { opacity: 0, duration: 0.3 }, SONANDO + 0.2 + i * 0.1); });
      pop(".s07-b1", SONANDO - 0.15); pop(".s07-b2", SONANDO - 0.05);
      gsap.set(q(".s07-sueno"), { opacity: 0 });
      tl.fromTo(q(".s07-sueno"), { opacity: 0, scale: 0.6, transformOrigin: "20% 80%" }, { opacity: 1, scale: 1, transformOrigin: "20% 80%", duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, SONANDO + 0.05);
      tl.fromTo(q(".s07-tel"), { rotation: -8, svgOrigin: "500 1070" }, { rotation: 8, svgOrigin: "500 1070", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, SONANDO + 0.4);
      pop(".s07-env", CONTESTA - 0.05, { y: 20 });
      tl.fromTo(q(".s07-cabeza"), { rotation: 0, svgOrigin: "260 1250" }, { rotation: 6, svgOrigin: "260 1250", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, CONTESTA);
"""
SFX = [{"t": 0.1, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 0.65, "sfx": "whoosh", "vol": 0.25, "max": 0.6}, {"t": 1.95, "sfx": "sparkle", "vol": 0.28}, {"t": 3.0, "sfx": "ping", "vol": 0.3}]
