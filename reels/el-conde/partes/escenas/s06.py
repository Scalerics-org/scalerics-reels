from lib import *
p="s06"
mano = f'''<g class="{p}-brazo"><path class="tinta" fill="#7a4e2d" d="M40 -170 C90 -170 130 -180 150 -200 L162 -184 C140 -160 96 -146 36 -146 Z" /><circle class="tinta" fill="#c9b98a" cx="160" cy="-196" r="15" /></g>'''
css = '''
    $S .s06-cel { position: absolute; left: 420px; top: 600px; width: 450px; height: 640px; background: #f4ead5; border: 7px solid #12061f; border-radius: 48px; box-shadow: 12px 12px 0 #12061f; overflow: hidden; }
    $S .s06-barra { position: absolute; left: 0; right: 0; top: 0; height: 104px; background: #2a1546; display: flex; align-items: center; gap: 16px; padding: 20px 0 0 26px; }
    $S .s06-avatar { width: 58px; height: 58px; border-radius: 50%; background: #c8102e; border: 4px solid #f4ead5; font-family: "Cinzel", serif; font-weight: 900; font-size: 30px; color: #f4ead5; text-align: center; line-height: 52px; }
    $S .s06-nombre { font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; color: #f4ead5; line-height: 1.1; }
    $S .s06-nombre small { display: block; font-weight: 400; font-size: 20px; color: #b9a6e0; }
    $S .s06-burb { position: absolute; max-width: 330px; padding: 14px 20px 30px; border: 4px solid #12061f; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 30px; line-height: 1.2; color: #12061f; }
    $S .s06-burb i { position: absolute; right: 16px; bottom: 6px; font-style: normal; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 18px; color: #6d5f86; }
    $S .s06-yo { right: 22px; top: 140px; background: #b6ff3b; border-bottom-right-radius: 6px; }
    $S .s06-ella1 { left: 22px; top: 330px; background: #ffffff; border-bottom-left-radius: 6px; }
    $S .s06-ella2 { left: 22px; top: 430px; background: #ffffff; border-bottom-left-radius: 6px; }
    $S .s06-visto { position: absolute; right: 30px; top: 300px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 20px; color: #2a8bd8; }
    $S .s06-cursor { display: inline-block; width: 3px; height: 30px; background: #12061f; vertical-align: -4px; }
'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {igor(p, 170, 1240, 1.05, mano)}
        </svg>
        <div class="{p}-cel">
          <div class="{p}-barra"><div class="{p}-avatar">T</div><div class="{p}-nombre">tienda.centro<small>activa hace 9 h</small></div></div>
          <div class="{p}-burb {p}-yo"><span class="{p}-tp">Buenas</span> <span class="{p}-tp">noches.</span> <span class="{p}-tp">¿Me</span> <span class="{p}-tp">venden</span> <span class="{p}-tp">una</span> <span class="{p}-tp">capa?</span><i>3:12</i></div>
          <div class="{p}-visto">Visto 10:46</div>
          <div class="{p}-burb {p}-ella1">Hola.<i>10:47</i></div>
          <div class="{p}-burb {p}-ella2">Pasá por el local.<i>10:47</i></div>
        </div>'''
js = f'''
      const ESCRIBI = 0.16, INSTA = 0.72, HOLA = 2.14, PASA = 3.0;
      tl.fromTo(q(".{p}-igor"), {{ x: -120, opacity: 0.4 }}, {{ x: 0, opacity: 1, duration: 0.3, ease: "power3.out" }}, 0);
      tl.fromTo(q(".{p}-cel"), {{ y: 300, rotation: 8, opacity: 0.4 }}, {{ y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }}, 0);
      // se tipea el mensaje del ayudante (revela por recorte)
      gsap.set(q(".{p}-yo"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-yo"), {{ opacity: 0, scale: 0.7, transformOrigin: "100% 100%" }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }}, ESCRIBI + 0.1);
      qa(".{p}-tp").forEach((w, i) => {{ gsap.set(w, {{ opacity: 0 }}); tl.set(w, {{ opacity: 1 }}, ESCRIBI + 0.25 + i * 0.15); }});
      tl.to(q(".{p}-brazo"), {{ y: -6, duration: 0.08, yoyo: true, repeat: 11 }}, ESCRIBI + 0.2);
      muestra(q(".{p}-e1"), INSTA);
      // visto... y la respuesta a la mañana
      pop(q(".{p}-visto"), 1.6, 0.8);
      pop(q(".{p}-ella1"), HOLA, 0.6);
      pop(q(".{p}-ella2"), PASA, 0.6);
      tl.to(q(".{p}-igor-cabeza"), {{ rotation: -10, svgOrigin: "60 -190", duration: 0.2 }}, PASA + 0.2);
      tl.to(q(".{p}-ella2"), {{ scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }}, 3.5);
      muestra(q(".{p}-e2"), PASA + 0.1);
'''
sfx=[{"t":0.05,"sfx":"whoosh","vol":0.22},{"t":0.3,"sfx":"typing","vol":0.25,"max":0.9},{"t":1.2,"sfx":"click","vol":0.25},{"t":2.14,"sfx":"notification","vol":0.3},{"t":3.0,"sfx":"notification","vol":0.3},{"t":3.5,"sfx":"uuh","vol":0.15,"max":0.6}]
escena("s06-mensaje", 4.21, css, html, js, sfx, ["por instagram, 3:12", "respuesta: 10:47"])
