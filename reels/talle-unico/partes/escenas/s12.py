from base import *
p = "s12"
css = """
    [data-composition-id="%ID%"] .s12-bar { left: 640px; top: 680px; }
    [data-composition-id="%ID%"] .s12-pie { left: 20px; top: 820px; width: 640px; height: 560px; }
    [data-composition-id="%ID%"] .s12-t { top: 470px; font-size: 120px; }
"""
pie = f'''<svg viewBox="0 0 640 560" aria-hidden="true">
  <g class="s12-zap"><path d="M380 430 L560 400 Q600 400 600 440 L600 470 Q500 520 400 500 Q370 480 380 430 Z" fill="{F}" {S}/>
    <path d="M570 470 L586 556" stroke="{K}" stroke-width="20" stroke-linecap="round"/><path d="M570 470 L586 556" stroke="{F}" stroke-width="10" stroke-linecap="round"/></g>
  <g class="s12-pata"><path d="M90 60 L90 330" stroke="{K}" stroke-width="96" stroke-linecap="round"/><path d="M90 60 L90 330" stroke="{W}" stroke-width="80" stroke-linecap="round"/>
    <path d="M40 300 Q40 420 120 440 L330 450 Q370 446 366 410 Q362 370 300 360 L140 330 Z" fill="{W}" {S}/>
    <circle cx="350" cy="396" r="18" fill="{W}" {S}/><circle cx="330" cy="430" r="15" fill="{W}" {S}/><circle cx="310" cy="452" r="13" fill="{W}" {S}/>
    <g class="s12-gotas"><path d="M150 270 Q140 290 150 300 Q160 290 150 270 Z M200 290 Q190 310 200 320 Q210 310 200 290 Z" fill="{GL}" {S}/></g></g>
  <g class="s12-tij"><g class="s12-h1"><path d="M250 330 L420 400" stroke="{K}" stroke-width="22" stroke-linecap="round"/><path d="M250 330 L420 400" stroke="{D}" stroke-width="12" stroke-linecap="round"/><circle cx="230" cy="316" r="30" fill="none" stroke="{K}" stroke-width="18"/><circle cx="230" cy="316" r="30" fill="none" stroke="{D}" stroke-width="10"/></g>
    <g class="s12-h2"><path d="M250 400 L420 330" stroke="{K}" stroke-width="22" stroke-linecap="round"/><path d="M250 400 L420 330" stroke="{D}" stroke-width="12" stroke-linecap="round"/><circle cx="230" cy="414" r="30" fill="none" stroke="{K}" stroke-width="18"/><circle cx="230" cy="414" r="30" fill="none" stroke="{D}" stroke-width="10"/></g></g>
  <g class="s12-x"><path d="M180 260 L480 520 M480 260 L180 520" stroke="{K}" stroke-width="56" stroke-linecap="round"/><path d="M180 260 L480 520 M480 260 L180 520" stroke="{F}" stroke-width="36" stroke-linecap="round"/></g>
</svg>'''
body = f"""
        <div class="obj s12-pie">{pie}</div>
        <div class="fig s12-bar">{critica('s12b')}</div>
        <div class="rev it s12-t">¿te cortás el pie?</div>
"""
js = """
      const CORT = 0.51, PIE = 1.02, ENTRE = 2.04, ZAP = 2.46;
      // cuadro 0: Bárbara indignada, el pie y el zapatito
      gsap.set(q(".s12-bar"), { scale: 1.1, transformOrigin: "50% 100%" });
      tl.fromTo(q(".s12-bar"), { x: 200 }, { x: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
      tl.to(q(".s12b-bd"), { rotation: 70, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, 0.1);
      habla(".s12b-boca", 0, 2.9, "200 240");
      tl.to(q(".s12b-gafas"), { y: 26, duration: 0.3 }, 0.2);
      tl.fromTo(q(".s12-pie"), { x: -200, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      golpe(q(".s12-t"), CORT, -3, 2.2);
      // las tijeras
      gsap.set(q(".s12-tij"), { opacity: 0 });
      tl.fromTo(q(".s12-tij"), { opacity: 1, x: 240, y: -200 }, { opacity: 1, x: 0, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, PIE - 0.2);
      tl.to(q(".s12-h1"), { rotation: 14, svgOrigin: "335 365", duration: 0.1, yoyo: true, repeat: 7 }, PIE + 0.1);
      tl.to(q(".s12-h2"), { rotation: -14, svgOrigin: "335 365", duration: 0.1, yoyo: true, repeat: 7 }, PIE + 0.1);
      gsap.set(q(".s12-gotas"), { opacity: 0 });
      tl.to(q(".s12-gotas"), { opacity: 1, duration: 0.1 }, PIE + 0.2);
      tl.to(q(".s12-gotas"), { y: 40, duration: 0.4, repeat: 2 }, PIE + 0.2);
      tl.to(q(".s12-pata"), { x: -10, duration: 0.06, yoyo: true, repeat: 9 }, PIE + 0.1);
      tl.to(q(".s12-zap"), { y: -14, duration: 0.15, yoyo: true, repeat: 3 }, ENTRE);
      // X fucsia
      gsap.set(q(".s12-x"), { opacity: 0 });
      tl.fromTo(q(".s12-x"), { opacity: 1, scale: 2.5, svgOrigin: "330 390" }, { opacity: 1, scale: 1, svgOrigin: "330 390", duration: 0.18, ease: "power4.in", immediateRender: false }, ZAP);
      sacudon(ZAP + 0.18, 1.4);
"""
sfx = [{"t": 0.45, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 0.95, "sfx": "whoosh-short", "vol": 0.3},
       {"t": 1.12, "sfx": "click", "vol": 0.35}, {"t": 1.35, "sfx": "click", "vol": 0.35}, {"t": 2.6, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}]
escena("s12-pie", p, 3.69, css, body, js, sfx)
