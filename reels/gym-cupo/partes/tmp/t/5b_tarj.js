
// =====================================================================================================
// LAS TARJETAS DE ESTE REEL
// =====================================================================================================
const chip = (txt, px = 60, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo, borde: fondo === "#16243d" ? C.cr : C.navy }); };
// el micrófono (iconito navy) a la izquierda de las burbujas de Mauro por la vincha
function microfono(x, cx, cy, s) {
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(cx - 14 * s, cy - 40 * s, 28 * s, 50 * s, 14 * s); x.fill();
  x.strokeStyle = "#0b1220"; x.lineWidth = 7 * s; x.lineCap = "round"; x.beginPath(); x.arc(cx, cy - 6 * s, 24 * s, 0.1, Math.PI - 0.1); x.stroke();
  x.beginPath(); x.moveTo(cx, cy + 18 * s); x.lineTo(cx, cy + 36 * s); x.stroke(); x.beginPath(); x.moveTo(cx - 16 * s, cy + 38 * s); x.lineTo(cx + 16 * s, cy + 38 * s); x.stroke();
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx, cy - 26 * s, 6 * s, 0, 7); x.fill();
}
// globo que se revela por frase entera (cada renglón es una frase); mic: con el iconito del micrófono a la izquierda
function crearGloboF(lineas, px = 70, mic = false) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const izq = mic ? px * 1.15 : 0;
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.1 + izq), H = Math.round(lineas.length * px * 1.22 + px * 0.72);
  const dib = (n) => (x, w, h) => { if (mic) microfono(x, px * 0.75, h / 2 + 4, px / 62); lineas.forEach((l, i) => { if (i < n) textoSel(x, l, izq / 2 + w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px); }); };
  const g = crearTarjeta(Wg, H, dib(lineas.length));
  g.userData.dib = dib; g.userData.verL = lineas.length;
  return g;
}
function verLineas(g, n) { if (g.userData.verL === n) return; g.userData.verL = n; redibujar(g, g.userData.dib(n)); }
// el contador de la parte 1 (YO VOY / BICIS / VINIERON) y el de la parte 2 (RESERVAS / VINIERON)
function dibujarContador(x, W, H, e) {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  e.filas.forEach(([et, n, color], i) => {
    const y = 58 + i * 92;
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, et.length > 7 ? 42 : 50); x.fillText(et, 26, y);
    x.fillStyle = color; x.textAlign = "right"; x.font = F(900, 78); x.fillText(String(n), W - 28, y + 2);
    if (i < e.filas.length - 1) { x.fillStyle = "#2c4268"; x.fillRect(24, y + 44, W - 48, 4); }
  });
}
const CONTADORES = { 2: crearTarjeta(430, 206, (x, W, H) => dibujarContador(x, W, H, { filas: [] }), { fondo: "#0b1220", borde: C.cr }), 3: crearTarjeta(430, 298, (x, W, H) => dibujarContador(x, W, H, { filas: [] }), { fondo: "#0b1220", borde: C.cr }) };
const cCont = {};
// arriba: cy es el borde de arriba de la tarjeta (crece hacia abajo cuando aparece la tercera fila)
function ponerContador(filas, cx, top, s, pop = 0) {
  const g = CONTADORES[filas.length], k = JSON.stringify(filas); if (k !== cCont[filas.length]) { cCont[filas.length] = k; redibujar(g, (x, W, H) => dibujarContador(x, W, H, { filas })); }
  ponerGlobo(g, cx, top + g.userData.H / 2, s * (1 + 0.08 * pop), null, 1);
}
// la notificación (Rodri, 19:04)
function crearNoti(nombre, lineas, px = 54) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const W = Math.round(Math.max(...lineas.map((l) => med.measureText(l).width)) + px * 1.4 + 20), H = Math.round(lineas.length * px * 1.25 + px * 1.9);
  return crearTarjeta(W, H, (x, w, h) => {
    x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#3fa60a"; rr(x, px * 0.5, px * 0.38, px * 0.9, px * 0.9, px * 0.45);
    x.fillStyle = "#0b1220"; x.font = F(900, px * 0.5); x.textAlign = "center"; x.fillText("S", px * 0.95, px * 0.85);
    x.textAlign = "left"; x.fillStyle = "#3f5270"; x.font = F(800, px * 0.66); x.fillText(nombre, px * 1.65, px * 0.86);
    x.fillStyle = "#0b1220"; x.font = F(800, px); lineas.forEach((l, i) => x.fillText(l, px * 0.6, px * 1.75 + i * px * 1.25 + px * 0.25));
  });
}
const ROJO_CLARO = "#ff9d92";
const GL = {
  c1820: chip("Martes, 18:20."), c1900: chip("Martes, 19:00."), c1904: chip("19:04.", 64), c2130: chip("Lunes, 21:30."), c1500: chip("Martes, 15:00."), cNov: chip("Noviembre."),
  m1: crearGloboF(["Veintidós «yo voy».", "Hoy [explota.]"], 66), m1a: crearGloboF(["Veintidós «yo voy»."], 66),
  j1: crearGloboF(["Mauro, ¿hay lugar", "a las [siete?]"], 62),
  m3: crearGloboF(["Los «yo voy»", "no [pedalean.]"], 74, true), m3a: crearGloboF(["Los «yo voy»…"], 74, true),
  rLlena: crearRotulo([["A dos les dijo «llena»", ROJO_CLARO, 56]], 56),
  r5: crearRotulo([["5 bicis vacías", ROJO_CLARO, 64]], 64),
  rCosto: crearRotulo([["Majo y Sole se anotaron", null, 58], ["en otro lado", null, 58], ["2 alumnas menos", ROJO_CLARO, 76], ["$ 3.800 por mes", ROJO_CLARO, 92]], 58),
  rPerch: crearRotulo([["Bici 2: perchero", ROJO_CLARO, 64]], 64),
  rMajo: crearRotulo([["Majo · 7"]], 58), rSole: crearRotulo([["Sole · 4"]], 58),
  c1855: chip("Martes, 18:55."),
  rodri: crearNoti("SPINNING MARTES 19", ["Nico: ¿Ya empezó?", "Yo voy."], 60),
  j2: crearGloboF(["¿Quedan tres?", "¡La [siete!]"], 74), j2a: crearGloboF(["¿Quedan tres?"], 74),
  rCupo: crearRotulo([["Cupo real: 14 bicis"]], 54),
  rEspera: crearRotulo([["Sole: 1ª en la lista de espera"]], 54),
  rRecuerda: crearRotulo([["Recordatorio el mismo día"]], 52),
  rLibera: crearRotulo([["Se libera sola y le"], ["avisa a la siguiente"]], 54),
  otraVez: chip("Ocupada otra vez en 3 minutos", 54, "#5ce611", "#0b1220"),
  m4: crearGloboF(["Catorce reservas.", "Pedalean [catorce.]"], 66, true), m4a: crearGloboF(["Catorce reservas."], 66, true),
  g1: crearGloboF(["Profe, ¿y ahora la", "toalla dónde la [cuelgo?]"], 62),
  m5: crearGloboF(["En el cuello, [Graciela.]"], 66, true),
  rPanel: crearRotulo([["Panel de ocupación"]], 54),
};
const GUIAS = [crearGuia(), crearGuia()];
// la lupa del celular de Mauro (cuadro 0): el grupo que sube, grande, con la cola hacia el celular
const LUPA = crearTarjeta(480, 820, () => {}, { fondo: "#e9e6da" });
let cLupa = "";
function ponerLupa(t, cx, cy, s, objetivo) { const l = msgsP1(t), k = `${l.length}`; if (k !== cLupa) { cLupa = k; redibujar(LUPA, (x, W, H) => dibujarChat(x, W, H, l, 0.86, "38 participantes", 0.72)); } ponerGlobo(LUPA, cx, cy, s, objetivo, 1); }
