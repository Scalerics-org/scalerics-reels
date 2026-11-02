// Personajes del reel "Titanes", lucha libre de la tele de antes, dibujados en SVG. Cada función
// devuelve el marcado de un <g> (en su propio sistema de coordenadas) para meterlo en el <svg> de
// una escena con innerHTML ANTES de armar el timeline. Las partes tienen clases k-... para animarlas
// (rotar y escalar SIEMPRE con svgOrigin).
// Paleta: rojo #e8332a, amarillo #ffd23f, azul eléctrico #2a5cff, negro #0b0b12, hueso #f4efe2,
// piel #e8b48a; verde Scalerics #5ce611 solo desde que entra el compañero.
(function () {
  const R = "#e8332a", Y = "#ffd23f", B = "#2a5cff", N = "#0b0b12", H = "#f4efe2", P = "#e8b48a", P2 = "#c98f66", V = "#5ce611";
  const K = {};
  K.colores = { R, Y, B, N, H, P, V };

  // EL DUEÑO: sin máscara, pelado con costados, ojeras, musculosa, delantal y un lápiz en la oreja.
  // Caja 0..400 x 0..640, pies en y 632, centro de la cara (200, 150).
  // opciones: { cara: "cansado" | "dolor" | "ko" | "feliz" | "grito" }
  K.duenio = function (o = {}) {
    const ojeras = `<path d="M164 170 q14 8 28 0 M208 170 q14 8 28 0" stroke="${P2}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const caras = {
      cansado: `<path d="M162 150 h30 M208 150 h30" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
        <path d="M166 152 q11 10 22 0 M212 152 q11 10 22 0" fill="${N}"/>
        <path d="M180 206 q20 -4 40 2" stroke="${N}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      dolor: `<path d="M162 140 l24 12 l-24 10 M238 140 l-24 12 l24 10" stroke="${N}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="200" cy="206" rx="16" ry="14" fill="${N}"/>`,
      ko: `<path d="M164 138 l24 24 M188 138 l-24 24 M212 138 l24 24 M236 138 l-24 24" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
        <path d="M178 204 q22 -10 44 0" stroke="${N}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M206 206 q4 22 14 20 q8 -2 4 -20" fill="${R}" stroke="${N}" stroke-width="4"/>`,
      feliz: `<path d="M164 154 q12 -14 24 0 M212 154 q12 -14 24 0" stroke="${N}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M174 196 q26 30 52 0 Z" fill="${N}"/>`,
      grito: `<path d="M162 132 l26 10 M238 132 l-26 10" stroke="${N}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="178" cy="154" r="8" fill="${N}"/><circle cx="222" cy="154" r="8" fill="${N}"/>
        <path d="M178 192 q22 -8 44 0 q-4 34 -22 34 q-18 0 -22 -34 Z" fill="${N}"/>`,
    };
    return `<g class="k-duenio">
      <g class="k-d-piernas">
        <path d="M156 470 L150 600 M244 470 L250 600" stroke="#3a3a4c" stroke-width="40" stroke-linecap="round"/>
        <path d="M110 600 h66 v24 h-74 Z M224 600 h66 l8 24 h-74 Z" fill="${N}" stroke="${H}" stroke-width="4" stroke-linejoin="round"/>
      </g>
      <g class="k-d-torso">
        <path d="M118 250 Q200 222 282 250 Q300 360 276 470 H124 Q100 360 118 250 Z" fill="#cfcabd" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M150 250 Q200 290 250 250" stroke="${N}" stroke-width="5" fill="none"/>
        <path class="k-d-delantal" d="M144 300 H256 L270 500 H130 Z" fill="${H}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M144 300 L160 250 M256 300 L240 250" stroke="${N}" stroke-width="5"/>
        <path d="M130 360 H270" stroke="${R}" stroke-width="6"/>
        <rect x="168" y="398" width="64" height="44" rx="4" fill="none" stroke="${N}" stroke-width="4"/>
        <path d="M150 482 Q140 470 132 486" stroke="${N}" stroke-width="3" fill="none"/>
        <path class="k-d-mancha" d="M226 450 q10 -8 18 2 q-2 10 -14 8 Z" fill="${P2}" opacity="0.5"/>
      </g>
      <g class="k-d-brazoI"><path d="M124 266 Q82 360 106 440" stroke="${P}" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M124 266 Q82 360 106 440" stroke="${N}" stroke-width="3" stroke-opacity="0.4" fill="none"/>
        <circle class="k-d-manoI" cx="108" cy="452" r="24" fill="${P}" stroke="${N}" stroke-width="4"/></g>
      <g class="k-d-brazoD"><path d="M276 266 Q318 360 294 440" stroke="${P}" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M276 266 Q318 360 294 440" stroke="${N}" stroke-width="3" stroke-opacity="0.4" fill="none"/>
        <circle class="k-d-manoD" cx="292" cy="452" r="24" fill="${P}" stroke="${N}" stroke-width="4"/></g>
      <g class="k-d-cabeza">
        <path d="M184 214 h32 v28 h-32 Z" fill="${P}" stroke="${N}" stroke-width="4"/>
        <ellipse cx="200" cy="150" rx="70" ry="76" fill="${P}" stroke="${N}" stroke-width="5"/>
        <path d="M132 160 Q128 112 150 96 Q140 130 146 156 Z M268 160 Q272 112 250 96 Q260 130 254 156 Z" fill="#4a4652" stroke="${N}" stroke-width="3"/>
        <path d="M176 92 q24 -8 48 0" stroke="${P2}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="128" cy="158" rx="12" ry="18" fill="${P}" stroke="${N}" stroke-width="4"/><ellipse cx="272" cy="158" rx="12" ry="18" fill="${P}" stroke="${N}" stroke-width="4"/>
        <path d="M266 118 L300 92" stroke="${Y}" stroke-width="10" stroke-linecap="round"/><path d="M298 93 l8 -6" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
        <path d="M200 160 q-6 18 0 24" stroke="${N}" stroke-width="4" fill="none" stroke-linecap="round"/>
        ${ojeras}
        <g fill="${N}" opacity="0.35"><circle cx="160" cy="214" r="2.5"/><circle cx="174" cy="222" r="2.5"/><circle cx="226" cy="222" r="2.5"/><circle cx="240" cy="214" r="2.5"/><circle cx="200" cy="228" r="2.5"/></g>
        ${Object.entries(caras).map(([k, v]) => `<g class="k-d-cara k-d-${k}" opacity="${k === (o.cara || "cansado") ? 1 : 0}">${v}</g>`).join("")}
        <g class="k-d-sudor" opacity="0"><path d="M276 120 q10 16 0 22 q-10 -6 0 -22 Z" fill="#9fd0ff" stroke="${N}" stroke-width="3"/></g>
      </g>
    </g>`;
  };

  // Emblemas de las máscaras (centro 0,0, ~70 px)
  const EMB = {
    planilla: (c) => `<rect x="-38" y="-30" width="76" height="60" rx="4" fill="${H}" stroke="${N}" stroke-width="4"/><path d="M-38 -10 H38 M-38 10 H38 M-12 -30 V30 M14 -30 V30" stroke="${N}" stroke-width="3"/>`,
    copia: (c) => `<rect x="-34" y="-30" width="44" height="52" rx="4" fill="${H}" stroke="${N}" stroke-width="4"/><rect x="-10" y="-18" width="44" height="52" rx="4" fill="${Y}" stroke="${N}" stroke-width="4"/>`,
    reloj: (c) => `<circle cx="0" cy="4" r="30" fill="${H}" stroke="${N}" stroke-width="4"/><path d="M0 4 V-14 M0 4 L14 12" stroke="${N}" stroke-width="5" stroke-linecap="round"/><path d="M-30 -18 l12 -14 M30 -18 l-12 -14" stroke="${N}" stroke-width="7" stroke-linecap="round"/>`,
    listo: (c) => `<path d="M-34 -24 h68 a8 8 0 0 1 8 8 v32 a8 8 0 0 1 -8 8 h-50 l-14 12 v-12 h-4 a8 8 0 0 1 -8 -8 v-32 a8 8 0 0 1 8 -8 Z" fill="${H}" stroke="${N}" stroke-width="4"/><path d="M-20 0 l8 8 l14 -16 M2 0 l8 8 l14 -16" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    engranaje: (c) => { let d = ""; for (let i = 0; i < 8; i++) d += `<rect x="-9" y="-42" width="18" height="18" rx="3" transform="rotate(${i * 45})" fill="${V}" stroke="${N}" stroke-width="3"/>`; return `${d}<circle r="29" fill="${V}" stroke="${N}" stroke-width="3"/><circle r="11" fill="${N}"/>`; },
  };

  // LUCHADOR ENMASCARADO. Caja 0..440 x 0..700, pies en y 692, centro de la máscara (220, 150).
  // opciones: { color, trim, emblema: "planilla"|"copia"|"reloj"|"listo"|"engranaje", nombre, boca: "risa"|"burla"|"dolor"|"grito" }
  K.luchador = function (o = {}) {
    const C = o.color || B, T = o.trim || Y, E = EMB[o.emblema || "planilla"]();
    const bocas = {
      risa: `<path d="M196 196 q24 22 48 0 Z" fill="${N}"/><path d="M200 198 h40" stroke="${H}" stroke-width="5"/>`,
      burla: `<path d="M196 202 q16 10 40 -6" stroke="${N}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
      dolor: `<ellipse cx="220" cy="204" rx="14" ry="12" fill="${N}"/>`,
      grito: `<path d="M198 192 q22 -6 44 0 q-4 30 -22 30 q-18 0 -22 -30 Z" fill="${N}"/>`,
    };
    return `<g class="k-luchador">
      <g class="k-l-piernas">
        <path d="M168 500 L156 640 M272 500 L284 640" stroke="${C}" stroke-width="56" stroke-linecap="round"/>
        <path d="M128 590 h60 v92 h-74 Z M252 590 h60 l10 92 h-74 Z" fill="${T}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M132 620 h52 M256 620 h52 M132 648 h52 M256 648 h54" stroke="${N}" stroke-width="4"/>
      </g>
      <path class="k-l-short" d="M140 440 H300 L312 530 H232 L220 500 L208 530 H128 Z" fill="${C}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M140 452 H300" stroke="${T}" stroke-width="10"/>
      <g class="k-l-torso">
        <path d="M110 250 Q220 214 330 250 L300 446 H140 Z" fill="${P}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M150 300 Q184 330 216 306 M224 306 Q256 330 290 300" stroke="${N}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M220 336 V430 M190 362 h60 M194 396 h52" stroke="${N}" stroke-width="3" stroke-opacity="0.5" fill="none"/>
        ${o.nombre ? `<rect x="120" y="404" width="200" height="40" rx="6" fill="${N}" stroke="${T}" stroke-width="4"/><text x="220" y="432" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${o.tamNombre || 22}" letter-spacing="1" fill="${T}">${o.nombre}</text>` : ""}
      </g>
      <g class="k-l-brazoI"><path d="M118 262 Q40 300 52 210" stroke="${P}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M118 262 Q40 300 52 210" stroke="${N}" stroke-width="3" stroke-opacity="0.35" fill="none"/>
        <circle cx="54" cy="196" r="30" fill="${P}" stroke="${N}" stroke-width="5"/><path d="M30 226 h48 v16 h-48 Z" fill="${T}" stroke="${N}" stroke-width="3"/></g>
      <g class="k-l-brazoD"><path d="M322 262 Q400 300 388 210" stroke="${P}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M322 262 Q400 300 388 210" stroke="${N}" stroke-width="3" stroke-opacity="0.35" fill="none"/>
        <circle cx="386" cy="196" r="30" fill="${P}" stroke="${N}" stroke-width="5"/><path d="M362 226 h48 v16 h-48 Z" fill="${T}" stroke="${N}" stroke-width="3"/></g>
      <g class="k-l-cabeza">
        <path d="M200 222 h40 v34 h-40 Z" fill="${C}" stroke="${N}" stroke-width="4"/>
        <ellipse cx="220" cy="150" rx="78" ry="86" fill="${C}" stroke="${N}" stroke-width="6"/>
        <path d="M220 64 V236" stroke="${T}" stroke-width="8" opacity="0.9"/>
        <path d="M150 140 Q170 104 210 132 Q196 168 160 166 Q146 160 150 140 Z M290 140 Q270 104 230 132 Q244 168 280 166 Q294 160 290 140 Z" fill="${T}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
        <path class="k-l-ojos" d="M162 146 Q178 132 198 142 Q186 156 168 156 Z M278 146 Q262 132 242 142 Q254 156 272 156 Z" fill="${H}" stroke="${N}" stroke-width="3"/>
        <circle cx="184" cy="147" r="6" fill="${N}"/><circle cx="256" cy="147" r="6" fill="${N}"/>
        <path d="M156 124 L204 136 M284 124 L236 136" stroke="${N}" stroke-width="7" stroke-linecap="round"/>
        <path d="M180 178 Q220 166 260 178 Q262 222 220 228 Q178 222 180 178 Z" fill="${P}" stroke="${T}" stroke-width="6"/>
        ${Object.entries(bocas).map(([k, v]) => `<g class="k-l-boca k-l-${k}" opacity="${k === (o.boca || "burla") ? 1 : 0}">${v}</g>`).join("")}
        <g transform="translate(220 92) scale(0.62)">${E}</g>
      </g>
    </g>`;
  };

  // EL PRESENTADOR: saco rojo de lentejuelas, solapas amarillas, moño, jopo, micrófono de mano con
  // cable. Caja 0..360 x 0..640, centro de la cara (180, 150). La mano con el micrófono está en
  // .k-p-brazo (gira en svgOrigin "250 300"). Bocas: .k-p-abierta / .k-p-grito / .k-p-sonrisa.
  K.presentador = function (o = {}) {
    const bocas = {
      sonrisa: `<path d="M152 192 q28 26 56 0 Z" fill="${N}"/><path d="M158 194 h44" stroke="${H}" stroke-width="5"/>`,
      abierta: `<ellipse cx="180" cy="200" rx="22" ry="16" fill="${N}"/>`,
      grito: `<path d="M150 184 q30 -8 60 0 q-6 46 -30 46 q-24 0 -30 -46 Z" fill="${N}"/><path d="M158 190 h44" stroke="${H}" stroke-width="5"/>`,
    };
    return `<g class="k-presentador">
      <path d="M120 470 L114 620 M240 470 L246 620" stroke="${N}" stroke-width="40" stroke-linecap="round"/>
      <path d="M80 620 h66 v18 h-74 Z M214 620 h66 l8 18 h-74 Z" fill="${N}" stroke="${H}" stroke-width="4"/>
      <path d="M70 486 L84 270 Q180 236 276 270 L290 486 Z" fill="${R}" stroke="${N}" stroke-width="5" stroke-linejoin="round"/>
      <g fill="${Y}" opacity="0.65"><circle cx="110" cy="320" r="4"/><circle cx="104" cy="380" r="4"/><circle cx="118" cy="440" r="4"/><circle cx="250" cy="320" r="4"/><circle cx="256" cy="380" r="4"/><circle cx="244" cy="440" r="4"/><circle cx="96" cy="350" r="3"/><circle cx="264" cy="410" r="3"/></g>
      <path d="M150 262 L180 380 L210 262 Z" fill="${H}" stroke="${N}" stroke-width="4"/>
      <path d="M132 268 L172 420 L150 270 Z M228 268 L188 420 L210 270 Z" fill="${Y}" stroke="${N}" stroke-width="4" stroke-linejoin="round"/>
      <path class="k-p-monio" d="M180 274 L152 258 V290 Z M180 274 L208 258 V290 Z" fill="${N}" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M86 290 Q48 380 92 450" stroke="${R}" stroke-width="38" fill="none" stroke-linecap="round"/><circle cx="96" cy="462" r="22" fill="${P}" stroke="${N}" stroke-width="4"/>
      <path d="M262 192 Q330 300 ${o.cableX || 360} 560" stroke="${N}" stroke-width="6" fill="none" opacity="0.8"/>
      <g class="k-p-brazo"><path d="M272 290 Q330 250 280 196" stroke="${R}" stroke-width="38" fill="none" stroke-linecap="round"/>
        <circle cx="270" cy="186" r="22" fill="${P}" stroke="${N}" stroke-width="4"/>
        <path d="M250 150 L280 196" stroke="${N}" stroke-width="16" stroke-linecap="round"/>
        <circle cx="244" cy="140" r="22" fill="#9a9aa8" stroke="${N}" stroke-width="5"/><path d="M230 132 h28 M228 142 h32 M230 152 h28" stroke="${N}" stroke-width="2" opacity="0.5"/></g>
      <g class="k-p-cabeza">
        <path d="M166 222 h28 v26 h-28 Z" fill="${P}" stroke="${N}" stroke-width="4"/>
        <ellipse cx="180" cy="154" rx="62" ry="72" fill="${P}" stroke="${N}" stroke-width="5"/>
        <path d="M116 140 Q110 66 180 62 Q250 58 252 120 Q236 96 204 98 Q240 70 196 72 Q150 74 150 104 Q128 112 116 140 Z" fill="${N}"/>
        <path d="M150 82 q40 -20 80 4" stroke="${H}" stroke-width="4" fill="none" opacity="0.35"/>
        <path d="M126 168 Q122 200 140 214 M234 168 Q238 200 220 214" stroke="${N}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M150 132 l22 -4 M210 128 l22 4" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="160" cy="150" r="7" fill="${N}"/><circle cx="204" cy="150" r="7" fill="${N}"/>
        <path d="M150 178 q30 -12 60 0" stroke="${N}" stroke-width="7" fill="none" stroke-linecap="round"/>
        ${Object.entries(bocas).map(([k, v]) => `<g class="k-p-boca k-p-${k}" opacity="${k === (o.boca || "grito") ? 1 : 0}">${v}</g>`).join("")}
      </g>
    </g>`;
  };

  // EL ÁRBITRO: camisa a rayas, moño. De costado, arrodillado, golpeando la lona con .k-a-brazo
  // (gira en svgOrigin "190 250"). Caja 0..320 x 0..420, rodilla en el piso y 410.
  K.arbitro = function () {
    let rayas = "";
    for (let i = 0; i < 6; i++) rayas += `<path d="M${96 + i * 22} 170 V330" stroke="${N}" stroke-width="10"/>`;
    return `<g class="k-arbitro">
      <path d="M110 320 L80 410 H200 L170 330 Z" fill="${N}" stroke="${H}" stroke-width="3"/>
      <g><path d="M86 170 H230 L216 330 H100 Z" fill="${H}" stroke="${N}" stroke-width="5"/>${rayas}</g>
      <path d="M150 170 l-16 -10 v20 Z M150 170 l16 -10 v20 Z" fill="${N}"/>
      <g class="k-a-brazo"><path d="M200 190 Q270 240 280 330" stroke="${P}" stroke-width="30" fill="none" stroke-linecap="round"/>
        <path d="M262 334 h40 v26 h-40 Z" fill="${P}" stroke="${N}" stroke-width="4" rx="8"/></g>
      <g class="k-a-cabeza">
        <ellipse cx="150" cy="104" rx="52" ry="60" fill="${P}" stroke="${N}" stroke-width="5"/>
        <path d="M100 96 Q104 44 152 44 Q196 44 202 92 Q180 70 150 72 Q118 72 100 96 Z" fill="#4a4652"/>
        <circle cx="176" cy="104" r="6" fill="${N}"/>
        <path d="M168 88 l20 -4" stroke="${N}" stroke-width="5" stroke-linecap="round"/>
        <ellipse class="k-a-boca" cx="184" cy="136" rx="12" ry="10" fill="${N}"/>
      </g>
    </g>`;
  };

  // Estallido de cómic con texto. Centro (0,0), radio ~160.
  K.estallido = function (texto, color = Y, tinta = N, tam = 46, puntas = 16) {
    let d = "";
    for (let i = 0; i < puntas; i++) {
      const a = (i / puntas) * Math.PI * 2, r = i % 2 ? 96 : 164;
      d += (i ? "L" : "M") + (Math.cos(a) * r * 1.3).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1) + " ";
    }
    return `<g class="k-estallido"><path d="${d}Z" fill="${color}" stroke="${tinta}" stroke-width="7" stroke-linejoin="round"/>
      <text x="0" y="${tam * 0.36}" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="${tam}" fill="${tinta}">${texto}</text></g>`;
  };

  // Planilla de cálculo (hoja) con filas. Centro (0,0), 360 x 300. Celdas llenables: .k-pl-f0.. .k-pl-f5
  K.planilla = function (o = {}) {
    const filas = o.filas || ["Pedido", "Marta: 2 tortas", "Luis: 1 pizza", "Ana: 3 empanadas", "Rosa: 1 flan", "Juan: 2 pizzas"];
    let f = "";
    filas.forEach((t, i) => {
      const y = -110 + i * 44;
      f += `<g class="k-pl-f${i}"><text x="-130" y="${y + 30}" font-family="IBM Plex Mono" font-weight="500" font-size="24" fill="${i ? N : B}">${t}</text></g>`;
    });
    let g = "";
    for (let i = 0; i <= 6; i++) g += `<path d="M-180 ${-110 + i * 44} H180" stroke="${N}" stroke-opacity="0.3" stroke-width="2"/>`;
    return `<g class="k-planilla"><rect x="-180" y="-150" width="360" height="304" rx="8" fill="${H}" stroke="${N}" stroke-width="6"/>
      <rect x="-180" y="-150" width="360" height="40" rx="8" fill="${B}"/><text x="0" y="-122" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="22" fill="${H}" letter-spacing="2">PEDIDOS.XLS</text>
      ${g}<path d="M-140 -110 V154" stroke="${N}" stroke-opacity="0.3" stroke-width="2"/>
      <g fill="${N}" opacity="0.45" font-family="IBM Plex Mono" font-size="18"><text x="-170" y="-82">A</text><text x="-170" y="-38">1</text><text x="-170" y="6">2</text><text x="-170" y="50">3</text><text x="-170" y="94">4</text><text x="-170" y="138">5</text></g>
      ${f}</g>`;
  };

  // Celular con chat (globos). Centro (0,0), 300 x 560. Globos .k-ce-g0.. con texto.
  K.celular = function (o = {}) {
    const gl = o.globos || [];
    let s = "";
    gl.forEach(([t, mio], i) => {
      const y = -170 + i * 84, w = Math.min(230, 30 + t.length * 13);
      const x = mio ? 120 - w : -120;
      s += `<g class="k-ce-g${i}"><rect x="${x}" y="${y}" width="${w}" height="60" rx="16" fill="${mio ? (o.colorMio || B) : H}" stroke="${N}" stroke-width="3"/>
        <text x="${x + 16}" y="${y + 39}" font-family="Lexend" font-weight="600" font-size="24" fill="${mio ? H : N}">${t}</text></g>`;
    });
    return `<g class="k-celular"><rect x="-150" y="-280" width="300" height="560" rx="44" fill="${N}" stroke="${H}" stroke-width="7"/>
      <rect x="-128" y="-250" width="256" height="500" rx="26" fill="#1b1d2c"/>
      <rect x="-128" y="-250" width="256" height="62" rx="26" fill="${o.colorBarra || R}"/><rect x="-128" y="-210" width="256" height="22" fill="${o.colorBarra || R}"/>
      <circle cx="-94" cy="-219" r="18" fill="${H}"/><text x="-64" y="-210" font-family="Lexend" font-weight="600" font-size="24" fill="${H}">${o.titulo || "Clientes"}</text>
      <rect x="-30" y="-270" width="60" height="10" rx="5" fill="${H}" opacity="0.5"/>
      ${s}</g>`;
  };

  // Reloj despertador. Centro (0,0), r ~110. Agujas .k-rj-h y .k-rj-m (giran en svgOrigin "0 0" del grupo).
  K.reloj = function (o = {}) {
    return `<g class="k-reloj">
      <path d="M-70 96 l-26 40 M70 96 l26 40" stroke="${N}" stroke-width="12" stroke-linecap="round"/>
      <g class="k-rj-campanas"><path d="M-110 -74 a44 44 0 0 1 64 -54 Z M110 -74 a44 44 0 0 0 -64 -54 Z" fill="${Y}" stroke="${N}" stroke-width="6" stroke-linejoin="round"/></g>
      <circle r="110" fill="${o.color || R}" stroke="${N}" stroke-width="7"/><circle r="86" fill="${H}" stroke="${N}" stroke-width="5"/>
      <g stroke="${N}" stroke-width="6" stroke-linecap="round"><path d="M0 -74 v12 M0 74 v-12 M-74 0 h12 M74 0 h-12"/></g>
      <path class="k-rj-h" d="M0 0 V-44" stroke="${N}" stroke-width="9" stroke-linecap="round"/>
      <path class="k-rj-m" d="M0 0 V-66" stroke="${N}" stroke-width="6" stroke-linecap="round"/>
      <circle r="9" fill="${N}"/></g>`;
  };

  // Cartel de round de póster: "ROUND" chico y el número gigante. Centro (0,0).
  K.cartelRound = function (n, color = Y, tinta = N) {
    return `<g class="k-round"><rect x="-200" y="-220" width="400" height="440" rx="18" fill="${color}" stroke="${tinta}" stroke-width="10" transform="rotate(-4)"/>
      <text x="0" y="-120" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="72" letter-spacing="6" fill="${tinta}" transform="rotate(-4)">ROUND</text>
      <text x="0" y="170" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="330" fill="${tinta}" transform="rotate(-4)">${n}</text></g>`;
  };

  // ---- ayudas de animación (todas deterministas) ----
  K.dibujar = function (tl, el, t, dur = 0.5) {
    const L = el.getTotalLength ? el.getTotalLength() : 400;
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
    tl.set(el, { opacity: 1 }, t);
    tl.to(el, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, t);
  };
  // cambiar la expresión: grupo (scope), prefijo de clase ("k-d-cara", "k-l-boca", "k-p-boca") y nombre
  K.cara = function (tl, scope, nombre, t, base = "k-d-cara") {
    const pre = base.replace(/(cara|boca)$/, "");
    scope.querySelectorAll("." + base).forEach((c) => tl.set(c, { opacity: c.classList.contains(pre + nombre) ? 1 : 0 }, t));
  };
  // el presentador habla: la boca alterna entre dos formas hasta "hasta"
  K.hablar = function (tl, scope, desde, hasta, a = "grito", b = "abierta", paso = 0.16) {
    let k = 0;
    for (let t = desde; t < hasta; t += paso, k++) K.cara(tl, scope, k % 2 ? b : a, t, "k-p-boca");
    K.cara(tl, scope, "sonrisa", hasta, "k-p-boca");
  };
  K.sacudir = function (tl, el, t, f = 16) {
    [[-f, f * 0.55], [f * 0.75, -f * 0.45], [-f * 0.4, f * 0.2], [0, 0]].forEach(([x, y], i) => tl.to(el, { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
  };
  K.golpe = function (tl, el, t, desde = 2.4) {
    gsap.set(el, { opacity: 0 });
    tl.fromTo(el, { opacity: 0, scale: desde }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
  };
  K.pop = function (tl, el, t, extra = {}) {
    gsap.set(el, { opacity: 0 });
    tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false, ...extra }, t);
  };
  // pop para grupos SVG (escala desde su origen 0 0)
  K.popSvg = function (tl, el, t, desde = 0.3) {
    gsap.set(el, { opacity: 0 });
    tl.fromTo(el, { opacity: 1, scale: desde, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.22, ease: "back.out(2.5)", immediateRender: false }, t);
  };
  K.fueraSvg = function (tl, el, t) {
    tl.to(el, { opacity: 0, scale: 1.3, svgOrigin: "0 0", duration: 0.2 }, t);
  };

  window.KIT = K;
})();
