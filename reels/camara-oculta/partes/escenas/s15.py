exec(PJ)
ID = "s15-web"; DUR = 6.89
CSS = """
    $ .s15-sitios { left: 60px; top: 1300px; font-size: 52px; background: #5ce611; transform: rotate(-5deg); }
    $ .s15-web { position: absolute; left: 314px; top: 650px; width: 452px; }
    $ .s15-head { height: 90px; background: #5ce611; color: #0c0c0c; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; line-height: 90px; text-align: center; border-radius: 14px 14px 0 0; }
    $ .s15-item { margin: 22px 20px 0; padding: 18px 20px; border: 4px solid #fbf7ea; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fbf7ea; white-space: nowrap; }
    $ .s15-wa { margin: 26px 20px 0; padding: 22px 20px; background: #5ce611; border-radius: 40px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 38px; color: #0c0c0c; text-align: center; }
    $ .s15-rapido { left: 490px; top: 1200px; font-size: 38px; background: #fbf7ea; transform: rotate(4deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-tel">
            <rect class="g" x="290" y="570" width="500" height="820" rx="56" />
            <rect x="480" y="592" width="120" height="20" rx="10" fill="#5ce611" opacity="0.6" />
          </g>
          <g class="s15-vel"><path class="gl" d="M120 900 H250 M80 980 H250 M140 1060 H250 M830 900 H960 M830 980 H1000 M830 1060 H940" stroke-width="9" /></g>
          <g class="s15-pin"><g transform="translate(0 -70)"><path class="gf" d="M690 1010 C690 960 760 960 760 1010 C760 1050 725 1080 725 1080 C725 1080 690 1050 690 1010 Z" stroke-width="5" /><circle cx="725" cy="1010" r="10" fill="#0c0c0c" /></g></g>
        </svg>
        <div class="cartela s15-sitios">Sitios web</div>
        <div class="s15-web">
          <div class="s15-head">TU LOCAL</div>
          <div class="s15-item s15-i1">Tu menú</div>
          <div class="s15-item s15-i2">Cómo llegar</div>
          <div class="s15-wa s15-i3">WhatsApp</div>
        </div>
        <div class="cartela s15-rapido">Rápido en el celular</div>
"""
JS = """
      const SCAL = 0.19, SITIOS = 1.31, RAPIDOS = 1.87, CELULAR = 2.71, MENU = 3.74, LLEGAR = 4.45, BOTON = 5.51, WA = 5.98;
      dibujar(".s15-tel rect", 0, 0.5);
      gsap.set(q(".s15-web"), { opacity: 1 });
      tl.fromTo(q(".s15-head"), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power3.out" }, 0.2);
      golpe(".s15-sitios", SITIOS, 2);
      // rápido: líneas de velocidad y el celular se sacude de golpe
      dibujar(".s15-vel path", RAPIDOS, 0.25);
      tl.fromTo(q(".s15-vel"), { x: 0 }, { x: -30, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, RAPIDOS + 0.25);
      tl.to(q(".s15-vel"), { opacity: 0, duration: 0.2 }, CELULAR + 0.6);
      pop(".s15-rapido", CELULAR);
      tl.to(q(".s15-rapido"), { opacity: 0, duration: 0.2 }, LLEGAR - 0.15);
      [".s15-i1", ".s15-i2", ".s15-i3"].forEach((s) => gsap.set(q(s), { opacity: 0 }));
      [[".s15-i1", MENU], [".s15-i2", LLEGAR], [".s15-i3", BOTON]].forEach(([s, t]) => {
        tl.fromTo(q(s), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: false }, t - 0.1);
      });
      pop(".s15-pin", LLEGAR + 0.1);
      tl.to(q(".s15-pin"), { y: -14, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, LLEGAR + 0.4);
      tl.to(q(".s15-i3"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, WA);
      tl.to(q(".s15-sitios"), { y: -8, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, SITIOS + 0.4);
"""
SFX = [{"t": 0.2, "sfx": "sparkle", "vol": 0.25}, {"t": 1.31, "sfx": "pop", "vol": 0.28}, {"t": 1.87, "sfx": "whoosh", "vol": 0.25}, {"t": 3.7, "sfx": "click-soft", "vol": 0.25}, {"t": 4.4, "sfx": "click-soft", "vol": 0.25}, {"t": 5.5, "sfx": "notification", "vol": 0.3}]
