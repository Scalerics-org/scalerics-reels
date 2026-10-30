from base import *
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-due { left: 340px; top: 600px; }
    [data-composition-id="%ID%"] .s10-para { top: 600px; font-size: 140px; }
    [data-composition-id="%ID%"] .s10-otro { top: 600px; font-size: 104px; }
    [data-composition-id="%ID%"] .s10-otro2 { top: 720px; font-size: 150px; }
"""
body = f"""
        <svg class="s10-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s10-foco">
            <circle cx="300" cy="930" r="62" fill="{A}" stroke="{D}" stroke-width="7"/>
            <rect x="278" y="988" width="44" height="40" rx="6" fill="{C}" stroke="{D}" stroke-width="6"/>
            <path d="M282 1004 H318" stroke="{D}" stroke-width="4"/>
            <path d="M285 945 L300 915 L315 945" stroke="{D}" stroke-width="5" fill="none"/>
            <path class="s10-rayo" d="M300 840 V810 M370 870 L392 848 M230 870 L208 848 M390 935 H420 M210 935 H180" stroke="{A}" stroke-width="9" stroke-linecap="round"/>
          </g>
          <path class="s10-polvo" d="M180 1330 Q220 1290 260 1330 Q300 1290 340 1330 M720 1330 Q760 1290 800 1330 Q840 1290 880 1330" stroke="{C}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>
        </svg>
        <div class="fig s10-due">{duenio('s10d')}</div>
        <div class="big c s10-para">¡Pará!</div>
        <div class="big a s10-otro">¿Y si la hace</div>
        <div class="big r s10-otro2">otro?</div>
"""
js = """
      const Y = 0.44, RUTINA = 1.87, LA = 2.91, OTRO = 3.59;
      const due = q(".s10-due");
      gsap.set(due, { scale: 0.78, transformOrigin: "50% 98%" });
      // cuadro 0: ya se está cayendo de espaldas
      tl.fromTo(due, { rotation: 30, x: -60, y: 0 }, { rotation: 90, x: -330, y: -40, duration: 0.3, ease: "power2.in" }, 0);
      tl.to(due, { y: -70, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, 0.3);
      sacudon(0.3, 1.6);
      tl.fromTo(q(".s10-polvo"), { opacity: 0, y: 0 }, { opacity: 1, y: -30, duration: 0.25, immediateRender: false }, 0.3);
      tl.to(q(".s10-polvo"), { opacity: 0, duration: 0.4 }, 0.6);
      gsap.set(q(".s10d-ojos"), { opacity: 0 }); gsap.set(q(".s10d-ojos-x"), { opacity: 1 });
      tl.fromTo(q(".s10d-cuerpo"), { scaleX: 1 }, { scaleX: 0.95, svgOrigin: "200 705", duration: 0.25, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0.4);
      tl.fromTo(q(".s10d-boca"), { scaleY: 1 }, { scaleY: 2, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.4);
      golpe(q(".s10-para"), 0.12, -6, 2.4);
      fuera(q(".s10-para"), Y + 0.5);
      // "rutina": se le prende la lamparita, levanta el dedo
      tl.set(q(".s10d-ojos-x"), { opacity: 0 }, RUTINA); tl.set(q(".s10d-ojos"), { opacity: 1 }, RUTINA);
      tl.to(q(".s10d-bi"), { rotation: 79, svgOrigin: "150 286", duration: 0.25, ease: "back.out(2)" }, RUTINA - 0.1);
      gsap.set(q(".s10-foco"), { opacity: 0 });
      tl.fromTo(q(".s10-foco"), { opacity: 0, scale: 0.2, svgOrigin: "300 960" }, { opacity: 1, scale: 1, svgOrigin: "300 960", duration: 0.35, ease: "back.out(2.5)", immediateRender: false }, RUTINA);
      tl.fromTo(q(".s10-rayo"), { opacity: 0.2 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 13, immediateRender: false }, RUTINA + 0.3);
      golpe(q(".s10-otro"), LA, -4, 2.4);
      golpe(q(".s10-otro2"), OTRO, 5, 3.4); sacudon(OTRO, 1.8);
      tl.to(q(".s10-foco"), { scale: 1.15, svgOrigin: "300 960", duration: 0.12, yoyo: true, repeat: 3 }, OTRO);
"""
sfx = [{"t": 0.25, "sfx": "impact-bass-1", "vol": 0.5, "max": 0.7}, {"t": 0.35, "sfx": "uuh", "vol": 0.25},
       {"t": 1.87, "sfx": "ping", "vol": 0.35}, {"t": 2.0, "sfx": "sparkle", "vol": 0.25}, {"t": 3.55, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.6}]
escena("s10-piso", p, 4.50, css, body, js, sfx)
