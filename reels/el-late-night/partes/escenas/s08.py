ID = "s08-domingo"; DUR = 1.80
CSS = """
    $ .s08-cal { position: absolute; left: 220px; top: 620px; width: 640px; height: 640px; background: #fff1dc; border-radius: 30px; overflow: hidden; box-shadow: 0 12px 0 #ffb547; }
    $ .s08-cal .s08-top { height: 150px; background: #ff3d6e; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: #fff1dc; text-align: center; line-height: 160px; letter-spacing: 0.04em; }
    $ .s08-cal .s08-num { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 300px; color: #0b1330; text-align: center; line-height: 1; margin-top: 30px; }
    $ .s08-cal .s08-cerr { position: absolute; left: 0; right: 0; bottom: 42px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.2em; color: #0b1330; opacity: 0.6; }
    $ .s08-turno { position: absolute; left: 300px; top: 1300px; padding: 16px 28px 12px; background: #5ce611; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 56px; color: #0b1330; transform: rotate(-6deg); white-space: nowrap; }
"""
HTML = """
        <div class="s08-cal"><div class="s08-top">DOMINGO</div><div class="s08-num">12</div><div class="s08-cerr">LOCAL CERRADO</div></div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s08-tick" d="M380 960 L500 1080 L740 820" fill="none" stroke="#5ce611" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" />
          <g class="s08-ag"><g transform="translate(760 1150) scale(0.6)">""" + AGENTE("s08") + """</g></g>
        </svg>
        <div class="s08-turno">TURNO · 10:30</div>
"""
JS = """
      const DOMINGO = 0.09, AGENDE = 0.45, TURNO = 0.98;
      tl.fromTo(q(".s08-cal"), { rotation: -8, scale: 0.85, opacity: 0.6 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0);
      dibujar(".s08-tick", AGENDE, 0.3);
      golpe(".s08-turno", TURNO, 2);
      sacudon(TURNO + 0.04, 0.6);
      entra(".s08-ag", 0.25, { x: 400 });
      tl.fromTo(q(".s08-ag-bd"), { rotation: 0, svgOrigin: "276 372" }, { rotation: -70, svgOrigin: "276 372", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.6);
"""
SFX = [{"t": 0.0, "sfx": "whoosh-short", "vol": 0.2}, {"t": 0.45, "sfx": "chime", "vol": 0.3}, {"t": 0.92, "sfx": "pop", "vol": 0.3}]
