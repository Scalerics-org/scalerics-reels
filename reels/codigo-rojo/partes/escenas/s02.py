ID = "s02-tres-dias"; DUR = 2.30
TICK = '<svg class="s02-tk" viewBox="0 0 44 24" width="44" height="24"><path d="M2 13 L9 20 L22 5 M18 17 L21 20 L36 4" fill="none" stroke="#9fe3ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CSS = """
    $ .s02-tel { position: absolute; left: 270px; top: 470px; width: 540px; height: 900px; border-radius: 60px; background: #0b2e35; border: 9px solid #eef6f5; overflow: hidden; }
    $ .s02-head { position: absolute; left: 0; top: 0; width: 100%; height: 150px; background: #4fc3b0; }
    $ .s02-head b { position: absolute; left: 130px; top: 36px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; color: #03171b; white-space: nowrap; }
    $ .s02-head span { position: absolute; left: 130px; top: 88px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #03171b; white-space: nowrap; }
    $ .s02-av { position: absolute; left: 30px; top: 36px; width: 80px; height: 80px; border-radius: 50%; background: #0b2e35; border: 5px solid #eef6f5; }
    $ .s02-msg { position: absolute; right: 26px; max-width: 440px; padding: 16px 22px 12px; border-radius: 26px 26px 6px 26px; background: #eef6f5; color: #03171b; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; white-space: nowrap; }
    $ .s02-msg i { display: flex; align-items: center; justify-content: flex-end; gap: 8px; font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #0b2e35; margin-top: 6px; }
    $ svg.s02-tk { position: static; width: 44px; height: 24px; }
    $ .s02-sello { left: 0; right: 0; margin: 0 auto; width: 520px; top: 1000px; text-align: center; font-size: 120px; padding: 18px 10px 10px; color: #ff3341; border: 12px solid #ff3341; border-radius: 22px; background: rgba(3, 23, 27, 0.85); }
    $ .s02-sin { left: 0; right: 0; margin: 0 auto; width: 560px; text-align: center; top: 1240px; background: #ff3341; color: #eef6f5; font-size: 48px; box-shadow: 8px 8px 0 #03171b; }
"""
HTML = f"""
        <div class="s02-tel" data-layout-allow-overlap>
          <div class="s02-head"><div class="s02-av"></div><b>Tu local</b><span>visto hace 3 días</span></div>
          <div class="s02-msg s02-m1" style="top: 200px">¿Tenés talle M?<i>lun 10:02 {TICK}</i></div>
          <div class="s02-msg s02-m2" style="top: 360px">¿A qué hora abren?<i>mar 18:40 {TICK}</i></div>
          <div class="s02-msg s02-m3" style="top: 520px">¿Hola?<i>mié 23:15 {TICK}</i></div>
        </div>
        <div class="cartela s02-sello" data-layout-allow-overlap>3 DÍAS</div>
        <div class="cartela s02-sin">SIN RESPUESTA</div>
"""
JS = """
      const TRES = 0.24, DIAS = 0.53, CONTESTAR = 0.82, WA = 1.41;
      tl.fromTo(q(".s02-tel"), { y: 80, scale: 0.92, opacity: 0.5 }, { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      [".s02-m1", ".s02-m2", ".s02-m3"].forEach((s, i) => pop(s, 0.05 + i * 0.15, { transformOrigin: "100% 100%" }));
      gsap.set(q(".s02-sello"), { opacity: 0 });
      tl.fromTo(q(".s02-sello"), { opacity: 0, scale: 2.6, rotation: -24 }, { opacity: 1, scale: 1, rotation: -10, duration: 0.16, ease: "power4.in", immediateRender: false }, TRES);
      sacudon(TRES + 0.16, 1.2);
      golpe(".s02-sin", CONTESTAR, 1.8);
      tl.to(q(".s02-tel"), { rotation: 3, duration: 0.05, yoyo: true, repeat: 5, transformOrigin: "50% 50%" }, WA);
      tl.fromTo(q(".s02-sello"), { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, WA);
"""
SFX = [{"t": 0.05, "sfx": "notification", "vol": 0.25}, {"t": 0.2, "sfx": "pop", "vol": 0.2}, {"t": 0.36, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 0.82, "sfx": "glitch-2", "vol": 0.25, "max": 0.4}, {"t": 1.41, "sfx": "click", "vol": 0.25}]
