from base import *
import re
p = "s15"
local = open("s14.py").read()
css = """
    [data-composition-id="%ID%"] .s15-local { left: 20px; top: 760px; width: 560px; height: 640px; }
    [data-composition-id="%ID%"] .s15-bar { left: 600px; top: 700px; }
    [data-composition-id="%ID%"] .s15-div { top: 470px; font-size: 230px; }
    [data-composition-id="%ID%"] .s15-sello { left: 120px; top: 1400px; font-size: 64px; color: #d8b25c; transform: rotate(-6deg); }
"""
exec(re.search(r'rayas = .*?\n', local).group(0))
exec(re.search(r"local = f'''.*?'''", local, re.S).group(0))
local = local.replace("s14-", "s15-")
tij = f'''<svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="s15-corte" d="M60 720 L1020 720" stroke="{V}" stroke-width="6" stroke-dasharray="18 14" fill="none"/>
  <g class="s15-tij"><path d="M0 -10 L90 20" stroke="{K}" stroke-width="18" stroke-linecap="round"/><path d="M0 -10 L90 20" stroke="{D}" stroke-width="10" stroke-linecap="round"/>
    <path d="M0 10 L90 -20" stroke="{K}" stroke-width="18" stroke-linecap="round"/><path d="M0 10 L90 -20" stroke="{D}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="-22" cy="-18" r="20" fill="none" stroke="{D}" stroke-width="8"/><circle cx="-22" cy="18" r="20" fill="none" stroke="{D}" stroke-width="8"/></g>
  <g class="s15-br">{flash("s15-b", 160, 640, 46, D)}{flash("s15-b", 940, 660, 54, F)}{flash("s15-b", 560, 760, 40, W)}{flash("s15-b", 820, 1300, 44, D)}</g></svg>'''
body = f"""
        {tij}
        <div class="obj s15-local">{local}</div>
        <div class="fig s15-bar">{critica('s15b')}</div>
        <div class="rev it f s15-div">Divino.</div>
        <div class="sello s15-sello">Impecable</div>
"""
js = """
      const CORT = 0.0, TRAB = 0.73, NEG = 1.42, AHORA = 2.30, SI = 2.56, DIV = 3.17;
      // cuadro 0: las tijeras cortan a medida
      gsap.set(q(".s15-tij"), { x: 60, y: 720 });
      tl.to(q(".s15-tij"), { x: 1020, duration: 1.3, ease: "power1.inOut" }, 0);
      tl.fromTo(q(".s15-corte"), { opacity: 0.25 }, { opacity: 1, duration: 1.3 }, 0);
      tl.to(q(".s15-tij"), { scaleY: 0.4, duration: 0.08, yoyo: true, repeat: 15 }, 0);
      tl.to(q(".s15-tij"), { opacity: 0, duration: 0.2 }, 1.3);
      tl.fromTo(q(".s15-local"), { x: -80, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.to(q(".s15-local"), { rotation: -3, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, TRAB);
      // Bárbara aprueba
      gsap.set(q(".s15-bar"), { transformOrigin: "50% 100%" });
      tl.fromTo(q(".s15-bar"), { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, NEG - 0.3);
      tl.to(q(".s15b-gafas"), { y: 26, duration: 0.3 }, AHORA - 0.2);
      tl.to(q(".s15b-bi"), { rotation: -60, svgOrigin: "150 292", duration: 0.12, yoyo: true, repeat: 7 }, SI);
      tl.to(q(".s15b-bd"), { rotation: 60, svgOrigin: "250 292", duration: 0.12, yoyo: true, repeat: 7 }, SI);
      habla(".s15b-boca", AHORA, 1.4, "200 240");
      golpe(q(".s15-div"), DIV, -4, 3);
      sacudon(DIV + 0.04, 1.3);
      golpe(q(".s15-sello"), DIV + 0.35, -6, 2.4);
      gsap.set(qa(".s15-b"), { opacity: 0 });
      qa(".s15-b").forEach((s, i) => tl.fromTo(s, { opacity: 1, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.4, duration: 0.45, immediateRender: false }, DIV + i * 0.12));
      tl.to(q(".s15-div"), { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3 }, DIV + 0.2);
"""
sfx = [{"t": 0.0, "sfx": "click", "vol": 0.3}, {"t": 0.35, "sfx": "click", "vol": 0.3}, {"t": 0.7, "sfx": "click", "vol": 0.3},
       {"t": 1.2, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.56, "sfx": "pop", "vol": 0.25}, {"t": 3.12, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 3.2, "sfx": "sparkle", "vol": 0.35}]
escena("s15-divino", p, 4.64, css, body, js, sfx)
