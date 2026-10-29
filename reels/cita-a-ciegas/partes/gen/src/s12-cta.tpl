<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s12-cta"] .s12-capa { position: absolute; inset: 0; }
    [data-composition-id="s12-cta"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s12-cta"] .s12-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s12-cta"] .s12-loc { position: absolute; left: 640px; top: 900px; width: 330px; height: 427px; }
    [data-composition-id="s12-cta"] .s12-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s12-cta"] .s12-burbuja { position: absolute; left: 170px; top: 818px; width: 740px; text-align: center; white-space: nowrap; padding: 16px 20px; background: #fff3e0; border: 6px solid #120a22; border-radius: 34px 34px 34px 8px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 42px; line-height: 1.08; color: #120a22; }
    [data-composition-id="s12-cta"] .s12-burbuja b { color: #ff6f59; font-weight: 900; }
    [data-composition-id="s12-cta"] .s12-reservado { position: absolute; left: 290px; top: 1190px; width: 170px; height: 64px; background: #fff3e0; border: 5px solid #120a22; border-radius: 8px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 44px; line-height: 54px; color: #ff6f59; }
  </style>
  <div id="root" data-composition-id="s12-cta" data-width="1080" data-height="1920" data-duration="7.28">
    <div id="s12-escena" class="s12-capa clip" data-start="0" data-duration="7.28" data-track-index="0">
      <div class="s12-capa s12-set">
        <svg class="s12-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <ellipse class="s12-halo" cx="540" cy="1150" rx="230" ry="160" fill="#ffc857" opacity="0.06" />
          <!-- la silla vacía: tu lugar -->
          <g class="s12-silla">
            <path d="M170 1000 Q170 950 220 950 H360 Q410 950 410 1000 V1260 H170 Z" fill="#3b1d5a" stroke="#fff3e0" stroke-width="6" stroke-linejoin="round" />
            <path d="M210 1000 V1240 M290 1000 V1240 M370 1000 V1240" stroke="#241238" stroke-width="10" />
          </g>
        </svg>
        <div class="s12-loc"><!--@LOCAL s12-l--></div>
        <svg class="s12-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- ramo de flores -->
          <g class="s12-ramo">
            <path d="M720 1250 L770 1120 M760 1250 L800 1110 M800 1250 L840 1130" stroke="#22d1c3" stroke-width="8" stroke-linecap="round" />
            <circle cx="770" cy="1110" r="26" fill="#ff6f59" stroke="#120a22" stroke-width="5" /><circle cx="770" cy="1110" r="9" fill="#ffc857" />
            <circle cx="805" cy="1090" r="26" fill="#ffc857" stroke="#120a22" stroke-width="5" /><circle cx="805" cy="1090" r="9" fill="#ff6f59" />
            <circle cx="842" cy="1118" r="26" fill="#ff6f59" stroke="#120a22" stroke-width="5" /><circle cx="842" cy="1118" r="9" fill="#ffc857" />
            <path d="M740 1200 L860 1180 L830 1260 L760 1260 Z" fill="#fff3e0" stroke="#120a22" stroke-width="5" stroke-linejoin="round" />
          </g>
          <!-- la mesa -->
          <g class="s12-mesa">
            <path d="M232 1250 H848 L878 1470 H202 Z" fill="#fff3e0" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <path d="M232 1250 H848 L852 1280 H228 Z" fill="#22d1c3" />
            <path d="M260 1330 H820 M250 1400 H830" stroke="#22d1c3" stroke-width="6" opacity="0.5" />
            <path d="M232 1250 H848 L878 1470 H202 Z" fill="none" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <path d="M652 1168 H708 Q708 1212 680 1214 Q652 1212 652 1168 Z M680 1214 V1246 M664 1248 H696" fill="none" stroke="#22d1c3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="522" y="1150" width="36" height="100" rx="6" fill="#fff3e0" stroke="#120a22" stroke-width="5" />
            <path d="M540 1150 V1136" stroke="#120a22" stroke-width="4" />
            <path class="s12-llama" d="M540 1080 C556 1100 562 1118 554 1130 C548 1140 532 1140 526 1130 C518 1116 526 1100 540 1080 Z" fill="#ffc857" stroke="#120a22" stroke-width="4" />
          </g>
        </svg>
        <div class="s12-reservado">reservado</div>
      </div>
      <!--@LETRERO s12 600 ¿SEGUNDA <span style="color:#ff6f59">CITA</span>?-->
      <div class="s12-burbuja">Contanos en los <b>comentarios</b></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s12-cta";
      const DUR = 7.28;
      //@HELPERS

      const VOS = 0.0, SEGUNDA = 1.22, CITA = 1.4, CONTANOS = 2.51;
      tl.fromTo(q(".s12-set"), { scale: 1.06, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", transformOrigin: "50% 65%" }, 0);
      tl.to(q(".s12-llama"), { scaleY: 0.85, scaleX: 1.1, svgOrigin: "540 1136", duration: 0.13, yoyo: true, repeat: Math.max(1, Math.floor(DUR / 0.13) - 2), ease: "sine.inOut" }, 0);
      tl.to(q(".s12-halo"), { opacity: 0.12, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor(DUR / 0.3) - 2), ease: "sine.inOut" }, 0);
      parpadeo(q(".s12-l-ojos"), [1.0, 3.6, 5.8]);
      tl.to(q(".s12-ramo"), { rotation: -5, svgOrigin: "790 1260", duration: 0.5, yoyo: true, repeat: 12, ease: "sine.inOut" }, 0.2);
      // "Y vos": la silla vacía se ilumina
      tl.fromTo(q(".s12-silla"), { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, VOS + 0.2);
      tl.fromTo(q(".s12-silla"), { scale: 1 }, { scale: 1.05, svgOrigin: "290 1260", duration: 0.2, yoyo: true, repeat: 1 }, VOS + 0.3);
      pop(q(".s12-reservado"), VOS + 0.35);
      tl.to(q(".s12-reservado"), { rotation: -6, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.8);
      // "segunda cita": el letrero
      const letrero = [q(".s12-letrero-svg"), q(".s12-letrero-txt")];
      gsap.set(letrero, { opacity: 0 });
      tl.fromTo(letrero, { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)", immediateRender: false }, SEGUNDA - 0.3);
      tl.fromTo(q(".s12-letrero-txt"), { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1 }, CITA);
      const b = [...qa(".s12-bomb")];
      tl.to(b.filter((x, i) => i % 4 < 2), { opacity: 0.25, duration: 0.05, yoyo: true, repeat: 17, repeatDelay: 0.25 }, SEGUNDA);
      tl.to(b.filter((x, i) => i % 4 >= 2), { opacity: 0.25, duration: 0.05, yoyo: true, repeat: 17, repeatDelay: 0.25 }, SEGUNDA + 0.15);
      tl.fromTo(q(".s12-l-mono"), { rotation: 0, svgOrigin: "-44 -112" }, { rotation: 15, svgOrigin: "-44 -112", duration: 0.12, yoyo: true, repeat: 5 }, CITA);
      // "Contanos": la burbuja
      pop(q(".s12-burbuja"), CONTANOS - 0.1, 0.35);
      tl.to(q(".s12-burbuja"), { y: -10, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut" }, CONTANOS + 0.4);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
