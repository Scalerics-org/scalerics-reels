ID = "s03-ciudad"; DUR = 5.89
burb = lambda c, x, y: f'<g class="s03-b {c}"><rect x="{x-46}" y="{y-34}" width="92" height="62" rx="18" fill="#fdf6e3" stroke="#111111" stroke-width="6" /><path d="M{x-20} {y+26} L{x-30} {y+46} L{x} {y+26}" fill="#fdf6e3" stroke="#111111" stroke-width="6" stroke-linejoin="round" /><text x="{x}" y="{y+14}" text-anchor="middle" font-family="Bangers" font-size="44" fill="#e63946">¿?</text></g>'
CIELO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s03-htn)" />
            <g class="s03-cara" opacity="0.55"><g transform="translate(150 560) scale(1.5)">
              <path d="M114 360 C96 262 126 150 200 112 C274 150 304 262 286 360 C250 384 150 384 114 360 Z" fill="#0b1430" stroke="#111111" stroke-width="7" />
              <path d="M144 340 C134 270 158 216 200 212 C242 216 266 270 256 340 C230 356 170 356 144 340 Z" fill="#111111" />
              <g class="s03-ojos"><path d="M158 270 L174 286 L198 258 M204 270 L220 286 L244 258" fill="none" stroke="#4fc3ff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" /></g>
            </g></g>
            <g class="s03-luna"><circle cx="830" cy="720" r="90" fill="#fdf6e3" stroke="#111111" stroke-width="7" /><circle cx="800" cy="700" r="16" fill="url(#s03-ht)" opacity="0.4" /><circle cx="860" cy="760" r="24" fill="url(#s03-ht)" opacity="0.4" /></g>
            """ + CIUDAD("s03", 1500, "s03-ven") + """
            """ + burb("s03-b1", 200, 1010) + burb("s03-b2", 470, 900) + burb("s03-b3", 610, 1060) + burb("s03-b4", 900, 1000) + burb("s03-b5", 330, 1130) + """
"""
CSS = """
    $ .s03-zzz { position: absolute; font-family: "Bangers"; font-size: 64px; color: #fdf6e3; -webkit-text-stroke: 6px #111111; paint-order: stroke fill; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s03") + VINETA("s03", "s03-v", 60, 560, 960, 940, "#14214a", CIELO) + """</svg>
        """ + CAJA("s03-hora", "23:00 HS · LA CIUDAD", 90, 590, 50, "#ffd23f", "#111111", -2) + """
        <div class="s03-zzz s03-z1" style="left:700px;top:880px">Z</div><div class="s03-zzz s03-z2" style="left:750px;top:830px">Z</div><div class="s03-zzz s03-z3" style="left:800px;top:780px">Z</div>
"""
JS = """
      const ONCE = 0.0, CIUDAD = 1.96, TUS = 3.56, NO = 4.83;
      camara(".s03-v", 0, DUR, 1.0, 1.06, "540px 1100px");
      pop(".s03-hora", 0.15, { rotation: -10 });
      tl.fromTo(q(".s03-cara"), { y: -60, opacity: 0.25 }, { y: 0, opacity: 0.55, duration: 1.2, ease: "power2.out" }, 0);
      tl.fromTo(q(".s03-ojos"), { opacity: 0.4 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3 }, 0.4);
      // la ciudad duerme: se apagan las ventanas en tandas
      [0, 1, 2].forEach((k) => tl.to(qa(".s03-ven-" + k), { opacity: 0.1, duration: 0.08 }, CIUDAD + k * 0.22));
      ["1", "2", "3"].forEach((k, i) => { gsap.set(q(".s03-z" + k), { opacity: 0 }); tl.fromTo(q(".s03-z" + k), { opacity: 0, y: 20 }, { opacity: 1, y: -20, duration: 0.5, ease: "power1.out", immediateRender: false }, CIUDAD + 0.3 + i * 0.25); });
      tl.to(qa(".s03-zzz"), { opacity: 0, duration: 0.2 }, TUS - 0.1);
      // tus clientes, no: se prenden celulares y caen preguntas
      tl.to(qa(".s03-ven-1"), { opacity: 1, duration: 0.05, stagger: 0.03 }, TUS);
      qa(".s03-b").forEach((b, i) => { gsap.set(b, { opacity: 0 }); tl.fromTo(b, { opacity: 0, scale: 0.3, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, transformOrigin: "50% 100%", duration: 0.25, ease: "back.out(2.4)", immediateRender: false }, TUS + 0.1 + i * 0.18); });
      tl.to(qa(".s03-b"), { y: -12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.05 }, NO - 0.2);
      tl.to(q(".s03-cara"), { opacity: 0.9, scale: 1.06, transformOrigin: "50% 50%", duration: 0.3 }, NO);
      sacudon(NO + 0.03, 0.7);
"""
SFX = [{"t": 0.05, "sfx": "riser", "vol": 0.18, "max": 1.6}, {"t": 0.2, "sfx": "pop", "vol": 0.28}, {"t": 2.0, "sfx": "click-soft", "vol": 0.3}, {"t": 3.66, "sfx": "notification", "vol": 0.3}, {"t": 4.0, "sfx": "notification", "vol": 0.25}, {"t": 4.4, "sfx": "notification", "vol": 0.25}, {"t": 4.85, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}]
