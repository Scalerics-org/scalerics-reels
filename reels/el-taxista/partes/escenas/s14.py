from base import *
p = "s14"
TX = taxi_arriba('s14-tx').replace('<svg viewBox="0 0 120 200" aria-hidden="true">', '<g transform="translate(-30 -50) scale(0.5)">').replace('</g>\n</svg>', '</g></g>')
css = """
    [data-composition-id="%ID%"] .s14-marca { top: 560px; font-size: 120px; letter-spacing: 0.01em; }
    [data-composition-id="%ID%"] .s14-glow { position: absolute; left: 140px; top: 700px; width: 800px; height: 800px; border-radius: 50%; background: radial-gradient(circle, rgba(92, 230, 17, 0.28) 0%, rgba(92, 230, 17, 0) 65%); }
    [data-composition-id="%ID%"] .s14-cel { box-shadow: 0 0 0 6px #f4ecd8, 12px 12px 0 6px #0b0f1a, 0 0 90px 10px rgba(92, 230, 17, 0.4); }
    [data-composition-id="%ID%"] .s14-web { left: 40px; top: 1180px; color: #5ce611; font-size: 52px; }
""" + css_sitio("s14", A)
mapa = f'''<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">
  <g class="s14-pin">{pin(G, 900, 1150, 1.1)}</g>
  <circle class="s14-onda" cx="900" cy="1150" r="60" fill="none" stroke="{G}" stroke-width="8"/>
  <g class="s14-taxi">{TX}</g>
</svg>'''
body = f"""
        <div class="s14-glow"></div>
        {celular('s14-cel', 540, 860, sitio('s14', 'LO DE<br>DOÑA NÉLIDA', A), 200, 700)}
        <div class="big v s14-marca">SCALERICS</div>
        <div class="sello s14-web">SITIO WEB</div>
        {mapa}
"""
js = """
      const SCAL = 0.58, SITIO = 1.64, ENC = 3.09, HASTA = 3.89, TAXISTA = 4.09;
      tl.fromTo(q(".s14-glow"), { opacity: 0.3, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6 }, 0);
      tl.fromTo(q(".s14-cel"), { y: 140, opacity: 0.5, rotation: 4 }, { y: 0, opacity: 1, rotation: -2, duration: 0.45, ease: "back.out(1.4)" }, 0);
      golpe(q(".s14-marca"), SCAL + 0.05, -2, 2.2);
      sacudon(SCAL + 0.08, 0.8);
      golpe(q(".s14-web"), SITIO + 0.1, -6, 2.4);
      [".s14-hor", ".s14-mapa", ".s14-wa"].forEach((s, i) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, SITIO + 0.3 + i * 0.25); });
      tl.to(q(".s14-web"), { opacity: 0, duration: 0.2 }, ENC - 0.3);
      // que te encuentren: el pin verde cae
      gsap.set(q(".s14-pin"), { opacity: 0 });
      tl.fromTo(q(".s14-pin"), { opacity: 1, y: -500 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, ENC - 0.15);
      gsap.set(q(".s14-onda"), { opacity: 0 });
      tl.fromTo(q(".s14-onda"), { opacity: 1, scale: 0.4, svgOrigin: "900 1150" }, { opacity: 0, scale: 2.4, svgOrigin: "900 1150", duration: 0.7, ease: "power2.out", immediateRender: false }, ENC + 0.2);
      // hasta un taxista: llega el taxi
      const T = q(".s14-taxi");
      gsap.set(T, { x: 900, y: 2000, rotation: 0 });
      tl.to(T, { y: 1260, duration: 0.45, ease: "power3.out" }, HASTA - 0.2);
      tl.to(T, { rotation: -6, duration: 0.08, yoyo: true, repeat: 3 }, TAXISTA + 0.2);
"""
sfx = [{"t": 0.0, "sfx": "riser", "vol": 0.2, "max": 0.6}, {"t": 0.6, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.7, "sfx": "pop", "vol": 0.3},
       {"t": 3.0, "sfx": "ping", "vol": 0.3}, {"t": 3.7, "sfx": "whoosh", "vol": 0.25, "max": 0.5}]
escena("s14-scalerics", p, 4.55, css, body, js, sfx)
