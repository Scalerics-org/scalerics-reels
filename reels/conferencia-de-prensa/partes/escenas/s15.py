from base import *
p = "s15"
css = """
    [data-composition-id="%ID%"] .s15-t1 { top: 590px; font-size: 118px; }
    [data-composition-id="%ID%"] .s15-t2 { top: 716px; font-size: 92px; }
    [data-composition-id="%ID%"] .s15-t3 { top: 820px; font-size: 92px; }
    [data-composition-id="%ID%"] .s15-t4 { top: 924px; font-size: 124px; }
    [data-composition-id="%ID%"] .s15-env { position: absolute; left: 90px; top: 1150px; width: 900px; height: 170px; background: #f4f1e8; border: 8px solid #0d1424; border-radius: 30px; box-shadow: 10px 10px 0 #5ce611; }
    [data-composition-id="%ID%"] .s15-env small { position: absolute; left: 40px; top: 26px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.12em; color: #1b3a6b; }
    [data-composition-id="%ID%"] .s15-user { position: absolute; left: 40px; top: 70px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 50px; color: #0d1424; white-space: nowrap; }
    [data-composition-id="%ID%"] .s15-cursor { display: inline-block; width: 6px; height: 50px; margin-left: 4px; background: #0d1424; vertical-align: -6px; }
    [data-composition-id="%ID%"] .s15-btn { position: absolute; right: 26px; top: 30px; width: 108px; height: 108px; border-radius: 50%; background: #5ce611; border: 7px solid #0d1424; }
    [data-composition-id="%ID%"] .s15-btn svg { width: 100%; height: 100%; }
    [data-composition-id="%ID%"] .s15-deco { left: 0; top: 0; width: 1080px; height: 1920px; }
"""
texto = "el que culpa al árbitro"
letras = "".join(f'<span class="s15-l">{c}</span>' for c in texto)
avion = f'<svg viewBox="0 0 108 108" aria-hidden="true"><path d="M26 54 L82 30 L66 82 L54 60 Z" fill="{B}" stroke="{K}" stroke-width="5" stroke-linejoin="round"/><path d="M54 60 L82 30" stroke="{K}" stroke-width="4"/></svg>'
deco = f'''<svg viewBox="0 0 1080 1920" aria-hidden="true">{tarjeta("s15-roja", 860, 1380, R, 14, 110, 156)}{tarjeta("s15-amarilla", 110, 1390, Y, -12, 110, 156)}
  <g class="s15-silbato"><path d="M470 1440 H590 Q614 1440 614 1470 Q614 1500 584 1500 H500 Q462 1500 462 1470 Z" fill="{Y}" stroke="{K}" stroke-width="7"/><rect x="430" y="1444" width="44" height="30" rx="6" fill="{Y}" stroke="{K}" stroke-width="6"/><circle cx="540" cy="1470" r="12" fill="{K}"/></g></svg>'''
body = f"""
        <div class="obj s15-deco">{deco}</div>
        <div class="big g s15-t1" data-layout-allow-overlap>Mandáselo</div>
        <div class="big b s15-t2" data-layout-allow-overlap>al que siempre</div>
        <div class="big b s15-t3" data-layout-allow-overlap>le echa la culpa</div>
        <div class="big r s15-t4" data-layout-allow-overlap>al árbitro</div>
        <div class="s15-env"><small>ENVIAR A:</small><div class="s15-user">{letras}<span class="s15-cursor"></span></div><div class="s15-btn">{avion}</div></div>
"""
js = """
      const MANDASELO = 0.0, SIEMPRE = 0.57, CULPA = 1.21, ARBITRO = 1.48;
      // cuadro 0: MANDÁSELO ya cae
      gsap.set(q(".s15-t1"), { opacity: 1, rotation: -3 });
      tl.fromTo(q(".s15-t1"), { scale: 1.8 }, { scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      sacudon(0.15, 1);
      golpe(q(".s15-t2"), SIEMPRE, 2, 2.2);
      golpe(q(".s15-t3"), CULPA - 0.2, -2, 2.2);
      golpe(q(".s15-t4"), ARBITRO + 0.1, -4, 2.8);
      sacudon(ARBITRO + 0.15, 1.6);
      vaiven(q(".s15-t1"), 0.6, 4.4, { rotation: -1 }, 0.5);
      vaiven(q(".s15-t4"), 2.0, 3, { scale: 1.05 }, 0.4);
      // las tarjetas y el silbato
      tl.fromTo(q(".s15-roja"), { y: 500 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, ARBITRO);
      tl.fromTo(q(".s15-amarilla"), { y: 500 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, ARBITRO + 0.1);
      tl.fromTo(q(".s15-silbato"), { y: 400 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, ARBITRO + 0.2);
      tl.to(q(".s15-silbato"), { x: 10, duration: 0.06, yoyo: true, repeat: 7, ease: "none" }, ARBITRO + 0.7);
      // ENVIAR A: el que culpa al árbitro
      pop(q(".s15-env"), 1.9, 0.3);
      gsap.set(qa(".s15-l"), { display: "none" });
      qa(".s15-l").forEach((l, i) => tl.set(l, { display: "inline" }, 2.2 + i * 0.05));
      tl.fromTo(q(".s15-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 9, immediateRender: false }, 2.0);
      tl.fromTo(q(".s15-btn"), { scale: 1 }, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut", immediateRender: false }, 3.6);
      tl.to(q(".s15-btn svg"), { x: 60, y: -40, opacity: 0, duration: 0.4, ease: "power2.in" }, 3.75);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.6, "sfx": "pop", "vol": 0.25}, {"t": 1.55, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5},
       {"t": 2.2, "sfx": "typing", "vol": 0.22, "max": 1.2}, {"t": 3.65, "sfx": "whoosh", "vol": 0.25, "max": 0.6}, {"t": 3.8, "sfx": "chime", "vol": 0.25, "max": 1.0}]
escena("s15-cta", p, 5.19, css, body, js, sfx)
