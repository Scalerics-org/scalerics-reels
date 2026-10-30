from base import escena
from personajes import *
NOMBRES = ["la del sillón", "Rubén: 6 sillas", "la de la cuna", "el del placard", "Doña Elsa", "¿el del lunes?", "presupuesto cama", "la de la mesa", "el del taller", "Marta: cortinas", "¿Gustavo?", "la vecina", "mesa ratona", "el primo de", "seña: ¿pagó?", "el de las banquetas", "la del espejo", "¿quién era?", "la de Carrasco", "biblioteca", "el del colchón", "llamar martes", "la que vuelve", "presupuesto ???", "el de la silla", "Elsa: rosado", "la de enfrente", "un tal Raúl", "cómoda blanca", "¿cuál sillón?"]
import math
pos = []
for i in range(30):
    a = -math.pi + (i / 30) * math.pi * 2.0
    r = 300 + (i % 3) * 70
    x = 540 + math.cos(a) * r * 1.05
    y = 880 + math.sin(a) * r * 0.62
    pos.append((x, y))
css = '''
    SC .s11-tag { position: absolute; padding: 2px 14px; background: #fbefe9; border: 3px solid #4b2537; border-radius: 10px; font-family: "Caveat", cursive; font-weight: 700; font-size: 32px; line-height: 1.1; color: #4b2537; white-space: nowrap; }
    SC .s11-tag.ama { background: #ecc97a; }
    SC .s11-tag.ros { background: #e3a6ae; }
    SC .s11-mano { position: absolute; }
'''
cuerpo = f'''
          <g class="s11-ald"><g transform="translate(540 960) scale(0.95)">{aldo("s11")}</g></g>
          <g class="s11-mano"><path d="M-40 1150 Q120 1110 260 1120" fill="none" stroke="#4b2537" stroke-width="44" stroke-linecap="round" /><path d="M-40 1150 Q120 1110 260 1120" fill="none" stroke="#e3a6ae" stroke-width="32" stroke-linecap="round" /><circle cx="280" cy="1118" r="30" fill="#fbefe9" stroke="#4b2537" stroke-width="5" /></g>
          <g class="s11-humo">{"".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fbefe9" stroke="#a48cc8" stroke-width="5" opacity="0.9" />' for x,y,r in [(440,790,44),(540,760,58),(640,790,46),(500,720,36),(590,715,34)])}</g>
'''
tags = "\n".join(f'        <div class="s11-tag {["", "ama", "ros"][i % 3]}" data-layout-ignore style="left: {min(max(x - 90, 24), 800):.0f}px; top: {y - 22:.0f}px">{n}</div>' for i, (n, (x, y)) in enumerate(zip(NOMBRES, pos)))
html = tags
js = '''
      const TRANQ = 0.0, ALDO = 0.57, DESASTRE = 2.05, TREINTA = 3.03, CABEZA = 4.02, NOHAY = 4.93, CABEZA2 = 5.25, TANTO = 6.15;
      tl.fromTo(q(".escenario"), { scale: 1.06, transformOrigin: "540px 960px" }, { scale: 1, duration: 2.6, ease: "power1.out" }, 0);
      // la conductora le palmea el hombro
      tl.fromTo(q(".s11-mano"), { x: -320 }, { x: 0, duration: 0.4, ease: "power3.out" }, TRANQ);
      tl.to(q(".s11-mano"), { y: -10, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, ALDO);
      tl.to(q(".s11-mano"), { x: -340, duration: 0.35, ease: "power2.in" }, DESASTRE + 0.3);
      // "desastre": se le arregla la cara un poquito
      tl.to(q(".s11-cejas"), { y: -4, duration: 0.2 }, DESASTRE);
      gsap.set(q(".s11-lagrima"), { opacity: 0 });
      // "treinta clientes en la cabeza": aparecen todos alrededor
      const tags = qa(".s11-tag");
      tags.forEach((t, i) => {
        gsap.set(t, { opacity: 0 });
        tl.fromTo(t, { opacity: 0, scale: 0.3, x: (540 - t.offsetLeft - 90) * 0.7, y: (900 - t.offsetTop) * 0.7, rotation: 0 }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: (i % 5) * 4 - 8, duration: 0.3, ease: "back.out(2)", immediateRender: false }, TREINTA - 0.1 + i * 0.035);
        tl.to(t, { rotation: "+=" + ((i % 2) ? 5 : -5), duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, NOHAY + (i % 4) * 0.03);
      });
      // "no hay cabeza que dé para tanto": humo, temblor y todo sale volando
      gsap.set(q(".s11-humo"), { opacity: 0 });
      tl.to(q(".s11-humo"), { opacity: 1, duration: 0.1 }, CABEZA2);
      tl.to(q(".s11-humo"), { y: -60, scale: 1.3, svgOrigin: "540 810", duration: 0.9, ease: "power1.out" }, CABEZA2);
      tl.to(q(".s11-humo"), { opacity: 0, duration: 0.3 }, CABEZA2 + 0.8);
      [0, 0.18, 0.36, 0.54].forEach((d) => temblor(q(".s11-ald"), CABEZA2 + d, 0.7));
      tl.to(q(".s11-ojo"), { scale: 0.4, svgOrigin: "0 0", duration: 0.1 }, CABEZA2);
      tags.forEach((t, i) => tl.to(t, { x: (t.offsetLeft + 90 - 540) * 1.2, y: (t.offsetTop - 900) * 1.2 + 500, rotation: (i % 2 ? 60 : -60), opacity: 0, duration: 0.7, ease: "power2.in" }, TANTO - 0.1 + (i % 6) * 0.02));
'''
sfx = [{"t": 0.05, "sfx": "click-soft", "vol": 0.25}, {"t": 3.0, "sfx": "typing", "vol": 0.3, "max": 1.1}, {"t": 5.2, "sfx": "glitch-2", "vol": 0.2, "max": 0.5}, {"t": 6.05, "sfx": "whoosh-cinematic", "vol": 0.28, "max": 1.0}]
escena("s11-cabeza", css, cuerpo, js, sfx, html)
