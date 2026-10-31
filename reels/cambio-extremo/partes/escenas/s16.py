from base import *
p = "s16"
usuario = "@tu_local_favorito"
letras = "".join(f'<span class="s16-l">{c}</span>' for c in usuario)
css = """
    [data-composition-id="%ID%"] .s16-nom { top: 560px; font-size: 170px; }
    [data-composition-id="%ID%"] .s16-card { position: absolute; left: 70px; top: 780px; width: 940px; padding: 40px 30px 36px; background: #14c4b8; border: 10px solid #16191d; border-radius: 30px; box-shadow: 14px 14px 0 #ffd21f; text-align: center; }
    [data-composition-id="%ID%"] .s16-card small { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 50px; line-height: 1.1; color: #16191d; }
    [data-composition-id="%ID%"] .s16-card b { display: block; margin-top: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 116px; line-height: 0.95; color: #fbfaf5; -webkit-text-stroke: 14px #16191d; paint-order: stroke fill; text-transform: uppercase; }
    [data-composition-id="%ID%"] .s16-casco { left: 720px; top: 640px; width: 280px; height: 200px; }
    [data-composition-id="%ID%"] .s16-com { position: absolute; left: 70px; top: 1240px; width: 940px; height: 170px; background: #fbfaf5; border: 8px solid #16191d; border-radius: 30px 30px 30px 6px; box-shadow: 10px 10px 0 #16191d; }
    [data-composition-id="%ID%"] .s16-arroba { position: absolute; left: 24px; top: 20px; width: 120px; height: 120px; border-radius: 50%; background: #5ce611; border: 7px solid #16191d; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; line-height: 100px; color: #16191d; }
    [data-composition-id="%ID%"] .s16-user { position: absolute; left: 170px; top: 46px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 60px; color: #16191d; white-space: nowrap; }
    [data-composition-id="%ID%"] .s16-cursor { display: inline-block; width: 6px; height: 60px; margin-left: 4px; background: #16191d; vertical-align: -8px; }
"""
casco = f'''<svg viewBox="0 0 280 200" aria-hidden="true"><path d="M40 140 Q36 30 140 26 Q244 30 240 140 Z" fill="{Y}" {S}/>
  <path d="M10 142 Q140 116 270 142 L272 164 Q140 140 8 164 Z" fill="{Y}" {S}/><path d="M140 28 V136 M96 36 Q84 80 88 136 M184 36 Q196 80 192 136" stroke="{K}" stroke-width="6" fill="none"/></svg>'''
body = f"""
        <div class="big y s16-nom">¡Nominá!</div>
        <div class="s16-card"><small>a un local que necesita un</small><b>cambio extremo</b></div>
        <div class="obj s16-casco">{casco}</div>
        <div class="s16-com"><div class="s16-arroba">@</div><div class="s16-user">{letras}</div></div>
"""
js = """
      const LOCAL = 0.45, CAMBIO = 1.70, ETIQ = 2.84;
      // cuadro 0 de la escena: NOMINÁ
      gsap.set(q(".s16-nom"), { opacity: 1, rotation: -4 });
      tl.fromTo(q(".s16-nom"), { scale: 2 }, { scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      sacudon(0.15, 1.2);
      vaiven(q(".s16-nom"), 0.4, 6.6, { rotation: -1, scale: 1.04 }, 0.5);
      // la tarjeta de nominación
      gsap.set(q(".s16-card"), { opacity: 0 });
      tl.fromTo(q(".s16-card"), { opacity: 1, y: 900, rotation: 6 }, { opacity: 1, y: 0, rotation: -1, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, LOCAL);
      tl.fromTo(q(".s16-card b"), { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, CAMBIO);
      // el casco cae sobre la tarjeta
      gsap.set(q(".s16-casco"), { opacity: 0 });
      tl.fromTo(q(".s16-casco"), { opacity: 1, y: -900, rotation: -30 }, { opacity: 1, y: 0, rotation: 12, duration: 0.4, ease: "bounce.out", immediateRender: false }, CAMBIO - 0.15);
      sacudon(CAMBIO + 0.1, 1);
      tl.to(q(".s16-casco"), { y: -16, rotation: 6, duration: 0.45, yoyo: true, repeat: 9, ease: "sine.inOut" }, CAMBIO + 0.5);
      // etiquetalo
      pop(q(".s16-com"), ETIQ - 0.05, 0.3);
      tl.fromTo(q(".s16-arroba"), { rotation: -180, scale: 0.3 }, { rotation: 0, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, ETIQ);
      gsap.set(qa(".s16-l"), { opacity: 0 });
      qa(".s16-l").forEach((l, i) => tl.set(l, { opacity: 1 }, ETIQ + 0.25 + i * 0.06));

      vaiven(q(".s16-arroba"), ETIQ + 1.5, 3, { scale: 1.12 }, 0.4);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.45, "sfx": "whoosh", "vol": 0.3, "max": 0.5}, {"t": 1.65, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5},
       {"t": 2.84, "sfx": "pop", "vol": 0.3}, {"t": 3.1, "sfx": "typing", "vol": 0.25, "max": 1.1}, {"t": 4.3, "sfx": "sparkle", "vol": 0.25}]
escena("s16-cta", p, 7.50, css, body, js, sfx)
