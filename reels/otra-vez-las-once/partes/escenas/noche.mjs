// Cartel de capítulo: "NOCHE" chico + número gigante rojo de 7 segmentos que entra de golpe.
import { seg7, ancho7 } from "./pj.mjs";
export function nocheHTML(P, n, { top = 640, escala = 1.6 } = {}) {
  const w = ancho7(String(n)) * escala;
  return `
        <div class="noche ${P}-noche-t" style="top:${top}px">NOCHE</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true"><g class="${P}-num"><g transform="translate(${540 - w / 2} ${top + 80}) scale(${escala})" style="filter: drop-shadow(0 0 22px #ff2d2d)">${seg7(P + "-n", String(n), { apagado: 0.07 })}</g></g></svg>`;
}
// JS: entra con golpe y, en t, sube y se achica a la esquina (o se va)
export function nocheJS(P, sale, { y = -330, s = 0.42, t0 = 0 } = {}) {
  return `
      tl.fromTo(q(".${P}-num"), { opacity: 0.3, scale: 1.5, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, svgOrigin: "540 1000", duration: 0.18, ease: "power4.out", immediateRender: false }, ${t0});
      gsap.set(q(".${P}-num"), { opacity: ${t0 ? 0 : 1} });
      gsap.set(q(".${P}-noche-t"), { opacity: ${t0 ? 0 : 1} });
      tl.fromTo(q(".${P}-noche-t"), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.2, immediateRender: false }, ${t0} + 0.02);
      sacudon(${t0} + 0.05, 1.3);
      tl.to(q(".${P}-num"), { opacity: 0, scale: ${s}, y: ${y}, svgOrigin: "540 1000", duration: 0.3, ease: "power3.in" }, ${sale});
      tl.to(q(".${P}-noche-t"), { opacity: 0, duration: 0.2 }, ${sale});`;
}
