<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s07-cero"] .s07-capa { position: absolute; inset: 0; }
    [data-composition-id="s07-cero"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s07-cero"] .s07-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s07-cero"] .s07-cero { position: absolute; left: 0; right: 0; top: 1130px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 300px; line-height: 1; color: #ff6f59; -webkit-text-stroke: 14px #120a22; paint-order: stroke fill; text-shadow: 0 0 40px rgba(255, 111, 89, 0.55); }
    [data-composition-id="s07-cero"] .s07-incog { position: absolute; left: 0; right: 0; top: 900px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 400px; line-height: 1; color: #22d1c3; -webkit-text-stroke: 14px #120a22; paint-order: stroke fill; }
    [data-composition-id="s07-cero"] .s07-otro { position: absolute; left: 370px; top: 930px; width: 340px; height: 440px; }
    [data-composition-id="s07-cero"] .s07-otro svg { left: 0; top: 0; width: 100%; height: 100%; }
  </style>
  <div id="root" data-composition-id="s07-cero" data-width="1080" data-height="1920" data-duration="6.77">
    <div id="s07-escena" class="s07-capa clip" data-start="0" data-duration="6.77" data-track-index="0">
      <div class="s07-capa s07-set">
        <div class="s07-capa s07-uno">
          <svg class="s07-full" viewBox="0 0 1080 1920" aria-hidden="true">
            <!--@MEDIDOR s07-->
            <g class="s07-humo">
              <circle cx="300" cy="900" r="40" fill="#fff3e0" opacity="0.5" /><circle cx="250" cy="840" r="30" fill="#fff3e0" opacity="0.4" /><circle cx="330" cy="800" r="24" fill="#fff3e0" opacity="0.35" />
            </g>
          </svg>
          <div class="s07-cero">0</div>
        </div>
        <div class="s07-capa s07-dos">
          <!--@LETRERO s07 620 ¿SEGUNDA <span style="color:#22d1c3">CITA</span>?-->
          <div class="s07-incog">?</div>
          <div class="s07-otro"><!--@OTRO s07-o--></div>
          <svg class="s07-full" viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s07-brillos" fill="none" stroke="#ffc857" stroke-width="8" stroke-linecap="round">
              <path d="M300 960 L270 930 M290 1040 H250 M310 1110 L280 1140" />
              <path d="M780 960 L810 930 M790 1040 H830 M770 1110 L800 1140" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s07-cero";
      const DUR = 6.77;
      //@HELPERS

      const CERO = 0.98, PERO = 2.06, SEGUNDA = 3.39, OTRO = 5.05;
      const ag = q(".s07-aguja");
      tl.fromTo(q(".s07-med"), { opacity: 0.6, scale: 0.85, svgOrigin: "540 1090" }, { opacity: 1, scale: 1, svgOrigin: "540 1090", duration: 0.35, ease: "back.out(1.8)" }, 0);
      tl.fromTo(ag, { rotation: -20, svgOrigin: "540 1090" }, { rotation: -55, svgOrigin: "540 1090", duration: 0.7, ease: "power2.inOut" }, 0.1);
      tl.to(ag, { rotation: -45, svgOrigin: "540 1090", duration: 0.12, yoyo: true, repeat: 1 }, 0.8);
      // "cero": se desploma
      tl.to(ag, { rotation: -90, svgOrigin: "540 1090", duration: 0.3, ease: "bounce.out" }, CERO - 0.05);
      golpe(q(".s07-cero"), CERO, 0);
      sacudon(q(".s07-set"), CERO + 0.03, 2);
      gsap.set(q(".s07-humo"), { opacity: 0 });
      tl.fromTo(q(".s07-humo"), { opacity: 0, y: 30 }, { opacity: 1, y: -60, duration: 1, ease: "power1.out", immediateRender: false }, CERO + 0.1);
      tl.to(q(".s07-humo"), { opacity: 0, duration: 0.3 }, CERO + 1.0);
      tl.to(q(".s07-cero"), { rotation: -6, duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut" }, CERO + 0.3);
      // "Pero ella...": el medidor se va
      tl.to(q(".s07-uno"), { y: 700, opacity: 0, duration: 0.45, ease: "power2.in" }, PERO + 0.6);
      // "segunda cita": el letrero
      gsap.set(q(".s07-dos"), { opacity: 0 });
      tl.set(q(".s07-dos"), { opacity: 1 }, SEGUNDA - 0.4);
      const letrero = [q(".s07-letrero-svg"), q(".s07-letrero-txt")];
      tl.fromTo(letrero, { opacity: 0, y: -300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)", immediateRender: false }, SEGUNDA - 0.4);
      const b = [...qa(".s07-bomb")];
      tl.to(b.filter((x, i) => i % 4 < 2), { opacity: 0.25, duration: 0.05, yoyo: true, repeat: 11, repeatDelay: 0.2 }, SEGUNDA);
      tl.fromTo(q(".s07-letrero-txt"), { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1 }, SEGUNDA);
      // un "?" turquesa que espera
      gsap.set(q(".s07-incog"), { opacity: 0 });
      tl.fromTo(q(".s07-incog"), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, SEGUNDA + 0.2);
      tl.to(q(".s07-incog"), { rotation: 10, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, SEGUNDA + 0.5);
      tl.to(q(".s07-incog"), { opacity: 0, scale: 1.6, duration: 0.2, ease: "power2.in" }, OTRO - 0.35);
      // "otro local": entra deslizándose
      gsap.set(q(".s07-otro"), { opacity: 0 });
      tl.fromTo(q(".s07-otro"), { opacity: 1, x: 700, rotation: 8 }, { opacity: 1, x: 0, rotation: 0, duration: 0.45, ease: "back.out(1.4)", transformOrigin: "50% 100%", immediateRender: false }, OTRO - 0.3);
      gsap.set(q(".s07-brillos"), { opacity: 0 });
      tl.to(q(".s07-brillos"), { opacity: 1, duration: 0.08, yoyo: true, repeat: 5 }, OTRO + 0.25);
      tl.fromTo(q(".s07-o-mono"), { rotation: 0, svgOrigin: "-44 -112" }, { rotation: 15, svgOrigin: "-44 -112", duration: 0.12, yoyo: true, repeat: 5 }, OTRO + 0.3);
      parpadeo(q(".s07-o-ojos"), [OTRO + 0.9]);

      tl.to(q("#s07-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
