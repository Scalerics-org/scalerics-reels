from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-tito { left: 340px; top: 780px; }
    [data-composition-id="%ID%"] .s02-t1 { top: 470px; font-size: 118px; }
    [data-composition-id="%ID%"] .s02-t2 { top: 590px; font-size: 96px; }
"""
alf = f'''<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
  <path class="s02-alf" d="M488 830 L592 830 L860 1560 L220 1560 Z" fill="{F}" stroke="{K}" stroke-width="6"/>
  <path class="s02-alf" d="M488 830 L592 830 L860 1560 L220 1560 Z" fill="none" stroke="{D}" stroke-width="4" opacity="0.8" transform="translate(0 0)"/>
  <g class="s02-ch">{flash("s02-c1", 240, 760, 40, D)}{flash("s02-c2", 860, 700, 50, D)}{flash("s02-c3", 820, 1180, 36, W)}{flash("s02-c4", 230, 1240, 44, W)}</g>
</svg>'''
body = f"""
        {alf}
        <div class="fig s02-tito">{presentador('s02p')}</div>
        <div class="rev s02-t1" data-layout-allow-overlap>Alfombra roja</div>
        <div class="rev it d s02-t2">del comercio</div>
"""
js = """
      const ALF = 0.91, ROJA = 1.25, COM = 1.75;
      // cuadro 0: Tito ya en la pasarela, brazos arriba
      gsap.set(q(".s02-tito"), { scale: 1.05, transformOrigin: "50% 100%" });
      tl.fromTo(q(".s02-tito"), { y: 60 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.to(q(".s02p-bi"), { rotation: 140, svgOrigin: "150 292", duration: 0.3, ease: "back.out(2)" }, 0.05);
      tl.to(q(".s02p-bd"), { rotation: -60, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, 0.1);
      habla(".s02p-boca", 0, 2.6, "200 236");
      vaiven(q(".s02-tito"), 0.4, 2.2, { y: -14 }, 0.22);
      // la alfombra se desenrolla hacia el frente
      gsap.set(qa(".s02-alf"), { scaleY: 0, svgOrigin: "540 830" });
      tl.to(qa(".s02-alf"), { scaleY: 1, duration: 0.5, ease: "power3.out" }, ALF - 0.1);
      golpe(q(".s02-t1"), ROJA, -3, 2.4);
      sacudon(ROJA + 0.03, 1.1);
      golpe(q(".s02-t2"), COM, 2, 2.2);
      gsap.set(qa(".s02-ch path"), { opacity: 0 });
      qa(".s02-ch path").forEach((c, i) => tl.fromTo(c, { opacity: 1, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.3, duration: 0.35, ease: "power2.out", immediateRender: false }, 0.3 + i * 0.45));
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.25}, {"t": 0.85, "sfx": "whoosh", "vol": 0.3, "max": 0.6},
       {"t": 1.2, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.5}, {"t": 1.7, "sfx": "click", "vol": 0.3}]
escena("s02-alfombra", p, 2.73, css, body, js, sfx)
