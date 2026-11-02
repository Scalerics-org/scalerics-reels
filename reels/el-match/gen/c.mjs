import { escena, AV, tarjeta, botones, CORAZON, COACH, DUENO, TILDES } from "./lib.mjs";

// ---------- s11 ----------
const FILA = (k, y, foto, av, nom, est) => `
          <div class="@-fila @-f${k}" style="top:${y}px">
            <div class="@-av ${foto}">${av}</div>
            <div class="@-nm">${nom}</div>
            <div class="@-es">${est}</div>
            <svg class="@-ok" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#5ce611" /><path d="M17 31 l9 9 l17 -19" fill="none" stroke="#1a0d2b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>`;
const MINI = (k, x, y, r, foto, av) => `<div class="@-mini @-m${k}" style="left:${x}px;top:${y}px;transform:rotate(${r}deg)"><div class="foto ${foto}">${av}</div></div>`;
escena("s11-crm", 6.73, {
  css: `
    $ .@-panel { position: absolute; left: 100px; top: 600px; width: 880px; height: 900px; border-radius: 40px; background: #fff7f4; overflow: hidden; box-shadow: 0 20px 50px rgba(18, 8, 32, 0.6); }
    $ .@-cab { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #9b6bff; }
    $ .@-cab b { position: absolute; left: 44px; top: 34px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 50px; line-height: 1; color: #fff7f4; }
    $ .@-cab i { position: absolute; right: 44px; top: 40px; width: 40px; height: 40px; border-radius: 50%; background: #5ce611; }
    $ .@-crm { position: absolute; right: 100px; top: 34px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; line-height: 1; color: #fff7f4; letter-spacing: 0.2em; }
    $ .@-fila { position: absolute; left: 30px; right: 30px; height: 170px; border-bottom: 3px solid rgba(26, 13, 43, 0.15); }
    $ .@-av { position: absolute; left: 10px; top: 25px; width: 120px; height: 120px; border-radius: 50%; background: #ff5a6e; overflow: hidden; }
    $ .@-av.v { background: #9b6bff; }
    $ .@-av.l { background: #b9a8d6; }
    $ .@-av svg { position: absolute; left: -10px; top: 0; width: 140px; height: 128px; }
    $ .@-nm { position: absolute; left: 160px; top: 30px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1; color: #1a0d2b; }
    $ .@-es { position: absolute; left: 162px; top: 92px; right: 80px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; line-height: 1.3; color: #1a0d2b; opacity: 0.75; letter-spacing: 0.02em; }
    $ .@-es2 { position: absolute; left: 162px; top: 92px; right: 80px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; line-height: 1.3; color: #1a0d2b; letter-spacing: 0.02em; padding-left: 14px; border-left: 8px solid #5ce611; }
    $ .@-ok { position: absolute; left: 740px; top: 55px; width: 60px; height: 60px; }
    $ .@-mini { position: absolute; width: 230px; height: 300px; border-radius: 24px; background: #fff7f4; overflow: hidden; box-shadow: 0 14px 30px rgba(18, 8, 32, 0.5); }
    $ .@-mini .foto { position: absolute; left: 0; top: 0; width: 230px; height: 210px; background: #ff5a6e; }
    $ .@-mini .foto.v { background: #9b6bff; }
    $ .@-mini .foto.l { background: #b9a8d6; }
    $ .@-mini .foto svg { width: 230px; height: 210px; }
  `,
  body: `
        <div class="@-panel">
          <div class="@-cab"><b>Tus clientes</b><span class="@-crm">CRM</span><i></i></div>
          ${FILA(1, 140, "", AV.gabriela, "Gabriela", "LENTES DE SOL · CONSULTÓ EN ENERO")}
          ${FILA(2, 310, "v", AV.rodrigo, "Rodrigo", "CLIENTE · 2 COMPRAS")}
          ${FILA(3, 480, "l", AV.generico("kf"), "Ana <span style='font-size:30px;opacity:0.6'>(ex ¿quién era?)</span>", "PIDIÓ CRISTALES · ABRIL")}
          ${FILA(4, 650, "", AV.generico("kf"), "Sergio", "CONTROL DE VISTA · MAYO")}
          <div class="@-es2 @-x2" style="top:402px">2 COMPRAS · ARMAZÓN + LENTES</div>
          <div class="@-es2 @-x1" style="top:232px">PROMETIDO: PRECIO LENTES DE SOL</div>
        </div>
        ${MINI(1, 120, 640, -10, "", AV.gabriela)}${MINI(2, 420, 600, 6, "v", AV.rodrigo)}${MINI(3, 720, 660, 12, "l", AV.quien)}${MINI(4, 260, 1040, 8, "", AV.generico())}${MINI(5, 600, 1080, -7, "v", AV.generico())}`,
  js: `
      const CRM = 1.18, TODOS = 2.41, LUGAR = 3.91, COMPRARON = 4.91, PROMETISTE = 6.0;
      // las tarjetas sueltas, desordenadas
      const minis = qa(".@-mini");
      minis.forEach((m, i) => { gsap.set(m, { opacity: 0 }); tl.fromTo(m, { opacity: 0, scale: 0.6, y: -80 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, 0.05 + i * 0.1); });
      minis.forEach((m, i) => tl.to(m, { y: (i % 2 ? -14 : 14), duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.6 + i * 0.05));
      // "CRM": entra el panel por detrás
      gsap.set(q(".@-panel"), { opacity: 0 });
      tl.fromTo(q(".@-panel"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, CRM - 0.15);
      tl.fromTo(q(".@-crm"), { scale: 1.6 }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, CRM);
      // las tarjetas vuelan a su fila y se achican (entre "todos" y "lugar")
      const destinos = [[160, 765], [160, 935], [160, 1105], [160, 1275], [700, 1300]];
      oculto(qa(".@-fila"));
      minis.forEach((m, i) => {
        const [dx, dy] = destinos[i];
        const x0 = parseFloat(m.style.left), y0 = parseFloat(m.style.top);
        tl.to(m, { x: dx - x0 - 55, y: dy - y0 - 90, rotation: 0, scale: 0.4, opacity: i < 4 ? 1 : 0, duration: 0.45, ease: "power3.inOut" }, TODOS + i * 0.22);
        tl.to(m, { opacity: 0, duration: 0.1 }, TODOS + i * 0.22 + 0.42);
        if (i < 4) tl.to(qa(".@-fila")[i], { opacity: 1, duration: 0.15 }, TODOS + i * 0.22 + 0.38);
      });
      oculto(qa(".@-ok"));
      qa(".@-ok").forEach((o, i) => pop(o, LUGAR + i * 0.08, 0.3));
      golpe(LUGAR + 0.05, 8);
      // "compraron": la fila de Rodrigo se despliega; "prometiste": la de Gabriela
      gsap.set([q(".@-x1"), q(".@-x2")], { opacity: 0 });
      tl.to(q(".@-f2 .@-es"), { opacity: 0, duration: 0.1 }, COMPRARON - 0.1);
      tl.fromTo(q(".@-x2"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, COMPRARON - 0.05);
      tl.fromTo(q(".@-f2"), { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, COMPRARON);
      tl.to(q(".@-f1 .@-es"), { opacity: 0, duration: 0.1 }, PROMETISTE - 0.2);
      tl.fromTo(q(".@-x1"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, PROMETISTE - 0.15);
      tl.fromTo(q(".@-f1"), { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, PROMETISTE);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.25 }, { t: 1.05, sfx: "sparkle", vol: 0.3 }, { t: 2.45, sfx: "whoosh-short", vol: 0.25 }, { t: 3.0, sfx: "whoosh-short", vol: 0.25 }, { t: 3.9, sfx: "click", vol: 0.35 }, { t: 4.9, sfx: "pop", vol: 0.3 }, { t: 5.9, sfx: "chime", vol: 0.3 }],
});

// ---------- s12 ----------
const PASOS = ["Consultó", "Presupuesto", "Compró", "Volver a escribir"];
escena("s12-aviso", 6.7, {
  css: `
    $ .@-cel { left: 290px; top: 590px; width: 500px; height: 920px; }
    $ .@-hora { position: absolute; left: 0; right: 0; top: 80px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 300; font-size: 120px; line-height: 1; color: #fff7f4; }
    $ .@-dia { position: absolute; left: 0; right: 0; top: 210px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; color: #b9a8d6; }
    $ .@-noti { position: absolute; left: 22px; right: 22px; top: 270px; height: 240px; border-radius: 30px; background: #fff7f4; }
    $ .@-noti .cam { position: absolute; left: 22px; top: 24px; width: 76px; height: 76px; border-radius: 50%; background: #5ce611; }
    $ .@-noti .cam svg { width: 76px; height: 76px; }
    $ .@-noti .tt { position: absolute; left: 116px; top: 22px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; color: #1a0d2b; opacity: 0.7; }
    $ .@-noti .tx { position: absolute; left: 116px; top: 58px; right: 20px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; line-height: 1.18; color: #1a0d2b; }
    $ .@-paso { position: absolute; left: 110px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; color: #fff7f4; }
    $ .@-pt { position: absolute; left: 50px; width: 40px; height: 40px; border-radius: 50%; border: 5px solid #b9a8d6; background: #120820; }
    $ .@-pt i { position: absolute; inset: 4px; border-radius: 50%; background: #5ce611; }
    $ .@-linea { position: absolute; left: 68px; top: 590px; width: 5px; height: 250px; background: #b9a8d6; opacity: 0.5; }
    $ .@-mem { position: absolute; left: 0; right: 0; top: 1525px; text-align: center; color: #5ce611; font-size: 34px; }
  `,
  body: `
        <div class="cel @-cel"><div class="barra"></div>
          <div class="@-hora">09:00</div>
          <div class="@-dia">MARTES</div>
          <div class="@-linea"></div>
          ${PASOS.map((p, i) => `<div class="@-pt @-pt${i}" style="top:${574 + i * 84}px"><i></i></div><div class="@-paso @-ps${i}" style="top:${570 + i * 84}px">${p}</div>`).join("")}
          <div class="@-noti">
            <div class="cam"><svg viewBox="0 0 76 76" aria-hidden="true"><path d="M38 18 Q24 18 24 34 V46 L18 54 H58 L52 46 V34 Q52 18 38 18 Z M32 58 Q38 66 44 58" fill="none" stroke="#1a0d2b" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" /></svg></div>
            <div class="tt">CRM · AHORA</div>
            <div class="tx">Escribile a Gabriela: le prometiste el precio.</div>
          </div>
        </div>
        <svg class="@-cerebro" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(180 700)">
            <path class="gl @-l" d="M0 -40 Q-20 -80 -60 -66 Q-100 -70 -104 -30 Q-130 -10 -116 24 Q-124 60 -84 70 Q-70 100 -30 90 Q-10 104 0 80 Q10 104 30 90 Q70 100 84 70 Q124 60 116 24 Q130 -10 104 -30 Q100 -70 60 -66 Q20 -80 0 -40 Z" />
            <path class="gl @-l" d="M0 -40 V80 M-60 -30 Q-40 -10 -60 20 M60 -30 Q40 -10 60 20 M-90 30 Q-60 40 -40 60 M90 30 Q60 40 40 60" style="stroke-width:5" />
          </g>
        </svg>
        <div class="mono @-mem">TU MEMORIA · EN LA PANTALLA</div>`,
  js: `
      const ESCRIBIRLE = 1.18, AVISO = 1.91, CADA = 2.82, SEGUI = 3.63, MEMORIA = 4.72, PANTALLA = 5.54;
      entra(q(".@-cel"), 0, { y: 60 });
      oculto([q(".@-linea"), ...qa(".@-pt"), ...qa(".@-paso")]);
      // la notificación baja con su campanita
      gsap.set(q(".@-noti"), { opacity: 0 });
      tl.fromTo(q(".@-noti"), { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, AVISO - 0.2);
      tl.to(q(".@-noti .cam"), { rotation: 18, duration: 0.07, yoyo: true, repeat: 7, ease: "sine.inOut" }, AVISO + 0.1);
      tl.fromTo(q(".@-hora"), { opacity: 1 }, { opacity: 0.5, duration: 0.3, immediateRender: false }, AVISO);
      golpe(AVISO + 0.05, 8);
      // la tira de seguimiento se completa
      tl.to(q(".@-linea"), { opacity: 0.5, duration: 0.2 }, CADA);
      qa(".@-pt").forEach((p, i) => { tl.to(p, { opacity: 1, duration: 0.15 }, CADA + i * 0.1); entra(qa(".@-paso")[i], CADA + i * 0.1, { x: 30, y: 0 }); });
      qa(".@-pt i").forEach((d, i) => { gsap.set(d, { scale: 0 }); tl.to(d, { scale: 1, duration: 0.25, ease: "back.out(2)" }, SEGUI - 0.3 + i * 0.22); });
      tl.to(q(".@-ps3"), { color: "#5ce611", duration: 0.2 }, SEGUI + 0.4);
      // "tu memoria": el cerebrito entra al celular
      dibujar(qa(".@-l"), MEMORIA - 0.2, 0.5);
      tl.fromTo(q(".@-cerebro"), { x: 0, y: 0, scale: 1 }, { x: 360, y: 40, scale: 0.6, svgOrigin: "180 700", duration: 0.6, ease: "power2.inOut", immediateRender: false }, PANTALLA - 0.45);
      tl.to(q(".@-cerebro"), { opacity: 0, duration: 0.15 }, PANTALLA + 0.1);
      tl.fromTo(q(".@-cel"), { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, PANTALLA + 0.1);
      entra(q(".@-mem"), PANTALLA - 0.2);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2 }, { t: 1.75, sfx: "notification", vol: 0.4 }, { t: 1.9, sfx: "ping", vol: 0.3 }, { t: 3.35, sfx: "click-soft", vol: 0.3 }, { t: 3.57, sfx: "click-soft", vol: 0.3 }, { t: 3.79, sfx: "click-soft", vol: 0.3 }, { t: 4.01, sfx: "chime", vol: 0.3 }, { t: 5.2, sfx: "sparkle", vol: 0.3 }],
});

// ---------- s13 ----------
escena("s13-respuesta", 4.57, {
  css: `
    $ .@-chat { position: absolute; left: 90px; top: 590px; width: 900px; height: 900px; border: 5px solid #fff7f4; border-radius: 44px; background: #120820; overflow: hidden; }
    $ .@-cab { position: absolute; left: 0; right: 0; top: 0; height: 130px; border-bottom: 3px solid rgba(185, 168, 214, 0.4); }
    $ .@-cab .av { position: absolute; left: 30px; top: 20px; width: 90px; height: 90px; border-radius: 50%; background: #ff5a6e; overflow: hidden; }
    $ .@-cab .av svg { position: absolute; left: -10px; top: 0; width: 110px; height: 100px; }
    $ .@-cab b { position: absolute; left: 140px; top: 26px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: #fff7f4; }
    $ .@-cab span { position: absolute; left: 142px; top: 80px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: #5ce611; }
    $ .@-vieja { position: absolute; right: 30px; top: 160px; font-size: 32px; padding: 14px 22px; opacity: 0.45; }
    $ .@-vieja s { text-decoration-color: #ff5a6e; text-decoration-thickness: 5px; }
    $ .@-hoy { position: absolute; left: 0; right: 0; top: 300px; text-align: center; color: #5ce611; font-size: 28px; }
    $ .@-yo { right: 30px; top: 360px; width: 640px; font-size: 40px; }
    $ .@-ella { left: 30px; top: 640px; font-size: 46px; }
    $ .@-reac { position: absolute; left: 380px; top: 1295px; width: 100px; height: 100px; }
  `,
  body: `
        <div class="@-chat">
          <div class="@-cab"><div class="av">${AV.gabriela}</div><b>Gabriela</b><span>EN LÍNEA</span></div>
          <div class="burbuja yo @-vieja"><s>te lo paso mañana</s> · 12 ENE</div>
          <div class="mono @-hoy">HOY</div>
          <div class="burbuja yo @-yo">¡Hola, Gabriela! Llegaron los lentes de sol que querías. ¿Te los guardo?<small>09:02 &nbsp;<svg style="position:static;width:60px;height:26px;vertical-align:middle" viewBox="0 0 60 26">${TILDES(4, 6, "gl")}</svg></small></div>
          <div class="burbuja ella @-ella">¡Al fin! ¿Me los guardás?</div>
        </div>
        <svg class="@-reac" viewBox="-170 -150 340 340" aria-hidden="true"><path class="cf" d="${CORAZON}" style="stroke:#fff7f4;stroke-width:16" /></svg>`,
  js: `
      const LE = 0.6, GAB = 1.14, ALFIN = 2.19, GUARDAS = 3.39;
      entra(q(".@-chat"), 0, { y: 50 });
      entra(q(".@-hoy"), 0.3);
      gsap.set([q(".@-yo"), q(".@-ella")], { opacity: 0 });
      tl.fromTo(q(".@-yo"), { opacity: 0, y: 120, scale: 0.8, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, LE);
      tl.fromTo(q(".@-yo small"), { opacity: 0 }, { opacity: 0.8, duration: 0.15, immediateRender: false }, GAB);
      tl.fromTo(q(".@-yo small svg"), { scale: 0.3 }, { scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, GAB);
      tl.fromTo(q(".@-ella"), { opacity: 0, y: 120, scale: 0.8, transformOrigin: "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, ALFIN - 0.15);
      golpe(ALFIN + 0.1, 8);
      gsap.set(q(".@-reac"), { opacity: 0 });
      tl.fromTo(q(".@-reac"), { opacity: 0, scale: 0.2, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.5)", immediateRender: false }, GUARDAS);
      late(q(".@-reac"), GUARDAS + 0.4, 2, 1.2);`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.2 }, { t: 0.6, sfx: "whoosh-short", vol: 0.3 }, { t: 1.14, sfx: "click", vol: 0.3 }, { t: 2.05, sfx: "notification", vol: 0.4 }, { t: 3.39, sfx: "pop", vol: 0.35 }],
});

// ---------- s14 ----------
const LLUVIA = [[120, 0, "cf"], [300, 0.2, "bf"], [470, 0.05, "cf"], [640, 0.3, "cf"], [820, 0.12, "bf"], [960, 0.25, "cf"], [210, 0.45, "cf"], [740, 0.5, "bf"], [560, 0.6, "cf"], [900, 0.65, "cf"]];
escena("s14-cta", 8.37, {
  css: `
    $ .@-match { top: 610px; font-size: 220px; font-style: italic; color: #ff5a6e; text-shadow: 0 0 50px rgba(255, 90, 110, 0.75), 0 10px 0 #1a0d2b; }
    $ .@-a { position: absolute; top: 960px; width: 260px; height: 260px; border-radius: 50%; border: 8px solid #fff7f4; overflow: hidden; background: #ff5a6e; }
    $ .@-a.v { background: #9b6bff; }
    $ .@-a svg { position: absolute; left: -30px; top: -10px; width: 320px; height: 292px; }
    $ .@-cm { position: absolute; left: 470px; top: 1030px; width: 140px; height: 140px; }
    $ .@-cuantos { top: 620px; font-size: 100px; }
    $ .@-cuantos em { font-style: normal; color: #ff5a6e; }
    $ .@-tv { position: absolute; left: 420px; top: 880px; width: 240px; height: 110px; }
    $ .@-caja { position: absolute; left: 100px; top: 1050px; width: 880px; height: 120px; border-radius: 60px; border: 6px solid #fff7f4; background: #120820; }
    $ .@-caja span { position: absolute; left: 44px; top: 32px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 46px; line-height: 1; color: #fff7f4; white-space: nowrap; }
    $ .@-caja i { position: absolute; top: 28px; width: 6px; height: 62px; background: #ff5a6e; }
    $ .@-btn { position: absolute; left: 290px; top: 1220px; width: 500px; height: 130px; border-radius: 65px; background: #ff5a6e; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; line-height: 130px; color: #fff7f4; letter-spacing: 0.04em; box-shadow: 0 0 40px rgba(255, 90, 110, 0.55); }
    $ .@-gota { position: absolute; top: 520px; width: 60px; height: 60px; }
  `,
  body: `
        <div class="@-fase1 @-capa">
          <div class="gigante @-match">¡MATCH!</div>
          <div class="@-a @-a1" style="left:190px">${AV.gabriela}</div>
          <div class="@-a v @-a2" style="left:630px">${AV.dueno}</div>
          <svg class="@-cm" viewBox="-170 -150 340 340" aria-hidden="true"><path class="cf" d="${CORAZON}" style="stroke:#fff7f4;stroke-width:16" /></svg>
          ${LLUVIA.map(([x, , c], i) => `<svg class="@-gota @-g${i}" viewBox="-170 -150 340 340" style="left:${x}px" aria-hidden="true"><path class="${c}" d="${CORAZON}" /></svg>`).join("")}
        </div>
        <div class="@-fase2 @-capa">
          <div class="gigante @-cuantos">¿Cuántos tenés<br /><em>en visto?</em></div>
          <svg class="@-tv" viewBox="0 0 60 26" aria-hidden="true">${TILDES(4, 6)}</svg>
          <div class="@-caja"><span class="@-txt"></span><i class="@-cursor" style="left:44px"></i></div>
          <div class="@-btn">CONFESAR</div>
        </div>`,
  js: `
      const VOS = 1.14, CUANTOS = 1.74, VISTO = 2.85, CONF = 3.65;
      gsap.set(q(".@-match"), { opacity: 0 });
      tl.fromTo(q(".@-match"), { opacity: 0, scale: 2.2, rotation: -12 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.22, ease: "power4.in", immediateRender: false }, 0);
      golpe(0.22, 20);
      tl.to(q(".@-match"), { scale: 1.06, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      tl.fromTo(q(".@-a1"), { x: -500 }, { x: 0, duration: 0.35, ease: "back.out(1.3)" }, 0.05);
      tl.fromTo(q(".@-a2"), { x: 500 }, { x: 0, duration: 0.35, ease: "back.out(1.3)" }, 0.05);
      tl.to([q(".@-a1")], { x: 30, duration: 0.12, yoyo: true, repeat: 1 }, 0.4);
      tl.to([q(".@-a2")], { x: -30, duration: 0.12, yoyo: true, repeat: 1 }, 0.4);
      pop(q(".@-cm"), 0.4, 0.2);
      late(q(".@-cm"), 0.75, 2, 1.25);
      ${LLUVIA.map(([x, d], i) => `gsap.set(q(".@-g${i}"), { opacity: 0 }); tl.fromTo(q(".@-g${i}"), { opacity: 1, y: 0, rotation: 0 }, { y: 900, rotation: ${i % 2 ? 30 : -30}, duration: 1.1, ease: "power1.in", immediateRender: false }, ${(0.3 + d).toFixed(2)}); tl.to(q(".@-g${i}"), { opacity: 0, duration: 0.2 }, ${(1.2 + d).toFixed(2)});`).join("\n      ")}
      // fase 2: la pregunta y la caja de comentario
      tl.to(q(".@-fase1"), { opacity: 0, y: -80, duration: 0.25, ease: "power2.in" }, VOS - 0.1);
      gsap.set(q(".@-cuantos"), { opacity: 0 });
      tl.fromTo(q(".@-cuantos"), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out", immediateRender: false }, VOS + 0.05);
      gsap.set(q(".@-tv"), { opacity: 0 });
      tl.fromTo(q(".@-tv"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, VISTO - 0.05);
      golpe(VISTO, 10);
      entra(q(".@-caja"), CONF - 0.2);
      pop(q(".@-btn"), CONF + 0.1, 0.6);
      const TXT = "yo tengo... unos cuantos";
      const c = { n: 0 };
      tl.to(c, { n: TXT.length, duration: 1.6, ease: "none", onUpdate: () => { const s = TXT.slice(0, Math.round(c.n)); q(".@-txt").textContent = s; gsap.set(q(".@-cursor"), { x: q(".@-txt").offsetWidth + 6 }); } }, CONF + 0.3);
      tl.to(q(".@-cursor"), { opacity: 0, duration: 0.25, yoyo: true, repeat: 15, ease: "steps(1)" }, CONF);
      for (let t = CONF + 0.6; t < DUR - 0.5; t += 0.8) tl.to(q(".@-btn"), { scale: 1.07, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);`,
  sfx: [{ t: 0.0, sfx: "impact-bass-2", vol: 0.45 }, { t: 0.1, sfx: "sparkle", vol: 0.4 }, { t: 0.45, sfx: "chime", vol: 0.3 }, { t: 1.5, sfx: "whoosh", vol: 0.25 }, { t: 2.85, sfx: "click", vol: 0.3 }, { t: 3.75, sfx: "pop", vol: 0.3 }, { t: 3.95, sfx: "typing", vol: 0.25, max: 1.5 }],
});
