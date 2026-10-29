exec(open("partes/escenas/tel.py").read())
ID = "s09-toque"; DUR = 4.35
CSS = TEL("s09") + """
    $ .s09-tel { left: 120px; }
    $ .s09-dots { position: absolute; left: 24px; top: 400px; padding: 18px 26px; border-radius: 24px; background: #1f4fa8; border: 3px solid #f4f6fb; display: flex; gap: 12px; }
    $ .s09-dots i { width: 16px; height: 16px; border-radius: 50%; background: #f4f6fb; }
    $ .s09-sello { position: absolute; left: 580px; top: 640px; padding: 16px 28px 12px; border: 8px solid #ffd21f; border-radius: 14px; color: #ffd21f; background: rgba(5, 13, 34, 0.85); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 70px; line-height: 1; white-space: nowrap; }
    $ .s09-precio { position: absolute; left: 700px; top: 1020px; padding: 20px 34px 16px 56px; background: #ffd21f; color: #050d22; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1; border-radius: 10px 30px 30px 10px; transform-origin: 20px 50%; }
    $ .s09-precio::before { content: ""; position: absolute; left: 18px; top: 50%; width: 20px; height: 20px; margin-top: -10px; border-radius: 50%; background: #050d22; }
    $ .s09-todo { left: 470px; top: 1300px; background: #f4f6fb; color: #0b1d4a; font-size: 44px; box-shadow: 8px 8px 0 #ffd21f; }
"""
HTML = """
        <div class="s09-tel">
          <div class="s09-barra"></div>
          <div class="s09-head">Autoservicio Enfrente<small>en línea</small></div>
          <div class="s09-burb s09-out s09-b1" style="top: 200px">¿Tenés pañales?<small>23:01</small></div>
          <div class="s09-dots"><i></i><i></i><i></i></div>
          <div class="s09-burb s09-in s09-b2" style="top: 360px">¡Sí! Talle G, a $ 690. ¿Te lo guardo?<small>23:01</small></div>
          <div class="s09-burb s09-out s09-b3" style="top: 600px">¡Sí! Paso mañana<small>23:02</small></div>
        </div>
        <div class="s09-sello">AL TOQUE</div>
        <div class="s09-precio">$ 690</div>
        <div class="cartela s09-todo">CON PRECIO Y TODO</div>
"""
JS = """
      const ESCRIBI = 0.08, CONTESTO = 1.51, TOQUE = 1.98, PRECIO = 2.75, TODO = 3.32;
      // cuadro 0: celular de enfrente ya entrando
      tl.fromTo(q(".s09-tel"), { y: 200, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      pop(".s09-b1", ESCRIBI + 0.1);
      // escribiendo... y contesta al instante
      gsap.set(q(".s09-dots"), { opacity: 0 });
      tl.to(q(".s09-dots"), { opacity: 1, duration: 0.1 }, 0.7);
      qa(".s09-dots i").forEach((d, i) => tl.fromTo(d, { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.75 + i * 0.08));
      tl.to(q(".s09-dots"), { opacity: 0, duration: 0.05 }, CONTESTO - 0.1);
      pop(".s09-b2", CONTESTO - 0.08);
      gsap.set(q(".s09-sello"), { opacity: 0 });
      tl.fromTo(q(".s09-sello"), { opacity: 0, scale: 2.6, rotation: -20 }, { opacity: 1, scale: 1, rotation: 8, duration: 0.14, ease: "power4.in", immediateRender: false }, TOQUE - 0.1);
      sacudon(TOQUE + 0.05, 1.2);
      // el precio se balancea
      gsap.set(q(".s09-precio"), { opacity: 0 });
      tl.fromTo(q(".s09-precio"), { opacity: 1, rotation: -50, x: 200 }, { opacity: 1, rotation: 0, x: 0, duration: 0.35, ease: "back.out(2)", immediateRender: false }, PRECIO - 0.15);
      tl.to(q(".s09-precio"), { rotation: 10, duration: 0.25, yoyo: true, repeat: 4, ease: "sine.inOut" }, PRECIO + 0.2);
      pop(".s09-b3", TODO - 0.2);
      pop(".s09-todo", TODO);
"""
SFX = [{"t": 0.12, "sfx": "key-press", "vol": 0.3}, {"t": 0.7, "sfx": "typing", "vol": 0.18, "max": 0.7}, {"t": 1.43, "sfx": "notification", "vol": 0.35}, {"t": 1.9, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 2.65, "sfx": "chime", "vol": 0.22}, {"t": 3.12, "sfx": "pop", "vol": 0.25}]
