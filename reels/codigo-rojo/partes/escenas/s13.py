exec(open("partes/escenas/pj.py").read())
ID = "s13-alta"; DUR = 3.93
CSS = """
    $ .s13-volvio { top: 470px; font-size: 92px; color: #5ce611; text-shadow: 0 0 26px rgba(92, 230, 17, 0.45), 8px 8px 0 #03171b; }
    $ .s13-alta { left: 0; right: 0; margin: 0 auto; width: 560px; top: 610px; text-align: center; color: #5ce611; border: 14px solid #5ce611; border-radius: 26px; background: rgba(3, 23, 27, 0.88); font-size: 170px; padding: 24px 0 10px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-par"><g transform="translate(20 800) scale(0.95)">
            <path class="l s13-bi" d="M70 420 C20 360 10 300 20 220" stroke-width="22" />
            <path class="l s13-bd" d="M290 420 C340 360 350 300 340 220" stroke-width="22" />
            {paramedico("s13")}
          </g></g>
          <g class="s13-due"><g transform="translate(620 780) scale(0.95)">
            <rect class="b" x="90" y="500" width="70" height="140" rx="16" /><rect class="b" x="200" y="500" width="70" height="140" rx="16" />
            {duenio("s13")}
            <path class="l" d="M300 420 C350 380 370 330 380 280" stroke-width="20" stroke="#cfe5e2" />
            <path class="l" d="M60 420 C10 380 -10 330 -20 280" stroke-width="20" stroke="#cfe5e2" />
          </g></g>
        </svg>
        <div class="txt s13-volvio" style="position:absolute">¡VOLVIÓ EL PULSO!</div>
        <div class="cartela s13-alta">ALTA</div>
"""
JS = """
      const VOLVIO = 0.50, PULSO = 1.10, SE = 2.09, ALTA = 2.69;
      tl.fromTo(q(".s13-par"), { x: -300 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".s13-due"), { x: 300 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0.05);
      habla(".s13-pboca", 0.0, 1.5, "180 290");
      tl.to(q(".s13-par"), { y: -30, duration: 0.15, yoyo: true, repeat: 7, ease: "power1.out" }, 0.3);
      tl.to(q(".s13-bi"), { rotation: -20, svgOrigin: "70 420", duration: 0.15, yoyo: true, repeat: 7 }, 0.3);
      tl.to(q(".s13-bd"), { rotation: 20, svgOrigin: "290 420", duration: 0.15, yoyo: true, repeat: 7 }, 0.3);
      // el dueño: alivio (cejas bajan, sonríe con la boca chiquita) y salta
      tl.to(q(".s13-ucejas"), { y: 6, duration: 0.2 }, VOLVIO);
      tl.to(q(".s13-uboca"), { scaleY: 0.4, scaleX: 1.6, svgOrigin: "180 292", duration: 0.2 }, VOLVIO);
      tl.to(q(".s13-due"), { y: -40, duration: 0.18, yoyo: true, repeat: 5, ease: "power1.out" }, SE);
      golpe(".s13-volvio", VOLVIO, 2.2);
      sacudon(VOLVIO + 0.05, 0.8);
      tl.to(q(".s13-volvio"), { opacity: 0.35, scale: 0.85, y: -30, duration: 0.2 }, ALTA - 0.25);
      gsap.set(q(".s13-alta"), { opacity: 0 });
      tl.fromTo(q(".s13-alta"), { opacity: 0, scale: 2.8, rotation: -24 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.16, ease: "power4.in", immediateRender: false }, ALTA - 0.1);
      sacudon(ALTA + 0.08, 1.5);
"""
SFX = [{"t": 0.45, "sfx": "whoosh", "vol": 0.2}, {"t": 0.5, "sfx": "chime", "vol": 0.3}, {"t": 2.6, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.6}, {"t": 2.65, "sfx": "sparkle", "vol": 0.25}]
