// Capa 3D de parrilla-no-vuelve (Three.js r170 local). Base técnica: reels/estetica-turnos (globos pegados a la cámara
// en píxeles de pantalla, avatares por render target, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom,
// insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF,
// Date.now ni azar sin semilla.
// UN lugar: la parrilla de Raúl, de noche. Pared del fondo (z = -3): la parrilla a leña con la campana y el brasero a la
// izquierda, la mesada (la tablet en la parte 2), la pizarra y la puerta de calle a la derecha; el salón con las mesas
// hacia +z. El living de Graciela es un set chico aparte (x = 30).
//   PARTE 1: sábado 21:30, el salón lleno: "¡Impecable, Raúl! ¡Volvemos!" · "¡Cuando quieras, maestro!" · "¿Quién era?"
//            · la ráfaga (todos le dicen Raúl, él les dice campeón, genio, jefe) · la pizarra: SÁBADO → MARTES · FEBRERO
//            · el salón vacío: "¿Y si les avisás a los del sábado?" · los contactos · "¿A quién? ¿A maestro?" · entra
//            Walter: "¿Te acordás de mí?" · "¡Obvio, maestro!"
//   PARTE 2: el QR de la mesa y la tarjeta de puntos · "¡Te espero, Walter!" · el panel "Quién vuelve y cada cuánto" ·
//            febrero: el aviso solo a los que dejaron de venir (Graciela: "¡Vamos el martes!") · martes de febrero con
//            17 mesas: "Walter. Tira y morcilla dulce. Faltaste dos sábados." · Sofi: "Comentá VUELVE…"
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, CARA, BRAZOS, MARCA, PIEL, PELO, poseEn, pegarACamara, crearCelular, crearTablet, saludo } from "./personajes.js";
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
const r2 = (n) => Math.round(n * 100) / 100;
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
  env.background = new THREE.Color(0x6a6658);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(10, 1.2, 0, 7, 0, 0, 0xfff6e8, 1.4);
  tira(4, 6, 6, 2, -1, Math.PI / 2, 0xfff2dc, 1.3);
  tira(1.4, 8, -4, 1, 6, 0, 0xe8eeff, 0.6);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.5;

// ---------- luces: noche en la parrilla. Las lámparas colgantes (luz crema desde arriba, con sombra), el cielo cálido,
// un relleno frío desde el salón y la brasa (naranja, sin sombra) que le pega a Raúl desde abajo ----------
const sol = new THREE.DirectionalLight(0xfff0d8, 1.55);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 4;
Object.assign(sol.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 0.5, far: 25 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xfff1dc, 0x5a4a3c, 1.6); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xe6ecff, 0.6); relleno.position.set(2, 3, 8); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xffe2c0, 0.45); rim.position.set(-3, 4, -9); scene.add(rim);
const brasaL = new THREE.PointLight(0xff9a50, 2.4, 3.2, 1.6); brasaL.position.set(-1.3, 1.05, -1.75); scene.add(brasaL);
// la lámpara de la parrilla (sin sombra): que la carne se lea
const foco = new THREE.SpotLight(0xfff2dc, 9, 4.5, 0.75, 0.6, 1.4); foco.position.set(-1.3, 2.05, -1.5); foco.target.position.set(-1.3, 0.9, -1.95); scene.add(foco, foco.target);
function ponerSol(cx, cz) { sol.position.set(cx + 2.5, 7, cz + 4); sol.target.position.set(cx, 0.6, cz); sol.target.updateMatrixWorld(); }
ponerSol(0, -0.5);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, gp: 0xcfeebc, red: 0xc7655b, blanco: 0xf8f7f2, piso: 0xc9c5b6, metal: 0xc4c8cf };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.75), cr2: mat(C.cr2, 0.75), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  blanco: mat(C.blanco, 0.85), metal: mat(C.metal, 0.3, { metalness: 0.5 }), goma: mat(0x23262c, 0.8), pared: mat(0xece9dc, 0.92),
  vidrio: new THREE.MeshPhysicalMaterial({ color: 0xcfe2f2, roughness: 0.05, transparent: true, opacity: 0.18, depthWrite: false }),
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
const CAV = (s) => `700 ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };
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
// LA PARRILLA DE RAÚL, DE NOCHE: paredes navy claro lisas, vigas y mesas de madera oscura, manteles crema a cuadros
// navy, lámparas colgantes; las brasas como único naranja. Pared del fondo en z = GZ: la parrilla a la izquierda (con
// la campana y el brasero), la mesada con la tablet (parte 2), la pizarra y la puerta de calle a la derecha.
// =====================================================================================================
const SET = new THREE.Group(); scene.add(SET);
const GZ = -3.0, ALTO = 3.0, XW = 3.6;
const GRILL = { x: -1.3, z: -1.9, w: 1.5, d: 0.7, base: 0.8, y: 0.9, tilt: 0.1 };
const RAUL0 = { x: -0.95, z: -2.6 };
const MESADA = { x: 0.61, z: -2.05, w: 0.72, d: 0.62, alto: 0.92 };
const PIZ = { x: 2.45, y: 1.52, z: GZ + 0.06, w: 0.98, h: 0.92 };
const PUERTA = { x: 1.3, w: 0.92 };
const MADERA = mat(0x3b2a20, 0.62), MADERA2 = mat(0x4a3628, 0.6), HIERRO = mat(0x1d1f24, 0.55, { metalness: 0.35 }), CHAPA = mat(C.navy3, 0.45, { metalness: 0.25 });
const PARED = mat(C.navy2, 0.92);
// mantel crema a cuadros navy (cuadros grandes: que la compresión no los vuelva un gris)
const mantelT = lienzo(256, 256, (x, w) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, w); x.fillStyle = "rgba(31,50,84,0.55)"; for (let i = 0; i < 4; i++) { x.fillRect(i * 64, 0, 26, w); x.fillRect(0, i * 64, w, 26); } });
mantelT.wrapS = mantelT.wrapT = THREE.RepeatWrapping; mantelT.repeat.set(2.2, 1.8);
const MANTEL = new THREE.MeshStandardMaterial({ map: mantelT, roughness: 0.9 });
const LOZA = mat(0xf3f1e8, 0.35), VIDRIO_V = new THREE.MeshPhysicalMaterial({ color: 0x8fc4a0, roughness: 0.1, transparent: true, opacity: 0.55 });
const BRASA = new THREE.MeshStandardMaterial({ color: 0x2a1a14, emissive: 0xd9772f, emissiveIntensity: 1.0, roughness: 0.9 });
const brasasT = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#d9772f"; x.fillRect(0, 0, w, h); semilla = 11; for (let i = 0; i < 70; i++) { x.fillStyle = i % 3 ? "#5a2c18" : "#8a8278"; x.beginPath(); x.ellipse(az() * w, az() * h, 10 + az() * 22, 7 + az() * 14, az() * 3, 0, 7); x.fill(); } });
const BRASAS = new THREE.MeshStandardMaterial({ map: brasasT, emissive: 0xffffff, emissiveMap: brasasT, emissiveIntensity: 0.85, roughness: 1 });
// frustum (campana): base w0 x d0, arriba w1 x d1, alto h
function frustum(w0, d0, w1, d1, h) {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2, Math.SQRT1_2, h, 4, 1, true); g.rotateY(Math.PI / 4);
  const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const top = p.getY(i) > 0; p.setX(i, p.getX(i) * (top ? w1 : w0)); p.setZ(i, p.getZ(i) * (top ? d1 : d0)); }
  g.computeVertexNormals(); return g;
}
{
  // piso de baldosas crema gastadas (liso) y paredes navy claro, zócalo de madera
  const piso = mesh(new THREE.PlaneGeometry(2 * XW, 9.5), mat(0xb8b2a2, 0.85), 0, 0, 1.75); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  const pared = (w, h, x, y, z, ry) => { const p = mesh(new THREE.BoxGeometry(w, h, 0.1), PARED, x, y, z); p.rotation.y = ry; p.castShadow = false; SET.add(p); return p; };
  pared(2 * XW + 0.1, ALTO, 0, ALTO / 2, GZ - 0.05, 0);
  for (const s of [-1, 1]) pared(9.5, ALTO, s * (XW + 0.05), ALTO / 2, 1.75, Math.PI / 2);
  pared(2 * XW + 0.1, ALTO, 0, ALTO / 2, 6.5, 0);
  SET.add(caja(2 * XW, 0.14, 0.03, MADERA, 0, 0.07, GZ + 0.015, 0.005));
  for (const s of [-1, 1]) { const z = caja(9.5, 0.14, 0.03, MADERA, s * (XW - 0.015), 0.07, 1.75, 0.005); z.rotation.y = Math.PI / 2; SET.add(z); }
  // techo crema oscuro y vigas de madera
  const techo = mesh(new THREE.PlaneGeometry(2 * XW, 9.5), new THREE.MeshBasicMaterial({ color: 0x2a3550 }), 0, ALTO, 1.75); techo.rotation.x = Math.PI / 2; techo.castShadow = false; SET.add(techo);
  for (let i = 0; i < 6; i++) { const v = caja(2 * XW, 0.16, 0.14, MADERA, 0, ALTO - 0.08, GZ + 0.5 + i * 1.5, 0.01); v.castShadow = false; SET.add(v); }
  // ---- la parrilla: base de ladrillo revocada navy3 con la tapa de madera al frente ----
  const g = new THREE.Group(); g.position.set(GRILL.x, 0, GRILL.z); SET.add(g);
  g.add(caja(GRILL.w + 0.2, GRILL.base, GRILL.d + 0.2, M.navy3, 0, GRILL.base / 2, 0, 0.02));
  for (let i = 0; i < 4; i++) g.add(caja(GRILL.w + 0.21, 0.012, 0.012, M.edge, 0, 0.18 + i * 0.16, GRILL.d / 2 + 0.105, 0.003));   // las juntas del ladrillo
  g.add(caja(GRILL.w + 0.26, 0.05, 0.08, MADERA2, 0, GRILL.base + 0.02, GRILL.d / 2 + 0.11, 0.01));
  // la cama de brasas (sobre la base, debajo de la parrilla)
  const cama = mesh(new THREE.PlaneGeometry(GRILL.w - 0.05, GRILL.d - 0.05), BRASAS, 0, GRILL.base + 0.008, 0); cama.rotation.x = -Math.PI / 2; cama.castShadow = false; g.add(cama);
  semilla = 21;
  for (let i = 0; i < 22; i++) { const b = mesh(new THREE.DodecahedronGeometry(0.025 + az() * 0.02, 0), BRASA, (az() - 0.5) * (GRILL.w - 0.15), GRILL.base + 0.02, (az() - 0.5) * (GRILL.d - 0.12)); b.scale.y = 0.6; b.castShadow = false; g.add(b); }
  // los costados de chapa que levantan la parrilla y el marco
  for (const s of [-1, 1]) g.add(caja(0.04, 0.16, GRILL.d + 0.04, HIERRO, s * (GRILL.w / 2 + 0.02), GRILL.base + 0.08, 0, 0.005));
  g.add(caja(GRILL.w + 0.08, 0.2, 0.04, HIERRO, 0, GRILL.base + 0.1, -GRILL.d / 2 - 0.02, 0.005));
}
// la parrilla en V (inclinada hacia adelante) con la canaleta y la carne: un grupo inclinado
const PARR = new THREE.Group(); PARR.position.set(GRILL.x, GRILL.y, GRILL.z); PARR.rotation.x = GRILL.tilt; SET.add(PARR);
{
  const n = 34;
  for (let i = 0; i < n; i++) { const x = -GRILL.w / 2 + 0.03 + (i * (GRILL.w - 0.06)) / (n - 1); for (const s of [-1, 1]) { const v = caja(0.006, 0.026, GRILL.d, HIERRO, x + s * 0.007, 0, 0, 0.002); v.rotation.z = s * 0.45; PARR.add(v); } }
  PARR.add(caja(GRILL.w + 0.04, 0.03, 0.03, HIERRO, 0, -0.005, -GRILL.d / 2, 0.006));
  // la canaleta de adelante (junta la grasa) con un pico
  const can = mesh(new THREE.CylinderGeometry(0.028, 0.028, GRILL.w + 0.04, 16, 1, true, 0, Math.PI), HIERRO, 0, -0.012, GRILL.d / 2 + 0.02); can.rotation.z = Math.PI / 2; can.material.side = THREE.DoubleSide; PARR.add(can);
  // patas de la parrilla (manivela del costado)
  PARR.add(mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 16), HIERRO, GRILL.w / 2 + 0.07, -0.02, 0.1).rotateY(Math.PI / 2));
}
// la campana de chapa navy3 (sobre la parrilla y el brasero) y el tiraje al techo
{
  const cg = mesh(frustum(2.25, 1.0, 0.55, 0.4, 0.62), CHAPA, GRILL.x - 0.45, 2.36, GZ + 0.55); cg.material.side = THREE.DoubleSide; SET.add(cg);
  SET.add(caja(2.3, 0.08, 1.04, CHAPA, GRILL.x - 0.45, 2.06, GZ + 0.55, 0.01));
  SET.add(caja(0.42, ALTO - 2.6, 0.34, CHAPA, GRILL.x - 0.45, 2.6 + (ALTO - 2.6) / 2, GZ + 0.45, 0.01));
  SET.add(caja(2.32, 0.03, 0.02, mat(C.g, 0.5), GRILL.x - 0.45, 2.06, GZ + 1.07, 0.005));   // el filete verde de marca
  // los azulejos crema detrás de la parrilla (zócalo de la pared, hasta la campana)
  SET.add(caja(2.25, 1.25, 0.02, mat(0xd9d7c9, 0.5), GRILL.x - 0.45, 1.4, GZ + 0.02, 0.005));
  for (let i = 1; i < 6; i++) SET.add(caja(2.25, 0.008, 0.024, mat(0xb4b2a3, 0.6), GRILL.x - 0.45, 0.78 + i * 0.21, GZ + 0.025, 0.002));
  // utensilios colgados de la pared (pala y atizador)
  for (const [x, l] of [[-2.35, 0.55], [-2.22, 0.5]]) { SET.add(caja(0.014, l, 0.014, HIERRO, x, 1.55 - l / 2, GZ + 0.06, 0.004)); }
  SET.add(caja(0.09, 0.12, 0.012, HIERRO, -2.35, 1.0, GZ + 0.065, 0.004));
}
// ---- el brasero (canasto de hierro con los troncos) a la izquierda de la parrilla ----
const BRASERO = new THREE.Group(); BRASERO.position.set(GRILL.x - GRILL.w / 2 - 0.42, 0, GRILL.z - 0.05); SET.add(BRASERO);
const LLAMAS = [];
{
  const b = BRASERO;
  b.add(caja(0.62, 0.82, 0.62, M.navy3, 0, 0.41, 0, 0.02));   // apoya sobre la misma base
  // la cesta: barrotes verticales
  for (let i = 0; i < 6; i++) for (const s of [-1, 1]) { b.add(caja(0.012, 0.3, 0.012, HIERRO, -0.25 + i * 0.1, 0.97, s * 0.22, 0.003)); b.add(caja(0.012, 0.3, 0.012, HIERRO, s * 0.25, 0.97, -0.25 + i * 0.1, 0.003)); }
  for (const y of [0.83, 1.11]) for (const s of [-1, 1]) { b.add(caja(0.52, 0.014, 0.014, HIERRO, 0, y, s * 0.22, 0.003)); b.add(caja(0.014, 0.014, 0.46, HIERRO, s * 0.25, y, 0, 0.003)); }
  // los troncos (corteza marrón, punta encendida)
  const corteza = mat(0x5a3a24, 0.9), punta = new THREE.MeshStandardMaterial({ color: 0x3a2014, emissive: 0xd9772f, emissiveIntensity: 0.9 });
  semilla = 5;
  for (let i = 0; i < 6; i++) {
    const L = 0.42 + az() * 0.12, tr = mesh(new THREE.CylinderGeometry(0.04, 0.045, L, 10), [corteza, punta, punta], (az() - 0.5) * 0.2, 0.9 + (i % 3) * 0.06, (az() - 0.5) * 0.2);
    tr.rotation.set(Math.PI / 2 + (az() - 0.5) * 0.5, 0, (i % 2 ? 1 : -1) * (0.5 + az() * 0.6)); b.add(tr);
  }
  b.add(mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.04, 20), BRASAS, 0, 0.84, 0));
  // las llamas: conos planos naranja apagado y crema (se mueven en renderAt)
  const LL = [new THREE.MeshBasicMaterial({ color: 0xd9772f }), new THREE.MeshBasicMaterial({ color: 0xe8a050 }), new THREE.MeshBasicMaterial({ color: 0xf2d7a0 })];
  for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.ConeGeometry(0.06 - (i % 3) * 0.012, 0.28, 7), LL[i % 3]); l.position.set(-0.12 + i * 0.06, 1.08, (i % 2 ? 0.05 : -0.04)); l.userData.base = l.position.clone(); b.add(l); LLAMAS.push(l); }
}
// ---- la mesada de la derecha (madera, frente navy3): frasco de escarbadientes, platos, la tabla con el chorizo al pan ----
{
  const g = new THREE.Group(); g.position.set(MESADA.x, 0, MESADA.z); SET.add(g);
  g.add(caja(MESADA.w, MESADA.alto - 0.04, MESADA.d, M.navy3, 0, (MESADA.alto - 0.04) / 2, 0, 0.02));
  g.add(caja(MESADA.w + 0.06, 0.045, MESADA.d + 0.06, MADERA2, 0, MESADA.alto - 0.02, 0.0, 0.01));
  g.add(caja(MESADA.w - 0.1, 0.05, 0.02, M.g, 0, MESADA.alto - 0.15, MESADA.d / 2 + 0.005, 0.01));
  for (let i = 0; i < 5; i++) g.add(mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.012, 24), LOZA, 0.24, MESADA.alto + 0.006 + i * 0.013, -0.18));
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.09, 14), new THREE.MeshPhysicalMaterial({ color: 0xd8ecf2, roughness: 0.1, transparent: true, opacity: 0.5 }), -0.3, MESADA.alto + 0.045, 0.2));
}
// ---- la pizarra de tiza (marco de madera oscura) ----
const pizT = lienzo(1024, 960, () => {});
{
  const g = new THREE.Group(); g.position.set(PIZ.x, PIZ.y, PIZ.z); SET.add(g);
  g.add(caja(PIZ.w + 0.08, PIZ.h + 0.08, 0.04, MADERA, 0, 0, 0, 0.01));
  const sup = plano(PIZ.w, PIZ.h, pizT, 0, 0, 0.022); sup.material.roughness = 0.95; sup.material.emissive = new THREE.Color(0xffffff); sup.material.emissiveMap = pizT; sup.material.emissiveIntensity = 0.12; g.add(sup);
  g.add(caja(PIZ.w * 0.8, 0.025, 0.06, MADERA, 0, -PIZ.h / 2 - 0.05, 0.03, 0.005));   // la repisa de la tiza
}
// ---- la puerta de calle (vidrio, marco de madera, "Parrilla Raúl" en vinilo crema, campanita) ----
const PUERTA_HOJA = new THREE.Group();
{
  const g = new THREE.Group(); g.position.set(PUERTA.x, 0, GZ + 0.02); SET.add(g);
  for (const [w, h, x, y] of [[PUERTA.w + 0.16, 0.1, 0, 2.27], [0.08, 2.3, -PUERTA.w / 2 - 0.04, 1.15], [0.08, 2.3, PUERTA.w / 2 + 0.04, 1.15]]) g.add(caja(w, h, 0.1, MADERA, x, y, 0, 0.01));
  // la calle de noche detrás del vidrio: navy plano con el farol y una vereda
  const afuera = mesh(new THREE.PlaneGeometry(PUERTA.w, 2.2), new THREE.MeshBasicMaterial({ color: 0x0f1a2e }), 0, 1.11, -0.06); afuera.castShadow = false; g.add(afuera);
  const farol = mesh(new THREE.CircleGeometry(0.07, 20), new THREE.MeshBasicMaterial({ color: 0xf2e2b0 }), 0.25, 1.75, -0.055); g.add(farol);
  g.add(mesh(new THREE.PlaneGeometry(PUERTA.w, 0.35), new THREE.MeshBasicMaterial({ color: 0x24324c }), 0, 0.18, -0.055));
  PUERTA_HOJA.position.set(-PUERTA.w / 2, 0, 0.0); g.add(PUERTA_HOJA);
  const marco = (w, h, x, y) => PUERTA_HOJA.add(caja(w, h, 0.05, MADERA2, x, y, 0, 0.008));
  marco(0.07, 2.18, 0.035, 1.12); marco(0.07, 2.18, PUERTA.w - 0.035, 1.12); marco(PUERTA.w, 0.08, PUERTA.w / 2, 2.17); marco(PUERTA.w, 0.18, PUERTA.w / 2, 0.1);
  const vid = mesh(new THREE.PlaneGeometry(PUERTA.w - 0.14, 1.95), M.vidrio, PUERTA.w / 2, 1.15, 0); vid.castShadow = false; PUERTA_HOJA.add(vid);
  const vinT = lienzo(1024, 384, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Parrilla", 800, 170, w - 80); x.fillText("Parrilla", w / 2, h * 0.3); ajustar(x, "Raúl", 900, 190, w - 80); x.fillText("Raúl", w / 2, h * 0.74); });
  const vin = plano(0.66, 0.25, vinT, PUERTA.w / 2, 1.38, 0.006); vin.material.transparent = true; PUERTA_HOJA.add(vin);
  PUERTA_HOJA.add(caja(0.035, 0.3, 0.05, M.metal, PUERTA.w - 0.12, 1.05, 0.04, 0.012));
  const camp = new THREE.Group(); camp.position.set(PUERTA.w / 2 - 0.3, 2.3, 0.12); g.add(camp);
  camp.add(mesh(new THREE.ConeGeometry(0.06, 0.09, 16, 1, true), mat(0xd9a441, 0.3, { metalness: 0.6, side: THREE.DoubleSide }), 0, -0.07, 0));
  camp.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 6), M.navy, 0, -0.01, 0));
}
// ---- las lámparas colgantes (chapa navy, disco crema que brilla) ----
const LAMPS = [[-0.55, 0.3], [2.45, 0.4], [-1.3, 1.9], [0.25, 1.8], [2.45, 2.0], [-2.35, 0.9], [2.45, -1.25]];
for (const [x, z] of LAMPS) {
  SET.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.7, 6), M.navy, x, ALTO - 0.35, z));
  const pant = mesh(new THREE.CylinderGeometry(0.06, 0.24, 0.2, 20, 1, true), CHAPA, x, ALTO - 0.78, z); pant.material.side = THREE.DoubleSide; SET.add(pant);
  const luz = mesh(new THREE.CircleGeometry(0.2, 20), new THREE.MeshBasicMaterial({ color: 0xfff1d0 }), x, ALTO - 0.875, z); luz.rotation.x = Math.PI / 2; luz.castShadow = false; SET.add(luz);
}
// ---- el ventilador de techo (en febrero gira) ----
const VENT = new THREE.Group(); VENT.position.set(1.0, ALTO - 0.42, 0.9); scene.add(VENT);
{
  VENT.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.4, 8), M.navy3, 0, 0.22, 0));
  VENT.add(mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.09, 18), M.navy3, 0, 0, 0));
  for (let i = 0; i < 4; i++) { const p = caja(0.62, 0.012, 0.12, MADERA2, 0, -0.02, 0, 0.004); p.position.set(Math.cos((i * Math.PI) / 2) * 0.36, -0.02, Math.sin((i * Math.PI) / 2) * 0.36); p.rotation.y = -(i * Math.PI) / 2; p.rotation.x = 0.12; VENT.add(p); }
  sombras(VENT);
}

// =====================================================================================================
// LA COMIDA DE LA PARRILLA (que se reconozca: la tira con los huesitos, chorizos, morcillas, la provoleta)
// =====================================================================================================
const CARNE = mat(0x7a3a1e, 0.5), CARNE_O = mat(0x5a2a16, 0.55), GRASA = mat(0xe9dcc0, 0.45), HUESO = mat(0xefe6d0, 0.4), MEDULA = mat(0x9a5a3a, 0.6);
const tiraT = lienzo(512, 128, (x, w, h) => { x.fillStyle = "#86431f"; x.fillRect(0, 0, w, h); x.strokeStyle = "#3e1d0e"; x.lineWidth = 14; for (let i = -2; i < 12; i++) { x.beginPath(); x.moveTo(i * 52, 0); x.lineTo(i * 52 + 50, h); x.stroke(); } });
const TIRA_M = new THREE.MeshStandardMaterial({ map: tiraT, roughness: 0.45 });
function crearTira(L = 0.5, W = 0.095) {
  const g = new THREE.Group();
  g.add(mesh(rbox(L, 0.03, W, 0.01, 2), [CARNE, CARNE, TIRA_M, CARNE, CARNE_O, CARNE_O], 0, 0.015, 0));
  g.add(mesh(rbox(L, 0.026, 0.02, 0.008, 2), GRASA, 0, 0.014, -W / 2 - 0.006));
  // los huesitos: cada 7 cm, el corte redondo crema con la médula a la vista
  const n = Math.floor(L / 0.075);
  for (let i = 0; i < n; i++) {
    const x = -L / 2 + 0.045 + i * ((L - 0.09) / Math.max(1, n - 1));
    const h = mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.036, 14), HUESO, x, 0.019, 0.006); h.scale.z = 0.8; g.add(h);
    const m = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.002, 10), MEDULA, x, 0.038, 0.006); g.add(m);
  }
  return g;
}
const CHORIZO = mat(0x9c4526, 0.3), CHORIZO_C = mat(0x5a2414, 0.6), MORCILLA = mat(0x2b1715, 0.32);
const rellenoT = lienzo(256, 128, (x, w, h) => { x.fillStyle = "#4a1f1c"; x.fillRect(0, 0, w, h); semilla = 3; for (let i = 0; i < 60; i++) { x.fillStyle = i % 2 ? "#d9c8a0" : "#7a3a30"; x.beginPath(); x.arc(az() * w, az() * h, 3 + az() * 4, 0, 7); x.fill(); } });
function crearEmbutido(L, R, m, curva = 0.04, corte = false) {
  const g = new THREE.Group();
  const c = new THREE.QuadraticBezierCurve3(V3(-L / 2, 0, 0), V3(0, 0, curva), V3(L / 2, 0, 0));
  g.add(mesh(new THREE.TubeGeometry(c, 16, R, 12, false), m, 0, R, 0));
  for (const p of [c.getPoint(0), c.getPoint(1)]) { const e = mesh(new THREE.SphereGeometry(R, 12, 10), m, p.x, R, p.z); g.add(e); }
  if (corte === "chorizo") for (const k of [0.35, 0.65]) { const p = c.getPoint(k); const ct = caja(0.008, 0.004, R * 1.3, CHORIZO_C, p.x, 2 * R - 0.001, p.z, 0.002); g.add(ct); }
  if (corte === "abierta") { const p = c.getPoint(0.5); const ab = mesh(new THREE.SphereGeometry(1, 16, 10), new THREE.MeshStandardMaterial({ map: rellenoT, roughness: 0.7 }), p.x, 2 * R - 0.004, p.z); ab.scale.set(L * 0.3, 0.012, R * 0.75); g.add(ab); }
  return g;
}
const provT = lienzo(256, 256, (x, w) => { x.fillStyle = "#e6b84e"; x.beginPath(); x.arc(w / 2, w / 2, w / 2, 0, 7); x.fill(); semilla = 9; for (let i = 0; i < 14; i++) { x.fillStyle = "rgba(170,100,30,0.55)"; x.beginPath(); x.ellipse(40 + az() * 176, 40 + az() * 176, 14 + az() * 20, 10 + az() * 14, az() * 3, 0, 7); x.fill(); } for (let i = 0; i < 40; i++) { x.fillStyle = "#3f6a1e"; x.fillRect(30 + az() * 196, 30 + az() * 196, 6, 4); } });
function crearProvoleta(R = 0.09) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(R + 0.018, R + 0.014, 0.022, 28), HIERRO, 0, 0.011, 0));
  g.add(caja(0.16, 0.012, 0.03, HIERRO, R + 0.09, 0.012, 0, 0.004));
  const q = mesh(new THREE.CylinderGeometry(R, R, 0.026, 28), [mat(0xe2b04a, 0.35), new THREE.MeshStandardMaterial({ map: provT, roughness: 0.4 }), mat(0xe2b04a, 0.35)], 0, 0.035, 0); g.add(q);
  return g;
}
// la carne sobre la parrilla (sábado: llena; febrero: una sola tira)
const CARNE_SAB = new THREE.Group(), CARNE_FEB = new THREE.Group();
PARR.add(CARNE_SAB, CARNE_FEB);
{
  const y = 0.012;
  for (const [x, z, L] of [[-0.3, -0.21, 0.62], [-0.32, -0.08, 0.58], [0.34, -0.2, 0.5]]) { const t = crearTira(L); t.position.set(x, y, z); CARNE_SAB.add(t); }
  for (let i = 0; i < 4; i++) { const c = crearEmbutido(0.2, 0.027, CHORIZO, 0.03 * (i % 2 ? 1 : -1), "chorizo"); c.position.set(-0.58 + i * 0.13, y, 0.15); c.rotation.y = Math.PI / 2 + (i % 2 ? 0.08 : -0.08); CARNE_SAB.add(c); }
  for (let i = 0; i < 2; i++) { const m = crearEmbutido(0.21, 0.034, MORCILLA, 0.035, i ? "abierta" : false); m.position.set(-0.02 + i * 0.12, y, 0.14); m.rotation.y = Math.PI / 2; CARNE_SAB.add(m); }
  const pv = crearProvoleta(); pv.position.set(0.42, y, 0.13); CARNE_SAB.add(pv);
  const t1 = crearTira(0.55); t1.position.set(-0.05, y, -0.12); CARNE_FEB.add(t1);
  const c1 = crearEmbutido(0.2, 0.027, CHORIZO, 0.03, "chorizo"); c1.position.set(0.3, y, 0.15); c1.rotation.y = Math.PI / 2; CARNE_FEB.add(c1);
  sombras(CARNE_SAB); sombras(CARNE_FEB);
}
// el humo (planos crema muy tenues que suben lento) y las chispas del brasero
const HUMO = [];
for (let i = 0; i < 4; i++) { const h = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), new THREE.MeshBasicMaterial({ color: 0xd9d7c9, transparent: true, opacity: 0.1, depthWrite: false })); h.renderOrder = 5; scene.add(h); HUMO.push(h); }
const CHISPAS = [];
for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), new THREE.MeshBasicMaterial({ color: 0xf2b060 })); scene.add(c); CHISPAS.push(c); }

// =====================================================================================================
// EL SALÓN: las mesas (madera oscura, mantel crema a cuadros navy) con sillas; los comensales de fondo (siluetas simples
// sentadas, del mismo estilo) y la comida por estado: SÁBADO lleno, FEBRERO vacío (3 de 25), FEBRERO lleno (parte 2)
// =====================================================================================================
const MESAS = [[2.45, -1.25], [-0.55, 0.3], [2.45, 0.4], [-2.35, 0.9], [-1.3, 1.9], [0.25, 1.8], [2.45, 2.0], [-1.6, 3.4], [0.0, 3.5], [2.2, 3.5]];
const MESA_W = 0.86, MESA_D = 0.7, MESA_H = 0.74;
const W_MESA = 2;     // la mesa de Walter (parte 2: el QR)
const G_MESA = 5;     // la mesa de Graciela y sus amigas (Q4)
const SILLA = (x, z, ry, g) => {
  const s = new THREE.Group(); s.position.set(x, 0, z); s.rotation.y = ry; g.add(s);
  s.add(caja(0.42, 0.04, 0.4, MADERA2, 0, 0.45, 0, 0.01));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) s.add(caja(0.035, 0.45, 0.035, MADERA, sx * 0.18, 0.225, sz * 0.17, 0.006));
  for (const sx of [-1, 1]) s.add(caja(0.035, 0.5, 0.035, MADERA, sx * 0.18, 0.7, -0.18, 0.006));
  s.add(caja(0.4, 0.12, 0.03, MADERA2, 0, 0.88, -0.18, 0.01));
  return s;
};
{
  MESAS.forEach(([x, z], i) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); SET.add(g);
    g.add(caja(MESA_W, 0.04, MESA_D, MADERA, 0, MESA_H - 0.02, 0, 0.01));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.05, MESA_H - 0.04, 0.05, MADERA, sx * (MESA_W / 2 - 0.06), (MESA_H - 0.04) / 2, sz * (MESA_D / 2 - 0.06), 0.008));
    g.add(caja(MESA_W + 0.08, 0.012, MESA_D + 0.08, MANTEL, 0, MESA_H + 0.006, 0, 0.004));
    for (const s of [-1, 1]) { g.add(caja(MESA_W + 0.08, 0.16, 0.008, MANTEL, 0, MESA_H - 0.07, s * (MESA_D / 2 + 0.04), 0.003)); g.add(caja(0.008, 0.16, MESA_D + 0.08, MANTEL, s * (MESA_W / 2 + 0.04), MESA_H - 0.07, 0, 0.003)); }
    SILLA(0, -MESA_D / 2 - 0.12, 0, g); SILLA(0, MESA_D / 2 + 0.12, Math.PI, g);
    if (i === G_MESA) { SILLA(-MESA_W / 2 - 0.14, 0, Math.PI / 2, g); SILLA(MESA_W / 2 + 0.14, 0, -Math.PI / 2, g); }
    // la mesa puesta: dos platos, dos vasos, la panera de mimbre
    for (const s of [-1, 1]) { g.add(mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.014, 24), LOZA, 0, MESA_H + 0.02, s * 0.2)); g.add(mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.09, 12), M.vidrio, s * 0.26, MESA_H + 0.058, s * 0.12)); }
    g.add(mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.05, 14), mat(0xa8824e, 0.85), -0.3, MESA_H + 0.04, 0.0));
  });
}
// el sifón de soda (vidrio verdoso, cabezal de metal con el pico) y la botella de vino sin etiqueta (etiqueta crema lisa)
function crearSifon() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 18), VIDRIO_V, 0, 0.11, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.05, 16), M.metal, 0, 0.245, 0));
  const pico = mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.09, 8), M.metal, 0.045, 0.265, 0); pico.rotation.z = -1.1; g.add(pico);
  g.add(caja(0.012, 0.07, 0.03, M.metal, -0.03, 0.29, 0, 0.004));
  return g;
}
function crearBotella() {
  const g = new THREE.Group(), v = mat(0x23362a, 0.2);
  g.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.2, 16), v, 0, 0.1, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.013, 0.033, 0.08, 14), v, 0, 0.24, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.0375, 0.0375, 0.08, 16, 1, true), mat(C.cr, 0.8), 0, 0.1, 0));
  return g;
}
// un plato con comida: un pedazo de tira y un chorizo, o morcilla
function crearPlatoComida(k = 0) {
  const g = new THREE.Group();
  if (k % 2 === 0) { const t = crearTira(0.17, 0.07); t.position.set(-0.02, 0.012, -0.02); g.add(t); }
  else { const m = crearEmbutido(0.12, 0.026, MORCILLA, 0.02, "abierta"); m.position.set(0.0, 0.012, 0.03); g.add(m); }
  const c = crearEmbutido(0.11, 0.02, CHORIZO, 0.02, "chorizo"); c.position.set(0.02, 0.012, 0.05); c.rotation.y = 0.4; g.add(c);
  return g;
}
// el comensal de fondo: torso de torno, cabeza grande, pelo, ojos y brazos apoyados (sentado, mirando a la mesa)
const PELOS = [0x2a2220, 0x5a3b28, 0xb9b6b0, 0x7a4a2e, 0x3a2f2a, 0xd8b56f];
const ROPAS = [C.navy3, 0x6b7a8f, C.cr2, 0x4a5a40, 0x9a8f80, C.gd, 0x8a5a4a, C.navy2];
const PIELES = [0xf2c9a8, 0xdba57f, 0xc28a62, 0x96613f];
function crearComensal(seed) {
  semilla = 100 + seed * 13;
  const g = new THREE.Group();
  const piel = mat(PIELES[Math.floor(az() * 4)], 0.55), ropa = mat(ROPAS[Math.floor(az() * ROPAS.length)], 0.7), pelo = mat(PELOS[Math.floor(az() * PELOS.length)], 0.75);
  const perfil = [[0, 0], [0.22, 0.02], [0.23, 0.2], [0.21, 0.36], [0.17, 0.44], [0.1, 0.5], [0, 0.51]].map(([r, y]) => new THREE.Vector2(r, y));
  const torso = mesh(new THREE.LatheGeometry(perfil, 20), ropa, 0, 0.46, 0); torso.scale.z = 0.86; g.add(torso);
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.1, 10), piel, 0, 1.0, 0));
  const R = 0.27, cab = new THREE.Group(); cab.position.set(0, 1.27, 0.01); g.add(cab);
  cab.add(mesh(new THREE.SphereGeometry(R, 20, 14), piel));
  const largo = az() > 0.55, tipo = Math.floor(az() * 3);
  const cap = mesh(new THREE.SphereGeometry(R * 1.04, 20, 10, 0, Math.PI * 2, 0, Math.PI * (largo ? 0.55 : 0.42)), pelo, 0, 0.01, -0.01); cap.rotation.x = -0.25; cab.add(cap);
  if (largo) { const atras = mesh(new THREE.SphereGeometry(1, 16, 10), pelo, 0, -0.08, -0.12); atras.scale.set(R * 0.95, R * 1.0, R * 0.7); cab.add(atras); }
  if (tipo === 2 && largo) cab.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), pelo, 0, 0.25, -0.15));
  for (const s of [-1, 1]) { cab.add(mesh(new THREE.SphereGeometry(0.035, 10, 8), mat(0x111722, 0.2), s * 0.09, 0.02, R * 0.93)); cab.add(mesh(new THREE.SphereGeometry(0.045, 8, 6), piel, s * R, -0.02, 0.0)); }
  cab.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), mat(new THREE.Color(PIELES[0]).multiplyScalar(0.86).getHex(), 0.6), 0, -0.04, R * 0.98));
  // brazos: del hombro a la mesa
  for (const s of [-1, 1]) {
    const a = V3(s * 0.2, 0.9, 0), b = V3(s * 0.16, 0.78, 0.33), d = b.clone().sub(a);
    const br = mesh(new THREE.CylinderGeometry(0.055, 0.05, d.length(), 10), ropa, (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); br.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); g.add(br);
    g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), piel, b.x, b.y, b.z + 0.03));
  }
  return g;
}
// los estados del salón: grupos estáticos fusionados (SwiftShader: pocas llamadas de dibujo)
const SAL = { sab: new THREE.Group(), febVacio: new THREE.Group(), febLleno: new THREE.Group() };
for (const k in SAL) scene.add(SAL[k]);
function poblar(grupo, mesas, { comida = true, saltar = [], semillaBase = 0 } = {}) {
  mesas.forEach((i) => {
    const [x, z] = MESAS[i];
    let n = 0;
    for (const s of [-1, 1]) {
      if (saltar.includes(`${i}${s}`) || (i >= 7 && s < 0)) continue;
      const c = crearComensal(semillaBase + i * 2 + (s > 0 ? 1 : 0)); c.position.set(x, -0.02, z + s * (MESA_D / 2 + 0.14)); c.rotation.y = s > 0 ? Math.PI : 0; grupo.add(c); n++;
      if (comida) { const p = crearPlatoComida(i + (s > 0 ? 1 : 0)); p.position.set(x, MESA_H + 0.027, z + s * 0.2); grupo.add(p); }
    }
    if (comida) { const sf = crearSifon(); sf.position.set(x + 0.3, MESA_H + 0.012, z - 0.05); grupo.add(sf); const bt = crearBotella(); bt.position.set(x + 0.18, MESA_H + 0.012, z + 0.08); grupo.add(bt); }
  });
}
poblar(SAL.sab, [0, 1, 3, 4, 5, 6, 7, 8, 9], { semillaBase: 0, saltar: ["1-1"] });
{ const sf = crearSifon(); sf.position.set(MESAS[W_MESA][0] + 0.3, MESA_H + 0.012, MESAS[W_MESA][1] - 0.05); SAL.sab.add(sf); }
poblar(SAL.febVacio, [5, 3], { semillaBase: 40 }); poblar(SAL.febVacio, [2], { saltar: ["2-1"], semillaBase: 60 });
poblar(SAL.febLleno, [0, 1, 2, 3, 4, 6, 7, 9], { semillaBase: 80, saltar: ["1-1"] });
{ const sf = crearSifon(); sf.position.set(MESAS[G_MESA][0] - 0.32, MESA_H + 0.012, MESAS[G_MESA][1] + 0.1); SAL.febLleno.add(sf); }
for (const k in SAL) { sombras(SAL[k]); fusionar(SAL[k]); }
// la mesa de Walter en la parte 2 (Q1): su plato (tira y morcilla), el atril de acrílico con el QR
const MESA_W_G = new THREE.Group(); MESA_W_G.position.set(MESAS[W_MESA][0], MESA_H + 0.012, MESAS[W_MESA][1]); scene.add(MESA_W_G);
{ const p = crearPlatoComida(0); p.position.set(0, 0.015, -0.2); MESA_W_G.add(p); const m = crearEmbutido(0.12, 0.026, MORCILLA, 0.02, "abierta"); m.position.set(0.05, 0.027, -0.14); MESA_W_G.add(m); sombras(MESA_W_G); }
const qrT = lienzo(512, 768, (x, w, h) => {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Parrilla Raúl", 800, 64, w - 40); x.fillText("Parrilla Raúl", w / 2, 62);
  // el QR (un patrón fijo de módulos)
  const N = 21, S = 18, X0 = (w - N * S) / 2, Y0 = 160; semilla = 33;
  x.fillStyle = "#0b1220";
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const fin = (a, b) => i >= a && i < a + 7 && j >= b && j < b + 7; if (fin(0, 0) || fin(0, 14) || fin(14, 0)) continue; if (az() > 0.52) x.fillRect(X0 + i * S, Y0 + j * S, S, S); }
  for (const [a, b] of [[0, 0], [0, 14], [14, 0]]) { x.fillRect(X0 + a * S, Y0 + b * S, 7 * S, 7 * S); x.fillStyle = "#efeee5"; x.fillRect(X0 + (a + 1) * S, Y0 + (b + 1) * S, 5 * S, 5 * S); x.fillStyle = "#0b1220"; x.fillRect(X0 + (a + 2) * S, Y0 + (b + 2) * S, 3 * S, 3 * S); }
  x.fillStyle = "#5ce611"; x.fillRect(0, h - 190, w, 190); x.fillStyle = "#0b1220"; ajustar(x, "Sumá tu visita", 900, 76, w - 40); x.fillText("Sumá tu visita", w / 2, h - 95);
});
const ATRIL = new THREE.Group(); MESA_W_G.add(ATRIL);
{
  const piv = new THREE.Group(); piv.rotation.x = -0.18; ATRIL.add(piv);
  const W = 0.15, H = 0.225;
  piv.add(mesh(rbox(W + 0.014, H + 0.014, 0.008, 0.008), new THREE.MeshPhysicalMaterial({ color: 0xe8f2f6, roughness: 0.05, transparent: true, opacity: 0.35 }), 0, H / 2 + 0.01, 0));
  const pq = plano(W, H, qrT, 0, H / 2 + 0.01, 0.006, true); piv.add(pq);
  ATRIL.add(caja(W + 0.03, 0.02, 0.07, new THREE.MeshPhysicalMaterial({ color: 0xe8f2f6, roughness: 0.05, transparent: true, opacity: 0.45 }), 0, 0.01, -0.01, 0.006));
  ATRIL.position.set(-0.24, 0, 0.14); ATRIL.rotation.y = -0.3;
}
// la provoleta de regalo en la mesa de Graciela (Q4)
const PROV_G = crearProvoleta(0.1); PROV_G.position.set(MESAS[G_MESA][0] + 0.05, MESA_H + 0.014, MESAS[G_MESA][1] - 0.02); scene.add(PROV_G); sombras(PROV_G);
fusionar(SET, [PARR, BRASERO, PUERTA_HOJA]);
fusionar(PARR, [CARNE_SAB, CARNE_FEB]);

// el living de Graciela (Q3b), el de estetica-turnos
const LIV = new THREE.Group(); LIV.position.set(30, 0, 0); scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 6), mat(0xb89a74, 0.8)); piso.rotation.x = -Math.PI / 2; LIV.add(piso);
  const pared = mesh(new THREE.BoxGeometry(6, 3, 0.1), mat(0xece9dc, 0.92), 0, 1.5, -1.2); LIV.add(pared);
  for (let i = 0; i < 6; i++) LIV.add(caja(0.2, 2.5, 0.08, i % 2 ? M.navy3 : M.navy2, 0.75 + i * 0.17, 1.3, -1.1, 0.06));
  LIV.add(caja(1.1, 0.04, 0.08, M.navy, 1.18, 2.6, -1.1, 0.01));
  const s = new THREE.Group(); s.position.set(-0.2, 0, -0.65); LIV.add(s);
  s.add(caja(1.7, 0.4, 0.75, M.cr, 0, 0.3, 0, 0.1)); s.add(caja(1.7, 0.55, 0.2, M.cr, 0, 0.72, -0.3, 0.1));
  for (const sx of [-1, 1]) s.add(caja(0.2, 0.3, 0.75, M.cr, sx * 0.85, 0.58, 0, 0.09));
  s.add(caja(0.42, 0.42, 0.12, M.cr2, -0.55, 0.7, -0.15, 0.05)); s.add(caja(0.38, 0.38, 0.12, M.navy3, 0.55, 0.68, -0.15, 0.05));
  const l = new THREE.Group(); l.position.set(-1.25, 0, -0.75); LIV.add(l);
  l.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), M.navy3, 0, 0.015, 0)); l.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.77, 0));
  l.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xf6efd8, emissive: 0xfff2d0, emissiveIntensity: 0.5, side: THREE.DoubleSide }), 0, 1.6, 0));
  const cuadro = new THREE.Group(); cuadro.position.set(-1.3, 2.05, -1.14); LIV.add(cuadro); cuadro.add(caja(0.5, 0.4, 0.03, M.navy3, 0, 0, 0, 0.01)); cuadro.add(caja(0.42, 0.32, 0.02, M.cr2, 0, 0, 0.012, 0.01));
  sombras(LIV);
}
fusionar(LIV);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const raul = crearPersonaje({ ...ELENCO.raul, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.0, r2(T.p3 + 0.9), r2(T.p5 + 0.3), r2(T.q2 - 0.5), r2(T.q4 + 0.4)] });
const fabian = crearPersonaje({ ...ELENCO.fabian, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p5 + 0.2), r2(T.p7 + 0.6), r2(T.q4 + 0.9)] });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q1b + 0.5)] });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 999 });
const EXTRA_CFG = [
  { nombre: "Extra1", piel: PIEL.clara, pelo: 0x3a2f2a, peinado: "texturado", texturaAlto: 0.6, camisa: 0x6b7a8f, mangas: "largas", cuello: 0x6b7a8f, pantalon: C.navy, zapatos: 0x2a2220, panza: 1.06, nariz: 0.06 },
  { nombre: "Extra2", piel: PIEL.media, pelo: 0x2a2220, peinado: "rodete", camisa: C.gd, mangas: "largas", cuello: null, cuelloBotones: false, cuelloAlto: 0.06, cuelloFino: true, pollera: C.navy3, pantalon: null, zapatos: C.navy, labios: 0xa8484f, labiosPegados: true, cejaFina: true, pestanas: 0x1a1414, aros: C.cr, panza: 0.98, nariz: 0.048, alto: 0.96 },
  { nombre: "Extra3", piel: PIEL.trigueña, pelo: 0x1e1a18, peinado: "corto", camisa: C.cr2, mangas: "cortas", cuello: C.cr2, pantalon: 0x3a3f4a, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, alto: 1.02 },
  { nombre: "Extra4", piel: PIEL.clara, pelo: 0xb9b6b0, peinado: "costados", cejasColor: 0xa8a49c, camisa: 0x9a8f80, mangas: "largas", cuello: 0x9a8f80, lentes: C.navy3, lentesFinos: true, pantalon: C.navy2, zapatos: 0x6b3f2e, panza: 1.1, nariz: 0.064 },
  { nombre: "Extra5", piel: PIEL.morena, pelo: 0x5a3b28, peinado: "mediaCola", camisa: 0x8a5a4a, mangas: "largas", cuello: null, cuelloBotones: false, cuelloAlto: 0.06, cuelloFino: true, pantalon: C.navy2, zapatos: C.navy, labios: 0x8e3f3c, labiosPegados: true, cejaFina: true, pestanas: 0x1a1414, panza: 0.97, nariz: 0.05, alto: 0.97 },
  { nombre: "Nene", piel: PIEL.media, pelo: PELO.castaño, peinado: "corto", camisa: C.g, mangas: "cortas", pantalon: C.navy2, zapatos: C.cr, panza: 0.96, nariz: 0.05, alto: 0.62 },
];
const EXTRAS = EXTRA_CFG.map((c) => crearPersonaje({ ...c, parpadeoCada: 3.7 }));
const TODOS = [raul, fabian, walter, graciela, ...EXTRAS];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// la pinza de parrillero de Raúl (dos brazos de acero, mango de madera): sale del puño hacia adelante (-y de la mano)
const PINZA = new THREE.Group();
{
  const acero = mat(0xc4c8cf, 0.25, { metalness: 0.7 });
  PINZA.add(caja(0.032, 0.11, 0.032, mat(0x6b4a2e, 0.6), 0, -0.02, 0, 0.01));
  for (const s of [-1, 1]) { const b = caja(0.016, 0.34, 0.006, acero, s * 0.018, -0.24, 0, 0.003); b.rotation.z = s * 0.06; PINZA.add(b); const p = caja(0.03, 0.035, 0.008, acero, s * 0.03, -0.405, 0, 0.003); PINZA.add(p); }
  sombras(PINZA);
  raul.brazos[1].mano.add(PINZA);
}
// el trapo crema al hombro de Fabián
{
  const tr = mat(C.cr, 0.95);
  const g = new THREE.Group(); g.position.set(0.17, 0.45, 0); fabian.cuerpo.add(g);
  g.add(caja(0.12, 0.022, 0.2, tr, 0, 0.0, 0, 0.008));
  const f = caja(0.11, 0.2, 0.018, tr, 0.012, -0.1, 0.16, 0.006); f.rotation.x = -0.25; g.add(f);
  const b = caja(0.11, 0.24, 0.018, tr, 0.012, -0.12, -0.15, 0.006); b.rotation.x = 0.2; g.add(b);
  for (const k of [-0.05, 0.05]) g.add(caja(0.112, 0.008, 0.02, mat(C.navy3, 0.8), 0.012, -0.08 + k, 0.17, 0.002));
  sombras(g);
}
// el brazo de Fabián en la pizarra (P4, primer plano): manga blanca, mano morena, el trapo y la tiza
const BRAZO_P = new THREE.Group(); scene.add(BRAZO_P);
const TRAPO_P = new THREE.Group(), TIZA_P = new THREE.Group();
{
  const manga = mesh(new THREE.CylinderGeometry(0.045, 0.07, 1.6, 18), mat(0xf7f7f2, 0.7), 0, 0, 0.84); manga.rotation.x = Math.PI / 2; BRAZO_P.add(manga);
  BRAZO_P.add(mesh(new THREE.TorusGeometry(0.046, 0.014, 8, 18), mat(0xe4e2d8, 0.6), 0, 0, 0.05));
  const piel = mat(PIEL.morena, 0.55);
  const mano = mesh(new THREE.SphereGeometry(1, 18, 14), piel, 0, 0, -0.04); mano.scale.set(0.06, 0.05, 0.075); BRAZO_P.add(mano);
  const pulgar = mesh(new THREE.SphereGeometry(1, 12, 10), piel, 0.045, 0.02, -0.05); pulgar.scale.set(0.02, 0.02, 0.045); BRAZO_P.add(pulgar);
  for (let i = 0; i < 4; i++) { const d = mesh(new THREE.SphereGeometry(1, 10, 8), piel, -0.03 + i * 0.02, -0.015, -0.105); d.scale.set(0.012, 0.016, 0.022); BRAZO_P.add(d); }
  TRAPO_P.add(caja(0.17, 0.13, 0.035, mat(C.cr, 0.95), 0, 0, 0, 0.012)); TRAPO_P.add(caja(0.172, 0.012, 0.037, mat(C.navy3, 0.8), 0, 0.03, 0, 0.003)); scene.add(TRAPO_P);
  { const tz = mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.1, 10), mat(0xf6f4ea, 0.9), 0, 0, 0.05); tz.rotation.x = Math.PI / 2; TIZA_P.add(tz); } scene.add(TIZA_P);
  sombras(BRAZO_P);
}

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (para las tarjetas y el panel) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo) => {
    esc.background = new THREE.Color(fondo);
    esc.add(per.raiz);
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
    esc.remove(per.raiz);
    return cv;
  };
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xcfeebc);
  AVATAR.graciela = leer(crearPersonaje({ ...ELENCO.clienta, lentes: null, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.pereira = leer(crearPersonaje({ ...EXTRA_CFG[1], parpadeoCada: 999 }), 0xd9d7c9);
  AVATAR.martin = leer(crearPersonaje({ ...EXTRA_CFG[2], parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.raul = leer(crearPersonaje({ ...ELENCO.raul, parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };

// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: MARCA.cr, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const SOFI = { esc: new THREE.Scene(), rt: new THREE.WebGLRenderTarget(432, 768), cam: new THREE.PerspectiveCamera(28, 432 / 768, 0.05, 20) };
{
  SOFI.rt.texture.colorSpace = THREE.SRGBColorSpace;
  SOFI.esc.background = new THREE.Color(0x16243d);
  SOFI.esc.add(new THREE.HemisphereLight(0xffffff, 0x6a7080, 2.0)); const dl = new THREE.DirectionalLight(0xfff4e8, 1.7); dl.position.set(1.2, 2.2, 3); SOFI.esc.add(dl);
  SOFI.esc.add(sofi.raiz);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); fondo.position.set(0, 1.4, -0.9); SOFI.esc.add(fondo);
  const logoT = await new THREE.TextureLoader().loadAsync("assets/logo-blanco.png"); logoT.colorSpace = THREE.SRGBColorSpace;
  const ar = logoT.image.width / logoT.image.height;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34 / ar), new THREE.MeshBasicMaterial({ map: logoT, transparent: true })); logo.position.set(0.24, 1.86, -0.88); SOFI.esc.add(logo);
}

// =====================================================================================================
// LA TABLET DE RAÚL (en la mesada, parte 2), EL CELULAR PARADO DE LA VIDEOLLAMADA, EL CELULAR DE WALTER (Q1), EL DE
// GRACIELA (Q3b), LA PIZARRA
// =====================================================================================================
const pantT = lienzo(720, 1000, () => {});
const tablet = crearTablet(pantT, 0.3, 0.42, 0.25); tablet.position.set(MESADA.x - 0.25, MESADA.alto, MESADA.z - 0.05); tablet.scale.setScalar(1.35); scene.add(tablet);
const celuS = new THREE.Group(); celuS.position.set(MESADA.x + 0.19, MESADA.alto, MESADA.z + 0.1); celuS.rotation.y = -0.15; scene.add(celuS);
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.17, 0.02, 0.13, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.14, 0.08, 0.02, M.g, 0, 0.05, -0.06, 0.006));
  sombras(celuS);
}
const pantW = lienzo(600, 975, () => {});
const celuW = crearCelular(pantW, C.navy, 0.08, 0.162); celuW.scale.setScalar(1.3); scene.add(celuW);
const pantG = lienzo(600, 975, () => {});
const celuG = crearCelular(pantG, C.g, 0.08, 0.162); celuG.scale.setScalar(1.25); scene.add(celuG);
const pantR = lienzo(600, 975, () => {});
const celuR = crearCelular(pantR, C.navy3, 0.08, 0.162); celuR.scale.setScalar(1.25); scene.add(celuR);
// la pizarra: "SÁBADO" → se borra con el trapo → "MARTES ·" / "FEBRERO" se escribe; el menú fijo abajo
const CHALK = "#ece9dc";
function dibujarPizarra(x, W, H, { borra = 0, escribe = 0, feb = false }) {
  x.fillStyle = "#1c2a24"; x.fillRect(0, 0, W, H);
  // marcas de borrado viejas (planas)
  x.fillStyle = "rgba(236,233,220,0.06)"; for (let i = 0; i < 5; i++) x.fillRect(60 + i * 170, 40 + (i % 2) * 300, 220, 120);
  x.fillStyle = CHALK; x.textAlign = "center"; x.textBaseline = "middle";
  const tit = (txt, y, px, k = 1) => { x.save(); x.font = CAV(px); const w = x.measureText(txt).width; x.beginPath(); x.rect(W / 2 - w / 2 - 10, y - px, (w + 20) * k, px * 2); x.clip(); x.fillText(txt, W / 2, y); x.restore(); };
  if (!feb) {
    tit("SÁBADO", 170, 190);
    if (borra > 0) { x.fillStyle = "#1c2a24"; x.fillRect(0, 40, W * borra, 270); x.fillStyle = "rgba(236,233,220,0.16)"; x.fillRect(0, 40, W * borra, 270); }
  } else {
    x.fillStyle = "rgba(236,233,220,0.16)"; x.fillRect(0, 40, W, 270); x.fillStyle = CHALK;
    const k1 = cl(escribe * 2), k2 = cl(escribe * 2 - 1);
    if (k1 > 0) tit("MARTES ·", 110, 150, k1);
    if (k2 > 0) tit("FEBRERO", 250, 150, k2);
  }
  x.fillStyle = CHALK; x.fillRect(120, 345, W - 240, 8);
  x.font = CAV(96);
  ["TIRA · VACÍO", "CHORIZO · MORCILLA", "PROVOLETA"].forEach((l, i) => { x.save(); const w = x.measureText(l).width; if (w > W - 80) { x.translate(W / 2, 450 + i * 150); x.scale((W - 80) / w, 1); x.fillText(l, 0, 0); } else x.fillText(l, W / 2, 450 + i * 150); x.restore(); });
}
let clavePiz = "";
function ponerPizarra(t) {
  const feb = t >= T.escribe[0] - 0.02 && !(t >= P2 && t < T.q3);
  const borra = Math.round(sg(t, T.borra[0], T.borra[1]) * 16) / 16, escribe = t >= P2 ? 1 : Math.round(sg(t, T.escribe[0], T.escribe[1]) * 20) / 20;
  const k = `${feb}|${borra}|${escribe}`; if (k === clavePiz) return; clavePiz = k;
  dibujarPizarra(pizT.userData.x, 1024, 960, { borra: t >= P2 ? 0 : borra, escribe, feb }); pizT.needsUpdate = true;
}
// =====================================================================================================
// TARJETAS PEGADAS A LA CÁMARA (en píxeles de pantalla): globos de diálogo, audios, chats, rótulos
// =====================================================================================================
const PXK = 1000;
// una tarjeta: cuerpo con borde navy de 8 px y sombra dura; contenido en canvas (W x H px); cola opcional
function crearTarjeta(Wg, H, dibujo, { fondo = "#efeee5", borde = C.navy, sombraC = 0x050a14 } = {}) {
  const tex = lienzo(Wg * 2, H * 2, (x, w, h) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.save(); x.scale(2, 2); dibujo(x, Wg, H); x.restore(); });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: sombraC });
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
  g.userData = { W: Wg, H, cola: colaG, tex, dibujo, fondo };
  return pegarACamara(g, camera, 40);
}
function redibujar(g, dibujo) { const { tex, W, H, fondo } = g.userData; const x = tex.userData.x; x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = fondo; x.fillRect(0, 0, W * 2, H * 2); x.save(); x.scale(2, 2); dibujo(x, W, H); x.restore(); tex.needsUpdate = true; }
// texto con la palabra [clave] en el recuadro verde de selección y el {apodo} subrayado en rojo apagado
const PARTES_RE = /(\[[^\]]+\]|\{[^}]+\})/;
const limpioTx = (s) => s.replace(/[[\]{}]/g, "");
const partesDe = (l) => l.split(PARTES_RE).filter(Boolean).flatMap((p) => (p.startsWith("[") || p.startsWith("{") ? [p] : p.split(/(?<= )/)));
function textoSel(x, l, cx, y, px, tinta = "#0b1220", ver = Infinity) {
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = partesDe(l);
  const anchos = partes.map((p) => x.measureText(limpioTx(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (k >= ver) return;
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpioTx(p), xx + px * 0.25, y + px * 0.04); }
    else if (p.startsWith("{")) { const w = x.measureText(limpioTx(p).replace(/[!?.,]+$/, "")).width; x.fillStyle = "#c7655b"; x.fillRect(xx, y + px * 0.42, w, px * 0.14); x.fillStyle = tinta; x.fillText(limpioTx(p), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande), con cabecera opcional (avatar + nombre)
function crearGlobo(lineas, px = 80, { cab = null } = {}) {
  const g = crearGloboV(lineas, px, { cab });
  g.userData.lineas = lineas; g.userData.px = px; g.userData.cab = cab; g.userData.ver = -1;
  return g;
}
// cuántas palabras se ven en total (las de las líneas de arriba primero); redibuja solo si cambia
function verGlobo(g, n) {
  if (g.userData.ver === n) return; g.userData.ver = n;
  const { lineas, px } = g.userData;
  redibujar(g, (x, w, h) => { let resto = n; lineas.forEach((l, i) => { const c = partesDe(l).length; textoSel(x, l, w / 2, (h - 0) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px, "#0b1220", resto); resto -= c; }); });
}
function crearGloboV(lineas, px = 80, { cab = null } = {}) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = limpioTx;
  const cabH = cab ? Math.round(px * 1.25) : 0, cabF = Math.max(Math.round(px * 0.62), 42);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + px * 1.3 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) { const r = px * 0.48, cy = px * 0.2 + r, cx = px * 0.25 + r; avatar(x, cab.cv, cx, cy, r); x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2); }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// el rótulo con línea guía: caja navy, texto crema (o rojo apagado)
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#0b1220", borde: C.cr });
}
// la línea guía (un plano fino crema con borde navy) y el punto en el objetivo
function crearGuia() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.navy })); b.userData.orden = 0; g.add(b);
  const l = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: C.cr })); l.userData.orden = 1; l.position.z = 0.001; g.add(l);
  const p = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: C.cr })); p.userData.orden = 2; p.position.z = 0.002; g.add(p);
  const pb = new THREE.Mesh(new THREE.CircleGeometry(1, 24), new THREE.MeshBasicMaterial({ color: C.navy })); pb.userData.orden = 1; pb.position.z = 0.0015; g.add(pb);
  g.userData = { b, l, p, pb };
  return pegarACamara(g, camera, 38);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
function ponerGuia(g, x0, y0, x1, y1, u = 1) {
  g.visible = u > 0.02; if (!g.visible) return;
  const k = halfK(), { b, l, p, pb } = g.userData;
  const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u), L = Math.hypot(xe - x0, ye - y0), a = Math.atan2(-(ye - y0), xe - x0);
  g.position.set(0, 0, -1); g.scale.setScalar(k);
  for (const [m, grosor] of [[b, 16], [l, 8]]) { m.position.set((x0 + xe) / 2 - 540, 960 - (y0 + ye) / 2, m.position.z); m.scale.set(L, grosor, 1); m.rotation.z = a; }
  p.position.set(xe - 540, 960 - ye, 0.002); p.scale.setScalar(u > 0.95 ? 12 : 0.001); pb.position.set(xe - 540, 960 - ye, 0.0015); pb.scale.setScalar(u > 0.95 ? 19 : 0.001);
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 38 + (o.userData.orden || 0); });
}
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0) {
  g.visible = s > 0.03;
  const op = cl(s / 0.85); s = Math.max(s, 0.85);
  g.traverse((o) => { if (o.isMesh) [].concat(o.material).forEach((m) => (m.opacity = op)); });
  if (!g.visible) return;
  const k = halfK();
  const { W: Wg, H, cola } = g.userData;
  cx = Wg + 120 > 1080 ? 540 : cl(cx, Wg / 2 + 50, 1030 - Wg / 2);
  cy = cl(cy, H / 2 + 60, 1860 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.set(k * PXK * s, k * PXK * s, k * PXK * s);
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
const objPx = (o, local = V3(0, 0, 0)) => { o.updateMatrixWorld(true); return enPantalla(o.localToWorld(local.clone())); };
// =====================================================================================================
// INSERTOS A PANTALLA COMPLETA (pegados a la cámara): los contactos de Raúl (P6), la tarjeta de puntos de Walter (Q1b),
// la tablet de Raúl con el panel (Q2, Q3)
// =====================================================================================================
function crearFondoInserto(g) {
  // la parrilla desenfocada: la pared navy claro arriba, una lámpara crema, la mesa de madera abajo con el mantel
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: 0x16243d })); bg.position.z = -0.06; g.add(bg);
  const lam = new THREE.Mesh(new THREE.CircleGeometry(150 / PXK, 30), new THREE.MeshBasicMaterial({ color: 0x3a4660 })); lam.position.set(-330 / PXK, 760 / PXK, -0.058); g.add(lam);
  const mesa = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 700 / PXK), new THREE.MeshBasicMaterial({ color: 0x3b2a20 })); mesa.position.set(0, -900 / PXK, -0.058); g.add(mesa);
  const mantel = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 40 / PXK), new THREE.MeshBasicMaterial({ color: 0xd9d7c9 })); mantel.position.set(0, -560 / PXK, -0.057); g.add(mantel);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  // (ronda 1) que parezca un aparato: el reborde con brillo, la cámara arriba y, si va en la mano, la mano que lo sostiene
  const brillo = new THREE.Mesh(rbox((IW + 2 * marcoR - 10) / PXK, (IH + 2 * marcoR - 10) / PXK, 0.005, 76 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x2c4268 })); brillo.position.set((cx - 540 - 3) / PXK, (960 - cy + 3) / PXK, -0.035); g.add(brillo);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  if (opc.mano) {
    const piel = new THREE.MeshBasicMaterial({ color: opc.mano }), sombraP = new THREE.MeshBasicMaterial({ color: new THREE.Color(opc.mano).multiplyScalar(0.82) });
    const palma = new THREE.Mesh(rbox(330 / PXK, 420 / PXK, 0.01, 120 / PXK, 3), piel); palma.position.set((cx - 540 - IW / 2 + 90) / PXK, (960 - cy - IH / 2 - 120) / PXK, -0.045); palma.rotation.z = -0.35; g.add(palma);
    const pulgar = new THREE.Mesh(rbox(86 / PXK, 250 / PXK, 0.01, 43 / PXK, 3), piel); pulgar.position.set((cx - 540 - IW / 2 + 20) / PXK, (960 - cy - IH / 2 + 160) / PXK, -0.015); pulgar.rotation.z = -0.5; g.add(pulgar);
    const una = new THREE.Mesh(rbox(50 / PXK, 60 / PXK, 0.01, 22 / PXK, 3), sombraP); una.position.set((cx - 540 - IW / 2 + 70) / PXK, (960 - cy - IH / 2 + 250) / PXK, -0.014); una.rotation.z = -0.5; g.add(una);
    // (r1 11:11) sin los tres dedos del borde derecho (se leían como rectángulos sueltos): la palma y el pulgar alcanzan
  }
  return { g, tex, IW, IH };
}

const INS_C = { g: new THREE.Group() }; crearFondoInserto(INS_C.g);
const CEL_C = crearCelInserto(740, 1360, 560, 1000, 34, { camara: true, mano: PIEL.trigueña }); INS_C.g.add(CEL_C.g);
const INS_P = { g: new THREE.Group() }; crearFondoInserto(INS_P.g);
const CEL_P = crearCelInserto(740, 1360, 560, 1000, 34, { camara: true, mano: PIEL.clara }); INS_P.g.add(CEL_P.g);
const INS_T = { g: new THREE.Group() }; crearFondoInserto(INS_T.g);
const TAB = crearCelInserto(800, 1112, 540, 1040, 44, { camara: true }); INS_T.g.add(TAB.g);
for (const I of [INS_C, INS_P, INS_T]) { pegarACamara(I.g, camera, 10); I.g.visible = false; }

const RED = "#e98a7f";
// P6 · los contactos de Raúl: ningún cliente. El scroll llega al final y rebota.
const CONTACTOS = [["C", "Carnicería Don Tito"], ["C", "Contador"], ["L", "Leña"], ["M", "Mamá"], ["P", "Plomero"]];
function dibujarContactos(x, W, H, off = 0, celu = false) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  const k = W / 740;
  x.save(); x.beginPath(); x.rect(0, 300 * k, W, H - 300 * k); x.clip(); x.translate(0, -off * k);
  let y = 330 * k, letra = "";
  for (const [l, n] of CONTACTOS) {
    if (l !== letra) { letra = l; x.fillStyle = "#3fa60a"; x.font = F(900, 52 * k); x.fillText(l, 44 * k, y + 10 * k); y += 76 * k; }
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, 132 * k, 30 * k); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(100 * k, y + 66 * k, 44 * k, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(800, 46 * k); x.fillText(n[0], 100 * k, y + 68 * k);
    x.textAlign = "left"; x.fillStyle = "#0b1220"; ajustar(x, n, 800, 56 * k, W - 200 * k); x.fillText(n, 166 * k, y + 68 * k);
    y += 150 * k;
  }
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(700, 44 * k); x.fillText("5 contactos", W / 2, y + 50 * k);
  x.restore();
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 190 * k); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 76 * k); x.fillText("Contactos", 44 * k, 100 * k);
  x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(30 * k, 212 * k, W - 60 * k, 84 * k, 42 * k); x.fill(); x.fillStyle = "#6b7a8f"; x.font = F(700, 42 * k); x.fillText("Buscar", 90 * k, 256 * k);
}
let claveC = "";
function ponerContactos(t) {
  // baja hasta el final (off 230) y rebota a 170
  const u = sg(t, T.scroll[0], T.scroll[1]), r = sg(t, T.rebote, T.rebote + 0.2);
  const off = Math.round(lerp(0, 110, eo(u)) + 40 * Math.sin(Math.PI * Math.min(1, r)) * (r < 1 ? 1 : 0));
  const k = `${off}`; if (k === claveC) return; claveC = k;
  dibujarContactos(CEL_C.tex.userData.x, CEL_C.IW, CEL_C.IH, off); CEL_C.tex.needsUpdate = true;
}
// el celular de Raúl en 3D (P6b): la misma lista, chica
dibujarContactos(pantR.userData.x, 600, 975, 110); pantR.needsUpdate = true;

// Q1b · la tarjeta de puntos de Walter: 5 visitas, el 4º círculo se llena: "+1 visita ✓"; a la 5ª, provoleta de regalo
function dibujarProvo(x, cx, cy, r) {
  x.fillStyle = "#1d1f24"; x.beginPath(); x.arc(cx, cy, r * 1.18, 0, 7); x.fill();
  x.fillStyle = "#e6b84e"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "rgba(170,100,30,0.6)"; for (const [a, b, s] of [[-0.4, -0.3, 0.3], [0.35, 0.1, 0.25], [-0.1, 0.45, 0.22]]) { x.beginPath(); x.ellipse(cx + a * r, cy + b * r, s * r, s * r * 0.7, 0.5, 0, 7); x.fill(); }
  x.fillStyle = "#3f6a1e"; for (let i = 0; i < 9; i++) x.fillRect(cx + Math.cos(i * 2.4) * r * 0.6, cy + Math.sin(i * 2.4) * r * 0.6, r * 0.08, r * 0.06);
}
function dibujarPuntos(x, W, H, { llena = 0, premio = false }) {
  const k = W / 740;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 200 * k); x.fillStyle = "#5ce611"; x.fillRect(0, 200 * k, W, 12 * k);
  x.fillStyle = "#efeee5"; x.font = F(900, 72 * k); x.fillText("Parrilla Raúl", 44 * k, 82 * k); x.font = F(700, 44 * k); x.fillText("Tu tarjeta de puntos", 46 * k, 152 * k);
  x.fillStyle = "#0b1220"; x.font = F(900, 74 * k); x.fillText("Hola, Walter", 44 * k, 300 * k);
  // la tarjeta verde con los cinco círculos
  x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(30 * k, 370 * k, W - 60 * k, 330 * k, 40 * k); x.fill(); x.stroke();
  for (let i = 0; i < 5; i++) {
    const cx = (110 + i * 130) * k, cy = 480 * k, r = 52 * k, lleno = i < 3 || (i === 3 && llena > 0);
    const rr2 = i === 3 && llena > 0 ? r * (0.6 + 0.4 * bk(llena)) : r;
    x.fillStyle = lleno ? "#16243d" : "#efeee5"; x.strokeStyle = "#0b1220"; x.lineWidth = 6 * k;
    if (!lleno && i === 4) x.setLineDash([12 * k, 9 * k]);
    x.beginPath(); x.arc(cx, cy, lleno ? rr2 : r, 0, 7); x.fill(); x.stroke(); x.setLineDash([]);
    if (lleno) tilde(x, cx, cy + 2 * k, 46 * k * (i === 3 ? cl(llena * 1.5) : 1), "#5ce611");
    if (i === 4) dibujarProvo(x, cx, cy, 26 * k);
  }
  x.fillStyle = "#0b1220"; x.font = F(900, 60 * k); x.fillText(llena > 0 ? "Visita 4 de 5" : "Visita 3 de 5", 60 * k, 620 * k);
  if (llena > 0) { const s = 0.7 + 0.3 * bk(cl(llena * 2)); x.save(); x.translate(600 * k, 620 * k); x.scale(s, s); x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(-95 * k, -44 * k, 190 * k, 88 * k, 44 * k); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 46 * k); x.fillText("+1 ✓", 0, 3 * k); x.restore(); x.textAlign = "left"; }
  // el premio
  if (premio) {
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(30 * k, 760 * k, W - 60 * k, 300 * k, 36 * k); x.fill(); x.stroke();
    dibujarProvo(x, 150 * k, 910 * k, 84 * k);
    x.fillStyle = "#0b1220"; x.font = F(800, 50 * k); x.fillText("A la 5ª visita:", 270 * k, 860 * k); x.font = F(900, 58 * k); x.fillText("provoleta", 270 * k, 932 * k); x.fillStyle = "#3fa60a"; x.fillText("de regalo", 270 * k, 1000 * k);
  }
  x.fillStyle = "#16243d"; x.textAlign = "center"; x.font = F(700, 42 * k); x.fillText("Visitás cada 2 semanas", W / 2, 1150 * k);
}
let claveP = "";
function ponerPuntos(t) {
  const llena = Math.round(sg(t, T.visita, T.visita + 0.3) * 10) / 10, premio = t >= T.premio;
  const k = `${llena}|${premio}`; if (k === claveP) return; claveP = k;
  dibujarPuntos(CEL_P.tex.userData.x, CEL_P.IW, CEL_P.IH, { llena, premio }); CEL_P.tex.needsUpdate = true;
}
// el celular de Walter en 3D (Q1): la cámara apuntando al QR
{
  const { x } = pantW.userData, w = 600, h = 975;
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 52); x.fillText("Escaneá el QR", w / 2, 110);
  x.strokeStyle = "#5ce611"; x.lineWidth = 16; const L = 90, a = 130, b = 300, c = 470, d = 640;
  for (const [px, py, sx, sy] of [[a, b, 1, 1], [c, b, -1, 1], [a, d, 1, -1], [c, d, -1, -1]]) { x.beginPath(); x.moveTo(px, py + sy * L); x.lineTo(px, py); x.lineTo(px + sx * L, py); x.stroke(); }
  x.fillStyle = "#efeee5"; x.fillRect(170, 340, 260, 260); x.fillStyle = "#0b1220"; semilla = 3; for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) if (az() > 0.5) x.fillRect(180 + i * 20, 350 + j * 20, 20, 20);
  pantW.needsUpdate = true;
}
// el celular de Graciela en 3D (Q3b): el aviso
{
  const { x } = pantG.userData, w = 600, h = 975;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#efeee5"; x.font = F(800, 54); x.fillText("Parrilla Raúl", 36, 78);
  x.fillStyle = "#0b1220"; x.font = F(800, 50); ["Hola, Graciela.", "Hace un mes que", "no te vemos."].forEach((l, i) => x.fillText(l, 36, 230 + i * 66));
  dibujarProvo(x, w / 2, 560, 110);
  x.fillStyle = "#3fa60a"; x.font = F(900, 54); x.textAlign = "center"; x.fillText("Provoleta de regalo", w / 2, 760);
  pantG.needsUpdate = true;
}

// la tablet: el panel "Quién vuelve y cada cuánto" (Q2), febrero con el aviso (Q3), Walter volvió (Q5)
const FILAS = [[() => AVATAR.graciela, "Graciela", "cada sábado", "hace 4 semanas"], [() => AVATAR.walter, "Walter", "cada 2 semanas", "hace 5 semanas"], [() => AVATAR.pereira, "Familia Pereira", "1 vez al mes", "hace 6 semanas"], [() => AVATAR.martin, "Martín", "cada 3 semanas", "hace 5 semanas"]];
function dibujarPanel(x, W, H, e) {
  const k = W / 800;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 236 * k); x.fillStyle = "#5ce611"; x.fillRect(0, 236 * k, W, 12 * k);
  x.fillStyle = "#efeee5"; x.font = F(700, 40 * k); x.fillText("Parrilla Raúl", 40 * k, 50 * k);
  if (e.feb) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(W - 280 * k, 18 * k, 250 * k, 66 * k, 33 * k); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 44 * k); x.fillText("Febrero", W - 155 * k, 53 * k); x.textAlign = "left"; }
  x.fillStyle = "#efeee5"; x.font = F(900, 66 * k); x.fillText("Quién vuelve", 40 * k, 120 * k); x.fillText("y cada cuánto", 40 * k, 192 * k);
  let y = 270 * k;
  if (!e.feb) {
    // el contador: "Nombres que sabe Raúl" con el número que gira de 0 (rojo) a 112 (verde)
    x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(24 * k, y, W - 48 * k, 150 * k, 30 * k); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 46 * k); x.fillText("Nombres que", 50 * k, y + 50 * k); x.fillText("sabe Raúl:", 50 * k, y + 104 * k);
    const n = e.cuenta ?? 0, num = Math.round(112 * n);
    x.save(); x.beginPath(); x.rect(W - 330 * k, y + 8 * k, 300 * k, 134 * k); x.clip();
    x.textAlign = "right"; x.font = F(900, 118 * k); x.fillStyle = num > 0 ? "#5ce611" : RED; x.fillText(String(num), W - 50 * k, y + 80 * k);
    x.restore(); x.textAlign = "left";
    y += 172 * k;
  } else {
    x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(24 * k, y, W - 48 * k, 150 * k, 30 * k); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 44 * k); x.fillText("Hace más de 4 semanas", 50 * k, y + 50 * k); x.fillText("que no vienen:", 50 * k, y + 104 * k);
    x.textAlign = "right"; x.font = F(900, 110 * k); x.fillStyle = RED; x.fillText(e.filtro ? "38" : "", W - 50 * k, y + 80 * k); x.textAlign = "left";
    y += 172 * k;
  }
  FILAS.forEach(([av, n, cada, hace], i) => {
    if (e.filas != null && i >= e.filas) return;
    const yy = y + i * 140 * k, roja = e.feb && e.filtro, vino = !e.feb && i < 2, volvio = e.volvio && n === "Walter";
    x.fillStyle = volvio ? "#5ce611" : roja ? "#f6e3df" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(24 * k, yy, W - 48 * k, 126 * k, 26 * k); x.fill(); x.stroke();
    avatar(x, av(), 92 * k, yy + 63 * k, 46 * k);
    x.fillStyle = "#0b1220"; ajustar(x, n, 800, 50 * k, 420 * k); x.fillText(n, 160 * k, yy + 42 * k);
    const sub = volvio ? "volvió hoy ✓" : roja ? `última visita: ${hace}` : cada;
    x.fillStyle = roja && !volvio ? "#b5483e" : "#16243d"; ajustar(x, sub, 700, 40 * k, (vino ? 430 : 600) * k); x.fillText(sub, 160 * k, yy + 94 * k);
    if (vino) { x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(W - 210 * k, yy + 32 * k, 170 * k, 62 * k, 31 * k); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 38 * k); x.fillText("✓ vino", W - 125 * k, yy + 64 * k); x.textAlign = "left"; }
  });
  if (e.feb) {
    const yb = y + 4 * 140 * k + 4 * k, env = e.enviado;
    x.fillStyle = env ? "#5ce611" : "#16243d"; x.strokeStyle = "#0b1220"; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(24 * k, yb, W - 48 * k, 120 * k, 60 * k); x.fill(); if (env) x.stroke();
    x.fillStyle = env ? "#0b1220" : "#efeee5"; x.textAlign = "center"; x.font = F(900, 56 * k); x.fillText(env ? "Aviso enviado ✓ · 38" : "Aviso automático", W / 2, yb + 62 * k); x.textAlign = "left";
  }
}
let claveTab = "", claveTab3 = "";
function ponerPanelInserto(t) {
  const feb = t >= T.q3;
  const e = feb ? { feb, filtro: t >= T.filtro, enviado: t >= T.enviado } : { feb, filas: T.filas.filter((a) => t >= a).length, cuenta: Math.round(eio(sg(t, T.cuenta[0], T.cuenta[1])) * 28) / 28 };
  const k = JSON.stringify(e); if (k === claveTab) return; claveTab = k;
  dibujarPanel(TAB.tex.userData.x, TAB.IW, TAB.IH, e); TAB.tex.needsUpdate = true;
}
function ponerTablet3D(t) {
  const e = t >= T.q5 ? { feb: false, cuenta: 1, volvio: t >= T.volvio } : { feb: false, cuenta: 1 };
  const k = JSON.stringify(e); if (k === claveTab3) return; claveTab3 = k;
  dibujarPanel(pantT.userData.x, 720, 1000, e); pantT.needsUpdate = true;
}

// =====================================================================================================
// TARJETAS: globos, rótulos, chips
// =====================================================================================================
const chip = (txt, W, px = 60, fondo = "#5ce611", tinta = "#0b1220") => crearTarjeta(W, Math.round(px * 1.75), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo });
const GL = {
  w1: crearGlobo(["¡Impecable, [Raúl!]", "¡Volvemos!"], 80),
  r1: crearGlobo(["¡Cuando quieras,", "{maestro}!"], 82),
  r2: crearGlobo(["¿Quién [era?]"], 96),
  niIdea: crearGlobo(["Ni idea."], 72),
  c0: crearGlobo(["¡Abrazo, [Raúl!]"], 66), a0: crearGlobo(["¡Grande, {campeón}!"], 66),
  c1: crearGlobo(["¡Hasta el sábado, [Raúl!]"], 60), a1: crearGlobo(["¡Te espero, {genio}!"], 66),
  c2: crearGlobo(["¡Gracias, [Raúl!]"], 66), a2: crearGlobo(["¡Un lujo, {jefe}!"], 66),
  rotA: crearRotulo([["Sábado: 112 cubiertos"]], 56),
  rotB: crearRotulo([["Nombres que sabe Raúl: 0", RED]], 56),
  f1: crearGlobo(["¿Y si les avisás a", "los del [sábado?]"], 74),
  rot3: crearRotulo([["Martes de febrero:"], ["3 mesas de 25", RED]], 58),
  rotL: crearRotulo([["La leña, la tira y el mozo"], ["se pagan igual", RED]], 50),
  r3a: crearGlobo(["¿A quién?"], 88), r3: crearGlobo(["¿A quién?", "¿A “[maestro]”?"], 88),
  w2: crearGlobo(["¡[Raúl!] ¿Te acordás", "de mí?"], 76),
  r4: crearGlobo(["¡Obvio, {maestro}!"], 84),
  chipSab: chip("Sábado, 21:30.", 600, 62),
  rSuma: crearRotulo([["Suma con cada visita"]], 54),
  ficha: crearTarjeta(820, 300, (x, W) => {
    avatar(x, AVATAR.walter, 100, 104, 72);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 66); x.fillText("Walter", 200, 70);
    x.fillStyle = "#3fa60a"; ajustar(x, "4ª visita · cada 2 semanas", 800, 46, W - 230); x.fillText("4ª visita · cada 2 semanas", 202, 136);
    x.fillStyle = "#16243d"; ajustar(x, "Pide: tira + morcilla dulce", 800, 50, W - 60); x.fillText("Pide: tira + morcilla dulce", 34, 238);
  }, { fondo: "#ffffff" }),
  r5: crearGlobo(["¡Te espero, [Walter!]"], 80),
  chipFeb: chip("Febrero", 400, 68),
  rAviso: crearRotulo([["Aviso al que dejó de venir"]], 52),
  aviso: crearTarjeta(940, 400, (x, W) => {
    x.fillStyle = "#16243d"; rr(x, 24, 24, 110, 110, 26); dibujarProvo(x, 79, 79, 34);
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 56); x.fillText("Parrilla Raúl", 160, 60); x.fillStyle = "#16243d"; x.font = F(700, 40); x.fillText("aviso automático", 162, 112);
    x.fillStyle = "#0b1220"; ajustar(x, "Hola, Graciela. Hace un mes", 800, 50, W - 60); x.fillText("Hola, Graciela. Hace un mes", 34, 200);
    ajustar(x, "que no te vemos. Tenés una", 800, 50, W - 60); x.fillText("que no te vemos. Tenés una", 34, 262);
    x.fillStyle = "#3fa60a"; x.font = F(900, 54); x.fillText("provoleta de regalo.", 34, 330);
  }, { fondo: "#ffffff" }),
  g1: crearGlobo(["¡Vamos el [martes!]"], 92),
  chip17: crearTarjeta(940, 200, (x, W, H) => {
    x.textBaseline = "middle"; x.textAlign = "center"; x.fillStyle = "#efeee5"; x.font = F(800, 52); x.fillText("Martes de febrero:", W / 2, 54);
    x.font = F(900, 92); const a = "3", fl = "  →  ", b = "17 mesas"; const wa = x.measureText(a).width, wf = x.measureText(fl).width, wb = x.measureText(b).width; let xx = W / 2 - (wa + wf + wb) / 2; x.textAlign = "left";
    x.fillStyle = RED; x.fillText(a, xx, 140); x.fillRect(xx - 10, 134, wa + 20, 11); xx += wa;
    x.fillStyle = "#efeee5"; x.fillText(fl, xx, 140); xx += wf; x.fillStyle = "#5ce611"; x.fillText(b, xx, 140);
  }, { fondo: "#0b1220", borde: C.cr }),
  r6a: crearGlobo(["[Walter.]"], 76), r6b: crearGlobo(["[Walter.] Tira y", "morcilla dulce."], 72), r6: crearGlobo(["[Walter.] Tira y", "morcilla dulce.", "Faltaste dos sábados."], 70),
};
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro
// de un plano, Catmull-Rom continua. null = inserto pegado a la cámara. Q1c repite el cuadro 0 y Q4 el plano de la
// ráfaga / del salón vacío (callbacks).
// =====================================================================================================
const CAM0 = (k) => [lerp(-1.4, -1.38, k), lerp(2.25, 2.2, k), lerp(0.9, 0.68, k), -0.62, lerp(1.04, 1.07, k), -2.25, 57];
const ANCHO = (k, f = 0) => [lerp(0.55, 0.5, k), 2.65, lerp(5.4, 5.15, k), lerp(-0.25, -0.2, k), 0.85, -1.8, 52 - f];
const PIZ_CAM = [PIZ.x - 0.05, PIZ.y - 0.02, PIZ.z + 3.0, PIZ.x, PIZ.y - 0.02, PIZ.z, 40];
const PLANOS = [
  ["P1", 0, [[0, ...CAM0(0)], [T.p2, ...CAM0(1)]]],
  ["P2", T.p2, [[T.p2, -0.5, 1.75, 0.2, -0.48, 1.35, -2.5, 50], [T.p3, -0.5, 1.73, 0.05, -0.48, 1.37, -2.5, 47]]],
  ["P3", T.p3, [[T.p3, ...ANCHO(0)], [T.p4, ...ANCHO(1)]]],
  // el travelling a la pizarra (rápido) y el primer plano de la pizarra mientras Fabián borra y escribe
  ["P4", T.p4, [[T.p4, ...ANCHO(1)], [r2(T.p4 + 0.3), ...PIZ_CAM], [r2(T.p4 + 0.32), ...PIZ_CAM], [T.p5, PIZ_CAM[0], PIZ_CAM[1], PIZ_CAM[2] - 0.12, ...PIZ_CAM.slice(3, 6), 40]]],
  ["P5", T.p5, [[T.p5, ...ANCHO(0, 2)], [T.p6, ...ANCHO(1, 4)]]],
  ["P6", T.p6, null],
  ["P6b", T.p6b, [[T.p6b, -0.95, 1.62, -0.5, -0.95, 1.4, -2.6, 48], [T.p7, -0.95, 1.62, -0.62, -0.95, 1.42, -2.6, 43]]],
  ["P7", T.p7, [[T.p7, 0.7, 1.78, 1.45, 0.82, 1.15, -2.2, 54], [T.r4, 0.72, 1.76, 1.25, 0.82, 1.2, -2.15, 50], [P1, 0.74, 1.74, 1.1, 0.82, 1.25, -2.1, 47]]],
  ["P7b", r2(T.mira + 0.1), [[r2(T.mira + 0.1), 0.2, 1.65, -2.3, 2.15, 1.2, -0.5, 48], [P1, 0.25, 1.65, -2.22, 2.15, 1.22, -0.5, 45]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, 1.75, 1.7, 2.3, 2.42, 0.95, 0.1, 46], [T.q1b, 1.8, 1.66, 2.1, 2.42, 0.95, 0.1, 42]]],
  ["Q1b", T.q1b, null],
  ["Q1c", T.q1c, [[T.q1c, -0.55, 2.15, 0.9, -0.4, 1.06, -2.2, 58], [T.q2, -0.55, 2.12, 0.7, -0.4, 1.08, -2.2, 58]]],
  ["Q2", T.q2, null],
  ["Q3", T.q3, null],
  ["Q3b", T.q3b, [[T.q3b, 30.0, 1.42, 2.6, 29.8, 1.47, -0.55, 40], [T.q4, 29.98, 1.42, 2.4, 29.8, 1.47, -0.55, 38]]],
  ["Q4", T.q4, [[T.q4, ...ANCHO(0)], [T.q4b, ...ANCHO(1, 3)]]],
  ["Q4b", T.q4b, [[T.q4b, -0.15, 1.75, 0.35, -0.95, 1.42, -2.6, 46], [T.q5, -0.2, 1.73, 0.15, -0.95, 1.44, -2.6, 41]]],
  ["Q5", T.q5, [[T.q5, 0.45, 1.36, -0.95, 0.46, 1.12, -2.08, 40], [T.viaje[0], 0.45, 1.36, -1.0, 0.46, 1.12, -2.08, 40], [T.viaje[1], 0.82, 1.26, -1.4, 0.8, 1.18, -1.96, 40], [DUR, 0.82, 1.26, -1.45, 0.8, 1.18, -1.96, 39]]],
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

const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.8);   // hablando, nunca con los ojos cerrados
};

// =====================================================================================================
// POSES
// =====================================================================================================
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.1, feliz: 0 }, cejas: { alto: 0.05, ang: 0.15, asim: 0.4 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } };
const CONGELADA = { ojos: { abiertos: 0.95, tension: 0.2, feliz: 0.1 }, cejas: { alto: 0.25, ang: 0.3, asim: 0 }, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.2 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.92, feliz: 0.25 }, cejas: { alto: 0.15, ang: 0, asim: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.0 } };
const ENCOGE = { inclina: -0.02, ladea: 0.06, manoI: [0.42, 0.18, 0.2], manoD: [-0.42, 0.18, 0.2], codoI: [1, -0.5, -0.4], codoD: [-1, -0.5, -0.4], dedoI: 0, dedoD: 0, cejas: { alto: 0.85, ang: 0.6, asim: 0 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.8 }, ojos: { abiertos: 1, tension: 0, feliz: 0 } };
const PARRILLA = { manoD: [-0.2, 0.36, 0.44], codoD: [-0.9, -0.5, 0], manoI: [0.27, 0.12, 0.22], codoI: [0.9, -0.6, -0.2], dedoD: 0, dedoI: 0 };
const PINZA_ARRIBA = { manoD: [-0.42, 0.66, 0.26], codoD: [-0.6, -1, 0] };
const giroA = (ax, az2, bx, bz) => Math.atan2(bx - ax, bz - az2);
// dos pasadas: pone la pose, lleva una mano a un punto del mundo (en el espacio del cuerpo) y la vuelve a poner
function manoA(per, p, lado, w, k = 1) {
  per.poner(p); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(w.clone()); const key = lado === "I" ? "manoI" : "manoD";
  p[key] = [lerp(p[key][0], l.x, k), lerp(p[key][1], l.y, k), lerp(p[key][2], l.z, k)];
}
// recorrido por puntos (x, z) con tiempos: [[t, x, z], ...] → { x, z, giro, anda }
function recorrido(t, K) {
  if (t <= K[0][0]) return { x: K[0][1], z: K[0][2], giro: null, anda: false };
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) { const u = sg(t, K[i - 1][0], K[i][0]); return { x: lerp(K[i - 1][1], K[i][1], u), z: lerp(K[i - 1][2], K[i][2], u), giro: giroA(K[i - 1][1], K[i - 1][2], K[i][1], K[i][2]), anda: true }; }
  const L = K[K.length - 1]; return { x: L[1], z: L[2], giro: null, anda: false };
}
const W_P1 = { x: -0.02, z: -2.12 }, F_PASO = { x: 0.0, z: -2.3 }, F_IZQ = { x: -1.85, z: -2.68 };
const RAUL_P7 = [[T.p7, RAUL0.x, RAUL0.z], [r2(T.p7 + 0.5), -0.1, -2.42], [r2(T.p7 + 1.1), -0.05, -1.55], [r2(T.r4 - 0.1), 0.32, -1.66]];
const WALTER_P7 = [[T.entra[0], PUERTA.x, GZ + 0.1], [T.entra[1], 1.3, -1.86]];
const WALTER_Q4 = [[T.entra2[0], PUERTA.x, GZ + 0.1], [T.entra2[1], 1.25, -1.6]];
const F_P5 = { x: 1.05, z: -0.3 }, F_P7 = { x: 2.15, z: -0.5 };
const GF7 = giroA(2.15, -0.5, 0.32, -1.66);

function poseRaul(t) {
  const p2 = t >= P2;
  let p;
  if (!p2) {
    const gW = giroA(RAUL0.x, RAUL0.z, W_P1.x, W_P1.z);
    p = poseEn(t, [
      [0, { x: RAUL0.x, z: RAUL0.z, giro: 0.25, inclina: 0.06, ...aC(0.45, 0.05), ...BUENA, ...PARRILLA }],
      [T.r1, { ...PINZA_ARRIBA, ...aC(0.5, -0.05) }, 0.2],
      [T.p2, { ...PARRILLA, ...aC(0.2, 0.05) }, 0.2],
      [T.r2, { ...aC(0.75, 0.05), ...CONGELADA }, 0.12],                 // a Fabián, con la sonrisa congelada
      [T.p3, { giro: 0.3, ...aC(0.55, 0.0), ...BUENA, ...PARRILLA }, 0.01],
      [T.raf[0][1], { ...PINZA_ARRIBA }, 0.12], [T.raf[1][0], { ...PARRILLA }, 0.15],
      [T.raf[1][1], { ...PINZA_ARRIBA }, 0.1], [T.raf[2][0], { ...PARRILLA }, 0.12],
      [T.raf[2][1], { ...PINZA_ARRIBA, ...CONGELADA }, 0.1], [T.rot112, { ...PARRILLA }, 0.2],
      [T.p5, { giro: 0.35, ...aC(0.55, 0.0), ...SECO, ...PARRILLA }, 0.01],
      [T.p6b, { giro: 0, ...aC(0, 0.32), ...SECO, manoI: [0.1, 0.36, 0.34], codoI: [0.8, -0.6, -0.2], manoD: [-0.25, 0.1, 0.25] }, 0.01],
      [T.r3 + 0.05, { ...aC(0.05, 0.08) }, 0.25],
      [T.p7, { ...BUENA, ...BRAZOS.costado, manoD: [-0.3, 0.36, 0.3], codoD: [-0.6, -1, 0], ...aC(0, 0) }, 0.2],
      [T.r4 - 0.15, { manoI: [0.5, 0.62, 0.2], manoD: [-0.5, 0.62, 0.2], codoI: [1, -0.5, 0], codoD: [-1, -0.5, 0], inclina: -0.05, ...CARA.feliz }, 0.25],
      [T.mira, { ...aC(-0.55, 0.05), ...CONGELADA }, 0.2],
    ]);
    if (t >= T.p7) {
      const r = recorrido(t, RAUL_P7); p.x = r.x; p.z = r.z; p.paso = r.anda ? 1 : 0;
      p.giro = r.giro ?? (t >= RAUL_P7.at(-1)[0] ? Math.PI / 2 - 0.45 : 0);
      
    }
    bocaVoz(p, t, T.r1, ENV.r1, 0.7); bocaVoz(p, t, T.r2, ENV.r2, 0.45); bocaVoz(p, t, T.r3, ENV.r3, 0.6); bocaVoz(p, t, T.r4, ENV.r4, 0.75);
  } else {
    p = poseEn(t, [
      [0, { x: RAUL0.x, z: RAUL0.z, giro: 0.25, inclina: 0.06, ...aC(0.45, 0.05), ...BUENA, ...PARRILLA }],
      [T.r5 - 0.35, { ...aC(1.0, 0.18) }, 0.2],                      // mira la tablet de reojo
      [T.r5, { ...aC(0.5, 0.0), ...BUENA, ...PINZA_ARRIBA }, 0.2],
      [T.q4, { giro: 0.3, ...aC(0.4, 0.05), ...MEDIA, ...PARRILLA }, 0.01],
      [T.q4b, { giro: 0.45, ...aC(0.1, 0.0), ...MEDIA, manoD: [-0.2, 0.64, 0.5], codoD: [-0.3, -0.4, -1] }, 0.25],
      [T.r6 + 2.2, { ...aC(0.12, 0.04), ...BUENA, boca: { sonrisa: 0.55 } }, 0.3],
      [T.q5, { giro: 0.25, ...aC(0.45, 0.05), ...BUENA, ...PARRILLA }, 0.01],
    ]);
    bocaVoz(p, t, T.r5, ENV.r5, 0.75); bocaVoz(p, t, T.r6, ENV.r6, 0.6);
  }
  p.t = t; return p;
}
function poseFabian(t) {
  const p2 = t >= P2;
  let p;
  if (!p2) {
    const gR = giroA(F_PASO.x, F_PASO.z, RAUL0.x, RAUL0.z);
    p = poseEn(t, [
      [0, { x: F_PASO.x, z: F_PASO.z, giro: gR + 0.55, ...aC(-0.35, 0.05), ...CARA.neutra, ...BRAZOS.costado }],
      [T.encoge1, { ...ENCOGE, ...aC(-0.1, -0.05) }, 0.15],
      [T.p3 - 0.05, { ...BRAZOS.costado, ...CARA.neutra }, 0.2],
      // P5: apoyado en la silla, el trapo al hombro, mirando a Raúl
      [T.p5, { x: F_P5.x, z: F_P5.z, giro: giroA(F_P5.x, F_P5.z, RAUL0.x, RAUL0.z), inclina: 0.06, ...aC(0, 0.05), ...CARA.neutra, manoI: [0.3, 0.12, 0.3], manoD: [-0.3, -0.05, 0.1] }, 0.01],
      [T.f1 - 0.1, { ...MEDIA, cejas: { alto: 0.35, ang: 0.3 } }, 0.2],
      [T.p7, { x: F_P7.x, z: F_P7.z, giro: GF7, inclina: 0, ...aC(0.2, 0.05), ...CARA.neutra, ...BRAZOS.costado }, 0.01],
      [T.encoge2, { ...ENCOGE, ...aC(0.0, -0.05) }, 0.15],
    ]);
    bocaVoz(p, t, T.f1, ENV.f1, 0.65);
  } else {
    p = poseEn(t, [
      [0, { x: F_IZQ.x, z: F_IZQ.z, giro: 0.35, ...aC(0.4, 0.05), ...CARA.neutra, ...BRAZOS.costado }],
      [T.r5 + 0.1, { ...aC(0.45, 0.0), cejas: { alto: 0.9, ang: 0.5 }, boca: { sonrisa: 0.4 } }, 0.2],   // levanta las cejas
      [T.q4, { x: F_IZQ.x, z: F_IZQ.z, giro: 0.6, ...aC(0.2, 0.05), ...CARA.neutra, ...BRAZOS.costado }, 0.01],
      [T.r6 + 2.3, { ...CARA.feliz, ...aC(0.5, 0.15), manoD: [-0.1, 0.62, 0.32], codoD: [-0.8, -0.6, 0] }, 0.25],   // se ríe por lo bajo
    ]);
  }
  p.t = t; return p;
}
function poseWalter(t) {
  const p2 = t >= P2;
  let p;
  const gR = giroA(W_P1.x, W_P1.z, RAUL0.x, RAUL0.z);
  if (!p2 && t < T.p2) {
    p = poseEn(t, [[0, { x: W_P1.x, z: W_P1.z, giro: gR, ...aC(0, -0.02), ...CARA.feliz, ...BRAZOS.costado }], [T.palmada - 0.25, { manoD: [-0.1, 0.45, 0.5] }, 0.25], [T.palmada + 0.2, { ...BRAZOS.costado }, 0.3]]);
    const k = Math.sin(Math.PI * sg(t, T.palmada - 0.2, T.palmada + 0.2)); if (k > 0) manoA(walter, p, "D", raul.cuerpo.localToWorld(V3(0.21, 0.44, 0.02)), k);
    bocaVoz(p, t, T.w1, ENV.w1, 0.8);
  } else if (!p2 && t < T.p3) {
    // se va hacia la puerta (al fondo, chico)
    const r = recorrido(t, [[T.p2, 1.3, -1.8], [T.p3, PUERTA.x, GZ + 0.15]]);
    p = poseEn(t, [[0, { x: r.x, z: r.z, giro: r.giro ?? 2.6, paso: 1, ...aC(0, 0), ...CARA.sonrisa, ...BRAZOS.costado }]]);
  } else if (!p2) {
    const r = recorrido(t, WALTER_P7);
    p = poseEn(t, [[0, { x: r.x, z: r.z, giro: r.giro ?? -Math.PI / 2 + 0.3, ...aC(-0.1, 0), ...CARA.feliz, manoI: [0.4, 0.55, 0.2], manoD: [-0.4, 0.55, 0.2], codoI: [1, -0.4, 0], codoD: [-1, -0.4, 0] }], [T.w2 + LEN.w2, { ...BUENA, ...aC(0, 0.0) }, 0.3]]);
    p.paso = r.anda ? 1 : 0; if (r.giro !== null) p.giro = r.giro;
    
    bocaVoz(p, t, T.w2, ENV.w2, 0.8);
  } else if (t < T.q1c) {
    // Q1: sentado en su mesa, apunta el celular al QR
    p = poseEn(t, [[0, { x: MESAS[W_MESA][0], y: -0.08, z: MESAS[W_MESA][1] - MESA_D / 2 - 0.12, giro: 0, sentado: 1, inclina: 0.06, ...aC(-0.2, 0.12), ...CARA.sonrisa, cejas: { alto: 0.35, ang: 0.35 }, ...BRAZOS.celular }], [T.escanea - 0.2, { manoI: [0.06, 0.4, 0.42], manoD: [-0.06, 0.4, 0.42] }, 0.25]]);
  } else if (t < T.q4) {
    p = poseEn(t, [[0, { x: W_P1.x, z: W_P1.z, giro: gR, ...aC(0, -0.02), ...CARA.feliz, ...BRAZOS.costado }], [T.palmada2 - 0.25, { manoD: [-0.1, 0.45, 0.5] }, 0.25], [T.palmada2 + 0.2, { ...BRAZOS.costado }, 0.3], [T.r5 + 0.2, { ...BUENA }, 0.3]]);
    const k = Math.sin(Math.PI * sg(t, T.palmada2 - 0.2, T.palmada2 + 0.2)); if (k > 0) manoA(walter, p, "D", raul.cuerpo.localToWorld(V3(0.21, 0.44, 0.02)), k);
    bocaVoz(p, t, T.w1b, ENV.w1, 0.8);
  } else if (t < T.q4b) {
    const r = recorrido(t, WALTER_Q4);
    p = poseEn(t, [[0, { x: r.x, z: r.z, giro: r.giro ?? -2.2, ...aC(-0.4, 0), ...CARA.feliz, manoI: [0.4, 0.55, 0.2], manoD: [-0.4, 0.55, 0.2], codoI: [1, -0.4, 0], codoD: [-1, -0.4, 0] }]]);
    p.paso = r.anda ? 1 : 0; if (r.giro !== null) p.giro = r.giro;
    bocaVoz(p, t, T.w2b, ENV.w2, 0.8);
  } else {
    const W4 = { x: -0.17, z: -1.25 };
    p = poseEn(t, [[0, { x: W4.x, z: W4.z, giro: giroA(W4.x, W4.z, RAUL0.x, RAUL0.z), ...aC(0, -0.02), ...CARA.feliz, ...BRAZOS.costado }], [T.r6 + 2.3, { cejas: { alto: 0.7, ang: 0.8 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.9 }, ...aC(0.1, 0.12), manoD: [-0.1, 0.62, 0.32], codoD: [-0.8, -0.6, 0] }, 0.3]]);
  }
  p.t = t; return p;
}
// los que se van en la ráfaga (P3): pareja, amigos, mamá con el nene; caminan de la mesa a la puerta
const GRUPOS = [[0, 1], [2, 3], [4, 5]];
function poseExtra(i, t) {
  const pa = planoActual;
  if (pa === "P3") {
    const gi = GRUPOS.findIndex((g) => g.includes(i)), lado = GRUPOS[gi].indexOf(i) ? 1 : -1;
    const a = T.raf[gi][0] - 0.55, b = a + 1.6;
    const ox = lado * (i === 5 ? 0.22 : 0.27);
    const r = recorrido(t, [[a, 1.3 + ox, 1.2], [b, PUERTA.x + ox * 0.5, GZ + 0.15]]);
    const p = poseEn(t, [[0, { x: r.x, z: r.z, giro: r.giro ?? Math.PI, paso: 1, ...aC(lado < 0 ? -0.9 : -0.5, 0), ...CARA.sonrisa, ...BRAZOS.costado }]]);
    if (lado < 0 && t >= T.raf[gi][0] - 0.1) Object.assign(p, saludo(t, "I", 1));
    p.visible = t >= a && t < b - 0.05;
    p.t = t; return p;
  }
  if (pa === "Q4" || pa === "Q4b") {
    const [x, z] = MESAS[G_MESA];
    const p = poseEn(t, [[0, { x: i === 1 ? x - 0.62 : x + 0.62, y: -0.08, z, giro: i === 1 ? Math.PI / 2 : -Math.PI / 2, sentado: 1, inclina: 0.08, ...aC(i === 1 ? 0.3 : -0.3, 0.1), ...CARA.feliz, ...BRAZOS.apoyado }]]);
    p.visible = i === 1 || i === 4; p.t = t; return p;
  }
  return { visible: false };
}
function poseGraciela(t) {
  if (planoActual === "Q3b") {
    const p = poseEn(t, [[0, { x: 29.8, y: 0.06, z: -0.55, giro: 0, sentado: 1, inclina: 0.06, ...aC(0, 0.22), ...CARA.esperanza, ...BRAZOS.celular, codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }], [T.g1, { ...aC(0.1, 0.0), ...CARA.feliz }, 0.2]]);
    p.t = t; bocaVoz(p, t, T.g1, ENV.g1, 0.7); return p;
  }
  const [x, z] = MESAS[G_MESA];
  const p = poseEn(t, [[0, { x, y: -0.08, z: z - MESA_D / 2 - 0.12, giro: 0, sentado: 1, inclina: 0.08, ...aC(0.3, 0.05), ...CARA.feliz, ...BRAZOS.apoyado }]]);
  p.t = t; return p;
}
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.s1 + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4], [T.s1 + LEN.s1 - 0.3, { ...BRAZOS.costado }, 0.4]]);
  const habla = sg(t, T.s1 - 0.15, T.s1) * (1 - sg(t, T.s1 + LEN.s1, T.s1 + LEN.s1 + 0.2));
  p.boca.sonrisa = lerp(p.boca.sonrisa, 0.15, habla);
  p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.6); return p;
}

// =====================================================================================================
// RENDER
// =====================================================================================================
const bump = (t, a, abre = 0.25, queda = 0.35, cierra = 0.4) => (t < a || t > a + abre + queda + cierra ? 0 : t < a + abre ? eo((t - a) / abre) : t < a + abre + queda ? 1 : 1 - eio((t - a - abre - queda) / cierra));
const PUERTAS = [T.campana1 + 0.4, ...T.raf.map(([a]) => a + 0.3), T.campana2 - 0.15, T.campana3 - 0.15];
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  // ---- el salón por estado ----
  const sab = (!p2 && t < T.p4 + 0.32) || (p2 && t < T.q2), febV = !p2 && t >= T.p4 + 0.32, febL = p2 && t >= T.q4;
  SAL.sab.visible = sab; SAL.febVacio.visible = febV; SAL.febLleno.visible = febL;
  CARNE_SAB.visible = !febV; CARNE_FEB.visible = febV;
  MESA_W_G.visible = p2 && t < T.q2; ATRIL.visible = p2;
  { const k = pa === "Q1" ? bk(sg(t, T.atril, T.atril + 0.3)) : 1; ATRIL.scale.setScalar(Math.max(0.001, k) * 1.35); }
  PROV_G.visible = febL;
  VENT.rotation.y = febV || febL ? t * 7 : 0.4;
  PUERTA_HOJA.rotation.y = -1.25 * Math.max(...PUERTAS.map((a) => bump(t, a)));
  ponerPizarra(t);
  // las llamas, el humo y las chispas (deterministas)
  LLAMAS.forEach((l, i) => { const s = 0.75 + 0.25 * Math.sin(t * (9 + i * 1.7) + i * 2.1); l.scale.set(1, s, 1); l.position.y = l.userData.base.y + (s - 1) * 0.14; });
  HUMO.forEach((h, i) => { const f = ((t * 0.22 + i / HUMO.length) % 1 + 1) % 1; h.position.set(GRILL.x - 0.55 + i * 0.12 + Math.sin(t * 0.7 + i) * 0.06, GRILL.y + 0.3 + f * 1.0, GRILL.z - 0.25); h.material.opacity = 0.07 * Math.sin(Math.PI * f) * (febV ? 0.5 : 1); h.lookAt(camera.position); });
  CHISPAS.forEach((c, i) => { const f = ((t * 0.9 + i * 0.37) % 1 + 1) % 1; c.position.set(BRASERO.position.x - 0.1 + ((i * 0.13) % 0.25), 1.15 + f * 0.7, BRASERO.position.z + ((i * 0.07) % 0.12) - 0.05); c.visible = f < 0.8; });
  // ---- personajes ----
  const living = pa === "Q3b", insert = pa === "P6" || pa === "Q1b" || pa === "Q2" || pa === "Q3";
  raul.raiz.visible = !living; raul.poner(poseRaul(t));
  fabian.raiz.visible = !living && !(pa === "P1" || pa === "P3" || pa === "P4" || pa === "Q1");
  fabian.poner(poseFabian(t));
  walter.raiz.visible = !living && (pa === "P1" || pa === "P2" || pa === "P7" || pa === "Q1" || pa === "Q1c" || (pa === "Q4" && t >= T.entra2[0]) || pa === "Q4b");
  if (walter.raiz.visible) walter.poner(poseWalter(t));
    EXTRAS.forEach((e, i) => { const p = poseExtra(i, t); e.raiz.visible = !!p.visible; if (p.visible) e.poner(p); });
  graciela.raiz.visible = living || pa === "Q4" || pa === "Q4b"; if (graciela.raiz.visible) graciela.poner(poseGraciela(t));
  // objetos en las manos
  celuW.visible = pa === "Q1"; if (celuW.visible) { const a = manoMundo(walter, "I", _a), b = manoMundo(walter, "D", _b); celuW.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0.02)); celuW.rotation.set(0.25, Math.PI, 0); }
  celuG.visible = living; if (celuG.visible) { const a = manoMundo(graciela, "I", _a), b = manoMundo(graciela, "D", _b); celuG.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0.02)); celuG.rotation.set(-0.55, 0, 0); }
  celuR.visible = pa === "P6b"; if (celuR.visible) { const a = manoMundo(raul, "I", _a); celuR.position.copy(a).add(V3(0, 0.1, 0.03)); celuR.rotation.set(-0.85, 0.15, 0); }
  PINZA.visible = !(pa === "P6b");
  tablet.visible = celuS.visible = p2;
  ponerTablet3D(t);
  BRAZO_P.visible = pa === "P4" && t >= T.borra[0] - 0.1; TRAPO_P.visible = TIZA_P.visible = false;
  if (BRAZO_P.visible) {
    const escr = t >= T.escribe[0] - 0.02;
    TRAPO_P.visible = !escr; TIZA_P.visible = escr;
    let u, v;
    if (!escr) { const k = sg(t, T.borra[0], T.borra[1]); u = 0.12 + 0.8 * k; v = 170 / 960 + Math.sin(k * Math.PI * 6) * 0.05; }
    else { const k = sg(t, T.escribe[0], T.escribe[1]); const l1 = k < 0.5; const kk = l1 ? k * 2 : k * 2 - 1; u = 0.24 + 0.55 * kk; v = (l1 ? 110 : 250) / 960 + Math.sin(kk * 30) * 0.02; }
    const hx = PIZ.x - PIZ.w / 2 + u * PIZ.w, hy = PIZ.y + PIZ.h / 2 - v * PIZ.h;
    const escr2 = TIZA_P.visible;
    BRAZO_P.position.set(hx + (escr2 ? 0.07 : 0.02), hy - 0.04, PIZ.z + (escr2 ? 0.14 : 0.12)); BRAZO_P.lookAt(hx + 1.2, hy - 0.4, PIZ.z + 0.6);
    TRAPO_P.position.set(hx - 0.03, hy - 0.02, PIZ.z + 0.06); TIZA_P.position.set(hx, hy, PIZ.z + 0.03); TIZA_P.lookAt(hx + 0.3, hy - 0.1, PIZ.z + 0.5);
  }
  // ---- Sofi: su escena a la textura del celular parado ----
  if (pa === "Q5") {
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.0, c.z + 2.1); SOFI.cam.lookAt(c.x, c.y - 0.2, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  const INS = { P6: INS_C, Q1b: INS_P, Q2: INS_T, Q3: INS_T }[pa];
  for (const I of [INS_C, INS_P, INS_T]) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.035, eo(k)));
    for (const p of TODOS) p.raiz.visible = false;
    if (pa === "P6") ponerContactos(t); else if (pa === "Q1b") ponerPuntos(t); else ponerPanelInserto(t);
  }
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // la luz de la parrilla: más cálida en el sábado
  brasaL.intensity = febV ? 1.6 : 2.4;

  // ---- tarjetas ----
  for (const k in GL) GL[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const sale = (tf) => (t < tf ? 1 : 0);
    const bR = () => bocaPx(raul), bF = () => bocaPx(fabian), bW = () => bocaPx(walter);
    if (pa === "P1") {
      ponerGlobo(GL.w1, 600, 1500, ent(T.w1) * sale(T.r1 + 0.05), (() => { const [x, y] = bW(); return [x, y + 40]; })());
      if (t >= T.r1) { const [x, y] = bR(); ponerGlobo(GL.r1, 480, 1500, ent(T.r1), [x, y + 40], 1); }
    }
    if (pa === "P2") {
      if (t < T.encoge1 + 0.05) { const [x, y] = bR(); ponerGlobo(GL.r2, 470, 300, ent(T.r2), [x, y - 40]); }
      if (t >= T.niIdea) { const [x, y] = bF(); ponerGlobo(GL.niIdea, 760, 330, ent(T.niIdea), [x, y - 30], 1); }
    }
    if (pa === "P3") {
      const [rx, ry] = bR();
      T.raf.forEach(([a, b], i) => {
        const habla = EXTRAS[GRUPOS[i][0]];
        const finC = i < 2 ? T.raf[i + 1][0] : T.rot112, finA = i < 2 ? T.raf[i + 1][1] : T.rot112 + 0.4;
        if (t >= a && t < finC) { const [hx, hy] = habla.raiz.visible ? bocaPx(habla) : [800, 900]; ponerGlobo(GL["c" + i], 690, 300, ent(a), [hx, hy - 30], i); }
        if (t >= b && t < finA) ponerGlobo(GL["a" + i], 380, 560, ent(b), [rx, ry - 30], i + 1);
      });
      if (t >= T.rot112) { const [ax, ay] = objPx(raul.cuerpo, V3(0, 0.3, 0.2)); ponerGlobo(GL.rotA, 540, 1430, ent(T.rot112), null, 3); ponerGuia(GUIAS[0], 380, 1380, ax, ay, eo(sg(t, T.rot112, T.rot112 + 0.2))); }
      if (t >= T.rot0) ponerGlobo(GL.rotB, 540, 1580, ent(T.rot0), null, 3);
    }
    if (pa === "P5") {
      const [mx, my] = enPantalla(V3(MESAS[1][0], MESA_H, MESAS[1][1])), [gx, gy] = enPantalla(V3(GRILL.x, GRILL.y + 0.05, GRILL.z + 0.2));
      ponerGlobo(GL.rot3, 700, 1450, ent(T.rot3), null, 1); ponerGuia(GUIAS[0], 700, 1380, mx, my, eo(sg(t, T.rot3, T.rot3 + 0.2)));
      ponerGlobo(GL.rotL, 400, 1650, ent(T.rotLena), null, 1); ponerGuia(GUIAS[1], 330, 1580, gx, gy, eo(sg(t, T.rotLena, T.rotLena + 0.2)));
      if (t >= T.f1) { const [x, y] = bF(); ponerGlobo(GL.f1, 560, 360, ent(T.f1), [x, y - 30], 2); }
    }
    if (pa === "P6b" && t >= T.r3) { const [x, y] = bR(); if (t < T.r3 + 0.88) ponerGlobo(GL.r3a, 540, 300, ent(T.r3), [x, y - 40]); else ponerGlobo(GL.r3, 540, 330, 1, [x, y - 40]); }
    if (pa === "P7") {
      if (t >= T.w2 && t < T.r4) { const [x, y] = bW(); ponerGlobo(GL.w2, 640, 330, ent(T.w2) * sale(T.r4), [x, y - 30]); }
      if (t >= T.r4) { const [x, y] = bR(); ponerGlobo(GL.r4, 480, 330, ent(T.r4), [x, y - 30]); }
    }
    if (pa === "Q1") ponerGlobo(GL.chipSab, 540, 250, ent(P2 + 0.05), null);
    if (pa === "Q1b") ponerGlobo(GL.rSuma, 540, 170, ent(T.q1b + 0.1), null);
    if (pa === "Q1c") {
      const [tx, ty] = objPx(tablet, V3(0, 0.3, 0));
      ponerGlobo(GL.ficha, 560, 200, ent(T.ficha), null, 2); ponerGuia(GUIAS[0], 760, 340, tx, ty, eo(sg(t, T.ficha, T.ficha + 0.2)));
      if (t >= T.w1b && t < T.r5) { const [x, y] = bW(); ponerGlobo(GL.w1, 600, 1500, ent(T.w1b) * sale(T.r5 + 0.02), [x, y + 40]); }
      if (t >= T.r5) { const [x, y] = bR(); ponerGlobo(GL.r5, 480, 1500, ent(T.r5), [x, y + 40], 1); }
    }
    if (pa === "Q3") ponerGlobo(GL.rAviso, 540, 150, ent(T.q3 + 0.1), null);
    if (pa === "Q3b") { ponerGlobo(GL.aviso, 540, 260, ent(T.aviso), null); if (t >= T.g1) { const [x, y] = bocaPx(graciela); ponerGlobo(GL.g1, 540, 560, ent(T.g1), [x, y - 30], 1); } }
    if (pa === "Q4") { ponerGlobo(GL.chip17, 540, 210, ent(T.chip17), null); if (t >= T.w2b) { const [x, y] = bW(); ponerGlobo(GL.w2, 620, 480, ent(T.w2b), [x, y - 30], 1); } }
    if (pa === "Q4b" && t >= T.r6) { const [x, y] = bR(); const g = t >= T.r6 + 2.3 ? GL.r6 : t >= T.r6 + 0.72 ? GL.r6b : GL.r6a; ponerGlobo(g, 520, 300, t < T.r6 + 0.72 ? ent(T.r6) : 1, [x, y - 40]); }
  }
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { raul: bocaPx(raul), plano: planoActual }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
