from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-t1 { left: 40px; top: 860px; width: 440px; height: 460px; }
    [data-composition-id="%ID%"] .s12-t2 { left: 560px; top: 820px; width: 480px; height: 500px; }
    [data-composition-id="%ID%"] .s12-buena { left: 120px; top: 600px; font-size: 52px; font-weight: 900; }
    [data-composition-id="%ID%"] .s12-normal { left: 40px; top: 1330px; width: 440px; text-align: center; font-size: 100px; right: auto; }
    [data-composition-id="%ID%"] .s12-placa { left: 540px; top: 1340px; color: #ff9a3c; font-size: 38px; }
    [data-composition-id="%ID%"] .s12-halo { left: 520px; top: 760px; width: 560px; height: 620px; border-radius: 50%; position: absolute; background: radial-gradient(circle, rgba(255, 200, 26, 0.45) 0%, rgba(255, 200, 26, 0) 65%); }
"""
est = "".join(destello("s12-est", x, y, r) for x, y, r in [(600, 860, 26), (1010, 900, 22), (1000, 1250, 28), (580, 1240, 20), (800, 790, 24)])
body = f"""
        <div class="s12-halo"></div>
        <div class="obj s12-t1">{torta('s12a', velas=False, color=H)}</div>
        <div class="big c s12-normal">NORMAL.</div>
        <div class="obj s12-t2">{torta('s12b')}</div>
        <div class="sello s12-placa">LA DE DOÑA NÉLIDA</div>
        <div class="globo s12-buena">¿Y es buena?</div>
        <svg class="full" viewBox="0 0 1080 1920">{est}</svg>
"""
js = """
      const NORMAL = 1.18, BUENA = 2.22, NELIDA = 2.72;
      pop(q(".s12-buena"), 0.0, 0.25);
      tl.to(q(".s12-buena"), { rotation: -3, duration: 0.2, yoyo: true, repeat: 3 }, 0.3);
      tl.fromTo(q(".s12-t1"), { y: 60, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0);
      tl.to(q(".s12-buena"), { opacity: 0, duration: 0.2 }, NORMAL - 0.2);
      // "normal": cae seco, sin brillo
      gsap.set(q(".s12-normal"), { opacity: 0 });
      tl.fromTo(q(".s12-normal"), { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.18, ease: "power4.in", immediateRender: false }, NORMAL - 0.05);
      tl.to(q(".s12-t1"), { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 1 }, NORMAL + 0.1);
      // la buena
      tl.to([q(".s12-t1"), q(".s12-normal")], { opacity: 0.45, duration: 0.3 }, BUENA);
      pop(q(".s12-t2"), BUENA, 0.4);
      gsap.set(q(".s12-halo"), { opacity: 0 });
      tl.fromTo(q(".s12-halo"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, immediateRender: false }, BUENA);
      tl.to(q(".s12-halo"), { scale: 1.08, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, BUENA + 0.5);
      tl.fromTo(qa(".s12b-llama"), { scaleY: 0.8, transformOrigin: "50% 100%" }, { scaleY: 1.2, duration: 0.12, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, BUENA + 0.3);
      golpe(q(".s12-placa"), NELIDA + 0.05, -3, 2.2);
      brilla(qa(".s12-est"), NELIDA);
"""
sfx = [{"t": 0.0, "sfx": "pop", "vol": 0.25}, {"t": 1.15, "sfx": "click", "vol": 0.3}, {"t": 2.2, "sfx": "sparkle", "vol": 0.3, "max": 1.0}, {"t": 2.75, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}]
escena("s12-normal", p, 4.12, css, body, js, sfx)
