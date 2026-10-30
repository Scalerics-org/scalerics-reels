from base import escena
from personajes import *
css = '''
    SC .s12-tel { position: absolute; left: 200px; top: 600px; width: 500px; height: 720px; background: #fbefe9; border: 6px solid #4b2537; border-radius: 56px; overflow: hidden; }
    SC .s12-tel .barra { position: absolute; left: 190px; top: 18px; width: 110px; height: 12px; border-radius: 6px; background: #4b2537; }
    SC .s12-tel .cab { position: absolute; left: 0; right: 0; top: 46px; height: 84px; background: #6f9a6a; border-top: 5px solid #4b2537; border-bottom: 5px solid #4b2537; }
    SC .s12-tel .cabt { left: 0; right: 0; top: 18px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; letter-spacing: 0.2em; color: #fbefe9; }
    SC .s12-av { position: absolute; left: 36px; top: 160px; width: 110px; height: 110px; }
    SC .s12-nom { left: 164px; top: 168px; font-size: 64px; text-align: left; }
    SC .s12-sub { left: 168px; top: 238px; font-size: 26px; letter-spacing: 0.16em; text-align: left; color: #8c4a5e; }
    SC .s12-fila { position: absolute; left: 30px; right: 30px; height: 92px; border-radius: 18px; background: #f3d9d6; border: 4px solid #4b2537; }
    SC .s12-fila .k { left: 22px; top: 8px; font-size: 24px; letter-spacing: 0.18em; text-align: left; color: #8c4a5e; }
    SC .s12-fila .v { position: absolute; left: 22px; top: 38px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; text-align: left; }
    SC .s12-fila .v .ve { color: #6f9a6a; }
    SC .s12-aviso { position: absolute; left: 150px; top: 580px; width: 780px; height: 130px; background: #6f9a6a; border: 6px solid #4b2537; border-radius: 30px; }
    SC .s12-aviso .h { left: 120px; top: 18px; font-size: 26px; letter-spacing: 0.18em; text-align: left; color: #fbefe9; }
    SC .s12-aviso .m { position: absolute; left: 120px; top: 52px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 48px; text-align: left; color: #fbefe9; }
    SC .s12-tv { position: absolute; left: 760px; top: 1060px; width: 250px; height: 190px; }
    SC .s12-tv .pant { position: absolute; left: 12px; top: 12px; width: 226px; height: 150px; background: #e3a6ae; border: 5px solid #4b2537; border-radius: 22px; overflow: hidden; }
    SC .s12-tv .pt { left: 0; right: 0; top: 52px; font-size: 34px; }
'''
cuerpo = ""
html = f'''
        <div class="s12-tel">
          <div class="barra"></div>
          <div class="cab"><div class="mono cabt">CLIENTES</div></div>
          <svg class="s12-av" viewBox="-110 -130 220 230" aria-hidden="true"><g transform="scale(0.9)">{graciela("s12")}</g></svg>
          <div class="cartel s12-nom">Graciela</div>
          <div class="mono s12-sub">DESDE MARZO</div>
          <div class="s12-fila f1" style="top: 300px"><div class="mono k">PIDIÓ PRESUPUESTO</div><div class="v">Un sillón <span class="ve">verde</span></div></div>
          <div class="s12-fila f2" style="top: 408px"><div class="mono k">LE PROMETISTE</div><div class="v">Llamarla el lunes</div></div>
          <div class="s12-fila f3" style="top: 516px"><div class="mono k">PRÓXIMO PASO</div><div class="v">Lunes · 9:00</div></div>
        </div>
        <div class="s12-tv">
          <div class="pant"><div class="cartel pt" data-layout-ignore>Volver a Verte</div></div>
          <svg viewBox="0 0 250 190" style="position:absolute;left:0;top:0;width:250px;height:190px;overflow:visible" aria-hidden="true">
            <rect x="12" y="12" width="226" height="150" rx="22" fill="none" stroke="#4b2537" stroke-width="5" />
            <path d="M90 166 L70 190 M160 166 L180 190" stroke="#4b2537" stroke-width="6" stroke-linecap="round" />
            <path class="s12-tacha" d="M10 170 L240 10" stroke="#c4607a" stroke-width="12" stroke-linecap="round" />
          </svg>
        </div>
        <div class="s12-aviso">
          <svg viewBox="0 0 100 100" style="position:absolute;left:18px;top:14px;width:96px;height:96px" aria-hidden="true">
            <g class="s12-campana"><path d="M50 14 Q24 16 24 48 V64 L14 76 H86 L76 64 V48 Q76 16 50 14 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" /><circle cx="50" cy="84" r="8" fill="#4b2537" /></g>
          </svg>
          <div class="mono h">LUNES 9:00 · AVISO</div>
          <div class="m">Llamá a Graciela</div>
        </div>
'''
js = '''
      const SCALERICS = 0.09, CRM = 1.47, FICHA = 2.5, CLIENTE = 3.02, PIDIO = 3.88, PROMETISTE = 4.74, LUNES = 5.86, AVISA = 6.21, LLAMA = 6.86, GRACIELA = 7.15, SIN = 8.08, TELE = 8.71;
      // entra Scalerics: el celular sube con el CRM
      const tel = q(".s12-tel");
      tl.fromTo(tel, { y: 120, rotation: -4, scale: 0.9 }, { y: 0, rotation: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s12-tel .cab"), { scaleX: 0.2, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.4, ease: "power3.out" }, CRM - 0.2);
      tl.fromTo(q(".s12-tel .cabt"), { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, CRM);
      // "la ficha"
      [".s12-av", ".s12-nom", ".s12-sub"].forEach((s, i) => pop(q(s), FICHA - 0.1 + i * 0.12));
      // "qué te pidió", "qué le prometiste"
      [[".f1", PIDIO - 0.3], [".f2", PROMETISTE - 0.3], [".f3", LUNES - 0.2]].forEach(([s, t]) => {
        const f = q(s);
        gsap.set(f, { opacity: 0 });
        tl.fromTo(f, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, t);
      });
      // la cámara se corre para el aviso
      tl.to(tel, { x: 60, duration: 0.4, ease: "power2.inOut" }, LUNES);
      // "avisa": cae el aviso
      const av = q(".s12-aviso");
      gsap.set(av, { opacity: 0 });
      tl.fromTo(av, { opacity: 0, y: -120, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, AVISA);
      tl.to(q(".s12-campana"), { rotation: 18, svgOrigin: "50 14", duration: 0.07, yoyo: true, repeat: 9, ease: "sine.inOut" }, LLAMA - 0.1);
      tl.fromTo(av, { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, GRACIELA);
      // "sin programa de tele": la tele se apaga
      const tv = q(".s12-tv");
      gsap.set(tv, { opacity: 0 });
      tl.fromTo(tv, { opacity: 0, scale: 0.5, rotation: 10 }, { opacity: 1, scale: 1, rotation: 4, duration: 0.3, ease: "back.out(2)", immediateRender: false }, SIN - 0.15);
      dibujar([q(".s12-tacha")], TELE - 0.1, 0.25);
      tl.to(q(".s12-tv .pant"), { scaleY: 0.04, duration: 0.15, ease: "power4.in" }, TELE + 0.1);
'''
sfx = [{"t": 0.0, "sfx": "sparkle", "vol": 0.3}, {"t": 1.3, "sfx": "click", "vol": 0.28}, {"t": 2.4, "sfx": "pop", "vol": 0.25}, {"t": 3.6, "sfx": "click-soft", "vol": 0.25}, {"t": 4.45, "sfx": "click-soft", "vol": 0.25}, {"t": 6.2, "sfx": "notification", "vol": 0.38}, {"t": 8.7, "sfx": "glitch-1", "vol": 0.2, "max": 0.3}]
escena("s12-crm", css, cuerpo, js, sfx, html)
