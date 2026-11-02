import { escena } from "./lib.mjs";
const cuadro = (x, y, n, cls) => `
          <g class="s03-cuadro ${cls}">
            <rect class="sombra" x="${x + 8}" y="${y + 8}" width="455" height="350" rx="18" />
            <rect class="tinta" x="${x}" y="${y}" width="455" height="350" rx="18" />
            <text class="num s03-n" x="${x + 26}" y="${y + 118}" font-size="120">${n}</text>
          </g>`;
escena({
  id: "s03-pasos",
  svg: `
          ${cuadro(70, 600, 1, "s03-c1")}
          ${cuadro(555, 600, 2, "s03-c2")}
          ${cuadro(70, 975, 3, "s03-c3")}
          ${cuadro(555, 975, 4, "s03-c4")}
          <!-- 1: el celular con el chat -->
          <g class="s03-cel">
            <rect class="tinta" x="300" y="642" width="140" height="266" rx="24" />
            <path class="fina" d="M348 660 h44" />
            <path class="tinta" d="M318 700 h100 a12 12 0 0 1 12 12 v34 a12 12 0 0 1 -12 12 h-80 l-20 16 Z" />
            <path class="fina" d="M334 720 h70 M334 738 h44" />
            <path class="azul s03-vib" d="M282 700 q-14 20 0 40 M458 700 q14 20 0 40" style="stroke-width:6" />
          </g>
          <!-- 2: el pedido seleccionado para copiar -->
          <g class="s03-ped">
            <path class="tinta" d="M700 668 h236 a14 14 0 0 1 14 14 v96 a14 14 0 0 1 -14 14 h-210 l-26 22 Z" />
            <path class="fina" d="M722 700 h150 M722 728 h190 M722 756 h110" />
            <text class="mono" x="722" y="694" font-size="22" data-layout-ignore>PEDIDO</text>
          </g>
          <rect class="s03-sel" x="684" y="652" width="282" height="150" rx="10" fill="none" stroke="#2b50d6" stroke-width="5" stroke-dasharray="14 10" />
          <g class="s03-copiar">
            <rect class="tinta" x="690" y="850" width="46" height="56" rx="6" />
            <rect class="tinta" x="708" y="836" width="46" height="56" rx="6" />
            <text class="mono" x="776" y="884" fill="#2b50d6" style="fill:#2b50d6">COPIAR</text>
          </g>
          <!-- 3: la planilla y el pegado -->
          <g class="s03-pla">
            <rect class="tinta" x="230" y="1050" width="270" height="250" rx="6" />
            <path class="fina" d="M230 1100 H500 M230 1150 H500 M230 1200 H500 M230 1250 H500 M300 1050 V1300 M400 1050 V1300" />
          </g>
          <rect class="s03-celda" x="303" y="1203" width="94" height="44" fill="#ffcf1f" />
          <rect class="tinta s03-papel" x="306" y="1206" width="88" height="38" rx="6" />
          <path class="azul s03-flecha" d="M120 1210 Q170 1240 280 1226" />
          <path class="azul s03-punta" d="M262 1206 L284 1226 L258 1242" />
          <!-- 4: repetí -->
          <circle class="s03-loop" cx="830" cy="1170" r="104" fill="none" stroke="#2b50d6" stroke-width="16" stroke-linecap="round" stroke-dasharray="560 200" />
          <path class="s03-loop-p" d="M878 1036 L940 1080 L868 1100" fill="none" stroke="#2b50d6" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <text class="num s03-x47" x="830" y="1196" text-anchor="middle" font-size="70" fill="#e0362c" style="fill:#e0362c">x47</text>
  `,
  js: String.raw`
      const P1 = 0, WA = 1.21, P2 = 1.88, COPIA = 2.76, P3 = 3.82, PEGA = 4.59, P4 = 5.80, REPETI = 6.60;
      // cuadro 0: el paso 1 ya está
      tl.fromTo(q(".s03-c1"), { opacity: 0.5, scale: 0.92, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s03-c1 .s03-n"), { scale: 1.8, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.2, ease: "power4.in" }, 0);
      tl.fromTo(q(".s03-cel"), { opacity: 0.5, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, 0.15);
      dibujar(qa(".s03-vib"), WA - 0.05, 0.2);
      tl.to(q(".s03-cel"), { x: 5, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, WA);
      const paso = (s, t) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, t - 0.1);
        tl.fromTo(q(s + " .s03-n"), { scale: 2.2, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.18, ease: "power4.in", immediateRender: false }, t - 0.1);
      };
      paso(".s03-c2", P2);
      pop(q(".s03-ped"), P2 + 0.1);
      gsap.set(q(".s03-sel"), { opacity: 0 });
      tl.fromTo(q(".s03-sel"), { opacity: 0, scale: 1.1, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2, immediateRender: false }, COPIA - 0.1);
      tl.fromTo(q(".s03-sel"), { strokeDashoffset: 0 }, { strokeDashoffset: -96, duration: 1, ease: "none", immediateRender: false }, COPIA);
      pop(q(".s03-copiar"), COPIA + 0.1);
      paso(".s03-c3", P3);
      pop(q(".s03-pla"), P3 + 0.1);
      dibujar([q(".s03-flecha")], PEGA - 0.3, 0.3);
      dibujar([q(".s03-punta")], PEGA, 0.12);
      gsap.set(q(".s03-papel"), { opacity: 0 });
      tl.fromTo(q(".s03-papel"), { opacity: 0, x: -200, y: -10, rotation: -12, transformOrigin: "50% 50%" }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, PEGA - 0.1);
      gsap.set(q(".s03-celda"), { opacity: 0 });
      tl.to(q(".s03-celda"), { opacity: 1, duration: 0.1 }, PEGA + 0.25);
      paso(".s03-c4", P4);
      pop(q(".s03-loop"), P4 + 0.05);
      pop(q(".s03-loop-p"), P4 + 0.05);
      tl.to([q(".s03-loop"), q(".s03-loop-p")], { rotation: 360, svgOrigin: "830 1170", duration: 0.9, ease: "power2.inOut" }, REPETI - 0.1);
      golpe(q(".s03-x47"), REPETI, 2);
      // el loop: los cuatro pasos laten en orden, como si volviera a empezar
      [".s03-c1", ".s03-c2", ".s03-c3", ".s03-c4"].forEach((s, i) => tl.to(q(s), { scale: 1.04, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, REPETI + 0.15 + i * 0.12));
      tl.to(q(".s03-escenario"), { rotation: -1.5, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 1 }, REPETI + 0.2);
  `,
  sfx: [{ t: 0.05, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }, { t: 1.2, sfx: "notification", vol: 0.25 }, { t: 1.8, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }, { t: 2.75, sfx: "click", vol: 0.35 }, { t: 3.74, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }, { t: 4.55, sfx: "pop", vol: 0.35 }, { t: 5.72, sfx: "impact-bass-1", vol: 0.3, max: 0.5 }, { t: 6.55, sfx: "whoosh", vol: 0.3 }],
});
