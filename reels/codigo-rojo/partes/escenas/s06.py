exec(open("partes/escenas/pj.py").read())
ID = "s06-monitor"; DUR = 4.57
def cli(k, x):
    return f'<g class="s06-c s06-c{k}"><circle cx="{x}" cy="930" r="38" fill="#eef6f5" /><path d="M{x-50} 1080 C{x-50} 1000 {x+50} 1000 {x+50} 1080 V1150 H{x-50} Z" fill="#eef6f5" /><rect x="{x-40}" y="1150" width="30" height="80" rx="10" fill="#eef6f5" /><rect x="{x+10}" y="1150" width="30" height="80" rx="10" fill="#eef6f5" /></g>'
CSS = """
    $ .s06-bip { left: 520px; top: 560px; width: 480px; font-size: 150px; color: #ff3341; text-shadow: 0 0 26px rgba(255, 51, 65, 0.5), 8px 8px 0 #03171b; }
    $ .s06-menos { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #ff3341; }
    $ .s06-lbl { left: 560px; top: 1270px; background: #eef6f5; color: #03171b; font-size: 38px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s06-doc">
            <g transform="translate(-10 760) scale(0.95)">
              {doctora("s06")}
              <path class="l" d="M300 420 C340 470 360 520 380 600" stroke-width="22" stroke="#4fc3b0" />
              <circle cx="384" cy="612" r="24" fill="#eef6f5" />
            </g>
          </g>
          <rect class="b" x="560" y="840" width="190" height="400" rx="8" />
          <rect x="580" y="860" width="150" height="380" fill="#03171b" />
          <path class="l" d="M540 1240 H1040" stroke-width="6" />
          <rect x="580" y="790" width="150" height="44" rx="8" fill="#5ce611" opacity="0.0" />
          <text x="655" y="824" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#4fc3b0">SALIDA</text>
          {cli(1, 655)}{cli(2, 655)}{cli(3, 655)}
        </svg>
        <div class="txt s06-bip" style="position:absolute">BIP</div>
        <div class="s06-menos s06-m1" style="left: 820px; top: 860px">-1</div>
        <div class="s06-menos s06-m2" style="left: 900px; top: 760px">-1</div>
        <div class="s06-menos s06-m3" style="left: 860px; top: 1000px">-1</div>
        <div class="cartela s06-lbl">UN BIP MENOS</div>
"""
JS = """
      const MONITOR = 0.58, CLIENTE = 1.65, VA = 2.23, BIP = 3.11, MENOS = 3.40;
      tl.fromTo(q(".s06-doc"), { x: -400 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      habla(".s06-dboca", 0.05, 0.9, "180 292");
      habla(".s06-dboca", 1.4, 2.4, "180 292");
      tl.to(q(".s06-dcejas"), { y: 8, duration: 0.2 }, MONITOR);
      // los clientes salen por la puerta, uno por uno
      [[".s06-c1", CLIENTE - 0.3, ".s06-m1"], [".s06-c2", VA - 0.15, ".s06-m2"], [".s06-c3", BIP - 0.25, ".s06-m3"]].forEach(([s, t, m]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 1, x: 0, scale: 0.85, svgOrigin: "655 1230" }, { opacity: 1, x: 330, scale: 1, svgOrigin: "655 1230", duration: 0.55, ease: "power1.in", immediateRender: false }, t);
        tl.to(q(s), { y: -8, duration: 0.09, yoyo: true, repeat: 5, ease: "sine.inOut" }, t);
        tl.to(q(s), { opacity: 0, duration: 0.15 }, t + 0.5);
        pop(m, t + 0.45);
        tl.to(q(m), { y: -60, opacity: 0, duration: 0.5, ease: "power1.in" }, t + 0.85);
      });
      golpe(".s06-bip", BIP, 2.6);
      sacudon(BIP + 0.05, 1);
      tl.to(q(".s06-bip"), { opacity: 0.25, scale: 0.9, duration: 0.35, ease: "power2.in" }, MENOS + 0.1);
      pop(".s06-lbl", MENOS);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.2}, {"t": 1.8, "sfx": "click-soft", "vol": 0.3}, {"t": 2.53, "sfx": "click-soft", "vol": 0.3}, {"t": 3.05, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 3.4, "sfx": "pop", "vol": 0.25}]
