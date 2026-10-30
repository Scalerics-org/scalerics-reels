ID = "s08-solo"; DUR = 6.19
CSS = """
    $ .s08-solo { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 64px; letter-spacing: 0.5em; color: #4fc3ff; }
    $ .s08-et { position: absolute; width: 300px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #f6c544; }
"""
def ICONO(clase, x, y, cuerpo):
    return f'<g class="s08-ic {clase}"><g transform="translate({x} {y})">{cuerpo}</g></g>'
mostrador = '<rect class="k" x="-110" y="-40" width="220" height="110" rx="8" /><rect class="y" x="-124" y="-60" width="248" height="26" rx="6" /><path class="l" d="M-70 0 H70" stroke-width="5" opacity="0.6" />'
caja = '<rect class="k" x="-90" y="0" width="180" height="80" rx="8" /><path class="k" d="M-70 0 L-50 -70 H50 L70 0 Z" /><rect class="c" x="-40" y="-56" width="80" height="34" rx="4" stroke-width="5" /><path class="l" d="M-50 40 H50" stroke-width="5" />'
cajas = '<rect class="y" x="-100" y="0" width="110" height="90" rx="6" /><rect class="y" x="10" y="0" width="100" height="90" rx="6" /><rect class="y" x="-50" y="-86" width="110" height="86" rx="6" /><path class="l" d="M-45 0 V40 M60 0 V40 M5 -86 V-46" stroke="#0b080b" stroke-width="5" />'
celu = '<rect class="k" x="-56" y="-100" width="112" height="200" rx="18" /><rect x="-40" y="-78" width="80" height="150" rx="6" fill="#4fc3ff" opacity="0.8" />'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s08", "s08-h", 540, 540, 30, 360, 0, 1480) + """
          """ + PISO("s08", 540, 1460, 240, 46) + """
          <g class="s08-maxi"><g transform="translate(342 870) scale(1.1)">""" + MAXI("s08", telefono=False) + """</g></g>
          """ + ICONO("s08-i1", 200, 830, mostrador) + ICONO("s08-i2", 880, 820, caja) + ICONO("s08-i3", 190, 1240, cajas) + ICONO("s08-i4", 890, 1200, celu) + """
          <g class="s08-burb">
            <rect x="930" y="1030" width="90" height="46" rx="18" fill="#fff3d6" /><rect x="770" y="1060" width="80" height="40" rx="16" fill="#fff3d6" /><rect x="960" y="1110" width="70" height="40" rx="16" fill="#fff3d6" />
          </g>
        </svg>
        <div class="s08-solo">SOLO</div>
        <div class="s08-et s08-e1" style="left:50px;top:930px">MOSTRADOR</div>
        <div class="s08-et s08-e2" style="left:730px;top:930px">CAJA</div>
        <div class="s08-et s08-e3" style="left:40px;top:1350px">PROVEEDORES</div>
        <div class="s08-et s08-e4" style="left:740px;top:1330px">CELULAR</div>
"""
JS = """
      const SOLO = 0.35, MOS = 1.30, CAJA = 2.35, PROV = 3.48, CEL = 4.87;
      // cuadro 0: luz fría y angosta, Maxi triste
      gsap.set(q(".s08-boca"), { rotation: 180, svgOrigin: "182 291" });
      tl.fromTo(q(".s08-maxi"), { y: 30, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(q(".s08-h"), { opacity: 0 }, { opacity: 0.14, duration: 0.3 }, 0);
      tl.fromTo(q(".s08-maxi"), { rotation: 0, svgOrigin: "540 1460" }, { rotation: -3, svgOrigin: "540 1460", duration: 1.2, yoyo: true, repeat: 4, ease: "sine.inOut", immediateRender: false }, 0.4);
      pop(".s08-solo", SOLO);
      tl.to(q(".s08-solo"), { opacity: 0.35, duration: 1 }, SOLO + 0.8);
      [[".s08-i1", ".s08-e1", MOS], [".s08-i2", ".s08-e2", CAJA], [".s08-i3", ".s08-e3", PROV], [".s08-i4", ".s08-e4", CEL]].forEach(([i, e, t]) => {
        pop(i, t - 0.05); pop(e, t + 0.05);
      });
      // lo aprietan: los íconos se acercan
      tl.to(q(".s08-i1"), { x: 60, y: 30, duration: 4.5, ease: "power1.in" }, MOS + 0.3);
      tl.to(q(".s08-i2"), { x: -50, y: 30, duration: 3.5, ease: "power1.in" }, CAJA + 0.3);
      tl.to(q(".s08-i3"), { x: 50, y: -20, duration: 2.5, ease: "power1.in" }, PROV + 0.2);
      // el celular no para
      tl.fromTo(q(".s08-i4"), { x: -6 }, { x: 6, duration: 0.05, yoyo: true, repeat: 23, ease: "none", immediateRender: false }, CEL + 0.1);
      gsap.set(qa(".s08-burb rect"), { opacity: 0 });
      qa(".s08-burb rect").forEach((r, k) => tl.fromTo(r, { opacity: 0, y: 20 }, { opacity: 1, y: -30, duration: 0.3, ease: "back.out(2)", immediateRender: false }, CEL + 0.2 + k * 0.2));
"""
SFX = [{"t": 0.35, "sfx": "click-soft", "vol": 0.3}, {"t": 1.3, "sfx": "pop", "vol": 0.25}, {"t": 2.35, "sfx": "pop", "vol": 0.25}, {"t": 3.48, "sfx": "pop", "vol": 0.25}, {"t": 4.9, "sfx": "notification", "vol": 0.3}, {"t": 5.2, "sfx": "notification", "vol": 0.25}, {"t": 5.5, "sfx": "notification", "vol": 0.22}]
