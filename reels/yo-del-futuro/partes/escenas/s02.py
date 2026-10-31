from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-hoy { left: 60px; top: 790px; }
    [data-composition-id="%ID%"] .s02-fut { left: 600px; top: 780px; }
    [data-composition-id="%ID%"] .s02-glo { left: 70px; top: 560px; font-size: 50px; }
    [data-composition-id="%ID%"] .s02-auto { left: 760px; top: 1180px; width: 700px; height: 380px; }
    [data-composition-id="%ID%"] .s02-glo2 { left: 600px; top: 700px; font-size: 44px; background: #ff8a3d; }
"""
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{humo('s02-humo', 800, 1350, 60)}</svg>
        <div class="obj s02-auto">{fiat('s02a')}</div>
        <div class="fig s02-fut">{futuro('s02f')}</div>
        <div class="fig s02-hoy">{hoy('s02h')}</div>
        <div class="globo s02-glo">¡¿Qué hacés en mi local?!</div>
        <div class="globo s02-glo2">¿Y ese auto?</div>
"""
js = """
      const LOCAL = 0.45, Y = 1.04, AUTO = 1.18;
      const hoy = q(".s02-hoy");
      gsap.set(hoy, { scale: 1.1, transformOrigin: "50% 100%" });
      gsap.set(q(".s02-fut"), { scale: 0.85, transformOrigin: "50% 100%" });
      // el salto del susto
      tl.fromTo(hoy, { y: 0 }, { y: -90, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, 0);
      tl.set([q(".s02h-susto"), q(".s02h-boca-o")], { opacity: 1 }, 0.02);
      tl.set(q(".s02h-boca"), { opacity: 0 }, 0.02);
      tl.fromTo(q(".s02h-susto"), { scale: 0.7, svgOrigin: "200 120" }, { scale: 1.15, svgOrigin: "200 120", duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, 0.05);
      tl.to(q(".s02h-bi"), { rotation: 150, svgOrigin: "150 292", duration: 0.18, ease: "back.out(2)" }, 0.02);
      tl.to(q(".s02h-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.18, ease: "back.out(2)" }, 0.02);
      tl.fromTo(q(".s02h-boca-o"), { scaleY: 1, svgOrigin: "200 240" }, { scaleY: 0.6, svgOrigin: "200 240", duration: 0.1, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, 0.1);
      pop(q(".s02-glo"), LOCAL - 0.3, 0.25, { rotation: -3 });
      sacudon(LOCAL, 1);
      // el futuro, entre humo, ni se inmuta
      gsap.set(qa(".s02-humo"), { opacity: 0.5 });
      tl.to(qa(".s02-humo"), { y: -60, scale: 1.3, svgOrigin: "800 1350", opacity: 0.2, duration: 2, ease: "sine.out" }, 0);
      vaiven(q(".s02-fut"), 0, 2, { rotation: 2 }, 0.5);
      // ¿y ese auto?: la trompa naranja asoma humeando
      entra(q(".s02-auto"), Y, { x: 500 }, 0.3);
      tl.set(q(".s02a-humo"), { opacity: 1 }, Y);
      tl.to(q(".s02a-farol"), { opacity: 0.2, duration: 0.08, yoyo: true, repeat: 7, ease: "steps(1)" }, AUTO);
      pop(q(".s02-glo2"), AUTO, 0.25, { rotation: 4 });
      tl.to(q(".s02-glo"), { opacity: 0.5, duration: 0.2 }, AUTO);
"""
sfx = [{"t": 0.0, "sfx": "glitch-1", "vol": 0.3, "max": 0.4}, {"t": 0.2, "sfx": "pop", "vol": 0.3}, {"t": 1.0, "sfx": "whoosh", "vol": 0.25, "max": 0.4}, {"t": 1.2, "sfx": "pop", "vol": 0.3}]
escena("s02-mi-local", p, 2.05, css, body, js, sfx)
