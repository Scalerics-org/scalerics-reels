ID = "s10-agente"; DUR = 5.01
SECO = '<path class="s10-seco" d="M354 900 C354 790 440 724 540 724 C640 724 726 790 726 900 L726 1420 L354 1420 Z" fill="#000" />'
PARES = [("¿A cuánto el talle M?", "$ 1.490, hay stock"), ("Quiero dos", "Pedido anotado"), ("¿Turno el lunes?", "Lunes 10:00, agendado")]
CSS = """
    $ .s10-tel { position: absolute; left: 250px; top: 950px; width: 580px; height: 450px; border: 7px solid #f4f6fb; border-bottom: none; border-radius: 50px 50px 0 0; background: #0b2547; overflow: hidden; }
    $ .s10-head { position: absolute; left: 0; right: 0; top: 0; height: 70px; padding: 20px 30px 0; background: #14457a; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.1em; color: #5ce611; white-space: nowrap; }
    $ .s10-msg { position: absolute; padding: 10px 18px; border-radius: 20px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; line-height: 1.15; white-space: nowrap; }
    $ .s10-in { left: 20px; background: #f4f6fb; color: #061428; border-bottom-left-radius: 4px; }
    $ .s10-out { right: 20px; background: #5ce611; color: #061428; border-bottom-right-radius: 4px; }
    $ .s10-reloj { position: absolute; left: 700px; top: 600px; padding: 10px 20px 8px; background: #061428; border: 5px solid #ffd23f; border-radius: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 44px; color: #ffd23f; white-space: nowrap; }
"""
filas = ""
for i, (a, b) in enumerate(PARES):
    y = 90 + i * 120
    filas += f'<div class="s10-msg s10-in s10-a{i}" style="top:{y}px">{a}</div><div class="s10-msg s10-out s10-b{i}" style="top:{y + 54}px">{b}</div>'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <clipPath id="s10-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath>
            <mask id="s10-mask" maskUnits="userSpaceOnUse" x="-400" y="0" width="1880" height="1920"><rect x="-400" y="0" width="1880" height="1920" fill="#fff" />""" + SECO + """</mask>
          </defs>
          <g class="s10-luna"><path d="M190 600 C150 640 160 720 230 740 C180 760 110 720 110 650 C110 600 150 570 190 600 Z" fill="#ffd23f" stroke="#f4f6fb" stroke-width="5" /></g>
          <g class="s10-par"><g transform="translate(540 900) scale(0.62)">""" + PARAGUAS("s10") + """</g></g>
          <g clip-path="url(#s10-clip)"><g mask="url(#s10-mask)">""" + lluvia("s10-lluvia", 55, -300, 1300, 420, 1000, 110, globos=0.5, vel=(900, 1200), esc=(1.0, 1.5), ang=14) + """</g></g>
        </svg>
        <div class="s10-tel"><div class="s10-head">AGENTE · EN LÍNEA</div>""" + filas + """</div>
        <div class="s10-reloj">DOM 23:14</div>
"""
JS = """
      const PRECIOS = 0.55, PEDIDOS = 1.55, TURNOS = 2.55, DOMINGO = 3.64;
      lluvia(".s10-lluvia", 0, DUR);
      tl.fromTo(q(".s10-par"), { rotation: -3, svgOrigin: "540 1070" }, { rotation: 3, svgOrigin: "540 1070", duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s10-tel"), { y: 200 }, { y: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      [[0.05, PRECIOS], [PEDIDOS - 0.4, PEDIDOS], [TURNOS - 0.4, TURNOS]].forEach(([a, b], i) => {
        pop(".s10-a" + i, a, { transformOrigin: "0% 100%" });
        pop(".s10-b" + i, b - 0.05, { transformOrigin: "100% 100%" });
        tl.fromTo(q(".s10-b" + i), { boxShadow: "0 0 0 rgba(92,230,17,0)" }, { boxShadow: "0 0 24px rgba(92,230,17,0.7)", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, b + 0.2);
      });
      tl.fromTo(q(".s10-ojos"), { scaleY: 1, svgOrigin: "0 -130" }, { scaleY: 0.1, svgOrigin: "0 -130", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, 2.0);
      // domingo a la noche
      gsap.set(q(".s10-luna"), { opacity: 0 });
      tl.fromTo(q(".s10-luna"), { opacity: 1, scale: 0, svgOrigin: "170 660" }, { opacity: 1, scale: 1, svgOrigin: "170 660", duration: 0.35, ease: "back.out(2)", immediateRender: false }, DOMINGO - 0.1);
      golpe(".s10-reloj", DOMINGO, 2);
      tl.to(q(".s10-luna"), { rotation: 10, svgOrigin: "170 660", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, DOMINGO + 0.3);
"""
SFX = [{"t": 0.05, "sfx": "key-press", "vol": 0.25}, {"t": 0.5, "sfx": "ping", "vol": 0.3}, {"t": 1.15, "sfx": "key-press", "vol": 0.22}, {"t": 1.5, "sfx": "ping", "vol": 0.3}, {"t": 2.15, "sfx": "key-press", "vol": 0.22}, {"t": 2.5, "sfx": "ping", "vol": 0.3}, {"t": 3.64, "sfx": "chime", "vol": 0.25}]
