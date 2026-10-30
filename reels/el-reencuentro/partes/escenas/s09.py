from base import escena
from personajes import *
css = '''
    SC .s09-cuadro { position: absolute; left: 690px; top: 600px; width: 300px; height: 260px; background: #fbefe9; border: 10px solid #c99a3c; border-radius: 6px; box-shadow: inset 0 0 0 4px #4b2537; }
    SC .s09-cal { position: absolute; left: 90px; top: 600px; width: 230px; height: 220px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 14px; overflow: hidden; }
    SC .s09-cal .cab { position: absolute; left: 0; right: 0; top: 0; height: 64px; background: #c4607a; border-bottom: 5px solid #4b2537; }
    SC .s09-cal .mes { left: 0; right: 0; top: 10px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; letter-spacing: 0.12em; color: #fbefe9; }
    SC .s09-cal .dia { left: 0; right: 0; top: 76px; font-size: 110px; line-height: 1; }
    SC .s09-globo { position: absolute; left: 370px; top: 590px; width: 640px; height: 220px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 40px; }
    SC .s09-globo .g { left: 34px; right: 34px; top: 30px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 44px; line-height: 1.2; white-space: normal; text-align: left; }
    SC .s09-globo .v { color: #6f9a6a; font-weight: 800; }
    SC .s09-globo .cola { position: absolute; left: 380px; bottom: -40px; width: 60px; height: 60px; background: #fbefe9; border-right: 5px solid #4b2537; border-bottom: 5px solid #4b2537; transform: rotate(45deg); }
    SC .s09-ring { left: 560px; top: 690px; font-size: 44px; font-family: "Lexend", sans-serif; font-weight: 900; color: #c99a3c; -webkit-text-stroke: 5px #4b2537; paint-order: stroke fill; }
'''
cuerpo = f'''
          <g class="s09-a">
            <g class="s09-gra"><g transform="translate(400 920) scale(1.0)">{graciela("s09")}</g></g>
          </g>
          <g class="s09-b">
            <path d="M60 1250 H1020" stroke="#4b2537" stroke-width="6" stroke-linecap="round" />
            <g class="s09-t1">{tienda("s09-ald", 110, 1250, "ALDO", False)}</g>
            <g class="s09-t2">{tienda("s09-otra", 650, 1250, "LA OTRA CUADRA", True)}</g>
            <path class="s09-flecha" d="M280 850 Q520 700 760 850" fill="none" stroke="#c4607a" stroke-width="10" stroke-linecap="round" />
            <path class="s09-punta" d="M716 810 L762 852 L706 866" fill="none" stroke="#c4607a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
            <g class="s09-telg"><g transform="translate(800 800) scale(0.8)">{telefono("s09")}</g></g>
            <g class="s09-ok"><circle cx="960" cy="640" r="40" fill="#6f9a6a" stroke="#4b2537" stroke-width="5" /><path d="M940 642 L955 657 L982 626" fill="none" stroke="#fbefe9" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></g>
          </g>
'''
html = f'''
        <div class="s09-cuadro">
          <svg viewBox="0 0 280 240" style="position:absolute;left:0;top:0;width:280px;height:240px;overflow:visible" aria-hidden="true">
            <g transform="translate(140 190) scale(0.75)">{sillon_verde("s09c")}</g>
            <g transform="translate(140 120) scale(0.4)">{graciela("s09c")}</g>
          </svg>
        </div>
        <div class="sello s09-sello" style="left: 700px; top: 800px; font-size: 44px;">Comprado</div>
        <div class="s09-cal"><div class="cab"><div class="mes">MARZO</div></div><div class="cartel dia">4</div></div>
        <div class="lex s09-ring">RIIING</div>
        <div class="s09-globo"><div class="cola"></div><div class="g">"Hola, Graciela. ¿Seguís buscando el sillón <span class="v">verde</span>?"</div></div>
'''
js = '''
      const AY = 0.0, SILLON = 1.49, COMPRE = 2.1, AL = 2.63, DIA = 3.68, CUADRA = 4.69, LLAMARON = 5.88, ELLOS = 6.31, ACORDABAN = 7.46, VERDE = 8.24;
      // A: Graciela, con lástima
      tl.fromTo(q(".escenario"), { scale: 1.08, transformOrigin: "400px 900px" }, { scale: 1, duration: 2.4, ease: "power1.out" }, 0);
      tl.fromTo(q(".s09-gra"), { rotation: 0, svgOrigin: "400 1300" }, { rotation: -5, svgOrigin: "400 1300", duration: 0.6, ease: "sine.inOut" }, 0.1);
      const cuadro = q(".s09-cuadro");
      gsap.set(cuadro, { opacity: 0 });
      tl.fromTo(cuadro, { opacity: 0, scale: 0.5, rotation: 10 }, { opacity: 1, scale: 1, rotation: 3, duration: 0.35, ease: "back.out(2)", immediateRender: false }, SILLON - 0.15);
      sello(q(".s09-sello"), COMPRE + 0.05, -10);
      temblor(cuadro, COMPRE + 0.05, 0.6);
      // cambio de plano
      const CAMBIO = AL - 0.1;
      tl.to([q(".s09-a"), cuadro, q(".s09-sello")], { opacity: 0, duration: 0.18 }, CAMBIO);
      gsap.set(q(".s09-b"), { opacity: 0 });
      tl.to(q(".s09-b"), { opacity: 1, duration: 0.01 }, CAMBIO + 0.15);
      tl.set(q(".escenario"), { scale: 1 }, CAMBIO + 0.15);
      // B: "al otro día": el almanaque marca el 4 de marzo (ella vino el 3)
      const cal = q(".s09-cal");
      gsap.set(cal, { opacity: 0 });
      tl.fromTo(cal, { opacity: 0, scale: 0.6, rotation: -14 }, { opacity: 1, scale: 1, rotation: -5, duration: 0.35, ease: "back.out(2)", immediateRender: false }, CAMBIO + 0.15);
      tl.fromTo(q(".s09-cal .dia"), { scale: 1 }, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1 }, DIA - 0.1);
      // las dos tiendas
      tl.fromTo(q(".s09-t1"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, CAMBIO + 0.25);
      tl.fromTo(q(".s09-t2"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, CUADRA - 0.3);
      dibujar([q(".s09-flecha")], CUADRA, 0.4);
      dibujar([q(".s09-punta")], CUADRA + 0.35, 0.15);
      // "me llamaron ellos": suena el teléfono de la otra
      const tel = q(".s09-telg");
      gsap.set(tel, { opacity: 0 });
      tl.fromTo(tel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, LLAMARON - 0.6);
      tl.to(q(".s09-tubo"), { y: -16, rotation: 6, svgOrigin: "0 -80", duration: 0.06, yoyo: true, repeat: 13, ease: "none" }, LLAMARON - 0.3);
      const ring = q(".s09-ring");
      gsap.set(ring, { opacity: 0 });
      tl.fromTo(ring, { opacity: 0, scale: 0.5, rotation: -8 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.2, ease: "back.out(3)", immediateRender: false }, LLAMARON - 0.2);
      tl.to(ring, { x: 10, duration: 0.05, yoyo: true, repeat: 11 }, LLAMARON);
      tl.to(ring, { opacity: 0, duration: 0.15 }, ACORDABAN - 0.9);
      tl.to(cal, { opacity: 0, y: -30, duration: 0.2 }, ACORDABAN - 0.9);
      // "se acordaban": el globo con lo que le dijeron
      const glo = q(".s09-globo");
      gsap.set(glo, { opacity: 0 });
      tl.fromTo(glo, { opacity: 0, scale: 0.6, transformOrigin: "60% 100%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, ACORDABAN - 0.75);
      tl.fromTo(q(".s09-globo .v"), { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1 }, VERDE);
      tl.to(tel, { opacity: 0, duration: 0.2 }, ACORDABAN - 0.85);
      popSvg(q(".s09-ok"), VERDE + 0.1, "960 640");
'''
sfx = [{"t": 1.4, "sfx": "pop", "vol": 0.28}, {"t": 2.08, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}, {"t": 2.6, "sfx": "whoosh-short", "vol": 0.22}, {"t": 4.65, "sfx": "whoosh", "vol": 0.22}, {"t": 5.6, "sfx": "notification", "vol": 0.3}, {"t": 7.25, "sfx": "pop", "vol": 0.28}, {"t": 8.3, "sfx": "chime", "vol": 0.3}]
escena("s09-otra-cuadra", css, cuerpo, js, sfx, html)
