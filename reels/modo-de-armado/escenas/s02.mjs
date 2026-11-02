import { escena } from "./lib.mjs";
const caja = (x, letra, cls) => `
          <g class="s02-caja ${cls}">
            <rect class="sombra" x="${x + 8}" y="888" width="290" height="380" rx="18" />
            <rect class="tinta" x="${x}" y="880" width="290" height="380" rx="18" />
            <circle class="amarillo" cx="${x + 52}" cy="932" r="34" />
            <text class="num" x="${x + 52}" y="948" text-anchor="middle" font-size="44">${letra}</text>
            <text class="mono" x="${x + 270}" y="1240" text-anchor="end">x1</text>
          </g>`;
escena({
  id: "s02-piezas",
  etiqueta: 1318,
  css: `
    $C .s02-titulo { position: absolute; left: 0; right: 0; top: 760px; text-align: center; }
    $C .s02-t1 { font-family: "Lexend", sans-serif; font-weight: 800; font-size: 96px; line-height: 1; letter-spacing: -0.01em; color: #1a1a1a; text-transform: uppercase; }
    $C .s02-t2 { margin-top: 12px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 120px; line-height: 1; color: #2b50d6; text-transform: uppercase; }
    $C .s02-t3 { margin-top: 24px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 46px; color: #1a1a1a; }
    $C .s02-t2 svg.s02-lunasvg { position: relative; display: inline-block; width: 96px; height: 96px; vertical-align: -6px; overflow: visible; }
    $C .s02-marco { position: absolute; left: 120px; top: 720px; width: 840px; height: 420px; border: 6px solid #1a1a1a; border-radius: 22px; }
  `,
  svg: `
          ${caja(60, "A", "s02-a")}
          ${caja(395, "B", "s02-b")}
          ${caja(730, "C", "s02-c")}
          <!-- A: el celular con chats -->
          <g class="s02-cel">
            <rect class="tinta" x="148" y="990" width="124" height="226" rx="22" />
            <path class="fina" d="M190 1006 h40" />
            <rect class="fina s02-ch1" x="164" y="1036" width="72" height="34" rx="12" />
            <rect class="fina s02-ch2" x="190" y="1082" width="66" height="34" rx="12" />
            <rect class="fina s02-ch3" x="164" y="1128" width="80" height="34" rx="12" />
          </g>
          <!-- B: la planilla -->
          <g class="s02-pla">
            <rect class="tinta" x="440" y="1000" width="200" height="200" rx="6" />
            <path class="fina s02-grilla" d="M440 1040 H640 M440 1080 H640 M440 1120 H640 M440 1160 H640 M500 1000 V1200 M570 1000 V1200" />
            <rect x="443" y="1003" width="194" height="35" fill="#ffcf1f" opacity="0.7" />
          </g>
          <!-- C: el café frío -->
          <g class="s02-cafe">
            <path class="tinta" d="M808 1030 H932 L920 1170 Q918 1190 898 1190 H842 Q822 1190 820 1170 Z" />
            <path class="linea" d="M930 1060 Q978 1062 974 1100 Q970 1138 922 1136" />
            <path class="fina" d="M816 1056 H924" />
            <path class="azul s02-gota" d="M990 1000 Q1004 1024 990 1034 Q976 1024 990 1000 Z" style="stroke-width:5" />
          </g>
          <text class="mono s02-frio" x="870" y="1236" text-anchor="middle" fill="#2b50d6" style="fill:#2b50d6">FRÍO</text>
  `,
  html: `
        <div class="s02-marco"></div>
        <div class="s02-titulo"><div class="s02-t1">Cómo armar</div><div class="s02-t2">la noche <svg class="s02-lunasvg" viewBox="0 0 120 120" aria-hidden="true"><path class="linea s02-luna" d="M90 92 A50 50 0 1 1 52 16 A40 40 0 1 0 90 92 Z" /></svg></div><div class="s02-t3">de un comerciante</div></div>
        <div class="s02-etiqueta">Piezas incluidas</div>`,
  js: String.raw`
      const NOCHE = 1.53, COMERCIANTE = 2.39, PIEZAS = 3.42, A = 4.10, B = 5.77, C = 6.92, CAFE = 7.69, FRIO = 8.03;
      // el título del manual entra ya armado
      tl.fromTo(q(".s02-marco"), { opacity: 0.4, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s02-t1"), { opacity: 0.4, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      golpe(q(".s02-t2"), NOCHE, 1.8);
      dibujar([q(".s02-luna")], NOCHE, 0.4);
      tl.to(q(".s02-luna"), { rotation: -14, svgOrigin: "60 60", duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, NOCHE + 0.4);
      pop(q(".s02-t3"), COMERCIANTE - 0.1);
      // "piezas incluidas": el título se achica y sube; se dibuja la lámina de piezas
      tl.to([q(".s02-titulo")], { y: -205, scale: 0.6, transformOrigin: "50% 0%", duration: 0.45, ease: "power3.inOut" }, PIEZAS - 0.15);
      tl.to(q(".s02-marco"), { opacity: 0, duration: 0.2 }, PIEZAS - 0.15);
      [[".s02-a", A], [".s02-b", B], [".s02-c", C]].forEach(([s, t], i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, PIEZAS + 0.1 + i * 0.12);
        tl.fromTo(q(s + " .amarillo"), { scale: 1 }, { scale: 1.35, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, t);
      });
      pop(q(".s02-cel"), A - 0.05);
      dibujar(qa(".s02-ch1, .s02-ch2, .s02-ch3"), A + 0.2, 0.3);
      tl.to(q(".s02-cel"), { rotation: 4, svgOrigin: "210 1100", duration: 0.06, yoyo: true, repeat: 5 }, A + 0.6);
      pop(q(".s02-pla"), B - 0.05);
      dibujar([q(".s02-grilla")], B, 0.5);
      pop(q(".s02-cafe"), C - 0.05);
      tl.to(q(".s02-cafe"), { rotation: -4, svgOrigin: "870 1190", duration: 0.2, yoyo: true, repeat: 1 }, CAFE);
      pop(q(".s02-frio"), FRIO - 0.05);
      gsap.set(q(".s02-gota"), { opacity: 0 });
      tl.fromTo(q(".s02-gota"), { opacity: 0, y: -10 }, { opacity: 1, y: 60, duration: 0.7, ease: "power1.in", immediateRender: false }, CAFE);
      etiquetas([[".s02-etiqueta", PIEZAS + 0.2]]);
  `,
  sfx: [{ t: 0.05, sfx: "click", vol: 0.3 }, { t: 1.45, sfx: "pop", vol: 0.3 }, { t: 3.3, sfx: "whoosh-short", vol: 0.25 }, { t: 4.05, sfx: "pop", vol: 0.35 }, { t: 4.7, sfx: "notification", vol: 0.25 }, { t: 5.72, sfx: "pop", vol: 0.35 }, { t: 6.87, sfx: "pop", vol: 0.35 }, { t: 7.95, sfx: "click-soft", vol: 0.3 }],
});
