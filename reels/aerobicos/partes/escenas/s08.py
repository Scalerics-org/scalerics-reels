from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-due { left: 60px; top: 640px; }
    [data-composition-id="%ID%"] .s08-elo { top: 590px; font-size: 118px; }
    [data-composition-id="%ID%"] .s08-vos { top: 590px; font-size: 118px; }
    [data-composition-id="%ID%"] .s08-tk { position: absolute; left: 600px; top: 740px; width: 340px; height: 560px; background: #fff3e8; border: 5px solid #160a2a; box-shadow: 8px 8px 0 #1de9d6;
      font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: #160a2a; padding: 22px 24px; transform-origin: 50% 0%; }
    [data-composition-id="%ID%"] .s08-tk h5 { margin: 0 0 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; text-align: center; }
    [data-composition-id="%ID%"] .s08-ln { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 3px dashed rgba(22, 10, 42, 0.3); }
    [data-composition-id="%ID%"] .s08-tot { margin-top: 18px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: #ff2e88; text-align: center; }
    [data-composition-id="%ID%"] .s08-tel { position: absolute; left: 600px; top: 720px; width: 360px; height: 600px; background: #160a2a; border: 6px solid #fff3e8; border-radius: 46px; box-shadow: 8px 8px 0 #ff2e88; overflow: hidden; }
    [data-composition-id="%ID%"] .s08-cab { padding: 40px 24px 16px; background: #5b2a86; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fff3e8; }
    [data-composition-id="%ID%"] .s08-cab small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; color: #1de9d6; letter-spacing: 0.1em; }
    [data-composition-id="%ID%"] .s08-msg { position: absolute; right: 20px; top: 210px; width: 270px; padding: 16px 18px; background: #1de9d6; border-radius: 22px 22px 4px 22px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; color: #160a2a; }
    [data-composition-id="%ID%"] .s08-msg i { display: block; text-align: right; font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 20px; color: #5b2a86; }
"""
lineas = "".join(f'<div class="s08-ln s08-l{i}"><span>{a}</span><span>{b}</span></div>' for i, (a, b) in enumerate([("Pedidos", "..."), ("Caja", "..."), ("Turnos", "..."), ("Envíos", "..."), ("Stock", "...")]))
body = f"""
        <div class="fig s08-due">{duenio('s08d')}</div>
        <div class="s08-tk"><h5>REPORTE DEL DÍA</h5>{lineas}<div class="s08-tot">TOTAL: ¿?</div></div>
        <div class="s08-tel"><div class="s08-cab">Yo<small>VOS MISMO</small></div><div class="s08-msg">Reporte del día, hecho a mano<i>23:58</i></div></div>
        <div class="big t s08-elo">Elongación</div>
        <div class="big a s08-vos">¡A vos mismo!</div>
"""
js = """
      const ELO = 0.17, REPORTE = 1.16, SUMA = 2.38, TODO = 2.61, MANDA = 3.21, MISMO = 4.07;
      gsap.set(q(".s08-due"), { scale: 0.8, transformOrigin: "50% 98%" });
      // elongación: brazo arriba, se inclina para un lado y para el otro
      gsap.set(q(".s08d-bi"), { rotation: 150, svgOrigin: "150 286" });
      tl.fromTo(q(".s08d-cuerpo"), { rotation: -4 }, { rotation: 12, svgOrigin: "200 700", duration: 0.9, yoyo: true, repeat: 4, ease: "sine.inOut" }, 0);
      tl.to(q(".s08d-bi"), { rotation: 170, svgOrigin: "150 286", duration: 0.9, yoyo: true, repeat: 4, ease: "sine.inOut" }, 0);
      tl.to(q(".s08d-bd"), { rotation: -30, svgOrigin: "250 286", duration: 0.45, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      tl.to(q(".s08d-gotas"), { y: 16, duration: 0.3, yoyo: true, repeat: 15 }, 0);
      gsap.set(q(".s08-elo"), { opacity: 1, rotation: -4 });
      tl.fromTo(q(".s08-elo"), { scaleX: 0.3 }, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }, 0);
      tl.to(q(".s08-elo"), { scaleX: 1.12, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      fuera(q(".s08-elo"), MISMO - 0.3);
      // el ticket se desenrolla
      gsap.set(q(".s08-tk"), { opacity: 0 });
      tl.fromTo(q(".s08-tk"), { opacity: 1, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, REPORTE - 0.1);
      const lns = qa(".s08-ln");
      gsap.set(lns, { opacity: 0 });
      lns.forEach((l, i) => tl.fromTo(l, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.15, immediateRender: false }, SUMA + i * 0.1));
      gsap.set(q(".s08-tot"), { opacity: 0 });
      pop(q(".s08-tot"), TODO + 0.3);
      // "mandátelo": el ticket se enrolla y aparece el chat con vos mismo
      tl.to(q(".s08-tk"), { scaleY: 0, opacity: 0, duration: 0.25, ease: "power2.in" }, MANDA - 0.1);
      gsap.set(q(".s08-tel"), { opacity: 0 });
      tl.fromTo(q(".s08-tel"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, MANDA);
      gsap.set(q(".s08-msg"), { opacity: 0 });
      tl.fromTo(q(".s08-msg"), { opacity: 0, y: 100, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, MANDA + 0.35);
      golpe(q(".s08-vos"), MISMO, -4, 3); sacudon(MISMO, 1.4);
"""
sfx = [{"t": 0.1, "sfx": "whoosh", "vol": 0.25}, {"t": 1.1, "sfx": "typing", "vol": 0.25, "max": 0.8}, {"t": 2.4, "sfx": "click-soft", "vol": 0.3},
       {"t": 3.55, "sfx": "notification", "vol": 0.35}, {"t": 4.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5}]
escena("s08-reporte", p, 4.94, css, body, js, sfx)
