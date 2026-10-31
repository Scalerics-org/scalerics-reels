// Arma compositions/<id>.html desde partes/escenas/<id>.html (correr desde reels/manos-a-la-obra).
// Las fuentes usan marcadores para no repetir a mano lo que es igual en todas las escenas:
//   {{estilo}}            fuentes y estilos comunes (prefijados con el id de la escena)
//   {{helpers}}           JS común: root, q, qa, mk, recorte(), tl, pop(), dibujar(), temblor(), etiquetas()
//   {{seno X Y S}}        la Seño Pochi (cuello en X,Y; escala S). Partes: .seno-brazo .seno-boca .seno-ojos
//   {{raul X Y S}}        Raúl. Partes: .raul-brazo .raul-parpado .raul-cabeza .raul-boca
//   {{nena X Y S}}        la nena del público. Partes: .nena-brazo
//   {{paso N X Y}}        estrella amarilla con el número del paso. Clases .paso .paso-num
//   {{mesa}}              la mesa de manualidades (y 1190-1344). Clase .mesa
//   {{salida}}            blur de salida y registro del timeline
// Cada fuente define DUR en <!-- DUR 5.02 --> (primera línea).
import fs from "node:fs";
const pj = (n) => fs.readFileSync(`partes/pj-${n}.svg`, "utf8");
for (const f of fs.readdirSync("partes/escenas").filter((f) => f.endsWith(".html"))) {
  const id = f.replace(".html", "");
  let s = fs.readFileSync(`partes/escenas/${f}`, "utf8");
  const DUR = s.match(/<!-- DUR ([\d.]+) -->/)[1];
  s = s.replace(/<!-- DUR [\d.]+ -->\n?/, "");
  s = s.replaceAll("{{estilo}}", fs.readFileSync("partes/estilo.css", "utf8").replaceAll("__ID__", id));
  s = s.replaceAll("{{helpers}}", fs.readFileSync("partes/helpers.js", "utf8").replaceAll("__ID__", id).replaceAll("__DUR__", DUR));
  s = s.replaceAll("{{salida}}", `tl.to(q(".escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;`);
  s = s.replace(/\{\{(seno|raul|nena) ([-\d.]+) ([-\d.]+) ([-\d.]+)\}\}/g, (_, n, x, y, e) => `<g class="${n}"><g transform="translate(${x} ${y}) scale(${e})">${pj(n)}</g></g>`);
  s = s.replace(/\{\{paso (\d) ([-\d.]+) ([-\d.]+)\}\}/g, (_, n, x, y) => `<g class="paso"><g transform="translate(${x} ${y})">${pj("paso").replace(">N<", `>${n}<`)}</g></g>`);
  s = s.replaceAll("{{mesa}}", `<g class="mesa">\n${pj("mesa")}          </g>`);
  s = s.replaceAll("__DUR__", DUR).replaceAll("__ID__", id);
  fs.writeFileSync(`compositions/${id}.html`, s);
  console.log("escena", id, DUR);
}
