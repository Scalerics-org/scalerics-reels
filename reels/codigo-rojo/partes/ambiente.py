# Arma compositions/ambiente.html (cartel de GUARDIA, balizas rojas, monitor cardíaco del local que
# corre todo el reel) y partes/latidos.json (los mismos latidos, para los bips de partes/guardia.mjs).
# Uso (desde reels/codigo-rojo): python3 partes/ambiente.py
import json

DUR = 72.88
V = 260          # px por segundo del trazo
NOW_X = 930      # x en pantalla del "ahora" (punta del trazo)
BASE = 1556      # línea base del trazo en pantalla

# latidos: (t, amplitud). Amplitud 0 = no hay latido.
lat = []
def tramo(a, b, per, amp0, amp1=None):
    amp1 = amp0 if amp1 is None else amp1
    t = a
    while t < b - 1e-6:
        k = (t - a) / max(0.001, b - a)
        lat.append([round(t, 3), round(amp0 + (amp1 - amp0) * k, 3)])
        t += per

tramo(0.15, 17.5, 0.5, 0.95)                 # código rojo: rápido
tramo(17.5, 22.1, 0.62, 0.85, 0.5)           # "cada cliente que se va es un bip menos"
lat[:] = [l for l in lat if not (19.6 < l[0] < 20.0 or 20.55 < l[0] < 20.95)]  # bips que faltan
tramo(22.1, 29.2, 0.8, 0.45, 0.35)           # el dueño se defiende
tramo(29.2, 30.3, 0.95, 0.28)                # desfibrilador cargando
lat.append([30.42, 1.7])                     # ¡despejen! (la descarga)
lat.append([30.95, 0.3])
# 31.67 "¡Nada!": línea plana hasta House
tramo(36.4, 53.5, 1.15, 0.22, 0.28)          # pulso débil
tramo(53.63, 60.5, 0.72, 0.4, 0.9)           # el agente contesta: cada mensaje, un latido más fuerte
tramo(60.51, DUR, 0.7, 1.0)                  # volvió el pulso
lat.sort()

# el trazo (coordenadas locales: x = t * V, y relativo a BASE)
def beat(x, a):
    y = BASE
    return (f" L{x:.1f} {y} L{x+8:.1f} {y-10*a:.1f} L{x+16:.1f} {y} L{x+24:.1f} {y} L{x+30:.1f} {y+18*a:.1f}"
            f" L{x+40:.1f} {y-70*a:.1f} L{x+50:.1f} {y+28*a:.1f} L{x+56:.1f} {y} L{x+70:.1f} {y-12*a:.1f} L{x+84:.1f} {y}")
d = f"M{-NOW_X:.0f} {BASE} L0 {BASE}"
for t, a in lat:
    if a > 0:
        d += beat(t * V, a)
d += f" L{(DUR + 1) * V:.0f} {BASE}"

json.dump(lat, open("partes/latidos.json", "w"))

ROJO = [[0.0, 8.07], [29.17, 36.31]]

html = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="ambiente"] .am-capa {{ position: absolute; inset: 0; }}
    [data-composition-id="ambiente"] svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    [data-composition-id="ambiente"] .am-cartel {{ position: absolute; left: 0; right: 0; margin: 0 auto; top: 96px; width: 380px; height: 84px; display: flex; align-items: center; justify-content: center; gap: 18px; background: #0b2e35; border: 6px solid #eef6f5; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; letter-spacing: 0.12em; color: #eef6f5; }}
    [data-composition-id="ambiente"] .am-cruz {{ width: 46px; height: 46px; position: relative; }}
    [data-composition-id="ambiente"] .am-cruz::before, [data-composition-id="ambiente"] .am-cruz::after {{ content: ""; position: absolute; background: #ff3341; }}
    [data-composition-id="ambiente"] .am-cruz::before {{ left: 15px; top: 0; width: 16px; height: 46px; }}
    [data-composition-id="ambiente"] .am-cruz::after {{ left: 0; top: 15px; width: 46px; height: 16px; }}
    [data-composition-id="ambiente"] .am-mon-lbl {{ position: absolute; left: 124px; top: 1446px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; color: #4fc3b0; white-space: nowrap; }}
    [data-composition-id="ambiente"] .am-estado {{ position: absolute; right: 76px; top: 1440px; height: 40px; width: 300px; }}
    [data-composition-id="ambiente"] .am-estado span {{ position: absolute; right: 0; top: 0; padding: 4px 14px 2px; border-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 28px; letter-spacing: 0.08em; white-space: nowrap; opacity: 0; }}
    [data-composition-id="ambiente"] .am-e1 {{ background: #ff3341; color: #eef6f5; }}
    [data-composition-id="ambiente"] .am-e2 {{ background: #eef6f5; color: #ff3341; }}
    [data-composition-id="ambiente"] .am-e3 {{ background: #5ce611; color: #03171b; }}
    [data-composition-id="ambiente"] .am-borde {{ position: absolute; inset: 0; border: 16px solid #ff3341; opacity: 0; }}
    [data-composition-id="ambiente"] .am-flash {{ position: absolute; inset: 0; background: #eef6f5; opacity: 0; }}
    [data-composition-id="ambiente"] .am-tinte {{ position: absolute; inset: 0; background: #ff3341; opacity: 0; mix-blend-mode: screen; }}
  </style>
  <div id="root" data-composition-id="ambiente" data-width="1080" data-height="1920" data-duration="{DUR}">
    <div id="am-escena" class="am-capa clip" data-start="0" data-duration="{DUR}" data-track-index="0">
      <div class="am-tinte"></div>
      <svg viewBox="0 0 1080 1920" aria-hidden="true">
        <defs><clipPath id="am-clip"><rect x="66" y="1420" width="{NOW_X - 66}" height="184" /></clipPath></defs>
        <!-- balizas -->
        <g class="am-baliza am-b1">
          <g class="am-haz1"><polygon points="70,140 -330,40 -330,240" fill="#ff3341" opacity="0.22" /><polygon points="70,140 470,40 470,240" fill="#ff3341" opacity="0.22" /></g>
          <path d="M40 160 C40 110 100 110 100 160 Z" fill="#ff3341" stroke="#eef6f5" stroke-width="6" stroke-linejoin="round" />
          <rect x="30" y="160" width="80" height="18" rx="5" fill="#0b2e35" stroke="#eef6f5" stroke-width="5" />
        </g>
        <g class="am-baliza am-b2">
          <g class="am-haz2"><polygon points="1010,140 610,40 610,240" fill="#ff3341" opacity="0.22" /><polygon points="1010,140 1410,40 1410,240" fill="#ff3341" opacity="0.22" /></g>
          <path d="M980 160 C980 110 1040 110 1040 160 Z" fill="#ff3341" stroke="#eef6f5" stroke-width="6" stroke-linejoin="round" />
          <rect x="970" y="160" width="80" height="18" rx="5" fill="#0b2e35" stroke="#eef6f5" stroke-width="5" />
        </g>
        <!-- monitor cardíaco del local -->
        <rect x="50" y="1426" width="980" height="178" rx="22" fill="#03171b" stroke="#4fc3b0" stroke-width="5" opacity="0.92" />
        <g opacity="0.25" stroke="#4fc3b0" stroke-width="2"><path d="M66 1516 H1014 M66 1556 H1014 M66 1590 H1014" /></g>
        <g clip-path="url(#am-clip)">
          <g class="am-traza">
            <path class="am-ecg" d="{d}" fill="none" stroke="#5ce611" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </g>
        <circle class="am-punta" cx="{NOW_X}" cy="{BASE}" r="9" fill="#eef6f5" />
        <g class="am-corazon"><path d="M74 1454 C74 1442 90 1438 96 1450 C102 1438 118 1442 118 1454 C118 1466 96 1478 96 1480 C96 1478 74 1466 74 1454 Z" fill="#ff3341" /></g>
      </svg>
      <div class="am-cartel"><span class="am-cruz"></span>GUARDIA</div>
      <div class="am-mon-lbl">PULSO DEL LOCAL</div>
      <div class="am-estado"><span class="am-e1">CRÍTICO</span><span class="am-e2">SIN PULSO</span><span class="am-e3">ESTABLE</span></div>
      <div class="am-borde"></div>
      <div class="am-flash"></div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "ambiente";
      const DUR = {DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const tl = gsap.timeline({{ paused: true }});
      const LAT = {json.dumps(lat)};
      const ROJO = {json.dumps(ROJO)};

      // el trazo corre: la punta siempre en x {NOW_X}
      tl.fromTo(q(".am-traza"), {{ x: {NOW_X} }}, {{ x: {NOW_X} - DUR * {V}, duration: DUR, ease: "none" }}, 0);
      // corazón y punta laten con cada latido
      for (const [t, a] of LAT) {{
        if (a <= 0) continue;
        tl.fromTo(q(".am-corazon"), {{ scale: 1, svgOrigin: "96 1460" }}, {{ scale: 1 + 0.35 * Math.min(1, a), svgOrigin: "96 1460", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }}, t + 0.15);
        tl.fromTo(q(".am-punta"), {{ y: 0 }}, {{ y: -60 * Math.min(1.2, a), duration: 0.04, yoyo: true, repeat: 1, ease: "none", immediateRender: false }}, t + 0.15);
      }}
      // color del trazo: rojo cuando está plano, verde el resto
      tl.to(q(".am-ecg"), {{ stroke: "#ff3341", duration: 0.1 }}, 31.6);
      tl.to(q(".am-ecg"), {{ stroke: "#5ce611", duration: 0.3 }}, 36.3);
      tl.to(q(".am-corazon path"), {{ fill: "#5ce611", duration: 0.2 }}, 60.51);

      // estado del paciente
      const est = [[".am-e1", 0, 31.6], [".am-e2", 31.67, 36.31], [".am-e1", 36.31, 60.45], [".am-e3", 60.51, DUR]];
      for (const [s, a, b] of est) {{
        tl.fromTo(q(s), {{ opacity: 0, x: 30 }}, {{ opacity: 1, x: 0, duration: 0.2, immediateRender: false }}, a);
        tl.to(q(s), {{ opacity: 0, duration: 0.08 }}, b);
      }}
      gsap.set(q(".am-e1"), {{ opacity: 1 }});
      tl.to(q(".am-e2"), {{ opacity: 0.35, duration: 0.25, yoyo: true, repeat: 9, ease: "steps(1)" }}, 31.9);
      tl.fromTo(q(".am-e3"), {{ scale: 1 }}, {{ scale: 1.12, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }}, 60.8);

      // balizas: giran y tiñen en los tramos de código rojo; apagadas el resto
      gsap.set([q(".am-haz1"), q(".am-haz2")], {{ opacity: 0 }});
      for (const [a, b] of ROJO) {{
        tl.set([q(".am-haz1"), q(".am-haz2")], {{ opacity: 1 }}, a);
        tl.fromTo(q(".am-haz1"), {{ rotation: 0, svgOrigin: "70 140" }}, {{ rotation: 360 * Math.round((b - a) / 0.9), svgOrigin: "70 140", duration: b - a, ease: "none", immediateRender: false }}, a);
        tl.fromTo(q(".am-haz2"), {{ rotation: 0, svgOrigin: "1010 140" }}, {{ rotation: -360 * Math.round((b - a) / 0.9), svgOrigin: "1010 140", duration: b - a, ease: "none", immediateRender: false }}, a);
        tl.set([q(".am-haz1"), q(".am-haz2")], {{ opacity: 0 }}, b);
        for (let t = a; t < b - 0.3; t += 0.9) {{
          tl.fromTo(q(".am-borde"), {{ opacity: 0 }}, {{ opacity: 0.55, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }}, t);
          tl.fromTo(q(".am-tinte"), {{ opacity: 0 }}, {{ opacity: 0.1, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }}, t);
        }}
      }}
      tl.to([q(".am-b1"), q(".am-b2")], {{ opacity: 0.45, duration: 0.3 }}, 8.07);
      tl.to([q(".am-b1"), q(".am-b2")], {{ opacity: 1, duration: 0.1 }}, 29.1);
      tl.to([q(".am-b1"), q(".am-b2")], {{ opacity: 0.45, duration: 0.3 }}, 36.31);
      tl.to([q(".am-b1"), q(".am-b2")], {{ opacity: 0, y: -60, duration: 0.3 }}, 60.51);

      // flashes: la descarga del desfibrilador y el alta
      const flash = (t, o) => {{ tl.to(q(".am-flash"), {{ opacity: o, duration: 0.03 }}, t); tl.to(q(".am-flash"), {{ opacity: 0, duration: 0.25 }}, t + 0.06); }};
      flash(30.42, 0.85);
      flash(60.51, 0.4);
      // en el CTA el cartel se va (el monitor queda latiendo)
      tl.to(q(".am-cartel"), {{ opacity: 0, y: -40, duration: 0.3 }}, 64.3);

      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
open("compositions/ambiente.html", "w").write(html)
print("ambiente:", len(lat), "latidos; trazo", len(d), "caracteres")
