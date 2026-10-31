from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-arco { left: 140px; top: 640px; width: 800px; height: 800px; }
    [data-composition-id="%ID%"] .s12-cura { left: 340px; top: 670px; transform: scale(0.8); transform-origin: 50% 0%; }
    [data-composition-id="%ID%"] .s12-novia { left: 150px; top: 800px; }
    [data-composition-id="%ID%"] .s12-novio { left: 520px; top: 800px; }
    [data-composition-id="%ID%"] .s12-t { top: 548px; font-size: 104px; text-shadow: 5px 5px 0 #2a1220; }
    [data-composition-id="%ID%"] .s12-torta { left: 10px; top: 1200px; width: 240px; height: 276px; }
    [data-composition-id="%ID%"] .s12-due { left: 760px; top: 780px; transform: scale(0.55); transform-origin: 50% 100%; }
"""
body = f"""
        <div class="obj s12-arco">{arco('s12a')}</div>
        <div class="fig s12-cura">{cura('s12c')}</div>
        <div class="fig s12-novia">{novia('s12n')}</div>
        <div class="fig s12-novio">{novio('s12v')}</div>
        <div class="obj s12-torta">{torta('s12t')}</div>
        <div class="fig s12-due">{dueno('s12d')}</div>
        <div class="script s12-t">clienta y comercio</div>
"""
js = """
      const DECLARO = 0.27, CLIENTA = 0.45, COMERCIO = 1.27, TIREN = 1.82, ARROZ = 2.64;
      tl.fromTo([q(".s12-novia"), q(".s12-novio")], { y: 40 }, { y: 0, duration: 0.35, ease: "back.out(2)", stagger: 0.05 }, 0);
      habla(".s12c-boca", 0.0, 3.0, "200 242");
      gsap.set(q(".s12n-bd"), { rotation: -30, svgOrigin: "248 296" });
      gsap.set(q(".s12v-bi"), { rotation: 30, svgOrigin: "150 292" });
      gsap.set(q(".s12n-cejas"), { y: -6 });
      tl.to(q(".s12n-cabeza"), { rotation: 8, svgOrigin: "200 250", duration: 0.4 }, 0.2);
      tl.to(q(".s12v-cabeza"), { rotation: -8, svgOrigin: "200 250", duration: 0.4 }, 0.2);
      gsap.set(q(".s12-t"), { opacity: 0 });
      tl.fromTo(q(".s12-t"), { opacity: 0, scale: 1.5, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out", immediateRender: false }, CLIENTA);
      tl.to(q(".s12-t"), { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, COMERCIO);
      pop(q(".s12-torta"), COMERCIO, 0.3);
      // ¡tiren el arroz!: ramo arriba y festejo
      tl.to(q(".s12n-bi"), { rotation: 150, svgOrigin: "152 296", duration: 0.25, ease: "back.out(2)" }, TIREN);
      tl.to(q(".s12v-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, TIREN);
      tl.to([q(".s12-novia"), q(".s12-novio")], { y: -24, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, TIREN + 0.1);
      tl.to(q(".s12v-ojod"), { opacity: 0, duration: 0.05 }, ARROZ);
      tl.to(q(".s12v-guino"), { opacity: 1, duration: 0.05 }, ARROZ);
      // Ricardo, solo en la puerta
      gsap.set(q(".s12-due"), { opacity: 0 });
      tl.fromTo(q(".s12-due"), { opacity: 1, x: 260 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, ARROZ - 0.3);
      gsap.set(q(".s12d-bd"), { rotation: -40, svgOrigin: "250 292" });
      tl.to(q(".s12d-cabeza"), { rotation: 14, svgOrigin: "200 250", duration: 0.4 }, ARROZ);
"""
sfx = [{"t": 0.05, "sfx": "chime", "vol": 0.25, "max": 1.0}, {"t": 0.45, "sfx": "sparkle", "vol": 0.25},
       {"t": 1.0, "sfx": "riser", "vol": 0.18, "max": 1.8}, {"t": 2.6, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 2.7, "sfx": "sparkle", "vol": 0.25}]
escena("s12-arroz", p, 3.83, css, body, js, sfx)
