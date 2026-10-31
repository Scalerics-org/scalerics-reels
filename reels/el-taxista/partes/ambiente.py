# Genera compositions/ambiente.html del taxi: espejito con los ojos del taxista y el dado colgando (arriba),
# tablero con la radio (quién habla) y el taxímetro rojo que suma fichas (abajo). Correr desde partes/.
import json, os
D = os.path.dirname(os.path.abspath(__file__))
pal = json.load(open(os.path.join(D, "..", "assets/voice/palabras.json")))
DUR = round(max(float(os.popen(f"ffprobe -v error -show_entries format=duration -of csv=p=0 {D}/../assets/voice/locucion.wav").read()), pal[-1]["end"]) + 3.2, 2)
K, N, Y, R, A, C, L, H, G = "#0b0f1a", "#1d2f55", "#ffc81a", "#ff3b30", "#ff9a3c", "#f4ecd8", "#7fd3ff", "#a9aebb", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'
# quién habla: (palabra, clase) -> tiempos
VOCES = [[0, "t"], [13, "p"], [34, "t"], [39, "p"], [49, "t"], [58, "p"], [69, "t"], [70, "p"], [73, "t"], [105, "p"], [110, "t"], [137, "p"], [140, "t"], [160, "o"]]
TURNOS = []
for k, (i, c) in enumerate(VOCES):
    a = pal[i]["start"] if i else 0
    b = pal[VOCES[k + 1][0]]["start"] if k + 1 < len(VOCES) else DUR
    TURNOS.append([c, round(a, 2), round(b, 2)])
FIN = TURNOS[-1][1]  # entra Scalerics
# fichas del taxímetro: lento, después más rápido dando vueltas, desbocado en "la ficha sigue subiendo"
fichas, t, v = [], 1.0, 12
def tramo(hasta, paso):
    global t, v
    while t < hasta:
        fichas.append((round(t, 2), v)); v += 1; t += paso
tramo(pal[73]["start"], 2.3)
tramo(pal[105]["start"], 0.62)
tramo(pal[110]["start"] - 0.3, 0.11)
tramo(FIN - 0.4, 1.4)
NF = len(fichas)
spans = "".join(f'<span class="am-f am-f{i}">{n:03d}</span>' for i, (_, n) in enumerate(fichas))
dado = f'''<g class="am-colgante">
  <path d="M0 0 L-8 16 M0 0 L10 22" stroke="{C}" stroke-width="3"/>
  {"".join(f'<circle cx="{-6 + j * 0.0}" cy="{8 + j * 9}" r="3.5" fill="{A}"/>' for j in range(0))}
  <g transform="translate(-26 14) rotate(-10) scale(0.72)"><rect x="0" y="0" width="40" height="40" rx="8" fill="{R}" {S}/><circle cx="12" cy="12" r="4" fill="{C}"/><circle cx="28" cy="28" r="4" fill="{C}"/><circle cx="20" cy="20" r="4" fill="{C}"/></g>
  <g transform="translate(4 20) rotate(14) scale(0.72)"><rect x="0" y="0" width="40" height="40" rx="8" fill="{C}" {S}/><circle cx="12" cy="12" r="4" fill="{K}"/><circle cx="28" cy="28" r="4" fill="{K}"/><circle cx="28" cy="12" r="4" fill="{K}"/><circle cx="12" cy="28" r="4" fill="{K}"/></g>
</g>'''
html = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="ambiente"] .am-capa {{ position: absolute; inset: 0; }}
    [data-composition-id="ambiente"] svg.am-svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    [data-composition-id="ambiente"] .am-vin {{ position: absolute; inset: 0; background: radial-gradient(ellipse 760px 1100px at 540px 960px, rgba(11, 15, 26, 0) 60%, rgba(11, 15, 26, 0.55) 100%); }}
    /* radio: quién habla */
    [data-composition-id="ambiente"] .am-radio {{ position: absolute; left: 56px; top: 1572px; width: 500px; height: 116px; border-radius: 14px; background: #120a04; border: 5px solid {A}; box-shadow: 0 0 26px rgba(255, 154, 60, 0.35); overflow: hidden; }}
    [data-composition-id="ambiente"] .am-q {{ position: absolute; left: 22px; top: 14px; opacity: 0; }}
    [data-composition-id="ambiente"] .am-q b {{ display: block; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; line-height: 1.05; letter-spacing: 0.02em; white-space: nowrap; }}
    [data-composition-id="ambiente"] .am-q small {{ display: block; margin-top: 6px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.12em; white-space: nowrap; color: {A}; opacity: 0.85; }}
    [data-composition-id="ambiente"] .am-barras {{ position: absolute; right: 18px; top: 26px; width: 90px; height: 64px; }}
    [data-composition-id="ambiente"] .am-barras i {{ position: absolute; bottom: 0; width: 12px; height: 64px; background: {A}; transform-origin: 50% 100%; }}
    /* taxímetro */
    [data-composition-id="ambiente"] .am-taxi {{ position: absolute; left: 600px; top: 1560px; width: 424px; height: 140px; border-radius: 14px; background: #160406; border: 6px solid {K}; box-shadow: 0 0 0 4px #3a0d10, 0 0 40px rgba(255, 59, 48, 0.35); }}
    [data-composition-id="ambiente"] .am-tl {{ position: absolute; left: 20px; top: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.2em; color: {R}; opacity: 0.8; }}
    [data-composition-id="ambiente"] .am-libre {{ position: absolute; left: 20px; top: 62px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; letter-spacing: 0.14em; color: {R}; opacity: 0.45; }}
    [data-composition-id="ambiente"] .am-nums {{ position: absolute; right: 24px; top: 10px; width: 240px; height: 116px; }}
    [data-composition-id="ambiente"] .am-f {{ position: absolute; right: 0; top: 0; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 104px; line-height: 116px; letter-spacing: 0.04em; color: {R};
      text-shadow: 0 0 18px rgba(255, 59, 48, 0.85); opacity: 0; }}
    [data-composition-id="ambiente"] .am-mas {{ position: absolute; left: 860px; top: 1500px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; color: {R}; -webkit-text-stroke: 8px {K}; paint-order: stroke fill; opacity: 0; white-space: nowrap; }}
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="{DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="{DUR}" data-track-index="0">
      <div class="am-vin"></div>
      <svg class="am-svg" viewBox="0 0 1080 1920" aria-hidden="true">
        <g class="am-arriba">
          <rect x="525" y="-10" width="30" height="74" fill="{K}" stroke="{H}" stroke-width="3"/>
          <g class="am-espejo">
            <rect x="330" y="56" width="420" height="140" rx="40" fill="{K}" stroke="{H}" stroke-width="5"/>
            <clipPath id="am-clip"><rect x="350" y="72" width="380" height="108" rx="28"/></clipPath>
            <g clip-path="url(#am-clip)">
              <rect x="350" y="72" width="380" height="108" fill="#24365c"/>
              <g class="am-cara">
                <rect x="380" y="60" width="320" height="160" rx="70" fill="{C}" opacity="0.92"/>
                <path d="M380 66 Q540 40 700 66 L700 92 Q540 76 380 92 Z" fill="{N}"/>
                <g class="am-cejas"><path d="M430 116 Q470 96 512 112 M568 112 Q610 96 650 116" stroke="{H}" stroke-width="22" stroke-linecap="round" fill="none"/>
                  <path d="M430 116 Q470 96 512 112 M568 112 Q610 96 650 116" stroke="{K}" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.5"/></g>
                <g class="am-ojos"><g class="am-pup"><ellipse cx="472" cy="144" rx="13" ry="14" fill="{K}"/><ellipse cx="608" cy="144" rx="13" ry="14" fill="{K}"/>
                  <circle cx="477" cy="139" r="4" fill="{C}"/><circle cx="613" cy="139" r="4" fill="{C}"/></g></g>
                <path d="M520 176 Q540 160 560 176" stroke="{K}" stroke-width="5" fill="none" opacity="0.6"/>
              </g>
              <path d="M360 80 L420 80 L380 180 L350 180 Z" fill="{C}" opacity="0.10"/>
            </g>
          </g>
          <g transform="translate(760 186)">{dado}</g>
        </g>
        <g class="am-tablero">
          <path d="M-20 1600 Q540 1500 1100 1600 L1100 1730 L-20 1730 Z" fill="{K}" stroke="{N}" stroke-width="5"/>
        </g>
      </svg>
      <div class="am-radio">
        <div class="am-q am-qt"><b style="color:{Y}">WASHINGTON</b><small>OPINA DE TODO</small></div>
        <div class="am-q am-qp"><b style="color:{L}">CAROLINA</b><small>APURADÍSIMA</small></div>
        <div class="am-q am-qo"><b style="color:{G}">SCALERICS</b><small style="color:{G}">SITIOS WEB</small></div>
        <div class="am-barras"><i style="left:0"></i><i style="left:19px"></i><i style="left:38px"></i><i style="left:57px"></i><i style="left:76px"></i></div>
      </div>
      <div class="am-taxi">
        <div class="am-tl">FICHAS</div>
        <div class="am-libre">OCUPADO</div>
        <div class="am-nums">{spans}</div>
      </div>
      <div class="am-mas">+ FICHAS</div>
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
      const TURNOS = {json.dumps(TURNOS)};
      const FICHAS = {json.dumps([f[0] for f in fichas])};

      // el dado se hamaca con el auto
      tl.fromTo(q(".am-colgante"), {{ rotation: -9, svgOrigin: "0 0" }}, {{ rotation: 9, svgOrigin: "0 0", duration: 0.9, yoyo: true, repeat: Math.floor(FIN / 0.9), ease: "sine.inOut" }}, 0);
      // el espejito vibra apenas
      tl.to(q(".am-espejo"), {{ y: 3, duration: 0.14, yoyo: true, repeat: Math.floor(FIN / 0.14), ease: "sine.inOut" }}, 0);
      // ojos del taxista: parpadean y miran a la pasajera cuando ella habla
      const blink = (t) => {{ tl.to(q(".am-ojos"), {{ scaleY: 0.1, svgOrigin: "540 144", duration: 0.06 }}, t); tl.to(q(".am-ojos"), {{ scaleY: 1, svgOrigin: "540 144", duration: 0.08 }}, t + 0.08); }};
      for (let t = 1.6; t < FIN; t += 2.9) blink(t);
      TURNOS.forEach(([c, a, b]) => {{
        if (c === "p") {{ tl.to(q(".am-pup"), {{ x: 22, y: 4, duration: 0.2, ease: "power2.out" }}, a + 0.1); tl.to(q(".am-pup"), {{ x: 0, y: 0, duration: 0.2 }}, b - 0.1); }}
      }});
      // cejas: sentencia, duda y "normal"
      [[0.5, -10], [1.2, 0], [26.0, -12], [27.6, 6], [28.4, 0], [35.6, -14], [36.6, 0], [46.7, 8], [47.6, 0], [50.5, -10], [52.0, 0]].forEach(([t, y]) =>
        tl.to(q(".am-cejas"), {{ y, duration: 0.14, ease: "power2.out" }}, t));

      // radio: quién habla
      const QS = {{ t: ".am-qt", p: ".am-qp", o: ".am-qo" }};
      TURNOS.forEach(([c, a, b], i) => {{
        const el = q(QS[c]);
        if (i === 0) gsap.set(el, {{ opacity: 1 }});
        else tl.fromTo(el, {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.18, ease: "power3.out", immediateRender: false }}, a);
        if (i + 1 < TURNOS.length) tl.to(el, {{ opacity: 0, y: -24, duration: 0.1 }}, b - 0.1);
      }});
      qa(".am-barras i").forEach((el, i) => tl.fromTo(el, {{ scaleY: 0.25 }}, {{ scaleY: 1, duration: 0.12 + i * 0.03, yoyo: true, repeat: Math.floor(FIN / (0.12 + i * 0.03)), ease: "sine.inOut" }}, 0));

      // taxímetro: cada ficha prende su número
      const fs = qa(".am-f");
      gsap.set(fs[0], {{ opacity: 1 }});
      FICHAS.forEach((t, i) => {{
        if (i === 0) return;
        tl.set(fs[i - 1], {{ opacity: 0 }}, t);
        tl.set(fs[i], {{ opacity: 1 }}, t);
        tl.fromTo(q(".am-taxi"), {{ boxShadow: "0 0 0 4px #3a0d10, 0 0 70px rgba(255, 59, 48, 0.75)" }}, {{ boxShadow: "0 0 0 4px #3a0d10, 0 0 40px rgba(255, 59, 48, 0.35)", duration: 0.25, immediateRender: false }}, t);
      }});
      // "¡la ficha sigue subiendo!": el taxímetro salta y aparece "+ FICHAS"
      const SUBE = {pal[105]["start"]};
      tl.fromTo(q(".am-taxi"), {{ scale: 1 }}, {{ scale: 1.08, duration: 0.08, yoyo: true, repeat: 15, ease: "sine.inOut", immediateRender: false }}, SUBE);
      tl.fromTo(q(".am-mas"), {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }}, SUBE + 0.4);
      tl.to(q(".am-mas"), {{ y: -40, opacity: 0, duration: 0.3 }}, SUBE + 2.1);

      // entra Scalerics: el taxi se apaga un poco
      tl.to([q(".am-arriba"), q(".am-taxi")], {{ opacity: 0.35, duration: 0.5 }}, FIN);
      tl.to(q(".am-vin"), {{ opacity: 0.4, duration: 0.5 }}, FIN);

      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
open(os.path.join(D, "..", "compositions", "ambiente.html"), "w").write(html)
print("ambiente:", DUR, "s,", NF, "fichas, Scalerics en", FIN)
