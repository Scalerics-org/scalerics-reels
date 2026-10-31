from base import *
p = "s13"
css = css_tienda("s13t", 420, 780) + """
    [data-composition-id="%ID%"] .s13t-cel { left: 560px; top: 700px; }
    [data-composition-id="%ID%"] .s13-reloj { position: absolute; left: 40px; top: 560px; width: 500px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 200px; line-height: 1; color: #14c4b8; -webkit-text-stroke: 12px #16191d; paint-order: stroke fill; text-shadow: 10px 10px 0 #16191d; }
    [data-composition-id="%ID%"] .s13-reloj small { display: block; font-size: 64px; color: #ffd21f; -webkit-text-stroke: 8px #16191d; }
    [data-composition-id="%ID%"] .s13-noti { position: absolute; left: 520px; top: 560px; width: 500px; padding: 18px 24px; background: #fbfaf5; border: 7px solid #16191d; border-radius: 26px; box-shadow: 8px 8px 0 #ff7a1a; }
    [data-composition-id="%ID%"] .s13-noti b { display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; color: #16191d; }
    [data-composition-id="%ID%"] .s13-noti small { display: block; margin-top: 4px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: #16191d; }
    [data-composition-id="%ID%"] .s13-pago { position: absolute; left: 470px; top: 1050px; padding: 14px 28px 8px; background: #5ce611; border: 7px solid #16191d; border-radius: 18px; box-shadow: 8px 8px 0 #16191d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 54px; color: #16191d; white-space: nowrap; }
    [data-composition-id="%ID%"] .s13-envio { position: absolute; left: 520px; top: 1220px; padding: 14px 24px 8px; background: #ff7a1a; border: 7px solid #16191d; border-radius: 18px; box-shadow: 8px 8px 0 #16191d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; color: #16191d; white-space: nowrap; }
    [data-composition-id="%ID%"] .s13-cama { left: 20px; top: 1000px; width: 560px; height: 520px; }
    [data-composition-id="%ID%"] .s13-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #fbfaf5; -webkit-text-stroke: 8px #16191d; paint-order: stroke fill; }
"""
cama = f'''<svg viewBox="0 0 560 520" aria-hidden="true">
  <rect x="20" y="300" width="520" height="160" rx="20" fill="{T}" {S}/>
  <path d="M20 300 Q280 250 540 300 L540 380 Q280 330 20 380 Z" fill="{W}" {S}/>
  <ellipse cx="170" cy="270" rx="140" ry="60" fill="{W}" {S}/>
  <g class="s13-cab">
    <circle cx="130" cy="150" r="30" fill="{W}" {S}/><circle cx="180" cy="130" r="30" fill="{W}" {S}/><circle cx="230" cy="150" r="30" fill="{W}" {S}/>
    <ellipse cx="180" cy="210" rx="72" ry="66" fill="{W}" {S}/>
    <path d="M108 196 Q180 180 252 196 L250 226 Q180 212 110 226 Z" fill="{K}" {S}/>
    <path d="M128 206 Q146 218 164 206 M196 206 Q214 218 232 206" stroke="{W}" stroke-width="5" fill="none"/>
    <path d="M166 250 Q180 260 194 250" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
  <path d="M300 330 Q420 300 520 330" stroke="{K}" stroke-width="5" fill="none" opacity="0.4"/>
  <rect x="20" y="440" width="40" height="70" fill="{K}"/><rect x="500" y="440" width="40" height="70" fill="{K}"/>
</svg>'''
body = f"""
        <div class="s13t-cel" style="position:absolute;width:420px;height:780px"><div class="s13t-barra"></div><div class="s13t-pantalla">{tienda('s13t', boton='PEDIDO #1')}</div></div>
        <div class="s13-reloj">2:00<small>DE LA MAÑANA</small></div>
        <div class="s13-noti"><b>¡NUEVO PEDIDO!</b><small>2 tazas · Regalos Mónica</small></div>
        <div class="s13-pago" data-layout-allow-overlap>PAGO APROBADO</div>
        <div class="s13-envio" data-layout-allow-overlap>ENVÍO EN CAMINO</div>
        <div class="obj s13-cama">{cama}</div>
        <div class="s13-z s13-z1" style="left:330px; top:990px; font-size:70px">Z</div>
        <div class="s13-z s13-z2" style="left:400px; top:920px; font-size:90px">Z</div>
        <div class="s13-z s13-z3" style="left:480px; top:830px; font-size:110px">Z</div>
"""
js = """
      const PEDIDO = 0.32, DOS = 1.32, PAGO = 2.50, ENVIO = 3.05, DURM = 3.95;
      gsap.set(q(".s13t-cel"), { opacity: 1 });
      tl.fromTo(q(".s13t-cel"), { y: 100 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.to(q(".s13t-cel"), { rotation: 3, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, PEDIDO);
      gsap.set(q(".s13-noti"), { opacity: 0 });
      tl.fromTo(q(".s13-noti"), { opacity: 1, y: -300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, PEDIDO - 0.05);
      // las dos de la mañana
      golpe(q(".s13-reloj"), DOS, -3, 2.6);
      sacudon(DOS + 0.05, 1.3);
      tl.fromTo(q(".s13-reloj"), { opacity: 1 }, { opacity: 0.55, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 3, immediateRender: false }, DOS + 0.4);
      // pago y envío
      golpe(q(".s13-pago"), PAGO + 0.05, -5, 2.4);
      sacudon(PAGO + 0.08, 0.9);
      golpe(q(".s13-envio"), ENVIO + 0.05, 4, 2.4);
      tl.fromTo(q(".s13-envio"), { x: 0 }, { x: 20, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ENVIO + 0.2);
      // y yo durmiendo
      tl.to(q(".s13-reloj"), { opacity: 0, y: -60, duration: 0.2 }, DURM - 0.25);
      gsap.set(q(".s13-cama"), { opacity: 0 });
      tl.fromTo(q(".s13-cama"), { opacity: 1, y: 600 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, DURM - 0.2);
      tl.to(q(".s13-cab"), { y: 6, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, DURM + 0.2);
      [".s13-z1", ".s13-z2", ".s13-z3"].forEach((s, i) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 0, y: 30, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, DURM + 0.2 + i * 0.2); });
"""
sfx = [{"t": 0.3, "sfx": "notification", "vol": 0.35}, {"t": 1.3, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.7}, {"t": 2.5, "sfx": "chime", "vol": 0.3},
       {"t": 3.05, "sfx": "pop", "vol": 0.3}, {"t": 3.9, "sfx": "whoosh-short", "vol": 0.25}, {"t": 4.2, "sfx": "sparkle", "vol": 0.25}]
escena("s13-pedido", p, 5.35, css, body, js, sfx)
