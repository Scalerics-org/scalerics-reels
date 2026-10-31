from base import *
p = "s11"
css = tienda_css = css_tienda("s11t", 380, 700) + """
    [data-composition-id="%ID%"] .s11-mon { left: 340px; top: 640px; }
    [data-composition-id="%ID%"] .s11-izq { position: absolute; left: 30px; top: 560px; width: 500px; height: 960px; background: rgba(255, 122, 26, 0.18); border: 8px solid #ff7a1a; border-radius: 28px; overflow: hidden; }
    [data-composition-id="%ID%"] .s11-der { position: absolute; left: 550px; top: 560px; width: 500px; height: 960px; background: rgba(20, 196, 184, 0.2); border: 8px solid #14c4b8; border-radius: 28px; overflow: hidden; }
    [data-composition-id="%ID%"] .s11-et { position: absolute; left: 0; right: 0; top: 24px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #16191d; }
    [data-composition-id="%ID%"] .s11-et span { padding: 6px 26px 2px; border: 6px solid #16191d; border-radius: 14px; }
    [data-composition-id="%ID%"] .s11-viejo { left: 50px; top: 160px; width: 400px; height: 400px; filter: grayscale(0.6) brightness(0.7); }
    [data-composition-id="%ID%"] .s11-cuad { position: absolute; left: 70px; top: 600px; width: 360px; height: 250px; background: #fbfaf5; border: 6px solid #16191d; border-radius: 10px; transform: rotate(-6deg); filter: brightness(0.7); }
    [data-composition-id="%ID%"] .s11-cuad i { display: block; height: 6px; margin: 30px 26px 0; background: #2c4a66; opacity: 0.5; }
    [data-composition-id="%ID%"] .s11t-cel { left: 60px; top: 140px; }
    [data-composition-id="%ID%"] .s11-cartel { position: absolute; left: 0; right: 0; top: 1360px; text-align: center; }
    [data-composition-id="%ID%"] .s11-cartel span { display: inline-block; padding: 14px 40px 8px; background: #14c4b8; border: 8px solid #16191d; border-radius: 18px; box-shadow: 10px 10px 0 #16191d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 74px; color: #fbfaf5; -webkit-text-stroke: 10px #16191d; paint-order: stroke fill; transform: rotate(-3deg); }
"""
body = f"""
        <div class="s11-izq"><div class="s11-et"><span style="background:#ff7a1a">ANTES</span></div>
          <div class="obj s11-viejo">{local('s11l', 'REGALOS MÓNICA', persiana=True)}</div>
          <div class="s11-cuad"><i></i><i></i><i style="width:180px"></i><i></i></div></div>
        <div class="s11-der"><div class="s11-et"><span style="background:#14c4b8">DESPUÉS</span></div>
          <div class="s11t-cel" style="position:absolute;width:380px;height:700px"><div class="s11t-barra"></div><div class="s11t-pantalla">{tienda('s11t')}</div></div></div>
        <div class="fig s11-mon">{monica('s11m')}</div>
        <div class="s11-cartel"><span>TIENDA ONLINE</span></div>
"""
js = """
      const CREER = 0.63, ES = 1.64, TIENDA = 2.07, CEL = 3.22;
      const mon = q(".s11-mon");
      // cuadro 0: Mónica llora a mares
      gsap.set(mon, { scale: 1.12, transformOrigin: "50% 0%" });
      gsap.set([q(".s11m-ojos"), q(".s11m-boca")], { opacity: 0 });
      gsap.set([q(".s11m-ojos-llora"), q(".s11m-boca-llora"), q(".s11m-lagrimas")], { opacity: 1 });
      gsap.set(q(".s11m-bi"), { rotation: -150, svgOrigin: "152 300" });
      gsap.set(q(".s11m-bd"), { rotation: 150, svgOrigin: "248 300" });
      tl.fromTo(mon, { y: 40 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.to(mon, { rotation: 2, transformOrigin: "50% 100%", duration: 0.07, yoyo: true, repeat: 25, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s11m-boca-llora"), { scaleY: 1, svgOrigin: "200 246" }, { scaleY: 1.5, svgOrigin: "200 246", duration: 0.1, yoyo: true, repeat: 19, ease: "sine.inOut", immediateRender: false }, 0);
      tl.fromTo([q(".s11m-lag1"), q(".s11m-lag2")], { y: 0, opacity: 1 }, { y: 80, opacity: 0, duration: 0.45, repeat: 4, ease: "power1.in", immediateRender: false }, 0);
      tl.to(q(".s11m-bi"), { rotation: -120, svgOrigin: "152 300", duration: 0.2, ease: "back.out(2)" }, CREER);
      tl.to(q(".s11m-bd"), { rotation: 120, svgOrigin: "248 300", duration: 0.2, ease: "back.out(2)" }, CREER);
      sacudon(CREER + 0.1, 1.2);
      // pantalla partida
      gsap.set([q(".s11-izq"), q(".s11-der")], { opacity: 0 });
      tl.fromTo(q(".s11-izq"), { opacity: 1, x: -700 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, ES);
      tl.fromTo(q(".s11-der"), { opacity: 1, x: 700 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, ES + 0.1);
      tl.to(mon, { scale: 0.5, x: -330, y: 520, duration: 0.35, ease: "power3.inOut" }, ES);
      tl.to(q(".s11-der"), { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, TIENDA);
      tl.to(q(".s11-izq"), { opacity: 0.5, duration: 0.3 }, TIENDA);
      tl.fromTo(qa(".s11t-card"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.08, ease: "back.out(2)", immediateRender: false }, TIENDA);
      // el celular al centro
      tl.to(q(".s11-izq"), { x: -560, opacity: 0, duration: 0.35, ease: "power3.in" }, CEL - 0.25);
      tl.to(q(".s11-der"), { x: -270, scale: 1.08, duration: 0.4, ease: "power3.inOut" }, CEL - 0.2);
      golpe(q(".s11-cartel"), CEL + 0.1, -2, 2.4);
      sacudon(CEL + 0.12, 1);
      tl.to(mon, { x: -360, duration: 0.3 }, CEL);
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.25}, {"t": 0.65, "sfx": "pop", "vol": 0.25}, {"t": 1.62, "sfx": "whoosh", "vol": 0.3, "max": 0.5},
       {"t": 2.07, "sfx": "chime", "vol": 0.3}, {"t": 3.25, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}]
escena("s11-despues", p, 4.53, css, body, js, sfx)
