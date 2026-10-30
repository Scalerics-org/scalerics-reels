exec(PJ)
ID = "s09-cual"; DUR = 2.65
manos = '<g class="s09-manos"><circle class="b" cx="-92" cy="-372" r="30" /><circle class="b" cx="92" cy="-372" r="30" /></g>'
CSS = """
    $ .s09-mata { left: 90px; top: 610px; font-size: 76px; transform: rotate(-6deg); }
    $ .s09-cual { left: 200px; top: 1190px; font-size: 52px; background: #ff3b30; color: #fbf7ea; transform: rotate(3deg); }
    $ .s09-ja { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; color: #ffd400; white-space: nowrap; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {fede("s09", 380, 1420, 1.1, "risa", cel=False, extra=manos)}
          {conductor("s09", 820, 1420, 0.95, "abierta")}
        </svg>
        <div class="cartela s09-mata">¡Me mataron!</div>
        <div class="s09-ja s09-ja1" style="left:700px;top:800px">JA</div>
        <div class="s09-ja s09-ja2" style="left:860px;top:720px">JA</div>
        <div class="s09-ja s09-ja3" style="left:120px;top:830px">JA</div>
        <div class="cartela s09-cual">¿Y cuál era la broma?</div>
"""
JS = """
      const MATARON = 0.09, Y = 1.21, BROMA = 1.74;
      gsap.set(q(".s09-mata"), { opacity: 1 });
      tl.fromTo(q(".s09-mata"), { scale: 1.5 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      // se ríen los dos
      tl.fromTo(q(".s09-fede"), { rotation: 0, svgOrigin: "380 1420" }, { rotation: -4, svgOrigin: "380 1420", duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s09-con"), { y: 0 }, { y: -12, duration: 0.11, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.05);
      tl.to(q(".s09-manos"), { y: -8, duration: 0.12, yoyo: true, repeat: 7 }, 0.1);
      [".s09-ja1", ".s09-ja2", ".s09-ja3"].forEach((s, i) => {
        pop(s, 0.15 + i * 0.18, { rotation: i % 2 ? 12 : -12 });
        tl.to(q(s), { y: -30, opacity: 0, duration: 0.5 }, 1.0 + i * 0.1);
      });
      // ¿y cuál era la broma?: se le va la risa, curioso
      tl.to(q(".s09-mata"), { opacity: 0, y: -30, duration: 0.15 }, Y - 0.1);
      golpe(".s09-cual", Y + 0.05, 2);
      tl.to(q(".s09-fede"), { x: 40, duration: 0.3, ease: "power2.out" }, Y);
      tl.to(q(".s09-cual"), { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1 }, BROMA);
"""
SFX = [{"t": 0.05, "sfx": "pop", "vol": 0.3}, {"t": 0.3, "sfx": "sparkle", "vol": 0.2}, {"t": 1.2, "sfx": "click", "vol": 0.28}]
