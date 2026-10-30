ID = "s07-tres-x"; DUR = 7.19
CSS = """
    $ .s07-tres { position: absolute; left: 0; right: 0; top: 1240px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; color: #ff2d3d; line-height: 1; text-shadow: 0 0 26px rgba(255, 45, 61, 0.6); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + MESA("s07", 40, 1290, 1000, 200) + """
          <g class="s07-jueza"><g transform="translate(288 760) scale(1.4)">""" + JUEZA("s07") + """</g></g>
          <g class="s07-simp"><g transform="translate(288 760) scale(1.4)">""" + SIMPATICO("s07") + """</g></g>
          <g class="s07-cor"><path d="M540 760 C500 700 420 730 440 800 C455 850 540 900 540 900 C540 900 625 850 640 800 C660 730 580 700 540 760 Z" fill="#f6c544" stroke="#fff3d6" stroke-width="7" stroke-linejoin="round" transform="translate(300 -40) scale(0.7)" /></g>
          <g class="s07-raja"><path d="M540 760 L520 800 L555 830 L530 880" fill="none" stroke="#0b080b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="translate(300 -40) scale(0.7)" /></g>
          """ + XROJA("s07", "s07-x1", 540, 1000, 1.15) + """
          """ + XROJA("s07", "s07-x2", 540, 1000, 1.15) + """
          """ + XROJA("s07", "s07-a", 200, 940, 0.62) + XROJA("s07", "s07-b", 540, 940, 0.62) + XROJA("s07", "s07-c", 880, 940, 0.62) + """
          <g class="s07-pre"><g transform="translate(700 1000) scale(1.0)">""" + PRESENTADOR("s07") + """</g></g>
        </svg>
        <div class="s07-tres">¡TRES X!</div>
"""
JS = """
      const MAXI = 0.64, QUIERO = 1.42, NO = 2.90, TRES = 3.50, X = 4.37, UNAS = 5.24;
      // jueza: "No."
      equis(".s07-x1", 0.02);
      tl.fromTo(q(".s07-ceja"), { y: 0 }, { y: -12, duration: 0.15, immediateRender: false }, 0);
      tl.to([q(".s07-jueza"), q(".s07-x1")], { x: -900, duration: 0.3, ease: "power3.in" }, MAXI - 0.2);
      // juez bueno
      entra(".s07-simp", MAXI, { x: 900 });
      habla(".s07-boca", MAXI, 2.4, "180 302");
      pop(".s07-cor", QUIERO);
      tl.to(q(".s07-cor"), { scale: 1.12, svgOrigin: "678 534", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, QUIERO + 0.2);
      gsap.set(q(".s07-raja"), { opacity: 0 });
      dibujar(".s07-raja path", NO - 0.3, 0.15);
      tl.to(q(".s07-cor"), { y: 120, rotation: 25, opacity: 0, svgOrigin: "678 534", duration: 0.4, ease: "power2.in" }, NO - 0.1);
      tl.to(q(".s07-raja"), { y: 120, opacity: 0, duration: 0.4, ease: "power2.in" }, NO - 0.1);
      equis(".s07-x2", NO);
      tl.to([q(".s07-simp"), q(".s07-x2")], { opacity: 0, duration: 0.2 }, TRES - 0.2);
      // ¡tres X!
      equis(".s07-a", TRES); equis(".s07-b", TRES + 0.4); equis(".s07-c", X);
      golpe(".s07-tres", X + 0.05, 2);
      tl.to([q(".s07-a"), q(".s07-b"), q(".s07-c")], { scale: 1.08, svgOrigin: "540 940", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, X + 0.3);
      tl.to(q(".s07-tres"), { opacity: 0, duration: 0.2 }, UNAS - 0.2);
      tl.to(q(".s07-mesa"), { opacity: 0, duration: 0.2 }, TRES - 0.2);
      // el presentador le acerca el micrófono
      entra(".s07-pre", UNAS - 0.1, { x: 500 });
      habla(".s07-boca", UNAS, 1.0, "180 290");
      tl.to(q(".s07-pre .s07-brazo"), { rotation: -30, svgOrigin: "300 460", duration: 0.3, ease: "back.out(2)" }, UNAS + 0.3);
"""
SFX = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}, {"t": 0.6, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.42, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "glitch-1", "vol": 0.25, "max": 0.4}, {"t": 2.9, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}, {"t": 4.4, "sfx": "impact-bass-1", "vol": 0.42, "max": 0.8}, {"t": 5.15, "sfx": "whoosh", "vol": 0.25}]
