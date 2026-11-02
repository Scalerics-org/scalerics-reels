// VELOCÍMETRO de WhatsApp: arco de LENTO (izq) a AL DÍA (der), aguja P-aguja (rota con svgOrigin "0 0";
// rotation -80 = LENTO, 80 = AL DÍA). Centrado en 0,0, radio r.
export function velo(P, { r = 190, verde = false } = {}) {
  let marcas = "";
  for (let i = 0; i <= 8; i++) {
    const a = ((-80 + i * 20) * Math.PI) / 180;
    marcas += `<path d="M${(Math.sin(a) * r * 0.78).toFixed(1)} ${(-Math.cos(a) * r * 0.78).toFixed(1)} L${(Math.sin(a) * r * 0.92).toFixed(1)} ${(-Math.cos(a) * r * 0.92).toFixed(1)}" stroke="#efeadf" stroke-width="${i % 2 ? 4 : 8}" stroke-linecap="round" />`;
  }
  const arco = (a0, a1, col) => {
    const p = (a) => [(Math.sin((a * Math.PI) / 180) * r).toFixed(1), (-Math.cos((a * Math.PI) / 180) * r).toFixed(1)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `<path d="M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}" fill="none" stroke="${col}" stroke-width="22" />`;
  };
  return `
      <path d="M${-r - 30} 40 A${r + 30} ${r + 30} 0 1 1 ${r + 30} 40 Z" fill="#0b1020" stroke="#efeadf" stroke-width="6" />
      ${arco(-80, -30, "#ff3b4a")}${arco(-30, 30, "#ffc23a")}${arco(30, 80, verde ? "#5ce611" : "#3d7bff")}
      ${marcas}
      <text x="${-r * 0.55}" y="${r * 0.05 + 10}" text-anchor="middle" class="slex" font-size="30" fill="#ff3b4a">LENTO</text>
      <text x="${r * 0.55}" y="${r * 0.05 + 10}" text-anchor="middle" class="slex" font-size="30" fill="${verde ? "#5ce611" : "#3d7bff"}">AL DÍA</text>
      <text x="0" y="${-r * 0.35}" text-anchor="middle" class="mono" font-size="22" letter-spacing="3" fill="#9aa3b8">RESPUESTAS</text>
      <g class="${P}-aguja" transform="rotate(0)"><path d="M0 0 L0 ${-r * 0.82}" stroke="#ff8a1f" stroke-width="10" stroke-linecap="round" /></g>
      <circle cx="0" cy="0" r="22" fill="#efeadf" />`;
}
