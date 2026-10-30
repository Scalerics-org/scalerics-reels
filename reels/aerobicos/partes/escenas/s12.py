from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-tit { top: 590px; font-size: 84px; font-style: italic; }
    [data-composition-id="%ID%"] .s12-otro { top: 640px; font-size: 150px; }
    [data-composition-id="%ID%"] .s12-tile { position: absolute; width: 420px; height: 150px; background: #160a2a; border: 5px solid #5ce611; border-radius: 22px; box-shadow: 0 0 22px rgba(92, 230, 17, 0.35);
      display: flex; align-items: center; gap: 18px; padding: 0 22px; }
    [data-composition-id="%ID%"] .s12-tile svg { width: 84px; height: 84px; flex: none; }
    [data-composition-id="%ID%"] .s12-tile b { display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fff3e8; line-height: 1.1; }
    [data-composition-id="%ID%"] .s12-tile i { display: block; font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.12em; color: #5ce611; margin-top: 6px; }
    [data-composition-id="%ID%"] .s12-check { position: absolute; right: -16px; top: -16px; width: 48px; height: 48px; }
    [data-composition-id="%ID%"] .s12-due { left: 340px; top: 600px; }
    [data-composition-id="%ID%"] .s12-zzz { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #1de9d6; -webkit-text-stroke: 6px #160a2a; paint-order: stroke fill; }
"""
def ico(path):
    return f'<svg viewBox="0 0 84 84" aria-hidden="true">{path}</svg>'
ICOS = [
    ico(f'<path d="M42 12 C26 12 20 26 20 40 V54 L12 64 H72 L64 54 V40 C64 26 58 12 42 12 Z" fill="none" stroke="{G}" stroke-width="6" stroke-linejoin="round"/><circle cx="42" cy="70" r="7" fill="{G}"/>'),
    ico(f'<rect x="10" y="16" width="64" height="58" rx="8" fill="none" stroke="{G}" stroke-width="6"/><path d="M10 32 H74 M26 8 V22 M58 8 V22" stroke="{G}" stroke-width="6" stroke-linecap="round"/><rect x="24" y="44" width="14" height="12" fill="{G}"/>'),
    ico(f'<path d="M12 28 L42 14 L72 28 V60 L42 74 L12 60 Z M12 28 L42 42 L72 28 M42 42 V74" fill="none" stroke="{G}" stroke-width="6" stroke-linejoin="round"/>'),
    ico(f'<path d="M14 70 H72" stroke="{G}" stroke-width="6" stroke-linecap="round"/><rect x="18" y="44" width="12" height="22" fill="{G}"/><rect x="38" y="30" width="12" height="36" fill="{G}"/><rect x="58" y="16" width="12" height="50" fill="{G}"/>'),
]
DATOS = [("Pedido listo", "AVISO SOLO", 100, 720), ("Turnos", "RECORDATORIO", 560, 720), ("Stock tienda", "AL DÍA SOLO", 100, 900), ("Reporte del día", "AL CELULAR", 560, 900)]
check = f'<svg class="s12-check" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="{G}" stroke="{D}" stroke-width="4"/><path d="M13 25 L21 33 L36 16" stroke="{D}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
tiles = "".join(f'<div class="s12-tile s12-t{i}" style="left:{x}px;top:{y}px">{ICOS[i]}<div><b>{a}</b><i>{b}</i></div>{check}</div>' for i, (a, b, x, y) in enumerate(DATOS))
body = f"""
        <svg class="s12-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-repo">
            <path d="M250 1250 L800 1150" stroke="{T}" stroke-width="16" stroke-linecap="round"/>
            <path d="M330 1236 L300 1330 M720 1166 L760 1330 M330 1236 L760 1330" stroke="{C}" stroke-width="8" stroke-linecap="round"/>
          </g>
          <g class="s12-gear"><circle cx="540" cy="890" r="34" fill="{D}" stroke="{G}" stroke-width="7"/><circle cx="540" cy="890" r="12" fill="{G}"/>
            <path d="M540 846 V834 M540 934 V946 M496 890 H484 M584 890 H596 M509 859 L500 850 M571 921 L580 930 M509 921 L500 930 M571 859 L580 850" stroke="{G}" stroke-width="10" stroke-linecap="round"/></g>
        </svg>
        <div class="big r s12-otro">¡Otro, sí!</div>
        <div class="big v s12-tit">Automatizaciones</div>
        {tiles}
        <div class="fig s12-due">{duenio('s12d')}</div>
        <div class="s12-zzz s12-z0" style="left:640px;top:1150px;font-size:54px">Z</div>
        <div class="s12-zzz s12-z1" style="left:690px;top:1095px;font-size:68px">Z</div>
        <div class="s12-zzz s12-z2" style="left:756px;top:1030px;font-size:84px">Z</div>
"""
js = """
      const SI = 0.27, AUTO = 1.36, AVISO = 2.73, RECORD = 3.91, STOCK = 5.45, REPORTE = 6.45, SOLOS = 7.82, MIENTRAS = 8.65, DESCANSAS = 9.09, VERDAD = 9.82;
      // cuadro 0: "¡Otro, sí!" entra en verde y rosa
      gsap.set(q(".s12-otro"), { opacity: 1, rotation: -5 });
      tl.fromTo(q(".s12-otro"), { scale: 1.8 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(SI, 1.2);
      fuera(q(".s12-otro"), AUTO - 0.2);
      golpe(q(".s12-tit"), AUTO, -3, 2.2);
      // las cuatro tareas, cada una en su palabra
      const T = [AVISO, RECORD, STOCK, REPORTE];
      T.forEach((t, i) => {
        const el = q(".s12-t" + i);
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.5, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, t - 0.1);
        const ch = el.querySelector(".s12-check");
        gsap.set(ch, { opacity: 0 });
        tl.fromTo(ch, { opacity: 0, scale: 0.2, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2.5)", immediateRender: false }, t + 0.35);
      });
      // "se hacen solos": el engranaje gira y las cuatro laten juntas
      gsap.set(q(".s12-gear"), { opacity: 0 });
      tl.fromTo(q(".s12-gear"), { opacity: 0, scale: 0.3, svgOrigin: "540 890" }, { opacity: 1, scale: 1, svgOrigin: "540 890", duration: 0.3, ease: "back.out(2)", immediateRender: false }, SOLOS - 0.5);
      tl.to(q(".s12-gear"), { rotation: 540, svgOrigin: "540 890", duration: DUR - SOLOS + 0.5, ease: "none" }, SOLOS - 0.5);
      tl.to(qa(".s12-tile"), { scale: 1.05, duration: 0.16, yoyo: true, repeat: 3, stagger: 0.06 }, SOLOS);
      // el dueño en la reposera
      gsap.set([q(".s12-repo"), q(".s12-due")], { opacity: 0 });
      tl.fromTo(q(".s12-repo"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, MIENTRAS - 0.1);
      gsap.set(q(".s12-due"), { scale: 0.56, transformOrigin: "50% 98%", rotation: 72, x: -270, y: 0 });
      tl.fromTo(q(".s12-due"), { opacity: 0, y: -220 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, MIENTRAS);
      gsap.set(q(".s12d-gotas"), { opacity: 0 });
      gsap.set(q(".s12d-bi"), { rotation: 150, svgOrigin: "150 286" });
      gsap.set(q(".s12d-bd"), { rotation: -150, svgOrigin: "250 286" });
      tl.fromTo(q(".s12d-cuerpo"), { scaleX: 1 }, { scaleX: 1.04, svgOrigin: "200 705", duration: 0.7, yoyo: true, repeat: 2, ease: "sine.inOut" }, DESCANSAS);
      qa(".s12-zzz").forEach((z, i) => {
        gsap.set(z, { opacity: 0 });
        tl.fromTo(z, { opacity: 0, y: 30, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, DESCANSAS + i * 0.25);
        tl.to(z, { y: -14, duration: 0.4, yoyo: true, repeat: 2, ease: "sine.inOut" }, DESCANSAS + 0.35 + i * 0.25);
      });
"""
sfx = [{"t": 0.02, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.9}, {"t": 1.3, "sfx": "sparkle", "vol": 0.3}, {"t": 2.9, "sfx": "chime", "vol": 0.25},
       {"t": 4.1, "sfx": "chime", "vol": 0.25}, {"t": 5.6, "sfx": "chime", "vol": 0.25}, {"t": 6.6, "sfx": "chime", "vol": 0.25},
       {"t": 7.8, "sfx": "click-soft", "vol": 0.3}, {"t": 8.65, "sfx": "pop", "vol": 0.3}]
escena("s12-solas", p, 10.79, css, body, js, sfx)
