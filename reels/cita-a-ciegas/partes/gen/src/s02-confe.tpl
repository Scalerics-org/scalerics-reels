<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s02-confe"] .s02-capa { position: absolute; inset: 0; }
    [data-composition-id="s02-confe"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s02-confe"] .s02-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s02-confe"] .s02-cli { position: absolute; left: 365px; top: 880px; width: 350px; height: 492px; }
    [data-composition-id="s02-confe"] .s02-cli svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s02-confe"] .s02-flash { position: absolute; inset: 0; background: #fff3e0; opacity: 0; }
  </style>
  <div id="root" data-composition-id="s02-confe" data-width="1080" data-height="1920" data-duration="3.13">
    <div id="s02-escena" class="s02-capa clip" data-start="0" data-duration="3.13" data-track-index="0">
      <div class="s02-capa s02-set">
        <svg class="s02-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!--@CONFE s02 ELLA-->
        </svg>
        <div class="s02-cli"><!--@CLIENTA s02-c--></div>
        <svg class="s02-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!--@CORAZON s02-k1 330 900 52 #ff6f59-->
          <!--@CORAZON s02-k2 540 800 64 #ff6f59-->
          <!--@CORAZON s02-k3 750 900 52 #ff6f59-->
        </svg>
      </div>
      <div class="s02-flash"></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s02-confe";
      const DUR = 3.13;
      //@HELPERS

      const CONFE = 0.42, GANAS = 2.11, EH = 2.48;
      tl.fromTo(q(".s02-set"), { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "power3.out", transformOrigin: "50% 55%" }, 0);
      tl.to(q(".s02-set"), { scale: 1.04, duration: DUR - 0.5, ease: "none", transformOrigin: "50% 55%" }, 0.5);
      tl.fromTo(q(".s02-cli"), { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      // brazos cruzados
      gsap.set(q(".s02-c-bi"), { rotation: -58, svgOrigin: "-84 -168" });
      gsap.set(q(".s02-c-bd"), { rotation: 58, svgOrigin: "84 -168" });
      // "confesionario": entra el marco con clic de cámara
      gsap.set(q(".s02-marco"), { opacity: 0 });
      tl.fromTo(q(".s02-marco"), { opacity: 0, scale: 1.15, svgOrigin: "540 1040" }, { opacity: 1, scale: 1, svgOrigin: "540 1040", duration: 0.25, ease: "power3.out", immediateRender: false }, CONFE);
      tl.to(q(".s02-flash"), { opacity: 0.5, duration: 0.03 }, CONFE);
      tl.to(q(".s02-flash"), { opacity: 0, duration: 0.3 }, CONFE + 0.04);
      tl.to(q(".s02-rec"), { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 7, ease: "none" }, CONFE + 0.2);
      // ojos en blanco y cabeza de costado
      tl.to(q(".s02-c-ojos"), { y: -10, duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 0.4 }, 1.0);
      tl.to(q(".s02-c-cabeza"), { rotation: -8, svgOrigin: "0 -220", duration: 0.25, ease: "power2.out" }, 1.0);
      tl.to(q(".s02-c-boca"), { attr: { d: "M-18 -240 Q0 -240 18 -246" }, duration: 0.2 }, 1.0);
      // "ganas": corazones que se inflan; "eh": se desinflan y caen
      ["s02-k1", "s02-k2", "s02-k3"].forEach((k, i) => {
        const el = q("." + k);
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.2, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1.1, transformOrigin: "50% 100%", duration: 0.3, ease: "back.out(3)", immediateRender: false }, GANAS - 0.25 + i * 0.08);
        tl.to(el, { scale: 0.45, y: 260, rotation: i === 1 ? 20 : -25 + i * 20, opacity: 0.4, duration: 0.5, ease: "power2.in" }, EH + 0.1 + i * 0.05);
      });
      tl.to(q(".s02-c-cabeza"), { rotation: 4, svgOrigin: "0 -220", duration: 0.2, ease: "power2.out" }, EH);

      tl.to(q("#s02-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
