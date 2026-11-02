// Escenas s08 a s14. Correr desde reels/el-ascensor: node escenas/hacer.mjs
import { R, V } from "./a.mjs";

export default [
  {
    id: "s08-como-saben",
    css: `& .s08-anot { left: 430px; top: 610px; font-size: 30px; }`,
    html: `<div class="as-tag ambar s08-anot">ANOTADO · EN LA FICHA</div>`,
    svg: [`\`<g class="s08-int">\${AS.parlante(820, 860, 0.85)}</g><g class="s08-ondas"><path d="M680 800 Q650 860 680 920" fill="none" stroke="\${AS.AMBAR}" stroke-width="11" stroke-linecap="round"/><path d="M650 770 Q610 860 650 950" fill="none" stroke="\${AS.AMBAR}" stroke-width="11" stroke-linecap="round"/></g>\``,
      `\`<g class="s08-post">\${AS.postit(300, 800, -6, ["Valeria", "placard", "¿llamar?"], { w: 220, fs: 40 })}</g><path class="s08-x" d="M190 690 L410 910 M410 690 L190 910" fill="none" stroke="\${AS.ROJO}" stroke-width="26" stroke-linecap="round"/>\``,
      V("s08-v", { cara: "sonrisa" }), R("s08-r", { cara: "indignado", brazo: "senala", sudor: true })].join(" + "),
    js: `
      const SABEN = 0.58, ANOT = 1.62, SENOR = 2.08, NO = 2.77, POST = 3.08;
      K.respirar(q(".s08-r"), 0, DUR, 5);
      K.respirar(q(".s08-v"), 0, DUR, 3);
      K.sudar(0.1, DUR - 0.1);
      // Rubén señala el parlante, indignado
      gsap.set(q(".s08-r .as-r-brazo"), { rotation: -48, svgOrigin: "170 -150" });
      tl.fromTo(q(".s08-r .as-r-brazo"), { rotation: -20 }, { rotation: -48, svgOrigin: "170 -150", duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0.05);
      K.hablar(".s08-r .as-r-boca", 0.02, 5, 0.1);
      tl.fromTo(q(".s08-r .as-r-brazo"), { x: 0 }, { x: 10, duration: 0.08, yoyo: true, repeat: 5, ease: "none", immediateRender: false }, SABEN);
      K.popSvg(q(".s08-int"), 0, "820 860", 0.35, 0.6);
      const led = q(".s08-int .as-int-led");
      tl.fromTo(led, { opacity: 1 }, { opacity: 0.2, duration: 0.15, yoyo: true, repeat: 9, ease: "steps(1)", immediateRender: false }, ANOT);
      gsap.set(qa(".s08-ondas path"), { opacity: 0 });
      qa(".s08-ondas path").forEach((p, i) => tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, ANOT + i * 0.15));
      K.pop(q(".s08-anot"), ANOT);
      // el post-it de Rubén, tachado
      const post = q(".s08-post");
      K.popSvg(post, NO - 0.15, "300 800", 0.3, 0.5);
      K.dibujar(q(".s08-x"), POST, 0.3);
      K.sacudon(post, POST + 0.3, 0.6);
    `,
    sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: 1.62, sfx: "estatica", vol: 0.2, max: 0.4 }, { t: 1.7, sfx: "ping", vol: 0.22 }, { t: 2.65, sfx: "pop", vol: 0.25 }, { t: 3.08, sfx: "buzzer", vol: 0.28 }],
  },
  {
    id: "s09-enfrente",
    css: `
      & .s09-cel { position: absolute; left: 330px; top: 585px; width: 420px; height: 500px; background: #14181d; border-radius: 46px; }
      & .s09-pant { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 14px; background: #eef1f3; border-radius: 34px; overflow: hidden; }
      & .s09-cab { position: absolute; left: 0; right: 0; top: 0; height: 92px; background: #6b7580; }
      & .s09-cab i { position: absolute; left: 18px; top: 18px; width: 54px; height: 54px; border-radius: 50%; background: #c98a4b; border: 4px solid #14181d; }
      & .s09-cab b { position: absolute; left: 84px; top: 16px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 25px; color: #fff6e3; white-space: nowrap; }
      & .s09-cab small { position: absolute; left: 84px; top: 52px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; color: #dfe4e8; white-space: nowrap; }
      & .s09-llam { position: absolute; left: 18px; right: 18px; top: 112px; height: 84px; background: #fff6e3; border: 4px solid #14181d; border-radius: 18px; }
      & .s09-llam b { position: absolute; left: 84px; top: 12px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 26px; color: #14181d; white-space: nowrap; }
      & .s09-llam small { position: absolute; left: 84px; top: 46px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; color: #6b7580; white-space: nowrap; }
      & .s09-llam svg { position: absolute; left: 14px; top: 14px; width: 56px; height: 56px; }
      & .s09-glo { position: absolute; padding: 12px 18px; border: 4px solid #14181d; border-radius: 20px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 26px; line-height: 1.2; color: #14181d; }
      & .s09-g1 { left: 18px; top: 214px; width: 300px; background: #ffffff; }
      & .s09-g2 { right: 18px; top: 362px; background: #ffd84a; }
      & .s09-sello { left: 90px; top: 960px; font-size: 48px; }
    `,
    html: `
      <div class="s09-cel"><div class="s09-pant">
        <div class="s09-cab"><i></i><b>Carpintería de enfrente</b><small>en línea</small></div>
        <div class="s09-llam"><svg viewBox="0 0 56 56"><circle cx="28" cy="28" r="26" fill="#c98a4b" stroke="#14181d" stroke-width="4"/><path d="M18 16 Q16 30 28 38 Q36 44 40 40 L42 34 L35 30 L31 33 Q24 29 23 22 L26 19 L23 12 Z" fill="#fff6e3" stroke="#14181d" stroke-width="3" stroke-linejoin="round"/></svg><b>Llamada · 4 min</b><small>AL OTRO DÍA</small></div>
        <div class="s09-glo s09-g1">¡Hola, Valeria! ¿Quedó conforme con el placard?</div>
        <div class="s09-glo s09-g2">¡Divino! Gracias</div>
      </div></div>
      <div class="as-sello s09-sello">EL DE ENFRENTE</div>
    `,
    svg: [V("s09-v", { cara: "sonrisa", brazo: "celular" }, 810, 1600, 1.12), R("s09-r", { cara: "triste", sudor: true }, 300, 1600, 1.15)].join(" + "),
    js: `
      const PLAC = 0.34, ENFRENTE = 1.56, LLAMO = 2.52, DIA = 3.04, ESCRIBIO = 4.08, CONFORME = 5.3;
      K.respirar(q(".s09-r"), 0, DUR, 4);
      K.respirar(q(".s09-v"), 0, DUR, 3);
      K.sudar(0.1, DUR - 0.1);
      K.hablar(".s09-v .as-v-boca", 0.02, 22, 0.11);
      // ella levanta el celular y lo muestra
      const cel = q(".s09-cel");
      gsap.set(cel, { opacity: 0 });
      tl.fromTo(cel, { opacity: 0, y: 300, scale: 0.6, rotation: 8 }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, PLAC);
      gsap.set(q(".s09-cab"), { opacity: 0 });
      tl.to(q(".s09-cab"), { opacity: 1, duration: 0.2 }, ENFRENTE - 0.2);
      K.sello(q(".s09-sello"), ENFRENTE, -5);
      tl.to(q(".s09-sello"), { opacity: 0, duration: 0.2 }, LLAMO - 0.1);
      K.pop(q(".s09-llam"), LLAMO);
      tl.fromTo(q(".s09-llam svg"), { rotation: -12 }, { rotation: 12, duration: 0.07, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, LLAMO + 0.1);
      K.pop(q(".s09-g1"), ESCRIBIO);
      K.pop(q(".s09-g2"), CONFORME);
      // Rubén se achica
      tl.to(q(".s09-r"), { scale: 0.92, svgOrigin: "300 1600", duration: 1.2, ease: "power1.inOut" }, DIA);
    `,
    sfx: [{ t: 0.3, sfx: "whoosh", vol: 0.2, max: 0.5 }, { t: 1.5, sfx: "golpe", vol: 0.32 }, { t: 2.52, sfx: "vibra", vol: 0.3, max: 0.7 }, { t: 4.08, sfx: "notification", vol: 0.3 }, { t: 5.3, sfx: "notification", vol: 0.25 }],
  },
  {
    id: "s10-conforme",
    css: `
      & .s10-muy { left: 560px; top: 640px; font-size: 170px; }
      & .s10-sil { left: 230px; top: 1050px; }
    `,
    html: `<div class="as-titulo rojo s10-muy">MUY.</div><div class="as-tag s10-sil">SILENCIO INCÓMODO</div>`,
    svg: [V("s10-v1", { cara: "seria" }), V("s10-v2", { cara: "sonrisa" }), R("s10-r", { cara: "triste", sudor: true }),
      `\`<g>\${AS.nota(200, 820, 1, AS.NAR, "s10-n")}\${AS.nota(470, 760, 0.9, AS.AMBAR, "s10-n")}\${AS.nota(900, 900, 1.1, AS.NAR, "s10-n")}</g>\``].join(" + "),
    js: `
      const Y = 0, QUEDASTE = 0.66, MUY = 2.11;
      K.respirar(q(".s10-v1"), 0, DUR, 3);
      K.respirar(q(".s10-v2"), 0, DUR, 3);
      K.sudar(0, DUR);
      gsap.set(q(".s10-v2"), { opacity: 0 });
      // zoom lento sobre Rubén mientras pregunta con un hilo de voz
      const esc = q(".s10-escenario");
      gsap.set(esc, { transformOrigin: "30% 62%" });
      tl.fromTo(esc, { scale: 1 }, { scale: 1.25, duration: MUY - 0.1, ease: "power1.inOut" }, 0);
      K.hablar(".s10-r .as-r-boca", 0.05, 6, 0.12);
      // "Muy.": corte al plano de ella, sonriendo
      tl.set(esc, { transformOrigin: "74% 62%" }, MUY - 0.06);
      tl.fromTo(esc, { scale: 1.3 }, { scale: 1.18, duration: DUR - MUY, ease: "power1.out", immediateRender: false }, MUY - 0.05);
      tl.set(q(".s10-v1"), { opacity: 0 }, MUY - 0.05);
      tl.set(q(".s10-v2"), { opacity: 1 }, MUY - 0.05);
      K.sello(q(".s10-muy"), MUY + 0.05, -6);
      K.pop(q(".s10-sil"), MUY + 0.7);
      K.flotarNotas(".s10-n", MUY + 0.5, DUR - MUY - 0.5);
    `,
    sfx: [{ t: 0.1, sfx: "tic", vol: 0.2 }, { t: 2.1, sfx: "impact-bass-2", vol: 0.32 }, { t: 2.8, sfx: "uuh", vol: 0.18, max: 1.0 }],
  },
  {
    id: "s11-giro",
    css: `
      & .s11-tag { left: 300px; top: 600px; }
      & .s11-tranca { left: 470px; top: 960px; font-size: 54px; }
      & .s11-cli { position: absolute; left: 490px; top: 820px; width: 300px; height: 96px; background: #fff6e3; border: 5px solid #14181d; border-radius: 18px; }
      & .s11-cli i { position: absolute; left: 14px; top: 14px; width: 60px; height: 60px; border-radius: 50%; background: #e5303a; border: 4px solid #14181d; }
      & .s11-cli b { position: absolute; left: 86px; top: 12px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 28px; color: #14181d; white-space: nowrap; }
      & .s11-cli small { position: absolute; left: 86px; top: 50px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; color: #6b7580; white-space: nowrap; }
      & .s11-puerta { position: absolute; top: 790px; width: 150px; height: 160px; background: #b8c0c8; border: 5px solid #14181d; }
    `,
    html: `
      <div class="as-tag s11-tag">NO ES MAL VENDEDOR</div>
      <div class="s11-cli"><i></i><b>VALERIA</b><small>PLACARD · ABRIL</small></div>
      <div class="s11-puerta s11-pi" style="left:410px"></div><div class="s11-puerta s11-pd" style="left:730px"></div>
      <div class="as-sello s11-tranca">TRANCADA</div>
    `,
    svg: [`\`<g class="s11-nube"><path d="M140 1000 C80 990 70 900 140 880 C120 800 220 760 270 800 C300 730 420 730 450 790 C510 760 580 820 550 880 C610 900 600 990 530 1000 Z" fill="#fff6e3" stroke="#14181d" stroke-width="8"/><circle cx="250" cy="1050" r="20" fill="#fff6e3" stroke="#14181d" stroke-width="6"/><circle cx="270" cy="1100" r="12" fill="#fff6e3" stroke="#14181d" stroke-width="5"/></g>\``,
      "[[220,890],[300,850],[380,880],[460,900],[260,950],[340,940],[420,955]].map(([x,y],i)=>`<g class=\"s11-cara\"><circle cx=\"${x}\" cy=\"${y}\" r=\"26\" fill=\"${i%2?AS.ACE:AS.PIEL}\" stroke=\"${AS.INK}\" stroke-width=\"5\"/><circle cx=\"${x-8}\" cy=\"${y-4}\" r=\"4\" fill=\"${AS.INK}\"/><circle cx=\"${x+8}\" cy=\"${y-4}\" r=\"4\" fill=\"${AS.INK}\"/></g>`).join('')",
      `\`<g class="s11-posts">\${AS.postit(130, 1150, -12, ["¿Gómez?"], { w: 150, fs: 34 })}\${AS.postit(470, 1120, 10, ["llamar!!"], { w: 150, fs: 34 })}\${AS.postit(150, 1330, 8, ["presup."], { w: 140, fs: 34 })}</g>\``,
      R("s11-r", { cara: "culpa", sudor: true }, 300, 1560, 1.15)].join(" + "),
    js: `
      const VENDEDOR = 0.49, CABEZA = 2.3, POSTITS = 3.12, CHATS = 3.85, ALGUNO = 5.17, TRANCADO = 6.07;
      K.respirar(q(".s11-r"), 0, DUR, 5);
      K.sudar(0, DUR);
      K.pop(q(".s11-tag"), VENDEDOR);
      tl.to(q(".s11-tag"), { opacity: 0, duration: 0.2 }, CABEZA - 0.3);
      // la cabeza: una nube llena de clientes
      K.popSvg(q(".s11-nube"), CABEZA - 0.1, "340 900", 0.4, 0.3);
      qa(".s11-cara").forEach((c, i) => K.popSvg(c, CABEZA + i * 0.08, K.centro(c), 0.3, 0.2));
      // los post-its se le pegan alrededor
      qa(".s11-posts .as-post").forEach((p, i) => K.popSvg(p, POSTITS + i * 0.12, K.centro(p), 0.3, 1.6));
      // los cinco chats vibran (los globitos de la nube tiemblan)
      tl.fromTo(q(".s11-nube"), { x: 0 }, { x: 6, duration: 0.05, yoyo: true, repeat: 9, ease: "none", immediateRender: false }, CHATS);
      // una clienta sale de la cabeza... y queda trancada entre dos puertas de ascensor
      const cli = q(".s11-cli");
      gsap.set(cli, { opacity: 0 });
      tl.fromTo(cli, { opacity: 0, x: -300, scale: 0.5 }, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, ALGUNO - 0.2);
      gsap.set(q(".s11-pi"), { x: -260, opacity: 0 });
      gsap.set(q(".s11-pd"), { x: 260, opacity: 0 });
      tl.to(q(".s11-pi"), { x: 0, opacity: 1, duration: 0.35, ease: "power3.in" }, TRANCADO - 0.4);
      tl.to(q(".s11-pd"), { x: 0, opacity: 1, duration: 0.35, ease: "power3.in" }, TRANCADO - 0.4);
      K.sacudon(cli, TRANCADO - 0.05, 0.6);
      K.sello(q(".s11-tranca"), TRANCADO + 0.1, 5);
    `,
    sfx: [{ t: 0.45, sfx: "pop", vol: 0.22 }, { t: 2.2, sfx: "pop", vol: 0.25 }, { t: 3.1, sfx: "click-soft", vol: 0.3 }, { t: 3.85, sfx: "vibra", vol: 0.22, max: 0.6 }, { t: 5.0, sfx: "whoosh-short", vol: 0.2 }, { t: 5.95, sfx: "golpe", vol: 0.4 }],
  },
  {
    id: "s12-crm",
    css: `
      & .s12-crm { position: absolute; left: 70px; top: 585px; width: 940px; height: 740px; background: #14181d; border: 7px solid #5ce611; border-radius: 30px; box-shadow: 10px 10px 0 rgba(0,0,0,0.3); }
      & .s12-crm h3 { position: absolute; left: 36px; top: 26px; margin: 0; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.18em; color: #5ce611; white-space: nowrap; }
      & .s12-av { position: absolute; left: 36px; top: 84px; width: 110px; height: 110px; border-radius: 50%; background: #e5303a; border: 5px solid #fff6e3; }
      & .s12-nom { position: absolute; left: 170px; top: 92px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; color: #fff6e3; white-space: nowrap; }
      & .s12-nom small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; letter-spacing: 0.12em; color: #b8c0c8; margin-top: 4px; }
      & .s12-fila { position: absolute; left: 36px; right: 36px; height: 98px; border-radius: 18px; background: #232a31; border: 3px solid #3a444e; }
      & .s12-fila small { position: absolute; left: 24px; top: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; letter-spacing: 0.16em; color: #5ce611; white-space: nowrap; }
      & .s12-fila b { position: absolute; left: 24px; top: 44px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; color: #fff6e3; white-space: nowrap; }
      & .s12-aviso { position: absolute; left: 36px; right: 36px; top: 600px; height: 100px; border-radius: 18px; background: #5ce611; }
      & .s12-aviso b { position: absolute; left: 96px; top: 24px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 42px; color: #14181d; white-space: nowrap; }
      & .s12-aviso svg { position: absolute; left: 24px; top: 20px; width: 58px; height: 60px; }
      & .s12-todo { left: 250px; top: 1345px; font-size: 34px; }
    `,
    html: `
      <div class="s12-crm">
        <h3>SCALERICS · CRM</h3>
        <div class="s12-av"></div>
        <div class="s12-nom">Valeria<small>CLIENTA DESDE ABRIL</small></div>
        <div class="s12-fila s12-f1" style="top:230px"><small>TE PIDIÓ</small><b>Presupuesto de placard</b></div>
        <div class="s12-fila s12-f2" style="top:350px"><small>LE PROMETISTE</small><b>Llamarla el lunes</b></div>
        <div class="s12-fila s12-f3" style="top:470px"><small>TAMBIÉN</small><b>La de la cocina · sin respuesta</b></div>
        <div class="s12-aviso"><svg viewBox="0 0 58 60"><path d="M29 6 Q12 6 12 26 L12 38 L6 46 L52 46 L46 38 L46 26 Q46 6 29 6 Z" fill="#14181d"/><circle cx="29" cy="52" r="7" fill="#14181d"/></svg><b>Escribile hoy</b></div>
      </div>
      <div class="as-tag verde s12-todo">TODO EN UN SOLO LUGAR</div>
    `,
    svg: `\`<g class="s12-vuelan">\${AS.postit(160, 1500, -10, ["¿Gómez?"], { w: 150, fs: 34 })}\${AS.postit(920, 1480, 12, ["llamar!!"], { w: 150, fs: 34 })}\${AS.postit(540, 1560, 4, ["presup."], { w: 140, fs: 34 })}</g>\``,
    js: `
      const SCAL = 0.05, CRM = 1.74, CLIENTE = 2.84, PIDIO = 3.66, PROMETISTE = 4.89, VOLVER = 6.36, TODO = 7.18;
      const crm = q(".s12-crm");
      gsap.set(crm, { opacity: 0 });
      tl.fromTo(crm, { opacity: 0, scale: 0.6, y: 120 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)", immediateRender: false }, SCAL + 0.1);
      [[".s12-crm h3", CRM - 0.2], [".s12-av", CLIENTE - 0.15], [".s12-nom", CLIENTE], [".s12-f1", PIDIO], [".s12-f2", PROMETISTE]].forEach(([s, t]) => K.pop(q(s), t));
      gsap.set(q(".s12-f3"), { opacity: 0 });
      tl.to(q(".s12-f3"), { opacity: 1, duration: 0.3 }, PROMETISTE + 0.7);
      const av = q(".s12-aviso");
      gsap.set(av, { opacity: 0 });
      tl.fromTo(av, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.2)", immediateRender: false }, VOLVER);
      tl.fromTo(q(".s12-aviso svg"), { rotation: -14 }, { rotation: 14, duration: 0.1, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, VOLVER + 0.3);
      // los post-its sueltos entran al CRM y desaparecen
      qa(".s12-vuelan .as-post").forEach((p, i) => {
        K.popSvg(p, 0.3 + i * 0.15, K.centro(p), 0.3, 0.5);
        tl.to(p, { x: 540 - [160, 920, 540][i], y: -560, scale: 0.2, opacity: 0, svgOrigin: K.centro(p), duration: 0.45, ease: "power2.in" }, TODO + i * 0.1);
      });
      K.pop(q(".s12-todo"), TODO + 0.3);
      tl.fromTo(crm, { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, TODO + 0.5);
    `,
    sfx: [{ t: 0.05, sfx: "sparkle", vol: 0.3 }, { t: 0.15, sfx: "whoosh", vol: 0.2, max: 0.5 }, { t: 2.7, sfx: "click", vol: 0.25 }, { t: 3.66, sfx: "click", vol: 0.25 }, { t: 4.89, sfx: "click", vol: 0.25 }, { t: 6.36, sfx: "notification", vol: 0.3 }, { t: 7.25, sfx: "whoosh-short", vol: 0.2 }, { t: 7.6, sfx: "chime", vol: 0.28 }],
  },
  {
    id: "s13-ding",
    css: `& .s13-coc { left: 230px; top: 610px; font-size: 30px; }`,
    html: `<div class="as-tag ambar s13-coc">LLAMANDO · LA DE LA COCINA</div>`,
    svg: [`\`<g class="s13-cocina">\${AS.cocina(540, 1040, 0.8)}</g>\``, V("s13-v", { cara: "feliz", brazo: "chau" }), R("s13-r1", { cara: "duda", sudor: true }), R("s13-r2", { cara: "orgullo", brazo: "celular" })].join(" + "),
    js: `
      const AHORA = 0, LLAMA = 1.01, COCINA = 1.79;
      K.respirar(q(".s13-r1"), 0, DUR, 5);
      K.respirar(q(".s13-r2"), 0, DUR, 5);
      gsap.set(q(".s13-r2"), { opacity: 0 });
      K.hablar(".s13-r1 .as-r-boca", 0.02, 3, 0.1);
      K.hablar(".s13-v .as-v-boca", LLAMA, 5, 0.1);
      // ding: ella sale saludando
      tl.to(q(".s13-v"), { x: 520, rotation: 6, svgOrigin: "800 1540", duration: 0.7, ease: "power2.in" }, COCINA + 0.3);
      K.popSvg(q(".s13-cocina"), COCINA - 0.1, "540 1040", 0.35, 0.4);
      tl.set(q(".s13-r1"), { opacity: 0 }, COCINA);
      tl.set(q(".s13-r2"), { opacity: 1 }, COCINA);
      K.pop(q(".s13-coc"), COCINA + 0.1);
      tl.fromTo(q(".s13-r2 .as-cel"), { rotation: -6 }, { rotation: 6, duration: 0.08, yoyo: true, repeat: 5, ease: "none", svgOrigin: "10 -250", immediateRender: false }, COCINA + 0.2);
    `,
    sfx: [{ t: 0.85, sfx: "ding", vol: 0.45, max: 1.6 }, { t: 1.75, sfx: "pop", vol: 0.25 }, { t: 2.1, sfx: "whoosh", vol: 0.2, max: 0.5 }, { t: 2.2, sfx: "key-press", vol: 0.25 }],
  },
  {
    id: "s14-cta",
    css: `
      & .s14-q { left: 0; right: 0; top: 640px; font-size: 76px; line-height: 1.05; white-space: normal; }
      & .s14-com { position: absolute; left: 90px; top: 990px; width: 900px; height: 120px; background: #14181d; border: 6px solid #5ce611; border-radius: 60px; }
      & .s14-com svg { position: absolute; left: 28px; top: 22px; width: 76px; height: 70px; }
      & .s14-com b { position: absolute; left: 124px; top: 30px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 44px; color: #5ce611; white-space: nowrap; }
    `,
    html: `
      <div class="as-titulo s14-q">¿Con qué cliente<br/>no te querés quedar<br/><span style="color:#ff8a1f">trancado?</span></div>
      <div class="s14-com"><svg viewBox="0 0 76 70"><path d="M8 8 L68 8 Q72 8 72 12 L72 46 Q72 50 68 50 L30 50 L14 64 L16 50 L8 50 Q4 50 4 46 L4 12 Q4 8 8 8 Z" fill="none" stroke="#5ce611" stroke-width="6" stroke-linejoin="round"/></svg><b>Contalo en los comentarios</b></div>
    `,
    svg: [R("s14-r", { cara: "orgullo", brazo: "celular" }, 540, 1660, 1.05)].join(" + "),
    js: `
      const CLIENTE = 0.24, TRANCADO = 1.88, CONTALO = 2.94;
      K.respirar(q(".s14-r"), 0, DUR, 5);
      const t = q(".s14-q");
      gsap.set(t, { opacity: 0 });
      tl.fromTo(t, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.8)", immediateRender: false }, 0.05);
      tl.fromTo(t.querySelector("span"), { color: "#fff6e3" }, { color: "#ff8a1f", duration: 0.1, immediateRender: false }, TRANCADO);
      K.sacudon(t, TRANCADO, 0.6);
      const com = q(".s14-com");
      gsap.set(com, { opacity: 0 });
      tl.fromTo(com, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, CONTALO);
      tl.to(com, { scale: 1.04, duration: 0.45, yoyo: true, repeat: Math.max(1, Math.floor((DUR - CONTALO - 1) / 0.45)), ease: "sine.inOut" }, CONTALO + 0.5);
      tl.fromTo(q(".s14-r .as-cel"), { rotation: -5 }, { rotation: 5, duration: 0.1, yoyo: true, repeat: 7, ease: "none", svgOrigin: "10 -250", immediateRender: false }, 1.0);
    `,
    sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.5 }, { t: 1.88, sfx: "golpe", vol: 0.35 }, { t: 2.94, sfx: "pop", vol: 0.3 }, { t: 3.4, sfx: "notification", vol: 0.25 }],
  },
];
