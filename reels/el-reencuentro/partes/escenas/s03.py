from base import escena
from personajes import *
css = '''
    SC .s03-rot { left: 0; right: 0; top: 584px; font-size: 28px; letter-spacing: 0.34em; color: #8c4a5e; }
    SC .s03-prom { left: 0; right: 0; top: 1150px; font-size: 92px; line-height: 1; color: #4b2537; }
    SC .s03-prom .k { display: inline-block; opacity: 0; }
    SC .s03-presu { position: absolute; left: 600px; top: 900px; width: 150px; height: 180px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 6px; }
    SC .s03-presu .rr { position: absolute; left: 18px; right: 18px; height: 4px; background: #e3a6ae; }
    SC .s03-presu .sig { left: 0; right: 0; top: 104px; font-size: 54px; color: #c99a3c; font-family: "Lexend", sans-serif; font-weight: 800; }
'''
cuerpo = f'''
          <defs><clipPath id="s03-ovalo"><ellipse cx="540" cy="930" rx="400" ry="290" /></clipPath></defs>
          <ellipse cx="540" cy="930" rx="400" ry="290" fill="#f3d9d6" />
          <g clip-path="url(#s03-ovalo)">
            <path d="M140 1110 H940" stroke="#4b2537" stroke-width="5" opacity="0.4" />
            <g class="s03-ald"><g transform="translate(760 880) scale(0.6)">{aldo("s03")}</g></g>
            <path d="M600 1040 H960 V1240 H600 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" />
            <g class="s03-verde-g" transform="translate(360 1080) scale(0.8)">{sillon_verde("s03")}</g>
            <g class="s03-sen"><g transform="translate(500 900) scale(0.62)">
              <path d="M-150 420 L-150 250 Q-140 150 -55 128 L55 128 Q140 150 150 250 L150 420 Z" fill="#a48cc8" stroke="#4b2537" stroke-width="5" />
              {"".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#a48cc8" stroke="#4b2537" stroke-width="5" />' for x,y,r in [(-60,-60,40),(-20,-96,40),(30,-96,40),(66,-60,40),(80,-14,36),(-76,-14,36),(0,-30,60)])}
              <path class="s03-brazo" d="M-120 220 Q-210 210 -260 260" fill="none" stroke="#4b2537" stroke-width="30" stroke-linecap="round" />
              <path class="s03-brazo2" d="M-120 220 Q-210 210 -260 260" fill="none" stroke="#a48cc8" stroke-width="20" stroke-linecap="round" />
            </g></g>
          </g>
          <ellipse class="s03-marco" cx="540" cy="930" rx="400" ry="290" fill="none" stroke="#c99a3c" stroke-width="12" />
          <ellipse class="s03-marco2" cx="540" cy="930" rx="420" ry="310" fill="none" stroke="#c99a3c" stroke-width="4" stroke-dasharray="2 16" stroke-linecap="round" />
          <g class="s03-campana" transform="translate(205 720)">
            <path d="M-30 20 Q-30 -30 0 -34 Q30 -30 30 20 L40 30 H-40 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
            <circle cx="0" cy="38" r="9" fill="#4b2537" />
          </g>
'''
html = '''
        <div class="mono s03-rot">RECUERDO · MARZO</div>
        <div class="s03-presu"><div class="rr" style="top: 30px"></div><div class="rr" style="top: 56px"></div><div class="rr" style="top: 82px; right: 50px"></div><div class="lex sig">$ ?</div></div>
        <div class="mano s03-prom"></div>
'''
js = '''
      const ENTRO = 0.0, SENORA = 0.43, QUERIA = 1.27, SILLON = 1.55, VERDE = 1.98, PIDIO = 2.76, DIJE = 3.71, LUNES = 4.57, LLAMO = 5.0, FALTA = 5.69;
      // el recuerdo: el óvalo se abre con un brillo, en tono de foto vieja
      tl.fromTo(q(".escenario"), { scale: 0.92, transformOrigin: "540px 930px" }, { scale: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s03-marco2"), { rotation: 0, svgOrigin: "540 930" }, { rotation: 20, svgOrigin: "540 930", duration: DUR, ease: "none" }, 0);
      // "entró": suena la campanita de la puerta
      tl.fromTo(q(".s03-campana"), { rotation: -20, svgOrigin: "205 690" }, { rotation: 20, svgOrigin: "205 690", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, ENTRO);
      // la señora (de espaldas: él nunca supo quién era) entra desde la izquierda
      tl.fromTo(q(".s03-sen"), { x: -260 }, { x: 0, duration: 0.55, ease: "power3.out" }, SENORA - 0.3);
      gsap.set([q(".s03-brazo"), q(".s03-brazo2")], { opacity: 0 });
      // "sillón verde": lo señala y el sillón brilla
      tl.to([q(".s03-brazo"), q(".s03-brazo2")], { opacity: 1, duration: 0.05 }, QUERIA);
      dibujar([q(".s03-brazo"), q(".s03-brazo2")], QUERIA, 0.3);
      tl.fromTo(q(".s03-verde-g"), { scale: 0.8, svgOrigin: "360 1080" }, { scale: 0.95, svgOrigin: "360 1080", duration: 0.25, yoyo: true, repeat: 1, ease: "back.out(2)" }, VERDE - 0.1);
      // "presupuesto": la hoja con el signo de pregunta
      gsap.set(q(".s03-presu"), { opacity: 0 });
      tl.fromTo(q(".s03-presu"), { opacity: 0, y: 40, rotation: -14 }, { opacity: 1, y: 0, rotation: -6, duration: 0.35, ease: "back.out(2)", immediateRender: false }, PIDIO);
      // "le dije": Don Aldo asiente, orgulloso
      tl.to(q(".s03-ald"), { y: -16, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, DIJE);
      // la promesa, escrita a mano
      const prom = q(".s03-prom");
      const palabras = [["El", LUNES - 0.1], ["lunes", LUNES], ["la", LLAMO - 0.3], ["llamo,", LLAMO], ["sin", FALTA - 0.5], ["falta.", FALTA]];
      prom.innerHTML = palabras.map(([w]) => '<span class="k">' + w + "</span>").join(" ");
      [...prom.querySelectorAll(".k")].forEach((k, i) => tl.fromTo(k, { opacity: 0, y: 20, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, palabras[i][1]));
      tl.fromTo(prom, { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, FALTA + 0.1);
'''
sfx = [{"t": 0.0, "sfx": "chime", "vol": 0.3}, {"t": 0.15, "sfx": "whoosh-short", "vol": 0.2}, {"t": 1.9, "sfx": "sparkle", "vol": 0.28}, {"t": 2.76, "sfx": "pop", "vol": 0.28}, {"t": 4.5, "sfx": "click-soft", "vol": 0.25}, {"t": 5.0, "sfx": "click-soft", "vol": 0.25}, {"t": 5.7, "sfx": "pop", "vol": 0.3}]
escena("s03-recuerdo", css, cuerpo, js, sfx, html)
