from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-tia { left: 340px; top: 760px; transform-origin: 50% 30%; }
    [data-composition-id="%ID%"] .s04-rot { top: 556px; font-size: 120px; }
    [data-composition-id="%ID%"] .s04-cap { left: 0; right: 0; top: 690px; text-align: center; font-size: 30px; letter-spacing: 0.3em; color: #eba5b3; }
"""
cors = "".join(corazon("s04-c", x, y, s, c) for x, y, s, c in [(170, 1100, 1.2, R), (900, 1000, 1.5, V), (240, 820, 0.9, D), (840, 760, 1.1, R), (130, 1300, 1.0, V), (950, 1260, 1.0, R)])
dest = "".join(destello("s04-d", x, y, r, c) for x, y, r, c in [(250, 1300, 24, D), (830, 1330, 30, M), (540, 1280, 18, D)])
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{cors}{dest}</svg>
        <div class="fig s04-tia">{tia('s04t')}</div>
        <div class="script s04-rot">Pasión de barrio</div>
        <div class="mono s04-cap">CAPÍTULO FINAL</div>
"""
js = """
      const COMO = 1.02, NOVELA = 1.43;
      gsap.set(q(".s04-tia"), { scale: 1.3 });
      tl.fromTo(q(".s04-tia"), { y: 60 }, { y: 0, duration: 0.35, ease: "back.out(2)" }, 0);
      // llora de emoción con el pañuelo
      gsap.set(q(".s04t-bd"), { rotation: -150, svgOrigin: "250 296" });
      tl.to(q(".s04t-bd"), { rotation: -165, svgOrigin: "250 296", duration: 0.16, yoyo: true, repeat: 17, ease: "sine.inOut" }, 0.1);
      tl.to(q(".s04t-lagrimas"), { opacity: 1, duration: 0.15 }, 0.1);
      tl.fromTo(q(".s04t-lagrimas"), { y: 0 }, { y: 16, duration: 0.25, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, 0.1);
      tl.to(q(".s04t-ojos"), { scaleY: 0.4, svgOrigin: "200 194", duration: 0.1 }, 0.1);
      habla(".s04t-boca", 0, 2.4, "200 236");
      vaiven(q(".s04-tia"), 0.2, 2.6, { rotation: 4 }, 0.18);
      qa(".s04-c").forEach((c, i) => { tl.fromTo(c, { opacity: 0, y: 80 }, { opacity: 1, y: -260, duration: 2.4, ease: "power1.out", immediateRender: false }, 0.1 + i * 0.12); });
      gsap.set(qa(".s04-c"), { opacity: 0 });
      // el rótulo de telenovela
      gsap.set([q(".s04-rot"), q(".s04-cap")], { opacity: 0 });
      tl.fromTo(q(".s04-rot"), { opacity: 0, scale: 1.6, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out", immediateRender: false }, NOVELA - 0.1);
      tl.fromTo(q(".s04-cap"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, NOVELA + 0.2);
      qa(".s04-d").forEach((d, i) => { gsap.set(d, { opacity: 0 }); tl.fromTo(d, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1.2, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, NOVELA + i * 0.12); });
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.25}, {"t": 1.35, "sfx": "chime", "vol": 0.3, "max": 1.2}, {"t": 1.5, "sfx": "sparkle", "vol": 0.2}]
escena("s04-novela", p, 3.06, css, body, js, sfx)
