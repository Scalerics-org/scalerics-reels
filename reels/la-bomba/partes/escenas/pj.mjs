// Personajes y utilería de "La bomba" (iguales en todas las escenas). SVG en coordenadas locales;
// la escena los ubica con <g transform="translate(..) scale(..)">. P = prefijo de la escena.
// Paleta: búnker #070807 / #1f231d, oliva #4a5a2e, rojo cronómetro #ff2d2d, ámbar linterna
// #ffb020, azul cable #2f7bff, verde planilla #21a366, hueso #ecebe4; Scalerics #5ce611 al final.

// ---------- display de 7 segmentos ----------
const SEG = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "" };
function hexH(xa, xb, y, t) {
  return `${xa},${y} ${xa + t / 2},${y - t / 2} ${xb - t / 2},${y - t / 2} ${xb},${y} ${xb - t / 2},${y + t / 2} ${xa + t / 2},${y + t / 2}`;
}
function hexV(x, ya, yb, t) {
  return `${x},${ya} ${x + t / 2},${ya + t / 2} ${x + t / 2},${yb - t / 2} ${x},${yb} ${x - t / 2},${yb - t / 2} ${x - t / 2},${ya + t / 2}`;
}
// texto como "00:47" en segmentos; h = alto de un dígito. Devuelve <g> (los apagados, tenues).
export function seg7(txt, x, y, h, color = "#ff2d2d", cls = "", apagados = 0.1) {
  const w = h * 0.52, t = h * 0.13, gap = t * 0.18, paso = h * 0.7;
  let out = "", cx = x;
  for (const ch of String(txt)) {
    if (ch === ":") {
      out += `<rect x="${cx + t * 0.2}" y="${y + h * 0.28}" width="${t}" height="${t}" fill="${color}" /><rect x="${cx + t * 0.2}" y="${y + h * 0.64}" width="${t}" height="${t}" fill="${color}" />`;
      cx += t * 2.2;
      continue;
    }
    const on = SEG[ch] ?? "";
    const L = x0 => x0 + t / 2, R = x0 => x0 + w - t / 2;
    const segs = {
      a: hexH(L(cx) + gap, R(cx) - gap, y + t / 2, t),
      g: hexH(L(cx) + gap, R(cx) - gap, y + h / 2, t),
      d: hexH(L(cx) + gap, R(cx) - gap, y + h - t / 2, t),
      f: hexV(L(cx), y + t / 2 + gap, y + h / 2 - gap, t),
      b: hexV(R(cx), y + t / 2 + gap, y + h / 2 - gap, t),
      e: hexV(L(cx), y + h / 2 + gap, y + h - t / 2 - gap, t),
      c: hexV(R(cx), y + h / 2 + gap, y + h - t / 2 - gap, t),
    };
    for (const [k, pts] of Object.entries(segs)) {
      out += `<polygon points="${pts}" fill="${color}" opacity="${on.includes(k) ? 1 : apagados}" />`;
    }
    cx += paso;
  }
  return `<g class="${cls}">${out}</g>`;
}
// ancho que ocupa un texto de seg7
export function seg7ancho(txt, h) {
  let a = 0;
  for (const ch of String(txt)) a += ch === ":" ? h * 0.13 * 2.2 : h * 0.7;
  return a - h * 0.18;
}

// ---------- LA BOMBA: la notebook con la planilla, 700 x 560 ----------
// Clases: P-pantalla (fondo de la pantalla), P-celda (celdas de datos), P-tab (pestañas),
// P-crono-caja, P-cable-r / -a / -v / -y (cables), P-luz (led rojo).
// crono: texto del cronómetro (o "" para no ponerlo). pantalla: "normal" | "rojo"
export function bomba(P, { crono = "00:47", pantalla = "normal", tabs = true } = {}) {
  const verde = pantalla === "rojo" ? "#ff2d2d" : "#21a366";
  let grilla = "";
  for (let c = 0; c <= 5; c++) grilla += `<path d="M${96 + c * 86} 46 V318" stroke="${verde}" stroke-width="2.5" opacity="0.7" />`;
  for (let r = 0; r <= 6; r++) grilla += `<path d="M96 ${46 + r * 45.3} H526" stroke="${verde}" stroke-width="2.5" opacity="0.7" />`;
  const datos = [
    [1, 0, "=SUMA("], [3, 0, "1.240"], [1, 1, "=BUSCARV"], [3, 1, "#¡REF!"], [1, 2, "STOCK"], [2, 2, "??"],
    [4, 3, "=Hoja7!"], [1, 4, "CAJA"], [3, 4, "=Y(SI("], [2, 5, "NO TOCAR"],
  ];
  const celdas = datos
    .map(([c, r, t]) => `<text class="${P}-celda" x="${96 + c * 86 - 80}" y="${46 + r * 45.3 + 31}" font-family="IBM Plex Mono" font-weight="500" font-size="19" fill="${t.startsWith("#") || t === "NO TOCAR" ? "#ff2d2d" : verde}" data-layout-ignore>${t}</text>`)
    .join("");
  const nombres = ["STOCK FINAL", "v2", "AHORA SÍ", "NO TOCAR", "+10"];
  let tx = 98;
  const pest = tabs
    ? nombres
        .map((n, i) => {
          const w = n.length * 11 + 22;
          const rojo = n === "NO TOCAR";
          const s = `<g class="${P}-tab"><rect x="${tx}" y="324" width="${w}" height="30" rx="4" fill="${rojo ? "#ff2d2d" : "#1f231d"}" stroke="${verde}" stroke-width="2" /><text x="${tx + w / 2}" y="345" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="16" fill="${rojo ? "#070807" : "#ecebe4"}" data-layout-ignore>${n}</text></g>`;
          tx += w + 6;
          return s;
        })
        .join("")
    : "";
  const cw = seg7ancho("00:00", 62);
  return `
      <!-- cables por detrás -->
      <path class="l ${P}-cable-r" d="M250 470 C120 520 40 470 60 380 C80 300 30 240 70 190" style="stroke: #ff2d2d; stroke-width: 12px" />
      <path class="l ${P}-cable-a" d="M450 470 C580 520 670 470 640 380 C615 300 680 250 630 190" style="stroke: #2f7bff; stroke-width: 12px" />
      <path class="l ${P}-cable-v" d="M300 530 C260 600 160 600 120 540" style="stroke: #21a366; stroke-width: 10px" />
      <path class="l ${P}-cable-y" d="M400 530 C440 600 540 600 580 540" style="stroke: #ffb020; stroke-width: 10px" />
      <!-- tapa -->
      <rect class="b" x="66" y="0" width="490" height="380" rx="20" transform="translate(39 0)" />
      <rect class="${P}-pantalla" x="96" y="16" width="430" height="350" rx="6" fill="${pantalla === "rojo" ? "#3a0d0d" : "#0e2a1e"}" transform="translate(39 0)" />
      <g transform="translate(39 0)">
        <rect x="96" y="16" width="430" height="30" fill="${verde}" opacity="0.35" />
        <text x="110" y="38" font-family="IBM Plex Mono" font-weight="500" font-size="17" fill="#ecebe4" data-layout-ignore>planilla_local_FINAL_v14.xlsx</text>
        ${grilla}${celdas}${pest}
      </g>
      <!-- base -->
      <path class="b" d="M60 380 H640 L690 440 H10 Z" />
      <path class="l fino" d="M110 400 H590 M95 418 H605" opacity="0.5" />
      <!-- cinta de peligro cruzando la tapa -->
      <g opacity="0.95">
        <path d="M86 70 L150 30" stroke="#ffb020" stroke-width="26" />
        <path d="M554 30 L618 70" stroke="#ffb020" stroke-width="26" />
      </g>
      ${crono !== "" ? `<!-- el cronómetro atado arriba de la base -->
      <g class="${P}-crono-caja">
        <rect class="k" x="${350 - cw / 2 - 34}" y="430" width="${cw + 68}" height="110" rx="12" />
        ${Array.isArray(crono) ? cronoGrupos(P, crono, 350, 454, 62) : seg7(crono, 350 - cw / 2, 454, 62, "#ff2d2d", P + "-crono", 0.12)}
        <circle class="${P}-luz" cx="${350 + cw / 2 + 18}" cy="446" r="7" fill="#ff2d2d" />
        <path d="M${350 - cw / 2 - 60} 470 H${350 - cw / 2 - 34} M${350 + cw / 2 + 34} 470 H${350 + cw / 2 + 60}" stroke="#ecebe4" stroke-width="6" />
      </g>` : ""}`;
}

// ---------- EL EXPERTO en explosivos, 360 x 540 ----------
// Casco oliva con linterna en la frente, chaleco oliva, gotas de sudor.
// Clases: P-exp-boca, P-exp-ojos, P-exp-cejas, P-gota (gotas), P-exp-haz (haz de la linterna),
// P-exp-brazo (con el alicate, si alicate). tiznado: cara con hollín y pelo parado.
export function experto(P, { alicate = false, tiznado = false } = {}) {
  const hollin = tiznado
    ? `<path d="M118 238 C130 220 160 226 168 246 C150 262 124 258 118 238 Z M196 282 C214 270 240 276 242 296 C226 306 204 302 196 282 Z M140 316 C160 326 200 328 218 318" fill="#3b3d38" opacity="0.85" />
       <path class="k" d="M112 168 L96 120 L132 150 L140 96 L168 146 L188 92 L204 146 L236 100 L234 154 L268 128 L250 176 Z" stroke-width="6" />`
    : "";
  return `
      <path class="o" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />
      <path class="l" d="M118 380 V540 M242 380 V540" stroke-width="6" opacity="0.7" />
      <rect class="y" x="196" y="430" width="34" height="50" rx="6" stroke-width="4" />
      <rect class="y" x="130" y="430" width="34" height="50" rx="6" stroke-width="4" />
      <ellipse class="cara" cx="180" cy="252" rx="80" ry="94" />
      ${hollin}
      <circle class="${P}-exp-ojos" cx="150" cy="248" r="9" fill="#070807" />
      <circle class="${P}-exp-ojos" cx="212" cy="248" r="9" fill="#070807" />
      <path class="d ${P}-exp-cejas" d="M130 222 L166 230 M196 230 L232 222" stroke-width="7" />
      <ellipse class="${P}-exp-boca" data-o="180 304" cx="180" cy="304" rx="18" ry="10" fill="#070807" />
      ${tiznado ? "" : `<!-- casco con linterna -->
      <path class="o" d="M92 200 C86 128 140 104 180 104 C220 104 274 128 268 200 Z" />
      <path class="k" d="M80 200 H280 C282 214 268 220 252 218 H96 C84 218 78 212 80 200 Z" stroke-width="6" />
      <rect class="k" x="152" y="136" width="56" height="40" rx="10" stroke-width="5" />
      <circle class="y ${P}-exp-lampara" cx="180" cy="156" r="13" stroke-width="4" />`}
      <path class="a ${P}-gota" d="M100 216 C92 232 92 244 102 246 C112 244 110 232 100 216 Z" stroke-width="3" />
      <path class="a ${P}-gota" d="M258 230 C250 246 250 258 260 260 C270 258 268 246 258 230 Z" stroke-width="3" />
      <path class="a ${P}-gota" d="M238 186 C232 198 232 206 240 208 C248 206 246 198 238 186 Z" stroke-width="3" />
      ${alicate ? `<g class="${P}-exp-brazo">
        <path class="o" d="M300 470 C340 430 340 380 320 330" stroke-width="7" />
        <path class="k" d="M300 330 L340 220 L356 226 L322 334 Z" stroke-width="5" />
        <path class="r" d="M296 334 L322 340 L318 420 L300 418 Z" stroke-width="4" />
        <path class="k" d="M338 222 L372 190 M352 228 L392 210" stroke-width="7" />
      </g>` : ""}`;
}

// ---------- LA COMPAÑERA nerviosa, 360 x 540 ----------
// Pelo oscuro con cola, campera oliva, linterna en la mano. Clases: P-comp-boca, P-comp-cola,
// P-comp-brazo (con la linterna), P-comp-haz
export function companera(P, { linterna = true } = {}) {
  return `
      <path class="k ${P}-comp-cola" d="M248 186 C330 176 344 266 304 336 C294 286 284 246 244 226 Z" />
      <path class="o" d="M40 540 C40 420 96 380 180 380 C264 380 320 420 320 540 Z" />
      <path class="l" d="M140 384 L180 440 L220 384" stroke-width="6" />
      <path class="y" d="M80 470 H140 V500 H80 Z" stroke-width="4" />
      <ellipse class="cara" cx="180" cy="262" rx="76" ry="90" />
      <path class="k" d="M100 254 C90 172 150 150 186 152 C234 154 270 186 260 240 C232 212 170 198 100 254 Z" />
      <path class="d" d="M134 226 L166 216 M226 226 L194 216" stroke-width="7" />
      <circle cx="152" cy="256" r="11" fill="#070807" />
      <circle cx="208" cy="256" r="11" fill="#070807" />
      <ellipse class="${P}-comp-boca" fill="#070807" data-o="180 312" cx="180" cy="312" rx="20" ry="18" />
      ${linterna ? `<g class="${P}-comp-brazo">
        <path class="o" d="M60 470 C20 430 20 380 50 340" stroke-width="7" />
        <rect class="k" x="26" y="270" width="44" height="90" rx="10" stroke-width="5" transform="rotate(-18 48 315)" />
        <rect class="y" x="22" y="256" width="52" height="26" rx="6" stroke-width="4" transform="rotate(-18 48 315)" />
      </g>` : ""}`;
}

// ---------- EL DUEÑO del local, 360 x 540 ----------
// Pelado con pelo a los costados, bigote, buzo azul, cara de "yo no fui". Clases: P-due-boca, P-due-cejas
export function dueno(P, { contento = false } = {}) {
  return `
      <path class="a" d="M30 540 C30 410 92 368 180 368 C268 368 330 410 330 540 Z" />
      <path class="l" d="M140 372 C150 410 210 410 220 372" stroke-width="6" />
      <ellipse class="cara" cx="180" cy="252" rx="82" ry="96" />
      <path class="k" d="M98 236 C92 200 100 176 112 168 C110 196 112 216 118 236 Z M262 236 C268 200 260 176 248 168 C250 196 248 216 242 236 Z" stroke-width="5" />
      <path class="d ${P}-due-cejas" d="M132 222 C142 212 158 212 168 220 M192 220 C202 212 218 212 228 222" stroke-width="7" />
      <circle cx="152" cy="246" r="9" fill="#070807" />
      <circle cx="208" cy="246" r="9" fill="#070807" />
      <path d="M138 284 C156 270 204 270 222 284 C206 296 154 296 138 284 Z" fill="#070807" />
      ${contento
        ? `<path class="d ${P}-due-boca" d="M150 306 C166 326 196 326 212 306" stroke-width="7" />`
        : `<ellipse class="${P}-due-boca" data-o="180 312" cx="180" cy="312" rx="16" ry="9" fill="#070807" />`}`;
}

// ---------- haz de linterna (cono ámbar), para poner detrás de lo que ilumina ----------
export function haz(cls, x, y, r = 300) {
  return `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" fill="url(#hazgrad)" />`;
}
export const HAZDEF = `<defs><radialGradient id="hazgrad"><stop offset="0" stop-color="#ffb020" stop-opacity="0.28" /><stop offset="0.6" stop-color="#ffb020" stop-opacity="0.1" /><stop offset="1" stop-color="#ffb020" stop-opacity="0" /></radialGradient></defs>`;

// ---------- el cronómetro en tiempo real ----------
// Global: 00:47 en t=0, baja un segundo por segundo hasta 00:01 (t=46), se queda en 00:01
// (el "Control Z") y llega a 00:00 justo antes de la explosión (BOOM).
export const BOOM = 49.44;
const fmt = (n) => "00:" + String(n).padStart(2, "0");
// valores entre g0 y g1 (globales) como [t relativo a g0, texto]; el primero en 0.
export function CRONO_VALS(g0, g1 = BOOM) {
  const cambios = [];
  for (let k = 0; k <= 46; k++) cambios.push([k, fmt(47 - k)]);
  cambios.push([BOOM - 0.12, fmt(0)]);
  const out = [];
  for (const [t, txt] of cambios) {
    if (t <= g0) out[0] = [0, txt];
    else if (t < g1) out.push([Math.round((t - g0) * 100) / 100, txt]);
  }
  return out;
}
// el cronómetro de la bomba con todos sus valores (uno visible por vez: ver tickJS)
export function cronoGrupos(P, vals, cx, y, h) {
  const w = seg7ancho("00:00", h);
  return vals.map(([, txt], i) => seg7(txt, cx - w / 2, y, h, "#ff2d2d", `${P}-cv ${P}-cv${i}`, 0.12)).join("");
}
export function tickJS(P, vals) {
  return `
      { const V = ${JSON.stringify(vals.map(([t]) => t))};
        gsap.set(qa(".${P}-cv"), { opacity: 0 });
        V.forEach((v, i) => { tl.set(q(".${P}-cv" + i), { opacity: 1 }, v); if (i + 1 < V.length) tl.set(q(".${P}-cv" + i), { opacity: 0 }, V[i + 1]); });
        qa(".${P}-luz").forEach((l) => V.forEach((v) => tl.fromTo(l, { opacity: 1 }, { opacity: 0.15, duration: 0.4, immediateRender: false }, v + 0.05))); }`;
}
