<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s06-el"] .s06-capa { position: absolute; inset: 0; }
    [data-composition-id="s06-el"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s06-el"] .s06-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s06-el"] .s06-loc { position: absolute; left: 370px; top: 880px; width: 340px; height: 440px; }
    [data-composition-id="s06-el"] .s06-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s06-el"] .s06-paleta { position: absolute; left: 730px; top: 760px; width: 200px; height: 330px; }
    [data-composition-id="s06-el"] .s06-paleta-cara { position: absolute; left: 0; top: 0; width: 200px; height: 190px; background: #120a22; border: 7px solid #ffc857; border-radius: 26px; text-align: center; }
    [data-composition-id="s06-el"] .s06-paleta-cara div { font-family: "Lexend", sans-serif; font-weight: 900; font-size: 130px; line-height: 1; letter-spacing: -0.04em; color: #ffc857; padding-top: 22px; text-shadow: 0 0 24px rgba(255, 200, 87, 0.55); }
    [data-composition-id="s06-el"] .s06-palo { position: absolute; left: 86px; top: 186px; width: 28px; height: 140px; background: #3b1d5a; border: 6px solid #fff3e0; border-radius: 6px; }
    [data-composition-id="s06-el"] .s06-trofeo { position: absolute; left: 120px; top: 790px; width: 250px; height: 280px; background: #ffc857; border: 7px solid #120a22; border-radius: 12px; }
    [data-composition-id="s06-el"] .s06-trofeo-img { position: absolute; left: 20px; top: 20px; width: 196px; height: 170px; filter: blur(7px); }
    [data-composition-id="s06-el"] .s06-trofeo-img svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s06-el"] .s06-trofeo-txt { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 52px; line-height: 1; color: #120a22; }
  </style>
  <div id="root" data-composition-id="s06-el" data-width="1080" data-height="1920" data-duration="5.71">
    <div id="s06-escena" class="s06-capa clip" data-start="0" data-duration="5.71" data-track-index="0">
      <div class="s06-capa s06-set">
        <svg class="s06-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!--@CONFE s06 ÉL-->
        </svg>
        <div class="s06-loc"><!--@LOCAL s06-l--></div>
        <svg class="s06-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="s06-brillo" d="M940 740 L960 710 M970 780 H1004 M900 720 L890 690" fill="none" stroke="#ffc857" stroke-width="7" stroke-linecap="round" />
        </svg>
        <div class="s06-paleta"><div class="s06-palo"></div><div class="s06-paleta-cara"><div>10</div></div></div>
        <div class="s06-trofeo">
          <div class="s06-trofeo-img">
            <svg viewBox="0 0 196 170" aria-hidden="true">
              <rect width="196" height="170" fill="#3b1d5a" />
              <path d="M16 20 V160 M180 20 V160 M16 64 H180 M16 112 H180" stroke="#fff3e0" stroke-width="7" />
              <rect x="30" y="30" width="30" height="34" fill="#ff6f59" /><rect x="80" y="36" width="40" height="28" fill="#22d1c3" /><rect x="136" y="30" width="30" height="34" fill="#fff3e0" />
              <rect x="34" y="78" width="40" height="34" fill="#22d1c3" /><rect x="100" y="84" width="30" height="28" fill="#ff6f59" />
            </svg>
          </div>
          <div class="s06-trofeo-txt">¡mirá!</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s06-el";
      const DUR = 5.71;
      //@HELPERS

      const DICE = 0.74, YO = 1.91, BIEN = 2.48, HASTA = 3.66, FOTO = 4.22;
      tl.fromTo(q(".s06-set"), { scale: 1.08 }, { scale: 1, duration: 0.45, ease: "power3.out", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s06-loc"), { opacity: 0.5, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s06-marco"), { opacity: 0.3, scale: 1.12, svgOrigin: "540 1040" }, { opacity: 1, scale: 1, svgOrigin: "540 1040", duration: 0.3, ease: "power3.out" }, 0);
      tl.to(q(".s06-rec"), { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 21, ease: "none" }, 0.3);
      // "dice": zoom suave al local
      tl.to(q(".s06-set"), { scale: 1.05, duration: DUR - 0.8, ease: "none", transformOrigin: "50% 60%" }, DICE);
      parpadeo(q(".s06-l-ojos"), [1.2, 3.2, 5.0]);
      // "Yo pensé que fue bien": se acomoda satisfecho
      tl.to(q(".s06-l-boca"), { attr: { d: "M-70 -178 Q-44 -146 -18 -178" }, duration: 0.2 }, YO);
      tl.to(q(".s06-loc"), { rotation: -3, transformOrigin: "50% 100%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, YO);
      // "bien": levanta el 10
      gsap.set(q(".s06-paleta"), { opacity: 0 });
      tl.fromTo(q(".s06-paleta"), { opacity: 1, y: 600, rotation: 20 }, { opacity: 1, y: 0, rotation: 6, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, BIEN - 0.15);
      tl.to(q(".s06-paleta"), { rotation: -2, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, BIEN + 0.2);
      gsap.set(q(".s06-brillo"), { opacity: 0 });
      tl.to(q(".s06-brillo"), { opacity: 1, duration: 0.08, yoyo: true, repeat: 3 }, BIEN + 0.1);
      tl.fromTo(q(".s06-l-mono"), { rotation: 0, svgOrigin: "-44 -112" }, { rotation: 15, svgOrigin: "-44 -112", duration: 0.12, yoyo: true, repeat: 3 }, BIEN);
      // "Hasta le mandé una foto": la saca como un trofeo
      tl.to(q(".s06-paleta"), { y: 600, opacity: 0, duration: 0.3, ease: "power2.in" }, HASTA);
      gsap.set(q(".s06-trofeo"), { opacity: 0 });
      tl.fromTo(q(".s06-trofeo"), { opacity: 1, y: 600, rotation: -20 }, { opacity: 1, y: 0, rotation: -6, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, FOTO - 0.3);
      tl.to(q(".s06-trofeo"), { scale: 1.08, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, FOTO + 0.1);
      tl.to(q(".s06-l-ojos"), { scale: 1.25, transformOrigin: "50% 50%", duration: 0.2, ease: "back.out(3)" }, FOTO);

      tl.to(q("#s06-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
