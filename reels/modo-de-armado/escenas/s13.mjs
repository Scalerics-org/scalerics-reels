import { escena } from "./lib.mjs";
escena({
  id: "s13-cta",
  etiqueta: 1420,
  svg: `
          <g class="s13-glob">
            <path class="sombra" d="M138 668 H978 a24 24 0 0 1 24 24 V998 a24 24 0 0 1 -24 24 H330 L218 1100 L238 1022 H138 a24 24 0 0 1 -24 -24 V692 a24 24 0 0 1 24 -24 Z" />
            <path class="tinta" d="M130 660 H970 a24 24 0 0 1 24 24 V990 a24 24 0 0 1 -24 24 H322 L210 1092 L230 1014 H130 a24 24 0 0 1 -24 -24 V684 a24 24 0 0 1 24 -24 Z" />
            <text class="mono" x="160" y="716" style="fill:#7d7768">COMENTARIOS</text>
            <path class="guia" d="M160 740 H960" />
          </g>
          <text class="num s13-paso" x="160" y="900" font-size="130">Paso</text>
          <path class="s13-raya" d="M505 905 H700" fill="none" stroke="#2b50d6" stroke-width="12" stroke-linecap="round" />
          <rect class="s13-cursor" x="712" y="790" width="10" height="120" fill="#2b50d6" />
          <text class="num s13-preg" x="780" y="905" font-size="140" style="fill:#e0362c">?</text>
          <text class="lex s13-sub" x="160" y="975" font-size="40">¿en cuál te agarran las doce?</text>
          <!-- el reloj chico -->
          <g class="s13-reloj">
            <circle class="tinta" cx="840" cy="1210" r="86" style="stroke:#e0362c;stroke-width:8" />
            <path class="fina" d="M840 1136 v12 M840 1272 v12 M766 1210 h12 M902 1210 h12" />
          </g>
          <path class="s13-ah" d="M840 1210 V1160" fill="none" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round" />
          <path class="s13-am" d="M840 1210 V1144" fill="none" stroke="#e0362c" stroke-width="7" stroke-linecap="round" />
          <circle cx="840" cy="1210" r="9" class="relleno-n s13-eje" />
          <g transform="translate(380 1330) scale(0.75)"><g class="s13-h" data-hombre='{"brazoD":"M40 -196 L90 -230 L120 -280"}'></g></g>
          <path class="azul s13-flecha" d="M520 1220 Q620 1150 640 1060" />
          <path class="azul s13-punta" d="M616 1080 L640 1056 L660 1084" />
  `,
  html: `<div class="s13-etiqueta">Comentá tu paso</div>`,
  js: String.raw`
      const COMENT = 0.46, QUE = 1.18, PASO = 1.28, AGARRAN = 1.73, DOCE = 2.09;
      tl.fromTo(q(".s13-glob"), { opacity: 0.5, scale: 0.9, transformOrigin: "30% 100%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, 0);
      tl.to(q(".s13-glob"), { scale: 1.03, transformOrigin: "30% 100%", duration: 0.12, yoyo: true, repeat: 1 }, COMENT);
      tl.fromTo(q(".s13-h .hb"), { opacity: 0.5, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0.1);
      pop(q(".s13-paso"), QUE - 0.1);
      dibujar([q(".s13-raya")], PASO, 0.3);
      golpe(q(".s13-preg"), PASO + 0.2, 2);
      pop(q(".s13-sub"), AGARRAN - 0.1);
      // el cursor titila (finito, determinista)
      gsap.set(q(".s13-cursor"), { opacity: 0 });
      for (let t = PASO + 0.3; t < DUR - 0.3; t += 0.5) { tl.set(q(".s13-cursor"), { opacity: 1 }, t); tl.set(q(".s13-cursor"), { opacity: 0 }, t + 0.25); }
      // "las doce": el reloj llega a las 12 con un sacudón
      pop(q(".s13-reloj"), 0.2);
      gsap.set(q(".s13-ah"), { rotation: -60, svgOrigin: "840 1210" });
      gsap.set(q(".s13-am"), { rotation: -200, svgOrigin: "840 1210" });
      tl.to(q(".s13-ah"), { rotation: 0, svgOrigin: "840 1210", duration: 1.6, ease: "power2.inOut" }, 0.4);
      tl.to(q(".s13-am"), { rotation: 0, svgOrigin: "840 1210", duration: 1.7, ease: "power2.inOut" }, 0.4);
      tl.to(q(".s13-reloj"), { rotation: 8, svgOrigin: "840 1210", duration: 0.06, yoyo: true, repeat: 7 }, DOCE);
      temblor(DOCE + 0.05, 0.8);
      // la flecha de montaje apunta al comentario; el hombrecito señala
      dibujar([q(".s13-flecha")], AGARRAN, 0.4);
      dibujar([q(".s13-punta")], AGARRAN + 0.35, 0.12);
      tl.to(q(".s13-h .hb-bd"), { rotation: -18, svgOrigin: "40 -196", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOCE + 0.3);
      tl.to(q(".s13-preg"), { rotation: 14, svgOrigin: "820 860", duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOCE + 0.2);
      tl.to(q(".s13-flecha"), { y: -10, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOCE + 0.6);
      tl.to(q(".s13-punta"), { y: -10, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, DOCE + 0.6);
      etiquetas([[".s13-etiqueta", AGARRAN]]);
  `,
  sfx: [{ t: 0.05, sfx: "pop", vol: 0.3 }, { t: 0.45, sfx: "click", vol: 0.3 }, { t: 1.4, sfx: "impact-bass-1", vol: 0.35, max: 0.5 }, { t: 2.05, sfx: "chime", vol: 0.3, max: 0.8 }, { t: 2.15, sfx: "impact-bass-2", vol: 0.35, max: 0.5 }],
});
