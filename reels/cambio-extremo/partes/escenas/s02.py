from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-con { left: 340px; top: 820px; }
    [data-composition-id="%ID%"] .s02-logo { position: absolute; left: 90px; top: 560px; width: 900px; text-align: center; }
    [data-composition-id="%ID%"] .s02-placa { display: inline-block; padding: 26px 44px 22px; background: #14c4b8; border: 10px solid #16191d; border-radius: 30px; box-shadow: 14px 14px 0 #ff7a1a; }
    [data-composition-id="%ID%"] .s02-placa b { display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 116px; line-height: 0.92; color: #fbfaf5; -webkit-text-stroke: 14px #16191d; paint-order: stroke fill; white-space: nowrap; }
    [data-composition-id="%ID%"] .s02-ed { position: absolute; left: 170px; top: 300px; padding: 12px 34px 8px; background: #ffd21f; border: 7px solid #16191d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; color: #16191d; white-space: nowrap; letter-spacing: 0.04em; }
    [data-composition-id="%ID%"] .s02-local { left: 470px; top: 860px; width: 580px; height: 580px; }
    [data-composition-id="%ID%"] .s02-mon { left: 640px; top: 1010px; width: 300px; height: 540px; }
    [data-composition-id="%ID%"] .s02-hoy { position: absolute; left: 90px; top: 570px; padding: 14px 40px 8px; background: #16191d; border: 10px solid #ffd21f; border-radius: 18px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 110px; line-height: 1; color: #ffd21f; }
"""
dest = "".join([destello("s02-d", 150, 900, 40), destello("s02-d", 930, 880, 34, T), destello("s02-d", 200, 1300, 26, N), destello("s02-d", 900, 1280, 44), destello("s02-d", 540, 1500, 22, W)])
body = f"""
        <svg class="s02-full" viewBox="0 0 1080 1920" aria-hidden="true">{dest}</svg>
        <div class="obj s02-local">{local('s02l', 'REGALOS MÓNICA')}</div>
        <div class="fig s02-mon">{monica('s02m')}</div>
        <div class="fig s02-con">{conductora('s02c')}</div>
        <div class="s02-logo"><div class="s02-placa"><b>CAMBIO</b><b>RADICAL</b></div><div class="s02-ed">EDICIÓN COMERCIO</div></div>
        <div class="s02-hoy">HOY</div>
"""
js = """
      const CAMBIO = 1.12, EDICION = 2.16, HOY = 3.61, MONICA = 4.26, REGALOS = 5.00, MON2 = 5.58;
      // brazos arriba
      gsap.set(q(".s02c-bi"), { rotation: 150, svgOrigin: "150 292" });
      gsap.set(q(".s02c-bd"), { rotation: -150, svgOrigin: "250 292" });
      tl.fromTo(q(".s02-con"), { scale: 0.9, y: 40, transformOrigin: "50% 100%" }, { scale: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      vaiven(q(".s02c-bi"), 0.1, 3.4, { rotation: 125, svgOrigin: "150 292" }, 0.3);
      vaiven(q(".s02c-bd"), 0.1, 3.4, { rotation: -125, svgOrigin: "250 292" }, 0.3);
      habla(".s02c-boca", 0, 6.4, "200 238");
      qa(".s02-d").forEach((d, i) => { pop(d, 0.05 + i * 0.12, 0.3); tl.to(d, { rotation: 90, transformOrigin: "50% 50%", duration: 3, ease: "none" }, 0.3); });
      // el logo del programa
      golpe(q(".s02-placa"), CAMBIO, -3, 2.6);
      sacudon(CAMBIO + 0.04, 1.3);
      golpe(q(".s02-ed"), EDICION + 0.05, 4, 2.4);
      sacudon(EDICION + 0.08, 0.8);
      vaiven(q(".s02-placa"), CAMBIO + 0.2, 2.2, { scale: 1.04 }, 0.3);
      // hoy: se va el logo, la conductora presenta
      tl.to(q(".s02-logo"), { y: -400, opacity: 0, duration: 0.3, ease: "power3.in" }, HOY - 0.3);
      tl.to(qa(".s02-d"), { opacity: 0, duration: 0.2 }, HOY - 0.2);
      golpe(q(".s02-hoy"), HOY + 0.05, -6, 2.4);
      tl.to(q(".s02-con"), { x: -300, duration: 0.35, ease: "power3.inOut" }, HOY);
      tl.to(q(".s02c-bi"), { rotation: 10, svgOrigin: "150 292", duration: 0.3 }, HOY + 1.4);
      tl.to(q(".s02c-bd"), { rotation: -95, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, HOY + 0.6);
      // el local de Mónica y Mónica que saluda
      pop(q(".s02-local"), MONICA - 0.05, 0.35);
      entra(q(".s02-mon"), MONICA + 0.15, { y: 500 }, 0.35);
      tl.to(q(".s02m-bd"), { rotation: -150, svgOrigin: "248 300", duration: 0.25, ease: "back.out(2)" }, MONICA + 0.4);
      vaiven(q(".s02m-bd"), MONICA + 0.65, 1.6, { rotation: -120, svgOrigin: "248 300" }, 0.2);
      tl.fromTo(q(".s02-local"), { scale: 1 }, { scale: 1.07, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, REGALOS);
      sacudon(REGALOS, 0.7);
      tl.fromTo(q(".s02-hoy"), { rotation: -6 }, { rotation: 4, duration: 0.15, yoyo: true, repeat: 5, immediateRender: false }, MON2 - 0.4);
"""
sfx = [{"t": 0.05, "sfx": "sparkle", "vol": 0.3}, {"t": 1.08, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 2.15, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6},
       {"t": 3.6, "sfx": "pop", "vol": 0.3}, {"t": 4.25, "sfx": "pop", "vol": 0.3}, {"t": 5.0, "sfx": "chime", "vol": 0.25}]
escena("s02-programa", p, 6.64, css, body, js, sfx)
