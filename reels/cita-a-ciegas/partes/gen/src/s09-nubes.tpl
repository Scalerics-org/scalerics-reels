<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s09-nubes"] .s09-capa { position: absolute; inset: 0; }
    [data-composition-id="s09-nubes"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s09-nubes"] .s09-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s09-nubes"] .s09-grande { position: absolute; left: 0; right: 0; top: 1180px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 104px; line-height: 1; color: #22d1c3; -webkit-text-stroke: 10px #120a22; paint-order: stroke fill; text-shadow: 0 0 34px rgba(34, 209, 195, 0.55); white-space: nowrap; }
    [data-composition-id="s09-nubes"] .s09-pol { position: absolute; top: 700px; width: 380px; height: 520px; background: #fff3e0; border: 6px solid #120a22; border-radius: 10px; }
    [data-composition-id="s09-nubes"] .s09-pol-a { left: 90px; }
    [data-composition-id="s09-nubes"] .s09-pol-b { left: 610px; }
    [data-composition-id="s09-nubes"] .s09-pol-in { position: absolute; left: 20px; top: 20px; width: 328px; height: 380px; }
    [data-composition-id="s09-nubes"] .s09-pol-a .s09-pol-in { background: #ff6f59; }
    [data-composition-id="s09-nubes"] .s09-pol-b .s09-pol-in { background: #22d1c3; }
    [data-composition-id="s09-nubes"] .s09-pol-in svg { left: 24px; top: 30px; width: 280px; height: 362px; }
    [data-composition-id="s09-nubes"] .s09-pol-txt { position: absolute; left: 0; right: 0; top: 412px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 62px; line-height: 1; color: #120a22; }
    [data-composition-id="s09-nubes"] .s09-vs { position: absolute; left: 460px; top: 880px; width: 160px; height: 160px; border-radius: 50%; background: #ffc857; border: 8px solid #120a22; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 70px; line-height: 144px; color: #120a22; }
    [data-composition-id="s09-nubes"] .s09-oscuro { position: absolute; inset: 0; background: radial-gradient(ellipse 520px 700px at 540px 1000px, rgba(18, 10, 34, 0) 0%, rgba(18, 10, 34, 0.75) 100%); }
  </style>
  <div id="root" data-composition-id="s09-nubes" data-width="1080" data-height="1920" data-duration="4.87">
    <div id="s09-escena" class="s09-capa clip" data-start="0" data-duration="4.87" data-track-index="0">
      <div class="s09-capa s09-uno">
        <svg class="s09-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-nube-i"><circle cx="110" cy="1110" r="70" fill="#fff3e0" /><circle cx="200" cy="1080" r="90" fill="#fff3e0" /><circle cx="300" cy="1120" r="60" fill="#fff3e0" /><rect x="60" y="1110" width="280" height="70" rx="35" fill="#fff3e0" /></g>
          <g class="s09-nube-d"><circle cx="780" cy="1120" r="60" fill="#fff3e0" /><circle cx="880" cy="1080" r="90" fill="#fff3e0" /><circle cx="970" cy="1110" r="70" fill="#fff3e0" /><rect x="740" y="1110" width="280" height="70" rx="35" fill="#fff3e0" /></g>
          <!--@MEDIDOR s09-->
          <!--@CORAZON s09-kk 250 800 30 #ff6f59-->
          <!--@CORAZON s09-kk 830 790 30 #ff6f59-->
          <!--@CORAZON s09-kk 180 1000 30 #ff6f59-->
          <!--@CORAZON s09-kk 900 1010 30 #ff6f59-->
          <!--@CORAZON s09-kk 330 660 30 #ff6f59-->
          <!--@CORAZON s09-kk 750 650 30 #ff6f59-->
          <!--@CORAZON s09-kk 540 620 30 #ff6f59-->
          <!--@CORAZON s09-kk 150 1180 30 #ff6f59-->
          <!--@CORAZON s09-kk 930 1190 30 #ff6f59-->
        </svg>
        <div class="s09-grande">¡POR LAS NUBES!</div>
      </div>
      <div class="s09-capa s09-dos">
        <div class="s09-oscuro"></div>
        <div class="s09-pol s09-pol-a"><div class="s09-pol-in"><!--@LOCAL s09-l--></div><div class="s09-pol-txt">el de siempre</div></div>
        <div class="s09-pol s09-pol-b"><div class="s09-pol-in"><!--@OTRO s09-o--></div><div class="s09-pol-txt">el nuevo</div></div>
        <div class="s09-vs">VS</div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s09-nubes";
      const DUR = 4.87;
      //@HELPERS

      const NUBES = 1.02, ENTONCES = 1.58, NUEVO = 3.89;
      const ag = q(".s09-aguja");
      tl.fromTo(q(".s09-med"), { scale: 0.85, opacity: 0.6, svgOrigin: "540 1090" }, { scale: 1, opacity: 1, svgOrigin: "540 1090", duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(ag, { rotation: 20, svgOrigin: "540 1090" }, { rotation: 90, svgOrigin: "540 1090", duration: 0.4, ease: "back.out(2)" }, 0.05);
      tl.to(ag, { rotation: 82, svgOrigin: "540 1090", duration: 0.06, yoyo: true, repeat: 11, ease: "none" }, 0.45);
      sacudon(q(".s09-uno"), 0.45, 1.2);
      // corazones que salen disparados
      const ks = [...qa(".s09-kk")];
      gsap.set(ks, { opacity: 0 });
      ks.forEach((k, i) => {
        tl.fromTo(k, { opacity: 0, scale: 0.2, x: (540 - [250, 830, 180, 900, 330, 750, 540, 150, 930][i]) * 0.8, y: 260 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, 0.2 + i * 0.04);
        tl.to(k, { y: -30, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.7 + i * 0.04);
      });
      // "nubes"
      tl.fromTo([q(".s09-nube-i"), q(".s09-nube-d")], { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, NUBES - 0.2);
      golpe(q(".s09-grande"), NUBES, -3);
      // "Entonces": suspenso, cara a cara
      tl.to(q(".s09-uno"), { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in", transformOrigin: "50% 55%" }, ENTONCES + 0.3);
      gsap.set(q(".s09-dos"), { opacity: 0 });
      tl.to(q(".s09-dos"), { opacity: 1, duration: 0.2 }, ENTONCES + 0.45);
      tl.fromTo(q(".s09-pol-a"), { x: -500, rotation: -20 }, { x: 0, rotation: -6, duration: 0.4, ease: "back.out(1.4)" }, ENTONCES + 0.45);
      tl.fromTo(q(".s09-pol-b"), { x: 500, rotation: 20 }, { x: 0, rotation: 6, duration: 0.4, ease: "back.out(1.4)" }, ENTONCES + 0.55);
      gsap.set(q(".s09-vs"), { opacity: 0 });
      tl.fromTo(q(".s09-vs"), { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in", immediateRender: false }, ENTONCES + 0.85);
      tl.to(q(".s09-vs"), { rotation: 8, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, ENTONCES + 1.0);
      tl.to([q(".s09-pol-a"), q(".s09-pol-b")], { y: -10, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, ENTONCES + 0.7);
      // "nuevo": se ilumina el nuevo
      tl.to(q(".s09-pol-b"), { scale: 1.1, rotation: 2, duration: 0.25, ease: "back.out(2)" }, NUEVO - 0.1);
      tl.to(q(".s09-pol-b"), { boxShadow: "0 0 50px rgba(34, 209, 195, 0.8)", duration: 0.25 }, NUEVO - 0.1);
      tl.to(q(".s09-pol-a"), { opacity: 0.45, scale: 0.92, duration: 0.25 }, NUEVO - 0.1);

      tl.to(q("#s09-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
