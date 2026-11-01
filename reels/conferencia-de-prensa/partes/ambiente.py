# Genera compositions/ambiente.html: placa EN VIVO arriba, la mesa de conferencia con micrófonos,
# el zócalo de quién habla y los flashes de los fotógrafos. Correr desde reels/conferencia-de-prensa.
import json
DUR = 68.93
FIN = 55.84  # entra Scalerics: se va la mesa
K, N, C, B, Y, R = "#0d1424", "#1b3a6b", "#6cc4ff", "#f4f1e8", "#ffd447", "#e63946"
mics = ""
for i, (x, col, lab, h) in enumerate([(300, Y, "TV", 50), (420, C, "AM", 62), (660, R, "FM", 58), (780, B, "WEB", 48)]):
    mics += f'''<g class="am-mic" data-layout-allow-overflow data-layout-ignore><path d="M{x} 1346 L{x} {1346 - h}" stroke="{K}" stroke-width="12" stroke-linecap="round"/>
      <rect x="{x - 30}" y="{1346 - h - 6}" width="60" height="34" rx="5" fill="{col}" stroke="{K}" stroke-width="4"/>
      <text x="{x}" y="{1346 - h + 18}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="18" fill="{K}">{lab}</text>
      <ellipse cx="{x}" cy="{1346 - h - 26}" rx="22" ry="26" fill="{K}"/></g>'''
destellos = ""
POS = [(120, 640), (960, 700), (80, 1180), (1000, 1120), (200, 900), (900, 950)]
for i, (x, y) in enumerate(POS):
    r = 46
    k = r * 0.22
    destellos += f'<path class="am-d am-d{i}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{B}" stroke="{Y}" stroke-width="5" opacity="0"/>'
Z = [("p", 0, 5.6), ("d", 5.85, 9.95), ("r", 10.11, 16.14), ("d", 16.32, 21.04), ("p", 21.29, 25.54), ("d", 25.77, 29.34),
     ("r", 29.59, 32.19), ("d", 32.37, 35.29), ("j", 35.49, 36.64), ("v", 36.83, 46.64), ("d", 46.84, 48.49), ("v", 48.67, 53.19), ("d", 53.42, FIN - 0.05)]
FLASH = [0.25, 1.3, 2.45, 4.6, 8.6, 15.15, 24.74, 32.84, 34.24, 40.04, 49.54, 53.59, 54.04, 54.59, 55.14]
html = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="ambiente"] .am-capa {{ position: absolute; inset: 0; }}
    [data-composition-id="ambiente"] svg.am-full {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    [data-composition-id="ambiente"] .am-top {{ position: absolute; left: 110px; right: 110px; top: 54px; height: 140px; }}
    [data-composition-id="ambiente"] .am-placa {{ position: absolute; inset: 0; border: 5px solid {Y}; border-radius: 22px; background: rgba(13, 20, 36, 0.9); box-shadow: 8px 8px 0 {K}; text-align: center; }}
    [data-composition-id="ambiente"] .am-placa small {{ position: absolute; left: 0; right: 0; top: 16px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.26em; color: {C}; white-space: nowrap; }}
    [data-composition-id="ambiente"] .am-placa b {{ position: absolute; left: 0; right: 0; top: 54px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; line-height: 1; color: {B}; white-space: nowrap; }}
    [data-composition-id="ambiente"] .am-placa b em {{ font-style: normal; color: {Y}; padding: 0 12px; }}
    [data-composition-id="ambiente"] .am-rec {{ position: absolute; left: 26px; top: 20px; width: 18px; height: 18px; border-radius: 50%; background: {R}; border: 3px solid {B}; }}
    [data-composition-id="ambiente"] .am-mesa {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }}
    [data-composition-id="ambiente"] .am-zocalo {{ position: absolute; left: 60px; top: 1430px; width: 960px; height: 150px; }}
    [data-composition-id="ambiente"] .am-z {{ position: absolute; left: 0; top: 0; opacity: 0; }}
    [data-composition-id="ambiente"] .am-z b {{ display: inline-block; padding: 12px 26px 8px; border: 5px solid {K}; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 42px; line-height: 1; color: {K}; white-space: nowrap; transform: rotate(-1.5deg); box-shadow: 6px 6px 0 {K}; }}
    [data-composition-id="ambiente"] .am-z small {{ display: block; width: max-content; margin: 4px 0 0 26px; padding: 6px 16px 4px; background: {B}; border: 4px solid {K}; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.04em; color: {K}; white-space: nowrap; }}
    [data-composition-id="ambiente"] .am-flash {{ position: absolute; inset: 0; background: #ffffff; opacity: 0; }}
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="{DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="{DUR}" data-track-index="0">
      <svg class="am-full" viewBox="0 0 1080 1920" aria-hidden="true">{destellos}</svg>
      <div class="am-mesa">
        <svg class="am-full" viewBox="0 0 1080 1920" aria-hidden="true" data-layout-allow-overflow>
          {mics}
          <path d="M-20 1340 H1100 V1724 H-20 Z" fill="{N}" stroke="{K}" stroke-width="8"/>
          <path d="M-20 1340 H1100 V1372 H-20 Z" fill="{B}" stroke="{K}" stroke-width="6"/>
          <path d="M-20 1384 H1100" stroke="{C}" stroke-width="5" opacity="0.6"/>
          <text x="540" y="1636" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="26" letter-spacing="9" fill="{C}" opacity="0.9">CLÁSICO DEL BARRIO · FECHA 1</text>
          <text x="540" y="1690" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="34" fill="{Y}" opacity="0.85">Yerba La Gaucha · Fideos Don Tito · Bizcochos Doña Rosa</text>
        </svg>
        <div class="am-zocalo">
          <div class="am-z am-zp"><b style="background:{C}">VALE</b><small>Canal del Barrio · pregunta sin anestesia</small></div>
          <div class="am-z am-zr"><b style="background:{R}">EL POCHO</b><small>Radio La Esquina · AM y celular</small></div>
          <div class="am-z am-zd"><b style="background:{Y}">EL PROFE NÉSTOR</b><small>DT y dueño de Tienda Néstor</small></div>
          <div class="am-z am-zj"><b style="background:{B}">JEFA DE PRENSA</b><small>quiere irse a su casa</small></div>
          <div class="am-z am-zv"><b style="background:#ff9f6b">DON ANÍBAL</b><small>vio todos los clásicos</small></div>
        </div>
      </div>
      <div class="am-top">
        <div class="am-placa"><i class="am-rec"></i><small>CONFERENCIA DE PRENSA · EN VIVO</small><b>Néstor<em>0 · 1</em>Enfrente</b></div>
      </div>
      <div class="am-flash"></div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "ambiente";
      const FIN = {FIN};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({{ paused: true }});
      // el punto de EN VIVO titila
      tl.fromTo(q(".am-rec"), {{ opacity: 1 }}, {{ opacity: 0.15, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: Math.floor(FIN / 0.5), immediateRender: false }}, 0);
      tl.fromTo(q(".am-placa b em"), {{ scale: 1 }}, {{ scale: 1.12, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }}, 0.4);
      // los micrófonos tiemblan apenas
      qa(".am-mic").forEach((m, i) => tl.fromTo(m, {{ y: 0 }}, {{ y: -4, duration: 0.6 + i * 0.13, yoyo: true, repeat: Math.floor(FIN / (0.6 + i * 0.13)) - 1, ease: "sine.inOut" }}, 0));
      // zócalo: quién habla
      const Z = {json.dumps(Z)};
      Z.forEach(([s, a, b], i) => {{
        const el = q(".am-z" + s);
        if (i === 0) gsap.set(el, {{ opacity: 1 }});
        else tl.fromTo(el, {{ opacity: 0, x: -80 }}, {{ opacity: 1, x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }}, a);
        tl.to(el, {{ opacity: 0, x: -40, duration: 0.12, ease: "power2.in" }}, b - 0.1);
      }});
      // flashes de los fotógrafos
      const F = {json.dumps(FLASH)};
      const POS = {json.dumps(POS)};
      F.forEach((t, i) => {{
        tl.to(q(".am-flash"), {{ opacity: 0.38, duration: 0.03 }}, t);
        tl.to(q(".am-flash"), {{ opacity: 0, duration: 0.3 }}, t + 0.05);
        const d = q(".am-d" + (i % 6)), o = POS[i % 6].join(" ");
        tl.fromTo(d, {{ opacity: 1, scale: 0.3, svgOrigin: o }}, {{ opacity: 0, scale: 1.4, duration: 0.45, ease: "power2.out", immediateRender: false }}, t);
      }});
      // Scalerics: se va la conferencia
      tl.to(q(".am-top"), {{ opacity: 0, y: -40, duration: 0.3 }}, FIN);
      tl.to(q(".am-mesa"), {{ y: 700, opacity: 0, duration: 0.5, ease: "power2.in" }}, FIN);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
open("compositions/ambiente.html", "w").write(html)
print("ambiente ok")
