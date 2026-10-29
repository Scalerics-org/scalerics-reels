<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s04-lunes"] .s04-capa { position: absolute; inset: 0; }
    [data-composition-id="s04-lunes"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s04-lunes"] .s04-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s04-lunes"] .s04-loc { position: absolute; left: 70px; top: 1000px; width: 320px; height: 414px; }
    [data-composition-id="s04-lunes"] .s04-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s04-lunes"] .s04-cal { position: absolute; left: 300px; top: 590px; width: 480px; height: 330px; background: #fff3e0; border: 7px solid #120a22; border-radius: 18px; overflow: hidden; }
    [data-composition-id="s04-lunes"] .s04-cal-top { position: absolute; left: 0; right: 0; top: 0; height: 84px; background: #ff6f59; border-bottom: 7px solid #120a22; }
    [data-composition-id="s04-lunes"] .s04-aro { position: absolute; top: 22px; width: 26px; height: 26px; border-radius: 50%; background: #120a22; }
    [data-composition-id="s04-lunes"] .s04-cal-dia { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 112px; line-height: 1; letter-spacing: -0.01em; color: #120a22; }
    [data-composition-id="s04-lunes"] .s04-cal-nota { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 50px; line-height: 1; color: #fff3e0; }
  </style>
  <div id="root" data-composition-id="s04-lunes" data-width="1080" data-height="1920" data-duration="3.03">
    <div id="s04-escena" class="s04-capa clip" data-start="0" data-duration="3.03" data-track-index="0">
      <div class="s04-capa s04-set">
        <div class="s04-loc"><!--@LOCAL s04-l--></div>
        <svg class="s04-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- casita de ella -->
          <g class="s04-casa">
            <path d="M720 1180 L850 1060 L980 1180 Z" fill="#ff6f59" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <rect x="745" y="1180" width="210" height="230" fill="#fff3e0" stroke="#120a22" stroke-width="7" />
            <rect x="820" y="1280" width="60" height="130" rx="4" fill="#3b1d5a" stroke="#120a22" stroke-width="6" />
            <rect x="770" y="1206" width="44" height="44" fill="#22d1c3" stroke="#120a22" stroke-width="5" />
            <rect x="886" y="1206" width="44" height="44" fill="#22d1c3" stroke="#120a22" stroke-width="5" />
          </g>
          <!-- el camino del envío -->
          <path class="s04-camino" d="M400 1250 Q560 1010 760 1200" fill="none" stroke="#fff3e0" stroke-width="9" stroke-linecap="round" stroke-dasharray="4 26" />
          <path class="s04-corte" d="M535 1080 L615 1160 M615 1080 L535 1160" fill="none" stroke="#ff6f59" stroke-width="18" stroke-linecap="round" />
          <!-- la cajita del pedido -->
          <g class="s04-caja">
            <rect x="390" y="1300" width="120" height="100" rx="8" fill="#ffc857" stroke="#120a22" stroke-width="6" />
            <path d="M450 1300 V1400 M390 1340 H510" stroke="#ff6f59" stroke-width="10" />
            <path d="M450 1300 Q420 1270 430 1262 Q445 1258 450 1300 Q455 1258 470 1262 Q480 1270 450 1300" fill="#ff6f59" stroke="#120a22" stroke-width="4" />
          </g>
        </svg>
      </div>
      <div class="s04-cal">
        <div class="s04-cal-top"><div class="s04-aro" style="left: 80px"></div><div class="s04-aro" style="right: 80px"></div><div class="s04-cal-nota">pasá el</div></div>
        <div class="s04-cal-dia">LUNES</div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s04-lunes";
      const DUR = 3.03;
      //@HELPERS

      const MANDE = 0.66, CASA = 0.93, PASA = 1.6, LUNES = 2.02;
      tl.fromTo(q(".s04-loc"), { opacity: 0.5, x: -100 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s04-casa"), { opacity: 0.5, x: 120 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s04-caja"), { opacity: 0.5, scale: 0.6, svgOrigin: "450 1400" }, { opacity: 1, scale: 1, svgOrigin: "450 1400", duration: 0.3, ease: "back.out(2)" }, 0.1);
      tl.to(q(".s04-caja"), { y: -12, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      // "mande ... casa": el camino de puntitos va hacia la casa
      gsap.set(q(".s04-camino"), { opacity: 0 });
      tl.set(q(".s04-camino"), { opacity: 1 }, MANDE - 0.2);
      tl.fromTo(q(".s04-camino"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power2.inOut", immediateRender: false }, MANDE - 0.2);
      tl.to(q(".s04-caja"), { x: 110, y: -170, rotation: 8, svgOrigin: "450 1400", duration: 0.55, ease: "power2.out" }, MANDE);
      tl.to(q(".s04-casa"), { scale: 1.06, svgOrigin: "850 1410", duration: 0.12, yoyo: true, repeat: 1 }, CASA);
      // "pasá el lunes": se corta el camino, la caja vuelve
      dibujar(q(".s04-corte"), PASA - 0.05, 0.18);
      tl.to(q(".s04-camino"), { opacity: 0.3, duration: 0.15 }, PASA);
      tl.to(q(".s04-caja"), { x: 0, y: 0, rotation: -10, svgOrigin: "450 1400", duration: 0.35, ease: "bounce.out" }, PASA + 0.1);
      tl.to(q(".s04-l-boca"), { attr: { d: "M-64 -166 Q-44 -178 -24 -166" }, duration: 0.15 }, PASA);
      // el calendario cae
      gsap.set(q(".s04-cal"), { opacity: 0 });
      tl.fromTo(q(".s04-cal"), { opacity: 1, y: -700, rotation: 10 }, { opacity: 1, y: 0, rotation: -4, duration: 0.25, ease: "power3.in", immediateRender: false }, LUNES - 0.25);
      sacudon(q(".s04-set"), LUNES, 1.6);
      tl.to(q(".s04-cal"), { rotation: -1, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, LUNES + 0.1);

      tl.to(q("#s04-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
