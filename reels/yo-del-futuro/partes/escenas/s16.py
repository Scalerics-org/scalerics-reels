from base import *
p = "s16"
css = """
    [data-composition-id="%ID%"] .s16-com { left: 70px; top: 580px; width: 940px; height: 420px; padding: 34px 40px; border: 8px solid #120621; border-radius: 40px 40px 40px 8px; background: #fdf6ff; box-shadow: 12px 12px 0 #7b2ff7, 0 0 50px rgba(255, 42, 157, 0.5); }
    [data-composition-id="%ID%"] .s16-user { display: flex; align-items: center; gap: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; color: #7b2ff7; }
    [data-composition-id="%ID%"] .s16-user i { display: block; width: 64px; height: 64px; border-radius: 50%; background: #22e4ff; border: 4px solid #120621; }
    [data-composition-id="%ID%"] .s16-linea { position: relative; margin-top: 26px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 58px; line-height: 1.15; color: #120621; white-space: nowrap; }
    [data-composition-id="%ID%"] .s16-tapa { position: absolute; left: -6px; right: -20px; top: -4px; bottom: -4px; background: #fdf6ff; transform-origin: 100% 50%; }
    [data-composition-id="%ID%"] .s16-cursor { display: inline-block; width: 6px; height: 56px; margin-left: 6px; background: #ff2a9d; vertical-align: -6px; }
    [data-composition-id="%ID%"] .s16-escri { top: 1100px; font-size: 150px; }
    [data-composition-id="%ID%"] .s16-en { top: 1280px; font-size: 76px; }
"""
estrellas = "".join(estrellita("s16-st", x, y, r, c) for x, y, r, c in [(90, 1080, 22, C), (990, 1060, 26, N), (140, 1420, 18, M), (950, 1440, 22, C), (540, 1040, 16, W)])
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{estrellas}</svg>
        <div class="obj s16-com">
          <div class="s16-user"><i></i>@vos_hoy</div>
          <div class="s16-linea s16-l1">Querido yo del futuro:<div class="s16-tapa"></div></div>
          <div class="s16-linea s16-l2">ya empecé hoy<span class="s16-cursor"></span><div class="s16-tapa"></div></div>
        </div>
        <div class="big cr s16-escri"><span>Escribile</span></div>
        <div class="big mg s16-en"><span>en los comentarios</span></div>
"""
js = """
      const ESC = 0.0, FUTURO = 1.62, COM = 2.42;
      tl.fromTo(q(".s16-com"), { opacity: 0.3, scale: 0.85, rotation: -3 }, { opacity: 1, scale: 1, rotation: -1.5, duration: 0.3, ease: "back.out(2)" }, 0);
      const tapas = qa(".s16-tapa");
      tl.fromTo(tapas[0], { scaleX: 1 }, { scaleX: 0, duration: 1.3, ease: "steps(22)" }, 0.3);
      tl.fromTo(tapas[1], { scaleX: 1 }, { scaleX: 0, duration: 0.9, ease: "steps(13)" }, 3.2);
      tl.fromTo(q(".s16-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 19 }, 0);
      golpe(q(".s16-escri"), COM - 0.6, -3, 2.4);
      sacudon(COM - 0.55, 1.2);
      golpe(q(".s16-en"), COM, 2, 2.4);
      sacudon(COM + 0.05, 1.2);
      tl.to([q(".s16-escri"), q(".s16-en")], { scale: 1.05, duration: 0.4, yoyo: true, repeat: 7, stagger: 0.2, ease: "sine.inOut" }, COM + 0.4);
      qa(".s16-st").forEach((s, i) => { const b = s.getBBox(); const o = (b.x + b.width / 2) + " " + (b.y + b.height / 2);
        tl.fromTo(s, { scale: 0.3, svgOrigin: o }, { scale: 1.2, svgOrigin: o, duration: 0.4, yoyo: true, repeat: 9, ease: "sine.inOut" }, i * 0.15); });
"""
sfx = [{"t": 0.3, "sfx": "typing", "vol": 0.3, "max": 1.3}, {"t": 1.8, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.4, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7},
       {"t": 3.2, "sfx": "typing", "vol": 0.25, "max": 0.9}, {"t": 4.0, "sfx": "chime", "vol": 0.25, "max": 1.5}]
escena("s16-cta", p, 6.59, css, body, js, sfx)
