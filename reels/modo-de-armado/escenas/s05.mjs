import { escena } from "./lib.mjs";
const XS = [490, 604, 718, 832, 946];
const clientes = XS.map((x, i) => `<g transform="translate(${x} 1300) scale(0.6)"><g class="s05-cli s05-cli${i}" data-hombre='{}'></g></g>`).join("\n          ");
const globos = XS.map((x, i) => `<g class="s05-glo s05-glo${i}"><rect class="tinta" x="${x - 50}" y="1030" width="100" height="44" rx="12" style="stroke-width:5" /><text class="mono" x="${x}" y="1061" text-anchor="middle" font-size="24" style="letter-spacing:0.04em">LISTO</text></g>`).join("\n          ");
const tildes = XS.map((x, i) => `<g class="s05-ok s05-ok${i}"><circle cx="${x + 34}" cy="1112" r="22" fill="#fffdf6" stroke="#2b50d6" stroke-width="5" /><path class="azul" d="M${x + 23} 1113 l8 9 l14 -18" style="stroke-width:6" /></g>`).join("\n          ");
escena({
  id: "s05-listo",
  etiqueta: 1420,
  css: `
    $C .s05-cont { position: absolute; left: 600px; top: 640px; width: 400px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 76px; color: #1a1a1a; }
    $C .s05-cont span { position: absolute; left: 0; right: 0; opacity: 0; }
    $C .s05-cont small { position: absolute; left: 0; right: 0; top: 96px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.16em; color: #e0362c; }
  `,
  svg: `
          <text class="num s05-48" x="76" y="830" font-size="230">48</text>
          <path class="linea" d="M80 1306 H1010" style="stroke:#b9b3a3" />
          <g transform="translate(210 1300) scale(1.15)"><g class="s05-due" data-hombre='{"brazoD":"M40 -196 L100 -176 L132 -224"}'></g></g>
          <g class="s05-cel">
            <rect class="tinta" x="338" y="960" width="64" height="112" rx="12" />
            <path class="fina" d="M358 974 h24" />
          </g>
          <path class="s05-sonrisa" d="M192 1012 Q210 1032 232 1006" fill="none" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round" />
          ${clientes}
          ${globos}
          ${tildes}
  `,
  html: `
        <div class="s05-cont"><span>1 / 47</span><span>2 / 47</span><span>3 / 47</span><span>4 / 47</span><span>5 / 47</span><small>clientes avisados</small></div>
        <div class="s05-etiqueta">Uno por uno</div>`,
  js: String.raw`
      const XS0 = [490, 604, 718, 832, 946];
      const OCHO = 0.91, AVISALE = 1.24, CLIENTE = 2.07, UNO = 4.12, UNO2 = 4.66, SONRISA = 5.43;
      // cuadro 0: el 48 cae, el dueño ya está con el celular
      tl.fromTo(q(".s05-48"), { opacity: 0.5, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in" }, 0);
      tl.to(q(".s05-48"), { rotation: -4, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, OCHO);
      tl.fromTo(q(".s05-due .hb"), { opacity: 0.6, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
      pop(q(".s05-cel"), 0.1);
      qa(".s05-cli").forEach((c, i) => {
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, 0.5 + i * 0.08);
      });
      gsap.set(q(".s05-sonrisa"), { opacity: 0 });
      // los globitos LISTO salen del celular, de a uno, lento
      const SALIDAS = [AVISALE, 2.9, UNO - 0.05, UNO2 - 0.05, 5.1];
      SALIDAS.forEach((t, i) => {
        const g = q(".s05-glo" + i), xd = 370 - XS0[i];
        gsap.set(g, { opacity: 0 });
        tl.fromTo(g, { opacity: 0, x: xd, y: -60, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.inOut", immediateRender: false }, t);
        tl.to(q(".s05-cel"), { x: 4, duration: 0.05, yoyo: true, repeat: 3 }, t);
        pop(q(".s05-ok" + i), t + 0.45, 0.4);
        tl.to(q(".s05-cli" + i), { y: -16, duration: 0.12, yoyo: true, repeat: 1 }, t + 0.45);
        const sp = qa(".s05-cont span")[i];
        if (i > 0) tl.set(qa(".s05-cont span")[i - 1], { opacity: 0 }, t + 0.45);
        tl.set(sp, { opacity: 1 }, t + 0.45);
        tl.fromTo(sp, { scale: 1.3 }, { scale: 1, duration: 0.2, immediateRender: false }, t + 0.45);
      });
      gsap.set(q(".s05-cont small"), { opacity: 0 });
      tl.to(q(".s05-cont small"), { opacity: 1, duration: 0.2 }, AVISALE + 0.5);
      tl.to(q(".s05-cli0"), { scale: 1.1, svgOrigin: "0 0", duration: 0.15, yoyo: true, repeat: 1 }, CLIENTE);
      // "con una sonrisa": al hombrecito sin cara le aparece una sonrisa torcida
      dibujar([q(".s05-sonrisa")], SONRISA - 0.1, 0.3);
      tl.to(q(".s05-due .hb-cabeza"), { scale: 1.08, svgOrigin: "0 -258", duration: 0.12, yoyo: true, repeat: 1 }, SONRISA);
      tl.to(q(".s05-sonrisa"), { y: -4, duration: 0.12, yoyo: true, repeat: 3 }, SONRISA + 0.3);
      etiquetas([[".s05-etiqueta", UNO - 0.1]]);
  `,
  sfx: [{ t: 0.0, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 1.2, sfx: "whoosh-short", vol: 0.25 }, { t: 1.7, sfx: "ping", vol: 0.25 }, { t: 3.35, sfx: "ping", vol: 0.25 }, { t: 4.52, sfx: "ping", vol: 0.25 }, { t: 5.06, sfx: "ping", vol: 0.25 }, { t: 5.4, sfx: "sparkle", vol: 0.3 }],
});
