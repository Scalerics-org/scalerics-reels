from base import escena
from personajes import *
css = '''
    SC .s04-post { position: absolute; left: 380px; top: 640px; width: 320px; height: 300px; background: #ecc97a; border: 4px solid #4b2537; box-sizing: border-box; padding: 26px 18px 0; }
    SC .s04-post .txt { position: static; font-size: 50px; line-height: 0.98; white-space: normal; }
    SC .s04-preg { left: 0; right: 0; top: 600px; font-size: 300px; line-height: 1; color: #c99a3c; -webkit-text-stroke: 6px #4b2537; paint-order: stroke fill; }
'''
cuerpo = f'''
          <g class="s04-a">
            <g transform="translate(540 960) scale(1.0)">{aldo("s04a")}</g>
            <path class="s04-gota" d="M650 860 Q666 884 666 896 A16 16 0 0 1 634 896 Q634 884 650 860 Z" fill="#a48cc8" stroke="#4b2537" stroke-width="4" />
            <g class="s04-micg"><g transform="translate(-40 760)"><path d="M0 300 L150 160" fill="none" stroke="#4b2537" stroke-width="20" stroke-linecap="round" /><circle cx="160" cy="150" r="34" fill="#c99a3c" stroke="#4b2537" stroke-width="5" /><path d="M140 140 H180 M140 160 H180 M160 120 V180" fill="none" stroke="#4b2537" stroke-width="3" /></g></g>
          </g>
          <g class="s04-b">
            <path d="M120 1300 H960" stroke="#4b2537" stroke-width="6" stroke-linecap="round" />
            <path d="M150 1300 V1250 H930 V1300" fill="#e3a6ae" stroke="#4b2537" stroke-width="5" />
          </g>
'''
html = f'''
        <div class="lex s04-preg">?</div>
        <div class="s04-post"><div class="mano txt">Lunes: llamar a la señora del sillón verde</div></div>
        <svg class="lienzo s04-b2" viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(560 1250)">{caja("s04")}</g></svg>
'''
js = '''
      const LLAMO = 0.17, ANOTE = 1.22, POSTIT = 1.57, POSTIT2 = 2.69, QUEDO = 3.03, ABAJO = 3.29, CAJA = 3.89;
      // "¿Y la llamó?": primer plano de Don Aldo, el micrófono lo acorrala
      tl.fromTo(q(".escenario"), { scale: 1.1, transformOrigin: "540px 900px" }, { scale: 1.2, duration: 1.0, ease: "power1.inOut" }, 0);
      tl.fromTo(q(".s04-micg"), { x: -200, y: 120 }, { x: 0, y: 0, duration: 0.35, ease: "power3.out" }, 0);
      gsap.set(q(".s04-gota"), { opacity: 0 });
      tl.fromTo(q(".s04-gota"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.15, immediateRender: false }, LLAMO + 0.2);
      tl.to(q(".s04-gota"), { y: 60, duration: 0.6, ease: "power1.in" }, LLAMO + 0.35);
      tl.to(q(".s04a-ojo"), { x: 12, duration: 0.12, yoyo: true, repeat: 3 }, LLAMO);
      const preg = q(".s04-preg");
      gsap.set(preg, { opacity: 0 });
      tl.fromTo(preg, { opacity: 0, scale: 2, x: 260, y: -40 }, { opacity: 1, scale: 1, x: 300, y: -40, rotation: 12, duration: 0.2, ease: "power4.in", immediateRender: false }, LLAMO);
      tl.to(preg, { opacity: 0, duration: 0.15 }, ANOTE - 0.2);
      // "lo anoté en un post-it": cambia el plano
      tl.to(q(".s04-a"), { opacity: 0, duration: 0.15 }, ANOTE - 0.2);
      tl.set(q(".escenario"), { scale: 1 }, ANOTE - 0.05);
      gsap.set([q(".s04-b"), q(".s04-b2")], { opacity: 0 });
      tl.fromTo([q(".s04-b"), q(".s04-b2")], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, ANOTE - 0.05);
      const post = q(".s04-post");
      gsap.set(post, { opacity: 0 });
      tl.fromTo(post, { opacity: 0, scale: 0.4, rotation: -20 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.35, ease: "back.out(2)", immediateRender: false }, POSTIT - 0.1);
      tl.to(post, { rotation: 3, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, POSTIT + 0.3);
      // "quedó abajo de la caja": se despega, revolotea y se mete abajo
      tl.to(post, { x: -180, y: 200, rotation: -30, duration: 0.4, ease: "sine.inOut" }, POSTIT2);
      tl.to(post, { x: 120, y: 300, rotation: 20, duration: 0.4, ease: "sine.inOut" }, QUEDO + 0.05);
      tl.to(post, { x: 190, y: 440, rotation: 4, scale: 0.6, duration: 0.35, ease: "power2.in" }, ABAJO + 0.1);
      // la caja cae encima: el post-it queda abajo, asomando una puntita
      tl.to(q(".s04-caja"), { y: -40, duration: 0.15, ease: "power2.out" }, ABAJO + 0.05);
      tl.to(q(".s04-caja"), { y: 0, duration: 0.12, ease: "power4.in" }, ABAJO + 0.42);
      temblor(q(".escenario"), ABAJO + 0.54, 0.8);
      zoom(CAJA, 1.25, 560, 1250, 0.5);
'''
sfx = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.32, "max": 0.6}, {"t": 1.5, "sfx": "pop", "vol": 0.3}, {"t": 2.7, "sfx": "whoosh", "vol": 0.25}, {"t": 3.75, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}]
escena("s04-postit", css, cuerpo, js, sfx, html)
