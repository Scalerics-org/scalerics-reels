exec(PJ)
ID = "s11-enfrente"; DUR = 8.00
CSS = """
    $ .s11-cartel-t { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; white-space: nowrap; text-align: center; }
    $ .s11-voy { left: 200px; top: 610px; font-size: 52px; transform: rotate(-4deg); }
    $ .s11-web { position: absolute; left: 314px; top: 650px; width: 452px; }
    $ .s11-head { height: 90px; background: #5ce611; color: #0c0c0c; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; line-height: 90px; text-align: center; border-radius: 14px 14px 0 0; }
    $ .s11-item { margin: 22px 20px 0; padding: 18px 20px; border: 4px solid #fbf7ea; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; color: #fbf7ea; white-space: nowrap; }
    $ .s11-item small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: #fbf7ea; opacity: 0.8; margin-top: 6px; }
    $ .s11-wa { margin: 26px 20px 0; padding: 22px 20px; background: #5ce611; border-radius: 40px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 38px; color: #0c0c0c; text-align: center; }
    $ .s11-sello { position: absolute; left: 520px; top: 1150px; padding: 10px 24px; border: 8px solid #5ce611; color: #5ce611; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; transform: rotate(-12deg); background: #0c0c0c; }
    $ .s11-toque { left: 60px; top: 600px; font-size: 48px; background: #5ce611; transform: rotate(-5deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-calle">
            <!-- parrilla de Tito (izquierda, apagada) -->
            <g class="s11-tito" opacity="0.6"><rect class="b" x="60" y="760" width="380" height="460" /><rect class="k" x="180" y="960" width="140" height="260" /><rect class="b" x="80" y="780" width="340" height="90" /></g>
            <!-- la de enfrente (derecha, prendida) -->
            <g class="s11-otra"><rect class="k" x="640" y="760" width="380" height="460" /><rect class="k" x="760" y="960" width="140" height="260" /><rect class="y" x="660" y="780" width="340" height="90" />
              <path class="yl" d="M640 900 C700 940 760 900 830 940 C900 900 960 940 1020 900" /></g>
            <!-- calle con cebra -->
            <path class="l" d="M0 1240 H1080" />
            <g fill="#fbf7ea" opacity="0.7"><rect x="470" y="1260" width="140" height="18" /><rect x="470" y="1300" width="140" height="18" /><rect x="470" y="1340" width="140" height="18" /><rect x="470" y="1380" width="140" height="18" /></g>
            {fede("s11", 200, 1400, 0.6, "mal")}
          </g>
          <g class="s11-telefono">{celular("s11", 290, 570, 500, 820, extra='<rect x="314" y="650" width="452" height="710" rx="14" fill="#0c0c0c" />')}</g>
        </svg>
        <div class="s11-cartel-t s11-ct1" style="left:80px;top:806px;width:340px;color:#fbf7ea;opacity:0.7">DON TITO</div>
        <div class="s11-cartel-t s11-ct2" style="left:660px;top:806px;width:340px;color:#0c0c0c">LA DE ENFRENTE</div>
        <div class="cartela s11-voy">Me voy a la de enfrente</div>
        <div class="s11-web">
          <div class="s11-head">LA DE ENFRENTE</div>
          <div class="s11-item s11-i1">Menú con precios<small>asado · chivito</small></div>
          <div class="s11-item s11-i2">Cómo llegar<small>ver en el mapa</small></div>
          <div class="s11-wa s11-i3">WhatsApp</div>
        </div>
        <div class="cartela s11-toque">¡Al toque!</div>
        <div class="s11-sello">RESERVADO</div>
"""
JS = """
      const VOY = 0.44, ENFRENTE = 1.39, ABRIO = 2.33, TOQUE = 2.61, MENU = 3.39, LLEGAR = 4.77, BOTON = 5.74, RESERVE = 6.87;
      // la calle: Fede cruza
      tl.fromTo(q(".s11-calle"), { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, 0);
      tl.fromTo(q(".s11-fede"), { x: 0 }, { x: 640, duration: 1.7, ease: "power1.inOut" }, VOY);
      tl.to(q(".s11-fede"), { y: -12, duration: 0.14, yoyo: true, repeat: 11, ease: "sine.inOut" }, VOY);
      pop(".s11-voy", VOY);
      tl.to(q(".s11-ct2"), { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1 }, ENFRENTE);
      tl.to(q(".s11-otra"), { scale: 1.04, svgOrigin: "830 1000", duration: 0.15, yoyo: true, repeat: 1 }, ENFRENTE);
      // abrió al toque: corte al celular con la página buena
      tl.to([q(".s11-calle"), q(".s11-voy"), q(".s11-ct1"), q(".s11-ct2")], { opacity: 0, duration: 0.12 }, ABRIO - 0.12);
      gsap.set(q(".s11-telefono"), { opacity: 0 });
      tl.fromTo(q(".s11-telefono"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.4)", immediateRender: false }, ABRIO);
      gsap.set(q(".s11-web"), { opacity: 0 });
      tl.fromTo(q(".s11-web"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.4)", immediateRender: false }, ABRIO);
      golpe(".s11-toque", TOQUE, 2);
      [".s11-i1", ".s11-i2", ".s11-i3"].forEach((s, i) => { gsap.set(q(s), { opacity: 0 }); });
      [[".s11-i1", MENU], [".s11-i2", LLEGAR], [".s11-i3", BOTON]].forEach(([s, t]) => {
        tl.fromTo(q(s), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: false }, t - 0.1);
        tl.to(q(s), { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1 }, t + 0.25);
      });
      tl.to(q(".s11-toque"), { opacity: 0, duration: 0.2 }, LLEGAR - 0.3);
      tl.to(q(".s11-i3"), { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, RESERVE - 0.5);
      gsap.set(q(".s11-sello"), { opacity: 0 });
      tl.fromTo(q(".s11-sello"), { opacity: 1, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.16, ease: "power4.in", immediateRender: false }, RESERVE - 0.1);
      sacudon(RESERVE + 0.08, 0.8);
"""
SFX = [{"t": 0.44, "sfx": "pop", "vol": 0.25}, {"t": 0.6, "sfx": "whoosh", "vol": 0.18}, {"t": 2.33, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.61, "sfx": "chime", "vol": 0.3}, {"t": 3.35, "sfx": "click-soft", "vol": 0.25}, {"t": 4.72, "sfx": "click-soft", "vol": 0.25}, {"t": 5.7, "sfx": "notification", "vol": 0.3}, {"t": 6.8, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}]
