from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-tito { left: -30px; top: 820px; }
    [data-composition-id="%ID%"] .s04-hugo { left: 380px; top: 700px; }
    [data-composition-id="%ID%"] .s04-cartel { left: 300px; top: 470px; padding: 14px 34px 10px; border: 6px solid #d8b25c; background: #0e0c10; text-align: center; }
    [data-composition-id="%ID%"] .s04-cartel b { display: block; font-family: "Cormorant", serif; font-weight: 600; font-size: 72px; line-height: 1; color: #f6f1ea; white-space: nowrap; }
    [data-composition-id="%ID%"] .s04-cartel small { display: block; margin-top: 6px; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 48px; color: #d8b25c; white-space: nowrap; }
    [data-composition-id="%ID%"] .s04-des { left: 64px; top: 640px; font-size: 30px; color: #ff2e88; }
    [data-composition-id="%ID%"] .s04-tag { left: 610px; top: 1080px; }
"""
body = f"""
        <div class="mono s04-des">abre el desfile</div>
        <div class="fig s04-hugo">{hugo('s04h')}</div>
        <div class="fig s04-tito">{presentador('s04p')}</div>
        <div class="obj s04-cartel"><b>FERRETERÍA</b><small>Don Hugo</small></div>
        {tag('s04-tag', 'Talle único', 'el que venía', rot=-12)}
"""
js = """
      const DESF = 0.26, FERR = 1.01, HUGO = 1.76, SIS = 2.60, TALLE = 3.19;
      // cuadro 0: Tito presenta desde la izquierda
      gsap.set(q(".s04-tito"), { scale: 0.85, transformOrigin: "50% 100%" });
      tl.fromTo(q(".s04-tito"), { x: -120 }, { x: 0, duration: 0.35, ease: "back.out(1.5)" }, 0);
      tl.to(q(".s04p-bd"), { rotation: -40, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, 0.1);
      tl.to(q(".s04p-bi"), { rotation: 110, svgOrigin: "150 292", duration: 0.3, ease: "back.out(2)" }, FERR);
      habla(".s04p-boca", 0, 4.0, "200 236");
      pop(q(".s04-des"), DESF, 0.3);
      // Don Hugo desfila desde el fondo de la pasarela
      gsap.set(q(".s04-hugo"), { opacity: 0, scale: 0.35, y: 60, transformOrigin: "50% 100%" });
      tl.to(q(".s04-hugo"), { opacity: 1, duration: 0.2 }, FERR - 0.2);
      tl.to(q(".s04-hugo"), { scale: 1, y: 0, x: -40, duration: 1.7, ease: "power1.inOut" }, FERR - 0.2);
      desfila(q(".s04h-cuerpo"), FERR - 0.2, 3.0, 0.28);
      tl.to(q(".s04h-bi"), { rotation: 18, svgOrigin: "148 300", duration: 0.28, yoyo: true, repeat: 9, ease: "sine.inOut" }, FERR);
      tl.to(q(".s04h-bd"), { rotation: -18, svgOrigin: "252 300", duration: 0.28, yoyo: true, repeat: 9, ease: "sine.inOut" }, FERR);
      pop(q(".s04-cartel"), FERR, 0.35, { rotation: -2 });
      tl.to(q(".s04-cartel"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, HUGO);
      // TALLE ÚNICO
      golpe(q(".s04-tag"), TALLE, -12, 2.6);
      sacudon(TALLE + 0.04, 1.2);
      gsap.set(q(".s04-tag"), { transformOrigin: "100% 50%" });
      tl.to(q(".s04-tag"), { rotation: -4, duration: 0.3, yoyo: true, repeat: 2, ease: "sine.inOut" }, TALLE + 0.2);
      tl.to(q(".s04h-costura"), { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 5 }, SIS);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.3, "sfx": "click-soft", "vol": 0.25}, {"t": 1.0, "sfx": "pop", "vol": 0.3},
       {"t": 1.1, "sfx": "riser", "vol": 0.15, "max": 1.6}, {"t": 3.12, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}]
escena("s04-ferreteria", p, 4.36, css, body, js, sfx)
