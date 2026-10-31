from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-arco { left: 140px; top: 700px; width: 800px; height: 800px; }
    [data-composition-id="%ID%"] .s02-cura { left: 340px; top: 830px; transform-origin: 50% 40%; }
    [data-composition-id="%ID%"] .s02-t1 { top: 548px; font-size: 96px; }
    [data-composition-id="%ID%"] .s02-t1b { top: 650px; font-size: 96px; }
    [data-composition-id="%ID%"] .s02-t2 { top: 1250px; font-size: 120px; }
    [data-composition-id="%ID%"] .s02-t3 { top: 1380px; font-size: 120px; }
    [data-composition-id="%ID%"] .s02-vela { width: 90px; height: 300px; top: 1130px; }
"""
def vela(cls):
    return f'''<svg viewBox="0 0 90 300" aria-hidden="true"><rect x="25" y="90" width="40" height="190" rx="6" fill="{M}" {S}/>
      <path d="M10 280 H80 L70 296 H20 Z" fill="{D}" {S}/><path d="M45 90 V72" {S}/>
      <path class="{cls}" d="M45 20 Q62 48 45 70 Q28 48 45 20 Z" fill="{D}" {S}/></svg>'''
body = f"""
        <div class="obj s02-arco">{arco('s02a')}</div>
        <div class="obj s02-vela" style="left:90px">{vela('s02-llama')}</div>
        <div class="obj s02-vela" style="left:900px">{vela('s02-llama')}</div>
        <div class="fig s02-cura">{cura('s02c')}</div>
        <div class="big d s02-t1">¿Alguien</div>
        <div class="big d s02-t1b">se opone?</div>
        <div class="big m s02-t2">O calle</div>
        <div class="big v s02-t3">para siempre</div>
"""
js = """
      const OPONE = 1.00, HABLE = 3.18, CALLE = 4.48, SIEMPRE = 5.09;
      gsap.set(q(".s02-cura"), { opacity: 1 });
      tl.fromTo(q(".s02-cura"), { y: 40, scale: 0.96 }, { y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, 0);
      tl.fromTo(q(".s02-arco"), { scale: 1.06, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.6, ease: "power2.out" }, 0);
      habla(".s02c-boca", 0.0, 5.9, "200 242");
      tl.fromTo(q(".s02c-cejas"), { y: 0 }, { y: -6, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.2);
      // la libreta: la mira y levanta la vista
      tl.to(q(".s02c-cabeza"), { y: 8, rotation: 4, svgOrigin: "200 240", duration: 0.5, ease: "sine.inOut" }, 0.1);
      tl.to(q(".s02c-cabeza"), { y: 0, rotation: 0, svgOrigin: "200 240", duration: 0.4, ease: "sine.inOut" }, OPONE - 0.2);
      qa(".s02-llama").forEach((l, i) => tl.fromTo(l, { scaleY: 1, svgOrigin: "45 70" }, { scaleY: 1.25, svgOrigin: "45 70", duration: 0.18 + i * 0.05, yoyo: true, repeat: 25, ease: "sine.inOut" }, 0));
      golpe(q(".s02-t1"), OPONE - 0.25, -2, 2.4);
      golpe(q(".s02-t1b"), OPONE + 0.05, 2, 2.4);
      sacudon(OPONE + 0.05, 0.8);
      // que hable ahora: la cámara se acerca
      tl.to(q(".s02-cura"), { scale: 1.12, duration: 1.2, ease: "power2.inOut" }, HABLE);
      tl.to(q(".s02-arco"), { scale: 1.06, duration: 1.2, ease: "power2.inOut" }, HABLE);
      golpe(q(".s02-t2"), CALLE, 2, 2.4);
      golpe(q(".s02-t3"), SIEMPRE + 0.05, -3, 2.6);
      sacudon(SIEMPRE + 0.1, 1.1);
      tl.to([q(".s02-t1"), q(".s02-t1b")], { opacity: 0.4, duration: 0.3 }, CALLE);
"""
sfx = [{"t": 0.05, "sfx": "chime", "vol": 0.25, "max": 1.2}, {"t": 0.95, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6},
       {"t": 3.1, "sfx": "riser", "vol": 0.2, "max": 2.0}, {"t": 4.45, "sfx": "pop", "vol": 0.25}, {"t": 5.1, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.7}]
escena("s02-cura", p, 6.36, css, body, js, sfx)
