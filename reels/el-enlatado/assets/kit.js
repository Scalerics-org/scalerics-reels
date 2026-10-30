// Personajes del reel "El enlatado", dibujados en SVG. Cada función devuelve el marcado de un <g>
// (en su propio sistema de coordenadas) para meterlo en el <svg> de una escena con innerHTML ANTES de
// armar el timeline. Las partes tienen clases k-... para animarlas (siempre con svgOrigin).
// Paleta: rojo #e5383b (tu negocio), azul #2f6bff (el enlatado), dorado #ffc531 (ring, tarjetas),
// hueso #f5f1e8, tinta #0d0e14, verde Scalerics #5ce611 (solo desde que entra Scalerics).
(function () {
  const R = "#e5383b", A = "#2f6bff", D = "#ffc531", H = "#f5f1e8", T = "#0d0e14", V = "#5ce611";
  const K = {};
  K.colores = { R, A, D, H, T, V };

  // EL DUEÑO: boxeador de rincón rojo con delantal de comercio y bigote. Caja 0..400 x 0..600,
  // pies en y 590, centro de la cara (200, 140).
  // opciones: { cara: "guardia" | "dolor" | "grito" | "feliz", guantes: R }
  K.duenio = function (o = {}) {
    const g = o.guantes || R;
    const caras = {
      guardia: `<path d="M168 128 l22 6 M232 128 l-22 6" stroke="${T}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="178" cy="145" r="7" fill="${T}"/><circle cx="222" cy="145" r="7" fill="${T}"/>
        <path d="M184 190 q16 -6 32 0" stroke="${T}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      dolor: `<path d="M166 136 l20 12 l-20 10 M234 136 l-20 12 l20 10" stroke="${T}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="200" cy="192" rx="18" ry="14" fill="${T}"/>`,
      grito: `<path d="M166 124 l24 12 M234 124 l-24 12" stroke="${T}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="180" cy="148" r="8" fill="${T}"/><circle cx="220" cy="148" r="8" fill="${T}"/>
        <path d="M176 182 q24 -8 48 0 q-4 34 -24 34 q-20 0 -24 -34 Z" fill="${T}"/>`,
      feliz: `<path d="M170 146 q8 -10 16 0 M214 146 q8 -10 16 0" stroke="${T}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M178 182 q22 22 44 0" stroke="${T}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    };
    return `<g class="k-duenio">
      <g class="k-d-piernas">
        <path d="M150 470 L146 572 M250 470 L254 572" stroke="${H}" stroke-width="34" stroke-linecap="round"/>
        <path d="M118 572 h58 v18 h-66 Z M224 572 h58 l8 18 h-66 Z" fill="${T}" stroke="${H}" stroke-width="4"/>
      </g>
      <path class="k-d-short" d="M126 392 H274 L282 480 H210 L200 446 L190 480 H118 Z" fill="${R}" stroke="${H}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M126 404 H274" stroke="${H}" stroke-width="6"/>
      <g class="k-d-torso">
        <path d="M112 236 Q200 206 288 236 L276 400 H124 Z" fill="${H}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path class="k-d-delantal" d="M146 262 Q200 250 254 262 V418 H146 Z" fill="${T}" stroke="${H}" stroke-width="4"/>
        <path d="M146 262 L120 236 M254 262 L280 236" stroke="${T}" stroke-width="5"/>
        <text x="200" y="320" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="25" letter-spacing="1" fill="${R}">TU</text>
        <text x="200" y="350" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="25" letter-spacing="1" fill="${R}">NEGOCIO</text>
      </g>
      <g class="k-d-brazoI"><path d="M124 250 Q84 300 112 214" stroke="${H}" stroke-width="30" fill="none" stroke-linecap="round"/>
        <g class="k-d-guanteI"><circle cx="112" cy="196" r="46" fill="${g}" stroke="${H}" stroke-width="5"/><path d="M84 232 h56 v20 h-56 Z" fill="${H}"/><path d="M96 176 q14 -12 30 -2" stroke="${H}" stroke-opacity="0.5" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
      <g class="k-d-brazoD"><path d="M276 250 Q316 300 288 214" stroke="${H}" stroke-width="30" fill="none" stroke-linecap="round"/>
        <g class="k-d-guanteD"><circle cx="288" cy="196" r="46" fill="${g}" stroke="${H}" stroke-width="5"/><path d="M260 232 h56 v20 h-56 Z" fill="${H}"/><path d="M272 176 q14 -12 30 -2" stroke="${H}" stroke-opacity="0.5" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
      <g class="k-d-cabeza">
        <path d="M186 196 h28 v20 h-28 Z" fill="${H}" stroke="${T}" stroke-width="4"/>
        <circle cx="200" cy="140" r="64" fill="${H}" stroke="${T}" stroke-width="5"/>
        <path d="M150 104 q20 -30 50 -32 q30 2 50 32" stroke="${T}" stroke-width="5" fill="none"/>
        <circle cx="136" cy="146" r="12" fill="${H}" stroke="${T}" stroke-width="4"/><circle cx="264" cy="146" r="12" fill="${H}" stroke="${T}" stroke-width="4"/>
        <path d="M170 172 q30 -16 60 0 q-14 12 -30 4 q-16 8 -30 -4 Z" fill="${T}"/>
        ${Object.entries(caras).map(([k, v]) => `<g class="k-d-cara k-d-${k}" opacity="${k === (o.cara || "guardia") ? 1 : 0}">${v}</g>`).join("")}
        <ellipse class="k-d-moreton" cx="222" cy="146" rx="20" ry="16" fill="${A}" opacity="0"/>
      </g>
    </g>`;
  };

  // EL ENLATADO: boxeador robot. Cabeza de lata de conserva (con abrelatas) sobre un cuerpo de caja
  // registradora con pantalla. Caja 0..500 x 0..720, pies en y 710. Pantalla: <text class="k-e-txt">.
  K.enlatado = function (o = {}) {
    const txts = [].concat(o.pantalla || "");
    const C = o.color || A, C2 = o.oscuro || "#1d3f99", ET = o.etiqueta || "ENLATADO", LT = o.lata || "#c9cfdb", OJ = o.ojos || D;
    return `<g class="k-enlatado">
      <g class="k-e-piernas">
        <path d="M170 560 V680 M330 560 V680" stroke="${H}" stroke-width="26" stroke-linecap="butt"/>
        <path d="M170 590 h0 M150 600 h40 M150 630 h40 M310 600 h40 M310 630 h40" stroke="${T}" stroke-width="6"/>
        <path d="M120 680 h100 v30 h-110 Z M280 680 h100 l10 30 h-110 Z" fill="${C}" stroke="${H}" stroke-width="5"/>
      </g>
      <g class="k-e-cuerpo">
        <path d="M86 270 H414 L440 520 H60 Z" fill="${C}" stroke="${H}" stroke-width="6" stroke-linejoin="round"/>
        <rect x="70" y="520" width="360" height="58" rx="6" fill="${C2}" stroke="${H}" stroke-width="5"/>
        <rect class="k-e-cajon" x="90" y="532" width="320" height="34" rx="4" fill="${T}" stroke="${H}" stroke-width="4"/>
        <circle cx="250" cy="549" r="7" fill="${D}"/>
        <rect x="128" y="290" width="244" height="104" rx="10" fill="${T}" stroke="${H}" stroke-width="5"/>
        ${txts.map((t, i) => `<text class="k-e-txt k-e-txt${i}" x="250" y="356" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="${o.tam || 30}" fill="${o.colorPantalla || D}" opacity="${i ? 0 : 1}">${t}</text>`).join("")}
        <g fill="${H}" fill-opacity="0.85">
          <rect x="128" y="414" width="40" height="26" rx="5"/><rect x="180" y="414" width="40" height="26" rx="5"/><rect x="232" y="414" width="40" height="26" rx="5"/><rect x="284" y="414" width="40" height="26" rx="5"/><rect x="336" y="414" width="40" height="26" rx="5" fill="${R}"/>
          <rect x="124" y="452" width="40" height="26" rx="5"/><rect x="176" y="452" width="40" height="26" rx="5"/><rect x="228" y="452" width="40" height="26" rx="5"/><rect x="280" y="452" width="40" height="26" rx="5"/><rect x="332" y="452" width="48" height="26" rx="5" fill="${D}"/>
        </g>
        <text x="250" y="508" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="20" letter-spacing="3" fill="${H}" fill-opacity="0.7" data-layout-ignore>${o.modelo || "MODELO ÚNICO"}</text>
      </g>
      <g class="k-e-cabeza">
        <path d="M232 270 v-26 h36 v26" fill="${H}" stroke="${T}" stroke-width="4"/>
        <path d="M232 252 h36 M232 262 h36" stroke="${T}" stroke-width="4"/>
        <rect x="160" y="70" width="180" height="176" rx="8" fill="${LT}" stroke="${H}" stroke-width="5"/>
        <path d="M160 96 H340 M160 220 H340" stroke="${T}" stroke-opacity="0.35" stroke-width="4"/>
        <ellipse cx="250" cy="70" rx="90" ry="18" fill="#dfe4ee" stroke="${H}" stroke-width="5"/>
        <g class="k-e-abrelatas"><ellipse cx="290" cy="64" rx="34" ry="10" fill="none" stroke="${T}" stroke-width="6"/><path d="M262 66 h-26" stroke="${T}" stroke-width="7" stroke-linecap="round"/></g>
        <rect x="160" y="110" width="180" height="58" fill="${C}"/>
        <text x="250" y="148" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" letter-spacing="2" fill="${H}">${ET}</text>
        <rect class="k-e-ojoI" x="186" y="180" width="44" height="18" rx="3" fill="${OJ}"/>
        <rect class="k-e-ojoD" x="270" y="180" width="44" height="18" rx="3" fill="${OJ}"/>
        <path class="k-e-ceja" d="${o.amable ? "M182 172 Q207 160 232 172 M268 172 Q293 160 318 172" : "M182 176 L232 186 M318 176 L268 186"}" stroke="${T}" stroke-width="7" stroke-linecap="round"/>
        <path d="M200 216 h100 M200 230 h100" stroke="${T}" stroke-width="5"/>
      </g>
      <g class="k-e-brazoI"><path d="M90 300 Q30 330 56 230" stroke="${H}" stroke-width="22" fill="none"/>
        <g class="k-e-guanteI"><circle cx="58" cy="206" r="54" fill="${C}" stroke="${H}" stroke-width="6"/><path d="M28 248 h62 v22 h-62 Z" fill="${H}"/></g></g>
      <g class="k-e-brazoD"><path d="M410 300 Q470 330 444 230" stroke="${H}" stroke-width="22" fill="none"/>
        <g class="k-e-guanteD"><circle cx="442" cy="206" r="54" fill="${C}" stroke="${H}" stroke-width="6"/><path d="M410 248 h62 v22 h-62 Z" fill="${H}"/></g></g>
    </g>`;
  };

  // EL ANUNCIADOR: smoking, moño dorado, micrófono que baja del techo. Caja 0..400 x 0..640.
  // El cable del micrófono sube hasta y -1200.
  K.anunciador = function (o = {}) {
    return `<g class="k-anunciador">
      <path d="M262 ${o.cable || -560} V96" stroke="${H}" stroke-opacity="0.6" stroke-width="4"/>
      <path d="M110 640 L120 300 Q200 268 280 300 L290 640 Z" fill="${T}" stroke="${H}" stroke-width="5"/>
      <path d="M172 290 L200 420 L228 290" fill="${H}" stroke="${H}" stroke-width="3"/>
      <path d="M150 300 L200 470 L250 300" fill="none" stroke="${H}" stroke-opacity="0.5" stroke-width="4"/>
      <path class="k-a-monio" d="M200 300 L168 284 V316 Z M200 300 L232 284 V316 Z" fill="${D}" stroke="${T}" stroke-width="3"/>
      <g class="k-a-brazo"><path d="M276 320 Q340 260 290 170" stroke="${T}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M276 320 Q340 260 290 170" stroke="${H}" stroke-opacity="0.4" stroke-width="3" fill="none"/>
        <circle cx="282" cy="158" r="20" fill="${H}" stroke="${T}" stroke-width="4"/></g>
      <g class="k-a-cabeza">
        <rect x="186" y="236" width="28" height="44" fill="${H}" stroke="${T}" stroke-width="4"/>
        <ellipse cx="200" cy="180" rx="66" ry="76" fill="${H}" stroke="${T}" stroke-width="5"/>
        <path d="M134 168 Q140 96 200 100 Q262 96 266 168 Q250 124 200 126 Q160 124 134 168 Z" fill="${T}"/>
        <path d="M164 168 l22 -6 M236 168 l-22 -6" stroke="${T}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="176" cy="184" r="7" fill="${T}"/><circle cx="224" cy="184" r="7" fill="${T}"/>
        <ellipse class="k-a-boca" cx="200" cy="224" rx="24" ry="18" fill="${T}"/>
      </g>
      <g class="k-a-micro"><rect x="246" y="96" width="32" height="70" rx="12" fill="${T}" stroke="${H}" stroke-width="4"/><rect x="242" y="70" width="40" height="40" rx="18" fill="#9aa0ad" stroke="${H}" stroke-width="4"/></g>
    </g>`;
  };

  // EL ENTRENADOR: veterano de gimnasio con gorra roja, toalla y silbato. Caja 0..400 x 0..520.
  K.entrenador = function () {
    return `<g class="k-entrenador">
      <path d="M90 520 L104 300 Q200 262 296 300 L310 520 Z" fill="${R}" stroke="${H}" stroke-width="5"/>
      <path d="M120 296 Q160 360 150 520 M150 290 Q190 360 186 430" stroke="${H}" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M200 296 v84" stroke="${H}" stroke-width="4"/><rect x="186" y="378" width="30" height="20" rx="6" fill="${D}" stroke="${T}" stroke-width="3"/>
      <g class="k-t-brazo"><path d="M292 320 Q356 300 350 200" stroke="${R}" stroke-width="40" fill="none" stroke-linecap="round"/>
        <circle cx="350" cy="182" r="30" fill="${H}" stroke="${T}" stroke-width="4"/><path d="M346 154 v-30" stroke="${H}" stroke-width="16" stroke-linecap="round"/></g>
      <g class="k-t-cabeza">
        <rect x="184" y="236" width="32" height="46" fill="${H}" stroke="${T}" stroke-width="4"/>
        <circle cx="200" cy="180" r="70" fill="${H}" stroke="${T}" stroke-width="5"/>
        <path d="M128 160 Q130 100 200 98 Q270 100 272 160 Z" fill="${R}" stroke="${T}" stroke-width="4"/>
        <path d="M128 158 H300 q10 6 0 14 H128 Z" fill="${R}" stroke="${T}" stroke-width="4"/>
        <path d="M160 186 l24 4 M240 186 l-24 4" stroke="${T}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="176" cy="200" r="6" fill="${T}"/><circle cx="224" cy="200" r="6" fill="${T}"/>
        <path d="M164 222 q36 -16 72 0 q-10 12 -36 6 q-26 6 -36 -6 Z" fill="#9aa0ad" stroke="${T}" stroke-width="3"/>
        <path class="k-t-boca" d="M182 236 q18 22 36 0 Z" fill="${T}"/>
      </g>
    </g>`;
  };

  // Tarjeta de round (la que se levanta en el ring). Centro (0,0), 560x360.
  K.tarjeta = function (n, sub = "") {
    return `<g class="k-tarjeta"><rect x="-280" y="-180" width="560" height="360" rx="18" fill="${T}" stroke="${D}" stroke-width="10"/>
      <rect x="-262" y="-162" width="524" height="324" rx="10" fill="none" stroke="${D}" stroke-opacity="0.35" stroke-width="3"/>
      <text x="0" y="-70" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="78" letter-spacing="14" fill="${D}">ROUND</text>
      <text x="0" y="${sub ? 110 : 140}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${sub ? 170 : 210}" fill="${H}">${n}</text>
      ${sub ? `<text x="0" y="158" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" letter-spacing="4" fill="${D}">${sub}</text>` : ""}</g>`;
  };
  // tilde dibujado (sin emojis). Centro (0,0).
  K.tilde = function (c = V, r = 30) {
    return `<g class="k-tilde"><circle r="${r}" fill="${c}"/><path d="M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}" stroke="${T}" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  };
  // cruz dibujada. Centro (0,0).
  K.cruz = function (c = R, r = 30) {
    return `<g class="k-cruz"><circle r="${r}" fill="${c}"/><path d="M${-r * 0.38} ${-r * 0.38} L${r * 0.38} ${r * 0.38} M${r * 0.38} ${-r * 0.38} L${-r * 0.38} ${r * 0.38}" stroke="${H}" stroke-width="${r * 0.22}" stroke-linecap="round"/></g>`;
  };

  // Un local de barrio de frente (toldo a rayas, vidriera, puerta). Centro abajo (0,0), 300x320.
  K.local = function (nombre, c = R) {
    let toldo = "";
    for (let i = 0; i < 6; i++) toldo += `<path d="M${-150 + i * 50} -250 h50 l${i < 3 ? -4 : 4} 60 h-50 Z" fill="${i % 2 ? H : c}"/>`;
    return `<g class="k-local"><rect x="-140" y="-320" width="280" height="70" rx="6" fill="${T}" stroke="${H}" stroke-width="5"/>
      <text x="0" y="-273" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="34" fill="${H}">${nombre}</text>
      ${toldo}<path d="M-150 -250 H150 L154 -190 H-154 Z" fill="none" stroke="${T}" stroke-width="4"/>
      <rect x="-140" y="-190" width="280" height="190" fill="#1b1e2a" stroke="${H}" stroke-width="5"/>
      <rect x="-118" y="-160" width="130" height="110" fill="${H}" fill-opacity="0.12" stroke="${H}" stroke-width="4"/>
      <rect x="40" y="-160" width="78" height="160" fill="${T}" stroke="${H}" stroke-width="4"/><circle cx="100" cy="-80" r="5" fill="${D}"/></g>`;
  };
  // Monitor de computadora con texto. Centro abajo (0,0), 360x300.
  K.compu = function (lineas = [], c = A) {
    return `<g class="k-compu"><rect x="-180" y="-300" width="360" height="230" rx="14" fill="${T}" stroke="${c}" stroke-width="8"/>
      ${lineas.map((l, i) => `<text x="0" y="${-220 + i * 50}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="${i ? H : c}">${l}</text>`).join("")}
      <path d="M-30 -70 L-44 -20 H44 L30 -70 Z" fill="${c}"/><rect x="-90" y="-20" width="180" height="20" rx="6" fill="${c}"/></g>`;
  };
  // Cuaderno abierto con renglones (los renglones .k-c-r se escriben con dibujar). Centro (0,0), 380x260.
  K.cuaderno = function () {
    let r = "";
    for (let i = 0; i < 5; i++) r += `<path class="k-c-r" d="M${-160} ${-80 + i * 38} q20 -12 40 0 t40 0 t40 0" stroke="${T}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 5; i++) r += `<path class="k-c-r" d="M${24} ${-80 + i * 38} q18 -12 36 0 t36 0 t36 0" stroke="${T}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    return `<g class="k-cuaderno"><path d="M-190 -130 H0 V130 H-190 Z M0 -130 H190 V130 H0 Z" fill="${H}" stroke="${T}" stroke-width="5"/>
      <path d="M0 -130 V130" stroke="${R}" stroke-width="6"/>${r}</g>`;
  };
  // dibujar un trazo (stroke-dashoffset), con opacity 0 hasta que arranca
  K.dibujar = function (tl, el, t, dur = 0.5) {
    const L = el.getTotalLength ? el.getTotalLength() : 400;
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
    tl.set(el, { opacity: 1 }, t);
    tl.to(el, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t);
  };

  // Estallido de golpe (estrella de cómic) con texto. Centro (0,0), radio ~150.
  K.estallido = function (texto, color = D, tinta = T, tam = 46) {
    let d = "";
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, r = i % 2 ? 92 : 160;
      d += (i ? "L" : "M") + (Math.cos(a) * r * 1.25).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1) + " ";
    }
    return `<g class="k-estallido"><path d="${d}Z" fill="${color}" stroke="${tinta}" stroke-width="6" stroke-linejoin="round"/>
      <text x="0" y="${tam * 0.36}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${tam}" fill="${tinta}">${texto}</text></g>`;
  };

  // Campana de ring (dorada) con martillito. Centro (0,0).
  K.campana = function () {
    return `<g class="k-campana"><path d="M-14 -96 h28 v20 h-28 Z" fill="${H}"/>
      <path d="M-80 30 Q-84 -80 0 -80 Q84 -80 80 30 L96 52 H-96 Z" fill="${D}" stroke="${T}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-50 -20 Q-46 -54 -10 -60" stroke="${H}" stroke-opacity="0.7" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="66" r="14" fill="${T}"/>
      <g class="k-martillo"><path d="M120 -120 L44 -10" stroke="${H}" stroke-width="10" stroke-linecap="round"/><rect x="26" y="-30" width="40" height="28" rx="6" transform="rotate(-55 46 -16)" fill="${H}" stroke="${T}" stroke-width="4"/></g>
    </g>`;
  };

  // ---- ayudas de animación (todas deterministas) ----
  // cambiar la cara del dueño en t
  K.cara = function (tl, scope, nombre, t) {
    scope.querySelectorAll(".k-d-cara").forEach((c) => tl.set(c, { opacity: c.classList.contains("k-d-" + nombre) ? 1 : 0 }, t));
  };
  // cambiar el texto de la pantalla del enlatado en t (índice del array "pantalla")
  K.pantalla = function (tl, scope, i, t) {
    scope.querySelectorAll(".k-e-txt").forEach((c) => tl.set(c, { opacity: c.classList.contains("k-e-txt" + i) ? 1 : 0 }, t));
  };
  // sacudón de cámara
  K.sacudir = function (tl, el, t, f = 16) {
    [[-f, f * 0.55], [f * 0.75, -f * 0.45], [-f * 0.4, f * 0.2], [0, 0]].forEach(([x, y], i) => tl.to(el, { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
  };
  // palabra o cartel que cae de golpe (de grande a su tamaño)
  K.golpe = function (tl, el, t, desde = 2.4) {
    gsap.set(el, { opacity: 0 });
    tl.fromTo(el, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
  };
  // aparece con pop
  K.pop = function (tl, el, t, extra = {}) {
    gsap.set(el, { opacity: 0 });
    tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false, ...extra }, t);
  };

  window.KIT = K;
})();
