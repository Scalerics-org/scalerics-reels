// Escenas s02 a s07. Correr desde reels/el-ascensor: node escenas/hacer.mjs
export const R = (cls, o, x = 300, y = 1540, s = 1.27) => "`<g class=\"" + cls + "\">${AS.ruben(" + x + ", " + y + ", " + s + ", " + JSON.stringify(o) + ")}</g>`";
export const V = (cls, o, x = 800, y = 1540, s = 1.22) => "`<g class=\"" + cls + "\">${AS.valeria(" + x + ", " + y + ", " + s + ", " + JSON.stringify(o) + ")}</g>`";

export default [
  {
    id: "s02-placard",
    css: `& .s02-abril { left: 600px; top: 640px; font-size: 64px; }`,
    html: `<div class="as-sello s02-abril">ABRIL</div>`,
    svg: [`\`<g class="s02-pl">\${AS.placard(330, 1010, 0.72)}</g>\``, V("s02-v", { cara: "ceja" }), R("s02-r", { cara: "sorpresa", sudor: true }),
      `\`<g class="s02-notas">\${AS.nota(880, 700, 1, AS.NAR, "s02-n")}\${AS.nota(160, 640, 0.9, AS.AMBAR, "s02-n")}</g>\``].join(" + "),
    js: `
      const RUBEN = 0, PLACARD = 1.13, ABRIL = 2.18;
      K.respirar(q(".s02-r"), 0, DUR, 5);
      K.respirar(q(".s02-v"), 0, DUR, 3);
      K.sudar(0.2, DUR - 0.2);
      // ella gira la cabeza de a poco: el nombre, el mueble, el mes
      const vv = q(".s02-v");
      tl.fromTo(vv, { rotation: 3 }, { rotation: -2, svgOrigin: "800 1540", duration: 0.5, ease: "power2.out" }, RUBEN);
      K.hablar(".s02-v .as-v-boca", RUBEN + 0.05, 2, 0.1);
      K.hablar(".s02-v .as-v-boca", PLACARD, 2, 0.1);
      K.hablar(".s02-v .as-v-boca", ABRIL, 2, 0.1);
      const pl = q(".s02-pl");
      K.popSvg(pl, PLACARD - 0.05, "330 1010", 0.4, 0.4);
      tl.to(pl, { rotation: -3, svgOrigin: "330 1010", duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, PLACARD + 0.4);
      K.sello(q(".s02-abril"), ABRIL, 6);
      K.sacudon(q(".s02-r"), ABRIL + 0.02, 0.7);
      K.flotarNotas(".s02-n", 0, 1.6);
      K.parpadear(".s02-r .as-r-ojos", [1.6, 2.9]);
    `,
    sfx: [{ t: 1.1, sfx: "pop", vol: 0.28 }, { t: 2.12, sfx: "golpe", vol: 0.4 }, { t: 2.3, sfx: "tic", vol: 0.25 }],
  },
  {
    id: "s03-justo",
    css: ``,
    html: ``,
    svg: ["['NOVIEMBRE','OCTUBRE','SETIEMBRE','AGOSTO','JULIO','JUNIO','MAYO','ABRIL'].map((m, i) => `<g class=\"s03-hoja s03-h${i}\">${AS.calendario(540, 820, 1.05, m, { fsMes: m.length > 7 ? 36 : 44 })}</g>`).join('')",
      V("s03-v1", { cara: "seria" }), V("s03-v2", { cara: "ceja" }),
      R("s03-r1", { cara: "nervioso", brazo: "celular", sudor: true }), R("s03-r2", { cara: "triste", sudor: true })].join(" + "),
    js: `
      const JUSTO = 0.85, LLAMAR = 2.25, ESTAMOS = 2.98, NOV = 3.42, RUBEN = 3.85;
      K.respirar(q(".s03-r1"), 0, DUR, 6);
      K.respirar(q(".s03-r2"), 0, DUR, 4);
      K.respirar(q(".s03-v1"), 0, DUR, 3);
      K.sudar(0.1, DUR - 0.1);
      gsap.set(qa(".s03-r2, .s03-v2"), { opacity: 0 });
      // el celular aparece en "justo": hace que llama
      const cel = q(".s03-r1 .as-r-brazo");
      K.popSvg(cel, JUSTO - 0.1, "300 1290", 0.35, 0.5);
      K.hablar(".s03-r1 .as-r-boca", 0.05, 8, 0.1);
      tl.fromTo(q(".s03-r1 .as-cel"), { rotation: -8 }, { rotation: 8, duration: 0.08, yoyo: true, repeat: 9, ease: "none", svgOrigin: "10 -250", immediateRender: false }, LLAMAR);
      // el calendario: aparece en abril y vuelan las hojas hasta noviembre
      const hojas = qa(".s03-hoja");
      gsap.set(hojas, { opacity: 0 });
      hojas.forEach((h) => tl.set(h, { opacity: 1 }, ESTAMOS - 0.3));
      K.popSvg(q(".s03-h7"), ESTAMOS - 0.3, "540 820", 0.3, 0.6);
      [7, 6, 5, 4, 3, 2, 1].forEach((i, k) => {
        const t = ESTAMOS + 0.05 + k * ((NOV - ESTAMOS - 0.05) / 7);
        tl.to(q(".s03-h" + i), { y: -380, x: k % 2 ? 160 : -160, rotation: k % 2 ? 25 : -25, opacity: 0, duration: 0.3, ease: "power2.in", svgOrigin: "540 650" }, t);
      });
      K.sacudon(q(".s03-h0"), NOV, 1);
      tl.set(q(".s03-v1"), { opacity: 0 }, ESTAMOS);
      tl.set(q(".s03-v2"), { opacity: 1 }, ESTAMOS);
      K.hablar(".s03-v2 .as-v-boca", ESTAMOS, 6, 0.1);
      tl.set(q(".s03-r1"), { opacity: 0 }, RUBEN);
      tl.set(q(".s03-r2"), { opacity: 1 }, RUBEN);
      tl.fromTo(q(".s03-r2"), { scale: 1 }, { scale: 0.94, svgOrigin: "300 1540", duration: 0.5, ease: "power2.out", immediateRender: false }, RUBEN);
    `,
    sfx: [{ t: 0.85, sfx: "pop", vol: 0.25 }, { t: 2.25, sfx: "vibra", vol: 0.25, max: 0.7 }, { t: 3.0, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 3.42, sfx: "golpe", vol: 0.42 }, { t: 3.9, sfx: "uuh", vol: 0.16, max: 0.9 }],
  },
  {
    id: "s04-post-it",
    css: `& .s04-preg { left: 800px; top: 600px; font-size: 200px; }`,
    html: `<div class="as-titulo rojo s04-preg">?</div>`,
    svg: [V("s04-v1", { cara: "seria" }), V("s04-v2", { cara: "ceja" }), R("s04-r1", { cara: "orgullo", brazo: "postit", postit: ["Llamar a", "la del", "placard"] })].join(" + "),
    js: `
      const ANOTADO = 0.5, POSTIT = 1.5, Y = 2.42, PREG = 2.77;
      K.respirar(q(".s04-r1"), 0, DUR, 5);
      K.respirar(q(".s04-v1"), 0, DUR, 3);
      gsap.set(q(".s04-v2"), { opacity: 0 });
      const br = q(".s04-r1 .as-r-brazo");
      gsap.set(br, { svgOrigin: "170 -150", smoothOrigin: false });
      tl.fromTo(br, { rotation: 40, opacity: 0 }, { rotation: 0, opacity: 1, duration: 0.35, ease: "back.out(2)", svgOrigin: "170 -150", immediateRender: false }, ANOTADO - 0.2);
      const post = q(".s04-r1 .as-r-post");
      tl.fromTo(post, { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", svgOrigin: "250 -560", immediateRender: false }, POSTIT);
      tl.to(post, { rotation: 6, svgOrigin: "250 -560", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, POSTIT + 0.3);
      K.hablar(".s04-r1 .as-r-boca", 0.02, 6, 0.1);
      tl.set(q(".s04-v1"), { opacity: 0 }, Y);
      tl.set(q(".s04-v2"), { opacity: 1 }, Y);
      K.hablar(".s04-v2 .as-v-boca", Y, 3, 0.1);
      K.sello(q(".s04-preg"), PREG, 8);
      tl.to(q(".s04-preg"), { y: -12, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, PREG + 0.3);
    `,
    sfx: [{ t: 0.35, sfx: "whoosh-short", vol: 0.2 }, { t: 1.5, sfx: "pop", vol: 0.28 }, { t: 2.72, sfx: "tic", vol: 0.35 }, { t: 2.8, sfx: "impact-bass-1", vol: 0.22 }],
  },
  {
    id: "s05-cinco-chats",
    css: `
      & .s05-chat { position: absolute; width: 330px; height: 104px; background: #fff6e3; border: 6px solid #14181d; border-radius: 22px; box-shadow: 6px 6px 0 rgba(0,0,0,0.25); }
      & .s05-chat i { position: absolute; left: 16px; top: 18px; width: 58px; height: 58px; border-radius: 50%; background: #b8c0c8; border: 4px solid #14181d; }
      & .s05-chat b { position: absolute; left: 88px; top: 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 28px; color: #14181d; white-space: nowrap; }
      & .s05-chat small { position: absolute; left: 88px; top: 56px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; color: #6b7580; white-space: nowrap; }
      & .s05-chat em { position: absolute; right: -14px; top: -14px; min-width: 46px; height: 46px; padding: 0 8px; box-sizing: border-box; border-radius: 23px; background: #e5303a; border: 4px solid #14181d; font-family: "Lexend", sans-serif; font-weight: 800; font-style: normal; font-size: 22px; line-height: 38px; text-align: center; color: #fff6e3; }
      & .s05-cinco { left: 330px; top: 1050px; font-size: 52px; }
    `,
    html: `
      <div class="s05-chat s05-c0" style="left:70px;top:610px"><i></i><b>FAMILIA</b><small>audio de 4 min</small><em>99</em></div>
      <div class="s05-chat s05-c1" style="left:680px;top:620px"><i></i><b>PROVEEDORES</b><small>llegó la madera</small><em>12</em></div>
      <div class="s05-chat s05-c2" style="left:120px;top:760px"><i></i><b>FÚTBOL 5</b><small>¿quién trae pelota?</small><em>47</em></div>
      <div class="s05-chat s05-c3" style="left:620px;top:780px"><i></i><b>CLIENTES</b><small>¿y el presupuesto?</small><em>8</em></div>
      <div class="s05-chat s05-c4" style="left:330px;top:910px"><i></i><b>CLIENTES 2</b><small>¿Valeria? ¿cuál?</small><em>23</em></div>
      <div class="as-sello s05-cinco">UNO DE LOS CINCO</div>
    `,
    svg: [`\`<g class="s05-vuela">\${AS.postit(620, 830, 6, ["Llamar a", "la del", "placard"], { w: 210, fs: 40 })}</g>\``,
      V("s05-v", { cara: "seria" }), R("s05-r", { cara: "culpa", brazo: "celular", sudor: true })].join(" + "),
    js: `
      const PERDIO = 0.08, DESPUES = 1.13, CHAT = 2.17, UNO = 2.83, CINCO = 3.17;
      K.respirar(q(".s05-r"), 0, DUR, 5);
      K.respirar(q(".s05-v"), 0, DUR, 3);
      K.sudar(0.1, DUR - 0.1);
      // el post-it se va volando
      tl.to(q(".s05-vuela"), { x: -720, y: 260, rotation: -220, svgOrigin: "620 830", duration: 0.9, ease: "power2.in" }, PERDIO);
      tl.to(q(".s05-vuela"), { opacity: 0, duration: 0.1 }, PERDIO + 0.85);
      K.hablar(".s05-r .as-r-boca", 0.05, 12, 0.11);
      // los cinco chats se despliegan del celular
      ["s05-c0", "s05-c1", "s05-c2", "s05-c3", "s05-c4"].forEach((c, i) => {
        const el = q("." + c);
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scale: 0.4, y: 260, rotation: i % 2 ? 8 : -8 }, { opacity: 1, scale: 1, y: 0, rotation: i % 2 ? 2 : -2, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, DESPUES + i * 0.22);
        tl.to(el, { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, CHAT + i * 0.1);
      });
      tl.to(qa(".s05-c0, .s05-c1, .s05-c2, .s05-c3"), { opacity: 0.45, duration: 0.2 }, UNO);
      tl.fromTo(q(".s05-c4"), { scale: 1 }, { scale: 1.12, duration: 0.2, ease: "back.out(2)", immediateRender: false }, UNO);
      K.sello(q(".s05-cinco"), CINCO, -5);
    `,
    sfx: [{ t: 0.1, sfx: "whoosh", vol: 0.25, max: 0.6 }, { t: 1.13, sfx: "notification", vol: 0.22 }, { t: 1.35, sfx: "pop", vol: 0.2 }, { t: 1.57, sfx: "pop", vol: 0.2 }, { t: 1.79, sfx: "pop", vol: 0.2 }, { t: 2.0, sfx: "notification", vol: 0.2 }, { t: 3.12, sfx: "golpe", vol: 0.38 }],
  },
  {
    id: "s06-cocina",
    css: `
      & .s06-op { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: #fff6e3; background: #14181d; padding: 6px 18px; border-radius: 10px; white-space: nowrap; }
      & .s06-esa { left: 70px; top: 900px; font-size: 52px; }
    `,
    html: `
      <div class="s06-op s06-oa" style="left:200px;top:590px">A · PLACARD</div>
      <div class="s06-op s06-ob" style="left:630px;top:590px">B · COCINA</div>
      <div class="as-sello s06-esa">LA DEL PLACARD</div>
    `,
    svg: [`\`<g class="s06-pl">\${AS.placard(330, 1010, 0.62)}</g><g class="s06-co">\${AS.cocina(760, 1010, 0.9)}</g>\``,
      `\`<path class="s06-x" d="M640 690 L880 990 M880 690 L640 990" fill="none" stroke="\${AS.ROJO}" stroke-width="30" stroke-linecap="round"/><ellipse class="s06-circ" cx="330" cy="830" rx="200" ry="215" fill="none" stroke="\${AS.ROJO}" stroke-width="14"/>\``,
      V("s06-v1", { cara: "seria" }), V("s06-v2", { cara: "ceja" }),
      R("s06-r1", { cara: "duda", sudor: true }), R("s06-r2", { cara: "nervioso", brazo: "senala", sudor: true }), R("s06-r3", { cara: "triste", sudor: true })].join(" + "),
    js: `
      const PLACARD = 1.17, COCINA = 2.5, LA = 3.28, PLAC2 = 3.71, RUBEN = 4.15;
      ["s06-r1", "s06-r2", "s06-r3", "s06-v1", "s06-v2"].forEach((c) => K.respirar(q("." + c), 0, DUR, 4));
      K.sudar(0.1, DUR - 0.1);
      gsap.set(qa(".s06-r2, .s06-r3, .s06-v2"), { opacity: 0 });
      K.hablar(".s06-r1 .as-r-boca", 0.02, 5, 0.11);
      K.popSvg(q(".s06-pl"), PLACARD - 0.05, "330 1010", 0.35, 0.4);
      K.pop(q(".s06-oa"), PLACARD + 0.05);
      K.popSvg(q(".s06-co"), COCINA - 0.1, "760 1010", 0.35, 0.4);
      K.pop(q(".s06-ob"), COCINA);
      gsap.set(q(".s06-r2 .as-r-brazo"), { rotation: -38, svgOrigin: "170 -150" });
      tl.set(q(".s06-r1"), { opacity: 0 }, COCINA - 0.1);
      tl.set(q(".s06-r2"), { opacity: 1 }, COCINA - 0.1);
      K.hablar(".s06-r2 .as-r-boca", COCINA - 0.1, 3, 0.1);
      // ella corrige: X roja sobre la cocina, círculo sobre el placard
      tl.set(q(".s06-v1"), { opacity: 0 }, LA);
      tl.set(q(".s06-v2"), { opacity: 1 }, LA);
      K.hablar(".s06-v2 .as-v-boca", LA, 5, 0.1);
      K.dibujar(q(".s06-x"), LA, 0.3);
      tl.to(qa(".s06-co, .s06-ob"), { opacity: 0.4, duration: 0.2 }, LA + 0.2);
      K.dibujar(q(".s06-circ"), PLAC2, 0.45);
      K.sello(q(".s06-esa"), PLAC2 + 0.1, -4);
      tl.set(q(".s06-r2"), { opacity: 0 }, RUBEN);
      tl.set(q(".s06-r3"), { opacity: 1 }, RUBEN);
    `,
    sfx: [{ t: 1.15, sfx: "pop", vol: 0.25 }, { t: 2.45, sfx: "pop", vol: 0.25 }, { t: 3.28, sfx: "buzzer", vol: 0.3 }, { t: 3.75, sfx: "golpe", vol: 0.35 }],
  },
  {
    id: "s07-emergencias",
    css: `
      & .s07-ficha { position: absolute; left: 470px; top: 590px; width: 540px; height: 430px; background: #14181d; border: 6px solid #ffd166; border-radius: 22px; box-shadow: 8px 8px 0 rgba(0,0,0,0.3); }
      & .s07-ficha h3 { position: absolute; left: 30px; top: 22px; margin: 0; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.16em; color: #ffd166; white-space: nowrap; }
      & .s07-fila { position: absolute; left: 30px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: #fff6e3; white-space: nowrap; }
      & .s07-fila small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; letter-spacing: 0.14em; color: #b8c0c8; }
      & .s07-barra { position: absolute; left: 30px; top: 380px; width: 480px; height: 18px; border-radius: 9px; background: #3a2410; overflow: hidden; }
      & .s07-barra i { position: absolute; left: 0; top: 0; width: 480px; height: 18px; background: #ffd166; transform-origin: 0 50%; }
    `,
    html: `
      <div class="s07-ficha">
        <h3>EMERGENCIAS · FICHA</h3>
        <div class="s07-fila s07-f1" style="top:70px"><small>PASAJERA</small>SRA. VALERIA</div>
        <div class="s07-fila s07-f2" style="top:170px"><small>VA AL</small>PISO 7</div>
        <div class="s07-fila s07-f3" style="top:270px"><small>TÉCNICO</small>EN CAMINO</div>
        <div class="s07-barra"><i></i></div>
      </div>
    `,
    svg: [`\`<g class="s07-int">\${AS.parlante(250, 800, 1.05)}</g><g class="s07-ondas"><path d="M400 720 Q440 800 400 880" fill="none" stroke="\${AS.AMBAR}" stroke-width="12" stroke-linecap="round"/><path d="M430 680 Q490 800 430 920" fill="none" stroke="\${AS.AMBAR}" stroke-width="12" stroke-linecap="round"/></g>\``,
      V("s07-v", { cara: "mira" }, 800, 1600, 1.12), R("s07-r", { cara: "sorpresa", sudor: true }, 310, 1600, 1.15)].join(" + "),
    js: `
      const EMERG = 0, VALERIA = 1.31, PISO = 2.02, FICHA = 3.7, TECNICO = 4.47, CAMINO = 5.39;
      K.respirar(q(".s07-r"), 0, DUR, 4);
      K.respirar(q(".s07-v"), 0, DUR, 3);
      K.sudar(0.1, DUR - 0.1);
      K.popSvg(q(".s07-int"), 0, "250 800", 0.35, 0.6);
      const led = q(".s07-int .as-int-led");
      tl.fromTo(led, { opacity: 1 }, { opacity: 0.2, duration: 0.15, yoyo: true, repeat: Math.floor(DUR / 0.3) * 2 - 1, ease: "steps(1)" }, 0);
      qa(".s07-ondas path").forEach((p, i) => tl.fromTo(p, { opacity: 0.1 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: Math.floor(DUR / 0.4) * 2 - 1, ease: "sine.inOut" }, i * 0.2));
      const ficha = q(".s07-ficha");
      gsap.set(ficha, { opacity: 0 });
      tl.fromTo(ficha, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, 0.6);
      [[".s07-f1", VALERIA], [".s07-f2", PISO], [".s07-f3", TECNICO]].forEach(([s, t]) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, t);
      });
      tl.fromTo(ficha, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, FICHA);
      tl.fromTo(q(".s07-barra i"), { scaleX: 0 }, { scaleX: 0.75, duration: CAMINO - TECNICO + 0.6, ease: "power1.out" }, TECNICO);
      // los dos miran el parlante
      const cabR = q(".s07-r .as-r-cabeza");
      tl.fromTo(cabR, { rotation: 0 }, { rotation: -8, svgOrigin: "0 -260", duration: 0.4, ease: "power2.out" }, 0.2);
      tl.fromTo(q(".s07-v"), { rotation: 0 }, { rotation: -3, svgOrigin: "800 1600", duration: 0.4, ease: "power2.out" }, VALERIA);
    `,
    sfx: [{ t: 0, sfx: "estatica", vol: 0.25, max: 0.6 }, { t: 0.6, sfx: "whoosh-short", vol: 0.2 }, { t: 1.31, sfx: "click", vol: 0.3 }, { t: 2.02, sfx: "click", vol: 0.3 }, { t: 3.7, sfx: "ping", vol: 0.25 }, { t: 4.47, sfx: "click", vol: 0.3 }],
  },
];
