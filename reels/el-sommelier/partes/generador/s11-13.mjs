import { C, somm, botella, copaSvg, escena, sfx } from "./lib.mjs";
import { D } from "./dur.mjs";
const estrella = (x, y, r, cls) => `<path class="${cls}" d="M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z" fill="${C.dorado}" />`;

// ---------------- s11-tienda ----------------
{
  const id = "s11-tienda", p = "s11";
  const envios = [["DAC", 0], ["Correo", 1], ["PedidosYa", 2]].map(([n, i]) => `<g class="${p}-env"><g transform="translate(0 ${i * 62})">
      <rect x="-170" y="-26" width="340" height="52" rx="12" fill="#2a0d12" stroke="${C.crema}" stroke-opacity="0.25" stroke-width="2" />
      <circle cx="-140" cy="0" r="13" fill="none" stroke="${C.crema}" stroke-width="3" />
      <circle class="${p}-radio" cx="-140" cy="0" r="7" fill="${C.dorado}" opacity="0" />
      <text class="ui" x="-112" y="9" font-size="26" fill="${C.crema}">${n}</text>
    </g></g>`).join("");
  escena({
    id, dur: D[id],
    etiquetas: ["Tienda online", "Mercado Pago", "Te llega a tu casa"],
    svg: `
          <g class="${p}-celu"><g transform="translate(540 975)">
            <rect x="-210" y="-350" width="420" height="700" rx="48" fill="#120607" stroke="${C.crema}" stroke-width="6" />
            <rect x="-44" y="-334" width="88" height="12" rx="6" fill="${C.crema}" opacity="0.5" />
            <g class="${p}-head">
              <rect x="-186" y="-306" width="372" height="64" rx="14" fill="${C.bordo}" />
              <text class="ui" x="-164" y="-264" font-size="26" fill="${C.crema}">Tu local · tienda</text>
              <path d="M128 -286 L138 -286 L148 -258 L172 -258 L178 -278 L142 -278" fill="none" stroke="${C.crema}" stroke-width="4" stroke-linejoin="round" />
              <circle cx="152" cy="-250" r="4" fill="${C.crema}" /><circle cx="170" cy="-250" r="4" fill="${C.crema}" />
            </g>
            <g class="${p}-prod">
              <rect x="-186" y="-226" width="372" height="196" rx="14" fill="${C.crema}" />
              <rect x="-170" y="-212" width="130" height="168" rx="10" fill="#e3d4b3" />
              ${botella(p, "mini", -105, -54, 0.34, [""])}
              <text class="ui" x="-20" y="-160" font-size="27" fill="${C.tinta}">Tu producto</text>
              <text class="ui ${p}-precio" x="-20" y="-96" font-size="46" fill="${C.bordo}">$ 890</text>
              <text class="ui" x="-20" y="-58" font-size="22" fill="#6b5a4a" data-layout-ignore>Stock disponible</text>
            </g>
            <g class="${p}-boton">
              <rect x="-186" y="-12" width="372" height="72" rx="36" fill="${C.dorado}" />
              <text class="ui" x="0" y="34" font-size="25" fill="${C.tinta}" text-anchor="middle">Pagar con Mercado Pago</text>
              <circle class="${p}-tap" cx="110" cy="24" r="30" fill="none" stroke="${C.crema}" stroke-width="5" opacity="0" />
            </g>
            <text class="ui ${p}-envtit" x="-186" y="106" font-size="24" fill="${C.cremaS}">Elegí el envío</text>
            <g transform="translate(0 150)">${envios}</g>
          </g></g>
          <g class="${p}-brillos">${estrella(850, 760, 30, p + "-br")}${estrella(240, 900, 24, p + "-br")}${estrella(860, 1180, 22, p + "-br")}</g>
    `,
    js: `
      const SCAL = 0.29, TIENDA = 1.27, PRECIO = 3.3, PAGA = 4.04, PAGO = 4.41, ELIGE = 5.25, DAC = 6.23, CORREO = 6.72, PYA = 7.23;
      tl.fromTo(q(".${p}-celu"), { opacity: 0.3, y: 120, scale: 0.92, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.3)" }, 0);
      // "tienda online": se arma la tienda
      tl.fromTo(q(".${p}-head"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 }, SCAL + 0.2);
      tl.fromTo(q(".${p}-prod"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, TIENDA - 0.05);
      etiq(0, 1, TIENDA);
      qa(".${p}-br").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, TIENDA + 0.3 + i * 0.12));
      tl.to(qa(".${p}-br"), { rotation: 45, transformOrigin: "50% 50%", duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 3 }, TIENDA + 0.7);
      // "ve el precio"
      tl.fromTo(q(".${p}-precio"), { scale: 1, transformOrigin: "0% 50%" }, { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, PRECIO - 0.05);
      // "paga con Mercado Pago"
      tl.fromTo(q(".${p}-boton"), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, PAGA - 0.1);
      tl.fromTo(q(".${p}-tap"), { opacity: 0.9, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 0, scale: 1.6, duration: 0.45 }, PAGO + 0.1);
      tl.to(q(".${p}-boton"), { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 }, PAGO + 0.1);
      etiq(1, 2, PAGA);
      // "elige el envío"
      tl.fromTo(q(".${p}-envtit"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, ELIGE - 0.1);
      const env = qa(".${p}-env"), rad = qa(".${p}-radio");
      [DAC, CORREO, PYA].forEach((t, i) => tl.fromTo(env[i], { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(1.6)" }, t - 0.15));
      tl.to(rad[0], { opacity: 1, duration: 0.1 }, DAC);
      tl.to(rad[0], { opacity: 0, duration: 0.1 }, CORREO);
      tl.to(rad[1], { opacity: 1, duration: 0.1 }, CORREO);
      tl.to(rad[1], { opacity: 0, duration: 0.1 }, PYA);
      tl.to(rad[2], { opacity: 1, duration: 0.1 }, PYA);
      etiq(2, 3, ELIGE);
    `,
  });
  sfx(id, [{ t: 0.25, sfx: "whoosh-short", vol: 0.22 }, { t: 1.25, sfx: "pop", vol: 0.3 }, { t: 1.6, sfx: "sparkle", vol: 0.22 }, { t: 3.25, sfx: "tic", vol: 0.3 }, { t: 4.5, sfx: "click", vol: 0.35 }, { t: 6.23, sfx: "click-soft", vol: 0.3 }, { t: 6.72, sfx: "click-soft", vol: 0.3 }, { t: 7.23, sfx: "ping", vol: 0.3 }]);
}

// ---------------- s12-sirve-solo ----------------
{
  const id = "s12-sirve-solo", p = "s12";
  escena({
    id, dur: D[id],
    etiquetas: ["Se sirve solo", "Noventa y ocho puntos"],
    svg: `
          ${somm(p, { x: 300, y: 1010, s: 1.0 })}
          <g class="${p}-bot-w"><g transform="translate(778 667) rotate(-120) scale(0.7)"><g class="${p}-bot-in">${botella(p, "botella", 0, 0, 1, ["TU LOCAL"])}</g></g></g>
          <path class="${p}-chorro" d="M530 800 Q520 830 508 880" fill="none" stroke="${C.vino}" stroke-width="14" stroke-linecap="round" />
          <g class="${p}-medalla"><g transform="translate(830 1130)">
            <path d="M-46 -20 L-80 110 L-34 86 L-12 130 L12 0 Z M46 -20 L80 110 L34 86 L12 130 L-12 0 Z" fill="${C.bordo}" class="tinta" stroke-width="4" />
            <circle r="100" fill="${C.dorado}" class="tinta" />
            <circle r="82" fill="none" stroke="${C.doradoOsc}" stroke-width="5" />
            <text class="serif" y="6" font-size="72" fill="${C.tinta}" text-anchor="middle">98</text>
            <text class="serif" y="54" font-size="24" fill="${C.tinta}" text-anchor="middle" letter-spacing="3">PUNTOS</text>
          </g></g>
          <g class="${p}-brillos">${estrella(180, 760, 30, p + "-br")}${estrella(440, 700, 24, p + "-br")}${estrella(990, 960, 26, p + "-br")}${estrella(660, 1230, 22, p + "-br")}</g>
    `,
    js: `
      const MMM = 0.0, VINO = 1.13, SIRVE = 1.91, SOLO = 2.43, NOVENTA = 3.5, PUNTOS = 4.6;
      tl.fromTo(q(".${p}-som"), { opacity: 0.5, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 0);
      // "Mmm": huele, encantado
      tl.to(q(".${p}-som-cabeza"), { rotation: -6, transformOrigin: "50% 90%", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.1);
      tl.to(q(".${p}-som-ceja-d"), { y: -8, duration: 0.25, yoyo: true, repeat: 1 }, 0.3);
      etiq(0, 1, 0.1);
      // "vino": llega la botella flotando
      tl.fromTo(q(".${p}-bot-w"), { opacity: 0, x: 220, y: -40 }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power3.out" }, VINO - 0.25);
      tl.to(q(".${p}-bot-w"), { y: -10, duration: 0.5, yoyo: true, repeat: 6, ease: "sine.inOut" }, VINO + 0.3);
      // "sirve solo": cae el chorro y la copa se llena
      dibujar(q(".${p}-chorro"), SIRVE - 0.1, 0.25);
      tl.to(q(".${p}-som-copa-vino"), { y: -40, duration: 1.0, ease: "power1.inOut" }, SIRVE);
      tl.to(q(".${p}-chorro"), { opacity: 0, duration: 0.2 }, SIRVE + 1.0);
      tl.set(q(".${p}-som-ojos-snob"), { opacity: 0 }, SOLO);
      tl.set(q(".${p}-som-ojos-ab"), { opacity: 1 }, SOLO);
      tl.set(q(".${p}-som-boca"), { opacity: 0 }, SOLO);
      tl.set(q(".${p}-som-sonrisa"), { opacity: 1 }, SOLO);
      tl.to(q(".${p}-som-ceja-i"), { y: -8, duration: 0.15 }, SOLO);
      // "noventa y ocho puntos"
      tl.fromTo(q(".${p}-medalla"), { opacity: 0, scale: 0.3, rotation: -40, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2)" }, NOVENTA - 0.1);
      qa(".${p}-br").forEach((el, i) => tl.fromTo(el, { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, NOVENTA + 0.1 + i * 0.1));
      tl.to(q(".${p}-medalla"), { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1 }, PUNTOS);
      etiq(1, 2, NOVENTA);
    `,
  });
  sfx(id, [{ t: 0.1, sfx: "sparkle", vol: 0.2 }, { t: 1.0, sfx: "whoosh-short", vol: 0.22 }, { t: 1.85, sfx: "splash", vol: 0.2, max: 0.6 }, { t: 2.45, sfx: "campanita", vol: 0.25 }, { t: 3.45, sfx: "impact-bass-1", vol: 0.3 }, { t: 3.6, sfx: "chime", vol: 0.3 }]);
}

// ---------------- s13-cta ----------------
{
  const id = "s13-cta", p = "s13";
  escena({
    id, dur: D[id],
    etiquetas: ["¿Qué nota le ponés?", "Dejá tu nota abajo"],
    svg: `
          <g class="${p}-ficha"><g transform="translate(200 630)">
            <rect x="0" y="0" width="680" height="440" rx="12" fill="${C.crema}" stroke="${C.dorado}" stroke-width="5" />
            <text class="serif" x="340" y="64" font-size="38" fill="${C.bordo}" text-anchor="middle" letter-spacing="5">FICHA DE CATA</text>
            <path d="M40 88 H640" stroke="${C.bordo}" stroke-width="3" />
            <text class="cursiva" x="340" y="160" font-size="46" fill="${C.tinta}" text-anchor="middle">Cómo se compra</text>
            <text class="cursiva" x="340" y="214" font-size="46" fill="${C.tinta}" text-anchor="middle">en tu local</text>
            <text class="serif" x="60" y="352" font-size="40" fill="${C.bordo}" letter-spacing="3">NOTA:</text>
            <path d="M220 362 H420" stroke="${C.tinta}" stroke-width="4" />
            <text class="serif" x="440" y="356" font-size="56" fill="${C.tinta}">/ 100</text>
            <text class="mano ${p}-preg" x="320" y="350" font-size="120" fill="${C.vino}" text-anchor="middle">?</text>
          </g></g>
          <g class="${p}-pluma"><g transform="translate(590 900) rotate(35)">
            <path d="M0 0 Q-30 -120 10 -230 Q50 -120 0 0 Z" fill="${C.cremaS}" class="tinta" stroke-width="4" />
            <path d="M0 -10 Q8 -110 10 -220" fill="none" stroke="${C.tinta}" stroke-width="3" />
            <path d="M0 0 L-4 30" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />
          </g></g>
          <g class="${p}-coment"><g transform="translate(540 1200)">
            <path d="M-120 -64 H120 Q150 -64 150 -34 V34 Q150 64 120 64 H-30 L-80 104 L-70 64 H-120 Q-150 64 -150 34 V-34 Q-150 -64 -120 -64 Z" fill="none" stroke="${C.dorado}" stroke-width="8" stroke-linejoin="round" />
            <path class="${p}-lin" d="M-100 -22 H100" stroke="${C.crema}" stroke-width="10" stroke-linecap="round" />
            <path class="${p}-lin" d="M-100 18 H40" stroke="${C.crema}" stroke-width="10" stroke-linecap="round" />
          </g></g>
          ${copaSvg(p, "copa1", 230, 1230, 0.75, 0.5)}
          ${copaSvg(p, "copa2", 850, 1230, 0.75, 0.5)}
    `,
    js: `
      const NOTA = 0.09, PONES = 0.45, COMPRA = 1.34, LOCAL = 1.79, LEEMOS = 2.59, COMENT = 3.22;
      tl.fromTo(q(".${p}-ficha"), { opacity: 0.3, y: 60, rotation: -3, transformOrigin: "50% 50%" }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.4)" }, 0);
      etiq(0, 1, 0.1);
      // "ponés": la pluma escribe el signo
      tl.fromTo(q(".${p}-pluma"), { opacity: 0, x: 120, y: -60 }, { opacity: 1, x: 0, y: 0, duration: 0.35, ease: "power3.out" }, PONES - 0.3);
      tl.to(q(".${p}-pluma"), { x: -30, y: -24, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, PONES + 0.1);
      tl.fromTo(q(".${p}-preg"), { opacity: 0, scale: 0.4, transformOrigin: "50% 80%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, PONES + 0.15);
      tl.to(q(".${p}-pluma"), { opacity: 0, x: 140, y: -100, duration: 0.35, ease: "power2.in" }, LOCAL);
      tl.to(q(".${p}-preg"), { rotation: 10, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, LOCAL);
      // las copas brindan
      tl.fromTo(q(".${p}-copa1"), { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.4 }, COMPRA);
      tl.fromTo(q(".${p}-copa2"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.4 }, COMPRA);
      tl.to(q(".${p}-copa1"), { rotation: 14, transformOrigin: "50% 100%", duration: 0.25, yoyo: true, repeat: 1 }, COMENT + 0.5);
      tl.to(q(".${p}-copa2"), { rotation: -14, transformOrigin: "50% 100%", duration: 0.25, yoyo: true, repeat: 1 }, COMENT + 0.5);
      // "te leemos en los comentarios"
      tl.fromTo(q(".${p}-coment"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, LEEMOS - 0.15);
      dibujar(".${p}-lin", LEEMOS + 0.2, 0.4);
      etiq(1, 2, LEEMOS);
      tl.to(q(".${p}-coment"), { y: -12, duration: 0.6, yoyo: true, repeat: 4, ease: "sine.inOut" }, COMENT + 0.3);
      tl.to(q(".${p}-ficha"), { scale: 1.02, transformOrigin: "50% 50%", duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, COMENT + 0.6);
    `,
  });
  sfx(id, [{ t: 0.05, sfx: "whoosh-short", vol: 0.22 }, { t: 0.5, sfx: "tiza", vol: 0.3, max: 0.6 }, { t: 2.45, sfx: "pop", vol: 0.3 }, { t: 2.8, sfx: "notification", vol: 0.25 }, { t: 3.85, sfx: "campanita", vol: 0.3 }]);
}
