from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-loc { left: 270px; top: 760px; width: 540px; height: 540px; }
    [data-composition-id="%ID%"] .s13-mejor { left: 0; right: 0; top: 560px; text-align: center; font-size: 36px; color: #f4ecd8; letter-spacing: 0.22em; }
    [data-composition-id="%ID%"] .s13-torta { top: 610px; font-size: 120px; }
    [data-composition-id="%ID%"] .s13-novende { left: 60px; top: 640px; color: #ff3b30; font-size: 64px; }
    [data-composition-id="%ID%"] .s13-nadie { top: 1360px; font-size: 104px; }
    [data-composition-id="%ID%"] .s13-mini { left: 380px; top: 1060px; width: 130px; height: 136px; }
    [data-composition-id="%ID%"] .s13-yuyo { left: -200px; top: 1180px; width: 150px; height: 150px; }
"""
haz = f'<svg class="full" viewBox="0 0 1080 1920"><path class="s13-haz" d="M500 640 L580 640 L820 1310 L260 1310 Z" fill="{Y}" opacity="0.10"/></svg>'
yuyo = f'<svg viewBox="0 0 150 150"><g class="s13-y"><circle cx="75" cy="75" r="62" fill="none" stroke="{A}" stroke-width="6"/><path d="M20 60 Q75 20 130 70 M30 110 Q80 40 120 110 M40 30 Q60 90 110 130 M75 14 Q100 80 60 136" stroke="{A}" stroke-width="5" fill="none"/></g></svg>'
body = f"""
        {haz}
        <div class="obj s13-loc">{local('s13l', 'LO DE DOÑA NÉLIDA', A, luz=False)}</div>
        <div class="obj s13-mini">{torta('s13t', color=A)}</div>
        <div class="mono s13-mejor">LA MEJOR TORTA DEL MUNDO</div>
        <div class="sello s13-novende">NO VENDE</div>
        <div class="big y s13-nadie">SI NADIE LLEGA</div>
        <div class="obj s13-yuyo">{yuyo}</div>
"""
js = """
      const MEJOR = 0.97, MUNDO = 1.70, NO = 1.97, NADIE = 2.79, LLEGA = 3.06;
      // cuadro 0: el local de Nélida, de noche, solo
      tl.fromTo(q(".s13-loc"), { scale: 1.1, opacity: 0.5, transformOrigin: "50% 100%" }, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
      tl.fromTo(q(".s13-haz"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);
      pop(q(".s13-mini"), MEJOR - 0.1, 0.35);
      tl.to(q(".s13-mini"), { scale: 1.12, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, MEJOR + 0.3);
      pop(q(".s13-mejor"), MEJOR, 0.3);
      tl.to(q(".s13-mejor"), { scale: 1.12, duration: 0.2, ease: "power2.out" }, MUNDO);
      golpe(q(".s13-novende"), NO + 0.15, -8, 2.6);
      sacudon(NO + 0.18, 1.2);
      // nadie: pasa rodando un yuyo por la vereda vacía
      tl.fromTo(q(".s13-yuyo"), { x: 0 }, { x: 1450, duration: 1.6, ease: "none" }, NADIE - 0.4);
      tl.fromTo(q(".s13-y"), { rotation: 0, svgOrigin: "75 75" }, { rotation: 720, svgOrigin: "75 75", duration: 1.6, ease: "none" }, NADIE - 0.4);
      tl.to(q(".s13-yuyo"), { y: -40, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.out" }, NADIE - 0.4);
      golpe(q(".s13-nadie"), LLEGA - 0.1, -3, 2.2);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-cinematic", "vol": 0.2, "max": 0.8}, {"t": 0.95, "sfx": "sparkle", "vol": 0.25, "max": 0.8}, {"t": 2.1, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7},
       {"t": 2.45, "sfx": "whoosh", "vol": 0.2, "max": 1.0}, {"t": 3.0, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s13-torta", p, 4.11, css, body, js, sfx)
