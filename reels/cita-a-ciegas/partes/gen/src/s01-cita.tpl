<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    /*@FONTS*/
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="s01-cita"] .s01-capa { position: absolute; inset: 0; }
    [data-composition-id="s01-cita"] svg { position: absolute; overflow: visible; }
    [data-composition-id="s01-cita"] .s01-full { left: 0; top: 0; width: 1080px; height: 1920px; }
    [data-composition-id="s01-cita"] .s01-cli { position: absolute; left: 100px; top: 836px; width: 330px; height: 464px; }
    [data-composition-id="s01-cita"] .s01-loc { position: absolute; left: 640px; top: 856px; width: 340px; height: 440px; }
    [data-composition-id="s01-cita"] .s01-cli svg, [data-composition-id="s01-cita"] .s01-loc svg { left: 0; top: 0; width: 100%; height: 100%; }
    [data-composition-id="s01-cita"] .s01-txt { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; -webkit-text-stroke: 10px #120a22; paint-order: stroke fill; }
    [data-composition-id="s01-cita"] .s01-titulo { top: 600px; font-size: 104px; letter-spacing: -0.01em; color: #fff3e0; }
    [data-composition-id="s01-cita"] .s01-titulo b { color: #ff6f59; font-weight: 900; }
    [data-composition-id="s01-cita"] .s01-sello { position: absolute; left: 130px; top: 700px; width: 820px; height: 190px; border: 12px solid #ff6f59; border-radius: 26px; background: rgba(18, 10, 34, 0.82); }
    [data-composition-id="s01-cita"] .s01-sello div { position: absolute; left: 0; right: 0; top: 30px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 128px; line-height: 1; letter-spacing: 0.02em; color: #ff6f59; text-shadow: 0 0 30px rgba(255, 111, 89, 0.6); }
  </style>
  <div id="root" data-composition-id="s01-cita" data-width="1080" data-height="1920" data-duration="5.18">
    <div id="s01-escena" class="s01-capa clip" data-start="0" data-duration="5.18" data-track-index="0">
      <div class="s01-capa s01-set">
        <svg class="s01-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- luz de mesa -->
          <ellipse class="s01-halo" cx="540" cy="1130" rx="250" ry="200" fill="#ffc857" opacity="0.07" />
        </svg>
        <div class="s01-cli"><!--@CLIENTA s01-c--></div>
        <div class="s01-loc"><!--@LOCAL s01-l--></div>
        <svg class="s01-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- biombo que tapa a la cita -->
          <g class="s01-biombo">
            <path d="M630 830 H760 V1300 H630 Z" fill="#3b1d5a" stroke="#fff3e0" stroke-width="6" stroke-linejoin="round" />
            <path d="M760 830 H890 V1300 H760 Z" fill="#241238" stroke="#fff3e0" stroke-width="6" stroke-linejoin="round" />
            <path d="M890 830 H1010 V1300 H890 Z" fill="#3b1d5a" stroke="#fff3e0" stroke-width="6" stroke-linejoin="round" />
            <text x="822" y="1150" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="900" font-size="300" fill="#ffc857" stroke="#120a22" stroke-width="10" paint-order="stroke fill">?</text>
          </g>
          <!-- corazón partido -->
          <g class="s01-corazon">
            <path class="s01-mitad-i" d="M540 1060 L494 1012 A28 28 0 0 1 540 982 L550 1000 L532 1020 L550 1040 Z" fill="#ff6f59" stroke="#120a22" stroke-width="5" stroke-linejoin="round" />
            <path class="s01-entero" d="M540 1060 L494 1012 A28 28 0 0 1 540 982 A28 28 0 0 1 586 1012 Z" fill="#ff6f59" stroke="#120a22" stroke-width="5" stroke-linejoin="round" />
            <path class="s01-mitad-d" d="M540 1060 L586 1012 A28 28 0 0 0 540 982 L550 1000 L532 1020 L550 1040 Z" fill="#ff6f59" stroke="#120a22" stroke-width="5" stroke-linejoin="round" />
          </g>
          <!-- la mesa -->
          <g class="s01-mesa">
            <path d="M232 1250 H848 L878 1470 H202 Z" fill="#fff3e0" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <path d="M232 1250 H848 L852 1280 H228 Z" fill="#ff6f59" />
            <path d="M260 1330 H820 M250 1400 H830" stroke="#ff6f59" stroke-width="6" opacity="0.5" />
            <path d="M232 1250 H848 L878 1470 H202 Z" fill="none" stroke="#120a22" stroke-width="7" stroke-linejoin="round" />
            <!-- copas -->
            <path d="M372 1168 H428 Q428 1212 400 1214 Q372 1212 372 1168 Z M400 1214 V1246 M384 1248 H416" fill="none" stroke="#22d1c3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M652 1168 H708 Q708 1212 680 1214 Q652 1212 652 1168 Z M680 1214 V1246 M664 1248 H696" fill="none" stroke="#22d1c3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            <!-- vela -->
            <rect x="522" y="1150" width="36" height="100" rx="6" fill="#fff3e0" stroke="#120a22" stroke-width="5" />
            <path d="M540 1150 V1136" stroke="#120a22" stroke-width="4" />
            <path class="s01-llama" d="M540 1080 C556 1100 562 1118 554 1130 C548 1140 532 1140 526 1130 C518 1116 526 1100 540 1080 Z" fill="#ffc857" stroke="#120a22" stroke-width="4" />
            <g class="s01-humo"><path d="M540 1130 C520 1100 560 1080 540 1050 C520 1020 560 1000 540 970" fill="none" stroke="#fff3e0" stroke-width="6" stroke-linecap="round" opacity="0.7" /></g>
          </g>
        </svg>
      </div>
      <div class="s01-txt s01-titulo">Cita a <b>ciegas</b></div>
      <div class="s01-sello"><div>DESASTRE</div></div>
    </div>
  </div>
  <script>
    (function () {
      const ID = "s01-cita";
      const DUR = 5.18;
      //@HELPERS

      const CLIENTA = 0.09, CITA = 1.19, LOCAL = 2.29, Y = 3.22, DESASTRE = 4.13;

      // cuadro 0: la mesa y la clienta ya están, entrando
      tl.fromTo(q(".s01-set"), { scale: 1.06 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 65%" }, 0);
      tl.fromTo(q(".s01-mesa"), { opacity: 0.7, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s01-cli"), { opacity: 0.6, x: -120 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.fromTo(q(".s01-biombo"), { opacity: 0.6, x: 120 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      tl.to(q(".s01-llama"), { scaleY: 0.85, scaleX: 1.1, svgOrigin: "540 1136", duration: 0.12, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0);
      tl.to(q(".s01-halo"), { opacity: 0.11, duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0);
      // "clienta": saluda
      tl.fromTo(q(".s01-c-bd"), { rotation: 0, svgOrigin: "84 -168" }, { rotation: -130, svgOrigin: "84 -168", duration: 0.25, ease: "back.out(2)" }, CLIENTA + 0.1);
      tl.to(q(".s01-c-bd"), { rotation: -110, svgOrigin: "84 -168", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, CLIENTA + 0.35);
      tl.to(q(".s01-c-bd"), { rotation: 0, svgOrigin: "84 -168", duration: 0.3, ease: "power2.inOut" }, CITA + 0.4);
      // "cita a ciegas": cae el título
      golpe(q(".s01-titulo"), CITA, -3);
      sacudon(q(".s01-set"), CITA + 0.03, 0.8);
      // "local": se cae el biombo y aparece él
      gsap.set(q(".s01-loc"), { opacity: 0 });
      tl.to(q(".s01-biombo"), { rotation: 70, svgOrigin: "1010 1300", opacity: 0, duration: 0.35, ease: "power2.in" }, LOCAL - 0.1);
      tl.fromTo(q(".s01-loc"), { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(2)", transformOrigin: "50% 100%", immediateRender: false }, LOCAL);
      tl.fromTo(q(".s01-l-mono"), { rotation: -20, svgOrigin: "-44 -112" }, { rotation: 0, svgOrigin: "-44 -112", duration: 0.5, ease: "elastic.out(1.2, 0.4)" }, LOCAL + 0.2);
      parpadeo(q(".s01-l-ojos"), [LOCAL + 0.6, Y + 0.3]);
      // corazón que late
      gsap.set(q(".s01-corazon"), { opacity: 0 });
      tl.fromTo(q(".s01-corazon"), { opacity: 0, scale: 0.3, svgOrigin: "540 1020" }, { opacity: 1, scale: 1, svgOrigin: "540 1020", duration: 0.3, ease: "back.out(3)", immediateRender: false }, LOCAL + 0.25);
      tl.to(q(".s01-corazon"), { scale: 1.18, svgOrigin: "540 1020", duration: 0.14, yoyo: true, repeat: 7, ease: "sine.inOut" }, LOCAL + 0.55);
      // "Y fue": suspenso, la llama tiembla y ella se pone seria
      tl.to(q(".s01-llama"), { x: -6, duration: 0.05, yoyo: true, repeat: 11, ease: "none" }, Y);
      tl.to(q(".s01-c-boca"), { attr: { d: "M-16 -238 L16 -238" }, duration: 0.15 }, Y + 0.1);
      // "desastre"
      tl.to(q(".s01-titulo"), { opacity: 0, y: -40, duration: 0.15 }, DESASTRE - 0.15);
      tl.to(q(".s01-llama"), { scale: 0, svgOrigin: "540 1136", duration: 0.12, ease: "power2.in" }, DESASTRE - 0.05);
      tl.to(q(".s01-halo"), { opacity: 0, duration: 0.1 }, DESASTRE);
      gsap.set(q(".s01-humo"), { opacity: 0 });
      tl.fromTo(q(".s01-humo"), { opacity: 0, y: 20 }, { opacity: 1, y: -40, duration: 0.9, ease: "power1.out", immediateRender: false }, DESASTRE + 0.05);
      gsap.set([q(".s01-mitad-i"), q(".s01-mitad-d")], { opacity: 0 });
      tl.set([q(".s01-mitad-i"), q(".s01-mitad-d")], { opacity: 1 }, DESASTRE);
      tl.set(q(".s01-entero"), { opacity: 0 }, DESASTRE);
      tl.to(q(".s01-mitad-i"), { rotation: -35, x: -50, y: 160, svgOrigin: "540 1060", duration: 0.7, ease: "power2.in" }, DESASTRE);
      tl.to(q(".s01-mitad-d"), { rotation: 35, x: 50, y: 160, svgOrigin: "540 1060", duration: 0.7, ease: "power2.in" }, DESASTRE);
      tl.to(q(".s01-corazon"), { opacity: 0, duration: 0.2 }, DESASTRE + 0.55);
      golpe(q(".s01-sello"), DESASTRE, -7);
      tl.to(q(".s01-c-boca"), { attr: { d: "M-18 -234 Q0 -250 18 -234" }, duration: 0.15 }, DESASTRE);
      tl.to(q(".s01-c-ojos"), { scaleY: 0.4, transformOrigin: "50% 50%", duration: 0.12 }, DESASTRE);
      sacudon(q(".s01-set"), DESASTRE + 0.03, 2);
      tl.to(q(".s01-sello"), { rotation: -5, duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut" }, DESASTRE + 0.25);

      // salida
      tl.to(q("#s01-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);

      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
