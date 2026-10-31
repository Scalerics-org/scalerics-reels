ID = "s02-con-ustedes"; DUR = 6.24
CSS = """
    $ .s02-cartel { position: absolute; left: 70px; top: 610px; width: 940px; height: 330px; border: 8px solid #ffb547; border-radius: 30px; background: rgba(11, 19, 48, 0.85); }
    $ .s02-n1, $ .s02-n2 { position: absolute; left: 0; right: 0; text-align: center; font-family: "Caveat", cursive; font-weight: 700; line-height: 1; color: #fff1dc; white-space: nowrap; text-shadow: 0 0 8px #ff3d6e, 0 0 24px #ff3d6e, 0 0 54px #ff3d6e; }
    $ .s02-n1 { top: 640px; font-size: 190px; }
    $ .s02-n2 { top: 800px; font-size: 120px; }
    $ .s02-bombs { position: absolute; left: 70px; top: 610px; width: 940px; height: 330px; }
    $ .s02-ia { position: absolute; left: 90px; top: 1350px; width: 900px; padding: 18px 0 14px; text-align: center; background: #0b1330; border: 8px solid #5ce611; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; color: #5ce611; line-height: 1; }
    $ .s02-ia small { display: block; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.24em; color: #fff1dc; }
"""
bombs = "".join(f'<circle class="s02-bomb s02-b{i % 2}" cx="{110 + i * 860 / 13:.0f}" cy="{630 if i % 2 == 0 else 920}" r="10" fill="#ffb547" />' for i in range(14))
tela_i = "".join(f'<path d="M{70 + k * 80} 560 C{90 + k * 80} 900 {50 + k * 80} 1200 {70 + k * 80} 1520" stroke="#fff1dc" stroke-width="5" opacity="0.35" fill="none" />' for k in range(6))
tela_d = "".join(f'<path d="M{590 + k * 80} 560 C{610 + k * 80} 900 {570 + k * 80} 1200 {590 + k * 80} 1520" stroke="#fff1dc" stroke-width="5" opacity="0.35" fill="none" />' for k in range(6))
HTML = """
        <div class="s02-uno">
          <div class="s02-cartel"></div>
          <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + bombs + """
            <g class="s02-nico"><g transform="translate(378 1010) scale(0.9)">""" + NICO("s02", tarjeta=False) + """</g></g>
            <g class="s02-salu"><path class="k" d="M600 1400 C670 1360 690 1270 670 1200 L630 1210 C640 1270 630 1330 580 1360 Z" /><circle class="b" cx="650" cy="1180" r="30" /></g>
            """ + ESCRITORIO("s02", 200, 1380, 680, 150, taza=True) + """
          </svg>
          <div class="s02-n1">Nico</div>
          <div class="s02-n2">de Noche</div>
        </div>
        <div class="s02-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            """ + HAZ("s02", "s02-h", 540, 540, 80, 640, 300, 1540, "#fff1dc") + """
            <ellipse cx="540" cy="1470" rx="300" ry="54" fill="#fff1dc" opacity="0.12" />
            <g class="s02-ag"><g transform="translate(360 900) scale(1.0)">""" + AGENTE("s02", lentes=True) + """</g></g>
            <g class="s02-ti"><rect class="r" x="40" y="560" width="510" height="960" rx="10" />""" + tela_i + """</g>
            <g class="s02-td"><rect class="r" x="530" y="560" width="510" height="960" rx="10" />""" + tela_d + """</g>
            <rect class="y" x="30" y="540" width="1020" height="44" rx="12" />
          </svg>
          <div class="s02-ia">AGENTE DE IA<small>INVITADO DE ESTA NOCHE</small></div>
        </div>
"""
JS = """
      const NICO = 1.79, NOCHE = 2.23, USTEDES = 2.96, EL = 4.04, IA = 4.64;
      // el cartel de neón se prende
      gsap.set([q(".s02-n1"), q(".s02-n2")], { opacity: 0 });
      [[0.0, 0.3], [0.06, 1], [0.12, 0.2], [0.2, 1]].forEach(([t, o]) => tl.set(q(".s02-n1"), { opacity: o }, 0.35 + t));
      [[0.0, 0.3], [0.06, 1], [0.12, 0.2], [0.2, 1]].forEach(([t, o]) => tl.set(q(".s02-n2"), { opacity: o }, NOCHE - 0.1 + t));
      tl.fromTo(qa(".s02-b0"), { opacity: 1 }, { opacity: 0.25, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 11, immediateRender: false }, 0);
      tl.fromTo(qa(".s02-b1"), { opacity: 0.25 }, { opacity: 1, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 11, immediateRender: false }, 0);
      tl.fromTo(q(".s02-cartel"), { scale: 0.9, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 0);
      habla(".s02-boca", 0, 2.8, "180 284");
      tl.fromTo(q(".s02-salu"), { rotation: -12, svgOrigin: "610 1400" }, { rotation: 14, svgOrigin: "610 1400", duration: 0.22, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, 0);
      // telón: se va lo primero, entra el telón cerrado
      tl.to(q(".s02-uno"), { y: -1800, duration: 0.4, ease: "power3.in" }, USTEDES - 0.15);
      gsap.set(q(".s02-dos"), { y: 1400 });
      tl.fromTo(q(".s02-dos"), { y: 1400 }, { y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, USTEDES - 0.1);
      gsap.set(q(".s02-h"), { opacity: 0 });
      // se abre el telón y aparece la estrella, con lentes
      tl.to(q(".s02-ti"), { x: -520, duration: 0.5, ease: "power3.inOut" }, EL - 0.15);
      tl.to(q(".s02-td"), { x: 520, duration: 0.5, ease: "power3.inOut" }, EL - 0.15);
      tl.fromTo(q(".s02-h"), { opacity: 0 }, { opacity: 0.16, duration: 0.3, immediateRender: false }, EL - 0.1);
      tl.fromTo(q(".s02-ag"), { y: 30, scale: 0.95, transformOrigin: "50% 100%" }, { y: 0, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false, transformOrigin: "50% 100%" }, EL);
      tl.fromTo(q(".s02-ag-bd"), { rotation: 0, svgOrigin: "276 372" }, { rotation: -70, svgOrigin: "276 372", duration: 0.2, ease: "back.out(2)", immediateRender: false }, EL + 0.2);
      tl.fromTo(q(".s02-ag-bd"), { rotation: -70, svgOrigin: "276 372" }, { rotation: -50, svgOrigin: "276 372", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, EL + 0.4);
      golpe(".s02-ia", IA, 2.2);
      sacudon(IA + 0.04, 0.9);
"""
SFX = [{"t": 1.6, "sfx": "click", "vol": 0.3}, {"t": 2.1, "sfx": "click", "vol": 0.3}, {"t": 2.85, "sfx": "whoosh", "vol": 0.25, "max": 0.6}, {"t": 3.9, "sfx": "whoosh-cinematic", "vol": 0.28, "max": 0.8}, {"t": 4.15, "sfx": "sparkle", "vol": 0.3}, {"t": 4.55, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}]
