// Piezas del reel "el-museo": pedestales de mármol, vitrinas de vidrio, placas de bronce y helpers de
// animación. Uso en una escena: <div data-mu="pedestal" data-w="420" data-h="300" style="...">,
// <div data-mu="vitrina" data-w="..." data-h="...">, <div class="mu-placa">...</div>; en el script,
// MU.llenar(root) y const K = MU.kit(tl, root).
window.MU = window.MU || (function () {
  if (!document.getElementById("mu-css")) {
    const st = document.createElement("style");
    st.id = "mu-css";
    st.textContent = `
@font-face { font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
@font-face { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }
.mu-placa { position: absolute; box-sizing: border-box; padding: 16px 26px 14px; text-align: center; color: #2b1a0b; border-radius: 8px;
  background: linear-gradient(135deg, #d2a457 0%, #a8762f 48%, #c4954c 72%, #9a6a2a 100%); border: 3px solid #4a3213;
  box-shadow: inset 0 0 0 5px rgba(255, 226, 160, 0.35), inset 0 0 0 7px rgba(74, 50, 19, 0.35), 0 7px 0 #120d0f; }
.mu-placa .mu-t { font-family: "Cinzel", serif; font-weight: 800; font-size: 34px; letter-spacing: 0.08em; line-height: 1.1; text-shadow: 0 1px 0 rgba(255, 232, 180, 0.6); white-space: nowrap; }
.mu-placa .mu-d { font-family: "Cormorant Garamond", serif; font-style: italic; font-weight: 500; font-size: 32px; line-height: 1.1; margin-top: 4px; text-shadow: 0 1px 0 rgba(255, 232, 180, 0.5); white-space: nowrap; }
.mu-placa .mu-f { font-family: "Cinzel", serif; font-weight: 700; font-size: 28px; letter-spacing: 0.2em; margin-top: 6px; text-shadow: 0 1px 0 rgba(255, 232, 180, 0.6); white-space: nowrap; }
.mu-sala { position: absolute; box-sizing: border-box; padding: 12px 34px; background: #120d0f; border: 3px solid #a8762f; box-shadow: inset 0 0 0 6px #120d0f, inset 0 0 0 8px rgba(232, 184, 102, 0.5);
  font-family: "Cinzel", serif; font-weight: 700; font-size: 38px; letter-spacing: 0.24em; color: #e8b866; white-space: nowrap; text-align: center; }
.mu-sello { position: absolute; box-sizing: border-box; padding: 10px 26px; border: 9px solid #a8303f; border-radius: 14px; color: #a8303f; background: rgba(18, 13, 15, 0.55);
  font-family: "Cinzel", serif; font-weight: 900; letter-spacing: 0.06em; white-space: nowrap; text-align: center; line-height: 1; }
`;
    document.head.appendChild(st);
  }

  function pedestal(w, h) {
    const cuerpo = `M18 26 H${w - 18} V${h - 30} H18 Z`;
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0;overflow:visible" aria-hidden="true">
      <path d="${cuerpo}" fill="#e6e1d8" stroke="#120d0f" stroke-width="5" stroke-linejoin="round"/>
      <rect x="${w - 18 - (w - 36) * 0.22}" y="28" width="${(w - 36) * 0.22 - 2}" height="${h - 60}" fill="#cfc8bc"/>
      <path d="M${w * 0.18} 60 q ${w * 0.12} ${h * 0.2} ${w * 0.05} ${h * 0.4} t ${w * 0.12} ${h * 0.3}" fill="none" stroke="#a69f93" stroke-width="3" opacity="0.6"/>
      <path d="M${w * 0.5} 40 q ${w * 0.08} ${h * 0.15} ${-w * 0.04} ${h * 0.35}" fill="none" stroke="#a69f93" stroke-width="2.5" opacity="0.45"/>
      <rect x="2" y="2" width="${w - 4}" height="26" rx="4" fill="#f6f3ee" stroke="#120d0f" stroke-width="5"/>
      <rect x="2" y="${h - 32}" width="${w - 4}" height="30" rx="4" fill="#f0ece4" stroke="#120d0f" stroke-width="5"/>
    </svg>`;
  }
  function vitrina(w, h) {
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0;overflow:hidden" aria-hidden="true">
      <defs><clipPath id="mu-c-${w}-${h}"><rect x="4" y="4" width="${w - 8}" height="${h - 8}"/></clipPath></defs>
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="rgba(210,232,236,0.07)" stroke="rgba(236,244,244,0.75)" stroke-width="4"/>
      <g clip-path="url(#mu-c-${w}-${h})">
        <g class="mu-reflejo"><path d="M${-w * 0.1} ${h} L${w * 0.25} 0 L${w * 0.38} 0 L${w * 0.03} ${h} Z" fill="rgba(255,255,255,0.13)"/>
        <path d="M${w * 0.12} ${h} L${w * 0.47} 0 L${w * 0.52} 0 L${w * 0.17} ${h} Z" fill="rgba(255,255,255,0.10)"/></g>
      </g>
      <path d="M10 10 V${h - 10}" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>
      <rect x="0" y="0" width="${w}" height="14" fill="#a8762f" stroke="#120d0f" stroke-width="3"/>
    </svg>`;
  }
  function llenar(root) {
    root.querySelectorAll("[data-mu]").forEach((el) => {
      const w = Number(el.dataset.w), h = Number(el.dataset.h);
      el.innerHTML = el.dataset.mu === "pedestal" ? pedestal(w, h) : vitrina(w, h);
    });
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
    function reflejo(vit, t) {
      const r = vit.querySelector(".mu-reflejo");
      const w = Number(vit.dataset.w);
      tl.fromTo(r, { x: -w * 0.6 }, { x: w * 1.1, duration: 0.9, ease: "power2.inOut", immediateRender: false }, t);
    }
    function salida(el, DUR) {
      tl.to(el, { opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }, DUR - 0.25);
    }
    return { q, qa, pop, golpe, sacudon, dibujar, reflejo, salida };
  }
  return { llenar, kit };
})();
