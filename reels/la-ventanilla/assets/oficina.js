// Piezas del reel "la-ventanilla": el funcionario, Gabriela, la ventanilla con vidrio y agujerito,
// el numerador rojo de segmentos, sellos de goma y formularios, y los helpers de animación.
// Uso en una escena (después de GSAP): <svg>...${OF.funcionario(x, y, s)}...</svg> armado desde el
// script con innerHTML, o los divs .of-sello / .of-form / .of-cartel; en el script,
// const K = OF.kit(tl, root).
window.OF = window.OF || (function () {
  const INK = "#2a2b30";
  if (!document.getElementById("of-css")) {
    const st = document.createElement("style");
    st.id = "of-css";
    st.textContent = `
@font-face { font-family: "Special Elite"; font-display: block; src: url("assets/fonts/SpecialElite.woff2") format("woff2"); }
@font-face { font-family: "Black Ops One"; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
.of-sello { position: absolute; box-sizing: border-box; padding: 8px 28px 4px; border: 9px double #d63a2f; border-radius: 12px; color: #d63a2f;
  font-family: "Black Ops One", sans-serif; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1.05; mix-blend-mode: multiply; opacity: 0.92; }
.of-sello.violeta { border-color: #5b3d8f; color: #5b3d8f; }
.of-sello.verde { border-color: #3f9e0b; color: #3f9e0b; }
.of-cartel { position: absolute; box-sizing: border-box; padding: 10px 28px; background: ${INK}; border: 4px solid #e8dcc0; border-radius: 6px; box-shadow: 0 6px 0 rgba(42, 43, 48, 0.45);
  font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; letter-spacing: 0.12em; color: #f4ecd8; white-space: nowrap; text-align: center; }
.of-form { position: absolute; box-sizing: border-box; padding: 26px 30px; background: #f4ecd8; border: 4px solid ${INK}; border-radius: 4px; box-shadow: 0 8px 0 rgba(42, 43, 48, 0.35);
  font-family: "Special Elite", monospace; color: ${INK}; }
.of-form .of-ft { font-size: 38px; line-height: 1.05; text-transform: uppercase; letter-spacing: 0.04em; }
.of-form .of-fs { font-size: 26px; line-height: 1.2; margin-top: 8px; color: #5b3d8f; }
.of-form .of-renglon { height: 34px; border-bottom: 3px dotted rgba(42, 43, 48, 0.5); font-size: 26px; padding-top: 4px; }
.of-form .of-caja { display: inline-block; width: 26px; height: 26px; border: 3px solid ${INK}; vertical-align: -4px; margin-right: 10px; }
.of-globo { position: absolute; box-sizing: border-box; padding: 18px 30px; background: #f4ecd8; border: 5px solid ${INK}; border-radius: 34px;
  font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.12; color: ${INK}; text-align: center; white-space: nowrap; }
`;
    document.head.appendChild(st);
  }

  // El funcionario: pelado con costados grises, anteojos gruesos, bigote, chaleco gris, corbata
  // violeta y manguitos negros. Origen: centro abajo del torso (lo que asoma del mostrador).
  // Clases: of-f-cabeza, of-f-parpado, of-f-boca, of-f-brazo (el brazo derecho con el sello,
  // pivote de svgOrigin en (150, -160) en coordenadas LOCALES), of-f-sello.
  function funcionario(x, y, s) {
    s = s || 1;
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="of-f" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
      <path d="M-175 10 L-175 -110 Q-170 -188 -92 -200 L92 -200 Q170 -188 175 -110 L175 10 Z" fill="#f4ecd8"/>
      <path d="M-175 10 L-175 -110 Q-170 -188 -92 -200 L-40 -200 L-20 10 Z" fill="#6f7378"/>
      <path d="M175 10 L175 -110 Q170 -188 92 -200 L40 -200 L20 10 Z" fill="#6f7378"/>
      <path d="M-42 -200 L0 -150 L42 -200" fill="#f4ecd8"/>
      <path d="M0 -150 L-18 -128 L-10 -20 L0 -4 L10 -20 L18 -128 Z" fill="#5b3d8f"/>
      <circle cx="-28" cy="-60" r="5" fill="${INK}" stroke="none"/><circle cx="-24" cy="-10" r="5" fill="${INK}" stroke="none"/>
      <path d="M-120 -120 Q-128 -60 -110 10" fill="none" stroke-width="4" opacity="0.5"/>
      <g class="of-f-cabeza">
        <rect x="-32" y="-236" width="64" height="44" fill="#d9a27a"/>
        <ellipse cx="0" cy="-320" rx="84" ry="98" fill="#e3b88f"/>
        <ellipse cx="-86" cy="-316" rx="16" ry="26" fill="#e3b88f"/><ellipse cx="86" cy="-316" rx="16" ry="26" fill="#e3b88f"/>
        <path d="M-84 -330 Q-90 -390 -60 -400 Q-74 -360 -70 -320 Z" fill="#b9bab3"/>
        <path d="M84 -330 Q90 -390 60 -400 Q74 -360 70 -320 Z" fill="#b9bab3"/>
        <path d="M-50 -404 Q0 -428 40 -408" fill="none" stroke-width="4" opacity="0.7"/>
        <path d="M-30 -380 Q-6 -392 18 -384" fill="none" stroke="#f4ecd8" stroke-width="7" opacity="0.6"/>
        <rect x="-70" y="-342" width="60" height="44" rx="12" fill="#f4ecd8" fill-opacity="0.35" stroke-width="7"/>
        <rect x="10" y="-342" width="60" height="44" rx="12" fill="#f4ecd8" fill-opacity="0.35" stroke-width="7"/>
        <path d="M-10 -324 H10" stroke-width="6"/>
        <circle cx="-40" cy="-316" r="7" fill="${INK}" stroke="none"/><circle cx="40" cy="-316" r="7" fill="${INK}" stroke="none"/>
        <g class="of-f-parpado"><path d="M-66 -338 H-14 V-318 H-66 Z" fill="#e3b88f" stroke="none"/><path d="M14 -338 H66 V-318 H14 Z" fill="#e3b88f" stroke="none"/>
          <path d="M-64 -318 H-16 M16 -318 H64" stroke-width="5"/></g>
        <path d="M-6 -300 Q-14 -276 0 -268" fill="none" stroke-width="4"/>
        <path d="M-50 -258 Q-30 -278 0 -266 Q30 -278 50 -258 Q30 -250 0 -256 Q-30 -250 -50 -258 Z" fill="#b9bab3"/>
        <path class="of-f-boca" d="M-22 -240 H22" fill="none" stroke-width="5"/>
      </g>
      <path d="M-160 -150 Q-200 -80 -150 -20 L-40 -14" fill="none" stroke="${INK}" stroke-width="54"/>
      <path d="M-160 -150 Q-200 -80 -150 -20 L-40 -14" fill="none" stroke="#f4ecd8" stroke-width="42"/>
      <path d="M-170 -60 Q-160 -24 -120 -18 L-60 -14" fill="none" stroke="${INK}" stroke-width="58"/>
      <path d="M-170 -60 Q-160 -24 -120 -18 L-60 -14" fill="none" stroke="#3a3b42" stroke-width="46"/>
      <path d="M-116 -40 V4 M-84 -40 V4" stroke="#6f7378" stroke-width="4"/>
      <ellipse cx="-36" cy="-14" rx="26" ry="20" fill="#e3b88f"/>
      <g class="of-f-brazo">
        <path d="M160 -150 Q200 -100 190 -40" fill="none" stroke="${INK}" stroke-width="54"/>
        <path d="M160 -150 Q200 -100 190 -40" fill="none" stroke="#f4ecd8" stroke-width="42"/>
        <path d="M192 -70 Q200 -20 230 -10" fill="none" stroke="${INK}" stroke-width="58"/>
        <path d="M192 -70 Q200 -20 230 -10" fill="none" stroke="#3a3b42" stroke-width="46"/>
        <g class="of-f-sello">
          <rect x="226" y="-96" width="30" height="64" rx="10" fill="#5b3d8f"/>
          <ellipse cx="241" cy="-104" rx="26" ry="18" fill="#7d5fb5"/>
          <rect x="204" y="-34" width="74" height="22" rx="4" fill="#6f7378"/>
          <rect x="208" y="-14" width="66" height="12" fill="#d63a2f"/>
        </g>
        <ellipse cx="240" cy="-50" rx="26" ry="22" fill="#e3b88f"/>
      </g>
    </g></g>`;
  }

  // Gabriela: veintipico, cola de caballo, campera violeta. Origen: centro abajo del torso.
  // cara: "normal" | "hambre" | "enojada" | "feliz". Clases: of-g-cabeza, of-g-cola, of-g-boca-*,
  // of-g-ceja, of-g-brazo (brazo derecho levantado, si brazo=true; pivote en (120, -150) LOCAL).
  function gabriela(x, y, s, cara, brazo) {
    s = s || 1;
    cara = cara || "normal";
    const boca = {
      normal: `<path d="M-18 -238 Q0 -228 18 -238" fill="none" stroke-width="5"/>`,
      hambre: `<ellipse cx="0" cy="-236" rx="16" ry="20" fill="#7a2a2a"/>`,
      enojada: `<path d="M-22 -230 Q0 -244 22 -230" fill="none" stroke-width="6"/>`,
      feliz: `<path d="M-30 -246 Q0 -206 30 -246 Z" fill="#7a2a2a"/><path d="M-24 -244 H24" stroke="#f4ecd8" stroke-width="6"/>`,
    }[cara];
    const cejas = {
      normal: `<path d="M-56 -322 Q-36 -332 -16 -324 M16 -324 Q36 -332 56 -322" fill="none" stroke-width="6"/>`,
      hambre: `<path d="M-56 -318 Q-36 -336 -16 -330 M16 -330 Q36 -336 56 -318" fill="none" stroke-width="6"/>`,
      enojada: `<path d="M-56 -334 L-16 -320 M16 -320 L56 -334" fill="none" stroke-width="7"/>`,
      feliz: `<path d="M-56 -326 Q-36 -342 -16 -330 M16 -330 Q36 -342 56 -326" fill="none" stroke-width="6"/>`,
    }[cara];
    const ojos = cara === "feliz"
      ? `<path d="M-48 -296 Q-36 -310 -24 -296 M24 -296 Q36 -310 48 -296" fill="none" stroke-width="6"/>`
      : `<ellipse cx="-36" cy="-298" rx="9" ry="12" fill="${INK}" stroke="none"/><ellipse cx="36" cy="-298" rx="9" ry="12" fill="${INK}" stroke="none"/>`;
    const brazoArriba = brazo
      ? `<g class="of-g-brazo"><path d="M120 -150 Q170 -230 180 -330" fill="none" stroke="${INK}" stroke-width="56"/>
          <path d="M120 -150 Q170 -230 180 -330" fill="none" stroke="#7d5fb5" stroke-width="44"/>
          <circle cx="182" cy="-350" r="26" fill="#d9a27a"/></g>`
      : `<path d="M130 -150 Q170 -80 150 10" fill="none" stroke="${INK}" stroke-width="56"/><path d="M130 -150 Q170 -80 150 10" fill="none" stroke="#7d5fb5" stroke-width="44"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="of-g" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
      <g class="of-g-cola"><path d="M60 -380 Q150 -360 140 -260 Q132 -200 100 -170 Q110 -250 70 -320 Z" fill="#3a2f3f"/></g>
      <path d="M-160 10 L-160 -100 Q-150 -170 -70 -182 L70 -182 Q150 -170 160 -100 L160 10 Z" fill="#7d5fb5"/>
      <path d="M-40 -182 L0 -120 L40 -182 Z" fill="#f4ecd8"/>
      <path d="M0 -120 V10" stroke-width="4"/>
      <path d="M-130 -150 Q-170 -80 -150 10" fill="none" stroke="${INK}" stroke-width="56"/><path d="M-130 -150 Q-170 -80 -150 10" fill="none" stroke="#7d5fb5" stroke-width="44"/>
      ${brazoArriba}
      <g class="of-g-cabeza">
        <rect x="-26" y="-214" width="52" height="40" fill="#d9a27a"/>
        <ellipse cx="0" cy="-292" rx="74" ry="88" fill="#e8b48c"/>
        <path d="M-78 -290 Q-86 -386 0 -390 Q84 -388 78 -290 Q64 -350 10 -352 Q-30 -332 -78 -290 Z" fill="#3a2f3f"/>
        <circle cx="70" cy="-352" r="14" fill="#d63a2f"/>
        ${cejas}
        ${ojos}
        <path d="M-4 -280 Q-10 -262 4 -258" fill="none" stroke-width="4"/>
        <ellipse cx="-50" cy="-262" rx="14" ry="8" fill="#e98e7a" stroke="none" opacity="0.6"/><ellipse cx="50" cy="-262" rx="14" ry="8" fill="#e98e7a" stroke="none" opacity="0.6"/>
        <g class="of-g-boca">${boca}</g>
      </g>
    </g></g>`;
  }

  // La ventanilla vista de frente: marco gris en la pared, vidrio con reflejos y el agujerito
  // de los agujeritos, la ranura para pasar papeles y el mostrador beige. (x, y) = esquina sup.
  // izquierda del vidrio. Va DESPUÉS del funcionario en el SVG (el vidrio lo tapa).
  function ventanilla(x, y, w, h) {
    let agujeros = "";
    const cx = x + w * 0.2, cy = y + h * 0.5;
    for (let r = 0; r < 3; r++) {
      const n = r === 0 ? 1 : r * 8;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        agujeros += `<circle cx="${(cx + Math.cos(a) * r * 18).toFixed(1)}" cy="${(cy + Math.sin(a) * r * 18).toFixed(1)}" r="4.5" fill="${INK}" opacity="0.55"/>`;
      }
    }
    return `<g class="of-v">
      <rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="rgba(222,244,236,0.22)"/>
      <g class="of-v-reflejo" opacity="0.9">
        <path d="M${x + w * 0.1} ${y + h} L${x + w * 0.42} ${y} L${x + w * 0.52} ${y} L${x + w * 0.2} ${y + h} Z" fill="rgba(255,255,255,0.16)"/>
        <path d="M${x + w * 0.28} ${y + h} L${x + w * 0.6} ${y} L${x + w * 0.64} ${y} L${x + w * 0.32} ${y + h} Z" fill="rgba(255,255,255,0.12)"/>
      </g>
      <circle cx="${cx}" cy="${cy}" r="62" fill="rgba(244,236,216,0.18)" stroke="${INK}" stroke-width="5"/>
      ${agujeros}
      <path d="M${x} ${y} H${x + w} V${y + h} H${x} Z" fill="none" stroke="#6f7378" stroke-width="34" stroke-linejoin="miter"/>
      <path d="M${x - 17} ${y - 17} H${x + w + 17} V${y + h + 17} H${x - 17} Z M${x + 17} ${y + 17} H${x + w - 17} V${y + h - 17} H${x + 17} Z" fill="none" stroke="${INK}" stroke-width="5"/>
      <rect x="${x - 60}" y="${y + h + 17}" width="${w + 120}" height="54" fill="#e8dcc0" stroke="${INK}" stroke-width="5"/>
      <rect x="${x - 60}" y="${y + h + 71}" width="${w + 120}" height="16" fill="#cbbd9c" stroke="${INK}" stroke-width="5"/>
      <path d="M${x + w / 2 - 120} ${y + h - 17} H${x + w / 2 + 120} V${y + h + 2} H${cx - 120} Z" fill="${INK}"/>
    </g>`;
  }

  // Numerador de turnos: caja negra con dígitos rojos de 7 segmentos. Devuelve el SVG; después
  // OF.numero(tl, svgEl, n, t) prende los segmentos de n en el segundo t (tl.set).
  const SEG = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
  function digito(dx, w, h) {
    const t = w * 0.18, g = 4;
    const P = {
      a: `M${dx + t / 2 + g} 0 H${dx + w - t / 2 - g} L${dx + w - t - g} ${t} H${dx + t + g} Z`,
      d: `M${dx + t / 2 + g} ${h} H${dx + w - t / 2 - g} L${dx + w - t - g} ${h - t} H${dx + t + g} Z`,
      g: `M${dx + t / 2 + g} ${h / 2} L${dx + t + g} ${h / 2 - t / 2} H${dx + w - t - g} L${dx + w - t / 2 - g} ${h / 2} L${dx + w - t - g} ${h / 2 + t / 2} H${dx + t + g} Z`,
      f: `M${dx} ${t / 2 + g} L${dx + t} ${t + g} V${h / 2 - t / 2 - g} L${dx} ${h / 2 - g} Z`,
      b: `M${dx + w} ${t / 2 + g} L${dx + w - t} ${t + g} V${h / 2 - t / 2 - g} L${dx + w} ${h / 2 - g} Z`,
      e: `M${dx} ${h / 2 + g} L${dx + t} ${h / 2 + t / 2 + g} V${h - t - g} L${dx} ${h - t / 2 - g} Z`,
      c: `M${dx + w} ${h / 2 + g} L${dx + w - t} ${h / 2 + t / 2 + g} V${h - t - g} L${dx + w} ${h - t / 2 - g} Z`,
    };
    return Object.entries(P).map(([k, d]) => `<path data-seg="${k}" d="${d}"/>`).join("");
  }
  function numerador(x, y, w, h) {
    const dw = (w - 90) / 2, dh = h - 70;
    return `<g class="of-num" transform="translate(${x} ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="${INK}" stroke="#6f7378" stroke-width="8"/>
      <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="6" fill="#1b0f0e"/>
      <g class="of-num-apag" transform="translate(35 35)" fill="#d63a2f" opacity="0.13">${digito(0, dw, dh)}${digito(dw + 20, dw, dh)}</g>
      <g class="of-num-d" transform="translate(35 35)" fill="#ff4a36">
        <g class="of-d0">${digito(0, dw, dh)}</g><g class="of-d1">${digito(dw + 20, dw, dh)}</g></g>
    </g>`;
  }
  function numero(tl, g, n, t) {
    const s = String(n).padStart(2, "0");
    [0, 1].forEach((i) => {
      const on = SEG[s[i]];
      g.querySelectorAll(`.of-d${i} [data-seg]`).forEach((p) => {
        const v = on.includes(p.dataset.seg) ? 1 : 0;
        if (tl) tl.set(p, { opacity: v }, t); else gsap.set(p, { opacity: v });
      });
    });
  }

  // Fila de respaldos de sillas de plástico en primer plano (tapa el corte de los torsos).
  function butacas(y) {
    let r = "";
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 215;
      r += `<path d="M${x} ${y + 40} Q${x + 100} ${y - 6} ${x + 200} ${y + 40} V${y + 130} H${x} Z" fill="#5f9e8e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M${x + 30} ${y + 52} Q${x + 100} ${y + 22} ${x + 170} ${y + 52}" fill="none" stroke="#8fc9b9" stroke-width="6" stroke-linecap="round"/>`;
    }
    return `<g class="of-butacas"><rect x="0" y="${y + 100}" width="1080" height="${Math.max(0, 1440 - y - 100)}" fill="#6f7378" stroke="${INK}" stroke-width="5"/>${r}</g>`;
  }

  // Persona genérica de pie (silueta gris de la cola). (x, y) = pies.
  function persona(x, y, s, tono, cls) {
    const c = ["#6f7378", "#9a9ea2", "#5f9e8e", "#8a8e92"][tono % 4];
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls || "of-p"}" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
      <path d="M-34 0 V-150 H34 V0 Z" fill="#3a3b42"/>
      <path d="M-62 -140 V-300 Q-60 -350 0 -356 Q60 -350 62 -300 V-140 Z" fill="${c}"/>
      <circle cx="0" cy="-404" r="46" fill="#b9bab3"/></g></g>`;
  }

  function kit(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => Array.from(root.querySelectorAll(s));
    function pop(el, t, d) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: d || 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    }
    function golpe(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 2.2, rotation: rot || 0 }, { opacity: 1, scale: 1, rotation: rot || 0, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.08);
    }
    // sello de goma: baja de golpe, queda la marca con tinta (opacity 0.92) y un rebote mínimo
    function sello(el, t, rot) {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 1.9, rotation: (rot || 0) - 6 }, { opacity: 0.92, scale: 1, rotation: rot || 0, duration: 0.12, ease: "power4.in", immediateRender: false }, t - 0.1);
      tl.fromTo(el, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t + 0.02);
    }
    // el brazo del funcionario sube y baja el sello en t (pega en t). ox, oy en coordenadas
    // LOCALES del personaje (hombro del funcionario: 150 -160)
    function sellar(brazo, t, ox, oy) {
      ox = ox ?? 150; oy = oy ?? -160;
      tl.to(brazo, { rotation: -22, svgOrigin: `${ox} ${oy}`, duration: 0.18, ease: "power2.out" }, t - 0.3);
      tl.to(brazo, { rotation: 4, svgOrigin: `${ox} ${oy}`, duration: 0.1, ease: "power4.in" }, t - 0.1);
      tl.to(brazo, { rotation: 0, svgOrigin: `${ox} ${oy}`, duration: 0.25, ease: "power2.out" }, t + 0.05);
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
    // parpadeo desganado del funcionario (los párpados bajan un poco más y vuelven)
    function bostezo(cabeza, t) {
      const p = cabeza.querySelector(".of-f-parpado");
      tl.to(p, { y: 12, duration: 0.15, ease: "power1.in" }, t);
      tl.to(p, { y: 0, duration: 0.2, ease: "power1.out" }, t + 0.25);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, pop, golpe, sello, sellar, sacudon, dibujar, bostezo, salida };
  }
  return { INK, butacas, persona, funcionario, gabriela, ventanilla, numerador, numero, kit };
})();
