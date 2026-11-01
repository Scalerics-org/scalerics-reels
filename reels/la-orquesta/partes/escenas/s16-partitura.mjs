export default {
  css: ``,
  html: ``,
  pre: `const PAUT = ["STOCK", "PEDIDOS", "PROVEEDORES", "CAJA", "LOCALES"];
let pent = "";
PAUT.forEach((n, k) => {
  const y = 690 + k * 122;
  let l = "";
  for (let j = 0; j < 5; j++) l += \`<path class="s16-l" d="M425 \${y + j * 14} L950 \${y + j * 14}" stroke="\${OR.INK}" stroke-width="3"/>\`;
  let ns = "";
  [475, 585, 695, 805, 905].forEach((x, i) => { ns += \`<ellipse cx="\${x}" cy="\${y + 42 - ((i + k) % 3) * 14}" rx="15" ry="11" transform="rotate(-22 \${x} \${y + 42 - ((i + k) % 3) * 14})" fill="\${OR.VERDE}" stroke="\${OR.INK}" stroke-width="4"/><path d="M\${x + 13} \${y + 38 - ((i + k) % 3) * 14} l0 -56" stroke="\${OR.INK}" stroke-width="5"/>\`; });
  pent += \`<g class="s16-p s16-p\${k}"><text x="122" y="\${y + 40}" font-family="Cinzel" font-weight="800" font-size="30" fill="\${OR.INK}">\${n}</text>\${l}<g class="s16-ns">\${ns}</g></g>\`;
});
let barras = "";
[530, 640, 750, 855].forEach((x) => { barras += \`<path d="M\${x} 680 L\${x} 1258" stroke="\${OR.VERDE}" stroke-width="6" stroke-linecap="round"/>\`; });`,
  svg: "`<g class=\"s16-hoja\"><rect x=\"100\" y=\"610\" width=\"880\" height=\"700\" rx=\"8\" fill=\"${OR.CREMA}\" stroke=\"${OR.BRON}\" stroke-width=\"8\"/><text x=\"540\" y=\"660\" text-anchor=\"middle\" font-family=\"Cinzel\" font-weight=\"800\" font-size=\"30\" fill=\"${OR.AZUL2}\">TU NEGOCIO · UNA SOLA PARTITURA</text>${pent}<g class=\"s16-barras\">${barras}</g><path class=\"s16-llave\" d=\"M420 690 C402 690 410 960 398 975 C410 990 402 1258 420 1258\" fill=\"none\" stroke=\"${OR.VERDE}\" stroke-width=\"10\" stroke-linecap=\"round\"/></g>`",
  anim: `const T = [0.0, 0.63, 1.27, 2.13, 3.01], SOLA = 4.01, PARTITURA = 4.26;
// cuadro 0: la hoja grande ya está; cada pentagrama entra en la palabra que lo nombra
tl.fromTo(q(".s16-hoja"), { scale: 0.94, svgOrigin: "540 960" }, { scale: 1, svgOrigin: "540 960", duration: 0.5, ease: "power2.out" }, 0);
T.forEach((t, k) => {
  const g = q(".s16-p" + k);
  gsap.set(g, { opacity: 0 });
  tl.fromTo(g, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, Math.max(0.01, t - 0.1));
  g.querySelectorAll(".s16-l").forEach((p, j) => K.dibujar(p, Math.max(0.01, t - 0.1) + j * 0.03, 0.4));
});
// "una sola partitura": llave, barras de compás alineadas en verde, todo late junto
K.dibujar(q(".s16-llave"), SOLA - 0.1, 0.4);
qa(".s16-barras path").forEach((p, i) => K.dibujar(p, SOLA + i * 0.06, 0.3));
tl.fromTo(q(".s16-hoja"), { scale: 1 }, { scale: 1.03, svgOrigin: "540 960", duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, PARTITURA);
tl.fromTo(qa(".s16-ns"), { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, PARTITURA);`,
  sfx: [{ t: 0.0, sfx: "pop", vol: 0.2 }, { t: 0.63, sfx: "pop", vol: 0.2 }, { t: 1.27, sfx: "pop", vol: 0.2 }, { t: 2.13, sfx: "pop", vol: 0.2 }, { t: 3.01, sfx: "pop", vol: 0.2 }, { t: 4.0, sfx: "acorde", vol: 0.4 }],
};
