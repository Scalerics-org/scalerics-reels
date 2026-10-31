import { escena, C } from "../escena.mjs";
import { clienta, sillon, ojo, walter } from "../personajes.mjs";
escena({
  id: "s03-confesionario",
  e: ["Confesionario", "Nomina a: Walter"],
  svg: `
          <path class="s03-luz" d="M440 600 L640 600 L900 1330 L180 1330 Z" fill="${C.sillon2}" opacity="0.16" />
          <g class="s03-cartel"><text class="tv" x="540" y="660" font-size="44" fill="${C.rosa}" text-anchor="middle" letter-spacing="10">CONFESIONARIO</text>
            <rect x="250" y="612" width="580" height="66" rx="12" fill="none" stroke="${C.rosa}" stroke-width="4" opacity="0.7" /></g>
          <g class="s03-sillon"><g transform="translate(540 1290) scale(0.95)">${sillon("s03")}</g></g>
          <g class="s03-cli"><g transform="translate(540 1262)">${clienta("s03", "chusma")}</g></g>
          <g class="s03-ojo"><g transform="translate(180 820) scale(0.75)">${ojo("s03")}</g></g>
          <g class="s03-ondas" fill="none" stroke="${C.amarillo}" stroke-width="6" stroke-linecap="round">
            <path class="s03-o1" d="M262 790 Q280 820 262 850" /><path class="s03-o2" d="M286 770 Q314 820 286 870" /><path class="s03-o3" d="M310 750 Q348 820 310 890" />
          </g>
          <g class="s03-polaroid"><g transform="translate(800 960) rotate(8)">
            <rect x="-120" y="-140" width="240" height="280" rx="8" fill="${C.blanco}" class="tinta" />
            <rect x="-100" y="-120" width="200" height="196" fill="${C.sillon}" />
            <clipPath id="s03-clip"><rect x="-100" y="-120" width="200" height="196" /></clipPath>
            <g clip-path="url(#s03-clip)"><g transform="translate(0 150) scale(0.62)">${walter("s03", "defensa")}</g></g>
            <text class="tv" x="0" y="118" font-size="34" fill="${C.tinta}" text-anchor="middle">WALTER</text>
            <circle class="s03-circulo" cx="0" cy="-30" r="112" fill="none" stroke="${C.rosa}" stroke-width="9" />
          </g></g>`,
  js: `
      const NOMINAS = 1.41, PORQUE = 2.32, WALTER = 3.49;
      tl.fromTo(q(".s03-sillon"), { opacity: 0.5, scale: 1.08, svgOrigin: "540 1290" }, { opacity: 1, scale: 1, svgOrigin: "540 1290", duration: 0.45, ease: "power3.out" }, 0);
      tl.fromTo(q(".s03-cli"), { opacity: 0.4, y: 80 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, 0.05);
      tl.fromTo(q(".s03-luz"), { opacity: 0.08 }, { opacity: 0.2, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      pop(q(".s03-ojo"), 0.05);
      pop(q(".s03-cartel"), 0.15);
      etiqueta(0, 0.2);
      // el Hermano habla: ondas del parlante y el iris que mira a la clienta
      ["0", "0.83", "1.41", "2.1"].forEach((t) => {
        qa(".s03-ondas path").forEach((o, i) => tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1 }, Number(t) + i * 0.08));
      });
      tl.fromTo(q(".s03-iris"), { x: -10 }, { x: 14, y: 6, duration: 0.6, ease: "power2.inOut" }, 0.3);
      tl.to(q(".s03-cli"), { rotation: -3, svgOrigin: "540 1262", duration: 0.3, yoyo: true, repeat: 1 }, NOMINAS);
      tl.to(q(".s03-cli-ojos"), { x: 10, duration: 0.2 }, PORQUE);
      gsap.set(q(".s03-polaroid"), { opacity: 0 });
      tl.fromTo(q(".s03-polaroid"), { opacity: 0, y: 200, rotation: 30, svgOrigin: "800 960" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "800 960", duration: 0.4, ease: "back.out(1.4)" }, WALTER - 0.4);
      dibujar(q(".s03-circulo"), WALTER, 0.4);
      etiqueta(1, WALTER);`,
  sfx: [{ t: 0.0, sfx: "estatica", vol: 0.2, max: 0.5 }, { t: 0.1, sfx: "tic", vol: 0.25 }, { t: 3.1, sfx: "whoosh-short", vol: 0.25 }, { t: 3.5, sfx: "drama", vol: 0.32, max: 1.0 }],
});
