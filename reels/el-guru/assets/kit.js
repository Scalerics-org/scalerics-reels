// el-guru: helpers y dibujos compartidos por las escenas (personajes, pantalla LED, fuego, pirotecnia).
// Cada escena carga GSAP y este archivo, arma su <svg> con KIT.svg.* y anima con KIT(tl, root).
(function () {
  const CREMA = "#fff4e0", ORO = "#f5b82e", FUEGO = "#ff6a1a", ROJO = "#ff3b3b", CEL = "#5ad1e6", OSC = "#150d1c";
  const NS = "http://www.w3.org/2000/svg";
  // pseudoazar determinista
  const rnd = (i, s) => { const x = Math.sin(i * 12.9898 + (s ?? 0) * 78.233) * 43758.5453; return x - Math.floor(x); };
  const tr = (cx, cy, s) => `translate(${cx - 540 * s} ${cy - 860 * s}) scale(${s})`;
  const L = (d, c, w, extra) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra ?? ""}/>`;
  const manga = (d, cls) => `<g class="${cls}">${L(d, ORO, 36)}${L(d, OSC, 24)}</g>`;
  const mangaD = (d, cls) => `<g class="${cls}">${L(d, CREMA, 32)}${L(d, OSC, 22)}</g>`;

  const svg = {
    C: { CREMA, ORO, FUEGO, ROJO, CEL, OSC },
    // GURÚ: cabeza en (cx, cy); pose: v | senala | puno | abajo
    guru(cls, cx, cy, s, pose) {
      const brazos = {
        v: manga("M418 1060 C380 1000 340 940 304 866", "g-bi") + `<circle class="g-mi" cx="298" cy="852" r="24" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>` +
          manga("M662 1060 C700 1000 740 940 776 866", "g-bd") + `<circle class="g-md" cx="782" cy="852" r="24" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>`,
        senala: manga("M418 1070 C400 1130 396 1180 398 1230", "g-bi") +
          manga("M662 1060 C730 1040 790 1000 830 962", "g-bd") + `<g class="g-md"><circle cx="840" cy="952" r="24" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>${L("M852 936 L884 896", CREMA, 12)}</g>`,
        puno: manga("M418 1070 C400 1130 396 1180 398 1230", "g-bi") +
          manga("M662 1060 C700 990 712 920 704 830", "g-bd") + `<rect class="g-md" x="676" y="770" width="58" height="62" rx="16" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>`,
        abajo: manga("M418 1070 C400 1130 396 1180 398 1230", "g-bi") + manga("M662 1070 C680 1130 684 1180 682 1230", "g-bd"),
      }[pose ?? "v"];
      return `<g class="${cls}"><g transform="${tr(cx, cy, s)}">
        <path class="g-saco" d="M390 1250 C392 1066 440 1002 540 1002 C640 1002 688 1066 690 1250 Z" fill="${OSC}" stroke="${ORO}" stroke-width="6" stroke-linejoin="round"/>
        ${L("M500 1006 L540 1084 L580 1006", CREMA, 5, 'class="g-camisa"')}
        ${L("M500 1006 L484 1104 L530 1156 M580 1006 L596 1104 L550 1156", ORO, 5, 'class="g-solapa"')}
        ${L("M514 936 L514 1004 M566 936 L566 1004", CREMA, 5)}
        ${brazos}
        <ellipse class="g-cabeza" cx="540" cy="862" rx="72" ry="86" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>
        ${L("M470 850 q-14 4 -8 30 q4 14 12 10 M610 850 q14 4 8 30 q-4 14 -12 10", CREMA, 4)}
        <path class="g-jopo" d="M466 846 C448 770 492 716 570 722 C648 728 668 784 630 812 C612 788 580 780 552 794 C526 780 490 800 466 846 Z" fill="${CREMA}" stroke="${CREMA}" stroke-width="5" stroke-linejoin="round"/>
        ${L("M496 782 C520 752 566 744 610 756 M520 800 C540 780 570 774 600 778", OSC, 4)}
        ${L("M498 832 q16 -16 34 -4 M548 828 q18 -12 34 4", CREMA, 5, 'class="g-cejas"')}
        <g class="g-ojos">${L("M516 856 v3 M564 856 v3", CREMA, 12)}</g>
        <g class="g-boca"><path d="M490 892 Q540 954 590 892 Z" fill="${CREMA}" stroke="${CREMA}" stroke-width="5" stroke-linejoin="round"/>
        ${L("M498 900 H582 M512 900 v12 M528 900 v16 M544 900 v18 M560 900 v16 M574 900 v10", OSC, 3)}</g>
        ${L("M612 868 C620 910 598 924 574 918", CREMA, 3, 'class="g-mic"')}<circle cx="570" cy="918" r="7" fill="${ORO}"/>
      </g></g>`;
    },
    // DUEÑO DEL PÚBLICO: cabeza en (cx, cy); pose: quieto | mano
    duenio(cls, cx, cy, s, pose) {
      const brazo = pose === "mano"
        ? mangaD("M664 1080 C700 1000 712 930 708 846", "d-brazo") + `<g class="d-mano"><circle cx="708" cy="826" r="25" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>${L("M694 806 v-24 M708 802 v-28 M722 806 v-24", CREMA, 7)}</g>`
        : "";
      return `<g class="${cls}"><g transform="${tr(cx, cy, s)}">
        <path class="d-cuerpo" d="M398 1250 C400 1078 450 1014 540 1014 C630 1014 680 1078 682 1250 Z" fill="${OSC}" stroke="${CREMA}" stroke-width="5" stroke-linejoin="round"/>
        ${L("M540 1030 V1250", FUEGO, 6, 'class="d-cierre"')}${L("M498 1018 Q540 1048 582 1018", FUEGO, 6)}
        ${brazo}
        <ellipse class="d-cabeza" cx="540" cy="872" rx="70" ry="82" fill="${OSC}" stroke="${CREMA}" stroke-width="5"/>
        ${L("M472 870 C464 836 474 810 490 802 M608 870 C616 836 606 810 590 802", CREMA, 5)}
        <g class="d-ojos">${L("M508 862 q12 7 24 0 M548 862 q12 7 24 0", CREMA, 6)}</g>
        ${L("M508 882 q12 9 24 0 M548 882 q12 9 24 0", CREMA, 3, 'opacity="0.55" class="d-ojeras"')}
        ${L("M510 906 q15 -10 30 0 q15 -10 30 0", CREMA, 7)}
        ${L("M522 928 q18 4 36 0", CREMA, 4, 'class="d-boca"')}
      </g></g>`;
    },
    // AGENTE DE IA: burbuja de chat celeste centrada en (cx, cy)
    agente(cls, cx, cy, s) {
      return `<g class="${cls}"><g transform="${tr(cx, cy, s)}">
        <path d="M478 930 L456 990 L528 936 Z" fill="${OSC}" stroke="${CEL}" stroke-width="6" stroke-linejoin="round"/>
        <rect x="430" y="770" width="220" height="172" rx="64" fill="${OSC}" stroke="${CEL}" stroke-width="7"/>
        <g class="a-ojos"><circle cx="505" cy="844" r="12" fill="${CEL}"/><circle cx="575" cy="844" r="12" fill="${CEL}"/></g>
        ${L("M508 884 q32 24 64 0", CEL, 7, 'class="a-boca"')}
      </g></g>`;
    },
    // pantalla LED con grilla de puntitos
    led(cls, x, y, w, h, pid) {
      return `<defs><pattern id="${pid}" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2.2" fill="${ORO}" opacity="0.16"/></pattern></defs>
        <g class="${cls}"><rect class="led-marco" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#1c1016" stroke="${CREMA}" stroke-width="5"/>
        <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="8" fill="url(#${pid})"/>
        ${L(`M${x + 40} ${y + h} L${x + 20} ${y + h + 40} M${x + w - 40} ${y + h} L${x + w - 20} ${y + h + 40}`, CREMA, 5, 'opacity="0.5"')}</g>`;
    },
    // una llama con base en (x, y) y alto h
    llama(cls, x, y, h) {
      const d = (k) => `M${x} ${y} C${x - 44 * k} ${y - 36 * k} ${x - 34 * k} ${y - 0.62 * h * k} ${x} ${y - h * k} C${x + 34 * k} ${y - 0.62 * h * k} ${x + 44 * k} ${y - 36 * k} ${x} ${y} Z`;
      return `<g class="${cls}" data-o="${x} ${y}"><path d="${d(1)}" fill="${FUEGO}" fill-opacity="0.22" stroke="${FUEGO}" stroke-width="6" stroke-linejoin="round"/>
        <path d="${d(0.55)}" fill="${ORO}" stroke="${ORO}" stroke-width="4" stroke-linejoin="round"/></g>`;
    },
    // público en silueta, una fila de cabezas en primer plano (base y)
    publico(cls, y, n) {
      let s = "";
      const N = n ?? 7;
      for (let i = 0; i < N; i++) {
        const x = 70 + i * (940 / (N - 1)), r = 46 + rnd(i, 3) * 10, yy = y - rnd(i, 5) * 18;
        s += `<g class="p-uno"><path d="M${x - 92} ${yy + 120} C${x - 88} ${yy + 40} ${x - 50} ${yy + 18} ${x} ${yy + 18} C${x + 50} ${yy + 18} ${x + 88} ${yy + 40} ${x + 92} ${yy + 120} Z" fill="${OSC}" stroke="${CREMA}" stroke-opacity="0.45" stroke-width="4"/>
          <circle cx="${x}" cy="${yy - 34}" r="${r}" fill="${OSC}" stroke="${CREMA}" stroke-opacity="0.45" stroke-width="4"/>
          <g class="p-mano" data-o="${x + 40} ${yy + 30}">${L(`M${x + 40} ${yy + 40} L${x + 70} ${yy - 120}`, CREMA, 14, 'stroke-opacity="0.5"')}<circle cx="${x + 72}" cy="${yy - 132}" r="17" fill="${OSC}" stroke="${CREMA}" stroke-opacity="0.6" stroke-width="4"/></g></g>`;
      }
      return `<g class="${cls}">${s}</g>`;
    },
  };

  function KIT(tl, root) {
    const q = (s) => root.querySelector(s);
    const qa = (s) => [...root.querySelectorAll(s)];
    const dibujar = (els, t, dur, desde) => {
      els.forEach((el, i) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        tl.to(el, { opacity: 1, duration: 0.04 }, Math.max(0, t + i * 0.04));
        tl.fromTo(el, { strokeDashoffset: len * (desde ?? 1) }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, Math.max(0, t + i * 0.04));
      });
    };
    const pop = (el, t, d, desde) => {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 0.85 }, { opacity: 1, scale: 1, duration: d ?? 0.35, ease: "back.out(1.6)", immediateRender: false }, t);
    };
    const popSvg = (el, t, origen, d) => {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: 0.6, svgOrigin: origen }, { opacity: 1, scale: 1, svgOrigin: origen, duration: d ?? 0.35, ease: "back.out(2)", immediateRender: false }, t);
    };
    const golpe = (el, t, desde) => {
      gsap.set(el, { opacity: 0 });
      tl.fromTo(el, { opacity: 0, scale: desde ?? 2.2 }, { opacity: 1, scale: 1, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.12);
    };
    const temblor = (el, t, f) => [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, { x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045));
    const etiquetas = (lista, color) => {
      lista.forEach(([txt, t], i) => {
        const el = document.createElement("div");
        el.style.cssText = `position:absolute;left:0;right:0;top:1300px;text-align:center;font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:28px;letter-spacing:0.3em;color:${color ?? ORO};white-space:nowrap;`;
        el.textContent = txt;
        root.querySelector(".clip").appendChild(el);
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, t);
        if (i + 1 < lista.length) tl.to(el, { opacity: 0, y: 10, duration: 0.15 }, lista[i + 1][1] - 0.15);
      });
    };
    // llamas: suben en t y titilan hasta fin
    const llamas = (els, t, fin) => {
      els.forEach((el, i) => {
        const o = el.dataset.o;
        gsap.set(el, { opacity: 0 });
        tl.fromTo(el, { opacity: 0, scaleY: 0.1, scaleX: 0.6, svgOrigin: o }, { opacity: 1, scaleY: 1, scaleX: 1, svgOrigin: o, duration: 0.25, ease: "back.out(2.2)", immediateRender: false }, t + i * 0.03);
        const n = Math.max(1, Math.floor((fin - t - 0.3) / 0.16));
        tl.to(el, { scaleY: 0.82, scaleX: 1.06, svgOrigin: o, duration: 0.08, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t + 0.28 + i * 0.05);
      });
    };
    // pirotecnia: una fuente de chispas desde (x, y) en t
    const pirotecnia = (svgEl, x, y, t, k) => {
      const g = document.createElementNS(NS, "g");
      svgEl.appendChild(g);
      for (let i = 0; i < 12; i++) {
        const c = document.createElementNS(NS, "circle");
        const r = 5 + rnd(i, k) * 5;
        c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", r);
        c.setAttribute("fill", i % 3 === 0 ? CREMA : i % 3 === 1 ? ORO : FUEGO);
        g.appendChild(c);
        const dx = (rnd(i, k + 1) - 0.5) * 220, dy = -(260 + rnd(i, k + 2) * 240);
        gsap.set(c, { opacity: 0 });
        tl.fromTo(c, { opacity: 1, x: 0, y: 0 }, { x: dx * 0.7, y: dy, duration: 0.55, ease: "power2.out", immediateRender: false }, t + i * 0.025);
        tl.to(c, { x: dx, y: dy + 120, opacity: 0, duration: 0.5, ease: "power1.in" }, t + 0.55 + i * 0.025);
      }
    };
    // confeti que cae entre t y t + dur
    const confeti = (svgEl, t, n, k) => {
      for (let i = 0; i < n; i++) {
        const c = document.createElementNS(NS, "rect");
        const x = 90 + rnd(i, k) * 900;
        c.setAttribute("x", x); c.setAttribute("y", 560); c.setAttribute("width", 14); c.setAttribute("height", 24); c.setAttribute("rx", 3);
        c.setAttribute("fill", [ORO, CREMA, FUEGO][i % 3]);
        svgEl.appendChild(c);
        gsap.set(c, { opacity: 0 });
        const t0 = t + rnd(i, k + 7) * 0.8;
        tl.fromTo(c, { opacity: 1, y: 0, x: 0, rotation: 0, svgOrigin: `${x + 7} 572` }, { y: 600 + rnd(i, k + 3) * 120, x: (rnd(i, k + 4) - 0.5) * 120, rotation: 360 + rnd(i, k + 5) * 360, svgOrigin: `${x + 7} 572`, duration: 1.8, ease: "power1.in", immediateRender: false }, t0);
        tl.to(c, { opacity: 0, duration: 0.3 }, t0 + 1.5);
      }
    };
    const salida = (dur) => tl.to(root.querySelector(".clip"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, dur - 0.3);
    return { q, qa, dibujar, pop, popSvg, golpe, temblor, etiquetas, llamas, pirotecnia, confeti, salida, rnd };
  }
  KIT.svg = svg;
  window.KIT = KIT;
})();
