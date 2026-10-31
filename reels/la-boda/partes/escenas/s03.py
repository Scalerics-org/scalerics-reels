from base import *
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-pu { left: 190px; top: 700px; width: 700px; height: 820px; }
    [data-composition-id="%ID%"] .s03-due { left: 340px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s03-t1 { top: 548px; font-size: 120px; }
    [data-composition-id="%ID%"] .s03-t2 { top: 676px; font-size: 140px; }
    [data-composition-id="%ID%"] .s03-cm { top: 1130px; font-size: 120px; }
    [data-composition-id="%ID%"] .s03-sello { top: 1290px; font-size: 64px; color: #e3b448; }
"""
rayos = "".join(f'<path class="s03-rayo" d="M540 1100 L{540 + 900 * __import__("math").cos(a / 10 * 6.283):.0f} {1100 + 900 * __import__("math").sin(a / 10 * 6.283):.0f}" stroke="{M}" stroke-width="40" opacity="0.10"/>' for a in range(10))
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><g class="s03-rayos" data-layout-allow-overflow>{rayos}</g></svg>
        <div class="obj s03-pu">{puertas('s03p')}</div>
        <div class="fig s03-due">{dueno('s03d')}</div>
        <div class="big m s03-t1">¡Yo me</div>
        <div class="big d s03-t2">opongo!</div>
        <div class="big a s03-cm">Clienta mía</div>
        <div class="sello centro s03-sello">de toda la vida</div>
"""
js = """
      const YO = 0.0, OPONGO = 0.37, LUCIA = 1.37, CASES = 2.13, CLIENTA = 3.24, MIA = 3.61, TODA = 4.07;
      // cuadro 0: las puertas cerradas, y se abren de golpe
      gsap.set(q(".s03p-luz"), { opacity: 0.2 });
      tl.to(q(".s03p-pi"), { scaleX: 0.12, svgOrigin: "60 800", duration: 0.28, ease: "power4.out" }, 0.08);
      tl.to(q(".s03p-pd"), { scaleX: 0.12, svgOrigin: "540 800", duration: 0.28, ease: "power4.out" }, 0.08);
      tl.to(q(".s03p-luz"), { opacity: 1, duration: 0.2 }, 0.08);
      tl.fromTo(qa(".s03-rayo"), { opacity: 0 }, { opacity: 0.12, duration: 0.3, immediateRender: false }, 0.1);
      tl.to(q(".s03-rayos"), { rotation: 12, svgOrigin: "540 1100", duration: 5.2, ease: "none" }, 0.1);
      // Ricardo a contraluz que se va iluminando
      gsap.set(q(".s03-due"), { opacity: 0 });
      tl.fromTo(q(".s03-due"), { opacity: 1, scale: 0.8, filter: "brightness(0.12)" }, { opacity: 1, scale: 0.86, filter: "brightness(0.12)", duration: 0.2, immediateRender: false }, 0.12);
      gsap.set(q(".s03d-bi"), { rotation: 60, svgOrigin: "150 292" });
      gsap.set(q(".s03d-bd"), { rotation: -60, svgOrigin: "250 292" });
      tl.to(q(".s03d-bi"), { rotation: 125, svgOrigin: "150 292", duration: 0.25, ease: "back.out(2)" }, 0.15);
      tl.to(q(".s03d-bd"), { rotation: -125, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, 0.15);
      golpe(q(".s03-t1"), YO + 0.18, -3, 2.4);
      golpe(q(".s03-t2"), OPONGO + 0.12, 3, 3);
      sacudon(OPONGO + 0.15, 2);
      habla(".s03d-boca", 0.1, 5.0, "200 250");
      // ¡Lucía, no te cases!: corre hacia adelante
      tl.to(q(".s03-due"), { scale: 1.12, y: 40, filter: "brightness(1)", duration: 0.5, ease: "power2.out" }, LUCIA - 0.1);
      tl.to(q(".s03d-gotas"), { opacity: 1, duration: 0.1 }, LUCIA);
      tl.fromTo(q(".s03d-gotas"), { y: 0 }, { y: 30, duration: 0.4, repeat: 7, ease: "power1.in", immediateRender: false }, LUCIA);
      tl.to(q(".s03d-bi"), { rotation: 30, svgOrigin: "150 292", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, CASES);
      tl.to(q(".s03d-bd"), { rotation: -30, svgOrigin: "250 292", duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, CASES);
      tl.to([q(".s03-t1"), q(".s03-t2")], { opacity: 0.3, scale: 0.85, duration: 0.25 }, CLIENTA - 0.2);
      golpe(q(".s03-cm"), CLIENTA + 0.1, -3, 2.4);
      sacudon(MIA + 0.05, 1);
      golpe(q(".s03-sello"), TODA, 4, 2.2);
      vaiven(q(".s03-due"), LUCIA + 0.5, 3.4, { rotation: 2 }, 0.2);
"""
sfx = [{"t": 0.05, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 0.1, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.8},
       {"t": 0.5, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.3, "sfx": "whoosh", "vol": 0.22, "max": 0.5},
       {"t": 3.3, "sfx": "pop", "vol": 0.28}, {"t": 4.05, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
escena("s03-opongo", p, 5.44, css, body, js, sfx)
