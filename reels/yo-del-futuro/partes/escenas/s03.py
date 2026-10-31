from base import *
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-auto { left: 230px; top: 960px; width: 700px; height: 380px; }
    [data-composition-id="%ID%"] .s03-fuego { left: -360px; top: 1192px; width: 640px; height: 150px; }
    [data-composition-id="%ID%"] .s03-fiat { top: 560px; font-size: 180px; }
    [data-composition-id="%ID%"] .s03-del { top: 560px; font-size: 150px; }
    [data-composition-id="%ID%"] .s03-x { left: 160px; top: 520px; width: 760px; height: 260px; }
    [data-composition-id="%ID%"] .s03-lunes { left: 50%; top: 770px; margin-left: -390px; width: 780px; text-align: center; font-size: 72px; color: #ff2a9d; }
"""
equis = f'<svg viewBox="0 0 760 260"><path d="M40 30 L720 230 M720 30 L40 230" stroke="{K}" stroke-width="56" stroke-linecap="round"/><path d="M40 30 L720 230 M720 30 L40 230" stroke="{M}" stroke-width="34" stroke-linecap="round"/></svg>'
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{chispas('s03-ch', 580, 1150, 380, 10)}</svg>
        <div class="obj s03-fuego">{fuego('s03-fg', 640)}</div>
        <div class="obj s03-auto">{fiat('s03a')}</div>
        <div class="big cr s03-fiat"><span>Fiat 147</span></div>
        <div class="big cy s03-del"><span>DeLorean</span></div>
        <div class="obj s03-x">{equis}</div>
        <div class="sello s03-lunes">Pasá el lunes</div>
"""
js = """
      const N147 = 0.43, DEL = 2.0, DIJO = 2.52, PASA = 2.69;
      // cuadro 0: el auto recién aterrizado, fuego y chispas
      chispazo(qa(".s03-ch"), 0, 0.7);
      tl.fromTo(q(".s03-auto"), { x: -60, rotation: -2 }, { x: 0, rotation: 0, duration: 0.4, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s03-fuego"), { scaleX: 0.6, transformOrigin: "100% 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, 0);
      tl.fromTo(q(".s03-fuego"), { opacity: 1 }, { opacity: 0.6, duration: 0.09, yoyo: true, repeat: 30, ease: "steps(1)", immediateRender: false }, 0.3);
      tl.set(q(".s03a-humo"), { opacity: 1 }, 0);
      tl.fromTo(q(".s03a-humo"), { x: 0 }, { x: -30, y: -20, duration: 0.4, yoyo: true, repeat: 8, ease: "sine.inOut" }, 0);
      vaiven(q(".s03-auto"), 0.4, 3.4, { y: -6 }, 0.12);
      // FIAT 147
      golpe(q(".s03-fiat"), N147, -3, 2.6);
      sacudon(N147 + 0.05, 1.3);
      tl.to(q(".s03-fiat"), { opacity: 0, y: -60, duration: 0.2, ease: "power2.in" }, DEL - 0.3);
      // DeLorean: tachado
      golpe(q(".s03-del"), DEL, 2, 2.2);
      gsap.set(q(".s03-x"), { opacity: 0 });
      tl.fromTo(q(".s03-x"), { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, DIJO - 0.1);
      sacudon(DIJO + 0.05, 1);
      tl.to([q(".s03-del"), q(".s03-x")], { opacity: 0.45, duration: 0.2 }, PASA);
      // pasá el lunes
      golpe(q(".s03-lunes"), PASA + 0.05, -6, 2.4);
      sacudon(PASA + 0.1, 1.4);
      tl.to(q(".s03-lunes"), { rotation: -4, scale: 1.05, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, PASA + 0.3);
"""
sfx = [{"t": 0.0, "sfx": "glitch-2", "vol": 0.35, "max": 0.6}, {"t": 0.38, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7},
       {"t": 1.95, "sfx": "whoosh", "vol": 0.22, "max": 0.4}, {"t": 2.45, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}, {"t": 2.7, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}]
escena("s03-fiat", p, 3.83, css, body, js, sfx)
