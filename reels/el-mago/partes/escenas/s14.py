ID = "s14-revela"; DUR = 4.52
CSS = """
    $ .s14-sello { position: absolute; left: 520px; top: 1270px; padding: 14px 28px 10px; border: 8px solid #ff4fa3; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1; color: #ff4fa3; text-transform: uppercase; text-align: center; transform: rotate(-7deg); background: rgba(10, 6, 16, 0.85); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s14", "", 540, 1470, 380, 60, 540) + """
          <g class="s14-dueno"><g transform="translate(-20 980) scale(0.95)">""" + DUENO("s14", telefono=False) + """
            <path class="b s14-mano" d="M260 330 C300 300 320 270 300 250 C280 240 260 270 250 300 Z" />
          </g></g>
          <g class="s14-mago"><g transform="translate(270 680) scale(1.5)">""" + MAGO("s14m", varita=False) + """
            <g class="s14-shh"><path d="M180 344 L180 282" stroke="#e6e8f0" stroke-width="22" stroke-linecap="round" /><circle class="s" cx="180" cy="356" r="26" /></g>
          </g></g>
          """ + DESTELLOS("s14", "s14-d", [(220, 980, 30), (860, 900, 34), (900, 1250, 22), (180, 1300, 20)], "#ff4fa3") + """
        </svg>
        <div class="s14-sello">Secreto<br>profesional</div>
"""
JS = """
      const UN = 1.27, NUNCA = 1.71, REVELA = 1.80, TRUCOS = 3.05;
      // el dueño pregunta en voz baja
      tl.fromTo(q(".s14-dueno"), { x: -300 }, { x: 0, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s14-boca", 0, 0.9, "180 294");
      tl.fromTo(q(".s14-dueno"), { rotation: 0, svgOrigin: "150 1500" }, { rotation: 5, svgOrigin: "150 1500", duration: 0.3, ease: "sine.out", immediateRender: false }, 0.2);
      gsap.set(q(".s14-mago"), { opacity: 0 });
      tl.fromTo(q(".s14-mago"), { opacity: 1, x: 700 }, { opacity: 1, x: 300, duration: 0.3, ease: "power3.out", immediateRender: false }, 0.3);
      gsap.set(q(".s14-shh"), { opacity: 0 });
      // el mago, solemne: dedo en la boca
      tl.to(q(".s14-dueno"), { x: -500, opacity: 0, duration: 0.3, ease: "power3.in" }, UN - 0.25);
      tl.to(q(".s14-mago"), { x: 0, duration: 0.35, ease: "power3.out" }, UN - 0.2);
      habla(".s14m-boca", UN, 1.9, "180 302");
      tl.to(q(".s14m-ceja"), { y: -14, rotation: -6, svgOrigin: "180 205", duration: 0.2 }, NUNCA);
      tl.to(q(".s14-mago"), { scale: 1.08, svgOrigin: "540 1520", duration: 1.2, ease: "power1.inOut" }, NUNCA);
      tl.fromTo(q(".s14-shh"), { opacity: 1, y: 140 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, TRUCOS - 0.35);
      destello(".s14-d path", REVELA, 2);
      pop(".s14-sello", TRUCOS, { rotation: -7 });
      sacudon(TRUCOS + 0.05, 0.8);
      tl.to(q(".s14m-galera"), { rotation: -10, svgOrigin: "180 172", duration: 0.2, yoyo: true, repeat: 1 }, TRUCOS + 0.5);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.1, "sfx": "whoosh", "vol": 0.25}, {"t": 1.8, "sfx": "sparkle", "vol": 0.28}, {"t": 2.7, "sfx": "click-soft", "vol": 0.25}, {"t": 3.05, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.6}]
