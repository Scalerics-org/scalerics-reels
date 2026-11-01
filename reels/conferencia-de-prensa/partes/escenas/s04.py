from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-dt { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s04-cancha { left: 30px; top: 600px; width: 330px; height: 260px; }
    [data-composition-id="%ID%"] .s04-dolar { left: 720px; top: 590px; width: 330px; height: 280px; }
    [data-composition-id="%ID%"] .s04-lab { position: absolute; padding: 8px 18px 4px; background: #0d1424; border: 5px solid currentColor; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; line-height: 1; white-space: nowrap; text-transform: uppercase; }
    [data-composition-id="%ID%"] .s04-l1 { left: 50px; top: 880px; color: #6cc4ff; }
    [data-composition-id="%ID%"] .s04-l2 { left: 760px; top: 880px; color: #ffd447; }
    [data-composition-id="%ID%"] .s04-sello { top: 1050px; font-size: 76px; color: #ffd447; }
"""
cancha = f'''<svg viewBox="0 0 330 260" aria-hidden="true">
  <rect x="10" y="10" width="310" height="230" rx="12" fill="{N}" {S}/>
  <path d="M165 10 V240 M10 80 H50 V170 H10 M320 80 H280 V170 H320" stroke="{B}" stroke-width="5" fill="none"/>
  <circle cx="165" cy="125" r="40" stroke="{B}" stroke-width="5" fill="none"/>
  <g class="s04-charcos"><ellipse cx="96" cy="70" rx="40" ry="16" fill="{C}" stroke="{K}" stroke-width="4"/><ellipse cx="230" cy="190" rx="52" ry="20" fill="{C}" stroke="{K}" stroke-width="4"/><ellipse cx="200" cy="64" rx="26" ry="11" fill="{C}" stroke="{K}" stroke-width="4"/></g>
  <g class="s04-pelota"><circle cx="110" cy="176" r="22" fill="{B}" {S}/><path d="M100 168 L110 160 L120 168 L116 180 L104 180 Z" fill="{K}"/></g>
</svg>'''
dolar = f'''<svg viewBox="0 0 330 280" aria-hidden="true">
  <rect x="20" y="90" width="230" height="130" rx="12" fill="{B}" {S}/>
  <rect x="36" y="106" width="198" height="98" rx="8" fill="none" stroke="{N}" stroke-width="4"/>
  <text x="135" y="178" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="62" fill="{N}">US$</text>
  <path class="s04-flecha" d="M150 250 L230 150 L270 180 L310 40" stroke="{R}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="s04-punta" d="M280 46 L318 26 L316 70 Z" fill="{R}" stroke="{K}" stroke-width="4"/>
</svg>'''
body = f"""
        <div class="fig s04-dt">{profe('s04p')}</div>
        <div class="obj s04-cancha">{cancha}</div>
        <div class="obj s04-dolar">{dolar}</div>
        <div class="s04-lab s04-l1">Cancha pesada</div>
        <div class="s04-lab s04-l2">El dólar</div>
        <div class="sello centro s04-sello">¡No se puede jugar!</div>
"""
js = """
      const CANCHA = 0.55, PESADA = 1.20, DOLAR = 2.68, VISTE = 2.87, NO = 3.33, JUGAR = 3.88;
      brazoSet("s04p", "i", 8); brazoSet("s04p", "d", -8);
      habla(".s04p-boca", 0.0, 4.3, "230 262");
      vaiven(q(".s04-dt"), 0.1, 4.6, { rotation: -1.5 }, 0.5);
      tl.fromTo(q(".s04-dt"), { scale: 0.96 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      // la cancha pesada
      brazo("s04p", "i", 70, CANCHA - 0.1);
      pop(q(".s04-cancha"), CANCHA - 0.05, 0.35);
      pop(q(".s04-l1"), PESADA, 0.3);
      tl.fromTo(q(".s04-charcos"), { scale: 0.7, svgOrigin: "165 125" }, { scale: 1.1, svgOrigin: "165 125", duration: 0.5, ease: "back.out(2)", immediateRender: false }, PESADA);
      tl.to(q(".s04-pelota"), { y: 8, duration: 0.15, yoyo: true, repeat: 7, ease: "sine.inOut" }, PESADA + 0.2);
      brazo("s04p", "i", 8, DOLAR - 0.3);
      // el dólar
      brazo("s04p", "d", -70, DOLAR - 0.15);
      pop(q(".s04-dolar"), DOLAR - 0.1, 0.35);
      tl.fromTo(q(".s04-flecha"), { strokeDasharray: 330, strokeDashoffset: 330 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, DOLAR);
      pop(q(".s04-punta"), DOLAR + 0.45, 0.2);
      pop(q(".s04-l2"), VISTE, 0.3);
      // no se puede jugar: los dos brazos arriba
      brazo("s04p", "i", 50, NO); brazo("s04p", "d", -50, NO);
      tl.to(q(".s04p-cejas"), { y: -10, duration: 0.2 }, NO);
      golpe(q(".s04-sello"), JUGAR, -3, 2.4);
      sacudon(JUGAR + 0.05, 1.4);
      tl.to([q(".s04-cancha"), q(".s04-dolar")], { rotation: 4, duration: 0.1, yoyo: true, repeat: 3 }, JUGAR);
"""
sfx = [{"t": 0.5, "sfx": "pop", "vol": 0.28}, {"t": 1.25, "sfx": "click-soft", "vol": 0.25}, {"t": 2.6, "sfx": "pop", "vol": 0.28},
       {"t": 2.6, "sfx": "whoosh-short", "vol": 0.2}, {"t": 3.8, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}]
escena("s04-cancha", p, 4.96, css, body, js, sfx)
