from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-tax { left: 40px; top: 900px; }
    [data-composition-id="%ID%"] .s09-usd { left: 520px; top: 600px; width: 480px; height: 420px; }
    [data-composition-id="%ID%"] .s09-pel { left: 600px; top: 1000px; width: 260px; height: 260px; }
    [data-composition-id="%ID%"] .s09-glo { left: 420px; top: 600px; font-size: 52px; font-weight: 900; }
    [data-composition-id="%ID%"] .s09-ahora { left: 500px; top: 1100px; font-size: 34px; color: #ff9a3c; letter-spacing: 0.2em; }
"""
usd = f'''<svg viewBox="0 0 480 420"><text x="20" y="250" font-family="Lexend" font-weight="900" font-size="230" fill="{A}" stroke="{K}" stroke-width="14" paint-order="stroke fill">US$</text>
  <path class="s09-flecha" d="M40 380 L150 300 L210 340 L330 200 L380 240 L450 90" fill="none" stroke="{K}" stroke-width="34" stroke-linejoin="round" stroke-linecap="round"/>
  <path class="s09-flecha2" d="M40 380 L150 300 L210 340 L330 200 L380 240 L450 90" fill="none" stroke="{R}" stroke-width="20" stroke-linejoin="round" stroke-linecap="round"/>
  <path class="s09-punta" d="M400 100 L460 70 L466 140 Z" fill="{R}" {S}/></svg>'''
pel = f'''<svg viewBox="0 0 260 260"><g class="s09-bola"><circle cx="130" cy="130" r="118" fill="{C}" {S} stroke-width="8"/>
  <path d="M130 80 L178 114 L160 170 L100 170 L82 114 Z" fill="{K}"/>
  <path d="M130 80 V20 M178 114 L238 96 M160 170 L196 222 M100 170 L64 222 M82 114 L22 96" stroke="{K}" stroke-width="6"/>
  <path d="M100 26 L130 20 L160 26 M226 70 L238 96 L232 130 M214 206 L196 222 L166 238 M94 238 L64 222 L46 206 M28 130 L22 96 L34 70" stroke="{K}" stroke-width="18" stroke-linecap="round" fill="none"/></g></svg>'''
body = f"""
        <div class="fig s09-tax">{taxista('s09t')}</div>
        <div class="mono s09-ahora">AHORA, CON EL...</div>
        <div class="obj s09-usd">{usd}</div>
        <div class="obj s09-pel">{pel}</div>
        <div class="globo s09-glo">¿Vio el clásico?</div>
"""
js = """
      const CON = 0.66, DOLAR = 1.23, ESTA = 1.77, USTED = 2.81, CLASICO = 3.32;
      const tax = q(".s09-tax");
      tl.fromTo(tax, { x: -160, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      habla(".s09t-boca", 0.05, 4.1, "250 388");
      traqueteo(tax, 0.3, 3.9);
      tl.to(q(".s09t-cabeza"), { rotation: -5, svgOrigin: "250 420", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.3);
      pop(q(".s09-ahora"), CON - 0.1, 0.25);
      tl.to(q(".s09-ahora"), { opacity: 0, duration: 0.15 }, DOLAR - 0.1);
      // el dólar
      golpe(q(".s09-usd"), DOLAR + 0.05, -4, 2.4);
      sacudon(DOLAR + 0.08, 1.2);
      [".s09-flecha", ".s09-flecha2"].forEach((s) => { const el = q(s), L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, ESTA - 0.2); tl.to(el, { strokeDashoffset: 0, duration: 0.45, ease: "power2.in" }, ESTA - 0.2); });
      gsap.set(q(".s09-punta"), { opacity: 0 });
      tl.set(q(".s09-punta"), { opacity: 1 }, ESTA + 0.25);
      tl.to(q(".s09-usd"), { y: -6, duration: 0.08, yoyo: true, repeat: 7 }, ESTA + 0.25);
      // cambia de tema: el clásico
      tl.to(q(".s09-usd"), { x: 600, rotation: 25, opacity: 0, duration: 0.3, ease: "power2.in" }, USTED - 0.1);
      tl.to(q(".s09t-mate"), { y: -120, rotation: -15, svgOrigin: "140 520", duration: 0.25, ease: "back.out(2)" }, CLASICO);
      pop(q(".s09-glo"), USTED + 0.1, 0.3);
      gsap.set(q(".s09-pel"), { opacity: 0 });
      tl.set(q(".s09-pel"), { opacity: 1 }, USTED);
      tl.fromTo(q(".s09-pel"), { x: 500, y: -300 }, { x: 0, y: 0, duration: 0.5, ease: "bounce.out", immediateRender: false }, USTED);
      tl.fromTo(q(".s09-bola"), { rotation: 0, svgOrigin: "130 130" }, { rotation: -540, svgOrigin: "130 130", duration: 1.4, ease: "power2.out", immediateRender: false }, USTED);
      sacudon(CLASICO + 0.05, 0.8);
"""
sfx = [{"t": 0.66, "sfx": "click-soft", "vol": 0.2}, {"t": 1.2, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}, {"t": 1.6, "sfx": "riser", "vol": 0.2, "max": 0.6},
       {"t": 2.75, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 3.0, "sfx": "pop", "vol": 0.3}, {"t": 3.32, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
escena("s09-dolar", p, 4.25, css, body, js, sfx)
