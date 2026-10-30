exec(PJ)
ID = "s08-sonria"; DUR = 5.47
conf = ""
for i in range(22):
    x = 120 + (i * 137) % 840; y = 620 + (i * 211) % 520; c = ["#ffd400", "#ff3b30", "#fbf7ea"][i % 3]; r = (i * 47) % 180
    conf += f'<g class="s08-conf"><rect x="{x}" y="{y}" width="26" height="14" fill="{c}" transform="rotate({r} {x + 13} {y + 7})" /></g>'
CSS = """
    $ .s08-oculta { left: 120px; top: 880px; font-size: 54px; background: #ff3b30; color: #fbf7ea; transform: rotate(-4deg); }
    $ .s08-sosp { left: 560px; top: 640px; font-size: 50px; transform: rotate(5deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-cu">{fede("s08cu", 540, 1520, 1.6, "mal", cel=False)}</g>
          <g class="s08-show">
            {fede("s08", 270, 1440, 0.95, "o")}
            <path class="l" d="M640 830 L700 1200 M880 830 L840 1200" stroke-width="12" />
            {conductor("s08", 780, 1440, 1.0, "abierta")}
            <g class="s08-cartel">
              <rect x="170" y="590" width="760" height="250" rx="18" fill="#ffd400" stroke="#0c0c0c" stroke-width="10" />
              <rect x="190" y="610" width="720" height="210" rx="10" fill="none" stroke="#0c0c0c" stroke-width="4" stroke-dasharray="20 14" />
              <text x="550" y="780" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="150" fill="#0c0c0c">SONRÍA</text>
            </g>
          </g>
          {conf}
        </svg>
        <div class="cartela s08-sosp">¿Una broma?</div>
        <div class="cartela s08-oculta">¡Es una cámara oculta!</div>
"""
JS = """
      const BROMA = 0.46, SI = 1.37, SONREI = 2.03, ES = 3.11, OCULTA = 3.82;
      // primer plano: Fede sospecha, la cámara se acerca
      tl.fromTo(q(".s08-cu"), { scale: 1, svgOrigin: "540 1000" }, { scale: 1.12, svgOrigin: "540 1000", duration: 1.3, ease: "power1.inOut" }, 0);
      tl.to(qa(".s08cu-fede-ojo"), { x: -12, duration: 0.15, ease: "power2.out" }, 0.1);
      tl.to(qa(".s08cu-fede-ojo"), { x: 12, duration: 0.2, ease: "power2.inOut" }, 0.55);
      tl.to(qa(".s08cu-fede-ojo"), { x: -12, duration: 0.2, ease: "power2.inOut" }, 0.95);
      golpe(".s08-sosp", BROMA, 2);
      // ¡Sí, Fede!: salta el programa
      tl.to([q(".s08-cu"), q(".s08-sosp")], { opacity: 0, duration: 0.06 }, SI - 0.04);
      gsap.set(q(".s08-show"), { opacity: 0 });
      tl.set(q(".s08-show"), { opacity: 1 }, SI);
      tl.fromTo(q(".s08-con"), { x: 500 }, { x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, SI);
      tl.fromTo(q(".s08-fede"), { y: 0 }, { y: -70, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, SI + 0.05);
      gsap.set(q(".s08-cartel"), { opacity: 0 });
      tl.fromTo(q(".s08-cartel"), { opacity: 1, y: -500, rotation: -12, svgOrigin: "550 715" }, { opacity: 1, y: 0, rotation: -3, svgOrigin: "550 715", duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, SONREI - 0.25);
      sacudon(SONREI + 0.1, 1.2);
      tl.to(q(".s08-cartel"), { rotation: 3, svgOrigin: "550 715", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, SONREI + 0.15);
      habla(".s08-con-boca", SI, 2.6, "0 -240");
      // papelitos
      qa(".s08-conf").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 1, y: -60 - (i % 5) * 20 }, { opacity: 1, y: 260 + (i % 4) * 40, rotation: (i % 2 ? 1 : -1) * 200, svgOrigin: "540 960", duration: 2.6, ease: "power1.in", immediateRender: false }, SONREI + (i % 6) * 0.06);
      });
      golpe(".s08-oculta", ES + 0.1, 2.2);
      tl.to(q(".s08-oculta"), { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }, OCULTA);
"""
SFX = [{"t": 0.46, "sfx": "click-soft", "vol": 0.25}, {"t": 1.3, "sfx": "whoosh-cinematic", "vol": 0.2, "max": 0.8}, {"t": 1.8, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 2.05, "sfx": "sparkle", "vol": 0.3}, {"t": 3.2, "sfx": "pop", "vol": 0.3}]
