from base import *
p = "s05"
fotos = "".join(f'<div class="s05-f" style="background:{c}"></div>' for c in [N, T, Y, T, Y, N, Y, N, T])
css = """
    [data-composition-id="%ID%"] .s05-cap { left: -20px; top: 900px; }
    [data-composition-id="%ID%"] .s05-diag { position: absolute; left: 60px; top: 560px; padding: 16px 30px 10px 100px; background: #ffd21f; border: 8px solid #16191d; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1; color: #16191d; box-shadow: 10px 10px 0 #16191d; }
    [data-composition-id="%ID%"] .s05-tri { position: absolute; left: 22px; top: 8px; width: 66px; height: 60px; }
    [data-composition-id="%ID%"] .s05-cel { position: absolute; left: 430px; top: 690px; width: 520px; height: 820px; border-radius: 52px; border: 8px solid #16191d; background: #fbfaf5; box-shadow: 0 0 0 6px #fbfaf5, 12px 12px 0 6px #16191d; overflow: hidden; }
    [data-composition-id="%ID%"] .s05-perfil { position: absolute; left: 30px; top: 50px; width: 110px; height: 110px; border-radius: 50%; background: #ff7a1a; border: 6px solid #16191d; }
    [data-composition-id="%ID%"] .s05-user { position: absolute; left: 160px; top: 70px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; color: #16191d; }
    [data-composition-id="%ID%"] .s05-sub { position: absolute; left: 160px; top: 114px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: #16191d; opacity: 0.6; }
    [data-composition-id="%ID%"] .s05-grid { position: absolute; left: 20px; right: 20px; top: 200px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    [data-composition-id="%ID%"] .s05-f { height: 150px; border: 4px solid #16191d; border-radius: 8px; }
    [data-composition-id="%ID%"] .s05-com { position: absolute; left: 370px; font-size: 40px; padding: 14px 26px; transform: rotate(-2deg); }
    [data-composition-id="%ID%"] .s05-com i { font-style: normal; color: #ff7a1a; }
    [data-composition-id="%ID%"] .s05-cinta { top: 1400px; transform: rotate(-8deg); }
"""
body = f"""
        <div class="fig s05-cap">{capataz('s05c')}</div>
        <div class="s05-cel"><div class="s05-perfil"></div><div class="s05-user">@regalosmonica</div><div class="s05-sub">solo por acá</div><div class="s05-grid">{fotos}</div></div>
        <div class="globo s05-com s05-c1" style="top:960px">consultá por <i>privado</i></div>
        <div class="globo s05-com s05-c2" style="top:1110px; left: 410px">consultá por <i>privado</i></div>
        <div class="globo s05-com s05-c3" style="top:1260px; left: 350px">consultá por <i>privado</i></div>
        {cinta('s05-cinta', 'FALLA · FALLA · FALLA · FALLA · FALLA · FALLA')}
        <div class="s05-diag"><svg class="s05-tri" viewBox="0 0 66 60"><path d="M33 4 L62 56 H4 Z" fill="#ff7a1a" stroke="#16191d" stroke-width="5" stroke-linejoin="round"/><path d="M33 22 V38 M33 46 V48" stroke="#16191d" stroke-width="7" stroke-linecap="round"/></svg>DIAGNÓSTICO</div>
"""
js = """
      const GRAVE = 0.0, VENDE = 1.14, INSTA = 1.65, FOTO = 2.96, CONS = 3.85, PRIV = 4.35;
      gsap.set(q(".s05-cap"), { scale: 0.92, transformOrigin: "50% 100%" });
      tl.fromTo(q(".s05-cap"), { x: -300 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      habla(".s05c-boca", 0.05, 5.2, "200 246");
      tl.fromTo(q(".s05c-ceja"), { y: 0 }, { y: 6, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.2);
      // cuadro 0: el cartel ya está
      gsap.set(q(".s05-diag"), { opacity: 1, rotation: -3 });
      tl.fromTo(q(".s05-diag"), { scale: 1.5 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      tl.fromTo(q(".s05-tri"), { opacity: 1 }, { opacity: 0.2, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 19, immediateRender: false }, 0.2);
      // el celular
      entra(q(".s05-cel"), VENDE, { x: 700 }, 0.35);
      tl.to(q(".s05c-bd"), { rotation: -70, svgOrigin: "252 296", duration: 0.3, ease: "back.out(2)" }, INSTA);
      tl.fromTo(qa(".s05-f"), { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05, ease: "back.out(2)", immediateRender: false }, INSTA);
      tl.to(q(".s05-cel"), { scale: 1.06, transformOrigin: "50% 40%", duration: 0.3, ease: "power2.out" }, FOTO);
      // consultá por privado, por privado, por privado
      [".s05-c1", ".s05-c2", ".s05-c3"].forEach((s, i) => pop(q(s), CONS + i * 0.2, 0.25));
      sacudon(PRIV + 0.05, 1.4);
      gsap.set(q(".s05-cinta"), { opacity: 0 });
      tl.fromTo(q(".s05-cinta"), { opacity: 1, x: 1400 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, PRIV);
      tl.to(q(".s05-cinta"), { x: -80, duration: 0.8, ease: "none" }, PRIV + 0.25);
"""
sfx = [{"t": 0.05, "sfx": "error", "vol": 0.0, "max": 0.1}, {"t": 0.1, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}, {"t": 1.1, "sfx": "whoosh-short", "vol": 0.25},
       {"t": 1.65, "sfx": "pop", "vol": 0.25}, {"t": 3.85, "sfx": "notification", "vol": 0.25}, {"t": 4.05, "sfx": "notification", "vol": 0.2},
       {"t": 4.35, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s05-instagram", p, 5.36, css, body, js, sfx[1:])
