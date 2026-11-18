
// REGLA DE BURBUJAS: la burbuja va arriba del que habla y la cola apunta a su BOCA (corta, no llega a la cara). Si no
// entra (o el que habla queda cortado), se anota en AVISOS (prev.mjs lo imprime).
const AVISOS = [];
let PROY = null;   // en la pantalla partida: la cámara y la mitad (0 arriba, 1 abajo) con que se proyecta
function enPantallaCam(v, cam, mitad) { _v.copy(v).project(cam); return [(_v.x + 1) * 540, mitad * 960 + (1 - _v.y) * 480]; }
const aPx = (v) => (PROY ? enPantallaCam(v, PROY[0], PROY[1]) : enPantalla(v));
const bocaW = (per) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, 0.15, 0.3)); };
const coronillaPx = (per) => { per.raiz.updateMatrixWorld(true); return aPx(per.cabeza.localToWorld(V3(0, 0.62, 0))); };
function hablar(g, per, s, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) {
  const [hx, hy] = coronillaPx(per), [mx, my] = aPx(bocaW(per));
  const { H } = g.userData;
  let cy = hy - sobre - H / 2;
  if (cy - H / 2 < minY - 10) AVISOS.push(`burbuja de ${per.cfg.nombre} no entra: arriba en ${Math.round(cy - H / 2)} px`);
  cy = cl(cy, H / 2 + minY, maxY - H / 2);
  if (mx < 70 || mx > 1010 || hy < 0 || my > 1850) AVISOS.push(`${per.cfg.nombre} cortado/afuera mientras habla: boca ${Math.round(mx)},${Math.round(my)}`);
  ponerGlobo(g, hx + dx, cy, s, [mx, my], orden);
}
const GL = {
  pa1: crearGlobo(["Rubén, estás en {rojo.}", "Y hoy pagás [sueldos.]"], 66),
  r1: crearGlobo(["Tranquila. La calle", "me debe [un millón.]"], 68),
  r2: crearGlobo(["Graciela, querida…", "te llamaba por lo", "de la factura…"], 58),
  g1: crearGlobo(["¡Rubén! Justo.", "Mandame [veinte cajas.]"], 62),
  r3: crearGlobo(["…Dale."], 76),
  pa2: crearGlobo(["¿Y? ¿[Cobraste?]"], 84),
  r4: crearGlobo(["Mejor.", "Ahora me deben {más.}"], 80),
  pa3: crearGlobo(["Te paso con", "{cobranzas.}"], 76),
  g2: crearGlobo(["¿\"Por favor\"?", "Esto no lo escribió", "[Rubén.]"], 64),
  n1: crearGlobo(["Beto. [Hoy paso.]"], 74),
  g3: crearGlobo(["¡Rubén! [Ya te pagué.]", "Mandame veinte cajas."], 58),
  r5: crearGlobo(["Dale."], 76),
  pa2b: crearGlobo(["¿Y? ¿[Cobraste?]"], 84),
  r6: crearGlobo(["Mejor.", "[Cobré y vendí.]"], 80),
  pa4: crearGlobo(["Te paso con", "[inversiones.]"], 76),
};
const ROT_ = {
  deben: crearRotulo([["Te deben", null, 44], ["$ 1.012.000 · 38 clientes", null, 50]], 44),
  va94: crearRotulo([["Factura a 30 días:", null, 44], ["va por 94", "#d9786d", 64]], 44),
  recordatorio: crearRotulo([["Recordatorio automático", null, 46], ["cuando vence", "#5ce611", 56]], 46),
  solo: crearRotulo([["El pago", null, 48], ["se marca solo", "#5ce611", 58]], 48),
  visitar: crearRotulo([["El vendedor sabe", null, 46], ["a quién visitar", "#5ce611", 56]], 46),
};
const GUIAS = [crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt. "split" = pantalla partida.
const FRENTE_R = V3(Math.sin(RUB.giro), 0, Math.cos(RUB.giro)), FRENTE_P = V3(Math.sin(PAT.giro), 0, Math.cos(PAT.giro));
const CAM_P1 = (k) => [lerp(0.02, 0.04, k), lerp(1.62, 1.56, k), lerp(3.35, 3.05, k), 0.02, lerp(1.08, 1.06, k), 0, 52];
const CAM_P2 = (k) => [-1.72 + 0.06 * k, 1.55, -0.62 + 0.04 * k, RUB.x, 1.17, RUB.z, 40 - 2 * k];   // por encima del hombro de Patricia
const CAM_P5 = (k) => [1.82 - 0.05 * k, 1.58, 0.82 - 0.05 * k, PAT.x, 1.14, PAT.z, 40 - 2 * k];      // por encima del hombro de Rubén
const CAM_P6 = (k) => { const d = 2.25 - 0.25 * k; return [RUB.x + FRENTE_R.x * d, 1.33, RUB.z + FRENTE_R.z * d, RUB.x, 1.17, RUB.z, 38]; };
const CAM_P7 = (k) => [lerp(-0.55, -0.5, k), 1.55, lerp(2.2, 2.0, k), -0.62, 0.95, 0.1, 44];
const CAM_C = (k) => [20.02, 1.36, lerp(2.35, 2.12, k), 20.02, 1.22, -0.45, 40];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, ...CAM_P2(0)], [T.p3, ...CAM_P2(1)]]],
  ["P3", T.p3, null],                          // el inserto de la planilla en el celular de Rubén
  ["P4", T.p4, null],                          // pantalla partida: arriba el banco, abajo la rotisería
  ["P5", T.p5, [[T.p5, ...CAM_P5(0)], [T.p6, ...CAM_P5(1)]]],
  ["P6", T.p6, [[T.p6, ...CAM_P6(0)], [T.p7, ...CAM_P6(1)]]],
  ["P7", T.p7, [[T.p7, ...CAM_P7(0)], [r2(T.timbre - 0.3), ...CAM_P7(1)]]],
  ["P7i", r2(T.timbre - 0.3), null],           // el dedo en el timbre
  ["P7t", r2(T.timbre + 0.12), null],          // tilt al turnero: COBRANZAS
  // ---- parte 2 ----
  ["Q1", P2, null],                            // la rotisería: el celular vibra en el mostrador
  ["Q1i", T.q1i, null],                        // el inserto: el recordatorio
  ["Q1g", r2(T.g2 - 0.05), null],              // Graciela se ríe: "¿Por favor?…"
  ["Q1p", r2(T.pagar - 0.3), null],            // el inserto: Pagar → Pagado ✓
  ["Q2", T.q2, null],                          // el panel de Rubén
  ["Q3i", T.q3, null],                         // el aviso en el celular de Nico
  ["Q3", r2(T.n1 - 0.12), null],               // Nico junto a la camioneta: "Beto. Hoy paso."
  ["Q4", T.q4, [[T.q4, ...CAM_P1(0)], [T.q4s, ...CAM_P1(0.4)]]],
  ["Q4s", T.q4s, null],                        // pantalla partida otra vez
  ["Q4p5", T.q4p5, [[T.q4p5, ...CAM_P5(0)], [T.q4p6, ...CAM_P5(1)]]],
  ["Q4p6", T.q4p6, [[T.q4p6, ...CAM_P6(0)], [T.q4p7, ...CAM_P6(1)]]],
  ["Q4p7", T.q4p7, [[T.q4p7, ...CAM_P7(0)], [r2(T.timbre2 - 0.3), ...CAM_P7(1)]]],
  ["Q4i", r2(T.timbre2 - 0.3), null],
  ["Q4t", r2(T.timbre2 + 0.12), null],         // tilt al turnero: INVERSIONES
  ["C", T.c, [[T.c, ...CAM_C(0)], [DUR, ...CAM_C(1)]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }
