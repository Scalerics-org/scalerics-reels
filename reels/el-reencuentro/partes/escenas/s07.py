from base import escena
from personajes import *
rayos = "".join(f'<path d="M540 960 L{540+900*__import__("math").cos(a/12*6.283):.0f} {960+900*__import__("math").sin(a/12*6.283):.0f} L{540+900*__import__("math").cos((a+0.5)/12*6.283):.0f} {960+900*__import__("math").sin((a+0.5)/12*6.283):.0f} Z" fill="#c99a3c" opacity="0.35" />' for a in range(12))
css = '''
    SC .s07-hoy { left: 0; right: 0; top: 700px; font-size: 150px; line-height: 1; color: #c99a3c; font-family: "Lexend", sans-serif; font-weight: 900; -webkit-text-stroke: 8px #4b2537; paint-order: stroke fill; }
'''
cuerpo = f'''
          <defs><clipPath id="s07-esc"><rect x="140" y="640" width="800" height="690" /></clipPath></defs>
          <rect x="140" y="640" width="800" height="690" fill="#fbefe9" />
          <g clip-path="url(#s07-esc)">
            <g class="s07-rayos">{rayos}</g>
            <g class="s07-sil"><g transform="translate(540 950) scale(0.95)">
              <path d="M-160 420 L-160 250 Q-150 150 -55 128 L55 128 Q150 150 160 250 L160 420 Z" fill="#a48cc8" opacity="0.9" />
              {"".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#a48cc8" opacity="0.9" />' for x,y,r in [(-70,-70,34),(-30,-100,36),(20,-104,36),(64,-78,34),(84,-34,30),(-86,-30,30),(0,0,86)])}
            </g></g>
          </g>
          <g class="s07-ci">{cortina_mitad("s07", "i", 140, 545, 640, 1330)}</g>
          <g class="s07-cd">{cortina_mitad("s07", "d", 535, 940, 640, 1330)}</g>
          {bambalina("s07", 110, 970, 600)}
          <g class="s07-cond"><g transform="translate(200 1060) scale(0.66)">{conductora("s07")}</g></g>
          {"".join(f'<path class="s07-chispa c{i}" d="M{x} {y-26} L{x+7} {y-7} L{x+26} {y} L{x+7} {y+7} L{x} {y+26} L{x-7} {y+7} L{x-26} {y} L{x-7} {y-7} Z" fill="#c99a3c" stroke="#4b2537" stroke-width="3" />' for i,(x,y) in enumerate([(320,720),(780,760),(860,1000),(260,950),(640,690)]))}
'''
html = '''
        <div class="lex s07-hoy">¡HOY!</div>
'''
js = '''
      const HOY = 0.19, ENCONTRAMOS = 0.93, QUE = 2.27, ABRA = 2.49, CORTINA = 3.31;
      tl.fromTo(q(".escenario"), { scale: 1.0, transformOrigin: "540px 960px" }, { scale: 1.05, duration: 3.2, ease: "none" }, 0);
      // la cortina respira (alguien se mueve atrás)
      tl.to([q(".s07-ci"), q(".s07-cd")], { y: 6, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.2);
      // "¡HOY!"
      const hoy = q(".s07-hoy");
      gsap.set(hoy, { opacity: 0 });
      tl.fromTo(hoy, { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in", immediateRender: false }, HOY);
      temblor(hoy, HOY + 0.2, 0.8);
      tl.to(hoy, { opacity: 0, y: -40, duration: 0.25 }, QUE - 0.2);
      // "encontramos": chispas
      qa(".s07-chispa").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 0, scale: 0.2, svgOrigin: "540 960" }, { opacity: 1, scale: 1, svgOrigin: "540 960", duration: 0.3, ease: "back.out(2)", immediateRender: false }, ENCONTRAMOS + i * 0.08);
        tl.to(c, { opacity: 0, duration: 0.3 }, CORTINA + 0.6 + i * 0.05);
      });
      // la conductora señala la cortina
      tl.fromTo(q(".s07-cond"), { x: -120 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.to(q(".s07-cond"), { y: -30, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, QUE);
      tl.to(q(".s07-cond"), { x: -260, duration: 0.4, ease: "power2.in" }, CORTINA - 0.1);
      // "¡Que se abra la cortina!": se abre, sale la luz y la silueta
      tl.to(q(".s07-ci"), { x: -420, duration: 0.6, ease: "power3.inOut" }, CORTINA - 0.15);
      tl.to(q(".s07-cd"), { x: 420, duration: 0.6, ease: "power3.inOut" }, CORTINA - 0.15);
      tl.fromTo(q(".s07-rayos"), { rotation: 0, svgOrigin: "540 960", opacity: 0.4 }, { rotation: 40, svgOrigin: "540 960", opacity: 1, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".s07-sil"), { scale: 0.9, svgOrigin: "540 1330" }, { scale: 1, svgOrigin: "540 1330", duration: 1.2, ease: "power2.out" }, CORTINA);
'''
sfx = [{"t": 0.19, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.6}, {"t": 0.95, "sfx": "sparkle", "vol": 0.3}, {"t": 2.2, "sfx": "riser", "vol": 0.28, "max": 1.1}, {"t": 3.2, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 1.2}]
escena("s07-cortina", css, cuerpo, js, sfx, html)
