// Capa 3D de la-lista (Three.js r170 local). Base técnica: reels/ya-lo-cargo (globos de diálogo pegados a la cámara en
// píxeles de pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Dos lugares en el mismo mundo, lejos uno del otro:
//   LA DISTRIBUIDORA DE RUBÉN (alrededor del origen): el depósito (piso y = 0, z de -23 a 0) con racks, pallets y seis
//     campanas de luz; arriba, en z 0..4,6, la oficina vidriada (piso y = 3,2) con el vidrio en z = 0 mirando al
//     depósito. Rubén se sienta de espaldas al vidrio, mirando a +z (a la cámara); el escritorio delante de él.
//     En cámara (mirando a -z) la derecha de la pantalla es +x.
//   LA ROTISERÍA DE GRACIELA (x = RX): adentro y la vereda con la calle.
//   PARTE 1 (noche): "¿Me pasás la lista actualizada?" · la cinta de rotuladora con el nombre del archivo crece en cada
//            versión · las campanas se apagan · "¿En cuál? Tengo siete." · "Ocho." · "¿Me la mandás en PDF?"
//   PARTE 2 (18:30): el proveedor otra vez · un precio, una vez · "¿Algo más?" · el tríptico: tres celulares de clientes
//            donde el precio cambia a la vez · Graciela pide sola · los pedidos entran solos · el celular que no suena.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, poseEn, CARA, BRAZOS, pegarACamara, crearMate, crearTermo, crearCelular, crearLapicera } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('600 60px "Plex"')]);

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
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: !VER.includes("noaa"), preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;   // (ronda 1: PCFSoft es mucho más caro en SwiftShader)
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
const NOCHE = new THREE.Color(0x0b1220), TARDE = new THREE.Color(0x16243d);
scene.background = NOCHE;
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 140);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x3a3c42);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  tira(4, 6, -6, 2, -1, Math.PI / 2, 0xffe8cc, 1.0);
  tira(1.4, 8, 4, 1, 6, 0, 0xc8d4ff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
// (ronda 1, rendimiento) sin entorno PMREM: en SwiftShader costaba ~2 s por cuadro; lo reemplazan las hemisféricas
scene.environment = null;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, celeste: 0xb9cde0, calida: 0xffe2b0 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.08, depthWrite: false }),   // (ronda 1: Physical era caro y casi no se ve)
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const caja = (w, h, d, m, x, y, z, r = 0.02) => mesh(rbox(w, h, d, r, 2), m, x, y, z);
const cajaS = (w, h, d, m, x, y, z) => mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z);   // (ronda 1) sin redondeo: el depósito lejano
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const MONO = (s) => `600 ${s}px "Plex", monospace`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };

// ---------- rendimiento (ronda 1): fundir la geometría estática de un lugar en una malla por material ----------
// En SwiftShader cada malla es un draw call (y otro más por cada sombra): los racks con sus pallets eran miles.
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
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ---------- los íconos que se repiten en las pantallas: la hojita de planilla (crema con grilla navy, esquina doblada)
function hojita(x, cx, cy, h, borde = "#0b1220") {
  const w = h * 0.78, x0 = cx - w / 2, y0 = cy - h / 2, d = h * 0.26;
  x.fillStyle = "#efeee5"; x.strokeStyle = borde; x.lineWidth = Math.max(3, h * 0.07); x.lineJoin = "round";
  x.beginPath(); x.moveTo(x0, y0); x.lineTo(x0 + w - d, y0); x.lineTo(x0 + w, y0 + d); x.lineTo(x0 + w, y0 + h); x.lineTo(x0, y0 + h); x.closePath(); x.fill(); x.stroke();
  x.beginPath(); x.moveTo(x0 + w - d, y0); x.lineTo(x0 + w - d, y0 + d); x.lineTo(x0 + w, y0 + d); x.stroke();
  x.lineWidth = Math.max(2, h * 0.045);
  for (let i = 1; i <= 3; i++) { const yy = y0 + d + (h - d) * (i / 4.2); x.beginPath(); x.moveTo(x0 + w * 0.16, yy); x.lineTo(x0 + w * 0.84, yy); x.stroke(); }
  x.beginPath(); x.moveTo(cx, y0 + d * 0.9); x.lineTo(cx, y0 + h * 0.86); x.stroke();
}

// =====================================================================================================
// LA DISTRIBUIDORA: el depósito
// =====================================================================================================
const DEP = new THREE.Group(); scene.add(DEP);
const DX0 = -10, DX1 = 10, DZ0 = -23, DZ1 = 0, DH = 8.5;
const OFI = { x0: -3.6, x1: 3.6, z0: 0, z1: 6.2, piso: 3.2, alto: 2.8 };
const MESA_Y = OFI.piso + 0.76;
const MAT_PISO = mat(0x2a3a56, 0.9), MAT_PARED = mat(0x1f3254, 0.92);
{
  // piso navy (de noche) con las líneas de pasillo crema
  const piso = mesh(new THREE.PlaneGeometry(DX1 - DX0 + 2, DZ1 - DZ0 + 2), MAT_PISO, 0, 0, (DZ0 + DZ1) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; DEP.add(piso);
  const linea = (x, z, w, d) => { const l = mesh(new THREE.PlaneGeometry(w, d), mat(0x8e94a0, 0.85), x, 0.006, z); l.rotation.x = -Math.PI / 2; l.castShadow = false; DEP.add(l); };
  for (const x of [-1.6, 1.6]) linea(x, -11.5, 0.12, 21);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.3), MAT_PARED, x, y, z); p.rotation.y = ry; p.castShadow = false; DEP.add(p); };
  pared(DX1 - DX0, DH, 0, DH / 2, DZ1 + OFI.z1 + 0.15, 0);                                 // detrás de la oficina
  for (const x of [DX0 - 0.15, DX1 + 0.15]) pared(DZ1 + OFI.z1 - DZ0 + 0.3, DH, x, DH / 2, (DZ0 + DZ1 + OFI.z1) / 2, Math.PI / 2);
  // el fondo: la pared con el portón abierto (x -2..2, hasta 4,4 de alto)
  pared(DX1 - 2, DH, (DX1 + 2) / 2, DH / 2, DZ0 - 0.15, 0); pared(-2 - DX0, DH, (DX0 - 2) / 2, DH / 2, DZ0 - 0.15, 0);
  pared(4, DH - 4.4, 0, 4.4 + (DH - 4.4) / 2, DZ0 - 0.15, 0);
  DEP.add(caja(0.3, 4.5, 0.4, M.navy3, -2.1, 2.25, DZ0)); DEP.add(caja(0.3, 4.5, 0.4, M.navy3, 2.1, 2.25, DZ0)); DEP.add(caja(4.5, 0.35, 0.4, M.navy3, 0, 4.45, DZ0));
  // el techo
  const techo = mesh(new THREE.BoxGeometry(DX1 - DX0 + 0.6, 0.2, DZ1 + OFI.z1 - DZ0 + 0.6), mat(0x16243d, 0.95), 0, DH + 0.1, (DZ0 + DZ1 + OFI.z1) / 2); techo.castShadow = false; DEP.add(techo);
  for (let z = -20; z < 0; z += 4) DEP.add(caja(DX1 - DX0, 0.25, 0.25, M.navy3, 0, DH - 0.2, z));   // las cerchas
}
// afuera del portón: de noche, la vereda y la calle navy con un farol; a las 18:30 el cielo navy claro
const AFUERA = new THREE.Group(); scene.add(AFUERA);
const cieloPorton = new THREE.MeshBasicMaterial({ color: 0x16243d });
{
  const c = new THREE.Mesh(new THREE.PlaneGeometry(30, 14), cieloPorton); c.position.set(0, 6, DZ0 - 12); AFUERA.add(c);
  const v = mesh(new THREE.PlaneGeometry(30, 12), mat(0x3a4660, 0.9), 0, 0.0, DZ0 - 6); v.rotation.x = -Math.PI / 2; AFUERA.add(v);
  for (const x of [-7, 7]) { AFUERA.add(caja(7, 5, 0.3, mat(0x1f3254, 0.9), x, 2.5, DZ0 - 9)); AFUERA.add(caja(1.2, 1.4, 0.05, mat(0xffe2b0, 0.5, { emissive: 0xffe2b0, emissiveIntensity: 0.6 }), x + 1, 2.4, DZ0 - 8.83)); }
  AFUERA.add(caja(0.12, 4.2, 0.12, M.navy3, 3.2, 2.1, DZ0 - 4));
  AFUERA.add(mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffe2b0 }), 3.2, 4.3, DZ0 - 4));
}
// ---- racks selectivos (de ya-lo-cargo): parantes navy3, largueros verdes, 4 niveles con pallets ----
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
  else if (tipo === 2) { const fm = mat(0x7fc46a, 0.25, { transparent: true, opacity: 0.85 }); for (let k = 0; k < 2; k++) g.add(cajaS(1.1, 0.42, 0.85, fm, 0, 0.36 + k * 0.43, 0)); }
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
const RACK_X = [-7.6, -4.4, 4.4, 7.6];
for (const x of RACK_X) { const r = crearRack(15, 10); r.rotation.y = Math.PI / 2; r.position.set(x, 0, -11.5); DEP.add(r); }
for (const [x, z, tp] of [[-2.4, -6.5, 0], [2.6, -14.5, 3], [-2.5, -17.5, 1]]) { const p = new THREE.Group(); p.position.set(x, 0, z); cargaPallet(p, tp); DEP.add(p); }
// ---- las seis campanas de luz: cono navy3, foco crema; cada una con su luz hacia abajo (sin sombra) ----
const CAMPANAS = [];
{
  const conoG = new THREE.CylinderGeometry(0.16, 0.62, 0.5, 24, 1, true);
  [[-6.0, -5], [0, -5], [6.0, -5], [-6.0, -14], [0, -14], [6.0, -14]].forEach(([x, z], i) => {
    const g = new THREE.Group(); g.position.set(x, 6.9, z); DEP.add(g);
    g.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, DH - 7.15, 6), M.navy3, 0, (DH - 6.9) / 2 + 0.25, 0));
    const cono = mesh(conoG, mat(C.navy3, 0.5, { side: THREE.DoubleSide }), 0, 0, 0); g.add(cono);
    g.add(caja(0.34, 0.12, 0.34, M.navy3, 0, 0.28, 0, 0.04));
    const focoM = new THREE.MeshBasicMaterial({ color: 0xfff1d6, toneMapped: false });
    const foco = new THREE.Mesh(new THREE.CircleGeometry(0.56, 24), focoM); foco.rotation.x = Math.PI / 2; foco.position.y = -0.24; g.add(foco);
    // (ronda 1, rendimiento) sin SpotLight por campana (seis luces por píxel hacían el render 4 veces más lento): el charco
    // de luz es un disco plano un poco más claro sobre el piso (color plano, sin degradé: no hace bandas en Instagram)
    const charcoM = new THREE.MeshBasicMaterial({ color: 0x3a4c70, transparent: true, opacity: 1, depthWrite: false });
    const charco = new THREE.Mesh(new THREE.CircleGeometry(2.3, 40), charcoM); charco.rotation.x = -Math.PI / 2; charco.position.set(x, 0.012, z); charco.renderOrder = 1; DEP.add(charco);
    const luz = { intensity: 0, visible: true };
    CAMPANAS.push({ focoM, luz, i, charcoM });
  });
}
const depAmb = new THREE.HemisphereLight(0x7f8fb0, 0x1a2234, 0.0); scene.add(depAmb);   // el depósito en penumbra (navy)

// =====================================================================================================
// LA OFICINA VIDRIADA (arriba del depósito, de espaldas al vidrio)
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const pantM = lienzo(1024, 640, () => {});       // el monitor
const pantR = lienzo(600, 1200, () => {});       // el celular de Rubén
const DESK = { x0: -0.85, x1: 0.85, z0: 1.25, z1: 3.45 };   // (ronda 2) más fondo: sin franja vacía abajo en los planos abiertos
const ZT = 1.78;                                  // la línea de la cinta (de canto, de frente a la cámara)
const X0 = -0.5;                                 // la ranura de la rotuladora (la cinta sale hacia +x)
let monitor, telefono, botonAlt, celR, termo, mate, taza, lampara, pila;
{
  const OW = OFI.x1 - OFI.x0, OC = (OFI.x0 + OFI.x1) / 2, OZ = (OFI.z0 + OFI.z1) / 2;
  // el piso de la oficina (madera) sobre una losa navy3 que se ve desde el depósito; las columnas
  OF.add(caja(OW + 0.4, 0.3, OFI.z1 - OFI.z0 + 0.4, M.navy3, OC, OFI.piso - 0.15, OZ));
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#a9835a"; x.fillRect(0, 0, w, h); x.strokeStyle = "#8f6d48"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p2 = mesh(new THREE.PlaneGeometry(OW, OFI.z1 - OFI.z0), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), OC, OFI.piso + 0.005, OZ); p2.rotation.x = -Math.PI / 2; p2.castShadow = false; OF.add(p2);
  for (const x of [OFI.x0, 0, OFI.x1]) OF.add(caja(0.28, OFI.piso - 0.3, 0.28, M.navy3, x, (OFI.piso - 0.3) / 2, 0.2));
  // el techo y las paredes (crema, la de atrás con un tablero de corcho)
  OF.add(caja(OW, 0.15, OFI.z1 - OFI.z0, M.navy3, OC, OFI.piso + OFI.alto + 0.07, OZ));
  const paredOf = mat(0xe6e3d6, 0.85);
  OF.add(caja(OW, OFI.alto, 0.12, paredOf, OC, OFI.piso + OFI.alto / 2, OFI.z1));
  for (const x of [OFI.x0, OFI.x1]) OF.add(caja(0.12, OFI.alto, OFI.z1 - OFI.z0, paredOf, x, OFI.piso + OFI.alto / 2, OZ));
  // el vidrio que da al depósito (z = 0) con perfiles navy y una hoja corrediza abierta (x 1,9..3,1: por ahí sale la
  // etiqueta en la parte 2)
  for (const [a, b] of [[OFI.x0, 1.9], [3.1, OFI.x1]]) { const v = new THREE.Mesh(new THREE.PlaneGeometry(b - a, OFI.alto), M.vidrio); v.position.set((a + b) / 2, OFI.piso + OFI.alto / 2, 0); v.renderOrder = 3; OF.add(v); }
  for (const x of [OFI.x0, -1.75, 1.9, 3.1, OFI.x1]) OF.add(caja(0.07, OFI.alto, 0.09, M.navy, x, OFI.piso + OFI.alto / 2, 0));
  OF.add(caja(OW, 0.08, 0.1, M.navy, OC, OFI.piso + OFI.alto, 0)); OF.add(caja(OW, 0.07, 0.1, M.navy, OC, OFI.piso + 0.95, 0)); OF.add(caja(OW, 0.12, 0.1, M.navy, OC, OFI.piso + 0.06, 0));
  // la persiana americana a medio bajar en el tramo izquierdo del vidrio (rayas planas, sin degradé)
  for (let i = 0; i < 9; i++) OF.add(caja(1.8, 0.035, 0.02, mat(C.cr2, 0.7), -2.68, OFI.piso + OFI.alto - 0.12 - i * 0.075, 0.08, 0.005));
  OF.add(caja(1.85, 0.06, 0.05, M.navy3, -2.68, OFI.piso + OFI.alto - 0.05, 0.08));
  // el escritorio de Rubén: madera clara, patas navy3
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0, DCX = (DESK.x0 + DESK.x1) / 2, DCZ = (DESK.z0 + DESK.z1) / 2;
  OF.add(caja(DW, 0.05, DD, mat(0xc89a64, 0.55), DCX, MESA_Y - 0.025, DCZ, 0.012));
  for (const x of [DESK.x0 + 0.06, DESK.x1 - 0.06]) OF.add(caja(0.06, 0.72, DD - 0.1, M.navy3, x, OFI.piso + 0.36, DCZ));
  OF.add(caja(DW - 0.15, 0.5, 0.03, M.navy3, DCX, OFI.piso + 0.45, DESK.z1 - 0.08));          // el faldón de adelante
  // la silla (de espaldas al vidrio)
  const silla = new THREE.Group(); silla.position.set(0, OFI.piso, 0.62); OF.add(silla);
  silla.add(caja(0.52, 0.08, 0.5, M.navy, 0, 0.5, 0.18)); silla.add(caja(0.5, 0.7, 0.08, M.navy, 0, 0.92, -0.08)); silla.add(caja(0.06, 0.48, 0.06, M.gris, 0, 0.25, 0.15));
  // el monitor grande a la izquierda, girado hacia la cámara; abajo, la rotuladora (la caja con la ranura)
  monitor = new THREE.Group(); monitor.position.set(-0.6, MESA_Y, 1.42); monitor.rotation.y = 1.18; OF.add(monitor);
  monitor.add(caja(0.1, 0.36, 0.1, M.navy, 0, 0.18, -0.05)); monitor.add(caja(0.34, 0.03, 0.26, M.navy, 0, 0.015, -0.03));
  monitor.add(caja(1.08, 0.7, 0.06, M.navy, 0, 0.72, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.625), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.72, 0.032); monitor.add(pm);
  // la rotuladora: caja navy3 con la ranura (navy) de donde sale la cinta, una tira verde arriba
  OF.add(caja(0.32, 0.13, 0.2, M.navy3, X0 - 0.16, MESA_Y + 0.065, ZT, 0.03));
  OF.add(caja(0.03, 0.105, 0.03, M.navy, X0 - 0.005, MESA_Y + 0.062, ZT, 0.008));
  OF.add(caja(0.22, 0.012, 0.12, M.g, X0 - 0.18, MESA_Y + 0.133, ZT, 0.004));
  // el teclado y el mouse (a su izquierda: +x)
  const tecl = new THREE.Group(); tecl.position.set(0.02, MESA_Y, 1.4); tecl.rotation.y = -0.08; OF.add(tecl);
  tecl.add(caja(0.44, 0.025, 0.15, M.navy3, 0, 0.012, 0, 0.01));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 11; k++) tecl.add(caja(0.032, 0.012, 0.032, M.cr2, -0.19 + k * 0.038, 0.03, -0.045 + i * 0.042, 0.004));
  OF.add(caja(0.065, 0.035, 0.1, M.navy3, 0.38, MESA_Y + 0.018, 1.42, 0.03));
  // el teléfono de escritorio (de ya-lo-cargo): navy3, tubo, cable rulo, botón de altavoz que se prende verde
  telefono = new THREE.Group(); telefono.position.set(0.52, MESA_Y, 1.47); telefono.rotation.y = -0.35; telefono.scale.setScalar(1.3); OF.add(telefono);
  telefono.add(caja(0.24, 0.07, 0.22, M.navy3, 0, 0.035, 0, 0.03));
  for (let i = 0; i < 12; i++) telefono.add(caja(0.03, 0.015, 0.025, M.cr, -0.05 + (i % 3) * 0.04, 0.075, 0.03 + Math.floor(i / 3) * 0.035 - 0.04, 0.005));
  telefono.add(caja(0.26, 0.05, 0.07, M.navy3, 0, 0.1, -0.06, 0.025));
  for (const s of [-1, 1]) telefono.add(caja(0.07, 0.045, 0.08, M.navy3, s * 0.11, 0.09, -0.06, 0.02));
  botonAlt = caja(0.05, 0.016, 0.03, mat(0x2a3b58, 0.5), 0.07, 0.077, 0.08, 0.006); telefono.add(botonAlt);
  telefono.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 40 }, (_, i) => V3(-0.13 - i * 0.004, 0.06 + Math.sin(i * 1.6) * 0.012, -0.06 + Math.cos(i * 1.6) * 0.012 + i * 0.002))), 120, 0.004, 5), M.navy3));
  // el celular de Rubén (apoyado boca arriba a su derecha, al lado del monitor)
  celR = crearCelular(pantR, C.navy3, 0.08, 0.16); celR.scale.setScalar(1.9); OF.add(celR);
  // el mate y el termo (crema, genéricos), la taza de lapiceras, los remitos con broche
  mate = crearMate(); mate.scale.setScalar(1.1); OF.add(mate);
  termo = crearTermo(); termo.scale.setScalar(1.15); OF.add(termo);
  taza = new THREE.Group(); OF.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.048, 0.044, 0.11, 22), mat(C.cr, 0.4), 0, 0.055, 0));
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 22), M.navy, 0, 0.108, 0));
  [[0.012, 0.0, 0.1, C.navy3], [-0.014, 0.012, -0.12, C.g], [0.006, -0.015, 0.06, C.navy]].forEach(([dx, dz, rz, c]) => { const l = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.17, 8), mat(c, 0.5), dx, 0.14, dz); l.rotation.z = rz; taza.add(l); });
  for (let i = 0; i < 6; i++) OF.add(caja(0.21, 0.006, 0.29, mat(i % 2 ? C.cr : 0xe8e4d6, 0.9), 0.28 + i * 0.004, MESA_Y + 0.004 + i * 0.006, 2.62, 0.002).rotateY(0.1 * i - 0.3));
  OF.add(caja(0.08, 0.02, 0.04, M.gris, 0.29, MESA_Y + 0.05, 2.52, 0.006));
  // una pila de biblioratos navy y verde (adelante a la izquierda)
  [[C.navy3, 0.0], [C.g, 0.075], [C.navy2, 0.15]].forEach(([c, y], i) => OF.add(caja(0.32, 0.07, 0.25, mat(c, 0.6), -0.58, MESA_Y + 0.035 + y, 2.62, 0.01).rotateY(0.08 * i - 0.1)));
  // (ronda 3) adelante, en la franja del escritorio que quedaba vacía: la pila de listas impresas (las versiones viejas,
  // con el título y una tachadura roja) y la calculadora
  {
    const hoja = lienzo(420, 594, (x, w, h) => {
      x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 90);
      x.fillStyle = "#efeee5"; x.font = F(800, 46); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("LISTA DE PRECIOS", w / 2, 48);
      x.strokeStyle = "#b4b2a3"; x.lineWidth = 4; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(30, 140 + i * 48); x.lineTo(w - 30, 140 + i * 48); x.stroke(); }
      x.fillStyle = "#0b1220"; x.font = F(700, 30); x.textAlign = "left"; ["Aceite", "Azúcar", "Harina", "Agua"].forEach((n, i) => x.fillText(n, 40, 162 + i * 96));
      x.strokeStyle = "#c7655b"; x.lineWidth = 12; x.beginPath(); x.moveTo(40, 520); x.lineTo(w - 40, 120); x.stroke();
    });
    const hojaM = new THREE.MeshStandardMaterial({ map: hoja, roughness: 0.8 });
    pila = new THREE.Group(); OF.add(pila);
    for (let i = 0; i < 7; i++) {
      const m = mesh(new THREE.BoxGeometry(0.3, 0.008, 0.42), [M.cr, M.cr, i === 6 ? hojaM : M.cr, M.cr, M.cr, M.cr], 0.12 + (i % 3) * 0.012, MESA_Y + 0.005 + i * 0.009, 2.98 - (i % 2) * 0.015);
      m.rotation.y = -0.18 + i * 0.05; pila.add(m);
    }
    const calc = new THREE.Group(); calc.position.set(-0.42, MESA_Y, 2.95); calc.rotation.y = 0.25; OF.add(calc);
    calc.add(caja(0.18, 0.03, 0.26, M.navy3, 0, 0.015, 0, 0.012));
    calc.add(caja(0.14, 0.006, 0.06, mat(0xb9cde0, 0.3), 0, 0.033, -0.08, 0.004));
    for (let i = 0; i < 16; i++) calc.add(caja(0.026, 0.01, 0.026, i % 4 === 3 ? M.g : M.cr2, -0.051 + (i % 4) * 0.034, 0.035, -0.02 + Math.floor(i / 4) * 0.034, 0.004));
  }
  // la lámpara de escritorio: base crema, brazo articulado crema, pantalla cónica navy, foco crema
  lampara = new THREE.Group(); lampara.position.set(0.8, MESA_Y, 1.3); OF.add(lampara);
  lampara.add(mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.03, 24), M.cr, 0, 0.015, 0));
  const brazo = (a, b) => { const d = b.clone().sub(a); const m = mesh(new THREE.CylinderGeometry(0.014, 0.014, d.length(), 10), M.cr); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); lampara.add(m); };
  const A0 = V3(0, 0.03, 0), A1 = V3(0.04, 0.45, -0.06), A2 = V3(-0.14, 0.7, 0.02);
  brazo(A0, A1); brazo(A1, A2); lampara.add(mesh(new THREE.SphereGeometry(0.025, 12, 8), M.cr, A1.x, A1.y, A1.z));
  const pant = new THREE.Group(); pant.position.copy(A2); lampara.add(pant); lampara.updateMatrixWorld(true); pant.lookAt(V3(-0.45, MESA_Y + 0.1, 1.75));
  const cono = mesh(new THREE.CylinderGeometry(0.05, 0.13, 0.16, 24, 1, true), mat(C.navy, 0.45, { side: THREE.DoubleSide }), 0, 0, 0); cono.rotation.x = Math.PI / 2; pant.add(cono);
  const foco = new THREE.Mesh(new THREE.CircleGeometry(0.085, 20), new THREE.MeshBasicMaterial({ color: 0xfff0d0, toneMapped: false })); foco.position.z = 0.0; pant.add(foco);   // (ronda 4) más adentro del cono
  // un cuadro en la pared de atrás (corcho con remitos) y un fichero
  OF.add(caja(1.1, 0.7, 0.03, mat(0xb08a5e, 0.9), -1.6, OFI.piso + 1.75, OFI.z1 - 0.08));
  for (const [x, y, r] of [[-1.85, 1.85, 0.1], [-1.5, 1.7, -0.06], [-1.3, 1.9, 0.04]]) OF.add(caja(0.2, 0.26, 0.005, M.cr, x, OFI.piso + y, OFI.z1 - 0.1).rotateZ(r));
  OF.add(caja(0.5, 1.1, 0.5, M.navy3, 2.9, OFI.piso + 0.55, 3.9));
}
sombras(OF);
OF.traverse((o) => { if (o.isMesh && o.material === M.vidrio) { o.castShadow = false; o.receiveShadow = false; } });
// ---- luces de la oficina: la lámpara (cálida, con sombra), el resplandor del monitor, un relleno desde la cámara ----
const luzLamp = new THREE.SpotLight(0xffd9a0, 0, 6, 0.9, 0.5, 1.2);
luzLamp.castShadow = true; luzLamp.shadow.mapSize.set(1024, 1024); luzLamp.shadow.bias = -0.0008; luzLamp.shadow.radius = 4;
luzLamp.position.set(0.66, MESA_Y + 0.66, 1.32); luzLamp.target.position.set(-0.1, MESA_Y + 0.1, 1.55); scene.add(luzLamp, luzLamp.target);
const luzMon = new THREE.PointLight(0xb9cde0, 0, 3, 1.5); luzMon.position.set(-0.3, MESA_Y + 0.75, 1.55); scene.add(luzMon);
const relleno = new THREE.DirectionalLight(0xffe9cf, 0); relleno.position.set(1.5, 6.5, 6); relleno.target.position.set(0, 4.2, 1); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xc8d4ff, 0); rim.position.set(-2, 7, -6); rim.target.position.set(0, 4, 1); scene.add(rim, rim.target);
const ambOf = new THREE.HemisphereLight(0xfff0dc, 0x2a2018, 0); scene.add(ambOf);

// =====================================================================================================
// LA CINTA DE ROTULADORA (el objeto del reel): crema con borde navy, el texto mono navy, de canto sobre el escritorio
// =====================================================================================================
const NOMBRES = ["lista_precios.xlsx", "lista_precios_v2.xlsx", "lista_v3_azucar.xlsx", "lista_v4_dolar.xlsx", "lista_v5_FINAL.xlsx",
  "lista_v6_FINAL_ESTA_SI.xlsx", "lista_v7_FINAL_ESTA_SI_(2).xlsx", "lista_v8_aceite.xlsx", "lista_v8_aceite_FINAL_ESTA_SI_(2).pdf"];
const TIENDA = "tienda · precios de hoy";
const CH = 0.031, TH = 0.08, TD = 0.014, PXM = 1500;   // ancho de cada letra, alto y espesor de la cinta, px por metro
const XE = DESK.x1;                                      // el borde del escritorio
const LARGOS = [];
NOMBRES.forEach((n, i) => { const L = Math.max(n.length * CH + 0.13, i ? LARGOS[i - 1] + 0.055 : 0); LARGOS.push(Math.round(L * 1000) / 1000); });
const TAZA_X = 0.77;                                     // la taza de lapiceras: la v8 la toca y la corre
LARGOS[7] = Math.max(LARGOS[7], TAZA_X - 0.05 - X0);
LARGOS[8] = XE - X0;                                     // la última llega al borde (y sigue colgando)
LARGOS.push(0.86);                                        // [9] la de la tienda (parte 2)
const recorte = new THREE.Plane(V3(1, 0, 0), -X0);        // la cinta solo se ve a la derecha de la ranura
const recorteBorde = new THREE.Plane(V3(-1, 0, 0), XE + 0.001);
function texCinta(texto, L, tienda = false) {
  return lienzo(Math.round(L * PXM), Math.round(TH * PXM), (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h * 0.08); x.fillRect(0, h * 0.92, w, h * 0.08);   // el borde navy (arriba y abajo)
    const px0 = 0.025 * PXM;
    if (tienda) {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(px0 - 6, h * 0.16, h * 0.68 + 12, h * 0.68, 12); x.fill();
      x.strokeStyle = "#0b1220"; x.lineWidth = h * 0.09; x.lineCap = "round"; x.beginPath(); x.moveTo(px0 + h * 0.12, h * 0.52); x.lineTo(px0 + h * 0.3, h * 0.68); x.lineTo(px0 + h * 0.58, h * 0.32); x.stroke();
    } else hojita(x, px0 + h * 0.28, h / 2, h * 0.66);
    x.fillStyle = "#0b1220"; x.textBaseline = "middle"; x.textAlign = "left";
    x.font = tienda ? F(800, Math.round(0.052 * PXM)) : MONO(Math.round((CH / 0.6) * PXM));
    const tx = px0 + h * 0.68 + 0.02 * PXM;
    if (texto.endsWith(".pdf")) {
      // (ronda 4) el remate: ".pdf" en un recuadro rojo lleno, letra crema
      const a = texto.slice(0, -4), xa = tx + x.measureText(a).width, wp = x.measureText(".pdf").width;
      x.fillText(a, tx, h / 2 + 3);
      x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(xa - 6, h * 0.13, wp + 12, h * 0.74, 10); x.fill();
      x.fillStyle = "#efeee5"; x.fillText(".pdf", xa, h / 2 + 3);
    }
    else x.fillText(texto, tx, h / 2 + 3);
  });
}
const CINTAS = NOMBRES.map((n, i) => {
  const L = LARGOS[i];
  const tex = texCinta(n, L);
  const cr = mat(C.cr, 0.5, { clippingPlanes: [recorte, recorteBorde], clipShadows: true }), nv = mat(C.navy, 0.5, { clippingPlanes: [recorte, recorteBorde], clipShadows: true });
  const fr = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12, clippingPlanes: [recorte, recorteBorde], clipShadows: true });
  const g = new THREE.Group();
  const m = mesh(rbox(L, TH, TD, 0.006, 2), [cr, cr, nv, nv, fr, cr]); m.position.x = L / 2; g.add(m);
  g.visible = false; OF.add(g);
  return g;
});
// la de la tienda (parte 2), corta, con tilde verde
const CINTA_T = (() => {
  const L = LARGOS[9], tex = texCinta(TIENDA, L, true), cr = mat(C.cr, 0.5), nv = mat(C.navy, 0.5);
  const fr = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 });
  const g = new THREE.Group(); const m = mesh(rbox(L, TH, TD, 0.006, 2), [cr, cr, nv, nv, fr, cr]); m.position.x = L / 2; g.add(m); g.visible = false; OF.add(g); return g;
})();
// el tramo que cuelga del borde en la última versión (cinta en blanco: la cola de la rotuladora)
const COLA_L = 0.42;
const COLA = (() => {
  const g = new THREE.Group(); g.position.set(XE, MESA_Y + TH, ZT); OF.add(g);
  const tex = lienzo(Math.round(COLA_L * PXM), Math.round(TH * PXM), (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h * 0.08); x.fillRect(0, h * 0.92, w, h * 0.08); });
  const cr = mat(C.cr, 0.5), nv = mat(C.navy, 0.5), fr = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 });
  const geo = rbox(COLA_L, TH, TD, 0.006, 2); geo.translate(COLA_L / 2, TH / 2, 0);   // pivote en la esquina de arriba del borde
  const m = mesh(geo, [cr, cr, nv, nv, fr, cr]); m.position.y = -TH; g.add(m);
  g.visible = false; g.userData.m = m; return g;
})();
// la cinta en el tiempo: qué versión, cuánto asoma (el clac: sale de la ranura con un rebote corto)
function versionEn(t) { let k = 0; for (let i = 1; i < T.v.length; i++) if (t >= T.v[i]) k = i; return k; }
function cintaVisible(t) {
  const k = versionEn(t);
  if (k === 0) return { k, vis: LARGOS[0] };
  const d = k === 8 ? 0.22 : 0.13, u = sg(t, T.v[k], T.v[k] + d);
  const vis = lerp(LARGOS[k - 1], LARGOS[k], k === 8 ? eo(u) : bk(u));
  return { k, vis };
}
const finCinta = (t) => (t >= P2 ? X0 + LARGOS[9] : X0 + Math.min(cintaVisible(t).vis, XE - X0));
function ponerCinta(t) {
  CINTAS.forEach((g) => (g.visible = false)); CINTA_T.visible = false; COLA.visible = false;
  if (t >= P2) {
    // parte 2: la cinta corta de la tienda; cuando llama el proveedor hace un tic de 1 cm y vuelve (no crece)
    const tic = Math.sin(Math.PI * sg(t, T.tic, T.tic + 0.16)) * 0.012;
    CINTA_T.visible = true; CINTA_T.position.set(X0 + tic, MESA_Y + TH / 2, ZT); return;
  }
  const { k, vis } = cintaVisible(t);
  const g = CINTAS[k]; g.visible = true;
  g.position.set(X0 - (LARGOS[k] - vis), MESA_Y + TH / 2, ZT);
  if (k === 8 && false) {   // (ronda 4) sin la cola en blanco: el remate es ".pdf" de cerca
    // la última: cuando llega al borde asoma la cola y se dobla hacia el piso con un vaivén que se amortigua
    const u = sg(t, T.v[8] + 0.18, T.v[8] + 0.45);
    if (u > 0) {
      COLA.visible = true;
      const s = sg(t, T.v[8] + 0.45, T.v[8] + 1.6);
      const ang = -lerp(0.15, 1.42, eo(u)) + (u >= 1 ? Math.sin(s * 11) * 0.22 * Math.exp(-s * 4.5) : 0);
      COLA.rotation.z = ang; COLA.scale.x = Math.max(0.02, eo(u));
    }
  }
}

// =====================================================================================================
// LA ETIQUETA DE PRECIO (parte 2): cartón verde de marca con ojal y piolín, el precio en navy y "hoy"
// =====================================================================================================
const PRECIO_VIEJO = "$ 1.190", PRECIO_NUEVO = "$ 1.240";
const etiqueta = new THREE.Group(); scene.add(etiqueta);
{
  const tex = lienzo(700, 420, (x, w, h) => {
    x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    x.font = F(900, 150); x.fillText(PRECIO_NUEVO, w / 2 + 40, h * 0.42);
    x.font = F(800, 80); x.fillText("hoy", w / 2 + 40, h * 0.8);
  });
  const sh = new THREE.Shape(); const w = 0.7, h = 0.42, c = 0.14;
  sh.moveTo(-w / 2 + c, h / 2); sh.lineTo(w / 2, h / 2); sh.lineTo(w / 2, -h / 2); sh.lineTo(-w / 2 + c, -h / 2); sh.lineTo(-w / 2, -h / 2 + c); sh.lineTo(-w / 2, h / 2 - c); sh.closePath();
  const ojal = new THREE.Path(); ojal.absarc(-w / 2 + 0.1, 0, 0.032, 0, Math.PI * 2, true); sh.holes.push(ojal);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
  geo.translate(0, 0, -0.01);
  // UV del frente: proyección plana del rectángulo
  const uv = geo.attributes.uv, pos = geo.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  const fr = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 });
  etiqueta.add(mesh(geo, fr));
  const anillo = mesh(new THREE.TorusGeometry(0.036, 0.008, 8, 20), M.cr, -w / 2 + 0.1, 0, 0.0); etiqueta.add(anillo);
  const piolin = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(-w / 2 + 0.1, 0.03, 0), V3(-w / 2 - 0.05, 0.12, 0.02), V3(-w / 2 - 0.12, 0.06, 0.0), V3(-w / 2 - 0.2, 0.14, -0.02)]), 30, 0.007, 6), M.cr); etiqueta.add(piolin);
  // la estela: una cinta plana verde que sigue a la etiqueta
  etiqueta.visible = false;
}
const estela = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x5ce611, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })); estela.visible = false; scene.add(estela);

// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = RX) · de ya-lo-cargo: azulejo, mostrador con vitrina, spiedo, pizarra; la vereda
// =====================================================================================================
const RX = 60;
const ROT = new THREE.Group(); ROT.position.x = RX; scene.add(ROT);
const RD = 6;
const GRA = { x: 0.6, z: -2.35 };   // delante del mostrador (cerrando: limpia del lado de los clientes)
const SPI = V3(-1.9, 0.95, -5.3);
let spiedoBarras = [], pollos = [], llamaM, persiana, tuboM, vidrieraNoche;
const pantG = lienzo(800, 1600, () => {});       // el celular de Graciela
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
  const p = mesh(new THREE.PlaneGeometry(8, RD), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2));
  // el mostrador (a lo largo de x, Graciela detrás) con tapa de madera y la vitrina
  const MZ = -3.1, MY = 0.9;
  ROT.add(caja(5.4, MY - 0.06, 0.75, M.navy3, 0.3, (MY - 0.06) / 2, MZ, 0.03));
  ROT.add(caja(5.5, 0.06, 0.83, mat(0xc89a64, 0.55), 0.3, MY - 0.03, MZ, 0.02));
  ROT.add(caja(5.2, 0.06, 0.02, M.g, 0.3, 0.32, MZ + 0.38, 0.01));
  const vit = new THREE.Mesh(rbox(2.2, 0.42, 0.65, 0.02, 2), M.vidrio); vit.position.set(-1.3, MY + 0.21, MZ); vit.renderOrder = 3; ROT.add(vit);
  ROT.add(caja(2.2, 0.03, 0.67, M.gris, -1.3, MY + 0.43, MZ));
  for (let i = 0; i < 3; i++) ROT.add(caja(0.6, 0.03, 0.42, M.gris, -2.0 + i * 0.7, MY + 0.02, MZ));
  ROT.add(caja(0.42, 0.22, 0.36, M.navy3, 2.3, MY + 0.11, MZ - 0.05, 0.04));
  // la pizarra navy con tiza crema
  const piz = lienzo(900, 600, (x, w, h) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 96);
    ["POLLO", "MILANESA", "TARTA"].forEach((s, i) => x.fillText(s, w / 2, 175 + i * 150));
  });
  ROT.add(plano(1.5, 1.0, piz, 1.6, 2.15, -RD + 0.03));
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
  const doradoM = mat(0xc98a3a, 0.45), doradoO = mat(0xa86a2a, 0.5);
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const p = new THREE.Group(); p.position.x = -0.46 + k * 0.46; barra.add(p); pollos.push(p);
      const cu = mesh(new THREE.SphereGeometry(0.15, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); p.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.1, 14, 10), doradoM, 0.13, 0.03, 0.0); pe.scale.set(0.8, 0.75, 0.9); p.add(pe);
      for (const s of [-1, 1]) { const mu = mesh(new THREE.SphereGeometry(0.065, 12, 8), doradoO, -0.06, -0.07, s * 0.09); mu.scale.set(1.4, 0.9, 0.9); p.add(mu); }
      p.rotation.x = k * 1.3;
    }
  }
  // el frente: vidrieras y la puerta (z = 0); la persiana metálica (baja a media altura en la parte 1)
  ROT.add(caja(8, 0.5, 0.25, M.navy3, 0, 2.85, 0));
  for (const x of [-3.9, -0.6, 0.9, 3.9]) ROT.add(caja(0.2, 2.6, 0.25, M.navy3, x, 1.3, 0));
  ROT.add(caja(3.1, 0.7, 0.25, M.navy3, -2.25, 0.35, 0)); ROT.add(caja(2.8, 0.7, 0.25, M.navy3, 2.4, 0.35, 0));
  for (const [a, b] of [[-3.8, -0.7], [1.0, 3.8]]) { const v = new THREE.Mesh(new THREE.PlaneGeometry(b - a, 1.9), M.vidrio); v.position.set((a + b) / 2, 1.65, 0.0); v.renderOrder = 3; ROT.add(v); }
  vidrieraNoche = new THREE.MeshBasicMaterial({ color: 0x0b1220 });
  const vn = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.4), vidrieraNoche); vn.position.set(0, 1.6, 0.6); vn.rotation.y = Math.PI; ROT.add(vn);   // (de espaldas a la calle: desde afuera no se ve)
  persiana = new THREE.Group(); ROT.add(persiana);
  const lamaT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#9aa0aa"; x.fillRect(0, 0, w, h); x.fillStyle = "#7d8390"; for (let y = 0; y < h; y += 32) x.fillRect(0, y, w, 10); });
  lamaT.wrapS = lamaT.wrapT = THREE.RepeatWrapping; lamaT.repeat.set(4, 6);
  const per = mesh(new THREE.PlaneGeometry(7.8, 1.6), new THREE.MeshStandardMaterial({ map: lamaT, roughness: 0.6, metalness: 0.2 }), 0, 0, 0.2); per.rotation.y = Math.PI; persiana.add(per);
  persiana.add(caja(7.8, 0.08, 0.1, M.navy3, 0, -0.8, 0.2));
  // el tubo de luz del techo
  tuboM = new THREE.MeshBasicMaterial({ color: 0xf4f6ee, toneMapped: false });
  { const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 10).rotateZ(Math.PI / 2), tuboM); tb.position.set(0.5, 3.0, -3.3); ROT.add(tb); }
}
sombras(ROT);
ROT.traverse((o) => { if (o.isMesh && (o.material === M.vidrio || o.material === tuboM || o.material === llamaM)) { o.castShadow = false; } });
// la vereda, la calle y las fachadas vecinas (para Q2 al atardecer)
const CALLE = new THREE.Group(); CALLE.position.x = RX; scene.add(CALLE);
{
  const v = mesh(new THREE.BoxGeometry(40, 0.12, 2.4), mat(0xb8b5a8, 0.85), 0, 0.06, 1.2); CALLE.add(v);
  CALLE.add(mesh(new THREE.BoxGeometry(40, 0.13, 0.16), M.cr, 0, 0.065, 2.32));
  const asf = mesh(new THREE.PlaneGeometry(40, 14), mat(0x4a5064, 0.9), 0, 0, 9.4); asf.rotation.x = -Math.PI / 2; asf.castShadow = false; CALLE.add(asf);
  for (let x = -18; x < 18; x += 3) { const l = mesh(new THREE.PlaneGeometry(1.5, 0.14), mat(C.cr, 0.8), x, 0.005, 7.6); l.rotation.x = -Math.PI / 2; l.castShadow = false; CALLE.add(l); }
  // el frente de la rotisería (planta alta, letrero) y dos vecinos
  CALLE.add(caja(8, 3.6, 0.3, mat(C.cr, 0.85), 0, 4.9, -0.15));
  const letr = lienzo(1600, 220, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#1f3254"; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#0b1220"; x.font = F(800, 140); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ROTISERÍA", w / 2, h / 2 + 8); });
  CALLE.add(caja(7.6, 1.0, 0.16, M.navy3, 0, 3.55, 0.05)); CALLE.add(plano(7.4, 0.9, letr, 0, 3.55, 0.14));
  for (const [x, c] of [[-8, C.navy3], [8, 0xd6c7a6]]) {
    CALLE.add(caja(7.9, 6.6, 0.3, mat(c, 0.85), x, 3.3, -0.15));
    for (const dx of [-2, 2]) CALLE.add(caja(1.6, 1.6, 0.06, mat(0xffe2b0, 0.5, { emissive: 0xffe2b0, emissiveIntensity: 0.55 }), x + dx, 1.5, 0.02));
  }
  // faroles prendidos (crema)
  for (const x of [-5.5, 5.5]) { CALLE.add(caja(0.12, 4.4, 0.12, M.navy3, x, 2.2, 2.1)); CALLE.add(caja(0.9, 0.08, 0.08, M.navy3, x - 0.4, 4.4, 2.1)); CALLE.add(mesh(new THREE.SphereGeometry(0.2, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffe2b0 }), x - 0.8, 4.25, 2.1)); }
  // la vereda de enfrente
  CALLE.add(caja(40, 7, 0.4, mat(0x24344f, 0.9), 0, 3.5, 17));
  for (let x = -16; x < 18; x += 4) CALLE.add(caja(1.4, 1.4, 0.05, mat(0xffe2b0, 0.5, { emissive: 0xffe2b0, emissiveIntensity: 0.5 }), x, 2.2, 16.78));
}
sombras(CALLE);
const luzTubo = new THREE.PointLight(0xf4f6ee, 0, 9, 1.4); luzTubo.position.set(RX + 0.5, 2.8, -2.6); scene.add(luzTubo);
const luzRotF = new THREE.DirectionalLight(0xfff2e0, 0); luzRotF.position.set(RX + 3, 5, 6); luzRotF.target.position.set(RX + 0.5, 1.4, -3.5); scene.add(luzRotF, luzRotF.target);
luzRotF.castShadow = true; luzRotF.shadow.mapSize.set(1024, 1024); luzRotF.shadow.bias = -0.0008; Object.assign(luzRotF.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 25 });
const luzCalle = new THREE.HemisphereLight(0xc9d4ec, 0x3a3a40, 0); scene.add(luzCalle);


// =====================================================================================================
// EL TRÍPTICO (parte 2, ronda 1): tres celulares de clientes (cafetería, bar, rotisería) donde el precio cambia a la
// vez, con la chapita verde "hoy". Todo en materiales planos (sin luces). x = TX.
// =====================================================================================================
const TX = -60;
const TRIP = new THREE.Group(); TRIP.position.x = TX; scene.add(TRIP);
const CLIENTES = [["Marta", "Cafetería", "#d9d7c9", "#0b1220"], ["Walter", "Bar", "#1f3254", "#efeee5"], ["Graciela", "Rotisería", "#efeee5", "#0b1220"]];
const pantT = CLIENTES.map(() => lienzo(600, 1200, () => {}));
const celT = [];
{
  const basic = (c) => new THREE.MeshBasicMaterial({ color: c });
  // (ronda 1) en escalera, grandes: arriba la cafetería, al medio el bar, abajo la rotisería (cada uno delante del de arriba)
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 5), basic(C.navy2)); fondo.position.set(0, 1.45, -0.6); TRIP.add(fondo);
  for (const [x, y, c] of [[-0.62, 2.35, C.navy3], [0.6, 1.2, C.navy3], [-0.5, 0.2, C.edge]]) { const m = new THREE.Mesh(new THREE.CircleGeometry(0.5, 40), basic(c)); m.position.set(x, y, -0.55); TRIP.add(m); }
  CLIENTES.forEach(([n, l], i) => {
    const c = crearCelular(pantT[i], [C.navy3, C.g, C.g][i], 0.08, 0.16); c.scale.setScalar(5.8);
    c.position.set([-0.25, 0.25, -0.18][i], [2.04, 1.42, 0.8][i], i * 0.06); c.rotation.set(0, 0, [0.06, -0.05, 0.04][i]); TRIP.add(c); celT.push(c);
  });
}
const claveT = ["", "", ""];
function dibujarTrip(t) {
  // (ronda 2) letras grandes: en cuadro cada celular mide ~400 px de ancho (lienzo 600 → ×0,67)
  const fl = t >= T.flip + 0.1 ? 2 : t >= T.flip ? 1 : 0;
  CLIENTES.forEach(([n, l], i) => {
    const clave = String(fl); if (claveT[i] === clave) return; claveT[i] = clave;
    const { x } = pantT[i].userData, w = 600, h = 1200;
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 250); avatar(x, [AVATAR.marta, AVATAR.walter, AVATAR.graciela][i], 100, 125, 78);
    x.fillStyle = "#efeee5"; x.font = F(800, 84); x.fillText(n, 196, 86); x.fillStyle = "#b4b2a3"; ajustar(x, l, 800, 74, w - 206); x.fillText(l, 196, 176);   // (ronda 4) ≥ 36 px en cuadro
    x.fillStyle = "#5ce611"; x.fillRect(0, 250, w, 12);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(20, 290, w - 40, 640, 34); x.fill();
    x.fillStyle = "#c9a46b"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(46, 320, 150, 190, 16); x.fill(); x.stroke();
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(98, 350, 46, 125, 14); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 88); x.fillText("Aceite", 218, 415);
    const p = fl >= 2 ? PRECIO_NUEVO : PRECIO_VIEJO;
    x.font = F(900, 130);
    if (fl === 1) { x.save(); x.translate(46, 660); x.scale(1, 0.25); x.fillText(p, 0, 0); x.restore(); } else x.fillText(p, 46, 660);
    if (fl >= 2) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(46, 770, 220, 110, 55); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.font = F(900, 74); x.textAlign = "center"; x.fillText("hoy", 156, 828); x.textAlign = "left"; }
    x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(46, 990, w - 92, 150, 75); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 76); x.textAlign = "center"; x.fillText("Pedir", w / 2, 1067);
    pantT[i].needsUpdate = true;
  });
}

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben,   // (ronda 3) sin anteojos: con el rig no quedaban pegados a la cara
  dedos: true, parpadeoCada: 999, parpadeosExtra: [3.6, 9.9, 14.9, 26.0, 31.9] });
const graciela = crearPersonaje({ ...ELENCO.clienta, lentes: null, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [11.2, 30.0] });
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
fusionar(DEP); fusionar(AFUERA); fusionar(OF, [monitor, telefono, celR, mate, termo, taza, lampara, pila, ...CINTAS, CINTA_T, COLA]); fusionar(ROT, [persiana, ...spiedoBarras]); fusionar(CALLE);
const TODOS = [ruben, graciela, operario];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la zorra (transpaleta) del operario, con un pallet de cajas
const zorra = new THREE.Group(); scene.add(zorra);
{
  const gm = mat(0xb4b8c0, 0.4, { metalness: 0.35 });
  for (const s of [-1, 1]) zorra.add(caja(0.16, 0.07, 1.15, gm, s * 0.2, 0.06, 0.55));
  zorra.add(caja(0.6, 0.2, 0.22, gm, 0, 0.12, -0.08));
  const mango = caja(0.05, 1.0, 0.05, M.navy3, 0, 0.6, -0.25); mango.rotation.x = -0.35; zorra.add(mango);
  zorra.add(caja(0.3, 0.05, 0.05, M.navy3, 0, 1.08, -0.42));
  const pg = new THREE.Group(); pg.position.set(0, 0.08, 0.6); pg.rotation.y = Math.PI / 2; cargaPallet(pg, 0); zorra.add(pg);
}
// el celular de Graciela
const celG = crearCelular(pantG, C.g, 0.08, 0.16); celG.scale.setScalar(1.5); scene.add(celG);

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
  AVATAR.graciela = leer(graciela, 0xefeee5); AVATAR.ruben = leer(ruben, 0xb9cde0);
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

// ================= PANTALLAS =================
// ---- el monitor: la planilla (parte 1) · el panel de la tienda y los pedidos (parte 2) ----
let claveM = "";
function dibujarMonitor(t) {
  const parte2 = t >= P2;
  const k = versionEn(t);
  const e = parte2 ? 0 : t >= T.v[7] ? 4 : t >= T.nuevo ? 3 : t >= T.tacha ? 2 : t >= T.celda ? 1 : 0;
  const pub = parte2 ? (t >= T.publicado ? 2 : t >= T.publica ? 1 : 0) : 0, esc = parte2 && t >= T.escribe ? 1 : 0;
  const ped = parte2 ? T.pedidos.filter((a) => t >= a).length : 0, q3 = parte2 && t >= T.q3 ? 1 : 0;
  const clave = `${parte2}|${k}|${e}|${pub}|${esc}|${ped}|${q3}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1024, h = 640;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!parte2) {
    // la barra de título con el nombre del archivo (el de la versión de ahora)
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 96); hojita(x, 52, 48, 58, "#0b1220");
    x.fillStyle = "#efeee5"; x.font = MONO(40); let s = 40; while (x.measureText(NOMBRES[Math.min(k, 7)]).width > w - 120 && s > 20) { s -= 2; x.font = MONO(s); }
    x.fillText(NOMBRES[Math.min(k, 7)], 96, 50);
    // la grilla: Producto · Presentación · Precio
    const cols = [24, 380, 720, w - 24], y0 = 120, rh = 98;
    x.fillStyle = "#1f3254"; x.fillRect(cols[0], y0, cols[3] - cols[0], 80);
    x.fillStyle = "#efeee5"; x.font = F(800, 40); ["Producto", "Presentación", "Precio"].forEach((c, i) => x.fillText(c, cols[i] + 18, y0 + 42));
    const filas = [["Aceite", "1,5 L x 12", "$ 1.140"], ["Azúcar", "1 kg x 10", "$ 495"], ["Harina 000", "25 kg", "$ 1.020"], ["Agua", "2 L x 6", "$ 310"]];
    filas.forEach((f, r) => {
      const y = y0 + 80 + r * rh;
      x.fillStyle = r % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(cols[0], y, cols[3] - cols[0], rh);
      x.fillStyle = "#0b1220"; x.font = F(700, 44);
      f.forEach((c, i) => { if (!(r === 0 && i === 2 && e >= 2)) x.fillText(c, cols[i] + 18, y + rh / 2 + 2); });
    });
    x.strokeStyle = "#1f3254"; x.lineWidth = 4; for (const c of cols) { x.beginPath(); x.moveTo(c, y0); x.lineTo(c, y0 + 80 + 4 * rh); x.stroke(); }
    if (e >= 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(cols[2] + 4, y0 + 84, cols[3] - cols[2] - 8, rh - 8); }
    if (e >= 2) {
      const y = y0 + 80 + rh / 2 + 2;
      x.fillStyle = "#c7655b"; x.font = F(700, 38); x.fillText("$ 1.140", cols[2] + 18, y - (e >= 3 ? 22 : 0));
      x.strokeStyle = "#c7655b"; x.lineWidth = 6; x.beginPath(); x.moveTo(cols[2] + 14, y - (e >= 3 ? 22 : 0)); x.lineTo(cols[2] + 170, y - (e >= 3 ? 22 : 0)); x.stroke();
      if (e === 3) { x.fillStyle = "#0b1220"; x.font = F(900, 44); x.fillText(PRECIO_VIEJO, cols[2] + 18, y + 24); }
      if (e >= 4) { x.fillStyle = "#0b1220"; x.font = F(900, 44); x.fillText(PRECIO_NUEVO, cols[2] + 18, y + 24); }   // (ronda 2) la v8: el aceite otra vez
    }
    // el "Guardar como…" que aparece y se va (de nuevo)
  } else if (!q3) {
    // el panel de la tienda: la ficha del aceite, el campo de precio, Publicar
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 96); x.fillStyle = "#5ce611"; x.fillRect(0, 96, w, 8);
    x.fillStyle = "#efeee5"; x.font = F(800, 48); x.fillText("Tienda · Productos", 36, 50);
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("Aceite 1,5 L x 12", 40, 175);
    x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Precio de hoy", 40, 260);
    x.fillStyle = "#ffffff"; x.strokeStyle = esc ? "#5ce611" : "#1f3254"; x.lineWidth = 8; x.beginPath(); x.roundRect(40, 296, 520, 112, 20); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 68); x.fillText(esc ? PRECIO_NUEVO : PRECIO_VIEJO, 70, 354);
    x.fillStyle = pub ? "#5ce611" : "#1f3254"; x.beginPath(); x.roundRect(600, 296, 384, 112, 56); x.fill();
    x.fillStyle = pub ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 56); x.fillText(pub >= 2 ? "Publicado ✓" : "Publicar", 792, 354);
    if (pub >= 2) { x.fillStyle = "#0b1220"; x.font = F(700, 44); x.fillText("lo ven todos tus clientes", w / 2, 500); }
    if (pub === 1) { x.strokeStyle = "rgba(11,18,32,0.6)"; x.lineWidth = 10; x.beginPath(); x.arc(792, 352, 70, 0, 7); x.stroke(); }
  } else {
    // los pedidos de hoy que entran solos
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 96); x.fillStyle = "#5ce611"; x.fillRect(0, 96, w, 8);
    x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText("Pedidos de hoy", 36, 50);
    [["Graciela", "aceite x 6"], ["Marta", "azúcar x 10"], ["Walter", "agua x 20"]].forEach(([n, p], i) => {
      if (i >= ped) return;
      const y = 140 + i * 160;
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, y, w - 60, 136, 26); x.fill();
      x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 60); x.fillText(`${n} · ${p} ✓`, 60, y + 70);
    });
  }
  pantM.needsUpdate = true;
}
// ---- el celular de Rubén ----
let claveR = "";
function dibujarCelR(t) {
  const parte2 = t >= P2;
  let modo = "chatG";
  if (!parte2) {
    if (t >= T.p3) modo = t >= T.nico ? "chatN" : t >= T.walter ? "chatW" : t >= T.marta ? "chatM" : "chatG";
    if (t >= T.llama) modo = "llamada";
    if (t >= T.p5) modo = "encurso";
  } else modo = "quieto";
  const env = !parte2 && t >= T.envia1 ? 1 : 0;
  const clave = `${modo}|${env}`; if (clave === claveR) return; claveR = clave;
  const { x } = pantR.userData, w = 600, h = 1200;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  const cab = (cv, nombre) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 190); avatar(x, cv, 92, 105, 60); x.fillStyle = "#efeee5"; x.font = F(800, 50); x.fillText(nombre, 172, 108); };
  if (modo.startsWith("chat")) {
    const [cv, nombre, txt] = { chatG: [AVATAR.graciela, "Graciela", null], chatM: [AVATAR.marta, "Marta", "¿Me pasás la lista?"], chatW: [AVATAR.walter, "Walter", "¿Tenés la lista nueva?"], chatN: [AVATAR.nico, "Nico", "¿La lista para el cliente nuevo?"] }[modo];
    cab(cv, nombre);
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, 250, 470, 170, 40); x.fill();
    if (!txt) {
      // el audio de Graciela: play verde + onda
      x.fillStyle = "#5ce611"; x.beginPath(); x.arc(105, 335, 52, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(88, 305); x.lineTo(88, 365); x.lineTo(132, 335); x.closePath(); x.fill();
      for (let i = 0; i < 11; i++) { const hh = 24 + Math.abs(Math.sin(i * 1.7)) * 80; x.fillRect(180 + i * 26, 335 - hh / 2, 14, hh); }
    } else { x.fillStyle = "#0b1220"; x.font = F(800, 44); const pal = txt.split(" "); let l = "", y = 310; for (const p of pal) { if (x.measureText(l + p).width > 420) { x.fillText(l, 60, y); l = ""; y += 56; } l += p + " "; } x.fillText(l, 60, y); }
    if (modo === "chatG" && env) {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(110, 470, 460, 150, 36); x.fill();
      hojita(x, 170, 545, 80); x.fillStyle = "#0b1220"; x.font = MONO(30); x.fillText("lista_precios.xlsx", 225, 530); x.font = F(800, 36); x.fillText("✓✓", 480, 590);
    }
  } else if (modo === "llamada") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    avatar(x, AVATAR.graciela, w / 2, 380, 170);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 70); x.fillText("Graciela", w / 2, 640); x.font = F(700, 62); x.fillStyle = "#b4b2a3"; x.fillText("Rotisería", w / 2, 725); x.fillText("llamando", w / 2, 800);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(160, 960, 80, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(440, 960, 80, 0, 7); x.fill();
    tubo(x, 440, 960, 54, "#5ce611"); tubo(x, 160, 960, 54, "#c7655b");
  } else if (modo === "encurso") {
    avatar(x, AVATAR.graciela, w / 2, 330, 140); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 64); x.fillText("Graciela", w / 2, 540); x.font = F(700, 44); x.fillText("en llamada", w / 2, 610);
  } else {
    // parte 2: bloqueado, la hora, ninguna notificación
    // (ronda 4) bloqueado y en negro (sin texto chico): no entra nada
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; x.beginPath(); x.roundRect(w / 2 - 90, 1100, 180, 16, 8); x.fill();
  }
  pantR.needsUpdate = true;
}
// ---- el celular de Graciela: la llamada (P4) · el chat con los siete archivos (P6) · la tienda (Q2) ----
let claveG = "";
function dibujarCelG(t) {
  const parte2 = t >= P2;
  let modo = !parte2 ? (t >= T.p6 ? "chat" : "llamada") : "tienda";
  const fl = parte2 ? (t >= T.flip + 0.12 ? 2 : t >= T.flip ? 1 : 0) : 0, mas = parte2 ? T.mas.filter((a) => t >= a).length : 0, ped = parte2 ? (t >= T.pedido ? 2 : t >= T.pedir ? 1 : 0) : 0;
  const scr = modo === "chat" ? Math.round(claves(t, [[T.scroll[0], 0], [T.scroll[0] + 0.25, 1], [T.scroll[1], 1], [T.scroll[1] + 0.25, 0]]) * 6) : 0;
  const lejos = modo === "chat" && planoActual === "P6";   // (ronda 4) en el contraplano el celular es chico: sin texto
  const clave = `${modo}|${fl}|${mas}|${ped}|${scr}|${lejos}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 800, h = 1600;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "llamada") {
    avatar(x, AVATAR.ruben, w / 2, 460, 210); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 92); x.fillText("Rubén", w / 2, 790);
    x.font = F(700, 56); x.fillStyle = "#b4b2a3"; x.fillText("en llamada · 0:04", w / 2, 880);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 1300, 100, 0, 7); x.fill(); tubo(x, w / 2, 1300, 66, "#c7655b");
  } else if (lejos) {
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 210); avatar(x, AVATAR.ruben, 110, 105, 80);
    for (let i = 0; i < 7; i++) {
      const y = 236 + i * 184;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(14, y, w - 28, 166, 30); x.fill(); x.strokeStyle = i < 6 ? "#c7655b" : "#5ce611"; x.lineWidth = 14; x.stroke();
      hojita(x, 80, y + 83, 100); x.fillStyle = "#b4b2a3"; x.beginPath(); x.roundRect(150, y + 62, 480, 42, 21); x.fill();
    }
  } else if (modo === "chat") {
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 210); avatar(x, AVATAR.ruben, 100, 110, 66); x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Rubén", 190, 86); x.font = F(700, 42); x.fillStyle = "#b4b2a3"; x.fillText("Distribuidora", 190, 150);
    // los siete archivos, del más viejo (arriba) al más nuevo (abajo); los viejos con borde rojo apagado
    const bh = 166, y0 = 236 - scr * 4;
    NOMBRES.slice(0, 7).forEach((n, i) => {
      const y = y0 + i * (bh + 18), viejo = i < 6;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(14, y, w - 28, bh, 30); x.fill();
      if (viejo) { x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.stroke(); } else { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.stroke(); }
      hojita(x, 62, y + 62, 72);
      x.fillStyle = "#0b1220"; x.font = MONO(38); let s = 38; while (x.measureText(n).width > w - 140 && s > 24) { s -= 1; x.font = MONO(s); }
      x.fillText(n, 110, y + 62);
      x.font = F(700, 44); x.fillStyle = "#1f3254"; x.fillText(["19:02", "19:40", "20:15", "21:03", "21:57", "22:31", "23:48"][i] + " · ✓✓", 110, y + 124);
    });
  } else {
    // la tienda mayorista: "Distribuidora · Precios de hoy", cuatro productos con su precio, + / contador, Pedir
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, 220); x.fillStyle = "#5ce611"; x.fillRect(0, 220, w, 10);
    x.fillStyle = "#efeee5"; x.font = F(800, 58); x.fillText("Distribuidora", 44, 82); x.font = F(700, 50); x.fillStyle = "#5ce611"; x.fillText("Precios de hoy", 44, 162);
    // (ronda 1) callback de "Tengo siete": una sola lista, la de hoy
    x.fillStyle = "#1f3254"; x.fillRect(0, 230, w, 110);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(44, 246, 520, 80, 40); x.fill(); x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText("1 lista · la de hoy", 78, 288);
    const prods = [["Aceite 1,5 L x 12", fl >= 2 ? PRECIO_NUEVO : PRECIO_VIEJO], ["Harina 000 25 kg", "$ 1.020"], ["Azúcar 1 kg x 10", "$ 495"], ["Agua 2 L x 6", "$ 310"]];
    prods.forEach(([n, p], i) => {
      const y = 360 + i * 232;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(24, y, w - 48, 214, 30); x.fill();
      // el dibujito plano del producto
      x.fillStyle = ["#c9a46b", "#dcd9c8", "#efeee5", "#b9cde0"][i]; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(48, y + 30, 150, 166, 16); x.fill(); x.stroke();
      if (i === 0) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(100, y + 60, 46, 110, 14); x.fill(); x.stroke(); }
      x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText(n, 222, y + 72);
      const flip = i === 0 && fl === 1;
      x.font = F(900, 60); x.fillStyle = "#0b1220";
      if (!flip) x.fillText(p, 222, y + 160); else { x.save(); x.translate(222, y + 160); x.scale(1, 0.3); x.fillText(p, 0, 0); x.restore(); }
      if (i === 0 && fl >= 2) { const pw = x.measureText(p).width; x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(232 + pw, y + 132, 92, 56, 28); x.fill(); x.fillStyle = "#0b1220"; x.font = F(800, 36); x.fillText("hoy", 247 + pw, y + 161); }
      if (i === 0) {
        x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 100, y + 160, 50, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText("+", w - 100, y + 162);
        if (mas) { x.font = F(900, 66); x.fillText(String(mas === 3 ? 6 : mas * 2), w - 200, y + 160); }
        x.textAlign = "left";
      }
    });
    x.fillStyle = ped >= 2 ? "#5ce611" : "#1f3254"; x.beginPath(); x.roundRect(60, 1300, w - 120, 180, 90); x.fill();
    x.fillStyle = ped >= 2 ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 80); x.fillText(ped >= 2 ? "Pedido ✓" : "Pedir", w / 2, 1392);
    if (ped === 1) { x.strokeStyle = "rgba(239,238,229,0.8)"; x.lineWidth = 12; x.beginPath(); x.arc(w / 2, 1390, 110, 0, 7); x.stroke(); }
  }
  pantG.needsUpdate = true;
}

// ================= GLOBOS DE DIÁLOGO (pegados a la cámara, en píxeles de pantalla; de ya-lo-cargo) =================
// cada línea: texto; lo que va entre [corchetes] lleva el recuadro verde de selección. cab: { cv (avatar) | tubo, nombre }
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cab = null, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0;
  med.font = F(700, Math.round(px * 0.62) * 2); const anchoCab = cab ? (med.measureText(cab.nombre).width / 2 + px * 1.05) : 0; med.font = F(800, px * 2);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width / 2 + (l.includes("[") ? px * 0.25 : 0)));
  const Wg = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9 + cabH);
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.textBaseline = "middle";
    if (cab) {
      const r = px * 0.45 * 2, cy = px * 0.55 * 2 + px * 0.2, cx = px * 0.65 * 2;
      if (cab.cv) avatar(x, cab.cv, cx, cy, r); else tubo(x, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, Math.round(px * 0.62) * 2); x.textAlign = "left"; x.fillText(cab.nombre, cx + r + px * 0.3, cy + 2);
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
// (ronda 4) inserto del monitor a pantalla completa: un fondo navy mucho más grande que el cuadro (tapa la escena entera)
// y la pantalla del monitor en vertical, 1000 x 1300 px, con letra grande (su propio lienzo, sin pie)
const IW = 1000, IH = 1300, ICY = 1215;   // centro de la pantalla en y de cuadro
const pantI = lienzo(IW, IH, () => {});
const INS = new THREE.Group();
{
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(8000 / PXK, 12000 / PXK), new THREE.MeshBasicMaterial({ color: 0x16243d })); bg.position.z = -0.05; INS.add(bg);
  const marco = new THREE.Mesh(rbox((IW + 44) / PXK, (IH + 44) / PXK, 0.01, 30 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); marco.position.set(0, (960 - ICY) / PXK, -0.03); INS.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: pantI, toneMapped: false })); pan.position.set(0, (960 - ICY) / PXK, -0.02); INS.add(pan);
  pegarACamara(INS, camera, 10); INS.visible = false;
}
let claveI = "";
function dibujarInserto(t) {
  const parte2 = t >= P2;
  const e = parte2 ? 0 : t >= T.nuevo ? 3 : t >= T.tacha ? 2 : t >= T.celda ? 1 : 0;
  const pub = parte2 ? (t >= T.publicado ? 2 : t >= T.publica ? 1 : 0) : 0, esc = parte2 && t >= T.escribe ? 1 : 0;
  const clave = `${parte2}|${e}|${pub}|${esc}`; if (clave === claveI) return; claveI = clave;
  const { x } = pantI.userData, w = IW, h = IH;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  if (!parte2) {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); hojita(x, 66, 65, 78, "#0b1220");
    x.fillStyle = "#efeee5"; x.font = MONO(50); x.fillText(NOMBRES[versionEn(t)], 124, 68);
    x.fillStyle = "#1f3254"; x.fillRect(0, 130, w, 104);
    x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText("Producto", 40, 184); x.fillText("Precio", 620, 184);
    const filas = [["Aceite", "1,5 L x 12", "$ 1.140"], ["Azúcar", "1 kg x 10", "$ 495"], ["Harina 000", "25 kg", "$ 1.020"], ["Agua", "2 L x 6", "$ 310"]];
    const y0 = 234, rh = 262;
    filas.forEach(([n, pr, pc], r) => {
      const y = y0 + r * rh;
      x.fillStyle = r % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(0, y, w, rh);
      x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText(n, 40, y + 92);
      x.fillStyle = "#1f3254"; x.font = F(600, 50); x.fillText(pr, 40, y + 178);
      if (!(r === 0 && e >= 2)) { x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText(pc, 620, y + rh / 2); }
    });
    x.strokeStyle = "#1f3254"; x.lineWidth = 6; x.beginPath(); x.moveTo(590, 130); x.lineTo(590, y0 + 4 * rh); x.stroke();
    if (e >= 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 16; x.strokeRect(598, y0 + 8, w - 610, rh - 16); }
    if (e >= 2) {
      const yv = y0 + (e >= 3 ? 82 : rh / 2);
      x.fillStyle = "#c7655b"; x.font = F(800, e >= 3 ? 56 : 66); x.fillText("$ 1.140", 630, yv);
      const ww = x.measureText("$ 1.140").width; x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.beginPath(); x.moveTo(622, yv); x.lineTo(638 + ww, yv); x.stroke();
      if (e >= 3) { x.fillStyle = "#0b1220"; x.font = F(900, 84); x.fillText(PRECIO_VIEJO, 630, y0 + 182); }
    }
  } else {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 12);
    x.fillStyle = "#efeee5"; x.font = F(800, 60); x.fillText("Tienda · Productos", 44, 68);
    x.fillStyle = "#0b1220"; x.font = F(800, 72); x.fillText("Aceite 1,5 L x 12", 44, 240);
    x.fillStyle = "#1f3254"; x.font = F(700, 56); x.fillText("Precio de hoy", 44, 350);
    x.fillStyle = "#ffffff"; x.strokeStyle = esc ? "#5ce611" : "#1f3254"; x.lineWidth = 12; x.beginPath(); x.roundRect(44, 400, w - 88, 170, 26); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText(esc ? PRECIO_NUEVO : PRECIO_VIEJO, 90, 488);
    x.fillStyle = pub ? "#5ce611" : "#1f3254"; x.beginPath(); x.roundRect(44, 630, w - 88, 170, 85); x.fill();
    x.fillStyle = pub ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 84); x.fillText(pub >= 2 ? "Publicado ✓" : "Publicar", w / 2, 718);
    if (pub === 1) { x.strokeStyle = "rgba(11,18,32,0.6)"; x.lineWidth = 14; x.beginPath(); x.arc(w / 2, 715, 110, 0, 7); x.stroke(); }
    if (pub >= 2) {
      x.fillStyle = "#0b1220"; x.font = F(800, 62); x.fillText("Lo ven todos", w / 2, 900); x.fillText("tus clientes", w / 2, 975);
      [AVATAR.marta, AVATAR.walter, AVATAR.graciela].forEach((cv, i) => { const cx = w / 2 + (i - 1) * 230; avatar(x, cv, cx, 1140, 88); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(cx + 66, 1200, 34, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.stroke(); x.beginPath(); x.moveTo(cx + 50, 1200); x.lineTo(cx + 62, 1212); x.lineTo(cx + 82, 1188); x.stroke(); });
    }
    x.textAlign = "left";
  }
  pantI.needsUpdate = true;
}
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
const CAB = { gra: { cv: AVATAR.graciela, nombre: "Graciela · Rotisería" }, prov: { cv: null, nombre: "Proveedor" }, marta: { cv: AVATAR.marta, nombre: "Marta · Cafetería" }, walter: { cv: AVATAR.walter, nombre: "Walter · Bar" }, nico: { cv: AVATAR.nico, nombre: "Nico · Ventas" } };
const GL = {
  g1: crearGlobo(["¿Me pasás la", "[lista]", "actualizada?"], 104, { cab: CAB.gra }),
  p1: crearGlobo(["Rubén, subió", "el [aceite.]"], 80, { cab: CAB.prov }),
  marta: crearGlobo(["¿Me pasás la lista?"], 58, { cab: CAB.marta }),
  azucar: crearGlobo(["Bajó el azúcar."], 58, { cab: CAB.prov }),
  walter: crearGlobo(["¿Tenés la lista nueva?"], 58, { cab: CAB.walter }),
  dolar: crearGlobo(["Cambió el dólar."], 58, { cab: CAB.prov }),
  nico: crearGlobo(["¿La lista para", "el cliente nuevo?"], 58, { cab: CAB.nico }),
  g2: crearGlobo(["Rubén, ¿el aceite", "a cuánto está?"], 76),
  r1: crearGlobo(["Está en la lista.", "[La última.]"], 84),
  g3: crearGlobo(["¿Cuál es la última?", "Tengo [siete.]"], 82),
  p2: crearGlobo(["Rubén, subió", "el [aceite.]"], 80, { cab: CAB.prov }),
  r2: crearGlobo(["[Ocho.]"], 130),
  g4: crearGlobo(["Dale. ¿Me la", "mandás en [PDF?]"], 86, { cab: CAB.gra }),
  p3: crearGlobo(["Rubén, subió", "el [aceite.]"], 80, { cab: CAB.prov }),
  r3: crearGlobo(["¿Algo más?"], 96),
  r4: crearGlobo(["Claro.", "El [PDF] no se mueve.", "El [aceite], sí."], 74),
  // (ronda 4) M2: las burbujas largas crecen de a una línea, al empezar cada frase
  r4a: crearGlobo(["Claro."], 74), r4b: crearGlobo(["Claro.", "El [PDF] no se mueve."], 74),
  g3a: crearGlobo(["¿Cuál es la última?"], 82),
};

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un plano,
// Catmull-Rom continua. Los de la parte 2 repiten el encuadre de su par de la parte 1 (P1 → Q1).
const CAM_P1 = (k) => [lerp(0.05, 0.0, k), lerp(5.05, 4.9, k), lerp(3.7, 3.15, k), lerp(0.0, -0.05, k), lerp(4.62, 4.4, k), lerp(1.2, 1.45, k), 46];   // (ronda 4) Rubén más abajo: el gancho no le tapa la cara
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  // P2: la cámara baja a la derecha, al teléfono de escritorio en primer término, Rubén detrás
  ["P2", T.p2, [[T.p2, 0.15, 5.0, 4.0, 0.2, 4.25, 1.35, 46], [T.p2b, 0.18, 4.95, 3.75, 0.22, 4.23, 1.38, 46]]],
  ["P2b", T.p2b, null],                     // inserto del monitor (se arma en renderAt)
  // P3: la ráfaga: de frente, la cámara sube como grúa y se corre a la izquierda (al final el escritorio entero desde
  // arriba, la cinta larga, Rubén y el depósito que se apaga atrás)
  ["P3", T.p3, [[T.p3, 0.1, 4.95, 4.2, 0.0, 4.5, 1.3, 46], [T.v[4], -0.02, 5.2, 4.25, 0.0, 4.5, 1.3, 46], [T.v[5] + 0.08, -0.02, 5.2, 4.22, 0.0, 4.5, 1.3, 46], [T.v[6] + 0.15, 0.1, 5.1, 3.85, 0.1, 4.05, 1.65, 46],   /* (ronda 4) baja recién cuando se fueron los globos */ [T.p4, 0.1, 5.05, 3.75, 0.1, 4.03, 1.65, 46]]],
  ["P4", T.p4, null],                       // la zambullida al celular (se arma en renderAt)
  ["P4b", T.p4b, null],                     // salimos del celular de Graciela
  ["P5", T.p5, null],                       // salimos del celular de Rubén
  ["P6", T.p6, null],                       // contraplano a Graciela + inserto del chat
  ["P6b", T.chat, null],
  // P7: la pausa: desde la izquierda y abajo (la cinta larga cruzando, el teléfono a la derecha, la taza), push-in lento
  ["P7", T.p7, [[T.p7, 0.72, 4.85, 3.75, 0.15, 4.3, 1.3, 46], [T.p8, 0.62, 4.8, 3.45, 0.15, 4.3, 1.3, 46]]],
  // P8: de frente, más abierto (Rubén y el borde derecho del escritorio); se acerca cuando mira a cámara
  // P8 (ronda 3): de frente; push-in marcado a la cara durante la mirada y "Claro…"; corte a la cinta .pdf (P8b)
  ["P8", T.p8, [[T.p8, 0.32, 4.9, 3.35, 0.15, 4.32, 1.2, 46], [T.mira[0], 0.26, 4.88, 3.15, 0.1, 4.36, 1.15, 46], /* (ronda 4) más cerca desde el arranque */ [T.r4 + 1.6, 0.16, 4.66, 2.85, 0.0, 4.42, 1.05, 42], [T.tecla, 0.12, 4.64, 2.7, 0.0, 4.42, 1.05, 40]]],
  // P8b: la cinta .pdf de cerca (≥ 60 px) y la cámara baja a la cola que se dobla y cuelga del borde
  // (ronda 4) P8b: solo la cinta, de frente y de cerca; push-in a ".pdf" (sin el mate ni la lámpara)
  ["P8b", T.tecla + 0.12, [[T.tecla + 0.12, 0.66, 4.8, 2.9, 0.66, 4.09, ZT, 46], [T.pdfLee[0] + 0.3, 0.66, 4.55, 2.45, 0.66, 4.07, ZT, 46], [P1, 0.67, 4.53, 2.4, 0.67, 4.07, ZT, 46]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...CAM_P1(0)], [T.q1b, ...CAM_P1(0.9)]]],
  ["Q1b", T.q1b, null],                     // inserto del panel
  ["Q1c", T.q1c, [[T.q1c, 1.1, 4.85, 3.3, 0.22, 4.3, 1.0, 42], [T.q2, 1.07, 4.82, 3.15, 0.22, 4.3, 1.0, 41]]],   // (ronda 4) el monitor queda fuera de cuadro
  // Q2 (ronda 1): el tríptico de los tres celulares de clientes, push-in corto
  ["Q2", T.q2, [[T.q2, TX, 1.43, 3.4, TX, 1.42, 0, 40], [T.q2c, TX, 1.42, 3.25, TX, 1.42, 0, 40]]],
  ["Q2c", T.q2c, null],                     // inserto del celular de Graciela
  ["Q3", T.q3, [[T.q3, 0.66, 4.88, 3.98, -0.37, 4.25, 1.25, 51], [DUR, 0.62, 4.86, 3.88, -0.37, 4.25, 1.25, 50]]],   // (ronda 4) monitor entero y Rubén más grande   // (ronda 3) Rubén entero, celular y mate arriba de la línea chica
];
const CAMDBG = VER.startsWith("cam:") ? VER.slice(4).split(",").map(Number) : null;   // depuración: VER=cam:px,py,pz,mx,my,mz,fov
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
  return { c, p };
}

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.15, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.95 } };
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.25, feliz: 0 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca = { ...(p.boca || {}), abierta: Math.max(p.boca?.abierta ?? 0, cl(e * 1.1 - 0.05) * k) }; }
};
const _w = new THREE.Vector3();
// mano en coordenadas del mundo → espacio del cuerpo del personaje (para el IK)
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
// ---------- Rubén (sentado de espaldas al vidrio, mirando a +z) ----------
const R_POS = { x: 0, y: OFI.piso - 0.08, z: 1.02 };
const MIRA_MON = -0.72;                         // giro de la cabeza para mirar el monitor (a su derecha, -x)
const OREJA_D = V3(-0.37, 0.24, 0.03);            // en el espacio de la cabeza: donde va el celular (oreja derecha)
// dónde está cada cosa sobre el escritorio (mundo)
const TERMO0 = { x: X0 + LARGOS[5] + 0.066, z: ZT + 0.004 };
const TERMO1 = { x: 0.28, z: 1.6 };              // donde lo deja Rubén
const TAZA0 = { x: TAZA_X, z: ZT - 0.03 };
const MATE0 = { x: 0.52, z: 2.5 };   // (ronda 4) más adelante
const CEL0 = { x: -0.22, z: 2.32 };
const CEL2 = { x: -0.3, z: 1.6 };   // (ronda 3) parte 2: el celular al alcance, arriba de la línea chica
function rubenBase(t) {
  return { ...R_POS, giro: 0, sentado: 1, inclina: 0.1, ...aC(MIRA_MON * 0.7, 0.12), ...NADA, ojos: { abiertos: 0.95, tension: 0.1, feliz: 0 }, manoI: [0.36, 0.27, 0.36], manoD: [-0.3, 0.27, 0.3], codoI: null, codoD: null, dedoI: 0, dedoD: 0, t };
}
// el celular de Rubén: en el escritorio, en la mano (oreja), en el escritorio otra vez (parte 2)
function celEnOreja(t) { const p2 = t >= P2; return !p2 && t >= T.p5 - 0.01; }
function poseRuben(t) {
  const parte2 = t >= P2;
  let pr = rubenBase(t);
  if (!parte2) {
    // P1: el audio de Graciela; mira el celular (abajo a su derecha), después arrastra el archivo con el mouse (izquierda)
    if (t < T.p2) {
      pr.cabeza = { giro: -0.25, asiente: 0.42, ladea: 0.02 }; pr.ojos = { x: -0.2, y: -0.75, abiertos: 0.95, tension: 0.15 };
      if (t >= T.arrastra[0] - 0.25) { pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.7, y: -0.05, abiertos: 0.95, tension: 0.15 }; }
      const u = sg(t, T.arrastra[0], T.arrastra[1]);
      pr.manoI = [lerp(0.36, 0.32, eio(u)), 0.27, lerp(0.42, 0.34, eio(u))];
    } else if (t < T.p3) {
      // P2: suena el teléfono; lo mira; toca el altavoz con la izquierda; vuelve al monitor
      pr.cabeza = { giro: 0.5, asiente: 0.08, ladea: 0 }; pr.ojos = { x: 0.5, y: -0.45, abiertos: 0.95 };
      const k = Math.sin(Math.PI * sg(t, T.alt1 - 0.2, T.alt1 + 0.15));
      pr.manoI = [lerp(0.36, 0.66, k), lerp(0.27, 0.37, k), lerp(0.36, 0.42, k)];
      if (t >= T.p1 + 0.5) { pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.7, y: -0.05, abiertos: 0.95, tension: 0.2 }; }
      pr.manoD = [-0.3, 0.27, 0.3];
    } else if (t < T.p4) {
      // P3: la ráfaga: mirando el monitor, la izquierda en el mouse (clic en cada envío); agarra el termo sin mirar
      pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.7, y: -0.05, abiertos: 0.95, tension: 0.3 };
      Object.assign(pr, { cejas: { alto: -0.1, ang: 0.3 } });
      const cl1 = [T.envM, T.envW, ...T.v.slice(2, 7)].reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.08, b + 0.04))), 0);
      pr.manoI = [0.36, 0.27 + 0.02 * cl1, 0.42];
      const ag = sg(t, T.agarra[0] - 0.12, T.agarra[1]);
      if (ag > 0 && ag < 1) {
        // la mano va al termo (que está volcándose en la punta de la cinta) y lo lleva al costado
        termo.updateMatrixWorld(true);
        const w = termo.getWorldPosition(_w).clone().add(V3(0.0, 0.2, -0.05));
        pr.manoI = aCuerpo(ruben, w); pr.codoI = [1, -0.5, -0.3];
        pr.inclina = 0.1 + 0.12 * Math.sin(Math.PI * ag);
      }
    } else if (t < T.p5) {
      // P4: suena el celular; lo mira de reojo
      pr.cabeza = { giro: -0.3, asiente: 0.4, ladea: 0 }; pr.ojos = { x: -0.3, y: -0.7, abiertos: 0.95, tension: 0.2 };
    } else {
      // P5-P8: el celular en la oreja derecha (mano derecha); mira al frente / al monitor; P8 mira a cámara
      pr.cabeza = { giro: -0.12, asiente: 0.06, ladea: -0.04 }; pr.ojos = { x: -0.1, y: 0.0, abiertos: 0.95, tension: 0.2 };
      if (t >= T.p6) { pr.cabeza = { giro: MIRA_MON * 0.85, asiente: 0.05, ladea: -0.03 }; pr.ojos = { x: -0.6, y: -0.05, abiertos: 0.95, tension: 0.25 }; }
      // P7: el teléfono de escritorio: lo toca sin mirarlo (la izquierda)
      if (t >= T.p7) { const k = Math.sin(Math.PI * sg(t, T.alt2 - 0.22, T.alt2 + 0.15)); pr.manoI = [lerp(0.36, 0.66, k), lerp(0.27, 0.37, k), lerp(0.36, 0.42, k)]; }
      // P8: la tecla sin mirar
      if (t >= T.p8) { const k = Math.sin(Math.PI * sg(t, T.tecla - 0.2, T.tecla + 0.12)); pr.manoI = [lerp(0.36, 0.12, k), lerp(0.27, 0.3 - 0.04 * k, k), lerp(0.36, 0.38, k)]; }
      // la mirada a cámara (despacio, cara de nada)
      const m = eio(sg(t, T.mira[0], T.mira[1]));
      if (m > 0) {
        camera.updateMatrixWorld(true); ruben.raiz.updateMatrixWorld(true);
        const cab = ruben.cabeza.getWorldPosition(_w).clone(), d = camera.position.clone().sub(cab);
        const g = Math.atan2(d.x, d.z) - ruben.raiz.rotation.y, a = -Math.atan2(d.y - 0.1, Math.hypot(d.x, d.z));
        pr.cabeza = { giro: lerp(pr.cabeza.giro, g, m), asiente: lerp(pr.cabeza.asiente, a, m), ladea: lerp(-0.03, 0, m) };
        pr.ojos = { x: lerp(-0.6, 0, m), y: lerp(-0.05, 0.05, m), abiertos: 0.95, tension: 0.15 };
        Object.assign(pr, { cejas: { alto: 0.05, ang: 0.0, asim: t >= T.r4 + 0.5 ? 0.6 : 0 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.95 } });
      }
    }
    bocaVoz(pr, t, T.r1, ENV.r1, 0.6); bocaVoz(pr, t, T.r2, ENV.r2, 0.6); bocaVoz(pr, t, T.r4, ENV.r4, 0.6);
    return pr;
  }
  // ---- parte 2: sin anteojos, el mate en la mano izquierda; tranquilo ----
  Object.assign(pr, BUENA);
  pr.cabeza = { giro: 0.45, asiente: 0.2, ladea: 0 }; pr.ojos = { x: 0.4, y: -0.3, abiertos: 0.95, feliz: 0.2 };
  pr.manoI = [0.24, 0.42, 0.3]; pr.codoI = [1, -0.6, -0.2];   // el mate en la mano
  if (t >= T.q1b) { pr.cabeza = { giro: MIRA_MON, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.6, y: 0, abiertos: 0.95, feliz: 0.15 }; const k = Math.sin(Math.PI * sg(t, T.publica - 0.18, T.publica + 0.1)); pr.manoD = [lerp(-0.3, -0.2, k), 0.27 + 0.03 * k, lerp(0.3, 0.42, k)]; }
  if (t >= T.q1c) { pr.cabeza = { giro: 0.35, asiente: 0.22, ladea: 0.04 }; pr.ojos = { x: 0.35, y: -0.35, abiertos: 0.9, feliz: 0.1 }; pr.boca = { sonrisa: 0.3, abierta: 0, ancho: 1 }; pr.cejas = { alto: 0.15, ang: -0.1, asim: 0.5 }; }
  if (t >= T.q3) {
    pr.cabeza = { giro: MIRA_MON * 0.7, asiente: 0.05, ladea: 0 }; pr.ojos = { x: -0.5, y: 0, abiertos: 0.95, feliz: 0.2 };
    // mira el celular (quieto), lo levanta, lo toca, lo alza hacia la ventana buscando señal, lo deja boca abajo, mate
    if (t >= T.miraCel) { pr.cabeza = { giro: -0.3, asiente: 0.4, ladea: 0 }; pr.ojos = { x: -0.3, y: -0.7, abiertos: 0.95 }; pr.cejas = { alto: 0.4, ang: 0.3 }; pr.boca = { sonrisa: 0, abierta: 0, ancho: 0.85 }; }
    if (t >= T.levanta[0]) {
      pr.cabeza = { giro: -0.2, asiente: 0.1, ladea: 0 }; pr.ojos = { x: -0.2, y: -0.2, abiertos: 1 };
    }
    if (t >= T.senal[0]) { pr.cabeza = { giro: -0.35, asiente: -0.35, ladea: -0.1 }; pr.ojos = { x: -0.3, y: 0.6, abiertos: 1 }; pr.cejas = { alto: 0.6, ang: 0.4 }; }
    if (t >= T.deja) { pr.cabeza = { giro: 0.1, asiente: 0.1, ladea: 0 }; pr.ojos = { x: 0.1, y: -0.1, abiertos: 0.9, feliz: 0.3 }; Object.assign(pr, { boca: { sonrisa: 0.5, abierta: 0, ancho: 1.05 }, cejas: { alto: 0.1, ang: 0 } }); pr.inclina = lerp(0.1, -0.05, eio(sg(t, T.deja, T.deja + 0.4))); }
    if (t >= T.sorbo - 0.25) { mate.updateMatrixWorld(true); }
  }
  bocaVoz(pr, t, T.r3, ENV.r3, 0.6);
  return pr;
}
// ---------- Graciela (rotisería): el celular en la oreja (izquierda), lo separa para mirar; parte 2 lo mira en la mano
const OREJA_I = V3(0.37, 0.24, 0.03);
function poseGraciela(t) {
  const parte2 = t >= P2;
  const pr = { x: GRA.x, z: GRA.z, giro: -0.15, inclina: 0.04, ...aC(-0.05, 0.02), ...CARA.neutra, ...BRAZOS.costado, t };
  pr.ojos = { x: -0.1, y: 0, abiertos: 1, feliz: 0.1 };
  if (!parte2) {
    if (t >= T.p6 + 0.15) { pr.cabeza = { giro: 0.2, asiente: 0.38, ladea: 0.05 }; pr.ojos = { x: 0.1, y: -0.75, abiertos: 1, feliz: 0 }; pr.cejas = { alto: 0.35, ang: 0.3 }; }
    bocaVoz(pr, t, T.g2, ENV.g2, 0.7); bocaVoz(pr, t, T.g3, ENV.g3, 0.7);
    if (t >= T.p6 + 0.1) pr.boca = { ...(pr.boca || {}), sonrisa: 0.15 };
  } else {
    Object.assign(pr, CARA.sonrisa);
    pr.cabeza = { giro: 0.1, asiente: 0.4, ladea: 0.04 }; pr.ojos = { x: 0, y: -0.7, abiertos: 1, feliz: 0.25 };
    pr.manoI = [0.1, 0.42, 0.34]; pr.codoI = [0.8, -0.6, -0.2]; pr.manoD = [-0.08, 0.4, 0.36]; pr.codoD = [-0.8, -0.6, -0.2];
    const toq = [...T.mas, T.pedir].reduce((a, b) => Math.max(a, Math.sin(Math.PI * sg(t, b - 0.06, b + 0.06))), 0);
    pr.manoD = [pr.manoD[0], pr.manoD[1] - 0.025 * toq, pr.manoD[2]]; pr.dedoD = 1;
    if (t >= T.pedido) { pr.cejas = { alto: 0.5, ang: 0.1 }; pr.boca = { sonrisa: 0.85, abierta: 0, ancho: 1.1 }; }
  }
  return pr;
}

// ================= RENDER =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function ponerLuces(t, lugar) {
  const parte2 = t >= P2;
  // la oficina (de noche: la lámpara cálida + el monitor; 18:30: además el relleno más fuerte)
  const enOf = lugar === "of";
  luzLamp.intensity = enOf ? (parte2 ? 6 : 9) : 0;
  luzMon.intensity = enOf ? (parte2 ? 0.6 : 1.4) : 0;
  relleno.intensity = enOf ? (parte2 ? 1.5 : 0.75) : lugar === "dep" ? 0.4 : 0;
  rim.intensity = enOf ? (parte2 ? 0.7 : 0.55) : 0;
  ambOf.intensity = enOf ? (parte2 ? 1.5 : 0.95) : 0;
  // el depósito: de noche las campanas se apagan de a una (cada una deja su pasillo en navy plano); 18:30 todas prendidas
  let prendidas = 0;
  CAMPANAS.forEach((c) => {
    const off = !parte2 && t >= T.campanas[c.i];
    const k = off ? 1 - sg(t, T.campanas[c.i], T.campanas[c.i] + 0.1) : 1;
    c.luz.intensity = (enOf || lugar === "dep") ? (parte2 ? 60 : 38) * k : 0;
    c.focoM.color.setHex(k > 0.5 ? 0xfff1d6 : 0x4a5468);
    c.charcoM.opacity = k; c.charcoM.color.setHex(parte2 ? 0xd9d5c4 : 0x3e5278);
    prendidas += k;
  });
  depAmb.intensity = (enOf || lugar === "dep") ? (parte2 ? 3.2 : 0.45 + 0.75 * prendidas / 6) : 0;
  MAT_PISO.color.setHex(parte2 ? 0xbdb9aa : 0x2a3a56); MAT_PARED.color.setHex(parte2 ? 0x34507a : 0x1f3254);
  cieloPorton.color.setHex(parte2 ? 0x2c4268 : 0x0b1220);
  // la rotisería: de noche un tubo y poca luz; a la tarde abierta (el sol bajo por la vidriera) y la calle
  const enRot = lugar === "rot" || lugar === "calle";
  luzTubo.intensity = enRot ? (parte2 ? 3 : 4.5) : 0;
  luzRotF.intensity = enRot ? (parte2 ? (lugar === "calle" ? 2.6 : 1.7) : 0.7) : 0;
  luzCalle.intensity = enRot ? (parte2 ? (lugar === "calle" ? 2.8 : 1.8) : 1.0) : 0;
  // (ronda 1, rendimiento) cada luz encendida cuesta en cada píxel: solo existen las del lugar
  const enDep = enOf || lugar === "dep";
  for (const l of [luzLamp, luzMon, relleno, rim, ambOf]) l.visible = enOf;
  CAMPANAS.forEach((c) => (c.luz.visible = enDep)); depAmb.visible = enDep;
  for (const l of [luzTubo, luzRotF, luzCalle]) l.visible = enRot;
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }   // (antes de las poses: la mirada a cámara de P8)
  const lugar = ["P4b", "P6", "P6b", "Q2c"].includes(planoActual) ? "rot" : planoActual === "Q2" ? "trip" : "of";
  ponerLuces(t, lugar);
  scene.background = parte2 ? TARDE : NOCHE;
  const enRot = lugar === "rot" || lugar === "calle";
  const enTrip = lugar === "trip";
  const insPlano = ["P2b", "Q1b"].includes(planoActual);   // (ronda 4) el inserto tapa todo: no se dibuja la oficina
  DEP.visible = OF.visible = AFUERA.visible = !enRot && !enTrip && !insPlano; ROT.visible = CALLE.visible = enRot; TRIP.visible = enTrip;
  if (parte2) dibujarTrip(t);
  // ---- objetos ----
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = parte2 ? t * 1.6 + i * 0.9 : i * 0.9;
  pollos.forEach((p) => (p.visible = parte2));
  llamaM.color.setScalar(parte2 ? 0.92 + 0.08 * Math.sin(t * 11) * Math.sin(t * 7.3) : 0.18);
  persiana.position.set(0, parte2 ? 3.6 : 2.15 - 0.12 * sg(t, T.g2 + 1.0, T.g2 + 1.3), 0); persiana.visible = !parte2;
  vidrieraNoche.color.setHex(parte2 ? 0x2c4268 : 0x0b1220);
  tuboM.color.setHex(0xf4f6ee);
  dibujarMonitor(t); dibujarCelR(t); dibujarCelG(t);
  ponerCinta(t);
  // el teléfono de escritorio vibra; el altavoz se prende
  const ringA = (!parte2 && (en(t, T.ring1, T.alt1) || en(t, T.ring2, T.alt2))) || (parte2 && en(t, T.ring3, T.alt3));
  telefono.position.x = 0.52 + (ringA ? Math.sin(t * 90) * 0.004 : 0);
  const altOn = (!parte2 && ((t >= T.alt1 && t < T.p1 + LEN.p1 + 0.2) || (t >= T.alt2 && t < T.p2v + LEN.p2 + 0.2))) || (parte2 && t >= T.alt3 && t < T.colgado);
  botonAlt.material.color.set(altOn ? C.g : 0x2a3b58);
  // el termo: en la punta de la cinta; v7 lo empuja y se inclina; Rubén lo lleva al costado
  {
    let x = TERMO0.x, z = TERMO0.z, rz = 0, y = MESA_Y;
    if (!parte2) {
      const fin = finCinta(t);
      x = Math.max(TERMO0.x, fin + 0.066);
      if (t >= T.v[6]) { const s = sg(t, T.v[6], T.v[6] + 0.9); rz = -0.32 * Math.exp(-s * 2.2) * Math.cos(s * 9) - 0.08; }
      if (t >= T.agarra[0]) {
        const u = eio(sg(t, T.agarra[0], T.agarra[1]));
        x = lerp(x, TERMO1.x, u); z = lerp(z, TERMO1.z, u); y = MESA_Y + 0.26 * Math.sin(Math.PI * u);   // (ronda 4) lo levanta bien: se lee "agarra el termo", no "el teléfono" rz = lerp(rz, 0, u);
      }
    } else { x = 0.82; z = 1.5; }
    termo.position.set(x, y, z); termo.rotation.set(0, 0.5, rz);
  }
  // la taza de lapiceras: v8 la corre 3 cm (y un poco hacia atrás: la última cinta pasa al lado)
  {
    const u = !parte2 && t >= T.v[7] ? eo(sg(t, T.v[7] + 0.04, T.v[7] + 0.2)) : 0;
    taza.position.set(TAZA0.x + 0.035 * u, MESA_Y, TAZA0.z - 0.03 * u); taza.rotation.y = 0.3 + 0.25 * u;
    taza.visible = !parte2;
    pila.visible = !parte2;   // (ronda 4) en la parte 2 no hay listas impresas
  }
  // el mate: en el escritorio (parte 1), en la mano izquierda de Rubén (parte 2)
  mate.position.set(MATE0.x, MESA_Y, MATE0.z); mate.rotation.set(0, -Math.PI / 2, 0);   // (ronda 4) la bombilla hacia la cámara: no cruza la cinta
  mate.visible = planoActual !== "P8b";
  // ---- personajes ----
  // Rubén
  const inserto = ["P2b", "Q1b"].includes(planoActual);
  monitor.visible = !(planoActual === "P5" && t < T.p5 + 0.3);   // la salida por el celular de Rubén arranca donde está el monitor
  ruben.raiz.visible = !enRot && !enTrip && !inserto; lampara.visible = !inserto && planoActual !== "P8b";
  if (ruben.anteojos) ruben.anteojos.visible = !parte2;
  let pr = poseRuben(t);
  ruben.poner(pr);
  // el celular de Rubén: sobre el escritorio (vibra cuando entra algo), en la oreja derecha (P5-P8), parte 2 en el escritorio
  {
    const vib = (!parte2 && (en(t, 0.0, 0.5) || en(t, T.marta, T.marta + 0.2) || en(t, T.walter, T.walter + 0.2) || en(t, T.nico, T.nico + 0.2) || en(t, T.llama, T.p5))) ? Math.sin(t * 95) * 0.004 : 0;
    if (celEnOreja(t)) {
      ruben.raiz.updateMatrixWorld(true);
      const o = ruben.cabeza.localToWorld(OREJA_D.clone());
      pr.manoD = aCuerpo(ruben, o.clone().add(V3(0.02, -0.17, 0.0))); pr.codoD = [-1, -0.7, 0.1];
      ruben.poner(pr);
      ruben.cabeza.updateMatrixWorld(true);
      const o2 = ruben.cabeza.localToWorld(OREJA_D.clone());
      celR.position.copy(o2); ruben.cabeza.getWorldQuaternion(_q); celR.quaternion.copy(_q); celR.rotateY(-Math.PI / 2); celR.rotateZ(0.25);
    } else if (parte2 && t >= T.levanta[0] && t < T.deja + 0.15) {
      // Q3: lo levanta, lo mira, lo toca, lo alza hacia la ventana buscando señal, lo deja boca abajo
      const u1 = eio(sg(t, T.levanta[0], T.levanta[1])), u2 = eio(sg(t, T.senal[0], T.senal[0] + 0.3)), u3 = eio(sg(t, T.deja - 0.2, T.deja));
      const meneo = t >= T.senal[0] && t < T.senal[1] ? Math.sin((t - T.senal[0]) * 16) * 0.05 : 0;
      const p0 = V3(CEL2.x, MESA_Y + 0.012, CEL2.z), p1 = V3(-0.24, MESA_Y + 0.32, 1.42), p2 = V3(-0.36 + meneo, MESA_Y + 0.62, 1.32);
      const p = p0.clone().lerp(p1, u1).lerp(p2, u2 * (1 - u3)); if (u3 > 0) p.lerp(p0, u3);
      celR.position.copy(p);
      celR.rotation.set(lerp(-Math.PI / 2, -0.35, u1) + u2 * (1 - u3) * 0.3 + u3 * (Math.PI / 2 + 0.35) * 2, 0.15, meneo * 2);
      if (u3 >= 1) celR.rotation.set(Math.PI / 2, 0.15, 0);
      // la mano derecha sigue al celular
      pr.manoD = aCuerpo(ruben, celR.position.clone().add(V3(-0.02, -0.03, -0.05))); pr.codoD = [-1, -0.5, -0.2];
      ruben.poner(pr);
    } else if (parte2 && t >= T.deja + 0.15) {
      celR.position.set(CEL2.x, MESA_Y + 0.012, CEL2.z); celR.rotation.set(Math.PI / 2, 0.15, 0);   // boca abajo
    } else {
      const cc = parte2 ? CEL2 : CEL0; celR.position.set(cc.x + vib, MESA_Y + 0.012, cc.z); celR.rotation.set(-Math.PI / 2, 0, 0.15);
    }
  }
  // parte 2: el mate en la mano izquierda (lo toma al final)
  if (parte2) {
    const m = ruben.brazos[0].mano.getWorldPosition(_a).clone();
    if (t >= T.sorbo - 0.3) {
      // lleva el mate a la boca
      const u = Math.sin(Math.PI * sg(t, T.sorbo - 0.3, T.sorbo + 0.6));
      ruben.raiz.updateMatrixWorld(true);
      const boca = ruben.cabeza.localToWorld(V3(0.0, 0.1, 0.42));
      pr.manoI = aCuerpo(ruben, m.clone().lerp(boca.clone().add(V3(-0.05, -0.12, 0.1)), u)); pr.codoI = [1, -0.6, -0.2];
      ruben.poner(pr);
    }
    const m2 = ruben.brazos[0].mano.getWorldPosition(_a).clone();
    const uS = Math.sin(Math.PI * sg(t, T.sorbo - 0.3, T.sorbo + 0.6)); mate.position.copy(m2).add(V3(-0.06, -0.07, 0.01));   /* (ronda 4) la mano al costado, no adentro */ mate.rotation.set(0, 0, 0.12 + 0.35 * uS);   // (ronda 4) la bombilla va a la boca
  }
  // Graciela (la rotisería)
  graciela.raiz.visible = enRot && !["P6b", "Q2c"].includes(planoActual);
  let pg = poseGraciela(t);
  graciela.poner(pg);
  graciela.raiz.position.x += RX;
  {
    graciela.raiz.updateMatrixWorld(true);
    if (!parte2) {
      // en la oreja izquierda; en P6 lo separa para mirarlo (delante de la cara)
      const sep = eio(sg(t, T.p6 + 0.05, T.p6 + 0.45));
      const o = graciela.cabeza.localToWorld(OREJA_I.clone());
      const pecho = graciela.raiz.localToWorld(V3(0.1, 0.9, 0.34));      // (ronda 3) a la altura del pecho, debajo de la boca
      const p = o.clone().add(V3(0, -0.2, 0)).lerp(pecho, sep);
      pg.manoI = aCuerpo(graciela, p); pg.codoI = [1, -0.6, 0.1];
      graciela.poner(pg); graciela.raiz.position.x += RX; graciela.raiz.updateMatrixWorld(true);
      // en la oreja (sep 0): la pantalla hacia afuera; en la mano (sep 1): pegado a la mano, inclinado hacia ella
      const o2 = graciela.cabeza.localToWorld(OREJA_I.clone());
      graciela.cabeza.getWorldQuaternion(_q); const qO = _q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)));
      const mano = graciela.brazos[0].mano.getWorldPosition(_b).clone();
      const qM = new THREE.Quaternion(); graciela.raiz.getWorldQuaternion(qM); qM.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.95, -0.25, 0)));
      const enMano = mano.clone().add(V3(0, 0.1, 0.02).applyQuaternion(qM));
      celG.position.copy(o2.lerp(enMano, sep)); celG.quaternion.copy(qO.slerp(qM, sep));
    } else {
      // parte 2: en la mano, delante del pecho, mirándolo
      const m = graciela.brazos[0].mano.getWorldPosition(_a).clone();
      celG.position.copy(m).add(V3(-0.04, 0.09, 0.02));
      graciela.cuerpo.getWorldQuaternion(_q); celG.quaternion.copy(_q); celG.rotateX(-0.9); celG.rotateY(Math.PI);
    }
  }
  if (["P6b", "Q2c"].includes(planoActual)) {
    // los insertos: el celular derecho delante de Graciela (ella atrás, oculta), la cámara de frente
    celG.position.set(RX + 0.62, 1.3, -1.75); celG.rotation.set(-0.12, 0.05, 0);
  }
  celG.visible = enRot;
  graciela.brazos[0].mano.visible = !(planoActual === "P4b" && t < T.p4b + 0.1);   // (ronda 4) sin el puño pegado a la cámara
  // el operario con la zorra (parte 2, por el pasillo del depósito, se ve por el vidrio)
  const opVis = parte2 && planoActual === "Q1";   // (ronda 4) en Q1c asomaba la cabeza detrás del brazo
  operario.raiz.visible = opVis; zorra.visible = opVis;
  if (opVis) {
    const zz = lerp(-14, -3.5, sg(t, P2 - 0.5, T.q2));
    operario.poner({ x: 0.3, z: zz - 1.3, giro: 0, paso: 1, inclina: 0.08, ...aC(0, 0.05), ...CARA.concentrada, manoI: [0.15, 0.25, 0.45], manoD: [-0.15, 0.25, 0.45], codoI: null, codoD: null, t });
    zorra.position.set(0.3, 0, zz - 0.4); zorra.rotation.y = Math.PI;
  }
  etiqueta.visible = false; estela.visible = false;   // (ronda 1) sin el viaje de la etiqueta (era el mecanismo de ya-lo-cargo)
  // ---- cámara ----
  if (pl[2]) { /* ya está */ }
  else if (planoActual === "P2b" || planoActual === "Q1b") {
    // inserto del monitor (ronda 3): plano, pegado a la cámara; un push-in suave
    const k = sg(t, pl[1], pl[1] + 0.8);
    ponerCam([0, 4.5, 3, 0, 4.5, 0, 48], t, true);
    dibujarInserto(t);
    const kk = halfK(); INS.position.set(0, 0, -1); INS.scale.setScalar(kk * PXK * lerp(1.0, 1.03, k));
  } else if (planoActual === "P4") {
    // suena el celular: de cerca, y zambullida en la pantalla (la llena antes del corte)
    celR.updateMatrixWorld(true);
    const c = celR.localToWorld(V3(0, 0, 0)), n = V3(0, 0, 1).transformDirection(celR.matrixWorld);
    const u = eio(sg(t, T.zambulle[0], T.zambulle[1]));
    const d = lerp(0.95, 0.07, u);
    const p = c.clone().add(n.clone().multiplyScalar(d)).add(V3(0, 0, lerp(0.45, 0.0, u)));
    ponerCam([p.x, p.y, p.z, c.x, c.y, c.z, 44], t, true);
    camera.up.set(0, 0, -1); camera.lookAt(c);
  } else if (planoActual === "P4b") {
    // salimos por la pantalla del celular de Graciela: de la pantalla (llena el cuadro) a su plano medio de 3/4
    celG.updateMatrixWorld(true);
    const c = celG.localToWorld(V3(0, 0, 0)), n = V3(0, 0, 1).transformDirection(celG.matrixWorld);
    const u = eo(sg(t, T.p4b, T.p4b + 0.6));   // (ronda 4) sale rápido: el puño no queda pegado a la cámara
    graciela.raiz.updateMatrixWorld(true);
    const cara = graciela.cabeza.localToWorld(V3(0, 0.22, 0.1));
    const lejos = V3(RX + 1.45, 1.8, -0.55);
    const A = c.clone().add(n.clone().multiplyScalar(0.5)).add(V3(0, 0.08, 0)), B = c.clone().add(n.clone().multiplyScalar(1.0)).add(V3(0, 0.7, 0.35));
    const p = A.clone().multiplyScalar((1 - u) * (1 - u)).add(B.clone().multiplyScalar(2 * u * (1 - u))).add(lejos.clone().multiplyScalar(u * u));
    const mira = c.clone().add(V3(0, 0.07, 0)).lerp(cara.clone().add(V3(0.15, -0.18, 0)), eo(u));   // (ronda 4) mira arriba del celular: el puño queda abajo, fuera
    ponerCam([p.x, p.y, p.z, mira.x, mira.y, mira.z, lerp(44, 42, u)], t, u < 1);
  } else if (planoActual === "P5") {
    // salimos por la pantalla del celular de Rubén (en su oreja) hasta el primer plano
    celR.updateMatrixWorld(true);
    const c = celR.localToWorld(V3(0, 0, 0)), n = V3(0, 0, 1).transformDirection(celR.matrixWorld);
    const u = eio(sg(t, T.p5, T.p5 + 0.5));
    ruben.raiz.updateMatrixWorld(true);
    const cara = ruben.cabeza.localToWorld(V3(0, 0.22, 0.1));
    const lejos = V3(0.3, 4.62, 2.95);
    const A = c.clone().add(n.clone().multiplyScalar(0.45)), B = c.clone().add(n.clone().multiplyScalar(1.2)).add(V3(0, 0.3, 0.9));
    const p = A.clone().multiplyScalar((1 - u) * (1 - u)).add(B.clone().multiplyScalar(2 * u * (1 - u))).add(lejos.clone().multiplyScalar(u * u));
    const mira = c.clone().lerp(cara.clone().add(V3(0, 0.05, 0)), eo(u));   // (ronda 4) la cinta queda fuera por abajo
    ponerCam([p.x, p.y, p.z, mira.x, mira.y, mira.z, lerp(44, 40, u)], t, u < 1);
  } else if (planoActual === "P6") {
    // contraplano: de frente a la izquierda (ronda 1: por encima del hombro solo se veía el pelo)
    const u = eio(sg(t, T.p6, T.chat));
    celG.updateMatrixWorld(true); const c = celG.getWorldPosition(_a).clone();
    graciela.raiz.updateMatrixWorld(true); const cara = graciela.cabeza.localToWorld(V3(0, 0.15, 0.1));
    ponerCam([RX + lerp(-0.45, -0.35, u), lerp(1.6, 1.58, u), lerp(0.15, -0.1, u), cara.x + 0.05, cara.y - lerp(0.26, 0.3, u), cara.z, lerp(50, 46, u)], t);
  } else if (planoActual === "P6b" || planoActual === "Q2c") {
    // inserto del celular de Graciela (llena ~90 % del alto)
    camPantalla(celG, V3(0, 0, 0), V3(0, 0, 1), 0.16 * 1.5, 0.9, 30, t);
  }
  INS.visible = planoActual === "P2b" || planoActual === "Q1b";
  if (CAMDBG) ponerCam(CAMDBG, t, true);

  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo ----
  {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => 1 - sg(t, tf - 0.06, tf);   // (ronda 3) salida en 2 cuadros
    for (const k in GL) GL[k].visible = false;
    const px = (obj, loc = V3(0, 0, 0)) => { obj.updateMatrixWorld(true); return enPantalla(obj.localToWorld(loc)); };
    const pa = planoActual;
    if (pa === "P1") { const [cx, cy] = px(celR); ponerGlobo(GL.g1, 540, 350, 1, [cx - 320, cy]); }   // (ronda 4) hasta el corte: sin cuadros sin globo   // la cola baja por la izquierda, hacia el celular
    if (pa === "P2" && t >= T.p1 - 0.05) ponerGlobo(GL.p1, 600, 290, ent(T.p1), px(telefono, V3(0, 0.12, 0)));
    if (pa === "P2b") ponerGlobo(GL.p1, 540, 300, 1, null);
    if (pa === "P3") {
      // la ráfaga: se apilan arriba (sin voz); las del proveedor salen del teléfono
      const L = [["marta", T.marta, celR], ["azucar", T.azucar, telefono], ["walter", T.walter, celR], ["dolar", T.dolar, telefono], ["nico", T.nico, celR]];
      L.forEach(([k, t0, o], i) => { if (t >= t0) { const n = L.filter(([, t1]) => t >= t1).length; const pos = n - 1 - i; ponerGlobo(GL[k], i % 2 ? 640 : 440, 225 + pos * 238, ent(t0) * (pos > 1 ? 0 : 1) * sale(T.v[5] + 0.1), pos === 0 ? px(o) : null, 4 - pos); } });
    }
    if (pa === "P4b" && t >= T.p4b + 0.42) { const [bx, by] = bocaPx(graciela); ponerGlobo(GL.g2, 540, Math.max(330, by - 520), ent(T.p4b + 0.42), [bx, by - 40]); }
    if (pa === "P5" && t >= T.p5 + 0.35) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r1, 540, Math.max(250, by - 620), ent(T.p5 + 0.35), [bx, by - 40]); }   // (ronda 2) cuando la cámara ya salió del celular
    // globo que crece hacia abajo: el borde de arriba queda fijo en `top`
    const crece = (g, top, s, obj) => ponerGlobo(g, 540, top + g.userData.H / 2, s, obj);
    if (pa === "P6" && t >= T.g3) { const [bx, by] = bocaPx(graciela); const g = t >= T.g3 + 1.05 ? GL.g3 : GL.g3a; crece(g, 300 - GL.g3.userData.H / 2, ent(T.g3), [Math.min(bx, 900), by]); }
    if (pa === "P7" && t >= T.p2v - 0.05) ponerGlobo(GL.p2, 640, 360, ent(T.p2v) * sale(T.r2), px(telefono, V3(0, 0.12, 0)));
    if (pa === "P7" && t >= T.r2) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r2, 540, Math.max(300, by - 600), ent(T.r2), [bx, by - 40]); }
    if (pa === "P8" && t >= T.g4) ponerGlobo(GL.g4, 540, 300, ent(T.g4) * sale(T.r4 - 0.02), null);   // (ronda 4) la voz sale del celular en la oreja: sin cola   // el celular está en la oreja, fuera de cuadro a la izquierda: la cola va al borde
    if (pa === "P8" && t >= T.r4) { const [bx, by] = bocaPx(ruben); const g = t >= T.r4 + 2.42 ? GL.r4 : t >= T.r4 + 0.74 ? GL.r4b : GL.r4a; crece(g, Math.max(300, by - 560) - GL.r4.userData.H / 2, ent(T.r4) * sale(T.tecla + 0.25), [bx, by - 40]); }
    if (pa === "Q1" && t >= T.p1b - 0.05) ponerGlobo(GL.p3, 540, 400, ent(T.p1b), px(telefono, V3(0, 0.12, 0)));   // (ronda 4) sigue igual en el inserto
    if (pa === "Q1b") ponerGlobo(GL.p3, 540, 300, 1, null);
    if (pa === "Q1c" && t >= T.r3) { const [bx, by] = bocaPx(ruben); ponerGlobo(GL.r3, 540, Math.max(330, by - 460), ent(T.r3), [bx, by - 40]); }
  }
  if (en(tIn, P1, P2) || LIMPIO) for (const k in GL) GL[k].visible = false;
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (VER === "perf2") {
  const px = new Uint8Array(4), gl = renderer.getContext();
  const med = (f) => { renderAt(17.3); f && f(); renderer.render(scene, camera); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); const a = performance.now(); for (let i = 0; i < 3; i++) { renderAt(17.3); f && f(); renderer.render(scene, camera); } gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return Math.round((performance.now() - a) / 6); };
  const r = [];
  r.push(["base", med()]);
  r.push(["sinDEP", med(() => { DEP.visible = false; })]);
  r.push(["sinRuben", med(() => { ruben.raiz.visible = false; })]);
  r.push(["sinOF", med(() => { OF.visible = false; })]);
  r.push(["sinEnv", med(() => { scene.environment = null; })]);
  const env = entorno(); scene.environment = env;
  renderer.shadowMap.enabled = false; scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => (m.needsUpdate = true)); });
  r.push(["sinSombra", med()]);
  const d = document.createElement("div"); d.style.cssText = "position:absolute;left:20px;top:20px;z-index:99;font:700 34px monospace;color:#fff;background:#000;padding:10px;white-space:pre";
  d.textContent = r.map(([a, b]) => a + " " + b).join("\n"); document.body.appendChild(d);
}
if (VER === "perf") {
  // depuración: tiempo medio de renderAt (con readPixels para esperar a la GPU) en 20 tiempos repartidos
  const px = new Uint8Array(4), gl = renderer.getContext(); const ts = Array.from({ length: 8 }, (_, i) => (i * DUR) / 8 + 0.13);
  for (const t of ts) { renderAt(t); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); }
  const r = []; for (const t of ts) { const a = performance.now(); renderAt(t); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); r.push([t, performance.now() - a]); }
  const d = document.createElement("div"); d.style.cssText = "position:absolute;left:20px;top:20px;z-index:99;font:700 34px monospace;color:#fff;background:#000;padding:10px;white-space:pre";
  d.textContent = "media " + Math.round(r.reduce((a, b) => a + b[1], 0) / r.length) + " ms\n" + r.map(([t, m]) => t.toFixed(1) + " s: " + Math.round(m)).join("\n"); document.body.appendChild(d);
}
if (window.__tresListo) window.__tresListo();
