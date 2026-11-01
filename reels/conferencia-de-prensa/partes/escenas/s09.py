from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-vet { left: 310px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s09-ult { top: 820px; font-size: 80px; color: #ffd447; }
    [data-composition-id="%ID%"] .s09-garra { top: 600px; font-size: 90px; }
    [data-composition-id="%ID%"] .s09-t1 { top: 590px; font-size: 96px; }
    [data-composition-id="%ID%"] .s09-t2 { top: 690px; font-size: 140px; }
"""
body = f"""
        <div class="fig s09-vet">{veterano('s09v')}</div>
        <div class="sello centro s09-ult">Última pregunta</div>
        <div class="big c s09-garra">Garra: de sobra</div>
        <div class="big b s09-t1">Te faltó</div>
        <div class="big r s09-t2">banco</div>
"""
js = """
      const PREGUNTA = 0.40, PROFE = 1.34, GARRA = 2.10, CHARRUA = 2.40, FALTO = 3.27, TE = 4.07, BANCO = 4.50;
      // cuadro 0: el cartel de la jefa de prensa
      gsap.set(q(".s09-ult"), { opacity: 1, rotation: -3 });
      tl.fromTo(q(".s09-ult"), { scale: 1.5 }, { scale: 1, duration: 0.18, ease: "power4.in" }, 0);
      sacudon(0.15, 1);
      tl.to(q(".s09-ult"), { y: -40, opacity: 0, duration: 0.2 }, PROFE - 0.4);
      // se para don Aníbal: todos se callan
      brazoSet("s09v", "i", 10); brazoSet("s09v", "d", -10);
      gsap.set(q(".s09-vet"), { opacity: 0 });
      tl.fromTo(q(".s09-vet"), { opacity: 1, y: 420 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", immediateRender: false }, PROFE - 0.5);
      habla(".s09v-boca", PROFE, 4.5, "230 262");
      vaiven(q(".s09-vet"), PROFE + 0.5, 4, { rotation: 1 }, 0.7);
      golpe(q(".s09-garra"), GARRA + 0.15, -2, 2.2);
      tl.to(q(".s09-garra"), { scale: 1.06, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CHARRUA + 0.2);
      tl.to(q(".s09-garra"), { opacity: 0, y: -40, duration: 0.2 }, TE - 0.15);
      // te faltó banco: el dedo arriba
      brazo("s09v", "d", -60, TE);
      tl.to(q(".s09v-dedo"), { opacity: 1, duration: 0.1 }, TE + 0.1);
      golpe(q(".s09-t1"), TE + 0.2, -3, 2.2);
      golpe(q(".s09-t2"), BANCO + 0.12, 3, 2.8);
      sacudon(BANCO + 0.15, 1.8);
      tl.to(q(".s09-t2"), { scale: 1.07, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, BANCO + 0.4);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 0.9, "sfx": "whoosh", "vol": 0.22, "max": 0.6},
       {"t": 2.2, "sfx": "pop", "vol": 0.25}, {"t": 4.3, "sfx": "click-soft", "vol": 0.25}, {"t": 4.55, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 4.6, "sfx": "click", "vol": 0.25}]
escena("s09-veterano", p, 6.03, css, body, js, sfx)
