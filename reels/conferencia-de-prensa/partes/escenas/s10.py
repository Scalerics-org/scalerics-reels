from base import *
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-jug { left: 360px; top: 640px; width: 360px; height: 620px; }
    [data-composition-id="%ID%"] .s10-ico { position: absolute; width: 220px; height: 200px; }
    [data-composition-id="%ID%"] .s10-luna { left: 70px; top: 620px; }
    [data-composition-id="%ID%"] .s10-cal { left: 790px; top: 620px; }
    [data-composition-id="%ID%"] .s10-cruz { left: 790px; top: 950px; }
    [data-composition-id="%ID%"] .s10-lab { position: absolute; padding: 8px 16px 4px; background: #0d1424; border: 5px solid #ffd447; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; color: #ffd447; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="%ID%"] .s10-l1 { left: 70px; top: 840px; }
    [data-composition-id="%ID%"] .s10-l2 { left: 790px; top: 840px; }
    [data-composition-id="%ID%"] .s10-l3 { left: 760px; top: 1170px; }
    [data-composition-id="%ID%"] .s10-foco { left: 240px; top: 600px; width: 600px; height: 700px; }
"""
luna = f'<svg viewBox="0 0 220 200" aria-hidden="true"><path d="M140 20 A84 84 0 1 0 190 140 A70 70 0 1 1 140 20 Z" fill="{Y}" {S}/><circle cx="40" cy="40" r="6" fill="{B}"/><circle cx="196" cy="60" r="5" fill="{B}"/><circle cx="30" cy="170" r="4" fill="{B}"/></svg>'
cal = f'''<svg viewBox="0 0 220 200" aria-hidden="true"><rect x="20" y="20" width="180" height="170" rx="16" fill="{B}" {S}/><rect x="20" y="20" width="180" height="50" rx="16" fill="{R}" {S}/>
  <path d="M60 10 V40 M160 10 V40" stroke="{K}" stroke-width="10" stroke-linecap="round"/>
  <text x="110" y="150" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="64" fill="{K}">DOM</text></svg>'''
cruz = f'''<svg viewBox="0 0 220 200" aria-hidden="true"><rect x="40" y="20" width="140" height="160" rx="18" fill="{B}" {S}/>
  <path d="M110 50 V150 M60 100 H160" stroke="{R}" stroke-width="30"/>
  <path class="s10-tacha" d="M20 20 L200 180" stroke="{Y}" stroke-width="16" stroke-linecap="round"/></svg>'''
foco = f'<svg viewBox="0 0 600 700" aria-hidden="true"><path d="M250 0 H350 L600 700 H0 Z" fill="{Y}" opacity="0.10"/></svg>'
body = f"""
        <div class="obj s10-foco">{foco}</div>
        <div class="obj s10-jug">{jugador('s10j')}</div>
        <div class="s10-ico s10-luna">{luna}</div>
        <div class="s10-ico s10-cal">{cal}</div>
        <div class="s10-ico s10-cruz">{cruz}</div>
        <div class="s10-lab s10-l1">De noche</div>
        <div class="s10-lab s10-l2">Domingos</div>
        <div class="s10-lab s10-l3">Cero lesiones</div>
"""
js = """
      const ENFRENTE = 0.23, TIENE = 1.05, JUGADOR = 1.29, JUEGA = 1.90, NOCHE = 2.25, DOMINGOS = 3.04, NUNCA = 3.92, LESIONA = 4.45;
      // cuadro 0: el foco y la silueta misteriosa
      tl.fromTo(q(".s10-foco"), { opacity: 0.4 }, { opacity: 1, duration: 0.4 }, 0);
      tl.fromTo(q(".s10-jug"), { opacity: 0.3, scale: 0.9, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0);
      tl.fromTo(q(".s10j-cara"), { scale: 1, svgOrigin: "180 140" }, { scale: 1.2, svgOrigin: "180 140", duration: 0.3, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }, 0.2);
      tl.to(q(".s10-jug"), { y: -20, duration: 0.25, yoyo: true, repeat: 3, ease: "power1.out" }, JUGADOR);
      // patea: juega
      tl.fromTo(q(".s10j-pd"), { rotation: 0, svgOrigin: "220 470" }, { rotation: -35, svgOrigin: "220 470", duration: 0.18, yoyo: true, repeat: 5, ease: "power2.inOut", immediateRender: false }, JUEGA);
      tl.fromTo(q(".s10j-bi"), { rotation: 0, svgOrigin: "70 250" }, { rotation: 30, svgOrigin: "70 250", duration: 0.18, yoyo: true, repeat: 5, ease: "power2.inOut", immediateRender: false }, JUEGA);
      pop(q(".s10-luna"), NOCHE - 0.05, 0.35);
      pop(q(".s10-l1"), NOCHE + 0.2, 0.3);
      tl.to(q(".s10-luna"), { rotation: -10, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, NOCHE + 0.4);
      pop(q(".s10-cal"), DOMINGOS - 0.1, 0.35);
      pop(q(".s10-l2"), DOMINGOS + 0.15, 0.3);
      pop(q(".s10-cruz"), NUNCA, 0.35);
      tl.fromTo(q(".s10-tacha"), { strokeDasharray: 250, strokeDashoffset: 250 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, LESIONA);
      pop(q(".s10-l3"), LESIONA + 0.2, 0.3);
      tl.to(q(".s10-jug"), { rotation: 4, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, LESIONA);
"""
sfx = [{"t": 0.0, "sfx": "riser", "vol": 0.2, "max": 1.2}, {"t": 1.3, "sfx": "click-soft", "vol": 0.22}, {"t": 2.2, "sfx": "pop", "vol": 0.26},
       {"t": 3.0, "sfx": "pop", "vol": 0.26}, {"t": 3.9, "sfx": "pop", "vol": 0.26}, {"t": 4.5, "sfx": "whoosh-short", "vol": 0.22}]
escena("s10-jugador", p, 5.32, css, body, js, sfx)
