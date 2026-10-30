from base import escena
from personajes import *
css = '''
    SC .s13-et { left: 0; right: 0; top: 614px; font-size: 106px; line-height: 1; font-family: "Lexend", sans-serif; font-weight: 900; color: #c99a3c; -webkit-text-stroke: 8px #4b2537; paint-order: stroke fill; }
    SC .s13-al { left: 0; right: 0; top: 750px; font-size: 64px; line-height: 1; }
    SC .s13-hoja { position: absolute; left: 380px; top: 850px; width: 320px; height: 380px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 8px; }
    SC .s13-hoja .t { left: 0; right: 0; top: 22px; font-size: 52px; }
    SC .s13-hoja .rr { position: absolute; left: 30px; right: 30px; height: 5px; background: #e3a6ae; }
    SC .s13-hoja .m { left: 0; right: 0; top: 250px; font-size: 48px; color: #6f9a6a; }
    SC .s13-cal { position: absolute; left: 700px; top: 980px; width: 220px; height: 210px; background: #fbefe9; border: 5px solid #4b2537; border-radius: 14px; overflow: hidden; }
    SC .s13-cal .cab { position: absolute; left: 0; right: 0; top: 0; height: 64px; background: #c4607a; border-bottom: 5px solid #4b2537; }
    SC .s13-cal .mes { left: 0; right: 0; top: 10px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; letter-spacing: 0.12em; color: #fbefe9; }
    SC .s13-cal .dia { left: 0; right: 0; top: 76px; font-size: 104px; line-height: 1; }
'''
cuerpo = f'''
          <g class="s13-ald"><g transform="translate(220 1110) scale(0.5)">{aldo("s13")}</g></g>
'''
html = '''
        <div class="lex s13-et">@ETIQUETÁ</div>
        <div class="cartel s13-al">al que te debe un presupuesto</div>
        <div class="s13-hoja"><div class="cartel t">Presupuesto</div><div class="rr" style="top: 110px"></div><div class="rr" style="top: 150px"></div><div class="rr" style="top: 190px; right: 120px"></div><div class="mano m">pendiente</div></div>
        <div class="s13-cal"><div class="cab"><div class="mes">MARZO</div></div><div class="cartel dia">?</div></div>
        <div class="sello s13-sello" style="left: 420px; top: 1150px; font-size: 40px;">Desde marzo</div>
'''
js = '''
      const AL = 0.55, DEBE = 1.09, PRESU = 1.37, DESDE = 2.09, MARZO = 2.37;
      const et = q(".s13-et");
      tl.fromTo(et, { scale: 1.6 }, { scale: 1, duration: 0.2, ease: "power4.in" }, 0);
      temblor(et, 0.2, 0.8);
      tl.to(et, { scale: 1.05, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.6);
      const al = q(".s13-al");
      gsap.set(al, { opacity: 0 });
      tl.fromTo(al, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, AL);
      const hoja = q(".s13-hoja");
      gsap.set(hoja, { opacity: 0 });
      tl.fromTo(hoja, { opacity: 0, y: 80, rotation: 10 }, { opacity: 1, y: 0, rotation: -4, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, PRESU - 0.15);
      tl.to(hoja, { rotation: -1, duration: 0.8, yoyo: true, repeat: 4, ease: "sine.inOut" }, PRESU + 0.3);
      const cal = q(".s13-cal");
      gsap.set(cal, { opacity: 0 });
      tl.fromTo(cal, { opacity: 0, scale: 0.6, rotation: 14 }, { opacity: 1, scale: 1, rotation: 6, duration: 0.3, ease: "back.out(2)", immediateRender: false }, DESDE - 0.1);
      sello(q(".s13-sello"), MARZO + 0.1, -7);
      // Don Aldo, ya con su CRM, sonríe y saluda
      tl.set(q(".s13-boca"), { attr: { d: "M-30 84 Q0 112 30 84" } }, 0);
      gsap.set(q(".s13-lagrima"), { opacity: 0 });
      tl.fromTo(q(".s13-ald"), { x: -200 }, { x: 0, duration: 0.4, ease: "back.out(1.6)" }, 0.3);
      tl.to(q(".s13-ald"), { rotation: -6, svgOrigin: "220 1320", duration: 0.35, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.8);
      tl.fromTo(q(".escenario"), { scale: 1 }, { scale: 1.04, transformOrigin: "50% 50%", duration: DUR, ease: "none" }, 0);
'''
sfx = [{"t": 0.0, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 1.25, "sfx": "pop", "vol": 0.28}, {"t": 2.0, "sfx": "pop", "vol": 0.25}, {"t": 2.4, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}]
escena("s13-cta", css, cuerpo, js, sfx, html)
