from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-cel { left: 520px; top: 740px; }
    [data-composition-id="%ID%"] .s06-m1 { top: 190px; }
    [data-composition-id="%ID%"] .s06-visto { position: absolute; right: 30px; top: 330px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: #22e4ff; letter-spacing: 0.06em; }
    [data-composition-id="%ID%"] .s06-tics { position: absolute; right: 30px; top: 372px; width: 110px; height: 60px; }
    [data-composition-id="%ID%"] .s06-sello { left: 140px; top: 960px; font-size: 120px; color: #ff2a9d; }
    [data-composition-id="%ID%"] .s06-hoy { left: 60px; top: 800px; }
    [data-composition-id="%ID%"] .s06-glo { left: 40px; top: 600px; font-size: 46px; background: #22e4ff; }
"""
tics = f'<svg viewBox="0 0 110 60"><path class="s06-t" d="M6 32 L24 50 L60 10" fill="none" stroke="{C}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path class="s06-t" d="M44 32 L62 50 L98 10" fill="none" stroke="{C}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
pant = f'<div class="chat-head"><i></i><b>Clienta</b></div><div class="msg s06-m1">¿Tenés para hoy?<small>SÁB 23:12</small></div><div class="s06-visto">VISTO 23:12</div><div class="s06-tics">{tics}</div>'
body = f"""
        <div class="fig s06-hoy">{hoy('s06h')}</div>
        <div class="globo s06-glo">Estaba cerrando...</div>
        {celular('s06', 420, 760).replace('%PANT%', pant)}
        <div class="sello s06-sello">En visto</div>
"""
js = """
      const DEJASTE = 0.89, VISTO = 1.33, ESTABA = 2.25;
      tl.fromTo(q(".s06-cel"), { scale: 1 }, { scale: 1.08, transformOrigin: "50% 30%", duration: 1.2, ease: "power2.out" }, 0);
      gsap.set(q(".s06-visto"), { opacity: 0 });
      tl.to(q(".s06-visto"), { opacity: 1, duration: 0.15 }, DEJASTE);
      qa(".s06-t").forEach((t, i) => tl.fromTo(t, { strokeDasharray: 80, strokeDashoffset: 80 }, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, VISTO - 0.25 + i * 0.12));
      golpe(q(".s06-sello"), VISTO, -9, 2.8);
      sacudon(VISTO + 0.05, 1.6);
      tl.to(q(".s06-sello"), { scale: 1.06, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, VISTO + 0.2);
      // estaba cerrando...: el de hoy, avergonzado
      tl.to(q(".s06-sello"), { opacity: 0, scale: 0.8, duration: 0.2 }, ESTABA - 0.2);
      gsap.set(q(".s06-hoy"), { transformOrigin: "50% 100%" });
      entra(q(".s06-hoy"), ESTABA - 0.25, { x: -500 }, 0.3);
      tl.to(q(".s06h-gota"), { opacity: 1, duration: 0.1 }, ESTABA);
      tl.fromTo(q(".s06h-gota"), { y: 0 }, { y: 26, duration: 0.6, ease: "power1.in", immediateRender: false }, ESTABA + 0.1);
      tl.to(q(".s06h-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, ESTABA);
      tl.to(q(".s06h-cabeza"), { rotation: -8, svgOrigin: "200 250", duration: 0.3 }, ESTABA);
      pop(q(".s06-glo"), ESTABA + 0.05, 0.25, { rotation: -3 });
"""
sfx = [{"t": 0.9, "sfx": "click-soft", "vol": 0.3}, {"t": 1.25, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 1.3, "sfx": "glitch-1", "vol": 0.25, "max": 0.4},
       {"t": 2.1, "sfx": "whoosh-short", "vol": 0.22}, {"t": 2.3, "sfx": "pop", "vol": 0.25}]
escena("s06-visto", p, 3.50, css, body, js, sfx)
