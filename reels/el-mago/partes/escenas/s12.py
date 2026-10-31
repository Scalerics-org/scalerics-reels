ID = "s12-celular"; DUR = 3.12
CSS = """
    $ .s12-cel { position: absolute; left: 300px; top: 600px; width: 480px; height: 880px; border: 8px solid #e6e8f0; border-radius: 60px; background: #0a0610; overflow: hidden; }
    $ .s12-hora { position: absolute; left: 0; right: 0; top: 90px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 300; font-size: 110px; color: #e6e8f0; }
    $ .s12-fecha { position: absolute; left: 0; right: 0; top: 220px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.2em; color: #c3a2ff; }
    $ .s12-noti { position: absolute; left: 22px; right: 22px; top: 320px; padding: 18px 20px 20px; background: #e6e8f0; border-radius: 26px; border-left: 12px solid #5ce611; }
    $ .s12-noti small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; color: #2b1250; }
    $ .s12-noti b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; color: #0a0610; }
    $ .s12-noti svg { position: static; width: 380px; height: 150px; margin-top: 10px; }
    $ .s12-sello { position: absolute; left: 560px; top: 1380px; padding: 10px 22px 8px; border: 6px solid #5ce611; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; color: #5ce611; text-transform: uppercase; transform: rotate(-5deg); background: #0a0610; }
    $ .s12-viejo { position: absolute; left: 40px; top: 760px; width: 300px; padding: 16px 18px; background: #e6e8f0; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; color: #0a0610; text-transform: uppercase; transform: rotate(-8deg); }
"""
HTML = """
        <div class="s12-viejo">Reporte del día<br><small style="font-family:'IBM Plex Mono';font-weight:500;font-size:20px;color:#2b1250">HECHO A MANO</small></div>
        <div class="s12-cel"><div class="s12-hora">21:30</div><div class="s12-fecha">HOY · TU LOCAL</div>
          <div class="s12-noti"><small>AUTOMÁTICO · AHORA</small><b>Reporte del día</b>
            <svg viewBox="0 0 380 150"><g class="s12-barras"><rect x="10" y="80" width="50" height="70" rx="6" fill="#2b1250" /><rect x="80" y="50" width="50" height="100" rx="6" fill="#2b1250" /><rect x="150" y="90" width="50" height="60" rx="6" fill="#2b1250" /><rect x="220" y="30" width="50" height="120" rx="6" fill="#5ce611" /><rect x="290" y="10" width="50" height="140" rx="6" fill="#5ce611" /></g></svg>
          </div>
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + GALERA("s12", "s12-gal", 540, 520, 0.5) + """
          """ + DESTELLOS("s12", "s12-d", [(250, 700, 34), (850, 760, 40), (860, 1200, 28), (230, 1260, 30)], "#5ce611") + """
        </svg>
        <div class="s12-sello">Llegó solo</div>
"""
JS = """
      const REPORTE = 0.59, LLEGO = 1.34, CEL = 1.67;
      // el reporte hecho a mano se va
      tl.fromTo(q(".s12-viejo"), { opacity: 1 }, { y: 900, rotation: -40, opacity: 0, duration: 0.6, ease: "power2.in", immediateRender: false }, REPORTE);
      tl.fromTo(q(".s12-cel"), { y: 200, opacity: 0.6, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      // la galera da vuelta y cae el reporte en el celular
      tl.fromTo(q(".s12-gal"), { y: -300, opacity: 1 }, { y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, REPORTE - 0.3);
      tl.to(q(".s12-gal"), { rotation: 180, svgOrigin: "540 580", duration: 0.35, ease: "back.out(1.6)" }, REPORTE + 0.1);
      gsap.set(q(".s12-noti"), { opacity: 0 });
      tl.fromTo(q(".s12-noti"), { opacity: 1, y: -260 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, LLEGO - 0.15);
      tl.fromTo(q(".s12-barras"), { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.5, ease: "back.out(1.6)", immediateRender: false }, LLEGO + 0.1);
      destello(".s12-d path", LLEGO, 2);
      pop(".s12-sello", CEL + 0.1, { rotation: -5 });
      tl.to(q(".s12-gal"), { y: -400, opacity: 0, duration: 0.3, ease: "power2.in" }, CEL + 0.3);
"""
SFX = [{"t": 0.3, "sfx": "whoosh", "vol": 0.25}, {"t": 0.7, "sfx": "pop", "vol": 0.25}, {"t": 1.25, "sfx": "notification", "vol": 0.35}, {"t": 1.4, "sfx": "sparkle", "vol": 0.28}, {"t": 1.8, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
