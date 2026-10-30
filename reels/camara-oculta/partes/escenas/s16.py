exec(PJ)
ID = "s16-cta"; DUR = 6.07
CSS = """
    $ .s16-manda { top: 620px; font-size: 118px; color: #5ce611; }
    $ .s16-dice { top: 760px; font-size: 54px; color: #fbf7ea; }
    $ .s16-cita { position: absolute; left: 110px; top: 870px; width: 860px; padding: 30px 34px; background: #fbf7ea; border: 6px solid #0c0c0c; box-shadow: 12px 12px 0 #5ce611; transform: rotate(-2deg); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; line-height: 1.1; color: #0c0c0c; text-align: center; text-transform: uppercase; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {tito("s16", 260, 1400, 0.55, "abierta")}
          <g class="s16-avion"><path class="gl" d="M560 1260 L900 1120 L780 1360 L720 1270 Z M720 1270 L900 1120" stroke-width="9" /></g>
          <path class="gl s16-tray" d="M470 1330 C520 1300 540 1290 560 1270" stroke-dasharray="14 14" stroke-width="7" />
        </svg>
        <div class="txt s16-manda">Mandáselo</div>
        <div class="txt s16-dice">al que dice</div>
        <div class="s16-cita">"A mí me conoce todo el barrio"</div>
"""
JS = """
      const DICE = 0.96, CONOCE = 1.43, TODO = 1.89, BARRIO = 2.36;
      gsap.set(q(".s16-manda"), { opacity: 1 });
      tl.fromTo(q(".s16-manda"), { scale: 1.4 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      pop(".s16-dice", DICE - 0.1);
      golpe(".s16-cita", CONOCE, 1.8);
      tl.to(q(".s16-cita"), { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1 }, BARRIO);
      gsap.set(q(".s16-tito"), { opacity: 0 });
      tl.fromTo(q(".s16-tito"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, TODO);
      habla(".s16-tito-boca", TODO, 0.8, "0 -236");
      // el avioncito de compartir sale volando y vuelve a latir (la pantalla nunca queda quieta)
      dibujar(".s16-tray", BARRIO + 0.2, 0.4);
      pop(".s16-avion", BARRIO + 0.3);
      tl.to(q(".s16-avion"), { x: 20, y: -16, duration: 0.6, yoyo: true, repeat: 4, ease: "sine.inOut" }, BARRIO + 0.7);
      tl.to(q(".s16-manda"), { scale: 1.05, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 1.0);
      tl.to(q(".s16-tito"), { rotation: -6, svgOrigin: "260 1400", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, BARRIO + 0.5);
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 1.43, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "whoosh", "vol": 0.22}, {"t": 2.7, "sfx": "chime", "vol": 0.25}]
