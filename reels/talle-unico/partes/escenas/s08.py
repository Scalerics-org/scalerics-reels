from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-pan { left: 120px; top: 680px; }
    [data-composition-id="%ID%"] .s08-en { left: 500px; top: 640px; font-size: 96px; color: #ff2e88; }
    [data-composition-id="%ID%"] .s08-imp { left: 560px; top: 850px; }
    [data-composition-id="%ID%"] .s08-barco { left: 590px; top: 1030px; width: 380px; height: 220px; }
    [data-composition-id="%ID%"] .s08-biz { left: 560px; top: 1050px; width: 420px; height: 260px; }
    [data-composition-id="%ID%"] .s08-vb { top: 470px; font-size: 120px; }
"""
barco = f'''<svg viewBox="0 0 380 220" aria-hidden="true"><path d="M20 130 L360 130 L320 200 L60 200 Z" fill="{G}" {S}/>
  <rect x="70" y="70" width="70" height="60" fill="{F}" {S}/><rect x="140" y="70" width="70" height="60" fill="{D}" {S}/><rect x="210" y="70" width="70" height="60" fill="{W}" {S}/>
  <rect x="105" y="14" width="70" height="56" fill="{D}" {S}/><rect x="175" y="14" width="70" height="56" fill="{F}" {S}/>
  <path d="M0 214 Q30 200 60 214 T120 214 T180 214 T240 214 T300 214 T360 214" stroke="{W}" stroke-width="5" fill="none"/></svg>'''
cro = lambda x, y: f'<path d="M{x-60} {y+10} Q{x-40} {y-40} {x} {y-44} Q{x+40} {y-40} {x+60} {y+10} Q{x+30} {y} {x} {y+6} Q{x-30} {y} {x-60} {y+10} Z" fill="{D}" {S}/><path d="M{x-24} {y-36} L{x-14} {y+2} M{x} {y-44} V{y+4} M{x+24} {y-36} L{x+14} {y+2}" stroke="{K}" stroke-width="4"/>'
biz = f'''<svg viewBox="0 0 420 260" aria-hidden="true"><ellipse cx="210" cy="190" rx="200" ry="50" fill="{W}" {S}/>
  <g class="s08-cr">{cro(130, 170)}</g><g class="s08-cr">{cro(280, 170)}</g><g class="s08-cr">{cro(205, 130)}</g></svg>'''
body = f"""
        <div class="fig s08-pan">{panadera('s08a')}</div>
        <div class="sello s08-en">Enorme</div>
        {tag('s08-imp', 'Importación', 'módulo · pagado', rot=6)}
        <div class="obj s08-barco">{barco}</div>
        <div class="obj s08-biz">{biz}</div>
        <div class="rev it d s08-vb">vendés bizcochos.</div>
"""
js = """
      const EN = 0.43, MOD = 1.40, IMP = 1.87, MI = 3.33, VEN = 3.73, BIZ = 4.40;
      const pn = q(".s08-pan");
      // cuadro 0: la panadera perdida adentro del tapado
      gsap.set(pn, { scale: 1.1, transformOrigin: "50% 100%" });
      tl.fromTo(pn, { y: 30 }, { y: 0, duration: 0.3 }, 0);
      tl.to(q(".s08a-abrigo"), { scale: 1.18, svgOrigin: "200 716", duration: 0.35, ease: "back.out(2)" }, EN - 0.05);
      tl.to(q(".s08a-cabeza"), { y: 40, duration: 0.35, ease: "power2.inOut" }, EN);
      golpe(q(".s08-en"), EN, 8, 2.6);
      sacudon(EN + 0.04, 1.2);
      tl.to(q(".s08a-mangas"), { rotation: -6, svgOrigin: "200 300", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, EN + 0.3);
      // módulo de importación (y un barco)
      tl.to(q(".s08-en"), { opacity: 0, y: -40, duration: 0.2 }, MOD - 0.2);
      gsap.set(q(".s08-imp"), { transformOrigin: "100% 50%" });
      golpe(q(".s08-imp"), MOD + 0.05, 6, 2.2);
      entra(q(".s08-barco"), IMP - 0.1, { x: 600 }, 0.4);
      tl.to(q(".s08-barco"), { y: -8, rotation: 2, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, IMP + 0.3);
      // mi amor, vendés bizcochos
      tl.to([q(".s08-imp"), q(".s08-barco")], { opacity: 0, x: 200, duration: 0.25, ease: "power2.in" }, MI - 0.1);
      pop(q(".s08-biz"), VEN - 0.15, 0.35);
      qa(".s08-cr").forEach((c, i) => tl.fromTo(c, { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "bounce.out", immediateRender: false }, VEN + i * 0.12));
      golpe(q(".s08-vb"), BIZ, -3, 2.2);
      tl.to(q(".s08-vb"), { scale: 1.04, duration: 0.15, yoyo: true, repeat: 3 }, BIZ + 0.2);
"""
sfx = [{"t": 0.38, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 1.4, "sfx": "click", "vol": 0.3}, {"t": 1.85, "sfx": "whoosh", "vol": 0.25, "max": 0.5},
       {"t": 3.6, "sfx": "pop", "vol": 0.3}, {"t": 3.85, "sfx": "pop", "vol": 0.25}, {"t": 4.38, "sfx": "sparkle", "vol": 0.3}]
escena("s08-enorme", p, 5.55, css, body, js, sfx)
