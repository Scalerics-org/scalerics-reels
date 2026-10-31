from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-antes { left: 150px; top: 570px; font-size: 170px; color: #ff7a1a; }
    [data-composition-id="%ID%"] .s04-cap { left: 340px; top: 830px; }
    [data-composition-id="%ID%"] .s04-o1 { left: 60px; top: 900px; }
    [data-composition-id="%ID%"] .s04-o2 { left: 620px; top: 900px; }
    [data-composition-id="%ID%"] .s04-o1, [data-composition-id="%ID%"] .s04-o2 { opacity: 0.5; }
"""
body = f"""
        <div class="fig s04-o1">{capataz('s04a', planilla=False)}</div>
        <div class="fig s04-o2">{capataz('s04b', planilla=False)}</div>
        <div class="fig s04-cap">{capataz('s04c')}</div>
        <div class="sello s04-antes">ANTES</div>
"""
js = """
      const ANTES = 0.66, EQUIPO = 1.55, ENC = 2.25;
      // cuadro 0: sombra del equipo atrás
      gsap.set([q(".s04-o1"), q(".s04-o2")], { scale: 0.85, transformOrigin: "50% 100%", filter: "brightness(0.35)" });
      tl.fromTo([q(".s04-o1"), q(".s04-o2")], { y: 60 }, { y: 0, duration: 0.5, ease: "power2.out" }, 0);
      golpe(q(".s04-antes"), ANTES, -8, 2.8);
      sacudon(ANTES + 0.05, 1.6);
      tl.to(q(".s04-antes"), { rotation: -6, scale: 1.03, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, ANTES + 0.2);
      // el capataz
      entra(q(".s04-cap"), EQUIPO - 0.1, { y: 900 }, 0.35);
      tl.to([q(".s04-o1"), q(".s04-o2")], { filter: "brightness(0.8)", duration: 0.3 }, EQUIPO);
      tl.to(q(".s04-o1"), { x: -20, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, EQUIPO);
      tl.to(q(".s04-o2"), { x: 20, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, EQUIPO);
      tl.to(q(".s04c-bi"), { rotation: 70, svgOrigin: "148 296", duration: 0.3, ease: "back.out(2)" }, ENC);
      tl.to(q(".s04-antes"), { y: -30, duration: 0.3 }, ENC);
"""
sfx = [{"t": 0.6, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.45, "sfx": "whoosh", "vol": 0.25, "max": 0.5},
       {"t": 1.8, "sfx": "impact-bass-1", "vol": 0.25, "max": 0.5}, {"t": 2.25, "sfx": "click", "vol": 0.25}]
escena("s04-antes", p, 3.42, css, body, js, sfx)
