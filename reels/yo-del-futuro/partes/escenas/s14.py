from base import *
p = "s14"
css = """
    [data-composition-id="%ID%"] .s14-hoy { left: 40px; top: 820px; }
    [data-composition-id="%ID%"] .s14-fut { left: 560px; top: 780px; }
    [data-composition-id="%ID%"] .s14-glo { left: 50px; top: 600px; font-size: 50px; background: #22e4ff; }
    [data-composition-id="%ID%"] .s14-glo2 { left: 560px; top: 640px; font-size: 48px; background: #ff8a3d; }
    [data-composition-id="%ID%"] .s14-vol { top: 560px; font-size: 170px; }
    [data-composition-id="%ID%"] .s14-pero { top: 740px; font-size: 96px; }
    [data-composition-id="%ID%"] .s14-fuego { left: -200px; top: 1380px; width: 1300px; height: 150px; }
"""
body = f"""
        <div class="obj s14-fuego">{fuego('s14-fg', 1300)}</div>
        <div class="fig s14-hoy">{hoy('s14h')}</div>
        <div class="fig s14-fut">{futuro('s14f')}</div>
        <div class="globo s14-glo">¿Y vos lo tenés?</div>
        <div class="globo s14-glo2">Yo no.</div>
        <div class="big cr s14-vol"><span>Volveré...</span></div>
        <div class="big nj s14-pero"><span>pero descansado</span></div>
"""
js = """
      const TENES = 0.28, YONO = 1.25, CANAS = 2.65, HACELO = 3.43, TERM = 4.82, VOL = 5.96, PERO = 6.77, DESC = 6.91;
      const fut = q(".s14-fut"), hoy = q(".s14-hoy");
      gsap.set([fut, hoy], { scale: 1.05, transformOrigin: "50% 100%" });
      // ¿y vos lo tenés?
      tl.fromTo(q(".s14h-ojos"), { scaleY: 1, svgOrigin: "200 196" }, { scaleY: 0.4, svgOrigin: "200 196", duration: 0.15 }, 0.05);
      tl.to(q(".s14h-bd"), { rotation: -40, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, 0.1);
      pop(q(".s14-glo"), TENES - 0.2, 0.25, { rotation: -3 });
      // yo no: se encoge de hombros
      tl.to(q(".s14-glo"), { opacity: 0, y: -30, duration: 0.2 }, YONO - 0.2);
      habla(".s14f-boca", YONO, 5.6, "200 244");
      tl.to(q(".s14f-bi"), { rotation: 70, svgOrigin: "150 292", duration: 0.2, ease: "back.out(2)" }, YONO);
      tl.to(q(".s14f-bd"), { rotation: -70, svgOrigin: "250 292", duration: 0.2, ease: "back.out(2)" }, YONO);
      tl.fromTo(q(".s14f-cabeza"), { y: 0 }, { y: 14, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, YONO);
      pop(q(".s14-glo2"), YONO, 0.25, { rotation: 3 });
      // por eso las canas: se erizan
      tl.to(q(".s14f-canas"), { scale: 1.35, svgOrigin: "200 170", duration: 0.15, ease: "back.out(3)" }, CANAS - 0.1);
      tl.to(q(".s14f-canas"), { scale: 1.2, svgOrigin: "200 170", duration: 0.1, yoyo: true, repeat: 3 }, CANAS + 0.1);
      sacudon(CANAS, 0.8);
      tl.to(q(".s14-glo2"), { opacity: 0, duration: 0.2 }, HACELO - 0.2);
      // hacelo vos: lo señala
      tl.to(q(".s14f-bd"), { rotation: 0, svgOrigin: "250 292", duration: 0.2 }, HACELO - 0.1);
      tl.to(q(".s14f-bi"), { rotation: 95, svgOrigin: "150 292", duration: 0.22, ease: "back.out(2.5)" }, HACELO - 0.1);
      tl.to(q(".s14f-canas"), { scale: 1, svgOrigin: "200 170", duration: 0.2 }, HACELO);
      tl.to(hoy, { x: -20, rotation: -4, duration: 0.2, yoyo: true, repeat: 1 }, HACELO);
      // Terminator: lentes oscuros
      tl.to(q(".s14f-bi"), { rotation: 0, svgOrigin: "150 292", duration: 0.2 }, TERM - 0.4);
      tl.fromTo(q(".s14f-lentes"), { opacity: 1, y: -260 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, TERM - 0.3);
      tl.to(q(".s14f-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.2 }, TERM - 0.3);
      tl.to(q(".s14f-bd"), { rotation: 0, svgOrigin: "250 292", duration: 0.2 }, TERM + 0.1);
      tl.to(fut, { scale: 1.15, duration: 0.3, ease: "power2.out" }, TERM);
      // volveré... pero descansado
      golpe(q(".s14-vol"), VOL, -4, 2.6);
      sacudon(VOL + 0.05, 1.5);
      golpe(q(".s14-pero"), DESC, 3, 2.4);
      sacudon(DESC + 0.05, 1.2);
      // se va dejando huellas de fuego
      gsap.set(q(".s14-fuego"), { opacity: 0 });
      tl.to(fut, { x: 800, rotation: 10, duration: 0.35, ease: "power3.in" }, 7.45);
      tl.fromTo(q(".s14-fuego"), { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.35, ease: "power3.in", immediateRender: false }, 7.45);
      tl.to(q(".s14-fuego"), { opacity: 0.6, duration: 0.06, yoyo: true, repeat: 5, ease: "steps(1)" }, 7.8);
"""
sfx = [{"t": 0.25, "sfx": "pop", "vol": 0.28}, {"t": 1.25, "sfx": "pop", "vol": 0.28}, {"t": 2.6, "sfx": "glitch-1", "vol": 0.28, "max": 0.4},
       {"t": 4.55, "sfx": "click", "vol": 0.3}, {"t": 5.9, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.8}, {"t": 6.85, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6},
       {"t": 7.4, "sfx": "whoosh-cinematic", "vol": 0.35, "max": 0.8}]
escena("s14-terminator", p, 8.24, css, body, js, sfx)
