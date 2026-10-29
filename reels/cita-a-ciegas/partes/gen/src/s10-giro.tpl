<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s10-giro"] .s10-capa { position: absolute; inset: 0; }
    [data-composition-id="s10-giro"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s10-giro"] .s10-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s10-giro"] .s10-cli { position: absolute; left: 365px; top: 880px; width: 350px; height: 492px; }
    [data-composition-id="s10-giro"] .s10-cli svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s10-giro"] .s10-penumbra { position: absolute; inset: 0; background: radial-gradient(ellipse 380px 520px at 540px 1100px, rgba(18, 10, 34, 0) 0%, rgba(18, 10, 34, 0.7) 100%); }
    [data-composition-id="s10-giro"] .s10-loc { position: absolute; left: 240px; top: 650px; width: 600px; height: 776px; }
    [data-composition-id="s10-giro"] .s10-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s10-giro"] .s10-estrella-txt { position: absolute; left: 190px; top: 722px; width: 220px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; line-height: 1.05; color: #120a22; }
    [data-composition-id="s10-giro"] .s10-cerrado { position: absolute; left: 590px; top: 900px; width: 220px; height: 170px; }
    [data-composition-id="s10-giro"] .s10-cerrado-carton { position: absolute; left: 0; top: 70px; width: 220px; height: 90px; background: #fff3e0; border: 6px solid #120a22; border-radius: 10px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 64px; line-height: 78px; color: #ff6f59; }
    [data-composition-id="s10-giro"] .s10-cerrado svg { left: 0; top: 0; width: 220px; height: 80px; }
  </style>
  <div id="root" data-composition-id="s10-giro" data-width="1080" data-height="1920" data-duration="9.71">
    <div id="s10-escena" class="s10-capa clip" data-start="0" data-duration="9.71" data-track-index="0">
      <div class="s10-capa s10-uno">
        <svg class="s10-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!--@CONFE s10 ELLA-->
        </svg>
        <div class="s10-cli"><!--@CLIENTA s10-c--></div>
        <div class="s10-penumbra"></div>
      </div>
      <div class="s10-capa s10-dos">
        <div class="s10-zoom s10-capa">
          <svg class="s10-full" viewBox="0 0 1080 1920" aria-hidden="true">
            <!-- la luz de adentro, detrás de la puerta -->
            <rect class="s10-luz" x="628" y="964" width="134" height="445" fill="#ffc857" />
          </svg>
          <div class="s10-loc"><!--@LOCAL s10-l--></div>
          <svg class="s10-full" viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s10-cosas">
              <circle cx="380" cy="1100" r="20" fill="#ffc857" /><rect x="420" y="1080" width="34" height="40" fill="#22d1c3" /><circle cx="490" cy="1100" r="18" fill="#ff6f59" /><rect x="525" y="1084" width="40" height="36" fill="#ffc857" />
            </g>
            <g class="s10-candado">
              <path d="M670 1170 V1140 A25 25 0 0 1 720 1140 V1170" fill="none" stroke="#fff3e0" stroke-width="12" />
              <rect x="655" y="1166" width="80" height="66" rx="10" fill="#ff6f59" stroke="#120a22" stroke-width="6" />
              <circle cx="695" cy="1196" r="9" fill="#120a22" />
            </g>
            <path class="s10-lagrima" d="M413 1062 C424 1080 428 1092 422 1100 C416 1108 404 1106 402 1096 C400 1088 406 1078 413 1062 Z" fill="#22d1c3" stroke="#120a22" stroke-width="4" />
            <g class="s10-estrella"><path d="M418.0 760.0 L396.1 779.1 L409.0 805.2 L381.5 814.4 L383.4 843.4 L354.4 841.5 L345.2 869.0 L319.1 856.1 L300.0 878.0 L280.9 856.1 L254.8 869.0 L245.6 841.5 L216.6 843.4 L218.5 814.4 L191.0 805.2 L203.9 779.1 L182.0 760.0 L203.9 740.9 L191.0 714.8 L218.5 705.6 L216.6 676.6 L245.6 678.5 L254.8 651.0 L280.9 663.9 L300.0 642.0 L319.1 663.9 L345.2 651.0 L354.4 678.5 L383.4 676.6 L381.5 705.6 L409.0 714.8 L396.1 740.9 Z" fill="#ffc857" stroke="#120a22" stroke-width="6" stroke-linejoin="round" /></g>
          </svg>
          <div class="s10-estrella-txt">LO MEJOR<br />DEL BARRIO</div>
          <div class="s10-cerrado">
            <svg viewBox="0 0 220 80" aria-hidden="true"><path d="M110 4 L30 74 M110 4 L190 74" stroke="#fff3e0" stroke-width="4" fill="none" /><circle cx="110" cy="6" r="7" fill="#ffc857" /></svg>
            <div class="s10-cerrado-carton">cerrado</div>
          </div>
          <svg class="s10-full" viewBox="0 0 1080 1920" aria-hidden="true">
            <!--@CORAZON s10-k 300 1130 40 #ff6f59-->
          </svg>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s10-giro";
      const DUR = 9.71;
      //@HELPERS

      const AY = 0.0, SE = 0.66, LO = 2.14, MEJOR = 3.87, BARRIO = 4.53, PERO = 5.77, ENTRAR = 6.6, LO2 = 7.68, BARRIO2 = 8.38;
      // confesionario, luz baja: ella suspira
      tl.fromTo(q(".s10-uno"), { scale: 1.06 }, { scale: 1.12, duration: 2.2, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.fromTo(q(".s10-uno"), { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
      tl.to(q(".s10-c-cabeza"), { rotation: 10, svgOrigin: "0 -220", duration: 0.5, ease: "sine.inOut" }, AY + 0.1);
      tl.set(q(".s10-c-boca"), { attr: { d: "M-16 -238 Q0 -244 16 -238" } }, 0);
      tl.to(q(".s10-c-ojos"), { y: 8, duration: 0.3 }, AY + 0.2);
      tl.to(q(".s10-c-bd"), { rotation: 45, svgOrigin: "84 -168", duration: 0.4, ease: "sine.inOut" }, SE);
      tl.to(q(".s10-c-cabeza"), { rotation: 4, svgOrigin: "0 -220", duration: 0.6, ease: "sine.inOut" }, SE + 0.6);
      tl.to(q(".s10-rec"), { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 7, ease: "none" }, 0);
      // "Lo del primero": el local grande, con la puerta abierta y luz adentro
      tl.to(q(".s10-uno"), { opacity: 0, duration: 0.3 }, LO - 0.3);
      gsap.set(q(".s10-dos"), { opacity: 0 });
      tl.to(q(".s10-dos"), { opacity: 1, duration: 0.3 }, LO - 0.25);
      tl.fromTo(q(".s10-loc"), { scale: 0.85, y: 60 }, { scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)", transformOrigin: "50% 100%" }, LO - 0.25);
      gsap.set(q(".s10-l-puerta"), { scaleX: 0.25, svgOrigin: "50 -126" });
      tl.to(q(".s10-luz"), { opacity: 0.75, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, LO);
      gsap.set(q(".s10-cosas"), { opacity: 0 });
      tl.fromTo(q(".s10-cosas"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, LO + 0.5);
      tl.to(q(".s10-l-ojos"), { opacity: 0, duration: 0.15 }, LO + 0.4);
      tl.to(q(".s10-l-boca"), { opacity: 0, duration: 0.15 }, LO + 0.4);
      // "mejor": la estrella
      const est = [q(".s10-estrella"), q(".s10-estrella-txt")];
      gsap.set(est, { opacity: 0 });
      tl.fromTo(est, { opacity: 0, scale: 2.4, rotation: -30 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.18, ease: "power4.in", transformOrigin: "50% 50%", immediateRender: false }, MEJOR - 0.15);
      tl.fromTo(q(".s10-estrella"), { rotation: -8, svgOrigin: "300 760" }, { rotation: 8, svgOrigin: "300 760", duration: 1.4, ease: "sine.inOut" }, BARRIO);
      // "nunca me dejó entrar": portazo, candado y cartel
      tl.to(q(".s10-l-puerta"), { scaleX: 1, svgOrigin: "50 -126", duration: 0.12, ease: "power4.in" }, PERO + 0.05);
      tl.to(q(".s10-luz"), { opacity: 0, duration: 0.1 }, PERO + 0.17);
      tl.to(q(".s10-cosas"), { opacity: 0, duration: 0.1 }, PERO + 0.17);
      sacudon(q(".s10-zoom"), PERO + 0.17, 1.4);
      gsap.set(q(".s10-candado"), { opacity: 0 });
      tl.fromTo(q(".s10-candado"), { opacity: 0, scale: 2, svgOrigin: "695 1200" }, { opacity: 1, scale: 1, svgOrigin: "695 1200", duration: 0.16, ease: "power4.in", immediateRender: false }, ENTRAR - 0.3);
      gsap.set(q(".s10-cerrado"), { opacity: 0 });
      tl.fromTo(q(".s10-cerrado"), { opacity: 1, y: -400 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.in", immediateRender: false }, ENTRAR - 0.1);
      tl.to(q(".s10-cerrado"), { rotation: 7, transformOrigin: "50% 0%", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, ENTRAR + 0.12);
      sacudon(q(".s10-zoom"), ENTRAR + 0.12, 1);
      // "¿Lo mejor del barrio?": primer plano, ojos enormes, lágrima
      tl.to(q(".s10-l-ojos"), { opacity: 1, duration: 0.1 }, LO2 - 0.4);
      tl.to(q(".s10-l-boca"), { opacity: 1, attr: { d: "M-60 -168 Q-44 -176 -28 -168" }, duration: 0.1 }, LO2 - 0.4);
      tl.to([q(".s10-estrella"), q(".s10-estrella-txt")], { opacity: 0, duration: 0.2 }, LO2 - 0.4);
      tl.to(q(".s10-zoom"), { scale: 1.35, transformOrigin: "462px 760px", duration: 0.5, ease: "power3.inOut" }, LO2 - 0.4);
      tl.to(q(".s10-l-ojos"), { scale: 1.4, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(3)" }, LO2);
      gsap.set(q(".s10-lagrima"), { opacity: 0 });
      tl.fromTo(q(".s10-lagrima"), { opacity: 0, y: -10 }, { opacity: 1, y: 70, duration: 0.9, ease: "power1.in", immediateRender: false }, LO2 + 0.25);
      gsap.set(q(".s10-k"), { opacity: 0 });
      tl.fromTo(q(".s10-k"), { opacity: 0, scale: 0.2, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, transformOrigin: "50% 100%", duration: 0.3, ease: "back.out(3)", immediateRender: false }, BARRIO2);
      tl.to(q(".s10-k"), { scale: 1.2, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, BARRIO2 + 0.3);

      tl.to(q("#s10-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
