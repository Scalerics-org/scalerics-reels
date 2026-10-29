<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s03-tarjeta"] .s03-capa { position: absolute; inset: 0; }
    [data-composition-id="s03-tarjeta"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s03-tarjeta"] .s03-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s03-tarjeta"] .s03-loc { position: absolute; left: 590px; top: 900px; width: 340px; height: 440px; }
    [data-composition-id="s03-tarjeta"] .s03-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s03-tarjeta"] .s03-cartel { position: absolute; left: 540px; top: 606px; width: 380px; height: 300px; }
    [data-composition-id="s03-tarjeta"] .s03-hilo { position: absolute; left: 0; top: 0; width: 380px; height: 300px; }
    [data-composition-id="s03-tarjeta"] .s03-carton { position: absolute; left: 20px; top: 104px; width: 340px; height: 150px; background: #fff3e0; border: 6px solid #120a22; border-radius: 10px; text-align: center; }
    [data-composition-id="s03-tarjeta"] .s03-carton div { font-family: "Caveat", cursive; font-weight: 700; font-size: 64px; line-height: 0.95; color: #120a22; padding-top: 10px; }
    [data-composition-id="s03-tarjeta"] .s03-carton b { color: #ff6f59; font-weight: 700; }
    [data-composition-id="s03-tarjeta"] .s03-rotulo { position: absolute; left: 150px; top: 1380px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; color: #120a22; }
  </style>
  <div id="root" data-composition-id="s03-tarjeta" data-width="1080" data-height="1920" data-duration="4.05">
    <div id="s03-escena" class="s03-capa clip" data-start="0" data-duration="4.05" data-track-index="0">
      <div class="s03-capa s03-set">
        <svg class="s03-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- foto de recuerdo de la cita -->
          <rect x="110" y="600" width="860" height="840" rx="10" fill="#fff3e0" stroke="#120a22" stroke-width="6" />
          <rect x="140" y="630" width="800" height="730" fill="#241238" />
          <ellipse cx="760" cy="1250" rx="260" ry="60" fill="#3b1d5a" />
        </svg>
        <div class="s03-loc"><!--@LOCAL s03-l--></div>
        <svg class="s03-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- el brazo de ella con la tarjeta -->
          <g class="s03-mano">
            <path d="M60 1210 Q260 1180 430 1130" fill="none" stroke="#120a22" stroke-width="56" stroke-linecap="round" />
            <path d="M60 1210 Q260 1180 430 1130" fill="none" stroke="#fff3e0" stroke-width="40" stroke-linecap="round" />
            <path d="M60 1222 Q200 1200 300 1180" fill="none" stroke="#ff6f59" stroke-width="44" stroke-linecap="round" />
            <g class="s03-tarjeta">
              <rect x="392" y="1010" width="210" height="134" rx="16" fill="#fff3e0" stroke="#120a22" stroke-width="6" />
              <rect x="392" y="1034" width="210" height="26" fill="#ff6f59" />
              <rect x="418" y="1078" width="44" height="34" rx="6" fill="#ffc857" stroke="#120a22" stroke-width="4" />
              <path d="M480 1118 H580" stroke="#120a22" stroke-width="6" stroke-linecap="round" opacity="0.5" />
              <rect x="392" y="1010" width="210" height="134" rx="16" fill="none" stroke="#120a22" stroke-width="6" />
            </g>
            <circle cx="436" cy="1128" r="30" fill="#fff3e0" stroke="#120a22" stroke-width="6" />
            <path class="s03-brillo" d="M620 1000 L640 980 M630 1060 H660 M600 980 V952" fill="none" stroke="#ffc857" stroke-width="7" stroke-linecap="round" />
          </g>
          <path class="s03-x1" d="M380 1000 L620 1160" fill="none" stroke="#ff6f59" stroke-width="20" stroke-linecap="round" />
          <path class="s03-x2" d="M620 1000 L380 1160" fill="none" stroke="#ff6f59" stroke-width="20" stroke-linecap="round" />
        </svg>
        <div class="s03-cartel">
          <svg class="s03-hilo" viewBox="0 0 380 300" aria-hidden="true">
            <path d="M190 0 L60 116 M190 0 L320 116" fill="none" stroke="#fff3e0" stroke-width="4" />
            <circle cx="190" cy="4" r="8" fill="#ffc857" />
          </svg>
          <div class="s03-carton"><div>SOLO<br /><b>EFECTIVO</b></div></div>
        </div>
      </div>
      <div class="s03-rotulo">LA CITA · PRIMER INTENTO</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s03-tarjeta";
      const DUR = 4.05;
      //@HELPERS

      const PREGUNTE = 0.07, TARJETA = 1.25, SOLO = 2.04, EFECTIVO = 2.53;
      tl.fromTo(q(".s03-set"), { rotation: -4, scale: 1.08, opacity: 0.5 }, { rotation: -1.5, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out", transformOrigin: "50% 55%" }, 0);
      tl.to(q(".s03-set"), { rotation: 0, duration: DUR - 0.35, ease: "none", transformOrigin: "50% 55%" }, 0.35);
      tl.fromTo(q(".s03-rotulo"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
      // la mano entra con la tarjeta
      tl.fromTo(q(".s03-mano"), { x: -420 }, { x: 0, duration: 0.5, ease: "back.out(1.4)" }, PREGUNTE);
      parpadeo(q(".s03-l-ojos"), [0.9, 3.4]);
      // "tarjeta": brilla
      gsap.set(q(".s03-brillo"), { opacity: 0 });
      tl.to(q(".s03-brillo"), { opacity: 1, duration: 0.1 }, TARJETA);
      tl.fromTo(q(".s03-tarjeta"), { scale: 1, svgOrigin: "497 1077" }, { scale: 1.15, svgOrigin: "497 1077", duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, TARJETA);
      tl.to(q(".s03-brillo"), { opacity: 0, duration: 0.15 }, SOLO);
      // "solo efectivo": cae el cartelito y se hamaca
      gsap.set(q(".s03-cartel"), { opacity: 0 });
      tl.fromTo(q(".s03-cartel"), { opacity: 1, y: -500, rotation: 0 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.in", immediateRender: false }, SOLO - 0.22);
      tl.to(q(".s03-cartel"), { rotation: 9, transformOrigin: "50% 0%", duration: 0.22, ease: "sine.out" }, SOLO);
      [[-7, 0.4], [5, 0.38], [-3, 0.36], [2, 0.34], [0, 0.3]].reduce((t, [r, d]) => { tl.to(q(".s03-cartel"), { rotation: r, transformOrigin: "50% 0%", duration: d, ease: "sine.inOut" }, t); return t + d; }, SOLO + 0.22);
      sacudon(q(".s03-set"), SOLO, 1);
      tl.to(q(".s03-l-boca"), { attr: { d: "M-64 -170 L-24 -170" }, duration: 0.15 }, SOLO);
      // "efectivo": la tarjeta tachada, la mano se va
      dibujar(q(".s03-x1"), EFECTIVO - 0.05, 0.15);
      dibujar(q(".s03-x2"), EFECTIVO + 0.1, 0.15);
      tl.to(q(".s03-tarjeta"), { rotation: -25, y: 120, opacity: 0.5, svgOrigin: "497 1077", duration: 0.5, ease: "power2.in" }, EFECTIVO + 0.35);
      tl.to(q(".s03-mano"), { x: -160, duration: 0.6, ease: "power2.inOut" }, EFECTIVO + 0.5);

      tl.to(q("#s03-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
