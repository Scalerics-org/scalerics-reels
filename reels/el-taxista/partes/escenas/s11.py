from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-tax { left: -10px; top: 880px; }
    [data-composition-id="%ID%"] .s11-loc { left: 470px; top: 640px; width: 580px; height: 580px; }
    [data-composition-id="%ID%"] .s11-taranq { left: 0; right: 0; top: 560px; text-align: center; font-size: 40px; color: #ffc81a; letter-spacing: 0.3em; }
    [data-composition-id="%ID%"] .s11-sale { left: 60px; top: 560px; color: #ffc81a; font-size: 56px; }
""" + css_sitio("s11", Y)
body = f"""
        <div class="mono s11-taranq">TA, TA. TRANQUILA.</div>
        <div class="fig s11-tax">{taxista('s11t')}</div>
        <div class="obj s11-loc">{local('s11l', 'PASTELERÍA LA PLAZA', Y)}</div>
        {celular('s11-cel', 560, 900, sitio('s11', 'PASTELERÍA<br>LA PLAZA'), 260, 640)}
        <div class="sello s11-sale">¡SALE EN EL CELULAR!</div>
"""
js = """
      const LLEVO = 0.91, ENFRENTE = 1.36, ESA = 2.18, SALE = 2.91, CEL = 3.27, HOR = 4.18, COMO = 4.82, BOTON = 6.18, WA = 6.91;
      const tax = q(".s11-tax");
      tl.fromTo(tax, { x: -200, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s11t-boca", 0, 2.1, "250 388");
      pop(q(".s11-taranq"), 0.05, 0.25);
      // toma mate, tranquilo
      tl.to(q(".s11t-mate"), { y: -90, x: 40, rotation: -10, svgOrigin: "140 520", duration: 0.3, ease: "power2.out" }, 0.15);
      tl.to(q(".s11t-mate"), { y: 0, x: 0, rotation: 0, svgOrigin: "140 520", duration: 0.3, ease: "power2.in" }, 0.75);
      traqueteo(tax, 0.3, 1.8);
      // la de enfrente
      gsap.set(q(".s11-loc"), { opacity: 0 });
      tl.fromTo(q(".s11-loc"), { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, ENFRENTE - 0.2);
      tl.fromTo(q(".s11-loc"), { filter: "brightness(1)" }, { filter: "brightness(1.35)", duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, ENFRENTE + 0.2);
      // el celular con su página
      tl.to([tax, q(".s11-taranq")], { opacity: 0, x: -300, duration: 0.25, ease: "power2.in" }, ESA - 0.1);
      tl.to(q(".s11-loc"), { scale: 0.42, x: 130, y: 560, duration: 0.35, ease: "power2.inOut" }, ESA - 0.1);
      gsap.set(q(".s11-cel"), { opacity: 0 });
      tl.fromTo(q(".s11-cel"), { opacity: 0, y: 500, rotation: -8 }, { opacity: 1, y: 0, rotation: -2, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, ESA + 0.05);
      golpe(q(".s11-sale"), SALE + 0.05, -5, 2.4);
      tl.to(q(".s11-sale"), { opacity: 0, y: -30, duration: 0.2 }, HOR - 0.4);
      [[".s11-hor", HOR], [".s11-mapa", COMO]].forEach(([s, t]) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, t - 0.05); });
      gsap.set(q(".s11-wa"), { opacity: 0 });
      tl.fromTo(q(".s11-wa"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, BOTON - 0.05);
      tl.to(q(".s11-wa"), { scale: 1.1, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, WA);
      tl.to(q(".s11-cel"), { rotation: 2, duration: 1.5, ease: "sine.inOut" }, HOR);
"""
sfx = [{"t": 0.2, "sfx": "click-soft", "vol": 0.2}, {"t": 1.2, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.2, "sfx": "whoosh-short", "vol": 0.25},
       {"t": 2.95, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 4.15, "sfx": "pop", "vol": 0.3}, {"t": 4.8, "sfx": "pop", "vol": 0.3},
       {"t": 6.15, "sfx": "pop", "vol": 0.3}, {"t": 6.9, "sfx": "chime", "vol": 0.3}]
escena("s11-enfrente", p, 7.63, css, body, js, sfx)
