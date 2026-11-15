// Capa 3D de dice-cuarenta (Three.js r170 local). Base técnica: reels/la-lista y reels/ya-lo-cargo (globos de diálogo
// pegados a la cámara en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente,
// PLANOS con Catmull-Rom). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni
// azar sin semilla.
// UN lugar: la distribuidora de Rubén de día, a nivel del piso del depósito.
//   El pasillo corre a lo largo de z (la cámara del plano general mira hacia -z). Racks a los dos lados (cara al pasillo
//   en x = ±2,3), 8 bahías de 1,8 m (z 6,0 .. -8,4). El rack del ACEITE es la bahía 6 del rack derecho (z -6,6 .. -4,8):
//   el pallet en el piso, el cartel del número colgado de dos cadenas del larguero de 4,2 y los remitos clavados en el
//   parante de z = -4,8. Al fondo (z < -9,4) la oficina vidriada de Rubén arriba (piso 3,2) y el portón del muelle abajo
//   a la izquierda, con el camión.
//   PARTE 1: "El Excel dice cuarenta." · el cartel "40" baja · tres "¡Vendido!" con tres remitos · el camión · la grúa
//            del 40 a las tres cajas · la pausa (paloma) · "Pero el Excel dice cuarenta." / "El Excel nunca bajó al
//            depósito." · las cajas se van · "Tranqui, ya lo actualicé." · el cartel gira a 37 (rojo) · "Bárbaro. Ahora
//            miente actualizado."
//   PARTE 2: el cartel es verde · "Rubén, ¿hay aceite?" / "Fijate vos." · el celular: 40 ✓ · cada capa escaneada baja el
//            cartel 40 → 30 → 20 → 10 · aviso · Pedir ✓ · 0 → el autoelevador deja el pallet nuevo: 40 · Rubén saca una
//            caja (39) y la pone (40) · "¿Y? ¿Cuántos hay?" / "Los que dice."
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, poseEn, CARA, BRAZOS, pegarACamara, crearMate, crearTermo, crearCelular } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

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
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.03, 120);
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

// ---------- luces: depósito de día (claraboyas): sol con sombra que sigue al plano, cielo hemisférico, contraluz ----------
const sol = new THREE.DirectionalLight(0xfffaf2, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 1.9); scene.add(cielo);
const claraboya = new THREE.DirectionalLight(0xf4f6ff, 1.0); claraboya.position.set(-3, 20, 6); claraboya.target.position.set(0, 0, -3); scene.add(claraboya, claraboya.target);
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.55); rim.position.set(2.5, 6, -12); scene.add(rim);
function ponerSol(cx, cz) { sol.position.set(cx - 5, 13, cz + 6); sol.target.position.set(cx, 0, cz); sol.target.updateMatrixWorld(); }

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, piso: 0xd6d3c4, celeste: 0xb9cde0 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshPhysicalMaterial({ color: 0xcfe2f2, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false }),
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
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
// la geometría estática de un grupo, en una malla por material (SwiftShader: menos llamadas de dibujo)
function fusionar(grupo, excluir = []) {
  grupo.updateMatrixWorld(true);
  const inv = grupo.matrixWorld.clone().invert();
  const fuera = new Set(); for (const e of excluir) e.traverse((o) => fuera.add(o));
  const porMat = new Map(), quitar = [];
  grupo.traverse((o) => {
    if (!o.isMesh || fuera.has(o) || Array.isArray(o.material) || o.material.transparent || !o.visible) return;
    let p = o.parent, oculto = false; while (p && p !== grupo) { if (!p.visible) oculto = true; p = p.parent; } if (oculto) return;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(inv.clone().multiply(o.matrixWorld));
    if (!porMat.has(o.material)) porMat.set(o.material, { geos: [], sombra: o.castShadow });
    porMat.get(o.material).geos.push(g); quitar.push(o);
  });
  for (const o of quitar) o.parent.remove(o);
  for (const [m, { geos, sombra }] of porMat) {
    let n = 0; for (const g of geos) n += g.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2);
    let i = 0; for (const g of geos) { pos.set(g.attributes.position.array, i * 3); nor.set(g.attributes.normal.array, i * 3); uv.set(g.attributes.uv.array, i * 2); i += g.attributes.position.count; }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    const mm = new THREE.Mesh(geo, m); mm.castShadow = sombra; mm.receiveShadow = true; grupo.add(mm);
  }
}

// =====================================================================================================
// EL DEPÓSITO
// =====================================================================================================
const DEP = new THREE.Group(); scene.add(DEP);
const RF = 2.3, RB = 3.35, Z0 = 6.0, BAY = 1.8, NB = 8, NIV = [0, 2.1, 4.2], RH = 5.6;
const bahiaZ = (k) => Z0 - BAY * (k + 0.5);
const ACE = { x: (RF + RB) / 2, z: bahiaZ(6), parZ: Z0 - BAY * 6 };          // la bahía del aceite (rack derecho)
const OFI = { x0: -1.6, x1: 4.4, z0: -14, z1: -9.4, piso: 3.2, alto: 2.6 };
const ZF = -14, PORTON = { x0: -6.4, x1: -2.8, h: 4.6 };
const pantM = lienzo(1024, 640, () => {});       // el monitor de Rubén
let monitor, termoR, escalon0;
{
  // piso de hormigón gris-crema liso con las líneas del pasillo crema
  const piso = mesh(new THREE.PlaneGeometry(16, 30), mat(C.piso, 0.88), 0, 0, -3); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  const linea = (x, z, w, d) => { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0xf6f4ea, 0.8), x, 0.006, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); };
  for (const x of [-2.12, 2.12]) linea(x, -1.2, 0.12, 14.6);
  linea(0, -8.75, 4.4, 0.12);
  // paredes navy claro lisas y techo con claraboyas
  const paredM = mat(0x22355a, 0.9);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.3), paredM, x, y, z); p.rotation.y = ry; p.castShadow = false; DEP.add(p); };
  for (const x of [-7.6, 7.6]) pared(30, 8, x, 4, -3, Math.PI / 2);
  pared(12, 8, 0, 4, 12, 0);
  // el fondo: el portón del muelle a la izquierda (abierto, luz de día) y la pared
  pared(PORTON.x0 + 7.6, 8, (PORTON.x0 - 7.6) / 2, 4, ZF - 0.15, 0);
  pared(7.6 - PORTON.x1, 8, (PORTON.x1 + 7.6) / 2, 4, ZF - 0.15, 0);
  pared(PORTON.x1 - PORTON.x0, 8 - PORTON.h, (PORTON.x0 + PORTON.x1) / 2, PORTON.h + (8 - PORTON.h) / 2, ZF - 0.15, 0);
  DEP.add(caja(PORTON.x1 - PORTON.x0 + 0.4, 0.3, 0.4, M.navy3, (PORTON.x0 + PORTON.x1) / 2, PORTON.h, ZF));
  for (const x of [PORTON.x0, PORTON.x1]) DEP.add(caja(0.25, PORTON.h, 0.35, M.navy3, x, PORTON.h / 2, ZF));
  for (const x of [PORTON.x0 + 0.15, PORTON.x1 - 0.15]) DEP.add(caja(0.3, 0.9, 0.2, M.goma, x, 0.95, ZF + 0.12));   // los topes del muelle
  const afuera = mesh(new THREE.PlaneGeometry(30, 14), new THREE.MeshBasicMaterial({ color: 0xe6edf2 }), -4, 5, ZF - 14); DEP.add(afuera);
  const patio = mesh(new THREE.PlaneGeometry(20, 14), mat(0xb7b3a6, 0.9), -4, 0.0, ZF - 7); patio.rotation.x = -Math.PI / 2; DEP.add(patio);
  const techo = mesh(new THREE.BoxGeometry(16, 0.2, 30), mat(0x4a5b78, 0.9), 0, 8.1, -3); techo.castShadow = false; DEP.add(techo);
  for (const z of [-11, -6, -1, 4, 9]) for (const x of [-4.5, 0, 4.5]) { const c = mesh(new THREE.PlaneGeometry(2.6, 1.3), new THREE.MeshBasicMaterial({ color: 0xf2f4ee }), x, 7.99, z); c.rotation.x = Math.PI / 2; c.castShadow = false; DEP.add(c); }
  // campanas de luz sobre el pasillo (planas, prendidas)
  for (const z of [3.5, -1.0, -5.5]) {
    const g = new THREE.Group(); g.position.set(0, 7.0, z); DEP.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0, 6), M.navy, 0, 0.5, 0));
    const cono = mesh(new THREE.CylinderGeometry(0.12, 0.42, 0.34, 20, 1, true), M.navy3, 0, -0.1, 0); cono.material = mat(C.navy3, 0.6, { side: THREE.DoubleSide }); g.add(cono);
    const luz = mesh(new THREE.CircleGeometry(0.38, 24), new THREE.MeshBasicMaterial({ color: 0xfffbea }), 0, -0.26, 0); luz.rotation.x = Math.PI / 2; luz.castShadow = false; g.add(luz);
  }
  // ---- la oficina vidriada arriba (fondo, a la derecha del portón): piso sobre columnas, vidrio con perfiles navy ----
  const OW = OFI.x1 - OFI.x0, OC = (OFI.x0 + OFI.x1) / 2, OD = OFI.z1 - OFI.z0;
  DEP.add(caja(OW + 0.3, 0.25, OD + 0.9, M.navy3, OC, OFI.piso - 0.12, (OFI.z0 + OFI.z1 + 0.9) / 2));
  for (const x of [OFI.x0, OC, OFI.x1]) DEP.add(caja(0.25, OFI.piso, 0.25, M.navy3, x, OFI.piso / 2, OFI.z1 + 0.75));
  DEP.add(caja(OW, 0.2, OD, M.navy3, OC, OFI.piso + OFI.alto + 0.1, (OFI.z0 + OFI.z1) / 2));
  const piso2 = mesh(new THREE.PlaneGeometry(OW, OD), mat(0xb08a5e, 0.7), OC, OFI.piso + 0.01, (OFI.z0 + OFI.z1) / 2); piso2.rotation.x = -Math.PI / 2; DEP.add(piso2);
  for (const x of [OFI.x0, OFI.x1]) DEP.add(caja(0.12, OFI.alto, OD, mat(C.cr2, 0.8), x, OFI.piso + OFI.alto / 2, (OFI.z0 + OFI.z1) / 2));
  const vofi = new THREE.Mesh(new THREE.PlaneGeometry(OW, OFI.alto), M.vidrio); vofi.position.set(OC, OFI.piso + OFI.alto / 2, OFI.z1); vofi.renderOrder = 3; DEP.add(vofi);
  for (const x of [OFI.x0, 0.3, 2.55, OFI.x1]) DEP.add(caja(0.08, OFI.alto, 0.1, M.navy3, x, OFI.piso + OFI.alto / 2, OFI.z1));   // perfiles: Rubén (x 1,4) queda entre dos
  DEP.add(caja(OW, 0.1, 0.12, M.navy3, OC, OFI.piso + OFI.alto, OFI.z1));   // (ronda 1) sin el travesaño de 0,95: tapaba a Rubén desde el pasillo
  DEP.add(caja(OW, OFI.alto, 0.1, mat(C.cr, 0.8), OC, OFI.piso + OFI.alto / 2, OFI.z0 + 0.1));
  // un estante con biblioratos y un cuadro en la pared del fondo de la oficina
  DEP.add(caja(1.6, 0.05, 0.3, M.navy3, 3.2, OFI.piso + 1.55, OFI.z0 + 0.3));
  for (let i = 0; i < 7; i++) DEP.add(caja(0.12, 0.34, 0.26, [M.navy3, M.g, M.cr2, M.red][i % 4], 2.55 + i * 0.18, OFI.piso + 1.75, OFI.z0 + 0.3, 0.01));
  // el balcón con la baranda (caños navy3 y pasamanos verde) y la escalera metálica que baja hacia +z
  const BZ = OFI.z1 + 0.75;
  // (ronda 1) baranda solo en el tramo de la escalera (delante del vidrio tapaba a Rubén)
  DEP.add(caja(1.2, 0.06, 0.08, M.g, OFI.x0 + 0.6, OFI.piso + 0.95, BZ, 0.02));
  for (const x of [OFI.x0 + 0.05, OFI.x0 + 1.15]) DEP.add(caja(0.06, 0.95, 0.06, M.navy3, x, OFI.piso + 0.48, BZ));
  // (la escalera baja hacia -x, al costado de la oficina, entre el rack izquierdo y el portón: no se cruza con la grúa)
  const n = 13, ez = -8.95, ex0 = OFI.x0 + 0.05;
  for (let i = 0; i < n; i++) DEP.add(caja(0.3, 0.06, 0.95, mat(0x8a8e98, 0.5, { metalness: 0.4 }), ex0 - (i + 1) * 0.28 + 0.1, OFI.piso - (i + 1) * (OFI.piso / n) + 0.05, ez));
  const L = Math.hypot(OFI.piso, n * 0.28), ang = Math.atan2(OFI.piso, n * 0.28);
  for (const dz of [-0.5, 0.5]) { const l = caja(L, 0.1, 0.06, M.navy3, ex0 - n * 0.14, OFI.piso / 2 + 0.06, ez + dz); l.rotation.z = -ang; DEP.add(l); }
  for (const dz of [-0.5, 0.5]) { const l = caja(L, 0.05, 0.05, M.g, ex0 - n * 0.14, OFI.piso / 2 + 0.95, ez + dz); l.rotation.z = -ang; DEP.add(l); }
  for (let i = 1; i < n; i += 3) for (const dz of [-0.5, 0.5]) DEP.add(caja(0.04, 0.9, 0.04, M.navy3, ex0 - i * 0.28, OFI.piso - i * (OFI.piso / n) + 0.5, ez + dz));
  // el balcón se extiende hasta el arranque de la escalera
  escalon0 = V3(ex0 - n * 0.28 - 0.3, 0, ez);
  // el escritorio de Rubén (de frente al vidrio): madera clara, monitor a su izquierda (pantalla canvas), termo
  const ESC_Z = -10.3, ESC_Y = OFI.piso + 0.76;
  DEP.add(caja(2.0, 0.06, 0.85, mat(0xc89a64, 0.55), 1.4, ESC_Y - 0.03, ESC_Z));
  for (const x of [0.45, 2.35]) DEP.add(caja(0.08, 0.73, 0.78, M.navy3, x, OFI.piso + 0.37, ESC_Z));
  DEP.add(caja(1.9, 0.5, 0.04, M.navy3, 1.4, OFI.piso + 0.45, ESC_Z + 0.4));   // el frente del escritorio
  monitor = new THREE.Group(); monitor.position.set(2.0, ESC_Y, ESC_Z - 0.1); monitor.rotation.y = -0.5; monitor.scale.setScalar(1.25); DEP.add(monitor);
  monitor.add(caja(0.08, 0.32, 0.08, M.navy, 0, 0.16, -0.05)); monitor.add(caja(0.3, 0.02, 0.2, M.navy, 0, 0.01, -0.03));
  monitor.add(caja(0.86, 0.56, 0.05, M.navy, 0, 0.6, 0, 0.02));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.6, 0.027); monitor.add(pm);
  termoR = crearTermo(); termoR.position.set(0.75, ESC_Y, ESC_Z + 0.1); DEP.add(termoR);
  for (let i = 0; i < 4; i++) DEP.add(caja(0.21, 0.006, 0.29, mat(i % 2 ? C.cr : 0xe8e4d6, 0.9), 1.05 + i * 0.006, ESC_Y + 0.004 + i * 0.006, ESC_Z + 0.15, 0.002).rotateY(0.1 * i - 0.2));
  const silla = new THREE.Group(); silla.position.set(2.6, OFI.piso, ESC_Z - 1.1); silla.rotation.y = 0.6; DEP.add(silla);
  silla.add(caja(0.5, 0.08, 0.5, M.navy, 0, 0.5, 0)); silla.add(caja(0.48, 0.6, 0.07, M.navy, 0, 0.85, -0.25)); silla.add(caja(0.06, 0.5, 0.06, M.gris, 0, 0.25, 0));
}
// ---- pallets, cajas y racks ----
function crearPallet() {
  const g = new THREE.Group(), m = M.madera, mo = mat(0xb89a6c, 0.8);
  for (let i = 0; i < 7; i++) g.add(caja(1.2, 0.025, 0.11, m, 0, 0.135, -0.45 + i * 0.15, 0.006));
  for (const z of [-0.45, 0, 0.45]) g.add(caja(1.2, 0.025, 0.12, mo, 0, 0.0125, z, 0.006));
  for (const x of [-0.53, 0, 0.53]) for (const z of [-0.45, 0, 0.45]) g.add(caja(0.14, 0.1, 0.12, mo, x, 0.075, z, 0.006));
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
  const g = new THREE.Group(), pm = mat(0xdcd9c8, 0.9), fm = new THREE.MeshStandardMaterial({ map: harinaT, roughness: 0.9 });
  g.add(mesh(rbox(0.5, 0.16, 0.36, 0.07, 3), [pm, pm, fm, pm, pm, pm], 0, 0.08, 0));
  return g;
}
// la caja de aceite: kraft, la botella dibujada de perfil y "ACEITE 1,5 L x 12" en navy; cinta de embalar crema arriba
// geometría: x 0,48 (fondo) · y 0,30 · z 0,24; la cara chica (-x / +x) va hacia el pasillo
const CAJA_A = { x: 0.48, y: 0.3, z: 0.24 };
const botella = (x, cx, top, alto, ancho) => {
  x.fillStyle = "#efeee5"; x.strokeStyle = "#1f3254"; x.lineWidth = Math.max(6, ancho * 0.08);
  x.beginPath(); x.moveTo(cx - ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top + alto * 0.18);
  x.quadraticCurveTo(cx + ancho * 0.5, top + alto * 0.26, cx + ancho * 0.5, top + alto * 0.4); x.lineTo(cx + ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto * 0.4);
  x.quadraticCurveTo(cx - ancho * 0.5, top + alto * 0.26, cx - ancho * 0.16, top + alto * 0.18); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = "#5ce611"; x.fillRect(cx - ancho * 0.5 + x.lineWidth / 2, top + alto * 0.55, ancho - x.lineWidth, alto * 0.22);
  x.fillStyle = "#1f3254"; x.fillRect(cx - ancho * 0.2, top - alto * 0.07, ancho * 0.4, alto * 0.08);
};
const kraftCara = (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#b8935a"; x.fillRect(0, 0, w, h * 0.06); x.fillRect(0, h * 0.94, w, h * 0.06); };
const cajaChicaT = lienzo(256, 320, (x, w, h) => { kraftCara(x, w, h); botella(x, w / 2, 50, 190, 92); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 56, w - 30); x.fillText("ACEITE", w / 2, 280); });
const cajaGrandeT = lienzo(512, 320, (x, w, h) => {
  kraftCara(x, w, h);
  for (const cx of [70, 150]) botella(x, cx, 70, 200, 66);
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 86, 280); x.fillText("ACEITE", 210, 130);
  x.font = F(800, 50); x.fillText("1,5 L x 12", 212, 215);
});
const cintaT = lienzo(256, 128, (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#e8dcc0"; x.fillRect(0, h * 0.38, w, h * 0.24); });
const CAJA_MAT = (() => { const k = mat(C.kraft, 0.85); const ch = new THREE.MeshStandardMaterial({ map: cajaChicaT, roughness: 0.85 }), gr = new THREE.MeshStandardMaterial({ map: cajaGrandeT, roughness: 0.85 }), ci = new THREE.MeshStandardMaterial({ map: cintaT, roughness: 0.7 }); return [ch, ch, ci, k, gr, gr]; })();
const CAJA_GEO = rbox(CAJA_A.x, CAJA_A.y, CAJA_A.z, 0.015, 2);
function crearCajaAceite() { const m = new THREE.Mesh(CAJA_GEO, CAJA_MAT); m.castShadow = true; m.receiveShadow = true; return m; }
function cargaPallet(g, tipo) {
  const p = crearPallet(); g.add(p);
  if (tipo === 0) for (let i = 0; i < 4; i++) for (let k = 0; k < 2; k++) g.add(caja(0.55, 0.42, 0.42, mat(k % 2 ? C.kraft : 0xbf9a62, 0.85), -0.29 + (i % 2) * 0.58, 0.36 + k * 0.43, -0.22 + Math.floor(i / 2) * 0.44, 0.02));
  else if (tipo === 1) for (let k = 0; k < 4; k++) for (let i = 0; i < 2; i++) { const b = crearBolsaHarina(); b.position.set(-0.27 + i * 0.54, 0.15 + k * 0.16, 0); g.add(b); }
  else if (tipo === 2) { const fm = mat(0x7fc46a, 0.25, { transparent: true, opacity: 0.85 }); for (let k = 0; k < 2; k++) g.add(caja(1.1, 0.42, 0.85, fm, 0, 0.36 + k * 0.43, 0, 0.05)); }
  else { for (let i = 0; i < 6; i++) g.add(caja(0.36, 0.34, 0.4, mat(C.cr, 0.85), -0.38 + (i % 3) * 0.38, 0.32, -0.2 + Math.floor(i / 3) * 0.42, 0.02)); g.add(caja(1.1, 0.02, 0.8, mat(C.cr2, 0.8), 0, 0.5, 0)); }
  return g;
}
// un rack de 8 bahías a lo largo de z; s = +1 el derecho (cara en x = +2,3), -1 el izquierdo
const RACKS = new THREE.Group(); DEP.add(RACKS);
function crearRack(s) {
  const par = mat(C.navy3, 0.55), xf = s * RF, xb = s * RB;
  for (let i = 0; i <= NB; i++) for (const x of [xf, xb]) RACKS.add(caja(0.1, RH, 0.1, par, x + s * (x === xf ? 0.05 : -0.05), RH / 2, Z0 - BAY * i, 0.01));
  for (let i = 0; i <= NB; i++) for (const y of [0.45, 2.45, 4.45]) { const d = caja(Math.hypot(RB - RF, 1.2), 0.05, 0.05, par, s * (RF + RB) / 2, y + 0.6, Z0 - BAY * i); d.rotation.z = s * Math.atan2(1.2, RB - RF) * (i % 2 ? 1 : -1); RACKS.add(d); }
  for (const y of NIV.slice(1)) for (const x of [xf, xb]) RACKS.add(caja(0.07, 0.14, BAY * NB, M.g, x + s * (x === xf ? 0.035 : -0.035), y, Z0 - (BAY * NB) / 2, 0.01));
  for (let i = 0; i < NB; i++) for (let n = 0; n < 3; n++) {
    if (s > 0 && i === 6 && n < 2) continue;   // la bahía del aceite: su pallet va aparte; el nivel de arriba vacío (se ve el cartel desde atrás)                         // la bahía del aceite: su pallet va aparte
    if (az() < 0.1) continue;
    const pg = new THREE.Group(); pg.position.set(s * (RF + RB) / 2, NIV[n] + (n ? 0.07 : 0), bahiaZ(i)); pg.rotation.y = Math.PI / 2 + (az() - 0.5) * 0.04;
    cargaPallet(pg, Math.floor(az() * 4)); RACKS.add(pg);
  }
}
semilla = 5; crearRack(1); crearRack(-1);
// pallets debajo de la oficina y junto al portón (que el fondo no quede vacío)
for (const [x, z, tp] of [[0.6, -12.6, 0], [2.0, -12.6, 3], [3.4, -12.6, 1], [0.6, -11.2, 2], [3.4, -11.2, 0], [-6.6, -11.8, 1], [-6.6, -10.4, 0]]) { const p = new THREE.Group(); p.position.set(x, 0, z); cargaPallet(p, tp); DEP.add(p); }
// el cartelito del pasillo "ACEITE" en el larguero de 2,1 de la bahía
const rotuloT = lienzo(512, 160, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.strokeRect(6, 6, w - 12, h - 12); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 112, w - 60); x.fillText("ACEITE", w / 2, h / 2 + 6); });
{ const r = plano(0.75, 0.235, rotuloT, RF - 0.02, NIV[1] - 0.02, ACE.z); r.rotation.y = -Math.PI / 2; DEP.add(r); DEP.add(caja(0.02, 0.27, 0.79, M.navy, RF - 0.005, NIV[1] - 0.02, ACE.z)); }

fusionar(DEP, [monitor, termoR]);

// =====================================================================================================
// EL CARTEL DEL NÚMERO: placa colgada de dos cadenas del larguero de 4,2, con dos paletas de marcador de aeropuerto
// =====================================================================================================
const CART = { w: 1.6, h: 1.0, cad: 0.55, tw: 0.6, th: 0.66 };
const DIG = " 0123456789", FLAP = 0.07;
const ESQ = {
  crema: { placa: C.cr, tile: "#f9f8f1", tinta: "#0b1220", rot: "STOCK · EXCEL" },
  rojo: { placa: C.cr, tile: "#f9f8f1", tinta: "#c7655b", rot: "STOCK · EXCEL" },
  verde: { placa: C.g, tile: "#7cf03c", tinta: "#0b1220", rot: "STOCK · AL DÍA" },
};
const texDig = {};
function matMitad(ch, esq, mitad) {
  const k = `${ch}|${esq}|${mitad}`;
  if (texDig[k]) return texDig[k];
  const base = `${ch}|${esq}`;
  if (!texDig[base]) texDig[base] = lienzo(256, 352, (x, w, h) => {
    const e = ESQ[esq];
    x.fillStyle = e.tile; x.fillRect(0, 0, w, h);
    x.fillStyle = e.tinta; x.textAlign = "center"; x.textBaseline = "alphabetic"; x.font = F(800, 330);
    if (ch !== " ") x.fillText(ch, w / 2, h / 2 + 118);
    x.fillStyle = "rgba(11,18,32,0.35)"; x.fillRect(0, h / 2 - 3, w, 6);
  });
  const t = texDig[base].clone(); t.needsUpdate = true; t.repeat.set(1, 0.5); t.offset.set(0, mitad === "arriba" ? 0.5 : 0);
  texDig[k] = new THREE.MeshStandardMaterial({ map: t, roughness: 0.45, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.32 });
  return texDig[k];
}
const cartelPiv = new THREE.Group(); cartelPiv.position.set(RF - 0.24, NIV[2] - 0.06, ACE.z); scene.add(cartelPiv);
const cartelCuerpo = new THREE.Group(); cartelCuerpo.rotation.y = -Math.PI / 2; cartelPiv.add(cartelCuerpo);
const placaM = mat(C.cr, 0.5), bordeM = mat(C.navy, 0.5);
cartelCuerpo.add(mesh(rbox(CART.w + 0.1, CART.h + 0.1, 0.06, 0.05, 3), bordeM, 0, 0, -0.012));
const placa = mesh(rbox(CART.w, CART.h, 0.08, 0.04, 3), placaM); cartelCuerpo.add(placa);
const rotT = { crema: null, verde: null };
for (const k of ["crema", "verde"]) rotT[k] = lienzo(1024, 128, (x, w, h) => { x.fillStyle = k === "verde" ? "#5ce611" : "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, ESQ[k].rot, 800, 96, w - 40); x.fillText(ESQ[k].rot, w / 2, h / 2 + 4); });
const rotuloCartel = plano(1.28, 0.16, rotT.crema, 0, 0.39, 0.047); rotuloCartel.material.polygonOffset = true; rotuloCartel.material.polygonOffsetFactor = -2; rotuloCartel.material.roughness = 0.5; rotuloCartel.material.emissive.set(0xffffff); rotuloCartel.material.emissiveMap = rotT.crema; rotuloCartel.material.emissiveIntensity = 0.32; cartelCuerpo.add(rotuloCartel);
for (const s of [-1, 1]) { const o = mesh(new THREE.TorusGeometry(0.035, 0.012, 8, 14), M.navy3, s * 0.6, CART.h / 2 + 0.03, 0); cartelCuerpo.add(o); }
// las paletas, en las dos caras (el cartel cuelga en el pasillo: se lee desde el pasillo y desde atrás del rack).
// [x en la placa] · fondo navy, mitad fija de arriba y de abajo, paleta que cae (arriba) y que llega (abajo)
const PALETAS = [];
const rotulosCartel = [rotuloCartel];
for (const cara of [0, 1]) {
  const cg = new THREE.Group(); cg.rotation.y = cara * Math.PI; cartelCuerpo.add(cg);
  if (cara) { const r2c = plano(1.28, 0.16, rotT.crema, 0, 0.39, 0.047); r2c.material.polygonOffset = true; r2c.material.polygonOffsetFactor = -2; r2c.material.roughness = 0.5; r2c.material.emissive.set(0xffffff); r2c.material.emissiveMap = rotT.crema; r2c.material.emissiveIntensity = 0.32; cg.add(r2c); rotulosCartel.push(r2c); }
  [-0.32, 0.32].forEach((px, i) => {
    const g = new THREE.Group(); g.position.set(px, -0.08, 0.04); cg.add(g);
    g.add(mesh(rbox(CART.tw + 0.05, CART.th + 0.05, 0.02, 0.02, 2), bordeM, 0, 0, 0.0));
    const pw = CART.tw, ph = CART.th / 2 - 0.004;
    const geo = new THREE.PlaneGeometry(pw, ph);
    const top = new THREE.Mesh(geo, matMitad("4", "crema", "arriba")); top.position.set(0, CART.th / 4 + 0.002, 0.012); g.add(top);
    const bot = new THREE.Mesh(geo, matMitad("4", "crema", "abajo")); bot.position.set(0, -CART.th / 4 - 0.002, 0.012); g.add(bot);
    const pT = new THREE.Group(); pT.position.set(0, 0, 0.016); g.add(pT);
    const fT = new THREE.Mesh(geo, matMitad("4", "crema", "arriba")); fT.position.y = CART.th / 4 + 0.002; pT.add(fT);
    const pB = new THREE.Group(); pB.position.set(0, 0, 0.018); g.add(pB);
    const fB = new THREE.Mesh(geo, matMitad("4", "crema", "abajo")); fB.position.y = -CART.th / 4 - 0.002; pB.add(fB);
    g.add(mesh(new THREE.BoxGeometry(pw + 0.02, 0.012, 0.03), bordeM, 0, 0, 0.02));     // la bisagra
    for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 8), M.gris, s * (pw / 2 + 0.005), 0, 0.02).rotateX(Math.PI / 2));
    for (const o of [top, bot, fT, fB]) { o.castShadow = false; o.receiveShadow = true; }
    PALETAS.push({ top, bot, pT, fT, pB, fB, i });
  });
}
// las cadenas (eslabones alternados) colgadas del larguero hasta los ganchos de la placa
const ESLABON = new THREE.TorusGeometry(0.03, 0.008, 6, 12);
const CADENAS = [-0.6, 0.6].map((dz) => {
  const ls = [];
  for (let i = 0; i < 11; i++) { const l = mesh(ESLABON, M.gris); l.position.set(0, -0.03 - i * 0.05, -dz); l.rotation.y = i % 2 ? Math.PI / 2 : 0; cartelPiv.add(l); ls.push(l); }
  return ls;
});
cartelPiv.add(caja(0.16, 0.06, 1.5, M.navy3, 0.05, 0.02, 0));   // el soporte abrazado al larguero
// el valor del cartel en t: [anterior, actual, cuándo cambió]
function valorCartel(t) {
  const K = T.cartelK; let j = 0;
  for (let i = 0; i < K.length; i++) if (K[i][0] <= t) j = i;
  return { de: j > 0 ? K[j - 1][1] : K[0][1], a: K[j][1], tc: K[j][0] };
}
const esquema = (t, v) => (t >= P2 ? "verde" : v === "37" ? "rojo" : "crema");
// el camino de una paleta: entre dígitos, por el lado corto de la rueda (9 → 0 es un paso); con el blanco, derecho
function camino(de, a) {
  const out = [de]; if (de === a) return out;
  if (de === " " || a === " ") { out.push(a); return out; }   // del blanco a un dígito (o al revés): una paleta
  const x = Number(de), y = Number(a), f = (y - x + 10) % 10, s = f <= 5 ? 1 : -1, n = f <= 5 ? f : 10 - f;
  for (let i = 1; i <= n; i++) out.push(String((x + s * i + 100) % 10));
  return out;
}
let cartelSinSombra = false;
function ponerCartel(t) {
  if (!cartelSinSombra) {
    cartelSinSombra = true;
    cartelPiv.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  }
  const { de, a, tc } = valorCartel(t);
  const eA = esquema(tc + 0.01, a), eD = esquema(tc - 0.02, de);
  const eNuevo = t >= P2 && tc < P2 ? "verde" : eA;
  for (const p of PALETAS) {
    const i = p.i, cam = camino(de[i], a[i]);
    const k = Math.floor((t - tc) / FLAP), u = (t - tc) / FLAP - k;
    const ePaso = (j) => (j === 0 ? (tc >= P2 || t < P2 ? eD : "verde") : eNuevo);
    if (k >= cam.length - 1 || cam.length === 1 || tc <= 0.001) {
      const ch = a[i];
      p.top.material = matMitad(ch, eNuevo, "arriba"); p.bot.material = matMitad(ch, eNuevo, "abajo");
      p.pT.visible = p.pB.visible = false;
      continue;
    }
    const c0 = cam[k], c1 = cam[k + 1], e0 = ePaso(k), e1 = ePaso(k + 1);
    p.top.material = matMitad(c1, e1, "arriba"); p.bot.material = matMitad(c0, e0, "abajo");
    p.fT.material = matMitad(c0, e0, "arriba"); p.fB.material = matMitad(c1, e1, "abajo");
    p.pT.visible = u < 0.5; p.pB.visible = u >= 0.5;
    p.pT.rotation.x = (u / 0.5) * Math.PI / 2;
    p.pB.rotation.x = -(1 - (u - 0.5) / 0.5) * Math.PI / 2;
  }
  const parte2 = t >= P2;
  placaM.color.set(parte2 ? C.g : C.cr);
  for (const r of rotulosCartel) r.material.map = r.material.emissiveMap = parte2 ? rotT.verde : rotT.crema;
  // parpadea en 10 (tres destellos)
  const bl = parte2 && en(t, T.parpadea, T.parpadea + 0.55) ? Math.abs(Math.sin(((t - T.parpadea) / 0.55) * Math.PI * 3)) : 0;
  placaM.emissive.set(parte2 ? C.g : C.cr); placaM.emissiveIntensity = 0.32 + bl * 0.55;
  // entra: baja colgado (la cadena se desenrolla) con un rebote; después el vaivén de cada cambio
  const vis = t >= T.cartel;
  cartelPiv.visible = vis;
  if (!vis) return;
  const u = sg(t, T.cartel, T.cartel + 0.38);
  const largo = lerp(0.12, CART.cad, bk(u));
  cartelCuerpo.position.y = -(largo + CART.h / 2 + 0.03);
  cartelCuerpo.scale.setScalar(lerp(0.75, 1, eo(sg(t, T.cartel, T.cartel + 0.2))) * (1 + 0.06 * bl));
  for (const ls of CADENAS) ls.forEach((l) => (l.visible = -l.position.y < largo + 0.02));
  const ev = [[T.cartel + 0.3, 0.09], [T.flip37, 0.045], [P2, 0], ...T.capas.map((c) => [c + 0.08, 0.025]), [T.capa4 + 0.08, 0.025], [T.lleno, 0.05], [T.f39, 0.02], [T.f40, 0.02]];
  let sw = 0; for (const [te, A] of ev) if (t >= te && (t < P2) === (te < P2)) sw += A * Math.exp(-3.0 * (t - te)) * Math.sin(7.5 * (t - te));
  cartelPiv.rotation.z = sw;
}

// =====================================================================================================
// LOS REMITOS CLAVADOS EN EL PARANTE (GRACIELA, MARTA, WALTER)
// =====================================================================================================
const REM = { w: 0.56, h: 0.4 };
const REM_N = ["GRACIELA", "MARTA", "WALTER"];
const remTex = (nombre, rojo, cant) => lienzo(512, 372, (x, w, h) => {
  x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h);
  const b = rojo ? "#c7655b" : "#0b1220";
  x.fillStyle = b; x.fillRect(0, 0, w, 84);
  x.fillStyle = "#f7f6f0"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 50); x.fillText("REMITO", w / 2, 46);
  x.strokeStyle = b; x.lineWidth = rojo ? 22 : 14; x.strokeRect(x.lineWidth / 2, x.lineWidth / 2, w - x.lineWidth, h - x.lineWidth);
  x.fillStyle = "#0b1220"; ajustar(x, nombre, 900, 104, w - 70); x.fillText(nombre, w / 2, 170);
  x.fillStyle = rojo ? "#c7655b" : "#1f3254"; x.font = F(800, 74); x.fillText(`${cant} aceite`, w / 2, 284);
});
const REMITOS = REM_N.map((nombre, k) => {
  const g = new THREE.Group(); scene.add(g);
  const cant = [15, 15, 10][k], tN = remTex(nombre, false, cant), tR = remTex(nombre, true, cant);
  const papel = mat(0xf7f6f0, 0.8);
  const frente = new THREE.MeshStandardMaterial({ map: tN, roughness: 0.75 });
  const h = mesh(new THREE.BoxGeometry(REM.w, REM.h, 0.008), [papel, papel, papel, papel, frente, papel]); g.add(h);
  g.add(caja(0.09, 0.022, 0.02, mat(0x8a8e98, 0.3, { metalness: 0.6 }), 0, REM.h / 2 + 0.004, 0.008, 0.005));   // la grampa
  g.userData = { frente, tN, tR, fin: V3(RF - 0.012, 2.06 - k * 0.43, ACE.parZ), giro: [0.035, -0.03, 0.05][k] };
  return g;
});
const _q = new THREE.Quaternion(), _a = new THREE.Vector3(), _b = new THREE.Vector3();
function ponerRemitos(t, celuPos) {
  REMITOS.forEach((g, k) => {
    const [a, b] = T.rem[k], { fin, giro, frente, tN, tR } = g.userData;
    g.visible = t < P2 && t >= b - 0.12;
    if (!g.visible) return;
    frente.map = t >= T.rojo + 0.12 * k ? tR : tN;   // (ronda 1) uno por uno, de arriba abajo
    // (ronda 1) ya no vuela desde el celular (atravesaba la mano y la cara): aparece clavado con un pop
    const u = sg(t, b - 0.12, b);
    if (u < 1) { g.position.copy(fin); g.rotation.set(0, -Math.PI / 2, giro); g.scale.setScalar(Math.max(0.01, bk(u) * 1.0));
    } else {
      // clavado: rebote corto y queda torcido apenas
      const d = t - b, reb = d < 0.4 ? Math.exp(-8 * d) * Math.sin(30 * d) * 0.12 : 0;
      g.position.copy(fin); g.rotation.set(0, -Math.PI / 2, giro + reb); g.scale.setScalar(1);
    }
  });
}

// =====================================================================================================
// LAS CAJAS: las 3 de la parte 1 · el pallet lleno de la parte 2 (4 capas de 10) · el pallet nuevo del autoelevador
// =====================================================================================================
const palletAce = new THREE.Group(); palletAce.position.set(ACE.x, 0, ACE.z); palletAce.rotation.y = Math.PI / 2; scene.add(palletAce);
palletAce.add(crearPallet());
// pallet local: x a lo largo de z del mundo (1,2 m), z hacia -x del mundo... uso cajas en coordenadas del mundo
const TRES = [[ACE.x + 0.02, 0.3, ACE.z - 0.125, 0.04, 0], [ACE.x - 0.01, 0.3, ACE.z + 0.13, -0.05, 0], [ACE.x + 0.04, 0.6, ACE.z + 0.02, 0.38, 0.05]].map(([x, y, z, ry, rz]) => {
  const c = crearCajaAceite(); c.position.set(x, y, z); c.rotation.set(0, ry, rz); scene.add(c); c.userData.base = c.position.clone(); c.userData.rot = [0, ry, rz]; return c;
});
TRES[2].scale.set(1, 0.93, 1);   // la de arriba, con la esquina aplastada
function crearPalletLleno() {
  const g = new THREE.Group(); const pa = crearPallet(); pa.rotation.y = Math.PI / 2; g.add(pa);
  const capas = [];
  for (let L = 0; L < 4; L++) {
    const cg = new THREE.Group(); cg.position.y = 0.15 + CAJA_A.y / 2 + L * CAJA_A.y; g.add(cg); capas.push(cg);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 5; j++) { const c = crearCajaAceite(); c.position.set((i - 0.5) * 0.49, 0, (j - 2) * 0.242); cg.add(c); }
  }
  const film = new THREE.Mesh(rbox(1.0, 4 * CAJA_A.y + 0.04, 1.24, 0.04, 2), new THREE.MeshPhysicalMaterial({ color: 0xe8f0f5, roughness: 0.15, transparent: true, opacity: 0.22, depthWrite: false }));
  film.position.y = 0.15 + 2 * CAJA_A.y; film.renderOrder = 4; g.add(film);
  g.userData = { capas, film };
  return sombras(g);
}
// (las cajas del pallet lleno: local x = profundidad del rack (hacia el pasillo = -x del mundo), z = a lo largo de la bahía)
const palletLleno = crearPalletLleno(); palletLleno.position.set(ACE.x, 0, ACE.z); scene.add(palletLleno);
const palletNuevo = crearPalletLleno(); scene.add(palletNuevo);

// ---- la zorra (transpaleta) con su pallet vacío ----
const zorra = new THREE.Group(); scene.add(zorra);
const palletZ = crearPallet(); palletZ.position.set(0, 0.06, 0.62); palletZ.rotation.y = Math.PI / 2; zorra.add(palletZ);
{
  const gm = mat(0xb4b8c0, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) zorra.add(caja(0.16, 0.07, 1.15, gm, s * 0.2, 0.06, 0.55));
  zorra.add(caja(0.6, 0.2, 0.22, gm, 0, 0.12, -0.08));
  const mango = caja(0.05, 1.0, 0.05, M.navy3, 0, 0.6, -0.25); mango.rotation.x = -0.35; zorra.add(mango);
  zorra.add(caja(0.3, 0.05, 0.05, M.navy3, 0, 1.08, -0.42));
  for (const s of [-1, 1]) zorra.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14), M.goma, s * 0.18, 0.08, -0.12).rotateZ(Math.PI / 2));
  sombras(zorra);
}
const ZORRA_TOPE = 0.06 + 0.15;   // altura de la tabla de arriba del pallet de la zorra

// ---- el autoelevador (de ya-lo-cargo): cuerpo verde de marca, contrapeso navy3, techo de caños, horquillas ----
function crearAutoelevador() {
  const g = new THREE.Group(), verde = mat(C.g, 0.45), gm = mat(0xc4c8cf, 0.35, { metalness: 0.4 });
  g.add(caja(1.2, 0.75, 1.9, verde, 0, 0.62, -0.15, 0.12));
  g.add(caja(1.18, 0.62, 0.5, M.navy3, 0, 0.75, -1.05, 0.2));
  g.add(caja(1.0, 0.1, 0.5, M.navy, 0, 1.02, -0.1, 0.04));
  g.add(caja(0.55, 0.12, 0.5, M.navy, 0, 1.05, -0.2, 0.05));
  g.add(caja(0.55, 0.5, 0.1, M.navy, 0, 1.3, -0.45, 0.04));
  g.add(caja(0.9, 0.35, 0.3, verde, 0, 1.15, 0.55, 0.06));
  const vol = mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 22), M.navy, 0, 1.42, 0.42); vol.rotation.x = -1.0; g.add(vol);
  g.add(caja(0.04, 0.3, 0.04, M.navy, 0, 1.3, 0.48));
  for (const sx of [-1, 1]) for (const z of [0.55, -0.85]) g.add(caja(0.07, 1.4, 0.07, M.navy, sx * 0.55, 1.65, z, 0.02));
  for (let i = 0; i < 6; i++) g.add(caja(1.18, 0.05, 0.06, M.navy, 0, 2.36, -0.85 + i * 0.28, 0.02));
  for (const sx of [-1, 1]) g.add(caja(0.06, 0.06, 1.5, M.navy, sx * 0.56, 2.36, -0.15, 0.02));
  const baliza = mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 14), mat(C.red, 0.35, { emissive: C.red, emissiveIntensity: 0.3 }), 0.4, 2.45, -0.8); g.add(baliza);
  for (const sx of [-1, 1]) for (const [z, r] of [[0.45, 0.32], [-0.85, 0.27]]) g.add(mesh(new THREE.CylinderGeometry(r, r, 0.26, 20), M.goma, sx * 0.5, r, z).rotateZ(Math.PI / 2));
  for (const sx of [-1, 1]) g.add(caja(0.1, 2.6, 0.12, gm, sx * 0.38, 1.35, 0.92, 0.02));
  g.add(caja(0.86, 0.1, 0.12, gm, 0, 2.62, 0.92, 0.02));
  const carro = new THREE.Group(); carro.position.set(0, 0.06, 1.0); g.add(carro);
  carro.add(caja(0.95, 0.5, 0.06, M.navy3, 0, 0.3, 0.02, 0.02));
  for (const sx of [-1, 1]) { carro.add(caja(0.12, 0.05, 1.15, gm, sx * 0.3, 0.025, 0.62, 0.01)); carro.add(caja(0.12, 0.5, 0.06, gm, sx * 0.3, 0.25, 0.05, 0.01)); }
  g.userData = { carro, baliza };
  return sombras(g);
}
const elev = crearAutoelevador(); scene.add(elev);

// ---- el camión de reparto (de ya-lo-cargo): cabina navy3, caja crema con franja verde, puertas traseras abiertas ----
const CAJA_C = { L: 6.0, W: 2.5, H: 2.6, piso: 1.2 };
function crearCamion() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.55), fr = M.navy3;
  const { L, W: CW, H, piso } = CAJA_C;
  g.add(caja(CW, 0.12, L, M.navy3, 0, piso - 0.06, L / 2));
  g.add(caja(0.08, H, L, cue, -CW / 2 + 0.04, piso + H / 2, L / 2, 0.02)); g.add(caja(0.08, H, L, cue, CW / 2 - 0.04, piso + H / 2, L / 2, 0.02));
  g.add(caja(CW, 0.08, L, cue, 0, piso + H - 0.04, L / 2, 0.02)); g.add(caja(CW, H, 0.08, cue, 0, piso + H / 2, L - 0.04, 0.02));
  for (const s of [-1, 1]) g.add(caja(0.02, 0.32, L - 0.2, M.g, s * (CW / 2 + 0.005), piso + H * 0.5, L / 2, 0.01));
  g.add(mesh(new THREE.PlaneGeometry(CW - 0.2, H - 0.2), mat(0xcfccbd, 0.9), 0, piso + H / 2, L - 0.09));
  for (let i = 0; i < 3; i++) { const p = new THREE.Group(); p.position.set(-0.6 + i * 0.6, piso, L - 0.8 - (i % 2) * 1.1); p.rotation.y = Math.PI / 2; cargaPallet(p, i % 2 ? 1 : 0); g.add(p); }
  g.add(caja(CW + 0.06, 0.12, 0.12, fr, 0, piso + H, 0.02, 0.02)); for (const s of [-1, 1]) g.add(caja(0.12, H + 0.1, 0.12, fr, s * CW / 2, piso + H / 2, 0.02, 0.02));
  g.add(caja(CW + 0.1, 0.18, 0.2, M.navy, 0, piso - 0.2, 0.0, 0.03));
  for (const s of [-1, 1]) { const p = new THREE.Group(); p.position.set(s * CW / 2, piso, -0.04); p.rotation.y = s * -(Math.PI * 0.92); g.add(p); p.add(caja(CW / 2 - 0.02, H - 0.04, 0.06, cue, -s * (CW / 4), H / 2, -0.03, 0.02)); p.add(caja(CW / 2 - 0.1, 0.12, 0.02, M.g, -s * (CW / 4), H * 0.5, -0.065, 0.01)); }
  g.add(caja(CW, 2.3, 1.9, M.navy3, 0, 1.55, L + 1.1, 0.18));
  for (const s of [-1, 1]) for (const z of [1.0, 2.3, L + 1.2]) g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 22), M.goma, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2));
  return sombras(g);
}
const camion = crearCamion(); camion.rotation.y = Math.PI; scene.add(camion);
const CAMX = (PORTON.x0 + PORTON.x1) / 2;

// ---- la paloma: low-poly gris azulado, cuello verde tornasol apagado, cola en abanico, alas que aletean ----
const paloma = new THREE.Group(); scene.add(paloma);
const alasP = [];
{
  const cuerpoM = mat(0x8c95a6, 0.7), oscM = mat(0x5f6878, 0.7), cuelloM = mat(0x5f8a76, 0.45, { metalness: 0.15 }), picoM = mat(0x3a3f4a, 0.5);
  const cu = mesh(new THREE.SphereGeometry(0.11, 12, 9), cuerpoM); cu.scale.set(1.0, 0.9, 1.7); paloma.add(cu);
  const pecho = mesh(new THREE.SphereGeometry(0.09, 12, 9), mat(0x9aa2b2, 0.7), 0, 0.01, 0.09); paloma.add(pecho);
  const cuello = mesh(new THREE.SphereGeometry(0.06, 10, 8), cuelloM, 0, 0.06, 0.15); cuello.scale.set(1, 1.1, 1); paloma.add(cuello);
  const cab = mesh(new THREE.SphereGeometry(0.048, 10, 8), oscM, 0, 0.11, 0.2); paloma.add(cab);
  const pico = mesh(new THREE.ConeGeometry(0.014, 0.05, 6), picoM, 0, 0.105, 0.255); pico.rotation.x = Math.PI / 2; paloma.add(pico);
  for (const s of [-1, 1]) paloma.add(mesh(new THREE.SphereGeometry(0.009, 6, 5), mat(C.red, 0.4), s * 0.035, 0.122, 0.225));
  const cola = mesh(new THREE.ConeGeometry(0.09, 0.2, 4), oscM, 0, 0.0, -0.22); cola.rotation.x = -Math.PI / 2; cola.scale.set(1.3, 1, 0.25); paloma.add(cola);
  for (const s of [-1, 1]) {
    const piv = new THREE.Group(); piv.position.set(s * 0.07, 0.04, 0.02); paloma.add(piv);
    const ala = mesh(new THREE.BoxGeometry(0.36, 0.015, 0.17), mat(0xa9b1c0, 0.7), s * 0.18, 0, -0.02); piv.add(ala);
    for (const dz of [-0.04, 0.02]) piv.add(mesh(new THREE.BoxGeometry(0.12, 0.018, 0.025), oscM, s * 0.17, 0.002, dz));
    const punta = mesh(new THREE.BoxGeometry(0.16, 0.012, 0.13), mat(0x7a8394, 0.7), s * 0.43, 0, -0.04); piv.add(punta);
    alasP.push({ piv, s });
  }
  paloma.scale.setScalar(1.0);
  sombras(paloma);
}

// ---- el mate de Rubén, el celular de Nico ----
const mateR = crearMate(); mateR.scale.setScalar(1.15); scene.add(mateR);
const pantN = lienzo(600, 975, () => {});
const celuN = crearCelular(pantN, C.navy3, 0.08, 0.162); celuN.scale.setScalar(1.5); scene.add(celuN);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [2.6, 8.4, 15.4, 23.45, 30.4] });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true, parpadeoCada: 999, parpadeosExtra: [3.0, 7.0, 12.3, 18.0, 27.0, 32.7] });
const operario = crearPersonaje({ ...DEFECTO, nombre: "Darío", piel: PIEL.morena, pelo: PELO.negro, peinado: "corto", bigote: PELO.negro, cejasColor: 0x1e1a18, camisa: C.navy3, mangas: "largas", cuello: C.g, pantalon: C.navy3, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas de ya-lo-cargo (ronda 2: la corona lisa se veía casco de costado)
{
  const corona = ruben.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (corona) {
    corona.visible = false;
    const pm = mat(PELO.canoso, 0.85), pm2 = mat(0xa9a6a0, 0.85);
    const R0 = 0.3, CC0 = R0 * 0.92;
    semilla = 21;
    const bola = new THREE.SphereGeometry(1, 16, 12);
    const fila = (n, a0, a1, e0, eK, s0, sK, h) => {
      for (let i = 0; i < n; i++) {
        const u = (i + 0.5) / n, w = Math.sin(Math.PI * u);
        const a2 = lerp(a0, a1, u) + (az() - 0.5) * 0.07, e2 = e0 + eK * w + (az() - 0.5) * 0.09;
        const sz = s0 + sK * w + 0.008 * az(), k = 0.975;
        const x = R0 * k * Math.sin(a2) * Math.cos(e2), y = CC0 + R0 * 0.97 * k * Math.sin(e2), z = R0 * 0.95 * k * Math.cos(a2) * Math.cos(e2);
        const m = mesh(bola, (i + n) % 4 ? pm : pm2, x, y, z); m.scale.set(sz, sz * h, sz); ruben.cabeza.add(m);
      }
    };
    fila(26, 1.5, Math.PI * 2 - 1.5, -0.1, 0.0, 0.02, 0.017, 1.3);
    fila(9, 2.4, Math.PI * 2 - 2.4, -0.25, -0.02, 0.019, 0.01, 1.15);
  }
}
// el operario: gorra navy con visera verde (ya-lo-cargo)
{
  const R0 = 0.3, CC0 = R0 * 0.92, gm = mat(C.navy3, 0.7), vm = mat(C.g, 0.5);
  operario.cabeza.add(mesh(new THREE.SphereGeometry(R0 * 1.05, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.4), gm, 0, CC0 + 0.01, -0.01));
  const vis = mesh(new THREE.CylinderGeometry(R0 * 0.75, R0 * 0.75, 0.025, 24, 1, false, -Math.PI * 0.45, Math.PI * 0.9), vm, 0, CC0 + R0 * 0.56, R0 * 0.52); vis.scale.set(1.1, 1, 0.85); vis.rotation.x = -0.15; operario.cabeza.add(vis);
}
const TODOS = [ruben, nico, operario];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// el pulgar arriba de Nico (un dedo gordo que sale del puño)
const PULGAR = nico.brazos.map((b) => { const p = mesh(new THREE.CapsuleGeometry(0.03, 0.075, 4, 8), mat(ELENCO.empleado.piel, 0.55), b.s * -0.012, -0.05, 0.075); p.rotation.x = Math.PI / 2; p.visible = false; b.mano.add(p); return p; });

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para las burbujas y los chats) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene(); esc.background = new THREE.Color(0xd9d7c9);
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo) => {
    esc.background = new THREE.Color(fondo);
    const padre = per.raiz.parent; esc.add(per.raiz);
    per.poner({ x: 0, y: 0, z: 0, giro: 0, ...CARA.sonrisa, ...BRAZOS.costado, t: 0 });
    per.raiz.updateMatrixWorld(true);
    const c = per.cabeza.localToWorld(V3(0, 0.25, 0));
    cam.position.set(c.x + 0.12, c.y + 0.04, c.z + 1.6); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  const marta = crearPersonaje({ ...ELENCO.duena, parpadeoCada: 999 });
  const walter = crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 });
  const nico = crearPersonaje({ ...ELENCO.empleado, parpadeoCada: 999 });
  AVATAR.marta = leer(marta, 0xd9d7c9); AVATAR.walter = leer(walter, 0xb9cde0); AVATAR.nico = leer(nico, 0x5ce611);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, lentes: null, parpadeoCada: 999 }), 0xefeee5);
  rt.dispose();
}
// dibuja un avatar redondo con borde navy
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
// el ícono del tubo de teléfono (para las burbujas del proveedor)
function tubo(x, cx, cy, r, fondo = "#1f3254") {
  x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.stroke();
  x.save(); x.translate(cx, cy); x.rotate(-0.75); x.fillStyle = "#efeee5";
  x.beginPath(); x.roundRect(-r * 0.62, -r * 0.2, r * 1.24, r * 0.4, r * 0.18); x.fill();
  x.beginPath(); x.roundRect(-r * 0.66, -r * 0.2, r * 0.34, r * 0.62, r * 0.12); x.fill(); x.beginPath(); x.roundRect(r * 0.32, -r * 0.2, r * 0.34, r * 0.62, r * 0.12); x.fill();
  x.restore();
}


// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla; de la-lista) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cab = null, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0;
  const cabF = Math.max(Math.round(px * 0.62), 42);   // (ronda 5) el rótulo nunca menos de 42 px
  med.font = F(700, cabF * 2); const anchoCab = cab ? (med.measureText(cab.nombre).width / 2 + px * 1.05) : 0; med.font = F(800, px * 2);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width / 2 + (l.includes("[") ? px * 0.25 : 0)));
  const Wg = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9 + cabH);
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.textBaseline = "middle";
    if (cab) {
      const r = px * 0.45 * 2, cy = px * 0.55 * 2 + px * 0.2, cx = px * 0.65 * 2;
      if (cab.cv) avatar(x, cab.cv, cx, cy, r); else tubo(x, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, cabF * 2); x.textAlign = "left"; x.fillText(cab.nombre, cx + r + px * 0.3, cy + 2);
    }
    x.font = F(800, px * 2);
    lineas.forEach((l, i) => {
      const y = cabH * 2 + (h - cabH * 2) / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08;
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
  const colaG = new THREE.Group(); g.add(colaG);
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W: Wg, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0) {
  // (ronda 2) por debajo de 0,85 el globo no se achica: se desvanece
  g.visible = s > 0.03;
  const op = cl(s / 0.85); s = Math.max(s, 0.85);
  g.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.opacity = op)); });
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg, H, cola } = g.userData;
  cx = Wg + 160 > 1080 ? 540 : cl(cx, Wg / 2 + 70, 1010 - Wg / 2);
  cy = cl(cy, H / 2 + 100, 1800 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.set(k * PXK * s, k * PXK * s, k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  cola.visible = !!objetivo;
  if (!objetivo) return;
  const [ox, oy] = objetivo;
  const lado = cl((ox - cx) / (Wg / 2), -0.8, 0.8);
  if (oy >= cy) {
    cola.position.set((lado * Wg) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * Wg) / 2), oy - (cy + H / 2)), -1.15, 1.15);
  } else {
    cola.position.set((lado * Wg) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * Wg) / 2), (cy - H / 2) - oy), -1.15, 1.15);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(V3(0, 0.181, 0.3))); };

// ================= PANTALLAS =================
// el celular de Nico en la mano (parte 1: el chat de clientes; parte 2: la ficha del aceite)
let claveN = "";
function dibujarCeluN(t) {
  const parte2 = t >= P2, n = parte2 ? 0 : t >= T.walter ? 3 : t >= T.marta ? 2 : 1;
  const clave = `${parte2}|${n}`; if (clave === claveN) return; claveN = clave;
  const { x } = pantN.userData, w = 600, h = 975;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  if (!parte2) {
    x.font = F(800, 64); x.fillText("Clientes", 40, 80);
    [[AVATAR.graciela, "Graciela"], [AVATAR.marta, "Marta"], [AVATAR.walter, "Walter"]].slice(0, n).forEach(([cv, nom], i) => {
      const y = 200 + i * 250; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, y, w - 48, 220, 36); x.fill();
      avatar(x, cv, 100, y + 110, 62); x.fillStyle = "#0b1220"; x.font = F(800, 60); x.fillText(nom, 185, y + 75); x.font = F(800, 64); x.fillText(`${[15, 15, 10][i]} aceite`, 185, y + 155);
    });
  } else {
    x.font = F(800, 64); x.fillText("Stock", 40, 80);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, 200, w - 48, 520, 40); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 80); x.fillText("Aceite", 60, 290); x.font = F(900, 260); x.fillText("40", 60, 520); x.font = F(800, 54); x.fillText("en depósito", 60, 660);
  }
  pantN.needsUpdate = true;
}
// el monitor de Rubén (se ve chico desde el depósito): la planilla genérica (parte 1) · el panel de stock (parte 2)
let claveM = "";
function dibujarMonitor(t) {
  const parte2 = t >= P2, v = valorCartel(t).a;
  const clave = `${parte2}|${v}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1024, h = 640;
  x.fillStyle = parte2 ? "#0b1220" : "#efeee5"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!parte2) {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 110); x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("STOCK", 40, 58);
    for (let r = 0; r < 4; r++) { x.fillStyle = r % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(0, 110 + r * 132, w, 132); x.fillStyle = "#0b1220"; x.font = F(800, 70); x.fillText(["Aceite", "Harina", "Azúcar", "Agua"][r], 40, 176 + r * 132); x.fillText(r ? ["", "120", "85", "60"][r] : v.trim(), 720, 176 + r * 132); }
    x.strokeStyle = "#1f3254"; x.lineWidth = 6; x.beginPath(); x.moveTo(680, 110); x.lineTo(680, h); x.stroke();
  } else {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 110); x.fillStyle = "#5ce611"; x.fillRect(0, 110, w, 10); x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Stock al día", 40, 58);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 170, w - 60, 200, 30); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 96); x.fillText(`Aceite · ${v.trim()}`, 70, 272);
  }
  pantM.needsUpdate = true;
}
// ---- insertos a pantalla completa (pegados a la cámara): el celular de Nico (Q1b) y el monitor de Rubén (Q2b) ----
// un fondo navy mucho más grande que el cuadro, el aparato con su marco y la pantalla con letra grande
function crearInserto(IW, IH, ICY, marcoR, tipo) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const bgT = lienzo(256, 512, (x, w, h) => { const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#22355a"); gr.addColorStop(1, "#16243d"); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ map: bgT })); bg.position.z = -0.06; g.add(bg);
  // los racks borrosos detrás (franjas verdes y navy, para que no sea un fondo liso)
  for (const [x, w] of [[-560, 70], [-330, 40], [560, 70], [330, 40]]) { const b = new THREE.Mesh(new THREE.PlaneGeometry(w / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); b.position.set(x / PXK, 0, -0.055); g.add(b); }
  for (const y of [-300, 300]) { const b = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 40 / PXK), new THREE.MeshBasicMaterial({ color: 0x3fa60a })); b.position.set(0, y / PXK, -0.054); g.add(b); }
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, (tipo === "cel" ? 90 : 26) / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set(18 / PXK, (960 - ICY - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, (tipo === "cel" ? 90 : 26) / PXK, 3), new THREE.MeshBasicMaterial({ color: tipo === "cel" ? 0x1f3254 : 0x0b1220 })); marco.position.set(0, (960 - ICY) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set(0, (960 - ICY) / PXK, -0.02); g.add(pan);
  if (tipo === "mon") {
    const pie = new THREE.Mesh(new THREE.PlaneGeometry(90 / PXK, 160 / PXK), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); pie.position.set(0, (960 - ICY - IH / 2 - marcoR - 80) / PXK, -0.035); g.add(pie);
    const base = new THREE.Mesh(rbox(360 / PXK, 30 / PXK, 0.01, 12 / PXK, 2), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); base.position.set(0, (960 - ICY - IH / 2 - marcoR - 165) / PXK, -0.035); g.add(base);
    // (ronda 2) el escritorio de madera abajo, con el mate y el termo de Rubén
    const yEsc = ICY + IH / 2 + marcoR + 180;
    const esc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1200 / PXK), new THREE.MeshBasicMaterial({ color: 0xc89a64 })); esc.position.set(0, (960 - yEsc - 600) / PXK, -0.045); g.add(esc);
    const canto = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 26 / PXK), new THREE.MeshBasicMaterial({ color: 0xa87c4c })); canto.position.set(0, (960 - yEsc) / PXK, -0.044); g.add(canto);
    const mt = crearMate(); mt.scale.setScalar(1.5); mt.position.set(300 / PXK, (960 - yEsc - 300) / PXK, -0.03); mt.rotation.set(0.25, 0.4, 0); g.add(mt);
    const tr = crearTermo(); tr.scale.setScalar(1.25); tr.position.set(-330 / PXK, (960 - yEsc - 330) / PXK, -0.032); tr.rotation.x = 0.2; g.add(tr);
  }
  pegarACamara(g, camera, 10); g.visible = false;
  return { g, tex, IW, IH };
}
const INS_CEL = crearInserto(800, 1460, 1090, 34, "cel");   // (ronda 1) más grande y más arriba
const INS_MON = crearInserto(860, 900, 640, 28, "mon");   // (ronda 2) 80 % del ancho; escritorio, mate y termo abajo     // (ronda 1) el monitor al 85 % del ancho, centrado
let claveIC = "", claveIM = "";
function dibujarInsertos(t) {
  const ok = t >= T.ok ? 1 : 0;
  if (`${ok}` !== claveIC) {
    claveIC = `${ok}`;
    const { x } = INS_CEL.tex.userData, w = INS_CEL.IW, h = INS_CEL.IH;
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#efeee5"; x.font = F(800, 70); x.fillText("Stock", 50, 92);
    x.fillStyle = "#efeee5"; x.font = F(900, 108); x.fillText("Aceite", 50, 300); x.font = F(700, 64); x.fillStyle = "#b4b2a3"; x.fillText("1,5 L x 12", 54, 400);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 480, w - 80, 560, 50); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 70); x.fillText("En depósito", 90, 570);
    x.font = F(900, 260); x.fillText("40", 80, 800);
    if (ok) { x.strokeStyle = "#0b1220"; x.lineWidth = 34; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(520, 780); x.lineTo(580, 850); x.lineTo(670, 710); x.stroke(); }
    x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(90, 950, w - 180, 40, 20); x.fill(); x.fillStyle = "#0b1220"; x.fillRect(90, 950, w - 180, 40);
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(40, 1110, w - 80, 230, 40); x.fill();
    avatar(x, AVATAR.graciela, 150, 1225, 76); x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Graciela", 250, 1190); x.font = F(700, 56); x.fillText("pide 40", 250, 1265);
    INS_CEL.tex.needsUpdate = true;
  }
  const e = t >= T.pedido ? 2 : t >= T.pedir ? 1 : 0;
  if (`${e}` !== claveIM) {
    claveIM = `${e}`;
    const { x } = INS_MON.tex.userData, w = INS_MON.IW, h = INS_MON.IH;
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10); x.fillStyle = "#efeee5"; x.font = F(800, 62); x.fillText("Stock · aviso", 44, 64);
    x.fillStyle = "#efeee5"; ajustar(x, "Aceite: quedan 10", 900, 96, w - 88); x.fillText("Aceite: quedan 10", 44, 225);
    x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(44, 300, w - 88, 44, 22); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(44, 300, (w - 88) * 0.25, 44, 22); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 74); x.fillText("¿Pedimos 40?", 44, 430);
    x.fillStyle = e >= 2 ? "#5ce611" : "#efeee5"; x.beginPath(); x.roundRect(44, 500, w - 88, 150, 75); x.fill();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 86); x.fillText(e >= 2 ? "Pedido ✓" : "Pedir", w / 2, 577);
    if (e === 1) { x.strokeStyle = "rgba(92,230,17,0.9)"; x.lineWidth = 14; x.beginPath(); x.arc(w / 2, 575, 105, 0, 7); x.stroke(); }
    x.textAlign = "left"; x.fillStyle = "#b4b2a3"; x.font = F(700, 52);
    [["Harina 000", "120"], ["Azúcar", "85"], ["Agua", "60"]].forEach(([n, v], i) => { const y = 730 + i * 62; x.fillText(n, 44, y); x.textAlign = "right"; x.fillText(v, w - 44, y); x.textAlign = "left"; });
    INS_MON.tex.needsUpdate = true;
  }
}

// ================= LOS GLOBOS =================
const CAB = { gra: { cv: AVATAR.graciela, nombre: "Graciela · Rotisería" }, marta: { cv: AVATAR.marta, nombre: "Marta · Cafetería" }, walter: { cv: AVATAR.walter, nombre: "Walter · Bar" } };
const GL = {
  pre: crearGlobo(["Rubén, ¿hay aceite?", "Graciela quiere [15.]"], 64),
  n1: crearGlobo(["¡[Vendido!]"], 96),
  marta: crearGlobo(["¿Tenés aceite? [15.]"], 72, { cab: CAB.marta }),
  n2: crearGlobo(["¡[Vendido!]"], 96),
  walter: crearGlobo(["[10] de aceite,", "para mañana."], 72, { cab: CAB.walter }),
  n3: crearGlobo(["¡[Vendido!]"], 96),
  n4: crearGlobo(["Pero el Excel", "dice [cuarenta.]"], 84),
  r2: crearGlobo(["El Excel nunca", "bajó al [depósito.]"], 84),
  n5: crearGlobo(["Tranqui, ya lo", "[actualicé.]"], 84),
  r3a: crearGlobo(["Bárbaro."], 92),
  r3: crearGlobo(["Bárbaro.", "Ahora miente", "[actualizado.]"], 84),
  gra: crearGlobo(["¿Tenés aceite?", "Quiero [40.]"], 72, { cab: CAB.gra }),
  n6: crearGlobo(["Rubén, ¿hay [aceite?]"], 80),
  r4: crearGlobo(["[Fijate] vos."], 96),
  n7: crearGlobo(["¡[Vendido!]"], 96),
  n8: crearGlobo(["¿Y? ¿Cuántos hay?"], 84),
  r5: crearGlobo(["Los que [dice.]"], 96),
};

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Q1 repite el encuadre de P1 (callback).
const P1C = (k) => [lerp(-1.2, -1.05, k), lerp(1.25, 1.3, k), lerp(1.0, 0.45, k), lerp(2.5, 2.5, k), lerp(3.2, 3.15, k), -9.5, 50];
const NICO0 = { x: -0.25, z: -3.2 };   // Nico en P1/Q1
const R_OF = { x: 1.4, z: -11.0 };     // Rubén de pie detrás del escritorio (ronda 1: sentado no se veía desde el pasillo)
const R_ROW = { x: 1.25, z: -5.05 }, N_ROW = { x: 1.3, z: -5.85 }, O_ROW = { x: 1.2, z: -6.55 };
const ZORRA = { x: 1.0, z: -7.05 };
const PLANOS = [
  ["P1", 0, [[0, ...P1C(0)], [T.p2, ...P1C(1)]]],
  ["P2", T.p2, null],                        // travelling con Nico (se arma en renderAt)
  ["P2b", T.p2b, [[T.p2b, -1.2, 2.2, -4.8, 2.3, 2.35, -5.6, 61], [T.p3, -1.05, 2.2, -4.85, 2.3, 2.35, -5.6, 59]]],
  ["P3", T.p3, [[T.p3, -1.45, 2.6, -3.5, 1.9, 2.85, -6.3, 56], [T.grua[0], -1.25, 3.0, -4.6, 2.1, 3.0, -5.7, 54], [T.grua[0] + 0.4, -1.1, 3.05, -4.75, 2.1, 3.0, -5.7, 52], [T.grua[1], -2.3, 1.65, -5.45, 2.6, 1.75, -5.75, 56], [T.p4, -2.2, 1.63, -5.5, 2.6, 1.75, -5.75, 54]]],
  ["P4", T.p4, [[T.p4, 5.4, 1.62, -5.75, 0.6, 1.82, -5.75, 64], [T.p5, 5.3, 1.62, -5.75, 0.6, 1.82, -5.75, 62]]],
  ["P5", T.p5, [[T.p5, 4.6, 1.6, -6.0, 1.25, 1.5, -5.32, 48], [T.gira[0], 4.55, 1.6, -6.0, 1.25, 1.5, -5.32, 47], [T.r2, 4.0, 1.62, -5.55, 1.25, 1.58, -5.1, 30], [T.p6, 3.95, 1.62, -5.55, 1.25, 1.58, -5.1, 29]]],
  ["P6", T.p6, [[T.p6, 6.0, 1.95, -5.7, 1.3, 1.5, -5.65, 70], [T.p6b, 5.9, 1.95, -5.7, 1.3, 1.5, -5.65, 68]]],
  // (ronda 1) el giro a 37 en inserto (push-in al cartel), 37 arriba con el pallet vacío abajo, primer plano de Rubén
  ["P6b", T.p6b, [[T.p6b, 5.6, 3.35, -5.72, 2.06, 3.3, -5.7, 44], [T.p6c, 5.4, 3.35, -5.71, 2.06, 3.3, -5.7, 40]]],
  ["P6c", T.p6c, [[T.p6c, 6.0, 1.95, -5.7, 1.3, 1.5, -5.65, 70], [T.p6d, 5.9, 1.95, -5.7, 1.3, 1.5, -5.65, 68]]],
  ["P6d", T.p6d, [[T.p6d, 3.95, 1.62, -5.5, 1.25, 1.58, -5.1, 32], [P1, 3.85, 1.62, -5.45, 1.25, 1.58, -5.1, 29]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...P1C(0)], [T.q1r, ...P1C(0.6)]]],
  ["Q1r", T.q1r, [[T.q1r, 0.8, 4.4, -8.6, 1.65, 4.25, -11.0, 52], [T.q1b, 0.83, 4.4, -8.75, 1.65, 4.25, -11.0, 49]]],   // (ronda 1) Rubén en la oficina: "Fijate vos."
  ["Q1b", T.q1b, null],                     // inserto del celular
  ["Q2", T.q2, [[T.q2, -2.1, 1.95, -4.0, 2.4, 1.8, -5.55, 60], [T.q2b, -2.0, 1.95, -4.1, 2.4, 1.8, -5.55, 58]]],
  ["Q2b", T.q2b, null],                     // inserto del monitor
  ["Q2c", T.q2c, [[T.q2c, 0.25, 2.2, -0.9, 1.35, 1.75, -5.7, 62], [T.q3, 0.35, 2.2, -1.05, 1.4, 1.75, -5.7, 60]]],
  ["Q3", T.q3, [[T.q3, -0.25, 2.0, -9.4, 1.55, 1.9, -5.6, 66], [T.r5, -0.22, 2.0, -9.35, 1.56, 1.9, -5.58, 65], [DUR, -0.2, 2.0, -9.3, 1.57, 1.9, -5.56, 64]]],
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

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const CELU = { manoD: [-0.14, 0.36, 0.34], codoD: [-0.8, -0.6, -0.1] };
const PULG = { manoI: [0.26, 0.4, 0.44], codoI: [1, -0.7, -0.1] };   // (ronda 1) a la altura del hombro, por delante (antes se metía los dedos en la cara)
const MATE_MANO = { manoI: [0.27, 0.3, 0.3], codoI: [0.9, -0.6, -0.2] };
const SORBO = { manoI: [0.1, 0.42, 0.44], codoI: [0.8, -0.6, 0.0] };   // (ronda 2) la mano debajo de la boca
// Nico
function poseNico(t) {
  const parte2 = t >= P2;
  if (!parte2) {
    if (t < T.p2) {
      const p = poseEn(t, [
        [0, { x: NICO0.x, z: NICO0.z, giro: 0.55, inclina: 0.04, ...aC(0.1, 0.35), ...CARA.neutra, ...BRAZOS.costado, ...CELU, ojos: { x: 0, y: -0.7, abiertos: 0.9 } }],
        [T.n1, { ...aC(0.0, 0.0), ...BUENA, ...PULG }, 0.2],
      ]);
      bocaVoz(p, t, T.n1, ENV.n1, 0.8);
      return p;
    }
    if (t < T.p2b) {
      // camina por el pasillo hacia el rack del aceite, con el celular; mira el cartel (Marta), "¡Vendido!" x2
      const u = 1;
      const x = lerp(NICO0.x, 0.55, eio(u)), z = lerp(NICO0.z, -4.2, eio(u));
      const p = poseEn(t, [
        [0, { ...aC(0, 0.3), ...CARA.sonrisa, ...BRAZOS.costado, ...CELU, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.2 } }],
        [T.mira1, { ...aC(0.5, -0.45), ojos: { x: 0.4, y: 0.6, abiertos: 1, feliz: 0.1 } }, 0.2],
        [T.n2, { ...aC(0.1, 0.0), ...BUENA, ...PULG }, 0.15],
        [T.walter, { ...aC(0, 0.3), ...CARA.sonrisa, manoI: [0.29, -0.08, 0.04], codoI: null, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.25 } }, 0.15],
        [T.n3, { ...aC(-0.1, 0.25), ...BUENA, ...PULG, ojos: { x: 0, y: -0.6, abiertos: 0.95, feliz: 0.45 } }, 0.12],
      ]);
      const uc = 1;
      Object.assign(p, { x, z, giro: uc < 1 ? Math.atan2(0.55 - NICO0.x, -4.2 - NICO0.z) : -0.55, paso: uc > 0 && uc < 1 ? 1 : 0, t, pasoVel: 8 });
      bocaVoz(p, t, T.n2, ENV.n2, 0.8); bocaVoz(p, t, T.n3, ENV.n3, 0.8);
      return p;
    }
    if (t < T.p4) {
      // P2b/P3: espera frente al rack (fuera de cuadro casi todo el plano)
      return { x: -1.6, z: -2.0, giro: 2.2, ...aC(0.2, -0.2), ...CARA.sonrisa, ...BRAZOS.costado, ...CELU, t };
    }
    // P4-P6: en la fila, mirando el pallet (+x); en P5 se gira hacia Rubén y le muestra el celular
    const look = (a) => ({ cabeza: { giro: 0, asiente: a, ladea: 0.02 }, ojos: { x: 0, y: -a * 0.9, abiertos: 0.95 } });
    const p = poseEn(t, [
      [0, { x: N_ROW.x, z: N_ROW.z, giro: Math.PI / 2, inclina: 0.03, ...look(0.4), ...NADA, ...BRAZOS.costado, ...CELU }],
      [T.miran[1], { ...look(-0.5) }, 0.3],
      [T.miran[2], { ...look(0.42) }, 0.3],
      [T.n4, { giro: 0.75, ...aC(-0.35, 0.0), ...CARA.esperanza, manoD: [-0.2, 0.42, 0.24], codoD: [-0.8, -0.5, -0.1] }, 0.25],   // (ronda 2) el celular a 20 cm de Rubén
      [T.gira[0] + 0.3, { ...BRAZOS.costado, ...CELU }, 0.35],
      [T.r2 + 0.4, { ...aC(-0.35, 0.05), ...CARA.incredula }, 0.3],
      [T.n5, { ...aC(0.1, 0.4), ...CARA.sonrisa, ...CELU, ojos: { x: 0, y: -0.7, abiertos: 0.9, feliz: 0.3 } }, 0.25],
      [T.toca + 0.15, { ...aC(0.5, -0.4), ...BUENA, ...PULG }, 0.25],
      [T.r3 + 0.6, { ...aC(-0.4, 0.0), ...CARA.esperanza, manoI: [0.29, -0.08, 0.04], codoI: null }, 0.3],
    ]);
    // el toque del celular (el índice de la izquierda)
    const toq = Math.sin(Math.PI * sg(t, T.toca - 0.08, T.toca + 0.08));
    if (toq > 0) { p.manoI = [0.04, 0.4 - 0.03 * toq, 0.36]; p.codoI = [0.8, -0.6, -0.1]; p.dedoI = 1; }
    p.t = t;
    bocaVoz(p, t, T.n4, ENV.n4, 0.75); bocaVoz(p, t, T.n5, ENV.n5, 0.75);
    return p;
  }
  // ---- parte 2 ----
  if (t < T.q2) {
    const p = poseEn(t, [
      [0, { x: NICO0.x, z: NICO0.z, giro: 0.55, inclina: 0.04, ...aC(0.1, 0.35), ...CARA.neutra, ...BRAZOS.costado, ...CELU, ojos: { x: 0, y: -0.7, abiertos: 0.9 } }],
      [T.n6, { giro: 1.1, ...aC(0.8, -0.5), ...CARA.esperanza }, 0.25],
      [T.r4 + 0.6, { giro: 0.9, ...aC(0.1, 0.4), ...CARA.sonrisa, ojos: { x: 0, y: -0.7, abiertos: 0.95, feliz: 0.3 } }, 0.3],
    ]);
    bocaVoz(p, t, T.n6, ENV.n6, 0.8);
    return p;
  }
  if (t < T.q3) return { x: 0.4, z: 2.5, giro: 1.4, ...aC(0, 0), ...CARA.sonrisa, ...BRAZOS.costado, t };
  // Q3: entra por la derecha, al lado de Rubén
  const u = sg(t, T.q3, T.n8 - 0.1);
  const p = poseEn(t, [[0, { inclina: 0.03, ...aC(-0.3, 0.1), ...CARA.esperanza, ...BRAZOS.costado, ...CELU }], [T.r5 + 0.3, { ...aC(-0.5, 0.1), ...BUENA }, 0.3]]);
  Object.assign(p, { x: lerp(-0.6, 0.65, u), z: lerp(-3.8, -5.3, eo(u)), giro: lerp(2.2, 1.2, u), paso: u > 0 && u < 1 ? 1 : 0, t });
  bocaVoz(p, t, T.n8, ENV.n8, 0.8);
  return p;
}
// Rubén
function poseRuben(t) {
  const parte2 = t >= P2;
  if ((!parte2 && t < T.p4) || (parte2 && t < T.q3)) {
    // en la oficina: sentado, mira el monitor, el mate en la izquierda
    const p = poseEn(t, [
      [0, { x: R_OF.x, y: 3.2, z: R_OF.z, giro: 0, sentado: 0, inclina: 0.1, ...aC(0.5, 0.3), ...NADA, ...MATE_MANO, manoD: [-0.26, 0.3, 0.4], codoD: null }],
      [P2 + 0.01, { ...aC(0.5, 0.3) }, 0.01],
      [T.q1r, { ...aC(0.05, 0.1), ...SECO }, 0.15],
      [T.senala + 0.2, { manoI: [0.12, 0.5, 0.6], codoI: [0.9, -0.3, 0.1], ...aC(0.05, 0.15) }, 0.25],
      [T.r4 + LEN.r4 + 0.2, { ...MATE_MANO }, 0.3],
      [T.q2b + 0.15, { manoD: [-0.1, 0.4, 0.55], codoD: [-0.8, -0.5, 0.0] }, 0.2],
    ]);
    bocaVoz(p, t, T.r1, ENV.r1, 0.55); bocaVoz(p, t, T.r4, ENV.r4, 0.55);
    p.t = t; return p;
  }
  if (!parte2) {
    // P4-P6: abajo, en la fila, el mate en la izquierda
    const look = (a, g = 0) => ({ cabeza: { giro: g, asiente: a, ladea: 0.02 }, ojos: { x: g * 0.6, y: -a * 0.9, abiertos: 0.85 } });
    const p = poseEn(t, [
      [0, { x: R_ROW.x, z: R_ROW.z, giro: Math.PI / 2, inclina: 0.05, ...look(0.42), ...NADA, ...MATE_MANO, ...BRAZOS.costado, manoD: [-0.29, -0.08, 0.04], ...MATE_MANO }],
      [T.miran[1] + 0.08, { ...look(-0.5) }, 0.32],
      [T.miran[2] + 0.1, { ...look(0.42) }, 0.32],
      [T.gira[1], { ...look(0.05, 0.5), ...SECO }, T.gira[1] - T.gira[0]],
      [T.seVa[1], { ...look(0.15, 0.6) }, 0.3],
      [T.mira37, { ...look(-0.5, 0.15) }, 0.25],
      [T.miraPal, { ...look(0.42, 0.1) }, 0.25],
      [T.r3 + 0.9, { ...look(0.05, 0.45) }, 0.3],
      [T.sorbo1 + 0.2, { ...SORBO, ...look(-0.1, 0.4) }, 0.25],
    ]);
    p.t = t;
    bocaVoz(p, t, T.r2, ENV.r2, 0.55); bocaVoz(p, t, T.r3, ENV.r3, 0.55);
    return p;
  }
  // Q3: frente al pallet nuevo: saca una caja, la vuelve a poner; "Los que dice."; mate
  const p = poseEn(t, [
    [0, { x: 1.9, z: -4.45, giro: Math.PI - 0.25, inclina: 0.05, ...aC(0, 0.3), ...NADA, ...MATE_MANO, manoD: [-0.29, -0.08, 0.04], codoD: null }],
    [T.saca[0], { manoD: [-0.2, 0.5, 0.5], codoD: [-0.8, -0.4, 0.1], inclina: 0.15, ...aC(0, 0.25) }, 0.15],
    [T.saca[1], { manoD: [-0.2, 0.62, 0.3], inclina: 0.05, ...aC(0.1, -0.45), ...CARA.incredula }, 0.25],
    [T.pone[1], { manoD: [-0.2, 0.5, 0.5], inclina: 0.15, ...aC(0, 0.25) }, 0.25],
    [T.n8 + 0.2, { manoD: [-0.29, -0.08, 0.04], codoD: null, inclina: 0.05, ...aC(0.1, -0.45), ...NADA }, 0.3],
    [T.r5, { ...aC(0.45, 0.05), ...SECO }, 0.3],
    [T.sorbo2 + 0.2, { ...SORBO, ...aC(0.2, -0.05) }, 0.3],
  ]);
  p.t = t;
  bocaVoz(p, t, T.r5, ENV.r5, 0.55);
  return p;
}
// el operario: con la zorra (P3), en la fila (P4-P5), carga las cajas y se va (P6); escanea capas (Q2); maneja el
// autoelevador (Q2c)
function poseOperario(t) {
  const parte2 = t >= P2;
  if (!parte2) {
    if (t < T.p3) return null;
    if (t < T.p4) {
      const u = sg(t, T.zorra[0], T.zorra[1]);
      return { x: lerp(-2.0, ZORRA.x, eo(u)), z: lerp(-11.8, ZORRA.z + 0.7, eo(u)), giro: 0.15, paso: u < 1 ? 1 : 0, inclina: 0.05, ...aC(0, 0), ...CARA.neutra, manoI: [0.2, 0.1, -0.3], manoD: [-0.29, -0.08, 0.04], t };
    }
    const look = (a) => ({ cabeza: { giro: 0, asiente: a, ladea: 0.02 }, ojos: { x: 0, y: -a * 0.9, abiertos: 0.9 } });
    if (t < T.p6) {
      const p = poseEn(t, [[0, { x: O_ROW.x, z: O_ROW.z, giro: Math.PI / 2, ...look(0.42), ...CARA.neutra, ...BRAZOS.costado }], [T.miran[1] - 0.05, { ...look(-0.5) }, 0.3], [T.miran[2] - 0.05, { ...look(0.42) }, 0.3]]);
      p.t = t; return p;
    }
    // P6: pasa las tres cajas a la zorra y se va tirando de ella
    if (t < T.seVa[0]) {
      const ap = T.cajas.reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.05, b + 0.2))), 0);
      return { x: 1.7, z: -6.55, giro: Math.PI / 2 + 0.75, inclina: 0.1 + 0.3 * ap, ...aC(0, 0.35), ...CARA.concentrada, manoI: [0.2, 0.25 + 0.2 * ap, 0.45], manoD: [-0.2, 0.25 + 0.2 * ap, 0.45], codoI: null, codoD: null, t };
    }
    const u = sg(t, T.seVa[0], T.seVa[1]);
    return { x: ZORRA.x, z: ZORRA.z + 0.7 - 6 * ei(u) * 0, giro: Math.PI, paso: 1, ...aC(0, 0), ...CARA.neutra, manoI: [0.2, 0.1, -0.3], manoD: [-0.29, -0.08, 0.04], t, _u: u };
  }
  if (t >= T.q2 && t < T.q2c) {
    // escanea cada capa con el celular (bip) y la pasa a la zorra
    const ap = T.capas.reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.1, b + 0.15))), 0);
    return { x: 1.75, z: -4.3, giro: Math.PI - 0.55, inclina: 0.05, ...aC(-0.2, 0.25), ...CARA.concentrada, manoD: [-0.1, 0.45 + 0.1 * ap, 0.45], codoD: [-0.8, -0.5, 0], manoI: [0.25, 0.3 + 0.2 * ap, 0.4], codoI: null, t };
  }
  return null;
}

// ================= ESTADOS DE LOS OBJETOS =================
function ponerZorra(t) {
  const parte2 = t >= P2;
  zorra.visible = false;
  if (!parte2 && t >= T.p3) {
    zorra.visible = true;
    let z = ZORRA.z, x = ZORRA.x;
    if (t < T.p4) { const u = sg(t, T.zorra[0], T.zorra[1]); x = lerp(-2.0, ZORRA.x, eo(u)); z = lerp(-12.5, ZORRA.z, eo(u)); }
    if (t >= T.seVa[0]) z = ZORRA.z - 0 + 4.5 * ei(sg(t, T.seVa[0], T.seVa[1])) * 0 - 5 * ei(sg(t, T.seVa[0], T.seVa[1] + 0.6));
    zorra.position.set(x, 0, z); zorra.rotation.y = Math.PI;
  }
  if (parte2 && t >= T.q2 && t < T.q2c) { zorra.visible = true; zorra.position.set(0.95, 0, -6.15); zorra.rotation.y = Math.PI; }
}
function ponerCajas(t) {
  const parte2 = t >= P2;
  // las tres cajas: en el pallet hasta P6; el operario las pasa a la zorra y se van con ella
  zorra.updateMatrixWorld(true);
  TRES.forEach((c, i) => {
    c.visible = !parte2;
    if (parte2) return;
    const b = c.userData.base, tc = T.cajas[i];
    if (t < tc) { c.position.copy(b); c.rotation.set(...c.userData.rot); return; }
    const dest = zorra.localToWorld(V3(i === 2 ? 0.0 : (i ? 0.13 : -0.13), ZORRA_TOPE + CAJA_A.y / 2 + (i === 2 ? CAJA_A.y : 0), 0.62));
    // (ronda 2) el operario la agarra del pallet (a sus manos) y la deja en la zorra
    const ma = manoMundo(operario, "I", V3()).add(manoMundo(operario, "D", V3())).multiplyScalar(0.5).add(V3(0, -0.05, 0));
    const u1 = eio(sg(t, tc, tc + 0.16)), u2 = eio(sg(t, tc + 0.16, tc + 0.34));
    if (u2 <= 0) c.position.set(lerp(b.x, ma.x, u1), lerp(b.y, ma.y, u1), lerp(b.z, ma.z, u1));
    else c.position.set(lerp(ma.x, dest.x, u2), lerp(ma.y, dest.y, u2) + Math.sin(Math.PI * u2) * 0.12, lerp(ma.z, dest.z, u2));
    const u = Math.max(u1 * 0.5, 0.5 + u2 * 0.5);
    c.rotation.set(0, lerp(c.userData.rot[1], Math.PI / 2, u), c.userData.rot[2] * (1 - u));
  });
  palletAce.visible = !parte2 || t < T.q2c;
  // el pallet lleno de la parte 2 (Q1-Q2): cada capa que se escanea vuela a la zorra
  palletLleno.visible = parte2 && t < T.q2c;
  const { capas, film } = palletLleno.userData;
  film.visible = t < T.capas[0];
  const tiempos = [...T.capas];
  capas.forEach((cg, L) => {
    const k = 3 - L;   // la de arriba se va primero
    cg.position.set(0, 0.15 + CAJA_A.y / 2 + L * CAJA_A.y, 0); cg.rotation.set(0, 0, 0); cg.visible = true;
    if (k < 3 && t >= tiempos[k]) {
      const u = eio(sg(t, tiempos[k], tiempos[k] + 0.3));
      palletLleno.updateMatrixWorld(true);
      const dest = zorra.localToWorld(V3(0, ZORRA_TOPE + CAJA_A.y / 2 + k * CAJA_A.y, 0.62)), loc = palletLleno.worldToLocal(dest.clone());
      cg.position.set(lerp(0, loc.x, u), lerp(cg.position.y, loc.y, u) + Math.sin(Math.PI * u) * 0.4, lerp(0, loc.z, u));
    }
    if (k === 3 && t >= T.capa4) cg.visible = false;
  });
  // el pallet nuevo (Q2c en las horquillas, Q3 en la bahía); Rubén saca una caja y la vuelve a poner
  palletNuevo.visible = parte2 && t >= T.q2c;
  if (palletNuevo.visible) {
    const u = sg(t, T.elev[0], T.elev[1]);
    if (u < 1) {
      const c = elev.userData.carro; elev.updateMatrixWorld(true); c.updateMatrixWorld(true);
      palletNuevo.position.copy(c.localToWorld(V3(0, 0.03, 0.62))); palletNuevo.rotation.set(0, elev.rotation.y - Math.PI / 2, 0);
    } else { palletNuevo.position.set(ACE.x, 0, ACE.z); palletNuevo.rotation.set(0, 0, 0); }
    const caja1 = palletNuevo.userData.capas[3].children[4];   // arriba, del lado del pasillo, al medio
    caja1.position.set(-0.245, 0, 0.484); caja1.rotation.set(0, 0, 0);
    if (t >= T.saca[0] && t < T.pone[1] + 0.05) {
      const ida = eio(sg(t, T.saca[0], T.saca[1])), vuelta = eio(sg(t, T.pone[0], T.pone[1]));
      const k = ida * (1 - vuelta);
      // (ronda 1) pegada a la mano derecha de Rubén
      const capa = palletNuevo.userData.capas[3]; palletNuevo.updateMatrixWorld(true);
      const m = manoMundo(ruben, "D", _b).add(V3(0, -0.12, 0)), loc = capa.worldToLocal(m.clone());
      caja1.position.set(lerp(-0.245, loc.x, k), lerp(0, loc.y, k), lerp(0.484, loc.z, k)); caja1.rotation.set(0, 0.6 * k, 0.1 * k);
    }
  }
}
function ponerElev(t) {
  elev.visible = t >= T.q2c && t < T.q3;
  if (!elev.visible) return;
  const u = sg(t, T.q2c, T.elev[1]);
  const xf = ACE.x - 1.62;
  elev.position.set(lerp(xf - 4.2, xf, eo(sg(u, 0, 0.72))), 0, ACE.z); elev.rotation.set(0, Math.PI / 2, 0);
  elev.userData.carro.position.y = claves(t, [[T.elev[0], 0.85], [T.elev[1] - 0.22, 0.85], [T.elev[1], 0.06]]);
  elev.userData.baliza.rotation.y = t * 8;
  elev.updateMatrixWorld(true);
}
function ponerCamion(t) {
  const parte2 = t >= P2;
  camion.visible = false;   // (ronda 1) no se veía desde el pasillo: fuera (y sin sus SFX)
  const u = 1;
  camion.position.set(CAMX, 0, ZF - 0.25 - 7 * (1 - u));
}
function ponerPaloma(t) {
  paloma.visible = false;   // (ronda 2) se leía como un bulto caminando sobre el larguero: queda solo el aleteo
  if (!paloma.visible) return;
  const u = sg(t, T.paloma[0], T.paloma[1]);
  // cruza el galpón por arriba de la fila, de la izquierda a la derecha del cuadro de P4 (de -z a ... ver PLANOS)
  paloma.position.set(lerp(0.9, 1.1, u), 2.62 + Math.sin(u * Math.PI) * 0.1, lerp(-3.6, -8.0, u));
  paloma.rotation.set(0.05, Math.PI + 0.12, Math.sin(t * 9) * 0.05);
  const ala = Math.sin(t * 2 * Math.PI * 6.5);
  for (const { piv, s } of alasP) piv.rotation.z = s * (0.25 + ala * 0.75);
}

// ================= RENDER =================
const ARRANQUE_LIMPIO = LIMPIO;
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  ponerSol(0.5, -5.5);
  dibujarCeluN(t); dibujarMonitor(t); dibujarInsertos(t);
  ponerCartel(t);
  ponerZorra(t); ponerElev(t); ponerCamion(t); ponerPaloma(t);
  // ---- personajes ----
  nico.raiz.visible = true; ruben.raiz.visible = true;
  const pn = poseNico(t); nico.poner(pn);
  const pr = poseRuben(t); ruben.poner(pr);
  const po = poseOperario(t);
  operario.raiz.visible = !!po || (parte2 && t >= T.q2c && t < T.q3);
  if (po) { if (operario.raiz.parent !== scene) scene.add(operario.raiz); operario.poner(po); }
  if (parte2 && t >= T.q2c && t < T.q3) {
    // maneja el autoelevador
    if (operario.raiz.parent !== elev) elev.add(operario.raiz);
    operario.poner({ x: 0, y: 0.55, z: -0.15, giro: 0, sentado: 1, ...aC(0, 0.1), ...CARA.concentrada, manoI: [0.14, 0.39, 0.47], manoD: [-0.14, 0.39, 0.47], codoI: [0.8, -0.7, -0.1], codoD: [-0.8, -0.7, -0.1], t });
  }
  if (!parte2 && t >= T.seVa[0] && po) { const u = po._u; operario.raiz.position.z = ZORRA.z + 0.7 - 5 * ei(sg(t, T.seVa[0], T.seVa[1] + 0.6)) + 0.0; operario.raiz.position.x = ZORRA.x; }
  ponerCajas(t);
  PULGAR.forEach((p, i) => (p.visible = i === 0 && !parte2 && (en(t, T.n1 - 0.1, T.p2b) && (en(t, T.n1 - 0.1, T.marta) || en(t, T.n2 - 0.1, T.walter) || en(t, T.n3 - 0.1, T.p2b)) || en(t, T.toca + 0.1, T.r3 + 0.5))));
  // el celular de Nico en la mano derecha
  const celVis = (!parte2 && (t < T.p2b || t >= T.p4)) || (parte2 && (t < T.q2 || t >= T.q3));
  celuN.visible = celVis;
  if (celVis) {
    const m = manoMundo(nico, "D", _a);
    celuN.position.copy(m).add(V3(0, 0.08, 0));
    celuN.rotation.set(-0.45, nico.raiz.rotation.y - 0.2, 0);
  }
  const celuPos = celuN.visible ? celuN.position.clone() : V3(0.95, 1.2, -4.0);
  ponerRemitos(t, celuPos);
  if (["P4", "P5", "P6", "P6b", "P6c", "P6d"].includes(planoActual)) REMITOS.forEach((g) => (g.visible = false));   // desde atrás del rack el dorso blanco se leía como una placa gris
  // el mate: en la mano izquierda de Rubén (en la oficina y abajo)
  mateR.visible = true;
  {
    // (ronda 2) al tomar: la punta de la bombilla en la comisura, la calabaza debajo del bigote inclinada ~30° hacia
    // afuera (antes la calabaza tapaba la nariz y la bombilla cruzaba el ojo)
    const m = manoMundo(ruben, "I", _a), yaw = ruben.raiz.rotation.y + Math.PI / 2;   // la bombilla (que se inclina a +x local) hacia la cara
    const so = eio(!parte2 ? sg(t, T.sorbo1 - 0.05, T.sorbo1 + 0.2) * (1 - sg(t, T.sorbo1 + 0.5, T.sorbo1 + 0.65)) : sg(t, T.sorbo2 - 0.05, T.sorbo2 + 0.2));
    mateR.rotation.set(0, yaw, 0.4 * so);
    mateR.position.copy(m).add(V3(0, -0.07, 0));
    if (so > 0) {
      ruben.raiz.updateMatrixWorld(true);
      const boca = ruben.cabeza.localToWorld(V3(0.05, 0.17, 0.3));
      mateR.updateMatrixWorld(true);
      const punta = V3(0.075, 0.305, 0).multiplyScalar(1.15).applyEuler(mateR.rotation);   // la punta real de la bombilla
      mateR.position.lerp(boca.sub(punta), so);
    }
  }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  else if (planoActual === "P2") {
    // travelling al costado de Nico: el cartel siempre arriba en cuadro
    nico.raiz.updateMatrixWorld(true);
    const u = eio(sg(t, T.p2, T.p2b));
    ponerCam([lerp(-1.45, -1.25, u), 1.5, lerp(-0.4, -0.95, u), lerp(1.75, 1.9, u), 2.3, -5.5, 50], t);
  }
  INS_CEL.g.visible = planoActual === "Q1b"; INS_MON.g.visible = planoActual === "Q2b";
  if (planoActual === "Q1b" || planoActual === "Q2b") {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t);
    const k = sg(t, pl[1], pl[1] + 0.8), kk = halfK(), I = planoActual === "Q1b" ? INS_CEL.g : INS_MON.g;
    I.position.set(0, 0, -1); I.scale.setScalar(kk * PXK * lerp(1.0, 1.04, k));
    for (const p of TODOS) p.raiz.visible = false;
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo ----
  for (const k in GL) GL[k].visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.1, tf));
    const nb = () => bocaPx(nico), rb = () => bocaPx(ruben);
    const celPx = () => { celuN.updateMatrixWorld(true); return enPantalla(celuN.position); };
    const pa = planoActual;
    if (pa === "P1") {
      const [bx, by] = nb();
      if (t < T.n1) ponerGlobo(GL.pre, bx + 120, by - 380, sale(T.n1), [bx, by - 60]);
      else ponerGlobo(GL.n1, bx - 260, by - 480, ent(T.n1), [bx - 140, by - 150]);
    }
    if (pa === "P2") {
      const [bx, by] = nb(), [cx, cy] = celPx();
      if (en(t, T.marta, T.walter)) ponerGlobo(GL.marta, 740, 1700, ent(T.marta), [cx, cy]);
      if (en(t, T.n2, T.walter)) ponerGlobo(GL.n2, bx - 270, by - 460, ent(T.n2), [bx - 140, by - 150], 1);
      if (en(t, T.walter, T.p2b)) ponerGlobo(GL.walter, 740, 1700, ent(T.walter), [cx, cy]);   // (ronda 2) abajo a la derecha: no tapa la boca de Nico
      if (en(t, T.n3, T.p2b)) ponerGlobo(GL.n3, bx - 270, by - 460, ent(T.n3), [bx - 140, by - 150], 1);
    }
    if (pa === "P5") {
      const [bx, by] = nb(), [rx, ry] = rb();
      if (t < T.r2) ponerGlobo(GL.n4, 560, 330, ent(T.n4), [bx, by - 30]);   // (ronda 1) corte seco (sin fantasma)
      if (t >= T.r2) ponerGlobo(GL.r2, 560, 330, ent(T.r2), [rx, ry - 30]);
    }
    if (pa === "P6") {
      const [bx, by] = nb(), [rx, ry] = rb();
      if (en(t, T.n5, T.p6b)) ponerGlobo(GL.n5, bx + 200, by - 300, ent(T.n5), [bx + 60, by - 120]);
    }
    if (pa === "P6c") { const [rx, ry] = rb(); if (t >= T.r3) ponerGlobo(GL.r3a, rx - 230, ry - 330, ent(T.r3), [rx - 60, ry - 110]); }
    if (pa === "P6d") {
      const [rx, ry] = rb();
      ponerGlobo(GL.r3, 560, 330, 1, [rx, ry - 30]);
    }
    if (pa === "Q1") {
      const [bx, by] = nb(), [cx, cy] = celPx(), [rx, ry] = rb();
      ponerGlobo(GL.gra, 780, 1560, ent(P2 + 0.05), [cx, cy]);
      if (t >= T.n6) ponerGlobo(GL.n6, 560, 1150, ent(T.n6), [bx + 40, by - 60], 1);
    }
    if (pa === "Q1r") { const [rx, ry] = rb(); ponerGlobo(GL.r4, 560, 315, ent(T.r4), [rx, ry - 45]); }
    if (pa === "Q1b" && t >= T.n7) ponerGlobo(GL.n7, 540, 260, ent(T.n7), null);
    if (pa === "Q3") {
      const [bx, by] = nb(), [rx, ry] = rb();
      if (en(t, T.n8, T.r5)) ponerGlobo(GL.n8, bx - 230, by - 290, ent(T.n8), [bx - 60, by - 90]);
      if (t >= T.r5) ponerGlobo(GL.r5, rx - 60, ry - 285, ent(T.r5), [rx, ry - 120]);
    }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t, q) => { renderAt(t); return { ruben: bocaPx(ruben), nico: bocaPx(nico) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
