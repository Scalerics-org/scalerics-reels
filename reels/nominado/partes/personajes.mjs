// Personajes y piezas de la casa (SVG), compartidos por todas las escenas de "nominado".
// Cada función devuelve un <g> con origen en el centro de la base del dibujo. `p` = prefijo de escena.
export const C = {
  fondo: "#22103d", violeta: "#3a1763", tinta: "#12051f", sillon: "#6a2fb0", sillon2: "#8f55d6",
  rosa: "#ff3d9a", blanco: "#f7f2ff", amarillo: "#ffd23f", piel: "#e3a982", piel2: "#c98a62",
};
const T = 'class="tinta"';

// La conductora: rubia platinada con jopo, vestido rosa, micrófono plateado con cubo amarillo.
export const conductora = (p) => `
  <path d="M-160 0 Q-150 -130 -64 -150 L64 -150 Q150 -130 160 0 Z" fill="${C.rosa}" ${T} />
  <path d="M-64 -150 L0 -88 L64 -150" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" />
  <circle cx="-90" cy="-70" r="5" fill="${C.blanco}" opacity="0.8" /><circle cx="96" cy="-40" r="4" fill="${C.blanco}" opacity="0.8" /><circle cx="60" cy="-100" r="3" fill="${C.blanco}" opacity="0.8" />
  <rect x="-22" y="-186" width="44" height="44" fill="${C.piel}" />
  <path d="M-78 -262 Q-92 -196 -62 -178 L62 -178 Q92 -196 78 -262 Z" fill="#fff1c2" ${T} />
  <ellipse cx="0" cy="-250" rx="62" ry="72" fill="${C.piel}" ${T} />
  <path d="M-66 -262 Q-70 -340 -6 -344 Q60 -350 76 -300 Q84 -270 66 -250 Q40 -300 -10 -290 Q-40 -300 -66 -262 Z" fill="#fff1c2" ${T} />
  <path d="M-30 -330 Q10 -380 60 -340" fill="none" stroke="${C.tinta}" stroke-width="5" />
  <circle cx="-64" cy="-226" r="10" fill="${C.amarillo}" ${T} stroke-width="3" /><circle cx="64" cy="-226" r="10" fill="${C.amarillo}" ${T} stroke-width="3" />
  <g class="${p}-cond-ojos"><ellipse cx="-24" cy="-258" rx="7" ry="9" fill="${C.tinta}" /><ellipse cx="24" cy="-258" rx="7" ry="9" fill="${C.tinta}" /></g>
  <path d="M-38 -276 L-12 -282 M38 -276 L12 -282" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />
  <path class="${p}-cond-boca" d="M-26 -222 Q0 -192 26 -222 Z" fill="${C.tinta}" />
  <path d="M-38 -238 Q-30 -232 -22 -236 M38 -238 Q30 -232 22 -236" stroke="${C.rosa}" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  <g class="${p}-cond-mic">
    <path d="M110 -40 Q130 -110 96 -160" fill="none" stroke="${C.piel}" stroke-width="30" stroke-linecap="round" />
    <path d="M110 -40 Q130 -110 96 -160" fill="none" stroke="${C.tinta}" stroke-width="40" stroke-linecap="round" opacity="0" />
    <rect x="72" y="-210" width="22" height="80" rx="8" fill="#c9c2da" ${T} stroke-width="4" transform="rotate(18 83 -170)" />
    <rect x="58" y="-214" width="50" height="34" rx="4" fill="${C.amarillo}" ${T} stroke-width="4" transform="rotate(18 83 -197)" />
    <circle cx="74" cy="-232" r="24" fill="#c9c2da" ${T} stroke-width="4" />
    <circle cx="96" cy="-160" r="18" fill="${C.piel}" ${T} stroke-width="4" />
  </g>`;

// La clienta (Sofi): rodete alto castaño, campera blanca, top amarillo, aros rosas.
// cara: "enojada" | "chusma" | "enamorada"
export const clienta = (p, cara = "chusma") => {
  const ojos = cara === "enamorada"
    ? `<path d="M-38 -262 q-8 -12 -16 0 q8 10 16 18 q8 -8 16 -18 q-8 -12 -16 0 Z" transform="translate(22 0)" fill="${C.rosa}" ${T} stroke-width="3" /><path d="M-38 -262 q-8 -12 -16 0 q8 10 16 18 q8 -8 16 -18 q-8 -12 -16 0 Z" transform="translate(70 0)" fill="${C.rosa}" ${T} stroke-width="3" />`
    : `<ellipse cx="-24" cy="-252" rx="7" ry="9" fill="${C.tinta}" /><ellipse cx="24" cy="-252" rx="7" ry="9" fill="${C.tinta}" />`;
  const cejas = cara === "enojada" ? `<path d="M-40 -280 L-12 -268 M40 -280 L12 -268" stroke="${C.tinta}" stroke-width="7" stroke-linecap="round" />`
    : cara === "enamorada" ? `<path d="M-40 -280 Q-26 -290 -12 -282 M40 -280 Q26 -290 12 -282" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />`
    : `<path d="M-40 -276 Q-26 -286 -12 -276 M40 -284 L12 -276" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />`;
  const boca = cara === "enojada" ? `<path d="M-22 -210 Q0 -228 22 -210 Q0 -200 -22 -210 Z" fill="${C.tinta}" />`
    : cara === "enamorada" ? `<path d="M-24 -220 Q0 -192 24 -220 Z" fill="${C.tinta}" />`
    : `<path d="M-18 -214 Q4 -206 20 -220" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />`;
  return `
  <path d="M-160 0 Q-150 -130 -60 -150 L60 -150 Q150 -130 160 0 Z" fill="${C.blanco}" ${T} />
  <path d="M-50 -150 L-30 0 M50 -150 L30 0" stroke="${C.tinta}" stroke-width="5" />
  <path d="M-46 -150 Q0 -120 46 -150 L30 0 L-30 0 Z" fill="${C.amarillo}" ${T} />
  <path d="M-60 -150 L-90 -100 L-56 -96 Z M60 -150 L90 -100 L56 -96 Z" fill="#dcd4ee" ${T} stroke-width="4" />
  <rect x="-20" y="-180" width="40" height="36" fill="${C.piel}" />
  <circle cx="0" cy="-352" r="40" fill="#5a2e1a" ${T} />
  <ellipse cx="0" cy="-246" rx="64" ry="72" fill="${C.piel}" ${T} />
  <path d="M-66 -240 Q-74 -320 0 -322 Q74 -320 66 -240 Q58 -286 0 -290 Q-58 -286 -66 -240 Z" fill="#5a2e1a" ${T} />
  <circle cx="-66" cy="-214" r="12" fill="none" stroke="${C.rosa}" stroke-width="6" /><circle cx="66" cy="-214" r="12" fill="none" stroke="${C.rosa}" stroke-width="6" />
  <g class="${p}-cli-ojos">${ojos}</g>${cejas}
  <path d="M0 -246 Q-6 -232 4 -228" fill="none" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" />
  <g class="${p}-cli-boca">${boca}</g>`;
};

// Walter: pelado con costados canosos, bigote, ojeras, chomba violeta clara, cinta métrica al cuello.
// cara: "defensa" | "cansado" | "perdido" | "dormido"
export const walter = (p, cara = "defensa") => {
  const ojos = cara === "dormido" ? `<path d="M-36 -248 Q-24 -240 -12 -248 M36 -248 Q24 -240 12 -248" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />`
    : cara === "perdido" ? `<circle cx="-24" cy="-252" r="13" fill="${C.blanco}" ${T} stroke-width="3" /><circle cx="24" cy="-252" r="13" fill="${C.blanco}" ${T} stroke-width="3" /><circle cx="-22" cy="-250" r="5" fill="${C.tinta}" /><circle cx="26" cy="-254" r="5" fill="${C.tinta}" />`
    : `<ellipse cx="-24" cy="-252" rx="7" ry="8" fill="${C.tinta}" /><ellipse cx="24" cy="-252" rx="7" ry="8" fill="${C.tinta}" />`;
  const cejas = cara === "defensa" ? `<path d="M-40 -276 L-12 -270 M40 -276 L12 -270" stroke="#cfc8dc" stroke-width="9" stroke-linecap="round" />`
    : `<path d="M-40 -268 L-12 -276 M40 -268 L12 -276" stroke="#cfc8dc" stroke-width="9" stroke-linecap="round" />`;
  const boca = cara === "dormido" ? `<ellipse cx="0" cy="-196" rx="8" ry="6" fill="${C.tinta}" />`
    : cara === "perdido" ? `<ellipse cx="0" cy="-194" rx="10" ry="12" fill="${C.tinta}" />`
    : `<path d="M-20 -194 Q0 -204 20 -194" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" />`;
  return `
  <path d="M-170 0 Q-160 -130 -64 -150 L64 -150 Q160 -130 170 0 Z" fill="#d9c8f5" ${T} />
  <path d="M-40 -150 L0 -110 L40 -150" fill="${C.blanco}" ${T} stroke-width="4" />
  <path d="M-22 -110 V-60" stroke="${C.tinta}" stroke-width="4" /><circle cx="-12" cy="-90" r="4" fill="${C.tinta}" /><circle cx="-12" cy="-72" r="4" fill="${C.tinta}" />
  <path d="M-60 -150 Q-70 -80 -80 0" fill="none" stroke="${C.amarillo}" stroke-width="22" />
  <path d="M60 -150 Q72 -70 70 -10" fill="none" stroke="${C.amarillo}" stroke-width="22" />
  <path d="M-72 -110 h12 M-76 -80 h12 M-78 -50 h12 M-80 -20 h12 M64 -120 h12 M68 -90 h12 M70 -60 h12 M70 -30 h12" stroke="${C.tinta}" stroke-width="3" />
  <rect x="-22" y="-182" width="44" height="40" fill="${C.piel2}" />
  <ellipse cx="0" cy="-240" rx="68" ry="76" fill="${C.piel2}" ${T} />
  <path d="M-68 -230 Q-76 -280 -56 -296 Q-50 -260 -60 -220 Z M68 -230 Q76 -280 56 -296 Q50 -260 60 -220 Z" fill="#cfc8dc" ${T} stroke-width="4" />
  <path d="M-30 -312 Q0 -320 30 -312" fill="none" stroke="${C.tinta}" stroke-width="3" opacity="0.4" />
  <g class="${p}-wal-ojeras"><path d="M-36 -238 Q-24 -230 -12 -238 M36 -238 Q24 -230 12 -238" fill="none" stroke="${C.sillon}" stroke-width="5" stroke-linecap="round" opacity="0.8" /></g>
  <g class="${p}-wal-ojos">${ojos}</g>${cejas}
  <path d="M0 -244 Q-8 -226 6 -222" fill="none" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" />
  <path d="M-40 -210 Q-20 -226 0 -214 Q20 -226 40 -210 Q30 -200 0 -206 Q-30 -200 -40 -210 Z" fill="#cfc8dc" ${T} stroke-width="4" />
  <g class="${p}-wal-boca">${boca}</g>`;
};

// El agente de IA: cabeza-pantalla con ojos LED amarillos, auricular con micrófono, saco blanco y corbata amarilla.
export const agente = (p) => `
  <path d="M-160 0 Q-150 -130 -64 -150 L64 -150 Q150 -130 160 0 Z" fill="${C.blanco}" ${T} />
  <path d="M-40 -150 L0 -100 L40 -150 Z" fill="${C.sillon2}" ${T} stroke-width="4" />
  <path d="M0 -112 L-16 -96 L0 -10 L16 -96 Z" fill="${C.amarillo}" ${T} stroke-width="4" />
  <path d="M-64 -150 L-30 -40 L-70 -60 M64 -150 L30 -40 L70 -60" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linejoin="round" />
  <rect x="-18" y="-176" width="36" height="30" fill="#8a80a3" ${T} stroke-width="4" />
  <rect x="-96" y="-340" width="192" height="168" rx="46" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="10" />
  <rect x="-96" y="-340" width="192" height="168" rx="46" fill="none" stroke="${C.tinta}" stroke-width="4" />
  <g class="${p}-age-ojos"><rect x="-56" y="-290" width="30" height="42" rx="14" fill="${C.amarillo}" /><rect x="26" y="-290" width="30" height="42" rx="14" fill="${C.amarillo}" /></g>
  <path class="${p}-age-boca" d="M-30 -222 Q0 -196 30 -222" fill="none" stroke="${C.amarillo}" stroke-width="8" stroke-linecap="round" />
  <path d="M-104 -280 Q-104 -372 0 -372 Q104 -372 104 -280" fill="none" stroke="${C.blanco}" stroke-width="10" />
  <path d="M-104 -280 Q-104 -372 0 -372 Q104 -372 104 -280" fill="none" stroke="${C.tinta}" stroke-width="3" />
  <rect x="-122" y="-300" width="30" height="56" rx="12" fill="${C.rosa}" ${T} stroke-width="4" />
  <rect x="92" y="-300" width="30" height="56" rx="12" fill="${C.rosa}" ${T} stroke-width="4" />
  <path d="M-108 -248 Q-110 -196 -50 -196" fill="none" stroke="${C.tinta}" stroke-width="6" stroke-linecap="round" />
  <circle cx="-48" cy="-196" r="9" fill="${C.rosa}" ${T} stroke-width="3" />`;

// El sillón capitoné del confesionario (origen: centro de la base del asiento).
export const sillon = (p) => `
  <path d="M-260 -10 Q-270 -470 0 -480 Q270 -470 260 -10 Z" fill="${C.sillon}" ${T} />
  <g fill="${C.tinta}" opacity="0.55">
    <circle cx="-160" cy="-380" r="7" /><circle cx="-60" cy="-400" r="7" /><circle cx="60" cy="-400" r="7" /><circle cx="160" cy="-380" r="7" />
    <circle cx="-200" cy="-270" r="7" /><circle cx="-110" cy="-300" r="7" /><circle cx="0" cy="-310" r="7" /><circle cx="110" cy="-300" r="7" /><circle cx="200" cy="-270" r="7" />
    <circle cx="-160" cy="-180" r="7" /><circle cx="160" cy="-180" r="7" />
  </g>
  <path d="M-160 -380 L-110 -300 L-60 -400 L0 -310 L60 -400 L110 -300 L160 -380 M-200 -270 L-110 -300 M200 -270 L110 -300" fill="none" stroke="${C.tinta}" stroke-width="3" opacity="0.35" />
  <rect x="-330" y="-200" width="110" height="210" rx="50" fill="${C.sillon2}" ${T} />
  <rect x="220" y="-200" width="110" height="210" rx="50" fill="${C.sillon2}" ${T} />
  <rect x="-300" y="-6" width="600" height="60" rx="18" fill="${C.sillon2}" ${T} />`;

// El ojo de la casa: una cámara-domo con un ojo adentro (el Hermano). Origen: centro del ojo.
export const ojo = (p) => `
  <rect x="-20" y="-150" width="40" height="70" fill="#8a80a3" ${T} stroke-width="4" />
  <path d="M-100 -84 H100 V-10 Q100 60 0 60 Q-100 60 -100 -10 Z" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="6" />
  <ellipse cx="0" cy="0" rx="70" ry="42" fill="${C.blanco}" ${T} stroke-width="4" />
  <g class="${p}-iris"><circle cx="0" cy="0" r="30" fill="${C.sillon2}" ${T} stroke-width="4" /><circle cx="0" cy="0" r="13" fill="${C.tinta}" /><circle cx="8" cy="-8" r="5" fill="${C.blanco}" /></g>
  <circle class="${p}-rec" cx="78" cy="-62" r="10" fill="${C.rosa}" />`;

// Un celular (origen: centro). Pantalla blanca, encabezado de chat. Medidas ~440x760.
export const celular = (p, nombre, w = 440, h = 760) => `
  <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="54" fill="${C.tinta}" stroke="${C.blanco}" stroke-width="6" />
  <rect x="${-w / 2 + 18}" y="${-h / 2 + 18}" width="${w - 36}" height="${h - 36}" rx="40" fill="${C.blanco}" />
  <rect x="${-w / 2 + 18}" y="${-h / 2 + 18}" width="${w - 36}" height="104" rx="40" fill="${C.sillon}" />
  <rect x="${-w / 2 + 18}" y="${-h / 2 + 80}" width="${w - 36}" height="42" fill="${C.sillon}" />
  <rect x="-44" y="${-h / 2 + 30}" width="88" height="14" rx="7" fill="${C.tinta}" />
  <circle cx="${-w / 2 + 74}" cy="${-h / 2 + 84}" r="24" fill="${C.amarillo}" ${T} stroke-width="3" />
  <text class="lex" x="${-w / 2 + 112}" y="${-h / 2 + 94}" font-size="28" fill="${C.blanco}">${nombre}</text>`;

// Una tienda de ropa chiquita (para las fotos de la placa). abierta: luces y cartel ABIERTO.
export const local = (p, abierto) => `
  <rect x="-130" y="-150" width="260" height="190" fill="${abierto ? C.blanco : "#cfc8dc"}" ${T} />
  <path d="M-150 -150 L150 -150 L130 -200 L-130 -200 Z" fill="${abierto ? C.amarillo : C.sillon2}" ${T} />
  <path d="M-110 -150 v-50 M-60 -150 v-50 M-10 -150 v-50 M40 -150 v-50 M90 -150 v-50" stroke="${C.tinta}" stroke-width="3" opacity="0.4" />
  <rect x="-100" y="-120" width="110" height="110" fill="${abierto ? "#fff1c2" : "#6f6488"}" ${T} stroke-width="4" />
  <rect x="34" y="-110" width="66" height="150" fill="${abierto ? C.sillon2 : "#6f6488"}" ${T} stroke-width="4" />
  ${abierto
    ? `<path d="M-80 -30 L-60 -90 L-40 -30 Z" fill="${C.rosa}" ${T} stroke-width="3" /><path d="M-30 -30 v-60 h-14" fill="none" stroke="${C.tinta}" stroke-width="3" />`
    : `<path d="M-100 -100 H10 M-100 -80 H10 M-100 -60 H10 M-100 -40 H10 M-100 -20 H10" stroke="${C.tinta}" stroke-width="3" opacity="0.6" />`}`;
