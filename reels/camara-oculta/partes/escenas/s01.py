exec(PJ)
ID = "s01-broma"; DUR = 4.35
CSS = """
    $ .s01-broma-w { position: absolute; left: 70px; top: 600px; transform: rotate(-6deg); }
    $ .s01-broma-t { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #0c0c0c; background: #ffd400; padding: 14px 34px 6px; border: 7px solid #0c0c0c; box-shadow: 12px 12px 0 #ff3b30; text-transform: uppercase; white-space: nowrap; }
    $ .s01-cli { left: 500px; top: 790px; background: #ff3b30; color: #fbf7ea; font-size: 50px; transform: rotate(5deg); }
    $ .s01-busca { position: absolute; left: 110px; top: 610px; width: 860px; height: 120px; border-radius: 60px; background: #fbf7ea; border: 7px solid #0c0c0c; box-shadow: 10px 10px 0 #ffd400; }
    $ .s01-busca-t { position: absolute; left: 120px; top: 30px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 50px; color: #0c0c0c; white-space: nowrap; }
    $ .s01-busca-t span { opacity: 0; }
    $ .s01-cursor { display: inline-block; width: 6px; height: 52px; background: #0c0c0c; vertical-align: -8px; margin-left: 4px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- interior de la camioneta: ventana con cortina y monitor -->
          <g class="s01-van" opacity="0.55">
            <rect class="l s01-van-l" x="90" y="820" width="900" height="470" rx="60" stroke="#ffd400" />
            <path class="l s01-van-l" d="M90 900 C220 940 300 860 420 900 M660 900 C780 860 860 940 990 900" />
          </g>
          <g class="s01-mon">
            <rect class="k" x="700" y="930" width="250" height="180" rx="14" />
            <path class="yl" d="M720 950 H760 M720 950 V990 M930 1090 H890 M930 1090 V1050" stroke-width="5" />
            <circle cx="825" cy="990" r="22" fill="#fbf7ea" opacity="0.8" /><path d="M790 1060 C790 1030 860 1030 860 1060 Z" fill="#ff3b30" opacity="0.9" />
            <circle class="s01-rec" cx="930" cy="950" r="8" fill="#ff3b30" />
          </g>
          {conductor("s01", 400, 1400, 1.3, "sonrisa", extra='''<g class="s01-dedo"><circle class="b" cx="44" cy="-238" r="26" /><path class="l" d="M44 -258 V-312" stroke-width="16" /><path d="M44 -258 V-312" stroke="#2b2b2b" stroke-width="6" stroke-linecap="round" /></g>''')}
        </svg>
        <div class="s01-broma-w"><div class="s01-broma-t">Broma</div></div>
        <div class="cartela s01-cli">a tu cliente</div>
        <div class="s01-busca">
          <svg viewBox="0 0 120 120" style="position:absolute;left:24px;top:14px;width:80px;height:80px" aria-hidden="true"><circle cx="50" cy="50" r="28" fill="none" stroke="#0c0c0c" stroke-width="10" /><path d="M72 72 L100 100" stroke="#0c0c0c" stroke-width="12" stroke-linecap="round" /></svg>
          <div class="s01-busca-t">{''.join(f'<span>{c}</span>' for c in 'tu local...')}<i class="s01-cursor"></i></div>
        </div>
"""
JS = """
      const BROMA = 0.55, CLIENTE = 0.95, BUSCAR = 2.36, LOCAL = 2.73, INTERNET = 3.09;
      // cuadro 0: la camioneta ya está, el conductor ya está a medio entrar
      tl.fromTo(q(".s01-con"), { y: 60, opacity: 0.85 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      dibujar(".s01-van-l", 0, 0.6);
      pop(".s01-mon", 0.1);
      tl.fromTo(q(".s01-rec"), { opacity: 1 }, { opacity: 0.1, duration: 0.3, ease: "steps(1)", yoyo: true, repeat: 13 }, 0);
      // shh: el dedo a la boca y se inclina a la cámara
      gsap.set(q(".s01-dedo"), { opacity: 0 });
      tl.fromTo(q(".s01-dedo"), { opacity: 1, y: 160 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, 0.05);
      tl.to(q(".s01-con"), { rotation: -4, svgOrigin: "400 1400", duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.3);
      habla(".s01-con-boca", 0.15, 1.0, "0 -250");
      // BROMA
      golpe(".s01-broma-w", BROMA, 2.6);
      sacudon(BROMA + 0.05, 0.8);
      pop(".s01-cli", CLIENTE, { rotation: 5 });
      // a buscar tu local en internet: se van los carteles, entra el buscador
      tl.to(q(".s01-dedo"), { y: 200, opacity: 0, duration: 0.25, ease: "power2.in" }, 1.75);
      tl.to([q(".s01-broma-w"), q(".s01-cli")], { y: -60, opacity: 0, duration: 0.2, ease: "power2.in" }, BUSCAR - 0.25);
      gsap.set(q(".s01-busca"), { opacity: 0 });
      tl.fromTo(q(".s01-busca"), { opacity: 1, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, BUSCAR - 0.05);
      qa(".s01-busca-t span").forEach((s, i) => tl.set(s, { opacity: 1 }, BUSCAR + 0.2 + i * 0.07));
      tl.fromTo(q(".s01-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "steps(1)", yoyo: true, repeat: 7 }, BUSCAR);
      habla(".s01-con-boca", 1.8, 1.4, "0 -250");
      tl.to(q(".s01-busca"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, INTERNET);
      // guiño: se baja los lentes
      tl.to(q(".s01-con"), { y: -20, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, INTERNET + 0.3);
"""
SFX = [{"t": 0.0, "sfx": "click", "vol": 0.3}, {"t": 0.5, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 0.95, "sfx": "pop", "vol": 0.3}, {"t": 2.3, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.55, "sfx": "typing", "vol": 0.25, "max": 0.8}, {"t": 3.1, "sfx": "ping", "vol": 0.22}]
