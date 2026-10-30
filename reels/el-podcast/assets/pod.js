// Piezas del reel "el-podcast" (estudio de podcast a oscuras, naranja neón y crema): Sofi, Nacho,
// el dueño ofendido (Don), micrófonos con brazo, el cartel de neón, el celular, y helpers de GSAP.
// Uso en una escena: <script src="assets/pod.js"></script> después de GSAP; en el script,
// const K = PD.kit(tl, root). Personajes: PD.sofi(), PD.nacho(), PD.don() devuelven un <g> de
// 440 x 800 (de la cintura para arriba; la base en y 800) para meter adentro de un <g transform>.
// PD.mic(lado) devuelve un micrófono de podcast centrado en (0, 0) con el brazo hacia abajo y a un lado.
window.PD = window.PD || (function () {
  const T = "#0e0d10", NAR = "#ff6a13", MOS = "#ffc53d", CRE = "#f4ead6", ROJ = "#ff2d55", GRI = "#2a262d", GRI2 = "#4a4450";
  const PS = "#f2c29b", PN = "#d9a07a", PDN = "#eab48f", PELO_S = "#3a2230", CANAS = "#bdb5a8";
  if (!document.getElementById("pd-css")) {
    const st = document.createElement("style");
    st.id = "pd-css";
    st.textContent = `
@font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
@font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
.pd-neon { position: absolute; box-sizing: border-box; font-family: "Lexend", sans-serif; font-weight: 700; color: #fff4e8; text-align: center; white-space: nowrap; line-height: 1; letter-spacing: 0.04em; text-transform: uppercase;
  border: 6px solid #ffb27a; border-radius: 28px; text-shadow: 0 0 6px ${NAR}, 0 0 16px ${NAR}, 0 0 34px ${NAR};
  box-shadow: 0 0 14px ${NAR}, 0 0 34px rgba(255, 106, 19, 0.55), inset 0 0 14px ${NAR}; }
.pd-neon.pd-rojo { border-color: #ff8aa0; text-shadow: 0 0 6px ${ROJ}, 0 0 16px ${ROJ}, 0 0 34px ${ROJ}; box-shadow: 0 0 14px ${ROJ}, 0 0 34px rgba(255, 45, 85, 0.55), inset 0 0 14px ${ROJ}; }
.pd-neon.pd-mos { border-color: #ffe29a; text-shadow: 0 0 6px ${MOS}, 0 0 16px ${MOS}, 0 0 34px ${MOS}; box-shadow: 0 0 14px ${MOS}, 0 0 34px rgba(255, 197, 61, 0.5), inset 0 0 14px ${MOS}; }
.pd-etiqueta { position: absolute; left: 0; top: 1286px; width: 1080px; display: flex; justify-content: center; pointer-events: none; }
.pd-etiqueta span { display: inline-block; padding: 10px 24px 9px; border: 3px solid ${NAR}; border-radius: 30px; background: rgba(14, 13, 16, 0.85); font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.2em; color: ${CRE}; text-transform: uppercase; white-space: nowrap; }
.pd-etiqueta span b { color: ${NAR}; font-weight: 600; }
.pd-grueso { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; color: ${CRE}; line-height: 0.95; white-space: nowrap; text-align: center; letter-spacing: -0.01em; }
.pd-cel { position: absolute; box-sizing: border-box; background: ${T}; border: 6px solid ${CRE}; border-radius: 54px; overflow: hidden; }
.pd-cel .pd-isla { position: absolute; left: 50%; top: 18px; width: 110px; height: 26px; margin-left: -55px; border-radius: 14px; background: ${GRI2}; }
.pd-globo { position: absolute; box-sizing: border-box; padding: 16px 22px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.18; white-space: nowrap; }
.pd-globo.pd-yo { background: ${NAR}; color: ${T}; border-bottom-right-radius: 6px; }
.pd-globo.pd-el { background: ${GRI2}; color: ${CRE}; border-bottom-left-radius: 6px; }
.pd-mono { font-family: "IBM Plex Mono", monospace; font-weight: 600; }
`;
    document.head.appendChild(st);
  }

  const tr = `stroke="${T}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
  const brazo = (d, color, ancho) => `<path d="${d}" fill="none" stroke="${T}" stroke-width="${ancho + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function ojos(y, mirada) {
    const dx = mirada || 0;
    return `<g class="pd-ojos"><ellipse cx="180" cy="${y}" rx="15" ry="19" fill="#ffffff" ${tr} stroke-width="5"/><ellipse cx="260" cy="${y}" rx="15" ry="19" fill="#ffffff" ${tr} stroke-width="5"/><circle class="pd-pupila" cx="${181 + dx}" cy="${y + 3}" r="8" fill="${T}"/><circle class="pd-pupila" cx="${261 + dx}" cy="${y + 3}" r="8" fill="${T}"/></g>`;
  }
  // auriculares (vincha + copas) para una cabeza centrada en x 220
  function auris(banda, copa, interior, y) {
    y = y || 236;
    return `<g class="pd-auris"><path d="M104 ${y} Q98 ${y - 142} 220 ${y - 146} Q342 ${y - 142} 336 ${y}" fill="none" stroke="${T}" stroke-width="28" stroke-linecap="round"/>
      <path d="M104 ${y} Q98 ${y - 142} 220 ${y - 146} Q342 ${y - 142} 336 ${y}" fill="none" stroke="${banda}" stroke-width="14" stroke-linecap="round"/>
      <rect x="76" y="${y - 40}" width="50" height="96" rx="20" fill="${copa}" ${tr}/><rect x="314" y="${y - 40}" width="50" height="96" rx="20" fill="${copa}" ${tr}/>
      <rect x="88" y="${y - 22}" width="12" height="60" rx="6" fill="${interior}"/><rect x="340" y="${y - 22}" width="12" height="60" rx="6" fill="${interior}"/></g>`;
  }

  // ---------- personajes (440 x 800, la cintura en y 800) ----------
  // Sofi: pelo largo ciruela, flequillo, buzo canguro naranja, auriculares crema
  function sofi(o) {
    o = o || {};
    return `<g class="pd-sofi">
      <path d="M96 262 Q78 108 220 98 Q362 108 344 262 L362 480 Q322 512 288 462 L152 462 Q118 512 78 480 Z" fill="${PELO_S}" ${tr}/>
      <path d="M44 560 Q56 420 150 404 L290 404 Q384 420 396 560 L404 800 H36 Z" fill="${NAR}" ${tr}/>
      <path d="M128 412 Q220 478 312 412 Q292 384 220 392 Q148 384 128 412 Z" fill="#d9520a" ${tr} stroke-width="6"/>
      <path d="M192 444 V548 M248 444 V548" stroke="${CRE}" stroke-width="7" stroke-linecap="round"/><circle cx="192" cy="556" r="8" fill="${CRE}"/><circle cx="248" cy="556" r="8" fill="${CRE}"/>
      <path d="M128 690 H312 L292 776 H148 Z" fill="none" stroke="${T}" stroke-width="5" stroke-linejoin="round" opacity="0.45"/>
      <rect x="190" y="318" width="60" height="92" fill="${PS}" ${tr}/>
      <ellipse cx="220" cy="236" rx="98" ry="108" fill="${PS}" ${tr}/>
      <path d="M118 232 Q108 118 220 116 Q332 118 324 232 Q302 168 252 164 Q238 194 198 198 Q190 168 160 176 Q130 190 118 232 Z" fill="${PELO_S}" ${tr}/>
      <path class="pd-cejas" d="M154 196 Q177 184 200 194 M240 194 Q263 184 286 196" fill="none" ${tr} stroke-width="7"/>
      ${ojos(232, o.mirada)}
      <path d="M162 214 l-10 -8 M278 214 l10 -8" ${tr} stroke-width="4"/>
      <path d="M216 250 Q208 272 224 276" fill="none" ${tr} stroke-width="4"/>
      <circle cx="160" cy="284" r="15" fill="${NAR}" opacity="0.35"/><circle cx="280" cy="284" r="15" fill="${NAR}" opacity="0.35"/>
      <g class="pd-boca"><path d="M188 298 Q220 310 252 298 Q246 332 220 334 Q194 332 188 298 Z" fill="${T}" ${tr} stroke-width="5"/><path d="M200 320 Q220 312 240 320 Q232 332 220 332 Q208 332 200 320 Z" fill="${ROJ}"/></g>
      ${auris(CRE, CRE, NAR)}
      <g class="pd-brazo-d">${brazo(o.brazoD || "M372 452 Q432 582 352 642", NAR, 50)}<circle cx="${o.manoD ? o.manoD[0] : 350}" cy="${o.manoD ? o.manoD[1] : 646}" r="30" fill="${PS}" ${tr}/></g>
      <g class="pd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", NAR, 50)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="30" fill="${PS}" ${tr}/></g>
    </g>`;
  }
  // Nacho: gorro de lana mostaza con pompón, barba de tres días, buzo crema con franja mostaza, auriculares negros
  function nacho(o) {
    o = o || {};
    return `<g class="pd-nacho">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${CRE}" ${tr}/>
      <path d="M47 600 H393 L396 650 H44 Z" fill="${MOS}"/><path d="M47 600 H393 M44 650 H396" stroke="${T}" stroke-width="5"/>
      <path d="M150 404 Q220 452 290 404" fill="none" ${tr} stroke-width="6"/>
      <rect x="186" y="320" width="68" height="92" fill="${PN}" ${tr}/>
      <ellipse cx="220" cy="240" rx="102" ry="110" fill="${PN}" ${tr}/>
      <path d="M126 268 Q134 352 220 354 Q306 352 314 268 Q302 334 220 340 Q138 334 126 268 Z" fill="${T}" opacity="0.2"/>
      <path class="pd-cejas" d="M152 192 Q178 178 204 190 M236 190 Q262 178 288 192" fill="none" ${tr} stroke-width="10"/>
      ${ojos(228, o.mirada)}
      <path d="M214 246 Q206 274 226 278" fill="none" ${tr} stroke-width="5"/>
      <g class="pd-boca"><path d="M176 296 Q220 312 264 296 Q256 340 220 342 Q184 340 176 296 Z" fill="${T}" ${tr} stroke-width="5"/><path d="M186 300 Q220 312 254 300 L250 312 Q220 320 190 312 Z" fill="#ffffff"/></g>
      ${auris(GRI2, GRI, MOS, 244)}
      <path d="M110 196 Q108 66 220 60 Q332 66 330 196 Z" fill="${MOS}" ${tr}/>
      <path d="M150 90 V170 M186 74 V170 M220 70 V170 M254 74 V170 M290 90 V170" stroke="${T}" stroke-width="4" opacity="0.3"/>
      <rect x="98" y="160" width="244" height="54" rx="18" fill="${MOS}" ${tr}/>
      <circle cx="220" cy="54" r="28" fill="${MOS}" ${tr}/>
      <g class="pd-brazo-d">${brazo(o.brazoD || "M372 452 Q432 582 352 642", CRE, 52)}<circle cx="${o.manoD ? o.manoD[0] : 350}" cy="${o.manoD ? o.manoD[1] : 646}" r="31" fill="${PN}" ${tr}/></g>
      <g class="pd-brazo-i">${brazo(o.brazoI || "M68 452 Q8 582 88 642", CRE, 52)}<circle cx="${o.manoI ? o.manoI[0] : 90}" cy="${o.manoI ? o.manoI[1] : 646}" r="31" fill="${PN}" ${tr}/></g>
    </g>`;
  }
  // Don: el dueño ofendido. Pelado con canas a los costados, bigotazo, cejas enojadas, camisa roja y delantal crema
  function don(o) {
    o = o || {};
    return `<g class="pd-don">
      <path d="M40 560 Q52 420 148 404 L292 404 Q388 420 400 560 L408 800 H32 Z" fill="${ROJ}" ${tr}/>
      <path d="M112 480 H328 L340 800 H100 Z" fill="${CRE}" ${tr}/>
      <path d="M112 480 L150 410 M328 480 L290 410" ${tr} stroke-width="8"/>
      <rect x="150" y="560" width="140" height="70" rx="10" fill="none" stroke="${T}" stroke-width="5" opacity="0.5"/>
      <rect x="186" y="320" width="68" height="94" fill="${PDN}" ${tr}/>
      <circle cx="220" cy="236" r="110" fill="${PDN}" ${tr}/>
      <path d="M112 262 Q100 188 130 166 Q140 208 152 232 Z M328 262 Q340 188 310 166 Q300 208 288 232 Z" fill="${CANAS}" ${tr}/>
      <path d="M196 140 q10 -10 22 0 M232 132 q12 -10 24 2" fill="none" ${tr} stroke-width="4" opacity="0.6"/>
      <path class="pd-cejas" d="M150 186 L206 210 M290 186 L234 210" fill="none" ${tr} stroke-width="12"/>
      <g class="pd-ojos"><ellipse cx="182" cy="234" rx="14" ry="15" fill="#ffffff" ${tr} stroke-width="5"/><ellipse cx="258" cy="234" rx="14" ry="15" fill="#ffffff" ${tr} stroke-width="5"/><circle cx="184" cy="236" r="7" fill="${T}"/><circle cx="256" cy="236" r="7" fill="${T}"/></g>
      <path d="M212 246 Q202 276 226 280" fill="none" ${tr} stroke-width="5"/>
      <g class="pd-boca"><ellipse cx="220" cy="324" rx="40" ry="26" fill="${T}" ${tr} stroke-width="5"/><ellipse cx="220" cy="336" rx="22" ry="10" fill="${ROJ}"/></g>
      <path d="M150 298 Q186 272 220 290 Q254 272 290 298 Q290 318 262 310 Q240 302 220 308 Q200 302 178 310 Q150 318 150 298 Z" fill="${CANAS}" ${tr} stroke-width="6"/>
      <path d="M128 140 q-12 -24 6 -36 M312 140 q12 -24 -6 -36" fill="none" stroke="${ROJ}" stroke-width="7" stroke-linecap="round"/>
      <g class="pd-brazo-d">${brazo(o.brazoD || "M368 452 Q436 360 404 250", ROJ, 52)}<circle cx="${o.manoD ? o.manoD[0] : 402}" cy="${o.manoD ? o.manoD[1] : 236}" r="38" fill="${PDN}" ${tr}/><path d="M382 218 h34 M380 238 h38" stroke="${T}" stroke-width="4" opacity="0.5"/></g>
      <g class="pd-brazo-i">${brazo(o.brazoI || "M72 452 Q14 580 96 640", ROJ, 52)}<circle cx="${o.manoI ? o.manoI[0] : 98}" cy="${o.manoI ? o.manoI[1] : 644}" r="31" fill="${PDN}" ${tr}/></g>
    </g>`;
  }
  // micrófono de podcast (cápsula con rejilla, aro naranja, horquilla y brazo articulado)
  function mic(lado) {
    const s = lado === "izq" ? -1 : 1;
    return `<g class="pd-mic">
      <path class="pd-mic-brazo" d="M0 120 L${s * 150} 300 L${s * 70} 560" fill="none" stroke="${T}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0 120 L${s * 150} 300 L${s * 70} 560" fill="none" stroke="${GRI2}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${s * 150}" cy="300" r="16" fill="${NAR}" ${tr} stroke-width="5"/>
      <path d="M-62 -10 V70 Q-62 112 0 112 Q62 112 62 70 V-10" fill="none" stroke="${T}" stroke-width="20" stroke-linecap="round"/>
      <path d="M-62 -10 V70 Q-62 112 0 112 Q62 112 62 70 V-10" fill="none" stroke="${GRI2}" stroke-width="8" stroke-linecap="round"/>
      <rect x="-48" y="-104" width="96" height="190" rx="46" fill="${GRI}" ${tr}/>
      <path d="M-36 -70 H36 M-40 -46 H40 M-40 -22 H40 M-40 2 H40" stroke="${CRE}" stroke-width="4" opacity="0.28"/>
      <rect x="-50" y="28" width="100" height="22" fill="${NAR}" ${tr} stroke-width="5"/>
    </g>`;
  }
  // el cartel de neón como <g> SVG (para cuando va dentro del dibujo): un rectángulo redondeado que brilla
  function neonSvg(x, y, w, h, color) {
    color = color || NAR;
    return `<g class="pd-neon-svg"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${color}" stroke-width="22" opacity="0.25"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${color}" stroke-width="12" opacity="0.5"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="#fff4e8" stroke-width="5"/></g>`;
  }
  // la mesa del estudio (franja de abajo, tapa la cintura)
  function mesa(y) {
    y = y ?? 1236;
    return `<g class="pd-mesa"><rect x="-20" y="${y}" width="1120" height="${1336 - y}" fill="#1c181d" stroke="${T}" stroke-width="7"/>
      <path d="M-20 ${y + 4} H1100" stroke="${NAR}" stroke-width="6"/><path d="M-20 ${y + 30} H1100" stroke="${CRE}" stroke-width="2" opacity="0.12"/></g>`;
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
    function dibujar(el, t, d, ease) {
      const L = el.getTotalLength() + 2;
      gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
      tl.set(el, { opacity: 1 }, t);
      tl.to(el, { strokeDashoffset: 0, duration: d || 0.6, ease: ease || "power2.inOut" }, t);
    }
    // la boca habla (escala en y) entre a y b
    function habla(boca, a, b) {
      const n = Math.max(1, Math.floor((b - a) / 0.13));
      tl.fromTo(boca, { scaleY: 1, transformOrigin: "50% 15%" }, { scaleY: 0.35, transformOrigin: "50% 15%", duration: 0.065, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, a);
    }
    // parpadeo de los ojos en esos tiempos
    function parpadeo(ojos, ts) {
      for (const t of ts) {
        tl.to(ojos, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.06, ease: "none" }, t);
        tl.to(ojos, { scaleY: 1, transformOrigin: "50% 50%", duration: 0.08, ease: "none" }, t + 0.07);
      }
    }
    // respiración / balanceo suave de un personaje mientras dura la escena
    function respira(el, t, d, amp) {
      const n = Math.max(1, Math.floor(d / 1.2));
      tl.fromTo(el, { y: 0 }, { y: -(amp || 6), duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t);
    }
    function late(el, t, d, f, per) {
      per = per || 0.3;
      const n = Math.max(1, Math.floor(d / per));
      tl.to(el, { scale: f || 1.08, transformOrigin: "50% 50%", duration: per / 2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t);
    }
    // parpadeo duro de neón (encendido/apagado)
    function titila(el, t, d, per) {
      per = per || 0.36;
      const n = Math.floor(d / per);
      for (let i = 0; i < n; i++) { tl.set(el, { opacity: 0.3 }, t + i * per + per * 0.55); tl.set(el, { opacity: 1 }, t + (i + 1) * per); }
    }
    // el neón se prende: dos chispazos y queda
    function prende(el, t) {
      gsap.set(el, { opacity: 0 });
      tl.set(el, { opacity: 1 }, t); tl.set(el, { opacity: 0.15 }, t + 0.07); tl.set(el, { opacity: 1 }, t + 0.14); tl.set(el, { opacity: 0.3 }, t + 0.22); tl.set(el, { opacity: 1 }, t + 0.3);
    }
    // texto que cambia: el etiqueta-chip sale y entra con otro texto
    function etiqueta(el, textos) {
      // textos: [[t, html], ...]
      textos.forEach(([t, html], i) => {
        if (i === 0) { el.innerHTML = html; gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, t); return; }
        tl.to(el, { opacity: 0, y: -12, duration: 0.15, ease: "power2.in" }, t - 0.15);
        tl.set(el, { innerHTML: html }, t);
        tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: false }, t);
      });
    }
    // contador numérico (seek-safe: onUpdate escribe el valor)
    function contar(el, t, d, a, b, fmt) {
      const o = { v: a };
      fmt = fmt || ((v) => String(Math.round(v)));
      el.textContent = fmt(a);
      tl.fromTo(o, { v: a }, { v: b, duration: d, ease: "none", immediateRender: false, onUpdate: () => { el.textContent = fmt(o.v); } }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.22, ease: "power2.in" }, DUR - 0.22);
    }
    return { q, qa, pop, golpe, entra, sale, sacudon, dibujar, habla, parpadeo, respira, late, titila, prende, etiqueta, contar, salida };
  }
  return { kit, sofi, nacho, don, mic, neonSvg, mesa, C: { T, NAR, MOS, CRE, ROJ, GRI, GRI2, PS, PN, PDN, PELO_S, CANAS } };
})();
