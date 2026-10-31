from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-tito { left: -30px; top: 820px; }
    [data-composition-id="%ID%"] .s07-pan { left: 400px; top: 700px; }
    [data-composition-id="%ID%"] .s07-cartel { left: 330px; top: 470px; padding: 14px 34px 10px; border: 6px solid #d8b25c; background: #0e0c10; text-align: center; }
    [data-composition-id="%ID%"] .s07-cartel b { display: block; font-family: "Cormorant", serif; font-weight: 600; font-size: 72px; line-height: 1; color: #f6f1ea; white-space: nowrap; }
    [data-composition-id="%ID%"] .s07-cartel small { display: block; margin-top: 6px; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 48px; color: #d8b25c; white-space: nowrap; }
    [data-composition-id="%ID%"] .s07-mod { position: absolute; padding: 8px 16px 6px; background: #d8b25c; border: 4px solid #0e0c10; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.04em; color: #0e0c10; white-space: nowrap; }
"""
MODS = [("IMPORTACIÓN", 660, 880, -8), ("FLOTA DE CAMIONES", 690, 960, 6), ("MULTIMONEDA", 640, 1040, -4), ("AEROPUERTO", 700, 1120, 8),
        ("BOLSA DE VALORES", 620, 1200, -6), ("SUCURSAL EN JAPÓN", 680, 1280, 4)]
mods = "".join(f'<div class="s07-mod" style="left:{x}px;top:{y}px;transform:rotate({r}deg)">{t}</div>' for t, x, y, r in MODS)
body = f"""
        <div class="fig s07-pan">{panadera('s07a')}</div>
        <div class="fig s07-tito">{presentador('s07p')}</div>
        <div class="obj s07-cartel"><b>PANADERÍA</b><small>sistema completo</small></div>
        {mods}
"""
js = """
      const PAN = 0.17, SIS = 0.92, COMP = 1.17, TODOS = 2.09, MOD = 2.50;
      gsap.set(q(".s07-tito"), { scale: 0.85, transformOrigin: "50% 100%" });
      tl.fromTo(q(".s07-tito"), { x: -120 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.to(q(".s07p-bi"), { rotation: 120, svgOrigin: "150 292", duration: 0.3, ease: "back.out(2)" }, 0.1);
      habla(".s07p-boca", 0, 3.2, "200 236");
      pop(q(".s07-cartel"), PAN, 0.35, { rotation: 2 });
      // la panadera desfila arrastrando el tapado
      gsap.set(q(".s07-pan"), { scale: 0.4, y: 40, x: 60, transformOrigin: "50% 100%" });
      tl.to(q(".s07-pan"), { scale: 1, y: 0, x: -40, duration: 1.8, ease: "power1.inOut" }, 0);
      desfila(q(".s07a-cuerpo"), 0, 3.3, 0.34);
      tl.to(q(".s07a-mangas"), { rotation: 4, svgOrigin: "200 300", duration: 0.34, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      tl.to(q(".s07-cartel small"), { scale: 1.15, color: "#ff2e88", duration: 0.15, yoyo: true, repeat: 1 }, COMP);
      // todos los módulos: etiquetas que se le pegan
      qa(".s07-mod").forEach((m, i) => pop(m, TODOS - 0.4 + i * 0.1, 0.25));
      sacudon(MOD + 0.05, 0.8);
"""
sfx = [{"t": 0.15, "sfx": "pop", "vol": 0.3}, {"t": 1.15, "sfx": "click", "vol": 0.25},
       {"t": 2.09, "sfx": "pop", "vol": 0.25}, {"t": 2.3, "sfx": "pop", "vol": 0.25}, {"t": 2.5, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "impact-bass-1", "vol": 0.25, "max": 0.5}]
escena("s07-panaderia", p, 3.52, css, body, js, sfx)
