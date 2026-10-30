from base import *
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-ej { top: 600px; font-size: 120px; }
    [data-composition-id="%ID%"] .s03-num { top: 700px; font-size: 400px; line-height: 1; }
    [data-composition-id="%ID%"] .s03-pill { position: absolute; left: 140px; width: 800px; top: 1150px; padding: 18px 24px; background: #1de9d6; border: 6px solid #160a2a; border-radius: 18px; box-shadow: 9px 9px 0 #ff2e88;
      text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: 0.04em; color: #160a2a; transform: skewX(-8deg); }
    [data-composition-id="%ID%"] .s03-pill b { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; letter-spacing: 0; display: block; }
"""
franjas = "".join(f'<rect class="s03-fr" x="-300" y="{y}" width="1700" height="{h}" fill="{c}" transform="rotate(-14 540 {y})"/>'
                  for y, h, c in [(760, 70, R), (850, 46, T), (920, 30, A)])
body = f"""
        <svg class="s03-full" viewBox="0 0 1080 1920" aria-hidden="true">{franjas}
          <g class="s03-camp"><path d="M540 1290 m-40 0 a40 40 0 0 1 80 0 Z" fill="none"/></g>
        </svg>
        <div class="big c s03-ej">Ejercicio</div>
        <div class="big a s03-num">1</div>
        <div class="s03-pill"><b>AVISAR</b>"TU PEDIDO ESTÁ LISTO"</div>
"""
js = """
      const UNO = 0.69, AVISAR = 1.5, LISTO = 2.74;
      // cuadro 0: las franjas ya cruzando
      qa(".s03-fr").forEach((f, i) => tl.fromTo(f, { x: i % 2 ? 1400 : -1400 }, { x: 0, duration: 0.35, ease: "power3.out" }, i * 0.06));
      qa(".s03-fr").forEach((f, i) => tl.to(f, { x: i % 2 ? -60 : 60, duration: DUR - 0.5, ease: "none" }, 0.4));
      gsap.set(q(".s03-ej"), { opacity: 1, rotation: -6 });
      tl.fromTo(q(".s03-ej"), { x: -900 }, { x: 0, duration: 0.25, ease: "power4.out" }, 0);
      golpe(q(".s03-num"), UNO, -6, 3.4);
      sacudon(UNO, 2);
      tl.to(q(".s03-num"), { scale: 1.08, duration: BEAT / 2, yoyo: true, repeat: 5, ease: "sine.inOut" }, UNO + 0.2);
      gsap.set(q(".s03-pill"), { opacity: 0 });
      tl.fromTo(q(".s03-pill"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, AVISAR);
      tl.to(q(".s03-pill"), { rotation: -2, scale: 1.06, duration: 0.1, yoyo: true, repeat: 3 }, LISTO);
"""
sfx = [{"t": 0.02, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.8}, {"t": 0.6, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6},
       {"t": 1.5, "sfx": "pop", "vol": 0.3}, {"t": 2.74, "sfx": "chime", "vol": 0.25}]
escena("s03-uno", p, 3.30, css, body, js, sfx)
