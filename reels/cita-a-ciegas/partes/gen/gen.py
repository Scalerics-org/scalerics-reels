# Genera ../../compositions/sXX-*.html desde src/*.tpl, expandiendo personajes (clienta, local), confesionario, medidor, letrero y helpers. Uso: python3 partes/gen/gen.py [s03 ...]
import re, sys, os, glob
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
OSC, CREMA, CIR, CIR2, CORAL, TURQ, AMAR = "#120a22", "#fff3e0", "#3b1d5a", "#241238", "#ff6f59", "#22d1c3", "#ffc857"

def brazo(cls, d):
    return (f'<g class="{cls}"><path d="{d}" fill="none" stroke="{OSC}" stroke-width="32" stroke-linecap="round" />'
            f'<path d="{d}" fill="none" stroke="{CREMA}" stroke-width="19" stroke-linecap="round" /></g>')

def clienta(p, pijama=False):
    vestido = TURQ if pijama else CORAL
    rayas = "".join(f'<path d="M{x} -190 L{x - 8} 20" stroke="{CREMA}" stroke-width="10" opacity="0.8" />' for x in (-60, -20, 20, 60)) if pijama else ""
    return f'''<svg class="{p}-svg" viewBox="-160 -430 320 450" aria-hidden="true">
            <g class="{p}-todo">
              <circle cx="0" cy="-290" r="84" fill="{OSC}" />
              <g class="{p}-rodete"><circle cx="0" cy="-380" r="40" fill="{OSC}" /><rect x="-22" y="-352" width="44" height="12" rx="6" fill="{TURQ if not pijama else CORAL}" /></g>
              <path d="M-112 20 L-94 -150 Q-82 -192 -40 -198 L40 -198 Q82 -192 94 -150 L112 20 Z" fill="{vestido}" stroke="{OSC}" stroke-width="7" stroke-linejoin="round" />
              {rayas}
              <rect x="-18" y="-226" width="36" height="34" fill="{CREMA}" />
              <path d="M-32 -198 Q0 -158 32 -198" fill="{CREMA}" stroke="{OSC}" stroke-width="5" />
              {brazo(p + "-bi", "M-84 -168 Q-124 -100 -110 -20")}
              {brazo(p + "-bd", "M84 -168 Q124 -100 110 -20")}
              <g class="{p}-cabeza">
                <circle cx="0" cy="-282" r="70" fill="{CREMA}" stroke="{OSC}" stroke-width="7" />
                <path d="M-71 -286 Q-64 -354 0 -356 Q64 -354 71 -286 Q46 -322 6 -318 Q-34 -320 -71 -286 Z" fill="{OSC}" />
                <g class="{p}-ojos"><circle cx="-26" cy="-276" r="8.5" fill="{OSC}" /><circle cx="26" cy="-276" r="8.5" fill="{OSC}" /></g>
                <circle cx="-45" cy="-250" r="11" fill="{CORAL}" opacity="0.55" /><circle cx="45" cy="-250" r="11" fill="{CORAL}" opacity="0.55" />
                <path class="{p}-boca" d="M-18 -244 Q0 -228 18 -244" fill="none" stroke="{OSC}" stroke-width="6" stroke-linecap="round" />
                <circle cx="-72" cy="-252" r="10" fill="{TURQ}" stroke="{OSC}" stroke-width="4" /><circle cx="72" cy="-252" r="10" fill="{TURQ}" stroke="{OSC}" stroke-width="4" />
              </g>
            </g>
          </svg>'''

def local(p, nombre="TU LOCAL", color=CORAL, fs=36):
    rayas = "".join(f'<path d="M{x} -346 L{x - 4} -292 H{x + 26} L{x + 30} -346 Z" fill="{color}" />' for x in range(-130, 140, 60))
    ondas = "".join(f'<path d="M{x} -292 a14 14 0 0 0 28 0" fill="{CREMA if (x // 28) % 2 else color}" stroke="{OSC}" stroke-width="4" />' for x in range(-140, 140, 28))
    return f'''<svg class="{p}-svg" viewBox="-170 -430 340 440" aria-hidden="true">
            <g class="{p}-todo">
              <rect x="-150" y="-418" width="300" height="70" rx="12" fill="{CREMA}" stroke="{OSC}" stroke-width="6" />
              <text x="0" y="-370" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="800" font-size="{fs}" letter-spacing="1" fill="{OSC}">{nombre}</text>
              <rect x="-140" y="-346" width="280" height="346" fill="{CIR}" stroke="{CREMA}" stroke-width="6" />
              <path d="M-152 -346 H152 L142 -292 H-142 Z" fill="{CREMA}" />
              {rayas}
              {ondas}
              <path d="M-152 -346 H152 L142 -292 H-142 Z" fill="none" stroke="{OSC}" stroke-width="5" stroke-linejoin="round" />
              <rect class="{p}-vidriera" x="-120" y="-262" width="152" height="122" rx="8" fill="{OSC}" stroke="{CREMA}" stroke-width="5" />
              <g class="{p}-ojos"><ellipse cx="-72" cy="-214" rx="13" ry="18" fill="{CREMA}" /><ellipse cx="-16" cy="-214" rx="13" ry="18" fill="{CREMA}" /></g>
              <path class="{p}-boca" d="M-64 -174 Q-44 -156 -24 -174" fill="none" stroke="{CREMA}" stroke-width="6" stroke-linecap="round" />
              <g class="{p}-mono"><path d="M-44 -112 L-80 -130 L-80 -94 Z M-44 -112 L-8 -130 L-8 -94 Z" fill="{AMAR}" stroke="{OSC}" stroke-width="4" stroke-linejoin="round" /><circle cx="-44" cy="-112" r="9" fill="{AMAR}" stroke="{OSC}" stroke-width="4" /></g>
              <rect class="{p}-puerta" x="50" y="-252" width="76" height="252" rx="4" fill="{CIR2}" stroke="{CREMA}" stroke-width="5" />
              <circle class="{p}-pomo" cx="112" cy="-124" r="7" fill="{AMAR}" />
              <path d="M-162 0 H162" stroke="{CREMA}" stroke-width="7" stroke-linecap="round" />
            </g>
          </svg>'''

def corazon(cls, cx, cy, s, fill, extra=""):
    # corazón geométrico: dos círculos y un rombo; ancho ~ 2.2*s
    return (f'<g class="{cls}" {extra}><path d="M{cx} {cy + 1.25 * s} L{cx - 1.05 * s} {cy + 0.1 * s} A{0.58 * s} {0.58 * s} 0 0 1 {cx} {cy - 0.62 * s} '
            f'A{0.58 * s} {0.58 * s} 0 0 1 {cx + 1.05 * s} {cy + 0.1 * s} Z" fill="{fill}" stroke="{OSC}" stroke-width="5" stroke-linejoin="round" /></g>')

def confe(p, quien):
    tiras = "".join(f'<rect x="{x}" y="640" width="32" height="800" fill="{CIR if i % 2 else CIR2}" />' for i, x in enumerate(range(150, 930, 32)))
    return f'''<g class="{p}-cortina">{tiras}<rect x="150" y="640" width="780" height="800" fill="none" stroke="{OSC}" stroke-width="6" />
            <path d="M150 640 H930 V700 Q540 730 150 700 Z" fill="{CIR}" stroke="{OSC}" stroke-width="5" /></g>
          <g class="{p}-sillon">
            <rect x="300" y="990" width="480" height="420" rx="70" fill="{CIR}" stroke="{CREMA}" stroke-width="6" />
            <rect x="250" y="1210" width="110" height="230" rx="40" fill="{CIR2}" stroke="{CREMA}" stroke-width="6" />
            <rect x="720" y="1210" width="110" height="230" rx="40" fill="{CIR2}" stroke="{CREMA}" stroke-width="6" />
          </g>
          <g class="{p}-marco">
            <path d="M120 690 V610 H200 M880 610 H960 V690 M960 1390 V1470 H880 M200 1470 H120 V1390" fill="none" stroke="{CREMA}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
            <circle class="{p}-rec" cx="172" cy="660" r="14" fill="{CORAL}" />
            <text x="198" y="671" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="30" letter-spacing="3" fill="{CREMA}">REC</text>
            <rect x="290" y="1428" width="500" height="58" rx="10" fill="{OSC}" stroke="{AMAR}" stroke-width="4" />
            <text x="540" y="1468" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="28" letter-spacing="3" fill="{AMAR}">CONFESIONARIO · {quien}</text>
          </g>'''

def medidor(p):
    # medidor grande: pivote en (540, 1090), radio 270
    return f'''<g class="{p}-med">
            <path d="M230 1110 A310 310 0 0 1 850 1110 Z" fill="{CIR2}" stroke="{CREMA}" stroke-width="7" stroke-linejoin="round" />
            <path d="M285 1090 A255 255 0 0 1 375 895" fill="none" stroke="{CORAL}" stroke-width="54" />
            <path d="M392 882 A255 255 0 0 1 688 882" fill="none" stroke="{AMAR}" stroke-width="54" />
            <path d="M705 895 A255 255 0 0 1 795 1090" fill="none" stroke="{TURQ}" stroke-width="54" />
            <g class="{p}-aguja"><path d="M540 1090 L540 870" stroke="{CREMA}" stroke-width="18" stroke-linecap="round" /><path d="M540 1090 L540 870" stroke="{OSC}" stroke-width="5" stroke-linecap="round" /></g>
            <circle cx="540" cy="1090" r="30" fill="{CREMA}" stroke="{OSC}" stroke-width="6" />
            <text x="540" y="750" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="38" letter-spacing="8" fill="{CREMA}">QUÍMICA</text>
          </g>'''

def letrero(p, y, html, borde=TURQ):
    bulbs = "".join(f'<circle class="{p}-bomb" cx="{x}" cy="{y + 22}" r="9" fill="{AMAR}" /><circle class="{p}-bomb" cx="{x}" cy="{y + 178}" r="9" fill="{AMAR}" />' for x in range(170, 931, 48))
    return f'''<svg class="{p}-letrero-svg" viewBox="0 0 1080 1920" style="left:0;top:0;width:1080px;height:1920px" aria-hidden="true">
            <rect x="130" y="{y}" width="820" height="200" rx="34" fill="{CIR}" stroke="{borde}" stroke-width="8" />
            <rect x="160" y="{y + 40}" width="760" height="120" rx="18" fill="{CIR2}" />
            {bulbs}
          </svg>
          <div class="{p}-letrero-txt" style="position:absolute;left:0;right:0;top:{y + 52}px;text-align:center;font-family:Lexend,sans-serif;font-weight:900;font-size:86px;line-height:1;letter-spacing:0.01em;color:{CREMA};white-space:nowrap;-webkit-text-stroke:6px {OSC};paint-order:stroke fill">{html}</div>'''

HELPERS = '''const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => root.querySelectorAll(s);
      const tl = gsap.timeline({ paused: true });
      const sacudon = (el, t, f) => [[-14 * f, 8 * f], [10 * f, -6 * f], [-5 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(el, { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      const pop = (el, t, d) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: d || 0.32, ease: "back.out(2)", immediateRender: false }, t); };
      const golpe = (el, t, rot) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 2.6, rotation: (rot || 0) * 2 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.12); };
      const dibujar = (els, t, d) => { [].concat(els).forEach((el) => { const L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t); tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: "power2.inOut" }, t); }); };
      const parpadeo = (el, ts) => ts.forEach((t) => tl.to(el, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.06, yoyo: true, repeat: 1 }, t));'''

FONTS = '''@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }'''

def expand(txt):
    txt = txt.replace("/*@FONTS*/", FONTS).replace("//@HELPERS", HELPERS)
    txt = re.sub(r"<!--@CLIENTA (\S+)( pijama)?-->", lambda m: clienta(m.group(1), bool(m.group(2))), txt)
    txt = re.sub(r"<!--@LOCAL (\S+)-->", lambda m: local(m.group(1)), txt)
    txt = re.sub(r"<!--@OTRO (\S+)-->", lambda m: local(m.group(1), "OTRO LOCAL", TURQ, 34), txt)
    txt = re.sub(r"<!--@CORAZON (\S+) (\S+) (\S+) (\S+) (\S+)-->", lambda m: corazon(m.group(1), float(m.group(2)), float(m.group(3)), float(m.group(4)), m.group(5)), txt)
    txt = re.sub(r"<!--@CONFE (\S+) (\S+)-->", lambda m: confe(m.group(1), m.group(2)), txt)
    txt = re.sub(r"<!--@MEDIDOR (\S+)-->", lambda m: medidor(m.group(1)), txt)
    txt = re.sub(r"<!--@LETRERO (\S+) (\d+) (.+?)-->", lambda m: letrero(m.group(1), int(m.group(2)), m.group(3)), txt)
    return txt

for f in sorted(glob.glob(os.path.join(SRC, "*.tpl"))):
    if len(sys.argv) > 1 and not any(a in f for a in sys.argv[1:]): continue
    out = os.path.join(OUT, os.path.basename(f)[:-4] + ".html")
    open(out, "w").write(expand(open(f).read()))
    print("->", out)
