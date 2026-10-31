// Piezas del reel "la-trasnoche" (radio AM de madrugada: ámbar, bordó y negro cálido): Hugo el
// locutor, Carmen, Matías, Raúl el panadero, el micrófono de pie, el teléfono de línea, el dial,
// la carta manuscrita, y los helpers de GSAP.
// Uso en una escena: <script src="assets/radio.js"></script> después de GSAP; en el script,
// const K = RD.kit(tl, root). Personajes: RD.hugo(), RD.carmen(), RD.matias(), RD.raul() devuelven
// un <g> de 440 x 800 (de la cintura para arriba; la base en y 800) para meter en un <g transform>.
window.RD = window.RD || (function () {
  const T = "#140b09", AMB = "#ffb03b", BOR = "#7d1f2b", ROJ = "#ff3b2f", CRE = "#f5e6c8", MAD = "#3a2018";
  const BOR2 = "#a8323f", AMB2 = "#c97a1c", GRI = "#5a4842", MET = "#cbbba5";
  const PH = "#e6b08a", PC = "#f0c7a6", PM = "#d7a27c", PR = "#e2a27f", CANAS = "#cfc3b8", PELO = "#1e1412";
  if (!document.getElementById("rd-css")) {
    const st = document.createElement("style");
    st.id = "rd-css";
    st.textContent = `
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
.rd-etiqueta { position: absolute; left: 0; top: 1268px; width: 1080px; display: flex; justify-content: center; pointer-events: none; }
.rd-etiqueta span { display: inline-block; padding: 10px 26px 9px; border: 3px solid ${AMB}; border-radius: 8px; background: rgba(20, 11, 9, 0.88); font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.2em; color: ${CRE}; text-transform: uppercase; white-space: nowrap; }
.rd-etiqueta span b { color: ${AMB}; font-weight: 600; }
.rd-grueso { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; color: ${CRE}; line-height: 0.95; white-space: nowrap; text-align: center; letter-spacing: -0.01em; }
.rd-mano { position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: ${T}; line-height: 1.05; white-space: nowrap; }
.rd-alaire { position: absolute; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 6px solid ${T}; background: ${ROJ}; font-family: "Lexend", sans-serif; font-weight: 900; color: #fff1e6; letter-spacing: 0.1em; white-space: nowrap;
  box-shadow: 0 0 18px rgba(255, 59, 47, 0.8), 0 0 50px rgba(255, 59, 47, 0.45); text-shadow: 0 0 10px rgba(255, 220, 200, 0.8); }
.rd-sello { position: absolute; box-sizing: border-box; padding: 12px 24px 10px; border: 7px solid ${ROJ}; border-radius: 12px; background: ${T}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; color: ${ROJ}; letter-spacing: 0.03em; white-space: nowrap; text-transform: uppercase; }
.rd-cel { position: absolute; box-sizing: border-box; background: #1d1311; border: 7px solid ${CRE}; border-radius: 54px; overflow: hidden; }
.rd-cel .rd-isla { position: absolute; left: 50%; top: 18px; width: 110px; height: 26px; margin-left: -55px; border-radius: 14px; background: ${GRI}; }
.rd-cel .rd-cab { position: absolute; left: 0; top: 0; width: 100%; height: 140px; box-sizing: border-box; padding: 62px 28px 0; background: ${BOR}; display: flex; align-items: center; gap: 16px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; color: ${CRE}; white-space: nowrap; }
.rd-cel .rd-cab i { width: 52px; height: 52px; border-radius: 50%; background: ${AMB}; flex: none; border: 4px solid ${T}; }
.rd-cel .rd-cab small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; letter-spacing: 0.08em; color: #e9b9a0; margin-top: 2px; }
.rd-globo { position: absolute; box-sizing: border-box; padding: 16px 22px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 30px; line-height: 1.2; white-space: nowrap; }
.rd-globo.rd-yo { background: ${AMB}; color: ${T}; border-bottom-right-radius: 6px; }
.rd-globo.rd-el { background: #3a2a26; color: ${CRE}; border-bottom-left-radius: 6px; }
.rd-globo small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 18px; opacity: 0.7; margin-top: 4px; text-align: right; }
.rd-mono { font-family: "IBM Plex Mono", monospace; font-weight: 600; }
`;
    document.head.appendChild(st);
  }

  const tr = `stroke="${T}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
  const brazo = (d, color, ancho) => `<path d="${d}" fill="none" stroke="${T}" stroke-width="${ancho + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function ojos(y, mirada, entornados, piel) {
    const dx = mirada || 0;
    const par = entornados ? `<path d="M163 ${y - 2} Q180 ${y - 26} 197 ${y - 2} Z M243 ${y - 2} Q260 ${y - 26} 277 ${y - 2} Z" fill="${piel}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>` : "";
    return `<g class="rd-ojos"><ellipse cx="180" cy="${y}" rx="16" ry="19" fill="#fffaf0" ${tr} stroke-width="5"/><ellipse cx="260" cy="${y}" rx="16" ry="19" fill="#fffaf0" ${tr} stroke-width="5"/><circle class="rd-pupila" cx="${181 + dx}" cy="${y + 4}" r="8" fill="${T}"/><circle class="rd-pupila" cx="${261 + dx}" cy="${y + 4}" r="8" fill="${T}"/>${par}</g>`;
  }
  function auris(banda, copa, y) {
    y = y || 236;
    return `<g class="rd-auris"><path d="M104 ${y} Q98 ${y - 150} 220 ${y - 154} Q342 ${y - 150} 336 ${y}" fill="none" stroke="${T}" stroke-width="26" stroke-linecap="round"/>
      <path d="M104 ${y} Q98 ${y - 150} 220 ${y - 154} Q342 ${y - 150} 336 ${y}" fill="none" stroke="${banda}" stroke-width="12" stroke-linecap="round"/>
      <ellipse cx="98" cy="${y + 4}" rx="30" ry="50" fill="${copa}" ${tr}/><ellipse cx="342" cy="${y + 4}" rx="30" ry="50" fill="${copa}" ${tr}/>
      <ellipse cx="98" cy="${y + 4}" rx="12" ry="30" fill="${T}" opacity="0.35"/><ellipse cx="342" cy="${y + 4}" rx="12" ry="30" fill="${T}" opacity="0.35"/></g>`;
  }
  // el tubo del teléfono (para la oreja izquierda del dibujo, x ~ 330) con el cable en rulos que baja
  function tuboOreja(x, y, color) {
    color = color || CRE;
    return `<g class="rd-tubo"><path d="M${x + 10} ${y + 120} q30 20 0 40 q-30 20 0 40 q30 20 0 40 q-30 20 0 40 q30 20 0 40" fill="none" stroke="${T}" stroke-width="12"/><path d="M${x + 10} ${y + 120} q30 20 0 40 q-30 20 0 40 q30 20 0 40 q-30 20 0 40 q30 20 0 40" fill="none" stroke="${color}" stroke-width="5"/>
      <path d="M${x - 24} ${y - 70} Q${x + 34} ${y - 64} ${x + 40} ${y} Q${x + 34} ${y + 64} ${x - 24} ${y + 70} L${x - 4} ${y + 112} Q${x + 70} ${y + 70} ${x + 74} ${y} Q${x + 70} ${y - 70} ${x - 4} ${y - 112} Z" fill="${color}" ${tr}/></g>`;
  }

  // ---------- personajes (440 x 800, la cintura en y 800) ----------
  // Hugo: el locutor. Pelo negro engominado para atrás con canas en las sienes, bigote finito,
  // ojos entornados de galán, saco bordó con solapas, pañuelo ámbar al cuello, auriculares retro.
  function hugo(o) {
    o = o || {};
    return `<g class="rd-hugo">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${BOR}" ${tr}/>
      <path d="M160 406 L220 560 L280 406 Z" fill="${CRE}" ${tr} stroke-width="6"/>
      <path d="M150 404 L126 470 L176 492 L220 560 L164 420 Z M290 404 L314 470 L264 492 L220 560 L276 420 Z" fill="${BOR2}" ${tr} stroke-width="6"/>
      <path d="M186 412 Q220 446 254 412 L240 470 Q220 486 200 470 Z" fill="${AMB}" ${tr} stroke-width="6"/>
      <circle cx="206" cy="436" r="5" fill="${T}" opacity="0.5"/><circle cx="234" cy="446" r="5" fill="${T}" opacity="0.5"/>
      <rect x="188" y="320" width="64" height="90" fill="${PH}" ${tr}/>
      <ellipse cx="220" cy="236" rx="100" ry="112" fill="${PH}" ${tr}/>
      <path d="M118 236 Q104 112 214 104 Q336 100 326 236 Q318 176 290 158 Q250 150 230 168 Q200 136 150 160 Q126 184 118 236 Z" fill="${PELO}" ${tr}/>
      <path d="M150 158 Q200 120 262 132 M170 150 Q220 118 290 146" fill="none" stroke="${MET}" stroke-width="4" opacity="0.35" stroke-linecap="round"/>
      <path d="M118 236 Q114 200 126 180 L136 230 Z M326 236 Q330 200 318 180 L308 230 Z" fill="${CANAS}" ${tr} stroke-width="5"/>
      <path class="rd-cejas" d="M152 192 Q178 180 204 192 M236 188 Q262 172 290 186" fill="none" ${tr} stroke-width="9"/>
      ${ojos(226, o.mirada, true, PH)}
      <path d="M216 244 Q206 272 228 276" fill="none" ${tr} stroke-width="5"/>
      <g class="rd-boca"><path d="M186 302 Q220 330 256 300 Q246 336 220 338 Q194 336 186 302 Z" fill="${T}" ${tr} stroke-width="5"/><path d="M196 306 Q220 318 246 305 L242 316 Q220 324 199 316 Z" fill="#fffaf0"/></g>
      <path d="M176 292 Q198 280 220 290 Q242 280 264 292 Q244 290 220 298 Q196 290 176 292 Z" fill="${PELO}" ${tr} stroke-width="5"/>
      ${auris(AMB2, T, 240)}
      <g class="rd-brazo-d">${brazo(o.brazoD || "M372 452 Q432 582 352 642", BOR, 52)}<circle cx="${o.manoD ? o.manoD[0] : 350}" cy="${o.manoD ? o.manoD[1] : 646}" r="31" fill="${PH}" ${tr}/></g>
      <g class="rd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", BOR, 52)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="31" fill="${PH}" ${tr}/></g>
    </g>`;
  }
  // Carmen: la clienta despechada. Pelo batido con canas y ruleros ámbar, anteojos grandes bordó,
  // aros de perla, bata bordó con cuello crema. o.tubo: el tubo del teléfono en la oreja (mano derecha).
  function carmen(o) {
    o = o || {};
    const tubo = o.tubo !== false;
    return `<g class="rd-carmen">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${BOR}" ${tr}/>
      <path d="M140 404 Q220 470 300 404 L322 430 Q220 520 118 430 Z" fill="${CRE}" ${tr} stroke-width="6"/>
      <g fill="${BOR2}"><circle cx="110" cy="600" r="9"/><circle cx="170" cy="680" r="9"/><circle cx="270" cy="620" r="9"/><circle cx="330" cy="700" r="9"/><circle cx="220" cy="760" r="9"/><circle cx="90" cy="740" r="9"/></g>
      <rect x="190" y="320" width="60" height="92" fill="${PC}" ${tr}/>
      <path d="M100 250 Q70 120 220 100 Q370 120 340 250 Q350 300 312 300 L128 300 Q90 300 100 250 Z" fill="${CANAS}" ${tr}/>
      <ellipse cx="220" cy="240" rx="98" ry="108" fill="${PC}" ${tr}/>
      <path d="M122 220 Q120 140 220 132 Q320 140 318 220 Q290 170 220 174 Q150 170 122 220 Z" fill="${CANAS}" ${tr}/>
      <g class="rd-ruleros"><rect x="132" y="92" width="58" height="44" rx="16" fill="${AMB}" ${tr}/><rect x="192" y="76" width="58" height="44" rx="16" fill="${AMB}" ${tr}/><rect x="252" y="92" width="58" height="44" rx="16" fill="${AMB}" ${tr}/>
        <path d="M150 96 V132 M170 96 V132 M210 80 V116 M230 80 V116 M270 96 V132 M290 96 V132" stroke="${T}" stroke-width="4" opacity="0.5"/></g>
      <path class="rd-cejas" d="M150 186 Q176 172 202 186 M238 186 Q264 172 290 186" fill="none" ${tr} stroke-width="7"/>
      ${ojos(232, o.mirada, false, PC)}
      <g class="rd-lentes" fill="none" stroke="${BOR2}" stroke-width="9"><rect x="140" y="200" width="78" height="64" rx="24"/><rect x="222" y="200" width="78" height="64" rx="24"/><path d="M218 226 h4"/></g>
      <g class="rd-lentes-o" fill="none" stroke="${T}" stroke-width="3"><rect x="135" y="195" width="88" height="74" rx="28"/><rect x="217" y="195" width="88" height="74" rx="28"/></g>
      <path d="M216 252 Q208 278 226 280" fill="none" ${tr} stroke-width="5"/>
      <circle cx="158" cy="292" r="15" fill="${ROJ}" opacity="0.28"/><circle cx="282" cy="292" r="15" fill="${ROJ}" opacity="0.28"/>
      <g class="rd-boca"><path d="M190 306 Q220 296 250 306 Q244 330 220 332 Q196 330 190 306 Z" fill="${T}" ${tr} stroke-width="5"/><path d="M200 322 Q220 314 240 322 Q232 331 220 331 Q208 331 200 322 Z" fill="${ROJ}"/></g>
      <path d="M186 304 Q220 290 254 304" fill="none" stroke="${BOR2}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="122" cy="282" r="11" fill="#fffaf0" ${tr} stroke-width="4"/>
      ${tubo ? tuboOreja(334, 250, CRE) : `<circle cx="318" cy="282" r="11" fill="#fffaf0" ${tr} stroke-width="4"/>`}
      <g class="rd-brazo-d">${brazo(o.brazoD || (tubo ? "M372 452 Q440 400 392 330" : "M372 452 Q432 582 352 642"), BOR, 50)}<circle cx="${o.manoD ? o.manoD[0] : (tubo ? 388 : 350)}" cy="${o.manoD ? o.manoD[1] : (tubo ? 318 : 646)}" r="30" fill="${PC}" ${tr}/></g>
      <g class="rd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", BOR, 50)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="30" fill="${PC}" ${tr}/></g>
    </g>`;
  }
  // Matías: el que preguntó y no compró. Pelo castaño despeinado, buzo con capucha gris, celular en la oreja.
  function matias(o) {
    o = o || {};
    return `<g class="rd-matias">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${GRI}" ${tr}/>
      <path d="M118 420 Q220 520 322 420 Q300 380 220 384 Q140 380 118 420 Z" fill="#6e5a52" ${tr} stroke-width="6"/>
      <path d="M196 470 V560 M244 470 V560" stroke="${CRE}" stroke-width="6" stroke-linecap="round"/>
      <rect x="190" y="320" width="60" height="90" fill="${PM}" ${tr}/>
      <ellipse cx="220" cy="240" rx="98" ry="108" fill="${PM}" ${tr}/>
      <path d="M118 230 Q100 120 210 108 Q330 100 326 220 L308 190 L296 214 L276 176 L256 206 L238 170 L218 202 L196 168 L176 204 L156 176 L140 216 Z" fill="#5a3422" ${tr}/>
      <path class="rd-cejas" d="M152 188 Q178 198 204 194 M236 194 Q262 198 288 188" fill="none" ${tr} stroke-width="8"/>
      ${ojos(232, o.mirada, false, PM)}
      <path d="M214 250 Q206 276 226 280" fill="none" ${tr} stroke-width="5"/>
      <g class="rd-boca"><path d="M194 312 Q220 300 246 312 Q240 330 220 330 Q200 330 194 312 Z" fill="${T}" ${tr} stroke-width="5"/></g>
      <g class="rd-cel-oreja"><rect x="314" y="190" width="56" height="112" rx="14" fill="${T}" stroke="${CRE}" stroke-width="5"/></g>
      <g class="rd-brazo-d">${brazo(o.brazoD || "M372 452 Q446 400 380 300", GRI, 50)}<circle cx="${o.manoD ? o.manoD[0] : 374}" cy="${o.manoD ? o.manoD[1] : 290}" r="30" fill="${PM}" ${tr}/></g>
      <g class="rd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", GRI, 50)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="30" fill="${PM}" ${tr}/></g>
    </g>`;
  }
  // Raúl: el panadero. Gorro alto crema, bigote castaño, harina en la cara y los brazos, remera
  // bordó y delantal crema. o.tubo: tubo del teléfono en la oreja.
  function raul(o) {
    o = o || {};
    const tubo = !!o.tubo;
    return `<g class="rd-raul">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${BOR}" ${tr}/>
      <path d="M110 470 H330 L344 800 H96 Z" fill="${CRE}" ${tr}/>
      <path d="M110 470 L152 408 M330 470 L288 408" ${tr} stroke-width="8"/>
      <g fill="#ffffff" opacity="0.8"><ellipse cx="170" cy="560" rx="34" ry="16"/><ellipse cx="270" cy="660" rx="40" ry="18"/><ellipse cx="160" cy="720" rx="26" ry="12"/></g>
      <rect x="186" y="320" width="68" height="94" fill="${PR}" ${tr}/>
      <ellipse cx="220" cy="240" rx="104" ry="110" fill="${PR}" ${tr}/>
      <g fill="#ffffff" opacity="0.85"><ellipse cx="150" cy="276" rx="26" ry="14"/><ellipse cx="292" cy="170" rx="18" ry="10"/><ellipse cx="236" cy="168" rx="12" ry="8"/></g>
      <path d="M126 170 Q112 70 160 50 Q186 10 220 30 Q254 10 280 50 Q328 70 314 170 Z" fill="${CRE}" ${tr}/>
      <path d="M170 60 Q178 120 168 170 M220 34 V170 M270 60 Q262 120 272 170" fill="none" stroke="${T}" stroke-width="4" opacity="0.4"/>
      <rect x="116" y="150" width="208" height="44" rx="14" fill="${CRE}" ${tr}/>
      <path class="rd-cejas" d="M150 214 Q176 200 202 212 M238 212 Q264 200 290 214" fill="none" ${tr} stroke-width="10"/>
      ${ojos(246, o.mirada, false, PR)}
      <path d="M212 262 Q200 292 226 296" fill="none" ${tr} stroke-width="5"/>
      <g class="rd-boca"><ellipse cx="220" cy="336" rx="34" ry="22" fill="${T}" ${tr} stroke-width="5"/><ellipse cx="220" cy="346" rx="18" ry="8" fill="${ROJ}"/></g>
      <path d="M156 310 Q188 290 220 304 Q252 290 284 310 Q284 328 258 320 Q238 314 220 318 Q202 314 182 320 Q156 328 156 310 Z" fill="#6b3d22" ${tr} stroke-width="6"/>
      ${tubo ? tuboOreja(338, 260, CRE) : ""}
      <g class="rd-brazo-d">${brazo(o.brazoD || (tubo ? "M372 452 Q444 410 396 340" : "M372 452 Q432 582 352 642"), PR, 46)}<circle cx="${o.manoD ? o.manoD[0] : (tubo ? 392 : 350)}" cy="${o.manoD ? o.manoD[1] : (tubo ? 328 : 646)}" r="30" fill="${PR}" ${tr}/></g>
      <g class="rd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", PR, 46)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="30" fill="${PR}" ${tr}/><ellipse cx="${o.manoI ? o.manoI[0] : 90}" cy="${(o.manoI ? o.manoI[1] : 646) - 8}" rx="18" ry="9" fill="#ffffff" opacity="0.8"/></g>
    </g>`;
  }

  // ---------- objetos ----------
  // micrófono de pie retro (cápsula ovalada con costillas), centrado en (0, 0), el pie baja hasta y 520
  function mic(alto) {
    alto = alto || 520;
    return `<g class="rd-mic">
      <path d="M0 110 V${alto}" stroke="${T}" stroke-width="24" stroke-linecap="round"/><path d="M0 110 V${alto}" stroke="${MET}" stroke-width="10" stroke-linecap="round"/>
      <path d="M-90 ${alto + 6} Q0 ${alto - 30} 90 ${alto + 6} Z" fill="${MAD}" ${tr}/>
      <path d="M-40 70 Q0 140 40 70" fill="none" stroke="${T}" stroke-width="18"/><path d="M-40 70 Q0 140 40 70" fill="none" stroke="${MET}" stroke-width="7"/>
      <path d="M-60 -10 Q-64 -120 0 -126 Q64 -120 60 -10 Q56 86 0 92 Q-56 86 -60 -10 Z" fill="${MET}" ${tr}/>
      <path d="M-58 -70 H58 M-62 -40 H62 M-62 -10 H62 M-60 20 H60 M-54 50 H54" stroke="${T}" stroke-width="5" opacity="0.5"/>
      <path d="M0 -122 V88" stroke="${T}" stroke-width="5" opacity="0.5"/>
      <path d="M-40 -96 Q-46 -40 -40 30" fill="none" stroke="#fff6e0" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
    </g>`;
  }
  // teléfono de línea con disco, centrado en (0, 0), ancho ~300. o.sinTubo: el tubo no está en la horquilla
  function telefono(o) {
    o = o || {};
    const agujeros = Array.from({ length: 10 }, (_, i) => { const a = (-60 + i * 30) * Math.PI / 180; return `<circle cx="${(Math.cos(a) * 52).toFixed(1)}" cy="${(30 + Math.sin(a) * 52).toFixed(1)}" r="11" fill="${T}" opacity="0.75"/>`; }).join("");
    return `<g class="rd-tel">
      <path d="M-150 120 L-120 -20 Q-110 -50 -70 -50 H70 Q110 -50 120 -20 L150 120 Z" fill="${o.color || BOR}" ${tr}/>
      <circle cx="0" cy="30" r="76" fill="${CRE}" ${tr}/>${agujeros}<circle cx="0" cy="30" r="24" fill="${AMB}" ${tr} stroke-width="5"/>
      <path d="M60 -10 L150 -10" stroke="${T}" stroke-width="4" opacity="0"/>
      ${o.sinTubo ? `<path d="M-120 -54 h40 M80 -54 h40" stroke="${T}" stroke-width="12" stroke-linecap="round"/>` : `<g class="rd-tel-tubo"><path d="M-170 -60 Q-170 -110 -120 -110 H120 Q170 -110 170 -60 Q170 -40 140 -40 Q120 -40 110 -66 H-110 Q-120 -40 -140 -40 Q-170 -40 -170 -60 Z" fill="${o.color || BOR}" ${tr}/></g>`}
      <path class="rd-tel-cable" d="M150 90 q30 10 30 40 q0 30 -30 30 q-30 0 -20 30 q10 30 50 20" fill="none" stroke="${T}" stroke-width="8" stroke-linecap="round"/>
    </g>`;
  }
  // corazón (centro 0,0, ancho ~ 2r)
  function corazon(r, color, extra) {
    r = r || 60;
    return `<path d="M0 ${r * 0.9} C${-r * 1.6} ${-r * 0.1} ${-r * 0.8} ${-r * 1.2} 0 ${-r * 0.45} C${r * 0.8} ${-r * 1.2} ${r * 1.6} ${-r * 0.1} 0 ${r * 0.9} Z" fill="${color || ROJ}" ${tr} ${extra || ""}/>`;
  }
  // la ventana de la noche con luna y edificios (para fondos), en x,y con w,h
  function ventana(x, y, w, h) {
    return `<g class="rd-ventana"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#22100f" ${tr}/>
      <circle cx="${x + w * 0.72}" cy="${y + h * 0.28}" r="${Math.min(w, h) * 0.13}" fill="${CRE}"/><circle cx="${x + w * 0.76}" cy="${y + h * 0.25}" r="${Math.min(w, h) * 0.11}" fill="#22100f"/>
      <path d="M${x} ${y + h} V${y + h * 0.62} H${x + w * 0.18} V${y + h * 0.48} H${x + w * 0.34} V${y + h * 0.7} H${x + w * 0.5} V${y + h * 0.55} H${x + w * 0.66} V${y + h * 0.66} H${x + w * 0.82} V${y + h * 0.5} H${x + w} V${y + h} Z" fill="${MAD}"/>
      <g fill="${AMB}" opacity="0.8"><rect x="${x + w * 0.22}" y="${y + h * 0.55}" width="10" height="14"/><rect x="${x + w * 0.54}" y="${y + h * 0.62}" width="10" height="14"/><rect x="${x + w * 0.86}" y="${y + h * 0.58}" width="10" height="14"/></g>
      <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="${T}" stroke-width="7"/></g>`;
  }
  // la consola de la radio (franja de abajo, tapa la cintura): madera con perillas y vúmetro
  function consola(y) {
    y = y ?? 1200;
    const per = [140, 230, 320, 760, 850, 940].map((x) => `<circle cx="${x}" cy="${y + 64}" r="22" fill="${MET}" ${tr} stroke-width="5"/><path d="M${x} ${y + 64} L${x + 10} ${y + 48}" stroke="${T}" stroke-width="5" stroke-linecap="round"/>`).join("");
    return `<g class="rd-consola"><rect x="-20" y="${y}" width="1120" height="${1340 - y}" fill="${MAD}" stroke="${T}" stroke-width="7"/>
      <path d="M-20 ${y + 6} H1100" stroke="${AMB2}" stroke-width="5"/>${per}
      <rect x="420" y="${y + 24}" width="240" height="84" rx="10" fill="#f2d9a0" ${tr} stroke-width="5"/>
      <path d="M440 ${y + 96} Q540 ${y + 40} 640 ${y + 96}" fill="none" stroke="${T}" stroke-width="3" opacity="0.5"/>
      <path class="rd-vu" d="M540 ${y + 104} L510 ${y + 46}" stroke="${ROJ}" stroke-width="5" stroke-linecap="round"/></g>`;
  }
  // la carta / hoja manuscrita (rect crema con renglones), en x,y con w,h, rot
  function hoja(x, y, w, h, rot) {
    const ren = Array.from({ length: Math.floor((h - 80) / 56) }, (_, i) => `<path d="M${x + 30} ${y + 90 + i * 56} H${x + w - 30}" stroke="#b9a07a" stroke-width="3"/>`).join("");
    return `<g class="rd-hoja" transform="rotate(${rot || 0} ${x + w / 2} ${y + h / 2})"><rect x="${x + 10}" y="${y + 12}" width="${w}" height="${h}" fill="${T}" opacity="0.4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${CRE}" ${tr}/>${ren}<path d="M${x + 60} ${y} V${y + h}" stroke="${ROJ}" stroke-width="3" opacity="0.5"/></g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: d || 0.32, ease: "back.out(2.2)", immediateRender: false }, t);
    }
    function golpe(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 2.4, rotation: rot || 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: rot || 0, transformOrigin: "50% 50%", duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08);
    }
    function entra(el, t, desde, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, Object.assign({ opacity: 0 }, desde || { y: 60 }), { opacity: 1, x: 0, y: 0, duration: d || 0.4, ease: "back.out(1.4)", immediateRender: false }, t);
    }
    function sale(el, t, hacia, d) {
      tl.to(el, Object.assign({ opacity: 0, duration: d || 0.25, ease: "power2.in" }, hacia || {}), t);
    }
    function sacudon(el, t, f) {
      f = f || 1;
      [[-16, 9], [12, -7], [-6, 4], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    // el teléfono suena: tiembla rápido de costado (rotación) durante d
    function suena(el, t, d, origen) {
      const n = Math.max(2, Math.floor(d / 0.06));
      for (let i = 0; i < n; i++) tl.to(el, { rotation: i % 2 ? -5 : 5, svgOrigin: origen, duration: 0.03, ease: "none" }, t + i * 0.06);
      tl.to(el, { rotation: 0, svgOrigin: origen, duration: 0.05 }, t + n * 0.06);
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    function habla(boca, a, b) {
      const n = Math.max(1, Math.floor((b - a) / 0.13));
      tl.fromTo(boca, { scaleY: 1, transformOrigin: "50% 15%" }, { scaleY: 0.35, transformOrigin: "50% 15%", duration: 0.065, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, a);
    }
    function parpadeo(ojos, ts) {
      for (const t of ts) {
        tl.to(ojos, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.06, ease: "none" }, t);
        tl.to(ojos, { scaleY: 1, transformOrigin: "50% 50%", duration: 0.08, ease: "none" }, t + 0.07);
      }
    }
    function respira(el, t, d, amp) {
      const n = Math.max(1, Math.floor(d / 1.2));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 6), duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t);
    }
    // balanceo meloso (rotación suave) de un personaje alrededor de su base
    function mece(el, t, d, grados, origen) {
      const n = Math.max(1, Math.floor(d / 1.6));
      tl.fromTo(el, { rotation: -(grados || 3) }, { rotation: grados || 3, svgOrigin: origen, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t);
    }
    function late(el, t, d, f, per) {
      per = per || 0.3;
      const n = Math.max(1, Math.floor(d / per));
      tl.to(el, { scale: f || 1.08, transformOrigin: "50% 50%", duration: per / 2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t);
    }
    function titila(el, t, d, per) {
      per = per || 0.36;
      const n = Math.floor(d / per);
      for (let i = 0; i < n; i++) { tl.set(el, { opacity: 0.3 }, t + i * per + per * 0.55); tl.set(el, { opacity: 1 }, t + (i + 1) * per); }
    }
    function prende(el, t) {
      gsap.set(el, { opacity: 0 });
      tl.set(el, { opacity: 1 }, t); tl.set(el, { opacity: 0.15 }, t + 0.07); tl.set(el, { opacity: 1 }, t + 0.14); tl.set(el, { opacity: 0.3 }, t + 0.22); tl.set(el, { opacity: 1 }, t + 0.3);
    }
    function etiqueta(el, textos) {
      textos.forEach(([t, html], i) => {
        if (i === 0) { el.innerHTML = html; gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, t); return; }
        tl.to(el, { opacity: 0, y: -12, duration: 0.15, ease: "power2.in" }, t - 0.15);
        tl.set(el, { innerHTML: html }, t);
        tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: false }, t);
      });
    }
    function contar(el, t, d, a, b, fmt) {
      const o = { v: a };
      fmt = fmt || ((v) => String(Math.round(v)));
      el.textContent = fmt(a);
      tl.fromTo(o, { v: a }, { v: b, duration: d, ease: "none", immediateRender: false, onUpdate: () => { el.textContent = fmt(o.v); } }, t);
    }
    // texto que se escribe a mano (se revela de izquierda a derecha con clip-path)
    function escribe(el, t, d) {
      gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.6, ease: "none" }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.22, ease: "power2.in" }, DUR - 0.22);
    }
    return { q, qa, pop, golpe, entra, sale, sacudon, suena, dibujar, habla, parpadeo, respira, mece, late, titila, prende, etiqueta, contar, escribe, salida };
  }
  return { kit, hugo, carmen, matias, raul, mic, telefono, corazon, ventana, consola, hoja, C: { T, AMB, BOR, ROJ, CRE, MAD, BOR2, AMB2, GRI, MET, PH, PC, PM, PR, CANAS, PELO } };
})();
