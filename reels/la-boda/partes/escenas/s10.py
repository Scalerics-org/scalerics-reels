from base import *
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-due { left: 340px; top: 780px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s10-t { top: 570px; font-size: 90px; }
    [data-composition-id="%ID%"] .s10-noche { left: 0; top: 540px; width: 1080px; height: 1000px; }
    [data-composition-id="%ID%"] .s10-novio { left: 340px; top: 830px; transform: rotate(-90deg) scale(0.8); }
    [data-composition-id="%ID%"] .s10-z { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; color: #e3b448; -webkit-text-stroke: 8px #2a1220; paint-order: stroke fill; }
"""
noche = f'''<svg viewBox="0 0 1080 1000" aria-hidden="true">
  <path class="s10-luna" d="M820 60 A110 110 0 1 0 880 250 A88 88 0 1 1 820 60 Z" fill="{D}" {S}/>
  {"".join(destello("s10-st", x, y, r, M) for x, y, r in [(150, 120, 18), (380, 60, 12), (600, 160, 16), (980, 380, 12), (90, 330, 12)])}
  <rect x="130" y="760" width="820" height="150" rx="30" fill="{A}" {S}/>
  <rect x="130" y="700" width="820" height="90" rx="30" fill="{M}" {S}/>
  <path d="M190 700 Q170 600 260 610 L330 620 Q380 640 360 700 Z" fill="{M}" {S}/>
  <path d="M100 640 V930 M980 680 V930" stroke="{V}" stroke-width="30" stroke-linecap="round"/>
</svg>'''
body = f"""
        <div class="obj s10-noche">{noche}</div>
        <div class="fig s10-novio">{novio('s10v')}</div>
        <div class="fig s10-due">{dueno('s10d')}</div>
        <div class="big a s10-t">¿Cuándo dormís?</div>
        <div class="s10-z s10-z1" style="left:640px; top:1060px; font-size:70px">z</div>
        <div class="s10-z s10-z2" style="left:700px; top:980px; font-size:90px">z</div>
        <div class="s10-z s10-z3" style="left:780px; top:880px; font-size:120px">Z</div>
"""
js = """
      const CUANDO = 0.29, DORMIS = 0.67, COMO = 1.86, BEBE = 2.22;
      // A: Ricardo desconcertado
      gsap.set(q(".s10d-bd"), { rotation: -30, svgOrigin: "250 292" });
      tl.fromTo(q(".s10-due"), { x: 60 }, { x: 0, duration: 0.25, ease: "back.out(2)" }, 0);
      habla(".s10d-boca", 0.0, 1.2, "200 250");
      tl.to(q(".s10d-cabeza"), { rotation: -10, svgOrigin: "200 250", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.1);
      tl.to(q(".s10d-bd"), { rotation: -150, svgOrigin: "250 292", duration: 0.25, ease: "back.out(2)" }, CUANDO);
      golpe(q(".s10-t"), DORMIS, -3, 2.4);
      sacudon(DORMIS + 0.05, 1);
      // B: como un bebé (cama, luna)
      gsap.set([q(".s10-noche"), q(".s10-novio")], { opacity: 0 });
      tl.to([q(".s10-due"), q(".s10-t")], { opacity: 0, scale: 0.85, duration: 0.2 }, COMO - 0.2);
      tl.fromTo(q(".s10-noche"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, COMO - 0.1);
      tl.fromTo(q(".s10-novio"), { opacity: 0, x: -130, y: 30 }, { opacity: 1, x: -130, y: 30, duration: 0.2, immediateRender: false }, COMO);
      gsap.set(q(".s10v-ojod"), { opacity: 0 }); gsap.set(q(".s10v-guino"), { opacity: 1 });
      tl.fromTo(q(".s10-luna"), { rotation: -20, svgOrigin: "840 160" }, { rotation: 0, svgOrigin: "840 160", duration: 0.5, ease: "back.out(2)", immediateRender: false }, COMO);
      qa(".s10-st").forEach((s, i) => tl.fromTo(s, { scale: 0.3, transformOrigin: "50% 50%" }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 2, ease: "sine.inOut", immediateRender: false }, COMO + i * 0.08));
      [".s10-z1", ".s10-z2", ".s10-z3"].forEach((s, i) => { gsap.set(q(s), { opacity: 0 }); tl.fromTo(q(s), { opacity: 0, y: 40 }, { opacity: 1, y: -30, duration: 0.5, ease: "power1.out", immediateRender: false }, BEBE - 0.2 + i * 0.18); });
"""
sfx = [{"t": 0.65, "sfx": "pop", "vol": 0.3}, {"t": 1.8, "sfx": "chime", "vol": 0.22, "max": 1.0}, {"t": 2.2, "sfx": "sparkle", "vol": 0.2}]
escena("s10-dormis", p, 3.10, css, body, js, sfx)
