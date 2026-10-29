<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s05-foto"] .s05-capa { position: absolute; inset: 0; }
    [data-composition-id="s05-foto"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s05-foto"] .s05-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s05-foto"] .s05-burbuja { position: absolute; left: 440px; top: 760px; padding: 18px 28px; background: #22d1c3; border: 5px solid #120a22; border-radius: 30px 30px 6px 30px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; line-height: 1; color: #120a22; white-space: nowrap; }
    [data-composition-id="s05-foto"] .s05-foto { position: absolute; left: 345px; top: 880px; width: 390px; height: 400px; background: #fff3e0; border: 5px solid #120a22; border-radius: 22px 22px 22px 6px; overflow: hidden; }
    [data-composition-id="s05-foto"] .s05-img { position: absolute; left: 14px; top: 14px; width: 352px; height: 362px; filter: blur(6px); }
    [data-composition-id="s05-foto"] .s05-img svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s05-foto"] .s05-grande { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 116px; line-height: 1; letter-spacing: -0.01em; color: #ff6f59; white-space: nowrap; -webkit-text-stroke: 10px #120a22; paint-order: stroke fill; text-shadow: 0 0 30px rgba(255, 111, 89, 0.5); }
    [data-composition-id="s05-foto"] .s05-nombre { font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; fill: #fff3e0; }
  </style>
  <div id="root" data-composition-id="s05-foto" data-width="1080" data-height="1920" data-duration="3.98">
    <div id="s05-escena" class="s05-capa clip" data-start="0" data-duration="3.98" data-track-index="0">
      <div class="s05-capa s05-set">
        <svg class="s05-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="300" y="590" width="480" height="860" rx="56" fill="#241238" stroke="#fff3e0" stroke-width="7" />
          <rect x="300" y="590" width="480" height="120" rx="56" fill="#3b1d5a" />
          <rect x="300" y="660" width="480" height="50" fill="#3b1d5a" />
          <rect x="490" y="612" width="100" height="12" rx="6" fill="#120a22" />
          <circle cx="368" cy="668" r="24" fill="#ff6f59" stroke="#120a22" stroke-width="4" />
          <text class="s05-nombre" x="408" y="680">Tu local</text>
          <rect x="300" y="590" width="480" height="860" rx="56" fill="none" stroke="#fff3e0" stroke-width="7" />
        </svg>
        <div class="s05-burbuja">¿qué tenés?</div>
        <div class="s05-foto">
          <div class="s05-img">
            <svg viewBox="0 0 352 362" aria-hidden="true">
              <rect width="352" height="362" fill="#3b1d5a" />
              <path d="M30 40 V340 M322 40 V340 M30 120 H322 M30 210 H322 M30 300 H322" stroke="#fff3e0" stroke-width="10" />
              <rect x="50" y="70" width="40" height="50" fill="#ff6f59" /><rect x="100" y="80" width="50" height="40" fill="#ffc857" /><rect x="170" y="60" width="36" height="60" fill="#22d1c3" /><rect x="230" y="76" width="60" height="44" fill="#ff6f59" />
              <rect x="56" y="160" width="60" height="50" fill="#22d1c3" /><rect x="140" y="170" width="40" height="40" fill="#fff3e0" /><rect x="200" y="150" width="50" height="60" fill="#ffc857" /><rect x="262" y="166" width="40" height="44" fill="#ff6f59" />
              <rect x="50" y="250" width="70" height="50" fill="#ffc857" /><rect x="150" y="240" width="40" height="60" fill="#ff6f59" /><rect x="220" y="256" width="70" height="44" fill="#22d1c3" />
            </svg>
          </div>
        </div>
      </div>
      <div class="s05-grande">FOTO BORROSA</div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s05-foto";
      const DUR = 3.98;
      //@HELPERS

      const VER = 0.36, MANDO = 1.54, BORROSA = 2.27, ESTANTERIA = 2.9;
      tl.fromTo(q(".s05-set"), { y: 120, opacity: 0.5, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out", transformOrigin: "50% 60%" }, 0);
      pop(q(".s05-burbuja"), VER);
      gsap.set(q(".s05-foto"), { opacity: 0 });
      tl.fromTo(q(".s05-foto"), { opacity: 0, y: 40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, MANDO);
      tl.fromTo(q(".s05-img"), { opacity: 0.2 }, { opacity: 1, duration: 0.5 }, MANDO + 0.1);
      // "borrosa": más borrosa todavía y se mueve
      tl.to(q(".s05-img"), { filter: "blur(16px)", duration: 0.35, ease: "power2.out" }, BORROSA);
      tl.to(q(".s05-img"), { x: 10, duration: 0.06, yoyo: true, repeat: 9, ease: "none" }, BORROSA);
      tl.to(q(".s05-set"), { scale: 1.1, transformOrigin: "50% 58%", duration: 0.6, ease: "power2.out" }, BORROSA);
      // "estantería": cae el rótulo y la foto se tuerce
      golpe(q(".s05-grande"), ESTANTERIA, -4);
      tl.to(q(".s05-foto"), { rotation: 6, duration: 0.2, ease: "back.out(3)" }, ESTANTERIA);
      sacudon(q(".s05-set"), ESTANTERIA + 0.03, 1.2);
      tl.to(q(".s05-grande"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, ESTANTERIA + 0.3);

      tl.to(q("#s05-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
