exec(open("partes/escenas/pj.py").read())
ID = "s11-solo"; DUR = 3.31
CSS = """
    $ .s11-diag { left: 0; right: 0; margin: 0 auto; width: 860px; top: 1170px; text-align: center; background: #ff3341; color: #eef6f5; font-size: 50px; padding: 18px 10px 14px; box-shadow: 8px 8px 0 #03171b; }
    $ .s11-diag small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.24em; margin-bottom: 8px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {negatoscopio("s11")}
          <g class="s11-cor">{corazon(590, 880, 1.15)}</g>
          <g class="s11-tipo">
            <circle cx="540" cy="890" r="34" fill="none" stroke="#eef6f5" stroke-width="7" />
            <path class="l" d="M540 924 V1040 M540 1040 L500 1120 M540 1040 L580 1120 M540 960 L480 900 M540 960 L600 900" />
            <path class="l s11-cara" d="M526 896 C534 904 546 904 554 896" stroke-width="5" />
          </g>
          <g class="s11-orb">
            <g class="s11-o1"><rect class="b" x="400" y="720" width="70" height="56" rx="6" /><path class="l" d="M400 740 H470" stroke-width="5" /></g>
            <g class="s11-o2"><rect class="b" x="620" y="700" width="44" height="76" rx="10" /></g>
            <g class="s11-o3"><path class="l" d="M690 900 L740 820" stroke-width="8" /><path class="q" d="M680 890 L708 910 L690 930 L662 912 Z" /></g>
            <g class="s11-o4"><path class="b" d="M350 880 H410 L400 950 H360 Z" /><path class="l" d="M362 880 C362 856 398 856 398 880" stroke-width="5" /></g>
          </g>
        </svg>
        <div class="cartela s11-diag"><small>DIAGNÓSTICO</small>HACE TODO SOLO</div>
"""
JS = """
      const PROBLEMA = 0.10, PACIENTE = 1.28, TODO = 1.92, SOLO = 2.28;
      tl.to(q(".s11-cor"), { opacity: 0.15, duration: 0.3 }, 0.05);
      pop(".s11-tipo", PROBLEMA, { svgOrigin: "540 1000" });
      [".s11-o1", ".s11-o2", ".s11-o3", ".s11-o4"].forEach((s, i) => pop(s, 0.3 + i * 0.12));
      tl.fromTo(q(".s11-orb"), { rotation: 0, svgOrigin: "540 860" }, { rotation: 300, svgOrigin: "540 860", duration: DUR, ease: "none" }, 0);
      tl.to(q(".s11-tipo"), { x: -14, duration: 0.12, yoyo: true, repeat: 23, ease: "sine.inOut" }, 0.2);
      tl.to(q(".s11-orb"), { scale: 1.15, svgOrigin: "540 860", duration: 0.2, yoyo: true, repeat: 1 }, TODO);
      golpe(".s11-diag", SOLO, 2.2);
      sacudon(SOLO + 0.05, 1.2);
"""
SFX = [{"t": 0.1, "sfx": "pop", "vol": 0.25}, {"t": 0.4, "sfx": "whoosh-short", "vol": 0.18}, {"t": 0.8, "sfx": "whoosh-short", "vol": 0.18}, {"t": 2.2, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.6}]
