from base import *
p = "s03"
txt = "doña nélida tortas"
letras = "".join(f'<span class="s03-ch">{c if c != " " else "&nbsp;"}</span>' for c in txt)
css = """
    [data-composition-id="%ID%"] .s03-busca { position: absolute; left: 30px; right: 30px; top: 100px; height: 96px; border-radius: 48px; border: 6px solid #0b0f1a; background: #fff; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 40px; line-height: 84px; padding-left: 84px; color: #0b0f1a; white-space: nowrap; }
    [data-composition-id="%ID%"] .s03-lupa { position: absolute; left: 26px; top: 22px; width: 38px; height: 38px; border: 7px solid #0b0f1a; border-radius: 50%; }
    [data-composition-id="%ID%"] .s03-ch { display: inline-block; opacity: 0; }
    [data-composition-id="%ID%"] .s03-cursor { display: inline-block; width: 5px; height: 44px; background: #0b0f1a; vertical-align: -6px; margin-left: 2px; }
    [data-composition-id="%ID%"] .s03-res { position: absolute; left: 30px; right: 30px; top: 240px; height: 300px; border-radius: 26px; border: 6px solid #0b0f1a; background: #fff; padding: 26px 28px; }
    [data-composition-id="%ID%"] .s03-res b { display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 1.05; color: #0b0f1a; }
    [data-composition-id="%ID%"] .s03-res small { display: block; margin-top: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.06em; color: #1d2f55; }
    [data-composition-id="%ID%"] .s03-res .s03-salto { color: #ff3b30; font-size: 34px; }
    [data-composition-id="%ID%"] .s03-tij { position: absolute; right: 24px; bottom: 20px; width: 120px; height: 120px; }
    [data-composition-id="%ID%"] .s03-ghost { position: absolute; left: 30px; right: 30px; height: 120px; border-radius: 26px; background: rgba(29, 47, 85, 0.12); }
    [data-composition-id="%ID%"] .s03-preg { position: absolute; left: 820px; top: 560px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 230px; line-height: 1; color: #ffc81a; -webkit-text-stroke: 12px #0b0f1a; paint-order: stroke fill; text-shadow: 9px 9px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .s03-sello { left: 120px; top: 1250px; color: #ff3b30; font-size: 92px; }
    [data-composition-id="%ID%"] .s03-tijg { left: 40px; top: 600px; width: 240px; height: 240px; }
"""
tij = f'''<svg viewBox="0 0 120 120"><circle cx="30" cy="92" r="18" fill="none" {S}/><circle cx="90" cy="92" r="18" fill="none" {S}/>
  <path d="M42 80 L96 10 M78 80 L24 10" stroke="{K}" stroke-width="10" stroke-linecap="round"/><path d="M42 80 L96 10 M78 80 L24 10" stroke="{H}" stroke-width="5" stroke-linecap="round"/></svg>'''
pant = f'''<div class="s03-busca"><div class="s03-lupa"></div>{letras}<span class="s03-cursor"></span></div>
  <div class="s03-res"><b>Peluquería Nélida</b><small>Corte y brushing</small><small class="s03-salto">SALTO, URUGUAY</small><div class="s03-tij">{tij}</div></div>
  <div class="s03-ghost" style="top:570px"></div><div class="s03-ghost" style="top:710px"></div>'''
body = f"""
        {celular('s03-cel', 600, 880, pant, 240, 590)}
        <div class="s03-preg">?</div>
        <div class="obj s03-tijg">{tij}</div>
        <div class="sello s03-sello">¿SALTO?</div>
"""
js = """
      const CEL = 0.64, BUSCO = 1.56, SALE = 3.23, PELU = 3.60, SALTO = 4.25;
      const cel = q(".s03-cel");
      // cuadro 0: el celular ya está subiendo
      tl.fromTo(cel, { y: 300, rotation: -8, opacity: 0.6 }, { y: 0, rotation: -2, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      pop(q(".s03-preg"), 0.1, 0.3);
      tl.to(q(".s03-preg"), { rotation: 12, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.4);
      tl.to(q(".s03-preg"), { opacity: 0, x: 120, duration: 0.25 }, BUSCO - 0.2);
      traqueteo(cel, 0.5, 4.6);
      tl.fromTo(q(".s03-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "steps(1)", yoyo: true, repeat: 20 }, 0);
      // escribe
      const chs = qa(".s03-ch");
      chs.forEach((c, i) => tl.set(c, { opacity: 1 }, BUSCO + i * 0.065));
      // el resultado
      gsap.set(q(".s03-res"), { opacity: 0 });
      tl.fromTo(q(".s03-res"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, SALE - 0.05);
      tl.fromTo(qa(".s03-ghost"), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.08, immediateRender: false }, SALE + 0.1);
      pop(q(".s03-tijg"), PELU, 0.3);
      tl.to(q(".s03-tijg"), { rotation: 18, duration: 0.09, yoyo: true, repeat: 9, ease: "sine.inOut" }, PELU + 0.3);
      tl.to(cel, { scale: 1.06, duration: 0.2, ease: "power2.out" }, PELU);
      golpe(q(".s03-sello"), SALTO + 0.08, -7, 2.8);
      sacudon(SALTO + 0.1, 1.3);
      tl.fromTo(q(".s03-salto"), { scale: 1 }, { scale: 1.25, transformOrigin: "0% 50%", duration: 0.12, yoyo: true, repeat: 3, immediateRender: false }, SALTO);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.56, "sfx": "typing", "vol": 0.3, "max": 1.2}, {"t": 3.2, "sfx": "pop", "vol": 0.3},
       {"t": 3.6, "sfx": "click", "vol": 0.25}, {"t": 4.25, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.7}]
escena("s03-buscador", p, 5.29, css, body, js, sfx)
