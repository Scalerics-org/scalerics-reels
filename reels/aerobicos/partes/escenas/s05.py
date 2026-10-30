from base import *
p = "s05"
css = """
    [data-composition-id="%ID%"] .s05-due { left: 340px; top: 690px; }
    [data-composition-id="%ID%"] .s05-cu { top: 590px; font-size: 128px; }
    [data-composition-id="%ID%"] .s05-rep { top: 770px; font-size: 92px; }
    [data-composition-id="%ID%"] .s05-inf { top: 500px; font-size: 330px; font-style: normal; }
    [data-composition-id="%ID%"] .s05-haya { top: 800px; font-size: 104px; }
"""
body = f"""
        <svg class="s05-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-puf"><path d="M400 1010 Q370 1000 350 1020 M390 1050 Q350 1050 330 1070" stroke="{C}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
          <g class="s05-puf2"><path d="M680 1010 Q710 1000 730 1020 M690 1050 Q730 1050 750 1070" stroke="{C}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
        </svg>
        <div class="fig s05-due">{duenio('s05d', tel=True)}</div>
        <div class="big t s05-cu">¿Cuántas</div>
        <div class="big c s05-rep">repeticiones?</div>
        <div class="big a s05-inf">∞</div>
        <div class="big r s05-haya">¡Las que haya!</div>
"""
js = """
      const REP = 1.55, LAS = 3.13, HAYA = 3.39;
      gsap.set(q(".s05-due"), { scale: 0.78, transformOrigin: "50% 98%" });
      gsap.set(q(".s05d-bi"), { rotation: 20, svgOrigin: "150 286" });
      gsap.set(q(".s05d-bd"), { rotation: -20, svgOrigin: "250 286" });
      // jadea: el cuerpo se infla y desinfla, la boca se abre
      tl.fromTo(q(".s05d-cuerpo"), { scaleY: 1 }, { scaleY: 0.96, svgOrigin: "200 705", duration: 0.22, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s05d-boca"), { scaleY: 1 }, { scaleY: 2, transformOrigin: "50% 50%", duration: 0.22, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0);
      tl.to(q(".s05d-gotas"), { y: 30, opacity: 0.3, duration: 0.5, repeat: 5, ease: "power1.in" }, 0);
      [q(".s05-puf"), q(".s05-puf2")].forEach((el, i) => tl.fromTo(el, { opacity: 0, x: 0 }, { opacity: 1, x: i ? 30 : -30, duration: 0.44, yoyo: true, repeat: 7, ease: "sine.out" }, 0.1 + i * 0.22));
      gsap.set(q(".s05-cu"), { opacity: 1, rotation: -4 });
      tl.fromTo(q(".s05-cu"), { scale: 1.6 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      golpe(q(".s05-rep"), REP, 3);
      fuera(q(".s05-cu"), LAS - 0.15); fuera(q(".s05-rep"), LAS - 0.15);
      golpe(q(".s05-inf"), LAS + 0.05, 0, 3.5);
      tl.to(q(".s05-inf"), { rotation: 360, duration: 1.0, ease: "power2.inOut" }, LAS + 0.15);
      golpe(q(".s05-haya"), HAYA, -4, 3);
      sacudon(HAYA, 1.8);
      // al dueño se le van los ojos
      tl.set(q(".s05d-ojos"), { opacity: 0 }, HAYA); tl.set(q(".s05d-ojos-x"), { opacity: 1 }, HAYA);
      tl.to(q(".s05-due"), { rotation: -5, duration: 0.12, yoyo: true, repeat: 5 }, HAYA);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.2}, {"t": 1.5, "sfx": "pop", "vol": 0.3}, {"t": 3.1, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6},
       {"t": 3.4, "sfx": "uuh", "vol": 0.3}]
escena("s05-cuantas", p, 4.29, css, body, js, sfx)
