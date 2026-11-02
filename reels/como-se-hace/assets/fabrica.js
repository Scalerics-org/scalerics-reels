// Piezas del reel "como-se-hace": la planta industrial (cinta transportadora, engranajes, brazo
// robot, cajas, baliza, reloj de fábrica), Gustavo el operario (overol azul y casco amarillo),
// el micrófono del documentalista, la planilla, el celular con chat, carteles de estación y helpers.
// Uso en una escena (después de GSAP): root.querySelector("svg").innerHTML = FAB.operario(x, y, s) + ...
// y en el script: const K = FAB.kit(tl, root).
window.FAB = window.FAB || (function () {
  // paleta: negro carbón, gris acero (3), hueso, amarillo seguridad, azul overol, rojo alarma; verde Scalerics solo al final
  const INK = "#121417", ACE = "#2b3036", ACE2 = "#4a525c", ACE3 = "#8a939c", HUE = "#f2f1ea", HUE2 = "#d9d6cb",
    AMA = "#f5c518", AMA2 = "#c99a00", AZU = "#2f5d9e", AZU2 = "#7fb2ff", ROJ = "#e5484d", VER = "#5ce611", VER2 = "#b8ff7a",
    PIEL = "#e2b48c", PIEL2 = "#c28f68", ROS = "#ff9eb0", CAR = "#c8a06a", CAR2 = "#9c7a4c";
  if (!document.getElementById("fab-css")) {
    const st = document.createElement("style");
    st.id = "fab-css";
    st.textContent = `
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.fx-cartel { position: absolute; box-sizing: border-box; padding: 16px 36px 26px; background: ${AMA}; border: 8px solid ${INK}; border-radius: 10px; text-align: center; white-space: nowrap;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.5); }
.fx-cartel::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 14px; border-radius: 0 0 3px 3px;
  background: repeating-linear-gradient(135deg, ${INK} 0px, ${INK} 14px, ${AMA} 14px, ${AMA} 28px); }
.fx-cartel small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.24em; color: ${INK}; }
.fx-cartel b { display: block; font-family: "Black Ops One", sans-serif; font-weight: 400; font-size: 76px; line-height: 1.02; color: ${INK}; letter-spacing: 0.02em; }
.fx-cartel .fx-cadena { position: absolute; top: -70px; width: 8px; height: 62px; background: repeating-linear-gradient(180deg, ${ACE3} 0px, ${ACE3} 12px, ${INK} 12px, ${INK} 16px); }
.fx-cartel.verde { background: ${VER}; }
.fx-cartel.verde::after { background: repeating-linear-gradient(135deg, ${INK} 0px, ${INK} 14px, ${VER} 14px, ${VER} 28px); }
.fx-titulo { position: absolute; font-family: "Black Ops One", sans-serif; font-weight: 400; color: ${AMA}; white-space: nowrap; text-align: center; line-height: 0.95;
  letter-spacing: 0.02em; text-shadow: 0 7px 0 ${INK}, 4px 4px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}; }
.fx-titulo.hueso { color: ${HUE}; }
.fx-titulo.rojo { color: ${ROJ}; }
.fx-titulo.verde { color: ${VER}; }
.fx-titulo.azul { color: ${AZU2}; }
.fx-sello { position: absolute; box-sizing: border-box; padding: 12px 30px 6px; border: 9px solid ${ROJ}; border-radius: 12px; color: ${ROJ};
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.05em; white-space: nowrap; text-align: center; line-height: 1.05; background: rgba(242, 241, 234, 0.95); }
.fx-sello.verde { border-color: #2f7a0a; color: #2f7a0a; }
.fx-sello.azul { border-color: ${AZU}; color: ${AZU}; }
.fx-tag { position: absolute; box-sizing: border-box; padding: 12px 26px 10px; background: ${INK}; border: 4px solid ${AMA}; border-radius: 6px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5);
  font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 32px; letter-spacing: 0.16em; color: ${AMA}; white-space: nowrap; text-align: center; }
.fx-tag.hueso { border-color: ${HUE}; color: ${HUE}; }
.fx-tag.rojo { border-color: ${ROJ}; color: ${ROJ}; }
.fx-tag.verde { border-color: ${VER}; color: ${VER2}; }
.fx-tag.azul { border-color: ${AZU2}; color: ${AZU2}; }
.fx-globo { position: absolute; box-sizing: border-box; padding: 16px 30px; background: ${HUE}; border: 6px solid ${INK}; border-radius: 30px;
  font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.1; color: ${INK}; text-align: center; white-space: nowrap; box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5); }
`;
    document.head.appendChild(st);
  }
  const T = (x, y, s, esp) => `translate(${x} ${y}) scale(${esp ? -(s ?? 1) : (s ?? 1)} ${s ?? 1})`;

  // GUSTAVO, EL OPERARIO: busto, origen = centro de la base del torso; cabeza en (0,-350).
  // o.cara: "neutra" | "cansado" | "dormido" | "sorpresa" | "feliz" | "orgullo"
  // o.celular: sostiene el celular frente al pecho (clase .fx-op-cel; pantalla .fx-op-pant)
  // o.parche: texto del parche del overol (default "OPERARIO"); o.casco false lo saca; o.mate: mate en la mano
  // clases: .fx-op .fx-op-cabeza .fx-op-boca .fx-op-ojos .fx-op-brazos .fx-op-parche
  function operario(x, y, s, o) {
    o = o || {};
    const cara = o.cara || "cansado";
    const ojos = cara === "dormido" ? `<path d="M-66 -346 Q-46 -334 -26 -346 M66 -346 Q46 -334 26 -346" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : cara === "feliz" ? `<path d="M-66 -342 Q-46 -364 -26 -342 M66 -342 Q46 -364 26 -342" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
      : cara === "sorpresa" ? `<circle cx="-46" cy="-348" r="19" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="46" cy="-348" r="19" fill="#ffffff" stroke="${INK}" stroke-width="6"/><circle cx="-46" cy="-348" r="7" fill="${INK}"/><circle cx="46" cy="-348" r="7" fill="${INK}"/>`
      : cara === "cansado" ? `<path d="M-66 -350 L-26 -350 M66 -350 L26 -350" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M-62 -350 Q-46 -334 -30 -350 M62 -350 Q46 -334 30 -350" fill="${INK}" stroke="${INK}" stroke-width="4"/>`
      : `<circle cx="-46" cy="-348" r="11" fill="${INK}"/><circle cx="46" cy="-348" r="11" fill="${INK}"/>`;
    const cejas = cara === "sorpresa" ? "M-74 -392 Q-48 -410 -22 -394 M74 -392 Q48 -410 22 -394"
      : cara === "cansado" || cara === "dormido" ? "M-74 -372 L-26 -382 M74 -372 L26 -382"
      : cara === "orgullo" ? "M-74 -386 L-26 -380 M74 -386 L26 -380" : "M-74 -380 L-26 -386 M74 -380 L26 -386";
    const boca = cara === "sorpresa" ? `<ellipse class="fx-op-boca" cx="0" cy="-258" rx="18" ry="22" fill="${INK}"/>`
      : cara === "feliz" || cara === "orgullo" ? `<path class="fx-op-boca" d="M-36 -270 Q0 -236 36 -270 Z" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
      : cara === "dormido" ? `<ellipse class="fx-op-boca" cx="0" cy="-258" rx="13" ry="10" fill="${INK}"/>`
      : `<path class="fx-op-boca" d="M-26 -258 Q0 -268 26 -258" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const ojeras = cara === "feliz" || cara === "orgullo" ? "" : `<path d="M-70 -324 Q-46 -308 -22 -324 M70 -324 Q46 -308 22 -324" fill="none" stroke="#8b6f86" stroke-width="7" stroke-linecap="round"/>
        <path d="M-64 -312 Q-46 -300 -28 -312 M64 -312 Q46 -300 28 -312" fill="none" stroke="#8b6f86" stroke-width="5" stroke-linecap="round" opacity="0.7"/>`;
    const casco = o.casco === false ? `<path d="M-108 -392 C-120 -470 -60 -500 0 -498 C60 -500 120 -470 108 -392 C90 -430 60 -440 0 -436 C-60 -440 -90 -430 -108 -392 Z" fill="#4a3a2c" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`
      : `<g class="fx-op-casco">
        <path d="M-118 -404 C-122 -520 122 -520 118 -404 Z" fill="${AMA}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-40 -498 L-34 -410 M40 -498 L34 -410" stroke="${AMA2}" stroke-width="10" stroke-linecap="round"/>
        <rect x="-150" y="-412" width="300" height="28" rx="12" fill="${AMA}" stroke="${INK}" stroke-width="8"/>
        <path d="M-80 -470 Q-60 -490 -36 -496" fill="none" stroke="#fff4c2" stroke-width="7" stroke-linecap="round"/>
      </g>`;
    const brazos = o.celular ? `<g class="fx-op-brazos">
        <path d="M-205 -110 C-200 -40 -150 -30 -70 -90" fill="none" stroke="${INK}" stroke-width="70" stroke-linecap="round"/>
        <path d="M-205 -110 C-200 -40 -150 -30 -70 -90" fill="none" stroke="${ACE3}" stroke-width="54" stroke-linecap="round"/>
        <path d="M205 -110 C200 -40 150 -30 70 -90" fill="none" stroke="${INK}" stroke-width="70" stroke-linecap="round"/>
        <path d="M205 -110 C200 -40 150 -30 70 -90" fill="none" stroke="${ACE3}" stroke-width="54" stroke-linecap="round"/>
        <g class="fx-op-cel">
          <rect x="-62" y="-210" width="124" height="200" rx="18" fill="${INK}" stroke="${INK}" stroke-width="6"/>
          <rect class="fx-op-pant" x="-50" y="-196" width="100" height="172" rx="10" fill="${AZU2}"/>
          <path d="M-36 -170 L30 -170 M-36 -146 L18 -146 M-36 -122 L26 -122" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity="0.55"/>
        </g>
        <ellipse cx="-66" cy="-96" rx="34" ry="28" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="66" cy="-96" rx="34" ry="28" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M54 -150 L52 -116" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M54 -150 L52 -116" stroke="${PIEL}" stroke-width="10" stroke-linecap="round"/>
      </g>` : o.mate ? `<g class="fx-op-brazos">
        <path d="M205 -110 C200 -40 150 -30 90 -80" fill="none" stroke="${INK}" stroke-width="70" stroke-linecap="round"/>
        <path d="M205 -110 C200 -40 150 -30 90 -80" fill="none" stroke="${ACE3}" stroke-width="54" stroke-linecap="round"/>
        <path d="M58 -150 C50 -90 60 -70 80 -60 L120 -60 C140 -70 150 -90 142 -150 Z" fill="${CAR2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M110 -150 L132 -220" stroke="${ACE3}" stroke-width="9" stroke-linecap="round"/><path d="M110 -150 L132 -220" stroke="${INK}" stroke-width="3"/>
        <ellipse cx="96" cy="-86" rx="40" ry="30" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      </g>` : "";
    return `<g transform="${T(x, y, s, o.espejo)}"><g class="fx-op">
      <!-- remera gris de manga y, encima, el overol azul con tiradores -->
      <path d="M-250 40 C-250 -110 -190 -205 -80 -222 L80 -222 C190 -205 250 -110 250 40 Z" fill="${ACE3}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M-250 40 L-246 -30 Q0 -6 246 -30 L250 40 Z" fill="${AZU}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-118 0 L-108 -140 L108 -140 L118 0 Z" fill="${AZU}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-104 -138 L-150 -214 M104 -138 L150 -214" stroke="${INK}" stroke-width="40" stroke-linecap="round"/>
      <path d="M-104 -138 L-150 -214 M104 -138 L150 -214" stroke="${AZU}" stroke-width="26" stroke-linecap="round"/>
      <circle cx="-96" cy="-126" r="13" fill="${AMA}" stroke="${INK}" stroke-width="5"/><circle cx="96" cy="-126" r="13" fill="${AMA}" stroke="${INK}" stroke-width="5"/>
      <g class="fx-op-parche"><rect x="-82" y="-104" width="164" height="50" rx="8" fill="${HUE}" stroke="${INK}" stroke-width="5"/>
      <text data-layout-ignore x="0" y="-69" text-anchor="middle" font-family="Black Ops One" font-size="${(o.parche || "OPERARIO").length > 8 ? 24 : 28}" fill="${AZU}">${o.parche || "OPERARIO"}</text></g>
      <path d="M-40 -275 L-44 -214 L44 -214 L40 -275 Z" fill="${PIEL2}" stroke="${INK}" stroke-width="7"/>
      <g class="fx-op-cabeza">
        <ellipse cx="-108" cy="-336" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <ellipse cx="108" cy="-336" rx="22" ry="32" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
        <path d="M-104 -392 C-110 -480 110 -480 104 -392 L100 -315 C92 -252 54 -226 0 -226 C-54 -226 -92 -252 -100 -315 Z" fill="${PIEL}" stroke="${INK}" stroke-width="8"/>
        <!-- barba de un día -->
        <path d="M-92 -300 C-80 -250 -40 -232 0 -232 C40 -232 80 -250 92 -300" fill="none" stroke="${PIEL2}" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
        ${casco}
        <path class="fx-op-cejas" d="${cejas}" fill="none" stroke="#3a2a1e" stroke-width="12" stroke-linecap="round"/>
        ${ojeras}
        <g class="fx-op-ojos">${ojos}</g>
        <path d="M0 -342 C-12 -308 -20 -296 -2 -290" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
        <!-- bigote -->
        <path d="M-66 -282 C-44 -310 -14 -304 0 -292 C14 -304 44 -310 66 -282 C44 -274 14 -278 0 -284 C-14 -278 -44 -274 -66 -282 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        ${boca}
      </g>
      ${brazos}
    </g></g>`;
  }

  // MICRÓFONO del documentalista: entra de costado. (x, y) = la cabeza (bocha de espuma); rot en grados.
  function microfono(x, y, rot, o) {
    o = o || {};
    return `<g class="fx-mic ${o.cls || ""}" transform="translate(${x} ${y}) rotate(${rot || 0})">
      <rect x="30" y="-20" width="300" height="40" rx="14" fill="${INK}" stroke="${INK}" stroke-width="6"/>
      <rect x="36" y="-14" width="288" height="28" rx="10" fill="${ACE2}"/>
      <rect x="40" y="-46" width="84" height="92" rx="8" fill="${AMA}" stroke="${INK}" stroke-width="7"/>
      <text data-layout-ignore x="82" y="10" text-anchor="middle" font-family="Black Ops One" font-size="30" fill="${INK}">TV</text>
      <circle cx="0" cy="0" r="58" fill="${ACE}" stroke="${INK}" stroke-width="8"/>
      <path d="M-34 -30 L34 30 M-34 30 L34 -30 M-46 0 L46 0 M0 -46 L0 46" stroke="${ACE2}" stroke-width="5"/>
      <ellipse cx="300" cy="0" rx="44" ry="50" fill="${PIEL}" stroke="${INK}" stroke-width="7"/>
      <path d="M262 -30 L300 -36 M262 -10 L304 -14 M262 10 L304 10 M262 30 L300 32" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <path d="M330 -40 L460 -60 L460 60 L330 40 Z" fill="${ACE2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    </g>`;
  }

  // CINTA TRANSPORTADORA: esquina superior izquierda (x, y), ancho w. Rodillos .fx-rod (rotar cada uno con svgOrigin
  // en su centro: data-c="cx cy") y marcas de la banda .fx-marcas (mover en x, se repiten cada 80 px).
  function cinta(x, y, w, o) {
    o = o || {};
    const h = 54, cls = o.cls || "";
    let rod = "", marcas = "", patas = "";
    for (let cx = x + 34; cx <= x + w - 30; cx += 92) {
      rod += `<g class="fx-rod" data-c="${cx} ${y + h / 2}"><circle cx="${cx}" cy="${y + h / 2}" r="20" fill="${ACE3}" stroke="${INK}" stroke-width="5"/>
        <path d="M${cx - 13} ${y + h / 2} L${cx + 13} ${y + h / 2} M${cx} ${y + h / 2 - 13} L${cx} ${y + h / 2 + 13}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;
    }
    for (let mx = x - 80; mx < x + w + 80; mx += 80) marcas += `<path d="M${mx} ${y - 4} L${mx + 26} ${y - 4}" stroke="${ACE3}" stroke-width="6" stroke-linecap="round"/>`;
    for (const px of [x + 60, x + w - 60]) patas += `<path d="M${px} ${y + h} L${px - 20} ${y + h + (o.patas ?? 120)} M${px} ${y + h} L${px + 20} ${y + h + (o.patas ?? 120)}" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <path d="M${px} ${y + h} L${px - 20} ${y + h + (o.patas ?? 120)} M${px} ${y + h} L${px + 20} ${y + h + (o.patas ?? 120)}" stroke="${ACE2}" stroke-width="7" stroke-linecap="round"/>`;
    const id = "fx-cl-" + Math.round(x) + "-" + Math.round(y);
    return `<g class="fx-cinta ${cls}">${patas}
      <rect x="${x}" y="${y - 10}" width="${w}" height="${h + 20}" rx="${(h + 20) / 2}" fill="${INK}"/>
      <rect x="${x + 8}" y="${y}" width="${w - 16}" height="${h}" rx="${h / 2}" fill="${ACE}" stroke="${INK}" stroke-width="4"/>
      ${rod}
      <defs><clipPath id="${id}"><rect x="${x + 10}" y="${y - 12}" width="${w - 20}" height="14"/></clipPath></defs>
      <g clip-path="url(#${id})"><g class="fx-marcas">${marcas}</g></g>
      <path d="M${x + 30} ${y + h + 10} L${x + w - 30} ${y + h + 10}" stroke="${AMA}" stroke-width="8" stroke-dasharray="22 18"/>
    </g>`;
  }

  // ENGRANAJE: centro (cx, cy), radio r, n dientes. Rotar con svgOrigin "cx cy".
  function engranaje(cx, cy, r, n, o) {
    o = o || {};
    const d = r * 0.18, pts = [];
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2, a1 = a0 + (Math.PI * 2) / n * 0.25, a2 = a0 + (Math.PI * 2) / n * 0.5, a3 = a0 + (Math.PI * 2) / n * 0.75;
      const p = (a, rr) => `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
      pts.push(`${i ? "L" : "M"}${p(a0, r - d)} L${p(a1, r + d * 0.1)} L${p(a2, r + d * 0.1)} L${p(a3, r - d)}`);
    }
    return `<g class="fx-eng ${o.cls || ""}" data-c="${cx} ${cy}"><path d="${pts.join(" ")} Z" fill="${o.fill || ACE2}" stroke="${INK}" stroke-width="${o.w || 7}" stroke-linejoin="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="none" stroke="${o.linea || ACE3}" stroke-width="5"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.2}" fill="${INK}"/></g>`;
  }

  // BRAZO ROBOT: base en (x, y). Segmentos: .fx-br-a (pivote x, y-60) y .fx-br-b (pivote x+170, y-230 en reposo);
  // pinza .fx-br-p. o.fantasma: dibujado en línea punteada (la máquina que no está).
  function brazo(x, y, s, o) {
    o = o || {};
    const f = o.fantasma, C = o.color || AMA;
    const st = (w) => f ? `fill="none" stroke="${ACE3}" stroke-width="6" stroke-dasharray="16 14"` : `fill="${C}" stroke="${INK}" stroke-width="${w || 8}"`;
    return `<g class="fx-brazo ${o.cls || ""}" transform="${T(x, y, s, o.espejo)}">
      <rect x="-90" y="-40" width="180" height="40" rx="8" ${f ? st() : `fill="${ACE2}" stroke="${INK}" stroke-width="8"`}/>
      <g class="fx-br-a">
        <path d="M-26 -60 L150 -248 L190 -212 L26 -40 Z" ${st()} stroke-linejoin="round"/>
        <circle cx="0" cy="-56" r="34" ${f ? st() : `fill="${ACE2}" stroke="${INK}" stroke-width="8"`}/>
        <g class="fx-br-b">
          <path d="M150 -250 L330 -200 L318 -150 L150 -200 Z" ${st()} stroke-linejoin="round"/>
          <circle cx="170" cy="-230" r="30" ${f ? st() : `fill="${ACE2}" stroke="${INK}" stroke-width="8"`}/>
          <g class="fx-br-p">
            <path d="M326 -210 L372 -232 L380 -214 M320 -146 L366 -126 L374 -144" fill="none" stroke="${f ? ACE3 : INK}" stroke-width="${f ? 6 : 14}" stroke-linecap="round" ${f ? 'stroke-dasharray="16 14"' : ""}/>
          </g>
        </g>
      </g>
    </g>`;
  }

  // CAJA de cartón: esquina (x, y), w x h. Etiqueta opcional.
  function caja(x, y, w, h, o) {
    o = o || {};
    return `<g class="fx-caja ${o.cls || ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${CAR}" stroke="${INK}" stroke-width="7"/>
      <path d="M${x} ${y + h * 0.22} L${x + w} ${y + h * 0.22}" stroke="${CAR2}" stroke-width="6"/>
      <rect x="${x + w / 2 - 18}" y="${y}" width="36" height="${h * 0.22}" fill="${HUE2}" stroke="${INK}" stroke-width="4"/>
      ${o.texto ? `<text data-layout-ignore x="${x + w / 2}" y="${y + h * 0.66}" text-anchor="middle" font-family="Black Ops One" font-size="${o.fs || 30}" fill="${INK}">${o.texto}</text>` : ""}
    </g>`;
  }

  // BALIZA giratoria: base (x, y). La luz .fx-baliza-luz (titilar con opacity).
  function baliza(x, y, o) {
    o = o || {};
    const c = o.color || AMA;
    return `<g class="fx-baliza ${o.cls || ""}">
      <rect x="${x - 34}" y="${y - 16}" width="68" height="20" rx="4" fill="${ACE2}" stroke="${INK}" stroke-width="6"/>
      <path d="M${x - 26} ${y - 16} L${x - 26} ${y - 60} Q${x} ${y - 88} ${x + 26} ${y - 60} L${x + 26} ${y - 16} Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path class="fx-baliza-luz" d="M${x} ${y - 50} L${x - 150} ${y - 110} L${x - 150} ${y + 10} Z M${x} ${y - 50} L${x + 150} ${y - 110} L${x + 150} ${y + 10} Z" fill="${c}" opacity="0.3"/>
    </g>`;
  }

  // PLANILLA: esquina (x, y), ancho w, filas = [[col1, col2], ...]. Fila i: .fx-pl-f<i>, su texto .fx-pl-t<i>.
  function planilla(x, y, w, filas, o) {
    o = o || {};
    const fh = o.fh || 64, cols = o.cols || [0.45, 0.55], n0 = o.nums ?? 1, enc = o.enc || ["#", "CLIENTE", "PEDIDO"];
    const cx = [x + 80];
    let acc = x + 80;
    cols.forEach((c) => { acc += c * (w - 80); cx.push(acc); });
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${fh * (filas.length + 1) + 8}" rx="10" fill="${HUE}" stroke="${INK}" stroke-width="8"/>
      <rect x="${x}" y="${y}" width="${w}" height="${fh}" rx="10" fill="${AZU}" stroke="${INK}" stroke-width="8"/>`;
    enc.forEach((e, i) => { s += i === 0 ? `<text data-layout-ignore x="${x + 42}" y="${y + fh * 0.64}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.36}" fill="${HUE}">${e}</text>`
      : `<text data-layout-ignore x="${cx[i - 1] + 14}" y="${y + fh * 0.64}" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.36}" fill="${HUE}" letter-spacing="2">${e}</text>`; });
    filas.forEach((f, i) => {
      const yy = y + fh * (i + 1);
      s += `<g class="fx-pl-f fx-pl-f${i}"><rect class="fx-pl-bg" x="${x + 4}" y="${yy}" width="${w - 8}" height="${fh}" fill="${i % 2 ? HUE2 : HUE}" opacity="0.95"/>
        <rect x="${x + 4}" y="${yy}" width="76" height="${fh}" fill="${ACE3}"/>
        <text data-layout-ignore x="${x + 42}" y="${yy + fh * 0.64}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="${fh * 0.34}" fill="${INK}">${n0 + i}</text>
        <g class="fx-pl-t fx-pl-t${i}">${f.map((c, k) => `<text data-layout-ignore x="${cx[k] + 14}" y="${yy + fh * 0.66}" font-family="Lexend" font-weight="600" font-size="${fh * 0.4}" fill="${INK}">${c}</text>`).join("")}</g>
        <path d="M${x + 4} ${yy + fh} L${x + w - 4} ${yy + fh}" stroke="${ACE3}" stroke-width="2"/></g>`;
    });
    cx.slice(0, -1).forEach((c) => { s += `<path d="M${c} ${y + 4} L${c} ${y + fh * (filas.length + 1) + 4}" stroke="${ACE3}" stroke-width="2"/>`; });
    return `<g class="fx-pl ${o.cls || ""}">${s}</g>`;
  }

  // CELULAR: marco (x, y, w, h). celular() da fondo + clipPath id; celularBorde() el marco encima.
  function celular(x, y, w, h, id, fondo) {
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}"/></clipPath></defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${fondo || HUE}"/>`;
  }
  function celularBorde(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.1}" fill="none" stroke="${INK}" stroke-width="${Math.max(10, w * 0.045)}"/>
      <rect x="${x + w / 2 - w * 0.13}" y="${y + 12}" width="${w * 0.26}" height="${Math.max(10, w * 0.04)}" rx="6" fill="${INK}"/>`;
  }
  function chatCabecera(x, y, w, nombre, sub) {
    return `<rect x="${x}" y="${y}" width="${w}" height="112" fill="${ACE}"/>
      <circle cx="${x + 58}" cy="${y + 68}" r="26" fill="${HUE}" stroke="${INK}" stroke-width="4"/>
      <text x="${x + 100}" y="${y + 66}" font-family="Lexend" font-weight="700" font-size="28" fill="${HUE}">${nombre}</text>
      <text x="${x + 100}" y="${y + 96}" font-family="IBM Plex Mono" font-weight="600" font-size="19" fill="${AMA}">${sub || ""}</text>`;
  }
  // GLOBO de chat (SVG): lado "d" (sale) o "i" (entra). Devuelve [svg, alto, ancho].
  function globo(x, y, texto, lado, o) {
    o = o || {};
    const fs = o.fs || 32, lineas = Array.isArray(texto) ? texto : [texto];
    const ancho = o.ancho || Math.max(...lineas.map((l) => l.length)) * fs * 0.56 + 48;
    const alto = lineas.length * fs * 1.25 + 30;
    const gx = lado === "d" ? x - ancho : x;
    const fill = o.fill || (lado === "d" ? "#d9f5c4" : "#ffffff");
    const txt = lineas.map((l, i) => `<text x="${gx + 24}" y="${y + 15 + fs + i * fs * 1.25}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="${INK}">${l}</text>`).join("");
    return [`<g class="${o.cls || ""}"><rect x="${gx}" y="${y}" width="${ancho}" height="${alto}" rx="20" fill="${fill}" stroke="${INK}" stroke-width="5"/>${txt}</g>`, alto, ancho];
  }

  // RELOJ de fábrica: centro (x, y), radio r, hora h, minutos m. Agujas .fx-rj-h .fx-rj-m (rotar con svgOrigin "x y").
  function reloj(x, y, r, h, m, o) {
    o = o || {};
    let marcas = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      marcas += `<line x1="${x + Math.sin(a) * r * 0.76}" y1="${y - Math.cos(a) * r * 0.76}" x2="${x + Math.sin(a) * r * 0.9}" y2="${y - Math.cos(a) * r * 0.9}" stroke="${INK}" stroke-width="${k % 3 ? 4 : 9}" stroke-linecap="round"/>`;
    }
    const ah = ((h % 12) + m / 60) * 30, am = m * 6;
    return `<g class="fx-rj ${o.cls || ""}">
      <circle cx="${x}" cy="${y}" r="${r + 18}" fill="${o.aro || AMA}" stroke="${INK}" stroke-width="8"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${HUE}" stroke="${INK}" stroke-width="6"/>
      ${marcas}
      <line class="fx-rj-h" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.5}" stroke="${INK}" stroke-width="12" stroke-linecap="round" transform="rotate(${ah} ${x} ${y})"/>
      <line class="fx-rj-m" x1="${x}" y1="${y}" x2="${x}" y2="${y - r * 0.74}" stroke="${ROJ}" stroke-width="7" stroke-linecap="round" transform="rotate(${am} ${x} ${y})"/>
      <circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>
    </g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function origen(el, o) { gsap.set(el, { svgOrigin: o, smoothOrigin: false }); }
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    function popSvg(el, t, o, d, desde) {
      gsap.set(el, { opacity: 0, svgOrigin: o, smoothOrigin: false });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 0.3, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: d || 0.4, ease: "back.out(2)", immediateRender: false }, t);
    }
    // cartel de estación que baja colgado de cadenas y se balancea
    function bajar(el, t) {
      gsap.set(el, { opacity: 0, y: -260 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { y: 0, duration: 0.38, ease: "back.out(1.4)" }, t);
      tl.fromTo(el, { rotation: -4 }, { rotation: 3, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, t + 0.3);
      tl.to(el, { rotation: 0, duration: 0.2 }, t + 1.5);
    }
    function sello(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 1.9, rotation: (rot || 0) - 6 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.12, ease: "power4.in", immediateRender: false }, t - 0.1);
      tl.fromTo(el, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t + 0.02);
    }
    function sacudon(el, t, f) {
      f = f || 1;
      [[-14, 8], [11, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    function hablar(sel, t, veces, d) {
      qa(sel).forEach((b) => {
        const bb = b.getBBox();
        origen(b, `${bb.x + bb.width / 2} ${bb.y + bb.height / 2}`);
        tl.fromTo(b, { scaleY: 1 }, { scaleY: 1.6, duration: d || 0.12, yoyo: true, repeat: (veces || 3) * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
      });
    }
    function flotar(el, t, d, amp, per) {
      const p = per || 0.8, n = Math.max(1, Math.floor(d / p));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 8), duration: p / 2, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut", immediateRender: false }, t);
    }
    // la cinta corre: rodillos giran y las marcas avanzan (vel en px/s; negativo = hacia la izquierda)
    function correr(t, d, vel, cls) {
      const pre = cls ? "." + cls + " " : "";
      const v = vel ?? 160;
      qa(pre + ".fx-rod").forEach((r) => { origen(r, r.dataset.c); tl.fromTo(r, { rotation: 0 }, { rotation: (v * d) / 20 * (180 / Math.PI), duration: d, ease: "none", immediateRender: false }, t); });
      qa(pre + ".fx-marcas").forEach((m) => { const n = Math.round((v * d) / 80); tl.fromTo(m, { x: 0 }, { x: 80 * n, duration: d, ease: "none", immediateRender: false }, t); });
    }
    function girar(el, t, d, grados, ease) {
      const els = typeof el === "string" ? qa(el) : [el];
      els.forEach((e) => { origen(e, e.dataset.c); tl.fromTo(e, { rotation: 0 }, { rotation: grados, duration: d, ease: ease || "none", immediateRender: false }, t); });
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, origen, pop, popSvg, bajar, sello, sacudon, dibujar, hablar, flotar, correr, girar, salida };
  }
  return { INK, ACE, ACE2, ACE3, HUE, HUE2, AMA, AMA2, AZU, AZU2, ROJ, VER, VER2, PIEL, PIEL2, ROS, CAR, CAR2, T,
    operario, microfono, cinta, engranaje, brazo, caja, baliza, planilla, celular, celularBorde, chatCabecera, globo, reloj, kit };
})();
