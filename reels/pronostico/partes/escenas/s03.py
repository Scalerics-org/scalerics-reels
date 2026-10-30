ID = "s03-visto"; DUR = 5.23
CSS = """
    $ .s03-panel { position: absolute; left: 70px; top: 580px; width: 940px; height: 500px; background: #0b2547; border: 6px solid #f4f6fb; border-radius: 26px; }
    $ .s03-tit { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 54px; color: #f4f6fb; letter-spacing: 0.01em; }
    $ .s03-tit small { display: block; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; color: #5ec8ff; }
    $ .s03-pct { position: absolute; right: 60px; top: 230px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; line-height: 1; color: #ff8a1f; }
    $ .s03-sello { position: absolute; left: 260px; top: 1010px; padding: 14px 30px 10px; border: 10px solid #ff8a1f; border-radius: 16px; background: #061428; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 88px; color: #ff8a1f; transform: rotate(-8deg); }
    $ .s03-movil { position: absolute; left: 90px; top: 600px; width: 900px; height: 700px; border: 8px solid #ffd23f; border-radius: 20px; background: #0b2547; overflow: hidden; }
    $ .s03-movil svg { width: 900px; height: 700px; }
    $ .s03-movil .cartela { left: 30px; top: 30px; background: #ffd23f; color: #061428; font-size: 46px; }
"""
HTML = """
        <div class="s03-panel">
          <div class="s03-tit">PROBABILIDAD DE VISTO<small>DOMINGO · 22 A 00 HS</small></div>
          <svg viewBox="0 0 940 500" style="width:940px;height:500px" aria-hidden="true">
            <g class="s03-check"><path d="M90 300 L150 360 L270 220" fill="none" stroke="#5ec8ff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" /><path d="M200 330 L230 360 L350 220" fill="none" stroke="#5ec8ff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" /></g>
            <rect x="70" y="410" width="800" height="54" rx="27" fill="#061428" stroke="#f4f6fb" stroke-width="5" />
            <rect class="s03-barra" x="80" y="420" width="780" height="34" rx="17" fill="#ff8a1f" />
          </svg>
          <div class="s03-pct">0%</div>
        </div>
        <div class="s03-sello">ALTÍSIMA</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-met"><g transform="translate(720 1000) scale(0.78)">""" + METEO("s03") + """</g></g>
        </svg>
        <div class="s03-movil">
          <svg viewBox="0 0 900 700" aria-hidden="true">
            <path d="M0 600 H900" stroke="#f4f6fb" stroke-width="6" />
            <rect x="520" y="300" width="340" height="300" fill="#14457a" stroke="#f4f6fb" stroke-width="6" />
            <path d="M500 300 L530 250 H850 L880 300 Z" fill="#5ec8ff" stroke="#f4f6fb" stroke-width="6" stroke-linejoin="round" />
            """ + lluvia("s03-lluvia", 40, -100, 1000, -40, 760, 33, globos=0.5, vel=(800, 1100), esc=(1.0, 1.6), ang=14, cx=450, cy=350) + """
          </svg>
          <div class="cartela">MÓVIL · EN VIVO</div>
        </div>
"""
JS = """
      const VISTO = 1.33, ALTISIMA = 2.87, VAMOS = 3.66;
      // cuadro 0: el panel ya está, la barra arranca
      tl.fromTo(q(".s03-panel"), { scale: 0.94, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s03-barra"), { scaleX: 0.04, svgOrigin: "80 437" }, { scaleX: 0.62, svgOrigin: "80 437", duration: 1.2, ease: "power1.inOut" }, 0);
      const pct = q(".s03-pct"), cuenta = { v: 4 };
      tl.fromTo(cuenta, { v: 4 }, { v: 100, duration: ALTISIMA, ease: "power2.in", onUpdate: () => { pct.textContent = Math.round(cuenta.v) + "%"; } }, 0);
      entra(".s03-met", 0.1, { x: 420 });
      habla(".s03-met-boca", 0.2, 3.4, "180 296");
      // visto: doble tilde
      gsap.set(q(".s03-check"), { opacity: 0 });
      tl.fromTo(q(".s03-check"), { opacity: 1, scale: 0.3, svgOrigin: "220 290" }, { opacity: 1, scale: 1, svgOrigin: "220 290", duration: 0.3, ease: "back.out(2.4)", immediateRender: false }, VISTO);
      tl.to(q(".s03-barra"), { scaleX: 0.9, svgOrigin: "80 437", duration: 1.4, ease: "power1.in" }, VISTO + 0.1);
      // altísima: la barra revienta
      tl.to(q(".s03-barra"), { scaleX: 1.12, svgOrigin: "80 437", duration: 0.15, ease: "power4.out" }, ALTISIMA);
      tl.fromTo(q(".s03-pct"), { scale: 1 }, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ALTISIMA);
      golpe(".s03-sello", ALTISIMA, 2.6);
      sacudon(ALTISIMA + 0.05, 1.2);
      tl.to(q(".s03-panel"), { rotation: 1.5, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, ALTISIMA + 0.1);
      // vamos con el móvil: la meteoróloga señala, entra el recuadro del móvil y llena la pantalla
      tl.fromTo(q(".s03-met-brazo"), { rotation: 0, svgOrigin: "84 430" }, { rotation: -35, svgOrigin: "84 430", duration: 0.25, ease: "back.out(2)", immediateRender: false }, VAMOS - 0.2);
      tl.to([q(".s03-panel"), q(".s03-sello")], { scale: 0.5, x: -260, y: -160, opacity: 0, duration: 0.35, ease: "power3.in" }, VAMOS);
      gsap.set(q(".s03-movil"), { opacity: 0 });
      tl.fromTo(q(".s03-movil"), { opacity: 1, scale: 0.3, x: 260, y: -120 }, { opacity: 1, scale: 0.55, x: 160, y: -60, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, VAMOS + 0.1);
      tl.to(q(".s03-movil"), { scale: 1, x: 0, y: 0, duration: 0.45, ease: "power3.inOut" }, VAMOS + 0.75);
      tl.to(q(".s03-met"), { x: 500, duration: 0.4, ease: "power2.in" }, VAMOS + 0.6);
      lluvia(".s03-lluvia", 0, DUR);
"""
SFX = [{"t": 0.05, "sfx": "riser", "vol": 0.2, "max": 2.8}, {"t": 1.33, "sfx": "ping", "vol": 0.3}, {"t": 2.87, "sfx": "impact-bass-1", "vol": 0.42, "max": 0.8}, {"t": 2.9, "sfx": "glitch-1", "vol": 0.2}, {"t": 3.75, "sfx": "whoosh", "vol": 0.25}, {"t": 4.4, "sfx": "whoosh-cinematic", "vol": 0.2, "max": 0.9}]
