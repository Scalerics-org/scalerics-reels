import { escena, C } from "../escena.mjs";
import { walter } from "../personajes.mjs";
escena({
  id: "s14-cta",
  e: ["¿Lo salvás o lo eliminás?", "Votá en los comentarios"],
  svg: `
          <g class="s14-foto"><g transform="translate(540 800) rotate(-3)">
            <rect x="-150" y="-180" width="300" height="350" rx="10" fill="${C.blanco}" class="tinta" />
            <rect x="-128" y="-158" width="256" height="250" fill="${C.sillon}" />
            <clipPath id="s14-clip"><rect x="-128" y="-158" width="256" height="250" /></clipPath>
            <g clip-path="url(#s14-clip)"><g transform="translate(0 150) scale(0.8)">${walter("s14", "perdido")}</g></g>
            <text class="tv" x="0" y="140" font-size="40" fill="${C.tinta}" text-anchor="middle">WALTER</text>
          </g></g>
          <g class="s14-sello"><g transform="translate(670 640) rotate(12) scale(0.8)">
            <rect x="-150" y="-40" width="300" height="80" rx="10" fill="none" stroke="${C.rosa}" stroke-width="8" />
            <text class="tv" x="0" y="18" font-size="48" fill="${C.rosa}" text-anchor="middle">NOMINADO</text>
          </g></g>
          <g class="s14-salvar"><g transform="translate(300 1090)">
            <rect x="-200" y="-60" width="400" height="120" rx="60" fill="${C.amarillo}" class="tinta" stroke-width="7" />
            <path d="M-160 0 l20 20 l36 -40" fill="none" stroke="${C.tinta}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
            <text class="tv" x="36" y="17" font-size="46" fill="${C.tinta}" text-anchor="middle">SALVAR</text>
          </g></g>
          <g class="s14-eliminar"><g transform="translate(780 1090)">
            <rect x="-200" y="-60" width="400" height="120" rx="60" fill="${C.rosa}" class="tinta" stroke-width="7" />
            <path d="M-168 -18 l32 32 M-136 -18 l-32 32" fill="none" stroke="${C.blanco}" stroke-width="12" stroke-linecap="round" />
            <text class="tv" x="36" y="17" font-size="46" fill="${C.blanco}" text-anchor="middle">ELIMINAR</text>
          </g></g>
          <g class="s14-coment"><g transform="translate(540 1250)">
            <path d="M-330 -44 H330 Q350 -44 350 -24 V24 Q350 44 330 44 H-250 L-290 70 L-284 44 H-330 Q-350 44 -350 24 V-24 Q-350 -44 -330 -44 Z" fill="${C.blanco}" class="tinta" stroke-width="5" />
            <text class="lex s14-txt" x="-300" y="12" font-size="34" fill="${C.sillon}">Votá en los comentarios</text>
            <rect class="s14-cursor" x="130" y="-20" width="5" height="40" fill="${C.tinta}" />
          </g></g>`,
  js: `
      const SALVAS = 0.17, ELIMINAS = 1.16, VOTA = 1.69;
      tl.fromTo(q(".s14-foto"), { opacity: 0.4, scale: 0.8, svgOrigin: "540 800" }, { opacity: 1, scale: 1, svgOrigin: "540 800", duration: 0.4, ease: "back.out(1.6)" }, 0);
      gsap.set(q(".s14-sello"), { opacity: 0 });
      tl.fromTo(q(".s14-sello"), { opacity: 0, scale: 2.2, svgOrigin: "670 640" }, { opacity: 1, scale: 1, svgOrigin: "670 640", duration: 0.2, ease: "power4.in" }, 0.25);
      etiqueta(0, 0.1);
      tl.fromTo(q(".s14-salvar"), { opacity: 0, x: -300 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)" }, SALVAS - 0.1);
      tl.fromTo(q(".s14-eliminar"), { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.5)" }, ELIMINAS - 0.25);
      tl.to(q(".s14-salvar"), { scale: 1.08, svgOrigin: "300 1090", duration: 0.2, yoyo: true, repeat: 1 }, SALVAS + 0.25);
      tl.to(q(".s14-eliminar"), { scale: 1.08, svgOrigin: "780 1090", duration: 0.2, yoyo: true, repeat: 1 }, ELIMINAS + 0.1);
      tl.fromTo(q(".s14-coment"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)" }, VOTA - 0.15);
      tl.fromTo(q(".s14-cursor"), { opacity: 1 }, { opacity: 0, duration: 0.4, ease: "steps(1)", yoyo: true, repeat: Math.floor((DUR - VOTA - 0.6) / 0.4) }, VOTA + 0.2);
      etiqueta(1, VOTA);
      // se queda latiendo hasta el final: el voto en suspenso
      for (let t = 3.2, k = 0; t < DUR - 0.6; t += 0.9, k++) {
        const s = k % 2 ? ".s14-eliminar" : ".s14-salvar";
        tl.to(q(s), { scale: 1.06, svgOrigin: k % 2 ? "780 1090" : "300 1090", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
      }
      tl.to(q(".s14-foto"), { rotation: 3, svgOrigin: "540 800", duration: 1.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, 1.0);`,
  sfx: [{ t: 0.05, sfx: "drama", vol: 0.3, max: 1.0 }, { t: 0.15, sfx: "pop", vol: 0.25 }, { t: 1.0, sfx: "pop", vol: 0.25 }, { t: 1.6, sfx: "notification", vol: 0.3 }, { t: 2.9, sfx: "murmullo", vol: 0.2, max: 2.0 }],
});
