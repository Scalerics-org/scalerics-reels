exec(PJ)
ID = "s14-pagas"; DUR = 3.18
dias = ""
for i in range(14):
    x = 210 + (i % 7) * 96; y = 1000 + (i // 7) * 110
    dias += f'<rect class="b" x="{x}" y="{y}" width="80" height="90" rx="8" stroke-width="5" /><path class="rl s14-x s14-x{i}" d="M{x + 16} {y + 18} L{x + 64} {y + 72} M{x + 64} {y + 18} L{x + 16} {y + 72}" stroke-width="8" />'
CSS = """
    $ .s14-t1 { top: 620px; font-size: 96px; color: #ffd400; }
    $ .s14-t2 { top: 740px; font-size: 120px; color: #fbf7ea; }
    $ .s14-t2 b { color: #ff3b30; }
    $ .s14-todos { left: 300px; top: 1250px; font-size: 46px; background: #ff3b30; color: #fbf7ea; transform: rotate(-3deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-cal">
            <rect class="k" x="180" y="900" width="720" height="340" rx="20" />
            <rect class="y" x="180" y="900" width="720" height="80" rx="20" />
            <path class="l" d="M300 880 V930 M780 880 V930" stroke-width="12" />
            {dias}
          </g>
        </svg>
        <div class="txt s14-t1">La broma</div>
        <div class="txt s14-t2">la pagás <b>vos</b></div>
        <div class="cartela s14-todos">Todos los días</div>
"""
JS = """
      const BROMA = 0.19, PAGAS = 0.94, VOS = 1.31, TODOS = 2.03, DIAS = 2.52;
      gsap.set(q(".s14-t1"), { opacity: 1 });
      tl.fromTo(q(".s14-t1"), { y: -40, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      golpe(".s14-t2", PAGAS, 2);
      tl.to(q(".s14-t2 b"), { scale: 1.2, duration: 0.12, yoyo: true, repeat: 1, display: "inline-block" }, VOS);
      sacudon(VOS + 0.05, 0.6);
      pop(".s14-cal", 0.4);
      // todos los días: se tachan uno por uno
      qa(".s14-x").forEach((x, i) => {
        const L = x.getTotalLength();
        gsap.set(x, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.to(x, { opacity: 1, duration: 0.01 }, TODOS - 0.1 + i * 0.06);
        tl.to(x, { strokeDashoffset: 0, duration: 0.15, ease: "power2.out" }, TODOS - 0.1 + i * 0.06);
      });
      golpe(".s14-todos", DIAS, 2);
"""
SFX = [{"t": 0.0, "sfx": "chime", "vol": 0.25}, {"t": 0.94, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 2.0, "sfx": "typing", "vol": 0.25, "max": 0.9}, {"t": 2.52, "sfx": "pop", "vol": 0.25}]
