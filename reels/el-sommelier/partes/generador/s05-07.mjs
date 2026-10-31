import { C, somm, copaSvg, escupidera, escena, sfx } from "./lib.mjs";
import { D } from "./dur.mjs";

// ---------------- s05-boca ----------------
{
  const id = "s05-boca", p = "s05";
  escena({
    id, dur: D[id],
    etiquetas: ["Fase gustativa", "Áspero"],
    svg: `
          ${somm(p, { x: 290, y: 930, s: 1.05, copa: false })}
          <g class="${p}-ficha"><g transform="translate(560 640)">
            <rect x="0" y="0" width="470" height="400" rx="10" fill="${C.crema}" stroke="${C.cremaS}" stroke-width="4" />
            <text class="serif" x="235" y="50" font-size="32" fill="${C.bordo}" text-anchor="middle" letter-spacing="4">EN BOCA</text>
            <path d="M40 72 H430" stroke="${C.bordo}" stroke-width="3" />
            <path d="M40 160 H430 M40 250 H430 M40 340 H430" stroke="${C.cremaS}" stroke-width="3" />
            <text class="mano ${p}-l1" x="44" y="148" font-size="58" fill="${C.tinta}">«transferime</text>
            <text class="mano ${p}-l2" x="44" y="238" font-size="58" fill="${C.tinta}">y mandame</text>
            <text class="mano ${p}-l3" x="44" y="328" font-size="58" fill="${C.tinta}">la captura»</text>
            <g class="${p}-sello" data-layout-allow-overlap><g transform="translate(320 330) rotate(-12)">
              <rect x="-150" y="-50" width="300" height="100" rx="8" fill="none" stroke="${C.vino}" stroke-width="8" />
              <text class="serif" x="0" y="22" font-size="64" fill="${C.vino}" text-anchor="middle" letter-spacing="6">ÁSPERO</text>
            </g></g>
          </g></g>
          <g class="${p}-capt"><g transform="translate(800 1170)">
            <rect x="-150" y="-90" width="300" height="180" rx="22" fill="#120607" stroke="${C.crema}" stroke-width="5" />
            <rect x="-120" y="-62" width="240" height="124" rx="8" fill="${C.crema}" />
            <text class="serif" x="0" y="-22" font-size="26" fill="${C.bordo}" text-anchor="middle" letter-spacing="2">COMPROBANTE</text>
            <path d="M-90 8 H90 M-90 36 H40" stroke="${C.cremaS}" stroke-width="8" stroke-linecap="round" />
            <rect class="${p}-flash" x="-150" y="-90" width="300" height="180" rx="22" fill="#fff8e6" opacity="0" />
          </g></g>
    `,
    js: `
      const BOCA = 0.41, TRANS = 1.38, MANDAME = 2.42, CAPTURA = 3.0, ASPERO = 4.02, MUY = 5.0;
      tl.fromTo(q(".${p}-som"), { opacity: 0.5, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".${p}-ficha"), { opacity: 0.3, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 0);
      etiq(0, 1, 0.1);
      // "boca": buches (cachetes inflados, la cabeza se mueve)
      tl.set(q(".${p}-som-boca"), { opacity: 0 }, BOCA);
      tl.set(q(".${p}-som-cachete"), { opacity: 1 }, BOCA);
      tl.fromTo(q(".${p}-som-cachete"), { scaleX: 0.85, transformOrigin: "50% 50%" }, { scaleX: 1.12, duration: 0.18, yoyo: true, repeat: 13, ease: "sine.inOut" }, BOCA);
      tl.to(q(".${p}-som-cabeza"), { rotation: 5, transformOrigin: "50% 90%", duration: 0.25, yoyo: true, repeat: 11, ease: "sine.inOut" }, BOCA);
      // la frase se escribe en la ficha
      [[".${p}-l1", TRANS], [".${p}-l2", MANDAME], [".${p}-l3", CAPTURA]].forEach(([s, t]) => tl.fromTo(q(s), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, t - 0.05));
      // "captura": el comprobante con flash
      pop(q(".${p}-capt"), CAPTURA - 0.05);
      tl.fromTo(q(".${p}-flash"), { opacity: 0.95 }, { opacity: 0, duration: 0.35 }, CAPTURA + 0.15);
      // "áspero"
      gsap.set(q(".${p}-sello"), { opacity: 0 });
      tl.fromTo(q(".${p}-sello"), { opacity: 0, scale: 1.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.in" }, ASPERO - 0.15);
      temblor(q(".${p}-ficha"), ASPERO + 0.08, 0.7);
      tl.set(q(".${p}-som-cachete"), { opacity: 0 }, ASPERO);
      tl.set(q(".${p}-som-asco"), { opacity: 1 }, ASPERO);
      tl.set(q(".${p}-som-ojos-snob"), { opacity: 0 }, ASPERO);
      tl.set(q(".${p}-som-ojos-ab"), { opacity: 1 }, ASPERO);
      tl.to(q(".${p}-som-ceja-i"), { y: -10, rotation: 10, transformOrigin: "50% 50%", duration: 0.15 }, ASPERO);
      etiq(1, 2, ASPERO);
      // "muy áspero": se tuerce entero
      tl.to(q(".${p}-sello"), { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1 }, MUY + 0.1);
      temblor(q(".${p}-som"), MUY + 0.15, 1);
      tl.to(q(".${p}-som-cabeza"), { rotation: -9, duration: 0.2 }, MUY + 0.2);
    `,
  });
  sfx(id, [{ t: 0.45, sfx: "click-soft", vol: 0.25 }, { t: 1.35, sfx: "tic", vol: 0.25 }, { t: 2.4, sfx: "tic", vol: 0.25 }, { t: 3.1, sfx: "click", vol: 0.35 }, { t: 3.95, sfx: "golpe", vol: 0.4 }, { t: 5.2, sfx: "glitch-1", vol: 0.22 }]);
}

// ---------------- s06-final ----------------
{
  const id = "s06-final", p = "s06";
  const cal = [0, 1, 2].map((i) => `<g class="${p}-cal"><g transform="translate(${180 + i * 190} 910)">
      <rect x="-78" y="-90" width="156" height="180" rx="10" fill="${C.crema}" stroke="${C.cremaS}" stroke-width="4" />
      <rect x="-78" y="-90" width="156" height="48" rx="10" fill="${C.bordo}" />
      <circle cx="-40" cy="-90" r="8" fill="${C.tinta}" /><circle cx="40" cy="-90" r="8" fill="${C.tinta}" />
      <text class="serif" x="0" y="-56" font-size="26" fill="${C.crema}" text-anchor="middle" letter-spacing="3">DÍA</text>
      <text class="serif" x="0" y="50" font-size="84" fill="${C.tinta}" text-anchor="middle">${i + 1}</text>
    </g></g>`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["Final", "Persistente (mal)", "Envío: a confirmar"],
    svg: `
          <text class="serif ${p}-final" x="70" y="700" font-size="54" fill="${C.crema}">FINAL:</text>
          <path class="${p}-largo" d="M270 684 H560" fill="none" stroke="${C.dorado}" stroke-width="10" stroke-linecap="round" />
          <path class="${p}-larguisimo" d="M560 684 H1130" fill="none" stroke="${C.dorado}" stroke-width="10" stroke-linecap="round" />
          ${cal}
          <g class="${p}-caja"><g transform="translate(870 930)">
            <path d="M-120 -80 L120 -80 L120 90 L-120 90 Z" fill="#b58a55" class="tinta" />
            <path d="M-120 -80 L-90 -120 L150 -120 L120 -80 Z" fill="#c99d65" class="tinta" />
            <path d="M120 -80 L150 -120 L150 50 L120 90 Z" fill="#8a6438" class="tinta" />
            <rect x="-90" y="-36" width="180" height="84" rx="4" fill="${C.crema}" stroke="${C.cremaS}" stroke-width="3" />
            <text class="serif" x="0" y="-4" font-size="26" fill="${C.bordo}" text-anchor="middle" letter-spacing="2">ENVÍO</text>
            <text class="serif" x="0" y="32" font-size="25" fill="${C.tinta}" text-anchor="middle">a confirmar</text>
            <g fill="none" stroke="${C.crema}" stroke-width="3" opacity="0.8">
              <path class="${p}-tela" d="M150 -120 L80 -120 M150 -120 L150 -50 M150 -120 L96 -66 M108 -120 Q130 -100 150 -92 M128 -120 Q140 -108 150 -106 M90 -120 Q122 -82 150 -72" />
            </g>
          </g></g>
          <text class="serif ${p}-preg" x="980" y="790" font-size="90" fill="${C.dorado}">?</text>
          <g class="${p}-globo"><g transform="translate(420 1150)">
            <rect x="-290" y="-56" width="580" height="112" rx="40" fill="#3a1418" stroke="${C.vino}" stroke-width="4" />
            <text class="ui" x="-250" y="-6" font-size="24" fill="${C.cremaS}">tu_local</text>
            <text class="ui" x="-250" y="32" font-size="34" fill="${C.crema}">Ahí te confirmo el envío</text>
          </g></g>
    `,
    js: `
      const FINAL = 0.25, LARGO = 0.5, LARGUI = 1.2, TRES = 2.8, ESPERANDO = 3.39, CONFIRMEN = 4.23, ENVIO = 5.08;
      tl.fromTo(q(".${p}-final"), { opacity: 0.2, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, 0);
      etiq(0, 1, 0.1);
      dibujar(q(".${p}-largo"), LARGO - 0.1, 0.55);
      dibujar(q(".${p}-larguisimo"), LARGUI - 0.05, 1.1);
      etiq(1, 2, LARGUI);
      // "tres días": las hojas del calendario
      qa(".${p}-cal").forEach((el, i) => tl.fromTo(el, { opacity: 0, y: -40, rotation: -8, transformOrigin: "50% 0%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.3, ease: "back.out(1.8)" }, TRES - 0.15 + i * 0.22));
      // "esperando": la caja con telaraña
      tl.fromTo(q(".${p}-caja"), { opacity: 0, scale: 0.8, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, ESPERANDO - 0.2);
      dibujar(".${p}-tela", ESPERANDO + 0.2, 0.7);
      etiq(2, 3, ESPERANDO + 0.1);
      // "confirmen": el mensaje de siempre
      tl.fromTo(q(".${p}-globo"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, CONFIRMEN - 0.25);
      // "envío": la caja se hunde, un signo de pregunta
      tl.to(q(".${p}-caja"), { scaleY: 0.92, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1 }, ENVIO);
      pop(q(".${p}-preg"), ENVIO);
      tl.to(q(".${p}-cal"), { rotation: 3, duration: 0.3, yoyo: true, repeat: 1 }, ENVIO + 0.2);
    `,
  });
  sfx(id, [{ t: 0.4, sfx: "whoosh-short", vol: 0.2 }, { t: 1.2, sfx: "riser", vol: 0.2, max: 1.2 }, { t: 2.7, sfx: "naipe", vol: 0.3 }, { t: 2.92, sfx: "naipe", vol: 0.3 }, { t: 3.14, sfx: "naipe", vol: 0.3 }, { t: 4.05, sfx: "notification", vol: 0.25 }, { t: 5.1, sfx: "tic", vol: 0.3 }]);
}

// ---------------- s07-nota ----------------
{
  const id = "s07-nota", p = "s07";
  const filas = [["Color", "visto"], ["Nariz", "a privado"], ["Boca", "áspera"], ["Final", "eterno"]]
    .map(([a, b], i) => `<text class="serif" x="40" y="${160 + i * 78}" font-size="32" fill="${C.bordo}">${a}:</text><text class="mano" x="190" y="${162 + i * 78}" font-size="48" fill="${C.tinta}">${b}</text><path d="M40 ${180 + i * 78} H540" stroke="${C.cremaS}" stroke-width="3" />`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["Veredicto", "A la escupidera"],
    svg: `
          ${escupidera(p, "escup", 860, 1310, 0.85)}
          <g class="${p}-ficha"><g transform="translate(250 620)">
            <rect x="0" y="0" width="580" height="560" rx="12" fill="${C.crema}" stroke="${C.dorado}" stroke-width="5" />
            <text class="serif" x="290" y="66" font-size="38" fill="${C.bordo}" text-anchor="middle" letter-spacing="5">FICHA DE CATA</text>
            <path d="M40 90 H540" stroke="${C.bordo}" stroke-width="3" />
            ${filas}
            <text class="serif" x="40" y="500" font-size="32" fill="${C.bordo}" letter-spacing="3">PUNTAJE</text>
            <text class="mano ${p}-dos" x="300" y="520" font-size="130" fill="${C.vino}" text-anchor="end">2</text>
            <text class="mano ${p}-cien" x="310" y="516" font-size="74" fill="${C.vino}">/100</text>
            <ellipse class="${p}-circ" cx="390" cy="488" rx="125" ry="60" fill="none" stroke="${C.vino}" stroke-width="5" />
          </g></g>
          <g class="${p}-gotas" fill="${C.vino}"><circle cx="830" cy="1150" r="10" /><circle cx="890" cy="1140" r="8" /><circle cx="860" cy="1120" r="7" /><circle cx="910" cy="1165" r="6" /></g>
    `,
    js: `
      const DOS = 0.69, CIEN = 1.91, CHAU = 2.45;
      tl.fromTo(q(".${p}-ficha"), { opacity: 0.4, y: 40, rotation: -3, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.4, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".${p}-escup"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.3);
      etiq(0, 1, 0.1);
      tl.fromTo(q(".${p}-dos"), { opacity: 0, scale: 2.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.in" }, DOS - 0.1);
      tl.fromTo(q(".${p}-cien"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, CIEN - 0.1);
      dibujar(q(".${p}-circ"), CIEN, 0.4);
      // la ficha se arruga y va a la escupidera
      tl.to(q(".${p}-ficha"), { x: 330, y: 470, scale: 0.12, rotation: 200, transformOrigin: "50% 50%", duration: 0.45, ease: "power2.in" }, CHAU);
      tl.to(q(".${p}-ficha"), { opacity: 0, duration: 0.05 }, CHAU + 0.45);
      tl.fromTo(qa(".${p}-gotas circle"), { opacity: 0, y: 30 }, { opacity: 1, y: -40, duration: 0.25, ease: "power2.out", stagger: 0.03 }, CHAU + 0.45);
      tl.to(qa(".${p}-gotas circle"), { opacity: 0, y: 10, duration: 0.25 }, CHAU + 0.75);
      temblor(q(".${p}-escup"), CHAU + 0.47, 0.6);
      etiq(1, 2, CHAU);
    `,
  });
  sfx(id, [{ t: 0.6, sfx: "golpe", vol: 0.35 }, { t: 1.9, sfx: "tiza", vol: 0.3, max: 0.6 }, { t: 2.45, sfx: "whoosh-short", vol: 0.25 }, { t: 2.88, sfx: "splash", vol: 0.45 }]);
}
