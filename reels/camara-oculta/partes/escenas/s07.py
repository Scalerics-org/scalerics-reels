exec(PJ)
ID = "s07-formulario"; DUR = 5.93
NP = [(380, 900, 1.1), (700, 860, 1.0), (300, 1150, 0.9), (800, 1120, 1.1), (560, 760, 1.0)]
notas = "".join(nota("s07", f"s07-n{i}", x, y, sc) for i, (x, y, sc) in enumerate(NP))
CSS = """
    $ .s07-form { position: absolute; left: 330px; top: 700px; width: 420px; }
    $ .s07-tit { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fbf7ea; margin-bottom: 18px; }
    $ .s07-campo { height: 70px; border: 4px solid #fbf7ea; border-radius: 10px; margin-bottom: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #fbf7ea; padding: 16px 16px; opacity: 0.85; }
    $ .s07-campo.s07-big { height: 160px; }
    $ .s07-enviar { display: inline-block; padding: 14px 40px 12px; background: #ffd400; color: #0c0c0c; border: 4px solid #0c0c0c; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 38px; }
    $ .s07-inicio { position: absolute; left: 330px; top: 1230px; width: 420px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; color: #ff3b30; }
    $ .s07-otra { left: 160px; top: 600px; font-size: 54px; background: #ff3b30; color: #fbf7ea; transform: rotate(-5deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {celular("s07", 290, 580, 500, 800, extra='<rect x="314" y="640" width="452" height="710" rx="14" fill="#2b2b2b" opacity="0.6" />')}
          <g class="s07-vuelta"><path class="rl" d="M640 1180 A110 110 0 1 1 640 940" stroke-width="16" /><path class="rl" d="M600 900 L646 940 L596 972" stroke-width="16" /></g>
          <g class="s07-tap"><circle cx="0" cy="0" r="40" fill="none" stroke="#ffd400" stroke-width="6" /></g>
          {notas}
        </svg>
        <div class="s07-form">
          <div class="s07-tit">Contacto</div>
          <div class="s07-campo">Fede</div>
          <div class="s07-campo s07-big">¿Tienen mesa hoy?</div>
          <div class="s07-enviar">ENVIAR</div>
        </div>
        <div class="s07-inicio">INICIO</div>
        <div class="cartela s07-otra">¡Otra vez la música!</div>
"""
JS = "      const NP = " + str([[x, y] for x, y, _ in NP]) + ";\n" + """
      const FORM = 1.19, ENVIAR = 1.74, MANDO = 2.18, PRINC = 3.13, OTRA = 4.38, MUSICA = 4.87;
      tl.fromTo(q(".s07-cel"), { y: 120, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)" }, 0);
      gsap.set(q(".s07-form"), { opacity: 1 });
      tl.fromTo(q(".s07-form"), { y: 30, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0.05);
      tl.to(q(".s07-form"), { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1 }, FORM);
      // tap en ENVIAR
      gsap.set(q(".s07-tap"), { opacity: 0, x: 430, y: 1188 });
      tl.fromTo(q(".s07-tap"), { opacity: 1, scale: 0.3 }, { opacity: 0, scale: 1.8, duration: 0.4, ease: "power2.out", immediateRender: false }, ENVIAR);
      tl.to(q(".s07-enviar"), { scale: 0.9, duration: 0.08, yoyo: true, repeat: 1 }, ENVIAR);
      // ¡me mandó al principio!: el formulario se va y gira la flecha de volver
      tl.to(q(".s07-form"), { x: 600, opacity: 0, duration: 0.25, ease: "power3.in" }, MANDO);
      dibujar(".s07-vuelta path", MANDO + 0.1, 0.4);
      tl.fromTo(q(".s07-vuelta"), { rotation: 0, svgOrigin: "540 1060" }, { rotation: -720, svgOrigin: "540 1060", duration: 1.6, ease: "power2.inOut" }, MANDO + 0.2);
      pop(".s07-inicio", PRINC);
      sacudon(PRINC + 0.05, 0.8);
      // otra vez la música
      qa(".s07-nota").forEach((n, i) => {
        gsap.set(n, { opacity: 0 });
        tl.fromTo(n, { opacity: 1, x: 540 - NP[i][0], y: 1060 - NP[i][1], scale: 0.2 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, OTRA + i * 0.08);
        tl.to(n, { y: -14, rotation: i % 2 ? 12 : -12, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, OTRA + 0.45 + i * 0.08);
      });
      golpe(".s07-otra", OTRA, 2.2);
      tl.to(q(".s07-cel"), { rotation: 3, svgOrigin: "540 1380", duration: 0.07, yoyo: true, repeat: 9, ease: "none" }, MUSICA);
"""
SFX = [{"t": 0.5, "sfx": "key-press", "vol": 0.25}, {"t": 1.74, "sfx": "click", "vol": 0.35}, {"t": 2.2, "sfx": "whoosh", "vol": 0.25}, {"t": 3.13, "sfx": "glitch-1", "vol": 0.25, "max": 0.5}, {"t": 4.38, "sfx": "musiquita", "vol": 0.5}]
