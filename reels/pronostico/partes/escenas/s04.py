ID = "s04-movil"; DUR = 4.51
CSS = """
    $ .s04-preg { position: absolute; left: 380px; top: 560px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 260px; line-height: 1; color: #ffd23f; text-shadow: 10px 10px 0 #061428; }
    $ .s04-nombre { position: absolute; left: 590px; top: 600px; }
    $ .s04-nombre b { display: block; padding: 10px 22px 8px; background: #5ec8ff; color: #061428; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; text-transform: uppercase; white-space: nowrap; }
    $ .s04-nombre span { display: block; padding: 8px 22px 6px; background: #f4f6fb; color: #0b2547; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.16em; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s04-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath></defs>
          <path d="M0 1330 H1080" stroke="#f4f6fb" stroke-width="6" opacity="0.6" />
          <path d="M0 1350 H1080" stroke="#5ec8ff" stroke-width="10" stroke-dasharray="80 60" opacity="0.6" />
          <g class="s04-espiral"><path d="M820 640 m0 0 c20 -10 40 10 30 30 c-15 30 -60 25 -70 -5 c-15 -45 30 -80 75 -70 c60 15 75 90 30 130 c-50 45 -140 25 -160 -40" fill="none" stroke="#f4f6fb" stroke-width="10" stroke-linecap="round" opacity="0.8" /></g>
          <g class="s04-local">
            <rect x="590" y="790" width="460" height="540" fill="#14457a" stroke="#f4f6fb" stroke-width="7" />
            <path d="M570 790 L610 720 H1030 L1070 790 Z" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
            <path d="M680 720 L660 790 M780 720 L770 790 M880 720 L880 790 M980 720 L990 790" stroke="#061428" stroke-width="6" />
            <rect x="640" y="850" width="360" height="300" fill="#061428" stroke="#f4f6fb" stroke-width="6" />
            <g class="s04-walter"><g transform="translate(700 900) scale(0.62)">""" + WALTER("s04") + """</g></g>
            <rect class="m" x="620" y="1130" width="400" height="200" />
            <rect x="830" y="1080" width="70" height="50" rx="8" fill="#ffd23f" stroke="#f4f6fb" stroke-width="5" />
          </g>
          <g clip-path="url(#s04-clip)">""" + lluvia("s04-lluvia", 60, -300, 1300, 420, 1000, 44, globos=0.45, vel=(900, 1200), esc=(1.0, 1.6), ang=16) + """</g>
          <g class="s04-mov"><g transform="translate(40 860) scale(1.0)">""" + MOVILERO("s04") + """</g></g>
""" + MIC("s04", 400, 1130, 50) + """
        </svg>
        <div class="s04-nombre"><b>Don Walter</b><span>SIN PARAGUAS</span></div>
        <div class="s04-preg">?</div>
"""
JS = """
      const OJO = 1.09, WALTER = 2.43, CONTESTA = 3.45;
      lluvia(".s04-lluvia", 0, DUR);
      // el movilero contra el viento
      tl.fromTo(q(".s04-mov"), { rotation: -4, svgOrigin: "220 1420" }, { rotation: 3, svgOrigin: "220 1420", duration: 0.35, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s04-capucha"), { y: 0 }, { y: -8, duration: 0.12, yoyo: true, repeat: 17, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s04-chorro"), { y: 0, opacity: 1 }, { y: 30, opacity: 0, duration: 0.4, repeat: 10, ease: "power1.in" }, 0);
      habla(".s04-mov-boca", 0.05, 3.9, "180 280");
      tl.fromTo(q(".s04-mic"), { rotation: -4, svgOrigin: "400 1130" }, { rotation: 4, svgOrigin: "400 1130", duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0);
      // ojo de la tormenta
      gsap.set(q(".s04-espiral"), { opacity: 0 });
      tl.fromTo(q(".s04-espiral"), { opacity: 1, scale: 0.2, rotation: 0, svgOrigin: "820 640" }, { opacity: 1, scale: 1, rotation: -400, svgOrigin: "820 640", duration: 1.2, ease: "power2.out", immediateRender: false }, OJO - 0.1);
      tl.to(q(".s04-espiral"), { rotation: -900, svgOrigin: "820 640", duration: 2.3, ease: "none" }, OJO + 1.1);
      // Don Walter
      tl.fromTo(q(".s04-local"), { opacity: 0.45 }, { opacity: 1, duration: 0.2 }, WALTER - 0.1);
      gsap.set(q(".s04-walter"), { opacity: 0 });
      tl.fromTo(q(".s04-walter"), { opacity: 1, y: 220 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, WALTER);
      tl.fromTo(q(".s04-nombre"), { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, WALTER + 0.1);
      tl.to(q(".s04-mic"), { x: 120, y: -40, duration: 0.3, ease: "power2.out" }, WALTER + 0.1);
      golpe(".s04-preg", CONTESTA, 2.4);
      sacudon(CONTESTA + 0.05);
"""
SFX = [{"t": 0.0, "sfx": "whoosh-cinematic", "vol": 0.18, "max": 1.0}, {"t": 1.1, "sfx": "whoosh", "vol": 0.2}, {"t": 2.43, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "click", "vol": 0.22}, {"t": 3.45, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.6}]
