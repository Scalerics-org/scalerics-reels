// Piezas compartidas de "Otra vez las once": display de 7 segmentos, radio-reloj, Néstor, celular.
// Todo en coordenadas locales: se ubican con <g transform="translate(...) scale(...)">.

// ---------- 7 segmentos ----------
const W = 100, H = 180, T = 20, G = 5;
const hseg = (x1, x2, y) => `${x1},${y} ${x1 + T / 2},${y - T / 2} ${x2 - T / 2},${y - T / 2} ${x2},${y} ${x2 - T / 2},${y + T / 2} ${x1 + T / 2},${y + T / 2}`;
const vseg = (x, y1, y2) => `${x},${y1} ${x + T / 2},${y1 + T / 2} ${x + T / 2},${y2 - T / 2} ${x},${y2} ${x - T / 2},${y2 - T / 2} ${x - T / 2},${y1 + T / 2}`;
const SEG = {
  a: hseg(G, W - G, 0), g: hseg(G, W - G, H / 2), d: hseg(G, W - G, H),
  f: vseg(0, G, H / 2 - G), b: vseg(W, G, H / 2 - G), e: vseg(0, H / 2 + G, H - G), c: vseg(W, H / 2 + G, H - G),
};
const DIG = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "" };
// texto como "23:00": cada dígito con sus 7 segmentos (los apagados, tenues). Ancho por dígito 140, ":" 60.
export function seg7(cls, texto, { color = "#ff2d2d", apagado = 0.09, colon = true } = {}) {
  return `<g class="${cls}" transform="translate(${T / 2} ${T / 2}) skewX(-6)">${shift(texto, color, apagado, colon, cls)}</g>`;
}
// (versión prolija: cada dígito en su translate)
function shift(texto, color, apagado, colon, cls) {
  let x = 0, out = "";
  for (const ch of texto) {
    if (ch === ":") {
      if (colon) out += `<g class="${cls}-dots" transform="translate(${x} 0)"><rect x="12" y="${H * 0.26}" width="${T + 2}" height="${T + 2}" rx="3" fill="${color}" /><rect x="12" y="${H * 0.66}" width="${T + 2}" height="${T + 2}" rx="3" fill="${color}" /></g>`;
      x += 60;
      continue;
    }
    const on = DIG[ch] ?? "";
    out += `<g transform="translate(${x} 0)">`;
    for (const s of "abcdefg") out += `<polygon points="${SEG[s]}" fill="${color}" opacity="${on.includes(s) ? 1 : apagado}" />`;
    out += `</g>`;
    x += 140;
  }
  return out;
}
// ancho en px (sin escalar) de un texto de 7 segmentos
export const ancho7 = (texto) => [...texto].reduce((a, ch) => a + (ch === ":" ? 60 : 140), 0) - 40 + T;

// ---------- radio-reloj ----------
// caja de 820 x 380; display a la derecha (hora en .<P>-hora), parlante a la izquierda.
// horas: lista de textos ("23:00", "21:00"...): cada uno en su grupo .<P>-h<i> (el primero visible).
export function radio(P, horas = ["23:00"], { color = "#ff2d2d" } = {}) {
  let parlante = "";
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) parlante += `<circle cx="${70 + c * 38}" cy="${100 + r * 40}" r="11" fill="#071226" />`;
  const disp = horas.map((h, i) => `<g class="${P}-h${i}" ${i ? 'opacity="0"' : ""}>${seg7(`${P}-seg${i}`, h, { color })}</g>`).join("");
  return `
      <rect x="0" y="40" width="820" height="340" rx="46" fill="#0f2347" stroke="#f4efe4" stroke-width="8" />
      <rect x="50" y="18" width="120" height="30" rx="10" fill="#0f2347" stroke="#f4efe4" stroke-width="6" />
      <rect x="650" y="18" width="120" height="30" rx="10" fill="#0f2347" stroke="#f4efe4" stroke-width="6" />
      <g class="${P}-parlante">
        <rect x="40" y="76" width="190" height="230" rx="26" fill="#16305e" stroke="#f4efe4" stroke-width="6" />
        ${parlante}
      </g>
      <rect x="260" y="76" width="520" height="230" rx="18" fill="#04070f" stroke="#f4efe4" stroke-width="6" />
      <g class="${P}-disp"><g transform="translate(290 112) scale(0.72)" style="filter: drop-shadow(0 0 14px ${color})">${disp}</g></g>
      <circle cx="300" cy="342" r="10" fill="${color}" class="${P}-am" />
      <text x="320" y="352" font-family="IBM Plex Mono" font-size="26" fill="#f4efe4" data-layout-ignore>AM</text>
      <text x="400" y="352" font-family="IBM Plex Mono" font-size="26" fill="#f4efe4" opacity="0.5" data-layout-ignore>ALARMA · RADIO</text>
      <path d="M90 380 L70 420 M730 380 L750 420" fill="none" stroke="#f4efe4" stroke-width="8" stroke-linecap="round" />`;
}

// ---------- Néstor ----------
// cabeza + torso, ~360 x 520, origen arriba a la izquierda. ojos: "normal" | "ojeras" | "locos" | "cerrados" | "feliz"
export function nestor(P, { ojos = "ojeras", boca = "seria", pijama = false } = {}) {
  const ropa = pijama ? "#3a5fa8" : "#c2410c";
  const rayas = pijama ? `<path d="M80 430 V540 M130 400 V540 M230 400 V540 M280 430 V540" stroke="#f4efe4" stroke-width="5" opacity="0.5" />` : "";
  const OJ = {
    normal: `<circle cx="146" cy="246" r="9" fill="#071226" /><circle cx="214" cy="246" r="9" fill="#071226" />`,
    ojeras: `<circle cx="146" cy="248" r="9" fill="#071226" /><circle cx="214" cy="248" r="9" fill="#071226" />
             <path d="M128 268 C140 278 156 278 166 268 M196 268 C206 278 222 278 234 268" fill="none" stroke="#6b7fb0" stroke-width="6" stroke-linecap="round" />
             <path d="M126 234 L166 240 M194 240 L234 234" fill="none" stroke="#071226" stroke-width="7" stroke-linecap="round" />`,
    locos: `<circle cx="146" cy="246" r="22" fill="#f4efe4" stroke="#071226" stroke-width="5" /><circle cx="214" cy="246" r="22" fill="#f4efe4" stroke="#071226" stroke-width="5" />
            <circle cx="150" cy="242" r="6" fill="#071226" /><circle cx="208" cy="252" r="6" fill="#071226" />`,
    cerrados: `<path d="M130 250 C140 240 156 240 164 250 M196 250 C204 240 220 240 230 250" fill="none" stroke="#071226" stroke-width="7" stroke-linecap="round" />`,
    feliz: `<path d="M130 252 C140 238 156 238 164 252 M196 252 C204 238 220 238 230 252" fill="none" stroke="#071226" stroke-width="7" stroke-linecap="round" />`,
  };
  const BO = {
    seria: `<path class="${P}-boca" d="M156 326 C170 320 190 320 204 326" fill="none" stroke="#071226" stroke-width="7" stroke-linecap="round" />`,
    abierta: `<ellipse class="${P}-boca" cx="180" cy="328" rx="20" ry="16" fill="#071226" />`,
    sonrisa: `<path class="${P}-boca" d="M148 318 C164 344 196 344 212 318" fill="none" stroke="#071226" stroke-width="7" stroke-linecap="round" />`,
    grito: `<ellipse class="${P}-boca" cx="180" cy="332" rx="26" ry="24" fill="#071226" />`,
  };
  return `
      <path d="M20 540 C20 420 84 380 180 380 C276 380 340 420 340 540 Z" fill="${ropa}" stroke="#f4efe4" stroke-width="7" stroke-linejoin="round" />
      ${rayas}
      <path d="M150 382 L180 420 L210 382" fill="none" stroke="#f4efe4" stroke-width="6" stroke-linecap="round" />
      <ellipse cx="180" cy="262" rx="86" ry="100" fill="#f4efe4" stroke="#f4efe4" stroke-width="7" />
      <ellipse cx="94" cy="268" rx="14" ry="22" fill="#f4efe4" stroke="#071226" stroke-width="4" />
      <ellipse cx="266" cy="268" rx="14" ry="22" fill="#f4efe4" stroke="#071226" stroke-width="4" />
      <path d="M96 236 C90 170 120 150 140 156 C150 140 210 140 222 156 C246 150 272 172 264 236 C256 210 248 196 240 190 C220 200 140 200 120 190 C110 200 102 214 96 236 Z" fill="#9aa3b8" stroke="#f4efe4" stroke-width="5" />
      <path d="M146 166 C160 150 200 150 214 166" fill="none" stroke="#f4efe4" stroke-width="4" opacity="0.6" />
      ${OJ[ojos]}
      <path d="M172 262 C168 280 170 290 184 292" fill="none" stroke="#071226" stroke-width="5" stroke-linecap="round" />
      <path d="M130 304 C150 292 168 300 180 304 C192 300 210 292 230 304 C214 316 196 312 180 308 C164 312 146 316 130 304 Z" fill="#6b6f7a" stroke="#071226" stroke-width="4" />
      ${BO[boca]}`;
}

// ---------- celular ----------
// 360 x 680, origen arriba a la izquierda; pantalla de 20,60 a 340,630
export function celu(P, contenido = "", { brillo = "#7fb4ff" } = {}) {
  return `
      <rect x="0" y="0" width="360" height="680" rx="48" fill="#04070f" stroke="#f4efe4" stroke-width="8" style="filter: drop-shadow(0 0 30px ${brillo}55)" />
      <rect x="130" y="22" width="100" height="14" rx="7" fill="#f4efe4" opacity="0.5" />
      ${contenido}`;
}

// burbuja de chat HTML (posición absoluta en px de la escena)
export function burbuja(cls, x, y, txt, { fondo = "#f4efe4", color = "#071226", w = "auto", cola = "izq" } = {}) {
  return `<div class="burb ${cls}" style="left:${x}px; top:${y}px; width:${w === "auto" ? "auto" : w + "px"}; background:${fondo}; color:${color}; border-radius:${cola === "izq" ? "8px 28px 28px 28px" : "28px 8px 28px 28px"};">${txt}</div>`;
}
