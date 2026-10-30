from base import *
p = "s13"
css = """
    [data-composition-id="%ID%"] .s13-manda { top: 590px; font-size: 128px; }
    [data-composition-id="%ID%"] .s13-al { top: 1140px; font-size: 62px; }
    [data-composition-id="%ID%"] .s13-vin { top: 1220px; font-size: 92px; }
"""
body = f"""
        <svg class="s13-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-vincha">
            <ellipse cx="540" cy="920" rx="260" ry="104" fill="none" stroke="{D}" stroke-width="70"/>
            <ellipse cx="540" cy="920" rx="260" ry="104" fill="none" stroke="{R}" stroke-width="52"/>
            <path d="M330 860 L338 960 M420 830 L424 1010 M540 818 L540 1022 M660 830 L656 1010 M750 860 L742 960" stroke="{D}" stroke-width="6" opacity="0.4"/>
          </g>
          <g class="s13-avion">
            <path d="M800 760 L960 700 L900 860 L870 800 Z" fill="{G}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
            <path d="M870 800 L960 700" stroke="{D}" stroke-width="5"/>
          </g>
          <path class="s13-estela" d="M560 920 Q700 900 800 780" stroke="{G}" stroke-width="8" fill="none" stroke-dasharray="4 18" stroke-linecap="round"/>
          {estrella("s13-st", 230, 780, 26)}{estrella("s13-st", 860, 1040, 22, T)}{estrella("s13-st", 200, 1060, 18, R)}
        </svg>
        <div class="big a s13-manda">¡Mandáselo!</div>
        <div class="big c s13-al">al que todas las noches</div>
        <div class="big r s13-vin">se pone la vincha</div>
"""
js = """
      const TODAS = 0.57, PONE = 1.39, VINCHA = 1.75;
      // cuadro 0: la vincha ya girando
      tl.fromTo(q(".s13-vincha"), { opacity: 0.5, scale: 0.6, rotation: -20, svgOrigin: "540 920" }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: "540 920", duration: 0.35, ease: "back.out(2)" }, 0);
      tl.to(q(".s13-vincha"), { rotation: 6, svgOrigin: "540 920", duration: BEAT, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.4);
      gsap.set(q(".s13-manda"), { opacity: 1, rotation: -4 });
      tl.fromTo(q(".s13-manda"), { scale: 2 }, { scale: 1, duration: 0.2, ease: "power4.out" }, 0);
      sacudon(0.15, 1.2);
      golpe(q(".s13-al"), TODAS, 2, 2);
      golpe(q(".s13-vin"), PONE + 0.1, -4, 2.6);
      sacudon(VINCHA, 1.4);
      // el avioncito sale volando con la vincha "mandada"
      gsap.set([q(".s13-avion"), q(".s13-estela")], { opacity: 0 });
      tl.fromTo(q(".s13-estela"), { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, VINCHA);
      tl.fromTo(q(".s13-avion"), { opacity: 0, x: -260, y: 140, scale: 0.5, svgOrigin: "880 780" }, { opacity: 1, x: 0, y: 0, scale: 1, svgOrigin: "880 780", duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, VINCHA);
      tl.to(q(".s13-avion"), { y: -16, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, VINCHA + 0.5);
      tl.to(q(".s13-vin"), { scale: 1.06, duration: BEAT, yoyo: true, repeat: 5, ease: "sine.inOut" }, VINCHA + 0.3);
      qa(".s13-st").forEach((s, i) => {
        tl.fromTo(s, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.3 + i * 0.3);
        tl.to(s, { rotation: 180, transformOrigin: "50% 50%", duration: DUR, ease: "none" }, 0);
      });
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 0.55, "sfx": "pop", "vol": 0.3}, {"t": 1.45, "sfx": "pop", "vol": 0.3},
       {"t": 1.75, "sfx": "whoosh", "vol": 0.3}, {"t": 2.2, "sfx": "sparkle", "vol": 0.3}]
escena("s13-cta", p, 5.36, css, body, js, sfx)
