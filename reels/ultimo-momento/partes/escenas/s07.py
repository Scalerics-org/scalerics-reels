ID = "s07-vecina"; DUR = 6.49
CSS = """
    $ .s07-calle { position: absolute; left: 0; top: 0; width: 2200px; height: 1920px; }
    $ .s07-calle svg { width: 2200px; }
    $ .s07-enfrente { left: 330px; top: 590px; background: #ffd21f; color: #050d22; font-size: 52px; box-shadow: 8px 8px 0 #e3212d; }
    $ .s07-porque { left: 60px; top: 600px; background: #f4f6fb; color: #0b1d4a; font-size: 52px; box-shadow: 8px 8px 0 #e3212d; }
"""
VECINA = """
              <path class="y s07-bolsa-i" d="M-10 420 H120 L110 560 H0 Z" />
              <path class="l" d="M20 420 C20 370 90 370 90 420" stroke-width="6" />
              <path class="l" d="M20 420 L10 380 M60 420 L80 370 M95 420 L110 385" stroke-width="6" />
              <path class="m" d="M40 540 C40 400 95 360 180 360 C265 360 320 400 320 540 Z" />
              <path class="l" d="M180 362 V540" />
              <path class="y s07-bolsa-d" d="M240 420 H370 L360 560 H250 Z" />
              <path class="l" d="M270 420 C270 370 340 370 340 420" stroke-width="6" />
              <path class="l" d="M280 420 L270 380 M320 420 L335 372" stroke-width="6" />
              <path class="b" d="M155 300 V365 H205 V300" />
              <ellipse class="b" cx="180" cy="230" rx="72" ry="84" />
              <circle class="w" cx="180" cy="128" r="34" />
              <path class="w" d="M108 222 C104 150 256 150 252 222 C230 186 130 186 108 222 Z" />
              <path class="l" d="M150 232 h14 M196 232 h14" stroke-width="8" />
              <path class="b s07-boca" d="M160 268 C170 286 190 286 200 268 Z" />
"""
HTML = """
        <div class="s07-calle">
          <svg viewBox="0 0 2200 1920" aria-hidden="true">
            <path class="l" d="M0 1330 H2200" opacity="0.5" />
            <path d="M0 1340 H2200" stroke="#1f4fa8" stroke-width="10" stroke-dasharray="80 60" />
            <!-- local de Raúl (izquierda), apagado -->
            <g opacity="0.55">
              <rect class="b" x="40" y="760" width="560" height="570" />
              <path d="M20 760 L50 700 H590 L620 760 Z" fill="#e3212d" stroke="#f4f6fb" stroke-width="7" />
              <rect class="m" x="90" y="830" width="260" height="380" />
              <rect class="b" x="400" y="830" width="160" height="500" />
              <text x="320" y="680" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="40" fill="#f4f6fb">ALMACÉN RAÚL</text>
            </g>
            <!-- local de enfrente (derecha), prendido -->
            <g class="s07-otro">
              <rect x="1380" y="740" width="700" height="590" fill="#1f4fa8" stroke="#f4f6fb" stroke-width="7" />
              <path d="M1350 740 L1390 670 H2070 L2110 740 Z" fill="#ffd21f" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <path d="M1470 670 L1450 740 M1570 670 L1560 740 M1670 670 L1670 740 M1770 670 L1780 740 M1870 670 L1890 740 M1970 670 L2000 740" stroke="#050d22" stroke-width="6" />
              <rect x="1430" y="800" width="380" height="380" fill="#ffd21f" opacity="0.35" stroke="#f4f6fb" stroke-width="7" />
              <path class="l" d="M1440 920 H1800 M1440 1050 H1800" stroke-width="5" />
              <rect class="w" x="1470" y="870" width="40" height="50" /><rect class="w" x="1540" y="870" width="40" height="50" /><rect class="w" x="1650" y="990" width="40" height="60" /><rect class="w" x="1720" y="990" width="40" height="60" /><rect class="w" x="1480" y="1110" width="60" height="70" /><rect class="w" x="1600" y="1110" width="60" height="70" />
              <rect class="b" x="1860" y="820" width="180" height="510" />
              <rect x="1870" y="900" width="160" height="60" rx="8" fill="#ffd21f" />
              <text x="1950" y="942" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="#050d22">ABIERTO</text>
            </g>
          </svg>
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s07-flecha" d="M500 700 C560 720 600 760 620 820 M590 790 L622 824 L650 784" fill="none" stroke="#ffd21f" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s07-vecina">
            <g transform="translate(560 830) scale(1.05)">""" + VECINA + """
            </g>
          </g>
          <g class="s07-mic">
            <g transform="translate(420 1180) rotate(55)">
              <rect class="b" x="-18" y="0" width="36" height="300" rx="12"/><rect x="-58" y="-100" width="116" height="100" rx="10" fill="#ffd21f" stroke="#f4f6fb" stroke-width="7"/><text x="0" y="-38" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="32" fill="#050d22" data-layout-ignore>MÓVIL</text><circle cx="0" cy="-140" r="48" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7"/>
            </g>
          </g>
        </svg>
        <div class="cartela s07-enfrente">DEL LOCAL DE ENFRENTE</div>
        <div class="cartela s07-porque">¿POR QUÉ SE FUE?</div>
"""
JS = """
      const VECINA = 0.67, BOLSAS = 1.71, DEL = 2.19, ENFRENTE = 3.52, SENIORA = 4.68;
      // cuadro 0: la calle frente al local de Raúl, la cámara se mueve un poco
      tl.fromTo(q(".s07-calle"), { x: 60 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0);
      entra(".s07-vecina", VECINA - 0.2, { x: 600 });
      // camina: rebote
      tl.to(q(".s07-vecina"), { y: -14, duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut" }, VECINA);
      // las bolsas rebotan
      tl.fromTo([q(".s07-bolsa-i"), q(".s07-bolsa-d")], { y: 0 }, { y: -26, duration: 0.12, yoyo: true, repeat: 3, ease: "power2.out", immediateRender: false }, BOLSAS);
      // "del... local de enfrente": la cámara panea a la derecha
      tl.to(q(".s07-calle"), { x: -1120, duration: 1.2, ease: "power2.inOut" }, DEL);
      tl.to(q(".s07-vecina"), { x: -460, duration: 1.2, ease: "power2.inOut" }, DEL);
      tl.fromTo(q(".s07-otro"), { opacity: 0.6 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 4, immediateRender: false }, ENFRENTE - 0.3);
      golpe(".s07-enfrente", ENFRENTE, 2);
      sacudon(ENFRENTE + 0.05);
      dibujar(".s07-flecha", ENFRENTE + 0.1, 0.35);
      // "Señora, ¿por qué se fue?": entra el micrófono
      tl.to([q(".s07-enfrente"), q(".s07-flecha")], { opacity: 0, duration: 0.15 }, SENIORA - 0.2);
      entra(".s07-mic", SENIORA - 0.1, { x: -500, y: 200 });
      golpe(".s07-porque", SENIORA + 0.2, 2);
      tl.to(q(".s07-vecina"), { x: -430, rotation: 4, svgOrigin: "740 1400", duration: 0.25, ease: "power2.out" }, SENIORA + 0.3);
"""
SFX = [{"t": 0.55, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.71, "sfx": "pop", "vol": 0.25}, {"t": 2.15, "sfx": "whoosh-cinematic", "vol": 0.22, "max": 1.3}, {"t": 3.45, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 4.6, "sfx": "whoosh-short", "vol": 0.22}, {"t": 4.85, "sfx": "click", "vol": 0.25}]
