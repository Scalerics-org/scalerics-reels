from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-jug { left: 60px; top: 730px; width: 310px; height: 535px; }
    [data-composition-id="%ID%"] .s12-t { top: 588px; font-size: 100px; }
    [data-composition-id="%ID%"] .s12-g { position: absolute; padding: 14px 22px 10px; border-radius: 22px; border: 5px solid #0d1424; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; line-height: 1.15; white-space: nowrap; color: #0d1424; box-shadow: 6px 6px 0 #0d1424; }
    [data-composition-id="%ID%"] .s12-g small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; opacity: 0.7; }
    [data-composition-id="%ID%"] .s12-g1 { left: 440px; top: 730px; background: #ffffff; border-bottom-left-radius: 6px; }
    [data-composition-id="%ID%"] .s12-g2 { left: 520px; top: 860px; background: #6cc4ff; border-bottom-right-radius: 6px; }
    [data-composition-id="%ID%"] .s12-dorm { left: 560px; top: 1030px; width: 440px; height: 240px; }
    [data-composition-id="%ID%"] .s12-wa { position: absolute; left: 440px; top: 1000px; padding: 6px 14px 2px; background: #0d1424; border: 4px solid #6cc4ff; border-radius: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; color: #6cc4ff; white-space: nowrap; }
"""
body = f"""
        <div class="obj s12-jug">{jugador('s12j', luz=True)}</div>
        <div class="big c s12-t">Un agente de IA</div>
        <div class="s12-g s12-g1">¿tenés el buzo en M?<small>dom 23:00</small></div>
        <div class="s12-g s12-g2">¡Sí! ¿Te lo reservo?<small>23:00</small></div>
        <div class="s12-wa">WHATSAPP · 23:00</div>
        <div class="obj s12-dorm">{durmiendo('s12d')}</div>
"""
js = """
      const AGENTE = 0.18, IA = 0.93, ATIENDE = 2.04, WHATSAPP = 2.50, MIENTRAS = 3.26, DUERME = 3.61;
      // cuadro 0: se prende el jugador (destello)
      tl.fromTo(q(".s12-jug"), { scale: 1.3, rotation: -8, transformOrigin: "50% 100%" }, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }, 0);
      golpe(q(".s12-t"), AGENTE + 0.1, -2, 2.4);
      sacudon(AGENTE + 0.15, 1.3);
      tl.to(q(".s12-t"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, IA);
      vaiven(q(".s12-jug"), 0.5, 4, { y: -14 }, 0.35);
      tl.fromTo(q(".s12j-bd"), { rotation: 0, svgOrigin: "290 250" }, { rotation: -120, svgOrigin: "290 250", duration: 0.3, ease: "back.out(2)", immediateRender: false }, IA);
      // atiende el WhatsApp
      pop(q(".s12-g1"), ATIENDE - 0.1, 0.3, { transformOrigin: "0% 100%" });
      pop(q(".s12-g2"), WHATSAPP, 0.3, { transformOrigin: "100% 100%" });
      tl.to(q(".s12j-bd"), { rotation: -90, svgOrigin: "290 250", duration: 0.2 }, WHATSAPP);
      // mientras él duerme
      entra(q(".s12-dorm"), MIENTRAS - 0.15, { y: 300 }, 0.35);
      pop(q(".s12-wa"), MIENTRAS + 0.1, 0.25);
      qa(".s12d-z").forEach((z, i) => { gsap.set(z, { opacity: 0 }); tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -10, duration: 0.4, ease: "power1.out", immediateRender: false }, DUERME + i * 0.18); });
      tl.to(q(".s12d-cabeza"), { y: 4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, DUERME);
"""
sfx = [{"t": 0.0, "sfx": "sparkle", "vol": 0.3}, {"t": 0.15, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 1.95, "sfx": "notification", "vol": 0.25},
       {"t": 2.5, "sfx": "notification", "vol": 0.25}, {"t": 3.6, "sfx": "chime", "vol": 0.2, "max": 0.8}]
escena("s12-agente", p, 4.75, css, body, js, sfx)
