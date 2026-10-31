from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-hoy { left: 110px; top: 800px; }
    [data-composition-id="%ID%"] .s04-fut { left: 690px; top: 900px; }
    [data-composition-id="%ID%"] .s04-b { position: absolute; top: 0; width: 210px; height: 104px; border: 6px solid #120621; border-radius: 12px; background: #22e4ff; box-shadow: 6px 6px 0 #7b2ff7;
      font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 92px; text-align: center; color: #120621; }
    [data-composition-id="%ID%"] .s04-b::before { content: ""; position: absolute; left: 12px; right: 12px; top: 10px; bottom: 10px; border: 3px dashed #120621; border-radius: 8px; opacity: 0.5; }
    [data-composition-id="%ID%"] .s04-flecha { left: 560px; top: 560px; width: 460px; height: 340px; }
"""
billetes = "".join(f'<div class="s04-b" style="left:{x}px">US$</div>' for x in [20, 240, 470, 700, 860, 120, 380, 600, 820, 300])
flecha = f'<svg viewBox="0 0 460 340"><path d="M20 310 L120 220 L190 260 L300 120 L360 150 L430 40" fill="none" stroke="{K}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/><path class="s04-fl" d="M20 310 L120 220 L190 260 L300 120 L360 150 L430 40" fill="none" stroke="{N}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M370 36 L436 30 L440 96" fill="none" stroke="{N}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>'
body = f"""
        <div class="fig s04-fut">{futuro('s04f')}</div>
        <div class="fig s04-hoy">{hoy('s04h')}</div>
        <div class="obj s04-flecha">{flecha}</div>
        {billetes}
"""
js = """
      const VINISTE = 0.36, DECIRME = 1.34, DOL = 2.27;
      const hoy = q(".s04-hoy");
      gsap.set(hoy, { scale: 1.1, transformOrigin: "50% 100%" });
      gsap.set(q(".s04-fut"), { scale: 0.75, transformOrigin: "50% 100%" });
      // brazos cruzados, ojos entrecerrados
      tl.fromTo(q(".s04h-bi"), { rotation: 0, svgOrigin: "150 292" }, { rotation: -50, svgOrigin: "150 292", duration: 0.25, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s04h-bd"), { rotation: 0, svgOrigin: "250 292" }, { rotation: 50, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, 0.05);
      tl.fromTo(q(".s04h-ojos"), { scaleY: 1, svgOrigin: "200 196" }, { scaleY: 0.3, svgOrigin: "200 196", duration: 0.2 }, VINISTE);
      tl.fromTo(hoy, { rotation: 0 }, { rotation: -4, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3);
      tl.to(hoy, { x: 60, duration: 0.3, ease: "power2.out" }, DECIRME);
      // dólares: lluvia de billetes y la cotización que sube
      const bs = qa(".s04-b");
      bs.forEach((b, i) => { gsap.set(b, { opacity: 0 }); const t = DOL - 0.1 + (i % 5) * 0.07 + Math.floor(i / 5) * 0.2;
        tl.fromTo(b, { opacity: 1, y: 420 + (i % 3) * 30, rotation: -30 + i * 9 }, { opacity: 1, y: 1500, rotation: 20 - i * 7, duration: 1.3, ease: "power1.in", immediateRender: false }, t); });
      gsap.set(q(".s04-flecha"), { opacity: 0 });
      tl.set(q(".s04-flecha"), { opacity: 1 }, DOL);
      tl.fromTo(q(".s04-fl"), { strokeDasharray: 800, strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out", immediateRender: false }, DOL);
      sacudon(DOL + 0.05, 1);
      // el futuro niega con la cabeza
      tl.to(q(".s04f-cabeza"), { rotation: 8, svgOrigin: "200 250", duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOL + 0.1);
"""
sfx = [{"t": 0.1, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.2, "sfx": "chime", "vol": 0.25}, {"t": 2.4, "sfx": "click-soft", "vol": 0.25}]
escena("s04-dolares", p, 3.41, css, body, js, sfx)
