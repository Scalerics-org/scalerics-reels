import { escena, C } from "../escena.mjs";
import { agente, walter, clienta } from "../personajes.mjs";
const corazon = (x, y, s) => `<g class="s12-k"><path transform="translate(${x} ${y}) scale(${s})" d="M0 12 C-30 -10 -24 -40 0 -26 C24 -40 30 -10 0 12 Z" fill="${C.rosa}" stroke="${C.tinta}" stroke-width="3" /></g>`;
escena({
  id: "s12-lo-amo",
  e: ["¿Y este quién es?", "¿Y Walter?", "Walter duerme"],
  svg: `
          <g class="s12-a">
            <g class="s12-c1"><g transform="translate(270 1330) scale(0.9)">${clienta("s12", "chusma")}</g></g>
            <g class="s12-c2"><g transform="translate(270 1330) scale(0.9)">${clienta("s12b", "enamorada")}</g></g>
            <g class="s12-age"><g transform="translate(790 1330) scale(0.9)">${agente("s12")}</g></g>
            <g class="s12-qs"><text class="tv" x="440" y="900" font-size="90" fill="${C.amarillo}">?</text><text class="tv" x="500" y="840" font-size="60" fill="${C.amarillo}">?</text></g>
            <g class="s12-cors">${corazon(150, 900, 1.6)}${corazon(420, 860, 1.2)}${corazon(560, 980, 1.4)}${corazon(120, 1080, 1)}${corazon(470, 1100, 1.1)}${corazon(300, 800, 1)}</g>
          </g>
          <g class="s12-b">
            <ellipse class="s12-almo tinta" cx="540" cy="1100" rx="230" ry="80" fill="${C.blanco}" />
            <g class="s12-w1"><g transform="translate(540 1330)">${walter("s12", "perdido")}</g></g>
            <g class="s12-w2"><g transform="translate(540 1330)">${walter("s12b", "dormido")}
              <path d="M-74 -270 Q0 -282 74 -270 L70 -228 Q0 -238 -70 -228 Z" fill="${C.rosa}" class="tinta" stroke-width="4" />
              <path d="M-40 -252 Q-26 -244 -12 -252 M40 -252 Q26 -244 12 -252" fill="none" stroke="${C.tinta}" stroke-width="4" stroke-linecap="round" />
            </g></g>
            <g class="s12-wq"><text class="tv" x="300" y="960" font-size="96" fill="${C.amarillo}">?</text><text class="tv" x="730" y="920" font-size="76" fill="${C.amarillo}">?</text></g>
            <path class="s12-manta tinta" d="M300 1250 Q540 1170 780 1250 L780 1330 L300 1330 Z" fill="${C.sillon}" />
            <g class="s12-zzz" fill="${C.blanco}"><text class="tv s12-z1" x="650" y="900" font-size="48">z</text><text class="tv s12-z2" x="690" y="840" font-size="62">z</text><text class="tv s12-z3" x="740" y="770" font-size="78">Z</text></g>
            <g class="s12-age2"><g transform="translate(880 1330) scale(0.62)">${agente("s12c")}</g></g>
          </g>`,
  js: `
      const QUIEN = 0.98, AMO = 1.96, YYO = 3.0, USTED = 4.2;
      tl.fromTo(q(".s12-c1"), { opacity: 0.4, x: -120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0);
      tl.fromTo(q(".s12-age"), { opacity: 0.4, x: 120 }, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.3)" }, 0.05);
      gsap.set(qa(".s12-c2, .s12-b, .s12-w2, .s12-manta, .s12-zzz, .s12-age2"), { opacity: 0 });
      etiqueta(0, 0.15);
      tl.fromTo(q(".s12-qs"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, QUIEN);
      tl.to(q(".s12-c1"), { rotation: 4, svgOrigin: "270 1330", duration: 0.25, yoyo: true, repeat: 1 }, QUIEN);
      // ¡lo amo!
      tl.to(q(".s12-qs"), { opacity: 0, duration: 0.15 }, AMO - 0.1);
      tl.to(q(".s12-c1"), { opacity: 0, duration: 0.08 }, AMO);
      tl.to(q(".s12-c2"), { opacity: 1, duration: 0.08 }, AMO);
      tl.to(q(".s12-c2"), { y: -18, duration: 0.18, yoyo: true, repeat: 3 }, AMO + 0.1);
      qa(".s12-k").forEach((k, i) => tl.fromTo(k, { opacity: 0, scale: 0.2, y: 40, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: -30, duration: 0.6, ease: "back.out(2)" }, AMO + i * 0.06));
      tl.to(q(".s12-age-boca"), { scaleY: 1.6, svgOrigin: "0 -209", duration: 0.2, yoyo: true, repeat: 1 }, AMO + 0.2);
      // ¿y yo qué hago?
      tl.to(q(".s12-a"), { opacity: 0, filter: "blur(6px)", duration: 0.25 }, YYO - 0.35);
      tl.set(q(".s12-b"), { opacity: 1 }, YYO - 0.2);
      tl.fromTo(q(".s12-w1"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }, YYO - 0.2);
      tl.fromTo(q(".s12-almo"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, YYO - 0.2);
      tl.fromTo(q(".s12-wq"), { opacity: 0, scale: 0.4, svgOrigin: "540 920" }, { opacity: 1, scale: 1, svgOrigin: "540 920", duration: 0.3, ease: "back.out(2)" }, YYO + 0.2);
      etiqueta(1, YYO);
      // usted duerma, jefe
      tl.to(q(".s12-wq"), { opacity: 0, duration: 0.2 }, USTED - 0.1);
      tl.to(q(".s12-w1"), { opacity: 0, duration: 0.1 }, USTED + 0.2);
      tl.to(q(".s12-w2"), { opacity: 1, duration: 0.1 }, USTED + 0.2);
      tl.fromTo(q(".s12-manta"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, USTED + 0.1);
      tl.fromTo(q(".s12-age2"), { opacity: 0, x: 160 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(1.4)" }, USTED - 0.15);
      tl.set(q(".s12-zzz"), { opacity: 1 }, USTED + 0.4);
      [".s12-z1", ".s12-z2", ".s12-z3"].forEach((s, i) => tl.fromTo(q(s), { opacity: 0, y: 20 }, { opacity: 0.9, y: -10, duration: 0.5, ease: "sine.out" }, USTED + 0.4 + i * 0.22));
      etiqueta(2, USTED + 0.2);`,
  sfx: [{ t: 0.9, sfx: "pop", vol: 0.22 }, { t: 1.95, sfx: "sparkle", vol: 0.3 }, { t: 2.0, sfx: "murmullo", vol: 0.25, max: 1.0 }, { t: 2.9, sfx: "whoosh-short", vol: 0.25 }, { t: 3.2, sfx: "tic", vol: 0.25 }, { t: 4.4, sfx: "campanita", vol: 0.25 }],
});
