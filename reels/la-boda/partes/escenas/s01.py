from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-arco { left: 140px; top: 600px; width: 800px; height: 800px; }
    [data-composition-id="%ID%"] .s01-an { left: 390px; top: 900px; width: 300px; height: 220px; }
    [data-composition-id="%ID%"] .s01-tia { left: -10px; top: 820px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s01-t1 { top: 560px; font-size: 92px; }
    [data-composition-id="%ID%"] .s01-t2 { top: 690px; font-size: 150px; }
    [data-composition-id="%ID%"] .s01-sello { top: 1200px; font-size: 76px; color: #9b2445; background: #fbf4e6; }
"""
dest = "".join([destello("s01-d", 300, 860, 26), destello("s01-d", 800, 960, 34, M), destello("s01-d", 760, 1250, 22, R)])
body = f"""
        <div class="obj s01-arco">{arco('s01a')}</div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{dest}</svg>
        <div class="obj s01-an">{anillos('s01n')}</div>
        <div class="fig s01-tia">{tia('s01t')}</div>
        <div class="big m s01-t1">Tu mejor clienta</div>
        <div class="big d s01-t2">se casa hoy</div>
        <div class="sello centro s01-sello">Y no es con vos</div>
"""
js = """
      const CLIENTA = 0.38, CASA = 1.81, NO = 3.33, CON = 3.71, VOS = 4.05;
      // cuadro 0: el arco ya está, a media luz
      gsap.set(q(".s01-arco"), { opacity: 0.5, scale: 0.95, transformOrigin: "50% 100%" });
      tl.to(q(".s01-arco"), { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0);
      qa(".s01a-flor").forEach((f, i) => tl.fromTo(f, { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, 0.02 * i));
      tl.fromTo(q(".s01-an"), { rotation: -12, scale: 0.8 }, { rotation: 8, scale: 1, duration: 1.6, ease: "sine.inOut" }, 0);
      tl.to(q(".s01-an"), { rotation: -6, duration: 1.2, yoyo: true, repeat: 2, ease: "sine.inOut" }, 1.6);
      qa(".s01-d").forEach((d, i) => tl.fromTo(d, { scale: 0.3, opacity: 0.2, transformOrigin: "50% 50%" }, { scale: 1.2, opacity: 1, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, i * 0.2));
      // la tía entra a contar el chisme
      tl.fromTo(q(".s01-tia"), { x: -70 }, { x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      gsap.set(q(".s01t-bd"), { rotation: -118, svgOrigin: "250 296" });
      habla(".s01t-boca", 0.1, 4.6, "200 236");
      vaiven(q(".s01-tia"), 0.5, 4.4, { rotation: 3 }, 0.45);
      // TU MEJOR CLIENTA / SE CASA HOY
      golpe(q(".s01-t1"), CLIENTA, -2, 2.4);
      golpe(q(".s01-t2"), CASA, 3, 2.8);
      sacudon(CASA + 0.05, 1.3);
      tl.fromTo(q(".s01n-brillo"), { scale: 1, svgOrigin: "188 44" }, { scale: 1.8, svgOrigin: "188 44", duration: 0.15, yoyo: true, repeat: 3, ease: "power2.out", immediateRender: false }, CASA);
      // y no es con vos
      tl.to([q(".s01-t1"), q(".s01-t2")], { y: -30, scale: 0.85, opacity: 0.35, duration: 0.25, ease: "power2.inOut" }, NO);
      tl.to(q(".s01-an"), { x: 220, y: -40, scale: 0.7, duration: 0.3, ease: "power2.inOut" }, NO);
      tl.to(q(".s01t-bd"), { rotation: -40, svgOrigin: "250 296", duration: 0.25, ease: "back.out(2)" }, CON);
      golpe(q(".s01-sello"), CON, -6, 2.6);
      sacudon(CON + 0.06, 1.8);
      tl.to(q(".s01-sello"), { scale: 1.06, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, VOS);
"""
sfx = [{"t": 0.02, "sfx": "chime", "vol": 0.3, "max": 1.0}, {"t": 0.3, "sfx": "whoosh-short", "vol": 0.22},
       {"t": 1.75, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.7}, {"t": 1.85, "sfx": "sparkle", "vol": 0.25},
       {"t": 3.6, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 4.1, "sfx": "glitch-1", "vol": 0.2, "max": 0.4}]
escena("s01-gancho", p, 5.23, css, body, js, sfx)
