ID = "s02-tormenta"; DUR = 7.42
AUDIO = '<rect x="-96" y="-34" width="192" height="68" rx="34" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="5" /><path d="M-70 -14 L-46 0 L-70 14 Z" fill="#061428" /><path d="M-30 -8 v16 M-18 -18 v36 M-6 -10 v20 M6 -16 v32 M18 -6 v12" stroke="#061428" stroke-width="6" stroke-linecap="round" /><text x="60" y="10" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="28" fill="#061428">4:00</text>'
GRANIZO = [(180, 1180, 0.0), (520, 1220, 0.15), (820, 1170, 0.3), (340, 1080, 0.55), (690, 1110, 0.7), (930, 1250, 0.85), (140, 1270, 1.0)]
CSS = """
    $ .s02-cuanto { position: absolute; left: 0; padding: 10px 22px 8px; background: #f4f6fb; color: #061428; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; border-radius: 14px; box-shadow: 6px 6px 0 #ff8a1f; }
    $ .s02-c1 { top: 820px; font-size: 56px; }
    $ .s02-c2 { top: 960px; font-size: 44px; }
    $ .s02-c3 { top: 1080px; font-size: 38px; }
    $ .s02-oeste { left: 70px; top: 1220px; background: #f4f6fb; color: #061428; font-size: 40px; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
""" + MAPA("s02") + """
          <g class="s02-pin"><g transform="translate(760 1080)">""" + PIN() + """</g></g>
          <path class="s02-flecha" d="M340 860 C480 820 620 860 720 960 M672 948 L724 964 L716 910" fill="none" stroke="#ff8a1f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s02-nube"><g transform="translate(290 760) scale(1.25)">""" + NUBE("k") + """
            <path class="s02-rayo" d="M-10 60 L-46 130 L0 130 L-36 210" fill="none" stroke="#ffd23f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
            <path class="s02-rayo" d="M90 60 L70 110 L100 110 L80 160" fill="none" stroke="#ffd23f" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          </g></g>
          <g class="s02-viento" fill="none" stroke="#f4f6fb" stroke-width="8" stroke-linecap="round">
            <path class="s02-v1" d="M60 900 C260 860 420 940 600 900 C700 880 720 820 670 800 C630 790 610 830 640 850" />
            <path class="s02-v2" d="M60 1030 C300 990 520 1070 760 1020 C860 1000 880 940 830 925 C790 915 770 955 800 972" />
            <path class="s02-v3" d="M60 1150 C220 1120 380 1180 520 1150" />
          </g>
""" + "".join(f'          <g class="s02-g s02-g{i}"><g transform="translate({x} {y}) rotate({(i * 7) % 15 - 7})">{AUDIO}</g></g>\n' for i, (x, y, d) in enumerate(GRANIZO)) + """
        </svg>
        <div class="cartela s02-oeste">◀ OESTE</div>
        <div class="s02-cuanto s02-c1">¿A cuánto está?</div>
        <div class="s02-cuanto s02-c2">¿A cuánto está?</div>
        <div class="s02-cuanto s02-c3">¿A cuánto está?</div>
"""
JS = """
      const TORMENTA = 0.63, DESDE = 1.46, RAFAGAS = 2.70, CUANTO = 3.49, GRANIZO = 4.97;
      // cuadro 0: el mapa y el pin; la nube ya asoma por la izquierda
      tl.fromTo(q(".s02-nube"), { x: -420 }, { x: 0, duration: 1.0, ease: "power2.out" }, 0);
      tl.to(q(".s02-nube"), { x: 30, duration: 0.6, yoyo: true, repeat: 8, ease: "sine.inOut" }, 1.0);
      dibujar(".s02-rayo", TORMENTA, 0.2);
      tl.to(qa(".s02-rayo"), { opacity: 0.2, duration: 0.08, yoyo: true, repeat: 5, ease: "steps(1)" }, TORMENTA + 0.25);
      sacudon(TORMENTA + 0.05, 1.3);
      pop(".s02-oeste", DESDE + 0.2, { x: -40 });
      dibujar(".s02-flecha", DESDE, 0.6);
      tl.fromTo(q(".s02-pin"), { scale: 1, svgOrigin: "760 1080" }, { scale: 1.15, svgOrigin: "760 1080", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, DESDE + 0.6);
      // ráfagas de "¿a cuánto está?"
      dibujar(".s02-v1", RAFAGAS, 0.45); dibujar(".s02-v2", RAFAGAS + 0.15, 0.5); dibujar(".s02-v3", RAFAGAS + 0.3, 0.4);
      [".s02-c1", ".s02-c2", ".s02-c3"].forEach((s, i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 1, x: -700, rotation: -12 }, { opacity: 1, x: [150, 380, 220][i], rotation: [-6, 5, -3][i], duration: 0.4, ease: "power3.out", immediateRender: false }, CUANTO + i * 0.14);
        tl.to(q(s), { x: "+=70", duration: 0.8, ease: "none" }, CUANTO + 0.4 + i * 0.14);
        tl.to(q(s), { x: 1300, rotation: 10, duration: 0.35, ease: "power2.in" }, GRANIZO - 0.35 + i * 0.05);
      });
      tl.to(q(".s02-viento"), { opacity: 0, duration: 0.3 }, GRANIZO - 0.2);
      // granizo de audios
      const G = """ + str([d for (_, _, d) in GRANIZO]) + """;
      G.forEach((d, i) => {
        gsap.set(q(".s02-g" + i), { opacity: 0 });
        tl.fromTo(q(".s02-g" + i), { opacity: 1, y: -700 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out", immediateRender: false }, GRANIZO + d);
      });
      sacudon(GRANIZO + 0.3, 0.8); sacudon(GRANIZO + 0.9, 0.8);
      tl.to(qa(".s02-g"), { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.05 }, GRANIZO + 1.6);
"""
SFX = [{"t": 0.6, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.7}, {"t": 1.5, "sfx": "whoosh", "vol": 0.22}, {"t": 2.7, "sfx": "whoosh-cinematic", "vol": 0.22, "max": 1.2}, {"t": 3.5, "sfx": "whoosh-short", "vol": 0.25}, {"t": 4.97, "sfx": "glitch-1", "vol": 0.22}, {"t": 5.3, "sfx": "pop", "vol": 0.3}, {"t": 5.8, "sfx": "pop", "vol": 0.3}]
