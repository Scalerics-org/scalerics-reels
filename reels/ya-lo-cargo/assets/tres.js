// Capa 3D de ya-lo-cargo (Three.js r170 local). Base técnica: reels/anotamelo y reels/te-queda (globos de diálogo
// pegados a la cámara en píxeles de pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Dos lugares en el mismo mundo, lejos uno del otro:
//   LA CALLE (alrededor del origen): fachadas en z = 0 (los locales hacia -z), vereda z 0..2,4, calle z > 2,4. La
//     rotisería de Graciela (x = 0) con su spiedo; la cafetería de Marta, el bar, el kiosco y tres locales más hacia -x.
//   LA DISTRIBUIDORA DE RUBÉN (x = OX): depósito de día, piso crema2, paredes navy claro, racks navy3 con largueros
//     verdes, la oficina vidriada arriba (fondo, z < -8,5), la rampa y el muelle con el camión (frente, z > 4,5), el
//     portón a la derecha (x = +12).
//   PARTE 1: "Ya lo cargo." · los globos de chat que llenan el auto · "Rubén, ¿y mi harina?" · "Lo único que carga Nico
//            es el celular." · "¡Nico!" / "¡Ya lo cargo!" · el bip · el autoelevador mete el auto en el camión: "Ya lo
//            cargué." · "Sí, sí. Ya lo cargo." desde adentro.
//   PARTE 2: "Ya lo car…" + ding: la tarjeta "Cargado ✓" vuela por la calle hasta el pallet GRACIELA y la ficha ·
//            Rubén mete la harina en el camión · "Rubén, ¿lo de Graciela?" / "Ya salió." · las horquillas.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, poseEn, CARA, BRAZOS, pegarACamara, crearMate, crearTermo, crearCelular } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

// ---------- utilidades ----------
const D2R = Math.PI / 180;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sg = (t, a, b) => cl((t - a) / (b - a));
const eo = (x) => 1 - Math.pow(1 - x, 3);
const ei = (x) => x * x * x;
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const bk = (x) => { const c1 = 1.7, c3 = c1 + 1; return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const en = (t, a, b) => t >= a && t < b;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
// claves [[t, v], ...] con ease in-out entre cada par
function claves(t, K, f = eio) {
  if (t <= K[0][0]) return K[0][1];
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) return lerp(K[i - 1][1], K[i][1], f(sg(t, K[i - 1][0], K[i][0])));
  return K[K.length - 1][1];
}

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
const CIELO = new THREE.Color(0xb9cde0);
scene.background = CIELO;
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 140);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x4a4a48);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.4);
  tira(4, 6, -6, 2, -1, Math.PI / 2, 0xf4f6ff, 1.2);
  tira(1.4, 8, 4, 1, 6, 0, 0xc8d4ff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.45;

// ---------- luces: el sol de mediodía (con sombra; se corre al lugar del plano), cielo hemisférico, contraluz, relleno
const sol = new THREE.DirectionalLight(0xfffaf2, 2.2);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 1, far: 50 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 1.1); scene.add(cielo);
const OX0 = 100;
const claraboya = new THREE.DirectionalLight(0xf4f6ff, 0); claraboya.position.set(OX0 + 3, 20, 4); claraboya.target.position.set(OX0, 0, -2); scene.add(claraboya, claraboya.target);   // la luz de las claraboyas (sin sombra)
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.6); rim.position.set(2.5, 6, -9); scene.add(rim);
function ponerSol(cx, cz, interior) {
  sol.position.set(cx - 6, 14, cz + 7); sol.target.position.set(cx, 0, cz); sol.target.updateMatrixWorld();
  sol.intensity = interior ? 1.5 : 2.25;
  cielo.intensity = interior ? 1.9 : 1.1;
  claraboya.intensity = interior ? 1.1 : 0;
}

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, piso: 0xdcd9c8, celeste: 0xb9cde0 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshPhysicalMaterial({ color: 0xcfe2f2, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false }),
  vidrioAuto: new THREE.MeshPhysicalMaterial({ color: 0x8fb4d6, roughness: 0.08, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide }),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const caja = (w, h, d, m, x, y, z, r = 0.02) => mesh(rbox(w, h, d, r, 2), m, x, y, z);
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const caras = (lado, frente, atras = lado) => [lado, lado, lado, lado, frente, atras];
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const OX = 100;   // la distribuidora
const W = (x, y, z) => V3(OX + x, y, z);

// =====================================================================================================
// LA CALLE
// =====================================================================================================
const CALLE = new THREE.Group(); scene.add(CALLE);
const VEREDA = 2.4, CORDON = 0.12;
{
  const baldosa = lienzo(512, 512, (x) => { x.fillStyle = "#c9c6ba"; x.fillRect(0, 0, 512, 512); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#d6d3c7" : "#cdcabd"; x.fillRect(i * 128 + 4, j * 128 + 4, 120, 120); } });
  baldosa.wrapS = baldosa.wrapT = THREE.RepeatWrapping; baldosa.repeat.set(80, 3);
  const v = mesh(new THREE.BoxGeometry(80, CORDON, VEREDA), new THREE.MeshStandardMaterial({ map: baldosa, roughness: 0.8 }), -28, CORDON / 2, VEREDA / 2); CALLE.add(v);
  CALLE.add(mesh(new THREE.BoxGeometry(80, CORDON + 0.01, 0.16), M.cr, -28, CORDON / 2, VEREDA - 0.08));   // el cordón crema
  const asf = mesh(new THREE.PlaneGeometry(80, 14), mat(0x8a8e98, 0.9), -28, 0, VEREDA + 7); asf.rotation.x = -Math.PI / 2; asf.castShadow = false; CALLE.add(asf);
  for (let x = -66; x < 12; x += 3) { const l = mesh(new THREE.PlaneGeometry(1.5, 0.14), mat(C.cr, 0.8), x, 0.005, VEREDA + 5.2); l.rotation.x = -Math.PI / 2; l.castShadow = false; CALLE.add(l); }
  // la vereda de enfrente y sus fachadas (se ven en P1b)
  const v2 = mesh(new THREE.BoxGeometry(80, CORDON, 3), mat(0xc9c6ba, 0.8), -28, CORDON / 2, VEREDA + 11.5); CALLE.add(v2);
  semilla = 3;
  for (let x = -64; x < 12; x += 7) {
    const c = [C.cr, 0xd6c7a6, C.navy3, 0xe2d3c0][Math.floor(az() * 4)];
    const f = caja(6.9, 6 + az() * 2, 0.4, mat(c, 0.85), x, 3.5, VEREDA + 13.2); CALLE.add(f);
    for (const dx of [-1.8, 1.8]) for (const y of [1.5, 4.3]) CALLE.add(caja(1.2, 1.5, 0.1, M.navy2, x + dx, y, VEREDA + 12.98));
  }
  // el suelo del fondo (que no se vea cielo debajo)
  const fondo = mesh(new THREE.PlaneGeometry(200, 200), mat(0xa6a294, 0.9), -20, -0.02, 0); fondo.rotation.x = -Math.PI / 2; fondo.castShadow = false; CALLE.add(fondo);
}
// ---- las fachadas: [x del centro, nombre, pared, letrero] ----
const LOCALES = [[0, "ROTISERÍA", C.cr, "cr"], [-8, "CAFETERÍA", C.navy3, "cr"], [-16, "BAR", 0xe2d3c0, "navy"], [-24, "KIOSCO", C.cr, "navy"], [-32, "FERRETERÍA", C.navy3, "cr"], [-40, "PANADERÍA", 0xd6c7a6, "navy"], [-48, "FARMACIA", C.cr, "navy"], [-56, "VERDULERÍA", C.navy3, "cr"]];
const PUERTA_DX = 1.25, PUERTA_W = 1.3, PUERTA_H = 2.35, VID = { y0: 0.75, y1: 2.35 };
function fachada([x0, nombre, pared, letrero], abierta) {
  const g = new THREE.Group(); g.position.x = x0; CALLE.add(g);
  const m = mat(pared, 0.85), zocalo = M.navy3;
  const H = 6.6, Z = -0.15;
  g.add(caja(8, H - 3.45, 0.3, m, 0, 3.45 + (H - 3.45) / 2, Z));                 // la planta alta
  // ventanas de arriba con persianas
  for (const dx of [-2.2, 2.2]) {
    g.add(caja(1.5, 1.8, 0.12, M.navy3, dx, 4.95, Z + 0.15));
    const pers = lienzo(256, 300, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#b4b2a3"; for (let y = 0; y < h; y += 22) x.fillRect(0, y, w, 6); });
    g.add(plano(1.3, 1.1, pers, dx, 5.2, Z + 0.22));
    g.add(caja(1.3, 0.5, 0.06, mat(C.navy2, 0.4), dx, 4.35, Z + 0.21));
  }
  // el letrero pintado (Lexend 800)
  const tx = lienzo(1600, 220, (x, w, h) => {
    x.fillStyle = letrero === "cr" ? "#efeee5" : "#1f3254"; x.fillRect(0, 0, w, h);
    x.strokeStyle = letrero === "cr" ? "#1f3254" : "#efeee5"; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28);
    x.fillStyle = letrero === "cr" ? "#0b1220" : "#efeee5"; ajustar(x, nombre, 800, 150, w - 160); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(nombre, w / 2, h / 2 + 8);
  });
  g.add(caja(7.6, 1.0, 0.16, M.navy3, 0, 2.95, Z + 0.12));
  g.add(plano(7.4, 0.9, tx, 0, 2.95, Z + 0.205));
  g.add(caja(8, 0.12, 0.34, M.navy3, 0, 2.38, Z + 0.05));
  // planta baja: pilares, zócalo bajo las vidrieras, el hueco de la puerta
  const xa = PUERTA_DX - PUERTA_W / 2, xb = PUERTA_DX + PUERTA_W / 2;
  g.add(caja(0.4, 2.4, 0.32, m, -3.8, 1.2, Z)); g.add(caja(0.4, 2.4, 0.32, m, 3.8, 1.2, Z));
  g.add(caja(0.25, 2.4, 0.32, m, xa - 0.12, 1.2, Z)); g.add(caja(0.25, 2.4, 0.32, m, xb + 0.12, 1.2, Z));
  for (const [a, b] of [[-3.6, xa - 0.25], [xb + 0.25, 3.6]]) {
    g.add(caja(b - a, VID.y0, 0.3, zocalo, (a + b) / 2, VID.y0 / 2, Z));
    g.add(caja(b - a, 0.06, 0.36, M.cr2, (a + b) / 2, VID.y0, Z + 0.02));
    g.add(caja(b - a, 0.08, 0.2, M.navy3, (a + b) / 2, VID.y1 - 0.04, Z));
    if (!abierta) {
      // vidriera: el interior en sombra (navy2) con dos estantes y cosas de colores planos (no un agujero negro)
      const fondo = caja(b - a, VID.y1 - VID.y0, 0.05, M.navy2, (a + b) / 2, (VID.y0 + VID.y1) / 2, Z - 0.6); g.add(fondo);
      for (const yy of [1.25, 1.85]) { g.add(caja(b - a - 0.2, 0.04, 0.4, M.cr3, (a + b) / 2, yy, Z - 0.4)); for (let xx = a + 0.3; xx < b - 0.25; xx += 0.42) g.add(caja(0.26, 0.3, 0.2, mat([C.cr, C.red, C.g, 0xe2d3c0, C.kraft][Math.floor(az() * 5)], 0.7), xx, yy + 0.17, Z - 0.4)); }
      const vid = new THREE.Mesh(new THREE.PlaneGeometry(b - a, VID.y1 - VID.y0), M.vidrio); vid.position.set((a + b) / 2, (VID.y0 + VID.y1) / 2, Z + 0.08); vid.renderOrder = 3; g.add(vid);
    }
  }
  g.add(caja(xb - xa + 0.5, 0.14, 0.34, M.navy3, PUERTA_DX, PUERTA_H + 0.02, Z + 0.02));
  if (!abierta) {
    // el interior detrás de la puerta (penumbra, no negro)
    g.add(caja(PUERTA_W, PUERTA_H, 0.05, mat(0x2a3b58, 0.8), PUERTA_DX, PUERTA_H / 2, Z - 1.4));
    g.add(caja(PUERTA_W + 0.2, 0.05, 1.4, M.cr3, PUERTA_DX, 0.02, Z - 0.7));
    for (const s of [-1, 1]) g.add(caja(0.05, PUERTA_H, 1.4, mat(0x24344f, 0.8), PUERTA_DX + s * PUERTA_W / 2, PUERTA_H / 2, Z - 0.7));
  }
  // el cartel de bandera (perpendicular a la fachada: se lee mirando a lo largo de la calle)
  const ban = lienzo(900, 420, (x, w, h) => {
    x.fillStyle = letrero === "cr" ? "#efeee5" : "#1f3254"; x.fillRect(0, 0, w, h);
    x.strokeStyle = letrero === "cr" ? "#1f3254" : "#efeee5"; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22);
    x.fillStyle = letrero === "cr" ? "#0b1220" : "#efeee5"; ajustar(x, nombre, 900, 170, w - 90); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(nombre, w / 2, h / 2 + 10);
  });
  const bg = new THREE.Group(); bg.position.set(-3.0, 3.35, 0.95); g.add(bg);
  bg.add(caja(0.08, 0.08, 1.7, M.navy3, 0, 0.62, -0.25));
  for (const s of [-1, 1]) { const pl = plano(1.55, 0.72, ban, s * 0.035, 0, 0.05); pl.rotation.y = s * Math.PI / 2; bg.add(pl); }
  bg.add(caja(0.06, 0.8, 1.63, M.navy3, 0, 0, 0.05));
  // el árbol de la vereda (plátano) entre local y local
  const arbol = new THREE.Group(); arbol.position.set(-4, CORDON, 1.9); g.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.11, 0.15, 3.4, 8), mat(0x7a6a52, 0.9), 0, 1.7, 0));
  for (const [x, y, z, r] of [[0, 4.0, 0, 1.1], [0.7, 3.6, 0.3, 0.75], [-0.7, 3.7, -0.2, 0.8]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), mat(0x2f5a2a, 0.9), x, y, z));
  return g;
}
semilla = 11;
const FACH = LOCALES.map((l, i) => fachada(l, i === 0));

// ---- la rotisería de Graciela por dentro (x -4..4, z -5..0): azulejo blanco con guarda verde, el mostrador con vitrina,
// el spiedo con los pollos girando, la pizarra ----
const ROT = new THREE.Group(); CALLE.add(ROT);
// el mostrador corre a lo largo de z a la derecha (la cámara mira a lo largo de él): Graciela detrás (x > 1,3) y Nico
// del lado del cliente, los dos abiertos a cámara en "V"; el spiedo contra la pared del fondo, entre los dos
const MOSTR = { x0: -1.4, x1: 2.6, y: 1.0, d: 0.75, z: -3.0 };
const GRA = { x: 0.75, z: -3.8 };               // Graciela detrás del mostrador (de espaldas a la cámara en P1/Q1)
const NIC = { x: -0.4, z: -2.15 };               // Nico del lado del cliente, de frente a la cámara
const SPI = V3(-1.85, 0.95, -0.75);              // el spiedo, en la vidriera (de doble vidrio: se ve desde adentro y desde la calle)
const RD = 6;                                   // la profundidad de la rotisería
let spiedoBarras = [], llamaM = null;
const pantN = lienzo(600, 975, () => {});       // la pantalla del celular de Nico
{
  const azul = lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#f4f4ef"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#cfd2cc"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); }
  });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = (w, h, x, y, z, ry) => { const tx = azul.clone(); tx.needsUpdate = true; tx.repeat.set(w / 0.5, h / 0.5); const p = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4 }), x, y, z); p.rotation.y = ry; p.castShadow = false; ROT.add(p); };
  pared(8, 3.1, 0, 1.55, -RD, 0); pared(RD, 3.1, -4, 1.55, -RD / 2, Math.PI / 2); pared(RD, 3.1, 4, 1.55, -RD / 2, -Math.PI / 2);
  // la guarda verde
  ROT.add(caja(8, 0.12, 0.03, M.g, 0, 1.55, -RD + 0.02)); ROT.add(caja(0.03, 0.12, RD, M.g, -3.98, 1.55, -RD / 2)); ROT.add(caja(0.03, 0.12, RD, M.g, 3.98, 1.55, -RD / 2));
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(6, 4.5);
  const p = mesh(new THREE.PlaneGeometry(8, RD), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2));
  // el mostrador navy3 con tapa de madera clara y la vitrina (bandejas de milanesas, tarta y papas)
  const MW = MOSTR.x1 - MOSTR.x0, MC = (MOSTR.x0 + MOSTR.x1) / 2;
  ROT.add(caja(MW, MOSTR.y - 0.06, MOSTR.d, M.navy3, MC, (MOSTR.y - 0.06) / 2, MOSTR.z, 0.03));
  ROT.add(caja(MW + 0.1, 0.06, MOSTR.d + 0.08, mat(0xc89a64, 0.55), MC, MOSTR.y - 0.03, MOSTR.z, 0.02));
  ROT.add(caja(MW - 0.2, 0.06, 0.02, M.g, MC, 0.32, MOSTR.z + MOSTR.d / 2 + 0.005, 0.01));
  const vit = new THREE.Mesh(rbox(2.0, 0.42, MOSTR.d - 0.1, 0.02, 2), M.vidrio); vit.position.set(1.55, MOSTR.y + 0.21, MOSTR.z); vit.renderOrder = 3; ROT.add(vit);
  ROT.add(caja(2.0, 0.03, MOSTR.d - 0.08, M.gris, 1.55, MOSTR.y + 0.43, MOSTR.z));
  const milanesa = mat(0xb9803e, 0.8), tarta = mat(0xd9a441, 0.7), papa = mat(0xe8c86a, 0.7);
  for (let i = 0; i < 3; i++) {
    const bx = 0.85 + i * 0.68;
    ROT.add(caja(0.6, 0.03, 0.42, M.gris, bx, MOSTR.y + 0.02, MOSTR.z));
    if (i === 0 || i === 2) for (let k = 0; k < 3; k++) { const m = mesh(new THREE.SphereGeometry(0.1, 12, 8), milanesa, bx - 0.15 + k * 0.15, MOSTR.y + 0.05, MOSTR.z + (k % 2 ? 0.08 : -0.06)); m.scale.set(1.25, 0.22, 0.9); ROT.add(m); }
    if (i === 1) { ROT.add(mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.08, 20), tarta, bx, MOSTR.y + 0.07, MOSTR.z)); ROT.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.012, 20), mat(0x8a5a2c, 0.7), bx, MOSTR.y + 0.115, MOSTR.z)); }
  }
  for (let k = 0; k < 14; k++) ROT.add(caja(0.04, 0.04, 0.16, papa, 0.55 + (k % 7) * 0.065, MOSTR.y + 0.06 + Math.floor(k / 7) * 0.035, MOSTR.z - 0.08 + (k % 3) * 0.06, 0.01));
  // la caja registradora y la balanza (lado de Graciela)
  ROT.add(caja(0.42, 0.22, 0.36, M.navy3, 2.25, MOSTR.y + 0.11, MOSTR.z - 0.05, 0.04));
  ROT.add(caja(0.3, 0.12, 0.04, mat(0x2c4268, 0.4), 2.25, MOSTR.y + 0.26, MOSTR.z + 0.1, 0.02));
  // la pizarra navy con tiza crema
  const piz = lienzo(900, 600, (x, w, h) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = '700 118px "Caveat", cursive';
    ["Pollo al spiedo", "Milanesa", "Tarta"].forEach((s, i) => x.fillText(s, w / 2, 170 + i * 150));
  });
  const pz = plano(1.3, 0.87, piz, 2.6, 2.05, -0.5); pz.rotation.y = Math.PI; ROT.add(pz);
  // el spiedo: caja de acero con vidrio, 3 barras con 3 pollos cada una que giran, la llama atrás (naranja apagado)
  const sp = new THREE.Group(); sp.position.copy(SPI); ROT.add(sp);
  const acero = mat(0xc9ccd2, 0.3, { metalness: 0.55 }), aceroOsc = mat(0x8a8e98, 0.4, { metalness: 0.5 });
  sp.add(caja(1.6, 0.9, 0.6, aceroOsc, 0, -0.45, 0));                       // el mueble de abajo
  const vsp2 = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), M.vidrio); vsp2.position.set(0, 0.64, -0.31); vsp2.renderOrder = 3; sp.add(vsp2);
  for (const s of [-1, 1]) sp.add(caja(0.08, 1.3, 0.62, acero, s * 0.78, 0.63, 0));
  sp.add(caja(1.64, 0.1, 0.64, acero, 0, 1.3, 0)); sp.add(caja(1.64, 0.06, 0.64, acero, 0, 0.0, 0));
  const vsp = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), M.vidrio); vsp.position.set(0, 0.64, 0.31); vsp.renderOrder = 3; sp.add(vsp);
  llamaM = new THREE.MeshBasicMaterial({ color: 0xd9824a, toneMapped: false });
  const llama = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.05), llamaM); llama.position.set(0, 0.64, 0.24); llama.rotation.y = Math.PI; sp.add(llama);   // la llama del lado de la calle
  const brasas = lienzo(512, 384, (x, w, h) => { x.fillStyle = "#c46a3a"; x.fillRect(0, 0, w, h); x.fillStyle = "#e09a5a"; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 60 - 10, h); x.quadraticCurveTo(i * 60 + 20, h * 0.2, i * 60 + 50, h); x.fill(); } });
  llama.material.map = brasas; llama.material.color.set(0xffffff);
  const doradoM = mat(0xc98a3a, 0.45), doradoO = mat(0xa86a2a, 0.5), hiloM = mat(C.cr, 0.8);
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const p = new THREE.Group(); p.position.x = -0.46 + k * 0.46; barra.add(p);
      const cu = mesh(new THREE.SphereGeometry(0.15, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); p.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.1, 14, 10), doradoM, 0.13, 0.03, 0.0); pe.scale.set(0.8, 0.75, 0.9); p.add(pe);   // la pechuga
      for (const s of [-1, 1]) {   // los muslos con las patitas atadas
        const mu = mesh(new THREE.SphereGeometry(0.065, 12, 8), doradoO, -0.06, -0.07, s * 0.09); mu.scale.set(1.4, 0.9, 0.9); p.add(mu);
        const pa = mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.1, 8), mat(0xe8c89a, 0.6), -0.17, -0.09, s * 0.05); pa.rotation.z = Math.PI / 2 - 0.4; p.add(pa);
      }
      const hilo = mesh(new THREE.TorusGeometry(0.035, 0.008, 6, 14), hiloM, -0.2, -0.1, 0); hilo.rotation.y = Math.PI / 2; p.add(hilo);
      p.rotation.x = k * 1.3;
    }
  }
  // la puerta de vidrio de la rotisería y las vidrieras (con vidrio apenas visible)
  for (const [a, b] of [[-3.6, PUERTA_DX - PUERTA_W / 2 - 0.25], [PUERTA_DX + PUERTA_W / 2 + 0.25, 3.6]]) {
    const vid = new THREE.Mesh(new THREE.PlaneGeometry(b - a, VID.y1 - VID.y0), M.vidrio); vid.position.set((a + b) / 2, (VID.y0 + VID.y1) / 2, -0.07); vid.renderOrder = 3; ROT.add(vid);
  }
  ROT.add(caja(0.5, 0.25, 0.04, M.g, 2.7, 1.9, -0.05));
}

// =====================================================================================================
// LA DISTRIBUIDORA
// =====================================================================================================
const DEP = new THREE.Group(); DEP.position.x = OX; scene.add(DEP);
const DX0 = -12, DX1 = 12, DZ0 = -12, DZ1 = 8, DH = 8;
const RAMPA = { x0: -2.7, x1: 0.7, z0: 0.8, z1: 4.4, alto: 1.2 };   // la rampa sube hacia +z hasta el muelle
const MUELLE = { z0: 4.4, z1: 8.0 };
const CAMX = -1.0;                                                  // el eje del camión, la rampa y el auto
const OFI = { x0: -5.2, x1: 3.2, z0: -12, z1: -8.5, piso: 3.3, alto: 2.6 };
const BAR_Z = -7.4, BAR_H = 0.85;                                                 // la baranda del balcón de la oficina
const PARK = { x: CAMX, z: -2.0 };                                  // donde frena el auto de Nico (de frente a la rampa)
const PALLET_G = { x: CAMX, z: -2.0 };                              // el pallet GRACIELA (parte 2: en el mismo lugar)
const sueloEn = (x, z) => (x >= RAMPA.x0 - 0.05 && x <= RAMPA.x1 + 0.05 ? (z <= RAMPA.z0 ? 0 : z >= MUELLE.z1 ? 0 : z >= RAMPA.z1 ? RAMPA.alto : (RAMPA.alto * (z - RAMPA.z0)) / (RAMPA.z1 - RAMPA.z0)) : 0);
const pantM = lienzo(1024, 640, () => {});       // el monitor de Rubén
const remitoT = lienzo(600, 420, () => {});      // el remito en la puerta del camión
const cartelPT = lienzo(512, 300, () => {});     // el cartel kraft del pallet GRACIELA
let camion, puertasCam = [], monitor, telefono, mateR, termoR, mateBar;
{
  // piso de hormigón crema2 liso con líneas de seguridad crema (no amarillo)
  const piso = mesh(new THREE.PlaneGeometry(DX1 - DX0, DZ1 - DZ0), mat(C.piso, 0.85), 0, 0, (DZ0 + DZ1) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  const linea = (x, z, w, d) => { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0xf6f4ea, 0.8), x, 0.006, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); };
  for (const x of [-5.6, 4.2]) linea(x, -1.5, 0.14, 18);
  linea(-0.5, -5.8, 9.4, 0.14);
  // paredes navy claro, techo con claraboyas
  const paredM = mat(0x2c4268, 0.85);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.3), paredM, x, y, z); p.rotation.y = ry; p.castShadow = false; DEP.add(p); };
  pared(DX1 - DX0, DH, 0, DH / 2, DZ0 - 0.15, 0);
  pared(DZ1 - DZ0, DH, DX0 - 0.15, DH / 2, (DZ0 + DZ1) / 2, Math.PI / 2);
  // derecha: el portón (z -4.2 .. 0) abierto (se ve la luz de la calle)
  pared(DZ1 - 0.2, DH, DX1 + 0.15, DH / 2, (0.2 + DZ1) / 2, Math.PI / 2);
  pared(-4.2 - DZ0, DH, DX1 + 0.15, DH / 2, (DZ0 - 4.2) / 2, Math.PI / 2);
  pared(4.4, DH - 4.2, DX1 + 0.15, 4.2 + (DH - 4.2) / 2, -2.0, Math.PI / 2);
  DEP.add(caja(0.25, 4.3, 0.3, M.navy3, DX1 - 0.05, 2.15, -4.3)); DEP.add(caja(0.25, 4.3, 0.3, M.navy3, DX1 - 0.05, 2.15, 0.3)); DEP.add(caja(0.3, 0.4, 4.9, M.navy3, DX1 - 0.05, 4.3, -2.0));
  const afuera = mesh(new THREE.PlaneGeometry(30, 12), new THREE.MeshBasicMaterial({ color: 0xe6edf2 }), DX1 + 6, 4, -2); afuera.rotation.y = -Math.PI / 2; DEP.add(afuera);
  const vereda = mesh(new THREE.PlaneGeometry(10, 12), mat(0xc9c6ba, 0.9), DX1 + 5, 0.0, -2); vereda.rotation.x = -Math.PI / 2; DEP.add(vereda);
  // adelante: el muelle (el hueco donde entra la caja del camión: x -3 .. 1, hasta 4,6 de alto)
  const xa = CAMX - 1.9, xb = CAMX + 1.9;
  pared(xa - DX0, DH, (DX0 + xa) / 2, DH / 2, DZ1 + 0.15, 0);
  pared(DX1 - xb, DH, (xb + DX1) / 2, DH / 2, DZ1 + 0.15, 0);
  pared(xb - xa, DH - 4.6, CAMX, 4.6 + (DH - 4.6) / 2, DZ1 + 0.15, 0);
  DEP.add(caja(xb - xa + 0.4, 0.3, 0.4, M.navy3, CAMX, 4.6, DZ1));
  const afuera2 = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0xe6edf2 }), CAMX, 4, DZ1 + 9); afuera2.rotation.y = Math.PI; DEP.add(afuera2);
  const patio = mesh(new THREE.PlaneGeometry(14, 12), mat(0xb7b3a6, 0.9), CAMX, 0, DZ1 + 6); patio.rotation.x = -Math.PI / 2; DEP.add(patio);
  const techo = mesh(new THREE.BoxGeometry(DX1 - DX0 + 0.6, 0.2, DZ1 - DZ0 + 0.6), mat(0x4a5b78, 0.9), 0, DH + 0.1, (DZ0 + DZ1) / 2); techo.castShadow = false; DEP.add(techo);
  for (const z of [-9, -4, 1, 6]) for (const x of [-7, 0, 7]) { const c = mesh(new THREE.PlaneGeometry(3.2, 1.4), new THREE.MeshBasicMaterial({ color: 0xf2f4ee }), x, DH - 0.01, z); c.rotation.x = Math.PI / 2; DEP.add(c); }
  // ---- la rampa y el muelle (gris, con borde crema) ----
  const rampaL = Math.hypot(RAMPA.z1 - RAMPA.z0, RAMPA.alto), ang = Math.atan2(RAMPA.alto, RAMPA.z1 - RAMPA.z0);
  const rp = mesh(new THREE.BoxGeometry(RAMPA.x1 - RAMPA.x0, 0.12, rampaL), mat(0x9aa0aa, 0.6), (RAMPA.x0 + RAMPA.x1) / 2, RAMPA.alto / 2 - 0.05, (RAMPA.z0 + RAMPA.z1) / 2); rp.rotation.x = -ang; DEP.add(rp);
  for (const x of [RAMPA.x0, RAMPA.x1]) { const b = mesh(new THREE.BoxGeometry(0.1, 0.16, rampaL), M.cr, x, RAMPA.alto / 2 + 0.02, (RAMPA.z0 + RAMPA.z1) / 2); b.rotation.x = -ang; DEP.add(b); }
  const lado = new THREE.Shape(); lado.moveTo(RAMPA.z0, 0); lado.lineTo(RAMPA.z1, 0); lado.lineTo(RAMPA.z1, RAMPA.alto); lado.closePath();
  for (const x of [RAMPA.x0, RAMPA.x1]) { const sh = mesh(new THREE.ShapeGeometry(lado), mat(0x7d8390, 0.7), x, 0, 0); sh.rotation.y = -Math.PI / 2; sh.material.side = THREE.DoubleSide; DEP.add(sh); }
  DEP.add(caja(5.4, RAMPA.alto, MUELLE.z1 - MUELLE.z0, mat(0x7d8390, 0.7), CAMX, RAMPA.alto / 2, (MUELLE.z0 + MUELLE.z1) / 2, 0.02));
  DEP.add(caja(5.4, 0.04, MUELLE.z1 - MUELLE.z0, mat(0x9aa0aa, 0.6), CAMX, RAMPA.alto + 0.02, (MUELLE.z0 + MUELLE.z1) / 2, 0.01));
  for (const x of [CAMX - 2.7, CAMX + 2.7]) DEP.add(caja(0.12, 0.14, MUELLE.z1 - MUELLE.z0, M.cr, x, RAMPA.alto + 0.06, (MUELLE.z0 + MUELLE.z1) / 2, 0.02));
  // ---- la oficina vidriada arriba (fondo): piso sobre columnas, vidrio con perfiles navy, puerta al balcón ----
  const OW = OFI.x1 - OFI.x0, OC = (OFI.x0 + OFI.x1) / 2;
  DEP.add(caja(OW + 2.4, 0.25, OFI.z1 - OFI.z0 + 1.1, M.navy3, OC + 1.2, OFI.piso - 0.12, (OFI.z0 + OFI.z1 + 1.1) / 2));
  for (const x of [OFI.x0, OC, OFI.x1, OFI.x1 + 2.3]) DEP.add(caja(0.25, OFI.piso, 0.25, M.navy3, x, OFI.piso / 2, BAR_Z + 0.1));
  DEP.add(caja(OW, 0.2, OFI.z1 - OFI.z0, M.navy3, OC, OFI.piso + OFI.alto + 0.1, (OFI.z0 + OFI.z1) / 2));
  const piso2 = mesh(new THREE.PlaneGeometry(OW, OFI.z1 - OFI.z0), mat(0xb08a5e, 0.7), OC, OFI.piso + 0.01, (OFI.z0 + OFI.z1) / 2); piso2.rotation.x = -Math.PI / 2; DEP.add(piso2);
  for (const x of [OFI.x0, OFI.x1]) DEP.add(caja(0.12, OFI.alto, OFI.z1 - OFI.z0, mat(C.cr2, 0.8), x, OFI.piso + OFI.alto / 2, (OFI.z0 + OFI.z1) / 2));
  const vofi = new THREE.Mesh(new THREE.PlaneGeometry(OW, OFI.alto), M.vidrio); vofi.position.set(OC, OFI.piso + OFI.alto / 2, OFI.z1); vofi.renderOrder = 3; DEP.add(vofi);
  for (const x of [OFI.x0, -2.25, 1.0, OFI.x1]) DEP.add(caja(0.08, OFI.alto, 0.1, M.navy3, x, OFI.piso + OFI.alto / 2, OFI.z1));   // perfiles: Rubén (x -0,6) queda entre dos
  DEP.add(caja(OW, 0.1, 0.12, M.navy3, OC, OFI.piso + OFI.alto, OFI.z1)); DEP.add(caja(OW, 0.08, 0.12, M.navy3, OC, OFI.piso + 0.95, OFI.z1));
  // la pared del fondo de la oficina (crema, con un cuadro de remitos)
  DEP.add(caja(OW, OFI.alto, 0.1, mat(C.cr, 0.8), OC, OFI.piso + OFI.alto / 2, OFI.z0 + 0.1));
  // el balcón con la baranda (caños navy3 y pasamanos verde)
  // (ronda 1: pasamanos a 0,85: a 1,05 le cruzaba la boca a Rubén desde el contrapicado)
  DEP.add(caja(OW + 2.3, 0.06, 0.08, M.g, OC + 1.15, OFI.piso + BAR_H, BAR_Z, 0.02));
  DEP.add(caja(OW + 2.3, 0.05, 0.06, M.navy3, OC + 1.15, OFI.piso + 0.45, BAR_Z, 0.02));
  for (let x = OFI.x0; x <= OFI.x1 + 2.31; x += 0.9) DEP.add(caja(0.06, BAR_H, 0.06, M.navy3, x, OFI.piso + BAR_H / 2, BAR_Z));
  // la escalera metálica (baja hacia +x desde el balcón)
  const n = 14;
  for (let i = 0; i < n; i++) DEP.add(caja(1.1, 0.06, 0.32, mat(0x8a8e98, 0.5, { metalness: 0.4 }), OFI.x1 + 2.9, OFI.piso - (i + 1) * (OFI.piso / n) + 0.05, BAR_Z - 0.6 + (i + 1) * 0.3).rotateY(0));
  for (const dx of [-0.58, 0.58]) { const l = caja(0.06, 0.08, Math.hypot(OFI.piso, n * 0.3), M.navy3, OFI.x1 + 2.9 + dx, OFI.piso / 2 + 0.5, BAR_Z - 0.6 + n * 0.15); l.rotation.x = Math.atan2(OFI.piso, n * 0.3); DEP.add(l); }
  // el escritorio de Rubén: madera clara, monitor (pantalla canvas), teléfono navy con cable rulo, mate y termo, remitos
  const ESC_Z = -9.55, ESC_Y = OFI.piso + 0.76;
  DEP.add(caja(2.3, 0.06, 0.9, mat(0xc89a64, 0.55), -0.6, ESC_Y - 0.03, ESC_Z));
  for (const x of [-1.65, 0.45]) DEP.add(caja(0.08, 0.73, 0.82, M.navy3, x, OFI.piso + 0.37, ESC_Z));
  monitor = new THREE.Group(); monitor.position.set(-1.45, ESC_Y, ESC_Z - 0.15); monitor.rotation.y = 0.55; monitor.scale.setScalar(1.3); DEP.add(monitor);
  monitor.add(caja(0.08, 0.32, 0.08, M.navy, 0, 0.16, -0.05)); monitor.add(caja(0.3, 0.02, 0.2, M.navy, 0, 0.01, -0.03));
  monitor.add(caja(0.86, 0.56, 0.05, M.navy, 0, 0.6, 0, 0.02));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.6, 0.027); monitor.add(pm);
  telefono = new THREE.Group(); telefono.position.set(0.05, ESC_Y, ESC_Z + 0.2); telefono.rotation.y = -0.3; telefono.scale.setScalar(1.6); DEP.add(telefono);   // (ronda 1: más grande y más al centro: se ve en P3)
  telefono.add(caja(0.24, 0.07, 0.22, M.navy3, 0, 0.035, 0, 0.03));
  for (let i = 0; i < 12; i++) telefono.add(caja(0.03, 0.015, 0.025, M.cr, -0.05 + (i % 3) * 0.04, 0.075, 0.03 + Math.floor(i / 3) * 0.035 - 0.04, 0.005));
  const tubo = caja(0.26, 0.05, 0.07, M.navy3, 0, 0.1, -0.06, 0.025); telefono.add(tubo);
  for (const s of [-1, 1]) telefono.add(caja(0.07, 0.045, 0.08, M.navy3, s * 0.11, 0.09, -0.06, 0.02));
  const bot = caja(0.05, 0.016, 0.03, mat(0x2a3b58, 0.5), 0.07, 0.077, 0.08, 0.006); telefono.add(bot); telefono.userData.boton = bot;
  const rulo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 40 }, (_, i) => V3(-0.13 - i * 0.004, 0.06 + Math.sin(i * 1.6) * 0.012, -0.06 + Math.cos(i * 1.6) * 0.012 + i * 0.002))), 120, 0.004, 5), M.navy3); telefono.add(rulo);
  mateR = crearMate(); mateR.scale.setScalar(1.15); DEP.add(mateR);
  termoR = crearTermo(); termoR.position.set(0.35, ESC_Y, ESC_Z - 0.25); DEP.add(termoR);
  for (let i = 0; i < 5; i++) DEP.add(caja(0.21, 0.006, 0.29, mat(i % 2 ? C.cr : 0xe8e4d6, 0.9), -0.85 + i * 0.006, ESC_Y + 0.004 + i * 0.006, ESC_Z + 0.25, 0.002).rotateY(0.1 * i - 0.2));
  const silla = new THREE.Group(); silla.position.set(-0.6, OFI.piso, ESC_Z - 0.75); DEP.add(silla);
  silla.add(caja(0.5, 0.08, 0.5, M.navy, 0, 0.5, 0)); silla.add(caja(0.48, 0.6, 0.07, M.navy, 0, 0.85, -0.25)); silla.add(caja(0.06, 0.5, 0.06, M.gris, 0, 0.25, 0));
}
// ---- racks selectivos: parantes navy3, largueros verdes, 3 niveles con pallets (cajas kraft, bolsas, pacas de agua) ----
function crearPallet() {
  const g = new THREE.Group(), m = M.madera, mo = mat(0xb89a6c, 0.8);
  for (let i = 0; i < 5; i++) g.add(caja(1.2, 0.025, 0.14, m, 0, 0.135, -0.43 + i * 0.215, 0.006));
  for (const z of [-0.43, 0, 0.43]) g.add(caja(1.2, 0.025, 0.14, mo, 0, 0.0125, z, 0.006));
  for (const x of [-0.52, 0, 0.52]) for (const z of [-0.43, 0, 0.43]) g.add(caja(0.14, 0.1, 0.14, mo, x, 0.075, z, 0.006));
  return g;
}
const harinaT = lienzo(512, 640, (x, w, h) => {
  x.fillStyle = "#dcd9c8"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.34, w, h * 0.3);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "HARINA", 900, 130, w - 40); x.fillText("HARINA", w / 2, h * 0.44);
  x.font = F(800, 74); x.fillText("000", w / 2, h * 0.57);
  x.fillStyle = "#5ce611"; x.fillRect(0, h * 0.86, w, h * 0.05);
});
function crearBolsaHarina() {
  // bolsa de papel de 25 kg acostada: cuerpo crema2, costura en zigzag arriba, "orejas" en las esquinas
  const g = new THREE.Group(), pm = mat(0xdcd9c8, 0.9), fm = new THREE.MeshStandardMaterial({ map: harinaT, roughness: 0.9 });
  const cu = mesh(rbox(0.5, 0.16, 0.36, 0.07, 3), [pm, pm, fm, pm, pm, pm], 0, 0.08, 0); g.add(cu);
  for (const s of [-1, 1]) { const o = mesh(new THREE.ConeGeometry(0.05, 0.08, 4), pm, s * 0.25, 0.08, 0.15); o.rotation.z = -s * Math.PI / 2; g.add(o); const o2 = o.clone(); o2.position.z = -0.15; g.add(o2); }
  for (let i = 0; i < 9; i++) g.add(caja(0.03, 0.012, 0.012, mat(C.cr3, 0.8), -0.2 + i * 0.05, 0.162, 0.17 + (i % 2) * 0.012, 0.003));
  return g;
}
function cargaPallet(g, tipo) {
  const p = crearPallet(); g.add(p);
  if (tipo === 0) for (let i = 0; i < 4; i++) for (let k = 0; k < 2; k++) g.add(caja(0.55, 0.42, 0.42, mat(k % 2 ? C.kraft : 0xbf9a62, 0.85), -0.29 + (i % 2) * 0.58, 0.36 + k * 0.43, -0.22 + Math.floor(i / 2) * 0.44, 0.02));
  else if (tipo === 1) for (let k = 0; k < 4; k++) for (let i = 0; i < 2; i++) { const b = crearBolsaHarina(); b.position.set(-0.27 + i * 0.54, 0.15 + k * 0.16, 0); b.rotation.y = Math.PI / 2 * (k % 2) * 0; g.add(b); }
  else if (tipo === 2) { const fm = mat(0x7fc46a, 0.25, { transparent: true, opacity: 0.85 }); for (let k = 0; k < 2; k++) g.add(caja(1.1, 0.42, 0.85, fm, 0, 0.36 + k * 0.43, 0, 0.05)); }
  else { for (let i = 0; i < 6; i++) g.add(caja(0.36, 0.34, 0.4, mat(C.kraft, 0.85), -0.38 + (i % 3) * 0.38, 0.32, -0.2 + Math.floor(i / 3) * 0.42, 0.02)); g.add(caja(1.1, 0.02, 0.8, mat(C.cr, 0.8), 0, 0.5, 0)); }
  return g;
}
function crearRack(largo, bahias) {
  const g = new THREE.Group();
  const bw = largo / bahias, niveles = [0.0, 1.55, 3.1, 4.65];
  const par = mat(C.navy3, 0.55);
  for (let i = 0; i <= bahias; i++) for (const z of [-0.5, 0.5]) g.add(caja(0.1, 6.2, 0.1, par, -largo / 2 + i * bw, 3.1, z, 0.01));
  for (const y of niveles.slice(1)) for (const z of [-0.52, 0.52]) g.add(caja(largo, 0.14, 0.07, M.g, 0, y, z, 0.01));
  for (let i = 0; i < bahias; i++) for (let n = 0; n < 4; n++) {
    if (az() < 0.12) continue;
    const pg = new THREE.Group(); pg.position.set(-largo / 2 + (i + 0.5) * bw, niveles[n] + (n ? 0.07 : 0), 0); pg.rotation.y = Math.PI / 2;
    cargaPallet(pg, Math.floor(az() * 4)); g.add(pg);
  }
  return g;
}
semilla = 5;
{
  // racks a lo largo de z a la izquierda; a la derecha, adelante del portón
  for (const x of [-10.6, -7.6]) { const r = crearRack(14, 9); r.rotation.y = Math.PI / 2; r.position.set(x, 0, 0.5); DEP.add(r); }
  { const r = crearRack(9, 6); r.position.set(-7.6 + 0.0, 0, -11.2); r.visible = false; }
  for (const x of [6.4, 9.4]) { const r = crearRack(6.5, 4); r.rotation.y = Math.PI / 2; r.position.set(x, 0, 4.6); DEP.add(r); }
  for (const x of [6.4, 9.4]) { const r = crearRack(5.0, 3); r.rotation.y = Math.PI / 2; r.position.set(x, 0, -8.9); DEP.add(r); }
  // pallets sueltos en el piso
  for (const [x, z, tp] of [[-4.4, -4.6, 0], [-4.4, 2.6, 3], [3.2, -5.2, 2], [-4.4, -1.2, 1]]) { const p = new THREE.Group(); p.position.set(x, 0, z); cargaPallet(p, tp); DEP.add(p); }
}
// ---- el pallet GRACIELA (parte 2) con su cartel kraft ----
const palletG = new THREE.Group(); scene.add(palletG);
palletG.add(crearPallet());
const bolsasG = [0, 1, 2, 3].map((i) => { const b = crearBolsaHarina(); b.position.set(-0.27 + (i % 2) * 0.54, 0.15 + Math.floor(i / 2) * 0.16, 0); palletG.add(b); return b; });
{
  const c = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.36), new THREE.MeshStandardMaterial({ map: cartelPT, roughness: 0.85 })); c.position.set(0, 0.36, 0.61); c.rotation.x = -0.25; palletG.add(c);
  palletG.add(caja(0.025, 0.4, 0.025, M.navy3, 0, 0.2, 0.6));
}
let claveP = null;
function dibujarCartelP(ok) {
  if (claveP === ok) return; claveP = ok;
  const { x } = cartelPT.userData, w = 512, h = 300;
  x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.strokeStyle = "#8a6a3a"; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10);
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "GRACIELA", 900, 104, w - (ok ? 190 : 60)); x.fillText("GRACIELA", ok ? w / 2 - 50 : w / 2, h * 0.4);   // (ronda 1: Lexend; en Caveat la C se leía G)
  x.font = F(800, 52); x.fillText("40 harina · lunes", w / 2, h * 0.78);
  if (ok) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.arc(w - 70, 66, 52, 0, 7); x.fill(); x.stroke(); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.lineCap = "round"; x.beginPath(); x.moveTo(w - 96, 66); x.lineTo(w - 76, 88); x.lineTo(w - 42, 44); x.stroke(); }
  cartelPT.needsUpdate = true;
}
// ---- la zorra (transpaleta) del operario ----
const zorra = new THREE.Group(); scene.add(zorra);
{
  const gm = mat(0xb4b8c0, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) zorra.add(caja(0.16, 0.07, 1.15, gm, s * 0.2, 0.06, 0.55));
  zorra.add(caja(0.6, 0.2, 0.22, gm, 0, 0.12, -0.08));
  const mango = caja(0.05, 1.0, 0.05, M.navy3, 0, 0.6, -0.25); mango.rotation.x = -0.35; zorra.add(mango);
  zorra.add(caja(0.3, 0.05, 0.05, M.navy3, 0, 1.08, -0.42));
  for (const s of [-1, 1]) zorra.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14), M.goma, s * 0.18, 0.08, -0.12).rotateZ(Math.PI / 2));
}

// =====================================================================================================
// LOS OBJETOS QUE SE MUEVEN
// =====================================================================================================
// ---- el globo de chat 3D (el pedido sin cargar hecho objeto): burbuja inflada crema con borde navy grueso y colita
const GLOBO_W = 0.6, GLOBO_H = 0.38, GLOBO_D = 0.24;
function crearGloboChat(tipo, texto) {
  const g = new THREE.Group(), cuerpo = new THREE.Group(); g.add(cuerpo);
  const tx = lienzo(1024, 650, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#0b1220"; x.lineWidth = 34; x.beginPath(); x.roundRect(17, 17, w - 34, h - 34, 150); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    if (tipo === "audio") {
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(170, h / 2, 95, 0, 7); x.fill(); x.lineWidth = 12; x.strokeStyle = "#0b1220"; x.stroke();
      x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(140, h / 2 - 50); x.lineTo(140, h / 2 + 50); x.lineTo(222, h / 2); x.closePath(); x.fill();
      for (let i = 0; i < 16; i++) { const hh = 40 + Math.abs(Math.sin(i * 1.7)) * 150; x.fillRect(300 + i * 30, h / 2 - hh / 2 - 40, 16, hh); }
      x.font = F(800, 110); x.textAlign = "left"; x.fillText("1:47", 520, h / 2 + 150);
    } else if (tipo === "foto") {
      x.fillStyle = "#f7f6f0"; x.save(); x.translate(w / 2, h / 2); x.rotate(-0.06); x.fillRect(-300, -210, 600, 420); x.strokeStyle = "#b4b2a3"; x.lineWidth = 8; x.strokeRect(-300, -210, 600, 420);
      x.strokeStyle = "#16243d"; x.lineWidth = 12; x.lineCap = "round";
      for (const [y0, wd] of [[-120, 420], [-20, 360], [80, 440]]) { x.beginPath(); x.moveTo(-240, y0); for (let i = 0; i < 14; i++) x.lineTo(-240 + (i * wd) / 14, y0 - 14 + ((i * 7) % 5) * 9 - (i % 2) * 20); x.stroke(); }
      x.fillStyle = "#c7655b"; x.beginPath(); x.arc(210, 140, 34, 0, 7); x.fill(); x.restore();
    } else {
      const lineas = texto.split("\n");
      const px = Math.min(...lineas.map((l) => ajustar(x, l, 900, lineas.length > 1 ? 190 : 210, w - 150)));
      x.font = F(900, px);
      lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.12 + px * 0.05));
    }
  });
  const crema = mat(C.cr, 0.35, { emissive: 0xffffff, emissiveIntensity: 0.06 }), navy = mat(C.navy, 0.4);
  const frente = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.18 });
  const b = mesh(rbox(GLOBO_W + 0.05, GLOBO_H + 0.05, GLOBO_D * 0.82, 0.12, 5), navy, 0, 0, -0.01); cuerpo.add(b);
  const c = mesh(rbox(GLOBO_W, GLOBO_H, GLOBO_D, 0.11, 5), [crema, crema, crema, crema, frente, crema], 0, 0, 0.0); cuerpo.add(c);
  // la colita (abajo a la izquierda)
  const co = mesh(new THREE.ConeGeometry(0.075, 0.16, 4), crema, -GLOBO_W * 0.3, -GLOBO_H / 2 - 0.05, 0.0); co.rotation.z = -0.55; cuerpo.add(co);
  const cob = mesh(new THREE.ConeGeometry(0.095, 0.19, 4), navy, -GLOBO_W * 0.3 - 0.008, -GLOBO_H / 2 - 0.055, -0.01); cob.rotation.z = -0.55; cuerpo.add(cob);
  g.userData.cuerpo = cuerpo;
  return g;
}
// ---- el auto de Nico: hatchback chico crema con franja navy3, vidrios celeste pálido, el celular en el tablero ----
// local: +z adelante, +x lado del conductor (izquierda del auto), y = 0 en el piso
const AUTO = { L: 3.4, W: 1.8, H: 1.9, piso: 0.32, asiento: 0.6 };
const celuAutoT = lienzo(400, 700, (x, w, h) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle";
  x.strokeStyle = "#5ce611"; x.lineWidth = 16; x.beginPath(); x.roundRect(110, 120, 180, 340, 26); x.stroke();
  x.fillStyle = "#5ce611"; x.fillRect(130, 140, 140, 300); x.fillRect(160, 92, 80, 30);
  x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(215, 190); x.lineTo(160, 300); x.lineTo(205, 300); x.lineTo(185, 400); x.lineTo(245, 275); x.lineTo(200, 275); x.closePath(); x.fill();
  x.fillStyle = "#5ce611"; x.font = F(800, 132); x.fillText("100%", w / 2, 585);
});
function crearAuto() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.45, { metalness: 0.05 }), fr = M.navy3;
  const { L, W: AW, H } = AUTO;
  // la carrocería baja y el capot
  g.add(caja(AW, 0.66, L, cue, 0, 0.63, 0, 0.2));
  g.add(caja(AW - 0.04, 0.16, 1.05, cue, 0, 0.92, L / 2 - 0.55, 0.12));
  // la franja navy3 al costado y los paragolpes
  for (const s of [-1, 1]) g.add(caja(0.02, 0.14, L - 0.4, fr, s * (AW / 2 + 0.002), 0.72, 0, 0.01));
  for (const s of [-1, 1]) g.add(caja(AW + 0.04, 0.16, 0.14, M.navy3, 0, 0.42, s * (L / 2 + 0.02), 0.05));
  // faros crema y luces de atrás rojo apagado
  for (const s of [-1, 1]) { g.add(mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 18), mat(0xfff6dc, 0.2, { emissive: 0xfff2c8, emissiveIntensity: 0.25 }), s * 0.6, 0.86, L / 2 + 0.01).rotateX(Math.PI / 2)); g.add(caja(0.26, 0.16, 0.04, M.red, s * 0.62, 0.9, -L / 2 - 0.005, 0.03)); }
  g.add(caja(0.9, 0.2, 0.03, M.navy3, 0, 0.62, L / 2 + 0.01, 0.03));   // la parrilla
  // la cabina: parantes navy3, techo crema, vidrios
  const cab = { z0: -L / 2 + 0.15, z1: L / 2 - 1.05, y0: 0.95, y1: H };
  const cz = (cab.z0 + cab.z1) / 2, cl2 = cab.z1 - cab.z0;
  // el techo con techo solar (ronda 1: desde arriba, P4b y P5, se ven los globos apretados adentro)
  for (const s of [-1, 1]) g.add(caja(0.26, 0.16, cl2 + 0.12, cue, s * (AW / 2 - 0.15), cab.y1 - 0.06, cz, 0.06));
  g.add(caja(AW - 0.04, 0.16, 0.3, cue, 0, cab.y1 - 0.06, cab.z1 - 0.09, 0.06)); g.add(caja(AW - 0.04, 0.16, 0.26, cue, 0, cab.y1 - 0.06, cab.z0 + 0.07, 0.06));
  { const ts = new THREE.Mesh(new THREE.PlaneGeometry(AW - 0.5, cl2 - 0.42), M.vidrioAuto); ts.rotation.x = -Math.PI / 2; ts.position.set(0, cab.y1 - 0.02, cz - 0.02); ts.renderOrder = 6; g.add(ts); }
  for (const s of [-1, 1]) for (const [z, w] of [[cab.z0 + 0.08, 0.2], [cab.z1 - 0.06, 0.13], [-0.08, 0.13]]) g.add(caja(0.1, cab.y1 - cab.y0, w, cue, s * (AW / 2 - 0.06), (cab.y0 + cab.y1) / 2, z, 0.03));
  for (const s of [-1, 1]) g.add(caja(0.06, 0.06, cl2, fr, s * (AW / 2 - 0.05), cab.y0 + 0.02, cz, 0.02));
  const vid = (w, h, x, y, z, ry) => { const v = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M.vidrioAuto); v.position.set(x, y, z); v.rotation.y = ry; v.renderOrder = 6; g.add(v); return v; };
  const vH = cab.y1 - cab.y0 - 0.12, vY = (cab.y0 + cab.y1) / 2 - 0.02;
  // ventanilla del conductor (+x, adelante: baja) y las demás
  const ventCond = vid(cab.z1 - 0.08 - (-0.04), vH, AW / 2 - 0.04, vY, (cab.z1 - 0.04 - 0.04) / 2, Math.PI / 2);
  vid(-0.12 - cab.z0 - 0.04, vH, AW / 2 - 0.04, vY, (cab.z0 + 0.04 - 0.12) / 2, Math.PI / 2);
  vid(cl2 - 0.1, vH, -AW / 2 + 0.04, vY, cz, -Math.PI / 2);
  const parab = vid(AW - 0.16, vH, 0, vY, cab.z1, 0); parab.rotation.x = -0.12;
  vid(AW - 0.16, vH, 0, vY, cab.z0, Math.PI);
  // la puerta del acompañante (-x, adelante): bisagra en su borde delantero; se abre en P1b
  const puerta = new THREE.Group(); puerta.position.set(-AW / 2 - 0.01, 0, cab.z1 - 0.05); g.add(puerta);
  puerta.add(caja(0.05, 0.64, 1.15, cue, -0.01, 0.63, -0.58, 0.03));
  puerta.add(caja(0.02, 0.14, 1.1, fr, -0.035, 0.72, -0.58, 0.01));
  puerta.add(caja(0.03, 0.04, 0.16, M.navy, -0.045, 0.86, -0.95, 0.01));
  // ruedas navy con llanta crema
  for (const s of [-1, 1]) for (const z of [-L / 2 + 0.62, L / 2 - 0.62]) {
    const r = new THREE.Group(); r.position.set(s * (AW / 2 - 0.12), 0.34, z); g.add(r);
    r.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 24), M.goma).rotateZ(Math.PI / 2));
    r.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.27, 16), M.cr2).rotateZ(Math.PI / 2));
  }
  // el interior: asientos navy, el volante, el tablero con el celular enchufado (cable crema)
  for (const s of [-1, 1]) { g.add(caja(0.62, 0.16, 0.6, M.navy2, s * 0.42, AUTO.asiento - 0.06, -0.05, 0.05)); g.add(caja(0.62, 0.7, 0.14, M.navy2, s * 0.42, AUTO.asiento + 0.32, -0.4, 0.06)); }
  g.add(caja(AW - 0.2, 0.16, 0.6, M.navy2, 0, AUTO.asiento - 0.06, -1.05, 0.05)); g.add(caja(AW - 0.2, 0.62, 0.14, M.navy2, 0, AUTO.asiento + 0.28, -1.38, 0.06));
  g.add(caja(AW - 0.12, 0.26, 0.3, M.navy3, 0, 0.98, cab.z1 - 0.07, 0.06));
  const volante = mesh(new THREE.TorusGeometry(0.17, 0.025, 8, 24), M.navy, 0.42, 1.08, cab.z1 - 0.3); volante.rotation.x = -0.5; g.add(volante);
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 10), M.navy, 0.42, 1.06, cab.z1 - 0.22).rotateX(Math.PI / 2 - 0.5));   // la columna
  // el celular en su soporte sobre el tablero (al lado del volante), enchufado: cuna navy con dos pestañas, el cable
  // crema que baja en curva hasta el puerto USB del tablero (P4c lo muestra de cerca)
  g.add(caja(AW - 0.12, 0.05, 0.12, M.navy, 0, 1.12, cab.z1 - 0.06, 0.02));   // el borde de arriba del tablero, contra el parabrisas
  const celu = new THREE.Group(); celu.position.set(0.16, 1.27, cab.z1 - 0.22); celu.rotation.x = -0.12; g.add(celu);
  celu.add(caja(0.15, 0.27, 0.025, M.navy, 0, 0, 0, 0.02));
  const cp = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.24), new THREE.MeshBasicMaterial({ map: celuAutoT, toneMapped: false })); cp.position.z = -0.014; cp.rotation.y = Math.PI; celu.add(cp);
  celu.add(caja(0.19, 0.03, 0.07, M.navy3, 0, -0.15, 0.0, 0.01));                       // la cuna
  for (const sx of [-1, 1]) celu.add(caja(0.02, 0.09, 0.05, M.navy3, sx * 0.087, -0.1, 0.0, 0.006));   // las pestañas
  celu.add(caja(0.06, 0.05, 0.06, M.navy3, 0, -0.17, 0.03, 0.01));                      // la base pegada al tablero
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(-0.03, -0.13, -0.005), V3(-0.05, -0.17, -0.03), V3(-0.1, -0.175, -0.05), V3(-0.15, -0.165, -0.03), V3(-0.19, -0.17, 0.0)]), 24, 0.008, 6), M.cr); celu.add(cable);
  celu.add(caja(0.05, 0.03, 0.04, M.navy3, -0.2, -0.175, 0.0, 0.008));                  // el puerto del tablero
  g.userData = { puerta, ventCond, ventY: vY, vH, celu, cab };
  return sombras(g);
}
const auto = crearAuto(); scene.add(auto);
auto.traverse((o) => { if (o.isMesh && o.material === M.vidrioAuto) o.castShadow = false; });
// los globos del auto (lugares fijos en el auto: nunca atraviesan los vidrios ni a Nico). [x, y, z, escala final, aplastado]
const SLOTS = [
  [-0.4, 1.25, 0.05, 1.05, [0.8, 1.15]],   // 0 · el de Graciela, en el asiento del acompañante
  [0.42, 1.2, -1.0, 1.0, [1.1, 0.9]],      // 1 · atrás, del lado del conductor (se ve por la ventanilla de atrás)
  [-0.42, 1.18, -1.0, 1.0, [0.9, 1.1]],    // 2 · atrás, del otro lado
  [0.0, 1.62, -1.05, 0.95, [1.15, 0.75]],  // 3 · arriba atrás, contra el techo
  [-0.38, 1.66, 0.12, 0.9, [1.1, 0.72]],   // 4 · arriba adelante, contra el techo
  [0.1, 1.2, -0.5, 0.95, [0.85, 1.1]],     // 5 · en el medio
  [0.18, 1.58, -0.4, 0.9, [1.05, 0.8]],    // 6 · el último: contra la cabeza de Nico (el cachete)
];
// (ronda 1) el auto lleno de verdad: en T.lleno cada globo crece y se aplasta contra un vidrio (el 6, contra el cachete
// de Nico). [x, y, z, sx, sy, sz, giro]
const LLENO = [
  [-0.43, 1.27, 0.37, 1.12, 1.0, 0.55, 0.0],    // 0 · contra el parabrisas, lado del acompañante
  [0.42, 1.25, -1.05, 1.3, 1.3, 0.8, 0.25],     // 1 · atrás, conductor
  [-0.42, 1.25, -1.05, 1.3, 1.3, 0.8, 0.6],     // 2 · atrás, acompañante
  [0.0, 1.62, -1.1, 1.3, 0.7, 0.8, 0.45],       // 3 · atrás arriba, contra el techo
  [-0.42, 1.61, 0.34, 1.1, 0.72, 0.5, 0.0],     // 4 · adelante arriba, contra el techo y el parabrisas
  [0.05, 1.3, -0.62, 1.25, 1.2, 0.7, 0.45],     // 5 · en el medio
  [-0.01, 1.42, 0.12, 0.55, 1.15, 0.7, -0.15],  // 6 · contra el cachete derecho de Nico
];
const GLOBOS = [
  crearGloboChat("txt", "40 harina\nlunes"), crearGloboChat("txt", "2 azúcar"), crearGloboChat("txt", "agua con\ngas x6"),
  crearGloboChat("audio"), crearGloboChat("foto"), crearGloboChat("txt", "lo mismo\n+ 2"), crearGloboChat("txt", "dale"),
];
GLOBOS.forEach((g) => scene.add(g));
// ---- el autoelevador: cuerpo verde de marca, contrapeso navy3, techo de caños navy, mástil gris con dos horquillas ----
// local: +z adelante (las horquillas), y = 0 en el piso. userData.carro.position.y = altura de las horquillas
function crearAutoelevador() {
  const g = new THREE.Group(), verde = mat(C.g, 0.45), gm = mat(0xc4c8cf, 0.35, { metalness: 0.4 });
  g.add(caja(1.2, 0.75, 1.9, verde, 0, 0.62, -0.15, 0.12));
  g.add(caja(1.18, 0.62, 0.5, M.navy3, 0, 0.75, -1.05, 0.2));        // el contrapeso
  g.add(caja(1.0, 0.1, 0.5, M.navy, 0, 1.02, -0.1, 0.04));
  g.add(caja(0.55, 0.12, 0.5, M.navy, 0, 1.05, -0.2, 0.05));         // el asiento
  g.add(caja(0.55, 0.5, 0.1, M.navy, 0, 1.3, -0.45, 0.04));
  g.add(caja(0.9, 0.35, 0.3, verde, 0, 1.15, 0.55, 0.06));           // el tablero
  const vol = mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 22), M.navy, 0, 1.42, 0.42); vol.rotation.x = -1.0; g.add(vol);
  g.add(caja(0.04, 0.3, 0.04, M.navy, 0, 1.3, 0.48));
  // el techo de protección (caños navy)
  for (const sx of [-1, 1]) for (const z of [0.55, -0.85]) g.add(caja(0.07, 1.4, 0.07, M.navy, sx * 0.55, 1.65, z, 0.02));
  for (let i = 0; i < 6; i++) g.add(caja(1.18, 0.05, 0.06, M.navy, 0, 2.36, -0.85 + i * 0.28, 0.02));
  for (const sx of [-1, 1]) g.add(caja(0.06, 0.06, 1.5, M.navy, sx * 0.56, 2.36, -0.15, 0.02));
  // la baliza (rojo apagado) y el portavasos con el mate
  const baliza = mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 14), mat(C.red, 0.35, { emissive: C.red, emissiveIntensity: 0.3 }), 0.4, 2.45, -0.8); g.add(baliza);
  g.add(mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.08, 14), M.navy3, 0.38, 1.18, 0.4));
  // ruedas macizas navy
  for (const sx of [-1, 1]) for (const [z, r] of [[0.45, 0.32], [-0.85, 0.27]]) g.add(mesh(new THREE.CylinderGeometry(r, r, 0.26, 20), M.goma, sx * 0.5, r, z).rotateZ(Math.PI / 2));
  // el mástil y el carro con las dos horquillas
  for (const sx of [-1, 1]) g.add(caja(0.1, 2.6, 0.12, gm, sx * 0.38, 1.35, 0.92, 0.02));
  g.add(caja(0.86, 0.1, 0.12, gm, 0, 2.62, 0.92, 0.02));
  const carro = new THREE.Group(); carro.position.set(0, 0.06, 1.0); g.add(carro);
  carro.add(caja(0.95, 0.5, 0.06, M.navy3, 0, 0.3, 0.02, 0.02));
  for (const sx of [-1, 1]) { carro.add(caja(0.12, 0.05, 1.25, gm, sx * 0.3, 0.025, 0.66, 0.01)); carro.add(caja(0.12, 0.5, 0.06, gm, sx * 0.3, 0.25, 0.05, 0.01)); }
  g.userData = { carro, baliza };
  return sombras(g);
}
const elev = crearAutoelevador(); scene.add(elev);
const mateElev = crearMate(); mateElev.scale.setScalar(1.0); mateElev.position.set(0.38, 1.18, 0.4); elev.add(mateElev);
// ---- el camión de reparto: cabina navy3, caja crema con franja verde, puertas traseras de dos hojas, el remito ----
// local: +z adelante (la cabina); la caja de z 0 (atrás, las puertas) a 6; piso de la caja a 1,2
const CAJA = { L: 6.0, W: 2.5, H: 2.6, piso: 1.2 };
function crearCamion() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.55), fr = M.navy3;
  const { L, W: CW, H, piso } = CAJA;
  // la caja (abierta atrás): piso, paredes y techo
  g.add(caja(CW, 0.12, L, M.navy3, 0, piso - 0.06, L / 2));
  g.add(caja(0.08, H, L, cue, -CW / 2 + 0.04, piso + H / 2, L / 2, 0.02)); g.add(caja(0.08, H, L, cue, CW / 2 - 0.04, piso + H / 2, L / 2, 0.02));
  g.add(caja(CW, 0.08, L, cue, 0, piso + H - 0.04, L / 2, 0.02)); g.add(caja(CW, H, 0.08, cue, 0, piso + H / 2, L - 0.04, 0.02));
  for (const s of [-1, 1]) g.add(caja(0.02, 0.32, L - 0.2, M.g, s * (CW / 2 + 0.005), piso + H * 0.5, L / 2, 0.01));
  const interior = mesh(new THREE.PlaneGeometry(CW - 0.2, H - 0.2), mat(0xcfccbd, 0.9), 0, piso + H / 2, L - 0.09); g.add(interior);
  g.add(caja(CW + 0.06, 0.12, 0.12, fr, 0, piso + H, 0.02, 0.02)); for (const s of [-1, 1]) g.add(caja(0.12, H + 0.1, 0.12, fr, s * CW / 2, piso + H / 2, 0.02, 0.02));
  g.add(caja(CW + 0.1, 0.18, 0.2, M.navy, 0, piso - 0.2, 0.0, 0.03));
  // las dos hojas de atrás (bisagras en los bordes, abren 180° hacia afuera)
  const puertas = [-1, 1].map((s) => {
    const p = new THREE.Group(); p.position.set(s * CW / 2, piso, -0.04); g.add(p);
    p.add(caja(CW / 2 - 0.02, H - 0.04, 0.06, cue, -s * (CW / 4), H / 2, -0.03, 0.02));
    p.add(caja(0.04, H - 0.3, 0.03, M.navy3, -s * (CW / 2 - 0.12), H / 2, -0.07, 0.01));
    for (const y of [0.4, H - 0.4]) p.add(caja(0.1, 0.12, 0.05, M.navy, -s * 0.02, y, -0.06, 0.01));
    p.add(caja(CW / 2 - 0.1, 0.12, 0.02, M.g, -s * (CW / 4), H * 0.5, -0.065, 0.01));
    return p;
  });
  // el remito pegado en la hoja derecha (la de -x, vista desde atrás queda a la derecha)
  const rem = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.66), new THREE.MeshStandardMaterial({ map: remitoT, roughness: 0.85 }));
  rem.position.set(CW / 4, H * 0.7, -0.075); rem.rotation.y = Math.PI; puertas[0].add(rem);
  // la cabina
  g.add(caja(CW, 2.3, 1.9, M.navy3, 0, 1.55, L + 1.1, 0.18));
  const pv = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.3, 0.9), mat(C.celeste, 0.1)); pv.position.set(0, 2.15, L + 2.06); g.add(pv);
  for (const s of [-1, 1]) { const vl = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.75), mat(C.celeste, 0.1)); vl.position.set(s * (CW / 2 + 0.005), 2.1, L + 1.3); vl.rotation.y = s * Math.PI / 2; g.add(vl); }
  // ruedas
  for (const s of [-1, 1]) for (const z of [1.0, 2.3, L + 1.2]) g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 22), M.goma, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2));
  g.userData = { puertas };
  return sombras(g);
}
camion = crearCamion(); scene.add(camion);
puertasCam = camion.userData.puertas;
const CAM0 = W(CAMX, 0, MUELLE.z1);   // la cola del camión pegada al muelle
let claveR = null;
function dibujarRemito(ok) {
  if (claveR === ok) return; claveR = ok;
  const { x } = remitoT.userData, w = 600, h = 420;
  x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 92); x.fillStyle = "#efeee5"; x.font = F(800, 58); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("REMITO", w / 2, 50);
  x.fillStyle = "#0b1220"; ajustar(x, "GRACIELA", 900, 92, w - 60); x.fillText("GRACIELA", w / 2, 172);
  x.font = F(800, 60); x.fillText("ROTISERÍA", w / 2, 252);
  if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(36, 302, w - 72, 100, 50); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 66); x.fillText("40 harina ✓", w / 2, 354); }
  else { x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(36, 302, w - 72, 100, 50); x.fill(); x.fillStyle = "#f7f6f0"; x.font = F(900, 68); x.fillText("sin pedido", w / 2, 354); }
  remitoT.needsUpdate = true;
}
// ---- la tarjeta del pedido (parte 2): verde de marca, se parte en dos ----
const tarjT = lienzo(900, 520, (x, w, h) => {
  x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
  x.strokeStyle = "#0b1220"; x.lineWidth = 22; x.beginPath(); x.roundRect(11, 11, w - 22, h - 22, 60); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = F(900, 104); x.fillText("Graciela", w / 2, 120);
  x.font = F(800, 82); x.fillText("40 harina · lunes", w / 2, 250);
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(170, 330, w - 340, 120, 60); x.fill(); x.fillStyle = "#5ce611"; x.font = F(900, 80); x.fillText("Cargado ✓", w / 2, 392);
});
const TARJ_W = 0.9, TARJ_H = 0.52;
function mitadTarjeta(lado) {
  // lado 0: la tarjeta entera; 1/2: la mitad de arriba/abajo (se parte en dos al entrar al depósito)
  const g = new THREE.Group();
  const tx = tarjT.clone(); tx.needsUpdate = true;
  if (lado) { tx.repeat.set(1, 0.5); tx.offset.set(0, lado === 1 ? 0.5 : 0); }
  const h = lado ? TARJ_H / 2 : TARJ_H;
  const m = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4, emissive: 0xffffff, emissiveMap: tx, emissiveIntensity: 0.2 });
  const gv = mat(C.g, 0.4);
  g.add(mesh(rbox(TARJ_W, h, 0.03, 0.04, 2), [gv, gv, gv, gv, m, gv]));
  return g;
}
const tarjeta = mitadTarjeta(0), mitades = [mitadTarjeta(1), mitadTarjeta(2)];
scene.add(tarjeta, ...mitades);
// ---- los celulares: el de Nico (en la mano) ----
const celuN = crearCelular(pantN, C.navy3, 0.08, 0.162); celuN.scale.setScalar(1.5); scene.add(celuN);
let claveN = "";
function dibujarCeluN(t) {
  const parte2 = t >= P2;
  const toque = parte2 ? T.toques.filter((a) => t >= a).length : 0;
  const ok = parte2 && t >= T.ding ? 1 : 0;
  const clave = `${parte2}|${toque}|${ok}`; if (clave === claveN) return; claveN = clave;
  const { x } = pantN.userData, w = 600, h = 975;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  if (!parte2) {
    x.font = F(800, 64); x.fillText("Graciela", 40, 80);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 220, 470, 220, 40); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("40 de harina", 64, 290); x.fillText("para el lunes", 64, 370);
  } else {
    x.font = F(800, 60); x.fillText("Nuevo pedido", 40, 80);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 200, w - 60, 330, 36); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 70); x.fillText("Graciela", 66, 270); x.font = F(800, 60); x.fillText("40 harina", 66, 370); x.fillText("lunes", 66, 450);
    x.textAlign = "center";
    x.fillStyle = "#5ce611"; x.strokeStyle = "#efeee5"; x.lineWidth = 8; x.beginPath(); x.roundRect(60, 620, w - 120, 160, 80); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 84); x.fillText(ok ? "Cargado ✓" : "Cargar", w / 2, 702);
    if (toque && !ok) { x.strokeStyle = "rgba(239,238,229,0.9)"; x.lineWidth = 10; x.beginPath(); x.arc(w / 2, 700, 60 + toque * 30, 0, 7); x.stroke(); }
  }
  pantN.needsUpdate = true;
}
// ---- el monitor de Rubén ----
let claveM = "";
function dibujarMonitor(t) {
  const parte2 = t >= P2, ning = !parte2 && t >= T.ninguno ? 1 : 0, ficha = parte2 && t >= T.ficha ? 1 : 0;
  const clave = `${parte2}|${ning}|${ficha}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1024, h = 640;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 66);
  if (!parte2) {
    x.fillText("Pedidos · lunes", 44, 62);
    x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(30, 168, w - 60, 140, 26); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 74); x.fillText("Graciela · Rotisería", 64, 238);
    if (ning) { x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(30, 350, w - 60, 230, 30); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 150); x.fillText("ninguno", w / 2, 468); }
  } else {
    x.fillText("Ficha · Graciela", 44, 62);
    x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Rotisería", 54, 200);
    if (ficha) {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 262, w - 60, 150, 30); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 78); x.fillText("40 harina · lunes ✓", 60, 338);
      x.fillStyle = "#efeee5"; x.font = F(800, 62); x.fillText("Compra cada 15 días", 54, 488); x.fillStyle = "#b4b2a3"; x.font = F(700, 52); x.fillText("Último: aceite, hace 2 semanas", 54, 572);
    }
  }
  pantM.needsUpdate = true;
}

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [8.9, 13.2, 21.95, 29.2, 32.95] });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true, parpadeoCada: 999, parpadeosExtra: [2.4, 6.4, 12.6, 16.2, 27.6, 33.9] });
const graciela = crearPersonaje({ ...ELENCO.clienta, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.25, 24.2] });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999, parpadeosExtra: [3.9] });
const barman = crearPersonaje({ ...DEFECTO, nombre: "Tito", piel: PIEL.clara, pelo: PELO.negro, peinado: "corto", bigote: PELO.negro, cejasColor: 0x2a2220, camisa: 0xf7f7f2, mangas: "largas", cuello: 0xf7f7f2, chaleco: { color: C.navy3, botones: C.cr }, panza: 1.15, nariz: 0.064, parpadeoCada: 999 });
const kiosquera = crearPersonaje({ ...DEFECTO, nombre: "Elsa", piel: PIEL.clara, pelo: 0xe8e4dc, peinado: "rodete", cejasColor: 0xb0aaa0, lentes: C.navy3, camisa: 0xd6c7a6, mangas: "largas", cuello: C.cr, panza: 1.05, nariz: 0.052, labios: 0xb5555a, alto: 0.95, parpadeoCada: 999 });
const operario = crearPersonaje({ ...DEFECTO, nombre: "Darío", piel: PIEL.morena, pelo: PELO.negro, peinado: "corto", bigote: PELO.negro, cejasColor: 0x1e1a18, camisa: C.navy3, mangas: "largas", cuello: C.g, pantalon: C.navy3, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, parpadeoCada: 999 });
// (ronda 1) la corona canosa de Rubén (una cáscara lisa) de espaldas se leía como casco o venda: la reemplazo por
// mechones canosos de distinto tamaño alrededor de la nuca y sobre las orejas, con el borde de abajo irregular
{
  const corona = ruben.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (corona) {
    corona.scale.multiplyScalar(0.985);   // queda debajo, rellena los huecos entre mechones
    const pm = mat(PELO.canoso, 0.85), pm2 = mat(0xa9a6a0, 0.85);
    const R0 = 0.3, CC0 = R0 * 0.92;
    semilla = 21; ruben.raiz.updateMatrixWorld(true);
    for (let fila = 0; fila < 2; fila++) {
      const el = [0.24, -0.08][fila], n = [10, 11][fila], a0 = [1.7, 1.66][fila];
      for (let i = 0; i < n; i++) {
        const az0 = a0 + ((Math.PI * 2 - 2 * a0) * (i + 0.5 * (fila % 2))) / (n - 0.5);
        const k = 1.0 + 0.02 * az();
        const e2 = el + (az() - 0.5) * 0.1, a2 = az0 + (az() - 0.5) * 0.12;
        const x = R0 * k * Math.sin(a2) * Math.cos(e2), y = CC0 + R0 * 0.97 * k * Math.sin(e2), z = R0 * 0.95 * k * Math.cos(a2) * Math.cos(e2);
        const m = mesh(new THREE.SphereGeometry(1, 12, 9), (i + fila) % 3 ? pm : pm2, x, y, z);
        const tam = 0.06 + 0.014 * az();
        m.scale.set(tam * (1.2 + 0.3 * az()), tam * (1.35 + 0.35 * az()), tam * 0.5);
        m.lookAt(ruben.cabeza.localToWorld(new THREE.Vector3(x * 3, CC0 + (y - CC0) * 3, z * 3))); m.rotateZ((az() - 0.5) * 0.8);
        ruben.cabeza.add(m);
      }
    }
  }
}
// (ronda 1) el operario tenía la cara de Nico: gorra navy con visera verde (y bigote)
{
  const R0 = 0.3, CC0 = R0 * 0.92, gm = mat(C.navy3, 0.7), vm = mat(C.g, 0.5);
  const copa = mesh(new THREE.SphereGeometry(R0 * 1.05, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.4), gm, 0, CC0 + 0.01, -0.01); operario.cabeza.add(copa);
  const vis = mesh(new THREE.CylinderGeometry(R0 * 0.75, R0 * 0.75, 0.025, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9), vm, 0, CC0 + R0 * 0.36, R0 * 0.62); vis.scale.set(1.1, 1, 0.9); vis.rotation.x = 0.12; operario.cabeza.add(vis);
  operario.cabeza.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), vm, 0, CC0 + R0 * 1.06, 0));
}
const TODOS = [ruben, nico, graciela, marta, barman, kiosquera, operario];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// el pulgar arriba de Nico (un dedo gordo que sale del puño, hacia arriba cuando el antebrazo va adelante)
const PULGAR = nico.brazos.map((b) => { const p = mesh(new THREE.CapsuleGeometry(0.024, 0.05, 4, 8), mat(ELENCO.empleado.piel, 0.55), b.s * -0.012, -0.05, 0.075); p.rotation.x = Math.PI / 2; p.visible = false; b.mano.add(p); return p; });
// la herradura de pelo de Rubén vista desde atrás se leía como una barra flotante (me-haces-precio)
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.9;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla; de anotamelo) =================
// cada línea: texto; lo que va entre [corchetes] lleva el recuadro verde de selección (la palabra clave)
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0))) / 2;
  const Wg = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.font = F(800, px * 2); x.textBaseline = "middle";
    lineas.forEach((l, i) => {
      const y = h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08;
      const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
      const anchos = partes.map((p) => med.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
      let xx = w / 2 - anchos.reduce((a, b) => a + b, 0) / 2;
      partes.forEach((p, k) => {
        if (p.startsWith("[")) {
          x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1;
          x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.98, anchos[k] - px * 0.1, px * 1.96, px * 0.1); x.fill(); x.stroke();
          x.fillStyle = tinta; x.textAlign = "left"; x.fillText(limpio(p), xx + px * 0.25, y);
        } else { x.fillStyle = tinta; x.textAlign = "left"; x.fillText(p, xx, y); }
        xx += anchos[k];
      });
    });
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = Wg / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W: Wg, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0, sy = 1) {
  g.visible = s > 0.4;
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg, H, cola } = g.userData;
  cx = Wg + 160 > 1080 ? 540 : cl(cx, Wg / 2 + 80, 1000 - Wg / 2);
  cy = cl(cy, H / 2 + 110, 1790 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.set(k * PXK * s, k * PXK * s * sy, k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (Wg / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * Wg) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * Wg) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    cola.position.set((lado * Wg) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * Wg) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.181, 0.3))); };
const GL = {
  gra: crearGlobo(["Cuarenta de harina", "para el lunes."], 66),
  m1: crearGlobo(["¿Me sumás dos", "de azúcar?"], 72),
  n2: crearGlobo(["Ya lo [cargo.]"], 76),
  bar: crearGlobo(["¿Y el agua con gas?"], 62), barN: crearGlobo(["Ya lo [cargo.]"], 62),
  kio: crearGlobo(["Lo de siempre."], 62), kioN: crearGlobo(["Ya lo [cargo.]"], 62),
  raf: [0, 1, 2].map(() => crearGlobo(["Ya lo [cargo.]"], 64)),
  g1: crearGlobo(["Rubén,", "¿y la harina?"], 76),
  r1: crearGlobo(["Lo único que", "carga Nico es", "el [celular.]"], 74),
  r2: crearGlobo(["¡Nico!"], 92),
  n3: crearGlobo(["¡Ya lo [cargo!]"], 82),
  r3: crearGlobo(["Ya lo [cargué.]"], 92),
  n4: crearGlobo(["Sí, sí.", "Ya lo [cargo.]"], 70),
  n5: crearGlobo(["Ya lo car…"], 80),
  n6: crearGlobo(["Rubén, ¿lo", "de Graciela?"], 74),
  r4: crearGlobo(["Ya salió."], 92),
};

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Los de la parte 2 repiten el encuadre de su par de la parte 1 (P1 → Q1, P7 → Q3).
const w3 = (x, y, z) => [OX + x, y, z];
const ROTI = (k = 0, fov = 48) => [1.0 - k * 0.05, 1.98 - k * 0.04, -6.05 + k * 0.35, -0.45, 1.3, -1.9, fov - k * 1.5];
const PLANOS = [
  // P1: detrás de Graciela (de espaldas, primer término), Nico de frente; después la cámara sigue a Nico por arriba
  // del mostrador, sale por la puerta y queda en la vereda frente a la puerta del acompañante
  ["P1", 0, [[0, ...ROTI(0)], [T.p1b, ...ROTI(1)]]],
  // P1b: la vereda, desde el lado de la rotisería: la puerta a la derecha, el auto a la izquierda
  ["P1b", T.p1b, [[T.p1b, -2.7, 1.8, 2.25, 1.2, 1.3, -0.5, 50], [T.sale[1], -2.5, 1.75, 1.6, 1.6, 1.3, 1.5, 50], [T.p2, -2.5, 1.75, 1.5, 1.6, 1.25, 1.9, 49]]],
  ["P2", T.p2, null],                      // sigue al auto (se arma en renderAt)
  ["P3", T.p3, [[T.p3, ...w3(3.2, 1.1, 3.0), ...w3(-9.0, 2.6, -4.5), 56], [T.p3 + 0.4, ...w3(4.4, 2.2, 0.2), ...w3(-1.2, 3.4, -8), 56], [T.grua[1], ...w3(-0.5, 4.72, -6.55), ...w3(-0.38, 4.38, -10.2), 50], [T.p4, ...w3(-0.5, 4.7, -6.85), ...w3(-0.38, 4.36, -10.2), 47]]],
  ["P4", T.p4, null],                     // inserto del monitor (de frente a la pantalla, se arma en renderAt)
  // P4b (ronda 1): por encima del hombro de Rubén, de pie contra el vidrio de la oficina: su nuca grande abajo y el auto
  // lleno de globos (se ven por el techo solar) entrando al depósito
  ["P4b", T.p4b, [[T.p4b, ...w3(-0.05, 5.8, -9.95), ...w3(-0.95, 1.1, -0.9), 42], [T.p4c, ...w3(-0.08, 5.78, -9.85), ...w3(-1.0, 1.1, -0.8), 40]]],
  ["P4c", T.p4c, null],                    // inserto del tablero (se arma en renderAt)
  // P5 (ronda 1): desde el balcón, detrás y a la derecha de Rubén (él a la izquierda, entero), el auto abajo
  ["P5", T.p5, [[T.p5, ...w3(-1.5, 5.6, -9.6), ...w3(-0.6, 0.7, -2.0), 48], [T.p5b, ...w3(-1.5, 5.55, -9.45), ...w3(-0.62, 0.7, -2.0), 46]]],
  ["P5b", T.p5b, [[T.p5b, ...w3(2.4, 0.95, 1.4), ...w3(-1.3, 2.9, -4.6), 52], [T.p6, ...w3(2.35, 0.95, 1.3), ...w3(-1.3, 2.9, -4.6), 50]]],
  ["P6", T.p6, [[T.p6, ...w3(1.05, 0.8, 0.55), ...w3(-2.35, 3.0, -6.5), 56], [T.p7, ...w3(1.0, 0.82, 0.45), ...w3(-2.35, 3.0, -6.5), 54]]],
  ["P7", T.p7, null],                      // el viaje del autoelevador (sigue al auto)
  // P8 (ronda 1): más atrás y corrido hacia Rubén (entero a la derecha); cuando el camión se va, la cámara se le acerca
  ["P8", T.p8, [[T.p8, ...w3(-1.6, 2.75, 2.7), ...w3(-1.6, 2.3, 8.0), 50], [T.arranca, ...w3(-1.65, 2.72, 2.9), ...w3(-1.75, 2.3, 8.0), 50], [P1, ...w3(-2.15, 2.7, 4.7), ...w3(-2.4, 2.45, 7.6), 44]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...ROTI(0)], [T.vuela[0], ...ROTI(0.9)], [T.q2, ...ROTI(1)]]],
  ["Q2", T.q2, null],                      // sigue a la tarjeta
  ["Q2b", T.q2b, null],
  ["Q3", T.q3, null],                      // (ronda 1) Q3: el autoelevador sube la rampa con el pallet (de costado, como P7)
  ["Q3b", Math.round((T.n6 - 0.05) * 100) / 100, null],   // desde el auto: Nico asomado, Rubén arriba en el muelle
  ["Q3c", Math.round((T.r4 - 0.08) * 100) / 100, null],   // Rubén 3/4 en el autoelevador: "Ya salió."
  ["Q4", T.q4, null],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }

// ================= ESTADOS EN EL TIEMPO =================
// ---- el auto: dónde está y hacia dónde mira ----
const PARADAS_X = [-8, -16, -24, -32, -40, -48];
const AUTO_ROTI = 1.0;                     // estacionado frente a la rotisería (calle)
const AUTO_Z = 3.45;
function autoXCalle(t) {
  const K = [[T.p2, -3.0]];
  T.paradas.forEach(([a, b], i) => { K.push([a, PARADAS_X[i]], [b, PARADAS_X[i]]); });
  if (t < T.p2) return AUTO_ROTI;
  return claves(t, K, (u) => 1 - Math.pow(1 - u, 2));
}
const _bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * c;
function curvaPorton(u, fin) {
  // del portón (derecha, hacia -x) a `fin` (mirando +z): una curva cuadrática
  const P0 = [13.5, -2.4], P1c = [fin.x, -2.4], P2c = [fin.x, fin.z];
  const x = _bz(P0[0], P1c[0], P2c[0], u), z = _bz(P0[1], P1c[1], P2c[1], u);
  const dx = 2 * (1 - u) * (P1c[0] - P0[0]) + 2 * u * (P2c[0] - P1c[0]), dz = 2 * (1 - u) * (P1c[1] - P0[1]) + 2 * u * (P2c[1] - P1c[1]);
  return { x, z, rot: Math.atan2(dx, dz) };
}
const AUTO_Q = { x: CAMX + 0.4, z: -1.75 };  // parte 2 (ronda 1): el auto limpio entra derecho del portón y frena de costado, la ventanilla del conductor hacia la rampa
// el autoelevador: posición (local del depósito), rumbo, altura de las horquillas
const ELEV_LEVANTA = PARK.z - 2.85;         // detrás del auto, con las horquillas debajo
const ELEV_MUELLE = 5.45;
const DESLIZA = 1.85;                       // lo que el auto se desliza de las horquillas a la caja
function elevEstado(t) {
  if (t < P2) {
    if (t < T.p7) return { x: CAMX, z: -7.0, rot: 0, h: 0.06, vis: false };
    const zv = claves(t, [[T.viaje[0], ELEV_LEVANTA], [T.viaje[1], ELEV_MUELLE]], (u) => eio(u));
    const h = claves(t, [[T.levanta[0], 0.06], [T.levanta[1], 0.55], [T.viaje[1] - 0.15, 0.55], [T.viaje[1] + 0.05, 0.25], [T.adentro[1], 0.08]]);
    return { x: CAMX, z: zv, rot: 0, h, vis: true };
  }
  // parte 2: con el pallet de harina, del pallet a la caja; después gira hacia el auto de Nico
  if (t < T.q3) return { x: CAMX, z: PALLET_G.z - 1.75, rot: 0, h: 0.06, vis: true };
  const zv = claves(t, [[T.q3, 0.2], [T.pallet[1] - 0.15, ELEV_MUELLE + 0.5]], eo);   // (Q2b → Q3 es corte: arranca ya en camino)
  const zb = claves(t, [[T.pallet[1] + 0.05, ELEV_MUELLE + 0.5], [T.pallet[1] + 0.45, ELEV_MUELLE - 0.3]]);
  const rot = claves(t, [[T.horquillas[0] - 0.5, 0], [T.horquillas[0], Math.PI]]);   // gira hacia el auto de Nico (abajo de la rampa)
  const h = claves(t, [[T.q3 + 0.1, 0.06], [T.q3 + 0.3, 0.3], [T.pallet[1] - 0.25, 0.3], [T.pallet[1], 0.08], [T.horquillas[0], 0.08], [T.horquillas[1], 0.62], [T.atras[1] + 0.2, 0.62], [T.atras[1] + 0.6, 0.08]]);
  return { x: CAMX, z: t < T.pallet[1] + 0.05 ? zv : zb, rot, h, vis: true };
}
function ponerElev(t) {
  const e = elevEstado(t);
  elev.visible = e.vis;
  const y0 = sueloEn(e.x, e.z), yf = sueloEn(e.x, e.z + 0.45), yb = sueloEn(e.x, e.z - 0.85);
  elev.position.set(OX + e.x, (yf + yb) / 2, e.z);
  elev.rotation.set(0, e.rot, 0); elev.rotateX(-Math.atan2(yf - yb, 1.3));
  elev.userData.carro.position.y = e.h;
  elev.userData.baliza.rotation.y = t * 8;
  elev.updateMatrixWorld(true);
  return e;
}
// el camión: la cola en el muelle; se va hacia +z
function ponerCamion(t) {
  // (ronda 1) en P8 el camión se va más lento y queda en cuadro (antes desaparecía y el plano quedaba vacío)
  const sale = t < P2 ? sg(t, T.arranca, T.arranca + 1.1) : sg(t, T.sale2[0], T.sale2[1] + 0.6);
  camion.position.set(OX + CAMX, 0, MUELLE.z1 + (t < P2 ? ei(sale) * 8 : eio(sale) * 14));
  camion.visible = !(t >= P2 && t > T.sale2[1] + 0.7);
  // las puertas: abiertas (contra los costados) hasta que se cierran
  const cierra = t < P2 ? eio(sg(t, T.puertas[0], T.puertas[1])) : eio(sg(t, T.puerta2[0], T.puerta2[1]));
  const abre = t < P2 ? 1 : 1;
  puertasCam.forEach((p, i) => { const s = i ? 1 : -1; p.rotation.y = s * -(Math.PI * 0.92) * abre * (1 - cierra); });
  dibujarRemito(t >= P2);
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const VOLANTE = { manoI: [0.2, 0.42, 0.42], manoD: [-0.2, 0.42, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], dedoI: 0, dedoD: 0 };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const _w = new THREE.Vector3();
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// sentar a un personaje en un vehículo (padre = el auto o el autoelevador)
function sentarEn(per, padre, x, y, z) { if (per.raiz.parent !== padre) padre.add(per.raiz); return { x, y, z, giro: 0, sentado: 1 }; }
function aPie(per) { if (per.raiz.parent !== scene) scene.add(per.raiz); }

// ---------- Nico ----------
// parte 1 en la rotisería y la vereda; en el auto (sentado, conductor) durante la ronda y en el depósito
const NK1 = [
  [0, { x: NIC.x, z: NIC.z, giro: 2.95, inclina: 0.04, ...aC(-0.15, 0.0), ...CARA.sonrisa, ...BRAZOS.costado, manoD: [-0.16, 0.36, 0.32], codoD: [-0.8, -0.6, -0.1], ojos: { x: -0.1, y: 0.05, abiertos: 1, feliz: 0.3 } }],
  // "Ya lo cargo." mirando a Graciela, el pulgar arriba con la izquierda
  [T.pulgar[1], { manoI: [0.24, 0.62, 0.3], codoI: [1, -0.5, -0.2], ...aC(-0.1, -0.05), ...CARA.feliz, ojos: { x: -0.1, abiertos: 0.95, feliz: 0.45 } }, 0.25],
  // se guarda el celular en el bolsillo sin mirarlo y se da vuelta
  [T.p1b - 0.05, { manoD: [-0.27, 0.0, 0.08], codoD: null, manoI: [0.29, -0.08, 0.04], codoI: null, ...aC(0.2, 0.0) }, 0.3],
];
function poseNico(t) {
  const parte2 = t >= P2;
  if (!parte2) {
    if (t < T.p1b) { aPie(nico); const p = poseEn(t, NK1); bocaVoz(p, t, T.n1, ENV.n1, 0.75); return p; }
    if (t < T.p2) {
      // la vereda: sale de la rotisería hacia la puerta del acompañante, la abre y mete el globo; queda al lado
      aPie(nico);
      const u = sg(t, T.sale[0], T.sale[1]);
      const a = V3(NIC.x, 0, NIC.z), b = V3(PUERTA_DX, 0, -0.25), c = V3(AUTO_ROTI + 0.95, CORDON, 2.0);
      const p = u < 0.55 ? a.clone().lerp(b, u / 0.55) : b.clone().lerp(c, eo((u - 0.55) / 0.45));
      const giro = u < 0.12 ? lerp(2.95, Math.atan2(b.x - a.x, b.z - a.z), u / 0.12) : u < 0.55 ? Math.atan2(b.x - a.x, b.z - a.z) : lerp(Math.atan2(b.x - a.x, b.z - a.z), -1.2, sg(u, 0.55, 1));
      const abre = sg(t, T.abre[0], T.abre[1]);
      const pr = { x: p.x, y: p.y, z: p.z, giro, paso: u < 1 ? 1 : 0, inclina: 0.03, ...aC(0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, t };
      if (abre > 0) { pr.manoD = [-0.25, 0.32, 0.4]; pr.codoD = [-1, -0.4, 0]; }
      if (t > T.mete[0]) { pr.manoI = [0.15, 0.55, 0.42]; pr.codoI = [1, -0.4, -0.2]; pr.inclina = 0.15; }
      return pr;
    }
    // en el auto (conductor)
    const pr = { ...sentarEn(nico, auto, 0.42, AUTO.asiento - 0.58, -0.08), inclina: 0.0, ...VOLANTE, ...aC(0.0, 0.0), ...CARA.sonrisa, t };
    if (t < T.p3) {
      // la ronda: mira a cada cliente por la ventanilla (hacia la vereda = -x del auto = a su derecha)
      const quien = T.paradas.findIndex(([a, b]) => t >= a - 0.1 && t < b + 0.05);
      if (quien >= 0) { pr.cabeza = { giro: -0.9, asiente: -0.05, ladea: 0 }; pr.ojos = { x: -0.6, y: 0.1, abiertos: 1, feliz: 0.35 }; pr.manoI = [0.2, 0.58, 0.32]; pr.codoI = [1, -0.5, -0.2]; }
      bocaVoz(pr, t, T.n2, ENV.n2, 0.75);
      // el auto lleno: el cachete contra el último globo (la cabeza ladeada hacia la ventanilla, ojos apretados de un lado)
      const ap = eo(sg(t, T.lleno, T.lleno + 0.2));
      if (ap > 0) { pr.ladea = 0.06 * ap; pr.cabeza = { giro: -0.2 * ap, asiente: 0.05, ladea: 0.22 * ap }; pr.ojos = { x: 0.2, y: 0, abiertos: 0.95, guiño: -0.7 * ap, feliz: 0.2 }; pr.boca = { sonrisa: 0.45, abierta: 0, ancho: 0.8 }; }
      return pr;
    }
    // el depósito: llega, ventanilla, "¡Ya lo cargo!" asomado; sorpresa con sonrisa cuando lo levantan; adentro del camión
    pr.cabeza = { giro: 0.15, asiente: 0, ladea: 0 }; pr.ojos = { x: 0.1, y: 0.05, abiertos: 1, feliz: 0.3 };
    if (t >= T.p5b - 0.05 && t < T.p7) {
      // asomado a la ventanilla: mira arriba a Rubén, pulgar arriba afuera
      pr.cabeza = { giro: 0.65, asiente: -0.45, ladea: 0.05 }; pr.ojos = { x: 0.3, y: 0.6, abiertos: 1, feliz: 0.2 };
      // (ronda 1: la cabeza queda ADENTRO, contra la ventanilla baja, adelante del parante; el brazo sale por encima del marco)
      const asoma = eio(sg(t, T.ventanilla[0], T.ventanilla[1] + 0.1)); pr.x = lerp(0.42, 0.45, asoma); pr.z = lerp(-0.08, 0.0, asoma); pr.ladea = -0.04 * asoma;
      pr.boca = { ...CARA.feliz.boca };
      if (t >= T.n3 - 0.1) { pr.manoI = [0.55, 0.78, 0.2]; pr.codoI = [1, 0.1, 0]; }
      bocaVoz(pr, t, T.n3, ENV.n3, 0.8);
      if (t >= T.p6) { pr.boca = { sonrisa: 0.7, abierta: 0, ancho: 1.05 }; pr.ojos = { x: 0.3, y: 0.6, abiertos: 1, feliz: 0.05 }; }
    }
    if (t >= T.p7) { pr.cabeza = { giro: 0.4, asiente: -0.1, ladea: 0.05 }; Object.assign(pr, { ...CARA.sorpresa, boca: { sonrisa: 0.55, abierta: 0.35, ancho: 0.9 }, ojos: { x: 0.2, y: 0.2, abiertos: 1, feliz: 0 } }); }
    return pr;
  }
  // ---- parte 2 ----
  if (t < T.q2) {
    aPie(nico);
    const p = poseEn(t, [[0, { ...NK1[0][1], t }], [T.toques[0], { manoI: [0.1, 0.4, 0.34], codoI: [0.8, -0.6, -0.1], dedoI: 1, ...aC(0.1, 0.3), ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.2 } }, 0.2], [T.ding + 0.12, { manoI: [0.24, 0.3, 0.3], dedoI: 0, ...aC(0.1, 0.32), ...CARA.sorpresa, boca: { sonrisa: 0.2, abierta: 0, ancho: 0.75 }, ojos: { x: 0, y: -0.6, abiertos: 1 } }, 0.12]]);
    // el toque: el índice baja dos veces
    const toq = T.toques.reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.06, b + 0.06))), 0);
    p.manoI = [p.manoI[0], p.manoI[1] - 0.03 * toq, p.manoI[2]];
    bocaVoz(p, t, T.n5, ENV.n5, 0.75);
    return p;
  }
  const pr = { ...sentarEn(nico, auto, 0.42, AUTO.asiento - 0.58, -0.08), inclina: 0.0, ...VOLANTE, ...aC(0.6, -0.2), ...BUENA, t };
  // asomado a la ventanilla (se ve desde atrás del auto), mirando arriba a Rubén en el muelle
  const asoma = eio(sg(t, T.entra2[1] - 0.1, T.entra2[1] + 0.2)) * (1 - eio(sg(t, T.atras[0] - 0.25, T.atras[0])));
  pr.x = lerp(0.42, 0.45, asoma); pr.z = lerp(-0.08, 0.0, asoma); pr.ladea = -0.04 * asoma; pr.cabeza = { giro: lerp(0, 0.75, asoma), asiente: -0.3 * asoma, ladea: 0 };
  bocaVoz(pr, t, T.n6, ENV.n6, 0.75);
  if (t >= T.pulgar2 && t < T.atras[0]) { pr.manoI = [0.55, 0.78, 0.2]; pr.codoI = [1, 0.1, 0]; }
  if (t >= T.horquillas[0]) { pr.cabeza = { giro: 0.45, asiente: -0.1, ladea: 0 }; pr.cejas = { alto: 0.8, ang: 0.3 }; pr.boca = { sonrisa: 0.35, abierta: 0.2, ancho: 0.8 }; }
  return pr;
}
// ---------- Rubén ----------
// (ronda 1) las manos en el volante del autoelevador (antes quedaban a la altura de la boca)
const MANOS_ELEV = { manoI: [0.14, 0.39, 0.47], manoD: [-0.14, 0.39, 0.47], codoI: [0.8, -0.7, -0.1], codoD: [-0.8, -0.7, -0.1], dedoI: 0, dedoD: 0 };
const R_ESC = { x: -0.6, z: -10.3 };         // sentado al escritorio, mirando +z (al ventanal)
const R_BAR = { x: -1.0, z: BAR_Z - 0.37 };  // en la baranda
function poseRuben(t) {
  const parte2 = t >= P2;
  if (!parte2 && t < T.p5) {
    aPie(ruben);
    const pr = { x: R_ESC.x, y: OFI.piso - 0.08, z: R_ESC.z, giro: 0, sentado: 1, inclina: 0.06, ...aC(0, 0.05), ...NADA, manoI: [0.26, 0.28, 0.4], manoD: [-0.26, 0.28, 0.4], codoI: null, codoD: null, t };
    if (t >= T.ring - 0.05) { pr.cabeza = { giro: -0.3, asiente: 0.15, ladea: 0 }; pr.ojos = { x: -0.4, y: -0.4, abiertos: 0.85 }; }
    if (t >= T.altavoz - 0.2 && t < T.altavoz + 0.2) { const k = Math.sin(Math.PI * sg(t, T.altavoz - 0.2, T.altavoz + 0.2)); pr.manoI = [lerp(0.26, 0.4, k), lerp(0.28, 0.25, k), lerp(0.4, 0.56, k)]; }   // el teléfono está a su izquierda
    if (t >= T.p4 - 0.1) { pr.cabeza = { giro: 0.5, asiente: 0.1, ladea: 0 }; pr.ojos = { x: 0.6, y: -0.1, abiertos: 0.8, tension: 0.2 }; }
    if (t >= T.p4b) {
      // (ronda 1) se paró y fue al vidrio con el mate: mira abajo el auto que entra
      Object.assign(pr, SECO, { y: OFI.piso, z: OFI.z1 - 0.32, sentado: 0, manoD: [-0.2, 0.36, 0.3], codoD: [-0.8, -0.6, -0.2], manoI: [0.27, -0.06, 0.06], codoI: null });
      pr.cabeza = { giro: 0.05, asiente: 0.45, ladea: 0 }; pr.ojos = { x: 0, y: -0.7, abiertos: 0.8, tension: 0.25 }; pr.inclina = 0.08;
    }
    bocaVoz(pr, t, T.r1, ENV.r1, 0.55);
    return pr;
  }
  if (!parte2 && t < T.p7) {
    // en la baranda: "¡Nico!"; cara de nada; deja el mate en la baranda
    aPie(ruben);
    const pr = { x: R_BAR.x, y: OFI.piso, z: R_BAR.z, giro: 0, inclina: 0.1, ...aC(0.1, 0.5), ...SECO, manoI: [0.22, 0.38, 0.33], manoD: [-0.26, 0.3, 0.3], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], t };
    if (t >= T.mateBaranda) pr.manoD = [-0.24, 0.38, 0.33];
    pr.ojos = { x: 0.1, y: -0.75, abiertos: 0.85, tension: 0.2 };
    bocaVoz(pr, t, T.r2, ENV.r2, 0.85);
    if (t >= T.r2 && t < T.r2 + 0.45) { pr.cejas = { alto: 0.3, ang: 0.0 }; }
    if (t >= T.p6) { Object.assign(pr, NADA); pr.ojos = { x: 0.1, y: -0.75, abiertos: 0.85, tension: 0.15 }; }
    return pr;
  }
  if (!parte2) {
    if (t < T.p8) {
      // al mando del autoelevador
      const pr = { ...sentarEn(ruben, elev, 0, 0.5, -0.1), inclina: 0.05, ...aC(0, 0.15), ...SECO, ...MANOS_ELEV, t };
      pr.ojos = { x: 0, y: -0.1, abiertos: 0.82, tension: 0.2 };
      if (t >= T.r3 - 0.25) { pr.cabeza = { giro: 0.45 * eio(sg(t, T.r3 - 0.25, T.r3 + 0.05)), asiente: 0.05, ladea: 0 }; pr.ojos = { x: 0.25, y: -0.05, abiertos: 0.85, tension: 0.2 }; }
      bocaVoz(pr, t, T.r3, ENV.r3, 0.6);
      return pr;
    }
    // P8: de pie al lado de las puertas: la mano derecha da dos palmadas; queda mirando cómo se va
    aPie(ruben);
    const pr = { x: CAMX - 1.4, y: RAMPA.alto, z: MUELLE.z1 - 0.45, giro: lerp(0.3, 2.85, eio(sg(t, T.arranca - 0.05, T.arranca + 0.3))), inclina: 0.03, ...aC(-0.1, 0.05), ...NADA, ...BRAZOS.costado, t };
    const pal = Math.max(...T.palmadas.map((a) => Math.sin(Math.PI * sg(t, a - 0.1, a + 0.06))));
    if (t >= T.palmadas[0] - 0.3 && t < T.arranca + 0.15) { pr.manoI = [0.2, 0.5 + 0.05 * pal, 0.5 - 0.07 * pal]; pr.codoI = [1, -0.5, -0.2]; }
    return pr;
  }
  // ---- parte 2: en el autoelevador con el mate ----
  if (t < T.q3) {
    aPie(ruben);
    return { x: R_ESC.x, y: OFI.piso - 0.08, z: R_ESC.z, giro: 0, sentado: 1, inclina: 0.06, ...aC(0.5, 0.1), ...BUENA, manoI: [0.26, 0.28, 0.4], manoD: [-0.26, 0.28, 0.4], codoI: null, codoD: null, t };
  }
  const pr = { ...sentarEn(ruben, elev, 0, 0.5, -0.1), inclina: 0.05, ...aC(0, 0.12), ...NADA, ...MANOS_ELEV, t };
  if (t >= T.n6) { pr.cabeza = { giro: -0.1, asiente: 0.1, ladea: 0 }; pr.ojos = { x: -0.1, y: -0.1, abiertos: 0.82 }; }
  if (t >= T.r4 - 0.1) { pr.boca = { sonrisa: 0.3, abierta: 0, ancho: 0.95 }; }
  bocaVoz(pr, t, T.r4, ENV.r4, 0.6);
  if (t >= T.horquillas[0] - 0.4) { pr.cabeza = { giro: 0.1, asiente: 0.05, ladea: 0 }; Object.assign(pr, NADA); pr.ojos = { x: 0.15, y: 0, abiertos: 0.85, tension: 0.2 }; }
  return pr;
}
// ---------- Graciela (rotisería) ----------
function poseGraciela(t) {
  const pr = { x: GRA.x, z: GRA.z, giro: -0.3, inclina: 0.06, ...aC(-0.1, 0.04), ...CARA.sonrisa, manoI: [0.26, 0.33, 0.38], manoD: [-0.26, 0.33, 0.38], codoI: null, codoD: null, t };
  pr.ojos = { x: -0.3, y: 0, abiertos: 1, feliz: 0.3 };
  if (t >= P2 && t >= T.ding) { pr.cejas = { alto: 0.6, ang: 0.2 }; pr.ojos = { x: -0.2, y: -0.2, abiertos: 1, feliz: 0.2 }; }
  return pr;
}
// ---------- los de la ronda: Marta (cafetería), Tito (bar), Elsa (kiosco) en sus puertas ----------
function ponerCliente(per, i, t, voz) {
  const [a, b] = T.paradas[i];
  const vis = t >= T.p2 && t < T.p3 && t >= a - 0.06 && t < b + 0.04;   // solo con el auto frenado (si no, quedaban cortados en el borde)
  per.raiz.visible = vis;
  if (!vis) return;
  // salen al cordón, al lado de la trompa del auto (del lado del acompañante), mirando a Nico por el parabrisas
  const x0 = PARADAS_X[i] - 1.35;
  const pr = { x: x0, y: CORDON, z: 2.25, giro: -0.9, inclina: 0.06, ...aC(0.35, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, t };   // (ronda 1) el cuerpo 3/4 a cámara, la cabeza hacia Nico (de perfil los ojos se leían cerrados)
  pr.ojos = { x: 0, y: -0.2, abiertos: 1, feliz: 0.05 };   // (ronda 1: con feliz 0,3 los ojos de Elsa se leían cerrados)
  if (i === 0) { pr.manoD = [-0.45, 0.88, 0.02]; pr.codoD = [-1, -0.2, -0.2]; }   // la mano arriba, al costado (no delante de la cara)   // Marta levanta la mano: "¿Me sumás…?"
  else { pr.manoI = [0.44, 0.8, 0.02]; pr.codoI = [1, -0.2, -0.2]; }
  if (voz) bocaVoz(pr, t, voz[0], voz[1], 0.75);
  per.poner(pr);
}

// ================= RENDER =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion(), _e3 = new THREE.Euler();
function ponerGlobosAuto(t, plano) {
  // los globos de chat: el de Graciela nace en el celular de Nico (P1), lo sigue por la vereda, entra al auto; los demás
  // nacen adentro del auto (del celular). Desde T.lleno se aplastan contra los vidrios.
  const parte2 = t >= P2;
  GLOBOS.forEach((g, i) => {
    g.visible = false;
    if (parte2 || LIMPIO && false) return;
    const t0 = T.globos[i];
    const enAuto = i > 0 ? t >= t0 : t >= T.mete[1];
    if (i === 0 && t < T.mete[1]) {
      if (t < T.globo1) return;
      g.visible = true;
      if (g.parent !== scene) scene.add(g);
      const inf = bk(sg(t, T.globo1, T.globo1 + 0.3));
      let p;
      if (t < T.p1b) {
        // sale del celular y queda flotando arriba del hombro de Nico
        celuN.updateMatrixWorld(true); const c = celuN.getWorldPosition(_a);
        const arriba = V3(NIC.x - 0.36, 1.9, NIC.z - 0.25), u = sg(t, T.globo1, T.globo1 + 0.35);
        p = V3(lerp(c.x, arriba.x, eo(Math.min(1, u * 2.2))), lerp(c.y, arriba.y, eio(sg(u, 0.4, 1))), lerp(c.z, arriba.z, eo(Math.min(1, u * 2.2))));   // (ronda 1) primero de costado, después sube
        p.y += Math.sin(t * 3.1) * 0.02;
        g.rotation.set(0, Math.PI - 0.15, 0);
      } else {
        // por la vereda: sigue a Nico a la altura de su cabeza; después entra apretado por la puerta del acompañante
        nico.raiz.updateMatrixWorld(true); const cab = nico.cabeza.getWorldPosition(_a).clone();
        p = cab.add(V3(0.0, 0.5, -0.62));
        p.y += Math.sin(t * 3.1) * 0.02;
        if (t >= T.mete[0]) {
          auto.updateMatrixWorld(true);
          const dentro = auto.localToWorld(V3(SLOTS[0][0], SLOTS[0][1], SLOTS[0][2]));
          p.lerp(dentro, eio(sg(t, T.mete[0], T.mete[1])));
        }
        g.rotation.set(0, -Math.PI / 2 + 0.35, 0);
      }
      g.position.copy(p);
      const s = 0.25 + 0.95 * inf;
      const apr = t >= T.mete[0] ? Math.sin(Math.PI * sg(t, T.mete[0], T.mete[1])) : 0;
      g.scale.set(s * (1 - 0.35 * apr), s * (1 + 0.25 * apr), s);
      return;
    }
    if (!enAuto) return;
    // adentro del auto (hijo del auto)
    if (g.parent !== auto) auto.add(g);
    g.visible = true;
    const [x, y, z, sF, ap] = SLOTS[i];
    const inf = i === 0 ? 1 : bk(sg(t, t0, t0 + 0.25));
    const lleno = bk(sg(t, T.lleno, T.lleno + 0.22));
    const s = (0.3 + 0.7 * inf) * sF;
    const L = LLENO[i], rot0 = 0.45 + (i % 2 ? 0.1 : -0.1);
    g.position.set(lerp(x, L[0], lleno), lerp(y, L[1], lleno) + Math.sin(t * 2.7 + i) * 0.012 * (1 - lleno), lerp(z, L[2], lleno));
    g.rotation.set(0, lerp(rot0, L[6], lleno), 0);   // el frente hacia adelante (se lee por el parabrisas)
    g.scale.set(lerp(s, L[3], lleno), lerp(s, L[4], lleno), lerp(s, L[5], lleno));
  });
}
function ponerAuto(t) {
  const parte2 = t >= P2;
  auto.visible = true;
  let x, z, y = 0, rot = 0, pitch = 0;
  if (!parte2) {
    if (t < T.p3) { x = autoXCalle(t); z = AUTO_Z; rot = -Math.PI / 2;
      // el cabeceo al frenar en cada parada
      for (const [a] of T.paradas) pitch += 0.03 * Math.sin(Math.PI * sg(t, a - 0.02, a + 0.18));
      auto.position.set(x, 0, z); auto.rotation.set(0, rot, 0); auto.rotateX(pitch);
    } else if (t < T.p7) {
      const u = eo(sg(t, T.entra[0], T.entra[1]));
      const c = t < T.entra[0] ? null : curvaPorton(u, PARK);
      if (!c) { auto.visible = false; auto.position.set(OX + 30, 0, 0); }
      else { auto.position.set(OX + c.x, 0, c.z); auto.rotation.set(0, c.rot, 0); auto.rotateX(0.03 * Math.sin(Math.PI * sg(t, T.entra[1] - 0.1, T.entra[1] + 0.15))); }
    } else if (t < T.adentro[0]) {
      // en las horquillas: hijo virtual del carro del autoelevador (el auto apoya el piso sobre las horquillas)
      const carro = elev.userData.carro; carro.updateMatrixWorld(true);
      const p = carro.localToWorld(V3(0, 0.05, 2.9 - 1.0));
      auto.position.copy(p); carro.getWorldQuaternion(_q); auto.quaternion.copy(_q);
      auto.rotateX(-0.04 * Math.sin(Math.PI * sg(t, T.levanta[0], T.levanta[1] + 0.2)));
    } else {
      // se desliza a la caja del camión y viaja con él
      const u = eio(sg(t, T.adentro[0], T.adentro[1]));
      const z0 = ELEV_MUELLE + 1.0 + 1.9, zc = lerp(z0, z0 + DESLIZA, u);
      const fuera = camion.position.z - CAM0.z;
      auto.position.set(OX + CAMX, CAJA.piso + lerp(0.25, 0, u), zc + fuera); auto.rotation.set(0, 0, 0);
      auto.visible = true;
    }
  } else {
    if (t < T.q3) { auto.visible = false; auto.position.set(OX + 40, 0, 0); }
    else {
      const u = eo(sg(t, T.entra2[0], T.entra2[1]));
      let xx = lerp(13.5, AUTO_Q.x, u);
      if (t >= T.atras[0]) xx += ei(sg(t, T.atras[0], T.atras[1])) * 9;   // marcha atrás, hacia el portón
      auto.position.set(OX + xx, 0, AUTO_Q.z); auto.rotation.set(0, -Math.PI / 2, 0);
      auto.visible = t >= T.entra2[0] - 0.01;
    }
  }
  // la ventanilla del conductor baja en P5b (y queda baja en el depósito, en la parte 2 también)
  const baja = !parte2 ? sg(t, T.ventanilla[0], T.ventanilla[1]) : 1;
  const v = auto.userData.ventCond; v.scale.y = 1 - 0.95 * baja; v.position.y = auto.userData.ventY - (auto.userData.vH * 0.95 * baja) / 2; v.visible = baja < 0.9;
  // la puerta del acompañante (P1b)
  const ab = !parte2 && t < T.p2 ? eio(sg(t, T.abre[0], T.abre[1])) * (1 - eio(sg(t, T.cierra - 0.12, T.cierra))) : 0;
  auto.userData.puerta.rotation.y = 1.15 * ab;
  auto.updateMatrixWorld(true);
}

function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const enCalle = ["P1", "P1b", "P2", "Q1"].includes(planoActual) || (planoActual === "Q2" && t < T.q2w);
  ponerSol(enCalle ? (planoActual === "P2" || planoActual === "Q2" ? autoXCalle(Math.min(t, T.p3 - 0.01)) : 0) : OX, enCalle ? 0 : 0, !enCalle);
  scene.background = enCalle ? CIELO : new THREE.Color(0x16243d);
  // cada lugar se dibuja solo cuando la cámara está ahí (desde la calle se veía el depósito en el horizonte)
  CALLE.visible = enCalle; DEP.visible = !enCalle;
  // ---- objetos ----
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  llamaM.color.setScalar(0.92 + 0.08 * Math.sin(t * 11) * Math.sin(t * 7.3));
  dibujarCeluN(t); dibujarMonitor(t); dibujarCartelP(parte2 && t >= T.tilde);
  ponerCamion(t);
  const e = ponerElev(t);
  ponerAuto(t);
  // el teléfono de escritorio vibra; el altavoz se prende
  telefono.position.x = 0.05 + (!parte2 && en(t, T.ring, T.altavoz) ? Math.sin(t * 90) * 0.004 : 0);
  telefono.userData.boton.material.color.set(!parte2 && t >= T.altavoz && t < T.p5 ? C.g : 0x2a3b58);
  // el mate: en el escritorio (P3-P4), en la baranda (desde P6), en el portavasos (parte 2)
  // el pallet GRACIELA: parte 1 no está; parte 2 en el piso, se tilda, se apilan las bolsas, viaja en las horquillas
  palletG.visible = parte2;
  if (parte2) {
    bolsasG.forEach((b, i) => { const k = bk(sg(t, T.bolsas[i] - 0.12, T.bolsas[i])); b.visible = t >= T.bolsas[i] - 0.12; b.scale.set(1 + 0.15 * (1 - k), k > 0 ? 0.7 + 0.3 * k : 0.7, 1); b.position.y = 0.15 + Math.floor(i / 2) * 0.16 + (1 - k) * 0.5; });
    if (t < T.q3) { palletG.position.set(OX + PALLET_G.x, 0, PALLET_G.z); palletG.rotation.set(0, 0, 0); }
    else if (t < T.pallet[1]) { const c = elev.userData.carro; c.updateMatrixWorld(true); palletG.position.copy(c.localToWorld(V3(0, 0.05, 0.66))); c.getWorldQuaternion(_q); palletG.quaternion.copy(_q); }
    else { palletG.position.set(OX + CAMX, CAJA.piso, MUELLE.z1 + 0.9 + (camion.position.z - CAM0.z)); palletG.rotation.set(0, 0, 0); }
  }
  // la zorra y el operario (Q2: apila las bolsas)
  const opVis = parte2 && t >= T.q2w && t < T.q2b;
  operario.raiz.visible = opVis; zorra.visible = opVis;
  if (opVis) {
    zorra.position.set(OX + PALLET_G.x - 1.6, 0, PALLET_G.z + 0.2); zorra.rotation.y = Math.PI / 2;
    const ap = T.bolsas.reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.18, b + 0.02))), 0);
    operario.poner({ x: PALLET_G.x - 0.95, z: PALLET_G.z + 0.15, giro: Math.PI / 2, inclina: 0.1 + 0.25 * ap, ...aC(0, 0.2), ...CARA.concentrada, manoI: [0.2, 0.25 + 0.15 * ap, 0.45], manoD: [-0.2, 0.25 + 0.15 * ap, 0.45], codoI: null, codoD: null, t });
    operario.raiz.position.x += OX;
  }
  // ---- personajes ----
  // Graciela y Nico en la rotisería
  graciela.raiz.visible = ["P1", "Q1"].includes(planoActual);
  if (graciela.raiz.visible) graciela.poner(poseGraciela(t));
  const pn = poseNico(t); nico.poner(pn);
  if (nico.raiz.parent === scene && (t >= P2 ? true : t < T.p2)) { /* en la calle */ }
  nico.raiz.visible = !(parte2 && t >= T.q2 && t < T.q3);
  PULGAR.forEach((p, i) => (p.visible = i === 0 && ((!parte2 && en(t, T.pulgar[0] + 0.1, T.p1b)) || (!parte2 && t >= T.n3 - 0.05 && t < T.p7) || (parte2 && t >= T.pulgar2 && t < T.atras[0]))));
  // el celular de Nico en la mano derecha (P1, Q1); en el bolsillo después
  const celVis = (!parte2 && t < T.p1b - 0.05) || (parte2 && t < T.q2);
  celuN.visible = celVis;
  if (celVis) {
    const m = manoMundo(nico, "D", _a);
    nico.raiz.updateMatrixWorld(true);
    celuN.position.copy(m).add(V3(0, 0.09, 0));
    celuN.rotation.set(-0.5, nico.raiz.rotation.y - 0.25, 0);
    if (parte2) {
      // en la parte 2 lo sostiene con la izquierda adelante (lo toca con el índice de la derecha)
      const mi = manoMundo(nico, "D", _b);
      celuN.position.copy(mi).add(V3(0.0, 0.1, 0.0));
    }
  }
  ponerGlobosAuto(t, planoActual);
  // Rubén
  ruben.raiz.visible = true;
  ruben.poner(poseRuben(t));
  if (ruben.raiz.parent === scene) ruben.raiz.position.x += OX;
  herraduraSegunCamara();
  if (enCalle) { ruben.raiz.visible = false; camion.visible = false; elev.visible = false; palletG.visible = false; zorra.visible = false; operario.raiz.visible = false; }
  if (planoActual === "P8") elev.visible = false;   // Rubén ya se bajó (el autoelevador quedaría delante de la cámara)
  // el mate: en el escritorio (P3-P4), en la mano de Rubén (P5), en la baranda (desde P6), en el portavasos (parte 2)
  mateElev.visible = parte2;
  mateR.visible = !parte2;
  if (!parte2 && t >= T.mateBaranda) mateR.position.set(OX + R_BAR.x - 0.42, OFI.piso + BAR_H + 0.03, BAR_Z);
  else if (!parte2 && t >= T.p4b) { const m = manoMundo(ruben, "D", _a); mateR.position.copy(m).add(V3(0, -0.06, 0.02)); }
  else mateR.position.set(OX + 0.62, OFI.piso + 0.76, -9.45);
  // los de la ronda
  ponerCliente(marta, 0, t, [T.m1, ENV.m1]); marta.raiz.position.x += 0;
  ponerCliente(barman, 1, t, null);
  ponerCliente(kiosquera, 2, t, null);
  // Graciela/Nico en coordenadas de la calle (x ya en el origen); Rubén en el depósito
  // ---- la tarjeta del pedido (parte 2) ----
  tarjeta.visible = false; mitades.forEach((m) => (m.visible = false));
  if (parte2 && t >= T.vuela[0] && t < T.parte) {
    tarjeta.visible = true;
    if (t < T.q2) {
      celuN.updateMatrixWorld(true); const c = celuN.getWorldPosition(_a).clone();
      const u = eio(sg(t, T.vuela[0], T.vuela[1]));
      const p = c.lerp(V3(0.12, 2.3, -1.2), u); p.y += Math.sin(Math.PI * u) * 0.45;   // sale por la vidriera, detrás de Nico (en cuadro)
      tarjeta.position.copy(p); tarjeta.rotation.set(0, Math.PI - 0.15 + u * 0.3, 0.1 * Math.sin(u * 6));   // el frente a la cámara tarjeta.scale.setScalar(0.3 + 0.7 * eo(sg(t, T.vuela[0], T.vuela[0] + 0.15)));
    } else if (t < T.q2w) {
      // por la calle: vuela hacia -x por la vereda, a la altura de las vidrieras
      const u = sg(t, T.q2, T.q2w);
      tarjeta.position.set(lerp(PUERTA_DX - 0.5, -26, eio(u)), 1.75 + Math.sin(u * 9) * 0.08, 1.3); tarjeta.rotation.set(0, Math.PI / 2 + 0.25, 0.08 * Math.sin(u * 12)); tarjeta.scale.setScalar(1);
    } else {
      // el depósito: entra por el portón y vuela hacia el pallet
      const u = sg(t, T.q2w, T.parte);
      tarjeta.position.set(OX + lerp(12.5, 4.0, eo(u)), 1.8, lerp(-2.2, -2.1, u)); tarjeta.rotation.set(0, Math.PI / 2 + 0.25, 0); tarjeta.scale.setScalar(1);
    }
  }
  if (parte2 && t >= T.parte && t < T.q3) {
    // se parte en dos: la mitad de arriba sube a la oficina; la de abajo cae en el cartel del pallet
    const u = sg(t, T.parte, T.tilde);
    const [A, B] = mitades;
    B.visible = t < T.tilde + 0.05;
    B.position.set(OX + lerp(4.0, PALLET_G.x + 0.05, eio(u)), lerp(1.68, 0.55, eio(u)), lerp(-2.1, PALLET_G.z + 0.65, eio(u))); B.rotation.set(-0.3 * u, lerp(Math.PI / 2 + 0.25, 0, eio(u)), 0.2 * Math.sin(u * 6)); B.scale.setScalar(lerp(1, 0.55, u));
    const v = sg(t, T.parte, T.q2b + 0.25);
    A.visible = t < T.q2b + 0.25;
    A.position.set(OX + lerp(4.0, -1.45, eio(v)), lerp(1.95, OFI.piso + 1.45, eio(v)), lerp(-2.1, -9.3, eio(v))); A.rotation.set(0, lerp(Math.PI / 2 + 0.25, 0.55, eio(v)), 0); A.scale.setScalar(lerp(1, 0.4, v));
  }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  else if (planoActual === "P2") {
    // la ronda: travelling con el auto, del lado de la calle, picado (las fachadas y la vereda atrás)
    // (ronda 1) más tele y más bajo: menos calle vacía adelante, el auto más grande; push-in al parabrisas lleno
    const x = autoXCalle(t), push = sg(t, T.lleno - 0.1, T.p3);
    ponerCam([x - lerp(8.6, 4.7, eio(push)), lerp(1.5, 1.62, eio(push)), lerp(2.95, 3.3, push), x + 0.2, lerp(1.25, 1.45, push), lerp(2.85, 3.3, push), lerp(36, 36, push)], t);
  } else if (planoActual === "P4" || planoActual === "Q2b") {
    // inserto del monitor: la cámara de frente a la pantalla (llena ~70 % del ancho)
    monitor.updateMatrixWorld(true);
    const c = monitor.localToWorld(V3(0, 0.6, 0.03)), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
    const k = sg(t, pl[1], pl[1] + 0.8);
    const d = c.clone().add(n.multiplyScalar(lerp(2.4, 2.25, k)));
    ponerCam([d.x, d.y, d.z, c.x, c.y, c.z, 48], t);
  } else if (planoActual === "P4c") {
    // inserto: el tablero del auto (el celular cargando, 100 %) desde el asiento de atrás
    auto.updateMatrixWorld(true);
    const c = auto.userData.celu.getWorldPosition(_a).clone();
    // (ronda 1) un poco más atrás y más arriba: el celular en su soporte, el cable al puerto, el borde del tablero, el volante
    const desde = auto.localToWorld(V3(0.3, 1.55, -0.3)), mira = auto.localToWorld(V3(0.19, 1.2, 0.45));
    nico.raiz.visible = false; GLOBOS[6].visible = false; GLOBOS[5].visible = false;   // la cámara está donde va la cabeza de Nico
    ponerCam([desde.x, desde.y, desde.z, mira.x, mira.y, mira.z, lerp(50, 46, sg(t, T.p4c, T.p5))], t);
  } else if (planoActual === "P7") {
    // el autoelevador: de costado (desde +x), acompaña el viaje hasta el camión
    const zc = lerp(PARK.z + 0.2, 7.2, eio(sg(t, T.viaje[0] - 0.1, T.adentro[1])));
    const yc = lerp(1.9, 2.6, sg(t, T.viaje[0], T.adentro[0]));
    const fin = sg(t, T.r3 - 0.2, T.r3 + 0.1);
    const ze = elevEstado(t).z;
    // (ronda 1) el final: Rubén 3/4 desde la derecha, por debajo del techo de caños y por detrás del parante delantero
    if (t >= T.adentro[0]) { ponerCam([OX + lerp(4.6, 1.5, eio(fin)), lerp(3.2, 3.2, fin), lerp(4.0, 6.3, eio(fin)), OX + CAMX, lerp(2.35, 2.95, fin), lerp(7.0, 5.3, eio(fin)), lerp(54, 44, fin)], t); }
    else ponerCam([OX + 5.4, lerp(2.0, 2.8, sg(t, T.viaje[0], T.adentro[0])), ze + 0.2, OX + CAMX, 1.5, ze + 1.9, 58], t);
    if (false) ponerCam([OX + lerp(8.6, 4.2, eio(fin)), lerp(yc, 3.0, fin), lerp(zc - 1.4, ELEV_MUELLE - 0.3, eio(fin)), OX + CAMX, lerp(1.4, 2.4, fin), lerp(zc - 0.6, ELEV_MUELLE + 0.3, eio(fin)), lerp(58, 46, fin)], t);
  } else if (planoActual === "Q2") {
    if (t < T.q2w) { const p = tarjeta.position; ponerCam([p.x + 1.6, p.y + 0.15, p.z + 0.5, p.x - 0.5, p.y - 0.05, p.z - 0.15, 52], t); }
    else {
      const u = sg(t, T.q2w, T.q2b);
      ponerCam([OX + lerp(8.5, 2.2, eio(u)), lerp(2.1, 2.3, u), lerp(-0.6, 0.4, eio(u)), OX + lerp(3.0, PALLET_G.x, eio(u)), lerp(1.6, 0.5, eio(u)), lerp(-2.1, PALLET_G.z, u), 54], t);
    }
  } else if (planoActual === "Q3") {
    // (ronda 1) el mismo eje que P7 (callback): de costado desde +x, acompaña al autoelevador con el pallet rampa arriba
    const ze = elevEstado(t).z, u = sg(t, T.q3, T.n6);
    ponerCam([OX + 4.3, lerp(1.9, 2.7, u), ze + 0.4, OX + CAMX, lerp(1.4, 2.1, u), ze + 0.3, 60], t);
  } else if (planoActual === "Q3b") {
    // desde el costado del conductor, bajo: Nico asomado adelante a la izquierda, Rubén arriba en el muelle
    // (ronda 1) contraplano: desde el lado de la rampa, de frente a la ventanilla del conductor (Nico mira arriba, a Rubén)
    const u = sg(t, T.n6 - 0.05, T.r4);
    ponerCam([OX + AUTO_Q.x - 0.45, 1.5, lerp(1.25, 1.05, eio(u)), OX + AUTO_Q.x - 0.14, 1.55, AUTO_Q.z + 0.4, lerp(46, 44, u)], t);
  } else if (planoActual === "Q3c") {
    // Rubén 3/4 desde la derecha (el plano de "Ya lo cargué."), sin mirar a Nico
    const ze = elevEstado(t).z, u = sg(t, T.r4 - 0.08, T.q4);
    ponerCam([OX + 1.5, 3.2, ze + lerp(1.0, 0.95, u), OX + CAMX, 2.95, ze, lerp(44, 42, u)], t);
  } else if (planoActual === "Q4") {
    // al costado de la rampa: el autoelevador gira hacia la cámara (hacia Nico) y levanta las horquillas; el camión se
    // va por el muelle atrás
    const u = sg(t, T.q4, DUR);
    ponerCam([OX + lerp(2.5, 2.2, eio(u)), lerp(2.5, 2.45, u), lerp(0.6, 1.3, eio(u)), OX + CAMX - 0.4, lerp(2.4, 2.3, u), 6.0, lerp(46, 42, u)], t);
  }
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo ----
  {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.1, tf));
    for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
    const nb = () => bocaPx(nico), rb = () => bocaPx(ruben), gb = () => bocaPx(graciela), mb = () => bocaPx(marta);
    if (planoActual === "P1" || (planoActual === "Q1" && t < T.n5 + 0.15)) { const [bx, by] = gb(); ponerGlobo(GL.gra, 330, planoActual === "P1" ? 1360 : 1360, planoActual === "P1" ? sale(T.p1b) : ent(P2) * sale(T.n5 + 0.15), [bx, by - 60]); }
    if (planoActual === "Q1" && t >= T.n5) { const [bx, by] = nb(); ponerGlobo(GL.n5, bx + 160, Math.max(330, by - 520), ent(T.n5) * sale(T.q2), [bx, by - 40]); }
    if (planoActual === "P2") {
      const [bx, by] = nb();
      if (en(t, T.m1, T.n2 + 0.1)) { const [mx, my] = mb(); ponerGlobo(GL.m1, mx + 120, Math.max(300, my - 430), ent(T.m1) * sale(T.n2 + 0.1), [mx, my - 40]); }
      if (en(t, T.n2, T.paradas[0][1])) ponerGlobo(GL.n2, bx + 60, Math.max(560, by - 330), ent(T.n2) * sale(T.paradas[0][1]), [bx, by - 40], 1);
      if (en(t, T.bar[0], T.paradas[1][1])) { const [mx, my] = bocaPx(barman); ponerGlobo(GL.bar, mx + 60, Math.max(300, my - 420), ent(T.bar[0]) * sale(T.paradas[1][1]), [mx, my - 40]); }
      if (en(t, T.bar[1], T.paradas[1][1])) ponerGlobo(GL.barN, bx + 80, Math.max(700, by - 240), ent(T.bar[1]) * sale(T.paradas[1][1]), [bx, by - 40], 1);
      if (en(t, T.kio[0], T.paradas[2][1])) { const [mx, my] = bocaPx(kiosquera); ponerGlobo(GL.kio, mx + 40, Math.max(300, my - 420), ent(T.kio[0]) * sale(T.paradas[2][1]), [mx, my - 40]); }
      if (en(t, T.kio[1], T.paradas[2][1])) ponerGlobo(GL.kioN, bx + 80, Math.max(700, by - 240), ent(T.kio[1]) * sale(T.paradas[2][1]), [bx, by - 40], 1);
      [3, 4, 5].forEach((i, k) => { const [a, b] = T.paradas[i]; if (en(t, a, b + 0.1)) ponerGlobo(GL.raf[k], 300 + k * 230, 420 + k * 70, ent(a) * sale(b + 0.1), [bx, by - 40], k); });
    }
    if (planoActual === "P3" && t >= T.g1) { telefono.updateMatrixWorld(true); const [px, py] = enPantalla(telefono.localToWorld(V3(0, 0.12, 0))); ponerGlobo(GL.g1, 540, 380, ent(T.g1), [px, py]); }
    if (planoActual === "P4" && t >= T.g1) ponerGlobo(GL.g1, 540, 300, 1 * sale(T.p4b), [1500, 1300]);   // el teléfono queda a la derecha, fuera de cuadro
    if (planoActual === "P4b" && t >= T.r1) { ruben.raiz.updateMatrixWorld(true); const [bx, by] = enPantalla(ruben.cabeza.localToWorld(V3(0, 0.45, 0))); ponerGlobo(GL.r1, 540, 330, ent(T.r1), [bx, Math.max(by, 700)]); }
    if (planoActual === "P4c") ponerGlobo(GL.r1, 540, 330, 1, [-600, -900]);   // Rubén está fuera de cuadro (arriba, en la oficina)
    if (planoActual === "P5" && t >= T.r2) { const [bx, by] = rb(); ponerGlobo(GL.r2, bx - 60, Math.max(300, by - 560), ent(T.r2), [bx, by - 200]); }
    if (planoActual === "P5b" && t >= T.n3) { const [bx, by] = nb(); ponerGlobo(GL.n3, bx + 40, Math.max(330, by - 420), ent(T.n3), [bx, by - 40]); }
    if (planoActual === "P7" && t >= T.r3) { const [bx, by] = rb(); ponerGlobo(GL.r3, 540, Math.max(300, by - 480), ent(T.r3), [bx, by - 40]); }
    if (planoActual === "P8" && t >= T.n4) {
      // la burbuja aplastada asoma por la rendija entre las dos hojas
      // (ronda 1) arriba de las puertas (no tapa el remito), con la cola a la rendija
      const sq = eo(sg(t, T.n4, T.n4 + 0.25));
      camion.updateMatrixWorld(true);
      const [sx, sy] = enPantalla(camion.localToWorld(V3(0, CAJA.piso + CAJA.H * 0.5, -0.1))), [, sy2] = enPantalla(camion.localToWorld(V3(0, CAJA.piso + CAJA.H + 0.25, -0.1)));
      ponerGlobo(GL.n4, sx, sy2 - 60, ent(T.n4) * sale(T.arranca + 0.05), [sx, sy], 0, -0.08, lerp(0.4, 0.78, sq));
    }
    if (planoActual === "Q3b" && t >= T.n6) { const [bx, by] = nb(); ponerGlobo(GL.n6, bx + 40, Math.max(330, by - 430), ent(T.n6), [bx, by - 40]); }
    if ((planoActual === "Q3c" || planoActual === "Q4") && t >= T.r4) { const [bx, by] = rb(); ponerGlobo(GL.r4, bx + 60, Math.max(planoActual === "Q4" ? 640 : 330, by - 400), ent(T.r4) * sale(T.cierre), [bx, by - 40], 1); }
  }
  if (en(tIn, P1, P2) || LIMPIO) { for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; } }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
