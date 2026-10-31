from base import *
p = "s14"
css = """
    [data-composition-id="%ID%"] .s14-t1 { top: 470px; font-size: 104px; }
    [data-composition-id="%ID%"] .s14-t2 { top: 570px; font-size: 96px; }
    [data-composition-id="%ID%"] .s14-local { left: 260px; top: 720px; width: 560px; height: 640px; }
    [data-composition-id="%ID%"] .s14-chip { position: absolute; padding: 12px 22px 10px 18px; background: #0e0c10; border: 5px solid #5ce611; border-radius: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.12em; color: #f6f1ea; white-space: nowrap; }
    [data-composition-id="%ID%"] .s14-chip i { display: inline-block; width: 16px; height: 28px; margin-right: 14px; border-right: 6px solid #5ce611; border-bottom: 6px solid #5ce611; transform: rotate(45deg) translateY(-6px); }
"""
rayas = "".join(f'<rect x="{70 + i * 60}" y="290" width="30" height="70" fill="{W}"/>' for i in range(7))
local = f'''<svg viewBox="0 0 560 640" aria-hidden="true">
  <rect x="80" y="260" width="400" height="360" fill="#2a2530" {S}/>
  <path d="M60 290 L500 290 L516 360 L44 360 Z" fill="{K}" {S}/>{rayas}<path d="M60 290 L500 290 L516 360 L44 360 Z" fill="none" {S}/>
  <rect x="110" y="390" width="190" height="190" fill="{V}" opacity="0.18" stroke="{W}" stroke-width="6"/>
  <rect x="330" y="400" width="120" height="210" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="436" cy="510" r="8" fill="{D}"/>
  <rect x="60" y="606" width="440" height="22" fill="{W}" {S}/>
  <g class="s14-saco"><path d="M70 150 Q280 120 490 150 L500 300 Q280 316 60 300 Z" fill="{K}" stroke="{W}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M200 140 L280 250 L360 140" fill="none" stroke="{V}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M280 250 V306" stroke="{W}" stroke-width="4"/><circle cx="296" cy="276" r="7" fill="{V}"/>
    <path class="s14-pesp" d="M84 170 Q280 142 476 170 M74 286 Q280 300 486 286" stroke="{V}" stroke-width="4" stroke-dasharray="10 10" fill="none"/>
    <path d="M400 190 L440 190 L440 210" stroke="{F}" stroke-width="10" fill="none"/></g>
  <g class="s14-cartel"><rect x="160" y="10" width="240" height="120" rx="10" fill="{K}" stroke="{W}" stroke-width="6"/>
    <text x="280" y="62" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="40" fill="{W}">TU</text>
    <text x="280" y="110" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="40" fill="{W}">NEGOCIO</text></g>
  <path class="s14-cinta" d="M20 330 Q280 380 540 330" stroke="{V}" stroke-width="12" fill="none" stroke-linecap="round"/>
</svg>'''
CH = [("stock", 50, 760, -4), ("pedidos", 740, 820, 4), ("proveedores", 30, 1010, 3), ("caja", 800, 1060, -3), ("tus locales", 330, 1390, -2)]
chips = "".join(f'<div class="s14-chip s14-c{i}" style="left:{x}px;top:{y}px;transform:rotate({r}deg)"><i></i>{t.upper()}</div>' for i, (t, x, y, r) in enumerate(CH))
body = f"""
        <div class="rev s14-t1">Hecho</div>
        <div class="rev it v s14-t2">a medida</div>
        <div class="obj s14-local">{local}</div>
        {chips}
"""
js = """
      const SCAL = 0.08, HAC = 0.69, SIS = 1.20, MED = 1.77, STOCK = 2.31, PED = 2.99, PROV = 3.67, CAJA = 4.54, LOC = 5.69;
      // cuadro 0: tu negocio, ahora con un saco a medida
      tl.fromTo(q(".s14-local"), { scale: 0.85, opacity: 0.3, transformOrigin: "50% 100%" }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s14-saco"), { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.3)" }, HAC);
      golpe(q(".s14-t1"), SIS, -2, 2);
      golpe(q(".s14-t2"), MED, 2, 2);
      dibujar(q(".s14-cinta"), MED, 0.5);
      tl.fromTo(q(".s14-pesp"), { strokeDashoffset: 0 }, { strokeDashoffset: -80, duration: 4.5, ease: "none" }, MED);
      const T = [STOCK, PED, PROV, CAJA, LOC - 0.3];
      T.forEach((t, i) => pop(q(".s14-c" + i), t - 0.05, 0.3));
      tl.to(q(".s14-local"), { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1 }, LOC);
      vaiven(q(".s14-cartel"), 2.0, 4.0, { y: -6 }, 0.4);
"""
sfx = [{"t": 0.05, "sfx": "chime", "vol": 0.3}, {"t": 0.7, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 1.75, "sfx": "sparkle", "vol": 0.3},
       {"t": 2.3, "sfx": "ping", "vol": 0.25}, {"t": 2.98, "sfx": "ping", "vol": 0.25}, {"t": 3.66, "sfx": "ping", "vol": 0.25}, {"t": 4.52, "sfx": "ping", "vol": 0.25}, {"t": 5.66, "sfx": "ping", "vol": 0.3}]
escena("s14-scalerics", p, 6.33, css, body, js, sfx)
