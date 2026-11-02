// Piezas dibujadas del "simulador de vida" que comparten las escenas (Hugo, el diamante, la pieza
// isométrica, la familia). Cada función devuelve un string SVG; las escenas lo meten con innerHTML
// en un <g> y animan las clases (h-...). Coordenadas: (0, 0) = los pies del personaje.
(function () {
  const T = "#0f1826"; // tinta
  const C = { menta: "#8fe3b9", celeste: "#8ccfe8", crema: "#fbf3dc", rosa: "#f4a3b8", rojo: "#ef5b5b", piel: "#f2c9a5", pizarra: "#2c3f58", tinta: T };
  window.JC = C;

  // el diamante flotante: verde (h-diam) y rojo (h-diam-r) superpuestos; la escena cruza la opacidad
  const diamante = (y = -420) => `
    <g transform="translate(0 ${y})"><g class="h-diam-g">
      <g class="h-diam"><path d="M0 -50 L30 0 L0 50 L-30 0 Z" fill="${C.menta}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M-30 0 H30 M0 -50 L-10 0 L0 50 M0 -50 L10 0 L0 50" fill="none" stroke="${T}" stroke-width="2.5" opacity="0.55"/>
        <path d="M-6 -36 L-18 -6" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.7"/></g>
      <g class="h-diam-r" opacity="0"><path d="M0 -50 L30 0 L0 50 L-30 0 Z" fill="${C.rojo}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M-30 0 H30 M0 -50 L-10 0 L0 50 M0 -50 L10 0 L0 50" fill="none" stroke="${T}" stroke-width="2.5" opacity="0.55"/>
        <path d="M-6 -36 L-18 -6" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.6"/></g>
    </g></g>`;

  // Hugo: dueño del bazar. Pelado con costados canosos, bigote, camisa celeste, delantal rosa.
  window.HUGO = (o = {}) => `
    <ellipse cx="0" cy="4" rx="70" ry="20" fill="${T}" opacity="0.35"/>
    <path d="M-34 -96 L-34 -4 Q-34 4 -22 4 L-6 4 L-6 -96 Z M6 -96 L6 4 L22 4 Q34 4 34 -4 L34 -96 Z" fill="${C.pizarra}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
    <g class="h-brazo-i"><path d="M-60 -196 Q-92 -150 -84 -96" fill="none" stroke="${T}" stroke-width="30" stroke-linecap="round"/><path d="M-60 -196 Q-92 -150 -84 -96" fill="none" stroke="${C.celeste}" stroke-width="20" stroke-linecap="round"/><circle cx="-84" cy="-92" r="14" fill="${C.piel}" stroke="${T}" stroke-width="4"/></g>
    <g class="h-brazo-d"><path d="M60 -196 Q92 -150 84 -96" fill="none" stroke="${T}" stroke-width="30" stroke-linecap="round"/><path d="M60 -196 Q92 -150 84 -96" fill="none" stroke="${C.celeste}" stroke-width="20" stroke-linecap="round"/><circle cx="84" cy="-92" r="14" fill="${C.piel}" stroke="${T}" stroke-width="4"/></g>
    <path d="M-66 -192 Q-70 -110 -54 -90 L54 -90 Q70 -110 66 -192 Q40 -214 0 -214 Q-40 -214 -66 -192 Z" fill="${C.celeste}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M-40 -170 L40 -170 L46 -92 L-46 -92 Z" fill="${C.rosa}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-40 -170 L-30 -206 M40 -170 L30 -206" stroke="${T}" stroke-width="4"/>
    <path d="M-18 -140 H18" stroke="${T}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <g class="h-cabeza">
      <circle cx="0" cy="-268" r="60" fill="${C.piel}" stroke="${T}" stroke-width="5"/>
      <path d="M-58 -282 Q-66 -252 -50 -236 M58 -282 Q66 -252 50 -236" fill="none" stroke="${C.crema}" stroke-width="16" stroke-linecap="round"/>
      <path d="M-58 -282 Q-66 -252 -50 -236 M58 -282 Q66 -252 50 -236" fill="none" stroke="${T}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      <g class="h-ojo-a"><circle cx="-22" cy="-272" r="7" fill="${T}"/><circle cx="22" cy="-272" r="7" fill="${T}"/></g>
      <g class="h-ojo-m" opacity="0"><path d="M-32 -272 H-12 M12 -272 H32" stroke="${T}" stroke-width="5" stroke-linecap="round"/><circle cx="-22" cy="-268" r="5" fill="${T}"/><circle cx="22" cy="-268" r="5" fill="${T}"/></g>
      <path class="h-ojo-c" opacity="0" d="M-32 -270 Q-22 -262 -12 -270 M12 -270 Q22 -262 32 -270" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path class="h-ojeras" opacity="0" d="M-32 -258 Q-22 -252 -12 -258 M12 -258 Q22 -252 32 -258" fill="none" stroke="#a77fa0" stroke-width="5" stroke-linecap="round"/>
      <path d="M-30 -238 Q-15 -252 0 -242 Q15 -252 30 -238 Q20 -228 0 -234 Q-20 -228 -30 -238 Z" fill="${C.pizarra}" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
      <path class="h-boca" d="M-10 -222 Q0 -216 10 -222" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
      <path class="h-boca-t" opacity="0" d="M-12 -218 Q0 -226 12 -218" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
    </g>
    ${o.sinDiamante ? "" : diamante(o.diamY ?? -400)}`;

  window.DIAMANTE = diamante;

  // pieza isométrica: piso en damero y dos paredes del fondo
  window.PIEZA = (cx, cy, w, n = 6, pared = 300) => {
    const h = w / 2, s = w / n, sh = h / n;
    let t = "";
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = cx + (i - j) * s, y = cy - h + (i + j) * sh;
      t += `<path d="M${x} ${y} L${x + s} ${y + sh} L${x} ${y + 2 * sh} L${x - s} ${y + sh} Z" fill="${(i + j) % 2 ? C.menta : C.celeste}" opacity="${(i + j) % 2 ? 0.55 : 0.4}"/>`;
    }
    const top = cy - h;
    return `
      <path d="M${cx - w} ${cy} L${cx - w} ${cy - pared} L${cx} ${top - pared} L${cx} ${top} Z" fill="${C.rosa}" opacity="0.38" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M${cx + w} ${cy} L${cx + w} ${cy - pared} L${cx} ${top - pared} L${cx} ${top} Z" fill="${C.crema}" opacity="0.3" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      ${t}
      <path d="M${cx} ${top} L${cx + w} ${cy} L${cx} ${cy + h} L${cx - w} ${cy} Z" fill="none" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>`;
  };

  // la familia: señora (vestido rosa, rodete) y nene (remera menta), con valija
  window.FAMILIA = () => `
    <ellipse cx="40" cy="4" rx="110" ry="18" fill="${T}" opacity="0.3"/>
    <g class="f-sra">
      <path d="M-24 -40 V0 M8 -40 V0" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <path d="M-50 -40 L-34 -170 Q-8 -186 18 -170 L34 -40 Z" fill="${C.rosa}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="-8" cy="-210" r="40" fill="${C.piel}" stroke="${T}" stroke-width="5"/>
      <path d="M-46 -220 Q-40 -258 -8 -254 Q26 -258 30 -220 Q12 -236 -8 -232 Q-28 -236 -46 -220 Z" fill="${C.pizarra}" stroke="${T}" stroke-width="4"/>
      <circle cx="-8" cy="-262" r="16" fill="${C.pizarra}" stroke="${T}" stroke-width="4"/>
      <path d="M-22 -208 h6 M4 -208 h6" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path class="f-boca" d="M-18 -188 Q-8 -196 2 -188" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 -150 Q60 -120 64 -84" fill="none" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <rect x="42" y="-88" width="72" height="54" rx="10" fill="${C.celeste}" stroke="${T}" stroke-width="5"/>
      <path d="M64 -88 V-100 H92 V-88" fill="none" stroke="${T}" stroke-width="5"/>
    </g>
    <g transform="translate(140 0)"><g class="f-nene">
      <path d="M-12 -30 V0 M12 -30 V0" stroke="${T}" stroke-width="10" stroke-linecap="round"/>
      <path d="M-30 -30 L-26 -100 Q0 -112 26 -100 L30 -30 Z" fill="${C.menta}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="0" cy="-132" r="30" fill="${C.piel}" stroke="${T}" stroke-width="5"/>
      <path d="M-30 -140 Q-20 -168 4 -164 Q26 -162 30 -140 Q10 -150 -30 -140 Z" fill="${C.pizarra}" stroke="${T}" stroke-width="4"/>
      <path d="M-12 -130 h5 M7 -130 h5" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
    </g></g>`;

  // globo de "murmullo" (idioma inventado del juego)
  window.GLOBO = (w, h, texto, fs = 40) => `
    <path d="M${-w / 2 + 24} ${-h} H${w / 2 - 24} Q${w / 2} ${-h} ${w / 2} ${-h + 24} V-24 Q${w / 2} 0 ${w / 2 - 24} 0 H30 L0 34 L-10 0 H${-w / 2 + 24} Q${-w / 2} 0 ${-w / 2} -24 V${-h + 24} Q${-w / 2} ${-h} ${-w / 2 + 24} ${-h} Z" fill="${C.crema}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
    <text x="0" y="${-h / 2 + fs * 0.35}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="700" font-size="${fs}" fill="${T}">${texto}</text>`;

  // burbuja de pensamiento (nube + dos circulitos) con un ícono adentro (lo pone la escena)
  window.NUBE = (r = 80) => `
    <circle cx="-34" cy="${r + 52}" r="10" fill="${C.crema}" stroke="${T}" stroke-width="4"/>
    <circle cx="-16" cy="${r + 22}" r="16" fill="${C.crema}" stroke="${T}" stroke-width="4"/>
    <path d="M${-r} 0 Q${-r} ${-r} 0 ${-r} Q${r} ${-r} ${r} 0 Q${r} ${r} 0 ${r} Q${-r} ${r} ${-r} 0 Z" fill="${C.crema}" stroke="${T}" stroke-width="5"/>
    <circle cx="${-r * 0.7}" cy="${-r * 0.55}" r="${r * 0.42}" fill="${C.crema}" stroke="${T}" stroke-width="5"/>
    <circle cx="${r * 0.7}" cy="${-r * 0.55}" r="${r * 0.42}" fill="${C.crema}" stroke="${T}" stroke-width="5"/>
    <circle cx="0" cy="0" r="${r * 0.95}" fill="${C.crema}"/>`;

  // cursor del jugador
  window.CURSOR = () => `<path d="M0 0 L0 64 L16 50 L28 76 L40 70 L28 45 L50 45 Z" fill="${C.crema}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>`;
})();
