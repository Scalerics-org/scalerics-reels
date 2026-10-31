from base import *
p = "s10"
nums = "".join(f'<span class="s10-n">{n:03d}</span>' for n in range(38, 58))
css = """
    [data-composition-id="%ID%"] .s10-pas { left: -20px; top: 900px; }
    [data-composition-id="%ID%"] .s10-senor { top: 560px; font-size: 170px; }
    [data-composition-id="%ID%"] .s10-tm { position: absolute; left: 430px; top: 880px; width: 600px; height: 300px; border-radius: 24px; background: #160406; border: 10px solid #0b0f1a; box-shadow: 0 0 0 6px #3a0d10, 0 0 90px rgba(255, 59, 48, 0.6); }
    [data-composition-id="%ID%"] .s10-tm small { position: absolute; left: 30px; top: 20px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 34px; letter-spacing: 0.24em; color: #ff3b30; }
    [data-composition-id="%ID%"] .s10-n { position: absolute; right: 36px; top: 70px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 190px; line-height: 200px; color: #ff3b30; text-shadow: 0 0 30px rgba(255, 59, 48, 0.9); opacity: 0; }
    [data-composition-id="%ID%"] .s10-fl { left: 760px; top: 1200px; width: 220px; height: 280px; }
"""
fl = f'<svg viewBox="0 0 220 280"><path d="M110 10 L200 120 L150 120 L150 270 L70 270 L70 120 L20 120 Z" fill="{R}" {S}/></svg>'
body = f"""
        <div class="fig s10-pas">{pasajera('s10p')}</div>
        <div class="big l s10-senor">¡SEÑOR!</div>
        <div class="s10-tm"><small>FICHAS</small>{nums}</div>
        <div class="obj s10-fl">{fl}</div>
"""
js = """
      const FICHA = 0.65, SUBE = 1.20;
      const pas = q(".s10-pas");
      tl.fromTo(pas, { x: -200, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.2 }, 0);
      habla(".s10p-boca", 0, 2.2, "250 386");
      tl.to(q(".s10p-ceja"), { y: 10, duration: 0.1 }, 0);
      tl.to(q(".s10p-cabeza"), { rotation: 4, svgOrigin: "250 420", duration: 0.06, yoyo: true, repeat: 21, ease: "none" }, 0.1);
      golpe(q(".s10-senor"), 0.05, -5, 3);
      sacudon(0.08, 1.6);
      tl.fromTo(q(".s10-tm"), { scale: 0.7, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, 0);
      const ns = qa(".s10-n");
      gsap.set(ns[0], { opacity: 1 });
      ns.forEach((n, i) => { if (!i) return; const t = FICHA + i * 0.08; tl.set(ns[i - 1], { opacity: 0 }, t); tl.set(n, { opacity: 1 }, t); });
      tl.to(q(".s10-tm"), { scale: 1.06, duration: 0.07, yoyo: true, repeat: 17, ease: "none" }, FICHA);
      gsap.set(q(".s10-fl"), { opacity: 0 });
      tl.fromTo(q(".s10-fl"), { opacity: 1, y: 200 }, { opacity: 1, y: -60, duration: 0.3, ease: "back.out(2)", immediateRender: false }, SUBE);
      tl.to(q(".s10-fl"), { y: -90, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, SUBE + 0.3);
      sacudon(SUBE + 0.05, 1.3);
"""
sfx = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}, {"t": 0.65, "sfx": "typing", "vol": 0.35, "max": 1.4}, {"t": 1.2, "sfx": "riser", "vol": 0.25, "max": 1.0}]
escena("s10-ficha", p, 2.44, css, body, js, sfx)
