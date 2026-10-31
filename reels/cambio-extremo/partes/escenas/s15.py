from base import *
p = "s15"
css = css_tienda("s15t", 420, 760) + """
    [data-composition-id="%ID%"] .s15t-cel { left: 330px; top: 720px; box-shadow: 0 0 0 6px #fbfaf5, 0 0 70px 20px rgba(92, 230, 17, 0.35); }
    [data-composition-id="%ID%"] .s15-marca { top: 560px; font-size: 120px; }
    [data-composition-id="%ID%"] .s15-carro { left: 780px; top: 860px; width: 260px; height: 260px; }
    [data-composition-id="%ID%"] .s15-mas { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #5ce611; -webkit-text-stroke: 7px #16191d; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .s15-mini { left: 30px; top: 1080px; width: 300px; height: 300px; }
    [data-composition-id="%ID%"] .s15-luna { left: 40px; top: 900px; width: 130px; height: 130px; }
"""
carro = f'''<svg viewBox="0 0 260 260" aria-hidden="true">
  <g class="s15-cajas"><rect class="s15-c" x="70" y="40" width="60" height="60" fill="{N}" {S}/><rect class="s15-c" x="130" y="30" width="60" height="70" fill="{Y}" {S}/><rect class="s15-c" x="100" y="0" width="56" height="50" fill="{T}" {S}/></g>
  <path d="M10 40 H50 L80 180 H220 L240 90 H60" fill="none" stroke="{W}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M60 90 H240 L220 180 H80 Z" fill="{W}" fill-opacity="0.15"/>
  <circle cx="100" cy="220" r="18" fill="{W}" {S}/><circle cx="200" cy="220" r="18" fill="{W}" {S}/>
</svg>'''
luna = f'<svg viewBox="0 0 180 180"><path d="M120 20 A75 75 0 1 0 160 130 A60 60 0 1 1 120 20 Z" fill="{Y}" {S}/></svg>'
body = f"""
        <div class="obj s15-luna">{luna}</div>
        <div class="obj s15-mini">{local('s15l', 'REGALOS MÓNICA', persiana=True)}</div>
        <div class="s15t-cel" style="position:absolute;width:420px;height:760px"><div class="s15t-barra"></div><div class="s15t-pantalla">{tienda('s15t', boton='VENDIDO')}</div></div>
        <div class="obj s15-carro">{carro}</div>
        <div class="s15-mas s15-m1" style="left:800px; top:800px">+1</div>
        <div class="s15-mas s15-m2" style="left:930px; top:770px">+1</div>
        <div class="s15-mas s15-m3" style="left:870px; top:1120px">+1</div>
        <div class="big v s15-marca">Scalerics</div>
"""
js = """
      const SCAL = 1.61, VENDE = 2.57, SOLA = 2.86, PERS = 4.20;
      gsap.set(q(".s15t-cel"), { opacity: 1 });
      tl.fromTo(q(".s15t-cel"), { scale: 0.85, y: 80 }, { scale: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }, 0);
      tl.to(q(".s15t-cel"), { y: -14, duration: 0.6, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.5);
      tl.fromTo(qa(".s15t-card"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.08, ease: "back.out(2)", immediateRender: false }, 0.3);
      gsap.set(q(".s15t-boton"), { backgroundColor: "#5ce611" });
      golpe(q(".s15-marca"), SCAL, -2, 2.4);
      sacudon(SCAL + 0.05, 1);
      // vende sola: el carrito se llena solo
      pop(q(".s15-carro"), VENDE - 0.1, 0.3);
      gsap.set(qa(".s15-c"), { opacity: 0 });
      qa(".s15-c").forEach((c, i) => tl.fromTo(c, { opacity: 1, y: -260 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, SOLA + i * 0.25));
      [".s15-m1", ".s15-m2", ".s15-m3"].forEach((s, i) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 1, y: 20 }, { opacity: 0, y: -60, duration: 0.7, ease: "power1.out", immediateRender: false }, SOLA + 0.1 + i * 0.25); });
      // aunque tengas la persiana baja
      gsap.set(q(".s15l-persiana"), { scaleY: 0.03, svgOrigin: "350 250" });
      pop(q(".s15-mini"), 3.5, 0.3);
      pop(q(".s15-luna"), 3.6, 0.3);
      tl.to(q(".s15l-persiana"), { scaleY: 1, svgOrigin: "350 250", duration: 0.2, ease: "power3.in" }, PERS);
      tl.to(q(".s15-mini"), { filter: "brightness(0.6)", duration: 0.3 }, PERS + 0.2);
      tl.to(q(".s15t-boton"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3 }, PERS + 0.3);
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.25}, {"t": 1.6, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.7}, {"t": 2.9, "sfx": "pop", "vol": 0.25},
       {"t": 3.15, "sfx": "pop", "vol": 0.25}, {"t": 3.4, "sfx": "ping", "vol": 0.25}, {"t": 4.2, "sfx": "impact-bass-1", "vol": 0.25, "max": 0.5}]
escena("s15-scalerics", p, 5.44, css, body, js, sfx)
