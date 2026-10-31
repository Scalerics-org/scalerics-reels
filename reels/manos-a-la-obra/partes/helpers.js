      const ID = "__ID__";
      const DUR = __DUR__;
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => root.querySelectorAll(s);
      const NS = "http://www.w3.org/2000/svg";
      const mk = (tag, at, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (padre) padre.appendChild(e); return e; };
      // letras recortadas: cada letra en su papelito de color, torcida
      const COL = ["#ffd23f", "#ef4b3c", "#7ccf3a", "#fbf8f0"];
      const ROT = [-7, 5, -3, 8, -5, 4, -8, 3, 6, -4, 7, -6];
      const recorte = (padre, txt, cx, cy, s, k0, cols, giro) => {
        const C = cols || COL, out = [], paso = s * 0.92, letras = [...txt];
        const ancho = letras.reduce((a, c, i) => a + (i ? (c === " " || letras[i - 1] === " " ? paso * 0.85 : paso) : 0), 0);
        let x = cx - ancho / 2;
        letras.forEach((c, i) => {
          if (c !== " ") {
            const k = (k0 + i) % C.length;
            const g = mk("g", { transform: `translate(${x.toFixed(1)} ${cy}) rotate(${ROT[(k0 + i) % ROT.length] * (giro ?? 1)})` }, padre);
            const h = mk("g", {}, g);
            mk("rect", { x: -s * 0.42, y: -s * 0.5, width: s * 0.84, height: s, fill: C[k], class: "t", "stroke-width": 4 }, h);
            mk("text", { x: 0, y: s * 0.02, "font-size": s * 0.72, fill: C[k] === "#ef4b3c" || C[k] === "#2347c9" ? "#fbf8f0" : "#141a3c", "text-anchor": "middle", "dominant-baseline": "central", class: "fr" }, h).textContent = c;
            out.push(h);
          }
          x += c === " " || letras[i + 1] === " " ? paso * 0.85 : paso;
        });
        return out;
      };
      const tl = gsap.timeline({ paused: true });
      const pop = (el, t, s) => tl.fromTo(el, { opacity: 0, scale: s ?? 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, t);
      const dibujar = (el, t, d) => { const L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t); tl.to(el, { strokeDashoffset: 0, duration: d ?? 0.5, ease: "power2.inOut" }, t); };
      const temblor = (el, t, f) => { let px = 0, py = 0; [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => { tl.to(el, { x: "+=" + (x - px) * (f ?? 1), y: "+=" + (y - py) * (f ?? 1), duration: 0.04, ease: "none" }, t + i * 0.045); px = x; py = y; }); };
      // etiqueta debajo del dibujo: tira de papel con borde dentado; textos [[texto, t, color], ...]
      const etiquetas = (lista) => {
        const g = mk("g", { class: "etq" }, q("svg.principal"));
        const tira = mk("path", { d: "M250 1342 L830 1342 L842 1356 L830 1370 L842 1384 L830 1398 L250 1398 L238 1384 L250 1370 L238 1356 Z", fill: "#fbf8f0", class: "t", "stroke-width": 4 }, g);
        tl.fromTo(tira, { opacity: 0, scaleX: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.05);
        lista.forEach(([txt, t, col], i) => {
          const e = mk("text", { x: 540, y: 1382, "font-size": 34, fill: col || "#141a3c", "text-anchor": "middle", "letter-spacing": 4, class: "fr", opacity: 0 }, g);
          e.textContent = txt;
          tl.fromTo(e, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, t);
          if (i + 1 < lista.length) tl.to(e, { opacity: 0, y: -10, duration: 0.2 }, lista[i + 1][1] - 0.2);
        });
      };
      // el número de PASO: la estrella entra girando y "PASO" se pega en letras recortadas
      const entraPaso = (x, y, t, tnum) => {
        const letras = recorte(q(".paso-titulo"), "PASO", x + 290, y - 40, 66, 0);
        letras.forEach((h, i) => tl.fromTo(h, { opacity: 0, scale: 1.7, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, t + i * 0.05));
        tl.fromTo(q(".paso"), { opacity: 0.3, scale: 0.4, rotation: -160, svgOrigin: `${x} ${y}` }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: `${x} ${y}`, duration: 0.45, ease: "back.out(1.5)" }, t);
        tl.to(q(".paso"), { scale: 1.18, svgOrigin: `${x} ${y}`, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1 }, tnum);
        tl.to(q(".paso"), { rotation: 8, svgOrigin: `${x} ${y}`, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 7 }, tnum + 0.3);
      };
