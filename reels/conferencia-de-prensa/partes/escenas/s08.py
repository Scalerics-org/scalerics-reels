from base import *
p = "s08"
css = """
    [data-composition-id="%ID%"] .s08-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s08-camp { left: 60px; top: 600px; width: 260px; height: 260px; }
    [data-composition-id="%ID%"] .s08-mate { left: 760px; top: 600px; width: 280px; height: 320px; }
    [data-composition-id="%ID%"] .s08-sello { top: 1040px; font-size: 92px; color: #6cc4ff; }
    [data-composition-id="%ID%"] .s08-q { position: absolute; left: 70px; top: 880px; padding: 8px 18px 4px; background: #0d1424; border: 5px solid #ffd447; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; color: #ffd447; white-space: nowrap; }
"""
camp = f'''<svg viewBox="0 0 260 260" aria-hidden="true"><circle cx="130" cy="130" r="118" fill="{K}" stroke="{B}" stroke-width="7"/>
  <path d="M80 170 Q90 150 90 120 Q90 74 130 70 Q170 74 170 120 Q170 150 180 170 Z" fill="{Y}" stroke="{B}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M114 182 Q130 202 146 182" stroke="{B}" stroke-width="6" fill="none"/>
  <path class="s08-tacha" d="M50 50 L210 210" stroke="{R}" stroke-width="18" stroke-linecap="round"/></svg>'''
mate = f'''<svg viewBox="0 0 280 320" aria-hidden="true">
  <rect x="150" y="40" width="90" height="250" rx="22" fill="{B}" stroke="{K}" stroke-width="6"/><rect x="164" y="20" width="62" height="30" rx="8" fill="{N}" stroke="{K}" stroke-width="5"/>
  <path d="M150 120 H240" stroke="{N}" stroke-width="8"/>
  <path d="M30 170 Q20 290 90 296 Q160 290 150 170 Q150 140 90 140 Q30 140 30 170 Z" fill="{Y}" stroke="{K}" stroke-width="6"/>
  <ellipse cx="90" cy="160" rx="56" ry="16" fill="#3d6b2a" stroke="{K}" stroke-width="5"/>
  <path d="M100 160 L140 40" stroke="{B}" stroke-width="10" stroke-linecap="round"/><path d="M100 160 L140 40" stroke="{K}" stroke-width="3"/>
</svg>'''
body = f"""
        <div class="fig s08-dt">{profe('s08p')}</div>
        <div class="obj s08-camp">{camp}</div>
        <div class="s08-q">"querido"</div>
        <div class="obj s08-mate">{mate}</div>
        <div class="sello centro s08-sello">Era domingo</div>
"""
js = """
      const TENIA = 0.19, SILENCIO = 0.48, QUERIDO = 0.66, ERA = 1.76, DOMINGO = 1.90;
      brazoSet("s08p", "i", 8); brazoSet("s08p", "d", -8);
      habla(".s08p-boca", 0.0, 2.6, "230 262");
      tl.fromTo(q(".s08-dt"), { rotation: -3 }, { rotation: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      vaiven(q(".s08-dt"), 0.3, 2.6, { rotation: -1.5 }, 0.5);
      // sobrador: cejas arriba
      tl.to(q(".s08p-cejas"), { y: -10, duration: 0.2 }, 0.1);
      pop(q(".s08-camp"), SILENCIO - 0.15, 0.3);
      tl.fromTo(q(".s08-tacha"), { strokeDasharray: 230, strokeDashoffset: 230 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, SILENCIO + 0.15);
      pop(q(".s08-q"), QUERIDO + 0.1, 0.25);
      // era domingo: aparece el mate
      brazo("s08p", "d", -50, ERA - 0.1);
      pop(q(".s08-mate"), ERA - 0.05, 0.35);
      tl.to(q(".s08-mate"), { rotation: -5, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, ERA + 0.4);
      golpe(q(".s08-sello"), DOMINGO + 0.1, -4, 2.4);
      sacudon(DOMINGO + 0.15, 1.2);
"""
sfx = [{"t": 0.0, "sfx": "click", "vol": 0.25}, {"t": 0.4, "sfx": "pop", "vol": 0.25}, {"t": 0.65, "sfx": "error", "vol": 0.0, "max": 0.1},
       {"t": 0.62, "sfx": "click-soft", "vol": 0.25}, {"t": 1.7, "sfx": "pop", "vol": 0.28}, {"t": 1.95, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s08-silencio", p, 3.12, css, body, js, [s for s in sfx if s["vol"] > 0])
