// Piezas del reel "llame-ya" (teletienda de los 90): personajes, estrellas de explosión, zócalos,
// banda de precio, títulos gruesos con contorno, el "ANTES" en blanco y negro con grano, y helpers.
// Uso en una escena: <script src="assets/tele.js"></script> después de GSAP; en el script,
// TV.llenar(root) (reemplaza <svg data-tv="estrella" ...>) y const K = TV.kit(tl, root).
// Personajes: TV.rolo(), TV.asis(), TV.duenio(), TV.elsa(), TV.clienta() devuelven un <g> de
// 440 x 800 (de la cintura para arriba; la base en y 800) para meter adentro de un <g transform>.
window.TV = window.TV || (function () {
  const T = "#0d0630", MAG = "#ff2e88", AMA = "#ffd400", CIA = "#19d3ff", AZU = "#1a1060", BLA = "#ffffff", PIEL = "#ffd9b8";
  if (!document.getElementById("tv-css")) {
    const st = document.createElement("style");
    st.id = "tv-css";
    const borde = (c, n) => [[n, 0], [-n, 0], [0, n], [0, -n], [n, n], [-n, -n], [n, -n], [-n, n]].map(([x, y]) => `${x}px ${y}px 0 ${c}`).join(", ");
    st.textContent = `
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.tv-grueso { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; color: ${AMA}; line-height: 0.95; letter-spacing: -0.01em; white-space: nowrap; text-align: center;
  text-shadow: ${borde(T, 6)}, 0 14px 0 ${T}, 4px 14px 0 ${T}, -4px 14px 0 ${T}; }
.tv-grueso.tv-blanco { color: ${BLA}; }
.tv-grueso.tv-mag { color: ${MAG}; }
.tv-grueso.tv-cia { color: ${CIA}; }
.tv-zocalo { position: absolute; box-sizing: border-box; display: flex; flex-direction: column; align-items: flex-start; }
.tv-zocalo .tv-z1 { background: ${MAG}; color: ${BLA}; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; line-height: 1; padding: 16px 30px 14px; border: 6px solid ${T}; box-shadow: 10px 10px 0 ${T}; white-space: nowrap; text-transform: uppercase; }
.tv-zocalo .tv-z2 { background: ${AMA}; color: ${T}; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; line-height: 1; padding: 12px 24px 10px; border: 6px solid ${T}; border-top: 0; margin-left: 34px; box-shadow: 10px 10px 0 ${T}; white-space: nowrap; text-transform: uppercase; }
.tv-banda { position: absolute; box-sizing: border-box; background: ${AMA}; color: ${T}; border: 6px solid ${T}; box-shadow: 0 10px 0 ${T}; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; white-space: nowrap; text-align: center; line-height: 1; }
.tv-cartel { position: absolute; box-sizing: border-box; background: ${T}; color: ${BLA}; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; white-space: nowrap; text-align: center; line-height: 1; padding: 14px 26px; border: 4px solid ${BLA}; }
.tv-antes { position: absolute; inset: 0; filter: grayscale(1) contrast(1.12) brightness(0.98); }
.tv-antes-fondo { position: absolute; inset: 0; background: radial-gradient(ellipse 700px 900px at 540px 940px, #8a8a8a 0%, #5a5a5a 55%, #262626 100%); }
.tv-grano { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; opacity: 0.28; mix-blend-mode: overlay; }
.tv-rayas { position: absolute; inset: 0; }
`;
    document.head.appendChild(st);
  }

  // ---------- estrellas de explosión ----------
  function estrella(w, h, puntas, relleno, rot) {
    const cx = w / 2, cy = h / 2;
    let d = "";
    for (let i = 0; i < puntas * 2; i++) {
      const a = (Math.PI * i) / puntas + (rot || 0);
      const r = i % 2 === 0 ? 1 : 0.78 + 0.06 * ((i * 7) % 3);
      d += (i ? "L" : "M") + (cx + Math.cos(a) * r * (w / 2 - 8)).toFixed(1) + " " + (cy + Math.sin(a) * r * (h / 2 - 8)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${relleno}" stroke="${T}" stroke-width="7" stroke-linejoin="round"/>`;
  }
  // grano de película (fijo; se anima moviéndolo de a saltos)
  function grano() {
    return `<svg class="tv-grano" viewBox="0 0 1480 2320" aria-hidden="true"><filter id="tv-f-grano" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1480" height="2320" filter="url(#tv-f-grano)"/></svg>`;
  }
  function llenar(root) {
    root.querySelectorAll("svg[data-tv='estrella']").forEach((el) => {
      const w = Number(el.getAttribute("width")), h = Number(el.getAttribute("height"));
      el.setAttribute("viewBox", `0 0 ${w} ${h}`);
      el.innerHTML = estrella(w, h, Number(el.dataset.puntas || 16), el.dataset.color || AMA) + el.innerHTML;
    });
    root.querySelectorAll("[data-tv='grano']").forEach((el) => { el.innerHTML = grano(); });
  }

  // ---------- personajes (440 x 800, la cintura en y 800) ----------
  const tr = `stroke="${T}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
  const brazo = (d, color, ancho) => `<path d="${d}" fill="none" stroke="${T}" stroke-width="${ancho + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function ojos(y, cerrados) {
    return cerrados
      ? `<path class="tv-ojos" d="M162 ${y} q18 -10 36 0 M242 ${y} q18 -10 36 0" fill="none" ${tr}/>`
      : `<g class="tv-ojos"><ellipse cx="180" cy="${y}" rx="15" ry="19" fill="${BLA}" ${tr} stroke-width="5"/><ellipse cx="260" cy="${y}" rx="15" ry="19" fill="${BLA}" ${tr} stroke-width="5"/><circle cx="183" cy="${y + 3}" r="8" fill="${T}"/><circle cx="263" cy="${y + 3}" r="8" fill="${T}"/></g>`;
  }
  // Rolo: presentador, jopo, saco magenta con hombreras, corbata amarilla, micrófono en la derecha
  function rolo() {
    return `<g class="tv-rolo">
      <path d="M40 520 Q60 380 150 368 L290 368 Q380 380 400 520 L410 800 H30 Z" fill="${MAG}" ${tr}/>
      <path d="M170 368 L220 470 L270 368 Z" fill="${BLA}" ${tr}/>
      <path d="M208 400 L232 400 L244 560 L220 590 L196 560 Z" fill="${AMA}" ${tr}/>
      <path d="M150 368 L200 520 L150 800 M290 368 L240 520 L290 800" fill="none" ${tr} stroke-width="6"/>
      <rect x="182" y="300" width="76" height="80" fill="${PIEL}" ${tr}/>
      <circle cx="220" cy="230" r="112" fill="${PIEL}" ${tr}/>
      <ellipse cx="108" cy="240" rx="18" ry="30" fill="${PIEL}" ${tr}/>
      <ellipse cx="332" cy="240" rx="18" ry="30" fill="${PIEL}" ${tr}/>
      <path d="M104 214 Q90 120 150 86 Q160 30 240 34 Q330 26 352 100 Q372 150 336 210 Q330 150 280 140 Q220 150 160 132 Q120 160 104 214 Z" fill="${AZU}" ${tr}/>
      <path d="M180 70 Q240 40 300 74" fill="none" stroke="${CIA}" stroke-width="10" stroke-linecap="round"/>
      <path d="M150 188 Q180 172 206 186 M236 186 Q262 172 292 188" fill="none" ${tr} stroke-width="9"/>
      ${ojos(222)}
      <path d="M212 236 Q206 268 222 272" fill="none" ${tr} stroke-width="5"/>
      <g class="tv-boca"><path d="M148 284 Q220 300 292 284 Q284 352 220 356 Q156 352 148 284 Z" fill="${BLA}" ${tr}/><path d="M168 292 V330 M196 296 V346 M224 297 V350 M252 296 V346 M278 292 V330" stroke="${T}" stroke-width="3" opacity="0.5"/></g>
      <path class="tv-brillo" d="M262 300 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 Z" fill="${AMA}" stroke="${T}" stroke-width="3"/>
      <g class="tv-brazo-d">${brazo("M372 420 Q430 560 340 600", MAG, 54)}
        <rect x="300" y="470" width="40" height="120" rx="12" fill="${T}" transform="rotate(-20 320 530)"/>
        <circle cx="300" cy="460" r="38" fill="${BLA}" ${tr}/><path d="M276 450 H324 M272 466 H328" stroke="${T}" stroke-width="3" opacity="0.5"/>
        <circle cx="336" cy="590" r="32" fill="${PIEL}" ${tr}/></g>
      <g class="tv-brazo-i">${brazo("M68 420 Q10 520 40 600", MAG, 54)}<circle cx="44" cy="604" r="32" fill="${PIEL}" ${tr}/></g>
    </g>`;
  }
  // la asistente: pelo amarillo enorme de los 90, vestido cian con hombreras, aros, brazo que presenta
  function asis() {
    return `<g class="tv-asis">
      <path d="M90 300 Q40 180 100 110 Q130 30 220 30 Q320 26 350 110 Q410 190 350 320 Q380 380 330 420 L110 420 Q60 380 90 300 Z" fill="${AMA}" ${tr}/>
      <path d="M60 520 Q70 400 150 388 L290 388 Q370 400 380 520 L390 800 H50 Z" fill="${CIA}" ${tr}/>
      <path d="M170 388 Q220 450 270 388" fill="${PIEL}" ${tr}/>
      <rect x="186" y="320" width="68" height="80" fill="${PIEL}" ${tr}/>
      <ellipse cx="220" cy="236" rx="100" ry="112" fill="${PIEL}" ${tr}/>
      <circle cx="120" cy="280" r="16" fill="${MAG}" ${tr} stroke-width="5"/><circle cx="320" cy="280" r="16" fill="${MAG}" ${tr} stroke-width="5"/>
      <path d="M118 210 Q130 110 220 108 Q300 108 326 200 Q290 150 240 160 Q200 120 150 170 Q130 180 118 210 Z" fill="${AMA}" ${tr}/>
      <path d="M156 196 Q178 184 200 194 M240 194 Q262 184 284 196" fill="none" ${tr} stroke-width="7"/>
      ${ojos(228)}
      <path d="M156 206 l-10 -10 M168 202 l-6 -12 M272 202 l6 -12 M284 206 l10 -10" ${tr} stroke-width="4"/>
      <g class="tv-boca"><path d="M176 286 Q220 300 264 286 Q256 330 220 334 Q184 330 176 286 Z" fill="${MAG}" ${tr}/><path d="M186 292 Q220 304 254 292 L250 304 Q220 312 190 304 Z" fill="${BLA}"/></g>
      <circle cx="160" cy="276" r="14" fill="${MAG}" opacity="0.35"/><circle cx="280" cy="276" r="14" fill="${MAG}" opacity="0.35"/>
      <g class="tv-brazo-d">${brazo("M366 430 Q440 360 430 250", CIA, 48)}<circle cx="430" cy="236" r="34" fill="${PIEL}" ${tr}/><path d="M420 206 l-4 -26 M434 204 l2 -28 M448 210 l8 -22" ${tr} stroke-width="8"/></g>
      <g class="tv-brazo-i">${brazo("M74 430 Q30 540 80 610", CIA, 48)}<circle cx="86" cy="614" r="30" fill="${PIEL}" ${tr}/></g>
    </g>`;
  }
  // el dueño del ANTES: pelado con pelo a los costados, bigote, ojeras, delantal; mano con celular
  function duenio() {
    return `<g class="tv-duenio">
      <path d="M50 540 Q60 410 150 396 L290 396 Q380 410 390 540 L396 800 H44 Z" fill="${CIA}" ${tr}/>
      <path d="M120 470 H320 L330 800 H110 Z" fill="${BLA}" ${tr}/>
      <path d="M120 470 L150 400 M320 470 L290 400" ${tr} stroke-width="8"/>
      <rect x="186" y="320" width="68" height="90" fill="${PIEL}" ${tr}/>
      <circle cx="220" cy="240" r="108" fill="${PIEL}" ${tr}/>
      <path d="M114 260 Q104 190 132 170 Q140 210 150 230 Z M326 260 Q336 190 308 170 Q300 210 290 230 Z" fill="${AZU}" ${tr}/>
      <path d="M180 140 q8 -20 20 -4 M220 132 q8 -22 22 -2" fill="none" ${tr} stroke-width="5"/>
      <path d="M156 206 Q180 214 204 210 M236 210 Q260 214 284 206" fill="none" ${tr} stroke-width="8"/>
      <g class="tv-ojos"><ellipse cx="180" cy="236" rx="15" ry="16" fill="${BLA}" ${tr} stroke-width="5"/><ellipse cx="260" cy="236" rx="15" ry="16" fill="${BLA}" ${tr} stroke-width="5"/><circle cx="180" cy="240" r="7" fill="${T}"/><circle cx="260" cy="240" r="7" fill="${T}"/>
        <path d="M163 230 H197 M243 230 H277" ${tr} stroke-width="6"/></g>
      <path d="M164 258 q16 8 32 0 M244 258 q16 8 32 0" fill="none" stroke="${T}" stroke-width="4" opacity="0.5"/>
      <path d="M170 292 Q220 270 270 292 Q250 306 220 300 Q190 306 170 292 Z" fill="${AZU}" ${tr} stroke-width="5"/>
      <g class="tv-boca"><ellipse cx="220" cy="318" rx="20" ry="12" fill="${T}"/></g>
      <g class="tv-brazo-d">${brazo("M360 440 Q420 520 360 560", CIA, 50)}<circle cx="352" cy="566" r="32" fill="${PIEL}" ${tr}/>
        <g class="tv-cel"><rect x="318" y="470" width="64" height="112" rx="12" fill="${AZU}" ${tr} stroke-width="6"/><rect x="328" y="484" width="44" height="78" rx="4" fill="${CIA}"/></g></g>
    </g>`;
  }
  // Doña Elsa: rulos blancos, anteojos redondos, delantal magenta con flores amarillas
  function elsa() {
    let rulos = "";
    [[120, 170], [150, 120], [200, 96], [250, 96], [300, 120], [330, 170], [110, 220], [340, 220], [176, 110], [276, 110]].forEach(([x, y]) => { rulos += `<circle cx="${x}" cy="${y}" r="40" fill="${BLA}" ${tr}/>`; });
    return `<g class="tv-elsa">
      <path d="M50 540 Q60 410 150 396 L290 396 Q380 410 390 540 L396 800 H44 Z" fill="${CIA}" ${tr}/>
      <path d="M110 460 H330 L340 800 H100 Z" fill="${MAG}" ${tr}/>
      <circle cx="170" cy="560" r="18" fill="${AMA}" ${tr} stroke-width="5"/><circle cx="270" cy="620" r="18" fill="${AMA}" ${tr} stroke-width="5"/><circle cx="190" cy="700" r="18" fill="${AMA}" ${tr} stroke-width="5"/><circle cx="290" cy="740" r="14" fill="${AMA}" ${tr} stroke-width="5"/>
      <rect x="186" y="320" width="68" height="90" fill="${PIEL}" ${tr}/>
      ${rulos}
      <ellipse cx="220" cy="246" rx="100" ry="106" fill="${PIEL}" ${tr}/>
      <path d="M130 196 Q150 150 200 160 Q220 140 250 160 Q300 150 312 200 Q270 176 220 186 Q170 176 130 196 Z" fill="${BLA}" ${tr} stroke-width="5"/>
      ${ojos(240, true)}
      <circle cx="180" cy="238" r="30" fill="none" ${tr} stroke-width="6"/><circle cx="260" cy="238" r="30" fill="none" ${tr} stroke-width="6"/><path d="M210 236 H230" ${tr} stroke-width="6"/>
      <circle cx="160" cy="290" r="16" fill="${MAG}" opacity="0.4"/><circle cx="280" cy="290" r="16" fill="${MAG}" opacity="0.4"/>
      <g class="tv-boca"><path d="M184 300 Q220 312 256 300 Q248 336 220 338 Q192 336 184 300 Z" fill="${MAG}" ${tr} stroke-width="6"/></g>
      <path d="M150 324 q10 8 20 4 M270 328 q10 4 20 -4" fill="none" stroke="${T}" stroke-width="4" opacity="0.5"/>
      <g class="tv-brazo-d">${brazo("M366 440 Q430 540 330 580", CIA, 48)}<circle cx="324" cy="584" r="30" fill="${PIEL}" ${tr}/></g>
      <g class="tv-brazo-i">${brazo("M74 440 Q10 540 110 580", CIA, 48)}<circle cx="116" cy="584" r="30" fill="${PIEL}" ${tr}/></g>
    </g>`;
  }
  // la clienta: cola de caballo, remera magenta, gorrito de cumpleaños opcional
  function clienta(gorro) {
    return `<g class="tv-clienta">
      <path d="M300 160 Q400 180 380 330 Q360 280 320 250 Z" fill="${AZU}" ${tr}/>
      <path d="M60 540 Q70 410 150 398 L290 398 Q370 410 380 540 L388 800 H52 Z" fill="${MAG}" ${tr}/>
      <rect x="188" y="320" width="64" height="90" fill="${PIEL}" ${tr}/>
      <ellipse cx="220" cy="240" rx="98" ry="108" fill="${PIEL}" ${tr}/>
      <path d="M120 236 Q116 130 220 126 Q320 128 320 230 Q290 170 220 172 Q160 176 120 236 Z" fill="${AZU}" ${tr}/>
      ${ojos(244)}
      <g class="tv-boca"><path d="M190 300 Q220 312 250 300 Q244 326 220 328 Q196 326 190 300 Z" fill="${T}" ${tr} stroke-width="5"/></g>
      <circle cx="162" cy="288" r="14" fill="${MAG}" opacity="0.4"/><circle cx="278" cy="288" r="14" fill="${MAG}" opacity="0.4"/>
      ${gorro ? `<path d="M170 150 L226 30 L276 152 Z" fill="${AMA}" ${tr}/><path d="M190 110 L250 120 M206 76 L240 82" stroke="${MAG}" stroke-width="10"/><circle cx="226" cy="28" r="16" fill="${CIA}" ${tr} stroke-width="5"/>` : ""}
      <g class="tv-brazo-d">${brazo("M360 440 Q420 520 380 600", MAG, 48)}<circle cx="378" cy="606" r="30" fill="${PIEL}" ${tr}/></g>
      <g class="tv-brazo-i">${brazo("M80 440 Q20 520 70 600", MAG, 48)}<circle cx="72" cy="606" r="30" fill="${PIEL}" ${tr}/></g>
    </g>`;
  }

  // el mostrador del set (y 1290 a 1480), tapa la cintura de los presentadores
  function mesa(x, w) {
    x = x ?? 60; w = w ?? 960;
    return `<g class="tv-mesa"><path d="M${x} 1300 H${x + w} L${x + w - 30} 1478 H${x + 30} Z" fill="${MAG}" stroke="${T}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="${x - 14}" y="1280" width="${w + 28}" height="34" rx="8" fill="${AMA}" stroke="${T}" stroke-width="7"/>
      <path d="M${x + 60} 1350 H${x + w - 60} M${x + 80} 1420 H${x + w - 80}" stroke="${CIA}" stroke-width="10" stroke-linecap="round"/></g>`;
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
    function sacudon(el, t, f) {
      f = f || 1;
      [[-16, 9], [12, -7], [-6, 4], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * f, y: y * f, duration: 0.04, ease: "none" }, t + i * 0.045));
    }
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    // la boca habla (escala en y) entre a y b
    function habla(boca, a, b) {
      const n = Math.max(1, Math.floor((b - a) / 0.13));
      tl.fromTo(boca, { scaleY: 1, transformOrigin: "50% 15%" }, { scaleY: 0.4, transformOrigin: "50% 15%", duration: 0.065, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, a);
    }
    // origen de giro en coordenadas locales del personaje (x, y): el hombro, el codo...
    function origen(el, x, y) {
      const b = el.getBBox();
      gsap.set(el, { transformOrigin: `${x - b.x}px ${y - b.y}px` });
    }
    // la estrella gira y late
    function late(el, t, d, f) {
      const n = Math.max(1, Math.floor(d / 0.3));
      tl.to(el, { scale: f || 1.08, transformOrigin: "50% 50%", duration: 0.15, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t);
    }
    function gira(el, t, d, grados) {
      tl.to(el, { rotation: "+=" + (grados || 30), transformOrigin: "50% 50%", duration: d, ease: "none" }, t);
    }
    // parpadeo duro (encendido/apagado), como los carteles de "LLAME YA"
    function parpadea(el, t, d, per) {
      per = per || 0.36;
      const n = Math.floor(d / per);
      for (let i = 0; i < n; i++) { tl.set(el, { opacity: 0.25 }, t + i * per + per * 0.6); tl.set(el, { opacity: 1 }, t + (i + 1) * per); }
    }
    // el grano de película salta de lugar cada 0.08 s
    function granular(el, d) {
      const n = Math.floor(d / 0.08);
      for (let i = 0; i < n; i++) tl.set(el, { x: ((i * 137) % 200) - 100, y: ((i * 211) % 200) - 100 }, i * 0.08);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.22, ease: "power2.in" }, DUR - 0.22);
    }
    return { q, qa, pop, golpe, sacudon, dibujar, habla, origen, late, gira, parpadea, granular, salida };
  }
  return { llenar, kit, estrella, mesa, rolo, asis, duenio, elsa, clienta, C: { T, MAG, AMA, CIA, AZU, BLA, PIEL } };
})();
