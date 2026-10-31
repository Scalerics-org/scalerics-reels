// Caritas del tablero de "¿Quién es quién?" (dibujos genéricos propios, SVG en texto).
// QQ.carita(tipo) -> <svg viewBox="0 0 160 170"> con la cara; QQ.ramiro() -> busto del dueño (0 0 400 460).
// Paleta: rojo #e63946, azul #2f5bea, amarillo #ffc928, crema #fbf3e0, tinta #14182b.
(function () {
  const R = "#e63946", A = "#2f5bea", Y = "#ffc928", C = "#fbf3e0", T = "#14182b";
  const L = `stroke="${T}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const cabeza = `<ellipse cx="80" cy="96" rx="46" ry="54" fill="${C}" ${L}/>`;
  const orejas = `<path d="M35 96 q-12 0 -10 14 q2 12 12 10 M125 96 q12 0 10 14 q-2 12 -12 10" fill="${C}" ${L}/>`;
  const ojos = (y = 92) => `<circle cx="64" cy="${y}" r="5" fill="${T}"/><circle cx="96" cy="${y}" r="5" fill="${T}"/>`;
  const boca = (d = "M66 124 q14 10 28 0") => `<path d="${d}" fill="none" ${L}/>`;
  const nariz = `<path d="M80 98 q-6 12 2 14" fill="none" ${L}/>`;
  const caras = {
    // el de la obra: casco amarillo y bigote
    obra: () => `${orejas}${cabeza}<path d="M30 74 q50 -62 100 0 z" fill="${Y}" ${L}/><path d="M22 76 h116" ${L}/><path d="M80 22 v24" ${L}/>${ojos(96)}${nariz}<path d="M62 118 q18 -10 36 0 q-18 8 -36 0z" fill="${T}" ${L}/>`,
    // la del calefón (Silvia): rodete rojo y aros
    calefon: () => `<circle cx="80" cy="34" r="20" fill="${R}" ${L}/>${orejas}${cabeza}<path d="M34 92 q4 -54 46 -54 q42 0 46 54 q-20 -26 -46 -30 q-26 4 -46 30z" fill="${R}" ${L}/><circle cx="32" cy="124" r="7" fill="${Y}" ${L}/><circle cx="128" cy="124" r="7" fill="${Y}" ${L}/>${ojos()}${nariz}${boca()}`,
    // Gómez: pelado, lentes redondos, bigotito (hay tres iguales)
    gomez: () => `${orejas}${cabeza}<path d="M44 70 q8 -16 14 -10 M116 70 q-8 -16 -14 -10" fill="none" ${L}/><circle cx="62" cy="94" r="14" fill="none" ${L}/><circle cx="98" cy="94" r="14" fill="none" ${L}/><path d="M76 94 h8" ${L}/><circle cx="62" cy="94" r="4" fill="${T}"/><circle cx="98" cy="94" r="4" fill="${T}"/><path d="M68 120 h24" stroke="${T}" stroke-width="9" stroke-linecap="round"/>${boca("M70 132 q10 4 20 0")}`,
    // el que regatea: gorra azul, ceja levantada, sonrisa de costado
    regatea: () => `${orejas}${cabeza}<path d="M32 70 q48 -50 96 0 z" fill="${A}" ${L}/><path d="M118 68 h34" ${L}/><path d="M56 80 l16 -6 M88 74 l16 2" fill="none" ${L}/>${ojos(94)}${nariz}${boca("M70 126 q14 2 26 -8")}`,
    // la del baño: pelo azul con flequillo
    bano: () => `${orejas}<path d="M30 140 q-6 -60 10 -86 q40 -40 80 0 q16 26 10 86z" fill="${A}" ${L}/>${cabeza}<path d="M34 86 q6 -46 46 -46 q40 0 46 46 q-30 -18 -46 -12 q-22 -18 -46 12z" fill="${A}" ${L}/>${ojos(98)}${nariz}${boca()}`,
    // el del perro: rulos y una oreja de perro asomando
    perro: () => `${orejas}${cabeza}<path d="M36 80 q-6 -24 12 -30 q2 -20 22 -16 q10 -16 28 -4 q20 -6 24 14 q18 8 10 34 q-12 -16 -26 -14 q-14 -14 -30 -4 q-18 -8 -40 20z" fill="${T}" ${L}/>${ojos()}${nariz}${boca("M64 122 q16 14 32 0")}`,
    // la señora: batido amarillo y lentes
    senora: () => `${orejas}<path d="M30 92 q-14 -66 50 -70 q64 4 50 70 q-16 -34 -50 -38 q-34 4 -50 38z" fill="${Y}" ${L}/>${cabeza}<path d="M36 80 q20 -36 44 -36 q24 0 44 36 q-24 -16 -44 -16 q-20 0 -44 16z" fill="${Y}" ${L}/><path d="M50 90 h24 v12 h-24z M86 90 h24 v12 h-24z M74 94 h12" fill="none" ${L}/>${nariz}${boca()}`,
    // el primo de alguien: pelo parado
    primo: () => `${orejas}${cabeza}<path d="M40 70 l6 -34 l12 22 l8 -30 l12 26 l10 -30 l8 30 l14 -24 l2 34 q-34 -14 -72 6z" fill="${T}" ${L}/>${ojos()}${nariz}${boca("M66 120 q14 14 28 0z")}`,
    // el contacto misterioso: silueta con signo de pregunta
    misterio: () => `<ellipse cx="80" cy="96" rx="46" ry="54" fill="${T}" stroke="${T}" stroke-width="5"/><text x="80" y="124" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="900" font-size="84" fill="${Y}">?</text>`,
  };
  window.QQ = {
    colores: { R, A, Y, C, T },
    carita(tipo) {
      return `<svg viewBox="0 0 160 170" width="100%" height="100%" aria-hidden="true">${caras[tipo]()}</svg>`;
    },
    // Ramiro, el de la ferretería: canoso, bigote, delantal azul con un lápiz en el bolsillo
    ramiro(cara = "duda") {
      const bocas = {
        duda: "M174 236 q16 -8 26 2 q12 -8 26 0",
        mal: "M172 248 q28 -22 56 0",
        grito: "M176 226 q24 -4 48 0 q0 40 -24 40 q-24 0 -24 -40z",
        sonrisa: "M172 230 q28 24 56 0",
      };
      const b = bocas[cara] || bocas.duda;
      const relleno = cara === "grito" ? T : "none";
      return `<svg viewBox="0 0 400 460" width="100%" height="100%" aria-hidden="true">
        <path d="M70 460 q0 -150 130 -160 q130 10 130 160z" fill="${C}" ${L}/>
        <path d="M120 460 v-120 q80 30 160 0 v120z" fill="${A}" ${L}/>
        <path d="M120 340 l-30 -36 M280 340 l30 -36" fill="none" ${L}/>
        <path d="M232 380 h34 v40 h-34z" fill="${C}" ${L}/><path d="M246 380 v-30" stroke="${Y}" stroke-width="9" stroke-linecap="round"/>
        <path d="M176 290 v24 h48 v-24" fill="${C}" ${L}/>
        <path d="M110 170 q-24 0 -20 24 q4 20 24 16 M290 170 q24 0 20 24 q-4 20 -24 16" fill="${C}" ${L}/>
        <ellipse cx="200" cy="180" rx="90" ry="110" fill="${C}" ${L}/>
        <path d="M112 150 q-6 -80 88 -84 q94 4 88 84 q-14 -40 -40 -46 q-20 18 -48 6 q-28 14 -48 -6 q-26 6 -40 46z" fill="${C}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M150 140 l32 6 M218 146 l32 -6" fill="none" ${L}/>
        <circle cx="166" cy="172" r="8" fill="${T}"/><circle cx="234" cy="172" r="8" fill="${T}"/>
        <path d="M200 180 q-12 26 4 30" fill="none" ${L}/>
        <path d="M160 218 q40 -18 80 0 q-40 14 -80 0z" fill="${T}" ${L}/>
        <path d="${b}" fill="${relleno}" ${L}/>
      </svg>`;
    },
  };
})();
