<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s08-segunda"] .s08-capa { position: absolute; inset: 0; }
    [data-composition-id="s08-segunda"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s08-segunda"] .s08-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s08-segunda"] .s08-nombre { font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; fill: #fff3e0; }
    [data-composition-id="s08-segunda"] .s08-link { position: absolute; left: 330px; top: 740px; width: 360px; padding: 18px 24px; background: #fff3e0; border: 5px solid #120a22; border-radius: 30px 30px 30px 6px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.2; color: #120a22; }
    [data-composition-id="s08-segunda"] .s08-link u { color: #138f86; text-decoration-thickness: 3px; }
    [data-composition-id="s08-segunda"] .s08-precio { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; fill: #120a22; }
    [data-composition-id="s08-segunda"] .s08-boton { position: absolute; left: 330px; top: 1250px; width: 420px; height: 110px; border-radius: 26px; background: #22d1c3; border: 6px solid #120a22; text-align: center; }
    [data-composition-id="s08-segunda"] .s08-boton div { position: absolute; left: 0; right: 0; font-family: "Lexend", sans-serif; font-weight: 800; line-height: 1.05; color: #120a22; }
    [data-composition-id="s08-segunda"] .s08-b1 { top: 16px; font-size: 30px; }
    [data-composition-id="s08-segunda"] .s08-b2 { top: 26px; font-size: 48px; }
    [data-composition-id="s08-segunda"] .s08-cli { position: absolute; left: 430px; top: 960px; width: 290px; height: 408px; }
    [data-composition-id="s08-segunda"] .s08-cli svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s08-segunda"] .s08-pijama { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; line-height: 1; color: #22d1c3; -webkit-text-stroke: 10px #120a22; paint-order: stroke fill; text-shadow: 0 0 30px rgba(34, 209, 195, 0.5); white-space: nowrap; }
  </style>
  <div id="root" data-composition-id="s08-segunda" data-width="1080" data-height="1920" data-duration="8.52">
    <div id="s08-escena" class="s08-capa clip" data-start="0" data-duration="8.52" data-track-index="0">
      <div class="s08-capa s08-cel">
        <svg class="s08-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="300" y="590" width="480" height="860" rx="56" fill="#241238" />
          <rect x="300" y="590" width="480" height="120" rx="56" fill="#3b1d5a" />
          <rect x="300" y="660" width="480" height="50" fill="#3b1d5a" />
          <rect x="490" y="612" width="100" height="12" rx="6" fill="#120a22" />
          <circle cx="368" cy="668" r="24" fill="#22d1c3" stroke="#120a22" stroke-width="4" />
          <text class="s08-nombre" x="408" y="680">Otro local</text>
          <!-- la tienda -->
          <g class="s08-tienda">
            <rect x="320" y="720" width="440" height="500" fill="#241238" />
            <g class="s08-prod"><rect x="330" y="730" width="200" height="230" rx="18" fill="#fff3e0" stroke="#120a22" stroke-width="5" /><rect x="380" y="760" width="100" height="110" rx="10" fill="#ff6f59" stroke="#120a22" stroke-width="5" /><rect x="400" y="744" width="60" height="22" rx="6" fill="#ffc857" stroke="#120a22" stroke-width="4" /></g>
            <g class="s08-prod"><rect x="550" y="730" width="200" height="230" rx="18" fill="#fff3e0" stroke="#120a22" stroke-width="5" /><circle cx="650" cy="815" r="52" fill="#22d1c3" stroke="#120a22" stroke-width="5" /><path d="M622 815 H678" stroke="#120a22" stroke-width="5" /></g>
            <g class="s08-prod"><rect x="330" y="980" width="200" height="230" rx="18" fill="#fff3e0" stroke="#120a22" stroke-width="5" /><path d="M380 1100 L430 1010 L480 1100 Z" fill="#ffc857" stroke="#120a22" stroke-width="5" stroke-linejoin="round" /></g>
            <g class="s08-prod"><rect x="550" y="980" width="200" height="230" rx="18" fill="#fff3e0" stroke="#120a22" stroke-width="5" /><rect x="600" y="1010" width="100" height="90" rx="44" fill="#3b1d5a" stroke="#120a22" stroke-width="5" /></g>
            <g class="s08-precios">
              <rect x="350" y="895" width="160" height="50" rx="12" fill="#ffc857" stroke="#120a22" stroke-width="4" /><text class="s08-precio" x="430" y="931" text-anchor="middle">$ 690</text>
              <rect x="570" y="895" width="160" height="50" rx="12" fill="#ffc857" stroke="#120a22" stroke-width="4" /><text class="s08-precio" x="650" y="931" text-anchor="middle">$ 1.250</text>
              <rect x="350" y="1145" width="160" height="50" rx="12" fill="#ffc857" stroke="#120a22" stroke-width="4" /><text class="s08-precio" x="430" y="1181" text-anchor="middle">$ 480</text>
              <rect x="570" y="1145" width="160" height="50" rx="12" fill="#ffc857" stroke="#120a22" stroke-width="4" /><text class="s08-precio" x="650" y="1181" text-anchor="middle">$ 2.100</text>
            </g>
          </g>
          <rect x="300" y="590" width="480" height="860" rx="56" fill="none" stroke="#fff3e0" stroke-width="7" />
        </svg>
        <div class="s08-link">Mirá todo acá:<br /><u>otrolocal.uy/tienda</u></div>
        <div class="s08-boton"><div class="s08-b1">PAGAR CON<br />MERCADO PAGO</div><div class="s08-b2">PAGO OK</div></div>
      </div>
      <div class="s08-capa s08-envio">
        <svg class="s08-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-casa">
            <path d="M720 1120 L850 1000 L980 1120 Z" fill="#22d1c3" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <rect x="745" y="1120" width="210" height="290" fill="#fff3e0" stroke="#120a22" stroke-width="7" />
            <rect x="770" y="1146" width="44" height="44" fill="#ffc857" stroke="#120a22" stroke-width="5" />
            <rect x="886" y="1146" width="44" height="44" fill="#ffc857" stroke="#120a22" stroke-width="5" />
            <rect x="820" y="1260" width="60" height="150" rx="4" fill="#3b1d5a" stroke="#120a22" stroke-width="6" />
          </g>
          <g class="s08-camioneta">
            <rect x="80" y="1240" width="250" height="150" rx="16" fill="#fff3e0" stroke="#120a22" stroke-width="7" />
            <path d="M330 1290 H400 L440 1340 V1390 H330 Z" fill="#22d1c3" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <text x="205" y="1340" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="900" font-size="60" fill="#120a22">DAC</text>
            <circle cx="140" cy="1400" r="30" fill="#120a22" stroke="#fff3e0" stroke-width="6" /><circle cx="370" cy="1400" r="30" fill="#120a22" stroke="#fff3e0" stroke-width="6" />
            <path d="M40 1290 H0 M50 1330 H-10 M40 1370 H10" stroke="#fff3e0" stroke-width="6" stroke-linecap="round" opacity="0.6" />
          </g>
          <g class="s08-caja">
            <rect x="560" y="1300" width="110" height="94" rx="8" fill="#ffc857" stroke="#120a22" stroke-width="6" />
            <path d="M615 1300 V1394 M560 1336 H670" stroke="#ff6f59" stroke-width="10" />
          </g>
        </svg>
        <div class="s08-cli"><!--@CLIENTA s08-c pijama--></div>
        <svg class="s08-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!--@CORAZON s08-k1 470 940 34 #ff6f59-->
          <!--@CORAZON s08-k2 690 900 44 #ff6f59-->
        </svg>
        <div class="s08-pijama">EN PIJAMA</div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s08-segunda";
      const DUR = 8.52;
      //@HELPERS

      const LINK = 0.55, VI = 1.59, PRECIO = 2.2, PAGUE = 2.85, PAGO = 3.86, SILLON = 4.31, Y = 5.0, CASA = 6.15, DAC = 6.52, PIJAMA = 7.62;
      tl.fromTo(q(".s08-cel"), { y: 140, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0);
      // "link"
      pop(q(".s08-link"), LINK - 0.1);
      // "Vi todo": se abre la tienda
      gsap.set(q(".s08-tienda"), { opacity: 0 });
      tl.to(q(".s08-link"), { opacity: 0, y: -40, duration: 0.2 }, VI + 0.05);
      tl.set(q(".s08-tienda"), { opacity: 1 }, VI + 0.1);
      [...qa(".s08-prod")].forEach((p, i) => tl.fromTo(p, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, VI + 0.1 + i * 0.07));
      gsap.set(qa(".s08-prod"), { opacity: 0 });
      // "precio": las etiquetas
      gsap.set(q(".s08-precios"), { opacity: 0 });
      tl.fromTo(q(".s08-precios"), { opacity: 0, scale: 1.3, svgOrigin: "540 1040" }, { opacity: 1, scale: 1, svgOrigin: "540 1040", duration: 0.22, ease: "back.out(3)", immediateRender: false }, PRECIO - 0.1);
      // "Pagué": botón
      gsap.set(q(".s08-boton"), { opacity: 0 });
      gsap.set(q(".s08-b2"), { opacity: 0 });
      tl.fromTo(q(".s08-boton"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PAGUE - 0.2);
      tl.to(q(".s08-boton"), { scale: 0.9, duration: 0.08, yoyo: true, repeat: 1 }, PAGO - 0.25);
      tl.to(q(".s08-b1"), { opacity: 0, duration: 0.08 }, PAGO - 0.1);
      tl.to(q(".s08-b2"), { opacity: 1, duration: 0.12 }, PAGO - 0.05);
      tl.to(q(".s08-boton"), { backgroundColor: "#ffc857", duration: 0.15 }, PAGO - 0.05);
      // "sillón": el celular se va
      tl.to(q(".s08-cel"), { scale: 0.5, y: -200, x: -260, rotation: -10, opacity: 0, duration: 0.5, ease: "power2.in" }, SILLON + 0.2);
      // "Y al otro día": la camioneta llega a la casa
      gsap.set(q(".s08-envio"), { opacity: 0 });
      tl.set(q(".s08-envio"), { opacity: 1 }, Y - 0.3);
      tl.fromTo(q(".s08-casa"), { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, Y - 0.3);
      tl.fromTo(q(".s08-camioneta"), { x: -600 }, { x: 0, duration: 0.8, ease: "power3.out" }, Y);
      tl.to(q(".s08-camioneta"), { y: -6, duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, Y);
      gsap.set(q(".s08-caja"), { opacity: 0 });
      tl.fromTo(q(".s08-caja"), { opacity: 1, x: -300, y: -160, rotation: -30, svgOrigin: "615 1394" }, { opacity: 1, x: 0, y: 0, rotation: 0, svgOrigin: "615 1394", duration: 0.4, ease: "bounce.out", immediateRender: false }, CASA - 0.3);
      tl.to(q(".s08-camioneta"), { x: -60, duration: 0.15, yoyo: true, repeat: 1 }, DAC);
      // "pijama": ella sale, feliz
      gsap.set(q(".s08-cli"), { opacity: 0 });
      tl.fromTo(q(".s08-cli"), { opacity: 0, y: 80, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "50% 100%", immediateRender: false }, PIJAMA - 0.7);
      tl.to(q(".s08-c-bi"), { rotation: 130, svgOrigin: "-84 -168", duration: 0.25, ease: "back.out(2)" }, PIJAMA - 0.4);
      tl.to(q(".s08-c-bd"), { rotation: -130, svgOrigin: "84 -168", duration: 0.25, ease: "back.out(2)" }, PIJAMA - 0.4);
      tl.set(q(".s08-c-boca"), { attr: { d: "M-24 -248 Q0 -214 24 -248" } }, PIJAMA - 0.6);
      golpe(q(".s08-pijama"), PIJAMA, -4);
      ["s08-k1", "s08-k2"].forEach((k, i) => { pop(q("." + k), PIJAMA + 0.1 + i * 0.12); tl.to(q("." + k), { y: -40, duration: 0.5, ease: "sine.out" }, PIJAMA + 0.3 + i * 0.12); });

      tl.to(q("#s08-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
