exec(open("partes/escenas/pj.py").read())
ID = "s10-radiografia"; DUR = 6.17
CSS = """
    $ .s10-perf { left: 560px; top: 700px; color: #4fc3b0; border: 10px solid #4fc3b0; border-radius: 16px; background: rgba(3, 23, 27, 0.88); font-size: 64px; padding: 14px 20px 8px; }
    $ .s10-ok { position: absolute; padding: 12px 22px 8px; background: #4fc3b0; color: #03171b; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; white-space: nowrap; box-shadow: 6px 6px 0 #03171b; }
    $ .s10-ok b { color: #eef6f5; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {negatoscopio("s10")}
          <g class="s10-cor">{corazon(590, 880, 1.15, "s10-corp")}</g>
          <path class="s10-f1" d="M330 1150 C400 1060 470 960 540 900" fill="none" stroke="#4fc3b0" stroke-width="7" stroke-linecap="round" />
          <path class="s10-f2" d="M760 1240 C720 1120 680 1000 640 920" fill="none" stroke="#4fc3b0" stroke-width="7" stroke-linecap="round" />
        </svg>
        <div class="cartela s10-perf">PERFECTO</div>
        <div class="s10-ok s10-ok1" style="left: 90px; top: 1150px">MERCADERÍA: <b>OK</b></div>
        <div class="s10-ok s10-ok2" style="left: 560px; top: 1240px">ATENCIÓN: <b>OK</b></div>
"""
JS = """
      const RADIO = 0.63, CORAZON = 1.82, PERFECTO = 2.45, MERC = 3.63, ATEN = 4.82;
      // cuadro 0: el negatoscopio se prende
      tl.fromTo(q(".s10-luz"), { opacity: 0.6 }, { opacity: 0.06, duration: 0.3 }, 0);
      tl.fromTo(q(".s10-luz"), { opacity: 0.06 }, { opacity: 0.4, duration: 0.03, yoyo: true, repeat: 3, immediateRender: false }, 0.1);
      dibujar(".s10-ln", 0.05, 0.6);
      dibujar(".s10-cos", RADIO - 0.1, 0.7);
      pop(".s10-cor", CORAZON - 0.1, { svgOrigin: "590 880" });
      for (let t = CORAZON + 0.3; t < DUR - 0.3; t += 0.55) tl.fromTo(q(".s10-corp"), { scale: 1.15 }, { scale: 1.32, svgOrigin: "0 0", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, t);
      gsap.set(q(".s10-perf"), { opacity: 0 });
      tl.fromTo(q(".s10-perf"), { opacity: 0, scale: 2.4, rotation: 20 }, { opacity: 1, scale: 1, rotation: 8, duration: 0.15, ease: "power4.in", immediateRender: false }, PERFECTO);
      sacudon(PERFECTO + 0.15, 1);
      dibujar(".s10-f1", MERC - 0.1, 0.3);
      pop(".s10-ok1", MERC, { transformOrigin: "0% 50%" });
      dibujar(".s10-f2", ATEN - 0.1, 0.3);
      pop(".s10-ok2", ATEN, { transformOrigin: "0% 50%" });
"""
SFX = [{"t": 0.05, "sfx": "click", "vol": 0.3}, {"t": 0.1, "sfx": "glitch-1", "vol": 0.15, "max": 0.3}, {"t": 0.6, "sfx": "sparkle", "vol": 0.2}, {"t": 1.75, "sfx": "pop", "vol": 0.25}, {"t": 2.5, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 3.63, "sfx": "chime", "vol": 0.2}, {"t": 4.82, "sfx": "chime", "vol": 0.2}]
