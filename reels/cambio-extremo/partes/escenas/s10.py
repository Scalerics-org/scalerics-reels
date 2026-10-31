from base import *
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-cam { left: 40px; top: 930px; width: 1000px; height: 560px; }
    [data-composition-id="%ID%"] .s10-mon { left: 20px; top: 1080px; width: 280px; height: 504px; }
    [data-composition-id="%ID%"] .s10-t1 { top: 560px; font-size: 150px; }
    [data-composition-id="%ID%"] .s10-t2 { top: 700px; font-size: 120px; }
    [data-composition-id="%ID%"] .s10-t3 { top: 810px; font-size: 150px; }
    [data-composition-id="%ID%"] .s10-lona { left: 290px; top: 620px; width: 500px; height: 880px; }
    [data-composition-id="%ID%"] .s10-humo { left: 0; top: 1200px; width: 400px; height: 300px; }
"""
lona = f'''<svg viewBox="0 0 500 880" aria-hidden="true">
  <rect x="50" y="40" width="400" height="800" rx="56" fill="{K}" stroke="{W}" stroke-width="8"/>
  <path class="s10-tela" d="M20 60 Q250 -10 480 60 L500 860 Q380 820 250 870 Q120 820 0 860 Z" fill="{N}" {S}/>
  <path class="s10-tela" d="M120 60 L90 860 M250 30 L250 870 M380 60 L410 860" stroke="{K}" stroke-width="5" opacity="0.35"/>
  <text class="s10-tela" x="250" y="520" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="220" fill="{W}" stroke="{K}" stroke-width="10" paint-order="stroke fill">?</text>
</svg>'''
humo = f'<svg viewBox="0 0 400 300">' + "".join(f'<circle class="s10-h" cx="{x}" cy="{y}" r="{r}" fill="{W}" opacity="0.7" {S}/>' for x, y, r in [(300, 200, 40), (220, 170, 54), (130, 140, 66), (60, 200, 44)]) + '</svg>'
body = f"""
        <div class="obj s10-lona">{lona}</div>
        <div class="obj s10-cam">{camion('s10k')}</div>
        <div class="obj s10-humo">{humo}</div>
        <div class="fig s10-mon">{monica('s10m')}</div>
        <div class="big w s10-t1" data-layout-allow-overlap>¡Mové</div>
        <div class="big y s10-t2" data-layout-allow-overlap>ese</div>
        <div class="big n s10-t3" data-layout-allow-overlap>camión!</div>
"""
js = """
      const MOVE = 1.02, ESE = 1.32, CAMION = 1.62, ARRANCA = 1.9, LONA = 3.5;
      // cuadro 0: el camión del programa tapa todo, Mónica nerviosa
      gsap.set(q(".s10-cam"), { opacity: 1 });
      tl.fromTo(q(".s10-cam"), { x: -60 }, { x: 0, duration: 0.5, ease: "power2.out" }, 0);
      tl.to(q(".s10-cam"), { y: -6, duration: 0.08, yoyo: true, repeat: 21, ease: "sine.inOut" }, 0);
      tl.to(q(".s10m-bi"), { rotation: -150, svgOrigin: "152 300", duration: 0.3, ease: "back.out(2)" }, 0.1);
      tl.to(q(".s10m-bd"), { rotation: 150, svgOrigin: "248 300", duration: 0.3, ease: "back.out(2)" }, 0.15);
      tl.to(q(".s10-mon"), { y: -16, duration: 0.12, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0.2);
      // MOVÉ ESE CAMIÓN
      golpe(q(".s10-t1"), MOVE, -4, 3); sacudon(MOVE + 0.03, 1.2);
      golpe(q(".s10-t2"), ESE, 3, 3); sacudon(ESE + 0.03, 1.0);
      golpe(q(".s10-t3"), CAMION, -3, 3.2); sacudon(CAMION + 0.04, 2);
      // arranca y se va
      gsap.set(qa(".s10-h"), { opacity: 0 });
      qa(".s10-h").forEach((h, i) => tl.fromTo(h, { opacity: 0.8, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.8, x: -80, duration: 0.8, ease: "power2.out", immediateRender: false }, ARRANCA - 0.2 + i * 0.08));
      qa(".s10k-rueda").forEach((r) => tl.to(r, { rotation: 720, svgOrigin: r.dataset.c, duration: 1.2, ease: "power2.in" }, ARRANCA));
      tl.to(q(".s10-cam"), { x: 1500, duration: 1.0, ease: "power3.in" }, ARRANCA + 0.15);
      tl.to([q(".s10-t1"), q(".s10-t2"), q(".s10-t3")], { opacity: 0, y: -80, duration: 0.25, stagger: 0.05, ease: "power2.in" }, ARRANCA + 0.6);
      tl.to(q(".s10-mon"), { x: -50, scale: 0.9, transformOrigin: "50% 100%", duration: 0.4 }, ARRANCA + 0.8);
      // detrás: algo tapado con una lona
      gsap.set(q(".s10-lona"), { opacity: 0 });
      tl.to(q(".s10-lona"), { opacity: 1, duration: 0.2 }, ARRANCA + 0.5);
      tl.fromTo(q(".s10-lona"), { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "sine.inOut" }, ARRANCA + 1.0);
      tl.to(qa(".s10-tela"), { y: 1100, rotation: 10, svgOrigin: "250 440", duration: 0.45, ease: "power3.in" }, LONA);
      tl.to(q(".s10-lona"), { scale: 1.08, duration: 0.3, ease: "power2.out" }, LONA + 0.4);
"""
sfx = [{"t": 0.05, "sfx": "riser", "vol": 0.22, "max": 1.0}, {"t": 1.0, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 1.3, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5},
       {"t": 1.6, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.95, "sfx": "whoosh-cinematic", "vol": 0.35, "max": 1.4}, {"t": 3.5, "sfx": "whoosh", "vol": 0.3, "max": 0.5}]
escena("s10-camion", p, 4.35, css, body, js, sfx)
