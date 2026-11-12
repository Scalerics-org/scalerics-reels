// Capa 3D de anotamelo (Three.js r170 local). Base técnica: reels/me-haces-precio y reels/hacen-envios (globos pegados a
// la cámara en píxeles de pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set: el ALMACÉN DE RUBÉN DE DÍA. Pared crema #efeee5 con zócalo navy3 alto (0,9 m) y guarda verde fina, luz
// blanca de mañana que entra por la ventana de la izquierda. Mostrador navy3 con tapa de madera clara; estantes de
// madera con mercadería de colores planos; puerta de vidrio con campanita; el almanaque en la pared de adelante.
//   PARTE 1: "Anotámelo, Rubén." · el desfile (el lápiz de la oreja se gasta, el almanaque pierde hojas hasta el 30
//            COBRAR) · "¿Yo te debía?" · "¿Eso no te lo pagué el martes?" (la mancha de mate) · Graciela viene a pagar:
//            la última hoja llena, la contratapa llena, cierra; el antebrazo escrito: "Mil ochocientos cuarenta." ·
//            Héctor: "¿Y yo cuánto te debía?": la pelada escrita.
//   PARTE 2: la tablet: "+ $ 320 ✓" · "Anotado." · el 30 limpio · a Héctor le llega el aviso con el botón Pagar: "¡Ah,
//            mirá! Yo te debía." · las cuentas en verde · la libreta se jubila en el estante · el crucigrama: FIADO.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import {
  crearPersonaje, ELENCO, poseEn, CARA, BRAZOS, AGACHA, pegarACamara, saludo, mezclar,
  crearMate, crearTermo, crearCelular, crearYerba, crearGalletitas, crearDulceDeLeche, crearPolenta, crearFideos,
  crearTablet, crearMonedero, crearBillete, crearBanquito, crearBolsaPapel, crearMochila, crearReloj,
  crearLapiz, crearSacapuntas, crearViruta, crearLibretaFiado, crearAlmanaque, crearDiario, crearCaja,
  crearDecalAntebrazo, crearDecalPelada, dibujarPagina, PAG,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const pulso = (t, a, d) => Math.sin(Math.PI * sg(t, a, a + d));
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdfe9f0);   // lo que se ve por la puerta y la ventana (la mañana)
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 80);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x4a4640);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(4, 6, -6, 2, -1, Math.PI / 2, 0xf4f6ff, 1.7);   // la ventana y la puerta (a la izquierda)
  tira(10, 1.2, 0, 7, 0, 0, 0xfff4e6, 1.0);
  tira(1.4, 8, 4, 1, 6, 0, 0xc8d4ff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.4;

// ---------- luces: la mañana entra por la ventana de la izquierda (blanca, con sombra), el cielo hemisférico, un
// contraluz frío desde el fondo y un relleno suave desde la cámara. Sin lamparitas cálidas. ----------
const sol = new THREE.DirectionalLight(0xfffaf2, 2.3);
sol.position.set(-4.6, 5.4, 1.4); sol.target.position.set(0.4, 0.9, -1.3);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -3.6, right: 3.6, top: 3.6, bottom: -3.6, near: 1, far: 16 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 1.05); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.7); rim.position.set(2.5, 3.2, -5); scene.add(rim);
const relleno = new THREE.DirectionalLight(0xfff6ea, 0.45); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  pared: new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false }), navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.65),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6), madera: mat(C.madera, 0.55), maderaC: mat(C.maderaC, 0.55), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET =================
// x: izquierda (-) a derecha (+) mirando desde el lado del cliente hacia Rubén (-z). Pared del fondo (detrás de Rubén)
// z = BZ con la estantería; pared de adelante (detrás del cliente) z = FZ con el almanaque y la heladera; pared izquierda
// x = LX con la puerta y la ventana; mostrador cruzando en z = -1.3.
const LX = -2.0, RX = 2.3, FZ = 1.25, BZ = -3.15, TECHO_Y = 3.0;
const PUERTA = { z0: -0.3, z1: 0.75, alto: 2.2 };
const VENT = { z0: -2.45, z1: -1.55, y0: 1.05, y1: 2.15 };
const MOSTRADOR = { x: 0.35, y: 0.95, z: -1.3, w: 2.3, d: 0.62 };
const RI = { x: 0.35, z: -1.9 };     // Rubén atrás del mostrador
const CLI = { x: -0.1, z: -0.66 };    // el cliente frente al mostrador
const ZOC = 0.9;                     // el zócalo navy3 alto
{
  const damero = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4.3, 4.0);
  const p = mesh(new THREE.PlaneGeometry(RX - LX, FZ - BZ), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.55 }), (LX + RX) / 2, 0.0, (FZ + BZ) / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; scene.add(p);
  const techo = new THREE.Mesh(new THREE.BoxGeometry(RX - LX, 0.1, FZ - BZ), mat(0xe8e6da, 0.95)); techo.position.set((LX + RX) / 2, TECHO_Y, (FZ + BZ) / 2); scene.add(techo);
  // una pared con su zócalo navy3 (0..ZOC) y la guarda verde fina arriba del zócalo. dir: hacia dónde mira la cara
  const pared = (x0, x1, y0, y1, plano, fijo, dir) => {
    const w = x1 - x0, h = y1 - y0, c = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const geo = new THREE.BoxGeometry(plano === "z" ? w : 0.1, h, plano === "z" ? 0.1 : w);
    const m = new THREE.Mesh(geo, M.pared); m.receiveShadow = true;
    if (plano === "z") m.position.set(c, cy, fijo - dir * 0.05); else m.position.set(fijo - dir * 0.05, cy, c);
    scene.add(m);
    const tramo = (a, b, hh, yy, mm, off) => {
      const ww = b - a, cc = (a + b) / 2;
      const z = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? ww : 0.02, hh, plano === "z" ? 0.02 : ww), mm); z.receiveShadow = true;
      if (plano === "z") z.position.set(cc, yy, fijo + dir * off); else z.position.set(fijo + dir * off, yy, cc);
      scene.add(z);
    };
    if (y0 < ZOC) { tramo(x0, x1, Math.min(ZOC, y1) - y0, (y0 + Math.min(ZOC, y1)) / 2, M.navy3, 0.012); }
    if (y0 <= ZOC && y1 > ZOC + 0.04) tramo(x0, x1, 0.035, ZOC + 0.0175, M.g, 0.016);
  };
  // fondo (detrás de Rubén) y adelante (detrás del cliente)
  pared(LX, RX, 0, TECHO_Y, "z", BZ, 1);
  pared(LX, RX, 0, TECHO_Y, "z", FZ, -1);
  pared(BZ, FZ, 0, TECHO_Y, "x", RX, -1);
  // izquierda: huecos de la puerta y la ventana
  pared(BZ, VENT.z0, 0, TECHO_Y, "x", LX, 1);
  pared(VENT.z1, PUERTA.z0, 0, TECHO_Y, "x", LX, 1);
  pared(PUERTA.z1, FZ, 0, TECHO_Y, "x", LX, 1);
  pared(VENT.z0, VENT.z1, 0, VENT.y0, "x", LX, 1);
  pared(VENT.z0, VENT.z1, VENT.y1, TECHO_Y, "x", LX, 1);
  pared(PUERTA.z0, PUERTA.z1, PUERTA.alto, TECHO_Y, "x", LX, 1);
  // marcos navy3 de la ventana y la puerta (se leen sobre la pared crema)
  const marco = (y, z, h, d) => scene.add(mesh(rbox(0.14, h, d, 0.02), M.navy3, LX + 0.02, y, z));
  marco(PUERTA.alto + 0.05, (PUERTA.z0 + PUERTA.z1) / 2, 0.1, PUERTA.z1 - PUERTA.z0 + 0.2);
  marco(PUERTA.alto / 2, PUERTA.z0 - 0.05, PUERTA.alto + 0.1, 0.1); marco(PUERTA.alto / 2, PUERTA.z1 + 0.05, PUERTA.alto + 0.1, 0.1);
  marco(VENT.y1 + 0.04, (VENT.z0 + VENT.z1) / 2, 0.08, VENT.z1 - VENT.z0 + 0.16); marco(VENT.y0 - 0.04, (VENT.z0 + VENT.z1) / 2, 0.08, VENT.z1 - VENT.z0 + 0.22);
  marco((VENT.y0 + VENT.y1) / 2, VENT.z0 - 0.04, VENT.y1 - VENT.y0, 0.08); marco((VENT.y0 + VENT.y1) / 2, VENT.z1 + 0.04, VENT.y1 - VENT.y0, 0.08);
  marco((VENT.y0 + VENT.y1) / 2, (VENT.z0 + VENT.z1) / 2, VENT.y1 - VENT.y0, 0.04); marco((VENT.y0 + VENT.y1) / 2 + 0.05, (VENT.z0 + VENT.z1) / 2, 0.04, VENT.z1 - VENT.z0);
  // afuera (de día): la vereda, el cordón, la casa de enfrente; colores planos y claros
  const baldosa = lienzo(512, 512, (x) => { x.fillStyle = "#cfcabb"; x.fillRect(0, 0, 512, 512); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d8d3c4" : "#c8c3b3"; x.fillRect(i * 128 + 3, j * 128 + 3, 122, 122); } });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(2, 10);
  const v = mesh(new THREE.PlaneGeometry(3, 14), new THREE.MeshBasicMaterial({ map: baldosa }), LX - 1.5, 0.0, -1); v.rotation.x = -Math.PI / 2; v.castShadow = false; scene.add(v);
  const calle = mesh(new THREE.PlaneGeometry(8, 40), new THREE.MeshBasicMaterial({ color: 0x8a8e98 }), LX - 7, -0.15, -1); calle.rotation.x = -Math.PI / 2; scene.add(calle);
  scene.add(mesh(new THREE.BoxGeometry(0.3, 6, 16), new THREE.MeshBasicMaterial({ color: 0xead9b6 }), LX - 8.5, 3, -1));
  for (let i = -4; i <= 4; i++) scene.add(mesh(rbox(0.1, 1.3, 1.0, 0.02), new THREE.MeshBasicMaterial({ color: 0x46608a }), LX - 8.3, 1.9, i * 1.8 - 1));
  const arbol = new THREE.Group(); arbol.position.set(LX - 2.6, 0, -1.8); scene.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), new THREE.MeshBasicMaterial({ color: 0x6e4a2e }), 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), new THREE.MeshBasicMaterial({ color: 0x6f9a44 }), x, y, z));
}
// ---------- estanterías con mercadería de colores planos ----------
semilla = 7;
const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.cr2, 0xe8cf9f, 0x8a5a3c, 0xd98a5a, C.mostaza, C.navy3];
const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapaF = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), picoB = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
function llenar(gr, x0, x1, y, hueco) {
  for (let x = x0 + 0.14; x < x1 - 0.1; x += 0.17 + az() * 0.07) {
    const k = az(), c = colores[Math.floor(az() * colores.length)];
    if (hueco && x > hueco[0] - 0.08 && x < hueco[1] + 0.08) continue;
    if (k < 0.3) { const h = 0.22 + az() * 0.16; gr.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, 0)); }
    else if (k < 0.48) { gr.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, 0)); gr.add(mesh(tapaF, M.cr, x, y + 0.245, 0)); }
    else if (k < 0.62) { gr.add(mesh(botella, mm(c, 0.3), x, y + 0.175, 0)); gr.add(mesh(picoB, mm(C.cr3, 0.4), x, y + 0.37, 0)); }
    else if (k < 0.74) { const yb = crearYerba(); yb.position.set(x, y + 0.025, 0); yb.scale.setScalar(0.85); gr.add(yb); x += 0.02; }
    else if (k < 0.82) { const pl = crearPolenta(); pl.position.set(x, y + 0.025, 0); gr.add(pl); }
    else if (k < 0.9) { const fi = crearFideos(); fi.position.set(x, y + 0.025, 0); gr.add(fi); }
    else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, 0); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; gr.add(ga); x += 0.12; }
  }
}
function estante(x0, x1, ys, huecos = {}) {
  const gr = new THREE.Group();
  const XC = (x0 + x1) / 2, XW = x1 - x0;
  for (const y of ys) {
    gr.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -0.07));
    gr.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, 0.15));
    llenar(gr, x0, x1, y, huecos[y]);
  }
  for (const x of [x0, x1]) gr.add(mesh(rbox(0.06, ys[ys.length - 1] + 0.1, 0.44, 0.015), M.navy3, x, (ys[ys.length - 1] + 0.1) / 2, -0.07));
  return gr;
}
// el fondo de Rubén: la fila de dulce de leche a la altura de la cabeza; arriba a la derecha, el lugar donde se jubila
// la libreta (parte 2)
const DL = { y: 1.5, x0: -0.25, x1: 1.0 };
const ESTANTE_Y = 2.05;              // el estante de arriba (la libreta jubilada)
const JUBILA = V3(1.17, ESTANTE_Y + 0.025, BZ + 0.32);
{
  const ef = estante(-1.75, 2.15, [0.95, DL.y, ESTANTE_Y], { [DL.y]: [DL.x0, DL.x1], [ESTANTE_Y]: [1.05, 1.7] }); ef.position.z = BZ + 0.3; scene.add(ef);
  for (let x = DL.x0; x <= DL.x1 + 0.001; x += 0.13) { const d = crearDulceDeLeche(); d.position.set(x, DL.y + 0.025, BZ + 0.3); d.scale.setScalar(1.05); d.rotation.y = (az() - 0.5) * 0.3; scene.add(d); }
  // al lado del lugar de la libreta, dos potes más (la libreta queda "al lado del dulce de leche")
  for (const x of [1.0, 1.82]) { const d = crearDulceDeLeche(); d.position.set(x, ESTANTE_Y + 0.025, BZ + 0.3); d.scale.setScalar(1.05); scene.add(d); }
  // adelante (detrás del cliente): un estante a la izquierda y la heladera a la derecha del almanaque
  const ea = estante(-0.6, 1.0, [0.95, 1.5, 2.05]); ea.rotation.y = Math.PI; ea.position.set(-1.0, 0, FZ - 0.3); scene.add(ea);
  // la pared derecha
  const ed = estante(-1.2, 1.0, [0.95, 1.5, 2.05]); ed.rotation.y = -Math.PI / 2; ed.position.set(RX - 0.3, 0, -0.9); scene.add(ed);
}
// la heladera de bebidas (adelante a la derecha): cuerpo crema, puerta de vidrio con marco navy3 y botellas
{
  const h = new THREE.Group(); h.position.set(1.8, 0, FZ - 0.4); h.rotation.y = Math.PI; scene.add(h);
  h.add(mesh(rbox(0.75, 1.9, 0.6, 0.03), M.cr2, 0, 0.95, 0));
  h.add(mesh(rbox(0.66, 1.55, 0.04, 0.02), M.navy3, 0, 1.05, 0.3));
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 1.42), new THREE.MeshBasicMaterial({ color: 0xdfe8ee })); fondo.position.set(0, 1.05, 0.322); h.add(fondo);
  semilla = 21;
  for (const y of [0.45, 0.85, 1.25, 1.62]) {
    h.add(mesh(new THREE.BoxGeometry(0.54, 0.012, 0.02), M.cr3 ?? M.cr2, 0, y - 0.03, 0.33));
    for (let i = 0; i < 6; i++) { const c = [C.red, C.g, C.mostaza, C.navy3, 0xd98a5a, C.cr][Math.floor(az() * 6)]; const b = mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.22, 10), mm(c, 0.3), -0.22 + i * 0.088, y + 0.08, 0.34); h.add(b); }
  }
  h.add(mesh(rbox(0.6, 0.18, 0.05, 0.02), M.navy3, 0, 1.78, 0.31));
  h.add(mesh(rbox(0.03, 0.4, 0.04, 0.01), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), -0.27, 1.1, 0.35));
}
// el mostrador (el de abren-hoy): navy3 con tapa de madera clara, filete verde y paneles
{
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, MX.y - 0.06, MX.d, 0.03), M.navy3, MX.x, (MX.y - 0.06) / 2, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), mat(0xc89a64, 0.55), MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  for (let i = 0; i < 4; i++) {
    const px = MX.x - MX.w / 2 + 0.3 + i * ((MX.w - 0.6) / 3);
    scene.add(mesh(rbox(0.46, 0.4, 0.02, 0.02), mat(0x2c4268, 0.6), px, 0.6, MX.z + MX.d / 2 + 0.01));
    scene.add(mesh(rbox(0.38, 0.32, 0.024, 0.02), M.navy3, px, 0.6, MX.z + MX.d / 2 + 0.014));
  }
  scene.add(mesh(rbox(MX.w, 0.035, 0.03, 0.01), M.cr2, MX.x, 0.84, MX.z + MX.d / 2 + 0.01));
}
// la puerta de vidrio (hoja con bisagra del lado de adelante) y la campanita
const hoja = new THREE.Group();
const campanita = new THREE.Group();
{
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xdcecff, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false });
  hoja.position.set(LX - 0.02, 0, PUERTA.z1); scene.add(hoja);
  const W = PUERTA.z1 - PUERTA.z0;
  const hb = (z, y, d, h) => hoja.add(mesh(rbox(0.06, h, d, 0.015), M.navy3, 0, y, -z));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.1, W, 0.2);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.28), vidrioM); vp.position.set(0, PUERTA.alto / 2 + 0.06, -W / 2); vp.rotation.y = Math.PI / 2; vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.05, 0.3, 0.04, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), 0.06, 1.12, -(W - 0.08)));
  const tx = lienzo(1024, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#0b1220"; x.lineWidth = 18; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 40); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 168); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ABIERTO", w / 2, h / 2 + 12);
  });
  const gm = mat(C.g, 0.5);
  const cartelM = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.5, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.12 });
  const cartel = mesh(new THREE.BoxGeometry(0.46, 0.19, 0.02), [gm, gm, gm, gm, cartelM, gm], 0.05, 1.6, -W / 2); cartel.rotation.y = Math.PI / 2; hoja.add(cartel);
  campanita.position.set(LX + 0.14, PUERTA.alto - 0.02, PUERTA.z1 - 0.18); scene.add(campanita);
  campanita.add(mesh(rbox(0.12, 0.02, 0.03, 0.006), M.navy3, -0.05, 0.0, 0));
  const cb = new THREE.Group(); cb.position.set(0.0, -0.01, 0); campanita.add(cb); campanita.userData.cb = cb;
  cb.add(mesh(new THREE.ConeGeometry(0.06, 0.1, 18, 1, true), mat(0xd9b04a, 0.25, { metalness: 0.7, side: THREE.DoubleSide }), 0, -0.06, 0));
  cb.add(mesh(new THREE.SphereGeometry(0.016, 10, 8), mat(0xb8902e, 0.3, { metalness: 0.7 }), 0, -0.115, 0));
}
// el reloj de pared (fondo, arriba a la izquierda de Rubén)
const reloj = crearReloj(0.17); reloj.position.set(-1.05, 2.45, BZ + 0.03); scene.add(reloj);

// ================= UTILERÍA DEL MOSTRADOR =================
const MY = MOSTRADOR.y;
// el almanaque (pared de adelante, mira a -z hacia Rubén)
const almanaque = crearAlmanaque(); almanaque.position.set(0.95, 1.78, FZ - 0.02); almanaque.rotation.y = Math.PI; scene.add(almanaque);
// la caja registradora (a la derecha de Rubén... a su izquierda: +x), el mate y el termo (a su derecha, -x)
const caja = crearCaja(); caja.position.set(1.25, MY, -1.42); caja.rotation.y = Math.PI + 0.25; scene.add(caja);
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termo = crearTermo(); termo.scale.setScalar(1.3); scene.add(termo);
const MATE_C = V3(0.98, MY, -1.62), TERMO_C = V3(0.84, MY, -1.66);
// el sacapuntas (a la derecha de Rubén) y las virutas que se acumulan
const SAC = V3(-0.05, MY, -1.42);
const sacapuntas = crearSacapuntas(); sacapuntas.scale.setScalar(1.6); sacapuntas.position.copy(SAC); sacapuntas.rotation.y = -0.5; scene.add(sacapuntas);
const bocaSac = () => { sacapuntas.updateMatrixWorld(true); return sacapuntas.localToWorld(sacapuntas.userData.boca.clone().add(V3(0.004, 0, 0))); };
const VIRUTAS = [];
semilla = 33;
for (let c = 0; c < T.ciclos.length; c++) for (let i = 0; i < 7; i++) {
  const v = crearViruta(c * 7 + i); v.scale.setScalar(1.7); scene.add(v);
  const ang = az() * Math.PI * 2, rad = 0.03 + az() * 0.07 + c * 0.004;
  VIRUTAS.push({ v, c, i, fin: V3(SAC.x + 0.05 + Math.cos(ang) * rad, MY + 0.004 + c * 0.0012, SAC.z + 0.05 + Math.sin(ang) * rad * 0.8), rot: [az() * 3, az() * 6, az() * 3], ret: az() * 0.08 });
}
// la libreta del fiado: las páginas son lienzos que se redibujan según el momento
const pagT = lienzo(PAG.W, PAG.H, () => {}), hojaT = lienzo(PAG.W, PAG.H, () => {}), dorsoT = lienzo(PAG.W, PAG.H, () => {}), contraT = lienzo(PAG.W, PAG.H, () => {});
const LIB_W = 0.31, LIB_H = 0.4;
const libreta = crearLibretaFiado({ W: LIB_W, H: LIB_H, paginaTex: pagT, hojaTex: hojaT, hojaDorsoTex: dorsoT, contraTex: contraT });
scene.add(libreta);
const LIB0 = V3(0.48, MY, -1.5);   // la espiral (la hoja se abre hacia el cliente)
// la tablet (parte 2): en el mismo lugar donde estaba la libreta, en su atril, mirando al cliente
const TW = 900, TH = 640;
const tabT = lienzo(TW, TH, () => {});
const tablet = crearTablet(tabT, 0.36, 0.26, 0.5); tablet.position.set(0.42, MY, -1.3); scene.add(tablet);
// el diario del crucigrama y el banquito (Q4)
const diario = crearDiario(); diario.position.set(0.3, MY, -1.36); diario.rotation.y = 0.08; scene.add(diario);
const banco = crearBanquito(0.62); banco.position.set(RI.x + 0.05, 0, RI.z - 0.12); scene.add(banco);
// la bolsa de Graciela (P1), su monedero (P5), los billetes (P6), la billetera de Héctor (P6), el celular de Héctor (Q2)
const bolsa = crearBolsaPapel(); bolsa.scale.setScalar(1.1); scene.add(bolsa);
const yerbaB = crearYerba(); yerbaB.scale.setScalar(0.8); yerbaB.position.set(-0.03, 0.2, 0.0); yerbaB.rotation.z = 0.15; bolsa.add(yerbaB);
const monedero = crearMonedero(); monedero.scale.setScalar(1.6); scene.add(monedero);
const billetes = [crearBillete(), crearBillete()]; billetes.forEach((b) => { b.scale.setScalar(1.35); scene.add(b); });
const billetera = new THREE.Group(); scene.add(billetera);
{
  const cu = mat(0x6b3f2e, 0.55);
  billetera.add(mesh(rbox(0.12, 0.085, 0.02, 0.008), cu, 0, 0, 0));
  billetera.add(mesh(rbox(0.11, 0.004, 0.022, 0.002), mat(0x8a5a3c, 0.6), 0, 0.02, 0));
  const b = crearBillete(0.1, 0.05); b.rotation.x = Math.PI / 2; b.position.set(0.0, 0.05, 0.0); billetera.add(b);
}
// los productos de cada cliente del desfile (en la mano)
const dulceH = crearDulceDeLeche(); dulceH.scale.setScalar(1.4); scene.add(dulceH);
const fideosW = crearFideos(); fideosW.scale.setScalar(1.1); scene.add(fideosW);
const azucarM = new THREE.Group(); scene.add(azucarM);
{
  const tx = lienzo(512, 640, (x, w, h) => { x.fillStyle = "#f6f5ef"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.3, w, h * 0.32); x.fillStyle = "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("AZÚCAR", w / 2, h * 0.46); x.fillStyle = "#c7655b"; x.fillRect(0, h * 0.86, w, h * 0.06); });
  const bm = mat(0xf6f5ef, 0.8), fm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.8 });
  azucarM.add(mesh(rbox(0.13, 0.19, 0.08, 0.015), [bm, bm, bm, bm, fm, bm], 0, 0.095, 0));
}
const mochila = crearMochila(); scene.add(mochila);
// el celular de Héctor (funda mostaza a juego con el chaleco): el aviso del almacén con el botón Pagar
const CW = 600, CH = 975;
const pantH = lienzo(CW, CH, () => {});
const celuH = crearCelular(pantH, C.mostaza, 0.085, 0.138); celuH.scale.setScalar(2.4); scene.add(celuH);
let claveH = "";
function dibujarCelu(t) {
  const noti = t >= T.noti ? Math.round(sg(t, T.noti, T.noti + 0.2) * 5) / 5 : 0;
  const toque = t >= T.pagar && t < T.pagar + 0.3 ? Math.round(sg(t, T.pagar, T.pagar + 0.3) * 5) / 5 : 0;
  const pag = t >= T.pagado ? 1 : 0;
  const clave = `${noti}|${toque}|${pag}`; if (clave === claveH) return; claveH = clave;
  const x = pantH.userData.x, W = CW, H = CH;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.font = F(800, 92); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("10:32", W / 2, 120);
  if (noti > 0) {
    x.save(); x.globalAlpha = Math.min(1, noti * 1.5); x.translate(0, (1 - noti) * -60);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(22, 200, W - 44, 740, 36); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 40); x.fillText("Almacén de Rubén", 52, 262);
    x.fillStyle = "#16243d"; x.font = F(700, 38); x.fillText("Tu cuenta del mes", 52, 330);
    x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("$ 1.260", 52, 430);
    x.fillStyle = "#b4b2a3"; x.fillRect(52, 492, W - 104, 4);
    x.fillStyle = "#16243d"; x.font = F(600, 36);
    [["Dulce de leche", "$ 200"], ["Galletitas", "$ 120"], ["Yerba", "$ 250"], ["y 6 más", "$ 690"]].forEach(([a, b], i) => { x.textAlign = "left"; x.fillText(a, 52, 548 + i * 54); x.textAlign = "right"; x.fillText(b, W - 52, 548 + i * 54); });
    x.textAlign = "center";
    if (!pag) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(52, 790, W - 104, 118, 59); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("Pagar", W / 2, 852); }
    else { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(52, 790, W - 104, 118, 24); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("Pagado ✓", W / 2, 852); }
    if (toque > 0 && toque < 1) { x.strokeStyle = `rgba(11,18,32,${1 - toque})`; x.lineWidth = 10; x.beginPath(); x.arc(W / 2, 850, 20 + 90 * toque, 0, 7); x.stroke(); }
    x.restore();
  }
  pantH.needsUpdate = true;
}
dibujarCelu(0);

// ---------- la tablet de Rubén (parte 2): "Cuentas · Almacén de Rubén" ----------
let claveT = "";
function dibujarTablet(t) {
  const enQ1 = t < T.q3;
  const mas = t >= T.mas320 ? Math.round(sg(t, T.mas320, T.mas320 + 0.2) * 5) / 5 : 0;
  const verdes = T.filas.filter((a) => t >= a).length;
  const clave = `${enQ1}|${mas}|${verdes}`; if (clave === claveT) return; claveT = clave;
  const { x } = tabT.userData, W = TW, H = TH;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 56); x.fillText("Cuentas", 40, 62);
  x.fillStyle = "#5ce611"; x.font = F(700, 36); x.textAlign = "right"; x.fillText("Almacén de Rubén", W - 40, 64);
  x.fillStyle = "#5ce611"; x.fillRect(0, 112, W, 8);
  const filas = enQ1 ? [["Graciela", "$ 1.520"], ["Héctor", "$ 1.260"], ["Walter", "$ 840"], ["Marta", "$ 610"]] : [["Héctor", "$ 1.260", "Pagado ✓"], ["Walter", "$ 840", "Martes: pagado ✓"], ["Marta", "$ 610", "Pagado ✓"], ["Graciela", "$ 1.840", "Pagado ✓"]];
  filas.forEach(([n, m, ok], i) => {
    const y = 140 + i * 122, verde = !enQ1 && i < verdes;
    x.fillStyle = verde ? "#5ce611" : i % 2 ? "#16243d" : "#1f3254"; x.beginPath(); x.roundRect(24, y, W - 48, 110, 22); x.fill();
    x.fillStyle = verde ? "#0b1220" : "#efeee5"; x.textAlign = "left"; x.font = F(800, 52); x.fillText(n, 50, y + 56);
    if (verde) { x.textAlign = "right"; x.font = F(900, ok.length > 12 ? 40 : 50); x.fillText(ok, W - 50, y + 56); }
    else { x.textAlign = "right"; x.font = F(700, 46); x.fillStyle = "#efeee5"; x.fillText(m, W - 50, y + 56); }
  });
  if (enQ1 && mas > 0) {
    // la fila de Graciela se abre y entra "+ $ 320 ✓" en verde
    x.save(); x.globalAlpha = Math.min(1, mas * 1.6);
    x.fillStyle = "#5ce611"; x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.beginPath(); x.roundRect(W - 440, 136, 400, 118, 24); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 64); x.fillText("+ $ 320 ✓", W - 240, 197);
    x.restore();
  }
  tabT.needsUpdate = true;
}
dibujarTablet(0);

// ================= LAS PÁGINAS DE LA LIBRETA =================
// Caveat 84 px en una hoja de 1024 px (31 cm): en el P1 la hoja ocupa ~55 % del ancho y la letra queda en ~45 px.
const RENG = (lineas) => lineas.map((t, i) => (typeof t === "string" ? { t, y: i } : { ...t, y: t.y ?? i }));
const PAGINAS = [
  ["Nelly · pan $ 90", "Beto · vino $ 230", "Graciela · yerba,", "galletitas $ 320"],
  ["Chela · azúcar $ 95", "Fede · cocoa $ 180", "Héctor · dulce", "de leche $ 200"],
  ["Nelly · leche $ 60", "Beto · arroz $ 110", "Walter · fideos", "x2 $ 150"],
  ["Chela · pan $ 90", "Fede · yerba $ 250", "Marta · azúcar", "$ 95"],
  ["Fede · yerba $ 250", "Nelly · pan $ 90", "Beto · fósforos"],
  ["Chela · arroz $ 110", "Héctor · galletitas", "Walter · pan"],
  ["Marta · café $ 300", "Graciela · harina", "Fede · leche $ 60"],
];
// la hoja del martes (P4): la mancha del mate justo encima del número, y la letra que se pone ilegible
const MARTES = { cab: "MARTES", ren: RENG([{ t: "Graciela · fideos $ 140", px: 100, y: 0.5 }, { t: "Walter · fideos x2", px: 100, y: 1.5 }, { t: "Héctor · yerba $ 250", px: 100, y: 3.5 }]) };
function manchaMate(x) {
  // el anillo marrón del fondo del mate (semitransparente, borde más oscuro) sobre el número de Walter
  const cx = 360, cy = PAG.R0 + 2.5 * PAG.DR - 50;
  x.save();
  x.fillStyle = "rgba(122,90,58,0.38)"; x.beginPath(); x.arc(cx, cy, 120, 0, 7); x.fill();
  x.strokeStyle = "rgba(96,66,38,0.75)"; x.lineWidth = 16; x.beginPath(); x.arc(cx, cy, 116, 0.2, Math.PI * 2 - 0.4); x.stroke();
  x.lineWidth = 6; x.beginPath(); x.arc(cx + 6, cy - 4, 100, 2.4, 4.9); x.stroke();
  // el número, corrido y borroso abajo de la mancha
  x.fillStyle = "rgba(58,63,74,0.55)"; x.font = '700 92px "Caveat", cursive'; x.fillText("$ 1?0", cx - 110, cy + 36);
  x.restore();
  // garabatos ilegibles en los renglones de abajo
  x.save(); x.strokeStyle = "#3a3f4a"; x.lineWidth = 6; x.lineCap = "round";
  for (const [y0, w] of [[860, 640], [1012, 520], [1164, 700]]) { x.beginPath(); x.moveTo(150, y0); for (let i = 0; i < 26; i++) x.lineTo(150 + (i * w) / 26, y0 - 18 + ((i * 7) % 5) * 9 - (i % 2) * 24); x.stroke(); }
  x.restore();
}
// la última hoja: llena hasta los márgenes (renglones apretados, anotaciones torcidas en el borde)
function hojaLlena(x, W, H) {
  x.save(); x.fillStyle = "#3a3f4a";
  const n = ["Nelly", "Beto", "Chela", "Fede", "Graciela", "Héctor", "Walter", "Marta", "Pocho", "Elsa", "Tito", "Rosa"];
  const p = ["pan", "yerba", "fideos", "azúcar", "leche", "dulce", "vino", "arroz", "queso", "fósforos", "cocoa", "harina"];
  for (let i = 0; i < 22; i++) { x.font = `700 ${56 + (i % 3) * 6}px "Caveat", cursive`; x.save(); x.translate(150 + (i % 2) * 20, 120 + i * 54); x.rotate(((i * 7) % 5 - 2) * 0.012); x.fillText(`${n[i % 12]} · ${p[(i * 5) % 12]} · $ ${60 + ((i * 37) % 25) * 10}`, 0, 0); x.restore(); }
  // en el margen, de costado
  x.font = '700 52px "Caveat", cursive';
  x.save(); x.translate(60, 1260); x.rotate(-Math.PI / 2); x.fillText("Tito · vino · $ 230 · Rosa · pan", 0, 0); x.restore();
  x.save(); x.translate(990, 120); x.rotate(Math.PI / 2); x.fillText("Pocho · yerba · Elsa · leche", 0, 0); x.restore();
  x.restore();
}
function contratapaLlena(x, W, H) {
  x.save(); x.fillStyle = "#3a3f4a";
  for (let i = 0; i < 20; i++) { x.font = `700 ${58 + (i % 2) * 8}px "Caveat", cursive`; x.save(); x.translate(90 + (i % 3) * 30, 110 + i * 60); x.rotate(((i * 5) % 7 - 3) * 0.02); x.fillText(["Elsa · azúcar · $ 95", "Tito · pan · $ 90", "Rosa · cocoa · $ 180", "Pocho · vino · $ 230", "Nelly · queso · $ 300"][i % 5], 0, 0); x.restore(); }
  x.save(); x.translate(970, 200); x.rotate(Math.PI / 2); x.font = '700 54px "Caveat", cursive'; x.fillText("Beto · fideos · Fede · yerba · Chela · pan", 0, 0); x.restore();
  x.restore();
}
dibujarPagina(contraT.userData.x, [], { fondo: "carton", extra: contratapaLlena }); contraT.needsUpdate = true;
dibujarPagina(dorsoT.userData.x, [], { fondo: "hoja" }); dorsoT.needsUpdate = true;
// medir el texto escrito (para que la punta del lápiz siga la letra)
const medidor = document.createElement("canvas").getContext("2d");
const anchoTxt = (s, px = 118) => { medidor.font = `700 ${px}px "Caveat", cursive`; return medidor.measureText(s).width; };

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeoCada: 3.7 });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 3.4 });
const hector = crearPersonaje({ ...ELENCO.hector, dedos: true, parpadeoCada: 3.55 });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, parpadeoCada: 3.3 });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 3.9 });
const TODOS = [ruben, graciela, hector, walter, marta];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los lentes un poco más adentro de la cara (de el-audio: con el cráneo de 0,3 los aros se salían de la cara)
function lentesAdentro(per, color) {
  const CC = 0.3 * 0.92;
  per.cabeza.traverse((l) => {
    if (!l.isMesh || l.parent !== per.cabeza) return;
    const esL = (l.material.color && l.material.color.getHex() === color && (l.geometry.type === "TorusGeometry" || l.geometry.type === "CylinderGeometry")) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry");
    if (!esL) return;
    l.position.y -= CC; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CC;
    if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false;
    if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) l.position.x = -0.035;
  });
}
lentesAdentro(graciela, 0x16243d); lentesAdentro(hector, 0x1f3254);
const arosDe = (per, color) => per.cabeza.children.filter((l) => l.isMesh && l.geometry.type === "TorusGeometry" && l.material.color && l.material.color.getHex() === color && l.parent === per.cabeza);
const LENTES = [[graciela, arosDe(graciela, 0x16243d)], [hector, arosDe(hector, 0x1f3254)]];
const _lc = new THREE.Vector3(), _lf = new THREE.Vector3(), _le = new THREE.Vector3(), _lw = new THREE.Vector3();
function lenteLejano(per, aros) {
  per.cabeza.updateMatrixWorld(true);
  per.cabeza.getWorldPosition(_lc); _lf.set(0, 0, 1).transformDirection(per.cabeza.matrixWorld); _le.copy(camera.position).sub(_lc);
  _lf.y = 0; _le.y = 0; _lf.normalize(); _le.normalize();
  const ang = Math.acos(cl(_lf.dot(_le), -1, 1));
  let lejos = null, dmax = -1;
  for (const a of aros) { a.visible = true; a.getWorldPosition(_lw); const d = _lw.distanceTo(camera.position); if (d > dmax) { dmax = d; lejos = a; } }
  if (ang > 0.62 && lejos) lejos.visible = false;
  per.cabeza.children.forEach((l) => { if (l.isMesh && l.geometry.type === "CylinderGeometry" && Math.abs(l.scale.y - 0.07) < 1e-6) l.visible = ang <= 0.62; });
}
// la herradura de pelo de Rubén vista desde atrás se leía como una barra flotante: de espaldas no va (me-haces-precio)
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.9;
}
// el lápiz (uno solo): en la oreja derecha de Rubén o en su mano; el de la parte 2 es nuevo y largo
const lapiz = crearLapiz(T.largos[0]); scene.add(lapiz);
// en la oreja: pegado al costado de la cabeza, apoyado arriba de la oreja derecha (-x), la goma adelante y la punta
// atrás, un poco caída. Coordenadas de la cabeza (cráneo de radio 0,3 centrado en y = 0,276)
const OREJA = { p: V3(-0.314, 0.35, 0.11), d: V3(0, -0.08, -1).normalize() };
const _q = new THREE.Quaternion(), _m4 = new THREE.Matrix4(), _y = V3(0, 1, 0);
function lapizEnOreja(L) {
  ruben.cabeza.updateMatrixWorld(true);
  const p = ruben.cabeza.localToWorld(OREJA.p.clone());
  const d = OREJA.d.clone().transformDirection(ruben.cabeza.matrixWorld);
  lapiz.position.copy(p); lapiz.quaternion.setFromUnitVectors(_y, d);
  return { p, d, mitad: p.clone().add(d.clone().multiplyScalar(L * 0.5)) };
}
// los decals: el antebrazo izquierdo (cara interna) y la pelada
const antebrazo = crearDecalAntebrazo([["Graciela 1.840", 86, true], ["Héctor dulce", 74], ["Walter fideos x2", 66], ["Marta azúcar", 70], ["Nelly pan", 70], ["Beto ???", 70]]);
scene.add(antebrazo);
const pelada = crearDecalPelada([["HÉCTOR", 150], ["DULCE DE LECHE $ 200", 104]], { ancho: 0.4, alto: 0.25, zc: 0.03 });
ruben.cabeza.add(pelada);

// ================= GLOBOS (pegados a la cámara, en píxeles de pantalla; de me-haces-precio) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoT = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0) {
  // las burbujas nunca arrancan de un puntito: aparecen desde el 40 % (sin texto fantasma diminuto)
  g.visible = s > 0.4;
  if (!g.visible) return;
  const k = halfK();
  const { W, H, cola } = g.userData;
  cx = W + 200 > 1080 ? 540 : cl(cx, W / 2 + 100, 980 - W / 2);
  cy = cl(cy, H / 2 + 120, 1780 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    cola.position.set((lado * W) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * W) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.181, 0.3))); };
const GL = {
  anota: [0, 1, 2, 3, 4, 5].map(() => crearGlobo(["Anotámelo."], 66)),
  h2: crearGlobo(["¿Yo te debía?"], 84),
  w2: crearGlobo(["¿Eso no te lo", "pagué el martes?"], 70),
  g2a: crearGlobo(["Rubén, vengo", "a pagarte."], 70),
  g2b: crearGlobo(["¿Cuánto es?"], 84),
  h3: crearGlobo(["¿Y yo cuánto", "te debía?"], 76),
  g1b: crearGlobo(["Anotámelo, Rubén."], 70),
  r2: crearGlobo(["Anotado."], 84),
  h4: crearGlobo(["¡Ah, mirá!", "Yo te debía."], 76),
};

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Los de la parte 2 repiten el encuadre de su par de la parte 1 (P1→Q1, P3→Q2).
const AP1 = (dz = 0, fov = 46) => [0.44, 1.72, 0.28 + dz, 0.4, 1.18, -1.55, fov];   // P1/Q1: desde el lado del cliente, picado leve
const HOMBRO = (k = 0) => [-0.38 - k * 0.02, 1.72, -2.52 + k * 0.08, 0.28, 1.32, -0.6, 56 - k * 2];   // por encima del hombro derecho de Rubén
const ALM = (k = 0) => [0.95, 1.76, 0.48 + k * 0.12, 0.95, 1.73, FZ, 44];   // el almanaque grande
const LIBG = (k = 0) => [LIB0.x + 0.0, 1.62 - k * 0.06, LIB0.z + 0.86 - k * 0.05, LIB0.x - 0.02, MY + 0.02, LIB0.z + 0.24, 46];   // la libreta gorda
const COB = (k = 0) => [-0.22 - k * 0.02, 1.66, -2.58 + k * 0.1, 0.22, 1.32, -0.66, 52 - k * 1.5];   // P4: contraplano, el cliente de frente
const CEN = [LIB0.x, 1.78, LIB0.z + 0.2, LIB0.x, MY, LIB0.z + 0.2001, 40];   // inserto cenital (se arma aparte)
const GEN = (k = 0) => [0.2 - k * 0.04, 1.75, -2.3 + k * 0.08, -1.05, 1.28, -0.65, 50];   // P5: general de costado, la puerta a la izquierda
const MANOS = (k = 0) => [LIB0.x + 0.02, 1.86, -0.92 - k * 0.04, LIB0.x, MY, -1.24, 46 - k * 2];   // P5b: las manos y la libreta, por encima del hombro izquierdo
const FRENTE = (k = 0) => [0.5, 1.52, 0.1 - k * 0.1, 0.3, 1.3, -1.9, 44];   // P5c: Rubén de frente (Graciela de espaldas a la izquierda)
const DOS = (k = 0) => [0.6 - k * 0.04, 1.66, 0.9, 0.0, 1.25, -1.3, 60];   // P6: los dos
const PUE = (k = 0) => [1.05, 1.58, -1.5, -1.6, 1.25, 0.15, 44 - k * 2];   // P6b: la puerta desde atrás del mostrador
const ALTA = (k = 0) => [0.4, 2.35 - k * 0.15, -0.72 - k * 0.25, RI.x, 1.42, RI.z + 0.1, 42 - k * 4];   // P6c: cámara alta desde el lado de Héctor
const TAB = (k = 0) => [0.43, 1.42, -0.32 - k * 0.04, 0.42, 1.2, -1.4, 44 - k];   // Q3: la tablet por encima del hombro
const SENT = (k = 0) => [0.42, 1.58, -0.5 - k * 0.12, 0.33, 1.08, -1.72, 50 - k * 3];   // Q4: Rubén sentado, el crucigrama
const PLANOS = [
  ["P1", 0, [[0, ...AP1(0)], [T.ciclos[0][0], ...AP1(-0.05, 45)], [T.ciclos[0][1] + 0.1, 0.52, 1.78, -0.3, 0.46, 1.08, -1.45, 46], [T.p2, 0.52, 1.76, -0.34, 0.46, 1.08, -1.45, 45]]],
  // la órbita de 140° hasta quedar por encima del hombro derecho de Rubén
  ["P2", T.p2, [[T.p2, 0.52, 1.76, -0.34, 0.46, 1.08, -1.45, 45], [T.p2 + 0.15, -0.55, 2.2, -0.45, 0.3, 1.1, -1.5, 46], [T.p2 + 0.3, -1.0, 2.0, -1.75, 0.3, 1.25, -0.9, 50], [T.p2 + 0.45, ...HOMBRO(0)], [T.p3, ...HOMBRO(1)]]],
  ["P3", T.p3, [[T.p3, ...ALM(0)], [T.p3b, ...ALM(-1)]]],
  ["P3b", T.p3b, [[T.p3b, ...LIBG(0)], [T.p4, ...LIBG(1)]]],
  ["P4", T.p4, [[T.p4, ...COB(0)], [T.p4w, ...COB(0.5)]]],
  ["P4w", T.p4w, [[T.p4w, ...COB(0.6)], [T.p4i, ...COB(1.2)]]],
  ["P4i", T.p4i, [[T.p4i, ...CEN], [T.p5, ...CEN]]],
  ["P5", T.p5, [[T.p5, ...GEN(0)], [T.p5b, ...GEN(1)]]],
  ["P5b", T.p5b, [[T.p5b, ...MANOS(0)], [T.p5c, ...MANOS(1)]]],
  ["P5c", T.p5c, [[T.p5c, ...FRENTE(0)], [T.p6, ...FRENTE(0.5)]]],   // (el push-in al antebrazo se arma en renderAt)
  ["P6", T.p6, [[T.p6, ...DOS(0)], [T.p6b, ...DOS(1)]]],
  ["P6b", T.p6b, [[T.p6b, ...PUE(0)], [T.p6c, ...PUE(1)]]],
  ["P6c", T.p6c, [[T.p6c, ...ALTA(0)], [T.push6[0], ...ALTA(0.2)], [T.push6[1], ...ALTA(1)], [P1, ...ALTA(1.1)]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...AP1(0)], [T.frena - 0.1, ...AP1(-0.05, 45)], [T.toca + 0.05, 0.46, 1.66, -0.2, 0.42, 1.3, -1.5, 44], [T.q2, 0.46, 1.66, -0.24, 0.42, 1.3, -1.5, 43]]],
  ["Q2", T.q2, [[T.q2, ...ALM(0)], [T.q2b, ...ALM(-1)]]],
  ["Q2b", T.q2b, [[T.q2b, ...HOMBRO(0.5)], [T.q2c, ...HOMBRO(0.8)]]],
  ["Q2c", T.q2c, [[T.q2c, ...CEN], [T.q2d, ...CEN]]],          // inserto del celular (se arma aparte)
  ["Q2d", T.q2d, [[T.q2d, ...COB(0.3)], [T.q2e, ...COB(1.0)]]],
  ["Q2e", T.q2e, [[T.q2e, ...CEN], [T.q3, ...CEN]]],          // inserto: toca Pagar (se arma aparte)
  ["Q3", T.q3, [[T.q3, ...TAB(0)], [T.grua[0], ...TAB(1)], [T.grua[0] + 0.25, 0.9, 1.75, -1.6, 1.25, 1.65, BZ, 44], [T.grua[1], 1.3, 2.75, -1.75, 1.33, 2.05, BZ + 0.35, 42], [T.q4, 1.3, 2.75, -1.8, 1.33, 2.05, BZ + 0.35, 41]]],
  ["Q4", T.q4, [[T.q4, ...SENT(0)], [DUR, ...SENT(1)]]],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  planoActual = PLANOS[pi][0];
  const v = catmull(PLANOS[pi][2], t);
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const APOYA = { manoI: [0.26, 0.32, 0.4], manoD: [-0.26, 0.32, 0.4], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const BAJA = { manoI: [0.29, 0.02, 0.1], manoD: [-0.29, 0.02, 0.1], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.7, tension: 0.2, feliz: 0 }, cejas: { alto: 0.05, ang: 0.15 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const _w = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// la punta de los dedos (donde se agarra algo), en el mundo
const dedosMano = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.localToWorld(out.set(0, -0.1, 0.02)); };
function manoConDedos(per, pose, lado, mundo) {
  const p1 = manoA(per, { ...pose }, lado, mundo); per.poner(p1);
  const tip = dedosMano(per, lado, new THREE.Vector3());
  const p2 = manoA(per, { ...pose }, lado, mundo.clone().add(mundo.clone().sub(tip))); per.poner(p2);
  const tip2 = dedosMano(per, lado, new THREE.Vector3());
  return manoA(per, { ...pose }, lado, mundo.clone().add(mundo.clone().sub(tip2)).add(mundo.clone().sub(tip)).sub(mundo.clone().sub(tip)));
}
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const mezclaMano = (pose, p1, lado, k) => { pose[`mano${lado}`] = pose[`mano${lado}`].map((v, i) => lerp(v, p1[`mano${lado}`][i], k)); if (k > 0.5) pose[`codo${lado}`] = p1[`codo${lado}`]; };
const adelanteDe = (per, d) => V3(Math.sin(per.raiz.rotation.y) * d, 0, Math.cos(per.raiz.rotation.y) * d);
const mirarA = (per, x, z) => Math.atan2(x - per.x, z - per.z);

// ---------- Rubén ----------
const RK = [
  [0, { x: RI.x, z: RI.z, giro: 0, inclina: 0.06, ...APOYA, ...aC(-0.25, 0.08), ...CARA.neutra, ojos: { x: -0.3, y: -0.1, abiertos: 0.85 }, boca: { sonrisa: 0.2 } }],
  [1.2, { ...aC(-0.05, 0.3), ojos: { x: 0, y: -0.6, abiertos: 0.8 } }, 0.3],
  [T.p2 + 0.2, { ...aC(0.0, 0.25) }, 0.3],
  // P3b/P4: muestra la libreta (de frente al cliente), mira al cliente
  [T.p4 - 0.001, { inclina: 0.1, ...aC(0.05, 0.08), ...CARA.neutra, ojos: { x: 0, y: 0.05, abiertos: 0.9 }, cejas: { alto: 0.15, ang: 0.1 }, boca: { sonrisa: 0.05 } }, 0.001],
  [T.w2 + 0.9, { ...aC(0.0, 0.2), ojos: { x: 0, y: -0.5, abiertos: 0.8 }, cejas: { alto: 0.25, ang: 0.45 }, boca: { sonrisa: -0.15 } }, 0.35],
  // P5: mira a Graciela que entra (a su derecha, -x)
  [T.p5 - 0.001, { inclina: 0.06, ...aC(-0.55, 0.0), ...CARA.neutra, ojos: { x: -0.5, y: 0, abiertos: 0.9 } }, 0.001],
  [T.g2 + 0.6, { ...aC(-0.35, 0.05), ...CARA.sonrisa, ojos: { x: -0.4, abiertos: 0.95, feliz: 0.2 } }, 0.3],
  [T.p5b - 0.001, { inclina: 0.14, ...aC(0.0, 0.45), ...CARA.neutra, ojos: { x: 0, y: -0.7, abiertos: 0.8 } }, 0.001],
  // P5c: cara de nada (ojos abiertos); mira la libreta cerrada; levanta la vista
  [T.p5c - 0.001, { inclina: 0.05, ...aC(0.0, 0.18, 0.0), ...NADA, ojos: { x: 0, y: -0.4, abiertos: 0.72, tension: 0.2 } }, 0.001],
  [T.p5c + 0.45, { ...aC(-0.12, 0.02, 0.0), ojos: { x: -0.2, y: 0.05, abiertos: 0.72, tension: 0.2 } }, 0.3],
  [T.brazo[1], { ...aC(0.12, 0.22, 0.0), ojos: { x: 0.25, y: -0.65, abiertos: 0.72 } }, 0.3],
  [T.r1 + 0.05, { ...aC(0.12, 0.26, 0.0), ojos: { x: 0.25, y: -0.7, abiertos: 0.7 } }, 0.2],
  // P6: mira a Héctor en la puerta; P6c: agacha la cabeza (cuello y torso), manos apoyadas
  [T.p6 - 0.001, { inclina: 0.06, ...APOYA, ...aC(-0.3, 0.05), ...NADA }, 0.001],
  [T.p6b + 0.1, { ...aC(-0.65, 0.02), ojos: { x: -0.6, y: 0.05, abiertos: 0.75 } }, 0.3],
  [T.p6c - 0.001, { inclina: 0.06, ...APOYA, ...aC(-0.25, 0.02, 0.0), ...NADA }, 0.001],
  [T.agacha[1], { ...AGACHA, ...NADA, ojos: { x: 0, y: -0.55, abiertos: 0.95 } }, T.agacha[1] - T.agacha[0], (u) => eio(u)],
  // ---- parte 2 ----
  [P2 - 0.001, { x: RI.x, z: RI.z, giro: 0, inclina: 0.06, y: 0, sentado: 0, ...APOYA, ...aC(-0.25, 0.08), ...CARA.sonrisa, ojos: { x: -0.3, y: -0.1, abiertos: 1, feliz: 0.25 } }, 0.001],
  [T.frena, { ...aC(0.0, 0.32), ojos: { x: 0, y: -0.7, abiertos: 0.95 } }, 0.25],
  [T.r2 + 0.15, { ...aC(-0.2, 0.05), ...BUENA, ojos: { x: -0.3, y: 0, abiertos: 1, feliz: 0.35 } }, 0.3],
  [T.q2b - 0.001, { inclina: 0.06, ...APOYA, ...aC(0.05, 0.05), ...BUENA }, 0.001],
  [T.q3 - 0.001, { inclina: 0.12, ...APOYA, ...aC(0.05, 0.38), ...BUENA, ojos: { x: 0.1, y: -0.7, abiertos: 0.95, feliz: 0.3 } }, 0.001],
  // Q4: sentado en el banquito, el mate en la izquierda, el diario
  [T.q4 - 0.001, { x: RI.x + 0.02, z: RI.z - 0.1, y: -0.02, sentado: 1, inclina: 0.18, giro: 0, ...aC(0.0, 0.35), ...BUENA, ojos: { x: 0, y: -0.75, abiertos: 0.95, feliz: 0.3 } }, 0.001],
];
// ---------- Graciela ----------
const G1 = { x: 0.0, z: -0.72 };     // P1/Q1: en el mostrador, a la izquierda de la libreta
const G5 = { x: -0.35, z: -0.8 };     // P5: llega al mostrador
const PUERTA_IN = V3(LX + 0.45, 0, 0.25);
const GK = [
  [0, { x: G1.x, z: G1.z, giro: Math.PI - 0.55, inclina: 0.06, ...BRAZOS.costado, ...aC(-0.55, 0.05), ...CARA.feliz, ojos: { x: 0.3, y: 0, abiertos: 1, feliz: 0.3 } }],
  // P5: entra por la puerta con el monedero abierto (derecha) y llega al mostrador
  [T.p5 - 0.001, { x: PUERTA_IN.x, z: PUERTA_IN.z, giro: 2.2, paso: 1, inclina: 0, ...BRAZOS.costado, ...aC(0.2, 0), ...CARA.feliz, ojos: { x: 0.2, abiertos: 1, feliz: 0.3 } }, 0.001],
  [T.entraG[1], { x: G5.x, z: G5.z, giro: Math.PI - 0.25 }, T.entraG[1] - T.entraG[0], (u) => eo(u)],
  [T.entraG[1] + 0.12, { paso: 0 }, 0.12],
  // P5c: espera (de espaldas a la cámara, parpadea, sonríe)
  [T.p5c - 0.001, { x: G5.x - 0.05, z: G5.z + 0.05, giro: Math.PI + 0.2, paso: 0, ...BRAZOS.costado, ...aC(0.0, 0.0), ...CARA.sonrisa }, 0.001],
  // P6: deja los billetes, saluda y se va hacia la puerta
  [T.p6 - 0.001, { x: G5.x, z: G5.z, giro: Math.PI - 0.25, paso: 0, ...aC(0.2, 0.05), ...CARA.feliz }, 0.001],
  [T.saleG[1], { x: G5.x - 0.75, z: G5.z + 0.45, giro: -1.3, paso: 1 }, T.saleG[1] - T.saleG[0], (u) => eio(u)],
  // parte 2 (Q1): igual que en P1
  [P2 - 0.001, { x: G1.x, z: G1.z, giro: Math.PI - 0.55, paso: 0, inclina: 0.06, ...BRAZOS.costado, ...aC(-0.55, 0.05), ...CARA.feliz, ojos: { x: 0.3, y: 0, abiertos: 1, feliz: 0.3 } }, 0.001],
];
// ---------- los clientes del desfile y de cobrar (en CLI, de frente a Rubén) ----------
const CLIP = (extra = {}) => ({ x: CLI.x, z: CLI.z, giro: Math.PI, inclina: 0.04, paso: 0, ...APOYA, ...aC(0, 0.06), ...CARA.sonrisa, ...extra });
// el time-lapse: entra rápido desde la izquierda de Rubén (la puerta) y sale hacia el otro lado
function desfile(t, tIn, tOut) {
  const a = eo(sg(t, tIn, tIn + 0.14)), b = eio(sg(t, tOut, tOut + 0.14));
  return { dx: (1 - a) * 1.5 - b * 1.6, vis: t >= tIn && t < tOut + 0.14 };
}

// ================= EL LÁPIZ EN EL TIEMPO =================
// ciclo: [a agarra, b escribe, c saca punta, d vuelve a la oreja, e en la oreja]
function largoEn(t) {
  let L = T.largos[0];
  T.ciclos.forEach(([, , c, d], i) => { if (t >= (c + d) / 2) L = T.largos[i + 1]; });
  if (t >= P2) L = T.largos[0];
  return L;
}
// un punto de la página (lienzo PAG) en el mundo
function puntoPagina(cx, cy, y = 0) {
  libreta.updateMatrixWorld(true);
  const lx = (cx / PAG.W - 0.5) * LIB_W, lz = 0.008 + (cy / PAG.H) * LIB_H;
  return libreta.localToWorld(V3(lx, libreta.userData.top + 0.002 + y, lz));
}
// dónde va la punta mientras escribe la línea del ciclo i (u 0..1 de toda la escritura: dos renglones)
function puntaEscribiendo(i, u) {
  const P = PAGINAS[i] || PAGINAS[0];
  const a = P[2], b = P[3] || "";
  const wa = anchoTxt(a), wb = anchoTxt(b);
  const fa = wa / (wa + wb + 1);
  const ren = u < fa ? 2 : 3, k = u < fa ? u / fa : (u - fa) / (1 - fa);
  const w = ren === 2 ? wa : wb;
  const cx = PAG.MX + w * k, cy = PAG.R0 + ren * PAG.DR - 14 - 30 + Math.sin(u * 90) * 14;
  const alto = Math.abs(Math.sin(u * 45)) * 0.004;
  return puntoPagina(cx, cy, alto);
}
// estado del lápiz y de la mano derecha de Rubén: { modo: "oreja" | "mano", punta, dir, gira }
function lapizEstado(t) {
  for (let i = 0; i < T.ciclos.length; i++) {
    const [a, b, c, d, e] = T.ciclos[i];
    if (!en(t, a, e + 0.18)) continue;
    const m = a + (b - a) * 0.45;
    if (t < m) return { modo: "oreja", mano: "aOreja", k: eio(sg(t, a, m)) };
    if (t < b) return { modo: "mano", mano: "aLibreta", k: eio(sg(t, m, b)), i };
    if (t < c) return { modo: "mano", mano: "escribe", u: sg(t, b, c), i };
    if (t < d) { const s = sg(t, c, d); return { modo: "mano", mano: "sacaPunta", k: eio(cl(s / 0.35)), gira: cl((s - 0.35) / 0.65), i }; }
    if (t < e) return { modo: "mano", mano: "vuelve", k: eio(sg(t, d, e)), i };
    return { modo: "oreja", mano: "baja", k: 1 - eio(sg(t, e, e + 0.18)) };
  }
  // parte 2: la mano va sola a la oreja, se frena y toca la tablet (el lápiz no se mueve); Q4: saca el lápiz y escribe
  if (en(t, T.mano[0], T.toca + 0.35)) return { modo: "oreja", mano: "dudaQ1" };
  if (t >= T.sacaQ4[0]) return { modo: t < (T.sacaQ4[0] + T.sacaQ4[1]) / 2 ? "oreja" : "mano", mano: "crucigrama" };
  return { modo: "oreja", mano: null };
}
const DIR_ESCRIBE = V3(-0.35, -1, 0.15).normalize();   // el lápiz inclinado al escribir (la goma hacia la derecha de Rubén)
const DIR_SACA = V3(1, -0.05, 0.2).normalize();
// la mano derecha de Rubén lleva el lápiz: dedos en el lápiz, a 4 cm de la punta al escribir
function posarLapizYMano(t, pr) {
  const L = largoEn(t);
  lapiz.userData.setLargo(L);
  const st = lapizEstado(t);
  ruben.poner(pr);
  const oreja = lapizEnOreja(L);
  // dónde agarran los dedos el lápiz, y la dirección del lápiz
  let agarre = null, dir = null;
  const enLib = (i, u) => { const p = puntaEscribiendo(i, u); return { p, ag: p.clone().sub(DIR_ESCRIBE.clone().multiplyScalar(0.045)) }; };
  const enSac = () => { const p = bocaSac(); return { p, ag: p.clone().sub(DIR_SACA.clone().multiplyScalar(0.05)) }; };
  const mano = st.mano;
  if (mano === "aOreja" || mano === "dudaQ1") {
    // la mano sube por el costado de la cabeza (sin cruzar la cara) hasta el lápiz
    let k = st.k ?? 0;
    if (mano === "dudaQ1") {
      const sube = eio(sg(t, T.mano[0], T.mano[1])), baja = eio(sg(t, T.frena, T.toca));
      k = sube * (1 - baja) * 0.75;   // se frena a mitad de camino
    }
    if (k > 0.001) {
      const desde = manoMundo(ruben, "D", new THREE.Vector3()).clone();
      const costado = oreja.mitad.clone().add(V3(-0.12, -0.12, 0.06));
      const obj = k < 0.6 ? desde.lerp(costado, k / 0.6) : costado.lerp(oreja.mitad.clone().add(V3(-0.02, -0.03, 0)), (k - 0.6) / 0.4);
      const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.3, -0.3] }, "D", obj);
      mezclaMano(pr, p1, "D", Math.min(1, k * 1.5));
    }
    if (mano === "dudaQ1" && t >= T.frena) {
      // baja y toca la tablet con el índice
      const tp = tablet.localToWorld(V3(-0.1, 0.215, 0.03));
      const kk = eio(sg(t, T.frena, T.toca)) * (1 - eio(sg(t, T.toca + 0.06, T.toca + 0.24)));
      const p2 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.6, -0.2] }, "D", tp);
      mezclaMano(pr, p2, "D", kk); pr.dedoD = kk;
    }
  } else if (mano === "aLibreta") {
    const de = oreja.mitad, a = enLib(st.i, 0).ag.add(V3(0, 0.05, 0));
    agarre = de.clone().lerp(a, st.k).add(V3(-0.08, 0.05, 0.05).multiplyScalar(Math.sin(Math.PI * st.k)));
    dir = oreja.d.clone().lerp(DIR_ESCRIBE, st.k).normalize();
  } else if (mano === "escribe") {
    const e = enLib(st.i, st.u); agarre = e.ag; dir = DIR_ESCRIBE.clone();
  } else if (mano === "sacaPunta") {
    const de = enLib(st.i, 1).ag, s = enSac();
    agarre = de.clone().lerp(s.ag, st.k).add(V3(0, 0.06, 0).multiplyScalar(Math.sin(Math.PI * st.k)));
    dir = DIR_ESCRIBE.clone().lerp(DIR_SACA, st.k).normalize();
  } else if (mano === "vuelve") {
    const s = enSac();
    agarre = s.ag.clone().lerp(oreja.mitad, st.k).add(V3(-0.1, 0.05, 0.05).multiplyScalar(Math.sin(Math.PI * st.k)));
    dir = DIR_SACA.clone().lerp(oreja.d, st.k).normalize();
  } else if (mano === "baja") {
    // la mano vuelve al mostrador desde la oreja
    const k = st.k;
    if (k > 0.001) { const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.3, -0.3] }, "D", oreja.mitad.clone().add(V3(-0.02, -0.03, 0))); mezclaMano(pr, p1, "D", k); }
  } else if (mano === "crucigrama") {
    const a0 = T.sacaQ4[0], a1 = T.sacaQ4[1];
    const kO = eio(sg(t, a0, (a0 + a1) / 2)), kL = eio(sg(t, (a0 + a1) / 2, a1));
    diario.updateMatrixWorld(true);
    const nL = 5, u = sg(t, T.fiado[0], T.fiado[1]);
    const iL = Math.min(nL - 1, Math.floor(u * nL)), fu = u * nL - iL;
    const cas = diario.localToWorld(diario.userData.casilla(iL).add(V3(Math.sin(fu * 18) * 0.012, 0.004 + Math.abs(Math.sin(fu * Math.PI * 3)) * 0.008, Math.cos(fu * 14) * 0.01)));
    const ag = cas.clone().sub(DIR_ESCRIBE.clone().multiplyScalar(0.045));
    const DQ = V3(0.55, -1, -0.45).normalize();
    const ag2 = cas.clone().sub(DQ.clone().multiplyScalar(0.045));
    const kv = eio(sg(t, T.fiado[1] + 0.05, T.fiado[1] + 0.4));
    if (t < (a0 + a1) / 2) {
      const desde = manoMundo(ruben, "D", new THREE.Vector3()).clone();
      const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.3, -0.3] }, "D", desde.lerp(oreja.mitad.clone().add(V3(-0.02, -0.03, 0)), kO));
      mezclaMano(pr, p1, "D", kO);
    } else if (kv < 1) {
      agarre = oreja.mitad.clone().lerp(ag2, kL * (1 - kv)).add(V3(-0.08, 0.05, 0.04).multiplyScalar(Math.sin(Math.PI * kL) + Math.sin(Math.PI * kv)));
      dir = oreja.d.clone().lerp(DQ, kL * (1 - kv)).normalize();
    } else {
      st.modo = "oreja";
      const kb = 1 - eio(sg(t, T.fiado[1] + 0.4, T.fiado[1] + 0.6));
      if (kb > 0.001) { const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.3, -0.3] }, "D", oreja.mitad.clone().add(V3(-0.02, -0.03, 0))); mezclaMano(pr, p1, "D", kb); }
    }
  }
  if (st.modo === "mano" && agarre) {
    const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.6, -0.15] }, "D", agarre);
    pr.manoD = p1.manoD; pr.codoD = p1.codoD; pr.dedoD = 0;
    ruben.poner(pr);
    // el lápiz: la goma atrás, la punta adelante; los dedos a 4,5 cm de la punta (gira sobre su eje al sacar punta)
    const punta = agarre.clone().add(dir.clone().multiplyScalar(0.045));
    lapiz.position.copy(punta.clone().sub(dir.clone().multiplyScalar(L)));
    lapiz.quaternion.setFromUnitVectors(_y, dir);
    if (st.gira) lapiz.quaternion.premultiply(_q.setFromAxisAngle(dir, st.gira * 9));
  } else {
    ruben.poner(pr);
    lapizEnOreja(L);
  }
  return st;
}

// ================= LA LIBRETA EN EL TIEMPO =================
let claveP = "", claveH0 = "";
function pagina(tex, clave, renglones, op = {}) {
  dibujarPagina(tex.userData.x, renglones, op); tex.needsUpdate = true;
}
function ponerLibreta(t, plano) {
  const L = libreta.userData;
  let estado = { T: 0.014, T2: 0.01, tapa: 1, hoja: -1, gorda: 0 }, pos = LIB0.clone(), rot = 0;
  let pg = null, hojaPg = null;
  const parte2 = t >= P2;
  // la página según el ciclo (en P2 pasa una hoja al empezar cada ciclo)
  if (t < T.p3) {
    let i = 0; T.ciclos.forEach(([a], j) => { if (t >= a) i = j; });
    const [a, b, c] = T.ciclos[i];
    const u = sg(t, b, c);
    const P = PAGINAS[i];
    const wa = anchoTxt(P[2]), wb = anchoTxt(P[3] || "");
    const fa = wa / (wa + wb + 1);
    const ka = cl(u / fa), kb = cl((u - fa) / (1 - fa));
    pg = { clave: `c${i}|${Math.round(ka * 40)}|${Math.round(kb * 40)}`, ren: RENG([P[0], P[1], { t: P[2], k: ka }, ...(P[3] ? [{ t: P[3], k: kb }] : [])]) };
    if (i > 0 && t < a + Math.min(0.2, (b - a) * 0.8)) { estado.hoja = sg(t, a, a + Math.min(0.2, (b - a) * 0.8)); hojaPg = { clave: `h${i - 1}`, ren: RENG(PAGINAS[i - 1]) }; }
    estado.T = 0.014 + i * 0.0025; estado.T2 = 0.01 + i * 0.003;
  } else if (t < T.p4) {
    estado = { T: 0.032, T2: 0.0, tapa: 0, hoja: -1, gorda: 1 };   // cerrada y gorda (con la gomita)
    pg = { clave: "h1", ren: RENG(PAGINAS[1]) };
  } else if (t < T.p5) {
    estado = { T: 0.03, T2: 0.012, tapa: 1, hoja: -1, gorda: 1 };
    pg = plano === "P4" ? { clave: "h1full", ren: RENG(PAGINAS[1]) } : { clave: "martes", ren: MARTES.ren, cab: MARTES.cab, extra: manchaMate };
    if (plano === "P4i") {
      // el inserto: la libreta gira sobre su centro (la mano la gira 90° y 180°)
      rot = (Math.PI / 2) * eio(sg(t, T.gira[0], T.gira[0] + 0.18)) + (Math.PI / 2) * eio(sg(t, T.gira[1], T.gira[1] + 0.18));
    }
  } else if (t < P2) {
    // P5: abierta en el martes; P5b pasa las hojas hasta la última (llena), la contratapa (llena), cierra
    estado = { T: 0.03, T2: 0.012, tapa: 1, hoja: -1, gorda: 1 };
    pg = { clave: "martes", ren: MARTES.ren, cab: MARTES.cab, extra: manchaMate };
    if (t >= T.pasa[0]) {
      const u = sg(t, T.pasa[0], T.pasa[1]);
      estado.T = lerp(0.03, 0.0015, eio(u)); estado.T2 = lerp(0.012, 0.04, eio(u));
      if (u < 1) { estado.hoja = (u * 5) % 1; hojaPg = { clave: "martes", ren: MARTES.ren, cab: MARTES.cab, extra: manchaMate }; }
      pg = u < 0.8 ? { clave: "varias", ren: RENG(PAGINAS[5]) } : { clave: "llena", ren: [], extra: hojaLlena };
    }
    if (t >= T.contra[0]) {
      const u = sg(t, T.contra[0], T.contra[1]);
      estado.hoja = u < 1 ? u : -1; hojaPg = { clave: "llena", ren: [], extra: hojaLlena };
      estado.sinHojas = u > 0.5;
    }
    if (t >= T.cierra[0]) { estado.tapa = 1 - eio(sg(t, T.cierra[0], T.cierra[1])); estado.T = 0.0015; estado.T2 = 0.042; estado.sinHojas = true; estado.hoja = -1; }
    if (t >= T.cierra[1]) estado.gorda = 1;
  } else {
    // parte 2: la libreta no está en el mostrador; Rubén la saca de abajo y la deja en el estante (Q3)
    estado = { T: 0.032, T2: 0.0, tapa: 0, hoja: -1, gorda: 1 };
  }
  // la página y la hoja que pasa (redibujar solo si cambia)
  if (pg && pg.clave !== claveP) { claveP = pg.clave; pagina(pagT, pg.clave, pg.ren, { cabecera: pg.cab, extra: pg.extra }); }
  if (hojaPg && hojaPg.clave !== claveH0) { claveH0 = hojaPg.clave; pagina(hojaT, hojaPg.clave, hojaPg.ren, { cabecera: hojaPg.cab, extra: hojaPg.extra }); }
  L.poner(estado);
  L.top = estado.sinHojas ? 0.006 : 0.005 + estado.T;
  // en el inserto gira sobre el centro de la hoja
  const centro = V3(0, 0, 0.008 + LIB_H / 2);
  libreta.rotation.set(0, rot, 0);
  libreta.position.copy(pos).sub(centro.clone().applyAxisAngle(_y, rot)).add(centro);
  libreta.visible = !parte2;
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
let ultimaPH = null;
function ponerPersonajes(t, plano) {
  const parte2 = t >= P2;
  // ---- Rubén ----
  const pr = poseEn(t, RK);
  // P4: le muestra la libreta a Héctor y a Walter con el índice sobre la hoja
  if (en(t, T.p4, T.p4i)) {
    ruben.poner(pr);
    const k = eio(sg(t, T.p4 - 0.2, T.p4 + 0.25));
    const obj = puntoPagina(PAG.MX + 200, PAG.R0 + (plano === "P4" ? 2 : 1) * PAG.DR - 40, 0.01);
    const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.6, -0.2] }, "D", obj);
    mezclaMano(pr, p1, "D", k); pr.dedoD = 1;
  }
  // P4i: la mano izquierda gira la libreta desde la esquina
  if (plano === "P4i") {
    ruben.poner(pr);
    libreta.updateMatrixWorld(true);
    const esq = libreta.localToWorld(V3(LIB_W / 2 + 0.01, 0.02, 0.008 + LIB_H * 0.85));
    const p1 = manoConDedos(ruben, { ...pr, codoI: [1, -0.6, -0.2] }, "I", esq);
    pr.manoI = p1.manoI; pr.codoI = p1.codoI;
  }
  // P5b: la mano izquierda pasa las hojas (en el borde de abajo de la hoja); la tapa se cierra
  if (plano === "P5b") {
    ruben.poner(pr);
    libreta.updateMatrixWorld(true);
    const ka = sg(t, T.pasa[0], T.pasa[1]);
    const borde = libreta.localToWorld(V3(LIB_W * 0.3, 0.05 + Math.sin(ka * Math.PI * 5) * 0.03, 0.008 + LIB_H * (0.95 - Math.abs(Math.sin(ka * Math.PI * 5)) * 0.4)));
    const p1 = manoConDedos(ruben, { ...pr, codoI: [1, -0.6, -0.2] }, "I", borde);
    pr.manoI = p1.manoI; pr.codoI = p1.codoI;
  }
  // P5c: da vuelta el antebrazo izquierdo hacia cámara, palma arriba, a la altura del pecho
  if (en(t, T.p5c, T.p6)) {
    const k = eio(sg(t, T.brazo[0], T.brazo[1]));
    pr.manoI = APOYA.manoI.map((v, i) => lerp(v, BRAZOS.muestraBrazo.manoI[i], k));
    pr.codoI = k > 0.3 ? BRAZOS.muestraBrazo.codoI : null;
  }
  // P6: le cobra a Graciela (los billetes quedan en la madera)
  bocaVoz(pr, t, T.r1, ENV.r1, 0.55);
  bocaVoz(pr, t, T.r2, ENV.r2, 0.55);
  // Q3: guarda la libreta en el estante (de abajo del mostrador, con la izquierda)
  if (en(t, T.q3 + 0.9, T.q4)) {
    ruben.poner(pr);
    const k = eio(sg(t, T.q3 + 0.9, T.q3 + 1.15)) * (1 - eio(sg(t, T.apoya + 0.05, T.apoya + 0.3)));
    const p1 = manoConDedos(ruben, { ...pr, codoI: [1, -0.4, -0.3] }, "I", libretaQ3(t).add(V3(0.0, 0.03, 0.12)));
    mezclaMano(pr, p1, "I", k);
    if (t > T.q3 + 1.0) pr.giro = lerp(0, Math.PI * 0.9, eio(sg(t, T.q3 + 0.95, T.q3 + 1.35)));
  }
  // Q4: el mate en la izquierda (sorbo)
  if (t >= T.q4) {
    pr.manoI = [0.3, 0.6, 0.36]; pr.codoI = [1, -0.6, -0.2];
  }
  const st = posarLapizYMano(t, pr);

  // ---- Graciela ----
  const pg = poseEn(t, GK);
  
  if (en(t, T.p5, T.p6)) { pg.manoD = [-0.16, 0.36, 0.36]; pg.codoD = [-1, -0.6, -0.2]; }
  if (en(t, T.p6, P2)) {
    const kb = pulso(t, T.billetes - 0.15, 0.4);
    pg.manoD = [-0.16 + kb * 0.02, 0.36 - kb * 0.05, 0.36 + kb * 0.12]; pg.codoD = [-1, -0.6, -0.2];
    if (t > T.billetes + 0.15) Object.assign(pg, mezclar(pg, saludo(t, "I", 1), eio(sg(t, T.billetes + 0.15, T.billetes + 0.35))));
  }
  bocaVoz(pg, t, T.g1, ENV.g1, 0.6); bocaVoz(pg, t, T.g1b, ENV.g1, 0.6); bocaVoz(pg, t, T.g2, ENV.g2, 0.6);
  graciela.poner(pg);

  // ---- Héctor, Walter y Marta ----
  const ph = poseEn(t, [[0, CLIP({ ...CARA.sonrisa })]]);
  const pw = poseEn(t, [[0, CLIP({ ...CARA.sonrisa, giro: Math.PI + 0.1 })]]);
  const pm = poseEn(t, [[0, CLIP({ ...CARA.feliz })]]);
  let hv = false, wv = false, mv = false;
  if (en(t, T.p2, T.p3)) {
    const dH = desfile(t, T.llega[0], T.llega[1]), dW = desfile(t, T.llega[1], T.llega[2]), dM = desfile(t, T.llega[2], T.cli[3] - 0.08);
    ph.x += dH.dx; hv = dH.vis; pw.x += dW.dx; wv = dW.vis; pm.x += dM.dx; mv = dM.vis;
    // el producto en la mano izquierda, adelante
    ph.manoI = [0.18, 0.45, 0.4]; pw.manoI = [0.16, 0.42, 0.42]; pm.manoI = [0.17, 0.4, 0.42];
  }
  if (en(t, T.p4, T.p4i)) {
    if (t < T.p4w) { hv = true; Object.assign(ph, { ...CARA.sorpresa, cejas: { alto: 0.7, ang: 0.15 }, boca: { sonrisa: 0.15, abierta: 0.1 }, ...aC(0.0, 0.18) }); }
    else { wv = true; Object.assign(pw, { ...CARA.esperanza, cejas: { alto: 0.45, ang: 0.55 }, ...aC(0.12, 0.08, 0.06), giro: Math.PI }); pw.manoD = [-0.27, 0.78, -0.08]; pw.codoD = [-1, 0.3, -0.4]; }
  }
  // P6b: Héctor entra por la puerta con la billetera; P6c: se arrima a leer, se acomoda los lentes
  if (en(t, T.p6b, P1)) {
    hv = true;
    const u = eo(sg(t, T.entraH[0], T.entraH[1]));
    const H6 = { x: RI.x + 0.05, z: CLI.z - 0.12 };
    Object.assign(ph, { x: lerp(PUERTA_IN.x, -0.6, u), z: lerp(PUERTA_IN.z, -0.6, u), giro: lerp(1.6, 2.4, u), paso: u < 1 ? 1 : 0, ...BRAZOS.costado, ...CARA.esperanza, ...aC(0, 0.0) });
    ph.manoD = [-0.15, 0.42, 0.38]; ph.codoD = [-1, -0.6, -0.2];
    if (t >= T.p6c) {
      const k = eio(sg(t, T.p6c + 0.25, T.lee));
      Object.assign(ph, { x: lerp(-0.6, -0.3, k), z: lerp(-0.6, -0.86, k), giro: lerp(2.6, Math.PI - 0.35, k), paso: 0, inclina: 0.25 * k, ...aC(0.1, 0.3 * k), ...CARA.concentrada, ojos: { x: 0.2, y: -0.8, abiertos: 0.9 } });
      const kl = eio(sg(t, T.lee, T.lee + 0.25));
      ph.manoD = [-0.1, lerp(0.42, 0.7, kl), lerp(0.38, 0.36, kl)]; ph.codoD = [-1, -0.4, -0.2];
    }
  }
  // parte 2: Héctor entra (Q2b), el celular en la izquierda (Q2c-Q2e)
  if (t >= T.q2b && t < T.q3) {
    hv = true;
    const u = eo(sg(t, T.entraH2[0], T.entraH2[1]));
    Object.assign(ph, CLIP({ ...CARA.sonrisa }), { x: CLI.x - (1 - u) * 1.2, paso: u < 1 ? 1 : 0 });
    if (t >= T.boca) ph.boca = { sonrisa: 0.1, abierta: 0.35, ancho: 0.8 };
    if (t >= T.vibra) { Object.assign(ph, { ...CARA.sorpresa, ...aC(0.0, 0.35), ojos: { x: 0, y: -0.8, abiertos: 1 } }); }
    const kc = eio(sg(t, T.vibra, T.vibra + 0.2));
    ph.manoI = [lerp(0.26, 0.08, kc), lerp(0.3, 0.55, kc), lerp(0.36, 0.42, kc)]; ph.codoI = [0.8, -0.8, -0.2];
    if (t >= T.q2d) { Object.assign(ph, { ...CARA.feliz, ...aC(0.0, 0.05), ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.35 } }); ph.manoI = [0.12, 0.4, 0.42]; }
  }
  for (const [t0, e] of [[T.cli[0], "h1"], [T.h2, "h2"], [T.h3, "h3"], [T.h4, "h4"]]) bocaVoz(ph, t, t0, ENV[e], 0.6);
  bocaVoz(pw, t, T.cli[1], ENV.w1, 0.5); bocaVoz(pw, t, T.w2, ENV.w2, 0.55);
  bocaVoz(pm, t, T.cli[2], ENV.m1, 0.6);
  hector.poner(ph); walter.poner(pw); marta.poner(pm); ultimaPH = ph;

  // ---- visibilidad por plano (los que no están en cuadro no tapan la cámara) ----
  ruben.raiz.visible = !["P3", "P5", "Q2", "Q2c", "Q2e"].includes(plano);
  graciela.raiz.visible = (["P1", "Q1"].includes(plano)) || (["P5", "P5c", "P6"].includes(plano) && t < T.saleG[1] + 0.05);
  hector.raiz.visible = hv && !["P3", "P3b", "P4i", "Q2", "Q2c", "Q2e", "Q3", "Q4"].includes(plano);
  walter.raiz.visible = wv && ["P2", "P4w"].includes(plano);
  marta.raiz.visible = mv && plano === "P2";
  // en los insertos cenitales las cabezas quedarían cortadas en el borde
  ruben.cabeza.visible = plano !== "P4i";
  return st;
}
// la libreta jubilada (Q3): sale de debajo del mostrador en la mano izquierda de Rubén y queda acostada en el estante
function libretaQ3(t) {
  const desde = V3(RI.x + 0.25, 0.75, RI.z + 0.2), arriba = V3(1.15, 2.2, BZ + 0.55);
  const u = eio(sg(t, T.q3 + 1.0, T.apoya));
  const p = desde.clone().lerp(arriba, Math.min(1, u * 1.2)).lerp(JUBILA, cl((u - 0.7) / 0.3));
  return t >= T.apoya ? JUBILA.clone() : p;
}
const libretaJ = crearLibretaFiado({ W: LIB_W, H: LIB_H, paginaTex: pagT, hojaTex: hojaT, contraTex: contraT });
libretaJ.userData.poner({ T: 0.032, T2: 0, tapa: 0, gorda: 1 }); scene.add(libretaJ);

function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  ponerLibreta(t, plano);
  ponerPersonajes(t, plano);
  for (const per of TODOS) per.ojoLejano(camera.position);
  for (const [per, aros] of LENTES) lenteLejano(per, aros);
  herraduraSegunCamara();
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---- la puerta y la campanita ----
  {
    const abre = (a, b) => eio(sg(t, a - 0.1, a + 0.2)) * (1 - eio(sg(t, b, b + 0.35)));
    const k = Math.max(abre(T.p5, T.entraG[1]), abre(T.p6b, T.entraH[1]), abre(T.q2b - 0.2, T.entraH2[1]));
    hoja.rotation.y = 1.4 * k;
    let tc = -9; for (const a of [0, T.p5, T.p6b, P2, T.q2b - 0.2]) if (t >= a) tc = a;
    campanita.userData.cb.rotation.z = Math.sin((t - tc) * 30) * 0.5 * Math.exp(-(t - tc) * 4);
  }
  // ---- el reloj de pared: 10:15 y la aguja de los segundos ----
  reloj.userData.poner(10, 15 + Math.floor(t / 60), Math.floor(t) % 60);
  // ---- el almanaque: las hojas que se arrancan en el desfile; el 30 con COBRAR; en la parte 2, el 30 limpio ----
  {
    const A = almanaque.userData;
    let dia = 1, vuela = null;
    for (const [a, de, a2] of T.hojas) { if (t >= a) dia = a2; if (en(t, a, a + 0.5)) vuela = [de, sg(t, a, a + 0.5)]; }
    let cobrar = false;
    if (t >= T.hoja30 && !parte2) { dia = 30; cobrar = true; }
    if (en(t, T.hoja30, T.hoja30 + 0.45)) vuela = [29, sg(t, T.hoja30, T.hoja30 + 0.45)];
    if (parte2) { dia = t >= T.hoja30b ? 30 : 29; if (en(t, T.hoja30b, T.hoja30b + 0.45)) vuela = [29, sg(t, T.hoja30b, T.hoja30b + 0.45)]; }
    A.dia(dia, cobrar);
    A.vuela(vuela ? vuela[0] : 1, vuela ? vuela[1] : 0, 1);
  }
  // ---- utilería del mostrador ----
  mateR.position.copy(MATE_C); mateR.rotation.set(0, -1.0, 0);
  termo.position.copy(TERMO_C); termo.rotation.set(0, 0.6, 0);
  if (t >= T.q4) {
    // Q4: el mate en la mano izquierda de Rubén
    const p = manoMundo(ruben, "I", _a);
    mateR.position.copy(p).add(V3(0.0, -0.12, 0.03)); mateR.rotation.set(0, -Math.PI / 2, 0);
  }
  mateR.visible = !["P4i", "P5b"].includes(plano);
  sacapuntas.visible = !parte2 || plano === "Q4";
  // las virutas: caen del sacapuntas en cada ciclo y se quedan en el mostrador
  for (const { v, c, i, fin, rot, ret } of VIRUTAS) {
    const d = T.ciclos[c][3], t0 = T.ciclos[c][2] + (d - T.ciclos[c][2]) * 0.45 + ret;
    v.visible = t >= t0 && !parte2;
    if (!v.visible) continue;
    const u = sg(t, t0, t0 + 0.28);
    const ini = bocaSac();
    v.position.copy(ini.clone().lerp(fin, u)); v.position.y = lerp(ini.y + 0.01, fin.y, u * u) + Math.sin(u * Math.PI) * 0.025;
    v.rotation.set(rot[0] + u * 4, rot[1], rot[2] + u * 3);
  }
  // la tablet: solo en la parte 2, donde estaba la libreta
  tablet.visible = parte2 && !["Q2", "Q2c", "Q2e"].includes(plano);
  if (tablet.visible) dibujarTablet(t);
  // el diario: solo en Q4 (en el mostrador, delante de Rubén sentado)
  diario.visible = parte2 && plano === "Q4";
  if (diario.visible) diario.userData.letras(Math.min(5, Math.floor(sg(t, T.fiado[0], T.fiado[1]) * 5.0 + 0.35)));
  if (plano === "Q4") { tablet.position.set(1.0, MY, -1.3); tablet.rotation.y = -0.3; } else { tablet.position.set(0.42, MY, -1.3); tablet.rotation.y = 0; }
  // la libreta jubilada (Q3: de debajo del mostrador al estante; Q4: queda en el estante)
  libretaJ.visible = parte2 && t >= T.q3 + 0.95;
  if (libretaJ.visible) { libretaJ.position.copy(libretaQ3(t)); libretaJ.rotation.set(0, Math.PI / 2 + 0.08, 0); }
  // la bolsa de Graciela (P1/Q1, en el mostrador a su lado), el monedero (P5), los billetes (P6)
  bolsa.visible = ["P1", "Q1"].includes(plano);
  bolsa.position.set(G1.x - 0.2, MY, -1.1); bolsa.rotation.y = 0.4;
  monedero.visible = ["P5", "P5c"].includes(plano) || (plano === "P6" && t < T.billetes);
  if (monedero.visible) { const p = manoMundo(graciela, "D", _a); monedero.position.copy(p).add(V3(0, -0.1, 0.03)); monedero.rotation.set(0.2, graciela.raiz.rotation.y + Math.PI, 0); monedero.userData.abrir(1); }
  billetes.forEach((b, i) => { b.visible = plano === "P6" && t >= T.billetes; b.position.set(G5.x + 0.2 + i * 0.05, MY + 0.002 + i * 0.002, -1.12 + i * 0.03); b.rotation.set(0, 0.3 + i * 0.25, 0); });
  // la billetera de Héctor (P6b-P6c)
  billetera.visible = en(t, T.p6b, P1) && ["P6b", "P6c"].includes(plano);
  if (billetera.visible) { const p = manoMundo(hector, "D", _a); billetera.position.copy(p).add(V3(0, -0.06, 0.04)); billetera.rotation.set(0.3, hector.raiz.rotation.y + Math.PI, 0); }
  // los productos del desfile
  const enMano = (obj, per, vis, off = V3(0, -0.12, 0.02)) => { obj.visible = vis && per.raiz.visible; if (obj.visible) { const p = manoMundo(per, "I", _a); obj.position.copy(p).add(off); obj.rotation.set(0, per.raiz.rotation.y, 0); } };
  enMano(dulceH, hector, plano === "P2");
  enMano(fideosW, walter, plano === "P2", V3(0, -0.2, 0.02));
  enMano(azucarM, marta, plano === "P2", V3(0, -0.14, 0.02));
  // la mochila de Walter (a la espalda)
  mochila.visible = walter.raiz.visible;
  if (mochila.visible) { walter.cuerpo.updateMatrixWorld(true); mochila.position.copy(walter.cuerpo.localToWorld(V3(0, 0.25, -0.3))); mochila.rotation.set(0, walter.raiz.rotation.y + Math.PI, 0); }
  // el celular de Héctor (Q2b-Q2e)
  celuH.visible = parte2 && ["Q2b", "Q2c", "Q2d", "Q2e"].includes(plano) && t >= T.vibra;
  if (celuH.visible) {
    dibujarCelu(t);
    const p = manoMundo(hector, "I", _a);
    const vib = en(t, T.vibra, T.vibra + 0.5) ? Math.sin(t * 90) * 0.004 : 0;
    celuH.position.copy(p).add(V3(vib, 0.1, 0)).add(adelanteDe(hector, 0.07));
    const d = camera.position.clone().sub(celuH.position);
    celuH.rotation.set(-0.15, Math.atan2(d.x, d.z), 0);
  }
  // ---- los decals ----
  // el antebrazo: aparece cuando Rubén lo da vuelta (gira desde atrás hacia la cámara), pegado a la piel
  antebrazo.visible = en(t, T.brazo[0], T.p6) && plano === "P5c";
  if (antebrazo.visible) {
    const b = ruben.brazos[0];
    ruben.cuerpo.updateMatrixWorld(true);
    const codo = ruben.cuerpo.localToWorld(b.codo.position.clone());
    const muneca = ruben.cuerpo.localToWorld(b.mano.position.clone());
    const f = muneca.clone().sub(codo); const largo = f.length(); f.normalize();
    antebrazo.position.copy(codo.clone().add(f.clone().multiplyScalar(largo * 0.47)));
    _q.setFromUnitVectors(_y, f);
    const z1 = V3(0, 0, 1).applyQuaternion(_q);
    const dc = camera.position.clone().sub(antebrazo.position); dc.sub(f.clone().multiplyScalar(dc.dot(f))).normalize();
    let ang = Math.atan2(f.dot(z1.clone().cross(dc)), z1.dot(dc));
    ang += Math.PI * (1 - eio(sg(t, T.brazo[0], T.brazo[1])));   // el giro del antebrazo
    antebrazo.quaternion.copy(_q).premultiply(new THREE.Quaternion().setFromAxisAngle(f, ang));
  }
  // la pelada: solo desde que agacha la cabeza (antes la coronilla nunca mira a la cámara)
  pelada.visible = !parte2 && plano === "P6c" && t >= T.agacha[0];

  // ---- el push-in al antebrazo (P5c): la cámara viaja hasta quedar de frente al antebrazo, que llena el cuadro ----
  if (plano === "P5c" && t >= T.push[0]) {
    const u = eio(sg(t, T.push[0], T.push[1]));
    const a = antebrazo.position.clone();
    antebrazo.updateMatrixWorld(true);
    const n = V3(0, 0, 1).transformDirection(antebrazo.matrixWorld), f = V3(0, 1, 0).transformDirection(antebrazo.matrixWorld);
    const de = camera.position.clone(), dir0 = camera.getWorldDirection(new THREE.Vector3());
    const mira0 = de.clone().add(dir0.multiplyScalar(1.2));
    const hasta = a.clone().add(n.clone().multiplyScalar(0.4 + 0.03 * sg(t, T.push[1], T.p6)));
    camera.position.copy(de.lerp(hasta, u)); camera.fov = lerp(44, 40, u); camera.updateProjectionMatrix();
    camera.up.copy(V3(0, 1, 0).lerp(f, u).normalize());
    camera.lookAt(mira0.lerp(a, u));
  }
  // ---- la coronilla (P6c): la cámara alta de frente a la pelada, push-in corto ----
  if (plano === "P6c") {
    ruben.cabeza.updateMatrixWorld(true);
    const c = ruben.cabeza.localToWorld(V3(0, 0.276 + 0.26, 0.03));
    const n = ruben.cabeza.localToWorld(V3(0, 1.0, 0.03)).sub(ruben.cabeza.localToWorld(V3(0, 0.276, 0.03))).normalize();
    const u = eio(sg(t, T.push6[0], T.push6[1]));
    const desde = c.clone().add(V3(0.05, 0.75, 0.95).normalize().multiplyScalar(1.45));
    const hasta = c.clone().add(n.clone().lerp(V3(0, 0.6, 0.8).normalize(), 0.35).normalize().multiplyScalar(0.86));
    camera.position.copy(desde.lerp(hasta, u)); camera.up.set(0, 1, 0);
    camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(c.clone().add(V3(0, 0.0, 0.0)));
  }
  // ---- los insertos armados aparte ----
  if (plano === "P4i") {
    // cenital de la hoja del martes: la cámara arriba de la libreta, con la hoja derecha de entrada
    const c = V3(LIB0.x, MY, LIB0.z + 0.008 + LIB_H / 2 + 0.02);
    camera.position.set(c.x + 0.01, MY + 0.78, c.z + 0.05); camera.up.set(0, 0, -1); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(c);
  }
  if (plano === "Q2c" || plano === "Q2e") {
    // el celular en la mano de Héctor (llena el 60 % del cuadro)
    celuH.visible = true; dibujarCelu(t);
    hector.raiz.visible = true; hector.cabeza.visible = false;
    const p = manoMundo(hector, "I", _a);
    celuH.position.copy(p).add(V3(0, 0.13, 0)).add(adelanteDe(hector, 0.15)); celuH.rotation.set(-0.15, hector.raiz.rotation.y, 0);
    celuH.updateMatrixWorld(true);
    const c = celuH.localToWorld(V3(0, 0, 0));
    const n = V3(0, 0, 1).transformDirection(celuH.matrixWorld);
    if (plano === "Q2e") {
      // el índice de la derecha toca "Pagar"
      const bt = celuH.localToWorld(V3(0, -0.052, 0.02));
      const k = eio(sg(t, T.q2e, T.pagar)) * (1 - eio(sg(t, T.pagar + 0.04, T.pagar + 0.15)));
      const ph2 = { ...ultimaPH };
      const p2 = manoConDedos(hector, { ...ph2, codoD: [-1, -0.6, -0.2] }, "D", bt.clone().add(adelanteDe(hector, 0.02)));
      mezclaMano(ph2, p2, "D", k); ph2.dedoD = k; hector.poner(ph2);
    }
    camera.position.copy(c).add(n.multiplyScalar(plano === "Q2c" ? 0.62 - 0.06 * sg(t, T.q2c, T.q2d) : 0.56)); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(c);
  } else hector.cabeza.visible = true;

  // ---- globos ----
  {
    const ent = (ti) => (t < ti ? 0 : 0.7 + 0.3 * bk(sg(t, ti, ti + 0.2)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
    const hb = () => bocaPx(hector), rb = () => bocaPx(ruben), gb = () => bocaPx(graciela), wb = () => bocaPx(walter), mb = () => bocaPx(marta);
    if (plano === "P2") {
      // máximo dos burbujas a la vez; la de Héctor, Walter, Marta con la cola a su boca; las mudas a la puerta (derecha)
      const quien = [hb, wb, mb];
      T.cli.forEach((t0, i) => {
        const fin = T.cli[i + 2] ?? T.p3;
        if (!en(t, t0, fin)) return;
        const s = ent(t0) * sale(fin);
        if (i < 3) { const [bx, by] = quien[i](); ponerGlobo(GL.anota[i], bx + (i % 2 ? 190 : 250), Math.min(by - 300, 470), s, [bx, by - 40], i % 2); }
        else ponerGlobo(GL.anota[i], [820, 700, 840][i - 3], [820, 980, 1140][i - 3], s, [1080, [560, 760, 900][i - 3]], i % 2, [0.05, -0.04, 0.06][i - 3]);
      });
    }
    if (plano === "P4" && t >= T.h2) { const [bx, by] = hb(); ponerGlobo(GL.h2, bx + 40, Math.max(300, by - 560), ent(T.h2), [bx, by - 40]); }
    if (plano === "P4w" && t >= T.w2) { const [bx, by] = wb(); ponerGlobo(GL.w2, bx + 20, Math.max(320, by - 560), ent(T.w2), [bx, by - 40]); }
    if (plano === "P5" && t >= T.g2) {
      const [bx, by] = gb(), tc = T.g2 + 1.5;
      if (t < tc) ponerGlobo(GL.g2a, bx + 320, Math.max(330, by - 560), ent(T.g2) * sale(tc), [bx, by - 40]);
      else ponerGlobo(GL.g2b, bx + 320, Math.max(330, by - 540), ent(tc), [bx, by - 40]);
    }
    if (plano === "P6b" && t >= T.h3) { const [bx, by] = hb(); ponerGlobo(GL.h3, bx + 100, Math.max(360, by - 380), ent(T.h3), [bx, by - 40]); }
    if (plano === "Q1" && t >= T.g1b) { const [bx, by] = gb(); ponerGlobo(GL.g1b, 540, 330, ent(T.g1b) * sale(T.frena), [bx + 40, by - 40]); }
    if (plano === "Q1" && t >= T.r2) { const [bx, by] = rb(); ponerGlobo(GL.r2, bx + 230, Math.max(250, by - 470), ent(T.r2), [bx + 30, by - 40]); }
    if (plano === "Q2d" && t >= T.h4) { const [bx, by] = hb(); ponerGlobo(GL.h4, bx + 30, Math.max(320, by - 580), ent(T.h4), [bx, by - 40]); }
  }
  if (en(tIn, P1, P2) || LIMPIO) { for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; } }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
