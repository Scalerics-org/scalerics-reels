from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-con { left: 40px; top: 790px; }
    [data-composition-id="%ID%"] .s09-vid { left: 520px; top: 820px; width: 460px; height: 500px; }
    [data-composition-id="%ID%"] .s09-t1 { top: 560px; font-size: 120px; }
    [data-composition-id="%ID%"] .s09-t2 { top: 680px; font-size: 120px; }
    [data-composition-id="%ID%"] .s09-t3 { top: 800px; font-size: 140px; }
    [data-composition-id="%ID%"] .s09-local { left: 240px; top: 940px; width: 600px; height: 600px; }
    [data-composition-id="%ID%"] .s09-x { left: 240px; top: 940px; width: 600px; height: 600px; }
    [data-composition-id="%ID%"] .s09-cielo { left: 0; top: 540px; width: 1080px; height: 400px; }
    [data-composition-id="%ID%"] .s09-cel { position: absolute; left: 660px; top: 640px; width: 330px; height: 600px; border-radius: 44px; border: 8px solid #16191d; background: #14c4b8; box-shadow: 0 0 0 6px #fbfaf5, 0 0 60px 16px rgba(20, 196, 184, 0.55); text-align: center; overflow: hidden; }
    [data-composition-id="%ID%"] .s09-cel b { display: block; margin-top: 150px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; line-height: 1; color: #fbfaf5; -webkit-text-stroke: 10px #16191d; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .s09-cel small { display: block; margin-top: 18px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; line-height: 1; color: #ffd21f; -webkit-text-stroke: 12px #16191d; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .s09-cel i { display: block; margin: 40px auto 0; width: 200px; height: 70px; border-radius: 36px; border: 6px solid #16191d; background: #fbfaf5; font-style: normal; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 32px; line-height: 58px; color: #16191d; }
    [data-composition-id="%ID%"] .s09-candado { left: 360px; top: 1300px; width: 130px; height: 150px; }
"""
vid = f'''<svg viewBox="0 0 460 500" aria-hidden="true">
  <rect x="20" y="20" width="420" height="460" rx="14" fill="{T}" fill-opacity="0.35" {S}/>
  <rect x="20" y="20" width="420" height="460" rx="14" fill="none" stroke="{W}" stroke-width="10"/>
  <path d="M70 430 V350 H140 V430 Z M180 430 V300 H240 V430 Z M280 430 Q330 330 380 430 Z" fill="{W}" {S}/>
  <path class="s09-cor" d="M230 250 C150 190 160 110 230 150 C300 110 310 190 230 250 Z" fill="{T}" {S}/>
</svg>'''
equis = f'<svg viewBox="0 0 600 600"><path d="M60 60 L540 540 M540 60 L60 540" stroke="{K}" stroke-width="70" stroke-linecap="round"/><path d="M60 60 L540 540 M540 60 L60 540" stroke="{N}" stroke-width="48" stroke-linecap="round"/></svg>'
estrellas = "".join(destello("s09-st", x, y, r, W) for x, y, r in [(120, 80, 18), (330, 160, 12), (520, 60, 16), (80, 280, 12), (420, 300, 14), (980, 360, 12)])
cielo = f'<svg viewBox="0 0 1080 400"><path class="s09-luna" d="M240 40 A90 90 0 1 0 290 170 A72 72 0 1 1 240 40 Z" fill="{Y}" {S}/>{estrellas}</svg>'
candado = f'<svg viewBox="0 0 130 150"><path d="M30 70 V45 Q30 10 65 10 Q100 10 100 45 V70" fill="none" stroke="{K}" stroke-width="22"/><path d="M30 70 V45 Q30 10 65 10 Q100 10 100 45 V70" fill="none" stroke="{W}" stroke-width="10"/><rect x="10" y="66" width="110" height="80" rx="12" fill="{Y}" {S}/><circle cx="65" cy="100" r="10" fill="{K}"/><path d="M65 104 V126" {S}/></svg>'
body = f"""
        <div class="obj s09-cielo">{cielo}</div>
        <div class="obj s09-vid">{vid}</div>
        <div class="fig s09-con">{conductora('s09c')}</div>
        <div class="obj s09-local">{local('s09l', 'REGALOS MÓNICA', persiana=True)}</div>
        <div class="obj s09-x">{equis}</div>
        <div class="big w s09-t1">El cambio</div>
        <div class="big y s09-t2">no es en</div>
        <div class="big n s09-t3">el local</div>
        <div class="s09-cel"><b>ABIERTO</b><small>24 H</small><i>COMPRAR</i></div>
        <div class="obj s09-candado">{candado}</div>
"""
js = """
      const DIVINA = 1.49, EL = 2.67, CAMBIO = 2.74, NO = 2.99, LOCAL = 3.58, ESQUE = 4.43, ABRA = 5.30, NOCHE = 5.66, SIN = 6.41, PUERTA = 7.08;
      // A: tu vidriera es divina
      gsap.set(q(".s09c-bd"), { rotation: -20, svgOrigin: "250 292" });
      tl.fromTo(q(".s09-con"), { x: -120 }, { x: 0, duration: 0.35, ease: "back.out(1.5)" }, 0);
      habla(".s09c-boca", 0, 7.6, "200 238");
      tl.fromTo(q(".s09-vid"), { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 0);
      tl.to(q(".s09c-bi"), { rotation: -60, svgOrigin: "150 292", duration: 0.3, ease: "back.out(2)" }, 0.5);
      tl.fromTo(q(".s09-cor"), { scale: 0, svgOrigin: "230 190" }, { scale: 1.3, svgOrigin: "230 190", duration: 0.3, ease: "back.out(3)", immediateRender: false }, DIVINA);
      tl.to(q(".s09-cor"), { scale: 1.1, svgOrigin: "230 190", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, DIVINA + 0.3);
      tl.to([q(".s09-con"), q(".s09-vid")], { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.in" }, EL - 0.2);
      // B: el cambio no es en el local
      gsap.set(q(".s09l-persiana"), { scaleY: 0.03, svgOrigin: "350 250" });
      gsap.set(q(".s09-local"), { opacity: 0 });
      tl.fromTo(q(".s09-local"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)", immediateRender: false }, EL);
      golpe(q(".s09-t1"), CAMBIO, -3, 2.6);
      golpe(q(".s09-t2"), NO + 0.05, 2, 2.6);
      golpe(q(".s09-t3"), LOCAL, -4, 2.8);
      sacudon(CAMBIO + 0.04, 1); sacudon(LOCAL + 0.05, 1.5);
      gsap.set(q(".s09-x"), { opacity: 0 });
      tl.fromTo(q(".s09-x"), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, LOCAL + 0.05);
      tl.to(q(".s09-local"), { scale: 0.85, transformOrigin: "50% 100%", duration: 0.3 }, LOCAL + 0.1);
      tl.to([q(".s09-t1"), q(".s09-t2"), q(".s09-t3"), q(".s09-x")], { opacity: 0, y: -60, duration: 0.2, stagger: 0.03, ease: "power2.in" }, ESQUE - 0.1);
      // C: que abra de noche... sin abrir la puerta
      tl.to(q(".s09-local"), { x: -200, scale: 0.85, duration: 0.4, ease: "power3.inOut" }, ESQUE);
      gsap.set(q(".s09-cielo"), { opacity: 0 });
      tl.to(q(".s09-cielo"), { opacity: 1, duration: 0.25 }, ABRA - 0.1);
      tl.fromTo(q(".s09-luna"), { scale: 0, svgOrigin: "240 110" }, { scale: 1, svgOrigin: "240 110", duration: 0.35, ease: "back.out(2)", immediateRender: false }, ABRA - 0.1);
      qa(".s09-st").forEach((s, i) => { tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, ABRA + i * 0.06); tl.to(s, { opacity: 0.3, duration: 0.3, yoyo: true, repeat: 3 }, ABRA + 0.5 + i * 0.07); });
      tl.to(q(".s09l-persiana"), { scaleY: 1, svgOrigin: "350 250", duration: 0.25, ease: "power3.in" }, ABRA);
      tl.to(q(".s09-local"), { filter: "brightness(0.6)", duration: 0.3 }, ABRA + 0.2);
      gsap.set(q(".s09-cel"), { opacity: 0 });
      tl.fromTo(q(".s09-cel"), { opacity: 1, y: 700, scale: 0.4, rotation: -20 }, { opacity: 1, y: 0, scale: 1, rotation: 6, duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, NOCHE);
      tl.to(q(".s09-cel"), { rotation: -3, y: -16, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, NOCHE + 0.5);
      pop(q(".s09-candado"), SIN, 0.3);
      tl.fromTo(q(".s09-candado"), { x: -200 }, { x: -200, duration: 0.01, immediateRender: false }, SIN);
      tl.to(q(".s09-candado"), { rotation: 12, transformOrigin: "50% 0%", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, SIN + 0.3);
      tl.fromTo(q(".s09-cel i"), { scale: 1 }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, PUERTA);
      sacudon(PUERTA, 0.8);
"""
sfx = [{"t": 1.49, "sfx": "sparkle", "vol": 0.3}, {"t": 2.72, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.6}, {"t": 3.56, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.7},
       {"t": 5.25, "sfx": "chime", "vol": 0.22}, {"t": 5.66, "sfx": "riser", "vol": 0.25, "max": 1.0}, {"t": 6.41, "sfx": "click", "vol": 0.3}, {"t": 7.08, "sfx": "ping", "vol": 0.3}]
escena("s09-giro", p, 7.77, css, body, js, sfx)
