from base import escena
from personajes import *
css = '''
    SC .s05-ficha { position: absolute; left: 210px; top: 600px; width: 660px; height: 290px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 18px; }
    SC .s05-ficha .cab { position: absolute; left: 0; right: 0; top: 0; height: 70px; background: #e3a6ae; border-bottom: 5px solid #4b2537; border-radius: 13px 13px 0 0; }
    SC .s05-ficha .cabt { left: 0; right: 0; top: 18px; font-size: 30px; letter-spacing: 0.3em; }
    SC .s05-ficha .lbl { left: 36px; top: 112px; font-size: 30px; letter-spacing: 0.14em; text-align: left; }
    SC .s05-ficha .raya { position: absolute; left: 36px; right: 36px; top: 236px; height: 5px; background: #4b2537; border-radius: 3px; }
    SC .s05-ficha .preg { position: absolute; left: 260px; top: 84px; font-size: 150px; line-height: 1; color: #c4607a; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; }
    SC .s05-ficha .nom { left: 36px; right: 36px; top: 150px; font-size: 64px; line-height: 1; text-align: left; }
    SC .s05-ficha .nom .k { display: inline-block; opacity: 0; }
'''
cuerpo = f'''
          <g class="s05-ald"><g transform="translate(540 1080) scale(0.72)">{aldo("s05")}</g></g>
          <path class="s05-chorro a" d="M505 1085 Q500 1140 510 1200" fill="none" stroke="#a48cc8" stroke-width="12" stroke-linecap="round" />
          <path class="s05-chorro b" d="M575 1085 Q580 1140 570 1200" fill="none" stroke="#a48cc8" stroke-width="12" stroke-linecap="round" />
          <g class="s05-ic"><g transform="translate(780 820) scale(0.42)">{sillon_verde("s05")}</g></g>
'''
html = '''
        <div class="s05-ficha">
          <div class="cab"><div class="mono cabt">CLIENTA</div></div>
          <div class="mono lbl">NOMBRE:</div>
          <div class="preg">?</div>
          <div class="raya"></div>
          <div class="mano nom"></div>
        </div>
'''
js = '''
      const LLAMA = 0.82, ES = 1.34, SENORA = 1.86, SILLON = 2.46, VERDE = 2.72;
      tl.fromTo(q(".escenario"), { scale: 1.04, transformOrigin: "540px 900px" }, { scale: 1, duration: DUR, ease: "none" }, 0);
      tl.fromTo(q(".s05-ficha"), { y: -40, rotation: -3 }, { y: 0, rotation: -1, duration: 0.4, ease: "back.out(1.8)" }, 0);
      tl.fromTo(q(".s05-ald"), { y: 60 }, { y: 0, duration: 0.4, ease: "power3.out" }, 0);
      // "llama": el signo de pregunta tiembla
      const preg = q(".s05-ficha .preg");
      tl.fromTo(preg, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2.5)" }, 0.1);
      tl.to(preg, { rotation: 10, duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut" }, LLAMA);
      tl.to(preg, { opacity: 0, scale: 0.6, duration: 0.15 }, ES);
      // "es la señora del sillón verde": se escribe a mano en la raya
      const nom = q(".s05-ficha .nom");
      const ws = [["la", SENORA - 0.3], ["señora", SENORA], ["del", SILLON - 0.1], ["sillón", SILLON], ["verde", VERDE]];
      nom.innerHTML = ws.map(([w]) => '<span class="k">' + w + "</span>").join(" ");
      [...nom.querySelectorAll(".k")].forEach((k, i) => tl.fromTo(k, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.18, ease: "power2.out", immediateRender: false }, ws[i][1]));
      popSvg(q(".s05-ic"), VERDE, "780 820");
      tl.to(q(".s05-ic"), { rotation: 8, svgOrigin: "780 820", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, VERDE + 0.35);
      // llora a chorros
      dibujar([q(".s05-chorro.a"), q(".s05-chorro.b")], ES, 0.4);
      tl.to(q(".s05-ald"), { y: 8, duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut" }, ES + 0.2);
      tl.to(q(".s05-cejas"), { y: -8, duration: 0.2 }, ES);
'''
sfx = [{"t": 0.1, "sfx": "pop", "vol": 0.28}, {"t": 0.85, "sfx": "glitch-1", "vol": 0.18, "max": 0.3}, {"t": 1.75, "sfx": "typing", "vol": 0.25, "max": 1.0}, {"t": 2.72, "sfx": "sparkle", "vol": 0.28}]
escena("s05-senora", css, cuerpo, js, sfx, html)
