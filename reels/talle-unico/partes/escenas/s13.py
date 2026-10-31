from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-bar { left: 340px; top: 740px; }
    [data-composition-id="%ID%"] .s13-cartel { left: 200px; top: 500px; width: 680px; padding: 22px 0 16px; border: 8px solid #d8b25c; background: #0e0c10; text-align: center; }
    [data-composition-id="%ID%"] .s13-cartel b { display: block; font-family: "Cormorant", serif; font-weight: 600; font-size: 92px; line-height: 1; color: #f6f1ea; white-space: nowrap; }
    [data-composition-id="%ID%"] .s13-cartel small { display: block; margin-top: 4px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.26em; color: #d8b25c; }
    [data-composition-id="%ID%"] .s13-m { top: 740px; width: 300px; height: 560px; }
    [data-composition-id="%ID%"] .s13-m1 { left: 50px; } [data-composition-id="%ID%"] .s13-m2 { left: 390px; } [data-composition-id="%ID%"] .s13-m3 { left: 730px; }
    [data-composition-id="%ID%"] .s13-med { top: 1330px; font-size: 140px; }
    [data-composition-id="%ID%"] .s13-imp { top: 520px; font-size: 110px; }
"""
tachado = f'<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="s13-tacha" d="M210 640 Q540 560 870 540" stroke="{F}" stroke-width="22" stroke-linecap="round" fill="none"/>' \
          f'<path class="s13-cinta" d="M20 760 Q200 700 220 900 Q240 1100 380 1000 Q540 880 560 1080 Q580 1260 720 1100 Q860 940 900 1120 Q930 1260 1060 1200" stroke="{D}" stroke-width="16" stroke-linecap="round" fill="none"/>' \
          f'<path class="s13-cinta2" d="M20 760 Q200 700 220 900 Q240 1100 380 1000 Q540 880 560 1080 Q580 1260 720 1100 Q860 940 900 1120 Q930 1260 1060 1200" stroke="{K}" stroke-width="4" stroke-dasharray="3 22" fill="none"/>' \
          f'<g class="s13-br">{flash("s13-b", 180, 760, 40, D)}{flash("s13-b", 540, 720, 50, W)}{flash("s13-b", 880, 770, 40, F)}</g></svg>'
body = f"""
        <div class="fig s13-bar">{critica('s13b')}</div>
        <div class="obj s13-cartel"><b>TALLE ÚNICO</b><small>ONE SIZE FITS ALL</small></div>
        <div class="obj s13-m s13-m1">{maniqui('s13a', saco=W, solapa=K, cinta=False)}</div>
        <div class="obj s13-m s13-m2">{maniqui('s13c', saco=F, solapa=K, cinta=False)}</div>
        <div class="obj s13-m s13-m3">{maniqui('s13d', saco=D, solapa=K, cinta=False)}</div>
        {tachado}
        <div class="rev it s13-imp">impecables</div>
        <div class="rev it d s13-med">a medida.</div>
"""
js = """
      const ESC = 0.0, TALLE = 1.06, NADIE = 2.41, LOS = 3.41, IMP = 4.02, SE = 5.06, MED = 5.55;
      const b = q(".s13-bar");
      // cuadro 0: Bárbara se saca los lentes. En serio.
      gsap.set(b, { scale: 1.2, transformOrigin: "50% 100%" });
      tl.fromTo(b, { y: 40 }, { y: 0, duration: 0.3 }, 0);
      tl.to(q(".s13b-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.3, ease: "back.out(1.5)" }, 0.05);
      tl.to(q(".s13b-gafas"), { y: -60, x: 60, rotation: 20, svgOrigin: "200 190", opacity: 0, duration: 0.35, ease: "power2.in" }, 0.25);
      tl.to(q(".s13b-bd"), { rotation: 0, duration: 0.3 }, 0.7);
      habla(".s13b-boca", 0, 3.2, "200 240");
      // TALLE ÚNICO, tachado
      pop(q(".s13-cartel"), TALLE - 0.1, 0.35, { rotation: -2 });
      dibujar(q(".s13-tacha"), NADIE - 0.1, 0.35);
      sacudon(NADIE + 0.2, 1.3);
      tl.to(q(".s13-cartel"), { rotation: 6, y: 30, duration: 0.2, ease: "back.out(3)" }, NADIE + 0.2);
      // los impecables, a medida
      tl.to([q(".s13-cartel"), q(".s13-tacha"), b], { opacity: 0, y: 80, duration: 0.25, ease: "power2.in" }, LOS - 0.2);
      qa(".s13-m").forEach((m, i) => pop(m, LOS + 0.05 + i * 0.15, 0.4, { transformOrigin: "50% 100%" }));
      golpe(q(".s13-imp"), IMP, -2, 2);
      gsap.set(qa(".s13-b"), { opacity: 0 });
      qa(".s13-b").forEach((s, i) => tl.fromTo(s, { opacity: 1, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.4, duration: 0.4, immediateRender: false }, IMP + 0.1 + i * 0.15));
      tl.to(q(".s13-imp"), { opacity: 0, y: -30, duration: 0.2 }, SE);
      dibujar(q(".s13-cinta"), SE, 0.7);
      gsap.set(q(".s13-cinta2"), { opacity: 0 });
      tl.to(q(".s13-cinta2"), { opacity: 1, duration: 0.2 }, SE + 0.6);
      golpe(q(".s13-med"), MED, -3, 2.2);
      tl.to(qa(".s13-m"), { y: -10, duration: 0.25, yoyo: true, repeat: 3, stagger: 0.08, ease: "sine.inOut" }, MED + 0.2);
"""
sfx = [{"t": 0.25, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.0, "sfx": "pop", "vol": 0.3}, {"t": 2.35, "sfx": "glitch-1", "vol": 0.3, "max": 0.4},
       {"t": 3.45, "sfx": "pop", "vol": 0.25}, {"t": 4.0, "sfx": "sparkle", "vol": 0.35}, {"t": 5.06, "sfx": "whoosh", "vol": 0.25, "max": 0.7}, {"t": 5.5, "sfx": "chime", "vol": 0.3}]
escena("s13-giro", p, 6.77, css, body, js, sfx)
