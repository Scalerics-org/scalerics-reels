from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-local { left: 120px; top: 850px; width: 700px; height: 700px; }
    [data-composition-id="%ID%"] .s01-con { left: 680px; top: 840px; }
    [data-composition-id="%ID%"] .s01-cambio { top: 530px; font-size: 168px; }
    [data-composition-id="%ID%"] .s01-extremo { top: 690px; font-size: 150px; }
    [data-composition-id="%ID%"] .s01-cinta { top: 1220px; transform: rotate(-9deg); }
    [data-composition-id="%ID%"] .s01-rod { left: 170px; top: 910px; width: 560px; height: 560px; }
"""
rodillo = f'''<svg viewBox="0 0 560 560" aria-hidden="true">
  <rect class="s01-franja" x="20" y="250" width="500" height="120" fill="{W}" opacity="0.95"/>
  <g class="s01-rodillo">
    <rect x="300" y="150" width="240" height="96" rx="20" fill="{W}" {S}/>
    <path d="M318 170 V228 M350 170 V228 M382 170 V228 M414 170 V228 M446 170 V228 M478 170 V228 M510 170 V228" stroke="{K}" stroke-width="3" opacity="0.3"/>
    <path d="M540 198 L560 198 L560 300 L420 300 L420 350" fill="none" stroke="{K}" stroke-width="12" stroke-linejoin="round"/>
    <rect x="396" y="350" width="48" height="160" rx="16" fill="{N}" {S}/>
  </g>
  <g class="s01-x"><path d="M250 120 L560 520 M560 120 L250 520" stroke="{K}" stroke-width="60" stroke-linecap="round"/><path d="M250 120 L560 520 M560 120 L250 520" stroke="{N}" stroke-width="40" stroke-linecap="round"/></g>
</svg>'''
body = f"""
        <div class="obj s01-local">{local('s01l', 'TU LOCAL')}</div>
        {cinta('s01-cinta', 'PELIGRO · OBRA · PELIGRO · OBRA · PELIGRO')}
        <div class="obj s01-rod">{rodillo}</div>
        <div class="fig s01-con">{conductora('s01c')}</div>
        <div class="big w s01-cambio">Cambio</div>
        <div class="big y s01-extremo">extremo</div>
"""
js = """
      const CAMBIO = 1.40, EXT = 1.58, NO = 2.50, PINTAR = 3.08, FACHADA = 3.58;
      const loc = q(".s01-local");
      // cuadro 0: el local ya está, a media luz, y la cinta cruzada
      gsap.set(loc, { opacity: 0.55, scale: 0.94, transformOrigin: "50% 100%" });
      tl.to(loc, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0);
      tl.fromTo(q(".s01-cinta"), { x: -300 }, { x: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(q(".s01-cinta"), { x: 60, duration: 3.8, ease: "none" }, 0.5);
      // la conductora entra
      entra(q(".s01-con"), 0.25, { x: 500 }, 0.4);
      gsap.set(q(".s01c-bd"), { rotation: -20, svgOrigin: "250 292" });
      habla(".s01c-boca", 0.3, 4.0, "200 238");
      vaiven(q(".s01-con"), 0.7, 3.6, { y: -10 }, 0.35);
      // CAMBIO EXTREMO
      golpe(q(".s01-cambio"), CAMBIO, -4, 3);
      sacudon(CAMBIO + 0.04, 1.2);
      golpe(q(".s01-extremo"), EXT + 0.08, 3, 3);
      sacudon(EXT + 0.1, 1.5);
      tl.to(q(".s01-extremo"), { scale: 1.06, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, EXT + 0.15);
      // no, no es pintar...
      tl.to([q(".s01-cambio"), q(".s01-extremo")], { y: -40, scale: 0.8, opacity: 0.25, duration: 0.25, ease: "power2.inOut" }, NO);
      gsap.set(q(".s01-franja"), { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(q(".s01-x"), { opacity: 0 });
      pop(q(".s01-rod"), NO + 0.05, 0.3);
      tl.fromTo(q(".s01-rodillo"), { x: 0 }, { x: -260, duration: 0.45, ease: "power1.inOut", immediateRender: false }, PINTAR);
      tl.to(q(".s01-franja"), { scaleX: 1, duration: 0.45, ease: "power1.inOut" }, PINTAR);
      tl.fromTo(q(".s01-x"), { opacity: 0, scale: 2.2, svgOrigin: "405 320" }, { opacity: 1, scale: 1, svgOrigin: "405 320", duration: 0.14, ease: "power4.in", immediateRender: false }, FACHADA - 0.05);
      sacudon(FACHADA + 0.1, 1.6);
      tl.to(q(".s01c-bi"), { rotation: 40, svgOrigin: "150 292", duration: 0.2, ease: "back.out(2)" }, FACHADA);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.7}, {"t": 1.3, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7},
       {"t": 1.6, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 2.55, "sfx": "pop", "vol": 0.3},
       {"t": 3.08, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 3.55, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}]
escena("s01-gancho", p, 4.60, css, body, js, sfx)
