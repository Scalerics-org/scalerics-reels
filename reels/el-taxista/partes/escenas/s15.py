from base import *
p = "s15"
css = """
    [data-composition-id="%ID%"] .s15-manda { top: 560px; font-size: 140px; }
    [data-composition-id="%ID%"] .s15-a { left: 0; right: 0; top: 720px; text-align: center; font-size: 38px; color: #f4ecd8; letter-spacing: 0.16em; }
    [data-composition-id="%ID%"] .s15-loc { left: 300px; top: 860px; width: 480px; height: 480px; }
    [data-composition-id="%ID%"] .s15-preg { position: absolute; left: 760px; top: 800px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 200px; line-height: 1; color: #ffc81a; -webkit-text-stroke: 12px #0b0f1a; paint-order: stroke fill; text-shadow: 8px 8px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .s15-avion { left: 0; top: 0; width: 200px; height: 160px; }
    [data-composition-id="%ID%"] .s15-nadie { left: 170px; top: 1360px; color: #ffc81a; font-size: 50px; }
"""
avion = f'<svg viewBox="0 0 200 160"><path d="M10 80 L190 10 L140 150 L100 100 Z" fill="{G}" {S}/><path d="M100 100 L190 10 L80 92" fill="{C}" {S}/></svg>'
body = f"""
        <div class="big v s15-manda">MANDÁSELO</div>
        <div class="mono s15-a">A ESE LOCAL</div>
        <div class="obj s15-loc">{local('s15l', '¿DÓNDE QUEDA?', A, luz=False)}</div>
        <div class="s15-preg">?</div>
        <div class="obj s15-avion">{avion}</div>
        <div class="sello s15-nadie">QUE NADIE ENCUENTRA</div>
"""
js = """
      const ESE = 1.0, NADIE = 1.81, ENC = 2.18;
      golpe(q(".s15-manda"), 0.1, -3, 2.4);
      sacudon(0.12, 1);
      tl.to(q(".s15-manda"), { scale: 1.05, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.5);
      tl.fromTo(q(".s15-loc"), { y: 80, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      pop(q(".s15-a"), ESE - 0.05, 0.25);
      // el avioncito de papel va al local
      const av = q(".s15-avion");
      gsap.set(av, { x: -260, y: 1300, rotation: -20, opacity: 1 });
      tl.to(av, { x: 300, y: 1000, rotation: -10, duration: 0.6, ease: "power1.out" }, 0.3);
      tl.to(av, { x: 560, y: 860, rotation: 0, scale: 0.6, duration: 0.5, ease: "power1.in" }, 0.9);
      tl.to(av, { opacity: 0, duration: 0.1 }, 1.4);
      tl.fromTo(q(".s15-loc"), { scale: 1 }, { scale: 1.06, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, 1.4);
      pop(q(".s15-preg"), NADIE - 0.1, 0.3);
      tl.to(q(".s15-preg"), { rotation: 14, duration: 0.3, yoyo: true, repeat: 11, ease: "sine.inOut" }, NADIE + 0.25);
      golpe(q(".s15-nadie"), ENC, -3, 2.4);
      tl.to(q(".s15-nadie"), { y: -8, duration: 0.45, yoyo: true, repeat: 7, ease: "sine.inOut" }, ENC + 0.3);
"""
sfx = [{"t": 0.1, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 0.3, "sfx": "whoosh", "vol": 0.25, "max": 0.8}, {"t": 1.4, "sfx": "pop", "vol": 0.3},
       {"t": 1.75, "sfx": "click", "vol": 0.25}, {"t": 2.18, "sfx": "chime", "vol": 0.3}]
escena("s15-cta", p, 6.01, css, body, js, sfx)
