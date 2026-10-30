from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-ej { top: 600px; font-size: 120px; }
    [data-composition-id="%ID%"] .s06-num { top: 700px; font-size: 400px; line-height: 1; }
    [data-composition-id="%ID%"] .s06-pill { position: absolute; left: 140px; width: 800px; top: 1150px; padding: 18px 24px; background: #ffe14d; border: 6px solid #160a2a; border-radius: 18px; box-shadow: 9px 9px 0 #ff2e88;
      text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 40px; letter-spacing: 0.04em; color: #160a2a; transform: skewX(-8deg); }
    [data-composition-id="%ID%"] .s06-pill b { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; letter-spacing: 0; display: block; }
    [data-composition-id="%ID%"] .s06-due { left: 40px; top: 640px; }
    [data-composition-id="%ID%"] .s06-ag { position: absolute; left: 560px; top: 640px; width: 440px; background: #fff3e8; border: 6px solid #160a2a; border-radius: 20px; box-shadow: 9px 9px 0 #1de9d6; overflow: hidden; }
    [data-composition-id="%ID%"] .s06-ag h4 { margin: 0; padding: 14px 20px; background: #ff2e88; font-family: "Lexend", sans-serif; font-weight: 900; font-style: italic; font-size: 44px; color: #fff3e8; letter-spacing: 0.02em; }
    [data-composition-id="%ID%"] .s06-fila { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-top: 3px solid rgba(22, 10, 42, 0.15); font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; color: #160a2a; }
    [data-composition-id="%ID%"] .s06-fila b { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; color: #5b2a86; }
    [data-composition-id="%ID%"] .s06-ok { margin-left: auto; width: 40px; height: 40px; border-radius: 50%; background: #1de9d6; border: 4px solid #160a2a; }
    [data-composition-id="%ID%"] .s06-bur { position: absolute; left: 420px; width: 620px; padding: 16px 22px; white-space: nowrap; background: #1de9d6; border: 5px solid #160a2a; border-radius: 28px 28px 6px 28px; box-shadow: 7px 7px 0 #ff2e88;
      font-family: "Lexend", sans-serif; font-weight: 700; font-size: 38px; color: #160a2a; }
    [data-composition-id="%ID%"] .s06-n { top: 590px; left: 60px; right: auto; font-size: 200px; }
"""
franjas = "".join(f'<rect class="s06-fr" x="-300" y="{y}" width="1700" height="{h}" fill="{c}" transform="rotate(-14 540 {y})"/>'
                  for y, h, c in [(760, 70, T), (850, 46, A), (920, 30, R)])
filas = "".join(f'<div class="s06-fila s06-f{i}"><b>{h}</b>{n}<span class="s06-ok"></span></div>' for i, (h, n) in enumerate([("10:00", "Sofía"), ("11:00", "Martín"), ("11:30", "Laura"), ("12:00", "Diego"), ("12:30", "Ana")]))
body = f"""
        <svg class="s06-full" viewBox="0 0 1080 1920" aria-hidden="true">{franjas}
          <g class="s06-step"><path d="M70 1300 L470 1300 L440 1260 L100 1260 Z" fill="{T}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
            <rect x="70" y="1300" width="400" height="56" rx="8" fill="{R}" stroke="{D}" stroke-width="6"/>
            <text x="270" y="1340" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="30" fill="{C}" letter-spacing="6">STEP</text></g>
        </svg>
        <div class="big c s06-ej">Ejercicio</div>
        <div class="big a s06-num">2</div>
        <div class="s06-pill"><b>RECORDAR</b>LOS TURNOS DE MAÑANA</div>
        <div class="fig s06-due">{duenio('s06d', tel=True)}</div>
        <div class="s06-ag"><h4>MAÑANA</h4>{filas}</div>
        <div class="s06-bur s06-b0" style="top:1135px">Te esperamos a las 10:00</div>
        <div class="s06-bur s06-b1" style="top:1135px">Te esperamos a las 11:00</div>
        <div class="big a s06-n s06-n1">1!</div>
        <div class="big a s06-n s06-n2">2!</div>
"""
js = """
      const DOS = 0.64, RECORDAR = 1.49, TURNOS = 2.49, TE1 = 4.22, UNO = 6.36, TE2 = 7.12, DOS2 = 9.56;
      // tarjeta de capítulo
      qa(".s06-fr").forEach((f, i) => tl.fromTo(f, { x: i % 2 ? 1400 : -1400 }, { x: 0, duration: 0.35, ease: "power3.out" }, i * 0.06));
      gsap.set(q(".s06-ej"), { opacity: 1, rotation: -6 });
      tl.fromTo(q(".s06-ej"), { x: -900 }, { x: 0, duration: 0.25, ease: "power4.out" }, 0);
      golpe(q(".s06-num"), DOS, -6, 3.4); sacudon(DOS, 2);
      gsap.set(q(".s06-pill"), { opacity: 0 });
      tl.fromTo(q(".s06-pill"), { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, RECORDAR);
      const tarjeta = [...qa(".s06-fr"), q(".s06-ej"), q(".s06-num"), q(".s06-pill")];
      tl.to(tarjeta, { x: -2300, duration: 0.3, ease: "power3.in", stagger: 0.03 }, TURNOS - 0.3);
      // el step y el dueño subiendo y bajando al ritmo
      gsap.set([q(".s06-step"), q(".s06-due"), q(".s06-ag")], { opacity: 0 });
      tl.fromTo(q(".s06-step"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, TURNOS - 0.1);
      gsap.set(q(".s06-due"), { scale: 0.74, transformOrigin: "50% 98%" });
      tl.fromTo(q(".s06-due"), { opacity: 0, x: -400 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, TURNOS);
      for (let k = 0, t0 = TURNOS + 0.35; t0 + k * BEAT < DUR - 0.3; k++) {
        tl.to(q(".s06-due"), { y: k % 2 ? 0 : -48, duration: BEAT * 0.6, ease: "power2.out" }, t0 + k * BEAT);
        tl.to(q(".s06d-bd"), { rotation: k % 2 ? -10 : -110, svgOrigin: "250 286", duration: BEAT * 0.6, ease: "power2.out" }, t0 + k * BEAT);
        tl.to(q(".s06d-bi"), { rotation: k % 2 ? 40 : 0, svgOrigin: "150 286", duration: BEAT * 0.6, ease: "power2.out" }, t0 + k * BEAT);
      }
      tl.to(q(".s06d-gotas"), { y: 18, duration: 0.35, yoyo: true, repeat: 19 }, TURNOS);
      // la agenda de mañana
      tl.fromTo(q(".s06-ag"), { opacity: 0, x: 500 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, TURNOS + 0.2);
      gsap.set(qa(".s06-ok"), { opacity: 0.25 });
      // recordatorios uno por uno
      const burs = qa(".s06-bur");
      gsap.set(burs, { opacity: 0 });
      [[TE1, 0], [TE2, 1]].forEach(([t, i]) => {
        tl.fromTo(burs[i], { opacity: 0, scale: 0.4, x: -120, y: 60 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, t);
        tl.to(q(".s06-f" + i + " .s06-ok"), { opacity: 1, scale: 1.4, duration: 0.15, yoyo: true, repeat: 1 }, t + 0.9);
        tl.set(q(".s06-f" + i + " .s06-ok"), { opacity: 1 }, t + 1.3);
        tl.to(q(".s06-f" + i), { backgroundColor: "rgba(29, 233, 214, 0.25)", duration: 0.2 }, t + 0.9);
      });
      tl.to(burs[0], { opacity: 0, y: -40, duration: 0.25 }, TE2 - 0.2);
      golpe(q(".s06-n1"), UNO, 6, 3); fuera(q(".s06-n1"), TE2 - 0.25); sacudon(UNO, 1.2);
      golpe(q(".s06-n2"), DOS2, -6, 3); sacudon(DOS2, 1.2);
      // y los que faltan titilan
      tl.to(qa(".s06-f2, .s06-f3, .s06-f4"), { backgroundColor: "rgba(255, 46, 136, 0.3)", duration: 0.15, yoyo: true, repeat: 3 }, DOS2 + 0.1);
"""
sfx = [{"t": 0.02, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.8}, {"t": 0.6, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6},
       {"t": 2.4, "sfx": "whoosh", "vol": 0.25}, {"t": 4.2, "sfx": "notification", "vol": 0.35}, {"t": 6.33, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5},
       {"t": 7.1, "sfx": "notification", "vol": 0.35}, {"t": 9.53, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5}]
escena("s06-turnos", p, 10.54, css, body, js, sfx)
