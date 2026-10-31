ID = "s12-remate"; DUR = 5.28
CSS = """
    $ .s12-t1, $ .s12-t2 { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; white-space: nowrap; text-shadow: 0 8px 0 #0b1330; }
    $ .s12-banda { position: absolute; left: 0; right: 0; top: 1150px; height: 330px; background: rgba(5, 10, 31, 0.78); }
    $ .s12-t1 { top: 1180px; font-size: 104px; color: #fff1dc; }
    $ .s12-t2 { top: 1310px; font-size: 140px; color: #ff3d6e; }
    $ .s12-t0 { position: absolute; left: 0; right: 0; top: 1180px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; line-height: 1; color: #fff1dc; text-shadow: 0 8px 0 #0b1330; }
    $ .s12-t0 b { color: #ffb547; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s12", "s12-h", 540, 540, 60, 760, 520, 1560, "#5ce611") + """
          <g class="s12-ag"><g transform="translate(270 560) scale(1.5)">""" + AGENTE("s12", lentes=True) + """</g></g>
        </svg>
        <div class="s12-banda"></div>
        <div class="s12-t0">SE QUEDA <b>SIN CLIENTES</b></div>
        <div class="s12-t1">EL QUE CONTESTA</div>
        <div class="s12-t2">A LOS 3 DÍAS</div>
"""
JS = """
      const EL = 0.81, CLIENTES = 1.76, CONTESTA = 2.96, TRES = 3.42;
      tl.fromTo(q(ESC), { scale: 1.1, transformOrigin: "50% 40%" }, { scale: 1, transformOrigin: "50% 40%", duration: 0.6, ease: "power3.out", immediateRender: false }, 0);
      // se baja los lentes de sol: cancherísimo
      gsap.set(q(".s12-ag-lentes"), { y: -160, opacity: 0 });
      tl.fromTo(q(".s12-ag-lentes"), { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "bounce.out", immediateRender: false }, 0.2);
      habla(".s12-ag-boca", 0, 4.0, "180 260");
      golpe(".s12-t0", CLIENTES, 2);
      tl.fromTo(q(".s12-banda"), { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.2, immediateRender: false }, CLIENTES - 0.15);
      gsap.set(q(".s12-banda"), { opacity: 0 });
      tl.to(q(".s12-t0"), { opacity: 0, duration: 0.15 }, CONTESTA - 0.2);
      golpe(".s12-t1", CONTESTA, 1.8);
      golpe(".s12-t2", TRES, 2.6);
      sacudon(TRES + 0.04, 1.3);
      tl.fromTo(q(".s12-ag-lentes"), { y: 0 }, { y: 24, duration: 0.2, ease: "power2.out", immediateRender: false }, 4.3);
      tl.fromTo(q(".s12-ag-ojos"), { scaleY: 1, svgOrigin: "180 189" }, { scaleY: 0.15, svgOrigin: "180 189", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, 4.55);
"""
SFX = [{"t": 0.25, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.7, "sfx": "pop", "vol": 0.28}, {"t": 2.9, "sfx": "click", "vol": 0.3}, {"t": 3.36, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}]
