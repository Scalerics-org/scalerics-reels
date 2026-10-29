ID = "s06-whatsapp"; DUR = 5.03
CSS = """
    $ .s06-tel { position: absolute; left: 110px; top: 590px; width: 500px; height: 790px; border: 7px solid #f4f6fb; border-radius: 56px; background: #0b1d4a; overflow: hidden; }
    $ .s06-barra { position: absolute; left: 187px; top: 18px; width: 126px; height: 12px; border-radius: 6px; background: #f4f6fb; opacity: 0.6; }
    $ .s06-head { position: absolute; left: 0; right: 0; top: 46px; padding: 0 30px 16px; border-bottom: 3px solid rgba(244, 246, 251, 0.25); font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #f4f6fb; white-space: nowrap; }
    $ .s06-badge { display: inline-block; margin-left: 12px; padding: 2px 14px; border-radius: 22px; background: #e3212d; color: #f4f6fb; font-size: 30px; font-weight: 900; }
    $ .s06-fila { position: absolute; left: 24px; right: 24px; height: 104px; border-bottom: 2px solid rgba(244, 246, 251, 0.18); }
    $ .s06-fila b { position: absolute; left: 0; top: 14px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; color: #f4f6fb; white-space: nowrap; }
    $ .s06-fila span { position: absolute; left: 0; top: 56px; font-family: "Lexend", sans-serif; font-weight: 400; font-size: 27px; color: #f4f6fb; opacity: 0.8; white-space: nowrap; }
    $ .s06-fila i { position: absolute; right: 0; top: 36px; min-width: 40px; height: 40px; border-radius: 20px; background: #e3212d; color: #f4f6fb; font-style: normal; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 28px; line-height: 40px; text-align: center; }
    $ .s06-acuerdo { left: 70px; top: 1268px; background: #e3212d; color: #f4f6fb; font-size: 50px; box-shadow: 8px 8px 0 #050d22; transform: rotate(-3deg); }
"""
FILAS = [("Marta", "¿Tienen pan?", "3"), ("Rodrigo", "¿Abren el domingo?", "5"), ("Clienta nueva", "Hola?? ", "12"), ("Lucía", "¿Tenés pañales?", "2"), ("Vecino del 4", "¿Me guardás uno?", "7")]
FHTML = "".join(f'<div class="s06-fila" style="top:{130 + i * 106}px"><b>{n}</b><span>{m}</span><i>{c}</i></div>' for i, (n, m, c) in enumerate(FILAS))
HTML = """
        <div class="s06-tel">
          <div class="s06-barra"></div>
          <div class="s06-head">Almacén Raúl <span class="s06-badge">147</span></div>
          """ + FHTML + """
        </div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s06-luna"><path d="M930 600 A70 70 0 1 0 1000 700 A56 56 0 1 1 930 600 Z" fill="#ffd21f" stroke="#f4f6fb" stroke-width="5" /><path d="M820 640 l8 0 M824 636 l0 8 M1010 860 l10 0 M1015 855 l0 10" stroke="#f4f6fb" stroke-width="4" stroke-linecap="round" /></g>
          <g class="s06-raul">
            <g transform="translate(600 800) scale(1.2)">
              <path class="b" d="M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z" />
              <path d="M110 372 H250 V520 H110 Z" fill="#f4f6fb" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
              <ellipse class="b" cx="180" cy="230" rx="80" ry="90" />
              <path class="l" d="M104 250 C98 214 104 186 118 170 M256 250 C262 214 256 186 242 170 M128 166 C160 150 214 150 240 168" />
              <path class="l" d="M134 196 L166 202 M226 196 L194 202" stroke-width="6" />
              <g class="s06-anteojos"><circle cx="154" cy="234" r="22" fill="none" stroke="#ffd21f" stroke-width="6" /><circle cx="206" cy="234" r="22" fill="none" stroke="#ffd21f" stroke-width="6" /><path d="M176 234 h8" stroke="#ffd21f" stroke-width="6" /></g>
              <circle class="s06-ojo" cx="148" cy="236" r="6" fill="#f4f6fb" /><circle class="s06-ojo" cx="200" cy="236" r="6" fill="#f4f6fb" />
              <path class="b s06-boca" d="M156 290 C168 300 192 300 204 290 Z" />
              <path d="M136 268 C156 250 204 250 224 268 C206 284 192 274 180 270 C168 274 154 284 136 268 Z" fill="#f4f6fb" />
              <path class="l" d="M60 430 C20 380 40 330 90 320" stroke-width="16" />
            </g>
          </g>
          <g class="s06-signo"><text x="900" y="1210" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="150" fill="#ff5a5f" stroke="#050d22" stroke-width="4">?</text></g>
        </svg>
        <div class="cartela s06-acuerdo">"CUANDO ME ACUERDO"</div>
"""
JS = """
      const WHATSAPP = 0.2, LO = 1.63, NOCHE = 2.33, CUANDO = 3.45;
      // cuadro 0: el celular ya sube
      tl.fromTo(q(".s06-tel"), { y: 260, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(qa(".s06-fila"), { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.2, stagger: 0.07, ease: "power2.out" }, WHATSAPP);
      // los mensajes sin leer suben todo el tiempo
      const badge = q(".s06-badge"), c = { v: 147 };
      tl.fromTo(c, { v: 147 }, { v: 171, duration: DUR - 0.6, ease: "none", onUpdate: () => { badge.textContent = String(Math.round(c.v)); } }, 0.4);
      tl.fromTo(badge, { scale: 1 }, { scale: 1.3, duration: 0.12, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0.4);
      qa(".s06-fila i").forEach((el, i) => tl.fromTo(el, { scale: 1 }, { scale: 1.25, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, 0.9 + i * 0.55));
      // Raúl lo mira con los anteojos en la punta de la nariz
      entra(".s06-raul", LO - 0.25, { x: 520 });
      tl.to(qa(".s06-ojo"), { x: -6, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, LO + 0.1);
      habla(".s06-boca", LO, 2.4, "180 292");
      // la luna: a la noche
      gsap.set(q(".s06-luna"), { opacity: 0 });
      tl.fromTo(q(".s06-luna"), { opacity: 1, y: 160, rotation: -30, svgOrigin: "960 690" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "960 690", duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, NOCHE - 0.1);
      tl.to(q(".s06-luna"), { rotation: 8, svgOrigin: "960 690", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, NOCHE + 0.3);
      // cuando me acuerdo
      golpe(".s06-acuerdo", CUANDO, 2.2);
      sacudon(CUANDO + 0.05);
      pop(".s06-signo", CUANDO + 0.3, { svgOrigin: "900 1160" });
      tl.to(q(".s06-signo"), { rotation: 10, svgOrigin: "900 1160", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, CUANDO + 0.6);
      tl.to(q(".s06-tel"), { opacity: 0.55, duration: 0.3 }, CUANDO);
"""
SFX = [{"t": 0.2, "sfx": "notification", "vol": 0.3}, {"t": 0.9, "sfx": "notification", "vol": 0.18}, {"t": 2.0, "sfx": "notification", "vol": 0.15}, {"t": 2.25, "sfx": "sparkle", "vol": 0.2}, {"t": 3.38, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.5}, {"t": 4.2, "sfx": "notification", "vol": 0.15}]
