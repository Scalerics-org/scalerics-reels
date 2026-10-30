from base import escena
from personajes import *
rayos = "".join(f'<path d="M540 900 L{540+900*__import__("math").cos(a/12*6.283):.0f} {900+900*__import__("math").sin(a/12*6.283):.0f} L{540+900*__import__("math").cos((a+0.5)/12*6.283):.0f} {900+900*__import__("math").sin((a+0.5)/12*6.283):.0f} Z" fill="#c99a3c" opacity="0.22" />' for a in range(12))
css = '''
    SC .s08-papel { position: absolute; left: 600px; top: 610px; width: 170px; height: 210px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 6px; }
    SC .s08-papel .rr { position: absolute; left: 18px; right: 18px; height: 4px; background: #e3a6ae; }
    SC .s08-papel .pt { position: absolute; left: -26px; bottom: -22px; width: 90px; height: 84px; background: #ecc97a; border: 3px solid #4b2537; transform: rotate(-12deg); }
    SC .s08-papel .t { left: 0; right: 0; top: 120px; font-size: 32px; }
'''
cuerpo = f'''
          <defs><clipPath id="s08-c"><rect x="60" y="600" width="960" height="730" /></clipPath></defs>
          <g clip-path="url(#s08-c)"><g class="s08-rayos">{rayos}</g></g>
          {cortina_mitad("s08", "i", 20, 160, 640, 1330)}
          {cortina_mitad("s08", "d", 920, 1060, 640, 1330)}
          <g class="s08-g"><g transform="translate(540 860) scale(0.92)">{graciela("s08")}</g></g>
          <g class="s08-a"><g transform="translate(790 900) scale(0.78)">{aldo("s08")}</g></g>
          {"".join(f'<use href="#s08-cor" class="s08-cor k{i}" x="{x}" y="{y}" />' for i,(x,y) in enumerate([(300,760),(780,720),(250,1050),(840,1080),(540,660)]))}
          <defs><path id="s08-cor" d="M0 18 C-26 -6 -44 -22 -44 -40 C-44 -56 -32 -66 -20 -66 C-10 -66 -3 -60 0 -52 C3 -60 10 -66 20 -66 C32 -66 44 -56 44 -40 C44 -22 26 -6 0 18 Z" fill="#c4607a" stroke="#4b2537" stroke-width="4" /></defs>
'''
html = '''
        <div class="s08-papel"><div class="rr" style="top: 28px"></div><div class="rr" style="top: 54px"></div><div class="rr" style="top: 80px; right: 50px"></div><div class="mano t">sillón verde</div><div class="pt"></div></div>
'''
js = '''
      const HOLA = 0.0, ALDO = 0.52, GRACIELA = 1.84, GRITO = 3.02, TENGO = 4.23, PRESU = 4.48, ACA = 5.0;
      tl.fromTo(q(".s08-rayos"), { rotation: 0, svgOrigin: "540 900" }, { rotation: 30, svgOrigin: "540 900", duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".escenario"), { scale: 1.06, transformOrigin: "540px 900px" }, { scale: 1, duration: 1.4, ease: "power2.out" }, 0);
      // Graciela saluda, tímida
      tl.fromTo(q(".s08-g"), { y: 30 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      tl.to(q(".s08-g"), { rotation: -3, svgOrigin: "540 1250", duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, ALDO);
      // "Graciela": corazones
      qa(".s08-cor").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, GRACIELA + i * 0.07);
        tl.to(c, { opacity: 0, y: -60, duration: 0.35 }, GRITO - 0.3 + i * 0.03);
      });
      // "¡Graciela!": entra Don Aldo eufórico, ella se corre
      tl.to(q(".s08-g"), { x: -250, scale: 0.85, svgOrigin: "540 1250", duration: 0.35, ease: "power3.out" }, GRITO - 0.15);
      gsap.set(q(".s08-a"), { opacity: 0 });
      tl.fromTo(q(".s08-a"), { opacity: 1, x: 420 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, GRITO - 0.15);
      tl.to(q(".s08-a"), { y: -40, duration: 0.18, yoyo: true, repeat: 3, ease: "power2.out" }, GRITO + 0.25);
      tl.set(q(".s08-a .s08-boca"), { attr: { d: "M-34 80 Q0 120 34 80 Z" }, fill: "#c4607a" }, GRITO);
      tl.set(q(".s08-a .s08-cejas"), { y: -10 }, GRITO);
      tl.set(q(".s08-a .s08-lagrima"), { opacity: 0 }, GRITO);
      // "¡Tengo su presupuesto acá!": saca la hoja arrugada (con el post-it pegado)
      const pap = q(".s08-papel");
      gsap.set(pap, { opacity: 0 });
      tl.fromTo(pap, { opacity: 0, y: 200, rotation: 30 }, { opacity: 1, y: 0, rotation: 8, duration: 0.35, ease: "back.out(2)", immediateRender: false }, TENGO);
      tl.to(pap, { rotation: -8, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, PRESU + 0.1);
      zoom(ACA, 1.08, 700, 900, 0.3);
'''
sfx = [{"t": 0.0, "sfx": "chime", "vol": 0.28}, {"t": 1.84, "sfx": "sparkle", "vol": 0.3}, {"t": 2.9, "sfx": "whoosh", "vol": 0.25}, {"t": 4.23, "sfx": "pop", "vol": 0.3}]
escena("s08-graciela", css, cuerpo, js, sfx, html)
