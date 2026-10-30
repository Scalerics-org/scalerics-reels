ID = "s05-lunes"; DUR = 4.09
CSS = """
    $ .s05-globo { position: absolute; left: 90px; top: 470px; padding: 22px 32px 18px; border-radius: 34px 34px 34px 8px; background: #eef6f5; color: #0b2e35; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; white-space: nowrap; }
    $ .s05-cal { position: absolute; left: 290px; top: 680px; width: 500px; height: 560px; }
    $ .s05-base { position: absolute; inset: 0; border-radius: 30px; background: #0b2e35; border: 8px solid #eef6f5; }
    $ .s05-top { position: absolute; left: 0; top: 0; width: 100%; height: 120px; border-radius: 30px 30px 0 0; background: #ff3341; border: 8px solid #eef6f5; }
    $ .s05-hoja { position: absolute; left: 24px; top: 140px; width: 452px; height: 390px; border-radius: 14px; background: #eef6f5; display: flex; align-items: center; justify-content: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 88px; color: #0b2e35; text-transform: uppercase; white-space: nowrap; }
    $ .s05-hoja.s05-h4 { color: #ff3341; }
    $ .s05-sello { left: 520px; top: 1150px; color: #ff3341; border: 10px solid #ff3341; border-radius: 16px; background: rgba(3, 23, 27, 0.85); font-size: 70px; padding: 14px 20px 8px; }
"""
HTML = """
        <div class="s05-globo">"Te contesto el lunes"</div>
        <div class="s05-cal" data-layout-allow-overlap>
          <div class="s05-base"></div><div class="s05-top"></div>
          <div class="s05-hoja s05-h4">jueves</div>
          <div class="s05-hoja s05-h3" style="font-size: 62px">miércoles</div>
          <div class="s05-hoja s05-h2">martes</div>
          <div class="s05-hoja s05-h1">lunes</div>
        </div>
        <div class="cartela s05-sello">VENCIDO</div>
"""
JS = """
      const CONTESTO = 0.74, LUNES = 1.38, QUE = 2.08, JUEVES = 2.68;
      tl.fromTo(q(".s05-cal"), { y: 140, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }, 0);
      pop(".s05-globo", 0.35, { transformOrigin: "0% 100%" });
      tl.fromTo(q(".s05-h1"), { scale: 1 }, { scale: 1.1, duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, LUNES);
      // las hojas vuelan
      [[".s05-h1", QUE - 0.1], [".s05-h2", QUE + 0.18], [".s05-h3", QUE + 0.42]].forEach(([s, t], i) => {
        tl.to(q(s), { y: -700, x: (i % 2 ? 260 : -260), rotation: (i % 2 ? 30 : -30), opacity: 0, duration: 0.35, ease: "power2.in" }, t);
      });
      tl.fromTo(q(".s05-h4"), { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, JUEVES + 0.05);
      tl.to(q(".s05-globo"), { x: -20, rotation: -3, duration: 0.08, yoyo: true, repeat: 5 }, JUEVES);
      gsap.set(q(".s05-sello"), { opacity: 0 });
      tl.fromTo(q(".s05-sello"), { opacity: 0, scale: 2.5, rotation: -25 }, { opacity: 1, scale: 1, rotation: -12, duration: 0.15, ease: "power4.in", immediateRender: false }, JUEVES + 0.35);
      sacudon(JUEVES + 0.5, 1.2);
"""
SFX = [{"t": 0.35, "sfx": "pop", "vol": 0.25}, {"t": 2.0, "sfx": "whoosh", "vol": 0.22}, {"t": 2.3, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.55, "sfx": "whoosh-short", "vol": 0.2}, {"t": 3.03, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}]
