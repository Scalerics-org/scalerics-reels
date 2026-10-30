from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-ins { left: 340px; top: 700px; }
    [data-composition-id="%ID%"] .s01-arriba { top: 600px; font-size: 150px; }
    [data-composition-id="%ID%"] .s01-com { top: 740px; font-size: 104px; }
    [data-composition-id="%ID%"] .s01-tres { top: 590px; font-size: 186px; }
    [data-composition-id="%ID%"] .s01-noche { top: 772px; font-size: 80px; }
    [data-composition-id="%ID%"] .s01-gramo { top: 640px; font-size: 128px; }
"""
estrellas = "".join([estrella("s01-st", 210, 900, 30), estrella("s01-st", 880, 860, 24, "#1de9d6"), estrella("s01-st", 170, 1180, 20, "#ff2e88"),
                     estrella("s01-st", 900, 1150, 32), estrella("s01-st", 790, 1010, 16, "#fff3e8")])
body = f"""
        <svg class="s01-full" viewBox="0 0 1080 1920" aria-hidden="true">{estrellas}</svg>
        <div class="fig s01-ins">{instructora('s01i')}</div>
        <div class="big r s01-arriba">¡Arriba,</div>
        <div class="big a s01-com">comerciante!</div>
        <div class="big a s01-tres">3 horas</div>
        <div class="big t s01-noche">por noche</div>
        <div class="big r s01-gramo">ni un gramo</div>
"""
js = """
      const COM = 0.34, TRES = 1.11, NOCHE = 2.65, BAJASTE = 3.16, GRAMO = 3.93;
      const ins = q(".s01-ins");
      gsap.set(ins, { scale: 0.82, transformOrigin: "50% 98%" });
      // cuadro 0: ya está en el aire con los brazos arriba
      gsap.set(q(".s01i-bi"), { rotation: 158, svgOrigin: "158 272" });
      gsap.set(q(".s01i-bd"), { rotation: -158, svgOrigin: "242 272" });
      // saltos de tijera al ritmo
      for (let k = 0; k * BEAT < DUR - 0.3; k++) {
        const t = k * BEAT, arriba = k % 2 === 0;
        tl.fromTo(ins, { y: arriba ? -70 : 0 }, { y: arriba ? 0 : -70, duration: BEAT, ease: arriba ? "power2.in" : "power2.out", immediateRender: k === 0 }, t);
        tl.to(q(".s01i-bi"), { rotation: arriba ? 40 : 158, svgOrigin: "158 272", duration: BEAT * 0.8, ease: "power2.inOut" }, t);
        tl.to(q(".s01i-bd"), { rotation: arriba ? -40 : -158, svgOrigin: "242 272", duration: BEAT * 0.8, ease: "power2.inOut" }, t);
      }
      // estrellitas
      qa(".s01-st").forEach((s, i) => {
        tl.fromTo(s, { opacity: 0, scale: 0.2, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.05 + i * 0.15);
        tl.to(s, { rotation: 90, transformOrigin: "50% 50%", duration: DUR, ease: "none" }, 0);
        tl.to(s, { opacity: 0.3, duration: BEAT, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.5 + i * 0.1);
      });
      // textos
      gsap.set(q(".s01-arriba"), { opacity: 1, rotation: -5 });
      tl.fromTo(q(".s01-arriba"), { scale: 1.5 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      golpe(q(".s01-com"), COM + 0.1, 3);
      sacudon(COM + 0.05, 1);
      fuera(q(".s01-arriba"), TRES - 0.15); fuera(q(".s01-com"), TRES - 0.15);
      golpe(q(".s01-tres"), TRES + 0.05, -5, 3);
      sacudon(TRES + 0.05, 1.4);
      golpe(q(".s01-noche"), NOCHE, 3);
      fuera(q(".s01-tres"), BAJASTE + 0.3); fuera(q(".s01-noche"), BAJASTE + 0.3);
      golpe(q(".s01-gramo"), GRAMO, -6, 3);
      sacudon(GRAMO, 1.8);
      tl.to(q(".s01-gramo"), { rotation: -3, duration: 0.08, yoyo: true, repeat: 5 }, GRAMO + 0.1);
"""
sfx = [{"t": 0.02, "sfx": "sparkle", "vol": 0.3}, {"t": 0.3, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6},
       {"t": 1.1, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 2.62, "sfx": "pop", "vol": 0.3},
       {"t": 3.9, "sfx": "redoble", "vol": 0.35, "max": 0.9}]
escena("s01-arriba", p, 4.63, css, body, js, sfx)
