import { escena, AV, tarjeta, botones, CORAZON, COACH, DUENO, TILDES } from "./lib.mjs";

// ---------- s02 ----------
escena("s02-optica", 2.94, {
  css: `
    $ .@-cartel { position: absolute; left: 90px; top: 610px; width: 440px; height: 150px; border: 6px solid #fff7f4; border-radius: 20px; background: #1a0d2b; }
    $ .@-cartel b { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1; color: #fff7f4; letter-spacing: 0.08em; }
    $ .@-cartel svg { width: 440px; height: 150px; }
    $ .@-globo { position: absolute; left: 90px; top: 860px; width: 330px; height: 200px; border-radius: 60px; background: #fff7f4; }
    $ .@-globo svg { width: 330px; height: 240px; }
    $ .@-grito { position: absolute; left: 60px; top: 1290px; width: 520px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; line-height: 0.95; color: #ff5a6e; letter-spacing: -0.02em; transform: rotate(-6deg); text-shadow: 0 0 24px rgba(18, 8, 32, 0.9); }
  `,
  body: `
        <div class="@-cartel"><b>ÓPTICA</b><svg viewBox="0 0 440 150" aria-hidden="true"><rect class="lente" x="146" y="96" width="64" height="40" rx="14" style="stroke-width:6" /><rect class="lente" x="230" y="96" width="64" height="40" rx="14" style="stroke-width:6" /><path class="ln" d="M210 112 H230 M146 110 L118 100 M294 110 L322 100" /></svg></div>
        <div class="@-globo"><svg viewBox="0 0 330 240" aria-hidden="true"><path class="bf" d="M40 170 L20 236 L110 190 Z" /><circle class="kf @-pt" cx="105" cy="100" r="20" /><circle class="kf @-pt" cx="165" cy="100" r="20" /><circle class="kf @-pt" cx="225" cy="100" r="20" /></svg></div>
        <svg class="@-dueno" viewBox="0 0 1080 1920" aria-hidden="true">
          <!-- brazo estirado hacia el celular -->
          <path class="wf @-l" d="M600 1250 Q520 1180 470 1110 L520 1070 Q580 1140 660 1190 Z" />
          <path class="nf @-l" d="M470 1110 Q440 1080 448 1050 Q470 1030 500 1050 L520 1070 Z" />
          <g transform="translate(760 1030)">${DUENO}
            <path class="la @-gota" d="M100 -70 Q112 -50 100 -40 Q88 -50 100 -70 Z" />
            <path class="la @-gota" d="M-104 -40 Q-92 -20 -104 -10 Q-116 -20 -104 -40 Z" />
          </g>
        </svg>
        <div class="@-grito">¡ES DE<br />LA ÓPTICA!</div>`,
  js: `
      const WSP = 0.66, OPTICA = 1.33;
      dibujar(qa(".@-l"), 0, 0.5, 0.4);
      tl.fromTo(q(".@-dueno"), { x: 260 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.to(q(".@-cejas"), { y: 8, duration: 0.15 }, 0.1);
      tl.to(q(".@-dueno"), { x: 8, duration: 0.05, yoyo: true, repeat: 5 }, 0.35);
      pop(q(".@-cartel"), 0.1);
      pop(q(".@-globo"), WSP - 0.1, 0.5);
      qa(".@-pt").forEach((p, i) => tl.to(p, { y: -14, duration: 0.16, yoyo: true, repeat: 5, ease: "sine.inOut" }, WSP + 0.2 + i * 0.08));
      oculto(qa(".@-gota"));
      qa(".@-gota").forEach((g, i) => { tl.to(g, { opacity: 1, duration: 0.1 }, 0.5 + i * 0.3); tl.to(g, { y: 40, opacity: 0, duration: 0.6, ease: "power1.in" }, 0.6 + i * 0.3); });
      gsap.set(q(".@-grito"), { opacity: 0 });
      tl.fromTo(q(".@-grito"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.18, ease: "power4.in", immediateRender: false }, OPTICA - 0.1);
      golpe(OPTICA + 0.08, 14);
      tl.to(q(".@-cartel"), { rotation: 4, duration: 0.1, yoyo: true, repeat: 3 }, OPTICA);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.3 }, { t: 0.6, sfx: "pop", vol: 0.3 }, { t: 0.85, sfx: "typing", vol: 0.2, max: 0.6 }, { t: 1.25, sfx: "impact-bass-1", vol: 0.4 }],
});

// ---------- s03 ----------
escena("s03-app", 2.47, {
  css: `
    $ .@-cel { left: 320px; top: 600px; width: 440px; height: 860px; }
    $ .@-lista, $ .@-app { position: absolute; inset: 0; }
    $ .@-fila { position: absolute; left: 30px; right: 30px; height: 90px; }
    $ .@-fila i { position: absolute; left: 0; top: 0; width: 80px; height: 80px; border-radius: 50%; background: #b9a8d6; opacity: 0.6; }
    $ .@-fila u { position: absolute; left: 100px; top: 14px; width: 220px; height: 18px; border-radius: 9px; background: #b9a8d6; opacity: 0.6; }
    $ .@-fila s { position: absolute; left: 100px; top: 48px; width: 150px; height: 14px; border-radius: 7px; background: #b9a8d6; opacity: 0.35; }
    $ .@-logo { position: absolute; left: 0; right: 0; top: 64px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: #fff7f4; }
    $ .@-logo b { color: #ff5a6e; }
    $ .@-cel .tarjeta { transform-origin: 50% 50%; }
    $ .@-tel { position: absolute; left: 790px; top: 980px; width: 150px; height: 150px; border-radius: 50%; border: 7px solid #ff5a6e; background: #120820; }
    $ .@-tel svg { position: absolute; left: -7px; top: -7px; width: 150px; height: 150px; }
  `,
  body: `
        <div class="cel @-cel"><div class="barra"></div>
          <div class="@-lista">
            <div class="@-fila" style="top:110px"><i></i><u></u><s></s></div>
            <div class="@-fila" style="top:230px"><i></i><u></u><s></s></div>
            <div class="@-fila" style="top:350px"><i></i><u></u><s></s></div>
            <div class="@-fila" style="top:470px"><i></i><u></u><s></s></div>
            <div class="@-fila" style="top:590px"><i></i><u></u><s></s></div>
          </div>
          <div class="@-app">
            <div class="@-logo"><b>&#9829;</b> corazonada</div>
            ${tarjeta("@-yo", -10, 140, "v", AV.dueno, "Vos", "EL QUE NUNCA<br />LLAMA", "")}
          </div>
        </div>
        <div class="@-tel"><svg viewBox="0 0 150 150" aria-hidden="true"><path class="ln" d="M50 44 Q40 46 42 60 Q50 92 88 108 Q100 112 104 100 L96 88 Q90 84 84 90 Q66 82 60 64 Q66 58 62 52 Z" style="stroke-width:6" /><path class="cl" d="M32 32 L118 118" style="stroke-width:9" /></svg></div>`,
  js: `
      const APP = 0.47, NUNCA = 1.93;
      // la tarjeta adentro del celular es más chica
      gsap.set(q(".@-yo"), { scale: 0.86, transformOrigin: "50% 0%" });
      gsap.set(q(".@-app"), { opacity: 0 });
      tl.fromTo(q(".@-cel"), { rotationY: 0 }, { rotationY: 90, duration: 0.18, ease: "power2.in" }, APP - 0.25);
      tl.set(q(".@-lista"), { opacity: 0 }, APP - 0.07);
      tl.set(q(".@-app"), { opacity: 1 }, APP - 0.07);
      tl.to(q(".@-cel"), { rotationY: 0, duration: 0.22, ease: "back.out(1.6)" }, APP - 0.07);
      tl.fromTo(q(".@-app"), { filter: "hue-rotate(0deg) blur(4px)" }, { filter: "hue-rotate(0deg) blur(0px)", duration: 0.25, immediateRender: false }, APP);
      tl.fromTo(q(".@-yo"), { y: 60, rotation: 6 }, { y: 0, rotation: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, APP);
      tl.fromTo(q(".@-cel"), { scale: 1 }, { scale: 1.04, duration: 1.2, ease: "sine.inOut", immediateRender: false }, 0.8);
      gsap.set(q(".@-yo .bio"), { opacity: 0 });
      tl.fromTo(q(".@-yo .bio"), { opacity: 0, scale: 1.5 }, { opacity: 0.85, scale: 1, duration: 0.18, ease: "power4.in", immediateRender: false }, NUNCA - 0.15);
      pop(q(".@-tel"), NUNCA + 0.05, 0.3);
      golpe(NUNCA + 0.1, 10);
      tl.to(q(".@-tel"), { rotation: -10, duration: 0.08, yoyo: true, repeat: 3 }, NUNCA + 0.35);`,
  sfx: [{ t: 0.25, sfx: "whoosh-short", vol: 0.3 }, { t: 0.42, sfx: "glitch-2", vol: 0.3 }, { t: 0.55, sfx: "sparkle", vol: 0.25 }, { t: 1.82, sfx: "impact-bass-1", vol: 0.35 }, { t: 2.0, sfx: "glitch-1", vol: 0.25 }],
});

// ---------- s04 ----------
const pasa = (k, foto) => tarjeta("@-pasa @-p" + k, 310, 610, foto, AV.generico(), "", "", "");
escena("s04-gabriela", 4.85, {
  css: `
    $ .@-mano { position: absolute; left: 0; top: 0; }
    $ .@-sol { position: absolute; left: 600px; top: 560px; width: 300px; height: 140px; }
    $ .@-sol svg { width: 300px; height: 140px; }
  `,
  body: `
        ${pasa(1, "v")}${pasa(2, "l")}${pasa(3, "v")}
        ${tarjeta("@-gab", 310, 610, "", AV.gabriela, "Gabriela", "QUIERE LENTES DE SOL")}
        ${botones("@-bt", 540, 1290)}
        <div class="@-sol"><svg viewBox="0 0 300 140" aria-hidden="true"><path class="ln" d="M20 40 H280" style="stroke-width:7" /><path fill="#1a0d2b" stroke="#fff7f4" stroke-width="7" d="M30 40 H134 Q134 120 82 120 Q30 120 30 40 Z M166 40 H270 Q270 120 218 120 Q166 120 166 40 Z" /><path class="ln" d="M60 60 L80 80 M196 60 L216 80" style="stroke-width:4" /></svg></div>
        <div data-layout-allow-overlap class="sello la @-ult" style="left:250px;top:1140px;font-size:36px;">ÚLTIMO MENSAJE · 12 ENE</div>
        <svg class="@-dedo" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="nf" d="M760 1560 L780 1340 Q784 1300 812 1302 Q838 1306 836 1344 L834 1430 Q880 1420 900 1450 Q940 1440 952 1480 L960 1560 Z" />
          <rect class="cf" x="794" y="1308" width="30" height="26" rx="10" />
        </svg>`,
  js: `
      const VER = 0.49, GAB = 1.85, LENTES = 3.46, ENERO = 4.09;
      // tarjetas que pasan rápido a la izquierda, con el dedo que desliza
      const ps = [q(".@-p3"), q(".@-p2"), q(".@-p1")];
      gsap.set(q(".@-gab"), { opacity: 0 });
      ps.forEach((p, i) => { gsap.set(p, { rotation: (i - 1) * 3 }); swipe(p, 0.25 + i * 0.5, -1, 0.32); });
      tl.fromTo(q(".@-dedo"), { x: 40, y: 80 }, { x: 0, y: 0, duration: 0.25 }, 0);
      [0.2, 0.7, 1.2].forEach((t) => tl.to(q(".@-dedo"), { x: -260, duration: 0.3, ease: "power2.in", yoyo: true, repeat: 1 }, t));
      tl.to(q(".@-dedo"), { y: 400, opacity: 0, duration: 0.3, ease: "power2.in" }, GAB - 0.1);
      qa(".@-bt-x, .@-bt-c").forEach((b, i) => entra(b, 0.05 + i * 0.08));
      [0.25, 0.75, 1.25].forEach((t) => tl.to(q(".@-bt-x"), { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, t));
      tl.fromTo(q(".@-gab"), { opacity: 0, scale: 0.9, y: 40, rotation: 5 }, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.4, ease: "back.out(1.7)", immediateRender: false }, GAB - 0.25);
      tl.fromTo(q(".@-gab .nom"), { scale: 1.4, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, GAB);
      late(q(".@-bt-c"), GAB + 0.2, 2, 1.15);
      // los lentes de sol caen sobre la tarjeta
      gsap.set(q(".@-sol"), { opacity: 0 });
      tl.fromTo(q(".@-sol"), { opacity: 0, y: -220, rotation: -30 }, { opacity: 1, y: 0, rotation: 8, duration: 0.35, ease: "bounce.out", immediateRender: false }, LENTES - 0.2);
      sellar(q(".@-ult"), ENERO, -5);
      tl.to(q(".@-gab"), { rotation: -2, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.5);`,
  sfx: [{ t: 0.25, sfx: "whoosh-short", vol: 0.25 }, { t: 0.75, sfx: "whoosh-short", vol: 0.25 }, { t: 1.25, sfx: "whoosh-short", vol: 0.25 }, { t: 1.62, sfx: "sparkle", vol: 0.3 }, { t: 3.3, sfx: "pop", vol: 0.35 }, { t: 3.92, sfx: "impact-bass-1", vol: 0.35 }],
});

// ---------- s05 ----------
escena("s05-manana", 3.22, {
  css: `
    $ .@-fecha { left: 0; right: 0; top: 600px; text-align: center; }
    $ .@-b1 { right: 90px; top: 670px; }
    $ .@-cal { position: absolute; left: 330px; top: 900px; width: 420px; height: 440px; border-radius: 28px; background: #fff7f4; overflow: hidden; }
    $ .@-cal .tope { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #ff5a6e; }
    $ .@-cal .mes { position: absolute; left: 0; right: 0; top: 22px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 72px; line-height: 1; color: #fff7f4; letter-spacing: 0.06em; }
    $ .@-cal .dia { position: absolute; left: 0; right: 0; top: 150px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 220px; line-height: 1; color: #1a0d2b; }
    $ .@-hoja { position: absolute; left: 330px; top: 900px; width: 420px; height: 440px; border-radius: 28px; background: #fff7f4; border-top: 120px solid #ff5a6e; }
    $ .@-anio { top: 1080px; font-size: 230px; color: #ff5a6e; text-shadow: 0 0 40px rgba(255, 90, 110, 0.6), 0 8px 0 #1a0d2b; }
  `,
  body: `
        <div class="mono @-fecha">12 ENE · 19:40</div>
        <div class="burbuja yo @-b1">te lo paso mañana<small>19:40 &nbsp;<svg style="position:static;width:60px;height:26px;vertical-align:middle" viewBox="0 0 60 26">${TILDES(4, 6, "ln")}</svg></small></div>
        <div class="@-cal"><div class="tope"></div><div class="mes">ENE</div><div class="dia">13</div></div>
        <div class="@-hoja @-h1"></div><div class="@-hoja @-h2"></div><div class="@-hoja @-h3"></div>
        <div class="gigante @-anio">¿2031?</div>`,
  js: `
      const PASO = 0.88, MAN2 = 1.86, ANIO = 2.43;
      entra(q(".@-fecha"), 0);
      gsap.set(q(".@-b1"), { opacity: 0 });
      tl.fromTo(q(".@-b1"), { opacity: 0, x: 80, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, 0.05);
      tl.fromTo(q(".@-b1"), { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, 1.11);
      entra(q(".@-cal"), 0.6, { y: 60 });
      // las hojas del taco vuelan y los meses pasan a toda velocidad
      const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV"];
      const m = { v: 0 };
      tl.to(m, { v: MESES.length - 1, duration: 0.55, ease: "none", onUpdate: () => { q(".@-cal .mes").textContent = MESES[Math.round(m.v)]; q(".@-cal .dia").textContent = String([13, 7, 22, 3, 18, 9, 27, 14, 5, 20, 11][Math.round(m.v)]); } }, MAN2);
      gsap.set(qa(".@-hoja"), { opacity: 0 });
      qa(".@-hoja").forEach((h, i) => {
        tl.set(h, { opacity: 1, x: 0, y: 0, rotation: 0 }, MAN2 + i * 0.18);
        tl.to(h, { x: (i % 2 ? 1 : -1) * 500, y: -300, rotation: (i % 2 ? 1 : -1) * 40, opacity: 0, duration: 0.35, ease: "power2.in" }, MAN2 + i * 0.18 + 0.02);
      });
      tl.to(q(".@-cal"), { y: -10, duration: 0.06, yoyo: true, repeat: 7 }, MAN2);
      tl.to([q(".@-cal"), q(".@-b1")], { opacity: 0.35, duration: 0.15 }, ANIO - 0.05);
      gsap.set(q(".@-anio"), { opacity: 0 });
      tl.fromTo(q(".@-anio"), { opacity: 0, scale: 1.8, rotation: -10 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.2, ease: "power4.in", immediateRender: false }, ANIO - 0.12);
      golpe(ANIO + 0.08, 18);
      tl.to(q(".@-anio"), { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, ANIO + 0.3);`,
  sfx: [{ t: 0.05, sfx: "click-soft", vol: 0.3 }, { t: 1.86, sfx: "typing", vol: 0.25, max: 0.55 }, { t: 1.9, sfx: "whoosh", vol: 0.25 }, { t: 2.35, sfx: "impact-bass-2", vol: 0.4 }],
});
