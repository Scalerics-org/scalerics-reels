import { escena } from "./lib.mjs";
const hojas = Array.from({ length: 10 }, (_, i) => `<g class="s04-hoja"><rect class="tinta" x="${640 + (i % 2) * 8}" y="${1300 - (i + 1) * 16}" width="320" height="16" rx="3" /></g>`).join("\n          ");
escena({
  id: "s04-cuarenta-y-siete",
  etiqueta: 1420,
  svg: `
          <ellipse class="sombra" cx="330" cy="1316" rx="130" ry="16" />
          <g transform="translate(330 1310) scale(1.55)"><g class="s04-h" data-hombre='{"extra":""}'></g></g>
          <!-- globito con signo de pregunta -->
          <g class="s04-glob">
            <path class="tinta" d="M430 620 h170 a24 24 0 0 1 24 24 v110 a24 24 0 0 1 -24 24 h-110 l-50 40 l10 -40 h-20 a24 24 0 0 1 -24 -24 v-110 a24 24 0 0 1 24 -24 Z" />
            <text class="num s04-preg" x="515" y="746" text-anchor="middle" font-size="120">?</text>
            <text class="num s04-excl" x="515" y="746" text-anchor="middle" font-size="110" fill="#e0362c" style="fill:#e0362c">¡?</text>
          </g>
          <!-- la pila del manual -->
          ${hojas}
          <text class="num s04-47" x="800" y="1130" text-anchor="middle" font-size="230">47</text>
          <g class="s04-tilde">
            <circle cx="962" cy="930" r="40" fill="#fffdf6" stroke="#2b50d6" stroke-width="7" />
            <path class="azul" d="M942 932 L957 948 L984 914" />
          </g>
          <path class="rojo s04-rayos" d="M240 820 l-40 -40 M330 790 v-56 M420 820 l40 -40" />
  `,
  html: `<div class="s04-etiqueta">Paso 47 de 47</div>`,
  js: String.raw`
      const CUANDO = 0.19, HASTA = 1.56, CUARENTA = 2.09, SIETE = 2.71, GRITO = 3.46;
      const H = ".s04-h .hb";
      tl.fromTo(q(H), { opacity: 0.6, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
      // "¿hasta cuándo?": cabeza ladeada, mano al mentón, globito
      tl.to(q(H + " .hb-cabeza"), { rotation: -14, svgOrigin: "0 -222", duration: 0.3, ease: "power2.out" }, 0.05);
      tl.to(q(H + " .hb-bd"), { rotation: -105, svgOrigin: "40 -196", duration: 0.3, ease: "power2.out" }, 0.05);
      pop(q(".s04-glob"), CUANDO - 0.1, 0.5);
      gsap.set(q(".s04-excl"), { opacity: 0 });
      tl.to(q(".s04-preg"), { rotation: 12, svgOrigin: "515 710", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.5);
      // "hasta el paso cuarenta y siete": la pila crece hoja a hoja
      qa(".s04-hoja").forEach((h, i) => {
        gsap.set(h, { opacity: 0 });
        tl.fromTo(h, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.14, ease: "power2.in", immediateRender: false }, HASTA - 0.2 + i * 0.07);
      });
      golpe(q(".s04-47"), CUARENTA + 0.1, 2.2);
      pop(q(".s04-tilde"), SIETE);
      // "¿¡cuarenta y siete!?": salta, brazos arriba, el 47 se pone rojo
      tl.to(q(".s04-preg"), { opacity: 0, duration: 0.05 }, GRITO - 0.05);
      tl.to(q(".s04-excl"), { opacity: 1, duration: 0.05 }, GRITO - 0.05);
      tl.fromTo(q(".s04-glob"), { scale: 1 }, { scale: 1.25, transformOrigin: "30% 100%", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, GRITO);
      tl.to(q(H + " .hb-cabeza"), { rotation: 0, svgOrigin: "0 -222", duration: 0.1 }, GRITO);
      tl.to(q(H + " .hb-bd"), { rotation: -160, svgOrigin: "40 -196", duration: 0.15, ease: "back.out(2)" }, GRITO);
      tl.to(q(H + " .hb-bi"), { rotation: 160, svgOrigin: "-40 -196", duration: 0.15, ease: "back.out(2)" }, GRITO);
      tl.to(q(H), { y: -50, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, GRITO);
      tl.to(q(".s04-47"), { fill: "#e0362c", scale: 1.15, transformOrigin: "50% 50%", duration: 0.12 }, GRITO);
      tl.to(q(".s04-47"), { scale: 1, duration: 0.3, ease: "back.out(2)" }, GRITO + 0.15);
      tl.to(q(".s04-tilde"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.15 }, GRITO);
      dibujar(qa(".s04-rayos"), GRITO + 0.05, 0.15);
      temblor(GRITO + 0.05, 1.3);
      tl.to(q(".s04-glob"), { rotation: 6, svgOrigin: "430 820", duration: 0.08, yoyo: true, repeat: 7 }, GRITO + 0.3);
      etiquetas([[".s04-etiqueta", SIETE]]);
  `,
  sfx: [{ t: 0.12, sfx: "pop", vol: 0.3 }, { t: 1.4, sfx: "typing", vol: 0.25, max: 0.8 }, { t: 2.0, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }, { t: 2.7, sfx: "chime", vol: 0.25, max: 0.6 }, { t: 3.42, sfx: "impact-bass-2", vol: 0.45, max: 0.7 }, { t: 3.46, sfx: "glitch-1", vol: 0.25, max: 0.4 }],
});
