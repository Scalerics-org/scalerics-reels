#!/usr/bin/env python3
# Arma compositions/<id>.html desde .fuente/<id>.src (secciones @@CSS, @@HTML, @@JS, @@DUR).
# "$ " al principio de una línea CSS = [data-composition-id="<id>"]. {{duenio x y s clase}} etc. = personajes.
import sys, re, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/..")

def duenio(x, y, s, c=""):
    return f'''<g transform="translate({x} {y}) scale({s})"><g class="{c}">
  <path class="silueta {c}-cuerpo" d="M-120 110 C-115 25 -70 -5 0 -5 C70 -5 115 25 120 110 Z" />
  <path class="linea {c}-cuello" d="M-35 -3 L0 45 L35 -3" />
  <path class="{c}-corbata" d="M-8 45 L8 45 L16 105 L0 122 L-16 105 Z" fill="#e63946" />
  <ellipse class="silueta {c}-cabeza" cx="0" cy="-85" rx="64" ry="76" />
  <path class="linea {c}-pelo" d="M-62 -100 C-70 -130 -58 -148 -44 -152 M62 -100 C70 -130 58 -148 44 -152" />
  <path class="linea {c}-ojos" d="M-19 -95 v3 M19 -95 v3" style="stroke-width: 11" />
  <path class="linea {c}-ojeras" d="M-30 -78 q11 6 22 0 M8 -78 q11 6 22 0" style="stroke-width: 3; opacity: 0.6" />
  <path class="linea {c}-bigote" d="M-26 -50 q26 -16 52 0" />
  <path class="linea {c}-boca" d="M-16 -36 q16 10 32 0" />
</g></g>'''

def agente(x, y, s, c=""):
    return f'''<g transform="translate({x} {y}) scale({s})"><g class="{c}">
  <path class="silueta {c}-cuerpo" d="M-120 110 C-115 25 -70 -5 0 -5 C70 -5 115 25 120 110 Z" />
  <path class="celeste {c}-cuello" d="M-30 -3 L0 35 L30 -3" />
  <path class="linea {c}-antena" d="M0 -158 V-188" />
  <circle class="{c}-bombita" cx="0" cy="-196" r="9" fill="#57c4e5" />
  <rect class="silueta {c}-cabeza" x="-72" y="-158" width="144" height="122" rx="28" style="stroke: #57c4e5" />
  <g class="{c}-ojos"><circle cx="-27" cy="-104" r="10" fill="#57c4e5" /><circle cx="27" cy="-104" r="10" fill="#57c4e5" /></g>
  <path class="celeste {c}-boca" d="M-24 -72 q24 16 48 0" />
</g></g>'''

def moderadora(x, y, s, c=""):
    return f'''<g transform="translate({x} {y}) scale({s})"><g class="{c}">
  <path class="silueta {c}-cuerpo" d="M-115 110 C-110 25 -68 -5 0 -5 C68 -5 110 25 115 110 Z" />
  <path class="dorado {c}-cuello" d="M-30 -3 L0 30 L30 -3" />
  <ellipse class="silueta {c}-cabeza" cx="0" cy="-85" rx="58" ry="70" />
  <path class="{c}-pelo" d="M-70 -40 C-86 -150 -40 -178 0 -175 C40 -178 86 -150 70 -40 L52 -40 C56 -110 34 -136 0 -134 C-34 -136 -56 -110 -52 -40 Z" fill="#f2c14e" />
  <g class="{c}-lentes"><circle class="linea" cx="-22" cy="-88" r="15" style="stroke-width: 4" /><circle class="linea" cx="22" cy="-88" r="15" style="stroke-width: 4" /><path class="linea" d="M-7 -88 h14" style="stroke-width: 4" /></g>
  <path class="linea {c}-boca" d="M-14 -46 h28" />
</g></g>'''

PERS = {"duenio": duenio, "agente": agente, "moderadora": moderadora}

CSS_BASE = '''$ .capa { position: absolute; inset: 0; }
$ .escenario { position: absolute; inset: 0; }
$ svg.lienzo { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
$ .linea { fill: none; stroke: #f4f4f4; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
$ .silueta { fill: #0b1a3a; stroke: #f4f4f4; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
$ .rojo { fill: none; stroke: #e63946; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
$ .celeste { fill: none; stroke: #57c4e5; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
$ .dorado { fill: none; stroke: #f2c14e; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
$ .verde { fill: none; stroke: #2ec27e; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
$ .etq { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.3em; color: #f2c14e; white-space: nowrap; }
$ .zocalo { position: absolute; padding: 10px 20px 8px; font-family: "Outfit", sans-serif; font-weight: 800; font-size: 34px; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; border-radius: 4px; }
$ .z-rojo { background: #e63946; color: #f4f4f4; }
$ .z-celeste { background: #57c4e5; color: #0b1a3a; }
$ .z-dorado { background: #f2c14e; color: #0b1a3a; }
$ .tarjeta { position: absolute; background: #f4f4f4; border-radius: 22px; box-sizing: border-box; }
$ .cinta { position: absolute; left: 0; right: 0; top: 0; height: 64px; border-radius: 22px 22px 0 0; background: #f2c14e; color: #0b1a3a; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.26em; line-height: 64px; text-align: center; }
$ .globo { position: absolute; padding: 16px 24px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 42px; line-height: 1.2; white-space: nowrap; box-sizing: border-box; }
$ .g-cli { background: #dfe6f2; color: #0b1a3a; border-bottom-left-radius: 6px; }
$ .g-loc { background: #57c4e5; color: #0b1a3a; border-bottom-right-radius: 6px; }
$ .g-osc { background: #16306a; color: #f4f4f4; border-bottom-right-radius: 6px; }
$ .hora { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; color: #5a6b8c; white-space: nowrap; }
$ .sello { position: absolute; padding: 6px 30px 4px; border: 9px solid #e63946; border-radius: 14px; font-family: "Outfit", sans-serif; font-weight: 900; font-size: 110px; line-height: 1; letter-spacing: 0.06em; color: #e63946; white-space: nowrap; background: rgba(244, 244, 244, 0.88); }
$ .s-verde { border-color: #2ec27e; color: #2ec27e; }
$ .cartel { position: absolute; padding: 18px 30px 14px; border-radius: 10px; font-family: "Outfit", sans-serif; font-weight: 900; line-height: 1.02; text-transform: uppercase; text-align: center; white-space: nowrap; }
$ .c-rojo { background: #e63946; color: #f4f4f4; border: 5px solid #f4f4f4; }
$ .c-dorado { background: #f2c14e; color: #0b1a3a; border: 5px solid #f4f4f4; }
$ .c-celeste { background: #57c4e5; color: #0b1a3a; border: 5px solid #f4f4f4; }
$ .grande { position: absolute; left: 0; right: 0; text-align: center; font-family: "Outfit", sans-serif; font-weight: 900; line-height: 1; white-space: nowrap; }'''

JS_BASE = '''      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const dibujar = (els, t, dur, desde) => {
        els.forEach((el, i) => {
          const L = el.getTotalLength();
          gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
          gsap.set(el, { opacity: 0 });
          tl.to(el, { opacity: 1, duration: 0.04 }, Math.max(0, t + i * 0.04));
          tl.fromTo(el, { strokeDashoffset: L * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, Math.max(0, t + i * 0.04));
        });
      };
      const pop = (el, t, d) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d ?? 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
      };
      const popSvg = (el, t, origen) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.6, svgOrigin: origen }, { opacity: 1, scale: 1, svgOrigin: origen, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t);
      };
      const subir = (el, t, dy) => {
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: dy ?? 120 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, t);
      };
      const salir = (el, t) => tl.to(el, { opacity: 0, scale: 0.9, duration: 0.18, ease: "power2.in" }, t);
      const temblor = (el, t, f) => [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045));
      const sello = (el, t, rot) => {
        gsap.set(el, { opacity: 0, rotation: rot ?? -10 });
        tl.fromTo(el, { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.12);
        temblor(q(".escenario"), t + 0.03, 0.8);
      };
      const tipear = (el, t, cps) => {
        const txt = el.textContent;
        el.innerHTML = [...txt].map((c) => `<span class="k" style="opacity:0">${c === " " ? "&nbsp;" : c}</span>`).join("");
        el.querySelectorAll(".k").forEach((k, i) => tl.to(k, { opacity: 1, duration: 0.01 }, t + i / (cps ?? 30)));
      };
      const etiquetas = (lista) => {
        lista.forEach(([txt, t], i) => {
          const el = document.createElement("div");
          el.className = "etq";
          el.innerHTML = txt;
          q(".capa").appendChild(el);
          gsap.set(el, { opacity: 0 });
          tl.fromTo(el, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, t);
          if (i + 1 < lista.length) tl.to(el, { opacity: 0, y: 10, duration: 0.15 }, lista[i + 1][1] - 0.15);
        });
      };'''

def build(sid):
    src = open(f".fuente/{sid}.src").read()
    sec = dict(re.findall(r"@@(\w+)\n(.*?)(?=\n@@|\Z)", src, re.S))
    dur = sec["DUR"].strip()
    pref = f'[data-composition-id="{sid}"]'
    css = "\n".join("    " + (pref + l[1:] if l.startswith("$ ") else l) for l in (CSS_BASE + "\n" + sec.get("CSS", "")).strip().split("\n"))
    html = sec["HTML"]
    html = re.sub(r"\{\{(\w+) ([\d.-]+) ([\d.-]+) ([\d.]+) ([\w-]+)\}\}", lambda m: PERS[m[1]](m[2], m[3], m[4], m[5]), html)
    html = "\n".join("        " + l for l in html.strip().split("\n"))
    out = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face {{ font-family: "Outfit"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Outfit-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
{css}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-duration="{dur}">
    <div id="{sid}-escena" class="capa clip" data-start="0" data-duration="{dur}" data-track-index="0">
      <div class="escenario">
{html}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{sid}";
      const DUR = {dur};
{JS_BASE}
{sec["JS"].rstrip()}
      tl.to(q("#{sid}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }}, DUR - 0.3);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
    open(f"compositions/{sid}.html", "w").write(out)
    if "SFX" in sec:
        open(f"compositions/{sid}.sfx.json", "w").write(sec["SFX"].strip() + "\n")
    print("ok", sid)

for s in sys.argv[1:]:
    build(s)
