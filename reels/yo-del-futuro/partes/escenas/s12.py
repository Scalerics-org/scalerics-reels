from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-no { top: 600px; font-size: 300px; }
    [data-composition-id="%ID%"] .s12-fut { left: 40px; top: 800px; }
    [data-composition-id="%ID%"] .s12-locs { left: 430px; top: 760px; width: 620px; height: 680px; }
    [data-composition-id="%ID%"] .s12-ag { left: 560px; top: 760px; }
    [data-composition-id="%ID%"] .s12-tag { left: 50%; top: 580px; width: 880px; margin-left: -440px; text-align: center; font-size: 72px; color: #22e4ff; }
"""
def loc(x, h, col, i):
    y = 640 - h
    return f'''<g class="s12-l s12-l{i}"><rect x="{x}" y="{y}" width="170" height="{h}" fill="#2a1046" {S}/>
    <path d="M{x - 8} {y} H{x + 178} L{x + 168} {y + 40} H{x + 2} Z" fill="{col}" {S}/>
    <rect x="{x + 22}" y="{y + 64}" width="126" height="{max(40, h - 160)}" fill="{C}" opacity="0.35" stroke="{col}" stroke-width="5"/>
    <rect x="{x + 60}" y="{640 - 70}" width="50" height="70" fill="{K}" stroke="{col}" stroke-width="5"/></g>'''
locs = f'''<svg viewBox="0 0 620 680" aria-hidden="true">{loc(20, 200, N, 1)}{loc(220, 330, M, 2)}{loc(420, 470, C, 3)}
  <path class="s12-fl" d="M40 420 Q300 300 560 60" fill="none" stroke="{K}" stroke-width="34" stroke-linecap="round"/>
  <path class="s12-fl" d="M40 420 Q300 300 560 60" fill="none" stroke="{N}" stroke-width="20" stroke-linecap="round"/>
  <path class="s12-pt" d="M500 50 L570 46 L566 116" fill="none" stroke="{N}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>'''
body = f"""
        <div class="fig s12-fut">{futuro('s12f')}</div>
        <div class="obj s12-locs">{locs}</div>
        <div class="fig s12-ag">{agente('s12a')}</div>
        <div class="big nj s12-no"><span>No.</span></div>
        <div class="sello s12-tag">Empleado de IA</div>
"""
js = """
      const NO = 0.0, VENGO = 0.97, CREC = 2.35, TIENEN = 3.44, EMPL = 3.74, IA = 4.52;
      const fut = q(".s12-fut");
      gsap.set(fut, { scale: 1.05, transformOrigin: "50% 100%" });
      gsap.set(q(".s12-no"), { opacity: 1, scale: 1.4, rotation: -6 });
      tl.to(q(".s12-no"), { scale: 1, duration: 0.14, ease: "power4.in" }, 0.02);
      sacudon(0.16, 1.6);
      tl.to(q(".s12-no"), { scale: 1.05, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.3);
      tl.to(q(".s12f-bd"), { rotation: -70, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, 0.05);
      habla(".s12f-boca", 0.9, 4.4, "200 244");
      tl.to(q(".s12-no"), { opacity: 0, y: -80, scale: 0.6, duration: 0.22, ease: "power2.in" }, VENGO);
      // los que crecieron: locales que suben como escalones
      qa(".s12-l").forEach((l, i) => { gsap.set(l, { opacity: 0 }); tl.fromTo(l, { opacity: 1, scaleY: 0, svgOrigin: "300 640" }, { opacity: 1, scaleY: 1, svgOrigin: "300 640", duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, CREC - 0.6 + i * 0.22); });
      gsap.set(qa(".s12-fl"), { opacity: 0 }); gsap.set(q(".s12-pt"), { opacity: 0 });
      qa(".s12-fl").forEach((f) => { tl.set(f, { opacity: 1 }, CREC); tl.fromTo(f, { strokeDasharray: 700, strokeDashoffset: 700 }, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, CREC); });
      tl.set(q(".s12-pt"), { opacity: 1 }, CREC + 0.33);
      sacudon(CREC + 0.35, 1);
      // tienen un empleado de IA: el holograma se arma
      tl.to(q(".s12-locs"), { opacity: 0, scale: 0.7, x: 200, duration: 0.25, ease: "power2.in" }, TIENEN);
      gsap.set(q(".s12-ag"), { opacity: 0 });
      tl.fromTo(q(".s12-ag"), { opacity: 1, scaleY: 0.02, scaleX: 1.3, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, scaleX: 1, duration: 0.35, ease: "power3.out", immediateRender: false }, EMPL - 0.1);
      tl.fromTo(q(".s12a-lineas"), { y: -40 }, { y: 40, duration: 0.5, ease: "none", repeat: 3, immediateRender: false }, EMPL);
      tl.to(q(".s12-ag"), { opacity: 0.6, duration: 0.05, yoyo: true, repeat: 5, ease: "steps(1)" }, EMPL + 0.25);
      tl.to(q(".s12a-bd"), { rotation: -140, svgOrigin: "252 300", duration: 0.25, ease: "back.out(2)" }, IA - 0.2);
      tl.to(q(".s12a-bd"), { rotation: -110, svgOrigin: "252 300", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, IA + 0.05);
      golpe(q(".s12-tag"), IA, -4, 2.4);
      sacudon(IA + 0.05, 1.2);
      tl.to(fut, { rotation: 4, duration: 0.3, yoyo: true, repeat: 1 }, IA);
"""
sfx = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.8, "sfx": "whoosh", "vol": 0.22, "max": 0.5}, {"t": 2.4, "sfx": "chime", "vol": 0.25},
       {"t": 3.6, "sfx": "glitch-3", "vol": 0.3, "max": 0.6}, {"t": 4.0, "sfx": "sparkle", "vol": 0.3}, {"t": 4.5, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}]
escena("s12-giro", p, 5.57, css, body, js, sfx)
