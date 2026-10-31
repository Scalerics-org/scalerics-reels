from base import *
p = "s05"
css = """
    [data-composition-id="%ID%"] .s05-hugo { left: 120px; top: 640px; }
    [data-composition-id="%ID%"] .s05-chico { left: 560px; top: 640px; font-size: 120px; color: #ff2e88; }
    [data-composition-id="%ID%"] .s05-cont { left: 640px; top: 900px; text-align: left; }
    [data-composition-id="%ID%"] .s05-cont b { display: block; font-family: "Cormorant", serif; font-weight: 600; font-size: 150px; line-height: 0.9; color: #d8b25c; text-shadow: 0 6px 0 #0e0c10; }
    [data-composition-id="%ID%"] .s05-cont small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.2em; color: #f6f1ea; }
    [data-composition-id="%ID%"] .s05-bol { left: 540px; top: 1100px; font-size: 90px; }
"""
import math
tor = ""
for i in range(42):
    x = 120 + (i * 137) % 860
    y = 1280 + (i * 53) % 140
    r = (i * 67) % 180
    tor += f'<g class="s05-t" data-x="{x}" data-y="{y}" data-r="{r}"><g transform="translate({x} {y}) rotate({r}) scale(1.7)"><rect x="-6" y="-2" width="12" height="40" fill="{GL}" stroke="{K}" stroke-width="3"/><path d="M-6 8 L6 14 M-6 18 L6 24 M-6 28 L6 34" stroke="{K}" stroke-width="3"/><rect x="-16" y="-12" width="32" height="12" rx="4" fill="{GL}" stroke="{K}" stroke-width="3"/></g></g>'
bolsillo = f'<rect class="s05-bols" x="320" y="1210" width="130" height="100" rx="8" fill="#2a2530" stroke="{G}" stroke-width="4"/>'
body = f"""
        <div class="fig s05-hugo">{hugo('s05h')}</div>
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{bolsillo}{tor}</svg>
        <div class="sello s05-chico">Chico</div>
        <div class="obj s05-cont"><b>40.000</b><small>tornillos sueltos</small></div>
        <div class="rev it s05-bol">¿en el bolsillo?</div>
"""
js = """
      const CHICO = 0.34, CUAR = 1.61, TOR = 2.20, DONDE = 2.79, METE = 3.73, BOL = 4.49;
      const h = q(".s05-hugo");
      // cuadro 0: Don Hugo de frente, el buzo le aprieta
      gsap.set(h, { scale: 1.1, transformOrigin: "50% 100%" });
      tl.fromTo(h, { y: 40 }, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
      tl.to(q(".s05h-panza"), { scale: 1.08, svgOrigin: "200 440", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.1);
      golpe(q(".s05-chico"), CHICO, -10, 2.6);
      sacudon(CHICO + 0.04, 1.3);
      tl.fromTo(q(".s05h-costura"), { opacity: 1 }, { opacity: 0.1, duration: 0.08, yoyo: true, repeat: 9, immediateRender: false }, CHICO);
      tl.to(q(".s05h-ceja"), { y: 8, duration: 0.2 }, CHICO + 0.3);
      // cuarenta mil tornillos
      tl.to(q(".s05-chico"), { y: -40, opacity: 0, duration: 0.25 }, CUAR - 0.3);
      pop(q(".s05-cont"), CUAR, 0.3);
      tl.to(q(".s05-cont b"), { scale: 1.08, transformOrigin: "0% 50%", duration: 0.12, yoyo: true, repeat: 3 }, TOR);
      const ts = qa(".s05-t");
      ts.forEach((t, i) => { gsap.set(t, { opacity: 0 }); tl.fromTo(t, { opacity: 1, y: -900 - (i % 7) * 60 }, { opacity: 1, y: 0, duration: 0.55, ease: "bounce.out", immediateRender: false }, TOR + (i % 14) * 0.05); });
      tl.to(h, { rotation: -4, duration: 0.15, yoyo: true, repeat: 5 }, DONDE);
      tl.to(q(".s05h-bi"), { rotation: 35, svgOrigin: "148 300", duration: 0.3, ease: "back.out(2)" }, DONDE);
      tl.to(q(".s05h-bd"), { rotation: -35, svgOrigin: "252 300", duration: 0.3, ease: "back.out(2)" }, DONDE);
      // ¿en el bolsillo?
      tl.to(q(".s05-cont"), { y: -30, opacity: 0, duration: 0.25 }, METE + 0.1);
      gsap.set(q(".s05-bols"), { opacity: 0 });
      tl.to(q(".s05-bols"), { opacity: 1, duration: 0.1 }, BOL - 0.4);
      tl.to(ts, { x: (i) => 385 - Number(ts[i].dataset.x), y: (i) => 1250 - Number(ts[i].dataset.y), scale: 0.5, duration: 0.45, stagger: 0.008, ease: "power3.in" }, BOL - 0.35);
      tl.to(q(".s05-bols"), { scaleY: 1.5, svgOrigin: "385 1300", duration: 0.12, yoyo: true, repeat: 5 }, BOL + 0.15);
      pop(q(".s05-bol"), BOL, 0.3, { rotation: -3 });
"""
sfx = [{"t": 0.3, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.6}, {"t": 1.6, "sfx": "pop", "vol": 0.3}, {"t": 2.25, "sfx": "typing", "vol": 0.35, "max": 0.9},
       {"t": 2.6, "sfx": "click", "vol": 0.25}, {"t": 4.15, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 4.5, "sfx": "pop", "vol": 0.3}]
escena("s05-chico", p, 6.23, css, body, js, sfx)
