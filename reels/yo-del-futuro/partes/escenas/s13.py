from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-ag { left: 340px; top: 740px; }
    [data-composition-id="%ID%"] .s13-hora { left: 50px; top: 600px; font-size: 76px; }
    [data-composition-id="%ID%"] .s13-agenda { left: 640px; top: 640px; font-size: 52px; }
    [data-composition-id="%ID%"] .s13-venta { left: 30px; top: 1190px; font-size: 34px; color: #fdf6ff; text-shadow: 0 0 12px #ff2a9d; }
    [data-composition-id="%ID%"] .s13-cama { left: 600px; top: 1100px; width: 440px; height: 300px; }
    [data-composition-id="%ID%"] .s13-hoy { left: 560px; top: 880px; font-size: 170px; }
"""
cama = f'''<svg viewBox="0 0 440 300" aria-hidden="true">
  <rect x="10" y="100" width="24" height="180" rx="8" fill="{V}" {S}/><rect x="406" y="160" width="24" height="120" rx="8" fill="{V}" {S}/>
  <rect x="20" y="200" width="400" height="60" rx="12" fill="{W}" {S}/>
  <circle cx="100" cy="166" r="40" fill="{W}" {S}/><path d="M62 166 Q60 120 100 120 Q140 120 138 166 Q124 146 100 148 Q76 146 62 166 Z" fill="{K}"/>
  <path d="M80 172 Q88 178 96 172 M106 172 Q114 178 122 172" stroke="{K}" stroke-width="4" fill="none"/>
  <path d="M140 170 Q280 140 420 190 L420 230 L130 230 Z" fill="{M}" {S}/>
  <g class="s13-z"><text x="200" y="110" font-family="Lexend" font-weight="900" font-size="54" fill="{C}" stroke="{K}" stroke-width="6" paint-order="stroke fill">Z</text>
  <text x="250" y="70" font-family="Lexend" font-weight="900" font-size="44" fill="{C}" stroke="{K}" stroke-width="6" paint-order="stroke fill">z</text>
  <text x="290" y="36" font-family="Lexend" font-weight="900" font-size="34" fill="{C}" stroke="{K}" stroke-width="6" paint-order="stroke fill">z</text></g>
  <path d="M370 20 A40 40 0 1 0 410 70 A32 32 0 1 1 370 20 Z" fill="{W}" {S}/>
</svg>'''
body = f"""
        <div class="fig s13-ag">{agente('s13a')}</div>
        <div class="reloj cy s13-hora"><small>ATIENDE</small>03:47</div>
        <div class="reloj s13-agenda"><small>AGENDA</small>MAÑ 10:00</div>
        <div class="sello s13-venta">Pedido confirmado</div>
        <div class="obj s13-cama">{cama}</div>
        <div class="reloj s13-hoy"><small>EMPEZÁ</small>HOY</div>
"""
js = """
      const HORA = 0.52, AGENDA = 1.34, VENDE = 1.82, DUERMEN = 2.60, YVOS = 3.58, HOY = 4.95;
      const ag = q(".s13-ag");
      tl.fromTo(ag, { y: 0 }, { y: -14, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s13a-lineas"), { y: -40 }, { y: 40, duration: 0.6, ease: "none", repeat: 9 }, 0);
      habla(".s13a-boca", 0, 3.2, "200 234");
      pop(q(".s13-hora"), HORA - 0.15, 0.3, { rotation: -3 });
      pop(q(".s13-agenda"), AGENDA - 0.1, 0.3, { rotation: 3 });
      tl.to(q(".s13a-bi"), { rotation: 60, svgOrigin: "148 300", duration: 0.2, yoyo: true, repeat: 1 }, HORA - 0.1);
      tl.to(q(".s13a-bd"), { rotation: -60, svgOrigin: "252 300", duration: 0.2, yoyo: true, repeat: 1 }, AGENDA - 0.1);
      golpe(q(".s13-venta"), VENDE, -4, 2.2);
      sacudon(VENDE + 0.05, 1);
      pop(q(".s13-cama"), DUERMEN - 0.15, 0.35);
      tl.fromTo(q(".s13-z"), { y: 10, opacity: 0.4 }, { y: -10, opacity: 1, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, DUERMEN + 0.2);
      // y vos lo podés empezar hoy
      tl.to([q(".s13-hora"), q(".s13-agenda"), q(".s13-venta"), q(".s13-cama")], { opacity: 0, scale: 0.7, duration: 0.25, stagger: 0.04, ease: "power2.in" }, YVOS);
      tl.to(ag, { x: -220, duration: 0.4, ease: "power3.inOut" }, YVOS + 0.2);
      golpe(q(".s13-hoy"), HOY, -3, 2.6);
      sacudon(HOY + 0.05, 1.5);
      tl.to(q(".s13-hoy"), { scale: 1.07, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, HOY + 0.2);
"""
sfx = [{"t": 0.4, "sfx": "ping", "vol": 0.28}, {"t": 1.25, "sfx": "click", "vol": 0.3}, {"t": 1.75, "sfx": "chime", "vol": 0.3}, {"t": 2.5, "sfx": "sparkle", "vol": 0.2},
       {"t": 3.6, "sfx": "whoosh", "vol": 0.22, "max": 0.4}, {"t": 4.9, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
escena("s13-agente", p, 6.05, css, body, js, sfx)
