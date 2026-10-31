from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-cel { left: 330px; top: 700px; box-shadow: 0 0 0 6px #5ce611, 0 0 90px 24px rgba(92, 230, 17, 0.25); }
    [data-composition-id="%ID%"] .s13-cel .head { background: #2a1220; }
    [data-composition-id="%ID%"] .s13-cel .head small { color: #5ce611; }
    [data-composition-id="%ID%"] .s13-cel .head i { background: #5ce611; }
    [data-composition-id="%ID%"] .s13-cel .msg.yo { background: #5ce611; }
    [data-composition-id="%ID%"] .s13-t { top: 570px; font-size: 118px; }
    [data-composition-id="%ID%"] .s13-reloj { left: 30px; top: 820px; width: 280px; height: 280px; }
    [data-composition-id="%ID%"] .s13-rc { left: 30px; top: 1110px; width: 280px; text-align: center; font-size: 28px; line-height: 1.25; white-space: normal; color: #5ce611; }
    [data-composition-id="%ID%"] .s13-chip { position: absolute; top: 1420px; padding: 16px 34px 10px; background: #5ce611; border: 6px solid #2a1220; border-radius: 40px; box-shadow: 6px 6px 0 #2a1220; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1; color: #2a1220; white-space: nowrap; }
"""
reloj = f'''<svg viewBox="0 0 280 280" aria-hidden="true"><circle cx="140" cy="140" r="120" fill="{M}" stroke="{K}" stroke-width="10"/><circle cx="140" cy="140" r="104" fill="none" stroke="{G}" stroke-width="8"/>
  {"".join(f'<path d="M140 {44} V{60}" stroke="{K}" stroke-width="8" stroke-linecap="round" transform="rotate({a * 30} 140 140)"/>' for a in range(12))}
  <path class="s13-hh" d="M140 140 V84" stroke="{K}" stroke-width="12" stroke-linecap="round"/>
  <path class="s13-mm" d="M140 140 V56" stroke="{G}" stroke-width="8" stroke-linecap="round"/><circle cx="140" cy="140" r="10" fill="{K}"/></svg>'''
body = f"""
        <div class="cel s13-cel" style="width:460px;height:690px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>El de enfrente</b><small>agente de IA · en línea</small></div>
          <div class="msg el s13-m1" style="top:160px">¿Tenés en 37?<small>02:40</small></div>
          <div class="msg yo s13-m2" style="top:280px">¡Sí! ¿Te lo reservo?<small>02:40</small></div>
          <div class="msg el s13-m3" style="top:400px">¡Dale!<small>02:41</small></div>
          <div class="msg yo s13-m4" style="top:500px">Listo, a tu nombre. Te aviso<small>02:41</small></div>
        </div></div>
        <div class="obj s13-reloj">{reloj}</div>
        <div class="mono s13-rc">A CUALQUIER HORA</div>
        <div class="big g s13-t">Agente de IA</div>
        <div class="s13-chip s13-c1" style="left:150px">RESERVA</div>
        <div class="s13-chip s13-c2" style="left:620px">AVISA</div>
"""
js = """
      const ENFRENTE = 1.09, AGENTE = 2.09, IA = 2.55, WHATS = 3.73, CUALQ = 4.09, RESERVA = 5.10, AVISA = 5.55;
      // cuadro 0: el celular del de enfrente se enciende
      tl.fromTo(q(".s13-cel"), { scale: 0.9, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      vaiven(q(".s13-cel"), 0.5, 5.6, { y: -10 }, 0.5);
      pop(q(".s13-m1"), ENFRENTE - 0.3, 0.25, { transformOrigin: "0% 100%" });
      golpe(q(".s13-t"), AGENTE, -3, 2.8);
      sacudon(AGENTE + 0.05, 1.6);
      tl.to(q(".s13-t"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, IA);
      pop(q(".s13-m2"), WHATS - 0.4, 0.25, { transformOrigin: "100% 100%" });
      pop(q(".s13-m3"), WHATS + 0.3, 0.25, { transformOrigin: "0% 100%" });
      pop(q(".s13-m4"), RESERVA - 0.2, 0.25, { transformOrigin: "100% 100%" });
      // el reloj gira: a cualquier hora
      pop(q(".s13-reloj"), WHATS - 0.1, 0.3);
      pop(q(".s13-rc"), CUALQ, 0.3);
      tl.fromTo(q(".s13-mm"), { rotation: 0, svgOrigin: "140 140" }, { rotation: 1440, svgOrigin: "140 140", duration: 2.4, ease: "power1.inOut", immediateRender: false }, CUALQ - 0.2);
      tl.fromTo(q(".s13-hh"), { rotation: 0, svgOrigin: "140 140" }, { rotation: 120, svgOrigin: "140 140", duration: 2.4, ease: "power1.inOut", immediateRender: false }, CUALQ - 0.2);
      golpe(q(".s13-c1"), RESERVA, -4, 2);
      golpe(q(".s13-c2"), AVISA, 4, 2);
      sacudon(AVISA + 0.05, 0.8);
"""
sfx = [{"t": 0.05, "sfx": "riser", "vol": 0.2, "max": 1.0}, {"t": 0.8, "sfx": "notification", "vol": 0.22}, {"t": 2.0, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7},
       {"t": 2.1, "sfx": "sparkle", "vol": 0.25}, {"t": 3.35, "sfx": "notification", "vol": 0.2}, {"t": 4.0, "sfx": "whoosh", "vol": 0.2, "max": 0.5},
       {"t": 5.1, "sfx": "pop", "vol": 0.28}, {"t": 5.55, "sfx": "ping", "vol": 0.28}]
escena("s13-agente", p, 6.38, css, body, js, sfx)
