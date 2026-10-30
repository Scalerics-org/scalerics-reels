from base import escena
from personajes import *
cara = lambda i, x, y, c: f'<g class="s10-p p{i}"><g transform="translate({x} {y})"><path d="M-80 150 Q-80 60 0 54 Q80 60 80 150 Z" fill="{c}" stroke="#4b2537" stroke-width="5" /><circle cx="0" cy="0" r="52" fill="#fbefe9" stroke="#4b2537" stroke-width="5" /><circle cx="-18" cy="-10" r="6" fill="#4b2537" /><circle cx="18" cy="-10" r="6" fill="#4b2537" /><ellipse class="s10-o" cx="0" cy="22" rx="11" ry="16" fill="#4b2537" /></g></g>'
css = '''
    SC .s10-ooh { left: 0; right: 0; top: 610px; font-size: 170px; line-height: 1; color: #c99a3c; font-family: "Lexend", sans-serif; font-weight: 900; -webkit-text-stroke: 10px #4b2537; paint-order: stroke fill; }
'''
cuerpo = f'''
          <g class="s10-izq"><path d="M540 1060 C480 1000 400 950 400 880 C400 830 440 800 480 800 C510 800 530 815 540 840 L520 900 L556 950 L524 1000 Z" fill="#c4607a" stroke="#4b2537" stroke-width="6" stroke-linejoin="round" /></g>
          <g class="s10-der"><path d="M540 1060 C600 1000 680 950 680 880 C680 830 640 800 600 800 C570 800 550 815 540 840 L520 900 L556 950 L524 1000 Z" fill="#c4607a" stroke="#4b2537" stroke-width="6" stroke-linejoin="round" /></g>
          {"".join(cara(i, x, 1160 + (i % 2) * 20, c) for i, (x, c) in enumerate([(130, "#a48cc8"), (320, "#e3a6ae"), (540, "#c99a3c"), (760, "#a48cc8"), (950, "#e3a6ae")]))}
'''
html = '''
        <div class="lex s10-ooh">¡OOOH!</div>
'''
js = '''
      // el público reacciona en el cuadro 0
      tl.fromTo(q(".escenario"), { scale: 1.1, transformOrigin: "540px 960px" }, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
      qa(".s10-p").forEach((p, i) => {
        tl.fromTo(p, { y: 30 }, { y: 0, duration: 0.25, ease: "back.out(2)" }, i * 0.04);
        tl.to(p, { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3 + i * 0.05);
      });
      qa(".s10-o").forEach((o, i) => tl.fromTo(o, { scaleY: 0.6, svgOrigin: "0 22" }, { scaleY: 1.4, svgOrigin: "0 22", duration: 0.4, ease: "power2.out" }, 0.05 + i * 0.03));
      const ooh = q(".s10-ooh");
      tl.fromTo(ooh, { scale: 1.8 }, { scale: 1, duration: 0.2, ease: "power4.in" }, 0);
      temblor(ooh, 0.22, 1);
      tl.to(ooh, { scale: 1.06, duration: 0.4, yoyo: true, repeat: 2, ease: "sine.inOut" }, 0.5);
      // el corazón se parte
      tl.to(q(".s10-izq"), { x: -50, y: 40, rotation: -16, svgOrigin: "540 1060", duration: 0.5, ease: "power2.out" }, 0.35);
      tl.to(q(".s10-der"), { x: 50, y: 40, rotation: 16, svgOrigin: "540 1060", duration: 0.5, ease: "power2.out" }, 0.35);
      tl.to([q(".s10-izq"), q(".s10-der")], { y: 120, duration: 1.2, ease: "power1.in" }, 0.9);
'''
sfx = [{"t": 0.0, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 0.35, "sfx": "glitch-1", "vol": 0.2, "max": 0.35}]
escena("s10-oooh", css, cuerpo, js, sfx, html)
