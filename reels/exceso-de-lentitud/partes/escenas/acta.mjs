// Filas del acta (coordenadas de la libreta 460 x 600). Clases P-f1..P-f4 (filas), P-ok1, P-ok2 (tildes),
// P-x3 (cruz), P-nofig (texto rojo), P-desp (texto manuscrito), P-circ (círculo rojo), P-preg.
export function filas(P) {
  const fila = (n, y, txt) => `<g class="${P}-f${n}"><text x="40" y="${y}" class="mono" font-size="30" letter-spacing="2" fill="#0b1020">${txt}</text><path d="M40 ${y + 18} H420" stroke="#0b1020" stroke-width="2" opacity="0.3" /></g>`;
  return `
      ${fila(1, 180, "LIBRETA")}${fila(2, 250, "PAPELES")}${fila(3, 320, "HORARIOS")}${fila(4, 420, "PRECIO")}
      <path class="azl ${P}-ok1" d="M330 166 L350 186 L392 140" stroke-width="9" />
      <path class="azl ${P}-ok2" d="M330 236 L350 256 L392 210" stroke-width="9" />
      <path class="rl ${P}-x3" d="M240 290 L280 330 M280 290 L240 330" stroke-width="9" />
      <text class="mano ${P}-nofig" x="288" y="330" font-size="44" fill="#ff3b4a">no figuran</text>
      <text class="mano ${P}-desp" x="70" y="500" font-size="58" fill="#1e3a8a">«después te paso»</text>
      <ellipse class="rl ${P}-circ" cx="246" cy="482" rx="200" ry="56" stroke-width="7" />
      <text class="slex ${P}-preg" x="400" y="575" font-size="80" fill="#ff3b4a">?</text>`;
}
