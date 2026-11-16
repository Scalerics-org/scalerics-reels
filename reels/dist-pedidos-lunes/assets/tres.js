// Capa 3D de dist-pedidos-lunes (Three.js r170 local). Base técnica: reels/dice-cuarenta y reels/la-lista (globos de
// diálogo pegados a la cámara en píxeles de pantalla, avatares por render target, poses por claves, bocas por
// envolvente, PLANOS con Catmull-Rom, fusionar()). renderAt(t) es una función pura del tiempo del timeline (hf-seek):
// nada de rAF, Date.now ni azar sin semilla.
// Cuatro lugares en el mismo mundo, lejos uno del otro:
//   LA OFICINA DE RUBÉN (alrededor del origen, arriba del depósito): piso y = 3,2, z de 0 a 6,2. Rubén se sienta de
//     espaldas a la pared del fondo (z = 0) mirando a +z (a la cámara); el escritorio delante. La pared del fondo es
//     vidrio a la izquierda del cuadro (x < -0,15: se ve el depósito) y crema a la derecha, con el RELOJ DE PARED grande
//     y la puerta de vidrio esmerilado (Nico). La ventana lateral (x = 3,6) tiene la persiana: franjas de luz planas en
//     la pared y el escritorio. En cámara (mirando a -z) la derecha de la pantalla es +x.
//   EL DEPÓSITO (abajo, y = 0, z de -16 a 0): racks, el pallet WALTER, el operario con la zorra y la tablet, el camión
//     en el portón del fondo.
//   LA ROTISERÍA DE GRACIELA (x = RX) · LA CAFETERÍA DE MARTA (x = CX).
//   PARTE 1 (lunes 8:00 → 11:00): el audio de 4:12 · la foto de la lista (¿un siete o una mosca?) · la ráfaga y las tres
//            horas (reloj, persiana, termo, planilla) · "¿Y mi pedido?" · el mensaje de las 8:04 · "39 de 40" · "Lo de
//            siempre era yo." · "cambié todo" · el mate lavado
//   PARTE 2 (otro lunes, 8:00 → 8:05): el catálogo de Graciela (Repetir lo de siempre) · el 7 de Marta · el panel (40 de
//            40 ✓) · Mandar a armar · el pallet WALTER · "Ocho y cinco." · "¿Vender?" · Rubén a cámara
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, poseEn, CARA, BRAZOS, pegarACamara, crearMate, crearTermo, crearCelular, crearReloj, crearVapor, crearMochila } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
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
const r2 = (n) => Math.round(n * 100) / 100;
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
renderer.shadowMap.type = THREE.PCFShadowMap;   // (la-lista: PCFSoft es mucho más caro en SwiftShader)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16243d);
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 140);
camera.layers.enable(1);
scene.add(camera);
scene.environment = null;   // (la-lista: sin PMREM, carísimo en SwiftShader; lo reemplazan las hemisféricas)

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, celeste: 0xb9cde0 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.1, depthWrite: false }),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const caja = (w, h, d, m, x, y, z, r = 0.02) => mesh(rbox(w, h, d, r, 2), m, x, y, z);
const cajaS = (w, h, d, m, x, y, z) => mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z);
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const CAV = (s, w = 700) => `${w} ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
// (la-lista) que se lea celular: bisel navy alrededor de la pantalla y la cámara en el dorso
function marcoCel(cel, W = 0.082, H = 0.162) {
  cel.userData.pantalla.scale.set(0.92, 0.95, 1);
  const b = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.002, H - 0.002), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); b.position.z = 0.0066; cel.add(b);
  const cam = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.024, 0.004), new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.4 })); cam.position.set(-W / 2 + 0.018, H / 2 - 0.02, -0.0085); cel.add(cam);
  return cel;
}
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
// EL DEPÓSITO (de día): piso gris-crema, paredes navy claro, racks, el portón del fondo con el camión
// =====================================================================================================
const DEP = new THREE.Group(); scene.add(DEP);
const DX0 = -10, DX1 = 10, DZ0 = -16, DZ1 = 0, DH = 8.5;
const OFI = { x0: -3.6, x1: 3.6, z0: 0, z1: 6.2, piso: 3.2, alto: 2.8 };
const MESA_Y = OFI.piso + 0.76;
{
  const piso = mesh(new THREE.PlaneGeometry(DX1 - DX0 + 2, DZ1 - DZ0 + 2), mat(0xc4c0b0, 0.9), 0, 0, (DZ0 + DZ1) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  const linea = (x, z, w, d) => { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0xf2efe2, 0.85), x, 0.006, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); };
  for (const x of [-2.9, 2.9]) linea(x, -8, 0.12, 15);
  const paredM = mat(0x34507a, 0.92);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.3), paredM, x, y, z); p.rotation.y = ry; p.castShadow = false; DEP.add(p); };
  for (const x of [DX0 - 0.15, DX1 + 0.15]) pared(DZ1 + OFI.z1 - DZ0 + 0.3, DH, x, DH / 2, (DZ0 + DZ1 + OFI.z1) / 2, Math.PI / 2);
  pared(DX1 - DX0, DH, 0, DH / 2, OFI.z1 + 0.15, 0);
  // el fondo: la pared con el portón abierto (x -2,2..2,2, hasta 4,6 de alto)
  pared(DX1 - 2.2, DH, (DX1 + 2.2) / 2, DH / 2, DZ0 - 0.15, 0); pared(-2.2 - DX0, DH, (DX0 - 2.2) / 2, DH / 2, DZ0 - 0.15, 0);
  pared(4.4, DH - 4.6, 0, 4.6 + (DH - 4.6) / 2, DZ0 - 0.15, 0);
  DEP.add(caja(0.3, 4.7, 0.4, M.navy3, -2.3, 2.35, DZ0)); DEP.add(caja(0.3, 4.7, 0.4, M.navy3, 2.3, 2.35, DZ0)); DEP.add(caja(4.9, 0.35, 0.4, M.navy3, 0, 4.65, DZ0));
  // afuera: el patio de maniobras de día
  const afuera = mesh(new THREE.PlaneGeometry(30, 14), new THREE.MeshBasicMaterial({ color: 0xe8edf0 }), 0, 6, DZ0 - 14); afuera.castShadow = false; DEP.add(afuera);
  const patio = mesh(new THREE.PlaneGeometry(20, 14), mat(0xb7b3a6, 0.9), 0, 0.0, DZ0 - 7); patio.rotation.x = -Math.PI / 2; DEP.add(patio);
  // techo con claraboyas y cerchas
  const techo = mesh(new THREE.BoxGeometry(DX1 - DX0 + 0.6, 0.2, DZ1 + OFI.z1 - DZ0 + 0.6), mat(0x4a5b78, 0.95), 0, DH + 0.1, (DZ0 + DZ1 + OFI.z1) / 2); techo.castShadow = false; DEP.add(techo);
  for (let z = -14; z < 0; z += 4) for (const x of [-5, 0, 5]) { const c = mesh(new THREE.PlaneGeometry(2.6, 1.3), new THREE.MeshBasicMaterial({ color: 0xf2f4ee }), x, DH - 0.01, z); c.rotation.x = Math.PI / 2; c.castShadow = false; DEP.add(c); }
}
// ---- racks selectivos: parantes navy3, largueros verdes, 4 niveles con pallets ----
function crearPallet() {
  const g = new THREE.Group(), m = M.madera, mo = mat(0xb89a6c, 0.8);
  for (let i = 0; i < 5; i++) g.add(cajaS(1.2, 0.025, 0.14, m, 0, 0.135, -0.43 + i * 0.215));
  for (const z of [-0.43, 0, 0.43]) g.add(cajaS(1.2, 0.025, 0.14, mo, 0, 0.0125, z));
  for (const x of [-0.52, 0, 0.52]) for (const z of [-0.43, 0, 0.43]) g.add(cajaS(0.14, 0.1, 0.14, mo, x, 0.075, z));
  return g;
}
const bolsaT = lienzo(256, 320, (x, w, h) => { x.fillStyle = "#dcd9c8"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.fillRect(0, h * 0.34, w, h * 0.3); x.fillStyle = "#5ce611"; x.fillRect(0, h * 0.86, w, h * 0.05); });
function cargaPallet(g, tipo) {
  const p = crearPallet(); g.add(p);
  if (tipo === 0) for (let i = 0; i < 4; i++) for (let k = 0; k < 2; k++) g.add(cajaS(0.55, 0.42, 0.42, mat(k % 2 ? C.kraft : 0xbf9a62, 0.85), -0.29 + (i % 2) * 0.58, 0.36 + k * 0.43, -0.22 + Math.floor(i / 2) * 0.44));
  else if (tipo === 1) { const fm = new THREE.MeshStandardMaterial({ map: bolsaT, roughness: 0.9 }), pm = mat(0xdcd9c8, 0.9); for (let k = 0; k < 4; k++) for (let i = 0; i < 2; i++) g.add(mesh(new THREE.BoxGeometry(0.5, 0.16, 0.36), [pm, pm, fm, pm, pm, pm], -0.27 + i * 0.54, 0.23 + k * 0.16, 0)); }
  else if (tipo === 2) { const fm = mat(0x7fc46a, 0.25); for (let k = 0; k < 2; k++) g.add(cajaS(1.1, 0.42, 0.85, fm, 0, 0.36 + k * 0.43, 0)); }
  else { for (let i = 0; i < 6; i++) g.add(cajaS(0.36, 0.34, 0.4, mat(C.kraft, 0.85), -0.38 + (i % 3) * 0.38, 0.32, -0.2 + Math.floor(i / 3) * 0.42)); g.add(cajaS(1.1, 0.02, 0.8, mat(C.cr, 0.8), 0, 0.5, 0)); }
  return g;
}
function crearRack(largo, bahias) {
  const g = new THREE.Group();
  const bw = largo / bahias, niveles = [0.0, 1.55, 3.1, 4.65];
  const par = mat(C.navy3, 0.55);
  for (let i = 0; i <= bahias; i++) for (const z of [-0.5, 0.5]) g.add(cajaS(0.1, 6.2, 0.1, par, -largo / 2 + i * bw, 3.1, z));
  for (const y of niveles.slice(1)) for (const z of [-0.52, 0.52]) g.add(cajaS(largo, 0.14, 0.07, M.g, 0, y, z));
  for (let i = 0; i < bahias; i++) for (let n = 0; n < 4; n++) {
    if (az() < 0.1) continue;
    const pg = new THREE.Group(); pg.position.set(-largo / 2 + (i + 0.5) * bw, niveles[n] + (n ? 0.07 : 0), 0); pg.rotation.y = Math.PI / 2;
    cargaPallet(pg, Math.floor(az() * 4)); g.add(pg);
  }
  return g;
}
semilla = 5;
for (const x of [-7.6, -4.6, 4.6, 7.6]) { const r = crearRack(12, 8); r.rotation.y = Math.PI / 2; r.position.set(x, 0, -8.5); DEP.add(r); }
for (const [x, z, tp] of [[2.6, -11.5, 3], [3.2, -4.0, 1], [-2.9, -12.8, 0]]) { const p = new THREE.Group(); p.position.set(x, 0, z); cargaPallet(p, tp); DEP.add(p); }
// campanas de luz (planas, prendidas)
for (const [x, z] of [[-2.5, -4], [2.5, -4], [-2.5, -11], [2.5, -11]]) {
  const g = new THREE.Group(); g.position.set(x, 7.0, z); DEP.add(g);
  g.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 6), M.navy3, 0, 0.7, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.16, 0.62, 0.5, 24, 1, true), mat(C.navy3, 0.5, { side: THREE.DoubleSide })));
  const foco = new THREE.Mesh(new THREE.CircleGeometry(0.56, 24), new THREE.MeshBasicMaterial({ color: 0xfff1d6, toneMapped: false })); foco.rotation.x = Math.PI / 2; foco.position.y = -0.24; g.add(foco);
}
// la escalera metálica que baja de la oficina (al costado izquierdo, pegada a la pared del vidrio)
{
  const n = 12, ez = -0.6;
  for (let i = 0; i < n; i++) DEP.add(caja(0.95, 0.06, 0.3, mat(0x8a8e98, 0.5, { metalness: 0.4 }), -3.0, OFI.piso - (i + 1) * (OFI.piso / n) + 0.05, ez - (i + 1) * 0.28 + 0.1));
  const L = Math.hypot(OFI.piso, n * 0.28), ang = Math.atan2(OFI.piso, n * 0.28);
  for (const dx of [-0.5, 0.5]) { const l = caja(0.06, 0.1, L, M.navy3, -3.0 + dx, OFI.piso / 2 + 0.06, ez - n * 0.14); l.rotation.x = -ang; DEP.add(l); }
  for (const dx of [-0.5, 0.5]) { const l = caja(0.05, 0.05, L, M.g, -3.0 + dx, OFI.piso / 2 + 0.95, ez - n * 0.14); l.rotation.x = -ang; DEP.add(l); }
}
// la losa de la oficina vista desde abajo (sobre columnas)
DEP.add(caja(OFI.x1 - OFI.x0 + 0.4, 0.3, OFI.z1 - OFI.z0 + 0.4, M.navy3, 0, OFI.piso - 0.15, (OFI.z0 + OFI.z1) / 2));
for (const x of [OFI.x0, 0, OFI.x1]) DEP.add(caja(0.28, OFI.piso - 0.3, 0.28, M.navy3, x, (OFI.piso - 0.3) / 2, 0.2));
// el balcón de la oficina con la baranda (delante del vidrio, del lado del depósito)
DEP.add(caja(OFI.x1 - OFI.x0, 0.12, 1.0, M.navy3, 0, OFI.piso - 0.06, -0.5));
for (let x = OFI.x0 + 0.05; x <= OFI.x1; x += 0.9) DEP.add(caja(0.05, 0.95, 0.05, M.navy3, x, OFI.piso + 0.47, -0.97));
DEP.add(caja(OFI.x1 - OFI.x0, 0.06, 0.08, M.g, 0, OFI.piso + 0.95, -0.97));

// ---- el camión de reparto (de ya-lo-cargo/dice-cuarenta): cabina navy3, caja crema con franja verde, puertas abiertas ----
const CAJA_C = { L: 6.0, W: 2.5, H: 2.6, piso: 1.2 };
function crearCamion() {
  const g = new THREE.Group(), cue = mat(C.cr, 0.55), fr = M.navy3;
  const { L, W: CW, H, piso } = CAJA_C;
  g.add(caja(CW, 0.12, L, M.navy3, 0, piso - 0.06, L / 2));
  g.add(caja(0.08, H, L, cue, -CW / 2 + 0.04, piso + H / 2, L / 2, 0.02)); g.add(caja(0.08, H, L, cue, CW / 2 - 0.04, piso + H / 2, L / 2, 0.02));
  g.add(caja(CW, 0.08, L, cue, 0, piso + H - 0.04, L / 2, 0.02)); g.add(caja(CW, H, 0.08, cue, 0, piso + H / 2, L - 0.04, 0.02));
  for (const s of [-1, 1]) g.add(caja(0.02, 0.32, L - 0.2, M.g, s * (CW / 2 + 0.005), piso + H * 0.5, L / 2, 0.01));
  g.add(caja(CW + 0.06, 0.12, 0.12, fr, 0, piso + H, 0.02, 0.02)); for (const s of [-1, 1]) g.add(caja(0.12, H + 0.1, 0.12, fr, s * CW / 2, piso + H / 2, 0.02, 0.02));
  g.add(caja(CW + 0.1, 0.18, 0.2, M.navy, 0, piso - 0.2, 0.0, 0.03));
  for (const s of [-1, 1]) { const p = new THREE.Group(); p.position.set(s * CW / 2, piso, -0.04); p.rotation.y = s * -(Math.PI * 0.92); g.add(p); p.add(caja(CW / 2 - 0.02, H - 0.04, 0.06, cue, -s * (CW / 4), H / 2, -0.03, 0.02)); p.add(caja(CW / 2 - 0.1, 0.12, 0.02, M.g, -s * (CW / 4), H * 0.5, -0.065, 0.01)); }
  g.add(caja(CW, 2.3, 1.9, M.navy3, 0, 1.55, L + 1.1, 0.18));
  for (const s of [-1, 1]) for (const z of [1.0, 2.3, L + 1.2]) g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 22), M.goma, s * (CW / 2 - 0.2), 0.5, z).rotateZ(Math.PI / 2));
  // la carga: medio vacío en la parte 1 (dos pallets al fondo), cargándose en la 2 (cuatro)
  const carga = [];
  for (let i = 0; i < 4; i++) { const p = new THREE.Group(); p.position.set(i % 2 ? 0.6 : -0.6, piso, L - 0.8 - Math.floor(i / 2) * 1.3); p.rotation.y = Math.PI / 2; cargaPallet(p, i % 2 ? 1 : 0); g.add(p); carga.push(p); }
  g.userData.carga = carga;
  return sombras(g);
}
const camion = crearCamion(); camion.rotation.y = Math.PI; camion.position.set(0, 0, DZ0 - 0.3); scene.add(camion);
fusionar(DEP);

// =====================================================================================================
// LA OFICINA DE RUBÉN (arriba del depósito; pared del fondo: vidrio a la izquierda, crema a la derecha con el reloj)
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const VX = -0.15;                                 // donde termina el vidrio y empieza la pared crema
const pantM = lienzo(1280, 800, () => {});        // el monitor
const pantR = lienzo(600, 1200, () => {});        // el celular de Rubén
const DESK = { x0: -0.95, x1: 0.95, z0: 1.25, z1: 2.75 };
const PUERTA = { x0: 0.95, x1: 1.75, alto: 2.15 };
const MON = { x: -0.66, z: 1.52, ry: 0.85, W: 1.08, H: 0.675 };   // el monitor grande a su derecha, girado hacia la cámara
let monitor, celR, termo, mate, remitos, telefono, reloj, puerta, franjas, franjasMesa, teclado;
const paredM = mat(0xe6e3d4, 0.9);
{
  const OW = OFI.x1 - OFI.x0, OC = (OFI.x0 + OFI.x1) / 2, OZ = (OFI.z0 + OFI.z1) / 2;
  // el piso de madera
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p2 = mesh(new THREE.PlaneGeometry(OW, OFI.z1 - OFI.z0), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), OC, OFI.piso + 0.005, OZ); p2.rotation.x = -Math.PI / 2; p2.castShadow = false; OF.add(p2);
  // el techo, la pared de la cámara (detrás de ella) y las laterales (crema con zócalo navy3)
  OF.add(caja(OW, 0.15, OFI.z1 - OFI.z0, M.navy3, OC, OFI.piso + OFI.alto + 0.07, OZ));
  OF.add(caja(OW, OFI.alto, 0.12, paredM, OC, OFI.piso + OFI.alto / 2, OFI.z1));
  OF.add(caja(0.12, OFI.alto, OFI.z1 - OFI.z0, paredM, OFI.x0, OFI.piso + OFI.alto / 2, OZ));
  // la pared derecha con la ventana de la persiana (z 1,4..3,6, de 0,9 a 2,5 de alto): cuatro paños alrededor del hueco
  const WZ0 = 1.4, WZ1 = 3.6, WY0 = 0.9, WY1 = 2.5;
  OF.add(caja(0.12, OFI.alto, WZ0, paredM, OFI.x1, OFI.piso + OFI.alto / 2, WZ0 / 2));
  OF.add(caja(0.12, OFI.alto, OFI.z1 - WZ1, paredM, OFI.x1, OFI.piso + OFI.alto / 2, (WZ1 + OFI.z1) / 2));
  OF.add(caja(0.12, WY0, WZ1 - WZ0, paredM, OFI.x1, OFI.piso + WY0 / 2, (WZ0 + WZ1) / 2));
  OF.add(caja(0.12, OFI.alto - WY1, WZ1 - WZ0, paredM, OFI.x1, OFI.piso + WY1 + (OFI.alto - WY1) / 2, (WZ0 + WZ1) / 2));
  const cielo = new THREE.Mesh(new THREE.PlaneGeometry(WZ1 - WZ0, WY1 - WY0), new THREE.MeshBasicMaterial({ color: 0xf4f1e2, toneMapped: false })); cielo.position.set(OFI.x1 + 0.2, OFI.piso + (WY0 + WY1) / 2, (WZ0 + WZ1) / 2); cielo.rotation.y = -Math.PI / 2; OF.add(cielo);
  // la persiana americana: láminas crema finas inclinadas
  for (let i = 0; i < 20; i++) { const l = caja(0.012, 0.055, WZ1 - WZ0 - 0.04, mat(C.cr, 0.6), OFI.x1 - 0.1, OFI.piso + WY1 - 0.06 - i * 0.078, (WZ0 + WZ1) / 2, 0.004); l.rotation.z = 0.5; OF.add(l); }
  OF.add(caja(0.08, 0.07, WZ1 - WZ0 + 0.1, M.navy3, OFI.x1 - 0.1, OFI.piso + WY1 + 0.04, (WZ0 + WZ1) / 2));
  // zócalos navy3
  OF.add(caja(OW, 0.14, 0.03, M.navy3, OC, OFI.piso + 0.07, OFI.z1 - 0.07));
  for (const x of [OFI.x0 + 0.07, OFI.x1 - 0.07]) OF.add(caja(0.03, 0.14, OFI.z1 - OFI.z0, M.navy3, x, OFI.piso + 0.07, OZ));
  // la pared del fondo (z = 0): vidrio de OFI.x0 a VX (perfiles navy), crema de VX a OFI.x1 con la puerta de vidrio esmerilado
  const v = new THREE.Mesh(new THREE.PlaneGeometry(VX - OFI.x0, OFI.alto), M.vidrio); v.position.set((OFI.x0 + VX) / 2, OFI.piso + OFI.alto / 2, 0); v.renderOrder = 3; OF.add(v);
  for (const x of [OFI.x0 + 0.04, -2.35, -1.15, VX]) OF.add(caja(0.07, OFI.alto, 0.09, M.navy, x, OFI.piso + OFI.alto / 2, 0));
  OF.add(caja(VX - OFI.x0, 0.08, 0.1, M.navy, (OFI.x0 + VX) / 2, OFI.piso + OFI.alto - 0.04, 0)); OF.add(caja(VX - OFI.x0, 0.12, 0.1, M.navy, (OFI.x0 + VX) / 2, OFI.piso + 0.06, 0));
  const tramo = (a, b, y0, y1) => OF.add(caja(b - a, y1 - y0, 0.12, paredM, (a + b) / 2, OFI.piso + (y0 + y1) / 2, -0.03));
  tramo(VX, PUERTA.x0, 0, OFI.alto); tramo(PUERTA.x1, OFI.x1, 0, OFI.alto); tramo(PUERTA.x0, PUERTA.x1, PUERTA.alto, OFI.alto);
  OF.add(caja(OFI.x1 - VX, 0.14, 0.03, M.navy3, (VX + OFI.x1) / 2, OFI.piso + 0.07, 0.04));
  // el marco de la puerta
  for (const x of [PUERTA.x0 - 0.03, PUERTA.x1 + 0.03]) OF.add(caja(0.06, PUERTA.alto, 0.16, M.navy3, x, OFI.piso + PUERTA.alto / 2, 0.0));
  OF.add(caja(PUERTA.x1 - PUERTA.x0 + 0.12, 0.06, 0.16, M.navy3, (PUERTA.x0 + PUERTA.x1) / 2, OFI.piso + PUERTA.alto + 0.03, 0.0));
  // el pizarrón chico "LUNES" (a la derecha de la puerta)
  const piz = lienzo(560, 380, (x, w, h) => { x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h); x.strokeStyle = "#1f3254"; x.lineWidth = 28; x.strokeRect(0, 0, w, h); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(170); x.fillText("LUNES", w / 2, h / 2 + 10); });
  OF.add(plano(0.7, 0.475, piz, 2.4, OFI.piso + 1.7, 0.04));
  // el escritorio de Rubén: madera clara, patas navy3, faldón
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0, DCX = (DESK.x0 + DESK.x1) / 2, DCZ = (DESK.z0 + DESK.z1) / 2;
  OF.add(caja(DW, 0.05, DD, mat(0xc89a64, 0.55), DCX, MESA_Y - 0.025, DCZ, 0.012));
  for (const x of [DESK.x0 + 0.06, DESK.x1 - 0.06]) OF.add(caja(0.06, 0.72, DD - 0.1, M.navy3, x, OFI.piso + 0.36, DCZ));
  OF.add(caja(DW - 0.15, 0.5, 0.03, M.navy3, DCX, OFI.piso + 0.45, DESK.z1 - 0.08));
  // la silla (de espaldas a la pared)
  const silla = new THREE.Group(); silla.position.set(0, OFI.piso, 0.62); OF.add(silla);
  silla.add(caja(0.52, 0.08, 0.5, M.navy, 0, 0.5, 0.18)); silla.add(caja(0.5, 0.7, 0.08, M.navy, 0, 0.92, -0.08)); silla.add(caja(0.06, 0.48, 0.06, M.gris, 0, 0.25, 0.15));
  // el monitor grande
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.1, 0.32, 0.1, M.navy, 0, 0.16, -0.05)); monitor.add(caja(0.36, 0.03, 0.28, M.navy, 0, 0.015, -0.03));
  monitor.add(caja(MON.W + 0.07, MON.H + 0.07, 0.06, M.navy, 0, 0.36 + MON.H / 2, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.36 + MON.H / 2, 0.032); monitor.add(pm);
  monitor.userData.centro = V3(0, 0.36 + MON.H / 2, 0.032);
  // el teclado (delante de Rubén)
  teclado = new THREE.Group(); teclado.position.set(0.0, MESA_Y, 1.58); OF.add(teclado);
  teclado.add(caja(0.5, 0.025, 0.17, M.navy3, 0, 0.012, 0, 0.01));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 12; k++) teclado.add(caja(0.032, 0.012, 0.032, M.cr2, -0.21 + k * 0.038, 0.03, -0.045 + i * 0.042, 0.004));
  OF.add(caja(0.065, 0.035, 0.1, M.navy3, 0.38, MESA_Y + 0.018, 1.62, 0.03));
  // el teléfono de escritorio (de la-lista)
  telefono = new THREE.Group(); telefono.position.set(0.72, MESA_Y, 2.35); telefono.rotation.y = -0.45; telefono.scale.setScalar(1.25); OF.add(telefono);
  telefono.add(caja(0.24, 0.07, 0.22, M.navy3, 0, 0.035, 0, 0.03));
  for (let i = 0; i < 12; i++) telefono.add(caja(0.03, 0.015, 0.025, M.cr, -0.05 + (i % 3) * 0.04, 0.075, 0.03 + Math.floor(i / 3) * 0.035 - 0.04, 0.005));
  telefono.add(caja(0.26, 0.05, 0.07, M.navy3, 0, 0.1, -0.06, 0.025));
  // el celular de Rubén
  celR = crearCelular(pantR, C.g, 0.082, 0.162); celR.scale.setScalar(1.6); marcoCel(celR); OF.add(celR);
  // el mate y el termo
  mate = crearMate(); mate.scale.setScalar(1.12); OF.add(mate);
  termo = crearTermo(); termo.scale.setScalar(1.15); OF.add(termo);
  // los remitos con broche y la pila de biblioratos (adelante, que la franja de abajo del escritorio no quede vacía)
  remitos = new THREE.Group(); OF.add(remitos);
  for (let i = 0; i < 6; i++) remitos.add(caja(0.21, 0.006, 0.29, mat(i % 2 ? C.cr : 0xe8e4d6, 0.9), -0.5 + i * 0.004, MESA_Y + 0.004 + i * 0.006, 2.35, 0.002).rotateY(0.1 * i - 0.3));
  remitos.add(caja(0.08, 0.02, 0.04, M.gris, -0.49, MESA_Y + 0.05, 2.25, 0.006));
  [[C.navy3, 0.0], [C.g, 0.075], [C.navy2, 0.15]].forEach(([c, y], i) => OF.add(caja(0.32, 0.07, 0.25, mat(c, 0.6), 0.1, MESA_Y + 0.035 + y, 2.5, 0.01).rotateY(0.08 * i - 0.1)));
  // un fichero y un estante con biblioratos en la pared de la izquierda (planos abiertos)
  OF.add(caja(0.5, 1.1, 0.5, M.navy3, -3.1, OFI.piso + 0.55, 3.6));
  OF.add(caja(0.3, 0.05, 1.4, M.navy3, -3.42, OFI.piso + 1.6, 3.0));
  for (let i = 0; i < 7; i++) OF.add(caja(0.26, 0.34, 0.12, [M.navy3, M.g, M.cr2, M.red][i % 4], -3.42, OFI.piso + 1.8, 2.45 + i * 0.17, 0.01));
}
// el reloj de pared grande (el protagonista): esfera crema, agujas navy gruesas, segundero verde
reloj = crearReloj(0.34); reloj.position.set(0.36, OFI.piso + 2.12, 0.04); OF.add(reloj);
// la puerta de vidrio esmerilado (bisagra en x1; se abre hacia la oficina)
puerta = new THREE.Group(); puerta.position.set(PUERTA.x1, OFI.piso, 0.0); OF.add(puerta);
{
  const PW = PUERTA.x1 - PUERTA.x0;
  puerta.add(caja(PW, PUERTA.alto - 0.02, 0.05, M.navy3, -PW / 2, PUERTA.alto / 2, 0, 0.01));
  const esm = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.16, PUERTA.alto - 0.5), mat(0xdfe7ee, 0.3, { emissive: 0xdfe7ee, emissiveIntensity: 0.25 })); esm.position.set(-PW / 2, PUERTA.alto / 2 + 0.12, 0.028); puerta.add(esm);
  const esm2 = esm.clone(); esm2.position.z = -0.028; esm2.rotation.y = Math.PI; puerta.add(esm2);
  puerta.add(caja(0.12, 0.03, 0.06, M.gris, -PW + 0.1, 1.0, 0.05, 0.01));
  sombras(puerta);
}
// las franjas de luz de la persiana: textura de rayas planas (sin degradé), sobre la pared crema y sobre el escritorio
const rayasT = lienzo(512, 512, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#fff6dc"; for (let i = 0; i < 8; i++) x.fillRect(0, i * 64 + 6, w, 30); });
rayasT.wrapS = rayasT.wrapT = THREE.RepeatWrapping;
{
  const m = new THREE.MeshBasicMaterial({ map: rayasT, transparent: true, opacity: 0.5, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 });
  franjas = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), m); franjas.position.set(1.95, OFI.piso + 1.55, 0.065); franjas.renderOrder = 2; OF.add(franjas);
  const m2 = m.clone(); m2.map = rayasT.clone(); m2.map.needsUpdate = true; m2.opacity = 0.32;
  franjasMesa = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.4), m2); franjasMesa.rotation.x = -Math.PI / 2; franjasMesa.position.set(0.55, MESA_Y + 0.003, 2.0); franjasMesa.renderOrder = 2; OF.add(franjasMesa);
}
sombras(OF);
OF.traverse((o) => { if (o.isMesh && (o.material === M.vidrio || o.material.transparent)) { o.castShadow = false; o.receiveShadow = false; } });
// el vapor del termo (Q4)
const vapor = crearVapor(9); scene.add(vapor);
// ---- luces de la oficina de mañana: el sol rasante por la persiana (con sombra), el cielo, un relleno desde la cámara ----
const solOf = new THREE.DirectionalLight(0xfff1d8, 2.2);
solOf.castShadow = true; solOf.shadow.mapSize.set(2048, 2048); solOf.shadow.bias = -0.0008; solOf.shadow.radius = 2;
Object.assign(solOf.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
solOf.position.set(6.5, OFI.piso + 4.5, 3.4); solOf.target.position.set(0, OFI.piso + 1.0, 1.4); scene.add(solOf, solOf.target);
const cieloOf = new THREE.HemisphereLight(0xf2f4f8, 0x6a5a48, 1.7); scene.add(cieloOf);
const rellenoOf = new THREE.DirectionalLight(0xe8eefa, 0.9); rellenoOf.position.set(-1.5, OFI.piso + 3.5, 7); rellenoOf.target.position.set(0, OFI.piso + 1.2, 1); scene.add(rellenoOf, rellenoOf.target);
// ---- luces del depósito de día ----
const solDep = new THREE.DirectionalLight(0xfffaf2, 1.6);
solDep.castShadow = true; solDep.shadow.mapSize.set(2048, 2048); solDep.shadow.bias = -0.0006; solDep.shadow.radius = 2;
Object.assign(solDep.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 40 });
solDep.position.set(-4, 13, 0); solDep.target.position.set(-1, 0, -6); scene.add(solDep, solDep.target);
const cieloDep = new THREE.HemisphereLight(0xe6edf5, 0x5a5048, 2.0); scene.add(cieloDep);

// =====================================================================================================
// EL DEPÓSITO, PARTE 2: el pallet WALTER, las cajas de aceite, el operario con la zorra y la tablet
// =====================================================================================================
const W_PAL = V3(-0.9, 0, -5.4);   // el pallet WALTER
const botella = (x, cx, top, alto, ancho) => {
  x.fillStyle = "#efeee5"; x.strokeStyle = "#1f3254"; x.lineWidth = Math.max(6, ancho * 0.08);
  x.beginPath(); x.moveTo(cx - ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top); x.lineTo(cx + ancho * 0.16, top + alto * 0.18);
  x.quadraticCurveTo(cx + ancho * 0.5, top + alto * 0.26, cx + ancho * 0.5, top + alto * 0.4); x.lineTo(cx + ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto); x.lineTo(cx - ancho * 0.5, top + alto * 0.4);
  x.quadraticCurveTo(cx - ancho * 0.5, top + alto * 0.26, cx - ancho * 0.16, top + alto * 0.18); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = "#5ce611"; x.fillRect(cx - ancho * 0.5 + x.lineWidth / 2, top + alto * 0.55, ancho - x.lineWidth, alto * 0.22);
  x.fillStyle = "#1f3254"; x.fillRect(cx - ancho * 0.2, top - alto * 0.07, ancho * 0.4, alto * 0.08);
};
const kraftCara = (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#b8935a"; x.fillRect(0, 0, w, h * 0.06); x.fillRect(0, h * 0.94, w, h * 0.06); };
const cajaGrandeT = lienzo(512, 320, (x, w, h) => { kraftCara(x, w, h); for (const cx of [70, 150]) botella(x, cx, 70, 200, 66); x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 86, 280); x.fillText("ACEITE", 210, 130); x.font = F(800, 50); x.fillText("1,5 L x 12", 212, 215); });
const cajaChicaT = lienzo(256, 320, (x, w, h) => { kraftCara(x, w, h); botella(x, w / 2, 50, 190, 92); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ACEITE", 900, 56, w - 30); x.fillText("ACEITE", w / 2, 280); });
const cintaT = lienzo(256, 128, (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.fillStyle = "#e8dcc0"; x.fillRect(0, h * 0.38, w, h * 0.24); });
const CAJA_A = { x: 0.48, y: 0.3, z: 0.24 };
const CAJA_MAT = (() => { const k = mat(C.kraft, 0.85); const ch = new THREE.MeshStandardMaterial({ map: cajaChicaT, roughness: 0.85 }), gr = new THREE.MeshStandardMaterial({ map: cajaGrandeT, roughness: 0.85 }), ci = new THREE.MeshStandardMaterial({ map: cintaT, roughness: 0.7 }); return [ch, ch, ci, k, gr, gr]; })();
const CAJA_GEO = rbox(CAJA_A.x, CAJA_A.y, CAJA_A.z, 0.015, 2);
function crearCajaAceite() { const m = new THREE.Mesh(CAJA_GEO, CAJA_MAT); m.castShadow = true; m.receiveShadow = true; return m; }
const palletW = new THREE.Group(); palletW.position.copy(W_PAL); scene.add(palletW);
palletW.add(crearPallet());
// ya armado (antes de las 3 cajas): harina 000 y agua (lo de siempre de Walter)
{
  const hm = new THREE.MeshStandardMaterial({ map: bolsaT, roughness: 0.9 }), pm = mat(0xdcd9c8, 0.9);
  for (let i = 0; i < 2; i++) palletW.add(mesh(new THREE.BoxGeometry(0.5, 0.16, 0.36), [pm, pm, hm, pm, pm, pm], -0.28 + i * 0.56, 0.23, -0.24));
  for (let i = 0; i < 2; i++) palletW.add(caja(0.36, 0.3, 0.26, mat(0xcfe0ea, 0.3), -0.3 + i * 0.6, 0.3, 0.18, 0.02));
}
// el cartel kraft "WALTER" clavado en el pallet (de ya-lo-cargo)
const carW = lienzo(640, 300, (x, w, h) => { x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "WALTER", 900, 170, w - 70); x.fillText("WALTER", w / 2, h / 2 + 4); });
{
  const g = new THREE.Group(); g.position.set(0.0, 0.16, 0.56); palletW.add(g);
  g.add(caja(0.04, 1.1, 0.04, M.navy3, 0, 0.55, -0.02, 0.01));
  const pc = plano(0.72, 0.34, carW, 0, 1.05, 0.005); pc.material.emissive = new THREE.Color(0xffffff); pc.material.emissiveMap = carW; pc.material.emissiveIntensity = 0.25; g.add(pc);
  g.add(caja(0.76, 0.38, 0.02, M.navy, 0, 1.05, -0.008, 0.01));
}
sombras(palletW);
// el pallet de aceite de donde salen las cajas (a la izquierda del de Walter)
const palletA = new THREE.Group(); palletA.position.set(W_PAL.x - 1.35, 0, W_PAL.z - 1.0); scene.add(palletA);
palletA.add(crearPallet());
for (let L = 0; L < 3; L++) for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) { const c = crearCajaAceite(); c.position.set((i - 0.5) * 0.49, 0.15 + CAJA_A.y / 2 + L * CAJA_A.y, (j - 1.5) * 0.25); c.rotation.y = 0; palletA.add(c); }
// las 3 cajas que van al pallet de Walter
const CAJAS_W = [0, 1, 2].map((i) => { const c = crearCajaAceite(); scene.add(c); return c; });
const CW_ORIG = [0, 1, 2].map((i) => V3(palletA.position.x + 0.245, 0.15 + CAJA_A.y / 2 + 3 * CAJA_A.y, palletA.position.z - 0.25 + i * 0.25));
const CW_DEST = [V3(W_PAL.x - 0.26, 0.315 + CAJA_A.y / 2, W_PAL.z - 0.24), V3(W_PAL.x + 0.26, 0.315 + CAJA_A.y / 2, W_PAL.z - 0.24), V3(W_PAL.x, 0.315 + CAJA_A.y * 1.5, W_PAL.z - 0.22)];
// la zorra con la tablet en el mango (la lista de armado por pasillo)
const zorra = new THREE.Group(); zorra.position.set(W_PAL.x + 0.95, 0, W_PAL.z + 0.35); zorra.rotation.y = Math.PI - 0.3; scene.add(zorra);
const pantTab = lienzo(900, 640, () => {});
{
  const gm = mat(0xb4b8c0, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) zorra.add(caja(0.16, 0.07, 1.15, gm, s * 0.2, 0.06, 0.55));
  zorra.add(caja(0.6, 0.2, 0.22, gm, 0, 0.12, -0.08));
  const mango = caja(0.05, 1.0, 0.05, M.navy3, 0, 0.6, -0.25); mango.rotation.x = -0.35; zorra.add(mango);
  zorra.add(caja(0.3, 0.05, 0.05, M.navy3, 0, 1.08, -0.42));
  for (const s of [-1, 1]) zorra.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14), M.goma, s * 0.18, 0.08, -0.12).rotateZ(Math.PI / 2));
  // la tablet en un soporte arriba del mango, mirando hacia atrás (al operario y a la cámara)
  const tb = new THREE.Group(); tb.position.set(0, 1.18, -0.47); tb.rotation.set(-0.5, Math.PI, 0); zorra.add(tb);
  tb.add(caja(0.46, 0.33, 0.02, M.navy, 0, 0, -0.012, 0.015));
  const pt = new THREE.Mesh(new THREE.PlaneGeometry(0.43, 0.3), new THREE.MeshBasicMaterial({ map: pantTab, toneMapped: false })); pt.position.z = 0.0; tb.add(pt);
  zorra.userData.tablet = tb;
  sombras(zorra);
}

// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = RX) · de ya-lo-cargo / la-lista: azulejo, mostrador con vitrina, spiedo, pizarra
// =====================================================================================================
const RX = 60;
const ROT = new THREE.Group(); ROT.position.x = RX; scene.add(ROT);
const RD = 6;
const GRA = { x: 0.35, z: -3.85 };   // detrás del mostrador, mirando a +z
const SPI = V3(-1.4, 0.95, -5.4);
let spiedoBarras = [], llamaM;
const pantG = lienzo(600, 1200, () => {});        // el celular de Graciela
{
  const azul = lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#f4f4ef"; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#cfd2cc"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); }
  });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = (w, h, x, y, z, ry) => { const tx = azul.clone(); tx.needsUpdate = true; tx.repeat.set(w / 0.5, h / 0.5); const p = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4 }), x, y, z); p.rotation.y = ry; p.castShadow = false; ROT.add(p); };
  pared(8, 3.1, 0, 1.55, -RD, 0); pared(RD, 3.1, -4, 1.55, -RD / 2, Math.PI / 2); pared(RD, 3.1, 4, 1.55, -RD / 2, -Math.PI / 2);
  ROT.add(caja(8, 0.12, 0.03, M.g, 0, 1.55, -RD + 0.02)); ROT.add(caja(0.03, 0.12, RD, M.g, -3.98, 1.55, -RD / 2)); ROT.add(caja(0.03, 0.12, RD, M.g, 3.98, 1.55, -RD / 2));
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(6, 4.5);
  const p = mesh(new THREE.PlaneGeometry(8, RD + 4), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2 + 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD + 4, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2 + 2));
  pared(8, 3.1, 0, 1.55, 4, Math.PI);
  // el mostrador (a lo largo de x) con tapa de madera y la vitrina con las milanesas y las tartas
  const MZ = -3.1, MY = 0.9;
  ROT.add(caja(5.4, MY - 0.06, 0.75, M.navy3, 0.3, (MY - 0.06) / 2, MZ, 0.03));
  ROT.add(caja(5.5, 0.06, 0.83, mat(0xc89a64, 0.55), 0.3, MY - 0.03, MZ, 0.02));
  ROT.add(caja(5.2, 0.06, 0.02, M.g, 0.3, 0.32, MZ + 0.38, 0.01));
  const vit = new THREE.Mesh(rbox(2.2, 0.42, 0.65, 0.02, 2), M.vidrio); vit.position.set(-1.4, MY + 0.21, MZ); vit.renderOrder = 3; ROT.add(vit);
  ROT.add(caja(2.2, 0.03, 0.67, M.gris, -1.4, MY + 0.43, MZ));
  for (let i = 0; i < 3; i++) ROT.add(caja(0.6, 0.03, 0.42, M.gris, -2.1 + i * 0.7, MY + 0.02, MZ));
  for (let i = 0; i < 6; i++) { const mi = mesh(new THREE.SphereGeometry(0.1, 12, 8), mat(0xc98a3a, 0.6), -2.25 + i * 0.32, MY + 0.07, MZ + (i % 2) * 0.12 - 0.06); mi.scale.set(1.4, 0.25, 1); ROT.add(mi); }
  ROT.add(caja(0.42, 0.22, 0.36, M.navy3, 2.3, MY + 0.11, MZ - 0.05, 0.04));
  // la pizarra navy con tiza crema
  const piz = lienzo(900, 600, (x, w, h) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 96);
    ["POLLO", "MILANESA", "TARTA"].forEach((s, i) => x.fillText(s, w / 2, 175 + i * 150));
  });
  ROT.add(plano(1.5, 1.0, piz, 1.5, 2.15, -RD + 0.03));
  // el spiedo contra la pared del fondo: acero, vidrio, tres barras con pollos que giran, la llama
  const sp = new THREE.Group(); sp.position.copy(SPI); ROT.add(sp);
  const acero = mat(0xc9ccd2, 0.3, { metalness: 0.55 }), aceroOsc = mat(0x8a8e98, 0.4, { metalness: 0.5 });
  sp.add(caja(1.6, 0.9, 0.6, aceroOsc, 0, -0.45, 0));
  for (const s of [-1, 1]) sp.add(caja(0.08, 1.3, 0.62, acero, s * 0.78, 0.63, 0));
  sp.add(caja(1.64, 0.1, 0.64, acero, 0, 1.3, 0)); sp.add(caja(1.64, 0.06, 0.64, acero, 0, 0.0, 0));
  const vsp = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), M.vidrio); vsp.position.set(0, 0.64, 0.31); vsp.renderOrder = 3; sp.add(vsp);
  const brasas = lienzo(512, 384, (x, w, h) => { x.fillStyle = "#c46a3a"; x.fillRect(0, 0, w, h); x.fillStyle = "#e09a5a"; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 60 - 10, h); x.quadraticCurveTo(i * 60 + 20, h * 0.2, i * 60 + 50, h); x.fill(); } });
  llamaM = new THREE.MeshBasicMaterial({ map: brasas, toneMapped: false });
  const llama = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.05), llamaM); llama.position.set(0, 0.64, -0.26); sp.add(llama);
  const doradoM = mat(0xd9a96a, 0.5), doradoO = mat(0xb98a4a, 0.5);   // recién prendido: los pollos todavía claros
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const p = new THREE.Group(); p.position.x = -0.46 + k * 0.46; barra.add(p);
      const cu = mesh(new THREE.SphereGeometry(0.15, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); p.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.1, 14, 10), doradoM, 0.13, 0.03, 0.0); pe.scale.set(0.8, 0.75, 0.9); p.add(pe);
      for (const s of [-1, 1]) { const mu = mesh(new THREE.SphereGeometry(0.065, 12, 8), doradoO, -0.06, -0.07, s * 0.09); mu.scale.set(1.4, 0.9, 0.9); p.add(mu); }
      p.rotation.x = k * 1.3;
    }
  }
  // el tubo de luz del techo
  const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 10).rotateZ(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xf4f6ee, toneMapped: false })); tb.position.set(0.5, 3.0, -3.3); ROT.add(tb);
}
sombras(ROT);
ROT.traverse((o) => { if (o.isMesh && (o.material === M.vidrio || o.material === llamaM)) o.castShadow = false; });
const luzRot = new THREE.DirectionalLight(0xfff2e0, 1.8); luzRot.position.set(RX + 2.5, 5, 4); luzRot.target.position.set(RX + 0.3, 1.2, -3.6); scene.add(luzRot, luzRot.target);
luzRot.castShadow = true; luzRot.shadow.mapSize.set(1024, 1024); luzRot.shadow.bias = -0.0008; Object.assign(luzRot.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 25 });
const cieloRot = new THREE.HemisphereLight(0xf4f6ee, 0x5a5048, 1.8); scene.add(cieloRot);

// =====================================================================================================
// LA CAFETERÍA DE MARTA (x = CX): barra de madera clara con frente navy3, máquina de espresso crema con dos grupos,
// molinillo con la tolva llena de granos, pila de tazas, pizarra "CAFÉ · MEDIALUNAS"
// =====================================================================================================
const CX = -60;
const CAF = new THREE.Group(); CAF.position.x = CX; scene.add(CAF);
const MAR = { x: 0.1, z: -2.95 };   // Marta detrás de la barra, mirando a +z
const pantMa = lienzo(600, 1200, () => {});       // el celular de Marta
{
  const pm = mat(0xebe6d6, 0.9);
  for (const [w, x, z, ry] of [[8, 0, -4.6, 0], [8, -4, -0.6, Math.PI / 2], [8, 4, -0.6, -Math.PI / 2]]) { const p = mesh(new THREE.PlaneGeometry(w, 3.2), pm, x, 1.6, z); p.rotation.y = ry; p.castShadow = false; CAF.add(p); }
  CAF.add(caja(8, 1.0, 0.04, M.navy3, 0, 0.5, -4.57));   // el zócalo alto navy
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(4, 4);
  const piso = mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), 0, 0.005, -0.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; CAF.add(piso);
  CAF.add(caja(8, 0.1, 8, mat(0xe8e6da, 0.95), 0, 3.2, -0.6));
  // la barra (a lo largo de x, delante de Marta): frente navy3, tapa de madera clara
  const BZ = -2.25, BY = 1.0;
  CAF.add(caja(4.6, BY - 0.05, 0.7, M.navy3, 0, (BY - 0.05) / 2, BZ, 0.03));
  CAF.add(caja(4.7, 0.06, 0.8, mat(0xd2ab78, 0.55), 0, BY - 0.03, BZ, 0.02));
  CAF.add(caja(4.4, 0.05, 0.02, M.g, 0, 0.4, BZ + 0.36, 0.01));
  // la mesada de atrás con la máquina de espresso (mirando a +z, hacia Marta y la barra)
  const AZ = -4.2, AY = 0.95;
  CAF.add(caja(4.6, AY - 0.05, 0.6, M.navy3, 0, (AY - 0.05) / 2, AZ, 0.03));
  CAF.add(caja(4.7, 0.06, 0.66, mat(0xd2ab78, 0.55), 0, AY - 0.03, AZ, 0.02));
  const maq = new THREE.Group(); maq.position.set(-0.55, AY, AZ + 0.02); CAF.add(maq);
  maq.add(caja(0.95, 0.5, 0.5, mat(C.cr, 0.35), 0, 0.3, 0, 0.05));
  maq.add(caja(0.97, 0.05, 0.52, M.navy3, 0, 0.56, 0, 0.02));
  maq.add(caja(0.97, 0.05, 0.52, M.navy3, 0, 0.05, 0, 0.02));
  maq.add(caja(0.8, 0.03, 0.3, mat(0xb4b8c0, 0.35, { metalness: 0.4 }), 0, 0.075, 0.33, 0.01));   // la bandeja de goteo
  for (const s of [-1, 1]) {
    maq.add(mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.08, 18), mat(0xc9ccd2, 0.3, { metalness: 0.5 }), s * 0.22, 0.32, 0.27));
    const mango = caja(0.04, 0.04, 0.22, M.navy3, s * 0.22, 0.28, 0.42, 0.015); maq.add(mango);
    maq.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.07, 16), mat(C.cr, 0.3), s * 0.22, 0.12, 0.3));   // las tazas debajo
  }
  const mano = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24), mat(0xf7f6f0, 0.3), 0, 0.44, 0.255); mano.rotation.x = Math.PI / 2; maq.add(mano);
  maq.add(mesh(new THREE.TorusGeometry(0.07, 0.012, 8, 24), M.navy3, 0, 0.44, 0.262));
  // el molinillo: cuerpo navy, tolva transparente llena de granos
  const mol = new THREE.Group(); mol.position.set(0.3, AY, AZ + 0.02); CAF.add(mol);
  mol.add(caja(0.2, 0.32, 0.22, M.navy3, 0, 0.16, 0, 0.03));
  mol.add(mesh(new THREE.CylinderGeometry(0.11, 0.06, 0.24, 20), mat(0x5a3a24, 0.8), 0, 0.44, 0));
  mol.add(mesh(new THREE.CylinderGeometry(0.12, 0.07, 0.26, 20, 1, true), M.vidrio, 0, 0.44, 0));
  // la pila de tazas y los platos
  for (let i = 0; i < 4; i++) CAF.add(mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.07, 16), mat(C.cr, 0.3), 0.75 + (i % 2) * 0.12, AY + 0.035 + Math.floor(i / 2) * 0.072, AZ + 0.05));
  // las medialunas en un plato sobre la barra
  CAF.add(mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.02, 24), mat(C.cr, 0.3), -1.4, BY + 0.01, BZ));
  for (let i = 0; i < 3; i++) { const ml = mesh(new THREE.TorusGeometry(0.06, 0.03, 8, 16, Math.PI * 1.3), mat(0xc98a3a, 0.6), -1.45 + i * 0.07, BY + 0.05, BZ - 0.04 + i * 0.05); ml.rotation.set(Math.PI / 2, 0, i); CAF.add(ml); }
  // la pizarra
  const piz = lienzo(900, 560, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 30; x.strokeRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 120); x.fillText("CAFÉ", w / 2, 220); x.font = F(800, 96); x.fillText("MEDIALUNAS", w / 2, 400); });
  CAF.add(plano(1.4, 0.87, piz, 0.9, 2.15, -4.57));
}
sombras(CAF);
CAF.traverse((o) => { if (o.isMesh && o.material === M.vidrio) o.castShadow = false; });
const luzCaf = new THREE.DirectionalLight(0xfff0dc, 1.8); luzCaf.position.set(CX - 2.5, 5, 3); luzCaf.target.position.set(CX, 1.0, -3); scene.add(luzCaf, luzCaf.target);
const cieloCaf = new THREE.HemisphereLight(0xf6f2e8, 0x5a4a3a, 1.8); scene.add(cieloCaf);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [4.42, 9.0, 11.85, 15.0, 24.5, 30.5, 34.0] });
const graciela = crearPersonaje({ ...ELENCO.clienta, lentes: null, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999 });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true, parpadeoCada: 999, parpadeosExtra: [T.n1 + 0.8] });
const operario = crearPersonaje({ ...DEFECTO, nombre: "Darío", piel: PIEL.morena, pelo: PELO.negro, peinado: "corto", bigote: PELO.negro, cejasColor: 0x1e1a18, camisa: C.navy3, mangas: "largas", cuello: C.g, pantalon: C.navy3, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas de ya-lo-cargo (la corona lisa se veía casco de costado)
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
// el maletín de muestras de Nico (navy, la tira verde), en la mano izquierda
const maletin = crearMochila(C.navy3, C.g); maletin.scale.setScalar(0.95); scene.add(maletin);
const celG = crearCelular(pantG, C.g, 0.082, 0.162); celG.scale.setScalar(1.6); marcoCel(celG); scene.add(celG);
const celMa = crearCelular(pantMa, C.navy3, 0.082, 0.162); celMa.scale.setScalar(1.6); marcoCel(celMa); scene.add(celMa);
fusionar(OF, [monitor, celR, mate, termo, remitos, telefono, reloj, puerta, franjas, franjasMesa, teclado]); fusionar(ROT, spiedoBarras); fusionar(CAF);
const TODOS = [ruben, graciela, marta, nico, operario];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

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
  AVATAR.graciela = leer(graciela, 0xefeee5); AVATAR.marta = leer(marta, 0xd9d7c9); AVATAR.nico = leer(nico, 0x5ce611);
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.ruben = leer(ruben, 0xb9cde0);
  // los clientes de la ráfaga (caras del módulo, genéricas)
  AVATAR.beto = leer(crearPersonaje({ ...DEFECTO, nombre: "Beto", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", bigote: PELO.castaño, camisa: C.navy3, mangas: "cortas", parpadeoCada: 999 }), 0x5ce611);
  AVATAR.nelly = leer(crearPersonaje({ ...DEFECTO, nombre: "Nelly", piel: PIEL.media, pelo: PELO.rubio, peinado: "rodete", camisa: C.cr, mangas: "largas", labios: 0xb5555a, aros: C.g, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.fede = leer(crearPersonaje({ ...DEFECTO, nombre: "Fede", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "texturado", camisa: C.g, mangas: "cortas", parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.sergio = leer(crearPersonaje({ ...DEFECTO, nombre: "Sergio", piel: PIEL.media, pelo: PELO.gris, peinado: "pelado", bigote: PELO.gris, camisa: C.cr, mangas: "cortas", parpadeoCada: 999 }), 0xd9d7c9);
  rt.dispose();
}
// dibuja un avatar redondo con borde navy
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, r, color = "#0b1220", ancho = null) => { x.strokeStyle = color; x.lineWidth = ancho ?? r * 0.32; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.55, cy + r * 0.02); x.lineTo(cx - r * 0.12, cy + r * 0.42); x.lineTo(cx + r * 0.6, cy - r * 0.45); x.stroke(); };
const playBtn = (x, cx, cy, r, fondo = "#5ce611") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(cx - r * 0.32, cy - r * 0.5); x.lineTo(cx - r * 0.32, cy + r * 0.5); x.lineTo(cx + r * 0.52, cy); x.closePath(); x.fill(); };
const onda = (x, x0, cy, n, paso, alto, color, avance = 1) => { for (let i = 0; i < n; i++) { const hh = alto * (0.25 + 0.75 * Math.abs(Math.sin(i * 1.7 + 0.4))); x.fillStyle = i / n < avance ? color : "#b4b2a3"; x.fillRect(x0 + i * paso, cy - hh / 2, paso * 0.55, hh); } };
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// ================= PANTALLAS =================
// ---- el celular de Rubén (parte 1): el chat de pedidos ----
let claveR = "";
function cabChat(x, w, titulo = "Pedidos · Lunes", badge = "40") {
  x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 170);
  x.fillStyle = "#efeee5"; x.font = F(800, 58); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(titulo, 36, 88);
  if (badge) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(w - 150, 46, 118, 84, 42); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 60); x.textAlign = "center"; x.fillText(badge, w - 91, 90); x.textAlign = "left"; }
}
function burbujaAudio(x, y, w, cv, nombre, dur, prog, opts = {}) {
  // el audio de un cliente: avatar + nombre, play, onda, "2x", progreso
  const H = opts.H ?? 300;
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, y, w - 48, H, 40); x.fill();
  if (opts.borde) { x.strokeStyle = opts.borde; x.lineWidth = 14; x.stroke(); }
  avatar(x, cv, 92, y + 70, 48); x.fillStyle = "#1f3254"; x.font = F(700, 44); x.textAlign = "left"; x.fillText(nombre, 156, y + 72);
  playBtn(x, 98, y + 190, 52);
  onda(x, 168, y + 190, 13, 22, 86, "#0b1220", prog);
  if (opts.x2) { x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(w - 150, y + 150, 100, 70, 35); x.fill(); x.fillStyle = "#5ce611"; x.font = F(900, 44); x.textAlign = "center"; x.fillText("2x", w - 100, y + 187); x.textAlign = "left"; }
  x.fillStyle = opts.durColor ?? "#1f3254"; x.font = F(800, opts.durPx ?? 46); x.textAlign = "left"; x.fillText(dur, 168, y + H - 40);
}
function burbujaTexto(x, y, w, cv, nombre, texto, opts = {}) {
  const px = opts.px ?? 50, lineas = [];
  x.font = F(800, px); let l = ""; for (const p of texto.split(" ")) { if (x.measureText(l + p).width > w - 120) { lineas.push(l.trim()); l = ""; } l += p + " "; } lineas.push(l.trim());
  const H = 120 + lineas.length * px * 1.2 + 20;
  x.fillStyle = opts.fondo ?? "#efeee5"; x.beginPath(); x.roundRect(24, y, w - 48, H, 40); x.fill();
  if (opts.borde) { x.strokeStyle = opts.borde; x.lineWidth = 14; x.stroke(); }
  avatar(x, cv, 92, y + 66, 46); x.fillStyle = "#1f3254"; x.font = F(700, 42); x.textAlign = "left"; x.fillText(nombre, 152, y + 68);
  x.fillStyle = "#0b1220"; x.font = F(800, px); lineas.forEach((s, i) => x.fillText(s, 52, y + 140 + i * px * 1.2));
  if (opts.hora) { x.fillStyle = opts.horaColor ?? "#1f3254"; x.font = F(800, 42); x.textAlign = "right"; x.fillText(opts.hora, w - 56, y + 68); x.textAlign = "left"; }
  return H;
}
// la foto de la lista de Marta: papel cuadriculado torcido, mancha de café, letra a mano; el "7" corrido con la mosca
function dibujarLista(x, w, h, zoom) {
  x.save();
  // el zoom con dos dedos: centrado en el garabato del café
  const k = (zoom - 1) / 1.4, cx = lerp(300, 505, cl(k)), cy = lerp(450, 340, cl(k));
  x.translate(300, lerp(450, 360, cl(k))); x.scale(zoom, zoom); x.translate(-cx, -cy);
  x.save(); x.translate(w / 2, h / 2); x.rotate(-0.05); x.translate(-w / 2, -h / 2);
  x.fillStyle = "#f7f6ee"; x.fillRect(20, 10, w - 40, h - 20);
  x.strokeStyle = "#cfd9e4"; x.lineWidth = 2; for (let i = 0; i < 30; i++) { x.beginPath(); x.moveTo(20, 10 + i * 34); x.lineTo(w - 20, 10 + i * 34); x.stroke(); x.beginPath(); x.moveTo(20 + i * 34, 10); x.lineTo(20 + i * 34, h - 10); x.stroke(); }
  // la mancha marrón del pocillo (anillo plano)
  x.strokeStyle = "rgba(122,82,48,0.55)"; x.lineWidth = 16; x.beginPath(); x.arc(w - 120, h - 150, 78, 0.3, 5.9); x.stroke();
  x.fillStyle = "#3a3f4a"; x.textAlign = "left"; x.textBaseline = "middle";
  x.font = CAV(72); x.fillText("Café en grano x", 50, 330);
  x.fillText("Azúcar x 2", 50, 450); x.fillText("Leche x 12", 50, 560); x.font = CAV(62); x.fillText("Medialunas", 50, 670); x.fillText("(las de siempre)", 60, 740);
  // el 7 corrido (garabato)
  x.strokeStyle = "#3a3f4a"; x.lineWidth = 9; x.lineCap = "round"; x.lineJoin = "round";
  x.beginPath(); x.moveTo(460, 300); x.quadraticCurveTo(500, 290, 518, 296); x.quadraticCurveTo(500, 330, 488, 372); x.stroke();
  x.beginPath(); x.moveTo(470, 336); x.lineTo(506, 330); x.stroke();
  // la mosca: cuerpo negro, cabeza, dos alitas grises translúcidas, patitas
  x.save(); x.translate(548, 340); x.rotate(0.5); x.scale(1.35, 1.35);
  x.fillStyle = "rgba(170,180,195,0.75)"; x.strokeStyle = "#3a3f4a"; x.lineWidth = 2.5;
  for (const s of [-1, 1]) { x.beginPath(); x.ellipse(s * 14, -12, 15, 8, s * 0.6, 0, 7); x.fill(); x.stroke(); }
  x.fillStyle = "#14161a"; x.beginPath(); x.ellipse(0, 0, 9, 14, 0, 0, 7); x.fill();
  x.beginPath(); x.arc(0, -16, 7, 0, 7); x.fill();
  x.strokeStyle = "#14161a"; x.lineWidth = 2.5; for (const s of [-1, 1]) for (const k of [-6, 2, 9]) { x.beginPath(); x.moveTo(s * 6, k); x.lineTo(s * 16, k + 6); x.stroke(); }
  x.restore();
  x.restore();
  x.restore();
}
function dibujarCelR(t) {
  const parte2 = t >= P2;
  let modo = "audio";
  if (t >= T.p3) modo = "foto";
  if (t >= T.p4) modo = "rafaga";
  if (t >= T.p5) modo = "walter";
  if (t >= T.p7) modo = "cambie";
  if (parte2) modo = "quieto";
  const prog = modo === "audio" ? Math.round(sg(t, 0, T.fin1) * 7) : 0;
  const zoom = modo === "foto" ? Math.round(eio(sg(t, T.zoom[0], T.zoom[1])) * 20) : 0;
  const scr = modo === "walter" ? Math.round(eio(sg(t, T.scroll[0], T.scroll[1])) * 10) : 0;
  const rojo = modo === "walter" && t >= T.rojo ? 1 : 0, wa = modo === "walter" && t >= T.w1 ? Math.round(sg(t, T.w1, T.w1 + LEN.w1) * 8) : -1;
  const nr = modo === "rafaga" ? T.rafaga.filter((a) => t >= a).length : 0;
  const clave = `${modo}|${prog}|${zoom}|${scr}|${rojo}|${wa}|${nr}`; if (clave === claveR) return; claveR = clave;
  const { x } = pantR.userData, w = 600, h = 1200;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "audio") {
    cabChat(x, w);
    burbujaTexto(x, 210, w, AVATAR.walter, "Walter · Bar", "Lo de siempre + 2 de aceite", { px: 46, hora: "8:04" });
    burbujaAudio(x, 470, w, AVATAR.graciela, "Graciela · Rotisería", `${mmss(245 + prog)} / 4:12`, (245 + prog) / 252, { x2: true, H: 330 });
    burbujaAudio(x, 830, w, AVATAR.fede, "Fede · Rotisería", "2:51", 0, { H: 300 });
  } else if (modo === "foto") {
    // la foto a pantalla casi completa (el visor de imágenes del chat)
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 160); avatar(x, AVATAR.marta, 80, 82, 50); x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("Marta · Cafetería", 148, 84);
    x.save(); x.beginPath(); x.rect(0, 180, w, 900); x.clip(); x.translate(0, 180); dibujarLista(x, w, 900, 1 + (zoom / 20) * 1.4); x.restore();
    x.fillStyle = "#efeee5"; x.font = F(700, 44); x.textAlign = "center"; x.fillText("8:02", w / 2, 1140); x.textAlign = "left";
  } else if (modo === "rafaga") {
    cabChat(x, w);
    const L = [[AVATAR.beto, "Beto · Kiosco", "Lo de siempre."], [AVATAR.nelly, "Nelly · Panadería", "Lo mismo que el lunes, sin azúcar."], [AVATAR.fede, "Fede · Rotisería", "▶ 2:51"], [AVATAR.sergio, "Sergio · Bar", "Lo de siempre."], [AVATAR.nelly, "Nelly · Panadería", "▶ 1:12"], [AVATAR.beto, "Beto · Kiosco", "¿Y lo mío?"], [AVATAR.fede, "Fede · Rotisería", "Lo de siempre."]];
    let y = h - 20;
    for (let i = nr - 1; i >= 0 && y > 190; i--) { const [cv, n, s] = L[i]; x.font = F(800, 46); const hh = 120 + Math.ceil(x.measureText(s).width / (w - 120)) * 55 + 20; y -= hh + 18; burbujaTexto(x, y, w, cv, n, s, { px: 46 }); }
    cabChat(x, w);
  } else if (modo === "walter") {
    // el chat de Walter: sube hasta las 8:04 (el mensaje perdido entre dos audios, borde rojo apagado)
    cabChat(x, w, "Walter · Bar", null);
    const off = scr * 46;   // el contenido baja 460 px (subimos en el chat)
    x.save(); x.beginPath(); x.rect(0, 170, w, h - 170); x.clip(); x.translate(0, off);
    // (de arriba abajo) audio 3:20 · 8:04 "Lo de siempre + 2 de aceite" · audio 1:58 · ... · 11:00 "Rubén, ¿y mi pedido?"
    burbujaAudio(x, -350, w, AVATAR.sergio, "Sergio · Bar", "3:20", 0, { H: 280 });
    burbujaTexto(x, -50, w, AVATAR.walter, "Walter · Bar", "Lo de siempre + 2 de aceite", { px: 50, hora: "8:04", borde: rojo ? "#c7655b" : null, horaColor: rojo ? "#c7655b" : "#1f3254" });
    burbujaAudio(x, 230, w, AVATAR.beto, "Beto · Kiosco", "1:58", 0, { H: 280 });
    burbujaTexto(x, 560, w, AVATAR.walter, "Walter · Bar", "Rubén, ¿y mi pedido?", { px: 56, hora: "11:00" });
    x.restore();
    cabChat(x, w, "Walter · Bar", null);
    if (wa >= 0) {
      // el audio de Walter que entra abajo (sonando)
      x.fillStyle = "#16243d"; x.fillRect(0, 880, w, 320);
      burbujaAudio(x, 900, w, AVATAR.walter, "Walter · Bar", `0:0${Math.min(3, Math.floor(wa / 2))}`, wa / 8, { H: 280 });
    }
  } else if (modo === "cambie") {
    cabChat(x, w, "Graciela · Rotisería", null);
    const hh = burbujaTexto(x, 220, w, AVATAR.graciela, "Graciela · Rotisería", "Rubén, cambié todo. Te mando audio.", { px: 54, hora: "11:02" });
    burbujaAudio(x, 220 + hh + 30, w, AVATAR.graciela, "Graciela · Rotisería", "6:40", 0, { H: 330, durColor: "#c7655b", durPx: 72 });
  } else {
    // parte 2: tranquilo, nada nuevo
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2, 420, 170, 0, 7); x.fill(); tilde(x, w / 2, 420, 150);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 120); x.fillText("Nada", w / 2, 760); x.fillText("pendiente", w / 2, 900);
  }
  pantR.needsUpdate = true;
}
// ---- el catálogo de la distribuidora en el celular de un cliente (Graciela / Marta) ----
const PRODS_G = [["Aceite 1,5 L x 12", "$ 1.140", 4], ["Harina 000 · 25 kg", "$ 890", 2], ["Azúcar 1 kg x 10", "$ 610", 1], ["Agua 2 L x 6", "$ 320", 3]];
function dibujito(x, i, x0, y0, s = 1) {
  // el dibujito plano de cada producto: botella de aceite en caja kraft, bolsa de harina, caja de azúcar, botella de agua, bolsa de café
  x.save(); x.translate(x0, y0); x.scale(s, s); x.lineWidth = 6; x.strokeStyle = "#0b1220";
  x.fillStyle = ["#c9a46b", "#dcd9c8", "#efeee5", "#b9cde0", "#efeee5"][i]; x.beginPath(); x.roundRect(0, 0, 120, 130, 16); x.fill(); x.stroke();
  if (i === 0) { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(40, 24, 40, 92, 10); x.fill(); x.stroke(); x.fillStyle = "#5ce611"; x.fillRect(44, 66, 32, 22); }
  if (i === 1) { x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(28, 24); x.lineTo(92, 24); x.lineTo(100, 112); x.lineTo(20, 112); x.closePath(); x.fill(); x.stroke(); x.fillStyle = "#1f3254"; x.fillRect(24, 60, 72, 22); }
  if (i === 2) { x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(26, 26, 68, 86, 8); x.fill(); x.stroke(); x.fillStyle = "#efeee5"; for (const [a, b] of [[36, 40], [62, 40], [49, 70]]) x.fillRect(a, b, 20, 20); }
  if (i === 3) { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(40, 40, 40, 78, 12); x.fill(); x.stroke(); x.fillStyle = "#1f3254"; x.fillRect(50, 20, 20, 22); x.fillStyle = "#5ce611"; x.fillRect(42, 72, 36, 14); }
  if (i === 4) { x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(26, 30); x.lineTo(94, 30); x.lineTo(100, 116); x.lineTo(20, 116); x.closePath(); x.fill(); x.stroke(); x.fillStyle = "#5a3a24"; x.beginPath(); x.arc(60, 74, 15, 0, 7); x.fill(); x.fillStyle = "#1f3254"; x.fillRect(46, 34, 28, 10); }
  x.restore();
}
function cabCatalogo(x, w, sub) {
  x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 210); x.fillStyle = "#5ce611"; x.fillRect(0, 210, w, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Distribuidora Rubén", 800, 60, w - 70); x.fillText("Distribuidora Rubén", 36, 78);
  x.fillStyle = "#5ce611"; ajustar(x, sub, 700, 44, w - 70); x.fillText(sub, 36, 158);
}
let claveG = "";
function dibujarCelG(t) {
  const toc = t >= T.toca ? 1 : 0, nf = T.filas.filter((a) => t >= a).length, ped = t >= T.pedido ? 2 : t >= T.pedir ? 1 : 0;
  const clave = `${toc}|${nf}|${ped}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1200;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  cabCatalogo(x, w, "Tus precios · Rotisería Graciela");
  // el botón grande "Repetir lo de siempre" (con la flechita circular)
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, 250, w - 48, 170, 40); x.fill();
  if (toc && nf < 4) { x.strokeStyle = "#efeee5"; x.lineWidth = 12; x.stroke(); }
  x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.lineCap = "round"; x.beginPath(); x.arc(96, 335, 34, 0.5, 5.4); x.stroke();
  x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(128, 296); x.lineTo(136, 336); x.lineTo(100, 324); x.closePath(); x.fill();
  x.fillStyle = "#0b1220"; x.font = F(900, 52); x.textAlign = "left"; x.fillText("Repetir", 156, 306); x.fillText("lo de siempre", 156, 366);
  // el carrito: una fila por producto (con pop)
  PRODS_G.forEach(([n, p, c], i) => {
    const y = 450 + i * 150;
    x.fillStyle = i < nf ? "#efeee5" : "#22355a"; x.beginPath(); x.roundRect(24, y, w - 48, 136, 26); x.fill();
    if (i >= nf) return;
    dibujito(x, i, 40, y + 12, 0.86);
    x.fillStyle = "#0b1220"; x.font = F(800, 40); x.textAlign = "left"; ajustar(x, n, 800, 40, 300); x.fillText(n, 160, y + 46);
    x.fillStyle = "#1f3254"; x.font = F(700, 38); x.fillText(p, 160, y + 100);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(w - 140, y + 32, 96, 72, 36); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 50); x.textAlign = "center"; x.fillText(String(c), w - 92, y + 69); x.textAlign = "left";
  });
  // Pedir → Pedido ✓
  x.fillStyle = ped >= 2 ? "#5ce611" : nf >= 4 ? "#efeee5" : "#22355a"; x.beginPath(); x.roundRect(24, 1060, w - 48, 120, 60); x.fill();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, ped >= 2 ? 48 : 60);
  if (ped >= 2) { x.fillText("Pedido ✓ · Lo armamos hoy", w / 2, 1121); } else if (nf >= 4) x.fillText("Pedir · $ 7.910", w / 2, 1121);
  if (ped === 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.beginPath(); x.roundRect(14, 1050, w - 28, 140, 70); x.stroke(); }
  x.textAlign = "left";
  pantG.needsUpdate = true;
}
let claveMa = "";
function dibujarCelMa(t) {
  const n = T.mas.filter((a) => t >= a).length, ped = t >= T.pedidoM ? 2 : t >= T.pedirM ? 1 : 0;
  const clave = `${n}|${ped}`; if (clave === claveMa) return; claveMa = clave;
  const { x } = pantMa.userData, w = 600, h = 1200;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
  cabCatalogo(x, w, "Tus precios · Cafetería Marta");
  // la fila del café en grano, grande, con el selector [–] N [+]
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, 250, w - 48, 560, 36); x.fill();
  dibujito(x, 4, 48, 280, 1.15);
  x.fillStyle = "#0b1220"; x.font = F(900, 50); x.textAlign = "left"; x.fillText("Café en grano", 200, 320); x.font = F(800, 46); x.fillText("1 kg", 200, 380);
  x.fillStyle = "#1f3254"; x.font = F(700, 42); x.fillText("$ 690", 200, 436);
  const v = [0, 1, 4, 7][n];
  x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(48, 500, 130, 130, 30); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 90); x.textAlign = "center"; x.fillText("–", 113, 562);
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(w - 178, 500, 130, 130, 30); x.fill(); x.fillStyle = "#0b1220"; x.fillText("+", w - 113, 566);
  x.fillStyle = v === 7 ? "#3fa60a" : "#0b1220"; x.font = F(900, v === 7 ? 260 : 180); x.fillText(String(v), w / 2, 570 + (v === 7 ? 6 : 0));
  x.fillStyle = "#1f3254"; x.font = F(700, 44); x.fillText(v === 7 ? "Siete. Clarito." : "kg", w / 2, 740);
  // otras filas (cortas) debajo
  [["Azúcar 1 kg x 10", "$ 610"], ["Leche 1 L x 12", "$ 980"]].forEach(([nn, p], i) => {
    const y = 840 + i * 104; x.fillStyle = "#22355a"; x.beginPath(); x.roundRect(24, y, w - 48, 90, 22); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(700, 40); x.textAlign = "left"; x.fillText(nn, 48, y + 46); x.textAlign = "right"; x.fillText(p, w - 48, y + 46);
  });
  x.fillStyle = ped >= 2 ? "#5ce611" : n >= 3 ? "#efeee5" : "#22355a"; x.beginPath(); x.roundRect(24, 1066, w - 48, 116, 58); x.fill();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 62); if (n >= 3 || ped) x.fillText(ped >= 2 ? "Pedido ✓" : "Pedir", w / 2, 1125);
  if (ped === 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.beginPath(); x.roundRect(14, 1056, w - 28, 136, 68); x.stroke(); }
  x.textAlign = "left";
  pantMa.needsUpdate = true;
}
// ---- el monitor de Rubén: la planilla (parte 1) · el panel de pedidos (parte 2) ----
const FILAS_P = [["Graciela", "Aceite 1,5 L x 12", "4"], ["Marta", "Café en grano", "¿7?"], ["Beto", "Lo de siempre", "?"], ["Nelly", "Harina 000", "2"], ["Fede", "Agua 2 L x 6", "3"], ["Sergio", "Lo de siempre", "?"]];
const PEDIDOS = [["8:01", "Graciela · Rotisería", "Lo de siempre", "$ 7.910"], ["8:02", "Marta · Cafetería", "Café en grano 1 kg x 7", "$ 4.830"], ["8:04", "Walter · Bar", "Lo de siempre + 2 aceite", "$ 9.120"], ["8:04", "Beto · Kiosco", "Lo de siempre", "$ 3.400"], ["8:05", "Nelly · Panadería", "Harina 000 x 4", "$ 3.560"]];
let claveM = "";
function cargadosEn(t) {
  // la planilla de la parte 1: 0 → 12 → 27 → 39 durante el time-lapse
  if (t < T.lapse[0]) return 0;
  const u = sg(t, T.lapse[0], T.lapse[1]);
  return u >= 1 ? 39 : u >= 0.66 ? 27 : u >= 0.33 ? 12 : 3;
}
function cuentaEn(t) {
  // el panel de la parte 2: los que ya entraron
  if (t < T.q2b) return 1;
  if (t < T.q3) return t >= T.filaM ? 2 : 1;
  const k = T.cuenta.filter((a) => t >= a).length;
  return [2, 12, 27, 40][k];
}
function dibujarMonitor(t) {
  const parte2 = t >= P2;
  const n = parte2 ? cuentaEn(t) : cargadosEn(t);
  const rojo = !parte2 && t >= T.p5b ? 1 : 0, wOk = parte2 && t >= T.walterOk ? 1 : 0, man = parte2 ? (t >= T.mandar + 0.12 ? 2 : t >= T.mandar ? 1 : 0) : 0, hl = parte2 && t >= T.filaM && t < T.filaM + 0.6 ? 1 : 0;
  const clave = `${parte2}|${n}|${rojo}|${wOk}|${man}|${hl}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1280, h = 800;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!parte2) {
    // la planilla genérica: grilla crema con encabezado navy (sin ícono ni interfaz de ningún programa)
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#efeee5"; x.font = F(800, 66); x.fillText("Pedidos lunes", 40, 62);
    const cols = [24, 330, 980, w - 24], y0 = 140, rh = 92;
    x.fillStyle = "#1f3254"; x.fillRect(cols[0], y0, cols[3] - cols[0], 84);
    x.fillStyle = "#efeee5"; x.font = F(800, 50); ["Cliente", "Producto", "Cant."].forEach((c, i) => x.fillText(c, cols[i] + 18, y0 + 44));
    const vis = Math.min(FILAS_P.length, Math.ceil(n / 7) + (n ? 1 : 0));
    for (let r = 0; r < 5; r++) {
      const y = y0 + 84 + r * rh;
      x.fillStyle = r % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(cols[0], y, cols[3] - cols[0], rh);
      if (r < vis) { const f = FILAS_P[r]; x.fillStyle = "#0b1220"; x.font = F(700, 52); f.forEach((c, i) => x.fillText(c, cols[i] + 18, y + rh / 2 + 2)); }
    }
    x.strokeStyle = "#1f3254"; x.lineWidth = 4; for (const c of cols) { x.beginPath(); x.moveTo(c, y0); x.lineTo(c, y0 + 84 + 5 * rh); x.stroke(); }
    // el contador abajo a la derecha
    const yC = h - 66;
    x.fillStyle = rojo ? "#c7655b" : "#1f3254"; x.beginPath(); x.roundRect(w - 640, yC - 54, 616, 108, 26); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(900, 70); x.textAlign = "center"; x.fillText(rojo ? "39 de 40" : `Cargados: ${n}`, w - 332, yC + 2); x.textAlign = "left";
    if (rojo) { x.fillStyle = "#c7655b"; x.font = F(800, 54); x.fillText("Falta 1", 40, yC + 2); }
  } else {
    // el panel de pedidos de la distribuidora
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
    x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Pedidos · Lunes", 40, 62);
    x.textAlign = "right"; x.font = F(900, 64); x.fillStyle = "#5ce611"; x.fillText(t >= T.q3 ? "8:05" : "8:02", w - 40, 62); x.textAlign = "left";
    // el contador grande
    x.fillStyle = n >= 40 ? "#5ce611" : "#1f3254"; x.beginPath(); x.roundRect(30, 156, w - 60, 150, 30); x.fill();
    x.fillStyle = n >= 40 ? "#0b1220" : "#efeee5"; x.font = F(900, 92); x.fillText(`${n} de 40${n >= 40 ? " ✓" : ""}`, 64, 234);
    x.font = F(700, 46); x.textAlign = "right"; x.fillText("Cargados a mano: 0", w - 64, 234); x.textAlign = "left";
    // las filas (cliente, resumen, hora, total, tilde)
    const vis = Math.min(PEDIDOS.length, n >= 40 ? 5 : n);
    for (let i = 0; i < 4; i++) {
      const y = 330 + i * 112, row = PEDIDOS[i];
      if (i >= vis) { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, y, w - 60, 98, 22); x.fill(); continue; }
      const luz = (i === 2 && wOk) || (i === 1 && hl);
      x.fillStyle = luz ? "#5ce611" : "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 98, 22); x.fill();
      x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText(row[0], 56, y + 51); x.fillText(row[1].split(" · ")[0], 210, y + 51);
      x.fillStyle = "#1f3254"; x.font = F(700, 46); ajustar(x, row[2], 700, 46, man >= 2 ? 430 : 600); x.fillText(row[2], 470, y + 51);
      if (man >= 2) { x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(w - 360, y + 18, 252, 62, 31); x.fill(); x.fillStyle = "#5ce611"; x.font = F(800, 38); x.textAlign = "center"; x.fillText("Para armar", w - 234, y + 50); x.textAlign = "left"; }
      x.fillStyle = luz ? "#0b1220" : "#5ce611"; x.beginPath(); x.arc(w - 74, y + 49, 32, 0, 7); x.fill(); tilde(x, w - 74, y + 50, 26, luz ? "#5ce611" : "#0b1220");
    }
    // Mandar a armar
    x.fillStyle = man >= 2 ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(w - 520, h - 66, 490, 54, 27); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(900, 40); x.textAlign = "center"; x.fillText(man >= 2 ? "Al depósito ✓" : "Mandar a armar", w - 275, h - 38); x.textAlign = "left";
    if (man === 1) { x.strokeStyle = "#efeee5"; x.lineWidth = 8; x.beginPath(); x.roundRect(w - 530, h - 76, 510, 74, 37); x.stroke(); }
  }
  pantM.needsUpdate = true;
}
// ---- la tablet del operario: "Para armar · Walter · Bar", la lista por pasillo; cada caja tilda una casilla ----
let claveT = "";
function dibujarTablet(t) {
  const k = T.cajasW.filter((a) => t >= a + 0.12).length;
  const clave = `${k}`; if (clave === claveT) return; claveT = clave;
  const { x } = pantTab.userData, w = 900, h = 640;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.font = F(900, 64); x.fillText("Para armar · Walter", 36, 68);
  [["Pasillo 2", "Aceite x 3"], ["Pasillo 4", "Harina 000 x 2"], ["Pasillo 5", "Agua x 2"]].forEach(([p, n], i) => {
    const y = 160 + i * 156, ok = i === 0 ? k >= 3 : true;
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, y, w - 48, 136, 26); x.fill();
    x.fillStyle = "#1f3254"; x.font = F(800, 46); x.fillText(p, 54, y + 42); x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText(n, 54, y + 100);
    x.fillStyle = ok ? "#5ce611" : "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(w - 150, y + 24, 92, 92, 18); x.fill(); x.stroke();
    if (ok) tilde(x, w - 104, y + 70, 70);
    if (i === 0 && !ok) { x.fillStyle = "#1f3254"; x.font = F(900, 46); x.textAlign = "center"; x.fillText(`${k}/3`, w - 104, y + 70); x.textAlign = "left"; }
  });
  pantTab.needsUpdate = true;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla; de la-lista/dice-cuarenta) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cab = null, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0;
  const cabF = Math.max(Math.round(px * 0.62), 42);
  med.font = F(700, cabF * 2); const anchoCab = cab ? (med.measureText(cab.nombre).width / 2 + px * 1.05) : 0; med.font = F(800, px * 2);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width / 2 + (l.includes("[") ? px * 0.25 : 0)));
  const Wg = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9 + cabH);
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.textBaseline = "middle";
    if (cab) {
      const r = px * 0.45 * 2, cy = px * 0.55 * 2 + px * 0.2, cx = px * 0.65 * 2;
      avatar(x, cab.cv, cx, cy, r);
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
        } else { x.fillStyle = p.startsWith("▶") ? "#c7655b" : tinta; x.textAlign = "left"; x.fillText(p, xx, y); }
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
  // por debajo de 0,85 el globo no se achica: se desvanece
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
const CAB = { gra: { cv: AVATAR.graciela, nombre: "Graciela · Rotisería" }, wal: { cv: AVATAR.walter, nombre: "Walter · Bar" } };
const RAF = [[AVATAR.beto, "Beto · Kiosco", ["Lo de siempre."]], [AVATAR.nelly, "Nelly · Panadería", ["Lo mismo que el", "lunes, sin azúcar."]], [AVATAR.fede, "Fede · Rotisería", ["▶ 2:51"]], [AVATAR.sergio, "Sergio · Bar", ["Lo de siempre."]], [AVATAR.nelly, "Nelly · Panadería", ["▶ 1:12"]], [AVATAR.beto, "Beto · Kiosco", ["¿Y lo mío?"]], [AVATAR.fede, "Fede · Rotisería", ["Lo de siempre."]]];
const GL = {
  g1: crearGlobo(["Y nada, Rubén,", "así que mandame", "[lo de siempre.]", "¡Besos!"], 58, { cab: CAB.gra }),
  r1: crearGlobo(["Cuatro minutos para", "decir [lo de siempre.]"], 80),
  r2: crearGlobo(["¿Eso es un siete", "o una [mosca?]"], 86),
  raf: RAF.map(([cv, n, l]) => crearGlobo(l, 56, { cab: { cv, nombre: n } })),
  wal: crearGlobo(["Rubén, ¿y mi [pedido?]"], 66, { cab: CAB.wal }),
  w1: crearGlobo(["Dejá, Rubén.", "[Lo de siempre]", "se lo pedí a otro."], 72, { cab: CAB.wal }),
  r3: crearGlobo(["[Lo de siempre]", "era yo."], 96),
  cam: crearGlobo(["Rubén, cambié todo.", "Te mando audio.", "▶ 6:40"], 66, { cab: CAB.gra }),
  g2: crearGlobo(["[Lo de siempre.]"], 96),
  r4: crearGlobo(["Siete.", "Sin [mosca.]"], 100),
  r5a: crearGlobo(["Ocho y cinco."], 84),
  r5: crearGlobo(["Ocho y cinco.", "¿Y ahora qué hago", "hasta las [once?]"], 78),
  n1: crearGlobo(["¿[Vender?]"], 110),
};

// ================= MANOS SUELTAS (insertos del celular: la mano que lo sostiene y el dedo que toca) =================
// en el espacio del celular (sin escala): x a la derecha, y arriba, z hacia la persona
function crearManoCel(piel) {
  const g = new THREE.Group(), m = mat(piel, 0.55), ms = mat(new THREE.Color(piel).multiplyScalar(0.88).getHex(), 0.6);
  const palma = mesh(new THREE.SphereGeometry(1, 20, 14), m, 0.012, -0.075, -0.03); palma.scale.set(0.05, 0.06, 0.022); g.add(palma);
  // el pulgar sobre el borde derecho (por delante) y tres dedos por el borde izquierdo
  const pul = mesh(new THREE.CapsuleGeometry(0.01, 0.04, 4, 10), m, 0.047, -0.072, 0.012); pul.rotation.z = 0.7; g.add(pul);
  for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CapsuleGeometry(0.0095, 0.03, 4, 8), ms, -0.045, -0.04 - i * 0.022, 0.006); d.rotation.z = Math.PI / 2 - 0.2; g.add(d); }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  return g;
}
function crearDedo(piel) {
  // un índice con la mano asomando abajo (para tocar la pantalla)
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const d = mesh(new THREE.CapsuleGeometry(0.0105, 0.07, 4, 10), m, 0, -0.035, 0); g.add(d);
  const pu = mesh(new THREE.SphereGeometry(1, 16, 12), m, 0.006, -0.105, -0.004); pu.scale.set(0.034, 0.036, 0.024); g.add(pu);
  const pulg = mesh(new THREE.CapsuleGeometry(0.01, 0.035, 4, 8), m, 0.03, -0.085, 0.004); pulg.rotation.z = -0.7; g.add(pulg);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  return g;
}
function crearYema(piel) { const g = new THREE.Group(); const d = mesh(new THREE.CapsuleGeometry(0.0085, 0.05, 4, 10), mat(piel, 0.55), 0, -0.03, 0); d.castShadow = false; g.add(d); const u = mesh(new THREE.SphereGeometry(1, 12, 8), mat(0xf0d2bf, 0.4), 0, -0.004, 0.006); u.scale.set(0.006, 0.008, 0.003); g.add(u); return g; }
const MANO_R = crearManoCel(ELENCO.ruben.piel), DEDO_R = crearYema(ELENCO.ruben.piel), PULGAR_R = crearYema(ELENCO.ruben.piel);
const MANO_G = crearManoCel(ELENCO.clienta.piel), DEDO_G = crearDedo(ELENCO.clienta.piel); DEDO_G.scale.setScalar(0.62);
const MANO_MA = crearManoCel(ELENCO.duena.piel), DEDO_MA = crearDedo(ELENCO.duena.piel); DEDO_MA.scale.setScalar(0.62);
celR.add(MANO_R, DEDO_R, PULGAR_R); celG.add(MANO_G, DEDO_G); celMa.add(MANO_MA, DEDO_MA);
const SCW = 0.082 * 0.92 - 0.004, SCH = 0.162 * 0.95 - 0.006;   // la pantalla visible (sin escala)
const enCel = (px, py) => V3((px / 600 - 0.5) * SCW, (0.5 - py / 1200) * SCH, 0.009);
// el dedo toca (px, py) del lienzo; toque 0..1 = cuánto baja (1 = apoyado). Entra desde abajo a la derecha.
function ponerDedo(d, px, py, toque, vis = true) {
  d.visible = vis; if (!vis) return;
  const p = enCel(px, py); d.position.set(p.x + 0.002, p.y - 0.003, 0.009 + 0.003 + 0.014 * (1 - toque)); d.rotation.set(0.25, 0, 0.35);
}

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un plano,
// Catmull-Rom continua. Los insertos (null) se arman en renderAt.
const OY = OFI.piso;
const CAM_P1 = (k) => [lerp(0.1, 0.05, k), lerp(OY + 1.72, OY + 1.7, k), lerp(3.55, 3.3, k), lerp(0.02, 0.0, k), lerp(OY + 1.72, OY + 1.72, k), 1.15, 48];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  // P2: primer plano de Rubén, el celular entra por abajo
  ["P2", T.p2, [[T.p2, 0.2, OY + 1.55, 3.5, 0.02, OY + 1.52, 1.05, 40], [T.p3, 0.17, OY + 1.54, 3.3, 0.02, OY + 1.52, 1.05, 39]]],
  ["P3", T.p3, null],      // inserto del celular de Rubén (POV): la foto
  // P4: la ráfaga y las tres horas: órbita corta de frente al escritorio (el reloj y el termo siempre en cuadro)
  ["P4", T.p4, [[T.p4, -0.7, OY + 2.05, 3.55, 0.05, OY + 1.45, 1.0, 50], [r2((T.p4 + T.p5) / 2), 0.1, OY + 2.15, 3.75, 0.1, OY + 1.5, 1.0, 50], [T.p5, 0.95, OY + 2.05, 3.5, 0.15, OY + 1.45, 1.0, 50]]],
  ["P5", T.p5, null],      // inserto del celular: Walter, el mensaje de las 8:04
  ["P5b", T.p5b, null],    // el monitor: 39 de 40
  // P6: la pausa y el remate: primer plano frontal, el reloj arriba
  ["P6", T.p6, [[T.p6, 0.08, OY + 1.58, 3.6, 0.06, OY + 1.6, 1.0, 40], [T.p7, 0.06, OY + 1.56, 3.3, 0.05, OY + 1.6, 1.0, 39]]],
  // P7: plano medio desde el costado del escritorio: Rubén, el celular, el termo volcado
  ["P7", T.p7, [[T.p7, 1.45, OY + 1.72, 3.05, 0.1, OY + 1.42, 1.25, 46], [P1, 1.38, OY + 1.7, 2.9, 0.1, OY + 1.42, 1.25, 45]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, RX + 0.25, 1.62, -1.05, RX + 0.3, 1.25, -3.85, 44], [T.q1b, RX + 0.28, 1.6, -1.35, RX + 0.32, 1.25, -3.85, 43]]],
  ["Q1b", T.q1b, null],    // inserto del celular de Graciela (POV)
  ["Q2", T.q2, null],      // inserto del celular de Marta (POV)
  // Q2b: Rubén de perfil al monitor, con el mate
  ["Q2b", T.q2b, [[T.q2b, -1.6, OY + 1.72, 3.05, -0.38, OY + 1.4, 1.2, 46], [T.q3, -1.52, OY + 1.7, 2.9, -0.38, OY + 1.4, 1.2, 45]]],
  ["Q3", T.q3, null],      // inserto del panel → grúa al depósito (se arma en renderAt)
  ["Q4", T.q4, [[T.q4, 0.62, OY + 1.7, 4.75, 0.6, OY + 1.42, 0.6, 50], [T.c, 0.6, OY + 1.68, 4.5, 0.6, OY + 1.42, 0.6, 49]]],
  // C: Rubén a cámara (primer plano frontal, push-in suave; la cara arriba de la tarjeta)
  ["C", T.c, [[T.c, 0.02, OY + 1.42, 3.5, 0.02, OY + 1.08, 1.0, 40], [DUR, 0.02, OY + 1.41, 3.25, 0.02, OY + 1.08, 1.0, 39]]],
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
function ponerCam(v, t, quieta = false) {
  const mano = quieta ? 0 : Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + (quieta ? 0 : Math.sin(t * 0.67) * 0.002), v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
// una cámara de frente a una pantalla (plano local del objeto): llena `llena` del alto del cuadro
function camPantalla(obj, centroLocal, normalLocal, altoPant, llena, fov, t, extra = 0) {
  obj.updateMatrixWorld(true);
  const c = obj.localToWorld(centroLocal.clone()), n = normalLocal.clone().transformDirection(obj.matrixWorld);
  const d = altoPant / llena / (2 * Math.tan((fov * D2R) / 2)) + extra;
  const p = c.clone().add(n.multiplyScalar(d));
  ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, fov], t, true);
  camera.up.copy(V3(0, 1, 0).transformDirection(obj.matrixWorld)); camera.lookAt(c);
  return { c, p, d };
}
// la grúa de Q3: del inserto del monitor sube por encima de Rubén, cruza el vidrio y baja al depósito (pallet WALTER)
function camGrua(t) {
  monitor.updateMatrixWorld(true);
  const c = monitor.localToWorld(monitor.userData.centro.clone()), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
  const FOV = 46, dIns = (MON.W * 1.08) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
  const p0 = c.clone().add(n.clone().multiplyScalar(dIns));
  const K = [
    [T.q3, p0.x, p0.y, p0.z, c.x, c.y, c.z, FOV],
    [T.grua[0], p0.x, p0.y, p0.z, c.x, c.y, c.z, FOV],
    [r2(T.grua[0] + 0.3), p0.x - 0.15, OY + 2.6, p0.z + 0.25, -1.0, OY + 0.2, -2.5, 52],
    [r2(T.grua[0] + 0.62), -1.0, OY + 2.35, -1.3, W_PAL.x, 1.0, W_PAL.z, 54],
    [T.grua[1], W_PAL.x + 0.2, 2.75, W_PAL.z + 3.95, W_PAL.x + 0.12, 0.72, W_PAL.z - 0.3, 52],
    [T.q4, W_PAL.x + 0.19, 2.7, W_PAL.z + 3.8, W_PAL.x + 0.12, 0.72, W_PAL.z - 0.3, 51],
  ];
  const v = catmull(K, t);
  ponerCam(v, t, t < T.grua[0]);
}

// ================= POSES =================
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
};
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
// ---------- Rubén (sentado de espaldas a la pared del fondo, mirando a +z) ----------
const R_POS = { x: 0, y: OFI.piso - 0.08, z: 1.02 };
const MIRA_MON = -0.62;                 // giro de la cabeza para mirar el monitor (a su derecha, -x)
const TERMO0 = { x: 0.6, z: 1.72 }, MATE0 = { x: 0.42, z: 1.95 }, CEL0 = { x: -0.18, z: 2.05 };
function rubenBase(t) {
  return { ...R_POS, giro: 0, sentado: 1, inclina: 0.1, cabeza: { giro: 0, asiente: 0.12, ladea: 0.02 }, ...NADA, ojos: { x: 0, y: -0.2, abiertos: 0.95, tension: 0.1, feliz: 0 }, manoI: [0.36, 0.27, 0.36], manoD: [-0.3, 0.27, 0.3], codoI: null, codoD: null, dedoI: 0, dedoD: 0, t };
}
function miraCamara(pr, m, t) {
  camera.updateMatrixWorld(true); ruben.raiz.updateMatrixWorld(true);
  const cab = ruben.cabeza.getWorldPosition(_w).clone(), d = camera.position.clone().sub(cab);
  const g = Math.atan2(d.x, d.z) - ruben.raiz.rotation.y, a = -Math.atan2(d.y - 0.1, Math.hypot(d.x, d.z));
  pr.cabeza = { giro: lerp(pr.cabeza.giro, g, m), asiente: lerp(pr.cabeza.asiente, a, m), ladea: lerp(pr.cabeza.ladea ?? 0, 0, m) };
  pr.ojos = { ...pr.ojos, x: lerp(pr.ojos.x ?? 0, 0, m), y: lerp(pr.ojos.y ?? 0, 0.05, m) };
}
function poseRuben(t) {
  const parte2 = t >= P2;
  const pr = rubenBase(t);
  if (!parte2) {
    if (t < T.p3) {
      // P1-P2: el celular en la mano derecha (delante del pecho), lo mira; cara de nada
      pr.cabeza = { giro: -0.12, asiente: 0.42, ladea: 0.02 }; pr.ojos = { x: -0.1, y: -0.7, abiertos: 0.92, tension: 0.15 };
      if (t >= T.fin1 + 0.05) { pr.cabeza = { giro: -0.08, asiente: 0.3, ladea: 0.0 }; pr.ojos = { x: -0.05, y: -0.55, abiertos: 0.85, tension: 0.2 }; Object.assign(pr, { cejas: { alto: 0.05, ang: 0.0, asim: 0.4 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }); }
      bocaVoz(pr, t, T.r1, ENV.r1, 0.6);
    } else if (t < T.p4) {
      bocaVoz(pr, t, T.r2, ENV.r2, 0.6);
    } else if (t < T.p5) {
      // P4: tipea con dos dedos mirando el monitor; ceba tres veces (la izquierda al termo)
      pr.cabeza = { giro: MIRA_MON, asiente: 0.06, ladea: 0 }; pr.ojos = { x: -0.6, y: -0.1, abiertos: 0.9, tension: 0.35 };
      Object.assign(pr, { cejas: { alto: -0.1, ang: 0.35 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.85 } });
      teclado.updateMatrixWorld(true);
      const kI = Math.max(0, Math.sin(t * 23)), kD = Math.max(0, Math.sin(t * 23 + 2.3));
      pr.manoI = aCuerpo(ruben, teclado.localToWorld(V3(0.08, 0.075 + 0.05 * kI, -0.01))); pr.codoI = [1, -0.6, -0.2]; pr.dedoI = 1;
      pr.manoD = aCuerpo(ruben, teclado.localToWorld(V3(-0.1, 0.075 + 0.05 * kD, 0.0))); pr.codoD = [-1, -0.6, -0.2]; pr.dedoD = 1;
      for (const tc of T.ceba) {
        const u = Math.sin(Math.PI * sg(t, tc - 0.12, tc + 0.22));
        if (u > 0) { termo.updateMatrixWorld(true); const w = termo.getWorldPosition(_w).clone().add(V3(-0.02, 0.22, 0)); const k = aCuerpo(ruben, w); pr.manoI = pr.manoI.map((v, i) => lerp(v, k[i], u)); pr.dedoI = 1 - u; pr.cabeza = { giro: lerp(MIRA_MON, 0.35, u), asiente: 0.3 * u, ladea: 0 }; }
      }
    } else if (t < T.p6) {
      // P5/P5b: el celular en la mano (inserto) y el monitor
      pr.cabeza = { giro: MIRA_MON, asiente: 0.06, ladea: 0 }; pr.ojos = { x: -0.6, y: -0.1, abiertos: 0.9, tension: 0.3 };
    } else if (t < T.p7) {
      // P6: la pausa, mirando el celular (abajo), quieto; "Lo de siempre era yo." sin levantar la vista
      pr.cabeza = { giro: -0.06, asiente: 0.36, ladea: 0.03 }; pr.ojos = { x: -0.05, y: -0.75, abiertos: 0.82, tension: 0.35 };
      Object.assign(pr, { cejas: { alto: 0.15, ang: 0.35, asim: 0 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.9 } });
      bocaVoz(pr, t, T.r3, ENV.r3, 0.55);
    } else {
      // P7: deja el celular boca abajo (derecha) y toma mate (izquierda): la bombilla en vacío
      pr.cabeza = { giro: 0.0, asiente: 0.25, ladea: 0 }; pr.ojos = { x: 0, y: -0.4, abiertos: 0.82, tension: 0.3 };
      Object.assign(pr, SECO);
    }
    return pr;
  }
  // ---- parte 2: tranquilo, el mate en la izquierda ----
  if (t < T.q3) {
    // Q2b: de perfil al monitor
    pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.6, y: -0.05, abiertos: 0.95, feliz: 0.15 };
    Object.assign(pr, { cejas: { alto: 0.15, ang: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1 } });
    pr.manoI = [0.24, 0.36, 0.3]; pr.codoI = [1, -0.6, -0.2];
    bocaVoz(pr, t, T.r4, ENV.r4, 0.6);
    if (t >= T.r4 + 0.95) pr.boca.sonrisa = 0.45;
    return pr;
  }
  if (t < T.c) {
    // Q3 (toca "Mandar a armar") · Q4: mira el reloj, ceba; Nico en la puerta: lo mira
    pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.6, y: -0.05, abiertos: 0.95, feliz: 0.15 };
    const k = Math.sin(Math.PI * sg(t, T.mandar - 0.18, T.mandar + 0.1)); if (k > 0) { pr.manoD = [lerp(-0.3, -0.18, k), 0.27 + 0.03 * k, lerp(0.3, 0.45, k)]; pr.dedoD = 1; }
    if (t >= T.q4) {
      Object.assign(pr, BUENA);
      pr.cabeza = { giro: 0.25, asiente: -0.12, ladea: 0.04 }; pr.ojos = { x: 0.3, y: 0.55, abiertos: 1, feliz: 0.1 };   // mira el reloj (arriba a su izquierda)
      pr.cejas = { alto: 0.55, ang: 0.35 }; pr.boca = { sonrisa: 0.1, abierta: 0, ancho: 0.95 };
      if (t >= T.r5 + 0.95) { pr.cabeza = { giro: 0.1, asiente: 0.12, ladea: 0.06 }; pr.ojos = { x: 0.1, y: -0.1, abiertos: 0.95, feliz: 0 }; pr.cejas = { alto: 0.4, ang: 0.5, asim: 0.3 }; }
      if (t >= T.miraNico) { pr.cabeza = { giro: 0.55, asiente: 0.0, ladea: 0.0 }; pr.ojos = { x: 0.5, y: 0.05, abiertos: 0.85, feliz: 0 }; Object.assign(pr, { ...NADA, cejas: { alto: 0.0, ang: 0.0, asim: 0.5 } }); }
      bocaVoz(pr, t, T.r5, ENV.r5, 0.6);
    }
    pr.manoI = [0.24, 0.36, 0.3]; pr.codoI = [1, -0.6, -0.2];
    return pr;
  }
  // C: a cámara, media sonrisa, de colega
  Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 0.95, feliz: 0.2, x: 0, y: 0.05 }, cejas: { alto: 0.15, ang: 0.0, asim: 0.25 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.0 } });
  pr.cabeza = { giro: 0.4, asiente: 0.05, ladea: 0 }; pr.inclina = 0.06;
  pr.manoI = [0.24, 0.36, 0.3]; pr.codoI = [1, -0.6, -0.2];
  miraCamara(pr, eio(sg(t, T.c, T.c + 0.45)), t);
  bocaVoz(pr, t, T.r6, ENV.r6, 0.6);
  return pr;
}
// ---------- Graciela (rotisería): plano medio Q1 (el celular en la mano izquierda), después POV ----------
function poseGraciela(t) {
  const pr = { x: GRA.x, z: GRA.z, giro: -0.08, inclina: 0.04, cabeza: { giro: 0.05, asiente: 0.38, ladea: 0.04 }, ...CARA.sonrisa, ojos: { x: 0, y: -0.7, abiertos: 1, feliz: 0.25 }, ...BRAZOS.costado, t };
  pr.manoI = [0.1, 0.42, 0.34]; pr.codoI = [0.8, -0.6, -0.2]; pr.manoD = [-0.08, 0.4, 0.36]; pr.codoD = [-0.8, -0.6, -0.2]; pr.dedoD = 1;
  return pr;
}
function poseMarta(t) {
  return { x: MAR.x, z: MAR.z, giro: 0, inclina: 0.04, cabeza: { giro: 0, asiente: 0.38, ladea: 0.03 }, ...CARA.sonrisa, ojos: { x: 0, y: -0.7, abiertos: 1, feliz: 0.25 }, ...BRAZOS.costado, manoI: [0.1, 0.42, 0.34], codoI: [0.8, -0.6, -0.2], t };
}
// ---------- Nico (Q4): asoma por la puerta con el maletín ----------
function poseNico(t) {
  const u = eio(sg(t, T.puerta, T.puerta + 0.4));
  const p = poseEn(t, [
    [0, { x: (PUERTA.x0 + PUERTA.x1) / 2 + 0.05, z: -0.75, giro: -0.25, inclina: 0.0, cabeza: { giro: -0.3, asiente: 0.05, ladea: 0 }, ...CARA.sonrisa, ojos: { x: -0.3, y: 0, abiertos: 1, feliz: 0.2 }, ...BRAZOS.costado, manoI: [0.22, 0.1, 0.06], t }],
    [T.n1, { cabeza: { giro: -0.45, asiente: 0.08, ladea: 0.12 }, ...BUENA, ojos: { x: -0.4, y: 0, abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.45, ang: 0.15 } }, 0.2],
  ]);
  p.y = OFI.piso; p.z = lerp(-0.85, -0.12, u); p.x = lerp(1.25, 1.3, u); p.inclina = 0.14 * u; p.t = t;
  bocaVoz(p, t, T.n1, ENV.n1, 0.75);
  return p;
}
// ---------- el operario (Q3): pasa tres cajas del pallet de aceite al de Walter ----------
function poseOperario(t) {
  const ap = T.cajasW.reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.15, b + 0.2))), 0);
  const gi = T.cajasW.reduce((a, b) => a + sg(t, b - 0.25, b + 0.05) - sg(t, b + 0.05, b + 0.25), 0);
  return { x: W_PAL.x - 0.45, z: W_PAL.z - 0.8, giro: lerp(-1.0, 0.35, cl(gi)), inclina: 0.08 + 0.25 * ap, cabeza: { giro: -0.2, asiente: 0.3, ladea: 0 }, ...CARA.concentrada, manoI: [0.2, 0.25 + 0.2 * ap, 0.45], manoD: [-0.2, 0.25 + 0.2 * ap, 0.45], codoI: null, codoD: null, t };
}

// ================= ESTADOS DE LOS OBJETOS =================
function ponerReloj(t) {
  // 8:00 → 11:00 en el time-lapse (giro continuo); 11:00 hasta el final de la parte 1; parte 2: 8:00 → 8:05
  let min;
  if (t < P2) min = t < T.lapse[0] ? t / 60 : t < T.lapse[1] ? lerp(0.0, 180, eio(sg(t, T.lapse[0], T.lapse[1]))) : 180 + (t - T.lapse[1]) / 60;
  else min = t < T.q3 ? 2 + sg(t, P2, T.q3) * 2 : 5 + (t - T.q3) / 60;
  const sec = t < P2 && t >= T.lapse[1] ? Math.floor(t - T.lapse[1]) * 6 + (t >= T.p5 ? 6 : 0) : Math.floor(t * 1) * 6;
  reloj.userData.poner(8 + Math.floor(min / 60), min % 60, t < P2 && en(t, T.lapse[0], T.lapse[1]) ? (min * 60) % 60 : sec % 60);
  // las franjas de la persiana: se corren y cambian de ángulo con las horas (el sol sube)
  const h = t < P2 ? sg(t, T.lapse[0], T.lapse[1]) : 0.02;
  franjas.rotation.z = lerp(-0.42, -0.12, h); franjas.position.set(lerp(1.95, 1.45, h), OFI.piso + lerp(1.55, 1.05, h), 0.065);
  rayasT.offset.y = lerp(0, 0.6, h);
  franjasMesa.rotation.z = lerp(0.5, 0.15, h); franjasMesa.position.x = lerp(0.6, 0.35, h);
}
function ponerTermo(t) {
  const parte2 = t >= P2;
  termo.visible = true; termo.scale.setScalar(1.15);
  let rz = 0, y = MESA_Y, x = TERMO0.x, z = TERMO0.z, ry = 0.4;
  if (!parte2) {
    // P4: tres cebadas (cada una más inclinada: se va vaciando) · P7: acostado sobre el escritorio, la tapa abierta
    T.ceba.forEach((tc, i) => { const u = Math.sin(Math.PI * sg(t, tc - 0.1, tc + 0.22)); if (u > 0) { rz = -[0.7, 1.0, 1.35][i] * u; y = MESA_Y + 0.08 * u; x = TERMO0.x - 0.05 * u; } });
    if (t >= T.p5) { rz = 0; }
    if (t >= T.p7) { rz = Math.PI / 2; y = MESA_Y + 0.064; x = 0.62; z = 1.58; ry = 0.25; }
  }
  if (parte2) { x = 0.42; z = 1.42; }
  termo.position.set(x, y, z); termo.rotation.set(0, ry, rz);
  // Q4: parado y con vapor
  vapor.visible = parte2 && t >= T.q4 && t < T.c;
  if (vapor.visible) { termo.updateMatrixWorld(true); vapor.position.copy(termo.localToWorld(V3(0, 0.38, 0))); vapor.userData.actualizar(t, 1); }
}

// ================= RENDER =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function ponerLuces(lugar) {
  const of = lugar === "of", dep = lugar === "dep", rot = lugar === "rot", caf = lugar === "caf";
  for (const l of [solOf, cieloOf, rellenoOf]) l.visible = of;
  solDep.visible = dep; cieloDep.visible = dep || of;
  cieloDep.intensity = of ? 0.0 : 2.0;
  for (const l of [luzRot, cieloRot]) l.visible = rot;
  for (const l of [luzCaf, cieloCaf]) l.visible = caf;
}
// el celular en la mano, delante del pecho (la-lista: la regla de los celulares)
function celEnPecho(per, lado, bajar = 0, adelante = 0.4) {
  per.raiz.updateMatrixWorld(true);
  const q = new THREE.Quaternion(); per.raiz.getWorldQuaternion(q);
  const cab = per.cabeza.getWorldPosition(new THREE.Vector3());
  return aCuerpo(per, cab.add(V3(lado * 0.14, -0.2 - bajar, adelante).applyQuaternion(q)));
}
function pegarCel(per, cel, lado, mano, incl = 0.95) {
  const q = new THREE.Quaternion(); per.raiz.getWorldQuaternion(q);
  q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-incl, lado * 0.25, 0)));
  const m = per.brazos[mano].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(m.add(V3(0, 0.1, 0.03).applyQuaternion(q))); cel.quaternion.copy(q);
}
// el inserto POV de un celular: el celular quieto en el mundo (delante de los ojos de quien lo mira), la cámara de frente
function insertoCel(cel, pos, rotX, rotY, llena, t, push = 0, subir = 0) {
  cel.position.copy(pos); cel.rotation.set(-rotX, rotY, 0, "YXZ");
  const { c, p } = camPantalla(cel, V3(0, 0, 0), V3(0, 0, 1), 0.162 * 1.6, llena, 38, t, -push);
  if (subir) { const up = V3(0, 1, 0).transformDirection(cel.matrixWorld).multiplyScalar(subir); camera.position.copy(p.add(up)); camera.lookAt(c.add(up)); }
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  const lugar = ["Q1", "Q1b"].includes(planoActual) ? "rot" : planoActual === "Q2" ? "caf" : planoActual === "Q3" && t >= T.grua[0] + 0.45 ? "dep" : "of";
  ponerLuces(lugar);
  scene.background = new THREE.Color(lugar === "dep" ? 0xe8edf0 : 0x16243d);
  ROT.visible = lugar === "rot"; CAF.visible = lugar === "caf"; OF.visible = DEP.visible = lugar === "of" || lugar === "dep";
  // ---- pantallas y objetos ----
  dibujarCelR(t); dibujarMonitor(t);
  if (parte2) { dibujarCelG(t); dibujarCelMa(t); dibujarTablet(t); }
  ponerReloj(t); ponerTermo(t);
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  llamaM.color.setScalar(0.9 + 0.1 * Math.sin(t * 11) * Math.sin(t * 7.3));
  // el camión: medio vacío en la parte 1, cargándose en la 2
  camion.userData.carga.forEach((p, i) => (p.visible = i < (parte2 ? 4 : 2)));
  // la puerta (Q4): se abre 40° hacia la oficina
  puerta.rotation.y = parte2 ? 1.3 * eio(sg(t, T.puerta, T.puerta + 0.35)) : 0;
  remitos.visible = !parte2;
  // ---- Rubén ----
  const pr = poseRuben(t);
  ruben.raiz.visible = lugar === "of" && !["P3", "P5"].includes(planoActual);
  ruben.poner(pr);
  ruben.cabeza.visible = true;
  // el celular de Rubén: en la mano (P1-P3, P5-P6), sobre el escritorio (P4), boca abajo (P7, parte 2)
  MANO_R.visible = DEDO_R.visible = PULGAR_R.visible = false;
  celR.visible = true;
  {
    const enMano = !parte2 && (t < T.p4 || (t >= T.p5 && t < T.bocaAbajo[0]));
    const desk = V3(CEL0.x, MESA_Y + 0.012, CEL0.z);
    if (enMano) {
      pr.manoD = celEnPecho(ruben, -1, planoActual === "P2" ? 0.12 : 0); pr.codoD = [-1, -0.6, -0.1];
      ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      pegarCel(ruben, celR, -1, 1);
    } else if (!parte2 && t >= T.bocaAbajo[0] && t < T.p7 + 2) {
      // P7: lo deja boca abajo sobre el escritorio
      const u = eio(sg(t, T.bocaAbajo[0], T.bocaAbajo[1]));
      pr.manoD = celEnPecho(ruben, -1); pr.codoD = [-1, -0.6, -0.1]; ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
      pegarCel(ruben, celR, -1, 1);
      const p0 = celR.position.clone(), q0 = celR.quaternion.clone();
      const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0.2, 0));
      celR.position.copy(p0.lerp(desk, u)).add(V3(0, 0.06 * Math.sin(Math.PI * u), 0)); celR.quaternion.copy(q0.slerp(q1, u));
      const k = aCuerpo(ruben, celR.position.clone().add(V3(0.0, 0.03, -0.04)));
      pr.manoD = k; ruben.poner(pr);
    } else if (parte2) {
      celR.position.set(-0.3, MESA_Y + 0.012, 2.15); celR.rotation.set(-Math.PI / 2, 0, 0.3);
    } else {
      celR.position.set(CEL0.x, MESA_Y + 0.012, CEL0.z); celR.rotation.set(-Math.PI / 2, 0, 0.15);
    }
  }
  // el mate: en el escritorio (parte 1, salvo el sorbo de P7), en la mano izquierda (parte 2)
  {
    const enMano = parte2 || (t >= T.p7);
    if (!enMano) { mate.position.set(MATE0.x, MESA_Y, MATE0.z); mate.rotation.set(0, -Math.PI / 2, 0); }
    else {
      const so = !parte2 ? eio(sg(t, T.sorbo[0], T.sorbo[0] + 0.25)) * (1 - sg(t, T.sorbo[1], T.sorbo[1] + 0.2)) : 0;
      if (!parte2) { const m0 = V3(MATE0.x, MESA_Y + 0.1, MATE0.z), k = eio(sg(t, T.p7 + 0.5, T.sorbo[0])); pr.manoI = aCuerpo(ruben, m0.clone().add(V3(0, 0.0 + 0.2 * k, -0.15 * k))); pr.codoI = [1, -0.6, -0.2]; ruben.poner(pr); }
      const m = ruben.brazos[0].mano.getWorldPosition(_a).clone(), yaw = ruben.raiz.rotation.y + Math.PI / 2;
      mate.rotation.set(0, yaw, 0.4 * so); mate.position.copy(m).add(V3(0, -0.07, 0));
      if (so > 0) {
        ruben.raiz.updateMatrixWorld(true);
        const boca = ruben.cabeza.localToWorld(V3(0.05, 0.17, 0.3));
        mate.updateMatrixWorld(true);
        const punta = V3(0.075, 0.305, 0).multiplyScalar(1.12).applyEuler(mate.rotation);
        mate.position.lerp(boca.sub(punta), so);
      }
      if (!parte2 && t < T.p7 + 0.5) { mate.position.set(MATE0.x, MESA_Y, MATE0.z); mate.rotation.set(0, -Math.PI / 2, 0); }
    }
  }
  // ---- Graciela, Marta, Nico, el operario ----
  graciela.raiz.visible = lugar === "rot"; marta.raiz.visible = false; nico.raiz.visible = parte2 && planoActual === "Q4"; operario.raiz.visible = lugar === "dep";
  celG.visible = lugar === "rot"; celMa.visible = lugar === "caf"; maletin.visible = nico.raiz.visible;
  if (graciela.raiz.visible) {
    const pg = poseGraciela(t); graciela.poner(pg); graciela.raiz.position.x += RX;
    pg.manoI = celEnPecho(graciela, 1, 0.05); pg.codoI = [1, -0.6, 0.1]; graciela.poner(pg); graciela.raiz.position.x += RX; graciela.raiz.updateMatrixWorld(true);
    pegarCel(graciela, celG, 1, 0);
  }
  if (nico.raiz.visible) {
    const pn = poseNico(t); nico.poner(pn);
    const m = nico.brazos[0].mano.getWorldPosition(_a); maletin.position.copy(m).add(V3(0.02, -0.2, 0)); maletin.rotation.set(0, -0.25, 0);
  }
  if (operario.raiz.visible) operario.poner(poseOperario(t));
  // las 3 cajas al pallet WALTER: del pallet de aceite a las manos del operario y de ahí al pallet
  CAJAS_W.forEach((c, i) => {
    const tc = T.cajasW[i];
    c.visible = parte2 && t >= T.q3;
    const u = eio(sg(t, tc - 0.25, tc + 0.1));
    c.position.copy(CW_ORIG[i]).lerp(CW_DEST[i], u); c.position.y += Math.sin(Math.PI * u) * 0.35; c.rotation.set(0, lerp(0, 0.04 * (i - 1), u), 0);
  });
  // ---- cámara (insertos) ----
  const pa = planoActual;
  if (pa === "P3" || pa === "P5") {
    // POV de Rubén: el celular delante, sobre el escritorio; la mano derecha lo sostiene; en P3 el zoom con dos dedos
    ruben.cabeza.visible = false;
    insertoCel(celR, V3(-0.12, MESA_Y + 0.42, 1.55), 0.95, 0.12, pa === "P3" ? 0.62 : 0.56, t, 0.03 * sg(t, pl[1], pl[1] + 1.5), pa === "P3" ? 0.035 : 0.06);
    MANO_R.visible = true; MANO_R.position.set(0, 0, 0); MANO_R.rotation.set(0, 0, 0);
    if (pa === "P3") {
      const z = eio(sg(t, T.zoom[0], T.zoom[1])), toq = sg(t, T.zoom[0] - 0.15, T.zoom[0]) * (1 - sg(t, T.zoom[1], T.zoom[1] + 0.12));
      ponerDedo(DEDO_R, 360 + 170 * z, 700 + 280 * z, toq, toq > 0.01); DEDO_R.rotation.z = 0.6;
      ponerDedo(PULGAR_R, 240 - 170 * z, 560 + 120 * z, toq, toq > 0.01); PULGAR_R.rotation.z = -0.9;
    }
  } else if (pa === "P5b") {
    // el monitor de frente: 39 de 40 (llena el ancho)
    monitor.updateMatrixWorld(true);
    const FOV = 44, d = (MON.W / 1.0) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    const c = monitor.localToWorld(monitor.userData.centro.clone()), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
    const p = c.clone().add(n.multiplyScalar(d * lerp(1.06, 1.0, eio(sg(t, T.p5b, T.p6)))));
    ponerCam([p.x, p.y + 0.05, p.z, c.x, c.y + 0.05, c.z, FOV], t, true);
  } else if (pa === "Q1b") {
    graciela.cabeza.visible = false; graciela.raiz.visible = false;
    insertoCel(celG, V3(RX + GRA.x + 0.05, 1.32, GRA.z + 0.45), 0.9, 0.0, 0.6, t, 0.03 * sg(t, pl[1], T.q2), 0.03);
    MANO_G.visible = true; MANO_G.position.set(0, 0, 0);
    const toq = Math.max(Math.sin(Math.PI * sg(t, T.toca - 0.16, T.toca + 0.08)), Math.sin(Math.PI * sg(t, T.pedir - 0.16, T.pedir + 0.08)));
    const tgt = t < T.toca + 0.3 ? [470, 380] : [470, 1130];
    ponerDedo(DEDO_G, tgt[0], tgt[1], toq, en(t, T.toca - 0.45, T.toca + 0.3) || en(t, T.pedir - 0.45, T.pedido + 0.25));
  } else if (pa === "Q2") {
    insertoCel(celMa, V3(CX + 0.05, 1.4, -2.85), 0.5, 0.0, 0.6, t, 0.03 * sg(t, pl[1], T.q2b), 0.02);
    MANO_MA.visible = true; MANO_MA.position.set(0, 0, 0);
    const toq = Math.max(...T.mas.map((a) => Math.sin(Math.PI * sg(t, a - 0.12, a + 0.06))), Math.sin(Math.PI * sg(t, T.pedirM - 0.12, T.pedirM + 0.06)));
    const tgt = t < T.mas[2] + 0.15 ? [w2(470), 590] : [470, 1135];
    ponerDedo(DEDO_MA, tgt[0], tgt[1], toq, en(t, T.mas[0] - 0.3, T.pedidoM + 0.25));
  } else if (pa === "Q3") {
    camGrua(t);
  }
  if (!["Q1b"].includes(pa)) { MANO_G.visible = DEDO_G.visible = false; }
  if (!["Q2"].includes(pa)) { MANO_MA.visible = DEDO_MA.visible = false; }
  if (pa !== "P3") { DEDO_R.visible = PULGAR_R.visible = false; }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo ----
  for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const px = (obj, loc = V3(0, 0, 0)) => { obj.updateMatrixWorld(true); return enPantalla(obj.localToWorld(loc)); };
    if (pa === "P1") ponerGlobo(GL.g1, 330, 700, ent(T.g1 - 0.08), px(celR, V3(0, 0.09, 0)));
    if (pa === "P2" && t >= T.r1 - 0.03) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r1, 540, 330, ent(T.r1 - 0.03), [bx, by - 40]); }
    if (pa === "P3" && t >= T.r2 - 0.03) ponerGlobo(GL.r2, 540, 250, ent(T.r2 - 0.03), null);
    if (pa === "P4") {
      // la ráfaga: se apilan arriba (sin voz), cada una empuja a las anteriores
      const n = T.rafaga.filter((a) => t >= a).length;
      for (let i = 0; i < n; i++) { const pos = n - 1 - i; if (pos > 2) continue; ponerGlobo(GL.raf[i], i % 2 ? 620 : 460, 240 + pos * 262, ent(T.rafaga[i]) * (pos > 1 ? 0.95 : 1), null, 4 - pos); }
    }
    if (pa === "P5") {
      if (t < T.w1) ponerGlobo(GL.wal, 540, 260, ent(T.walter), null);
      else ponerGlobo(GL.w1, 540, 300, ent(T.w1), null);
    }
    if (pa === "P5b") ponerGlobo(GL.w1, 540, 300, 1, null);
    if (pa === "P6" && t >= T.r3 - 0.03) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r3, 540, 320, ent(T.r3 - 0.03), [bx, by - 40]); }
    if (pa === "P7") ponerGlobo(GL.cam, 560, 330, ent(T.cambie), px(celR));
    if (pa === "Q1b" && t >= T.g2 - 0.03) ponerGlobo(GL.g2, 540, 230, ent(T.g2 - 0.03), null);
    if (pa === "Q2b" && t >= T.r4 - 0.03) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r4, 640, 360, ent(T.r4 - 0.03), [bx, by - 40]); }
    if (pa === "Q4" && t >= T.r5 - 0.03 && t < T.n1) { const [bx, by] = bocaPx(ruben); ponerGlobo(t >= T.r5 + 0.95 ? GL.r5 : GL.r5a, 420, 330, ent(T.r5 - 0.03), [bx, by - 40]); }
    if (pa === "Q4" && t >= T.n1 - 0.03) { const [bx, by] = bocaPx(nico); ponerGlobo(GL.n1, 760, 330, ent(T.n1 - 0.03), [bx, by - 40]); }
  }
  renderer.render(scene, camera);
}
function w2(v) { return v; }

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { ruben: bocaPx(ruben), plano: planoActual, nico: [nico.raiz.visible, ...nico.raiz.position.toArray().map((v) => +v.toFixed(2))], nicoPx: bocaPx(nico), cam: camera.position.toArray().map((v) => +v.toFixed(2)), fov: camera.fov }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
