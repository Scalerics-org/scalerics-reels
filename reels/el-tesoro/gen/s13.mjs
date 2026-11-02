import { escena, sfx, duraciones, C, rosa, pergamino } from "./comun.mjs";
const id = "s13-cta", dur = duraciones()[id];
const casas = [[190, 820], [400, 830], [740, 820], [190, 1100], [400, 1100], [760, 1110], [870, 820]].map(([x, y]) => `<path class="tinta" fill="${C.perg2}" d="M${x} ${y} h60 v-44 l-30 -24 l-30 24 Z" />`).join("");
const puntos = [[300, 760], [620, 900], [880, 1000], [280, 1040], [560, 1200]];
escena({ id, dur,
  css: `
    & .XX-tit { position: absolute; left: 0; right: 0; top: 625px; text-align: center; font-family: "Cinzel", serif; font-weight: 900; font-size: 64px; color: ${C.tinta}; }
    & .XX-preg { position: absolute; font-family: "Cinzel", serif; font-weight: 900; font-size: 84px; color: ${C.oro}; -webkit-text-stroke: 7px ${C.tinta}; paint-order: stroke fill; }
    & .XX-globo { position: absolute; left: 150px; top: 1350px; width: 780px; padding: 22px 0 18px; text-align: center; background: #fff8e6; border: 6px solid ${C.tinta}; border-radius: 44px; box-shadow: 8px 10px 0 ${C.tinta}; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; color: ${C.tinta}; }
    & .XX-globo::after { content: ""; position: absolute; left: 110px; bottom: -40px; border: 20px solid transparent; border-top: 24px solid ${C.tinta}; }
    & .XX-lehacemos { position: absolute; left: 0; right: 0; top: 1260px; text-align: center; font-size: 60px; color: ${C.rojo}; }
  `,
  body: `
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="XX-mapa">
            ${pergamino("XX-papel", 90, 600, 900, 720)}
            <path fill="none" stroke="${C.perg2}" stroke-width="56" d="M90 900 H990 M90 1170 H990 M330 700 V1320 M680 700 V1320" />
            <path fill="none" stroke="${C.mar}" stroke-width="6" opacity="0.5" d="M120 1270 q30 -14 60 0 t60 0 M840 1270 q30 -14 60 0 t60 0" />
            ${casas}
            <g transform="translate(900 1220) scale(0.42)">${rosa("XX")}</g>
            <g class="XX-xs">${puntos.map(([x, y]) => `<path fill="none" stroke="${C.rojo}" stroke-width="16" stroke-linecap="round" d="M${x - 30} ${y - 30} L${x + 30} ${y + 30} M${x + 30} ${y - 30} L${x - 30} ${y + 30}" />`).join("")}</g>
          </g>
        </svg>
        <div class="XX-tit">TU BARRIO</div>
        ${puntos.map(([x, y]) => `<div class="XX-preg" style="left:${x - 26}px; top:${y - 52}px">?</div>`).join("")}
        <div class="XX-lehacemos mano">le hacemos el mapa</div>
        <div class="XX-globo">Dejalo en los comentarios</div>
  `,
  js: `
const TESORO = 0.34, ESCONDIDO = 0.59, BARRIO = 1.27, DEJALO = 1.91, COMENT = 2.28, LE = 3.09, MAPA = 3.56;
// cuadro 0: el mapa del barrio se despliega
tl.fromTo(q(".XX-mapa"), { scaleY: 0.5, opacity: 0.8, transformOrigin: "50% 50%" }, { scaleY: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "power3.out" }, 0);
tl.fromTo(q(".XX-escenario"), { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
pop(q(".XX-tit"), 0.15, 0.7);
// "tesoro escondido": signos de pregunta por todo el barrio
qa(".XX-preg").forEach((p, i) => {
  pop(p, ESCONDIDO + i * 0.12, 0.2);
  tl.to(p, { y: -14, rotation: 8, duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, ESCONDIDO + 0.4 + i * 0.1);
});
tl.to(q(".XX-tit"), { scale: 1.1, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, BARRIO);
// "dejalo en los comentarios"
gsap.set(q(".XX-globo"), { opacity: 0 });
tl.fromTo(q(".XX-globo"), { opacity: 0, y: 80, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, DEJALO - 0.1);
tl.to(q(".XX-globo"), { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, COMENT + 0.1);
// "le hacemos el mapa": cada pregunta se vuelve una X roja
gsap.set(qa(".XX-xs path"), { opacity: 0 });
qa(".XX-preg").forEach((p, i) => {
  const t = LE + i * 0.14;
  tl.to(p, { opacity: 0, scale: 0.3, duration: 0.15 }, t);
  tl.fromTo(qa(".XX-xs path")[i], { opacity: 1, scale: 2.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.16, ease: "power4.in", immediateRender: false }, t + 0.05);
});
golpe(MAPA + 0.1, 10);
pop(q(".XX-lehacemos"), MAPA - 0.2, 0.5);
tl.to(qa(".XX-xs path"), { scale: 1.12, transformOrigin: "50% 50%", duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut", stagger: 0.08 }, MAPA + 0.6);
`,
});
sfx(id, [{ t: 0.05, sfx: "whoosh", vol: 0.25 }, { t: 0.6, sfx: "sparkle", vol: 0.3 }, { t: 1.85, sfx: "notification", vol: 0.3 }, { t: 3.1, sfx: "pop", vol: 0.3 }, { t: 3.4, sfx: "pop", vol: 0.3 }, { t: 3.6, sfx: "impact-bass-1", vol: 0.35, max: 0.6 }]);
