// Piezas dibujadas que se repiten entre escenas (tinta sumi sobre papel de arroz).
// Las usa construir.mjs: en partes/escenas/sNN-*.html, <!--@MAESTRO--> se reemplaza por el SVG.
// Paleta: papel #efe4cc / #fbf6ea, sumi #1b1712, laca #c8102e, oro #c99a2e, tatami #b7ad74.
const T = 'stroke="#1b1712" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"';
const t5 = 'stroke="#1b1712" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';

// EL MAESTRO: viejo, pelado, cejas y barba blancas larguísimas, gi negro con faja dorada.
// viewBox 0 0 400 720 (pies en y 700). Grupos animables: .m-cuerpo .m-cabeza .m-ojos .m-ojos-cerr
// .m-boca .m-sonrisa .m-brazo-d (dedo levantado, svgOrigin 270 300) .m-cejas
export const MAESTRO = `<g class="m-cuerpo">
  <path d="M120 470 L96 690 Q200 708 304 690 L280 470 Z" fill="#1b1712" ${T}/>
  <path d="M200 520 V694" stroke="#3a3128" stroke-width="5"/>
  <ellipse cx="150" cy="700" rx="40" ry="14" fill="#fbf6ea" ${t5}/><ellipse cx="250" cy="700" rx="40" ry="14" fill="#fbf6ea" ${t5}/>
  <path d="M128 268 Q200 246 272 268 Q296 380 286 480 Q200 496 114 480 Q104 380 128 268 Z" fill="#1b1712" ${T}/>
  <path d="M160 262 L200 360 L240 262" fill="none" stroke="#efe4cc" stroke-width="12" stroke-linejoin="round"/>
  <rect x="112" y="440" width="176" height="34" rx="6" fill="#c99a2e" ${t5}/>
  <path d="M182 470 L170 540 M214 470 L230 538" stroke="#c99a2e" stroke-width="14" stroke-linecap="round"/>
  <g class="m-brazo-i">
    <path d="M136 290 Q96 380 132 450" fill="none" stroke="#1b1712" stroke-width="44" stroke-linecap="round"/>
    <circle cx="140" cy="452" r="20" fill="#f6eedb" ${t5}/>
  </g>
  <g class="m-brazo-d">
    <path d="M266 290 Q318 330 316 250" fill="none" stroke="#1b1712" stroke-width="44" stroke-linecap="round"/>
    <circle cx="316" cy="236" r="21" fill="#f6eedb" ${t5}/>
    <path d="M318 218 L320 176" stroke="#1b1712" stroke-width="20" stroke-linecap="round"/>
    <path d="M318 218 L320 176" stroke="#f6eedb" stroke-width="10" stroke-linecap="round"/>
  </g>
  <g class="m-cabeza">
    <ellipse cx="200" cy="168" rx="70" ry="80" fill="#f6eedb" ${T}/>
    <path d="M150 108 Q170 96 186 104" fill="none" stroke="#1b1712" stroke-width="4" opacity="0.5"/>
    <ellipse cx="128" cy="176" rx="14" ry="22" fill="#f6eedb" ${t5}/><ellipse cx="272" cy="176" rx="14" ry="22" fill="#f6eedb" ${t5}/>
    <g class="m-cejas">
      <path d="M150 144 Q172 130 192 146 Q170 150 140 176 Q138 156 150 144 Z" fill="#fbf6ea" ${t5}/>
      <path d="M250 144 Q228 130 208 146 Q230 150 260 176 Q262 156 250 144 Z" fill="#fbf6ea" ${t5}/>
    </g>
    <g class="m-ojos"><path d="M162 168 Q174 160 186 168" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round"/><path d="M214 168 Q226 160 238 168" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round"/></g>
    <path d="M196 176 Q188 200 204 204" fill="none" stroke="#1b1712" stroke-width="5" stroke-linecap="round"/>
    <path d="M150 214 Q200 196 250 214 Q262 300 230 380 Q216 360 210 400 Q200 372 190 400 Q184 360 170 380 Q138 300 150 214 Z" fill="#fbf6ea" ${T}/>
    <path d="M176 226 Q200 236 224 226" fill="none" stroke="#1b1712" stroke-width="5" stroke-linecap="round" class="m-boca"/>
    <path d="M172 222 Q200 250 228 222" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round" class="m-sonrisa" opacity="0"/>
    <path d="M186 270 Q200 300 196 340 M214 268 Q206 300 212 330" fill="none" stroke="#1b1712" stroke-width="3" opacity="0.45"/>
  </g>
</g>`;

// EL ALUMNO (el dueño): unos 45, pelado arriba, bigote, ojeras, panza; gi blanco, cinturón
// blanco, vincha roja con colas. viewBox 0 0 400 720. Grupos: .a-cuerpo .a-cabeza .a-ojos
// .a-ojos-cerr .a-boca .a-boca-o .a-brazo-i .a-brazo-d .a-colas .a-gota (sudor)
export const ALUMNO = `<g class="a-cuerpo">
  <path d="M132 470 L114 690 Q200 706 286 690 L268 470 Z" fill="#fbf6ea" ${T}/>
  <path d="M200 500 V694" stroke="#1b1712" stroke-width="5"/>
  <ellipse cx="156" cy="700" rx="40" ry="14" fill="#f6eedb" ${t5}/><ellipse cx="244" cy="700" rx="40" ry="14" fill="#f6eedb" ${t5}/>
  <path d="M130 270 Q200 248 270 270 Q312 380 290 486 Q200 506 110 486 Q88 380 130 270 Z" fill="#fbf6ea" ${T}/>
  <path d="M160 264 L214 420 M240 264 L186 380" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round"/>
  <rect x="104" y="448" width="192" height="30" rx="6" fill="#fbf6ea" ${t5}/>
  <path d="M188 476 L176 540 M212 476 L226 536" stroke="#1b1712" stroke-width="18" stroke-linecap="round"/>
  <path d="M188 476 L176 540 M212 476 L226 536" stroke="#fbf6ea" stroke-width="8" stroke-linecap="round"/>
  <g class="a-brazo-i">
    <path d="M136 292 Q92 380 120 460" fill="none" stroke="#1b1712" stroke-width="50" stroke-linecap="round"/>
    <path d="M136 292 Q92 380 120 460" fill="none" stroke="#fbf6ea" stroke-width="36" stroke-linecap="round"/>
    <circle cx="122" cy="470" r="21" fill="#f6eedb" ${t5}/>
  </g>
  <g class="a-brazo-d">
    <path d="M264 292 Q308 380 280 460" fill="none" stroke="#1b1712" stroke-width="50" stroke-linecap="round"/>
    <path d="M264 292 Q308 380 280 460" fill="none" stroke="#fbf6ea" stroke-width="36" stroke-linecap="round"/>
    <circle cx="278" cy="470" r="21" fill="#f6eedb" ${t5}/>
  </g>
  <g class="a-cabeza">
    <g class="a-colas"><path d="M262 122 Q312 118 336 150 Q300 146 270 140 Z M262 132 Q300 160 304 200 Q280 170 262 146 Z" fill="#c8102e" ${t5}/></g>
    <ellipse cx="200" cy="166" rx="70" ry="80" fill="#f6eedb" ${T}/>
    <path d="M137 140 Q132 160 139 178 M263 140 Q268 160 261 178" fill="none" stroke="#1b1712" stroke-width="14" stroke-linecap="round"/>
    <path d="M132 112 Q200 92 268 112 L270 140 Q200 122 130 140 Z" fill="#c8102e" ${t5}/>
    <g class="a-ojos"><circle cx="174" cy="170" r="7" fill="#1b1712"/><circle cx="226" cy="170" r="7" fill="#1b1712"/></g>
    <g class="a-ojos-cerr" opacity="0"><path d="M162 172 Q174 180 186 172 M214 172 Q226 180 238 172" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round"/></g>
    <path d="M160 186 Q174 196 188 186 M212 186 Q226 196 240 186" fill="none" stroke="#1b1712" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
    <path d="M160 152 Q174 144 188 154 M212 154 Q226 144 240 152" fill="none" stroke="#1b1712" stroke-width="6" stroke-linecap="round"/>
    <path d="M198 176 Q190 198 206 202" fill="none" stroke="#1b1712" stroke-width="5" stroke-linecap="round"/>
    <path d="M168 214 Q184 204 200 212 Q216 204 232 214 Q220 222 200 218 Q180 222 168 214 Z" fill="#1b1712"/>
    <path class="a-boca" d="M180 232 Q200 224 220 232" fill="none" stroke="#1b1712" stroke-width="5" stroke-linecap="round"/>
    <ellipse class="a-boca-o" cx="200" cy="236" rx="12" ry="14" fill="#c8102e" stroke="#1b1712" stroke-width="5" opacity="0"/>
    <path class="a-gota" d="M270 186 Q260 204 270 212 Q280 204 270 186 Z" fill="#fbf6ea" ${t5} opacity="0"/>
  </g>
</g>`;

// el saltamontes (pequeño saltamontes): viewBox 0 0 200 120
export const SALTAMONTES = `<g class="sm">
  <path d="M40 74 Q90 46 150 60 Q168 66 160 80 Q100 96 40 74 Z" fill="#b7ad74" ${t5}/>
  <circle cx="160" cy="64" r="16" fill="#b7ad74" ${t5}/>
  <circle cx="164" cy="60" r="4" fill="#1b1712"/>
  <path d="M166 50 Q180 20 196 14 M158 48 Q160 18 172 6" fill="none" stroke="#1b1712" stroke-width="4" stroke-linecap="round"/>
  <path d="M70 70 L40 20 L20 100" fill="none" stroke="#1b1712" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M120 80 L110 108 M140 78 L146 108" fill="none" stroke="#1b1712" stroke-width="5" stroke-linecap="round"/>
</g>`;

// pincelada gruesa de tinta (para subrayar o tachar), viewBox 0 0 600 80
export const PINCELADA = `<path d="M8 46 Q60 18 150 30 Q300 44 440 22 Q540 10 592 30 Q560 50 470 52 Q320 58 180 62 Q70 70 8 46 Z" fill="#1b1712"/>`;

// ensō: círculo zen de pincel, abierto. viewBox 0 0 400 400 (trazo para dibujar con dashoffset)
export const ENSO = `<path class="enso" d="M250 54 C356 78 380 220 320 296 C252 380 108 368 60 268 C18 180 70 72 180 56" fill="none" stroke="#1b1712" stroke-width="34" stroke-linecap="round"/>`;

// Cabeza común de las escenas: fuentes y clases base ({{ID}} = id de la escena).
export const ESTILO = `@font-face { font-family: "Shojumaru"; font-weight: 400; font-display: block; src: url("assets/fonts/Shojumaru.woff2") format("woff2"); }
    @font-face { font-family: "Kaushan Script"; font-weight: 400; font-display: block; src: url("assets/fonts/KaushanScript.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="{{ID}}"] .capa { position: absolute; inset: 0; }
    [data-composition-id="{{ID}}"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="{{ID}}"] .fig { position: absolute; width: 400px; height: 720px; }
    [data-composition-id="{{ID}}"] .fig svg, [data-composition-id="{{ID}}"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="{{ID}}"] .obj { position: absolute; }
    [data-composition-id="{{ID}}"] .sho { position: absolute; font-family: "Shojumaru", serif; line-height: 1.02; white-space: nowrap; text-align: center; }
    [data-composition-id="{{ID}}"] .kau { position: absolute; font-family: "Kaushan Script", cursive; line-height: 1.05; white-space: nowrap; text-align: center; color: #1b1712; }
    [data-composition-id="{{ID}}"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.14em; white-space: nowrap; text-transform: uppercase; color: #1b1712; }
    [data-composition-id="{{ID}}"] .hanko { position: absolute; display: flex; align-items: center; justify-content: center; text-align: center; border: 9px solid #c8102e; border-radius: 18px; color: #c8102e; font-family: "Shojumaru", serif; line-height: 1.02; white-space: nowrap; background: rgba(239, 228, 204, 0.92); }
    [data-composition-id="{{ID}}"] .msg { position: absolute; padding: 14px 22px; border-radius: 24px 24px 24px 6px; background: #fbf6ea; border: 5px solid #1b1712; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.15; color: #1b1712; white-space: nowrap; }`;

// Helpers comunes del script (necesita ID, DUR, root, tl ya definidos).
export const HELPERS = `const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const ESC = q(".esc");
      const temblor = (t, f = 12) => [[-f, f * 0.6], [f * 0.8, -f * 0.5], [-f * 0.4, f * 0.2], [0, 0]].forEach(([x, y], i) => tl.to(ESC, { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      // sello: cae grande y golpea en t
      const sello = (el, t, rot = 0, desde = 2.4) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: desde, rotation: rot - 8 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.12); };
      // pop: aparece entero
      const pop = (el, t, d = 0.3) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.8)", immediateRender: false }, t); };
      // entra desde abajo
      const sube = (el, t, d = 0.25) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: d, ease: "power3.out", immediateRender: false }, t); };
      // trazos que se dibujan
      const dibujar = (els, t, d = 0.5, st = 0.05) => [].concat(els).forEach((el, i) => { const L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t + i * st); tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t + i * st); });
      // ojos/boca del personaje: cambia de cara
      const cara = (t, on, off) => { if (on) tl.to(qa(on), { opacity: 1, duration: 0.05 }, t); if (off) tl.to(qa(off), { opacity: 0, duration: 0.05 }, t); };
      const salida = () => tl.to(q("#" + ID.slice(0, 3) + "-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }, DUR - 0.2);`;
