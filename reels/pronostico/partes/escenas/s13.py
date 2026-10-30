ID = "s13-cta"; DUR = 8.46
SECO = '<path class="s13-seco" d="M285 980 C285 830 400 735 540 735 C680 735 795 830 795 980 L795 1420 L285 1420 Z" fill="#000" />'
ICON_SOL = '<circle cx="0" cy="0" r="30" fill="#ffd23f" stroke="#f4f6fb" stroke-width="5" /><path d="M0 -52 V-42 M0 42 V52 M-52 0 H-42 M42 0 H52 M-36 -36 L-29 -29 M29 29 L36 36 M36 -36 L29 -29 M-29 29 L-36 36" stroke="#ffd23f" stroke-width="6" stroke-linecap="round" />'
ICON_NUBE = '<path class="b" d="M-52 22 C-76 22 -76 -10 -50 -14 C-50 -44 -10 -48 0 -26 C10 -54 56 -48 52 -14 C78 -14 80 22 54 22 Z" />'
ICON_TOR = ICON_NUBE + '<path d="M-4 24 L-18 50 L2 50 L-12 76" fill="none" stroke="#ffd23f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />'
CSS = """
    $ .s13-marca { position: absolute; left: 0; right: 0; top: 1250px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; letter-spacing: 0.04em; color: #5ce611; }
    $ .s13-card { position: absolute; left: 80px; top: 930px; width: 920px; height: 250px; background: #0b2547; border: 6px solid #f4f6fb; border-radius: 26px; }
    $ .s13-card b { position: absolute; left: 40px; top: 34px; width: 440px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; line-height: 1.08; color: #f4f6fb; }
    $ .s13-card small { position: absolute; left: 40px; top: 190px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.2em; color: #5ec8ff; }
    $ .s13-com { position: absolute; left: 110px; top: 1215px; width: 860px; height: 120px; background: #f4f6fb; border-radius: 28px; border-bottom-left-radius: 6px; overflow: hidden; }
    $ .s13-com span { position: absolute; left: 34px; top: 34px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 44px; color: #061428; white-space: nowrap; }
    $ .s13-tapa { position: absolute; left: 0; top: 0; width: 860px; height: 120px; background: #f4f6fb; }
    $ .s13-cursor { position: absolute; left: 34px; top: 30px; width: 5px; height: 60px; background: #5ce611; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <clipPath id="s13-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath>
            <mask id="s13-mask" maskUnits="userSpaceOnUse" x="-400" y="0" width="1880" height="1920"><rect x="-400" y="0" width="1880" height="1920" fill="#fff" />""" + SECO + """</mask>
          </defs>
          <g class="s13-lluvia-w" clip-path="url(#s13-clip)"><g mask="url(#s13-mask)">""" + lluvia("s13-lluvia", 50, -300, 1300, 420, 1000, 133, globos=0.5, vel=(800, 1100), esc=(0.9, 1.4), ang=12) + """</g></g>
          <g class="s13-par"><g transform="translate(540 980) scale(0.85)">""" + PARAGUAS("s13") + """</g></g>
        </svg>
        <div class="s13-marca">SCALERICS</div>
        <div class="s13-card"><b>¿Qué pronóstico tiene tu local?</b><small>CONTANOS ABAJO</small>
          <svg viewBox="0 0 920 250" style="position:absolute;left:0;top:0;width:920px;height:250px" aria-hidden="true">
            <g class="s13-op s13-op0"><g transform="translate(570 120) scale(0.9)">""" + ICON_SOL + """</g></g>
            <g class="s13-op s13-op1"><g transform="translate(700 115) scale(0.85)">""" + ICON_NUBE + """</g></g>
            <g class="s13-op s13-op2"><g transform="translate(835 100) scale(0.85)">""" + ICON_TOR + """</g></g>
          </svg>
        </div>
        <div class="s13-com"><span>Tormenta todos los domingos...</span><div class="s13-tapa"></div><div class="s13-cursor"></div></div>
"""
JS = """
      const MARCA = 0.19, PARAGUAS = 1.65, QUE = 2.55, DEJALO = 3.97;
      lluvia(".s13-lluvia", 0, DUR);
      // cuadro 0: el paraguas abriéndose
      gsap.set(q(".s13-seco"), { scaleX: 0.3, scaleY: 0.7, svgOrigin: "540 980" });
      tl.fromTo(q(".s13-par"), { scaleX: 0.3, scaleY: 0.8, svgOrigin: "540 980" }, { scaleX: 1, scaleY: 1, svgOrigin: "540 980", duration: 0.4, ease: "back.out(2)" }, 0);
      tl.to(q(".s13-seco"), { scaleX: 1, scaleY: 1, svgOrigin: "540 980", duration: 0.4, ease: "back.out(2)" }, 0);
      golpe(".s13-marca", MARCA + 0.05, 1.8);
      tl.fromTo(q(".s13-par"), { filter: "drop-shadow(0 0 0 rgba(92,230,17,0))" }, { filter: "drop-shadow(0 0 30px rgba(92,230,17,0.55))", duration: 0.4, immediateRender: false }, MARCA + 0.1);
      tl.to(q(".s13-par"), { rotation: 3, svgOrigin: "540 1220", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, PARAGUAS - 0.5);
      tl.fromTo(q(".s13-ojos"), { scaleY: 1, svgOrigin: "0 -130" }, { scaleY: 0.1, svgOrigin: "0 -130", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, PARAGUAS);
      // ¿qué pronóstico tiene tu local?
      tl.to(q(".s13-marca"), { opacity: 0, y: 40, duration: 0.25 }, QUE - 0.3);
      tl.to([q(".s13-par"), q(".s13-seco")], { scale: 0.5, y: -230, svgOrigin: "540 980", duration: 0.45, ease: "power3.inOut" }, QUE - 0.3);
      gsap.set(q(".s13-card"), { opacity: 0 });
      tl.fromTo(q(".s13-card"), { opacity: 1, y: 300, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, QUE);
      qa(".s13-op").forEach((g, i) => { gsap.set(g, { opacity: 0 }); tl.fromTo(g, { opacity: 1, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, QUE + 0.45 + i * 0.15); });
      tl.to(q(".s13-op2"), { scale: 1.2, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, QUE + 1.0);
      // dejalo en los comentarios: el comentario se escribe solo
      gsap.set(q(".s13-com"), { opacity: 0 });
      tl.fromTo(q(".s13-com"), { opacity: 1, y: 140 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, DEJALO - 0.2);
      tl.fromTo(q(".s13-tapa"), { x: 34 }, { x: 760, duration: 1.6, ease: "steps(28)" }, DEJALO + 0.2);
      tl.fromTo(q(".s13-cursor"), { x: 0 }, { x: 726, duration: 1.6, ease: "steps(28)" }, DEJALO + 0.2);
      tl.fromTo(q(".s13-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 7 }, DEJALO + 1.8);
      tl.to(q(".s13-par"), { rotation: -3, svgOrigin: "540 1220", duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, DEJALO + 0.4);
"""
SFX = [{"t": 0.0, "sfx": "whoosh", "vol": 0.25}, {"t": 0.2, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.7}, {"t": 0.35, "sfx": "sparkle", "vol": 0.25}, {"t": 2.6, "sfx": "pop", "vol": 0.28}, {"t": 3.05, "sfx": "click-soft", "vol": 0.22}, {"t": 4.2, "sfx": "typing", "vol": 0.25, "max": 1.6}, {"t": 6.0, "sfx": "chime", "vol": 0.22, "max": 1.8}]
