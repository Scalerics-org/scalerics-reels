export default {
  css: `.s07-hoja { left: 170px; top: 600px; width: 740px; height: 720px; }`,
  html: ``,
  pre: `let reng = "";
for (let k = 0; k < 11; k++) reng += \`<path d="M190 \${700 + k * 58} L890 \${700 + k * 58}" stroke="#9bb3d6" stroke-width="3"/>\`;
let espiral = "";
for (let k = 0; k < 10; k++) espiral += \`<ellipse cx="\${230 + k * 68}" cy="610" rx="12" ry="26" fill="none" stroke="\${OR.BRON2}" stroke-width="7"/>\`;`,
  svg: "`<g class=\"s07-pagina\"><rect x=\"170\" y=\"610\" width=\"740\" height=\"720\" rx=\"10\" fill=\"${OR.CREMA}\" stroke=\"${OR.INK}\" stroke-width=\"8\"/>${reng}<path d=\"M270 620 L270 1320\" stroke=\"${OR.ROJO}\" stroke-width=\"3\" opacity=\"0.6\"/>${espiral}" +
    "<text x=\"300\" y=\"750\" font-family=\"Caveat\" font-weight=\"700\" font-size=\"54\" fill=\"${OR.AZUL2}\">Stock yerba:</text>" +
    "<text class=\"s07-veinte\" x=\"360\" y=\"1060\" font-family=\"Caveat\" font-weight=\"700\" font-size=\"300\" fill=\"${OR.AZUL2}\">20</text>" +
    "<text class=\"s07-creo\" x=\"700\" y=\"1000\" font-family=\"Caveat\" font-weight=\"700\" font-size=\"150\" fill=\"${OR.ROJO}\">?</text>" +
    "<text class=\"s07-tachon\" x=\"300\" y=\"1230\" font-family=\"Caveat\" font-weight=\"700\" font-size=\"60\" fill=\"${OR.AZUL2}\">(o 26... o 28)</text>" +
    "<g class=\"s07-mancha\"><circle cx=\"470\" cy=\"930\" r=\"150\" fill=\"none\" stroke=\"${OR.CAFE}\" stroke-width=\"34\" opacity=\"0.6\"/><circle cx=\"470\" cy=\"930\" r=\"120\" fill=\"${OR.CAFE}\" opacity=\"0.32\"/><circle cx=\"660\" cy=\"800\" r=\"18\" fill=\"${OR.CAFE}\" opacity=\"0.55\"/><circle cx=\"300\" cy=\"1100\" r=\"12\" fill=\"${OR.CAFE}\" opacity=\"0.55\"/><circle cx=\"640\" cy=\"1090\" r=\"9\" fill=\"${OR.CAFE}\" opacity=\"0.55\"/></g></g>` + OR.cuaderno(860, 1500, 0.5, { num: '' })",
  anim: `const ANOTE = 0.53, VEINTE = 1.05, CREO = 1.58, MANCHA = 2.68, CAFE = 3.04;
// cuadro 0: primer plano de la página del cuaderno
tl.fromTo(q(".s07-pagina"), { scale: 0.92, svgOrigin: "540 960" }, { scale: 1, svgOrigin: "540 960", duration: 0.5, ease: "power2.out" }, 0);
tl.fromTo(q(".or-c"), { y: 60 }, { y: 0, duration: 0.35, ease: "back.out(2)" }, 0.1);
K.hablar(q(".or-c-boca"), 0.05, 4, 0.1);
gsap.set(q(".s07-veinte"), { opacity: 0 });
tl.fromTo(q(".s07-veinte"), { opacity: 0, scale: 1.5, svgOrigin: "520 960" }, { opacity: 1, scale: 1, svgOrigin: "520 960", duration: 0.25, ease: "back.out(2)", immediateRender: false }, VEINTE - 0.1);
// "creo": signo de pregunta y el número tiembla
gsap.set(q(".s07-creo"), { opacity: 0 });
K.popSvg(q(".s07-creo"), CREO, "740 950");
tl.to(q(".s07-veinte"), { rotation: -6, svgOrigin: "520 960", duration: 0.1, yoyo: true, repeat: 5 }, CREO);
gsap.set(q(".s07-tachon"), { opacity: 0 });
K.pop(q(".s07-tachon"), CREO + 0.5);
// "mancha de café": la taza cae arriba del número
gsap.set(q(".s07-mancha"), { opacity: 0 });
tl.fromTo(q(".s07-mancha"), { opacity: 0, scale: 0.2, svgOrigin: "470 930" }, { opacity: 1, scale: 1, svgOrigin: "470 930", duration: 0.25, ease: "back.out(2.5)", immediateRender: false }, MANCHA);
tl.to(q(".s07-veinte"), { opacity: 0.45, filter: "blur(3px)", duration: 0.3 }, CAFE);
tl.to(q(".or-c-cejas"), { y: 10, duration: 0.15 }, MANCHA);`,
  sfx: [{ t: 1.0, sfx: "golpe", vol: 0.3 }, { t: 1.55, sfx: "chirrido", vol: 0.3 }, { t: 2.65, sfx: "splash", vol: 0.3 }, { t: 3.0, sfx: "pop", vol: 0.2 }],
};
