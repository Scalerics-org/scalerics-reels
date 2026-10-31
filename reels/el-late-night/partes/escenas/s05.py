ID = "s05-no-me-acuesto"; DUR = 2.17
CSS = """
    $ .s05-no { position: absolute; left: 0; right: 0; top: 1330px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 116px; line-height: 1; color: #5ce611; text-shadow: 0 6px 0 #0b1330; }
    $ .s05-tss { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 128px; line-height: 1; color: #ffb547; transform: rotate(-6deg); text-shadow: 0 8px 0 #ff3d6e; }
"""
HTML = """
        <div class="s05-uno">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s05-ag"><g transform="translate(270 640) scale(1.5)">""" + AGENTE("s05") + """</g></g>
          </svg>
          <div class="s05-no">NO ME ACUESTO</div>
        </div>
        <div class="s05-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            """ + HAZ("s05", "s05-h", 540, 540, 60, 760, 520, 1520, "#ff3d6e") + """
            """ + BATERIA("s05", 540, 1180) + """
          </svg>
          <div class="s05-tss"><span class="s05-ba">BA-</span><span class="s05-dum">DUM</span> <span class="s05-ts">TSS!</span></div>
        </div>
"""
JS = """
      const BA = 0.8, DUM = 1.0, TSS = 1.25;
      tl.fromTo(q(ESC), { scale: 1.15, transformOrigin: "50% 45%" }, { scale: 1, transformOrigin: "50% 45%", duration: 0.5, ease: "power3.out", immediateRender: false }, 0);
      habla(".s05-ag-boca", 0, 0.6, "180 260");
      golpe(".s05-no", 0.2, 2);
      tl.to(q(".s05-ag-ojos"), { scaleY: 0.15, svgOrigin: "180 189", duration: 0.07, yoyo: true, repeat: 1 }, 0.55);
      // corte a la batería
      tl.set(q(".s05-uno"), { opacity: 0 }, BA - 0.12);
      gsap.set(q(".s05-dos"), { opacity: 0 });
      tl.set(q(".s05-dos"), { opacity: 1 }, BA - 0.12);
      gsap.set([q(".s05-ba"), q(".s05-dum"), q(".s05-ts")], { opacity: 0 });
      [[".s05-ba", BA], [".s05-dum", DUM], [".s05-ts", TSS]].forEach(([s, t]) => tl.fromTo(q(s), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.1, ease: "power4.in", immediateRender: false }, t - 0.05));
      tl.fromTo(q(".s05-palo-i"), { rotation: 0, svgOrigin: "440 1060" }, { rotation: 22, svgOrigin: "440 1060", duration: 0.08, yoyo: true, repeat: 3, ease: "power2.in", immediateRender: false }, BA - 0.08);
      tl.fromTo(q(".s05-palo-d"), { rotation: 0, svgOrigin: "640 1060" }, { rotation: -25, svgOrigin: "640 1060", duration: 0.08, yoyo: true, repeat: 1, ease: "power2.in", immediateRender: false }, TSS - 0.08);
      tl.fromTo(q(".s05-platillo"), { rotation: 0, svgOrigin: "820 1030" }, { rotation: 6, svgOrigin: "820 1030", duration: 0.06, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, TSS);
      sacudon(TSS + 0.02, 1);
"""
SFX = [{"t": 0.15, "sfx": "pop", "vol": 0.25}]
